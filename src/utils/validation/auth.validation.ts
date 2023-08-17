import Joi from 'joi';

export const validateUser = (user: any) => {
  const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    password: Joi.string().min(5).required(),
    profileImage: Joi.binary(),
  });

  return userSchema.validate(user);
};

// export const validateUser = (user: any) => {
//   const candidateSchema = Joi.object({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     email: Joi.string().email().required(),
//     phone: Joi.string().required(),
//     profession: Joi.string().required(),
//   });

//   return candidateSchema.validate(user);
// };

export const validateLogin = (credentials: any) => {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(5).required(),
  });

  return loginSchema.validate(credentials);
};

export const validateChangePassword = (credentials: any) => {
  const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    password: Joi.string().min(5).required(),
  });

  return changePasswordSchema.validate(credentials);
};

export const validateResetPassword = (credentials: any) => {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(5).required(),
    passwordToken: Joi.string().required(),
    passwordOtp: Joi.string().required(),
  });

  return loginSchema.validate(credentials);
};
