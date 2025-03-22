// scripts/seedDatabase.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Book = require('../models/bookModel');
const Movie = require('../models/movieModel');
const Connection = require('../models/connectionModel');

// Try multiple possible locations for the .env file
// First try the server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// If that didn't work, try the project root
if (!process.env.MONGO_URI) {
  console.log('MONGO_URI not found in server/.env, trying project root .env');
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

// Check if MONGO_URI is now defined
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable not found!');
  console.error('Please make sure your .env file contains the MONGO_URI variable');
  console.error('Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname');
  process.exit(1);
}

// Sample books data
const sampleBooks = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction",
    cover: "/images/books/to-kill-a-mockingbird.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    cover: "/images/books/1984.jpg"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Classic",
    cover: "/images/books/great-gatsby.jpg"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    cover: "/images/books/pride-prejudice.jpg"
  }
];

// Sample movies data
const sampleMovies = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    genre: "Drama",
    poster: "/images/movies/shawshank-redemption.jpg",
    rating: 5
  },
  {
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    genre: "Crime",
    poster: "/images/movies/godfather.jpg",
    rating: 5
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genre: "Crime",
    poster: "/images/movies/pulp-fiction.jpg",
    rating: 4
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    poster: "/images/movies/inception.jpg",
    rating: 5
  }
];

async function seedDatabase() {
  let dbConnection = null;
  
  try {
    console.log('Starting database seeding process...');
    console.log('Attempting to connect to MongoDB...');
    
    // Connect to MongoDB with better error handling
    dbConnection = await mongoose.connect(process.env.MONGO_URI, {
      // These options help with connection stability and error handling
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log('Connected to MongoDB successfully!');
    console.log(`Database name: ${dbConnection.connection.name}`);
    console.log(`Database host: ${dbConnection.connection.host}`);

    // Clear existing data
    console.log('Clearing existing data...');
    await Book.deleteMany({});
    await Movie.deleteMany({});
    await Connection.deleteMany({});
    console.log('✓ Existing data cleared');

    // Insert books
    console.log('Inserting books...');
    const books = await Book.insertMany(sampleBooks);
    console.log(`✓ ${books.length} books inserted`);

    // Insert movies
    console.log('Inserting movies...');
    const movies = await Movie.insertMany(sampleMovies);
    console.log(`✓ ${movies.length} movies inserted`);

    // Create sample connections
    console.log('Creating movie-book connections...');
    const sampleConnections = [
      {
        movieId: movies[0]._id, // Shawshank Redemption
        bookId: books[0]._id,   // To Kill a Mockingbird
        description: "Andy reads this book in the prison library",
        timestamp: "1:15:22",
        screenshot: "/images/connections/shawshank-mockingbird.jpg"
      },
      {
        movieId: movies[1]._id, // The Godfather
        bookId: books[2]._id,   // The Great Gatsby
        description: "Book appears on Michael Corleone's bookshelf",
        timestamp: "0:48:30",
        screenshot: "/images/connections/godfather-gatsby.jpg"
      },
      {
        movieId: movies[3]._id, // Inception
        bookId: books[1]._id,   // 1984
        description: "This book can be spotted in Cobb's apartment",
        timestamp: "0:35:17",
        screenshot: "/images/connections/inception-1984.jpg"
      }
    ];

    const connections = await Connection.insertMany(sampleConnections);
    console.log(`✓ ${connections.length} connections inserted`);

    console.log('✓ Database seeded successfully!');
    console.log('You can now run your server to access this data via the API');
    
  } catch (error) {
    console.error('');
    console.error('ERROR SEEDING DATABASE:');
    console.error(error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('');
      console.error('Connection refused. This could mean:');
      console.error('1. The MongoDB connection string in your .env file is incorrect');
      console.error('2. Your MongoDB Atlas cluster has IP restrictions (whitelist your IP)');
      console.error('3. You\'re trying to connect to a local MongoDB that isn\'t running');
    }
    
    process.exit(1);
  } finally {
    // Close the connection properly
    if (dbConnection) {
      console.log('Disconnecting from MongoDB...');
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
}

// Run the function
seedDatabase();