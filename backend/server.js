const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");
const movieRoutes = require("./routes/movieRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
require("dotenv").config();

const { protect, adminOnly } = require("./middleware/authMiddleware");

const app = express();





app.get("/api/admin-test", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});




// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/users", userRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("LMS Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
