import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole, TJWTUserData } from '../../types';
import ApiError from '../utils/api-error';

const authMiddleware = (roles:Array<UserRole>) => (
  req:Request,
  res:Response,
  next:NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(ApiError.Forbidden('Войдите в систему'));
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    return next(ApiError.Forbidden('Войдите в систему'));
  }
  const user = jwt.verify(token, process.env.JWT_SECRET as string) as TJWTUserData;
  // eslint-disable-next-line no-restricted-syntax
  for (const role of roles) {
    if (role === user.role) {
      req.user = user;
      break;
    }
  }
  return next();
};
export default authMiddleware;
