// scripts/seedDatabase.js
const mongoose = require('dotenv');
const dotenv = require('dotenv');
const path = require('path');
const Book = require('../models/bookModel');
const Movie = require('../models/movieModel');
const Connection = require('../models/connectionModel');

// Try multiple possible locations for the .env file
dotenv.config({path: path.resolve(__dirname, '../.env')});
if (!process.env.MONGO_URI) {
  console.log('MONGO_URI not found in server/.env, trying project root .env');
  dotenv.config({path: path.resolve(__dirname, '../../.env')});
}

if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable not found!');
  console.error('Please make sure your .env file contains the MONGO_URI variable');
  console.error('Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname');
  process.exit(1);
}

// This script is no longer set to run automatically
// It only contains the framework for seeding if needed
async function seedDatabase() {
  let dbConnection = null;

  try {
    console.log('Starting database seeding process...');
    console.log('Attempting to connect to MongoDB...');

    dbConnection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('Connected to MongoDB successfully!');
    console.log(`Database name: ${dbConnection.connection.name}`);
    console.log(`Database host: ${dbConnection.connection.host}`);

    console.log('SEEDING DISABLED - No data will be added or removed');
    console.log('Your existing data has been preserved');
    
    // To re-enable seeding, uncomment the following lines and add your sample data:
    /*
    // Clear existing data
    console.log('Clearing existing data...');
    await Book.deleteMany({});
    await Movie.deleteMany({});
    await Connection.deleteMany({});
    console.log('✓ Existing data cleared');
    
    // Insert books
    console.log('Inserting books...');
    const sampleBooks = [];
    const books = await Book.insertMany(sampleBooks);
    console.log(`✓ ${books.length} books inserted`);
    
    // Insert movies
    console.log('Inserting movies...');
    const sampleMovies = [];
    const movies = await Movie.insertMany(sampleMovies);
    console.log(`✓ ${movies.length} movies inserted`);
    
    // Create connections
    console.log('Creating movie-book connections...');
    const sampleConnections = [];
    const connections = await Connection.insertMany(sampleConnections);
    console.log(`✓ ${connections.length} connections inserted`);
    */

    console.log('✓ Database connection checked successfully!');
    
  } catch (error) {
    console.error('ERROR CONNECTING TO DATABASE:');
    console.error(error.message);

    if (error.message.includes('ECONNREFUSED')) {
      console.error('Connection refused. This could mean:');
      console.error('1. The MongoDB connection string in your .env file is incorrect');
      console.error('2. Your MongoDB Atlas cluster has IP restrictions (whitelist your IP)');
      console.error('3. You\'re trying to connect to a local MongoDB that isn\'t running');
    }

    process.exit(1);
  } finally {
    if (dbConnection) {
      console.log('Disconnecting...');
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
}

// Uncomment this line to execute the seeding function
// seedDatabase();

console.log('Database seeding is disabled by default.');
console.log('To seed the database, uncomment the seedDatabase() call at the end of this file.');