/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
// import nodemailer from 'nodemailer';
// import moment from 'moment';

export default class orderController {
  static async sendOrderByEmail(req:Request, res:Response, next:NextFunction) {
    try {
      // const { customer, phone, address } = req.body;
      // const htmlMailBody = `<p>Имя: ${customer}</p><p>Телефон: ${phone}</p><p>Адрес: ${address}</p>`;
      // const orderNumber = Date.now();
      // const orderDate = moment().format('DD/MM/YY');
      return res.json();
    } catch (error) {
      return next(error);
    }
  }
}
