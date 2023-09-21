import { Carts } from 'src/carts/entity/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  register_id: string;
  @Column({ length: 45 })
  full_name: string;
  @Column()
  register_email: string;
  @Column({ length: 1000 })
  password: string;
  @Column('tinyint')
  roles: number;

  @OneToMany(() => Carts, (carts) => carts.register)
  carts: Carts[];
}
