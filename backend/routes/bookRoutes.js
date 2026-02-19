const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin Only
router.post("/", protect, adminOnly, addBook);
router.put("/:id", protect, adminOnly, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);

// All logged-in users
router.get("/", protect, getBooks);

module.exports = router;
