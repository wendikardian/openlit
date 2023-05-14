import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { Image } from "antd";

export default function ProfilePage() {
  return (
    <div>
      <ReusableHeader />
      <div className="class-content">
        <div className="profile-box">

          <Image
          className="profile-img-profile"
                  width={300}
                  src="https://i.ibb.co/0jZ3Q0K/Rectangle-1.png"
                />
          <div className='box-profile'>
            <h1 className="username-profile-text">Username</h1>
            <p className='profile-fullname'>Wendi Kardian</p>
          </div>
        </div>
      </div>
    </div>
  );
}
