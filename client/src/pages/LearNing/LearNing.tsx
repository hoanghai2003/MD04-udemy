import { useEffect, useState } from "react";
import Foodter from "../../components/Layout/Foodter/Foodter";
import FoodterBar from "../../components/Layout/Foodter/FoodterBar";
import Header from "../../components/Layout/Header/Header";
import "./LearNing.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

function LearNing() {
  const UserLocal = JSON.parse(localStorage.getItem("user") || "null");
  const [listId, setListId] = useState<{ id_product: string }[]>([]);

  console.log(listId, "<------");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/checkout/${UserLocal?.register_id}`)
      .then((res) => setListId(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <div className="container-learning">
        <div className="title-learning">
          <div>My learning</div>
        </div>
        <div className="category-laerning">
          <div className="link-learning">
            <h2 className="activelear">
              <a href="">All courses</a>
            </h2>
            <h2>
              <a href="">My Lists</a>
            </h2>
            <h2>
              <a href="">Whishlist</a>
            </h2>
            <h2>
              <a href="">Archived</a>
            </h2>
            <h2>
              <a href="">Learning tools</a>
            </h2>
          </div>
        </div>
        {/*  */}
        <div className="section-learning">
          <div className="whith diplaylear">
            <div className="section-m">
              <div>
                <div className="fonth2">
                  <span>Sort by</span>
                </div>
                <select name="" id="" className="section-link">
                  <option value="">Recently Accessed</option>
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
              </div>
              <div>
                <div className="fonth2">
                  <span>Filter by</span>
                </div>
                <select name="" id="" className="section-link">
                  <option value="">Categories</option>
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
              </div>
              <div>
                <select name="" id="" className="section-link">
                  <option value="">Progress</option>
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
              </div>
              <div>
                <select name="" id="" className="section-link">
                  <option value="">Instructor</option>
                  <option value="">1</option>
                  <option value="">1</option>
                </select>
              </div>
              <div className="btn-learning">
                <button>
                  <span>Reset</span>
                </button>
              </div>
            </div>
            <div>
              <div className="inpt-learning">
                <input type="text" placeholder="Search my courses" />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="whith">
          <div className="dpl-m-learning">
            {/* {cart} */}

            {listId.length <= 0 ? (
              <>
                <div className="nolearning">
                  <div className="textlearning">There are no courses !!!</div>
                </div>
              </>
            ) : (
              <>
                {listId?.map((pu: any, index: number) => (
                  <NavLink to={`/videos/${pu.id_product}`} key={index}>
                    <div className="product-learning">
                      <img
                        src={pu.product_img}
                        alt=""
                        style={{ width: "100%", height: "130px" }}
                      />
                      <div className="name-learning">
                        <span>{pu.product_name}</span>
                        <p>{pu.product_author}</p>
                      </div>
                      <div className="displ">
                        <span>15% compelete</span>
                        <div>
                          <div>
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
                          <span>Your rating</span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <>
        <FoodterBar />
        <Foodter />
      </>
    </>
  );
}

export default LearNing;
