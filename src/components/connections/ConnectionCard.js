// ConnectionCard.js
import React from 'react';
import './ConnectionCard.css';

function ConnectionCard({connection, movie, book}) {
  if (!movie || !book) return null;

  return (
    <div className="connection-card">
      <div className="connection-card__header">
        <h3 className="connection-card__title">
          {movie.title}
          {' '}
          <span className="connection-card__plus">+</span>
          {' '}
          {book.title}
        </h3>
      </div>

      <div className="connection-card__content">
        <div className="connection-card__media">
          <div className="connection-card__media-item">
            <h4 className="connection-card__subtitle">Movie</h4>
            <div className="connection-card__media-details">
              <img
                src={
                  movie.poster.includes('/images/')
                    ? movie.poster
                    : `/images/movies/${movie.poster}`
                }
                alt={movie.title}
                className="connection-card__poster"
              />
              <div className="connection-card__info">
                <p><strong>{movie.title}</strong> ({movie.year})</p>
                <p>Director: {movie.director}</p>
                <p>Genre: {movie.genre}</p>
              </div>
            </div>
          </div>

          <div className="connection-card__media-item">
            <h4 className="connection-card__subtitle">Book</h4>
            <div className="connection-card__media-details">
              <img 
                src={book.cover.includes('/images/') ? book.cover : `/images/books/${book.cover}`}
                alt={book.title} 
                className="connection-card__poster"
              />
              <div className="connection-card__info">
                <p><strong>{book.title}</strong></p>
                <p>Author: {book.author}</p>
                <p>Published: {book.year}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="connection-card__description">
          <h4 className="connection-card__subtitle">Connection</h4>
          <p>{connection.description}</p>

          {connection.screenshot &&
            <div className="connection-card__screenshot-container">
              <p><strong>Scene:</strong> {connection.timestamp}</p>
              <img 
                src={connection.screenshot.includes('/images/') ? connection.screenshot : `/images/screenshots/${connection.screenshot}`}
                alt="Scene screenshot" 
                className="connection-card__screenshot"
              />
            </div>}
        </div>

        <div className="connection-card__actions">
          <button className="connection-card__button">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;