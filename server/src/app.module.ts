import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './carts/entity/cart.entity';
import { CartsModule } from './carts/carts.module';
import { CheckoutModule } from './checkout/checkout.module';
import { Checkount } from './checkout/entity/checkout.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';
import { ProductDescriptionsModule } from './product_descriptions/product_descriptions.module';
import { Product_descriptions } from './product_descriptions/entity/product_descriptions.entity';
import { RegisterModule } from './register/register.module';
import { Register } from './register/entity/register.entity';
import { SectionVideosModule } from './section_videos/section_videos.module';
import { Section_video } from './section_videos/entity/section_video.entity';
import { VideosModule } from './videos/videos.module';
import { Videos } from './videos/entity/videos.entity';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/entity/author.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'udemy_nestjs',
      entities: [
        Carts,
        Checkount,
        Product,
        Product_descriptions,
        Register,
        Section_video,
        Videos,
        Author,
      ],
      synchronize: true,
    }),
    CartsModule,
    CheckoutModule,
    ProductModule,
    ProductDescriptionsModule,
    RegisterModule,
    SectionVideosModule,
    VideosModule,
    AuthorsModule,
  ],
})
export class AppModule {}
