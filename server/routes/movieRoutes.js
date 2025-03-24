const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');
const upload = require('../middleware/fileUpload');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get movie by ID
// @route   GET /api/movies/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a movie
// @route   POST /api/movies
// @access  Public (would be Private in production)
router.post('/', upload.single('posterImage'), async (req, res) => {
  try {
    const { title, year, director, genre, rating, description } = req.body;
    
    // Handle genre array
    const genreArray = genre ? 
      (Array.isArray(genre) ? genre : [genre]) : 
      [];
    
    const movie = new Movie({
      title,
      year: year ? parseInt(year) : null,
      director,
      genre: genreArray,
      rating: rating ? parseInt(rating) : null,
      description,
      // If a file was uploaded, use its path
      poster: req.file ? `/images/movies/${req.file.filename}` : null
    });
    
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Public (would be Private in production)
router.put('/:id', upload.single('posterImage'), async (req, res) => {
  try {
    const { title, year, director, genre, rating, description } = req.body;
    
    const movie = await Movie.findById(req.params.id);
    
    if (movie) {
      movie.title = title || movie.title;
      movie.year = year ? parseInt(year) : movie.year;
      movie.director = director || movie.director;
      
      // Handle genre array
      if (genre) {
        movie.genre = Array.isArray(genre) ? genre : [genre];
      }
      
      movie.rating = rating ? parseInt(rating) : movie.rating;
      movie.description = description || movie.description;
      
      // Only update poster if a new file was uploaded
      if (req.file) {
        movie.poster = `/images/movies/${req.file.filename}`;
      }
      
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Public (would be Private in production)
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (movie) {
      await movie.deleteOne();
      res.json({ message: 'Movie removed' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;