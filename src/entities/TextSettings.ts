import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export default class TextSettings {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  @Length(2, 30)
    name: string;

  @Column({ type: 'varchar', default: '' })
    value: string;
}
