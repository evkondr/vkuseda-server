import { Request, Response, NextFunction } from 'express';
import menuService from '../services/menuService';
import ApiError from '../utils/api-error';
import promoMenuService from '../services/promoMenuService';

class PromoMenuController {
  static async getAllPromos(req:Request, res:Response, next:NextFunction) {
    try {
      const result = await promoMenuService.getAll();
      return res.json({
        message: 'Данные получены успешно',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async addMenuItemToPromo(req:Request, res:Response, next:NextFunction) {
    try {
      const { menuItemId } = req.body;
      const menuItem = await menuService.getMenuItemById(menuItemId);
      if (!menuItem) {
        return next(ApiError.NotFound('Запись с таким id не найдена'));
      }
      const result = await promoMenuService.addMenuItemToPromo(menuItem);
      return res.json({
        message: 'Запись успешно создана',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static deleteMenuItemFromPromo() {
    // TODO
  }
}
export default PromoMenuController;
