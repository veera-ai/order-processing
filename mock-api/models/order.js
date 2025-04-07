/**
 * Order model and data access functions
 */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '../data/database.json');

/**
 * Read orders from database file
 * @returns {Array} Array of orders
 */
const readOrdersFromFile = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    return db.orders || [];
  } catch (error) {
    console.error('Error reading orders from database:', error);
    return [];
  }
};

/**
 * Save orders to database file
 * @param {Array} orders - Array of orders to save
 */
const saveOrdersToFile = (orders) => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    db.orders = orders;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error('Error saving orders to database:', error);
  }
};

// Initialize orders from database
let orders = readOrdersFromFile();

/**
 * Get all orders
 * @returns {Array} Array of orders
 */
const getOrders = () => {
  orders = readOrdersFromFile();
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
  saveOrdersToFile(orders);
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
  
  saveOrdersToFile(orders);
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
  saveOrdersToFile(orders);
  return orders.length < initialLength;
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
