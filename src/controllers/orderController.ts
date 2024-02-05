/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import mailService from '../services/mailService';
import ApiError from '../utils/api-error';
import orderService from '../services/orderService';

export default class orderController {
  static async sendOrderByEmail(req:Request, res:Response, next:NextFunction) {
    try {
      const {
        customerName, customerPhone, customerAddress, cart, totalPrice, comment,
      } = req.body;
      if (!(customerName && customerPhone && customerAddress && cart && totalPrice)) {
        return next(ApiError.BadRequest('Не все данны переданы для заказа'));
      }
      const customerInfo = `<p>Имя: ${customerName}</p><p>Телефон: ${customerPhone}</p><p>Адрес: ${customerAddress}</p>`;
      const orderDate = moment().format('DD/MM/YY');
      let cartInfo = '';
      cart.forEach((element:{name:string, count:number}, index:number) => {
        cartInfo += `<p>${index + 1}. ${element.name} - ${element.count} шт.</p>`;
      });
      cartInfo += `<p>Заказ на сумму: ${totalPrice} руб.</p>`;
      const messageBody = customerInfo + cartInfo;
      const result = await orderService.createOrder({
        customerName,
        customerAddress,
        customerPhone,
        menuItems: JSON.stringify(cart),
        totalPrice,
        date: orderDate,
        comment,
        isDone: false,
      });
      const mailInfo = await mailService.sendOrder(result.orderNumber, orderDate, messageBody);
      return res.json({
        message: 'Заказ успешно отправлен',
        result,
        mailInfo,
      });
    } catch (error) {
      return next(error);
    }
  }
}
