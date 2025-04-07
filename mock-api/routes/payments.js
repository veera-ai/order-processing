/**
 * Routes for Payment Processing
 */
const express = require('express');
const router = express.Router();
const { processPayment, getPaymentById, getPaymentByOrderId, refundPayment } = require('../models/payment');

/**
 * @route POST /api/payments/process
 * @desc Process a payment for an order
 * @access Public
 */
router.post('/process', (req, res) => {
  const { orderId, paymentMethod, amount } = req.query;
  
  if (!orderId || !paymentMethod || !amount) {
    return res.status(400).json({ message: 'Order ID, payment method, and amount are required' });
  }
  
  const payment = processPayment(orderId, paymentMethod, amount);
  res.json(payment);
});

/**
 * @route GET /api/payments/:id
 * @desc Get payment by ID
 * @access Public
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const payment = getPaymentById(id);
  
  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }
  
  res.json(payment);
});

/**
 * @route GET /api/payments/order/:orderId
 * @desc Get payment by order ID
 * @access Public
 */
router.get('/order/:orderId', (req, res) => {
  const { orderId } = req.params;
  const payment = getPaymentByOrderId(orderId);
  
  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }
  
  res.json(payment);
});

/**
 * @route POST /api/payments/:id/refund
 * @desc Refund a payment
 * @access Public
 */
router.post('/:id/refund', (req, res) => {
  const { id } = req.params;
  const { amount } = req.query;
  
  const payment = refundPayment(id, amount);
  
  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }
  
  res.json(payment);
});

module.exports = router;
