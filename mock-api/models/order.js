/**
 * Order model and data access functions
 * Implements data persistence using database utility module with proper locking
 * and atomic operations for data consistency.
 */
const { v4: uuidv4 } = require('uuid');
const database = require('../utils/database');

// Order status constants
const ORDER_STATUS = {
  CREATED: 'CREATED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

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
 * Save orders to database with atomic operation
 * @param {Array} orders - Array of orders to save
 * @throws {Error} If validation or save operation fails
 */
const saveOrders = async (orders) => {
  if (!Array.isArray(orders)) {
    throw new Error('Orders must be an array');
  }

  try {
    // Validate all orders before saving
    orders.forEach(validateOrder);
    await database.updateCollection('orders', orders);
  } catch (error) {
    throw new Error(`Failed to save orders: ${error.message}`);
  }
};

/**
 * Get all orders from database
 * @returns {Promise<Array>} Array of orders
 * @throws {Error} If database read fails
 */
const getOrders = async () => {
  try {
    return await database.getCollection('orders');
  } catch (error) {
    throw new Error(`Failed to get orders: ${error.message}`);
  }
};

/**
 * Get order by ID from database
 * @param {string} id - Order ID
 * @returns {Promise<Object|null>} Order object or null if not found
 * @throws {Error} If database read fails or ID is invalid
 */
const getOrderById = async (id) => {
  if (!id) {
    throw new Error('Order ID is required');
  }

  try {
    const orders = await database.getCollection('orders');
    return orders.find(order => order.id === id) || null;
  } catch (error) {
    throw new Error(`Failed to get order by ID: ${error.message}`);
  }
};

/**
 * Create a new order in database
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 * @throws {Error} If order creation fails or validation fails
 */
const createOrder = async (orderData) => {
  try {
    // Validate required fields
    if (!orderData.customerId || !orderData.items || !orderData.items.length) {
      throw new Error('Missing required order data: customerId and non-empty items array are required');
    }

    const orders = await database.getCollection('orders');
    const newOrder = {
      id: uuidv4(),
      orderNumber: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: ORDER_STATUS.CREATED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...orderData
    };
    
    // Validate the new order before saving
    validateOrder(newOrder);
    
    orders.push(newOrder);
    await saveOrders(orders);
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

/**
 * Update order status in database
 * @param {string} id - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object|null>} Updated order or null if not found
 * @throws {Error} If order update fails or validation fails
 */
const updateOrderStatus = async (id, status) => {
  try {
    if (!id || !status) {
      throw new Error('Order ID and status are required');
    }

    if (!Object.values(ORDER_STATUS).includes(status)) {
      throw new Error(`Invalid status: ${status}. Valid statuses are: ${Object.values(ORDER_STATUS).join(', ')}`);
    }

    const orders = await database.getCollection('orders');
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return null;
    }
    
    // Check for valid status transitions
    const currentStatus = orders[orderIndex].status;
    if (currentStatus === ORDER_STATUS.CANCELLED) {
      throw new Error('Cannot update status of cancelled order');
    }
    
    if (currentStatus === ORDER_STATUS.DELIVERED && status !== ORDER_STATUS.CANCELLED) {
      throw new Error('Delivered order can only be cancelled');
    }
    
    const updatedOrder = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    
    // Validate the updated order
    validateOrder(updatedOrder);
    
    orders[orderIndex] = updatedOrder;
    await saveOrders(orders);
    return updatedOrder;
  } catch (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
};

/**
 * Delete an order from database
 * @param {string} id - Order ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 * @throws {Error} If order deletion fails or validation fails
 */
const deleteOrder = async (id) => {
  try {
    if (!id) {
      throw new Error('Order ID is required');
    }

    const orders = await database.getCollection('orders');
    const orderToDelete = orders.find(order => order.id === id);
    
    if (!orderToDelete) {
      return false;
    }
    
    // Don't allow deletion of orders that are being processed or shipped
    if ([ORDER_STATUS.PROCESSING, ORDER_STATUS.SHIPPED].includes(orderToDelete.status)) {
      throw new Error(`Cannot delete order in ${orderToDelete.status} status. Cancel the order first.`);
    }
    
    const updatedOrders = orders.filter(order => order.id !== id);
    await saveOrders(updatedOrders);
    return true;
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
