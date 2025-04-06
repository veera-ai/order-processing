/**
 * Not found middleware
 */

// PUBLIC_INTERFACE
/**
 * Handles 404 errors for unmatched routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const notFoundHandler = (req, res, _next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

export { notFoundHandler };
