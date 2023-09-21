import { useState } from "react";
import Foodter from "../../components/Layout/Foodter/Foodter";
import FoodterBar from "../../components/Layout/Foodter/FoodterBar";
import Header from "../../components/Layout/Header/Header";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios, { AxiosResponse } from "axios";

interface Users {
  data: {
    roles: number;
  };
}

interface NewUser {
  register_email: string;
  password: string;
}

function Login() {
  const [type, setType] = useState("password");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const newUser: NewUser = {
    register_email: email,
    password: password,
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEmail(e.target.value);
  };

  const handlePassWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      notification.warning({
        message: "Không được để trống email và password",
      });
      return;
    }

    try {
      const res: AxiosResponse<Users> = await axios.post(
        "http://localhost:3000/register/login",
        newUser
      );

      localStorage.setItem("user", JSON.stringify(res.data.data));
      const role = res.data.data.roles;
      if (role === 1) {
        navigate("/");
      }
      if (role === 0) {
        navigate("/admin");
      }
      notification.success({
        message: "Success",
        description: "Logged in successfully",
      });
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        notification.error({
          message: "Error",
          description: "Email or Password is incorrect",
        });
      } else {
        notification.warning({
          message: "Có lỗi xảy ra, vui lòng thử lại sau",
        });
      }
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className=" helpers--auth-container--3onqZ">
          <h2 className="ud-heading-md helpers--auth-title--26g21">
            Log in to your Udemy account
          </h2>
          <div className=" login-form--greeting--3evwC">
            <img
              src="https://img-c.udemycdn.com/user/50x50/anonymous_3.png"
              alt="NguyenVanHoangHai"
              className="ud-avatar ud-avatar-image"
              width={64}
              height={64}
              style={{ width: "6.4rem", height: "6.4rem" }}
            />
          </div>
          {/* form dang nhap */}
          <div>
            <div className="helpers--auth-form-row--3rFWb">
              {/*  */}
              <div className="form-group">
                <div className="input-data">
                  <input onChange={handleEmail} type="text" required />
                  <label>Email</label>
                </div>
              </div>
              {/*  */}
              <div className="form-group" style={{ marginTop: "10px" }}>
                <div className="input-data">
                  <input
                    type={type === "password" ? "password" : "text"}
                    required
                    onChange={handlePassWord}
                  />
                  <label>Password</label>
                  {type === "password" ? (
                    <>
                      <button onClick={() => setType("text")} className="eye">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setType("password")}
                        className="eye"
                      >
                        <i className="fa-solid fa-eye-slash"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/*  */}
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className=" helpers--auth-submit-button--2K2dh"
            >
              <span>Log in</span>
            </button>
          </div>
          <div className="helpers--auth-footer--2Dkiu">
            <div className="ud-text">
              <span>
                or{" "}
                <a className="ud-text-bold ud-link-underline" href="">
                  Forgot Password
                </a>
              </span>
            </div>
            <div className="helpers--auth-separator--2mEsg" />
            <div className="ud-text-sm">
              <a className="ud-text-bold ud-link-underline" href="">
                Log in to a different account
              </a>
            </div>
            <div className="ud-text-sm">
              <span>
                Don't have an account?{" "}
                <a className="ud-text-bold ud-link-underline" href="">
                  Sign up
                </a>
              </span>
            </div>
            <div className="ud-text-sm">
              <a className="ud-text-bold ud-link-underline" href="">
                Log in with your organization
              </a>
            </div>
          </div>
        </div>
      </div>
      <FoodterBar />
      <Foodter />
    </>
  );
}

export default Login;
