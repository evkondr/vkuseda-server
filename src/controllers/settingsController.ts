import { Request, Response, NextFunction } from 'express';
import settingsService from '../services/settingsService';

export default class SettingsController {
  static async getAllSettings(req:Request, res:Response, next:NextFunction) {
    try {
      const result = await settingsService.getAllSettings();
      return res.json({
        message: 'Данные получены успешно',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
