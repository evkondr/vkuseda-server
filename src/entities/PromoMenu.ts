import {
  Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';
import MenuItems from './MenuItems';

@Entity()
export default class PromoMenu {
  @PrimaryGeneratedColumn('uuid')
    id:string;

  @OneToOne(() => MenuItems)
  @JoinColumn()
    menuItem: MenuItems;
}
