const jwt = require('jsonwebtoken');

// JWT secret key - should be in environment variables in production
const JWT_SECRET = 'your-secret-key';

/**
 * Custom error class for authentication errors
 */
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

/**
 * PUBLIC_INTERFACE
 * Middleware to verify JWT token and extract user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        throw new AuthenticationError('Invalid token');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUBLIC_INTERFACE
 * Generate JWT token for a user
 * @param {Object} user - User object containing user information
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
};

module.exports = {
  authenticateToken,
  generateToken,
  AuthenticationError
};
