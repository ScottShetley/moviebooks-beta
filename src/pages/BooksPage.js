import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/books/BookCard';
import {bookService, userService} from '../services/api';

function BooksPage () {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Temporary user ID - will be replaced with authentication later
  const userId = '6512345678901234567890ab';
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    // Function to fetch books and user favorites from the API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch books and user favorites in parallel
        const [booksData, favoritesData] = await Promise.all([
          bookService.getAllBooks(),
          userService.getUserFavorites(userId).catch(err => {
            console.error('Error fetching favorites:', err);
            return { books: [] }; // Return empty favorites if API fails
          })
        ]);
        
        console.log('First book data:', booksData[0]);
        setBooks(booksData);
        setUserFavorites(favoritesData.books || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
        setLoading(false);
      }
    };

    // Call the function
    fetchData();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return (
    <div className="container">
      <div className="page-header">
        <h1>Books Found in Movies</h1>
      </div>
      <p>Browse all books that appear in movies.</p>

      {loading
        ? <p>Loading books...</p>
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
                {books.map(book => (
                  <BookCard 
                    key={book._id} 
                    book={book} 
                    userId={userId}
                    userFavorites={userFavorites}
                  />
                ))}
              </div>}
    </div>
  );
}

export default BooksPage;