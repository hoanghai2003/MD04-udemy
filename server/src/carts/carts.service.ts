import { cartsDto } from './dtos/carts.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from './entity/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  // constructor(@InjectRepository(Carts) private cartEntity: Repository<Carts>) {}
  constructor(
    @InjectRepository(Carts)
    private cartEntity: Repository<Carts>,
  ) {}

  async findAll(res): Promise<Carts> {
    try {
      const findAll = await this.cartEntity.find();

      return res.status(202).json(findAll);
    } catch (error) {
      console.log(error);
    }
  }

  async finOne(id: number, res) {
    try {
      const finOne = await this.cartEntity.find({
        where: {
          carts_id: id,
        },
      });
      return res.status(201).json(finOne);
    } catch (error) {
      console.log(error);
    }
  }

  async regisCart(id: number, res): Promise<cartsDto> {
    try {
      const regisCart = await this.cartEntity.find({
        where: { register_id: id },
      });
      return res.status(201).json(regisCart);
    } catch (error) {
      console.log(error);
    }
  }

  async cartUser(id: number) {
    try {
      const cartData = await this.cartEntity
        .createQueryBuilder('cart')
        .select([
          'cart.register_id AS register_id',
          'cart.id_product AS id_product',
          'cart.date_cart AS date_cart',
          'cart.carts_id AS carts_id',
          'product.product_img AS product_img',
          'product.product_name AS product_name',
          'product.product_author AS product_author',
          'product.product_price AS product_price',
          'product.product_oldprice AS product_oldprice',
          'product.product_star AS product_star',
          'product.product_vote AS product_vote',
          'product.review_product AS review_product',
          'product.product_seller AS product_seller',
        ])
        .innerJoin('cart.register', 'register')
        .innerJoin('cart.product', 'product')
        .where('cart.register_id = :id', { id })
        .getRawMany();

      return {
        mess: 'Đọc thành công',
        data: cartData,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Đã xảy ra lỗi trong quá trình xử lý');
    }
  }

  async createCart(newCart, res) {
    try {
      const cart = await this.cartEntity.create({
        register_id: newCart.register_id,
        id_product: newCart.id_product,
        date_cart: newCart.date_cart,
      });
      await this.cartEntity.save(cart);

      res.json({
        data: cart,
        status: 200,
        mess: 'Thêm khoá học thành công',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
    }
  }
  /////////////////////////////////////////////////////////////////
  async deleteCart(ids: number[]): Promise<void> {
    console.log(ids);

    // Kiểm tra nếu không có ID nào được gửi lên
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error('Vui lòng cung cấp danh sách ID sản phẩm để xoá.');
    }

    try {
      // Tạo câu truy vấn xoá các sản phẩm theo ID
      await this.cartEntity
        .createQueryBuilder()
        .delete()
        .from('carts')
        .where('carts_id IN (:...ids)', { ids })
        .execute();
    } catch (error) {
      console.error('Lỗi truy vấn TypeORM: ', error);
      throw new Error('Đã xảy ra lỗi khi xoá sản phẩm.');
    }
  }

  async deleteCartById(id: number, res) {
    try {
      console.log(id);

      const cart = await this.cartEntity.findOne({ where: { carts_id: id } });
      if (!cart) {
        throw new NotFoundException(`Cart with ID ${id} not found`);
      }
      await this.cartEntity.remove(cart);
      return res.json({
        message: 'delete cart success',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
