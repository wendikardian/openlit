import React from "react";
import "./Login.css";
import { InputComponent } from "./InputComponent";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div class="w-full flex h-screen">
      <div class="w-3/5 yellow-bg"></div>
      <div className="content flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-4xl mb-10">Log In</h1>
        <div className="box-login">
          <InputComponent nameInput="Username" />
          <InputComponent nameInput="Password" />
        </div>
        <div className="forgot-div  flex justify-end">
          <p class="text-left">Forgot your password ? </p>
        </div>
        <Link to="/book/dashboard">

        <div class="button-login">
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
