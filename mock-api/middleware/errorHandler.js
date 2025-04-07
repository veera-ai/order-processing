const { ValidationError } = require('./validation');
const { AuthenticationError } = require('./auth');

/**
 * Custom error class for API errors
 */
class APIError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

/**
 * PUBLIC_INTERFACE
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  let response = {
    error: {
      message: err.message || 'Internal Server Error',
      status: err.statusCode || 500,
      timestamp: new Date().toISOString()
    }
  };

  // Handle validation errors
  if (err instanceof ValidationError) {
    response.error.details = err.errors;
  }
  
  // Handle authentication errors
  if (err instanceof AuthenticationError) {
    response.error.code = 'UNAUTHORIZED';
  }

  // Handle API errors
  if (err instanceof APIError) {
    response.error.code = 'API_ERROR';
  }

  res.status(response.error.status).json(response);
};

module.exports = {
  errorHandler,
  APIError
};
