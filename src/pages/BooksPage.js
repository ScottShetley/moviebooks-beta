import React, {useState, useEffect} from 'react';
import BookCard from '../components/books/BookCard';
import {bookService} from '../services/api';

function BooksPage () {
  const [books, setBooks] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);

  useEffect (() => {
    // Function to fetch books from the API
    const fetchBooks = async () => {
      try {
        setLoading (true);
        const data = await bookService.getAllBooks ();
        console.log ('First book data:', data[0]); // This will show the first book's full data
        setBooks (data);
        setLoading (false);
      } catch (err) {
        console.error ('Error fetching books:', err);
        setError ('Failed to load books. Please try again later.');
        setLoading (false);
      }
    };

    // Call the function
    fetchBooks ();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return (
    <div className="container">
      <h1>Books Found in Movies</h1>
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
                {books.map (book => <BookCard key={book._id} book={book} />)}
              </div>}
    </div>
  );
}

export default BooksPage;
