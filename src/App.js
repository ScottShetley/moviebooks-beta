import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';

// Layout Components
import Navbar from './components/layout/Navbar';

// Page Components
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import MoviesPage from './pages/MoviesPage';
import ConnectionsPage from './pages/ConnectionsPage';
import ProfilePage from './pages/ProfilePage';

// Form Components
import ConnectionForm from './components/connections/ConnectionForm';
import ProfileEdit from './components/users/ProfileEdit';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Form Routes */}
            <Route path="/connections/new" element={<ConnectionForm />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            
            {/* Note: /books/new and /movies/new routes have been removed
                 All creation is now done through the connections form */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;