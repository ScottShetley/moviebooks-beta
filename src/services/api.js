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

// Movie API services (similar structure)
export const movieService = {
  getAllMovies: async () => {
    // Similar implementation to getAllBooks
  },
  // Other movie methods
};

// Connection API services
export const connectionService = {
  getAllConnections: async () => {
    // Implementation
  },
  getConnectionsByMovie: async (movieId) => {
    // Implementation
  },
  getConnectionsByBook: async (bookId) => {
    // Implementation
  },
  // Other connection methods
};