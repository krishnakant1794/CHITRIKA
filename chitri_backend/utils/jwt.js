// chitri_backend/utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (id, role, firebaseUid) => {
  return jwt.sign({ userId: id, role, firebaseUid }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

module.exports = generateToken;
