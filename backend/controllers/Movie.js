const Movie = require('../models/movies');

// Create a new movie
exports.createMovie = async (req, res) => {
    try {
      const { title, publishYear } = req.body;
      console.log(req.file)
      const imageUrl = req.file.path; // 'path' contains the path to the uploaded file
  
      // Create the movie in the database with the uploaded image file
      const movie = await Movie.create({ title, publishYear, image:imageUrl });
  
      res.json({ message: 'Movie created successfully', movie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create movie' });
    }
  };

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.findAll();

    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get movies' });
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the movie by ID in the database
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get movie' });
  }
};

// Update movie by ID
exports.updateMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, publishYear, image } = req.body;

    // Find the movie by ID and update its details
    const [updatedRowsCount, updatedMovies] = await Movie.update(
      { title, publishYear, image },
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ message: 'Movie updated successfully', movie: updatedMovies[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

// Delete movie by ID
exports.deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the movie by ID
    const deletedRowCount = await Movie.destroy({ where: { id } });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete movie' });
  }
};
