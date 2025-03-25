// ConnectionCard.js
import React, { useState } from 'react';
import './ConnectionCard.css';

function ConnectionCard({connection, movie, book}) {
  const [screenshotError, setScreenshotError] = useState(false);
  const [moviePosterError, setMoviePosterError] = useState(false);
  const [bookCoverError, setBookCoverError] = useState(false);

  if (!movie || !book) return null;

  // Function to handle standardized image paths
  const getImagePath = (filename, type) => {
    if (!filename) return '';
    
    // If path already includes /images/, return as is
    if (filename.includes('/images/')) return filename;
    
    // If path includes images/ without leading slash, add the slash
    if (filename.includes('images/')) return '/' + filename;
    
    // Base paths by type
    const basePath = type === 'movie' 
      ? '/images/movies/' 
      : type === 'book' 
        ? '/images/books/' 
        : '/images/screenshots/';
    
    // For screenshots, use standardized format
    if (type === 'screenshot') {
      // Extract movie slug from filename or use filename if it's already in slug format
      const movieSlug = filename.includes('screenshot-') 
        ? filename.replace('screenshot-', '')
        : filename;
      
      // Remove extension if present
      const baseSlug = movieSlug.includes('.') 
        ? movieSlug.substring(0, movieSlug.lastIndexOf('.')) 
        : movieSlug;
      
      return `${basePath}screenshot-${baseSlug}.jpg`;
    }
    
    // For other image types, use as is
    return `${basePath}${filename}`;
};

  // Handle image loading errors
  const handleImageError = (type, setter) => {
    console.warn(`Failed to load ${type} image`);
    setter(true);
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
                onError={() => handleImageError('movie', setMoviePosterError)}
                style={moviePosterError ? {opacity: 0.3} : {}}
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
                onError={() => handleImageError('book', setBookCoverError)}
                style={bookCoverError ? {opacity: 0.3} : {}}
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
                src={getImagePath(connection.screenshot, 'screenshot')}
                alt={`Scene from ${movie.title} featuring ${book.title}`}
                className="connection-card__screenshot"
                onError={() => handleImageError('screenshot', setScreenshotError)}
                style={screenshotError ? {opacity: 0.3} : {}}
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