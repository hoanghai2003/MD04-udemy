import { Product } from 'src/product/entity/product.entity';
import { Register } from 'src/register/entity/register.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn()
  carts_id: number;

  @Column('int')
  register_id: number;

  @Column('int')
  id_product: number;

  @Column('date')
  date_cart: string;

  @ManyToOne(() => Register, (register) => register.carts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'register_id' })
  register: Register;

  @ManyToOne(() => Product, (product) => product.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_product' })
  product: Product;
}
