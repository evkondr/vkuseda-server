import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import {
  Length, IsInt, IsDate, IsBoolean,
} from 'class-validator';
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

  @Column({ type: 'varchar', nullable: true })
    image: string | null;

  @Column({ type: 'double precision' })
  @IsInt()
    price: number;

  @Column('smallint')
  @IsInt()
    weight: number;

  @Column({ type: 'varchar', length: 15 })
  @IsDate()
    createdAt: Date;

  @Column({ type: 'varchar', length: 15 })
  @IsDate()
    modifiedAt: Date;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
    isInPromo: boolean;

  @ManyToOne(() => Categories, (category) => category.menuItems, {
    nullable: true,
  })
    category: Categories;

  @ManyToOne(() => Users, (user) => user.menuItems, {
    nullable: true,
  })
    createdBy: Users;
}
