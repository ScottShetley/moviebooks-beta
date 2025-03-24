import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookForm.css';
import { bookService } from '../../services/api';

const BookForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: [],
    publicationYear: '',
    description: '',
    coverImage: null
  });

  // Pre-defined genre options (can be expanded)
  const genreOptions = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
    'Mystery', 'Thriller', 'Romance', 'Horror', 'Biography',
    'History', 'Philosophy', 'Poetry', 'Drama', 'Classic'
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
        coverImage: file
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
      formDataToSend.append('author', formData.author);
      formData.genre.forEach(genre => {
        formDataToSend.append('genre', genre);
      });
      formDataToSend.append('publicationYear', formData.publicationYear);
      formDataToSend.append('description', formData.description);
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }
      
      // Create a new createBookWithImage function to handle FormData
      const createBookWithImage = async (bookData) => {
        try {
          // Use fetch with FormData (browser sets Content-Type header)
          const response = await fetch('/api/books', {
            method: 'POST',
            body: bookData
          });
          
          if (!response.ok) {
            throw new Error('Failed to create book');
          }
          
          return await response.json();
        } catch (error) {
          console.error('Error creating book with image:', error);
          throw error;
        }
      };
      
      // Send to API
      await createBookWithImage(formDataToSend);
      
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        navigate('/books');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel form
  const handleCancel = () => {
    navigate('/books');
  };

  return (
    <div className="book-form-container">
      <h2 className="book-form__title">Add New Book</h2>
      
      {success && (
        <div className="book-form__success">
          Book added successfully! Redirecting...
        </div>
      )}
      
      {error && (
        <div className="book-form__error">
          {error}
        </div>
      )}
      
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="book-form__group">
          <label htmlFor="title" className="book-form__label">
            Title <span className="book-form__required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="book-form__input"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="book-form__group">
          <label htmlFor="author" className="book-form__label">
            Author <span className="book-form__required">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="book-form__input"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="book-form__group">
          <label className="book-form__label">Genres</label>
          <div className="book-form__genres">
            {genreOptions.map(genre => (
              <div key={genre} className="book-form__genre-option">
                <input
                  type="checkbox"
                  id={`genre-${genre}`}
                  name="genre"
                  value={genre}
                  checked={formData.genre.includes(genre)}
                  onChange={handleGenreChange}
                  className="book-form__checkbox"
                />
                <label htmlFor={`genre-${genre}`} className="book-form__checkbox-label">
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="book-form__group">
          <label htmlFor="publicationYear" className="book-form__label">
            Publication Year
          </label>
          <input
            type="number"
            id="publicationYear"
            name="publicationYear"
            className="book-form__input"
            value={formData.publicationYear}
            onChange={handleInputChange}
            min="1000"
            max={new Date().getFullYear()}
          />
        </div>
        
        <div className="book-form__group">
          <label htmlFor="description" className="book-form__label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="book-form__textarea"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        
        <div className="book-form__group">
          <label htmlFor="coverImage" className="book-form__label">
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            className="book-form__file-input"
            onChange={handleImageChange}
            accept="image/*"
          />
          
          {imagePreview && (
            <div className="book-form__image-preview">
              <img src={imagePreview} alt="Cover preview" />
            </div>
          )}
        </div>
        
        <div className="book-form__actions">
          <button 
            type="button" 
            className="book-form__button book-form__button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="book-form__button book-form__button--submit"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;