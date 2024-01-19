import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Length,
  IsDate,
} from 'class-validator';

@Entity()
export default class Orders {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 30 })
  @Length(2, 30)
    customerName: string;

  @Column({ type: 'varchar', length: 100 })
  @Length(2, 100)
    customerAddress: string;

  @Column('text')
    description: string;

  @Column('date')
  @IsDate()
    date: Date;
}
