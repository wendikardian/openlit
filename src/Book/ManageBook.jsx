import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../data";
import { useState, useEffect } from "react";
import { Image, Button } from "antd";
import ReactHtmlParser from "react-html-parser";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext } from "react";
import ReactQuill from "react-quill";
import { message, Input } from "antd";
const { TextArea } = Input;


export default function ManageBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState("");
  const { profile } = useContext(DataCtx);
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${apiUrl}/book/${id}`);
        console.log(response.data);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }

  const saveData = () => {
    const data = {
      book_id: id,
      title: title,
      detail: content,
      question: question,
    };

    axios
      .post(`${apiUrl}/sub_book`, data)
      .then((res) => {
        console.log(res.data);
        message.success("Data saved");
        setTimeout(() => {
            window.location.reload();
        }, 1000)
      })
      .catch((err) => {
        console.log(err);
        message.error("Data failed to save");
      });
  };

  return (
    <div>
      <ReusableHeader />
      <div className="book-detail-info">
        <Image src={book.image} width={300} />
        <div className="book-detail-desc">
          <h1 className="book-detail-title">Book Detail</h1>
          <h1>
            <span className="bold">Title </span> : {book.title}
          </h1>
          <p>
            {" "}
            <span className="bold"> Author </span> : {book.author}
          </p>
          <p>
            {" "}
            <span className="bold"> Genre </span> : {book.genre}
          </p>
          <h1>
            {" "}
            <span className="bold"> synopsis : </span>{" "}
          </h1>
          <p>{convertToHTML(book.description)}</p>
        </div>
      </div>
      <div className="edit-box-container">
        <div className="class-input-container mt-20">
          <h1>Insert new sub-book</h1>
          <div className="form-data">
            <label htmlFor="username">Title : </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-data mt-10">
            <label htmlFor="username">Question : </label>
            <TextArea width={500}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
          <button onClick={saveData}>Add Materials</button>
          <div style={{ marginBottom: 50 }}></div>
        </div>
      </div>
    </div>
  );
}
