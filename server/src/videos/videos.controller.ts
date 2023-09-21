import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { VideosService } from './videos.service';
import { newVideo } from './dtos/videos.dto';

@Controller('videos')
export class VideosController {
  constructor(private videoService: VideosService) {}

  @Get('url/:id')
  async finOneVd(@Param('id') id: number) {
    try {
      return await this.videoService.finVideoId(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/:productId')
  async getVideosByProductId(
    @Param('productId') productId: number,
    @Res() res: Response,
  ) {
    try {
      const videos = await this.videoService.findVideosByProductId(
        productId,
        res,
      );
      return videos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post()
  async createVideo(@Body() newVideo: newVideo, @Res() res: Response) {
    console.log(newVideo);

    try {
      return await this.videoService.createVideo(newVideo, res);
    } catch (error) {
      console.log(error);
    }
  }
}
