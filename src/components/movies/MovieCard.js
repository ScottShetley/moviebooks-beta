// MovieCard.js
import React from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      {movie.poster && (
        <div className="movie-card__image-container">
          <img 
            src={movie.poster.includes('/images/') 
              ? movie.poster 
              : movie.poster.includes('images/') 
                ? `/${movie.poster}` 
                : `/images/movies/${movie.poster}`}
            alt={`${movie.title} poster`} 
            className="movie-card__image"
          />
        </div>
      )}
      
      <div className="movie-card__content">
        <h3 className="movie-card__title">
          {movie.title} {movie.year && `(${movie.year})`}
        </h3>
        
        <p className="movie-card__director">
          Directed by {movie.director}
        </p>
        
        <div className="movie-card__footer">
          <span className="movie-card__genre-tag">
            {movie.genre}
          </span>
          
          {movie.rating && (
            <span className="movie-card__rating">
              {"★".repeat(movie.rating)}
              {"☆".repeat(5 - movie.rating)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;