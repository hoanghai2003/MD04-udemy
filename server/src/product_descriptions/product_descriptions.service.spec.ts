import { Test, TestingModule } from '@nestjs/testing';
import { ProductDescriptionsService } from './product_descriptions.service';

describe('ProductDescriptionsService', () => {
  let service: ProductDescriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductDescriptionsService],
    }).compile();

    service = module.get<ProductDescriptionsService>(ProductDescriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
