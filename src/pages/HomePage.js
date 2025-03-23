// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connectionService, movieService, bookService, userService } from '../services/api';
import ConnectionCard from '../components/connections/ConnectionCard';
import MovieCard from '../components/movies/MovieCard';
import BookCard from '../components/books/BookCard';
import './HomePage.css';

function HomePage() {
  // State for various data types
  const [connections, setConnections] = useState([]);
  const [popularConnections, setPopularConnections] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userStats, setUserStats] = useState({
    connectionsViewed: 0,
    booksDiscovered: 0,
    favoritesAdded: 0,
    contributionsMade: 0
  });
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user ID for development (replace with actual auth)
  const userId = "current-user-id";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch all necessary data in parallel
        const [connectionsData, booksData, moviesData] = await Promise.all([
          connectionService.getAllConnections(),
          bookService.getAllBooks(),
          movieService.getAllMovies()
        ]);
        
        // Set connections and create mock popular connections
        setConnections(connectionsData);
        
        // Simulate popular connections by shuffling the array
        const shuffled = [...connectionsData].sort(() => 0.5 - Math.random());
        setPopularConnections(shuffled.slice(0, 3));
        
        // Set featured books and movies
        setFeaturedBooks(booksData.slice(0, 3));
        setFeaturedMovies(moviesData.slice(0, 3));
        
        // Try to fetch user data if available
        try {
          // This would be replaced with actual user data from your auth system
          const userFavorites = await userService.getUserFavorites(userId);
          setFavorites(userFavorites);
          
          // Set mock user stats (replace with real stats from API)
          setUserStats({
            connectionsViewed: 12,
            booksDiscovered: 8,
            favoritesAdded: 5,
            contributionsMade: 2
          });
        } catch (userError) {
          console.log('User not logged in or error fetching user data');
          // Non-critical error, so we don't need to show it to the user
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Movie facts for the "Did You Know?" section
  const movieFacts = [
    "In \"Harry Potter and the Philosopher's Stone,\" the books in Dumbledore's office are actually phone books covered in leather.",
    "The book \"The Count of Monte Cristo\" appears in \"Shawshank Redemption\" as a symbol of hope and escape.",
    "In \"The Matrix,\" Neo hides computer disks inside a hollowed-out copy of \"Simulacra and Simulation\" by Jean Baudrillard.",
    "The book \"Hagakure\" guides the philosophy of Forest Whitaker's character in \"Ghost Dog: The Way of the Samurai.\"",
    "In \"Apocalypse Now,\" Colonel Kurtz reads from T.S. Eliot's poem \"The Hollow Men.\"",
  ];
  
  const randomFact = movieFacts[Math.floor(Math.random() * movieFacts.length)];

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality 
    console.log('Searching for:', searchTerm);
    // You would typically navigate to a search results page here
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="homepage__hero">
        <h1 className="homepage__title">Welcome to MovieBooks</h1>
        <p className="homepage__subtitle">
          Discover the literary universe hidden in your favorite films.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="homepage__search-form">
          <input
            type="text"
            placeholder="Search for books, movies, or connections..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="homepage__search-input"
          />
          <button type="submit" className="homepage__search-button">
            Search
          </button>
        </form>
      </div>

      {/* Quick Actions Section */}
      <div className="homepage__quick-actions">
        <Link to="/connections/new" className="homepage__add-button">
          <span>+</span> Add Connection
        </Link>
        
        <button className="homepage__discover-button">
          Discover Random Connection
        </button>
      </div>

      {/* Recent Connections Section */}
      <div className="homepage__section">
        <div className="homepage__section-header">
          <h2 className="homepage__section-title">Recent Connections</h2>
          <Link to="/connections" className="homepage__view-all">
            View All →
          </Link>
        </div>

        {loading ? (
          <p className="homepage__loading">Loading connections...</p>
        ) : error ? (
          <p className="homepage__error">{error}</p>
        ) : connections.length === 0 ? (
          <p className="homepage__empty">No connections found.</p>
        ) : (
          <div className="homepage__connections-list">
            {connections.slice(0, 3).map(connection => (
              <ConnectionCard 
                key={connection._id}
                connection={connection}
                movie={connection.movieId}
                book={connection.bookId}
              />
            ))}
          </div>
        )}
      </div>

      {/* User Favorites Section */}
      <div className="homepage__section">
        <div className="homepage__section-header">
          <h2 className="homepage__section-title">Your Favorites</h2>
          <Link to="/profile" className="homepage__view-all">
            See All →
          </Link>
        </div>
        
        {loading ? (
          <p className="homepage__loading">Loading your favorites...</p>
        ) : favorites && favorites.length > 0 ? (
          <div className="homepage__grid">
            {/* Render favorites here */}
          </div>
        ) : (
          <div className="homepage__empty-favorites">
            <p>You haven't added any favorites yet.</p>
            <Link to="/connections" className="homepage__favorites-link">
              Browse connections to add some!
            </Link>
          </div>
        )}
      </div>
      
      {/* Popular This Week Section */}
      <div className="homepage__section">
        <div className="homepage__section-header">
          <h2 className="homepage__section-title">Popular This Week</h2>
        </div>
        
        {loading ? (
          <p className="homepage__loading">Loading popular connections...</p>
        ) : (
          <div className="homepage__connections-list">
            {popularConnections.slice(0, 2).map(connection => (
              <ConnectionCard 
                key={connection._id}
                connection={connection}
                movie={connection.movieId}
                book={connection.bookId}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Featured Books and Movies Sections */}
      <div className="homepage__media-grid">
        {/* Featured Books */}
        <div className="homepage__section">
          <div className="homepage__section-header">
            <h2 className="homepage__section-title">Featured Books</h2>
            <Link to="/books" className="homepage__view-all">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <p className="homepage__loading">Loading books...</p>
          ) : (
            <div className="homepage__cards-grid">
              {featuredBooks.map(book => (
                <div key={book._id} className="homepage__card-wrapper">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Featured Movies */}
        <div className="homepage__section">
          <div className="homepage__section-header">
            <h2 className="homepage__section-title">Featured Movies</h2>
            <Link to="/movies" className="homepage__view-all">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <p className="homepage__loading">Loading movies...</p>
          ) : (
            <div className="homepage__cards-grid">
              {featuredMovies.map(movie => (
                <div key={movie._id} className="homepage__card-wrapper">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Stats Card */}
      <div className="homepage__stats-card">
        <h2 className="homepage__stats-title">Your MovieBooks Stats</h2>
        <div className="homepage__stats-grid">
          <div className="homepage__stat-item">
            <p className="homepage__stat-number">{userStats.connectionsViewed}</p>
            <p className="homepage__stat-label">Connections Viewed</p>
          </div>
          <div className="homepage__stat-item">
            <p className="homepage__stat-number">{userStats.booksDiscovered}</p>
            <p className="homepage__stat-label">Books Discovered</p>
          </div>
          <div className="homepage__stat-item">
            <p className="homepage__stat-number">{userStats.favoritesAdded}</p>
            <p className="homepage__stat-label">Favorites Added</p>
          </div>
          <div className="homepage__stat-item">
            <p className="homepage__stat-number">{userStats.contributionsMade}</p>
            <p className="homepage__stat-label">Contributions Made</p>
          </div>
        </div>
      </div>

      {/* Did You Know Section */}
      <div className="homepage__fact-card">
        <h2 className="homepage__fact-title">Did You Know?</h2>
        <p className="homepage__fact-text">{randomFact}</p>
      </div>
    </div>
  );
}

export default HomePage;