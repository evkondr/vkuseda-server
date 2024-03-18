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
      const isExist = await promoMenuService.findByMenuItemId(menuItemId);
      if (isExist) {
        return next(ApiError.BadRequest('Запись уже существует'));
      }
      // If record not exists
      const result = await promoMenuService.addMenuItemToPromo(menuItem);
      // Then set menu item as promo for landing
      await menuService.updateMenuItemById(menuItemId, { isInPromo: true });
      return res.json({
        message: 'Запись успешно создана',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteMenuItemFromPromo(req:Request, res:Response, next:NextFunction) {
    try {
      const { menuItemId } = req.body;
      const promoItem = await promoMenuService.findByMenuItemId(menuItemId);
      if (!promoItem) {
        return next(ApiError.NotFound('Записи с таким id не найдена'));
      }
      // If record exists
      const result = await promoMenuService.deleteById(promoItem.id);
      // Then change menu item as not in promo for landing
      await menuService.updateMenuItemById(menuItemId, { isInPromo: false });
      return res.json({
        message: 'Запись успешно удалена',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
export default PromoMenuController;
