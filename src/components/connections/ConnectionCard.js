// ConnectionCard.js
import React from 'react';
import './ConnectionCard.css';

function ConnectionCard({connection, movie, book}) {
  if (!movie || !book) return null;

  // Function to handle image paths with special case for Matrix
  const getImagePath = (filename, type, movieTitle = '') => {
    if (!filename) return '';
    
    // If already includes the full path, return as is
    if (filename.includes('/images/')) return filename;
    
    // Special case for Matrix - using movieTitle parameter now
    if (type === 'screenshot' && movieTitle && movieTitle.includes('Matrix')) {
      console.log('Matrix screenshot detected, using simulacra.jpg');
      return '/images/screenshots/simulacra.jpg';
    }
    
    // Base paths by type
    const basePath = type === 'movie' 
      ? '/images/movies/' 
      : type === 'book' 
        ? '/images/books/' 
        : '/images/screenshots/';
    
    // For screenshots, make sure we always use jpg extension
    if (type === 'screenshot') {
      // Get base name without extension
      const baseNameWithoutExt = filename.includes('.') 
        ? filename.substring(0, filename.lastIndexOf('.')) 
        : filename;
      
      return `${basePath}${baseNameWithoutExt}.jpg`;
    }
    
    // For other image types, use as is
    return `${basePath}${filename}`;
  };

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
                src={getImagePath(movie.poster, 'movie')}
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
                src={getImagePath(book.cover, 'book')}
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
                src={getImagePath(connection.screenshot, 'screenshot', movie.title)}
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