import { Router } from 'express';
import {
  adminforgotPassword,
  AdminLogin,
  adminResetPassword,
  adminSignup,
  refreshUserToken,
  resendOtp,
} from '../controllers/auth.controller';
import { upload } from '../service/cloudinary.service';

const uploadFile = upload.single('profileImage');

const authRoute = Router();

authRoute.route('/refresh-token').get(refreshUserToken);
authRoute.route('/').post(uploadFile, adminSignup);
authRoute.route('/login').post(AdminLogin);
authRoute.route('/forgot-password').post(adminforgotPassword);
authRoute.route('/reset-password').post(adminResetPassword);
authRoute.route('/otp').patch(resendOtp);

export default authRoute;
