// chitri_backend/controllers/authController.js
const admin = require('../config/firebaseAdmin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

exports.verifyFirebaseToken = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // New user, create entry in MongoDB
      user = new User({
        firebaseUid: uid,
        email: email,
        name: decodedToken.name || email.split('@')[0], // Default name
        role: 'user', // Default role for new users
        // UPDATED: Initialize homeAddress with empty strings for required fields
        homeAddress: {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '', // Initialize country to satisfy required constraint
        },
        officeAddress: {}, // Office address can remain empty as its fields are not required
        upiInfo: {},
      });
      await user.save();
    }

    // Generate your own JWT for further API authentication
    const backendToken = jwt.sign(
      { userId: user._id, role: user.role, firebaseUid: uid },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Token verified', token: backendToken, role: user.role });

  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    res.status(401);
    throw new Error(`Unauthorized: Invalid Firebase token or User validation failed: ${error.message}`); // Pass validation error
  }
});
