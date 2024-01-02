import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class LandingNav {
  @PrimaryGeneratedColumn('uuid')
    id: number;

  @Column()
    name: string;

  @Column()
    link: string;
}
