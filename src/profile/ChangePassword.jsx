import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import axios from "axios";
import { apiUrl } from "../../data";
import { useState } from "react";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { profile } = useContext(DataCtx);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    console.log(newPassword);
  }, [newPassword]);

  const saveData = () => {
    if (newPassword == confirm) {
      const data = {
        oldPassword: oldPassword,
        password: newPassword,
      };
      axios
        .put(`${apiUrl}/edit_password/${profile.id}`, data)
        .then((res) => {
          console.log(res.data);
          message.success("Password Updated Successfully");
          setTimeout(() => {
            navigate("/profile");
            window.location.reload();
          }, 1000);
          setOldPassword("");
          setNewPassword("");
          setConfirm("");
        })
        .catch((err) => {
          console.log(err);
          message.error("Something went wrong");
        });
    } else {
      message.error("Passwords do not match");
    }
  };
  return (
    <div>
      <ReusableHeader />
      <div className="edit-box-container">
        <h1>Change Passsword</h1>
        <div className="form-data">
          <label htmlFor="username">Old Password : </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="form-data">
          <label htmlFor="username">New Password : </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-data">
          <label htmlFor="username">Repeat Password : </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <button onClick={saveData}>Update Password</button>
      </div>
    </div>
  );
}
