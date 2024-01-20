import { Repository } from 'typeorm';
import { Categories } from '../entities';
import AppDataSource from '../dbConnection';

class CategoryService {
  dataSource:Repository<Categories>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(Categories);
  }

  async getAllCategories() {
    const result = await this.dataSource.find();
    return result;
  }

  async getCategoryById(id:string) {
    const result = await this.dataSource.findOneBy({
      id,
    });
    return result;
  }

  async findCategoryByName(name:string) {
    const category = await this.dataSource.findOneBy({
      name,
    });
    return category;
  }

  async createCategory(name:string) {
    const category = await this.dataSource.create({ name });
    const result = await this.dataSource.save(category);
    return result;
  }

  async updateCategoryById(id:string, value:string) {
    const result = await this.dataSource.update(id, { name: value });
    return result;
  }

  async deleteCategoryById(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}
export default new CategoryService();
