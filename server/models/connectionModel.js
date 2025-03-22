const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Movie'
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  screenshot: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;