import React from "react";
import "./Login.css";
import { InputComponent } from "./InputComponent";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUrl } from "../../data";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      navigate("/profile");
    }
  }, []);

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  const login = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${apiUrl}/login`, data)
      .then((res) => {
        console.log(res);
        navigate("/profile");
        Cookies.set("email", res.data.email);
        Cookies.set("idUser", res.data.idUser);
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
  };

  return (
    <div class="w-full flex h-screen">
      <div class="w-3/5 yellow-bg"></div>
      <div className="content flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-4xl mb-10">Log In</h1>
        {loginError && (
          <Alert
            message="Error"
            description="Email or password is wrong"
            type="error"
            showIcon
            closable
            onClose={() => setLoginError(false)}
          />
        )}
        <div className="box-login">
          <InputComponent
            nameInput="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <InputComponent
            nameInput="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </div>
        <div className="forgot-div  flex justify-end">
          <p class="text-left">Forgot your password ? </p>
        </div>
        <Link to="/book/dashboard">
          <div class="button-login" onClick={login}>
            <p>Login</p>
          </div>
        </Link>
        <p class="mt-5 mb-5">or</p>
        <Link to="/register">
          <div class="button-signup">
            <p>Sign up now</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
