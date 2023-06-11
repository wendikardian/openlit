import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { profile, setProfile } = useContext(DataCtx);
  const [username, setUsername] = useState(profile.username);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const navigate = useNavigate();

  const submitData = () => {
    const data = {
      username: username,
      name: name,
      email: email,
    };
    axios
      .put(`${apiUrl}/profile/${profile.id}`, data)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        message.success("Profile Updated Successfully");
        setTimeout(() => {
            navigate("/profile");
            window.location.reload();
        }, 1000)
        // navigate to profile page
        // navigate is not a function error

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
        <h1>Edit Your profile</h1>
        <div className="form-data">
          <label htmlFor="username">Email : </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-data">
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-data">
          <label htmlFor="username">Fullname : </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button onClick={submitData}>Update Profile</button>
      </div>
    </div>
  );
}
