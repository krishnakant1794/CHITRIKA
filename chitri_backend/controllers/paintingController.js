// chitri_backend/controllers/paintingController.js
const Painting = require('../models/Painting');
const asyncHandler = require('express-async-handler'); // For simplified error handling

// @desc    Get all paintings
// @route   GET /api/paintings
// @access  Public (or Private if you want only logged-in users to see products)
exports.getAllPaintings = asyncHandler(async (req, res) => {
  const paintings = await Painting.find({});
  res.json(paintings);
});

// @desc    Get single painting by ID
// @route   GET /api/paintings/:id
// @access  Public
exports.getPaintingById = asyncHandler(async (req, res) => {
  const painting = await Painting.findById(req.params.id);
  if (painting) {
    res.json(painting);
  } else {
    res.status(404);
    throw new Error('Painting not found');
  }
});

// @desc    Create a painting
// @route   POST /api/paintings
// @access  Private/Admin
exports.createPainting = asyncHandler(async (req, res) => {
  const { name, description, images, rating, size, shape, frame, material, price, offerPrice, category, stock } = req.body;

  const painting = new Painting({
    name, description, images, rating, size, shape, frame, material, price, offerPrice, category, stock
  });

  const createdPainting = await painting.save();
  res.status(201).json(createdPainting);
});

// @desc    Update a painting
// @route   PUT /api/paintings/:id
// @access  Private/Admin
exports.updatePainting = asyncHandler(async (req, res) => {
  const { name, description, images, rating, size, shape, frame, material, price, offerPrice, category, stock } = req.body;

  const painting = await Painting.findById(req.params.id);

  if (painting) {
    painting.name = name || painting.name;
    painting.description = description || painting.description;
    painting.images = images || painting.images;
    painting.rating = rating || painting.rating;
    painting.size = size || painting.size;
    painting.shape = shape || painting.shape;
    painting.frame = frame || painting.frame;
    painting.material = material || painting.material;
    painting.price = price || painting.price;
    painting.offerPrice = offerPrice || painting.offerPrice;
    painting.category = category || painting.category;
    painting.stock = stock || painting.stock;

    const updatedPainting = await painting.save();
    res.json(updatedPainting);
  } else {
    res.status(404);
    throw new Error('Painting not found');
  }
});

// @desc    Delete a painting
// @route   DELETE /api/paintings/:id
// @access  Private/Admin
exports.deletePainting = asyncHandler(async (req, res) => {
  const painting = await Painting.findById(req.params.id);

  if (painting) {
    await Painting.deleteOne({ _id: painting._id }); // Use deleteOne for newer Mongoose
    res.json({ message: 'Painting removed' });
  } else {
    res.status(404);
    throw new Error('Painting not found');
  }
});
