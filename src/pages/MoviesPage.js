import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
import {movieService, userService} from '../services/api';

function MoviesPage () {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Temporary user ID - will be replaced with authentication later
  const userId = '6512345678901234567890ab';
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    // Function to fetch movies and user favorites from the API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch movies and user favorites in parallel
        const [moviesData, favoritesData] = await Promise.all([
          movieService.getAllMovies(),
          userService.getUserFavorites(userId).catch(err => {
            console.error('Error fetching favorites:', err);
            return { movies: [] }; // Return empty favorites if API fails
          })
        ]);
        
        setMovies(moviesData);
        setUserFavorites(favoritesData.movies || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      }
    };

    // Call the function
    fetchData();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return (
    <div className="container">
      <div className="page-header">
        <h1>Movies with Book Connections</h1>
      </div>
      <p>Browse all movies that feature book appearances.</p>

      {loading
        ? <p>Loading movies...</p>
        : error
            ? <p className="error-message">{error}</p>
            : <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: 'var(--space-lg)',
                  marginTop: 'var(--space-xl)',
                }}
              >
                {movies.map(movie => (
                  <MovieCard 
                    key={movie._id} 
                    movie={movie} 
                    userId={userId}
                    userFavorites={userFavorites}
                  />
                ))}
              </div>}
    </div>
  );
}

export default MoviesPage;