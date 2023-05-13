import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { UserOutlined } from "@ant-design/icons";
import "./style.css";
import { Input } from "antd";

export default function Community() {
  const { TextArea } = Input;
  return (
    <div>
      <ReusableHeader />
      <div className="header-input-upload">
        <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className="profile-img" />
        <div className="upload-input-data">
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
        </div>
      </div>
      <h1>Community</h1>
    </div>
  );
}
