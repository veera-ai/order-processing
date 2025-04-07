/**
 * Checkout model and data access functions
 */
const { v4: uuidv4 } = require('uuid');
const { createOrder } = require('./order');

/**
 * Initialize checkout
 * @param {string} customerId - Customer ID
 * @returns {Object} Checkout object
 */
const initializeCheckout = (customerId) => {
  return {
    id: uuidv4(),
    customerId,
    items: [],
    shippingAddress: null,
    billingAddress: null,
    paymentMethod: null,
    subtotal: 0,
    tax: 0,
    shippingCost: 0,
    total: 0
  };
};

/**
 * Process checkout and create an order
 * @param {Object} checkout - Checkout data
 * @returns {Object} Created order
 */
const processCheckout = (checkout) => {
  // Calculate totals if not provided
  if (!checkout.subtotal && checkout.items) {
    checkout.subtotal = checkout.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }
  
  if (!checkout.tax) {
    checkout.tax = calculateTax(checkout);
  }
  
  if (!checkout.shippingCost) {
    checkout.shippingCost = calculateShippingCost(checkout);
  }
  
  if (!checkout.total) {
    checkout.total = checkout.subtotal + checkout.tax + checkout.shippingCost;
  }
  
  // Create order from checkout
  const order = createOrder({
    customerId: checkout.customerId,
    items: checkout.items,
    totalAmount: checkout.total,
    shippingAddress: checkout.shippingAddress,
    billingAddress: checkout.billingAddress
  });
  
  return order;
};

/**
 * Calculate shipping cost
 * @param {Object} checkout - Checkout data
 * @returns {number} Shipping cost
 */
const calculateShippingCost = (checkout) => {
  // Mock shipping cost calculation
  // In a real implementation, this would consider weight, distance, shipping method, etc.
  const baseShippingCost = 10;
  const itemCount = checkout.items ? checkout.items.length : 0;
  
  return baseShippingCost + (itemCount * 0.5);
};

/**
 * Calculate tax
 * @param {Object} checkout - Checkout data
 * @returns {number} Tax amount
 */
const calculateTax = (checkout) => {
  // Mock tax calculation
  // In a real implementation, this would consider tax rates based on location, product types, etc.
  const taxRate = 0.08; // 8%
  const subtotal = checkout.subtotal || 0;
  
  return subtotal * taxRate;
};

module.exports = {
  initializeCheckout,
  processCheckout,
  calculateShippingCost,
  calculateTax
};
