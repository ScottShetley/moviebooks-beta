import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: 'var(--color-secondary)', 
      padding: 'var(--space-md) var(--space-lg)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.5rem', 
          color: 'white',
          textDecoration: 'none'
        }}>
          MovieBooks
        </Link>
        
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <Link to="/movies" style={{ color: 'white', textDecoration: 'none' }}>Movies</Link>
          <Link to="/books" style={{ color: 'white', textDecoration: 'none' }}>Books</Link>
          <Link to="/connections" style={{ color: 'white', textDecoration: 'none' }}>Connections</Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
        </div>
        
        <div style={{ color: 'var(--color-accent)' }}>
          🔔
        </div>
      </div>
    </nav>
  );
}

export default Navbar;