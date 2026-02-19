const Movie = require("../models/Movie");

// Add Movie (Admin)
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ message: "Movie added", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Movie (Admin)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Movie updated", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Movie (Admin)
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
