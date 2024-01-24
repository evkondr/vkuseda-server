import { Repository } from 'typeorm';
import AppDataSource from '../dbConnection';
import { Users } from '../entities';
import { TUserCreateValues } from '../../types';

class AuthService {
  dataSource: Repository<Users>;

  constructor() {
    this.dataSource = AppDataSource.getRepository(Users);
  }

  async getAllUsers() {
    const result = await this.dataSource.find();
    return result;
  }

  async findUserByValue(prop: string, value:string) {
    const result = await this.dataSource.findOne({
      where: {
        [prop]: value,
      },
    });
    return result;
  }

  async createUser(values:TUserCreateValues) {
    const user = await this.dataSource.create({ ...values });
    const result = await this.dataSource.save(user);
    return result;
  }

  async deleteUserById(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}
export default new AuthService();
