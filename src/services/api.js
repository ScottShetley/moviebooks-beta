// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Book API services
export const bookService = {
  // Get all books
  getAllBooks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Get book by ID
  getBookById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  },

  // Create a new book
  createBook: async (bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  // Update a book
  updateBook: async (id, bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating book ${id}:`, error);
      throw error;
    }
  },

  // Delete a book
  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting book ${id}:`, error);
      throw error;
    }
  },
};

// Movie API services
export const movieService = {
  getAllMovies: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getMovieById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching movie ${id}:`, error);
      throw error;
    }
  },

  createMovie: async (movieData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  },

  updateMovie: async (id, movieData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating movie ${id}:`, error);
      throw error;
    }
  },

  deleteMovie: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting movie ${id}:`, error);
      throw error;
    }
  },
};

// Connection API services
export const connectionService = {
  getAllConnections: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }
  },
  
  getConnectionById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching connection ${id}:`, error);
      throw error;
    }
  },

  getConnectionsByMovie: async (movieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/movie/${movieId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching connections for movie ${movieId}:`, error);
      throw error;
    }
  },

  getConnectionsByBook: async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/book/${bookId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching connections for book ${bookId}:`, error);
      throw error;
    }
  },

  createConnection: async (connectionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating connection:', error);
      throw error;
    }
  },

  updateConnection: async (id, connectionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating connection ${id}:`, error);
      throw error;
    }
  },

  deleteConnection: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/connections/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting connection ${id}:`, error);
      throw error;
    }
  },
};