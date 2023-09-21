import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './entity/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Register])],
  providers: [RegisterService],
  controllers: [RegisterController],
})
export class RegisterModule {}
