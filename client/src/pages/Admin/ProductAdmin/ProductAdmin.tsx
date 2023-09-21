import axios from "axios";
import HeaderAdmin from "../HeaderAdmin";
import NavbarAdmin from "../NavbarAdmin";
import "./ProductAdmin.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Product {
  id_product: any;
  product_name: string;
  product_img: string;
  product_author: string;
  product_vote: number;
  product_price: any;
}

function ProductAdmin() {
  const [product, setProduct] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setProduct(res.data.findAll))
      .catch((err) => console.log(err));
  }, []);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleDelete = (id: string) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:3000/product/${productIdToDelete}`);
      const updatedProducts = product.filter(
        (pr) => pr.id_product !== productIdToDelete
      );
      setProduct(updatedProducts);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-header">
        <div className="header">
          <HeaderAdmin />
        </div>
        <div className="navbar">
          <NavbarAdmin />
          <div className="conatiner-useradmin">
            <div className="useradmin">
              <div className="iconusers">
                <i className="fa-solid fa-user-tag users"></i>
              </div>
              <i className="fa-solid fa-angle-right"></i>
              <span>Product</span>
            </div>
            <div className="btn-create">
              <div className="search-user">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search" />
              </div>
              <div>
                <a href="/create" className="btn-admin">
                  <button>
                    <i className="fa-solid fa-plus"></i> Create
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="product-user">
            {product.map((pr, index) => (
              <div className="haibanh" key={index}>
                <div className="wh-pro">
                  <a className="" href="" style={{ textDecoration: "none" }}>
                    <div className="bodr-wh">
                      <div className="ha-img">
                        <img
                          className="img-product"
                          src={pr.product_img}
                          alt=""
                        />
                      </div>
                      <div className="mgt">
                        <h3 className="mgb tt-product">{pr.product_name}</h3>
                        <div className="mgb ud-text-xs">
                          <span className="ud-sr-only">
                            {pr.product_author}
                          </span>
                        </div>
                        <div className="dis-pl mgb">
                          <div className="start-product">
                            <span className="sp-tt">5</span>
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
                            ({pr.product_vote})
                          </span>
                        </div>
                        <div className="mgb">
                          <div className="price">
                            <span className="price-total">
                              <span className="pdbt">
                                {formatCurrency(pr.product_price)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="btn-admin btn-user">
                    <button onClick={() => handleDelete(pr.id_product)}>
                      xoá
                    </button>
                    <NavLink to={`/createvd/${pr.id_product}`}>
                      <button>+video</button>
                    </NavLink>
                    <button>sửa</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleDeleteConfirmed}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductAdmin;
