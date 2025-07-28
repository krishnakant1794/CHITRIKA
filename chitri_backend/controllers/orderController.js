const Order = require('../models/Order');
const Painting = require('../models/Painting');
const asyncHandler = require('express-async-handler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    totalAmount,
    paymentId,
    paymentStatus,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }

  // ✅ Make sure selectedSize and selectedColor are passed
  const processedOrderItems = orderItems.map(item => ({
    painting: item.painting,
    quantity: item.quantity,
    priceAtPurchase: item.priceAtPurchase,
    selectedSize: item.selectedSize || '', // corrected
    selectedColor: item.selectedColor || '', // corrected
  }));

  const order = new Order({
    user: req.user._id,
    items: processedOrderItems,
    shippingAddress,
    totalAmount,
    paymentId,
    paymentStatus,
  });

  const createdOrder = await order.save();

  // Update painting stock
  for (const item of processedOrderItems) {
    const painting = await Painting.findById(item.painting);
    if (painting) {
      painting.stock -= item.quantity;
      await painting.save();
    }
  }

  res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.painting', 'name images');

    const formattedOrders = orders.map(order => {
      const orderObject = order.toObject({ getters: true, virtuals: false });

      orderObject.items = orderObject.items.map(item => {
        const itemAsObject = item && typeof item.toObject === 'function'
          ? item.toObject({ getters: true, virtuals: false }) : item;

        return {
          ...itemAsObject,
          painting: item.painting || null,
          selectedSize: itemAsObject.selectedSize || '',
          selectedColor: itemAsObject.selectedColor || '',
        };
      });

      return orderObject;
    });

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error in getMyOrders:", error);
    res.status(500);
    throw new Error(`Failed to fetch user orders: ${error.message}`);
  }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/all
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email phone homeAddress')
      .populate('items.painting', 'name images');

    const formattedOrders = orders.map(order => {
      const orderObject = order.toObject({ getters: true, virtuals: false });

      orderObject.user = order.user || null;

      orderObject.items = orderObject.items.map(item => {
        const itemAsObject = item && typeof item.toObject === 'function'
          ? item.toObject({ getters: true, virtuals: false }) : item;

        return {
          ...itemAsObject,
          painting: item.painting || null,
          selectedSize: itemAsObject.selectedSize || '',
          selectedColor: itemAsObject.selectedColor || '',
        };
      });

      return orderObject;
    });

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500);
    throw new Error(`Failed to fetch all orders: ${error.message}`);
  }
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = req.body.status || order.orderStatus;
    if (req.body.status === 'Delivered' && !order.deliveredAt) {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Delete order (Admin only)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await Order.deleteOne({ _id: order._id });
    res.json({ message: 'Order removed' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
