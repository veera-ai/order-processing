/**
 * Authentication middleware
 */
// Not using jwt directly since we're using the jwt config module
import { verifyToken } from '../config/jwt.js';
import User from '../models/user.model.js';
import logger from '../config/logger.js';

// PUBLIC_INTERFACE
/**
 * Middleware to protect routes - verifies JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } 
    // Check if token exists in cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // If no token found, return unauthorized
    if (!token) {
      logger.logSecurityEvent('AUTH_FAILURE', 'unknown', { reason: 'No token provided' });
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      logger.logSecurityEvent('AUTH_FAILURE', 'unknown', { reason: 'Invalid token' });
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    // Get user from database
    const user = await User.findById(decoded.userId);

    if (!user) {
      logger.logSecurityEvent('AUTH_FAILURE', decoded.userId, { reason: 'User not found' });
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add user to request object
    req.user = user;
    
    // Log successful authentication
    logger.logSecurityEvent('AUTH_SUCCESS', user.id, { route: req.originalUrl });
    
    next();
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

export { protect };
