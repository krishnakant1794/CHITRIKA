// chitri_backend/controllers/userController.js
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // req.user is set by protect middleware

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone, // UPDATED: Include phone
      role: user.role,
      homeAddress: user.homeAddress,
      officeAddress: user.officeAddress,
      upiInfo: user.upiInfo,
      firebaseUid: user.firebaseUid,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // req.user is set by protect middleware

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone; // UPDATED: Update phone
    user.homeAddress = req.body.homeAddress || user.homeAddress;
    user.officeAddress = req.body.officeAddress || user.officeAddress;
    user.upiInfo = req.body.upiInfo || user.upiInfo;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone, // UPDATED: Include phone
      role: updatedUser.role,
      homeAddress: updatedUser.homeAddress,
      officeAddress: updatedUser.officeAddress,
      upiInfo: updatedUser.upiInfo,
      firebaseUid: updatedUser.firebaseUid,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  // Populate phone and full address for admin view
  const users = await User.find({}).select('name email phone homeAddress officeAddress role');
  res.json(users);
});
