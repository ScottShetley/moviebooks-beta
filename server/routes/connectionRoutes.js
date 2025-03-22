const express = require('express');
const router = express.Router();
const Connection = require('../models/connectionModel');

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

module.exports = router;