import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import BookCard from "../components/BookCard";
import { bookGenre, Book, Articles } from "../../data/Data";
import ArticleCard from "../components/ArticleCard.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Book.css";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";
import { DataCtx } from "../DataCtx/Datactx";
import axios from "axios";
import { apiUrl } from "../../data";

export default function DashboardBook() {
  const [bookData, setBookData] = useState([]);
  const { profile } = useContext(DataCtx);
  useEffect(() => {
    if (bookData.length === 0) {
      axios.get(`${apiUrl}/all_book/`).then((res) => {
        console.log(res.data);
        setBookData(res.data);
      });
    }
  }, [bookData]);
  const navigate = useNavigate();
  return (
    <div>
      <ReusableHeader />
      <div>
        <h1 className="categories mt-14 text-4xl mt-60">Books </h1>
        <div className="container-genre">
          {bookData.map((item) => {
            return (
              <BookCard
                img={item.image}
                book={item.title}
                genre={item.genre}
                author={item.author}
                onClick={() => {
                  navigate(`/book/${item.id}`, {
                    state: { title: item.title },
                  });
                }}
              />
            );
          })}
        </div>
      </div>
      {profile.role == 2 ? (
        <Link to="/add-book">
          <div className="add-class">
            <PlusOutlined />
          </div>
        </Link>
      ) : null}
      {/* <div>
        <h1 className="categories mt-14 text-4xl">Articles </h1>
        <div className="container-genre">
          {Articles.map((item) => {
            return (
              <ArticleCard
                image={item.image}
                title={item.title}
                author={item.author}
              />
            );
          })}
        </div>
      </div> */}
    </div>
  );
}
