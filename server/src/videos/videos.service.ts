import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Videos } from './entity/videos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Videos)
    private readonly videoRepository: Repository<Videos>,
  ) {}

  async finVideoId(id: number) {
    try {
      const videos = await this.videoRepository.find({
        where: { id_video: id },
      });

      return { data: videos };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findVideosByProductId(productId: number, res) {
    console.log(productId);

    try {
      const videodata = await this.videoRepository.find({
        where: { id_product: productId },
      });

      return res.json(videodata);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const videos = await this.videoRepository
    //     .createQueryBuilder('v')
    //     .select([
    //       'v.id_product',
    //       'v.video',
    //       'v.id_video',
    //       'sv.section',
    //       'sv.id_product',
    //     ])
    //     .innerJoin('v.sectionVd', 'sv', 'sv.id_section = v.id_section')
    //     .innerJoin('sv.product', 'p', 'p.id_product = v.id_product')
    //     .where('sv.id_product = :id_product', { id_product: productId })
    //     .getMany();

    //   // console.log(videos, '<---------123');

    //   const datavd = videos.map((vd) => {
    //     return {
    //       video: vd.video,
    //       id_video: vd.id_video,
    //       ...vd.sectionVd,
    //     };
    //   });
    //   console.log(datavd);

    //   return { data: datavd };
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  }

  async createVideo(newVideo, res) {
    console.log(newVideo);

    try {
      const video = await this.videoRepository.create({
        id_section: newVideo.id_section,
        id_product: newVideo.id_product,
        video: newVideo.video,
        name_video: newVideo.name_video,
      });

      await this.videoRepository.save(video);
      res.json({
        video,
        status: 200,
        message: 'Them thanh cong',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
