import React from 'react';
import MovieCard from '../components/movies/MovieCard';
import moviesData from '../data/movies.json';

function MoviesPage() {
  return (
    <div className="container">
      <h1>Movies with Book Connections</h1>
      <p>Browse all movies that feature book appearances.</p>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-xl)'
      }}>
        {moviesData.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;