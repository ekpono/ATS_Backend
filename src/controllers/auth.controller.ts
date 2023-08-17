import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async';
import {
  create,
  forgotPassword,
  login,
  refreshToken,
  resetPassword,
  sendOtp,
} from '../service/auth.service';
import { AuthenticatedRequest } from '../types';
import { successLoginResponse, successResponse } from '../utils/responses';

export const adminSignup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await create(req.body, req.file);
    return successResponse(res, 200, 'admin account created successfully!');
  },
);

export const AdminLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginResponse = await login(req.body, res);

    return successLoginResponse(
      res,
      200,
      'user login successfully!',
      loginResponse.token,
      loginResponse.user,
    );
  },
);

export const adminforgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await forgotPassword(req.body.email);

    return successResponse(res, 200, 'user login successfully!', response);
  },
);

export const adminResetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await resetPassword(req.body);

    return successResponse(res, 200, 'password changed successfully!');
  },
);

export const resendOtp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await sendOtp(req.body.email);

    return successResponse(res, 200, 'otp sent successfully!');
  },
);

export const refreshUserToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = await refreshToken(req);

    return successResponse(res, 200, 'token refreshed successfully!', {
      token,
    });
  },
);
