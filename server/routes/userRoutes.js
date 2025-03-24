const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const upload = require('../middleware/fileUpload');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public (will be protected later)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private (will be protected later)
router.put('/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.params.id);
    
    if (user) {
      user.name = name || user.name;
      user.bio = bio || user.bio;
      
      // Only update avatar if a new file was uploaded
      if (req.file) {
        user.avatar = `/images/avatars/${req.file.filename}`;
      }
      
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user favorites
// @route   GET /api/users/:id/favorites
// @access  Public (will be protected later)
router.get('/:id/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('favorites.books')
      .populate('favorites.movies')
      .populate('favorites.connections');
    
    if (user) {
      res.json(user.favorites);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add to favorites
// @route   POST /api/users/:id/favorites
// @access  Private (will be protected later)
router.post('/:id/favorites', async (req, res) => {
  try {
    const { itemId, itemType } = req.body;
    const user = await User.findById(req.params.id);
    
    if (user) {
      if (itemType === 'book') {
        if (!user.favorites.books.includes(itemId)) {
          user.favorites.books.push(itemId);
        }
      } else if (itemType === 'movie') {
        if (!user.favorites.movies.includes(itemId)) {
          user.favorites.movies.push(itemId);
        }
      } else if (itemType === 'connection') {
        if (!user.favorites.connections.includes(itemId)) {
          user.favorites.connections.push(itemId);
        }
      }
      
      const updatedUser = await user.save();
      res.json(updatedUser.favorites);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Remove from favorites
// @route   DELETE /api/users/:id/favorites
// @access  Private (will be protected later)
router.delete('/:id/favorites', async (req, res) => {
  try {
    const { itemId, itemType } = req.body;
    const user = await User.findById(req.params.id);
    
    if (user) {
      if (itemType === 'book') {
        user.favorites.books = user.favorites.books.filter(id => id.toString() !== itemId);
      } else if (itemType === 'movie') {
        user.favorites.movies = user.favorites.movies.filter(id => id.toString() !== itemId);
      } else if (itemType === 'connection') {
        user.favorites.connections = user.favorites.connections.filter(id => id.toString() !== itemId);
      }
      
      const updatedUser = await user.save();
      res.json(updatedUser.favorites);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a new user (temp, will be replaced with auth)
// @route   POST /api/users
// @access  Public
router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const { username, email, name, bio } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({
      username,
      email,
      name,
      bio: bio || '',
      avatar: req.file ? `/images/avatars/${req.file.filename}` : 'default-avatar.jpg',
      favorites: {
        books: [],
        movies: [],
        connections: []
      }
    });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;