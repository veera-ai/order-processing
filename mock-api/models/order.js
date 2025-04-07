/**
 * Order model and data access functions
 */
const { v4: uuidv4 } = require('uuid');
const { generateMockOrders } = require('../utils/mockData');

// In-memory data store
let orders = generateMockOrders(5);

/**
 * Get all orders
 * @returns {Array} Array of orders
 */
const getOrders = () => {
  return orders;
};

/**
 * Get order by ID
 * @param {string} id - Order ID
 * @returns {Object|null} Order object or null if not found
 */
const getOrderById = (id) => {
  return orders.find(order => order.id === id);
};

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @returns {Object} Created order
 */
const createOrder = (orderData) => {
  const newOrder = {
    id: uuidv4(),
    orderNumber: `ORD-${Date.now()}`,
    orderDate: new Date().toISOString(),
    status: 'CREATED',
    ...orderData
  };
  
  orders.push(newOrder);
  return newOrder;
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status
 * @returns {Object|null} Updated order or null if not found
 */
const updateOrderStatus = (id, status) => {
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return null;
  }
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    status
  };
  
  return orders[orderIndex];
};

/**
 * Delete an order
 * @param {string} id - Order ID
 * @returns {boolean} True if deleted, false if not found
 */
const deleteOrder = (id) => {
  const initialLength = orders.length;
  orders = orders.filter(order => order.id !== id);
  return orders.length < initialLength;
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
