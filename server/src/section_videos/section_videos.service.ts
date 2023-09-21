import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section_video } from './entity/section_video.entity';

@Injectable()
export class SectionVideosService {
  constructor(
    @InjectRepository(Section_video)
    private SectionVideoEntity: Repository<Section_video>,
  ) {}

  async finAll(res): Promise<Section_video[]> {
    try {
      const data = await this.SectionVideoEntity.find();

      return res.json({ data });
    } catch (error) {
      console.log(error);
    }
  }
}
