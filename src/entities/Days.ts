import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,
} from 'typeorm';
import MenuItems from './MenuItems';

@Entity()
export default class Days {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 11 })
    name: string;

  @ManyToMany(() => MenuItems)
  @JoinTable()
    menuItems: MenuItems[];
}
