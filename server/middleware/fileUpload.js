const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    
    // Determine the destination folder based on fieldname
    if (file.fieldname === 'bookCover') {
      uploadPath = 'public/images/books/';
    } else if (file.fieldname === 'moviePoster') {
      uploadPath = 'public/images/movies/';
    } else if (file.fieldname === 'screenshot') {
      uploadPath = 'public/images/screenshots/';
    } else if (file.fieldname === 'avatar') {
      uploadPath = 'public/images/avatars/';
    } else {
      uploadPath = 'public/images/';
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create standardized filenames
    const fileExt = path.extname(file.originalname);
    let fileName;
    
    if (file.fieldname === 'bookCover') {
      // Use book slug for filename if available
      if (req.body.bookSlug) {
        fileName = req.body.bookSlug;
      } else if (req.body.bookTitle) {
        fileName = req.body.bookTitle.toLowerCase().replace(/\s+/g, '-');
      } else {
        fileName = `book-${Date.now()}`;
      }
    } else if (file.fieldname === 'moviePoster') {
      // Use movie slug for filename if available
      if (req.body.movieSlug) {
        fileName = req.body.movieSlug;
      } else if (req.body.movieTitle) {
        fileName = req.body.movieTitle.toLowerCase().replace(/\s+/g, '-');
      } else {
        fileName = `movie-${Date.now()}`;
      }
    } else if (file.fieldname === 'screenshot') {
      // Use standardized screenshot naming pattern
      if (req.body.movieSlug) {
        fileName = `screenshot-${req.body.movieSlug}`;
      } else {
        fileName = `screenshot-${Date.now()}`;
      }
    } else if (file.fieldname === 'avatar') {
      // Use user ID for avatar
      fileName = `avatar-${req.params.id || Date.now()}`;
    } else {
      // Generic filename with timestamp
      fileName = Date.now() + '-' + file.originalname.toLowerCase().replace(/\s+/g, '-');
    }
    
    fileName = fileName + fileExt;
    cb(null, fileName);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Export configured multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;