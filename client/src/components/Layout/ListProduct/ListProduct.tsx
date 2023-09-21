import "./ListProduct.css";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import TopCategory from "./TopCategory";

interface DataProduct {
  id_product: any;
  product_name: string;
  product_seller: number;
  product_img: string;
  product_author: string;
  product_star: number;
  product_vote: number;
  product_price: any;
}

function ListProduct() {
  const [dataProduct, setDataProduct] = useState<DataProduct[]>([]);

  console.log("------>", dataProduct);

  const CustomPrevArrow = ({ onClick }: CustomArrowProps) => (
    <button className="custom-prev-arrow" onClick={onClick}>
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );

  const CustomNextArrow = ({ onClick }: CustomArrowProps) => (
    <button className="custom-next-arrow" onClick={onClick}>
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    width: 600,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setDataProduct(res.data.findAll))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container-listpro">
        <div>
          <div className="title-container">
            <div className="title-no-margin">
              <h2 className="headline__main-text ">
                A broad selection of courses
              </h2>
            </div>
            <p className="headline__sub-text">
              Choose from over 210,000 online video courses with new additions
              published every month
            </p>
          </div>
        </div>

        {/* list-product */}

        <div className="list-ctn">
          <div className="list-product">
            <button className="btn-list">
              <span>Python</span>
            </button>
          </div>
          <div className="list-product">
            <button className="btn-list">
              <span>Excel</span>
            </button>
          </div>
          <div className="list-product">
            <button className="btn-list">
              <span>Web Development</span>
            </button>
          </div>
          <div className="list-product">
            <button className="btn-list">
              <span>JavaScript</span>
            </button>
          </div>
          <div className="list-product">
            <button className="btn-list">
              <span>Data Science</span>
            </button>
          </div>
          <div className="list-product">
            <button className="btn-list">
              <span>Amazon AWS</span>
            </button>
          </div>
          <div className="list-product">
            <button className="btn-list">
              <span>Drawing</span>
            </button>
          </div>
        </div>
        {/*  */}
        <div className="container-listproduct">
          <div className="content">
            <div className="mgbot">
              <div className="title-list">
                <strong>Expand your career opportunities with Python</strong>
              </div>
              <div className="mt-product">
                <p className="tt">
                  Take one of Udemy’s range of Python courses and learn how to
                  code using this incredibly useful language. Its simple syntax
                  and readability makes Python perfect for Flask, Django, data
                  science, and machine learning. You’ll learn how to build
                  everything from games to sites to apps. Choose from a range of
                  courses that will appeal to both beginners and advanced
                  developers alike.
                </p>
              </div>
              <div className="link">
                <a href="" className="link-category">
                  <span>Explore Python</span>
                </a>
              </div>
            </div>
            {/* list product */}
            <div className="slick-track ">
              <Slider {...settings}>
                {dataProduct.map((data, index) => (
                  <Product key={index} dataProduct={data} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
        {/*  */}
        <TopCategory />
        {/*  */}
      </div>
    </>
  );
}

export default ListProduct;
