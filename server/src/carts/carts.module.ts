import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carts])],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
