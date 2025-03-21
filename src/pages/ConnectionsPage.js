import React from 'react';
import ConnectionCard from '../components/connections/ConnectionCard';
import connectionsData from '../data/connections.json';
import moviesData from '../data/movies.json';
import booksData from '../data/books.json';

function ConnectionsPage() {
  // Helper function to find movie and book by ID
  const findMovie = (id) => moviesData.find(movie => movie.id === id);
  const findBook = (id) => booksData.find(book => book.id === id);

  return (
    <div className="container">
      <h1>MovieBook Connections</h1>
      <p>Explore the relationships between books and the movies they appear in.</p>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-xl)'
      }}>
        {connectionsData.map(connection => (
          <ConnectionCard 
            key={connection.id} 
            connection={connection}
            movie={findMovie(connection.movieId)}
            book={findBook(connection.bookId)}
          />
        ))}
      </div>
    </div>
  );
}

export default ConnectionsPage;