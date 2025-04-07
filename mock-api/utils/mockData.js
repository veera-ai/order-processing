/**
 * Utility functions for generating mock data
 */
const { v4: uuidv4 } = require('uuid');

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate a random date within the last n days
 * @param {number} days - Number of days in the past
 * @returns {string} ISO date string
 */
const getRandomDate = (days = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomInt(0, days));
  return date.toISOString();
};

/**
 * Generate mock product data
 * @returns {Object} Product object
 */
const generateMockProduct = () => {
  const products = [
    { name: 'Laptop', category: 'Electronics', unitPrice: 999.99 },
    { name: 'Smartphone', category: 'Electronics', unitPrice: 699.99 },
    { name: 'Headphones', category: 'Electronics', unitPrice: 149.99 },
    { name: 'T-shirt', category: 'Clothing', unitPrice: 19.99 },
    { name: 'Jeans', category: 'Clothing', unitPrice: 49.99 },
    { name: 'Sneakers', category: 'Footwear', unitPrice: 89.99 },
    { name: 'Coffee Maker', category: 'Home', unitPrice: 79.99 },
    { name: 'Blender', category: 'Home', unitPrice: 39.99 },
    { name: 'Book', category: 'Books', unitPrice: 14.99 },
    { name: 'Watch', category: 'Accessories', unitPrice: 199.99 }
  ];
  
  const product = products[getRandomInt(0, products.length - 1)];
  
  return {
    id: uuidv4(),
    ...product,
    quantity: getRandomInt(1, 5)
  };
};

/**
 * Generate mock address data
 * @returns {Object} Address object
 */
const generateMockAddress = () => {
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Park Lane'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
  
  return {
    street: `${getRandomInt(100, 999)} ${streets[getRandomInt(0, streets.length - 1)]}`,
    city: cities[getRandomInt(0, cities.length - 1)],
    state: states[getRandomInt(0, states.length - 1)],
    zipCode: `${getRandomInt(10000, 99999)}`,
    country: 'USA'
  };
};

/**
 * Generate mock customer data
 * @returns {Object} Customer object
 */
const generateMockCustomer = () => {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
  
  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  
  return {
    id: uuidv4(),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `(${getRandomInt(100, 999)}) ${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
    address: generateMockAddress()
  };
};

/**
 * Generate mock order data
 * @param {number} count - Number of orders to generate
 * @returns {Array} Array of order objects
 */
const generateMockOrders = (count = 10) => {
  const orders = [];
  const statuses = ['CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  
  for (let i = 0; i < count; i++) {
    const customer = generateMockCustomer();
    const items = [];
    const itemCount = getRandomInt(1, 5);
    
    for (let j = 0; j < itemCount; j++) {
      items.push(generateMockProduct());
    }
    
    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shippingCost = 10 + (items.length * 0.5);
    const total = subtotal + tax + shippingCost;
    
    orders.push({
      id: uuidv4(),
      orderNumber: `ORD-${Date.now()}-${i}`,
      orderDate: getRandomDate(30),
      status: statuses[getRandomInt(0, statuses.length - 1)],
      customerId: customer.id,
      customerName: `${customer.firstName} ${customer.lastName}`,
      items,
      shippingAddress: customer.address,
      billingAddress: customer.address,
      subtotal,
      tax,
      shippingCost,
      totalAmount: total
    });
  }
  
  return orders;
};

/**
 * Generate mock checkout sessions
 * @param {number} count - Number of checkout sessions to generate
 * @returns {Array} Array of checkout session objects
 */
const generateMockCheckoutSessions = (count = 5) => {
  const sessions = [];
  
  for (let i = 0; i < count; i++) {
    const customer = generateMockCustomer();
    const items = [];
    const itemCount = getRandomInt(1, 5);
    
    for (let j = 0; j < itemCount; j++) {
      items.push(generateMockProduct());
    }
    
    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shippingCost = 10 + (items.length * 0.5);
    const total = subtotal + tax + shippingCost;
    
    sessions.push({
      id: uuidv4(),
      customerId: customer.id,
      items,
      shippingAddress: customer.address,
      billingAddress: customer.address,
      paymentMethod: getRandomInt(0, 1) === 0 ? 'CREDIT_CARD' : 'PAYPAL',
      subtotal,
      tax,
      shippingCost,
      total
    });
  }
  
  return sessions;
};

/**
 * Generate mock payment data
 * @param {number} count - Number of payments to generate
 * @returns {Array} Array of payment objects
 */
const generateMockPayments = (count = 5) => {
  const payments = [];
  const paymentMethods = ['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER'];
  const statuses = ['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED'];
  
  for (let i = 0; i < count; i++) {
    const orderId = uuidv4();
    const amount = getRandomInt(10, 1000) + getRandomInt(0, 99) / 100;
    
    payments.push({
      id: uuidv4(),
      orderId,
      transactionId: `TXN-${Date.now()}-${i}`,
      paymentMethod: paymentMethods[getRandomInt(0, paymentMethods.length - 1)],
      amount,
      status: statuses[getRandomInt(0, statuses.length - 1)],
      paymentDate: getRandomDate(10)
    });
  }
  
  return payments;
};

module.exports = {
  generateMockOrders,
  generateMockCheckoutSessions,
  generateMockPayments,
  generateMockCustomer,
  generateMockProduct,
  generateMockAddress
};
