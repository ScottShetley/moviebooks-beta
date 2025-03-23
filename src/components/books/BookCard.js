import React from 'react';
import './BookCard.css';

function BookCard({ book }) {
  return (
    <div className="book-card">
      {book.cover && (
        <div className="book-card__image-container">
          <img 
            src={book.cover.includes('/images/') ? book.cover : `/images/books/${book.cover}`}
            alt={`${book.title} cover`} 
            className="book-card__image"
          />
        </div>
      )}
      
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        
        <p className="book-card__author">
          by {book.author} {book.year && `(${book.year})`}
        </p>
        
        <div className="book-card__footer">
          <span className="book-card__genre-tag">
            {book.genre}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookCard;