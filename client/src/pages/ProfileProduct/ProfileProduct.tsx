import { useState, useEffect } from "react";
import Foodter from "../../components/Layout/Foodter/Foodter";
import FoodterBar from "../../components/Layout/Foodter/FoodterBar";
import Header from "../../components/Layout/Header/Header";
import "./ProfileProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { notification } from "antd";

interface Product {
  id_product: string;
  product_name: string;
  product_img: string;
  product_star: string;
  product_vote: number;
  product_author: string;
  product_price: number;
  product_seller: number;
}

interface Cart {
  id_product: string;
  register_id: string;
  date_cart: string;
}
interface LearNing {
  id_product: number;
  register_id: number;
}

function ProfileProduct() {
  const userString = localStorage.getItem("user");
  const UserLocal = JSON.parse(userString || "null") || {};
  const [isRotated, setIsRotated] = useState(false);
  const [productId, setProductId] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [learning, setLearning] = useState<LearNing[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(carts);

  const handleDown = () => {
    setIsRotated(!isRotated);
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => setProductId(res.data))
      .catch((err) => console.log(err));
  }, []);
  // ///////////////////
  const fomatDate = (date: any) => {
    let dateTime = new Date(date);
    let day = dateTime.getDate();

    let month = dateTime.getMonth() + 1;

    let year = dateTime.getFullYear();

    return `${year}-${month}-${day}`;
  };
  const newCart: Cart = {
    register_id: UserLocal?.register_id,
    id_product: id || "",
    date_cart: fomatDate(new Date()),
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
          }
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUser = () => {
    if (!UserLocal || !UserLocal.register_id) {
      notification.warning({
        message: "Please log in to add to cart",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  //
  const dataProduct = () => {
    axios
      .get(`http://localhost:3000/carts`)
      .then((res) => {
        setCarts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dataProduct();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/checkout/${UserLocal?.register_id}`)
      .then((res) => setLearning(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />

      {productId?.map((pr: Product, index) => (
        <div className="ctn-profile" key={index}>
          <div className="profile">
            <div className="m-profile">
              <div className="right-profile">
                <div className="pr">
                  <a href="">Devlopment</a>
                </div>
                <i className="fa-solid fa-angle-right pr"></i>
                <div className="pr">
                  <a href="">Devlopment</a>
                </div>
                <i className="fa-solid fa-angle-right pr"></i>
                <div className="pr">
                  <a href="">Devlopment</a>
                </div>
              </div>
              <div className="tt-profile">
                <h1>{pr.product_name}</h1>
              </div>
              <div className="m-tt">
                Master Python by building 100 projects in 100 days. Learn data
                science, automation, build websites, games and apps!
              </div>
              {/*  */}
              <div className="m-displ">
                <div className="pd">
                  <div className="betsell">
                    <div className="pd-tb">Bestseller</div>
                  </div>
                </div>
                <div className="dis-pl mgb">
                  <div className="start-product">
                    <span className="sp-tt">{pr.product_star}</span>
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
                  <span className="number-rating pd colo">
                    ({pr.product_vote})
                  </span>
                </div>
                <div className="count-pro">
                  <span>914,756 students</span>
                </div>
              </div>
              {/*  */}
              <div className="link-product">
                <span>Created by</span>
                <a href="">
                  <span>{pr.product_author}</span>
                </a>
              </div>
              {/*  */}
              <div className="m-displ">
                <div>
                  <i className="fa-solid fa-circle-exclamation prr"></i>
                  <span className="prr">Last updated 6/2023</span>
                </div>
                <div>
                  <i className="fa-solid fa-globe prr"></i>
                  <span className="prr">English</span>
                </div>
                <div>
                  <i className="fa-regular fa-credit-card prr"></i>
                  <span className="prr ">English, Arabic [Auto],</span>
                  <button className="btn-m-pro">
                    <span className="prr">16 more</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  */}
          <div className="left-product">
            <div className="ctn-left-product">
              <div className="img-product">
                <img src={pr.product_img} alt="" />
              </div>
              <div className="pading-product">
                <div className="price-m-product">
                  <div className="dipl-fll">
                    <div className="pd fonproduct">
                      <span>{formatCurrency(pr.product_price)}</span>
                    </div>
                    {/* <div className="pd pricepr">
                      <div>
                        <span>{formatCurrency(pr.product_price)}</span>
                      </div>
                      <div className="bd"></div>
                    </div> */}
                  </div>

                  {pr.product_seller === 0 ? (
                    <></>
                  ) : (
                    <>
                      <div className="priceprr">
                        <span>80% off</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="time-product">
                  <div className="dipl-pr-m">
                    <i className="fa-solid fa-clock pdd"></i>
                    <span className="pdd">
                      <b className="pdd">1 day</b> left at this price!
                    </span>
                  </div>
                </div>
                {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                <div className="dipl-pr-btn padi-all">
                  {learning.some(
                    (learningItem: any) =>
                      learningItem.id_product === pr.id_product
                  ) ? (
                    <div className="btn-addcart">
                      <NavLink to={`/learning`}>
                        <button>Go to learning</button>
                      </NavLink>
                    </div>
                  ) : carts.find(
                      (cart: Cart) =>
                        cart.id_product === pr.id_product &&
                        cart.register_id === UserLocal.register_id
                    ) ? (
                    <div className="btn-addcart">
                      <NavLink to={`/shopping`}>
                        <button>Go to cart</button>
                      </NavLink>
                    </div>
                  ) : (
                    <div className="btn-addcart" onClick={handlePost}>
                      <button>Add to cart</button>
                    </div>
                  )}
                  <div className="btn-heart">
                    <button>
                      <i className="fa-regular fa-heart"></i>
                    </button>
                  </div>
                </div>
                {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                <div className="padi-all teckali btn-buynow">
                  {carts.find(
                    (cart: Cart) =>
                      cart.id_product === pr.id_product &&
                      cart.register_id === UserLocal.register_id
                  ) ? (
                    <div className="btn-addcart">
                      <button
                        style={{
                          cursor: "not-allowed",
                          color: "#999",
                          border: "1px solid #9999",
                        }}
                      >
                        Buy now
                      </button>
                    </div>
                  ) : learning.some(
                      (learningItem: any) =>
                        learningItem.id_product === pr.id_product
                    ) ? (
                    <button
                      disabled
                      style={{
                        cursor: "not-allowed",
                      }}
                    >
                      Buy now
                    </button>
                  ) : (
                    <button onClick={handleUser}>
                      <NavLink to={""}>Buy now</NavLink>
                    </button>
                  )}
                </div>

                <div className="teckali date-product">
                  <span>30-Day Money-Back Guarantee</span>
                </div>

                <div className="padi-all list-product-m">
                  <h2>This course includes:</h2>
                  <ul>
                    <li className="dipl-pr-mul">
                      <div>
                        <i className="fa-solid fa-tv"></i>
                      </div>
                      <div>
                        <span>65.5 hours on-demand video</span>
                      </div>
                    </li>
                    {/*  */}
                    <li className="dipl-pr-mul">
                      <div>
                        <i className="fa-solid fa-tv"></i>
                      </div>
                      <div>
                        <span>65.5 hours on-demand video</span>
                      </div>
                    </li>
                    {/*  */}
                  </ul>
                </div>
                <div className="bnt-link">
                  <div className="btn-link-pro">
                    <button>share</button>
                    <a href="">Gift this course</a>
                    <button>Apply Coupon</button>
                  </div>
                </div>
              </div>
              <div className="btt-profile">
                <div className="m-btt-profile">
                  <h2>Training 5 or more people?</h2>
                  <p>
                    Get your team access to 22,000+ top Udemy courses anytime,
                    anywhere.
                  </p>
                  <button>Try Udemy Business</button>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="m-profilee">
            <div className="m-profile-content">
              <div className="wh-m-product">
                <h2>What you'll learn</h2>
                <div className="dipl-m-product">
                  <ul>
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <span>
                        Build 16 web development projects for your portfolio,
                        ready to apply for junior developer jobs.
                      </span>
                    </li>
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <span>
                        Build 16 web development projects for your portfolio,
                        ready to apply for junior developer jobs.
                      </span>
                    </li>
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <span>
                        Build 16 web development projects for your portfolio,
                        ready to apply for junior developer jobs.
                      </span>
                    </li>
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <span>
                        Build 16 web development projects for your portfolio,
                        ready to apply for junior developer jobs.
                      </span>
                    </li>
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <span>
                        Build 16 web development projects for your portfolio,
                        ready to apply for junior developer jobs.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {/*  */}
              <div className="mgtop-product">
                <div className="wh-m-product">
                  <h3>Top companies offer this course to their employees</h3>
                  <div className="linkspan">
                    <span>
                      This course was selected for our collection of top-rated
                      courses trusted by businesses worldwide.
                    </span>
                    <a href=""> Learn more</a>
                  </div>
                  <div className="img-content-product">
                    <img
                      src="https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg"
                      alt="Nasdaq"
                      height={38}
                      width={115}
                    />
                    <img
                      src="https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg"
                      alt="Volkswagen"
                      height={38}
                      width={44}
                    />
                    <img
                      src="https://s.udemycdn.com/partner-logos/v4/box-dark.svg"
                      alt="Box"
                      height={38}
                      width={67}
                    />
                    <img
                      src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg"
                      alt="NetApp"
                      height={38}
                      width={115}
                    />
                    <img
                      src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg"
                      alt="Eventbrite"
                      height={38}
                      width={115}
                    />
                  </div>
                </div>
                <div>
                  <div className="tt-m-product ">
                    <h2>Course content</h2>
                    <div className="btn-m-product">
                      <div>
                        <span>
                          101 sections • 624 lectures • 57h 57m total length
                        </span>
                      </div>
                      <button>
                        <span>Expand all sections</span>
                      </button>
                    </div>
                  </div>
                  <div className="wh-m-product ctn-video " onClick={handleDown}>
                    <div className="category-video">
                      <i
                        className={`fa-solid fa-chevron-down ${
                          isRotated ? "rotated" : ""
                        }`}
                      ></i>
                      <h3>
                        <button>
                          <span className="tt-video">
                            <span className="span1">
                              Day 1 - Beginner - Working with Variables in
                              Python to Manage Data
                            </span>
                            <span className="span2">
                              17 lectures • <span>1hr 30min</span>
                            </span>
                          </span>
                        </button>
                      </h3>
                    </div>
                  </div>
                  {isRotated && (
                    <>
                      <div className="wh-m-product bodertop">
                        <div className="ctn-lisst">
                          <div className="watch-list">
                            <i className="fa-solid fa-tv"></i>
                            <span>Printing to the Console in Python</span>
                          </div>
                          <div className="time-list">
                            <span>12:24 </span>
                          </div>
                          {/*  */}
                        </div>
                        <div className="ctn-lisst">
                          <div className="watch-list">
                            <i className="fa-solid fa-tv"></i>
                            <span>Printing to the Console in Python</span>
                          </div>
                          <div className="time-list">
                            <span>12:24 </span>
                          </div>
                          {/*  */}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="intructer">
                  <h2>Instructor</h2>
                  <div className="link-intructor">
                    <a href="">{pr.product_author}</a>
                  </div>
                  <div className="selling">
                    <span>
                      Best Selling Instructor, 10x AWS Certified, Kafka Guru
                    </span>
                  </div>
                  <div className="tt-intructer">
                    <div className="img-link-intructer">
                      <a href="">
                        <img src={pr.product_img} alt="" />
                      </a>
                    </div>
                    <div className="list-intructer">
                      <ul>
                        <li>
                          <i className="fa-solid fa-star"></i>
                          <span>4.7 Instructor Rating</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                          <span>4.7 Instructor Rating</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                          <span>4.7 Instructor Rating</span>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                          <span>4.7 Instructor Rating</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="author-intructer">
                    <p>
                      Stephane is a solutions architect, consultant and software
                      developer that has a particular interest in all things
                      related to Big Data, Cloud & API. He's also a many-times
                      best seller instructor on Udemy for his courses in{" "}
                      <strong>AWS</strong> and <strong>Apache Kafka</strong>.
                    </p>
                  </div>
                  <div className="btn-showmore">
                    <button>
                      show more
                      <i className="fa-solid fa-chevron-down"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <FoodterBar />
      <Foodter />
    </>
  );
}

export default ProfileProduct;
