import { useNavigate } from "react-router-dom";
import assImages from "../../../assets/image";
import Category from "./Category";
import "./Header.css";
import Tippy from "@tippyjs/react/headless";
import { notification } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
interface PriceItem {
  product_price: number;
}

interface Prodata {
  id_product: number;
  product_author: string;
  product_name: string;
  product_img: string;
}

function Header() {
  const navigate = useNavigate();
  const UserLocal = JSON.parse(localStorage.getItem("user") || "null");
  const registerId = UserLocal ? UserLocal.register_id : null;
  const [userCart, setUserCart] = useState([]);
  const [price, setPrice] = useState([] || null);

  const [searchResult, setSearchResult] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(true);
  const [searchShow, setSearchShow] = useState("");

  console.log(searchResult, "<data");

  useEffect(() => {
    if (searchShow.trim().length >= 2) {
      fetch(
        `http://localhost:3000/product/search/${encodeURIComponent(searchShow)}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResult(data.product);
          setShowResult(true);
        });
    } else {
      setShowResult(false);
      setSearchResult([]);
    }
  }, [searchShow]);

  const handleHideResult = () => {
    setShowResult(false);
  };

  const totalPrice: number = price.reduce(
    (accumulator: number, current: PriceItem) => {
      return accumulator + current.product_price;
    },
    0
  );

  const handleDeleteLocal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    notification.success({
      message: "Đăng xuất thành công",
    });

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  const loadData = () => {
    axios
      .get(`http://localhost:3000/carts/user/${registerId}`)
      .then((res) => {
        setUserCart(res.data.data);
        setPrice(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <>
      <header className="wrapper">
        <div className="inner">
          <div className="left-header">
            <div className="displ-alg">
              <div className="logo">
                <a href="/">
                  <img className="img-logo" src={assImages.Logo} alt="Udemy" />
                </a>
              </div>
              {/* category */}
              <Category />
              {/*  */}
            </div>
            {/* search */}
            <Tippy
              visible={showResult && searchResult.length > 0}
              interactive={true}
              placement="bottom-end"
              render={(attrs) => (
                <div className="search-m-pp" tabIndex={-1} {...attrs}>
                  {searchResult.map((pr: any, index) => (
                    <NavLink to={`/profile/${pr.id_product}`} key={index}>
                      <div className="search-product">
                        <div>
                          <img
                            style={{ width: "32px", height: "32px" }}
                            src={pr.product_img}
                            alt=""
                          />
                        </div>
                        <div className="searchname">
                          <h2>{pr.product_name}</h2>
                          <span className="tg-author">
                            <strong>Course </strong>
                            <p>{pr.product_author[0]}</p>
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
              onClickOutside={handleHideResult}
            >
              <div className="search">
                <form action="" className="form-search">
                  <div className="dipl-fl">
                    <button className="btn-search">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <input
                      className="input-search"
                      type="text"
                      placeholder="Search for anything"
                      onChange={(e) => {
                        setSearchShow(e.target.value);
                        setShowResult(true);
                      }}
                    />
                  </div>
                </form>
              </div>
            </Tippy>
            {/* search */}
          </div>
          {/*  */}
          <div className="right-header">
            <div className="display-fl">
              <Tippy
                interactive
                placement="bottom-end"
                render={(attrs) => (
                  <div className="boxx" tabIndex={-1} {...attrs}>
                    <div className="panel-menu">
                      <div className="ud-heading">
                        Get your team access to over 22,000 top Udemy courses,
                        anytime, anywhere.
                      </div>
                      <a href="" className="ud-btn ">
                        <span>Try Udemy Business</span>
                      </a>
                    </div>
                  </div>
                )}
              >
                <div className="display-fll  ">
                  <a href="">
                    <span>Udemy Business</span>
                  </a>
                </div>
              </Tippy>
              {/*  */}
              <Tippy
                interactive
                placement="bottom-end"
                render={(attrs) => (
                  <div className="boxx" tabIndex={-1} {...attrs}>
                    <div className="panel-menu">
                      <div className="ud-heading">
                        Turn what you know into an opportunity and reach
                        millions around the world.
                      </div>
                      <a href="" className="ud-btn">
                        <span>Learn more</span>
                      </a>
                    </div>
                  </div>
                )}
              >
                <div className="display-fll">
                  <a href="/author">
                    <span>Teach on Udemy</span>
                  </a>
                </div>
              </Tippy>
              {/*  */}
              {/* shopping cart */}
            </div>

            {UserLocal ? (
              <>
                <div className="curentuser">
                  <Tippy
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                      <div className="boxx" tabIndex={-1} {...attrs}>
                        <div className="panel-menu">
                          <div className="ud-heading">
                            Start learning from over 210,000 courses today.
                          </div>
                          <a href="" className="display-br with-brow">
                            <span>Browse now</span>
                          </a>
                        </div>
                      </div>
                    )}
                  >
                    <div className="learning">
                      <a href="/learning">
                        <span>My learning</span>
                      </a>
                    </div>
                  </Tippy>
                  {/*  */}
                  <Tippy
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                      <div className="boxx cart-shop" tabIndex={-1} {...attrs}>
                        <div className="panel-menu">
                          <div className="ud-headingg">
                            Your wishlist is empty.
                          </div>
                          <a href="" className="ud-heading-sm">
                            <span>Explore courses</span>
                          </a>
                        </div>
                      </div>
                    )}
                  >
                    <div className="m-icon">
                      <a href="">
                        <i className="fa-regular fa-heart"></i>
                      </a>
                    </div>
                  </Tippy>
                  {/* carttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt  */}
                  <Tippy
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                      <div className="boxx cart-shop" tabIndex={-1} {...attrs}>
                        {userCart.length > 0 ? (
                          <>
                            <div className="scrollbar">
                              {userCart.map((user: any, index) => (
                                <NavLink
                                  to={`/profile/${user.id_product}`}
                                  key={index}
                                >
                                  <div className="panel-menu menuuser">
                                    <div className="topuser">
                                      <img src={user.product_img} alt="" />
                                      <div className="tax-user">
                                        <h2>{user.product_name}</h2>
                                        <p>{user.product_author}</p>
                                        <span className="totaluser">
                                          {formatCurrency(user.product_price)}
                                        </span>
                                      </div>
                                    </div>
                                    {/*  */}
                                  </div>
                                </NavLink>
                              ))}
                            </div>
                            <div className="btnuser">
                              <div className="price-user">
                                <h3>Total: {formatCurrency(totalPrice)}</h3>
                                <a href="/shopping">
                                  <button>Go to cart</button>
                                </a>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="panel-menu">
                              <div className="ud-headingg">
                                Your cart is empty.
                              </div>
                              <a href="" className="ud-heading-sm">
                                <span>Keep shopping</span>
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  >
                    <div className="right-tp">
                      <Link to="/shopping">
                        <i className="fa-solid fa-cart-shopping m-shop"></i>
                      </Link>
                      <span className="cuont-shop">{userCart.length}</span>
                    </div>
                  </Tippy>
                  {/*  */}
                  <Tippy
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                      <div className="boxx cart-shop" tabIndex={-1} {...attrs}>
                        <div className="panel-menu">
                          <div className="ud-headingg tatal">
                            <div>Your cart is empty.</div>
                            <a href="" className="ud-heading-sm">
                              Settings
                            </a>
                          </div>
                          <div className="ud-head">No notifications.</div>
                        </div>
                      </div>
                    )}
                  >
                    <div className="m-icon">
                      <a href="">
                        <i className="fa-regular fa-bell"></i>
                      </a>
                    </div>
                  </Tippy>
                  {/*  */}
                  <Tippy
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                      <div className="boxx-user" tabIndex={-1} {...attrs}>
                        <div className="user-login-menu">
                          <div>
                            <a href="" className="usera cc">
                              <div className="name-user">
                                {UserLocal.full_name[0].toUpperCase()}
                              </div>
                              <div className="m-user">
                                <div className="m1-user">
                                  {UserLocal.full_name}
                                </div>
                                <div className="m2-email">
                                  {UserLocal.register_email}
                                </div>
                              </div>
                            </a>
                            <ul className="cc user-ul">
                              <li>
                                <a href="/learning">
                                  <div>My learning</div>
                                </a>
                              </li>
                              <li>
                                <a href="/shopping">
                                  <div className="mycart-m-number">
                                    <a href="/shopping">My cart</a>
                                    <span>{userCart.length}</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a href="">Wishlist</a>
                              </li>
                              <li>
                                <a href="/author">Teach on Udemy</a>
                              </li>
                            </ul>
                            <ul className="cc user-ul">
                              <li>
                                <a href="">Notifications</a>
                              </li>
                              <li>
                                <a href="">Messages</a>
                              </li>
                            </ul>
                            <ul className="cc user-ul">
                              <li>
                                <a href="">Accuont settings</a>
                              </li>
                              <li>
                                <a href="">Payment methods</a>
                              </li>
                              <li>
                                <a href="">Subscriptions</a>
                              </li>
                              <li>
                                <a href="">Udemy credits</a>
                              </li>
                              <li>
                                <a href="">Purchase history</a>
                              </li>
                            </ul>
                            <ul className="cc user-ul">
                              <li>
                                <button className="btnlgua">
                                  <div className="colorl">Language</div>
                                  <div>
                                    <span>English</span>
                                    <i className="fa-solid fa-globe"></i>
                                  </div>
                                </button>
                              </li>
                            </ul>
                            <ul className="cc user-ul">
                              <li>
                                <a href="">Public profile</a>
                              </li>
                              <li>
                                <a href="">Edit profile</a>
                              </li>
                            </ul>
                            <ul className="cc user-ul">
                              <li>
                                <a href="">Help</a>
                              </li>
                              <li>
                                <button
                                  onClick={handleDeleteLocal}
                                  className="btnlgua"
                                >
                                  {" "}
                                  <a href="">Log out</a>
                                </button>
                              </li>
                            </ul>

                            <a href="" className="cc company-user usera">
                              <div>
                                <div className="fonw">Udemy Business</div>
                                <div className="foncolor">
                                  Bring learning to your company
                                </div>
                              </div>
                              <div>
                                <i className="fa-solid fa-up-right-from-square"></i>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  >
                    <div className="user">
                      <a href="">
                        <div className="user-name">
                          <span>{UserLocal.full_name[0].toUpperCase()}</span>
                        </div>
                      </a>
                      <span className="count-user"></span>
                    </div>
                  </Tippy>
                </div>
              </>
            ) : (
              <div className="lefheader">
                <Tippy
                  interactive
                  placement="bottom-end"
                  render={(attrs) => (
                    <div className="boxx cart-shop" tabIndex={-1} {...attrs}>
                      <div className="panel-menu">
                        <div className="ud-headingg">Your cart is empty.</div>
                        <a href="" className="ud-heading-sm">
                          <span>Keep shopping</span>
                        </a>
                      </div>
                    </div>
                  )}
                >
                  <div className="right-tp">
                    <a href="">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </a>
                  </div>
                </Tippy>
                {/* shopping cart */}
                <div className="display-fl mgl">
                  {/* login */}
                  <div className="ud-btn-secondary secondary">
                    <a href="/login">
                      <span>Log in</span>
                    </a>
                  </div>
                  {/* sigin */}
                  <div className="ud-btn-secondary mgl-sign color-bg">
                    <a href="/signin">
                      <span>Sign up</span>
                    </a>
                  </div>
                  {/*  */}
                  <div className="ud-btn-secondary mgl-sign secondary">
                    <button className="btn-globe">
                      <i className="fa-solid fa-globe"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
