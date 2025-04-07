/**
 * Response formatting utilities for the Order Processing Mock API
 */
const { HTTP_STATUS, ERROR_CODES, ERROR_MESSAGES } = require('./constants');

/**
 * PUBLIC_INTERFACE
 * Format a success response
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Formatted success response
 */
const formatSuccessResponse = (data, message = 'Success') => {
  return {
    status: 'success',
    message,
    data
  };
};

/**
 * PUBLIC_INTERFACE
 * Format an error response
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {*} details - Error details
 * @returns {Object} Formatted error response
 */
const formatErrorResponse = (code = ERROR_CODES.INTERNAL_ERROR, message = ERROR_MESSAGES.INTERNAL_ERROR, details = null) => {
  return {
    status: 'error',
    error: {
      code,
      message,
      details
    }
  };
};

/**
 * PUBLIC_INTERFACE
 * Format a validation error response
 * @param {Array} errors - Validation errors
 * @returns {Object} Formatted validation error response
 */
const formatValidationError = (errors) => {
  return formatErrorResponse(
    ERROR_CODES.VALIDATION_ERROR,
    ERROR_MESSAGES.VALIDATION_ERROR,
    errors
  );
};

/**
 * PUBLIC_INTERFACE
 * Format a paginated response
 * @param {Array} data - Data array
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Formatted paginated response
 */
const formatPaginatedResponse = (data, page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    status: 'success',
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};

/**
 * PUBLIC_INTERFACE
 * Format order data for response
 * @param {Object} order - Order data
 * @returns {Object} Formatted order data
 */
const formatOrderResponse = (order) => {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    orderDate: order.orderDate,
    status: order.status,
    customer: {
      id: order.customerId,
      name: order.customerName
    },
    items: order.items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice
    })),
    shipping: {
      address: order.shippingAddress,
      cost: order.shippingCost
    },
    billing: {
      address: order.billingAddress
    },
    totals: {
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shippingCost,
      total: order.totalAmount
    }
  };
};

/**
 * PUBLIC_INTERFACE
 * Format payment data for response
 * @param {Object} payment - Payment data
 * @returns {Object} Formatted payment data
 */
const formatPaymentResponse = (payment) => {
  return {
    id: payment.id,
    orderId: payment.orderId,
    transactionId: payment.transactionId,
    method: payment.paymentMethod,
    amount: payment.amount,
    status: payment.status,
    date: payment.paymentDate
  };
};

module.exports = {
  formatSuccessResponse,
  formatErrorResponse,
  formatValidationError,
  formatPaginatedResponse,
  formatOrderResponse,
  formatPaymentResponse
};
