// src/components/books/BookCard.js
import React from 'react';
import './BookCard.css';
import FavoriteButton from '../shared/FavoriteButton';

function BookCard({ book, userId, userFavorites = [] }) {
  // Determine if this book is in user favorites
  const isFavorited = userFavorites.some(favBook => 
    favBook._id === book._id || favBook === book._id
  );
  
  // Handle image path with or without leading slash
  const coverPath = book.cover?.startsWith('/') 
    ? book.cover 
    : `/${book.cover}`;

  return (
    <div className="book-card">
      <div className="book-card__favorite">
        <FavoriteButton 
          itemId={book._id} 
          itemType="book" 
          isFavorited={isFavorited}
          userId={userId}
        />
      </div>
      
      <div className="book-card__cover">
        <img 
          src={coverPath} 
          alt={`Cover of ${book.title}`} 
          onError={(e) => {
            e.target.src = '/images/placeholder-book.jpg';
          }}
        />
      </div>
      
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        
        <div className="book-card__footer">
          <div className="book-card__genres">
            {book.genres && book.genres.map((genre, index) => (
              <span key={index} className="book-card__genre">{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;