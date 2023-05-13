import React from 'react'
import './ArticleCard.css'

export default function ArticleCard(props) {
    const {image, title, author} = props
  return (
    <div className="art-card">
        <img src={image} alt="" className="article-img"/>
        <h1 className="author">{title}</h1>
        <p>By : {author}</p>
    </div>
  )
}
