import { Product } from 'src/product/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product_descriptions {
  @PrimaryGeneratedColumn()
  product_descriptions_id: number;
  @Column('text')
  product_descriptionscol: string;
  @Column('int')
  id_product: number;
  @Column('date')
  created_date: string;

  @ManyToOne(() => Product, (product) => product.product_des)
  product: Product;
}
