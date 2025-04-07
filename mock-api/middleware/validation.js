const { validationResult, body, param, query } = require('express-validator');

/**
 * Custom error class for validation errors
 */
class ValidationError extends Error {
  constructor(errors) {
    super('Validation Error');
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.errors = errors;
  }
}

/**
 * PUBLIC_INTERFACE
 * Middleware to validate request data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
  next();
};

/**
 * Common validation rules
 */
const validationRules = {
  orderId: param('orderId').isString().trim().notEmpty()
    .withMessage('Order ID is required'),
  
  orderStatus: body('status').isString().trim().notEmpty()
    .isIn(['pending', 'processing', 'completed', 'cancelled'])
    .withMessage('Invalid order status'),
  
  pagination: [
    query('page').optional().isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],
  
  orderCreate: [
    body('userId').isString().trim().notEmpty()
      .withMessage('User ID is required'),
    body('items').isArray({ min: 1 })
      .withMessage('Order must contain at least one item'),
    body('items.*.productId').isString().trim().notEmpty()
      .withMessage('Product ID is required for each item'),
    body('items.*.quantity').isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer')
  ]
};

module.exports = {
  validate,
  validationRules,
  ValidationError
};
