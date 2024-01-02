import { Request, Response } from 'express';

export default class MenuController {
  static getMenuItems(req:Request, res:Response) {
    return res.send('get MenuItems');
  }

  static getMenuItemByID(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`get MenuItem by ${id}`);
  }

  static createMenuItem(req:Request, res:Response) {
    return res.send('create MenuItem');
  }

  static updateMenuItem(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`update MenuItem ${id}`);
  }

  static deleteMenuItem(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`delete MenuItem ${id}`);
  }
}
