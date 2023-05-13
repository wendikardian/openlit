import React from 'react'
import './BookCard.css'


export default function BookCard(props) {
  const {img, book, genre, author} = props
  return (
    <div className="card-book">
      <img src={img} className="book-img" />
      <div className="desc-box">
        <h3>{book}</h3>
        <p>{genre}</p>
        <p>By : {author}</p>
      </div>
    </div>
  )
}
