import ApiError from '../middlewares/error/ApiError';
import UserModel from '../models/user.model';
import { ILogin, IResetPassword, IUser } from '../types/user.type';
import { Request, Response } from 'express';

import {
  checkPasswordToken,
  encryptPassword,
  generateOtp,
  generatePasswordToken,
  generateToken,
  validateToken,
  verifyPassword,
} from '../utils/helpers/security';
import {
  validateLogin,
  validateResetPassword,
  validateUser,
} from '../utils/validation/auth.validation';
import { cloudinaryService } from './cloudinary.service';
import { sendMail } from './mail.service';
import { findByEmail } from './user.service';
import { JwtPayload } from 'jsonwebtoken';
import { cookieDomain, refreshTokenExpiresIn } from '../config';

export const create = async (
  createUserDto: IUser,
  profileImage?: Express.Multer.File,
) => {
  const { error } = validateUser(createUserDto);

  if (error) {
    throw new ApiError(400, error.message);
  }

  if (!profileImage) {
    throw new ApiError(400, 'provide profile image');
  }

  const uploadedfile = await cloudinaryService(profileImage);
  createUserDto.profileImage = uploadedfile.secure_url;

  const encryptedPassword = await encryptPassword(createUserDto.password);

  createUserDto.password = encryptedPassword;

  const user = await UserModel.create(createUserDto);

  return user;
};

export const login = async (loginDto: ILogin, res: Response) => {
  const { error } = validateLogin(loginDto);

  if (error) {
    throw new ApiError(400, error.message);
  }

  const user = await UserModel.findOne({ email: loginDto.email });

  if (!user) {
    throw new ApiError(401, 'invalid credentials');
  }

  await verifyPassword(user.password, loginDto.password);

  const [token, refreshToken] = generateToken(user.id, user.email);
  user.refreshToken = refreshToken;

  await user.save();

  res.cookie('refreshToken', refreshToken, {
    domain: cookieDomain,
    maxAge: Number(refreshTokenExpiresIn),
  });

  return { token, user: basicUser(user) };
};

const basicUser = (user: IUser) => {
  const { firstName, lastName, email, profileImage, phone, role } = user;

  return {
    firstName,
    lastName,
    email,
    profileImage,
    phone,
    role,
  };
};

export const forgotPassword = async (email: string) => {
  if (!email) {
    throw new ApiError(400, 'email is required!');
  }
  const user = await sendOtp(email);

  return {
    email,
    passwordToken: user?.passwordToken,
  };
};

export const resetPassword = async (resetPasswordDto: IResetPassword) => {
  const { error } = validateResetPassword(resetPasswordDto);

  if (error) {
    throw new ApiError(400, error.message);
  }
  const user = await findByEmail(resetPasswordDto.email);

  if (!user) {
    throw new ApiError(401, 'email not found');
  }

  if (user.passwordOtp !== resetPasswordDto.passwordOtp) {
    throw new ApiError(403, 'invalid otp!');
  }

  //check if otp has expired
  checkPasswordToken(user.passwordToken);

  if (user.passwordToken !== resetPasswordDto.passwordToken) {
    throw new ApiError(403, 'password reset failed');
  }

  const encryptedPassword = await encryptPassword(resetPasswordDto.password);

  user.password = encryptedPassword;
  user.passwordOtp = '';
  user.passwordToken = '';

  await user.save();
};

export const sendOtp = async (email: string) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new ApiError(403, 'invalid email address');
  }

  const subject = 'Forgot Password OTP';
  const otp = generateOtp();
  const passwordToken = generatePasswordToken(email);

  user.passwordToken = passwordToken;
  user.passwordOtp = otp;

  await sendMail({
    email,
    name: user.firstName,
    message: otp,
    subject,
  });

  await user.save();
  return user;
};

export const refreshToken = async (req: Request) => {
  const refreshTokenCookie = req.cookies['refreshToken'];

  if (!refreshTokenCookie) {
    throw new ApiError(403, 'No token provided');
  }

  const claims = validateToken(refreshTokenCookie) as JwtPayload;

  const user = await findByEmail(claims['email']);

  const [token, newRefreshToken] = generateToken(
    user.id,
    user.email,
    user.role,
  );

  user.refreshToken = newRefreshToken;

  await user.save();

  return token;
};
