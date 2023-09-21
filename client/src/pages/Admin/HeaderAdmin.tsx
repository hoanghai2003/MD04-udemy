import { useState } from "react";
import assImages from "../../assets/image";
import "./Admin.css";
import { NavLink } from "react-router-dom";

function HeaderAdmin() {
  const [activeTab, setActiveTab] = useState("user");

  function handleTabClick(tabName: any) {
    setActiveTab(tabName);
  }

  return (
    <>
      <div className="img-header">
        <a href="/admin">
          <img src={assImages.Logo} alt="" />
        </a>
      </div>
      <div className="img-user">
        <div>
          <img src={assImages.UserAd} alt="" />
          <button>
            <i className="fa-solid fa-camera"></i>
          </button>
        </div>
        <h2>
          Nguyen Van Hoang Hai <span>(admin)</span>
        </h2>
      </div>

      <div className="ul-header">
        <ul>
          <NavLink to={"/useradmin"}>
            <li className="active" onClick={() => handleTabClick("user")}>
              user
            </li>
          </NavLink>
          <NavLink to={"/productadmin"}>
            <li className="active" onClick={() => handleTabClick("product")}>
              product
            </li>
          </NavLink>
          <li className="active" onClick={() => handleTabClick("productoder")}>
            productoder
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeaderAdmin;
