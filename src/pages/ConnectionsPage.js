import React, { useState, useEffect } from 'react';
import ConnectionCard from '../components/connections/ConnectionCard';
import { connectionService, movieService, bookService } from '../services/api';

function ConnectionsPage() {
  const [connections, setConnections] = useState([]);
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all required data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all required data in parallel
        const [connectionsData, moviesData, booksData] = await Promise.all([
          connectionService.getAllConnections(),
          movieService.getAllMovies(),
          bookService.getAllBooks()
        ]);
        
        // Add debugging logs
        console.log("Connections data:", connectionsData);
        console.log("Movies data:", moviesData);
        console.log("Books data:", booksData);
        
        setConnections(connectionsData);
        setMovies(moviesData);
        setBooks(booksData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load connection data. Please try again later.');
        setLoading(false);
      }
    };

    // Call the function
    fetchData();
  }, []);

  // Helper function to find movie and book by ID
  const findMovie = (id) => {
    // If id is an object with _id property, use that
    const movieId = typeof id === 'object' && id !== null ? id._id : id;
    return movies.find(movie => movie._id === movieId);
  };
  
  const findBook = (id) => {
    // If id is an object with _id property, use that
    const bookId = typeof id === 'object' && id !== null ? id._id : id;
    return books.find(book => book._id === bookId);
  };

  console.log("Rendering with connections:", connections);

  return (
    <div className="container">
      <h1>MovieBook Connections</h1>
      <p>Explore the relationships between books and the movies they appear in.</p>
      
      {loading ? (
        <p>Loading connections...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : connections.length === 0 ? (
        <p>No connections found. Please check your database.</p>
      ) : (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
          marginTop: 'var(--space-xl)'
        }}>
          {connections.map(connection => {
            console.log("Rendering connection:", connection);
            const movie = findMovie(connection.movieId);
            const book = findBook(connection.bookId);
            console.log("Found movie and book:", movie, book);
            
            return (
              <ConnectionCard 
                key={connection._id} 
                connection={connection}
                movie={movie}
                book={book}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ConnectionsPage;