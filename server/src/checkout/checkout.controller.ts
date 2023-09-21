import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Checkount } from './entity/checkout.entity';
import { CheckoutDto } from './dtos/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Get('/:id')
  async checkProduct(@Param('id') id: number): Promise<any> {
    try {
      const products = await this.checkoutService.checkProduct(id);
      return products;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('An error occurred while fetching products.');
    }
  }

  @Get('product/:id')
  async getProduct(@Param('id') id: number) {
    try {
      return await this.checkoutService.getProduct(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/add-multiple-records')
  async createMultipleCheckouts(@Body() checkouts: Checkount[]): Promise<any> {
    console.log(checkouts, '<-----------');

    try {
      await this.checkoutService.createMultipleCheckouts(checkouts);
      return { message: 'Records inserted successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'Internal server error' };
    }
  }
}
