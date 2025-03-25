const express = require('express');
const router = express.Router();
const Connection = require('../models/connectionModel');
const Book = require('../models/bookModel');
const Movie = require('../models/movieModel');
const upload = require('../middleware/fileUpload');

// @desc    Get all connections
// @route   GET /api/connections
// @access  Public
router.get('/', async (req, res) => {
  try {
    const connections = await Connection.find({})
      .populate('movieId', 'title poster')
      .populate('bookId', 'title author cover');
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get connection by ID
// @route   GET /api/connections/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id)
      .populate('movieId', 'title poster')
      .populate('bookId', 'title author cover');
    if (connection) {
      res.json(connection);
    } else {
      res.status(404).json({ message: 'Connection not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get connections by movie ID
// @route   GET /api/connections/movie/:movieId
// @access  Public
router.get('/movie/:movieId', async (req, res) => {
  try {
    const connections = await Connection.find({ movieId: req.params.movieId })
      .populate('bookId', 'title author cover');
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get connections by book ID
// @route   GET /api/connections/book/:bookId
// @access  Public
router.get('/book/:bookId', async (req, res) => {
  try {
    const connections = await Connection.find({ bookId: req.params.bookId })
      .populate('movieId', 'title poster');
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a connection
// @route   POST /api/connections
// @access  Public (would be Private in production)
router.post('/', upload.single('screenshotImage'), async (req, res) => {
  try {
    const { movieId, bookId, description, timestamp, context } = req.body;
    
    const connection = new Connection({
      movieId,
      bookId,
      description,
      timestamp,
      context,
      // If a file was uploaded, use its path
      screenshot: req.file ? `/images/screenshots/${req.file.filename}` : null
    });
    
    const createdConnection = await connection.save();
    
    // Populate the references for the response
    const populatedConnection = await Connection.findById(createdConnection._id)
      .populate('movieId', 'title poster')
      .populate('bookId', 'title author cover');
    
    res.status(201).json(populatedConnection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a connection
// @route   PUT /api/connections/:id
// @access  Public (would be Private in production)
router.put('/:id', upload.single('screenshotImage'), async (req, res) => {
  try {
    const { movieId, bookId, description, timestamp, context } = req.body;
    
    const connection = await Connection.findById(req.params.id);
    
    if (connection) {
      connection.movieId = movieId || connection.movieId;
      connection.bookId = bookId || connection.bookId;
      connection.description = description || connection.description;
      connection.timestamp = timestamp || connection.timestamp;
      connection.context = context || connection.context;
      
      // Only update screenshot if a new file was uploaded
      if (req.file) {
        connection.screenshot = `/images/screenshots/${req.file.filename}`;
      }
      
      const updatedConnection = await connection.save();
      
      // Populate the references for the response
      const populatedConnection = await Connection.findById(updatedConnection._id)
        .populate('movieId', 'title poster')
        .populate('bookId', 'title author cover');
      
      res.json(populatedConnection);
    } else {
      res.status(404).json({ message: 'Connection not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a connection
// @route   DELETE /api/connections/:id
// @access  Public (would be Private in production)
router.delete('/:id', async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);
    
    if (connection) {
      await connection.deleteOne();
      res.json({ message: 'Connection removed' });
    } else {
      res.status(404).json({ message: 'Connection not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a unified book, movie, and connection
// @route   POST /api/connections/unified
// @access  Public (would be Private in production)
router.post('/unified', upload.fields([
  { name: 'bookCover', maxCount: 1 },
  { name: 'moviePoster', maxCount: 1 },
  { name: 'screenshot', maxCount: 1 }
]), async (req, res) => {
  try {
    // Extract data from request
    const {
      // Book data
      bookTitle,
      bookAuthor,
      bookYear,
      bookGenre,
      
      // Movie data
      movieTitle,
      movieDirector,
      movieYear,
      movieGenre,
      movieRating,
      
      // Connection data
      description,
      context,
      timestamp,
      
      // Slug info for filename consistency
      bookSlug,
      movieSlug
    } = req.body;
    
    // Check for required fields
    if (!bookTitle || !bookAuthor || !movieTitle || !movieDirector || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Get uploaded files
    const bookCoverFile = req.files['bookCover'] ? req.files['bookCover'][0] : null;
    const moviePosterFile = req.files['moviePoster'] ? req.files['moviePoster'][0] : null;
    const screenshotFile = req.files['screenshot'] ? req.files['screenshot'][0] : null;
    
    // Ensure all required files were uploaded
    if (!bookCoverFile || !moviePosterFile || !screenshotFile) {
      return res.status(400).json({ message: 'Please upload all required images' });
    }
    
    // 1. Create the book
    const book = new Book({
      title: bookTitle,
      author: bookAuthor,
      year: parseInt(bookYear) || new Date().getFullYear(),
      genre: bookGenre,
      cover: `/images/books/${bookCoverFile.filename}`
    });
    
    const savedBook = await book.save();
    
    // 2. Create the movie
    const movie = new Movie({
      title: movieTitle,
      director: movieDirector,
      year: parseInt(movieYear) || new Date().getFullYear(),
      genre: movieGenre,
      poster: `/images/movies/${moviePosterFile.filename}`,
      rating: parseInt(movieRating) || 3
    });
    
    const savedMovie = await movie.save();
    
    // 3. Create the connection
    const connection = new Connection({
      movieId: savedMovie._id,
      bookId: savedBook._id,
      description,
      timestamp,
      context: context || 'Book appears in the movie',
      screenshot: `/images/screenshots/${screenshotFile.filename}`
    });
    
    const savedConnection = await connection.save();
    
    // 4. Populate the connection for the response
    const populatedConnection = await Connection.findById(savedConnection._id)
      .populate('movieId', 'title poster')
      .populate('bookId', 'title author cover');
    
    // 5. Return the full data to the client
    res.status(201).json({
      success: true,
      message: 'Connection created successfully',
      data: {
        connection: populatedConnection,
        book: savedBook,
        movie: savedMovie
      }
    });
    
  } catch (error) {
    console.error('Error creating unified connection:', error);
    res.status(500).json({ 
      message: 'Server error creating unified connection',
      error: error.message 
    });
  }
});

module.exports = router;