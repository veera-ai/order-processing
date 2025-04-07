/**
 * Order model and data access functions
 */
const { v4: uuidv4 } = require('uuid');
const database = require('../utils/database');

/**
 * Validate order data
 * @param {Object} order - Order object to validate
 * @throws {Error} If validation fails
 */
const validateOrder = (order) => {
  const requiredFields = ['id', 'orderNumber', 'orderDate', 'status', 'customerId', 'items'];
  const missingFields = requiredFields.filter(field => !order[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Invalid order data: Missing required fields: ${missingFields.join(', ')}`);
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    throw new Error('Invalid order data: Items must be a non-empty array');
  }

  const validStatuses = ['CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  if (!validStatuses.includes(order.status)) {
    throw new Error(`Invalid order status: ${order.status}`);
  }
};

/**
 * Save orders to database
 * @param {Array} orders - Array of orders to save
 * @throws {Error} If save operation fails
 */
const saveOrders = async (orders) => {
  try {
    // Validate all orders before saving
    orders.forEach(validateOrder);
    await database.updateCollection('orders', orders);
  } catch (error) {
    throw new Error(`Failed to save orders: ${error.message}`);
  }
};

// Initialize orders
let orders = [];

/**
 * Get all orders
 * @returns {Array} Array of orders
 * @throws {Error} If database read fails
 */
const getOrders = async () => {
  try {
    orders = await database.getCollection('orders');
    return orders;
  } catch (error) {
    throw new Error(`Failed to get orders: ${error.message}`);
  }
};

/**
 * Get order by ID
 * @param {string} id - Order ID
 * @returns {Object|null} Order object or null if not found
 * @throws {Error} If database read fails
 */
const getOrderById = async (id) => {
  try {
    orders = await database.getCollection('orders');
    return orders.find(order => order.id === id) || null;
  } catch (error) {
    throw new Error(`Failed to get order by ID: ${error.message}`);
  }
};

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @returns {Object} Created order
 * @throws {Error} If order creation fails
 */
const createOrder = async (orderData) => {
  try {
    // Validate required fields
    if (!orderData.customerId || !orderData.items || !orderData.items.length) {
      throw new Error('Missing required order data');
    }

    orders = await database.getCollection('orders');
    const newOrder = {
      id: uuidv4(),
      orderNumber: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: 'CREATED',
      ...orderData
    };
    
    orders.push(newOrder);
    await saveOrders(orders);
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status
 * @returns {Object|null} Updated order or null if not found
 * @throws {Error} If order update fails
 */
const updateOrderStatus = async (id, status) => {
  try {
    if (!id || !status) {
      throw new Error('Order ID and status are required');
    }

    orders = await database.getCollection('orders');
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return null;
    }
    
    const validStatuses = ['CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    
    await saveOrders(orders);
    return orders[orderIndex];
  } catch (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
};

/**
 * Delete an order
 * @param {string} id - Order ID
 * @returns {boolean} True if deleted, false if not found
 * @throws {Error} If order deletion fails
 */
const deleteOrder = async (id) => {
  try {
    if (!id) {
      throw new Error('Order ID is required');
    }

    orders = await database.getCollection('orders');
    const initialLength = orders.length;
    const orderToDelete = orders.find(order => order.id === id);
    
    if (!orderToDelete) {
      return false;
    }
    
    // Don't allow deletion of orders that are being processed
    if (['PROCESSING', 'SHIPPED'].includes(orderToDelete.status)) {
      throw new Error(`Cannot delete order in ${orderToDelete.status} status`);
    }
    
    orders = orders.filter(order => order.id !== id);
    await saveOrders(orders);
    return orders.length < initialLength;
  } catch (error) {
    throw new Error(`Failed to delete order: ${error.message}`);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
