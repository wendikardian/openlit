import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import BookCard from "../components/BookCard";
import { bookGenre, Book, Articles } from "../../data/Data";
import ArticleCard from "../components/ArticleCard.jsx";
import { useEffect } from "react";
import "./Book.css";

export default function DashboardBook() {
  useEffect(() => {
    console.log(bookGenre);
  }, []);
  return (
    <div>
      <ReusableHeader />
      <div className="categories mt-10 text-4xl">
        <h1>Categories</h1>
        <div className="container-genre">
          {bookGenre.map((item) => {
            return (
              <div className="box-genre">
                <p className="text-base">{item.genre}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="categories mt-14 text-4xl">Books </h1>
        <div className="container-genre">
          {Book.map((item) => {
            return (
              <BookCard
                img={item.image}
                book={item.title}
                genre={item.genre}
                author={item.author}
              />
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="categories mt-14 text-4xl">Articles </h1>
        <div className="container-genre">
          {
            Articles.map(item => {
              return(
                <ArticleCard image={item.image} title={item.title} author={item.author} />
              )
            }
            )
          }

        </div>
      </div>
    </div>
  );
}
