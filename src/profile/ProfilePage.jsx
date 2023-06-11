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
import { Link } from "react-router-dom";
import { EditOutlined, KeyOutlined   } from "@ant-design/icons";

export default function ProfilePage() {
  const { profile, setProfile } = useContext(DataCtx);
  const email = Cookies.get("email");
  const [imageProfile, setImageProfile] = useState(null);
  const [first, setFirst] = useState(true);
  console.log(Cookies.get("idUser"));
  useEffect(() => {
    console.log(profile.id);
    if (profile.id !== undefined && first) {
      axios
        .get(`${apiUrl}/image_profile/${profile.id}`, { responseType: "blob" })
        .then((res) => {
          console.log(res);
          const blob = new Blob([res.data], { type: "image/png" });
          const url = URL.createObjectURL(blob);
          setImageProfile(url);
          console.log(imageProfile);
          setFirst(false);
        });
    }
    console.log(profile);
  }, [profile]);

  return (
    <div>
      <ReusableHeader />
      <div className="class-content">
        <div className="profile-box">
          <div>
            <Image
              className="profile-img-profile"
              width={300}
              height={300}
              src={imageProfile}
            />
            <Link to="/edit-photo">
              {" "}
              <p className="edit-photo">Edit Photo profile</p>
            </Link>
          </div>
          <div className="box-profile">
            <h1 className="username-profile-text">{profile.username}</h1>
            <p className="profile-fullname">{profile.name}</p>

            <div className="edit-box">
              <EditOutlined
                className="edit-icon"
                style={{ marginRight: 15, marginLeft: 20 }}
              />
              <Link to="/edit-profile">
                <p className="edit-profile">Edit Profile</p>
              </Link>
            </div>
            <div className="edit-box">
              <KeyOutlined
                className="edit-icon"
                style={{ marginRight: 15, marginLeft: 20 }}
              />
              <Link to="/change-password">
                <p className="edit-profile">Change Password</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
