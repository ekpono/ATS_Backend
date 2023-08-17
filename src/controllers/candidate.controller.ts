import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async';
import {
  activate,
  archive,
  create,
  deleteOne,
  find,
  findOne,
  unarchive,
  update,
} from '../service/candidate.service';
import { AuthenticatedRequest } from '../types';
import { Ifiles } from '../types/file.type';
import { successResponse } from '../utils/responses';

export const createCandidate = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const candidate = await create(req.body, req.user.id, req.files as Ifiles);

    return successResponse(
      res,
      200,
      'candidate created successfully!',
      candidate,
    );
  },
);

export const findCandidates = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidates = await find(req.query);

    return successResponse(
      res,
      200,
      'candidates fetched successfully!',
      candidates.data,
      candidates.pagination,
    );
  },
);

export const findCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidate = await findOne(req.params.id);

    return successResponse(
      res,
      200,
      'candidate fetched successfully!',
      candidate,
    );
  },
);

export const updateCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidate = await update(
      req.params.id,
      req.body,
      req.files as Ifiles,
    );

    return successResponse(
      res,
      200,
      'candidate updated successfully!',
      candidate,
    );
  },
);

export const archiveCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const status = await archive(req.params.id);

    return successResponse(res, 200, `candidate archived successfully!`);
  },
);

export const unarchiveCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await unarchive(req.params.id);

    return successResponse(res, 200, `candidate unarchived successfully!`);
  },
);

export const activateCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await activate(req.params.id);

    return successResponse(
      res,
      200,
      `candidate profile activated successfully!`,
    );
  },
);
export const deleteCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteOne(req.params.id);

    return successResponse(res, 200, 'candidate deleted successfully!');
  },
);
