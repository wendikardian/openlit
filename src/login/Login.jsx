import React from 'react'
import './Login.css'
import { InputComponent } from './InputComponent'

export default function Login() {
  return (
    <div class="w-full flex h-screen">
      <div class="w-3/5 yellow-bg">

      </div>
      <div className="content flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-4xl mb-10">Log In</h1>
        <div className="box-login">
            <InputComponent nameInput="Username" />
            <InputComponent nameInput="Password" />
        </div>
        <div className="forgot-div  flex justify-end">
        <p class="text-left">Forgot your password ? </p>
        </div>
        <div class="button-login">
          <p>Login</p>
        </div>
        <p class="mt-5 mb-5">or</p>
        <div class="button-signup">
          <p>Sign up now</p>
        </div>
      </div>
    </div>
  )
}