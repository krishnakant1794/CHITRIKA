// chitri_backend/models/Painting.js
const mongoose = require('mongoose');

const PaintingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  rating: { type: Number, default: 0 },
  size: { type: String },
  shape: { type: String },
  frame: { type: String },
  material: { type: String },
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  category: { type: String, enum: ['All', 'Resin Art', 'Modern Art', 'Canvas Art', 'Clothes'], default: 'All' },
  stock: { type: Number, default: 1 },
  // UPDATED: Add highlights, availableSizes, and availableColors to the schema
  highlights: [{ type: String }], // Array of strings for bullet points
  availableSizes: [{ type: String }], // Array of strings for sizes (e.g., "S", "M")
  availableColors: [{ type: String }], // Array of strings for colors (e.g., "White")
}, { timestamps: true });

module.exports = mongoose.model('Painting', PaintingSchema);