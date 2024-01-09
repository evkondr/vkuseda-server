import { Request, Response } from 'express';
import moment from 'moment';
import AppDataSource from '../dbConnection';
import { MenuItems } from '../entities';

export default class MenuController {
  static async getMenuItems(req:Request, res:Response) {
    try {
      const menuItems = await AppDataSource.getRepository(MenuItems).find();
      return res.status(200).json(menuItems);
    } catch (error) {
      return res.status(200).send(error);
    }
  }

  static getMenuItemByID(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`get MenuItem by ${id}`);
  }

  static async createMenuItem(req:Request, res:Response) {
    try {
      const createdAt = moment().format('DD/MM/YY');
      const {
        name, ingredients, price, weight,
      } = req.body;
      const menuItem = await AppDataSource
        .getRepository(MenuItems)
        .create({
          name,
          ingredients,
          createdAt,
          modifiedAt: createdAt,
          price,
          weight,
        });
      const result = await AppDataSource.getRepository(MenuItems).save(menuItem);
      return res.status(200).json({ message: 'Запись успешно создана', result });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static updateMenuItem(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`update MenuItem ${id}`);
  }

  static deleteMenuItem(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`delete MenuItem ${id}`);
  }
}
