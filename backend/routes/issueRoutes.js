const express = require("express");
const router = express.Router();
const {
  issueBook,
  returnBook,
  getActiveIssues,
  getOverdueIssues,
  getUserIssues,
} = require("../controllers/issueController");
const { payFine } = require("../controllers/issueController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// User
router.post("/", protect, issueBook);
router.put("/return/:id", protect, returnBook);
router.get("/my-issues", protect, getUserIssues);
router.put("/pay-fine/:id", protect, payFine);

// Admin Reports
router.get("/active", protect, adminOnly, getActiveIssues);
router.get("/overdue", protect, adminOnly, getOverdueIssues);

module.exports = router;
