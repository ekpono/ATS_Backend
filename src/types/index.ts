import { Request } from 'express';
import { Types } from 'mongoose';

export interface UploadRequest extends Request {
  file: Express.Multer.File;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: Types.ObjectId;
    role: string;
    email: string;
  };
}

export interface IDate {
  $gte?: string;
  $lte?: string;
}

export interface IDateQuery {
  createdAt?: IDate;
}
