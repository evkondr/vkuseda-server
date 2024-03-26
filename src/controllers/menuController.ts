import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import fs from 'fs/promises';
import path from 'path';
import categoryService from '../services/categoryService';
import menuService from '../services/menuService';
import authSevice from '../services/authSevice';
import ApiError from '../utils/api-error';
import { Categories } from '../entities';

export default class MenuController {
  static async getMenuItems(req:Request, res:Response, next:NextFunction) {
    try {
      const result = await menuService.getAllMenuItems();
      return res.status(200).json({ message: 'Данные успешно получены', result });
    } catch (error) {
      return next(error);
    }
  }

  static async getMenuItemByID(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const result = await menuService.getMenuItemById(id);
      return res.send({ message: 'Данные успешно получены', result });
    } catch (error) {
      return next(error);
    }
  }

  static async createMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const createdAt = moment().format('DD/MM/YY');
      const {
        name, ingredients, price, weight, categoryId, imageAlt,
      } = req.body;
      const { file, user } = req;
      // First find category in DV
      let category;
      if (categoryId !== undefined && categoryId !== '') {
        category = await categoryService.getCategoryById(categoryId) as Categories;
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
        imageAlt,
        isInPromo: false,
      });
      return res.status(200).json({ message: 'Запись успешно создана', result });
    } catch (error) {
      return next(error);
    }
  }

  static async updateMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const { categoryId, ...values } = req.body;
      const menuItem = await menuService.getMenuItemById(id);
      if (!menuItem) {
        return next(ApiError.NotFound('Запись с таким id не найдена'));
      }
      if (menuItem.image && req.file) {
        try {
          const filePath = path.join(process.cwd(), 'src', 'images', menuItem.image);
          await fs.rm(filePath);
        } catch (error) {
          // Don't need to handle error
        }
      }
      let category;
      if (categoryId !== undefined && categoryId !== '') {
        category = await categoryService.getCategoryById(categoryId) as Categories;
      }
      // eslint-disable-next-line max-len
      const result = await menuService.updateMenuItemById(id, { ...values, image: req.file?.filename, category });
      return res.json({ message: 'Запись успешно обновлена', result });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const found = await menuService.getMenuItemById(id);
      if (!found) {
        return next(ApiError.NotFound('Запись с таким id не найдена'));
      }
      if (found?.image) {
        try {
          const filePath = path.join(process.cwd(), 'src', 'images', found.image);
          await fs.rm(filePath);
        } catch (error) {
          // Don't need to handle error
        }
      }
      const result = await menuService.deleteMenuItemById(id);
      return res.json({ message: 'Запись удалена успешно', result });
    } catch (error) {
      return next(error);
    }
  }
}
