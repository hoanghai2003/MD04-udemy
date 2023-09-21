import Tippy from "@tippyjs/react/headless";
import "./ListProduct.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface Props {
  dataProduct: {
    id_product: any;
    product_name: string;
    product_seller: number;
    product_img: string;
    product_author: string;
    product_star: number;
    product_vote: number;
    product_price: any;
  };
}

interface User {
  register_id: number;
}

interface Cart {
  register_id: number;
  id_product: number;
  date_cart: string;
}
interface LearNing {
  id_product: number;
  register_id: number;
}
function Product({ dataProduct }: Props) {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const UserLocal: User = JSON.parse(userString || "null") || {};
  const [carts, setCarts] = useState<Cart[]>([]);
  const [learning, setLearning] = useState<LearNing[]>([]);
  console.log(learning);
  console.log(carts);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatDate = (date: any) => {
    let dateTime = new Date(date);
    let day = dateTime.getDate();
    let month = dateTime.getMonth() + 1;
    let year = dateTime.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const newCart: Cart = {
    register_id: UserLocal?.register_id,
    id_product: dataProduct.id_product,
    date_cart: formatDate(new Date()),
  };

  const handlePost = async () => {
    if (!UserLocal || !UserLocal.register_id) {
      notification.warning({
        message: "Please log in to add to cart",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }
    if (UserLocal && UserLocal.register_id) {
      await axios
        .post("http://localhost:3000/carts/post", newCart)
        .then((res) => {
          if (res.status === 201) {
            notification.success({
              message: res.data.mess,
            });
            setCarts([...carts, newCart]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:3000/carts`)
      .then((res) => {
        setCarts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/checkout/${UserLocal?.register_id}`)
      .then((res) => setLearning(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Tippy
        interactive
        placement="right-end"
        render={(attrs) => (
          <div tabIndex={-1} {...attrs}>
            <div className="box-tt">
              <div className="pd-content">
                <div>
                  <div>
                    <a href="" className="tt-content">
                      {dataProduct.product_name}
                    </a>
                  </div>
                  <div className="up-content">
                    {dataProduct.product_seller === 0 ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <div className="betsell">
                          <div className="pd-tb">Bestseller</div>
                        </div>
                      </>
                    )}

                    <span className="sp-content">
                      Updated{" "}
                      <span className="ud-heading-xs">February 2023</span>
                    </span>
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
                  <div className="text-content">
                    A practical programming course for office workers,
                    academics, and administrators who want to improve their
                    productivity.
                  </div>
                  <div>
                    <ul className="ul-content">
                      <li>
                        <div className="check-content">
                          <div>
                            <i className="fa-solid fa-check"></i>
                          </div>
                          <div>
                            Automate tasks on their computer by writing simple
                            Python programs.
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="check-content">
                          <div>
                            <i className="fa-solid fa-check"></i>
                          </div>
                          <div>
                            Automate tasks on their computer by writing simple
                            Python programs.
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="check-content">
                          <div>
                            <i className="fa-solid fa-check"></i>
                          </div>
                          <div>
                            Automate tasks on their computer by writing simple
                            Python programs.
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="btn-add">
                    <div>
                      {learning.some(
                        (learningItem) =>
                          learningItem.id_product === dataProduct.id_product
                      ) ? (
                        <NavLink to={"/learning"}>
                          <button className="addtocart">Go to learning</button>
                        </NavLink>
                      ) : carts.some(
                          (cart) =>
                            cart.id_product === dataProduct.id_product &&
                            cart.register_id === UserLocal.register_id
                        ) ? (
                        <NavLink to={"/shopping"}>
                          <button className="addtocart">Go to cart</button>
                        </NavLink>
                      ) : (
                        <button className="addtocart" onClick={handlePost}>
                          Add to cart
                        </button>
                      )}
                    </div>
                    <div>
                      <button className="lovetocart">
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      >
        <div className="wh-pro">
          <NavLink
            to={`/profile/${dataProduct.id_product}`}
            style={{ textDecoration: "none" }}
          >
            <div className="bodr-wh">
              <div className="ha-img">
                <img
                  className="img-product"
                  src={dataProduct.product_img}
                  alt=""
                />
              </div>
              <div className="mgt">
                <h3 className="mgb tt-product">{dataProduct.product_name}</h3>
                <div className="mgb ud-text-xs">
                  <span className="ud-sr-only">
                    {dataProduct.product_author}
                  </span>
                </div>

                <div className="dis-pl mgb">
                  <div className="start-product">
                    <span className="sp-tt">{dataProduct.product_star}</span>
                    <div className="rating">
                      <div className="stars">
                        <span className="full">
                          <i className="fas fa-star" />
                        </span>
                        <span className="full">
                          <i className="fas fa-star" />
                        </span>
                        <span className="full">
                          <i className="fas fa-star" />
                        </span>
                        <span className="full">
                          <i className="fas fa-star" />
                        </span>
                        <span className="half">
                          <i className="fas fa-star-half-alt" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="number-rating">
                    ({dataProduct.product_vote})
                  </span>
                </div>
                <div className="mgb">
                  <div className="price">
                    <span className="price-total">
                      <span className="pdbt">
                        {formatCurrency(dataProduct.product_price)}
                      </span>
                    </span>
                  </div>
                </div>

                {dataProduct.product_seller === 1 ? (
                  <>
                    <div className="betsell">
                      <div className="pd-tb">Bestseller</div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </NavLink>
        </div>
      </Tippy>
    </div>
  );
}

export default Product;
