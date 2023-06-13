import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { useState, useEffect } from "react";
import { apiUrl } from "../../data";
import axios from "axios";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext } from "react";
import { Image } from "antd";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditPhotoClass() {
  const { id } = useParams();
  const { profile, setProfile } = useContext(DataCtx);
  const navigate = useNavigate();
  const [image, setImage] = useState({
    preview: "",
    data: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    // axios post

    await axios.post(apiUrl + "/image_class/" + id, formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        message.success("Image uploaded successfully");
        navigate("/class/detail/" + id);
      } else {
        message.error("Error uploading image");
      }
    });
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <div>
      <ReusableHeader />
      <div className="edit-photo-container">
        <h1 className="edit-photo-text">Edit Photo</h1>
        <div className="image-edit-preview">
          {image.preview && (
            <Image
              src={image.preview}
              width="100"
              height="100"
              style={{ marginBottom: 40, width: 300 }}
            />
          )}
          <hr></hr>
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleFileChange}></input>
            <button type="submit">Submit</button>
          </form>
          {status && <h4>{status}</h4>}
        </div>
      </div>
    </div>
  );
}
