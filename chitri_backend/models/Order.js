// chitri_backend/models/Order.js
const mongoose = require('mongoose');
const OrderItemSchema = require('./OrderItem'); // CRITICAL: Ensure this import path is correct

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [OrderItemSchema], // CRITICAL: Ensure this uses the imported OrderItemSchema
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['Ordered', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Ordered',
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
