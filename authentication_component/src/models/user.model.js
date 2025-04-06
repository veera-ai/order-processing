/**
 * User model for JSON file storage
 */
import bcrypt from 'bcrypt';
import { atomicOperation } from '../config/database.js';
import crypto from 'crypto';

class User {
  constructor(data) {
    this._id = data._id || crypto.randomUUID();
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role || 'user';
    this.isVerified = data.isVerified || false;
    this.verificationToken = data.verificationToken;
    this.resetPasswordToken = data.resetPasswordToken;
    this.resetPasswordExpires = data.resetPasswordExpires;
    this.loginAttempts = data.loginAttempts || 0;
    this.lockUntil = data.lockUntil;
    this.lastLogin = data.lastLogin;
    this.profilePicture = data.profilePicture;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<User>} Created user
   */
  static async create(userData) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    
    const user = new User(userData);
    
    await atomicOperation('users', async (filePath) => {
      const users = await readCollection(filePath);
      
      // Check for existing email
      if (users.some(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }
      
      users.push(user);
      await writeCollection(filePath, users);
    });
    
    return user;
  }

  // PUBLIC_INTERFACE
  /**
   * Find a user by ID
   * @param {string} id - User ID
   * @returns {Promise<User|null>} Found user or null
   */
  static async findById(id) {
    return atomicOperation('users', async (filePath) => {
      const users = await readCollection(filePath);
      const userData = users.find(u => u._id === id);
      return userData ? new User(userData) : null;
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<User|null>} Found user or null
   */
  static async findByEmail(email) {
    return atomicOperation('users', async (filePath) => {
      const users = await readCollection(filePath);
      const userData = users.find(u => u.email === email);
      return userData ? new User(userData) : null;
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Update a user
   * @param {Object} updates - Update data
   * @returns {Promise<User>} Updated user
   */
  async update(updates) {
    return atomicOperation('users', async (filePath) => {
      const users = await readCollection(filePath);
      const index = users.findIndex(u => u._id === this._id);
      
      if (index === -1) {
        throw new Error('User not found');
      }
      
      // Handle password updates
      if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
      }
      
      Object.assign(this, updates, { updatedAt: new Date() });
      users[index] = this;
      
      await writeCollection(filePath, users);
      return this;
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Compare password with hashed password
   * @param {string} candidatePassword - Password to compare
   * @returns {Promise<boolean>} True if passwords match
   */
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // PUBLIC_INTERFACE
  /**
   * Check if account is locked
   * @returns {boolean} True if account is locked
   */
  isLocked() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
  }

  // PUBLIC_INTERFACE
  /**
   * Increment login attempts
   * @returns {Promise<void>}
   */
  async incrementLoginAttempts() {
    const updates = {};
    
    if (this.lockUntil && this.lockUntil < Date.now()) {
      updates.loginAttempts = 1;
      updates.lockUntil = null;
    } else {
      updates.loginAttempts = (this.loginAttempts || 0) + 1;
      if (updates.loginAttempts >= 5) {
        updates.lockUntil = Date.now() + 3600000; // Lock for 1 hour
      }
    }
    
    await this.update(updates);
  }

  // Convert to JSON while excluding sensitive data
  toJSON() {
    const json = { ...this };
    delete json.password;
    return json;
  }
}

// Helper functions
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

const writeCollection = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

export default User;
