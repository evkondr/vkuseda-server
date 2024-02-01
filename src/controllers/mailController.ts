import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import moment from 'moment';

export default class mailController {
  static async sendOrderByEmail(req:Request, res:Response, next:NextFunction) {
    try {
      const { customer, phone, address } = req.body;
      const htmlMailBody = `<p>Имя: ${customer}</p><p>Телефон: ${phone}</p><p>Адрес: ${address}</p>`;
      const orderNumber = Date.now();
      const orderDate = moment().format('DD/MM/YY');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT as number | undefined,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: 'order@vkuseda-nn.ru', // sender address
        to: process.env.SMTP_TO, // list of receivers
        subject: `Тестовый заказ №${orderNumber} от ${orderDate} на сайте vkuseda-nn.ru`, // Subject line
        html: htmlMailBody, // html body
      });
      return res.json(info);
    } catch (error) {
      return next(error);
    }
  }
}
