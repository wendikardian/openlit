import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { Button, Image } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataCtx } from "../DataCtx/Datactx";

export default function EnrollClass() {
  const { profile } = useContext(DataCtx);
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const [classData, setClassData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${apiUrl}/class/${id}/${profile.id}`)
      .then((res) => {
        console.log(res.data);
        setClassData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const enrollClass = () => {
    if (classData.password == password) {
      axios
        .post(`${apiUrl}/enroll_class`, {
          user_id: profile.id,
          class_id: id,
        })
        .then((res) => {
          console.log(res.data);
          message.success("Class enrolled");
          navigate(`/class/detail/${id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.error("Password is wrong");
    }
  };
  return (
    <div>
      <ReusableHeader />
      <div className="edit-box-container">
        <h1>Create a New Class</h1>
        <div className="class-input-container">
          <div className="form-data">
            <label htmlFor="username">Password Enrollment : </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => {
            enrollClass();
          }}
        >
          Enroll Class
        </button>
      </div>
    </div>
  );
}
