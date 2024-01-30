import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import categoryService from '../services/categoryService';
import menuService from '../services/menuService';
import authSevice from '../services/authSevice';
import { TUpdateValues } from '../../types';
import ApiError from '../utils/api-error';

export default class MenuController {
  static async getMenuItems(req:Request, res:Response, next:NextFunction) {
    try {
      const menuItems = await menuService.getAllMenuItems();
      res.status(200).json(menuItems);
    } catch (error) {
      next(error);
    }
  }

  static async getMenuItemByID(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const result = await menuService.getMenuItemById(id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async createMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const createdAt = moment().format('DD/MM/YY');
      const {
        name, ingredients, price, weight, categoryId,
      } = req.body;
      const { file, user } = req;
      // First find category in DV
      const category = await categoryService.getCategoryById(categoryId);
      if (!category) {
        return next(ApiError.NotFound('Категории с таким id не найдено'));
      }
      const createdBy = await authSevice.findUserByValue('id', user.id);
      if (!createdBy) {
        return next(ApiError.NotFound('Пользователя с таким id не найдено'));
      }
      const result = await menuService.createMenuItem({
        image: file?.filename || null,
        name,
        ingredients,
        createdBy,
        category,
        createdAt,
        modifiedAt: createdAt,
        price,
        weight,
      });
      return res.status(200).json({ message: 'Запись успешно создана', result });
    } catch (error) {
      return next(error);
    }
  }

  static async updateMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      let values:TUpdateValues = { ...req.body };
      if (req.file) {
        values = { ...values, image: req.file.filename };
      }
      const result = await menuService.updateMenuItemById(id, values);
      res.json({ message: 'Запись успешно обновлена', result });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const result = await menuService.deleteMenuItemById(id);
      res.json({ message: 'Запись удалена успешно', result });
    } catch (error) {
      next(error);
    }
  }
}
