const Membership = require("../models/Membership");

// Add Membership (Admin)
exports.addMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json({ message: "Membership added", membership });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Memberships
exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Membership (Admin)
exports.updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Membership updated", membership });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Membership (Admin)
exports.deleteMembership = async (req, res) => {
  try {
    await Membership.findByIdAndDelete(req.params.id);
    res.json({ message: "Membership deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
