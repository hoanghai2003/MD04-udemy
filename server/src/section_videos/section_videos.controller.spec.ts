import { Test, TestingModule } from '@nestjs/testing';
import { SectionVideosController } from './section_videos.controller';

describe('SectionVideosController', () => {
  let controller: SectionVideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionVideosController],
    }).compile();

    controller = module.get<SectionVideosController>(SectionVideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
