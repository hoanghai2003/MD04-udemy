import assImages from "../../assets/image";
import "./Admin.css";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

function Admin() {
  return (
    <>
      <div className="container-header">
        <div className="header">
          <HeaderAdmin />
        </div>
        <div className="navbar">
          <NavbarAdmin />
          <div className="boss-game">
            <div className="welcom">Welcome Back Boss</div>
            <img src={assImages.Boss} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
