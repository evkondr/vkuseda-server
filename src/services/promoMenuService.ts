import { Repository } from 'typeorm';
import { MenuItems, PromoMenu } from '../entities';
import AppDataSource from '../dbConnection';

class PromoMenuService {
  private dataSource: Repository<PromoMenu>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(PromoMenu);
  }

  async getAll() {
    const result = await this.dataSource.find({
      relations: {
        menuItem: true,
      },
    });
    return result;
  }

  async findById(id:string) {
    const result = await this.dataSource.findOneBy({
      id,
    });
    return result;
  }

  async addMenuItemToPromo(menuItem:MenuItems) {
    const promoItem = await this.dataSource.create({
      menuItem,
    });
    const result = await this.dataSource.save(promoItem);
    return result;
  }

  async deleteById(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}

export default new PromoMenuService();
