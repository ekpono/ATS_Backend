import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async';
import {
  findCandidateDemographic,
  findRecruitmentOverview,
  plot,
} from '../service/admin.service';
import { successResponse } from '../utils/responses';

export const candidateDemographic = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const demographics = await findCandidateDemographic(req.query);

    successResponse(
      res,
      200,
      'recruitment overview fetch successfully',
      demographics,
    );
  },
);

export const recruitmentOverview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jobs = await findRecruitmentOverview(req.query);

    successResponse(
      res,
      200,
      'recruitment overview fetch successfully',
      jobs.data,
      jobs.pagination,
    );
  },
);

export const plotData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await plot(req.query);

    return successResponse(res, 200, 'successfully fetched plot data', data);
  },
);
