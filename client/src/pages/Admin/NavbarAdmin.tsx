import { notification } from "antd";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleDeleteUserLocal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    notification.success({
      message: "Đăng xuất thành công",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <div className="navbaradmin">
        <h3>
          <a href="">Back to Udemy</a>
        </h3>
        <img
          src="https://theme.zdassets.com/theme_assets/1073405/6ed3f4eefef20c6eceeedfef97ac699dc81cd605.png"
          alt=""
        />
        <div className="btn-admin">
          <div className="vnkey">
            English(US)<i className="fa-solid fa-angle-down"></i>
          </div>
          <button onClick={handleDeleteUserLocal}>Log out</button>
        </div>
      </div>
    </>
  );
}

export default NavbarAdmin;
