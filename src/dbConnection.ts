import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {
  LandingNav,
  MainNav,
  MenuItems,
  Categories,
  Users,
  Orders,
  PromoMenu,
  Days,
  BoolSettings,
  TextSettings,
} from './entities';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [
    LandingNav,
    MainNav,
    MenuItems,
    Categories,
    Users,
    Orders,
    PromoMenu,
    Days,
    BoolSettings,
    TextSettings],
});
export default AppDataSource;
