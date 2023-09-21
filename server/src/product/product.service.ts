import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(res): Promise<Product[]> {
    try {
      const findAll = await this.productRepository.find();

      return res.json({ findAll });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number, res): Promise<Product> {
    try {
      console.log(id);
      const findOne = await this.productRepository.find({
        where: { id_product: id },
      });
      console.log(findOne);

      return res.json(findOne);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'An error occurred',
      });
    }
  }

  async createProduct(newProduct, res) {
    console.log(newProduct, '<---------');

    try {
      const product = await this.productRepository.create({
        product_img: newProduct.product_img,

        product_name: newProduct.product_name,

        product_author: newProduct.product_author,

        product_price: newProduct.product_price,

        product_oldprice: newProduct.product_oldprice,

        product_star: newProduct.product_star,

        product_vote: newProduct.product_vote,

        review_product: newProduct.review_product,

        product_seller: newProduct.product_seller,
      });
      await this.productRepository.save(product);
      res.json({
        product,
        status: 200,
        message: 'Them thanh cong',
      });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create product.');
    }
  }

  async deleteProduct(id: number): Promise<string> {
    const product = await this.productRepository.find({
      where: { id_product: id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product);
    return 'Delete thành công';
  }

  async searchProducts(searchTerm: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where(
        'product.product_name LIKE :term OR product.product_author LIKE :term',
        { term: `%${searchTerm}%` },
      )
      .getMany();
  }
}
