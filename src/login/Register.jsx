import React from "react";
import "./Login.css";
import { InputComponent } from "./InputComponent";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert } from "antd";
import axios from "axios";
import { apiUrl } from "../../data";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// require("dotenv").config();

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  useEffect(() => {
    console.log(username, email, password, repeatPassword);
  }, [username, email, password, repeatPassword]);


  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      navigate("/profile");
    }
  }, []);

  const submitData = async () => {
    if (password !== repeatPassword) {
      setIsPasswordSame(true);
      return;
    } else {
      const data = {
        username: username,
        email: email,
        password: password,
      };
      console.log(`${apiUrl}/user`);
      axios
        .post(`${apiUrl}/user`, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);

        });
      setIsRegisterSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <div class="w-full flex h-screen">
      <div class="w-3/5 yellow-bg"></div>

      <div className="content flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-4xl mb-10">Register</h1>
        {isRegisterSuccess && (
          <Alert
            message="Register successful"
            type="success"
            showIcon
            closable
          />
        )}

        {isPasswordSame && (
          <Alert
            message="Passwords do not match"
            type="error"
            showIcon
            closable
          />
        )}
        <div className="box-login">
          <InputComponent
            nameInput="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputComponent
            nameInput="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputComponent
            nameInput="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputComponent
            nameInput="Repeat Passowrd"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div class="button-login" onClick={submitData}>
          <p>Register</p>
        </div>
        <p class="mt-5 mb-5">or</p>
        <Link to="/login">
          <div class="button-signup">
            <p>Already have an account ? </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
