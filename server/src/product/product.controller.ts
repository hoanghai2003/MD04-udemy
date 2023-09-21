import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { newProduct } from './dtos/product.dto';
import { Product } from './entity/product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  findAll(@Res() res: Response) {
    return this.productService.findAll(res);
  }

  @Get('/:id')
  findOne(@Param('id') id: number, @Res() res: Response) {
    return this.productService.findOne(id, res);
  }

  @Post('/single')
  createProduct(@Body() newProduct: newProduct, @Res() res: Response) {
    try {
      return this.productService.createProduct(newProduct, res);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    try {
      const result = await this.productService.deleteProduct(id);
      return { mess: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Product not found');
      }
      throw new Error('An error occurred');
    }
  }

  @Get('/search/:q')
  async search(
    @Param('q') searchTerm: string,
  ): Promise<{ status: string; product: Product[] }> {
    try {
      const products = await this.productService.searchProducts(searchTerm);
      return {
        status: 'success',
        product: products,
      };
    } catch (error) {
      return error;
    }
  }
}
