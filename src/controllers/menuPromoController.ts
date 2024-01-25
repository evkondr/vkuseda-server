import { Request, Response, NextFunction } from 'express';

class MenuPromoController {
  static getPromoItems(req:Request, res:Response, next:NextFunction) {
    try {
      res.json({
        message: 'Успешно',
        result: [],
      });
    } catch (error) {
      next(error);
    }
  }
}

export default MenuPromoController;
