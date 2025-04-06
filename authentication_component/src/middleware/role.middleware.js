/**
 * Role-based access control middleware
 */
const logger = require('../config/logger');

// PUBLIC_INTERFACE
/**
 * Middleware to restrict access based on user role
 * @param {...string} roles - Allowed roles
 * @returns {Function} Express middleware function
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // User must be authenticated first (protect middleware should be used before this)
    if (!req.user) {
      logger.logSecurityEvent('ROLE_CHECK_FAILURE', 'unknown', { 
        reason: 'User not authenticated',
        requiredRoles: roles
      });
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    // Check if user role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      logger.logSecurityEvent('ROLE_CHECK_FAILURE', req.user.id, { 
        reason: 'Insufficient permissions',
        userRole: req.user.role,
        requiredRoles: roles
      });
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resource'
      });
    }

    // User has required role, proceed
    logger.logSecurityEvent('ROLE_CHECK_SUCCESS', req.user.id, { 
      userRole: req.user.role,
      requiredRoles: roles
    });
    next();
  };
};

module.exports = {
  authorize
};
