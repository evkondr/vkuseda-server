import { Repository } from 'typeorm';
import AppDataSource from '../dbConnection';
import { MenuItems } from '../entities';
import { TMenuItemCreateValues, TUpdateValues } from '../../types';

class MenuItemsService {
  dataSource: Repository<MenuItems>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(MenuItems);
  }

  async getAllMenuItems() {
    const result = await this.dataSource.find({
      relations: {
        category: true,
        createdBy: true,
      },
    });
    return result;
  }

  async getMenuItemById(id:string) {
    const result = await this.dataSource.findOne({
      relations: {
        category: true,
        createdBy: true,
      },
      where: {
        id,
      },
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

  async updateMenuItemById(id:string, values:TUpdateValues) {
    const result = await this.dataSource.update(id, values);
    return result;
  }
}
export default new MenuItemsService();
