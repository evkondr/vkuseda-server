import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export default class BoolSettings {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 30 })
  @Length(2, 30)
    name: string;

  @Column({ type: 'boolean' })
    value: boolean;
}
