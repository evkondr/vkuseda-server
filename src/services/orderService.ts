import { Repository } from 'typeorm';
import { Orders } from '../entities';
import AppDataSource from '../dbConnection';
import { TOrderCreateValues } from '../../types';

class OrderService {
  dataSource: Repository<Orders>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(Orders);
  }

  async getAll() {
    const result = await this.dataSource.find();
    return result;
  }

  async getOneById(id:string) {
    const result = await this.dataSource.findOneBy({
      id,
    });
    return result;
  }

  async createOrder(orderData:TOrderCreateValues) {
    const order = await this.dataSource.create(orderData);
    const result = await this.dataSource.save(order);
    return result;
  }

  async editOrder(id:string, updates: Partial<TOrderCreateValues>) {
    const result = await this.dataSource.update(id, updates);
    return result;
  }

  async deleteOneById(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}
export default new OrderService();
