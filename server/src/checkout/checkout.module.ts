import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkount } from './entity/checkout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkount])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
