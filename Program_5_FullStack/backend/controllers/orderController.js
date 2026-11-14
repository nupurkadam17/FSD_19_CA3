/**
 * CLOSETÉ - Program 5 Mongoose Order Controller
 */

const Order = require('../models/Order');
const mongoose = require('mongoose');

const fallbackOrders = [];

// POST /api/orders (Create order)
const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ status: 'error', message: 'No order items specified.' });
    }

    let order;
    if (mongoose.connection.readyState === 1) {
      order = await Order.create({
        user: req.user.id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        isPaid: true,
        paidAt: Date.now()
      });
    } else {
      order = {
        _id: `mem-ord-${Date.now()}`,
        user: req.user.id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        isPaid: true,
        paidAt: new Date().toISOString(),
        status: 'Processing'
      };
      fallbackOrders.unshift(order);
    }

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully.',
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/my-orders (Get authenticated user orders)
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', count: orders.length, data: orders });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getMyOrders
};
