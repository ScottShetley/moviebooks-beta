import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';

// Pages
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import BooksPage from './pages/BooksPage';
import ConnectionsPage from './pages/ConnectionsPage';
import ProfilePage from './pages/ProfilePage';

// Form Components
import BookForm from './components/books/BookForm';
import MovieForm from './components/movies/MovieForm';
import ConnectionForm from './components/connections/ConnectionForm';

// Components
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main style={{ padding: 'var(--space-lg) 0' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* New form routes */}
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/movies/new" element={<MovieForm />} />
            <Route path="/connections/new" element={<ConnectionForm />} />
          </Routes>
        </main>
        <footer style={{ 
          backgroundColor: 'var(--color-secondary)', 
          color: 'white',
          padding: 'var(--space-md)',
          textAlign: 'center'
        }}>
          © 2025 MovieBooks BETA. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;