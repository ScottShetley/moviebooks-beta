const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    
    // Determine the destination folder based on the route
    if (req.originalUrl.includes('/books')) {
      uploadPath = 'public/images/books/';
    } else if (req.originalUrl.includes('/movies')) {
      uploadPath = 'public/images/movies/';
    } else if (req.originalUrl.includes('/connections')) {
      uploadPath = 'public/images/screenshots/';
    } else if (req.originalUrl.includes('/users')) {
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
    
    if (req.originalUrl.includes('/books')) {
      // Convert book title to slug for filename
      fileName = req.body.title ? req.body.title.toLowerCase().replace(/\s+/g, '-') : Date.now();
    } else if (req.originalUrl.includes('/movies')) {
      // Convert movie title to slug for filename
      fileName = req.body.title ? req.body.title.toLowerCase().replace(/\s+/g, '-') : Date.now();
    } else if (req.originalUrl.includes('/connections')) {
      // Use standardized screenshot naming pattern
      fileName = `screenshot-${Date.now()}`;
    } else if (req.originalUrl.includes('/users')) {
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