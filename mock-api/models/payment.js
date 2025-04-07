/**
 * Payment model and data access functions
 */
const { v4: uuidv4 } = require('uuid');

// In-memory data store
let payments = [];

/**
 * Process a payment for an order
 * @param {string} orderId - Order ID
 * @param {string} paymentMethod - Payment method
 * @param {number} amount - Payment amount
 * @returns {Object} Payment object
 */
const processPayment = (orderId, paymentMethod, amount) => {
  const payment = {
    id: uuidv4(),
    orderId,
    transactionId: `TXN-${Date.now()}`,
    paymentMethod,
    amount: parseFloat(amount),
    status: 'COMPLETED',
    paymentDate: new Date().toISOString()
  };
  
  payments.push(payment);
  return payment;
};

/**
 * Get payment by ID
 * @param {string} id - Payment ID
 * @returns {Object|null} Payment object or null if not found
 */
const getPaymentById = (id) => {
  return payments.find(payment => payment.id === id);
};

/**
 * Get payment by order ID
 * @param {string} orderId - Order ID
 * @returns {Object|null} Payment object or null if not found
 */
const getPaymentByOrderId = (orderId) => {
  return payments.find(payment => payment.orderId === orderId);
};

/**
 * Refund a payment
 * @param {string} id - Payment ID
 * @param {number} amount - Refund amount (optional, defaults to full payment amount)
 * @returns {Object|null} Updated payment or null if not found
 */
const refundPayment = (id, amount) => {
  const paymentIndex = payments.findIndex(payment => payment.id === id);
  
  if (paymentIndex === -1) {
    return null;
  }
  
  const refundAmount = amount ? parseFloat(amount) : payments[paymentIndex].amount;
  
  payments[paymentIndex] = {
    ...payments[paymentIndex],
    status: 'REFUNDED',
    refundAmount,
    refundDate: new Date().toISOString()
  };
  
  return payments[paymentIndex];
};

module.exports = {
  processPayment,
  getPaymentById,
  getPaymentByOrderId,
  refundPayment
};
