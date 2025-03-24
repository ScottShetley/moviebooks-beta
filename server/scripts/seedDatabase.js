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

// Sample books data with your actual image filenames
const sampleBooks = [
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    year: 1844,
    genre: "Adventure",
    cover: "/images/books/thecountofmontecristo.jpg"
  },
  {
    title: "Hagakure",
    author: "Yamamoto Tsunetomo",
    year: 1716,
    genre: "Philosophy",
    cover: "/images/books/hagakure.jpg"
  },
  {
    title: "Simulacres et Simulation",
    author: "Jean Baudrillard",
    year: 1981,
    genre: "Philosophy",
    cover: "/images/books/simulacres-et-simulation.jpg"
  },
  {
    title: "The Hollow Men",
    author: "T.S. Eliot",
    year: 1925,
    genre: "Poetry",
    cover: "/images/books/thehollowmen.jpg"
  },
  {
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    year: 1850,
    genre: "Classic",
    cover: "/images/books/scarlet-letter.jpg"
  },
  {
    title: "Modesty Blaise",
    author: "Peter O'Donnell",
    year: 1965,
    genre: "Action/Adventure",
    cover: "/images/books/modestyblaise.jpg"
  }
];

// Sample movies data with your actual image filenames
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
    title: "Apocalypse Now",
    year: 1979,
    director: "Francis Ford Coppola",
    genre: "War",
    poster: "/images/movies/apocalypse-now.jpg",
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
    title: "The Matrix",
    year: 1999,
    director: "Lana & Lilly Wachowski",
    genre: "Sci-Fi",
    poster: "/images/movies/the-matrix.jpg",
    rating: 5
  },
  {
    title: "Ghost Dog: The Way of the Samurai",
    year: 1999,
    director: "Jim Jarmusch",
    genre: "Crime",
    poster: "/images/movies/ghost-dog-the-way-of-the-samurai.jpg",
    rating: 4
  },
  {
    title: "Easy A",
    year: 2010,
    director: "Will Gluck",
    genre: "Comedy",
    poster: "/images/movies/easy-a.jpg",
    rating: 3
  },
  {
    title: "John Wick",
    year: 2014,
    director: "Chad Stahelski",
    genre: "Action",
    poster: "/images/movies/john-wick.jpg",
    rating: 4
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

    // Create sample connections with your actual screenshot filenames
    console.log('Creating movie-book connections...');
    const sampleConnections = [
      {
        movieId: movies[0]._id, // Shawshank Redemption
        bookId: books[0]._id,   // The Count of Monte Cristo
        description: "Andy reads this book in the prison library",
        timestamp: "1:15:22",
        screenshot: "/images/screenshots/screenshot-shawshank-redemption.jpg"
      },
      {
        movieId: movies[2]._id, // Pulp Fiction
        bookId: books[5]._id,   // Modesty Blaise (Fixed: was incorrectly The Scarlet Letter)
        description: "Vincent Vega reads this book in the bathroom",
        timestamp: "0:48:30",
        screenshot: "/images/screenshots/screenshot-pulp-fiction.jpg"
      },
      {
        movieId: movies[3]._id, // The Matrix
        bookId: books[2]._id,   // Simulacres et Simulation
        description: "Neo hides his hacking tools in a hollowed-out copy of this book",
        timestamp: "0:10:17",
        screenshot: "/images/screenshots/screenshot-the-matrix.jpg"
      },
      {
        movieId: movies[5]._id, // Easy A
        bookId: books[4]._id,   // The Scarlet Letter
        description: "The entire movie is based around parallels to this book",
        timestamp: "0:15:30",
        screenshot: "/images/screenshots/screenshot-easy-a.webp"
      },
      {
        movieId: movies[6]._id, // John Wick
        bookId: books[1]._id,   // Hagakure
        description: "Book appears briefly in John's collection",
        timestamp: "0:32:45",
        screenshot: "/images/screenshots/screenshot-john-wick.jpg"
      },
      {
        movieId: movies[1]._id, // Apocalypse Now
        bookId: books[3]._id,   // The Hollow Men
        description: "Colonel Kurtz recites passages from this poem",
        timestamp: "2:05:10",
        screenshot: "/images/screenshots/screenshot-apocalypse-now.jpg"
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