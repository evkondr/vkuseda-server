import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import MenuItems from './MenuItems';

@Entity()
export default class Categories {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 30 })
  @Length(2, 30)
    name: string;

  @OneToMany(() => MenuItems, (menuItem) => menuItem.category)
    menuItems: MenuItems[];
}
