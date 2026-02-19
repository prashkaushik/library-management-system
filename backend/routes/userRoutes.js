const express = require("express");
const router = express.Router();
const { getUsers, updateMembership } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getUsers);
router.put("/:id/membership", protect, adminOnly, updateMembership);

module.exports = router;
