import { NextFunction, Request, Response } from 'express';
import daysService from '../services/daysService';
import ApiError from '../utils/api-error';
import menuService from '../services/menuService';

export default class DailyMenuController {
  static async getAllDays(req:Request, res:Response, next:NextFunction) {
    try {
      const days = await daysService.getAllDays();
      const result = days.sort((a, b) => a.order - b.order);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async createDay(req:Request, res:Response, next:NextFunction) {
    try {
      const weekDays = [
        'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
      const name = req.body.name.toLowerCase();
      if (!weekDays.includes(name)) {
        return next(ApiError.BadRequest('Несуществующий день недели'));
      }
      const isAlreadyInDB = await daysService.findBy({ name });
      if (isAlreadyInDB.length > 0) {
        return next(ApiError.BadRequest('Такой день недели уже есть в базе'));
      }
      const dayOrder = weekDays.indexOf(name);
      const result = await daysService.createDay(name, dayOrder);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async getDayById(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const result = await daysService.getDayById(id);
      if (!result) {
        return next(ApiError.BadRequest('Нет записи с таким id'));
      }
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async getDaysByQuery(req:Request, res:Response, next:NextFunction) {
    try {
      const { name } = req.query;
      const result = await daysService.findBy({ name: name as string });
      if (result.length === 0) {
        return next(ApiError.BadRequest('Нет записи с таким именем'));
      }
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteDay(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const result = await daysService.deleteDayById(id);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  // This is about adding and delete daily menu item
  static async addMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const { dayId, menuItemId } = req.body;
      const menuItem = await menuService.getMenuItemById(menuItemId);
      const currentDay = await daysService.getDayById(dayId);
      if (!currentDay) {
        return next(ApiError.BadRequest('Нет записи дня с таким id'));
      }
      if (!menuItem) {
        return next(ApiError.BadRequest('Нет записи в меню с таким id'));
      }
      const isMenuItemAlreadyExists = currentDay.menuItems.find((item) => item.id === menuItemId);
      if (isMenuItemAlreadyExists) {
        return next(ApiError.BadRequest('Такая запись уже есть в меню'));
      }
      const result = await daysService.addMenuItem(dayId, menuItem);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async delMenuItem(req:Request, res:Response, next:NextFunction) {
    try {
      const { dayId, menuItemId } = req.body;
      const result = await daysService.delMenuItem(dayId, menuItemId);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }
}
