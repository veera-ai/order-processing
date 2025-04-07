/**
 * Constants used throughout the Order Processing Mock API
 */

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Error Codes
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  DUPLICATE_RESOURCE: 'DUPLICATE_RESOURCE',
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
};

// Error Messages
const ERROR_MESSAGES = {
  VALIDATION_ERROR: 'Validation error occurred',
  RESOURCE_NOT_FOUND: 'Requested resource not found',
  DUPLICATE_RESOURCE: 'Resource already exists',
  INVALID_REQUEST: 'Invalid request parameters',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  INTERNAL_ERROR: 'Internal server error occurred'
};

// Order Status
const ORDER_STATUS = {
  CREATED: 'CREATED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

// Payment Methods
const PAYMENT_METHODS = {
  CREDIT_CARD: 'CREDIT_CARD',
  PAYPAL: 'PAYPAL',
  BANK_TRANSFER: 'BANK_TRANSFER'
};

// Payment Status
const PAYMENT_STATUS = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

// Validation Messages
const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PHONE: 'Invalid phone number format',
  INVALID_ZIP: 'Invalid ZIP code format',
  INVALID_AMOUNT: 'Invalid amount',
  INVALID_QUANTITY: 'Invalid quantity',
  INVALID_DATE: 'Invalid date format'
};

// Pagination Defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

module.exports = {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  VALIDATION_MESSAGES,
  PAGINATION
};
