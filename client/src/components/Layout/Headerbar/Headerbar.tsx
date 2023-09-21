import assImages from "../../../assets/image";
import "./Headerbar.css";

function Headerbar() {
  // const currentUser = true;
  const UserLocal = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <>
      <div className="ctn-headerbar">
        {UserLocal ? (
          <div className="m-navbar">
            <div className="m-category">
              <ul>
                <li>
                  <div>
                    <a href="">Development</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Business</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Finance & Accounting</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">IT & Software</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Office Productivity</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Personal Development</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Design</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Marketing</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Health & Fitness</a>
                  </div>
                </li>
                <li>
                  <div>
                    <a href="">Music</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="postt-headerbar">
              <div className="img-banner">
                <img src={assImages.Banner} alt="" />
              </div>
              {/*  */}
              <div className="billboard-banner">
                <h1 className="heading-serif">Sale ends today</h1>
                <p className="text-md">
                  Have a dream? Log in by June 22 for special savings and make
                  it happen.
                </p>
                <div className="billboard-bannerr" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="postt-headerbar">
              <div className="img-banner">
                <img src={assImages.Banner} alt="" />
              </div>
              {/*  */}
              <div className="billboard-banner">
                <h1 className="heading-serif">Sale ends today</h1>
                <p className="text-md">
                  Have a dream? Log in by June 22 for special savings and make
                  it happen.
                </p>
                <div className="billboard-bannerr" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Headerbar;
