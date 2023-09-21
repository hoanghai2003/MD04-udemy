import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingUpDTO {
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  register_email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roles: number;
}

export class LogInDTO {
  @IsEmail()
  @IsNotEmpty()
  register_email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
