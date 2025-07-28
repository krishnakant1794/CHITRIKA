// chitri_backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true, required: true }, // From Firebase Auth
  email: { type: String, unique: true, required: true },
  name: { type: String },
  phone: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  homeAddress: {
    // UPDATED: Make individual address fields NOT required at the schema level
    // We will enforce required input on the frontend's ProfilePage and during order placement validation.
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String }, // UPDATED: Remove required: true from here
  },
  officeAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  upiInfo: {
    id: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
