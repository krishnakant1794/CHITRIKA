// chitri_backend/middleware/adminMiddleware.js
const asyncHandler = require('express-async-handler');

// Middleware to check if the user has an 'admin' role
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403); // Forbidden
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { admin };
