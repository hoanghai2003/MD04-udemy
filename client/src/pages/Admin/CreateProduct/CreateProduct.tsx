import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../HeaderAdmin";
import NavbarAdmin from "../NavbarAdmin";
import "./CreateProduct.css";

interface ProductData {
  product_img: string;
  product_name: string;
  product_author: string;
  product_price: string;
  product_oldprice: string;
  product_star: string;
  product_vote: string;
  review_product: string;
  product_seller: string;
}

function CreateProduct() {
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [outTher, setOutTher] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [start, setStart] = useState("");
  const [vote, setVote] = useState("");
  const [review, setReview] = useState("");
  const [status, setStatus] = useState("");

  const [mediaUrl, setMediaUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  console.log(selectedImage, "<--------");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const uploadMedia = async () => {
      const formData = new FormData();
      formData.append("file", image as File);
      formData.append("upload_preset", "udemyimages");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwebi52rx/image/upload",
          formData
        );
        const media = response.data.secure_url;
        setMediaUrl(media);
      } catch (error) {
        console.log(error);
      }
    };
    if (image) {
      uploadMedia();
    }
  }, [image]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOuther = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutTher(e.target.value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleOldPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPrice(e.target.value);
  };

  const handleStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
  };

  const handleVote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setVote(value);
    }
  };

  const handleReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const newData: ProductData = {
    product_img: mediaUrl,
    product_name: name,
    product_author: outTher,
    product_price: price,
    product_oldprice: oldPrice,
    product_star: start,
    product_vote: vote,
    review_product: review,
    product_seller: status,
  };

  const handlePost = async () => {
    if (
      !image ||
      !name ||
      !outTher ||
      !price ||
      !oldPrice ||
      !start ||
      !vote ||
      !review ||
      !status
    ) {
      notification.error({
        message: "Please fill in all fields",
      });
      return;
    }
    try {
      await axios.post("http://localhost:3000/product/single", newData);
      notification.success({
        message: "Thêm khoá học thành công",
      });
      setTimeout(() => {
        navigate("/productadmin");
      }, 1500);
      setImage(null);
      setName("");
      setOutTher("");
      setPrice("");
      setOldPrice("");
      setStart("");
      setVote("");
      setReview("");
      setStatus("");
      setMediaUrl("");
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
          <div className="ctner-inpt">
            <div className="ipt-main">
              <div className="ipt-image">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="selected-image"
                  />
                )}
                <input type="file" onChange={handleImage} />
              </div>
              <div className="ipns-ctainer">
                <input type="text" placeholder="Name" onChange={handleName} />
                <input
                  type="text"
                  placeholder="Tac gia"
                  onChange={handleOuther}
                />
                <input type="text" placeholder="Price" onChange={handlePrice} />
                <input
                  type="text"
                  placeholder="Old Price"
                  onChange={handleOldPrice}
                />
                <input type="text" placeholder="Start" onChange={handleStart} />
                <input type="text" placeholder="Vote" onChange={handleVote} />
                <input
                  type="text"
                  placeholder="Review"
                  onChange={handleReview}
                />
                <select name="" id="" onChange={handleStatus}>
                  <option>chọn</option>
                  <option value="0">Giảm giá</option>
                  <option value="1">Không giảm giá</option>
                </select>
                <div className="btn-createe">
                  <button onClick={handlePost}>create</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
