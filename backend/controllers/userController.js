const User = require("../models/user");

// Get All Users (Admin)
exports.getUsers = async (req, res) => {
  const users = await User.find().populate("membership");
  res.json(users);
};

// Update User Membership (Admin)
exports.updateMembership = async (req, res) => {
  const { membershipId } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { membership: membershipId },
    { new: true }
  );

  res.json({ message: "Membership updated", user });
};
