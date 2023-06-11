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
import { Spin } from "antd";
import { ButtonComponent } from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

export default function Community() {
  const { TextArea } = Input;
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const { profile } = useContext(DataCtx);
  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }

  useEffect(() => {
    axios
      .get(apiUrl + "/feeds")
      .then((res) => {
        setPost(res.data);
        console.log(post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <ReusableHeader />
      {/* <div className="header-input-upload">
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
      </div> */}
      <ButtonComponent
        text="Create Posting"
        style={{ marginTop: 150 }}
        onClick={() => navigate("/create-posting")}
      />
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
                {convertToHTML(item.caption)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
