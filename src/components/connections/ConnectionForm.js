import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConnectionForm.css';
import { bookService, movieService } from '../../services/api';

const ConnectionForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Data for dropdowns
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    bookId: '',
    movieId: '',
    description: '',
    context: '',
    timestamp: '',
    screenshotImage: null
  });

  // Fetch books and movies for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [booksData, moviesData] = await Promise.all([
          bookService.getAllBooks(),
          movieService.getAllMovies()
        ]);
        
        setBooks(booksData || []);
        setMovies(moviesData || []);
      } catch (err) {
        setError('Failed to load books and movies. Please try again.');
      } finally {
        setLoadingData(false);
      }
    };
    
    fetchData();
  }, []);

  // Context options
  const contextOptions = [
    'Character reading the book',
    'Book appears in background',
    'Book mentioned in dialogue',
    'Book influences plot',
    'Book shown briefly',
    'Book is a major plot element',
    'Other'
  ];

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        screenshotImage: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('bookId', formData.bookId);
      formDataToSend.append('movieId', formData.movieId);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('context', formData.context);
      formDataToSend.append('timestamp', formData.timestamp);
      
      // Get the selected book and movie titles to create a screenshot filename
      const selectedBook = books.find(book => book._id === formData.bookId);
      const selectedMovie = movies.find(movie => movie._id === formData.movieId);
      
      if (selectedBook && selectedMovie) {
        const bookSlug = selectedBook.title.toLowerCase().replace(/\s+/g, '-');
        const movieSlug = selectedMovie.title.toLowerCase().replace(/\s+/g, '-');
        formDataToSend.append('movieName', movieSlug);
        formDataToSend.append('bookName', bookSlug);
        formDataToSend.append('filenameInfo', `${movieSlug}_${bookSlug}`);
      }
      
      if (formData.screenshotImage) {
        formDataToSend.append('screenshotImage', formData.screenshotImage);
      }
      
      // Create a new createConnectionWithImage function to handle FormData
      const createConnectionWithImage = async (connectionData) => {
        try {
          // Use fetch with FormData (browser sets Content-Type header)
          const response = await fetch('/api/connections', {
            method: 'POST',
            body: connectionData
          });
          
          if (!response.ok) {
            throw new Error('Failed to create connection');
          }
          
          return await response.json();
        } catch (error) {
          console.error('Error creating connection with image:', error);
          throw error;
        }
      };
      
      // Send to API
      await createConnectionWithImage(formDataToSend);
      
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        navigate('/connections');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create connection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel form
  const handleCancel = () => {
    navigate('/connections');
  };

  // Check if form can be submitted
  const isSubmitDisabled = !formData.bookId || !formData.movieId || isLoading;

  return (
    <div className="connection-form-container">
      <h2 className="connection-form__title">Add New Book-Movie Connection</h2>
      
      {success && (
        <div className="connection-form__success">
          Connection added successfully! Redirecting...
        </div>
      )}
      
      {error && (
        <div className="connection-form__error">
          {error}
        </div>
      )}
      
      {loadingData ? (
        <div className="connection-form__loading">
          Loading books and movies...
        </div>
      ) : (
        <form className="connection-form" onSubmit={handleSubmit}>
          <div className="connection-form__group">
            <label htmlFor="bookId" className="connection-form__label">
              Book <span className="connection-form__required">*</span>
            </label>
            <select
              id="bookId"
              name="bookId"
              className="connection-form__select"
              value={formData.bookId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a book</option>
              {books.map(book => (
                <option key={book._id} value={book._id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="movieId" className="connection-form__label">
              Movie <span className="connection-form__required">*</span>
            </label>
            <select
              id="movieId"
              name="movieId"
              className="connection-form__select"
              value={formData.movieId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a movie</option>
              {movies.map(movie => (
                <option key={movie._id} value={movie._id}>
                  {movie.title} ({movie.releaseYear})
                </option>
              ))}
            </select>
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="context" className="connection-form__label">
              Context
            </label>
            <select
              id="context"
              name="context"
              className="connection-form__select"
              value={formData.context}
              onChange={handleInputChange}
            >
              <option value="">Select how the book appears in the movie</option>
              {contextOptions.map(context => (
                <option key={context} value={context}>
                  {context}
                </option>
              ))}
            </select>
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="timestamp" className="connection-form__label">
              Timestamp
            </label>
            <input
              type="text"
              id="timestamp"
              name="timestamp"
              className="connection-form__input"
              value={formData.timestamp}
              onChange={handleInputChange}
              placeholder="e.g. 1:23:45"
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="description" className="connection-form__label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="connection-form__textarea"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe how the book appears in the movie..."
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="screenshotImage" className="connection-form__label">
              Screenshot Image
            </label>
            <input
              type="file"
              id="screenshotImage"
              name="screenshotImage"
              className="connection-form__file-input"
              onChange={handleImageChange}
              accept="image/*"
            />
            
            <div className="connection-form__help-text">
              Upload a screenshot from the movie showing the book
            </div>
            
            {imagePreview && (
              <div className="connection-form__image-preview">
                <img src={imagePreview} alt="Screenshot preview" />
              </div>
            )}
          </div>
          
          <div className="connection-form__actions">
            <button 
              type="button" 
              className="connection-form__button connection-form__button--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="connection-form__button connection-form__button--submit"
              disabled={isSubmitDisabled}
            >
              {isLoading ? 'Adding...' : 'Add Connection'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ConnectionForm;