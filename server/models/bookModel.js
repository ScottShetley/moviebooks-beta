const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;