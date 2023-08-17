import { Response, Request, NextFunction } from 'express';
import asyncHandler from '../middlewares/async';
import {
  changePassword,
  deleteOne,
  find,
  findOne,
  update,
} from '../service/user.service';
import { AuthenticatedRequest } from '../types';
import { successResponse } from '../utils/responses';

export const findUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await find();
    return successResponse(res, 200, 'users fetched successfully!', user);
  },
);

export const findUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await findOne(req.params.id);
    return successResponse(res, 200, 'user fetched successfully!', user);
  },
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await update(req.params.id, req.body, req.file);

    return successResponse(res, 200, 'user updated successfully!', user);
  },
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteOne(req.params.id);

    return successResponse(res, 200, 'user deleted successfully!');
  },
);

export const adminChangePassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    await changePassword(req.body, req.user.id);

    return successResponse(res, 200, 'password changed successfully!');
  },
);
