import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  author_id: number;
  @Column()
  name_author: string;
  @Column()
  roles: number;
}
