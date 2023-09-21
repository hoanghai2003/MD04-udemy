import { Test, TestingModule } from '@nestjs/testing';
import { SectionVideosService } from './section_videos.service';

describe('SectionVideosService', () => {
  let service: SectionVideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionVideosService],
    }).compile();

    service = module.get<SectionVideosService>(SectionVideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
