import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import ApiError from '../utils/api-error';
import authSevice from '../services/authSevice';

class AuthController {
  static async getAllUsers(req:Request, res:Response, next:NextFunction) {
    try {
      const result = await authSevice.getAllUsers();
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async createUser(req:Request, res:Response, next:NextFunction) {
    try {
      const { login, email, password } = req.body;
      const isLoginExists = await authSevice.findUserByValue('login', login);
      if (isLoginExists) {
        return next(ApiError.BadRequest('Пользователь с таким логином уже существует'));
      }
      const IsEmailExists = await authSevice.findUserByValue('email', email);
      if (IsEmailExists) {
        return next(ApiError.BadRequest('Пользователь с таким почтовым адресом уже существует'));
      }
      const createdAt = moment().format('DD/MM/YY');
      const result = await authSevice.createUser({
        login, email, password, createdAt,
      });
      return res.json({ message: 'Пользователь успешно создан', result });
    } catch (error) {
      return next(error);
    }
  }

  static async getUserByValue(req:Request, res:Response, next:NextFunction) {
    try {
      res.json();
    } catch (error) {
      next(error);
    }
  }

  static async updateUserById(req:Request, res:Response, next:NextFunction) {
    try {
      res.json();
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserById(req:Request, res:Response, next:NextFunction) {
    try {
      res.json();
    } catch (error) {
      next(error);
    }
  }
}
export default AuthController;
