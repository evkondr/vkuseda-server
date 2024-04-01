import { Repository } from 'typeorm';
import { Days } from '../entities';
import AppDataSource from '../dbConnection';

class CategoryService {
  dataSource:Repository<Days>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(Days);
  }

  async getAllDays() {
    const result = await this.dataSource.find();
    return result;
  }

  async addDay(name: string) {
    const day = await this.dataSource.create({ name });
    const result = await this.dataSource.save(day);
    return result;
  }

  async deletDay(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}
export default new CategoryService();
