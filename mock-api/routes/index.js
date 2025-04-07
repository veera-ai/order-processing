/**
 * Main router file that combines all route modules
 */
const express = require('express');
const router = express.Router();

// Import route modules
const orderRoutes = require('./orders');
const checkoutRoutes = require('./checkout');
const paymentRoutes = require('./payments');

// Register routes
router.use('/orders', orderRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/payments', paymentRoutes);

// Status route
router.get('/status', (req, res) => {
  res.json({ status: 'Order Processing Mock API is running!' });
});

module.exports = router;
