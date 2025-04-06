/**
 * JWT configuration and utility functions
 */
const jwt = require('jsonwebtoken');
const logger = require('./logger');

// PUBLIC_INTERFACE
/**
 * Generate JWT token
 * @param {Object} payload - Data to be included in the token
 * @param {string} [expiresIn] - Token expiration time (default: from env or 1d)
 * @returns {string} JWT token
 */
const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN || '1d') => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    logger.error(`Error generating JWT token: ${error.message}`);
    throw new Error('Error generating authentication token');
  }
};

// PUBLIC_INTERFACE
/**
 * Generate refresh token
 * @param {string} userId - User ID
 * @returns {string} Refresh token
 */
const generateRefreshToken = (userId) => {
  try {
    return jwt.sign(
      { userId, tokenType: 'refresh' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
  } catch (error) {
    logger.error(`Error generating refresh token: ${error.message}`);
    throw new Error('Error generating refresh token');
  }
};

// PUBLIC_INTERFACE
/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.error(`Token verification failed: ${error.message}`);
    return null;
  }
};

// PUBLIC_INTERFACE
/**
 * Generate email verification token
 * @param {string} userId - User ID
 * @returns {string} Email verification token
 */
const generateEmailVerificationToken = (userId) => {
  try {
    return jwt.sign(
      { userId, purpose: 'email_verification' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  } catch (error) {
    logger.error(`Error generating email verification token: ${error.message}`);
    throw new Error('Error generating verification token');
  }
};

// PUBLIC_INTERFACE
/**
 * Generate password reset token
 * @param {string} userId - User ID
 * @returns {string} Password reset token
 */
const generatePasswordResetToken = (userId) => {
  try {
    return jwt.sign(
      { userId, purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (error) {
    logger.error(`Error generating password reset token: ${error.message}`);
    throw new Error('Error generating password reset token');
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  generateEmailVerificationToken,
  generatePasswordResetToken
};
