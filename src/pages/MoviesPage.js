import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
import { movieService } from '../services/api';


function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch movies from the API
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieService.getAllMovies();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      }
    };

    // Call the function
    fetchMovies();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return (
    <div className="container">
      <div className="page-header">
        <h1>Movies with Book Connections</h1>
        <Link to="/movies/new" className="add-button">
          Add New Movie
        </Link>
      </div>
      <p>Browse all movies that feature book appearances.</p>
      
      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 'var(--space-lg)',
          marginTop: 'var(--space-xl)'
        }}>
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesPage;