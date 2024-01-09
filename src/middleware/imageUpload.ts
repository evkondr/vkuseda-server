import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Express, Request } from 'express';

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

const fileFilter = (
  req:Request,
  file:Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const imageUpload = multer({ storage, fileFilter });
export default imageUpload;
