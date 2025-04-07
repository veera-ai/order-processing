/**
 * Routes for Checkout Process
 */
const express = require('express');
const router = express.Router();
const { initializeCheckout, processCheckout, calculateShippingCost, calculateTax } = require('../models/checkout');

/**
 * @route POST /api/checkout/initialize
 * @desc Initialize checkout
 * @access Public
 */
router.post('/initialize', (req, res) => {
  const { customerId } = req.query;
  
  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }
  
  const checkout = initializeCheckout(customerId);
  res.json(checkout);
});

/**
 * @route POST /api/checkout/process
 * @desc Process checkout and create an order
 * @access Public
 */
router.post('/process', (req, res) => {
  const checkout = req.body;
  
  if (!checkout || !checkout.customerId) {
    return res.status(400).json({ message: 'Invalid checkout data' });
  }
  
  const order = processCheckout(checkout);
  res.status(201).json(order);
});

/**
 * @route POST /api/checkout/shipping-cost
 * @desc Calculate shipping cost
 * @access Public
 */
router.post('/shipping-cost', (req, res) => {
  const checkout = req.body;
  
  if (!checkout) {
    return res.status(400).json({ message: 'Checkout data is required' });
  }
  
  const shippingCost = calculateShippingCost(checkout);
  res.json(shippingCost);
});

/**
 * @route POST /api/checkout/tax
 * @desc Calculate tax
 * @access Public
 */
router.post('/tax', (req, res) => {
  const checkout = req.body;
  
  if (!checkout) {
    return res.status(400).json({ message: 'Checkout data is required' });
  }
  
  const tax = calculateTax(checkout);
  res.json(tax);
});

module.exports = router;
