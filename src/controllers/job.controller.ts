import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async';
import {
  changeJobStatus,
  create,
  deleteOne,
  find,
  findJobOverview,
  findOne,
  findQualifiedCandidates,
  update,
} from '../service/job.service';
import { AuthenticatedRequest } from '../types';
import { PaginatedData } from '../types/paginate.type';
import { successResponse } from '../utils/responses';

export const createJob = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    req.files;
    const jobs = await create(req.body, req.user.id);

    return successResponse(res, 200, 'job created successfully!', jobs);
  },
);

export const findJobs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jobs = await find(req.query);

    return successResponse(
      res,
      200,
      'jobs fetched successfully!',
      jobs.data,
      jobs.pagination,
    );
  },
);

export const findJob = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const job = await findOne(req.params.id);

    return successResponse(res, 200, 'job fetched successfully!', job);
  },
);

export const updateJob = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const job = await update(req.params.id, req.body);

    return successResponse(res, 200, 'job updated successfully!', job);
  },
);

export const deleteJob = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteOne(req.params.id);

    return successResponse(res, 200, 'job deleted successfully!');
  },
);

export const jobOverview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jobs = await findJobOverview(req.query);

    return successResponse(
      res,
      200,
      'job updated successfully!',
      jobs.data,
      jobs.pagination,
    );
  },
);

export const qualifiedCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jobs = await findQualifiedCandidates(req.params.id);

    return successResponse(res, 200, 'job updated successfully!', jobs);
  },
);

export const jobStatus = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const jobs = await changeJobStatus(req.params.id, req.body.status);

    return successResponse(res, 200, 'job created successfully!', jobs);
  },
);
