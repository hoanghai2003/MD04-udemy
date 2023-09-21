import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { SectionVideosService } from './section_videos.service';

@Controller('section-videos')
export class SectionVideosController {
  constructor(private SectionVideoService: SectionVideosService) {}

  @Get()
  async finAll(@Res() res: Response) {
    try {
      return await this.SectionVideoService.finAll(res);
    } catch (error) {
      console.log(error);
    }
  }
}
