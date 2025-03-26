// src/components/movies/MovieCard.js
import React from 'react';
import './MovieCard.css';
import FavoriteButton from '../shared/FavoriteButton';

function MovieCard({ movie, userId, userFavorites = [] }) {
  // Determine if this movie is in user favorites
  const isFavorited = userFavorites.some(favMovie => 
    favMovie._id === movie._id || favMovie === movie._id
  );
  
  // Handle image path with or without leading slash
  const posterPath = movie.poster?.startsWith('/') 
    ? movie.poster 
    : `/${movie.poster}`;

  return (
    <div className="movie-card">
      <div className="movie-card__favorite">
        <FavoriteButton 
          itemId={movie._id} 
          itemType="movie" 
          isFavorited={isFavorited}
          userId={userId}
        />
      </div>
      
      <div className="movie-card__poster">
        <img 
          src={posterPath} 
          alt={`Poster of ${movie.title}`} 
          onError={(e) => {
            e.target.src = '/images/placeholder-movie.jpg';
          }}
        />
      </div>
      
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{movie.year}</p>
        <p className="movie-card__director">{movie.director}</p>
        
        <div className="movie-card__footer">
          <div className="movie-card__genres">
            {movie.genres && movie.genres.map((genre, index) => (
              <span key={index} className="movie-card__genre">{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;