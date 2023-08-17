import dotenv from 'dotenv';

dotenv.config();

export const frontendUrl = process.env.FRONTEND_URL as string;
export const frontendUrlProd = process.env.FRONTEND_URL_PROD as string;
export const port = process.env.PORT || 3000;
export const nodeEnv = process.env.NODE_ENV || 'development';
export const url = process.env.URL || 'localhost:3000';
export const mongoURI = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET as string;
export const accessTokenExpiresIn = process.env.ACCESS_TOKEN_LIFE;
export const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_LIFE;
export const APIKey = process.env.API_KEY;
export const cloudName = process.env.CLOUD_NAME;
export const APISecret = process.env.API_SECRET;
export const smsUser = process.env.SMS_USER;
export const smsPassword = process.env.SMS_PASSWORD;
export const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
export const emailHost = process.env.EMAIL_HOST;
export const emailUser = process.env.EMAIL_USER;
export const emailPassword = process.env.EMAIL_PASSWORD;
export const emailService = process.env.EMAIL_SERVICE;
export const otpTime = process.env.OTP_TIME || 60000;
export const cookieDomain = process.env.COOKIE_DOMAIN || 'localhost';
export const smsToken = process.env.SMS_TOKEN;
