import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Length,
  IsDate,
  IsInt,
  IsBoolean,
} from 'class-validator';

@Entity()
export default class Orders {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @PrimaryGeneratedColumn('increment')
    orderNumber: number;

  @Column({ type: 'varchar', length: 30 })
    @Length(2, 30)
    customerName: string;

  @Column({ type: 'varchar', length: 100 })
    @Length(2, 100)
    customerAddress: string;

  @Column({ type: 'varchar', length: 12 })
    @Length(10, 12)
    customerPhone: string;

  @Column('text')
    comment: string;

  @Column('text')
    menuItems: string;

  @Column({ type: 'double precision' })
    @IsInt()
    totalPrice: number;

  @Column('date')
  @IsDate()
    date: string;

  @Column('boolean')
  @IsBoolean()
    isDone: boolean;
}
