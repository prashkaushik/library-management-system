const express = require("express");
const router = express.Router();
const {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, addMovie);
router.put("/:id", protect, adminOnly, updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);
router.get("/", protect, getMovies);

module.exports = router;
