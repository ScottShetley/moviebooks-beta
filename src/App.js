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