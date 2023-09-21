import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { cartsDto } from './dtos/carts.dto';
import { Carts } from './entity/cart.entity';

@Controller('carts')
export class CartsController {
  constructor(private cartService: CartsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      return await this.cartService.findAll(res);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/:id')
  async finOne(@Param('id') id: number, @Res() res: Response) {
    try {
      return await this.cartService.finOne(id, res);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/register/:id')
  async regisCart(@Param('id') id: number, @Res() res: Response) {
    try {
      return await this.cartService.regisCart(id, res);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/user/:id')
  async cartUser(@Param('id') id: number) {
    try {
      return await this.cartService.cartUser(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/post')
  async createCart(@Body() newCart: cartsDto, @Res() res: Response) {
    try {
      return await this.cartService.createCart(newCart, res);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('/delete-multi/cart')
  @HttpCode(HttpStatus.OK)
  async deleteCart(@Body('ids') ids: number[]): Promise<{ message: string }> {
    await this.cartService.deleteCart(ids);
    return { message: 'Đã xoá sản phẩm thành công.' };
  }

  @Delete('remove/:id')
  async deleteCartById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.cartService.deleteCartById(+id, res);
    } catch (error) {
      console.log(error);
    }
  }
}
