// chitri_backend/controllers/paymentController.js
const razorpay = require('../config/razorpay');
const Order = require('../models/Order');
const Painting = require('../models/Painting'); // Required for stock updates
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body; // receipt could be your internal order ID

  const options = {
    amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
    currency,
    receipt,
    payment_capture: 1, // Auto capture payment
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500);
    throw new Error(`Failed to create Razorpay order: ${error.message}`);
  }
});

// @desc    Verify Razorpay Payment Signature
// @route   POST /api/payments/verify-payment
// @access  Private
exports.verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                 .update(body.toString())
                                 .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Payment is authentic, save order to your DB
    try {
      const { user, items, shippingAddress, totalAmount } = orderDetails;

      // Ensure items array contains valid painting IDs and quantities
      const processedItems = items.map(item => ({
        painting: item.painting, // This should be the painting _id
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      }));

      const newOrder = new Order({
        user: req.user._id, // Use authenticated user ID from backend
        items: processedItems,
        shippingAddress,
        totalAmount,
        paymentId: razorpay_payment_id,
        paymentStatus: 'paid',
        orderStatus: 'Ordered',
      });

      const createdOrder = await newOrder.save();

      // Optionally, update stock for each painting
      for (const item of processedItems) {
        const painting = await Painting.findById(item.painting);
        if (painting) {
          painting.stock -= item.quantity;
          await painting.save();
        }
      }

      res.status(200).json({ message: "Payment successful and order placed", order: createdOrder });
    } catch (dbError) {
      console.error("Error saving order to DB after successful payment:", dbError);
      res.status(500);
      throw new Error(`Payment successful, but failed to save order: ${dbError.message}`);
    }
  } else {
    res.status(400);
    throw new Error("Payment verification failed: Invalid signature");
  }
});
