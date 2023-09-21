import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import FoodterBar from "../../components/Layout/Foodter/FoodterBar";
import Foodter from "../../components/Layout/Foodter/Foodter";
import "./Videos.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Videos() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isPlayIcon, setIsPlayIcon] = useState(false);
  const videoRef = useRef<ReactPlayer | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const [volumeLevel, setVolumeLevel] = useState(1);

  console.log(videos);
  function formatTime(seconds: any) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainderSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/videos/url/${selectedVideoUrl}`)
      .then((res) => {
        setUrlVideo(res?.data?.data[0].video);
      })
      .catch((err) => console.log(err));
  }, [selectedVideoUrl]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/videos/${id}`)
      .then((res) => setVideos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleOppen = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenvideo = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  const handleVideoClick = (videoId: any) => {
    setSelectedVideoUrl(videoId);
  };

  const handlePlayPauseClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
    setIsPlayIcon(!isPlayIcon);
  };
  const handleVolum = () => {
    setVolumeLevel(volumeLevel === 0 ? 1 : 0); // Toggle between muted (0) and unmuted (1)
  };

  const handleBackward = () => {
    const newTime = Math.max(currentTime - 15, 0); // Giảm 15s, không dưới 0
    setCurrentTime(newTime);
    seekVideo(newTime);
  };

  const handleForward = () => {
    const newTime = Math.min(currentTime + 15, videoDuration); // Tăng 15s, không vượt quá độ dài video
    setCurrentTime(newTime);
    seekVideo(newTime);
  };

  const seekVideo = (time: any) => {
    if (urlVideo) {
      // Kiểm tra xem video đã được tải hay chưa
      if (videoRef.current) {
        videoRef.current.seekTo(time);
      }
    }
  };

  return (
    <>
      <div>
        <div className="header-video">
          <div className="video-inner dipl-video">
            <div className="dipl-video">
              <a href="/">
                <img
                  src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg"
                  alt=""
                  style={{ height: "34px" }}
                />
              </a>
              <span className="solid"></span>
              <div className="dco-video">
                <p>
                  SocketIO v4, with websockets - the details. Updated May2023
                </p>
              </div>
            </div>
            <div className="dipl-video">
              <div className="linkvd">
                <i className="fa-regular fa-star"></i>
                <a href="">Leave a rating</a>
              </div>
              <div className="dipl-video">
                <div className="dipl-video cupvd">
                  <div className="boder">
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <div className="share-vd">
                    <span>Your progress</span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
                {/*  */}
                <div className="btn-video">
                  <button className="sharevd">
                    <span>Share</span>
                    <i className="fa-solid fa-share"></i>
                  </button>
                  <button className="menuvd">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* asdasdasdasdsadasdasdasdad */}
        <div className="boss-video">
          <div style={{ width: "100%" }}>
            <div className="container-video">
              <div className="video">
                <ReactPlayer
                  volume={volumeLevel}
                  url={urlVideo}
                  playing={isVideoPlaying}
                  onDuration={(duration) => setVideoDuration(duration)}
                  onProgress={(progress) =>
                    setCurrentTime(progress.playedSeconds)
                  }
                  ref={videoRef}
                  progressInterval={1000}
                />
                <div className="ctroler-volum">
                  <div className="volum-vd bgr-cl">
                    <div className="display">
                      <button onClick={handlePlayPauseClick}>
                        {isPlayIcon ? (
                          <i className="fa-solid fa-play"></i>
                        ) : (
                          <i className="fa-solid fa-pause"></i>
                        )}
                      </button>
                      <button onClick={handleBackward}>
                        <i className="fa-solid fa-backward"></i>
                      </button>
                      <div className="">
                        1{" "}
                        <span>
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </div>
                      <button onClick={handleForward}>
                        <i className="fa-solid fa-forward"></i>
                      </button>
                      <div>
                        <span>{formatTime(currentTime)}</span>
                        <span>/</span>
                        <span>{formatTime(videoDuration)}</span>
                      </div>
                      <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className="display">
                      <button onClick={handleVolum}>
                        {volumeLevel === 0 ? (
                          <i className="fa-solid fa-volume-xmark"></i>
                        ) : (
                          <i className="fa-solid fa-volume-high"></i>
                        )}
                      </button>
                      <i className="fa-solid fa-file"></i>
                      <i className="fa-regular fa-credit-card"></i>
                      <i className="fa-solid fa-gear"></i>
                      <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                      <button onClick={handleOppen}>
                        <i className="fa-solid fa-expand"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="desception-video">
              <div className="desception-m">
                <section>
                  <div className="btn-link-video">
                    <button>
                      <h2>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                  </div>
                  <div className="socket">
                    <h2>About this course</h2>
                    <p>
                      Socket io. Learn how to harness real-time communication on
                      the web. W/Cluster Module, React and a real time game!
                    </p>
                  </div>
                  <div className="skilll">
                    <dt>By the numbers</dt>
                    <dd>
                      <div>Skill level:all</div>
                      <div>Skill level:asda</div>
                      <div>Skill level:dasd</div>
                      <div>Skill level:asdad</div>
                    </dd>
                    <dd>
                      <div>Skill level:dasd</div>
                      <div>Skill level:asdad</div>
                    </dd>
                  </div>
                </section>
              </div>
            </div>
            <FoodterBar />
            <Foodter />
          </div>
          {isOpen && (
            <div className="left-video">
              <div className="contentt">
                <span>Course content</span>
                <button onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="list-video" onClick={handleOpenvideo}>
                <div className="">
                  <h2>Section 1 : Introduction</h2>
                  <span>4/4 |18min</span>
                </div>
                <i
                  className={`fa-solid fa-chevron-down ${
                    isVideoOpen ? "rotated" : ""
                  }`}
                ></i>
              </div>
              {isVideoOpen && (
                <>
                  {" "}
                  <div className="scrollbarr">
                    {videos.map((vd: any) => (
                      <div
                        className="new-div1"
                        key={vd.id_video}
                        onClick={() => handleVideoClick(vd.id_video)} // Handle video click
                      >
                        <input type="checkbox" />
                        <div className="mta-vdeo">
                          <div className="caicc">
                            {vd.id_section}. {vd.name_video}
                          </div>
                          <div className="tv-vd">
                            <i className="fa-solid fa-tv"></i>
                            <p>5min</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Videos;
