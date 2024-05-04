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

  static async updateSettings(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      if (value === 'false' || value === 'true') {
        const result = await settingsService.updateSettingsOption('bool', id, value);
        return res.json({
          message: 'Запись успешно обновлена',
          result,
        });
      }
      const result = await settingsService.updateSettingsOption('text', id, value);
      return res.json({
        message: 'Запись успешно обновлена',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async bulkUpdateSettings(req:Request, res:Response, next:NextFunction) {
    try {
      const settings = req.body;
      const options = [];
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const name in settings) {
        let type: 'bool' | 'text' = 'text';
        if (settings[name] === false || settings[name] === true) {
          type = 'bool';
        }
        options.push(settingsService.findSettingsOptionAndUpdate(type, name, settings[name]));
      }
      const result = await Promise.all(options);
      return res.json({
        message: 'Запись успешно обновлена',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
