import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { Image } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import Cookies from "js-cookie";
import { useContext } from "react";
import { DataCtx } from "../DataCtx/Datactx";

export default function ProfilePage() {
  const [data, setData] = useState({});
  const {profile, setProfile} = useContext(DataCtx);
  const email = Cookies.get("email");
  console.log(Cookies.get("idUser"));
  useEffect(() => {
    // axios
    //   .get(`${apiUrl}/profile/${email}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log(profile);
  }, [profile]);
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
            <h1 className="username-profile-text">{profile.username}</h1>
            <p className="profile-fullname">{profile.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
