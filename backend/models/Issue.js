const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date, // expected return date
      required: true,
    },
    actualReturnDate: {
      type: Date,
    },
    fine: {
      type: Number,
      default: 0,
    },
    finePaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["issued", "returned"],
      default: "issued",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
