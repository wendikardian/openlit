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

export default function AddBook() {
  const { profile, setProfile } = useContext(DataCtx);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [imageLink, setImageLink] = useState("");
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
      title: title,
      author: author,
      genre: genre,
      imageLink: imageLink,
      description: content,
    };

    axios
      .post(`${apiUrl}/book/`, data)
      .then((res) => {
        console.log(res.data);
        message.success("Book Created Successfully");
        setTimeout(() => {
          navigate("/book/dashboard");
        }, 1000);
      })
      .catch(() => {
        message.error("Something went wrong");
      });
  };

  useEffect(() => {
    console.log(genre);
  }, [genre]);

  return (
    <div>
      <ReusableHeader />
      <div className="edit-box-container">
        <h1>Add Book</h1>
        <div className="class-input-container">
          <div className="form-data">
            <label htmlFor="username">Title : </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-data">
            <label htmlFor="username">Author : </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-data">
            <label htmlFor="username">Image Link : </label>
            <input
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </div>
          <div className="form-data" style={{ marginTop: 20 }}>
            <label htmlFor="username">Genre : </label>
            <select
              name=""
              id=""
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Math">Math</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Other">Other</option>
            </select>
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
        <button onClick={saveData}>Add Book</button>
      </div>
    </div>
  );
}
