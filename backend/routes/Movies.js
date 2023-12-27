const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/Movie');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      const fileExt = file.originalname.split('.').pop(); // Get the original file extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExt); // Preserve the original file extension
    }
  });
  
  
  const upload = multer({ storage }).single('image'); // Specify 'image' as the field name
  
// Define routes for movies
router.post('/', upload,MovieController.createMovie); // Create a new movie
router.get('/', MovieController.getAllMovies); // Get all movies
router.get('/:id', MovieController.getMovieById); // Get movie by ID
router.put('/:id', MovieController.updateMovieById); // Update movie by ID
router.delete('/:id', MovieController.deleteMovieById); // Delete movie by ID

module.exports = router;
