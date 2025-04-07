/**
 * Order model and data access functions with atomic file operations and proper error handling
 */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Database file paths
const dbPath = path.join(__dirname, '../data/database.json');
const tempDbPath = path.join(__dirname, '../data/database.temp.json');
const backupDbPath = path.join(__dirname, '../data/database.backup.json');

/**
 * Initialize database if it doesn't exist
 * @returns {void}
 */
const initializeDatabase = () => {
  try {
    if (!fs.existsSync(path.dirname(dbPath))) {
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    }
    
    if (!fs.existsSync(dbPath)) {
      const initialData = {
        customers: [],
        products: [],
        orders: [],
        payments: [],
        checkoutSessions: []
      };
      fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    throw new Error(`Failed to initialize database: ${error.message}`);
  }
};

// Initialize database on module load
initializeDatabase();

/**
 * Read orders from database file with error handling
 * @returns {Array} Array of orders
 * @throws {Error} If database read fails
 */
const readOrdersFromFile = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    return db.orders || [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      initializeDatabase();
      return [];
    }
    throw new Error(`Failed to read orders from database: ${error.message}`);
  }
};

/**
 * Save orders to database file using atomic operations
 * @param {Array} orders - Array of orders to save
 * @throws {Error} If database save fails
 */
const saveOrdersToFile = (orders) => {
  try {
    // Read current database
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    // Create backup of current database
    fs.writeFileSync(backupDbPath, data);
    
    // Update orders
    db.orders = orders;
    
    // Write to temporary file first
    fs.writeFileSync(tempDbPath, JSON.stringify(db, null, 2));
    
    // Atomically rename temporary file to actual database file
    fs.renameSync(tempDbPath, dbPath);
    
    // Remove backup file on successful save
    if (fs.existsSync(backupDbPath)) {
      fs.unlinkSync(backupDbPath);
    }
  } catch (error) {
    // Restore from backup if available
    if (fs.existsSync(backupDbPath)) {
      fs.copyFileSync(backupDbPath, dbPath);
      fs.unlinkSync(backupDbPath);
    }
    throw new Error(`Failed to save orders to database: ${error.message}`);
  } finally {
    // Cleanup temporary files
    if (fs.existsSync(tempDbPath)) {
      fs.unlinkSync(tempDbPath);
    }
  }
};

// Initialize orders from database
let orders = readOrdersFromFile();

/**
 * Get all orders
 * @returns {Array} Array of orders
 * @throws {Error} If database read fails
 */
const getOrders = () => {
  try {
    orders = readOrdersFromFile();
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
const getOrderById = (id) => {
  try {
    orders = readOrdersFromFile();
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
const createOrder = (orderData) => {
  try {
    // Validate required fields
    if (!orderData.customerId || !orderData.items || !orderData.items.length) {
      throw new Error('Missing required order data');
    }

    orders = readOrdersFromFile();
    
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
const updateOrderStatus = (id, status) => {
  try {
    if (!id || !status) {
      throw new Error('Order ID and status are required');
    }

    orders = readOrdersFromFile();
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
    
    saveOrdersToFile(orders);
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
const deleteOrder = (id) => {
  try {
    if (!id) {
      throw new Error('Order ID is required');
    }

    orders = readOrdersFromFile();
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
    saveOrdersToFile(orders);
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
