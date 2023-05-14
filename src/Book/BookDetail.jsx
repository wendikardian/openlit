import React from "react";
import { useParams } from "react-router-dom";
import ReusableHeader from "../components/ReusableHeader";
import { Book } from "../../data/Data";
import { useState, useEffect } from "react";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    const bookdata = Book.find((item) => item.id === id);
    setBook(bookdata);
    console.log(bookdata)
  }, []);

  return (
    <div>
      <ReusableHeader />
      {id}
    </div>
  );
}
