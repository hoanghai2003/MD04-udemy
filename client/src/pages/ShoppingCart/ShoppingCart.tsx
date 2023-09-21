import axios from "axios";
import { useEffect, useState } from "react";
import Foodter from "../../components/Layout/Foodter/Foodter";
import FoodterBar from "../../components/Layout/Foodter/FoodterBar";
import Header from "../../components/Layout/Header/Header";
import "./ShoppingCart.css";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

interface Product {
  product_img: string;
  product_name: string;
  product_author: string;
  product_seller: number;
  product_star: number;
  product_vote: number;
  product_price: number;
  carts_id: number;
}
interface PriceItem {
  product_price: number;
}

function ShoppingCart() {
  const navigate = useNavigate();
  const id: string = JSON.parse(
    localStorage.getItem("user") || "null"
  ).register_id;

  const [grubProduct, setGrubProduct] = useState<Product[]>([]);
  console.log(grubProduct);

  const totalPrice: number = grubProduct.reduce(
    (accumulator: number, current: PriceItem) => {
      return accumulator + current.product_price;
    },
    0
  );

  const loadData = async () => {
    await axios
      .get(`http://localhost:3000/carts/user/${id}`)
      .then((res) => {
        console.log(res);
        const updatedGrubProduct: Product[] = res.data.data.map((grub: any) => {
          const isChecked = grub.status === 1;
          return {
            ...grub,
            isChecked,
          };
        });
        setGrubProduct(updatedGrubProduct);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (cartsId: number) => {
    axios
      .delete(`http://localhost:3000/carts/remove/${cartsId}`)
      .then(() => {
        loadData();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleCart = () => {
    if (grubProduct.length <= 0) {
      notification.warning({
        message: "No courses available for payment.",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);

      return;
    } else if (grubProduct.length >= 0) {
      navigate("/checkout");
    }
  };

  return (
    <>
      <Header />

      <div className="container-shoppingcart">
        <div className="tt-shoppingcart">
          <div>
            <h2>Shopping Cart</h2>
            <h3>{grubProduct.length} Courses in cart</h3>
            {grubProduct.length <= 0 ? (
              <>
                <div className="nocart">
                  <div className="textcart">
                    There are no courses in your cart yet !!!
                  </div>
                </div>
              </>
            ) : (
              <>
                {grubProduct.map((gr: Product, index) => (
                  <div className="ctn-shopping" key={index}>
                    {/*  */}
                    <div className="shopping-cart">
                      <div className="imgshop">
                        <img src={gr.product_img} alt="" />
                      </div>
                      <div className="wn-cart">
                        <div className="tt-cart">
                          <h3>
                            <a href="">{gr.product_name}</a>
                          </h3>
                        </div>
                        <div className="m-tt-cart">
                          <span>By {gr.product_author}</span>
                        </div>
                        <div className="m-displ-shopping">
                          {gr.product_seller === 1 ? (
                            <>
                              <div className="betsell">
                                <div className="pd-tb">Bestseller</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <div className="betsell updatecart">
                            <div className="pd-tb">Updated Recently</div>
                          </div>

                          <div className="dis-pl mgb">
                            <div className="start-product">
                              <span className="sp-tt">{gr.product_star}</span>
                              <div className="rating">
                                <div className="stars">
                                  <span className="full">
                                    <i className="fas fa-star"></i>
                                  </span>
                                  <span className="full">
                                    <i className="fas fa-star"></i>
                                  </span>
                                  <span className="full">
                                    <i className="fas fa-star"></i>
                                  </span>
                                  <span className="full">
                                    <i className="fas fa-star"></i>
                                  </span>
                                  <span className="half">
                                    <i className="fas fa-star-half-alt"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="number-rating">
                              ({gr.product_vote} ratings)
                            </span>
                          </div>
                        </div>

                        <div className="view-content">
                          <span className="course-details-quick-view-box">
                            9.5 total hours
                          </span>
                          <span className="course-details-quick-view-box">
                            All Levels
                          </span>
                          <span>Subtitles</span>
                        </div>
                      </div>
                      <div className="link-shoppingcart">
                        <button onClick={() => handleDelete(gr.carts_id)}>
                          Remove
                        </button>

                        <a href="">Save for Later</a>
                        <a href="">Move to Wishlist </a>
                      </div>
                      <div className="tag-cart">
                        <span>{formatCurrency(gr.product_price)}</span>
                        <span className="tag-m-cart">
                          <i className="fa-solid fa-tag "></i>
                        </span>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                ))}
              </>
            )}
          </div>
          {grubProduct.length <= 0 ? (
            <></>
          ) : (
            <>
              <div className="m-price-total">
                <div className="m-total">
                  <h3>Total</h3>
                  <h2>
                    <span>{formatCurrency(totalPrice)}</span>
                  </h2>
                  <div className="btn-cart">
                    <div onClick={handleCart}>
                      <button className="btn-checkout">Checkout</button>
                    </div>
                  </div>
                  <span className="promotions">Promotions </span>

                  <div className="delete-cart">
                    <i className="fa-solid fa-xmark"></i>
                    <div className="delete-cart">
                      <p>KEEPLEARNING</p>
                      <span>is applied</span>
                    </div>
                  </div>
                  <div className="inp-cart">
                    <input type="text" placeholder="Enter Coupon" />
                    <button>Apply</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <FoodterBar />
      <Foodter />
    </>
  );
}

export default ShoppingCart;
