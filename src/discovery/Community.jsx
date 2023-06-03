import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { SendOutlined } from "@ant-design/icons";
import "./style.css";
import { Input, Button } from "antd";
import { posting } from "../../data/Data";
import { Image } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext } from "react";

export default function Community() {
  const { TextArea } = Input;
  const [post, setPost] = useState([]);
  const {profile} = useContext(DataCtx)
  useEffect(  () => {
    axios
      .get(apiUrl + "/feeds")
      .then((res) => {
        setPost(res.data);
        console.log(post)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <ReusableHeader />
      <div className="header-input-upload">
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          className="profile-img"
        />
        <div className="upload-input-data">
          <TextArea rows={4} placeholder="Insert your caption" maxLength={6} />
        </div>
        <Button
          type="primary"
          style={{ backgroundColor: "darkblue", marginTop: 40 }}
          shape="circle"
          icon={<SendOutlined />}
        />
      </div>
      <div className="feed-cont">
        {post.map((item) => {
          return (
            <div className="feed-card">
              <div className="profile-feeds">
                <img
                  src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                  className="profile-img"
                />
                <p style={{ marginLeft: 30 }}>{item.user}</p>
              </div>
              <div className="feed-content">
                <Image width={400} src={item.profile} />
                <p className="caption-feed"> {item.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
