import React from 'react';

function MovieCard({ movie }) {
  return (
    <div className="card" style={{ 
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto'
    }}>
      {movie.poster && (
        <img 
          src={movie.poster.includes('/images/') ? movie.poster : `/images/movies/${movie.poster}`}
          alt={`${movie.title} poster`} 
          style={{ 
            width: '100%', 
            height: '400px',
            objectFit: 'cover',
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0'
          }} 
        />
      )}
      
      <div style={{ padding: 'var(--space-md)' }}>
        <h3 style={{ 
          fontSize: '1.2rem',
          marginBottom: 'var(--space-xs)'
        }}>{movie.title} ({movie.year})</h3>
        
        <p style={{ 
          fontSize: '0.9rem',
          marginBottom: 'var(--space-sm)'
        }}>Directed by {movie.director}</p>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--space-sm)'
        }}>
          <span style={{ 
            backgroundColor: 'var(--color-secondary)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem'
          }}>{movie.genre}</span>
          
          <span style={{ 
            color: 'var(--color-accent)',
            fontWeight: 'bold'
          }}>
            {"★".repeat(movie.rating)}
            {"☆".repeat(5 - movie.rating)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;