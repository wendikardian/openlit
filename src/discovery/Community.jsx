import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { SendOutlined } from "@ant-design/icons";
import "./style.css";
import { Input, Button } from "antd";
import { posting } from "../../data/Data";
import { Image } from "antd";

export default function Community() {
  const { TextArea } = Input;
  return (
    <div>
      <ReusableHeader />
      <div className="header-input-upload">
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          className="profile-img"
        />
        <div className="upload-input-data">
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
        </div>
        <Button
          type="primary"
          style={{ backgroundColor: "darkblue", marginTop: 40 }}
          shape="circle"
          icon={<SendOutlined />}
        />
      </div>
      <div className="feed-cont">
        <div className="feed-card">
          <div className="profile-feeds">
            <img
              src="https://img.freepik.com/free-icon/user_318-159711.jpg"
              className="profile-img"
            />
            <p style={{ marginLeft: 30 }}>Wendi kardian</p>
          </div>
          <div className="feed-content">
            <Image
              width={400}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <p className="caption-feed">
              {" "}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
              soluta, libero vero amet nostrum temporibus odio culpa consectetur
              nemo saepe! Quidem eaque officiis animi iusto impedit dolorum
              minima cupiditate et.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
