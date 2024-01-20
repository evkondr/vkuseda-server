import { NextFunction, Request, Response } from 'express';
import categoryService from '../services/categoryService';
import ApiError from '../utils/api-error';

export default class CategoryController {
  // GET ALL
  static async getCategories(req:Request, res:Response, next: NextFunction) {
    try {
      const result = await categoryService.getAllCategories();
      res.json({ message: 'Успешно', result });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE BY ID
  static async getCategoryByID(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const result = await categoryService.getCategoryById(id);
      if (!result) {
        return next(ApiError.NotFound('Элемент не найден'));
      }
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  // CREATE
  static async createCategory(req:Request, res:Response, next:NextFunction) {
    try {
      const { name } = req.body;
      if (name.length < 1) {
        return next(ApiError.BadRequest('Значение не передано'));
      }
      const isExist = await categoryService.findCategoryByName(name);
      if (isExist) {
        return next(ApiError.BadRequest('Такая запись уже есть'));
      }
      const result = await categoryService.createCategory(name);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  // UPDATE ONE
  static async updateCategory(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!id || !name) {
        return next(ApiError.BadRequest('Значения id или name не переданы'));
      }
      const isExist = await categoryService.getCategoryById(id);
      if (!isExist) {
        return next(ApiError.NotFound('Элемент не найден'));
      }
      const result = categoryService.updateCategoryById(id, name);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }

  // DELETE ONE
  static async deleteCategory(req:Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.BadRequest('Значение не передано'));
      }
      const isExist = await categoryService.getCategoryById(id);
      if (!isExist) {
        return next(ApiError.NotFound('Элемент не найден'));
      }
      const result = await categoryService.deleteCategoryById(id);
      return res.json({ message: 'Успешно', result });
    } catch (error) {
      return next(error);
    }
  }
}
