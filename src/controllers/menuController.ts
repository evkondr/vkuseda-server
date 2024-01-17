import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { Categories } from '../entities';
import menuService from '../services/menuService';

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
      const cat = new Categories();
      cat.name = 'Супы';
      const result = await menuService.createMenuItem({
        image: file?.filename || null,
        name,
        ingredients,
        createdById: '1',
        categoryId: cat,
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

  static updateMenuItem(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`update MenuItem ${id}`);
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
