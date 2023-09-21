import { Product } from 'src/product/entity/product.entity';
import { Videos } from 'src/videos/entity/videos.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Section_video {
  @PrimaryGeneratedColumn()
  id_section: number;
  @Column('int')
  id_product: number;
  @Column()
  section: number;
  // @Column()
  // id_video: number;

  @ManyToOne(() => Product, (product) => product.sectionvd, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @OneToMany(() => Videos, (videos) => videos.id_video)
  videos: Videos[];
}
