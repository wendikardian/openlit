import React from 'react'
import './Login.css'
import { InputComponent } from './InputComponent'
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div class="w-full flex h-screen">
      <div class="w-3/5 yellow-bg">

      </div>
      <div className="content flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-4xl mb-10">Register</h1>
        <div className="box-login">
            <InputComponent nameInput="Username" />
            <InputComponent nameInput="Email" />
            <InputComponent nameInput="Password" />
            <InputComponent nameInput="Repeat Passowrd" />
        </div>
        <div className="forgot-div  flex justify-end">
        <p class="text-left">Forgot your password ? </p>
        </div>
        <div class="button-login">
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
  )
}
