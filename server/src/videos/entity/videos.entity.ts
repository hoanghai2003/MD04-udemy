import { Section_video } from 'src/section_videos/entity/section_video.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Videos {
  @PrimaryGeneratedColumn()
  id_video: number;

  @Column()
  id_section: number;

  @Column()
  id_product: number;

  @Column('text')
  video: string;
  @Column('text')
  name_video: string;

  @ManyToOne(() => Section_video, (sectionVd) => sectionVd.videos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_section' })
  sectionVd: Section_video;
}
