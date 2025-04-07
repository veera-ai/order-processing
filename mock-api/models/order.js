/**
 * Order model and data access functions with atomic file operations and proper error handling
 */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

// Database file paths
const dbPath = path.join(__dirname, '../data/database.json');
const tempDbPath = path.join(__dirname, '../data/database.temp.json');
const backupDbPath = path.join(__dirname, '../data/database.backup.json');
const lockFilePath = path.join(__dirname, '../data/database.lock');

/**
 * Initialize database if it doesn't exist
 * @returns {void}
 */
const initializeDatabase = async () => {
  try {
    if (!fsSync.existsSync(path.dirname(dbPath))) {
      await fs.mkdir(path.dirname(dbPath), { recursive: true });
    }
    
    if (!fsSync.existsSync(dbPath)) {
      const initialData = {
        metadata: {
          version: '1.0',
          lastUpdated: new Date().toISOString(),
          created: new Date().toISOString()
        },
        customers: [],
        products: [],
        orders: [],
        payments: [],
        checkoutSessions: []
      };
      await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2));
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
const acquireLock = async () => {
  try {
    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = 100; // ms

    while (attempts < maxAttempts) {
      try {
        fsSync.writeFileSync(lockFilePath, process.pid.toString(), { flag: 'wx' });
        return true;
      } catch (err) {
        if (err.code === 'EEXIST') {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          attempts++;
        } else {
          throw err;
        }
      }
    }
    throw new Error('Failed to acquire lock after maximum attempts');
  } catch (error) {
    throw new Error(`Failed to acquire database lock: ${error.message}`);
  }
};

const releaseLock = () => {
  try {
    if (fsSync.existsSync(lockFilePath)) {
      fsSync.unlinkSync(lockFilePath);
    }
  } catch (error) {
    console.error(`Warning: Failed to release database lock: ${error.message}`);
  }
};

const readOrdersFromFile = async () => {
  try {
    await acquireLock();
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    return db.orders || [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      await initializeDatabase();
      return [];
    }
    throw new Error(`Failed to read orders from database: ${error.message}`);
  } finally {
    releaseLock();
  }
};

/**
 * Save orders to database file using atomic operations
 * @param {Array} orders - Array of orders to save
 * @throws {Error} If database save fails
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

const saveOrdersToFile = async (orders) => {
  try {
    await acquireLock();
    
    // Validate all orders before saving
    orders.forEach(validateOrder);

    // Read current database
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    // Create backup of current database
    await fs.writeFile(backupDbPath, data);
    
    // Update orders and metadata
    db.orders = orders;
    db.metadata.lastUpdated = new Date().toISOString();
    
    // Write to temporary file first
    await fs.writeFile(tempDbPath, JSON.stringify(db, null, 2));
    
    // Atomically rename temporary file to actual database file
    await fs.rename(tempDbPath, dbPath);
    
    // Remove backup file on successful save
    if (fsSync.existsSync(backupDbPath)) {
      await fs.unlink(backupDbPath);
    }
  } catch (error) {
    // Restore from backup if available
    if (fsSync.existsSync(backupDbPath)) {
      await fs.copyFile(backupDbPath, dbPath);
      await fs.unlink(backupDbPath);
    }
    throw new Error(`Failed to save orders to database: ${error.message}`);
  } finally {
    // Cleanup temporary files
    if (fsSync.existsSync(tempDbPath)) {
      await fs.unlink(tempDbPath);
    }
    releaseLock();
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
