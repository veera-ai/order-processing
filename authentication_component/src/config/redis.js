/**
 * Redis configuration for session management and caching
 */
const redis = require('redis');
const logger = require('./logger');

// Create Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
});

// PUBLIC_INTERFACE
/**
 * Connect to Redis server
 * @returns {Promise} Redis connection promise
 */
const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('Redis client connected');
    return redisClient;
  } catch (error) {
    logger.error(`Error connecting to Redis: ${error.message}`);
    process.exit(1);
  }
};

// PUBLIC_INTERFACE
/**
 * Get value from Redis
 * @param {string} key - The key to retrieve
 * @returns {Promise<string|null>} The value or null if not found
 */
const get = async (key) => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    logger.error(`Redis get error: ${error.message}`);
    return null;
  }
};

// PUBLIC_INTERFACE
/**
 * Set value in Redis
 * @param {string} key - The key to set
 * @param {string} value - The value to set
 * @param {number} [expiry] - Expiry time in seconds (optional)
 * @returns {Promise<boolean>} Success status
 */
const set = async (key, value, expiry = null) => {
  try {
    if (expiry) {
      await redisClient.set(key, value, { EX: expiry });
    } else {
      await redisClient.set(key, value);
    }
    return true;
  } catch (error) {
    logger.error(`Redis set error: ${error.message}`);
    return false;
  }
};

// PUBLIC_INTERFACE
/**
 * Delete key from Redis
 * @param {string} key - The key to delete
 * @returns {Promise<boolean>} Success status
 */
const del = async (key) => {
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    logger.error(`Redis delete error: ${error.message}`);
    return false;
  }
};

module.exports = {
  connectRedis,
  redisClient,
  get,
  set,
  del
};
