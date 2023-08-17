import { Router } from 'express';
import { AdminLogin, adminSignup } from '../controllers/auth.controller';
import {
  adminChangePassword,
  deleteUser,
  findUser,
  findUsers,
  updateUser,
} from '../controllers/user.controller';
import { upload } from '../service/cloudinary.service';

const userRoute = Router();

userRoute.route('/').get(findUsers).post(adminSignup);
userRoute.route('/change-password').patch(adminChangePassword);
userRoute
  .route('/:id')
  .get(findUser)
  .patch(upload.single('profileImage'), updateUser)
  .delete(deleteUser);

export default userRoute;
