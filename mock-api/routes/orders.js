/**
 * Routes for Order Management
 */
const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } = require('../models/order');

/**
 * @route GET /api/orders/status
 * @desc Check service status
 * @access Public
 */
router.get('/status', (req, res) => {
  res.send('Order Processing Service is running!');
});

/**
 * @route GET /api/orders
 * @desc Get all orders
 * @access Public
 */
router.get('/', (req, res) => {
  const orders = getOrders();
  res.json(orders);
});

/**
 * @route GET /api/orders/:id
 * @desc Get order by ID
 * @access Public
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const order = getOrderById(id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.json(order);
});

/**
 * @route POST /api/orders
 * @desc Create a new order
 * @access Public
 */
router.post('/', (req, res) => {
  const order = req.body;
  const newOrder = createOrder(order);
  res.status(201).json(newOrder);
});

/**
 * @route PUT /api/orders/:id/status
 * @desc Update order status
 * @access Public
 */
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.query;
  
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }
  
  const updatedOrder = updateOrderStatus(id, status);
  
  if (!updatedOrder) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.json(updatedOrder);
});

/**
 * @route DELETE /api/orders/:id
 * @desc Delete an order
 * @access Public
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const success = deleteOrder(id);
  
  if (!success) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.status(204).send();
});

module.exports = router;
