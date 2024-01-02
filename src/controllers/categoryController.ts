import { Request, Response } from 'express';
import { Categories } from '../entities';
import AppDataSource from '../dbConnection';

export default class CategoryController {
  static async getCategories(req:Request, res:Response) {
    try {
      const categories = await AppDataSource.getRepository(Categories).find();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getCategoryByID(req:Request, res:Response) {
    try {
      const { id } = req.params;
      const result = await AppDataSource.getRepository(Categories).findOneBy({
        id,
      });
      if (!result) {
        return res.status(404).send(`There is no records with this id - ${id}`);
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async createCategory(req:Request, res:Response) {
    try {
      const { name } = req.body;
      const newCategory = await AppDataSource.getRepository(Categories).create({ name });
      const result = await AppDataSource.getRepository(Categories).save(newCategory);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async updateCategory(req:Request, res:Response) {
    try {
      const { id } = req.params;
      const { updates } = req.body;
      const categoryItem = await AppDataSource.getRepository(Categories).findOneBy({
        id,
      });
      if (!categoryItem) {
        return res.status(404).send(`There is no records with this id - ${id}`);
      }
      const result = await AppDataSource.getRepository(Categories).update(id, updates);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async deleteCategory(req:Request, res:Response) {
    try {
      const { id } = req.params;
      const isExsist = await AppDataSource.getRepository(Categories).findOneBy({
        id,
      });
      if (!isExsist) {
        return res.status(404).send(`There is no records with this id - ${id}`);
      }
      const result = await AppDataSource.getRepository(Categories).delete(id);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
