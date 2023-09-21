import { IsNotEmpty } from 'class-validator';

export class newProduct {
  @IsNotEmpty()
  product_img: string;
  @IsNotEmpty()
  product_name: string;
  @IsNotEmpty()
  product_author: string;
  @IsNotEmpty()
  product_price: number;
  @IsNotEmpty()
  product_oldprice: number;
  @IsNotEmpty()
  product_star: number;
  @IsNotEmpty()
  product_vote: number;
  @IsNotEmpty()
  review_product: string;
  @IsNotEmpty()
  product_seller: number;
}
