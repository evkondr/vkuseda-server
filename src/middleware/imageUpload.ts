import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import {
  Express, NextFunction, Request, Response,
} from 'express';
import ApiError from '../utils/api-error';
// Storage configuration
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const dest = path.join('src', 'images');
    cb(null, dest);
  },
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + ext;
    cb(null, fileName);
  },
});
// File filtrer for only img and png
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

// Maddleware
const imageUpload = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({ storage, fileFilter }).single('menu-image');
  upload(req, res, (err) => next(err));
};
export default imageUpload;
