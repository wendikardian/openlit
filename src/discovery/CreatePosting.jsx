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

export default function CreatePosting() {
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

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const submitData = async () => {
    const data = {
      fk_user: profile.id,
      caption: content,
      // get current data in unix date
      date: moment().unix(),
    };
    let formData = new FormData();
    formData.append("file", image.data);
    formData.append("data", JSON.stringify(data));
    await axios.post(apiUrl + "/add_posting/", formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        message.success("Image uploaded successfully");
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
          {image.preview && (
            <Image
              src={image.preview}
              width="100"
              height="100"
              style={{ marginBottom: 40, width: 300 }}
            />
          )}
          <div className="form-data">
            <label htmlFor="username">Posting Image : </label>
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
          <div style={{ marginTop: 50 }}>
            <label htmlFor="username">Description : </label>
            <ReactQuill
              value={content}
              onChange={handleChange}
              style={{ marginTop: 20 }}
            />
          </div>
        </div>
        <button onClick={submitData}>Create Class</button>
      </div>
    </div>
  );
}
