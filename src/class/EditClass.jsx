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
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditClass() {
  const { id } = useParams();
  const location = useLocation();
  const classData = location.state.classData;
  const { profile, setProfile } = useContext(DataCtx);
  const [content, setContent] = useState(classData.description);
  const [className, setClassName] = useState(classData.class_name);
  const [classCode, setClassCode] = useState(classData.class_code);
  const [classPassword, setClassPassword] = useState(classData.password);

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
      description: content,
      password: classPassword,
    };

    axios.put(`${apiUrl}/class/${id}`, data).then(() => {
      message.success("Class Updated Successfully");
      setTimeout(() => {
        navigate("/class/list");
      }, 1000);
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
