// api.js - Revised with correct export structure

// Base API URL
const API_URL = '/api';

// Book Service
const bookService = {
  // Add this function that your pages are likely calling
  getAllBooks: async () => {
    try {
      const response = await fetch(`${API_URL}/books`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },

  createBook: async (bookData) => {
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Failed to create book');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  updateBook: async (id, bookData) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
};

// Movie Service
const movieService = {
  // Add this function that your pages are likely calling
  getAllMovies: async () => {
    try {
      const response = await fetch(`${API_URL}/movies`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getMovieById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/movies/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  },

  createMovie: async (movieData) => {
    try {
      const response = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error('Failed to create movie');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  },

  updateMovie: async (id, movieData) => {
    try {
      const response = await fetch(`${API_URL}/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) {
        throw new Error('Failed to update movie');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  },

  deleteMovie: async (id) => {
    try {
      const response = await fetch(`${API_URL}/movies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }
};

// Connection Service
const connectionService = {
  // Add this function that your pages are likely calling
  getAllConnections: async () => {
    try {
      const response = await fetch(`${API_URL}/connections`);
      if (!response.ok) {
        throw new Error('Failed to fetch connections');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }
  },

  getConnectionById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/connections/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch connection');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching connection:', error);
      throw error;
    }
  },

  createConnection: async (connectionData) => {
    try {
      const response = await fetch(`${API_URL}/connections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionData),
      });
      if (!response.ok) {
        throw new Error('Failed to create connection');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating connection:', error);
      throw error;
    }
  },

  updateConnection: async (id, connectionData) => {
    try {
      const response = await fetch(`${API_URL}/connections/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionData),
      });
      if (!response.ok) {
        throw new Error('Failed to update connection');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating connection:', error);
      throw error;
    }
  },

  deleteConnection: async (id) => {
    try {
      const response = await fetch(`${API_URL}/connections/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete connection');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting connection:', error);
      throw error;
    }
  }
};

// User Service (new)
const userService = {
  getUserProfile: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  updateUserProfile: async (userId, userData) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  getUserFavorites: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`);
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      throw error;
    }
  },

  addToFavorites: async (userId, itemId, itemType) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, itemType }),
      });
      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async (userId, itemId, itemType) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, itemType }),
      });
      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }
      return await response.json();
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }
};

// Export all services as named exports
export {
  bookService,
  movieService,
  connectionService,
  userService
};