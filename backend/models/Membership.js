const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    durationInDays: {
      type: Number,
      required: true,
    },
    maxBooksAllowed: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
