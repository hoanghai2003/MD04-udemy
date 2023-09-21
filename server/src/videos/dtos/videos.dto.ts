import { IsNotEmpty } from 'class-validator';

export class newVideo {
  @IsNotEmpty()
  id_section: number;

  @IsNotEmpty()
  id_product: number;

  @IsNotEmpty()
  video: string;
  @IsNotEmpty()
  name_video: string;
}
