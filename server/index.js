const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');

// Import routes
const bookRoutes = require('./routes/bookRoutes');
const movieRoutes = require('./routes/movieRoutes');
const connectionRoutes = require('./routes/connectionRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/users', userRoutes);
// Add this right after your middleware setup
app.use(express.static('public'));

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});