import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { APIKey, APISecret, cloudName } from '../config';
import fs from 'fs';
import { resolve } from 'path';
import logger from '../utils/logger';
import { Request } from 'express';
import ApiError from '../middlewares/error/ApiError';

cloudinary.config({
  cloud_name: cloudName,
  api_key: APIKey,
  api_secret: APISecret,
  secure: true,
});

const validFileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'text/csv',
  'application/pdf',
];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (validFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only CSV, JPEG, PNG, JPG, PDF files are allowed',
      ),
    );
  }
};

const deleteFiles = (file: Express.Multer.File) => {
  fs.unlink(resolve(file.path), (err) => {
    if (err) {
      throw err;
    }
    logger.info('Delete File successfully.');
  });
};

export const upload = multer({ dest: './uploads', fileFilter });

export const cloudinaryService = async (file: Express.Multer.File) => {
  const fileSize = 1024 * 1024 * 100;

  if (file.size > fileSize) {
    deleteFiles(file);
    throw new ApiError(400, 'file size should not be more than 10mb');
  }
  const uploadedFile = await cloudinary.uploader.upload(file.path);

  deleteFiles(file);

  return uploadedFile;
};
