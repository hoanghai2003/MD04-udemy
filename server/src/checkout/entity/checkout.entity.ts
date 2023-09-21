import { Product } from 'src/product/entity/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Checkount {
  @PrimaryGeneratedColumn()
  checkout_id: number;
  @Column()
  checkout_address: number;
  @Column({ length: 255 })
  checkout_name: string;
  @Column({ length: 15 })
  checkout_number: string;
  @Column()
  register_id: number;

  @ManyToOne(() => Product, (product) => product.checkouts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_product' })
  id_product: Product;
}
