import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
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
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(values.password, salt);
    const user = await this.dataSource.create({ ...values, password: hashPassword });
    const result = await this.dataSource.save(user);
    return result;
  }

  // async login(login:string, password:string) {
  //   const user = await f
  // }
  async deleteUserById(id:string) {
    const result = await this.dataSource.delete(id);
    return result;
  }
}
export default new AuthService();
