import React, { useEffect, useState } from "react";
import HeaderAdmin from "../HeaderAdmin";
import NavbarAdmin from "../NavbarAdmin";
import axios from "axios";
import { useParams } from "react-router-dom";
import { notification } from "antd";

interface Videodata {
  video: string;
  id_section: number;
  id_product: number;
  name_video: string;
}

function CreateVideo() {
  const { id } = useParams();
  const [video, setVideo] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [section, setSection] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nameVideo, setNameVideo] = useState("");

  console.log(mediaUrl, "<------");

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setVideo(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const uploadMedia = async () => {
      const formData = new FormData();
      formData.append("file", video as File);
      formData.append("upload_preset", "udemyimages");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwebi52rx/video/upload",
          formData
        );
        const media = response.data.url;
        setMediaUrl(media);
      } catch (error) {
        console.log(error);
      }
    };
    if (video) {
      uploadMedia();
    }
  }, [video]);

  const handleSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSection(e.target.value);
  };

  const handleNamevideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameVideo(e.target.value);
  };

  const newVideo: Videodata = {
    video: mediaUrl,
    id_section: +section,
    id_product: id ? +id : 0,
    name_video: nameVideo,
  };

  const handlePost = async () => {
    if (!video || !section) {
      notification.error({
        message: "Please fill in all fields",
      });
      return;
    }
    try {
      await axios.post("http://localhost:3000/videos", newVideo);
      notification.success({
        message: "Thêm video thành công",
      });
      setMediaUrl("");
      setSection("");
      setNameVideo("");
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
                  <video controls className="selected-video">
                    <source src={selectedImage} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <input type="file" onChange={handleVideo} />
              </div>
              <div className="ipns-ctainer">
                <select name="" id="" onChange={handleSection}>
                  <option>chọn</option>
                  <option value="1">section 1</option>
                  {/* <option value="2">section 2</option>
                  <option value="3">section 3</option>
                  <option value="4">section 4</option>
                  <option value="5">section 5</option>
                  <option value="6">section 6</option>
                  <option value="7">section 7</option> */}
                </select>
                <input
                  type="text"
                  placeholder="Name Video"
                  onChange={handleNamevideo}
                />
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

export default CreateVideo;
