import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/async';
import {
  create,
  deleteOne,
  find,
  findOne,
} from '../service/contact-us.service';

import { successResponse } from '../utils/responses';

export const createContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await create(req.body);

    return successResponse(res, 200, 'Contact created successfully!');
  },
);

export const findContacts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Contacts = await find();
    return successResponse(
      res,
      200,
      'Contacts fetched successfully!',
      Contacts,
    );
  },
);

export const findContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Contact = await findOne(req.params.id);

    return successResponse(res, 200, 'Contact fetched successfully!', Contact);
  },
);

export const deleteContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteOne(req.params.id);

    return successResponse(res, 200, 'Contact deleted successfully!');
  },
);
