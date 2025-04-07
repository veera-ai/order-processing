/**
 * Helper functions for the Order Processing Mock API
 */
const { v4: uuidv4 } = require('uuid');

/**
 * PUBLIC_INTERFACE
 * Format a date to ISO string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  try {
    return new Date(date).toISOString();
  } catch (error) {
    throw new Error('Invalid date format');
  }
};

/**
 * PUBLIC_INTERFACE
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * PUBLIC_INTERFACE
 * Generate a unique ID
 * @returns {string} UUID v4
 */
const generateId = () => {
  return uuidv4();
};

/**
 * PUBLIC_INTERFACE
 * Generate an order number
 * @returns {string} Order number in format ORD-TIMESTAMP-RANDOM
 */
const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/**
 * PUBLIC_INTERFACE
 * Generate a transaction ID
 * @returns {string} Transaction ID in format TXN-TIMESTAMP-RANDOM
 */
const generateTransactionId = () => {
  return `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/**
 * PUBLIC_INTERFACE
 * Calculate order totals
 * @param {Array} items - Array of order items
 * @returns {Object} Order totals
 */
const calculateOrderTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const shippingCost = 10 + (items.length * 0.5); // Base shipping + per item cost
  const total = subtotal + tax + shippingCost;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shippingCost: Number(shippingCost.toFixed(2)),
    total: Number(total.toFixed(2))
  };
};

/**
 * PUBLIC_INTERFACE
 * Remove sensitive data from object
 * @param {Object} obj - Object to sanitize
 * @param {Array} fields - Fields to remove
 * @returns {Object} Sanitized object
 */
const sanitizeObject = (obj, fields = []) => {
  const sanitized = { ...obj };
  fields.forEach(field => delete sanitized[field]);
  return sanitized;
};

/**
 * PUBLIC_INTERFACE
 * Check if string is valid JSON
 * @param {string} str - String to check
 * @returns {boolean} True if valid JSON
 */
const isValidJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  formatDate,
  formatCurrency,
  generateId,
  generateOrderNumber,
  generateTransactionId,
  calculateOrderTotals,
  sanitizeObject,
  isValidJson
};
