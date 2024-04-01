import { NextFunction, Request, Response } from 'express';
import daysService from '../services/daysService';
import ApiError from '../utils/api-error';

export default class DaysControlle {
  static async getAllDays(req:Request, res:Response, next:NextFunction) {
    try {
      const result = await daysService.getAllDays();
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async createDay(req:Request, res:Response, next:NextFunction) {
    try {
      const weekDays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
      const name = req.body.name.toLowerCase();
      if (!weekDays.includes(name)) {
        return next(ApiError.BadRequest('Несуществующий день недели'));
      }
      const isAlreadyInDB = await daysService.findBy({ name });
      if (isAlreadyInDB.length > 0) {
        return next(ApiError.BadRequest('Такой день недели уже есть в базе'));
      }
      const result = await daysService.createDay(name);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  static async getDayById(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const isExist = await daysService.findBy({ id });
      if (!isExist) {
        return next(ApiError.BadRequest('Нет записи с таким id'));
      }
      const result = await daysService.getDayById(id);
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
}
