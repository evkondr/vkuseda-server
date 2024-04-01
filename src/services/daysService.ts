import { Repository } from 'typeorm';
import { Days } from '../entities';
import AppDataSource from '../dbConnection';
import { Day } from '../../types';

class DaysService {
  private dataSource:Repository<Days>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(Days);
  }

  async getAllDays() {
    const result = await this.dataSource.find({
      relations: {
        menuItems: true,
      },
    });
    return result;
  }

  async createDay(name: string) {
    const day = await this.dataSource.create({ name });
    const result = await this.dataSource.save(day);
    return result;
  }

  async getDayById(id:string) {
    const result = await this.dataSource.findOne({
      relations: {
        menuItems: true,
      },
      where: {
        id,
      },
    });
    return result;
  }

  async findBy(value: Partial<Day>) {
    const result = await this.dataSource.findBy(value);
    return result;
  }

  async deleteDayById(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}
export default new DaysService();
