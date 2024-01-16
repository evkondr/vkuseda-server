import { Repository } from 'typeorm';
import AppDataSource from '../dbConnection';
import { MenuItems } from '../entities';

class MenuItemsService {
  dataSource: Repository<MenuItems>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(MenuItems);
  }

  async getAllMenuItems() {
    const result = await this.dataSource.find();
    return result;
  }
}
export default new MenuItemsService();
