/**
 * Database utility module for handling file system operations
 * Provides atomic file operations with proper locking mechanism
 */
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

class Database {
  constructor(dbName) {
    this.dbPath = path.join(__dirname, '../data/database.json');
    this.tempDbPath = path.join(__dirname, '../data/database.temp.json');
    this.backupDbPath = path.join(__dirname, '../data/database.backup.json');
    this.lockFilePath = path.join(__dirname, '../data/database.lock');
  }

  /**
   * Initialize database if it doesn't exist
   * @returns {Promise<void>}
   * @throws {Error} If initialization fails
   */
  async initialize() {
    try {
      if (!fsSync.existsSync(path.dirname(this.dbPath))) {
        await fs.mkdir(path.dirname(this.dbPath), { recursive: true });
      }
      
      if (!fsSync.existsSync(this.dbPath)) {
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
        await fs.writeFile(this.dbPath, JSON.stringify(initialData, null, 2));
      }
    } catch (error) {
      throw new Error(`Failed to initialize database: ${error.message}`);
    }
  }

  /**
   * Acquire lock for database operations
   * @returns {Promise<boolean>}
   * @throws {Error} If lock acquisition fails
   */
  async acquireLock() {
    try {
      let attempts = 0;
      const maxAttempts = 5;
      const retryDelay = 100; // ms

      while (attempts < maxAttempts) {
        try {
          fsSync.writeFileSync(this.lockFilePath, process.pid.toString(), { flag: 'wx' });
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
  }

  /**
   * Release database lock
   */
  releaseLock() {
    try {
      if (fsSync.existsSync(this.lockFilePath)) {
        fsSync.unlinkSync(this.lockFilePath);
      }
    } catch (error) {
      console.error(`Warning: Failed to release database lock: ${error.message}`);
    }
  }

  /**
   * Read data from database
   * @returns {Promise<Object>} Database content
   * @throws {Error} If read operation fails
   */
  async read() {
    try {
      await this.acquireLock();
      const data = await fs.readFile(this.dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.initialize();
        return this.read();
      }
      throw new Error(`Failed to read database: ${error.message}`);
    } finally {
      this.releaseLock();
    }
  }

  /**
   * Write data to database with atomic operations
   * @param {Object} data - Data to write
   * @returns {Promise<void>}
   * @throws {Error} If write operation fails
   */
  async write(data) {
    try {
      await this.acquireLock();
      
      // Update metadata
      data.metadata = {
        ...data.metadata,
        lastUpdated: new Date().toISOString()
      };

      // Create backup of current database
      if (fsSync.existsSync(this.dbPath)) {
        await fs.copyFile(this.dbPath, this.backupDbPath);
      }
      
      // Write to temporary file first
      await fs.writeFile(this.tempDbPath, JSON.stringify(data, null, 2));
      
      // Atomically rename temporary file to actual database file
      await fs.rename(this.tempDbPath, this.dbPath);
      
      // Remove backup file on successful save
      if (fsSync.existsSync(this.backupDbPath)) {
        await fs.unlink(this.backupDbPath);
      }
    } catch (error) {
      // Restore from backup if available
      if (fsSync.existsSync(this.backupDbPath)) {
        await fs.copyFile(this.backupDbPath, this.dbPath);
        await fs.unlink(this.backupDbPath);
      }
      throw new Error(`Failed to write to database: ${error.message}`);
    } finally {
      // Cleanup temporary files
      if (fsSync.existsSync(this.tempDbPath)) {
        await fs.unlink(this.tempDbPath);
      }
      this.releaseLock();
    }
  }

  /**
   * Get collection from database
   * @param {string} collection - Collection name
   * @returns {Promise<Array>} Collection data
   * @throws {Error} If operation fails
   */
  async getCollection(collection) {
    try {
      const data = await this.read();
      return data[collection] || [];
    } catch (error) {
      throw new Error(`Failed to get collection ${collection}: ${error.message}`);
    }
  }

  /**
   * Update collection in database
   * @param {string} collection - Collection name
   * @param {Array} items - Collection items
   * @returns {Promise<void>}
   * @throws {Error} If operation fails
   */
  async updateCollection(collection, items) {
    try {
      const data = await this.read();
      data[collection] = items;
      await this.write(data);
    } catch (error) {
      throw new Error(`Failed to update collection ${collection}: ${error.message}`);
    }
  }
}

// Create and export singleton instance
const database = new Database();

// Initialize database on module load
database.initialize().catch(console.error);

module.exports = database;
