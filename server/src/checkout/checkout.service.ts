import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Checkount } from './entity/checkout.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entity/product.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkount) private checkoutEntity: Repository<Checkount>,
  ) {}

  //post
  async createMultipleCheckouts(checkouts: Checkount[]): Promise<void> {
    console.log(checkouts, '<--------123');

    const connection = this.checkoutEntity.manager.connection;
    const queryRunner = connection.createQueryRunner();

    try {
      // Start a transaction
      await queryRunner.startTransaction();

      const values = checkouts.map((checkout) => ({
        checkout_address: checkout.checkout_address,
        checkout_name: checkout.checkout_name,
        checkout_number: checkout.checkout_number,
        id_product: checkout.id_product,
        register_id: checkout.register_id,
      }));

      console.log(values);

      // Execute the query within the transaction
      await queryRunner.manager.getRepository(Checkount).save(values); // Assuming the entity is named 'Checkout' not 'Checkount'
      console.log('Success');

      // Commit the transaction
      await queryRunner.commitTransaction();
    } catch (err) {
      // Rollback the transaction in case of an error
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // Release the queryRunner
      await queryRunner.release();
    }
  }

  //get
  async checkProduct(id: number): Promise<any> {
    try {
      const products = await this.checkoutEntity.find({
        where: { register_id: id },
        relations: ['id_product'],
      });
      console.log(products, '<------------122');

      const data = products.map((checkout) => {
        return {
          register_id: checkout.register_id,
          ...checkout.id_product,
        };
      });

      return {
        message: 'ssucess',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching products.');
    }
  }

  async getProduct(id): Promise<any> {
    try {
      const product = await this.checkoutEntity.find({
        where: { id_product: id },
      });
      return {
        message: 'successs',
        data: product,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
