import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import {
  Length,
  IsEmail,
  IsDate,
} from 'class-validator';
import MenuItems from './MenuItems';
import { UserRole } from '../../types';

@Entity()
export default class Users {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  @Length(2, 20)
    login: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  @IsEmail()
    email: string;

  @Column({ type: 'varchar', length: 20 })
  @Length(6, 20)
    password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
    role: string;

  @Column('date')
  @IsDate()
    createdAt: Date;

  @OneToMany(() => MenuItems, (menuItem) => menuItem.createdBy)
    menuItems: MenuItems[];
}
