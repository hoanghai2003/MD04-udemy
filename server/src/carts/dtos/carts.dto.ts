import { IsNotEmpty } from 'class-validator';

export class cartsDto {
  @IsNotEmpty()
  register_id: number;
  @IsNotEmpty()
  id_product: number;
  @IsNotEmpty()
  date_cart: string;
}
