import { Carts } from 'src/carts/entity/cart.entity';
import { Checkount } from 'src/checkout/entity/checkout.entity';
import { Product_descriptions } from 'src/product_descriptions/entity/product_descriptions.entity';
import { Section_video } from 'src/section_videos/entity/section_video.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id_product: number;
  @Column('text')
  product_img: string;
  @Column()
  product_name: string;
  @Column({ length: 1050 })
  product_author: string;
  @Column('float')
  product_price: number;
  @Column('float')
  product_oldprice: number;
  @Column()
  product_star: number;
  @Column()
  product_vote: number;
  @Column({ length: 255 })
  review_product: string;
  @Column('tinyint')
  product_seller: number;
  // @Column()
  // create_date: string;
  // @Column('int')
  // register_id: number;

  @OneToMany(() => Carts, (cart) => cart.product)
  cart: Carts;

  @OneToMany(() => Product_descriptions, (product_des) => product_des.product)
  product_des: Product_descriptions;

  @OneToMany(() => Checkount, (checkout) => checkout.id_product)
  checkouts: Checkount[];

  @OneToMany(() => Section_video, (sectionvd) => sectionvd.id_section)
  sectionvd: Section_video[];
}
