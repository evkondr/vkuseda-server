/* eslint-disable camelcase */
import { Request, Response, NextFunction } from 'express';

const secureRote = (req:Request, res:Response, next:NextFunction) => {
  const { api_key } = req.headers;
  if (!api_key) {
    return res.status(403).json({ message: 'Ключ не передан' });
  }
  if (api_key !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Неверный ключ' });
  }
  return next();
};
export default secureRote;
