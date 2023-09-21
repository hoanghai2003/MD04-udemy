import { useState } from "react";
import Foodter from "../../components/Layout/Foodter/Foodter";
import FoodterBar from "../../components/Layout/Foodter/FoodterBar";
import Header from "../../components/Layout/Header/Header";
import "./Signin.css";
import axios from "axios";
import { notification } from "antd";
// import validator from "validator";
import { useNavigate } from "react-router-dom";

interface User {
  full_name: string;
  register_email: string;
  password: string;
  roles: number;
}

function Signin() {
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9]+@gmail+\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  };

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.trim();
    setEmail(email);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      notification.error({
        message: "Error",
        description: "You need to enter full registration information",
      });
      return;
    }

    if (!isEmailValid(email)) {
      notification.error({
        message: "Error",
        description: "Your email is not in the correct format",
      });
      return;
    }

    if (password.length < 5) {
      notification.warning({
        message: "Warning",
        description: "Your password is too short",
      });
      return;
    }

    const NewUser: User = {
      full_name: fullName,
      register_email: email,
      password: password,
      roles: 1,
    };

    await axios
      .post("http://localhost:3000/register/singup", NewUser)
      .then((res) => {
        if (res.data.status === 201) {
          setFullName("");
          setEmail("");
          setPassword("");
          notification.success({
            message: "Đăng kí thành công",
            description: "success",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          notification.warning({
            message: "Warning",
            description: err.response.data.message,
          });
        }
        setEmail("");
      });
  };

  const calculatePasswordComplexity = (password: string): number => {
    let complexityScore = 0;
    if (password.length >= 5) {
      complexityScore += 1;
    }
    if (/[a-z]/.test(password)) {
      complexityScore += 1;
    }
    if (/[A-Z]/.test(password)) {
      complexityScore += 1;
    }
    if (/[0-9]/.test(password)) {
      complexityScore += 1;
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
      complexityScore += 1;
    }
    return complexityScore;
  };

  return (
    <>
      <Header />
      <div className="wrapperr">
        <div className="form-signup">
          <h3>Sign up and start learning</h3>
          <div className="form">
            <div className="form-group">
              <div className="input-data">
                <input type="text" onChange={handleFullName} required />
                <label>Full name</label>
              </div>
            </div>
            {/*  */}
            <div className="form-group">
              <div className="input-data">
                <input type="text" onChange={handleEmail} required />
                <label>Email</label>
              </div>
            </div>
            {/*  */}
            <div className="form-group">
              <div className="input-data">
                <input
                  onChange={handlePassword}
                  type={type === "password" ? "password" : "text"}
                  required
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
                    <button onClick={() => setType("password")} className="eye">
                      <i className="fa-solid fa-eye-slash"></i>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="ud-form-note ud-text-xs">
              <div
                style={{ display: "flex", alignItems: "center", gap: "40px" }}
              >
                <div className="password-form-group--strength--1-2As">
                  <div
                    className={`password-form-group--strength-box--3haiQ password-form-group--strength-box-ok--3CkLz ${
                      calculatePasswordComplexity(password) > 0
                        ? "custom-background"
                        : ""
                    }`}
                  />
                  <div
                    className={`password-form-group--strength-box--3haiQ password-form-group--strength-box-ok--3CkLz ${
                      calculatePasswordComplexity(password) > 1
                        ? "custom-background"
                        : ""
                    }`}
                  />
                  <div
                    className={`password-form-group--strength-box--3haiQ password-form-group--strength-box-ok--3CkLz ${
                      calculatePasswordComplexity(password) > 2
                        ? "custom-background"
                        : ""
                    }`}
                  />
                  <div
                    className={`password-form-group--strength-box--3haiQ password-form-group--strength-box-ok--3CkLz ${
                      calculatePasswordComplexity(password) > 3
                        ? "custom-background"
                        : ""
                    }`}
                  />
                </div>

                <div className="ud-text-xs password-form-group--strength-text--18kPN">
                  {/* <span className="ud-sr-only">
                    {calculatePasswordComplexity(password) > 3
                      ? "Very strong password"
                      : "Password strength"}
                  </span> */}
                  {calculatePasswordComplexity(password) === 0 && (
                    <span>Weak password</span>
                  )}
                  {calculatePasswordComplexity(password) === 1 && (
                    <span>Medium password</span>
                  )}
                  {calculatePasswordComplexity(password) > 1 &&
                    calculatePasswordComplexity(password) <= 3 && (
                      <span>Strong password</span>
                    )}
                  {calculatePasswordComplexity(password) > 3 && (
                    <span>Very strong password</span>
                  )}
                </div>
              </div>
            </div>
            <div className="wh-check">
              <label className="m-popup-checkbox">
                <input type="checkbox" className="m-input-checkbox" />
                <span className="m-checkbox">
                  <span
                    className="m-checkbox-inner"
                    style={{ textAlign: "center" }}
                  >
                    <div className="m-icon-16 m-icon-checkbox-active">
                      <i
                        className="fa-solid fa-check"
                        style={{ width: 16, height: 16, marginLeft: "-1px" }}
                      ></i>
                    </div>
                  </span>
                </span>
                <span className="m-input-checkbox-label">
                  Send me special offers, personalized recommendations, and
                  learning tips.
                </span>
              </label>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className=" helpers--auth-submit-button--2K2dh"
            >
              <span>Sign up</span>
            </button>
          </div>
          <div>
            <div className="helpers--auth-footer--2Dkiu">
              <div className="ud-text-xs helpers--terms-text--nU_vo">
                <span>
                  By signing up, you agree to our{" "}
                  <a className=" ud-link-underline" href="">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a className=" ud-link-underline" href="">
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>
              <div className="helpers--auth-separator--2mEsg" />
              <div className="ud-text-sm">
                <span>
                  Already have an account?{" "}
                  <a className=" ud-link-underline" href="">
                    Log in
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FoodterBar />
      <Foodter />
    </>
  );
}

export default Signin;
