import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

export default function AddClass() {
  const { profile, setProfile } = useContext(DataCtx);
  const [content, setContent] = useState("");
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classPassword, setClassPassword] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };
  const navigate = useNavigate();
  useEffect(() => {
    console.log(content);
  }, [content]);

  const saveData = () => {
    const data = {
      name: className,
      code: classCode,
      password: classPassword,
      description: content,
      lecture_id: profile.id,
    };
    console.log(data);
    axios
      .post(`${apiUrl}/class/`, data)
      .then((res) => {
        console.log(res.data);
        message.success("Class Created Successfully");
        setTimeout(() => {
          navigate("/class/list");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
      });
  };

  return (
    <div>
      <ReusableHeader />
      <div className="edit-box-container">
        <h1>Create a New Class</h1>
        <div className="class-input-container">
          <div className="form-data">
            <label htmlFor="username">Class Name : </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div className="form-data">
            <label htmlFor="username">Class Code : </label>
            <input
              type="number"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
            />
          </div>
          <div className="form-data">
            <label htmlFor="username">Class Password : </label>
            <input
              type="password"
              value={classPassword}
              onChange={(e) => setClassPassword(e.target.value)}
            />
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
        <button onClick={saveData}>Create Class</button>
      </div>
    </div>
  );
}
