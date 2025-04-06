/**
 * JSON file-based database configuration
 * Handles file operations, atomic writes, and data consistency
 */
import fs from 'fs/promises';
import path from 'path';
import logger from './logger.js';
// Database configuration
const DB_CONFIG = {
  dataDir: path.join(process.cwd(), 'data'),
  collections: {
    users: 'users.json',
    sessions: 'sessions.json',
    indexes: 'indexes.json'
  },
  lockTimeout: 5000, // 5 seconds timeout for locks
  maxRetries: 3,    // Maximum retries for atomic operations
  retryDelay: 100   // Initial retry delay in milliseconds
};

// Ensure atomic operations using lock files
const acquireLock = async (lockFile) => {
  try {
    await fs.writeFile(lockFile, String(process.pid), { flag: 'wx' });
    return true;
  } catch (error) {
    if (error.code === 'EEXIST') {
      return false;
    }
    throw error;
  }
};

const releaseLock = async (lockFile) => {
  try {
    await fs.unlink(lockFile);
  } catch (error) {
    logger.error(`Error releasing lock: ${error.message}`);
  }
};

// Atomic file operation with retries
const atomicOperation = async (collection, operation) => {
  const filePath = path.join(DB_CONFIG.dataDir, DB_CONFIG.collections[collection]);
  const lockFile = `${filePath}.lock`;
  let retries = 0;
  
  while (retries < DB_CONFIG.maxRetries) {
    try {
      // Try to acquire lock
      if (await acquireLock(lockFile)) {
        try {
          const result = await operation(filePath);
          await releaseLock(lockFile);
          return result;
        } catch (error) {
          await releaseLock(lockFile);
          throw error;
        }
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, DB_CONFIG.retryDelay * Math.pow(2, retries)));
      retries++;
    } catch (error) {
      logger.error(`Atomic operation error: ${error.message}`);
      throw error;
    }
  }
  
  throw new Error(`Failed to acquire lock after ${DB_CONFIG.maxRetries} retries`);
};

// Read collection data
const readCollection = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Write collection data
const writeCollection = async (filePath, data) => {
  const tempFile = `${filePath}.tmp`;
  try {
    await fs.writeFile(tempFile, JSON.stringify(data, null, 2));
    await fs.rename(tempFile, filePath);
  } catch (error) {
    try {
      await fs.unlink(tempFile);
    } catch {}
    throw error;
  }
};

// Initialize database
const initializeDB = async () => {
  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(DB_CONFIG.dataDir, { recursive: true });
    
    // Initialize collections if they don't exist
    for (const collection of Object.values(DB_CONFIG.collections)) {
      const filePath = path.join(DB_CONFIG.dataDir, collection);
      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(filePath, '[]');
      }
    }
    
    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error(`Database initialization error: ${error.message}`);
    throw error;
  }
};

// PUBLIC_INTERFACE
/**
 * Connect to the JSON file database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await initializeDB();
    logger.info('Connected to JSON file database');
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    throw error;
  }
};

// Export database operations
export {
  connectDB,
  atomicOperation,
  readCollection,
  writeCollection,
  DB_CONFIG
};
