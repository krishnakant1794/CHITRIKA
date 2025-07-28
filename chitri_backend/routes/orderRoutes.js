// chitri_backend/routes/orderRoutes.js
const express = require('express');
const {
  addOrderItems,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, addOrderItems); // Create new order

router.route('/my')
  .get(protect, getMyOrders); // Get user's own orders

router.route('/all')
  .get(protect, admin, getAllOrders); // Admin only to get all orders

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus); // Admin only to update status

router.route('/:id')
  .delete(protect, admin, deleteOrder); // Admin only to delete order

module.exports = router;
