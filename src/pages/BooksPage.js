import React from 'react';
import BookCard from '../components/books/BookCard';
import booksData from '../data/books.json';

function BooksPage() {
  return (
    <div className="container">
      <h1>Books Found in Movies</h1>
      <p>Browse all books that appear in movies.</p>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-xl)'
      }}>
        {booksData.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BooksPage;