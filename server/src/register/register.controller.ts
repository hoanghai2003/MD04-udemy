import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { LogInDTO, SingUpDTO } from './dtos/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
  //http://localhost:3000/register/singup
  @Post('singup')
  async singUp(@Body() body: SingUpDTO) {
    return await this.registerService.singUp(body);
  }
  //http://localhost:3000/register/login
  @Post('login')
  async logIn(@Body() body: LogInDTO) {
    return await this.registerService.logIn(body);
  }
  @Get('allUser')
  async finAllUser() {
    return await this.registerService.findAllUser();
  }
}
