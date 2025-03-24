const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const upload = require('../middleware/fileUpload');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Public (would be Private in production)
router.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, author, year, genre, description } = req.body;
    
    // Handle genre array (could be a single string or an array from checkboxes)
    const genreArray = genre ? 
      (Array.isArray(genre) ? genre : [genre]) : 
      [];
    
    const book = new Book({
      title,
      author,
      year: year ? parseInt(year) : null,
      genre: genreArray,
      description,
      // If a file was uploaded, use its path
      cover: req.file ? `/images/books/${req.file.filename}` : null
    });
    
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Public (would be Private in production)
router.put('/:id', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, author, year, genre, description } = req.body;
    
    const book = await Book.findById(req.params.id);
    
    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.year = year ? parseInt(year) : book.year;
      
      // Handle genre array
      if (genre) {
        book.genre = Array.isArray(genre) ? genre : [genre];
      }
      
      book.description = description || book.description;
      
      // Only update cover if a new file was uploaded
      if (req.file) {
        book.cover = `/images/books/${req.file.filename}`;
      }
      
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Public (would be Private in production)
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (book) {
      await book.deleteOne();
      res.json({ message: 'Book removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;