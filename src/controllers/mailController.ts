import { Request, Response, NextFunction } from 'express';
import mailService from '../services/mailService';
import ApiError from '../utils/api-error';

export default class MailControeller {
  static async sendEmail(req:Request, res:Response, next:NextFunction) {
    try {
      const { name, phoneNumber, message } = req.body;
      if (!name && !phoneNumber) {
        return next(ApiError.BadRequest('Не все данные переданы'));
      }
      const messageBody = `<p>Имя: ${name}</p><p>Номер: ${phoneNumber}</p><p>Сообщение: ${message}</p>`;
      const result = await mailService.sendEmailRequest(messageBody);
      return res.json({
        message: 'Запрос успешно отправлен',
        result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
