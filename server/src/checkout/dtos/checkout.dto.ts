// checkout.dto.ts

export class CheckoutDto {
  id_product: {
    id_product: number;
    product_img: string;
    product_name: string;
    product_author: string;
    product_price: number;
    product_oldprice: number;
    product_star: number;
    product_vote: number;
    review_product: string;
    product_seller: number;
    register_id: number;
  };
}
