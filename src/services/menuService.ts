import { Repository } from 'typeorm';
import AppDataSource from '../dbConnection';
import { MenuItems } from '../entities';
import { TMenuItemCreateValues } from '../../types';

class MenuItemsService {
  dataSource: Repository<MenuItems>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(MenuItems);
  }

  async getAllMenuItems() {
    const result = await this.dataSource.find();
    return result;
  }

  async getMenuItemById(id:string) {
    const result = await this.dataSource.findOneBy({
      id,
    });
    return result;
  }

  async createMenuItem(values:TMenuItemCreateValues) {
    const menuIten = await this.dataSource.create(values);
    const result = await this.dataSource.save(menuIten);
    return result;
  }

  async deleteMenuItemById(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}
export default new MenuItemsService();
