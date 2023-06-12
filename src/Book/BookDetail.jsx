import React from "react";
import { useParams } from "react-router-dom";
import ReusableHeader from "../components/ReusableHeader";
import { Book } from "../../data/Data";
import { useState, useEffect } from "react";
import { Image } from "antd";
import { Button } from "antd";
import { apiUrl } from "../../data";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Spin } from "antd";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dataTitle = location.state.title;
  console.log(dataTitle);

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [first, setFirst] = useState(true);
  const { profile } = useContext(DataCtx);
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

  const getSummary = async () => {
    try {
      axios.post(apiUrl + "/resume", { book: dataTitle }).then((res) => {
        console.log(res.data.message);
        setSummary(res.data.message);
        setLoading(false);
      });
    } catch (error) {
      console.error(err);
    }
  };

  // axios fetch loading async untill the server response
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //     getSummary();
  //   }, 2000);
  // }, []);

  useEffect(() => {
    console.log(book);
    if (first && book.title != undefined) {
      setLoading(true);
      getSummary();
      setFirst(false);
    }
    // setLoading(false);
  }, [book]);

  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }

  return (
    <div>
      <ReusableHeader />
      <div className="container mx-auto">
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
            <Button type="primary" className="btn-book-detail"
              onClick={() => {
                navigate(`/read-book/${book.id}`);
              }}
            >
              Read
            </Button>
            {profile.role == 2 ? (
              <Button
                type="primary"
                style={{ marginLeft: 40 }}
                className="btn-book-detail"
                onClick={() => navigate(`/manage-book/${book.id}`)}
              >
                Manage book
              </Button>
            ) : null}
          </div>
        </div>
        <div className="book-detail-info">
          <div className="to-center">
            <h1 className="book-detail-title">AI Summary Book : </h1>
            <br />
            {loading ? (
              <Spin spinning={loading} tip="Loading..." />
            ) : (
              <p>{summary}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
