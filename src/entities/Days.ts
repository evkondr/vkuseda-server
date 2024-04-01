import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Days {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('varchar', { length: 11 })
    name: string;
}
