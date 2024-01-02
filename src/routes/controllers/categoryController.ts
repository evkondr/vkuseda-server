import { Request, Response } from 'express';

export default class CategoryController {
  static getCategories(req:Request, res:Response) {
    return res.send('get categories');
  }

  static getCategoryByID(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`get category by ${id}`);
  }

  static createCategory(req:Request, res:Response) {
    return res.send('create category');
  }

  static updateCategory(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`update get category ${id}`);
  }

  static deleteCategory(req:Request, res:Response) {
    const { id } = req.params;
    return res.send(`delete category by ${id}`);
  }
}
