import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import ReactQuill from "react-quill";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { DataCtx } from "../DataCtx/Datactx";
import { Image } from "antd";
import { apiUrl } from "../../data";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditPosting() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { profile } = useContext(DataCtx);
  const handleChange = (value) => {
    setContent(value);
  };
  useEffect(() => {
    console.log(content);
  }, [content]);

  const [image, setImage] = useState({
    preview: "",
    data: "",
  });

  useEffect(() => {
    axios.get(apiUrl + "/feeds/" + id).then((res) => {
      console.log(res.data);
      setContent(res.data.caption);
    });
  }, []);

  const editData = () => {
    const data = {
      content: content,
    };
    axios.put(apiUrl + "/feeds/" + id, data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        message.success("Success to update the data !");
        navigate("/community");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        message.error("Error uploading image");
      }
    });
  };

  return (
    <div>
      <ReusableHeader />
      <div className="mt-120"></div>
      <div className="edit-box-container">
        <h1>Create a New Article / Posting </h1>
        <div className="mt-120"></div>
        <div className="class-input-container">
          <div style={{ marginTop: 50 }}>
            <label htmlFor="username">Description : </label>
            <ReactQuill
              value={content}
              onChange={handleChange}
              style={{ marginTop: 20 }}
            />
          </div>
        </div>
        <button onClick={editData}>Publish</button>
      </div>
    </div>
  );
}
