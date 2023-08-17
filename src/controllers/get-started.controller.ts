import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async';
import { getStarted } from '../service/get-started.service';
import { successResponse } from '../utils/responses';

export const sendUserDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await getStarted(req.body);

    return successResponse(
      res,
      200,
      'user gotten started with acee successfully!',
    );
  },
);
