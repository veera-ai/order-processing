/**
 * Validation functions for the Order Processing Mock API
 */
const { VALIDATION_MESSAGES } = require('./constants');

/**
 * PUBLIC_INTERFACE
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * PUBLIC_INTERFACE
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * PUBLIC_INTERFACE
 * Validate ZIP code format
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} True if valid
 */
const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}$/;
  return zipRegex.test(zipCode);
};

/**
 * PUBLIC_INTERFACE
 * Validate customer data
 * @param {Object} customer - Customer data to validate
 * @returns {Object} Validation result
 */
const validateCustomer = (customer) => {
  const errors = [];

  if (!customer.firstName) {
    errors.push({ field: 'firstName', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!customer.lastName) {
    errors.push({ field: 'lastName', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!customer.email) {
    errors.push({ field: 'email', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  } else if (!isValidEmail(customer.email)) {
    errors.push({ field: 'email', message: VALIDATION_MESSAGES.INVALID_EMAIL });
  }
  if (customer.phone && !isValidPhone(customer.phone)) {
    errors.push({ field: 'phone', message: VALIDATION_MESSAGES.INVALID_PHONE });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * PUBLIC_INTERFACE
 * Validate address data
 * @param {Object} address - Address data to validate
 * @returns {Object} Validation result
 */
const validateAddress = (address) => {
  const errors = [];

  if (!address.street) {
    errors.push({ field: 'street', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!address.city) {
    errors.push({ field: 'city', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!address.state) {
    errors.push({ field: 'state', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!address.zipCode) {
    errors.push({ field: 'zipCode', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  } else if (!isValidZipCode(address.zipCode)) {
    errors.push({ field: 'zipCode', message: VALIDATION_MESSAGES.INVALID_ZIP });
  }
  if (!address.country) {
    errors.push({ field: 'country', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * PUBLIC_INTERFACE
 * Validate order item data
 * @param {Object} item - Order item data to validate
 * @returns {Object} Validation result
 */
const validateOrderItem = (item) => {
  const errors = [];

  if (!item.id) {
    errors.push({ field: 'id', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!item.name) {
    errors.push({ field: 'name', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!item.unitPrice || item.unitPrice <= 0) {
    errors.push({ field: 'unitPrice', message: VALIDATION_MESSAGES.INVALID_AMOUNT });
  }
  if (!item.quantity || item.quantity <= 0) {
    errors.push({ field: 'quantity', message: VALIDATION_MESSAGES.INVALID_QUANTITY });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * PUBLIC_INTERFACE
 * Validate order data
 * @param {Object} order - Order data to validate
 * @returns {Object} Validation result
 */
const validateOrder = (order) => {
  const errors = [];

  if (!order.customerId) {
    errors.push({ field: 'customerId', message: VALIDATION_MESSAGES.REQUIRED_FIELD });
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    errors.push({ field: 'items', message: 'Order must contain at least one item' });
  } else {
    order.items.forEach((item, index) => {
      const itemValidation = validateOrderItem(item);
      if (!itemValidation.isValid) {
        errors.push({ field: `items[${index}]`, message: itemValidation.errors });
      }
    });
  }

  if (order.shippingAddress) {
    const addressValidation = validateAddress(order.shippingAddress);
    if (!addressValidation.isValid) {
      errors.push({ field: 'shippingAddress', message: addressValidation.errors });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidZipCode,
  validateCustomer,
  validateAddress,
  validateOrderItem,
  validateOrder
};
