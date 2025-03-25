import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConnectionForm.css';

const ConnectionForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Image previews
  const [bookCoverPreview, setBookCoverPreview] = useState(null);
  const [moviePosterPreview, setMoviePosterPreview] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    // Book data
    bookTitle: '',
    bookAuthor: '',
    bookYear: '',
    bookGenre: '',
    bookCover: null,
    
    // Movie data
    movieTitle: '',
    movieDirector: '',
    movieYear: '',
    movieGenre: '',
    moviePoster: null,
    movieRating: 3, // Default rating
    
    // Connection data
    description: '',
    context: '',
    timestamp: '',
    screenshot: null
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle numeric input changes
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? '' : Number(value);
    setFormData({
      ...formData,
      [name]: numValue
    });
  };

  // Handle image uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      
      // Create preview based on file input name
      const reader = new FileReader();
      reader.onload = () => {
        if (name === 'bookCover') {
          setBookCoverPreview(reader.result);
        } else if (name === 'moviePoster') {
          setMoviePosterPreview(reader.result);
        } else if (name === 'screenshot') {
          setScreenshotPreview(reader.result);
        }
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
      // Create FormData for multipart form submission
      const formDataToSend = new FormData();
      
      // Add book data
      formDataToSend.append('bookTitle', formData.bookTitle);
      formDataToSend.append('bookAuthor', formData.bookAuthor);
      formDataToSend.append('bookYear', formData.bookYear);
      formDataToSend.append('bookGenre', formData.bookGenre);
      if (formData.bookCover) {
        formDataToSend.append('bookCover', formData.bookCover);
      }
      
      // Add movie data
      formDataToSend.append('movieTitle', formData.movieTitle);
      formDataToSend.append('movieDirector', formData.movieDirector);
      formDataToSend.append('movieYear', formData.movieYear);
      formDataToSend.append('movieGenre', formData.movieGenre);
      formDataToSend.append('movieRating', formData.movieRating);
      if (formData.moviePoster) {
        formDataToSend.append('moviePoster', formData.moviePoster);
      }
      
      // Add connection data
      formDataToSend.append('description', formData.description);
      formDataToSend.append('context', formData.context);
      formDataToSend.append('timestamp', formData.timestamp);
      if (formData.screenshot) {
        formDataToSend.append('screenshot', formData.screenshot);
      }
      
      // Create movie title and book title slugs for filenames
      const movieSlug = formData.movieTitle.toLowerCase().replace(/\s+/g, '-');
      const bookSlug = formData.bookTitle.toLowerCase().replace(/\s+/g, '-');
      formDataToSend.append('movieSlug', movieSlug);
      formDataToSend.append('bookSlug', bookSlug);
      
      // Send to API
      const response = await fetch('/api/connections/unified', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create connection');
      }
      
      setSuccess(true);
      
      // Redirect after success
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

  // Form validation
  const isSubmitDisabled = isLoading || 
    !formData.bookTitle || 
    !formData.bookAuthor || 
    !formData.movieTitle || 
    !formData.movieDirector;

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
      
      <form className="connection-form" onSubmit={handleSubmit}>
        {/* Book Information Section */}
        <div className="connection-form__section">
          <h3 className="connection-form__section-title">Book Information</h3>
          
          <div className="connection-form__group">
            <label htmlFor="bookTitle" className="connection-form__label">
              Book Title <span className="connection-form__required">*</span>
            </label>
            <input
              type="text"
              id="bookTitle"
              name="bookTitle"
              className="connection-form__input"
              value={formData.bookTitle}
              onChange={handleInputChange}
              required
              placeholder="Enter book title"
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="bookAuthor" className="connection-form__label">
              Author <span className="connection-form__required">*</span>
            </label>
            <input
              type="text"
              id="bookAuthor"
              name="bookAuthor"
              className="connection-form__input"
              value={formData.bookAuthor}
              onChange={handleInputChange}
              required
              placeholder="Enter author name"
            />
          </div>
          
          <div className="connection-form__row">
            <div className="connection-form__group">
              <label htmlFor="bookYear" className="connection-form__label">
                Publication Year <span className="connection-form__required">*</span>
              </label>
              <input
                type="number"
                id="bookYear"
                name="bookYear"
                className="connection-form__input"
                value={formData.bookYear}
                onChange={handleNumericChange}
                required
                placeholder="Enter year"
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div className="connection-form__group">
              <label htmlFor="bookGenre" className="connection-form__label">
                Genre <span className="connection-form__required">*</span>
              </label>
              <input
                type="text"
                id="bookGenre"
                name="bookGenre"
                className="connection-form__input"
                value={formData.bookGenre}
                onChange={handleInputChange}
                required
                placeholder="Enter genre"
              />
            </div>
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="bookCover" className="connection-form__label">
              Book Cover <span className="connection-form__required">*</span>
            </label>
            <input
              type="file"
              id="bookCover"
              name="bookCover"
              className="connection-form__file-input"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            
            {bookCoverPreview && (
              <div className="connection-form__image-preview">
                <img src={bookCoverPreview} alt="Book cover preview" />
              </div>
            )}
          </div>
        </div>
        
        {/* Movie Information Section */}
        <div className="connection-form__section">
          <h3 className="connection-form__section-title">Movie Information</h3>
          
          <div className="connection-form__group">
            <label htmlFor="movieTitle" className="connection-form__label">
              Movie Title <span className="connection-form__required">*</span>
            </label>
            <input
              type="text"
              id="movieTitle"
              name="movieTitle"
              className="connection-form__input"
              value={formData.movieTitle}
              onChange={handleInputChange}
              required
              placeholder="Enter movie title"
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="movieDirector" className="connection-form__label">
              Director <span className="connection-form__required">*</span>
            </label>
            <input
              type="text"
              id="movieDirector"
              name="movieDirector"
              className="connection-form__input"
              value={formData.movieDirector}
              onChange={handleInputChange}
              required
              placeholder="Enter director name"
            />
          </div>
          
          <div className="connection-form__row">
            <div className="connection-form__group">
              <label htmlFor="movieYear" className="connection-form__label">
                Release Year <span className="connection-form__required">*</span>
              </label>
              <input
                type="number"
                id="movieYear"
                name="movieYear"
                className="connection-form__input"
                value={formData.movieYear}
                onChange={handleNumericChange}
                required
                placeholder="Enter year"
                min="1888"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div className="connection-form__group">
              <label htmlFor="movieGenre" className="connection-form__label">
                Genre <span className="connection-form__required">*</span>
              </label>
              <input
                type="text"
                id="movieGenre"
                name="movieGenre"
                className="connection-form__input"
                value={formData.movieGenre}
                onChange={handleInputChange}
                required
                placeholder="Enter genre"
              />
            </div>
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="movieRating" className="connection-form__label">
              Rating (1-5) <span className="connection-form__required">*</span>
            </label>
            <input
              type="number"
              id="movieRating"
              name="movieRating"
              className="connection-form__input"
              value={formData.movieRating}
              onChange={handleNumericChange}
              required
              min="1"
              max="5"
              step="1"
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="moviePoster" className="connection-form__label">
              Movie Poster <span className="connection-form__required">*</span>
            </label>
            <input
              type="file"
              id="moviePoster"
              name="moviePoster"
              className="connection-form__file-input"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            
            {moviePosterPreview && (
              <div className="connection-form__image-preview">
                <img src={moviePosterPreview} alt="Movie poster preview" />
              </div>
            )}
          </div>
        </div>
        
        {/* Connection Information Section */}
        <div className="connection-form__section">
          <h3 className="connection-form__section-title">Connection Details</h3>
          
          <div className="connection-form__group">
            <label htmlFor="context" className="connection-form__label">
              Context <span className="connection-form__required">*</span>
            </label>
            <input
              type="text"
              id="context"
              name="context"
              className="connection-form__input"
              value={formData.context}
              onChange={handleInputChange}
              required
              placeholder="How does the book appear in the movie?"
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="timestamp" className="connection-form__label">
              Timestamp <span className="connection-form__required">*</span>
            </label>
            <input
              type="text"
              id="timestamp"
              name="timestamp"
              className="connection-form__input"
              value={formData.timestamp}
              onChange={handleInputChange}
              required
              placeholder="e.g. 1:23:45"
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="description" className="connection-form__label">
              Description <span className="connection-form__required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="connection-form__textarea"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Describe how the book appears in the movie..."
            />
          </div>
          
          <div className="connection-form__group">
            <label htmlFor="screenshot" className="connection-form__label">
              Screenshot <span className="connection-form__required">*</span>
            </label>
            <input
              type="file"
              id="screenshot"
              name="screenshot"
              className="connection-form__file-input"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            
            {screenshotPreview && (
              <div className="connection-form__image-preview">
                <img src={screenshotPreview} alt="Screenshot preview" />
              </div>
            )}
            
            <div className="connection-form__help-text">
              Upload a screenshot from the movie showing the book
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
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
            {isLoading ? 'Creating...' : 'Create Connection'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConnectionForm;