const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

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
router.post('/', async (req, res) => {
  try {
    const { title, year, director, genre, poster, rating } = req.body;
    
    const movie = new Movie({
      title,
      year,
      director,
      genre,
      poster,
      rating
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
router.put('/:id', async (req, res) => {
  try {
    const { title, year, director, genre, poster, rating } = req.body;
    
    const movie = await Movie.findById(req.params.id);
    
    if (movie) {
      movie.title = title || movie.title;
      movie.year = year || movie.year;
      movie.director = director || movie.director;
      movie.genre = genre || movie.genre;
      movie.poster = poster || movie.poster;
      movie.rating = rating || movie.rating;
      
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