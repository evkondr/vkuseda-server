import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { Length, IsInt, IsDate } from 'class-validator';
import Categories from './Categories';
import Users from './Users';

@Entity()
export default class MenuItems {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 50 })
  @Length(2, 50)
    name: string;

  @Column('text')
    ingredients: string;

  @Column('varchar')
    image: string;

  @Column({ type: 'double precision' })
  @IsInt()
    price: number;

  @Column('smallint')
  @IsInt()
    weghit: number;

  @Column('date')
  @IsDate()
    createdAt: Date;

  @Column()
  @IsDate()
    modifiedAt: Date;

  @ManyToOne(() => Categories, (category) => category.menuItems)
    category: Categories;

  @ManyToOne(() => Users, (user) => user.menuItems)
    createdBy: Users;
}
