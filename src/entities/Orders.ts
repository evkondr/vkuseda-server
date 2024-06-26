import {
  Entity, Column, PrimaryGeneratedColumn, Generated,
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

  @Column({ type: 'bigint' })
    @Generated('increment')
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

  @Column({ type: 'varchar', length: 15 })
  @IsDate()
    date: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
    isDone: boolean;
}
