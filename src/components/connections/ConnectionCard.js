import React from 'react';

function ConnectionCard({connection, movie, book}) {
  if (!movie || !book) return null;

  return (
    <div
      className="card"
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        marginBottom: 'var(--space-lg)',
      }}
    >
      <div
        style={{
          borderBottom: '1px solid #eee',
          padding: 'var(--space-md)',
          backgroundColor: 'var(--color-secondary)',
          color: 'white',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        }}
      >
        <h3
          style={{
            fontSize: '1.4rem',
            margin: 0,
          }}
        >
          {movie.title}
          {' '}
          <span style={{color: 'var(--color-accent)'}}>+</span>
          {' '}
          {book.title}
        </h3>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-md)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-md)',
          }}
        >
          <div style={{flex: '1', minWidth: '200px'}}>
            <h4>Movie</h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-md)',
              }}
            >
              <img
                src={
                  movie.poster.includes ('/images/')
                    ? movie.poster
                    : `/images/movies/${movie.poster}`
                }
                alt={movie.title}
                style={{width: '100px', borderRadius: 'var(--radius-sm)'}}
              />
              <div>
                <p><strong>{movie.title}</strong> ({movie.year})</p>
                <p>Director: {movie.director}</p>
                <p>Genre: {movie.genre}</p>
              </div>
            </div>
          </div>

          <div style={{flex: '1', minWidth: '200px'}}>
            <h4>Book</h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-md)',
              }}
            >
              <img 
  src={book.cover.includes('/images/') ? book.cover : `/images/books/${book.cover}`}
  alt={book.title} 
  style={{ width: '100px', borderRadius: 'var(--radius-sm)' }} 
/>
              <div>
                <p><strong>{book.title}</strong></p>
                <p>Author: {book.author}</p>
                <p>Published: {book.year}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4>Connection</h4>
          <p>{connection.description}</p>

          {connection.screenshot &&
            <div style={{marginTop: 'var(--space-md)'}}>
              <p><strong>Scene:</strong> {connection.timestamp}</p>
              <img 
  src={connection.screenshot.includes('/images/') ? connection.screenshot : `/images/screenshots/${connection.screenshot}`}
  alt="Scene screenshot" 
  style={{ 
    width: '100%', 
    maxHeight: '300px',
    objectFit: 'contain',
    marginTop: 'var(--space-sm)',
    borderRadius: 'var(--radius-sm)'
  }} 
/>
            </div>}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--space-sm)',
            marginTop: 'var(--space-lg)',
          }}
        >
          <button
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-sm) var(--space-md)',
              cursor: 'pointer',
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
