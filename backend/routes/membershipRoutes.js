const express = require("express");
const router = express.Router();
const {
  addMembership,
  getMemberships,
  updateMembership,
  deleteMembership,
} = require("../controllers/membershipController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, addMembership);
router.put("/:id", protect, adminOnly, updateMembership);
router.delete("/:id", protect, adminOnly, deleteMembership);
router.get("/", protect, getMemberships);

module.exports = router;
