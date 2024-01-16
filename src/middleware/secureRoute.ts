/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/api-error';

const secureRote = (req:Request, res:Response, next:NextFunction) => {
  const { api_key } = req.headers;
  if (!api_key) {
    return next(ApiError.Forbidden('Ключ не передан'));
  }
  if (api_key !== process.env.API_KEY) {
    return next(ApiError.Forbidden('Неправильный ключ'));
  }
  return next();
};
export default secureRote;
