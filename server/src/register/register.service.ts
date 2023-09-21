import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './entity/register.entity';
import { Repository } from 'typeorm';
import { LogInDTO, SingUpDTO } from './dtos/register.dto';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private registerRepository: Repository<Register>,
  ) {}

  async singUp(singUpDto: SingUpDTO) {
    try {
      const { full_name, register_email, password, roles } = singUpDto;

      const checkEmail = await this.registerRepository.findOne({
        where: { register_email: singUpDto.register_email },
      });
      if (checkEmail) {
        throw new BadRequestException('email đã tồn tại ');
      }
      const passwordHash = await argon2.hash(password);

      const newUser = this.registerRepository.create({
        full_name,
        register_email,
        password: passwordHash,
        roles,
      });

      await this.registerRepository.save(newUser);
      return {
        newUser,
        status: 201,
        message: 'Đăng kí thành công',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Email already exists');
    }
  }

  async logIn(loginDto: LogInDTO) {
    try {
      const { register_email, password } = loginDto;

      const user = await this.registerRepository.findOne({
        where: { register_email },
      });

      if (!user) {
        throw new BadRequestException('Email hoặc mật khẩu không đúng');
      }

      const isMatch = await argon2.verify(user.password, password);

      if (!isMatch) {
        throw new BadRequestException('Email hoặc mật khẩu không đúng');
      }

      const token = jwt.sign({ id: user.register_id }, 'your_secret_key', {
        expiresIn: '1h',
      });
      return {
        status: 200,
        message: 'Đăng nhập thành công',
        data: user,
        token,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Đã xảy ra lỗi trong quá trình xử lý');
    }
  }

  async findAllUser(): Promise<Register[]> {
    try {
      return await this.registerRepository.find();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Đã xảy ra lỗi trong quá trình xử lý');
    }
  }
}
