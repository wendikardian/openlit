import React from 'react'
import './BookCard.css'


export default function BookCard() {
  return (
    <div className="card-book">
      <img src="https://m.media-amazon.com/images/I/71Ia7ZfsETL.jpg" className="book-img" />
      <div>
        <h3>Career/Success</h3>
        <p>Art/Design</p>
        <p>By : Cal Newport</p>
      </div>
    </div>
  )
}
