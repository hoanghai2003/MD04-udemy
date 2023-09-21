import { Module } from '@nestjs/common';
import { ProductDescriptionsService } from './product_descriptions.service';
import { ProductDescriptionsController } from './product_descriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_descriptions } from './entity/product_descriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product_descriptions])],
  providers: [ProductDescriptionsService],
  controllers: [ProductDescriptionsController],
})
export class ProductDescriptionsModule {}
