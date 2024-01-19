import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import menuService from '../services/menuService';
import { TUpdateValues } from '../../types';

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
        name, ingredients, price, weight,
      } = req.body;
      const { file } = req;
      const result = await menuService.createMenuItem({
        image: file?.filename || null,
        name,
        ingredients,
        createdById: null,
        categoryId: null,
        createdAt,
        modifiedAt: createdAt,
        price,
        weight,
      });
      res.status(200).json({ message: 'Запись успешно создана', result });
    } catch (error) {
      next(error);
    }
  }

  static async updateMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      console.log(req.body);
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
