import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { Image } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import Cookiess from "js-cookie";

export default function ProfilePage() {
  const [data, setData] = useState({});
  const email = Cookiess.get("email");
  useEffect(() => {
    axios.get(`${apiUrl}/profile/${email}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
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
          <div className="box-profile">
            <h1 className="username-profile-text">{data.username}</h1>
            <p className="profile-fullname">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
