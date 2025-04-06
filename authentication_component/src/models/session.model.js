/**
 * Session model for JSON file storage
 */
import { atomicOperation } from '../config/database.js';
import crypto from 'crypto';

class Session {
  constructor(data) {
    this._id = data._id || crypto.randomUUID();
    this.userId = data.userId;
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    this.userAgent = data.userAgent;
    this.ipAddress = data.ipAddress;
    this.isValid = data.isValid !== false;
    this.expiresAt = data.expiresAt;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new session
   * @param {Object} sessionData - Session data
   * @returns {Promise<Session>} Created session
   */
  static async create(sessionData) {
    const session = new Session(sessionData);
    
    await atomicOperation('sessions', async (filePath) => {
      const sessions = await readCollection(filePath);
      sessions.push(session);
      
      // Clean up expired sessions
      const validSessions = sessions.filter(s => new Date(s.expiresAt) > new Date());
      await writeCollection(filePath, validSessions);
    });
    
    return session;
  }

  // PUBLIC_INTERFACE
  /**
   * Find a session by ID
   * @param {string} id - Session ID
   * @returns {Promise<Session|null>} Found session or null
   */
  static async findById(id) {
    return atomicOperation('sessions', async (filePath) => {
      const sessions = await readCollection(filePath);
      const sessionData = sessions.find(s => s._id === id && new Date(s.expiresAt) > new Date());
      return sessionData ? new Session(sessionData) : null;
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Find sessions by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Session[]>} Found sessions
   */
  static async findByUserId(userId) {
    return atomicOperation('sessions', async (filePath) => {
      const sessions = await readCollection(filePath);
      const validSessions = sessions
        .filter(s => s.userId === userId && new Date(s.expiresAt) > new Date())
        .map(s => new Session(s));
      return validSessions;
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Find a session by token
   * @param {string} token - Session token
   * @returns {Promise<Session|null>} Found session or null
   */
  static async findByToken(token) {
    return atomicOperation('sessions', async (filePath) => {
      const sessions = await readCollection(filePath);
      const sessionData = sessions.find(
        s => s.token === token && 
        s.isValid && 
        new Date(s.expiresAt) > new Date()
      );
      return sessionData ? new Session(sessionData) : null;
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Update a session
   * @param {Object} updates - Update data
   * @returns {Promise<Session>} Updated session
   */
  async update(updates) {
    return atomicOperation('sessions', async (filePath) => {
      const sessions = await readCollection(filePath);
      const index = sessions.findIndex(s => s._id === this._id);
      
      if (index === -1) {
        throw new Error('Session not found');
      }
      
      Object.assign(this, updates, { updatedAt: new Date() });
      sessions[index] = this;
      
      await writeCollection(filePath, sessions);
      return this;
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Invalidate a session
   * @returns {Promise<void>}
   */
  async invalidate() {
    await this.update({ isValid: false });
  }

  // PUBLIC_INTERFACE
  /**
   * Clean up expired sessions
   * @returns {Promise<void>}
   */
  static async cleanup() {
    await atomicOperation('sessions', async (filePath) => {
      const sessions = await readCollection(filePath);
      const validSessions = sessions.filter(s => new Date(s.expiresAt) > new Date());
      await writeCollection(filePath, validSessions);
    });
  }
}

// Helper functions
import fs from 'fs/promises';

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

export default Session;
