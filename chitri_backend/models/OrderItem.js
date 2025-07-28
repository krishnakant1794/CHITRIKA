// chitri_backend/models/OrderItem.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  painting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Painting',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
  selectedSize: { type: String }, // This field MUST be here
  selectedColor: { type: String }, // This field MUST be here
}, { _id: false }); // _id: false means Mongoose won't add an _id to each sub-document

module.exports = OrderItemSchema;
