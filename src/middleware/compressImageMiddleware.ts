import {
  Express, Request, Response, NextFunction,
} from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import multer, { FileFilterCallback } from 'multer';
import ApiError from '../utils/api-error';

const storage = multer.memoryStorage();

const fileFilter = (
  req:Request,
  file:Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(ApiError.BadRequest('Неверный формат данных'));
  }
};

const compressImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const dest = process.env.NODE_ENV === 'production' ? path.join('dist', 'src', 'images') : path.join('src', 'images');
  fs.access(dest, (error) => {
    if (error) {
      fs.mkdirSync(dest);
    }
  });
  const upload = multer({ storage, fileFilter }).single('menu-image');
  upload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    if (req.file) {
      const filename = `${uuidv4()}.webp`;
      await sharp(req.file.buffer).webp({ quality: 20 }).toFile(path.join(dest, filename));
      req.file.filename = filename;
      return next();
    }
    return next();
  });
};

export default compressImageMiddleware;
