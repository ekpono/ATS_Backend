import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async';
import { create, update } from '../service/payment.service';
import { successResponse } from '../utils/responses';

export const createPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await create(req.body);

    return successResponse(
      res,
      201,
      'Payment link and code sent to user successfully!',
      payment,
    );
  },
);

export const confirmPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await update(req.params.id);

    return successResponse(res, 200, 'payment updated successfully!', payment);
  },
);
