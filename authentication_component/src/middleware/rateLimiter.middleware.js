/**
 * Rate limiting middleware
 */
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { redisClient } = require('../config/redis');
const logger = require('../config/logger');

// PUBLIC_INTERFACE
/**
 * Create a rate limiter middleware
 * @param {Object} options - Rate limiter options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.max - Maximum number of requests in the time window
 * @param {string} options.keyPrefix - Redis key prefix
 * @param {string} options.message - Error message
 * @returns {Function} Express middleware function
 */
const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes by default
    max = 100, // 100 requests per window by default
    keyPrefix = 'rate-limit:',
    message = 'Too many requests, please try again later.'
  } = options;

  const limiter = rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message
    },
    store: new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
      prefix: keyPrefix
    }),
    handler: (req, res, next, options) => {
      const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
      logger.logSecurityEvent('RATE_LIMIT_EXCEEDED', req.user?.id || 'anonymous', {
        ip,
        endpoint: req.originalUrl,
        method: req.method
      });
      res.status(options.statusCode).json(options.message);
    }
  });

  return limiter;
};

// PUBLIC_INTERFACE
/**
 * Rate limiter for authentication endpoints
 */
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per 15 minutes
  keyPrefix: 'rate-limit:auth:',
  message: 'Too many authentication attempts, please try again after 15 minutes.'
});

// PUBLIC_INTERFACE
/**
 * Rate limiter for API endpoints
 */
const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  keyPrefix: 'rate-limit:api:'
});

module.exports = {
  createRateLimiter,
  authLimiter,
  apiLimiter
};
