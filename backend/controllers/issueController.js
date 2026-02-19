const Issue = require("../models/Issue");
const Book = require("../models/Book");
const User = require("../models/user");
const Membership = require("../models/Membership");

// ISSUE BOOK
exports.issueBook = async (req, res) => {
  try {
    const { bookId, returnDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Get user
    const user = await User.findById(req.user.id);

    // Get membership details
    const userWithMembership = await User.findById(req.user.id).populate("membership");
    if (!userWithMembership.membership) {
      return res.status(400).json({ message: "No membership assigned" });
    }
    const membership = userWithMembership.membership;

    // Count active issues
    const activeIssues = await Issue.countDocuments({
      userId: user._id,
      status: "issued",
    });

    if (activeIssues >= membership.maxBooksAllowed) {
      return res.status(400).json({
        message: `Issue limit reached. Max allowed: ${membership.maxBooksAllowed}`,
      });
    }

    const issue = await Issue.create({
      userId: user._id,
      bookId,
      returnDate,
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({ message: "Book issued", issue });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// RETURN BOOK
exports.returnBook = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate("bookId");

    if (!issue || issue.status === "returned") {
      return res.status(400).json({ message: "Invalid issue record" });
    }

    const today = new Date();
    issue.actualReturnDate = today;

    // Fine Calculation (₹10 per day)
    if (today > issue.returnDate) {
      const diffTime = today - issue.returnDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      issue.fine = diffDays * 10;
    }

    issue.status = "returned";
    await issue.save();

    // Increase book copies
    const book = await Book.findById(issue.bookId._id);
    book.availableCopies += 1;
    await book.save();

    res.json({ message: "Book returned", fine: issue.fine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ACTIVE ISSUES
exports.getActiveIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ status: "issued" })
      .populate("userId", "name email")
      .populate("bookId", "title author");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET OVERDUE ISSUES
exports.getOverdueIssues = async (req, res) => {
  try {
    const today = new Date();

    const issues = await Issue.find({
      status: "issued",
      returnDate: { $lt: today },
    })
      .populate("userId", "name email")
      .populate("bookId", "title author");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ISSUE HISTORY
exports.getUserIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.user.id })
      .populate("bookId", "title author");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// PAY FINE
exports.payFine = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.fine <= 0) {
      return res.status(400).json({ message: "No fine to pay" });
    }

    issue.finePaid = true;
    await issue.save();

    res.json({ message: "Fine paid successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
