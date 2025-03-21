import React from 'react';

function BookCard({ book }) {
  return (
    <div className="card" style={{ 
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto'
    }}>
      {book.cover && (
        <img 
          src={book.cover} 
          alt={`${book.title} cover`} 
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
        }}>{book.title}</h3>
        
        <p style={{ 
          fontSize: '0.9rem',
          marginBottom: 'var(--space-sm)'
        }}>by {book.author} ({book.year})</p>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--space-sm)'
        }}>
          <span style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem'
          }}>{book.genre}</span>
        </div>
      </div>
    </div>
  );
}

export default BookCard;