/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/api-error';

// Common middleware for errors handling
const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
  } else {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
  }
};
export default errorHandler;
