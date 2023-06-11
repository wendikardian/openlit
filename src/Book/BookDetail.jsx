import React from "react";
import { useParams } from "react-router-dom";
import ReusableHeader from "../components/ReusableHeader";
import { Book } from "../../data/Data";
import { useState, useEffect } from "react";
import { Image } from "antd";
import { Button } from "antd";
import { apiUrl } from "../../data";
import axios from "axios";
import { Spin } from "antd";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [first, setFirst] = useState(true);
  useEffect(() => {
    const bookdata = Book.find((item) => item.id == id);
    setBook(bookdata);
  }, []);

  const getSummary = async () => {
    try {
      axios.post(apiUrl + "/resume", { book: book.title }).then((res) => {
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
    if(first && book.title != undefined){
      setLoading(true);
      getSummary();
      setFirst(false);
    }
    // setLoading(false);
  }, [book]);

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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis, tenetur. Ut perspiciatis molestias, numquam unde
              soluta dolorem alias harum, exercitationem impedit quam a.
              Laborum, nesciunt ratione cumque molestiae ad repellendus.
            </p>
            <Button type="primary" className="btn-book-detail">
              Read
            </Button>
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
