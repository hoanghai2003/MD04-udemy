import { Module } from '@nestjs/common';
import { SectionVideosService } from './section_videos.service';
import { SectionVideosController } from './section_videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section_video } from './entity/section_video.entity';
import { Videos } from 'src/videos/entity/videos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section_video])],
  providers: [SectionVideosService],
  controllers: [SectionVideosController],
})
export class SectionVideosModule {}
