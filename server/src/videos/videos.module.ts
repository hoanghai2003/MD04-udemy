import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Videos } from './entity/videos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Videos])],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
