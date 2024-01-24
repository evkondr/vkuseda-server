import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/api-error';
import authSevice from '../services/authSevice';
import { UserRole } from '../../types';

const salt = bcrypt.genSaltSync(10);
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
      let role = UserRole.USER;
      const { login, email, password } = req.body;
      const isAdminExists = await authSevice.findUserByValue('role', 'admin');
      if (!isAdminExists) {
        role = UserRole.ADMIN;
      }
      const isLoginExists = await authSevice.findUserByValue('login', login);
      if (isLoginExists) {
        return next(ApiError.BadRequest('Пользователь с таким логином уже существует'));
      }
      const IsEmailExists = await authSevice.findUserByValue('email', email);
      if (IsEmailExists) {
        return next(ApiError.BadRequest('Пользователь с таким почтовым адресом уже существует'));
      }
      const createdAt = moment().format('DD/MM/YY');
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await authSevice.createUser({
        login, email, password: hashedPassword, createdAt, role,
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

  static async logIn(req:Request, res:Response, next:NextFunction) {
    try {
      const { login, password } = req.body;
      const candidate = await authSevice.findUserByValue('login', login);
      if (!candidate) {
        return next(ApiError.NotFound('Неверные учетные данные'));
      }
      const isPasswordCorrect = await bcrypt.compare(password, candidate.password);
      if (!isPasswordCorrect) {
        return next(ApiError.NotFound('Неверные учетные данные'));
      }
      const token = await jwt.sign({
        id: candidate.id,
        login: candidate.login,
        role: candidate.role,
      }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
      return res.json({
        message: 'Вход успешно выполнен',
        result: {
          token,
        },
      });
    } catch (error) {
      return next(error);
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
      const { id } = req.params;
      const isExists = await authSevice.findUserByValue('id', id);
      if (!isExists) {
        return next(ApiError.NotFound('Пользователя с таким id нет в базе данных'));
      }
      const result = authSevice.deleteUserById(id);
      return res.json({
        message: 'Пользователь успешно удален',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
export default AuthController;
