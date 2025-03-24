import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieForm.css';
import { movieService } from '../../services/api';

const MovieForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: [],
    description: '',
    posterImage: null
  });

  // Pre-defined genre options
  const genreOptions = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
    'Documentary', 'Drama', 'Fantasy', 'Historical', 'Horror',
    'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'Western'
  ];

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle genre selection (multiple)
  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        genre: [...formData.genre, value]
      });
    } else {
      setFormData({
        ...formData,
        genre: formData.genre.filter(genre => genre !== value)
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        posterImage: file
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
      formDataToSend.append('title', formData.title);
      formDataToSend.append('director', formData.director);
      formDataToSend.append('releaseYear', formData.releaseYear);
      formData.genre.forEach(genre => {
        formDataToSend.append('genre', genre);
      });
      formDataToSend.append('description', formData.description);
      if (formData.posterImage) {
        formDataToSend.append('posterImage', formData.posterImage);
      }
      
      // Create a new createMovieWithImage function to handle FormData
      const createMovieWithImage = async (movieData) => {
        try {
          // Use fetch with FormData (browser sets Content-Type header)
          const response = await fetch('/api/movies', {
            method: 'POST',
            body: movieData
          });
          
          if (!response.ok) {
            throw new Error('Failed to create movie');
          }
          
          return await response.json();
        } catch (error) {
          console.error('Error creating movie with image:', error);
          throw error;
        }
      };
      
      // Send to API
      await createMovieWithImage(formDataToSend);
      
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        navigate('/movies');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create movie. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel form
  const handleCancel = () => {
    navigate('/movies');
  };

  return (
    <div className="movie-form-container">
      <h2 className="movie-form__title">Add New Movie</h2>
      
      {success && (
        <div className="movie-form__success">
          Movie added successfully! Redirecting...
        </div>
      )}
      
      {error && (
        <div className="movie-form__error">
          {error}
        </div>
      )}
      
      <form className="movie-form" onSubmit={handleSubmit}>
        <div className="movie-form__group">
          <label htmlFor="title" className="movie-form__label">
            Title <span className="movie-form__required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="movie-form__input"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="movie-form__group">
          <label htmlFor="director" className="movie-form__label">
            Director
          </label>
          <input
            type="text"
            id="director"
            name="director"
            className="movie-form__input"
            value={formData.director}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="movie-form__group">
          <label htmlFor="releaseYear" className="movie-form__label">
            Release Year <span className="movie-form__required">*</span>
          </label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            className="movie-form__input"
            value={formData.releaseYear}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>
        
        <div className="movie-form__group">
          <label className="movie-form__label">Genres</label>
          <div className="movie-form__genres">
            {genreOptions.map(genre => (
              <div key={genre} className="movie-form__genre-option">
                <input
                  type="checkbox"
                  id={`genre-${genre}`}
                  name="genre"
                  value={genre}
                  checked={formData.genre.includes(genre)}
                  onChange={handleGenreChange}
                  className="movie-form__checkbox"
                />
                <label htmlFor={`genre-${genre}`} className="movie-form__checkbox-label">
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="movie-form__group">
          <label htmlFor="description" className="movie-form__label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="movie-form__textarea"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        
        <div className="movie-form__group">
          <label htmlFor="posterImage" className="movie-form__label">
            Movie Poster
          </label>
          <input
            type="file"
            id="posterImage"
            name="posterImage"
            className="movie-form__file-input"
            onChange={handleImageChange}
            accept="image/*"
          />
          
          {imagePreview && (
            <div className="movie-form__image-preview">
              <img src={imagePreview} alt="Poster preview" />
            </div>
          )}
        </div>
        
        <div className="movie-form__actions">
          <button 
            type="button" 
            className="movie-form__button movie-form__button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="movie-form__button movie-form__button--submit"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Movie'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;