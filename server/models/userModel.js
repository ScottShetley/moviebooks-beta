const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  favorites: {
    books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
    movies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }],
    connections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Connection'
    }]
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;