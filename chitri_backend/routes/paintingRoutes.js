// chitri_backend/routes/paintingRoutes.js
const express = require('express');
const {
  getAllPaintings,
  getPaintingById,
  createPainting,
  updatePainting,
  deletePainting,
} = require('../controllers/paintingController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Using general authorize
const { admin } = require('../middleware/adminMiddleware'); // Using specific admin middleware
const router = express.Router();

router.route('/')
  .get(protect, getAllPaintings) // All logged-in users can view
  .post(protect, admin, createPainting); // Only admin can add

router.route('/:id')
  .get(protect, getPaintingById) // All logged-in users can view
  .put(protect, admin, updatePainting) // Only admin can edit
  .delete(protect, admin, deletePainting); // Only admin can delete

module.exports = router;
