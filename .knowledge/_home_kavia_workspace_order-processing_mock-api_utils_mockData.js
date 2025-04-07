{"is_source_file": true, "format": "JavaScript", "description": "This file contains utility functions for generating mock data for products, customers, orders, and payments in an order processing system.", "external_files": ["uuid"], "external_methods": ["uuid.v4"], "published": ["generateMockOrders", "generateMockCheckoutSessions", "generateMockPayments", "generateMockCustomer", "generateMockProduct", "generateMockAddress"], "classes": [], "methods": [{"name": "getRandomInt", "description": "Generates a random integer between min and max (inclusive)."}, {"name": "getRandomDate", "description": "Generates a random date within the last n days, returning it as an ISO string."}, {"name": "generateMockProduct", "description": "Generates a mock product object with a random SKU, name, category, price, and quantity."}, {"name": "generateMockAddress", "description": "Generates a mock address object with random street, city, state, zip code, and country."}, {"name": "generateMockCustomer", "description": "Generates a mock customer object with random first name, last name, email, phone number, and address."}, {"name": "generateMockOrders", "description": "Generates an array of mock order objects."}, {"name": "generateMockCheckoutSessions", "description": "Generates an array of mock checkout session objects."}, {"name": "generateMockPayments", "description": "Generates an array of mock payment objects."}], "calls": ["getRandomInt", "generateMockCustomer", "generateMockProduct", "generateMockAddress", "Date.now"], "search-terms": ["mock data", "utility functions", "order processing"], "state": 2, "file_id": 45, "knowledge_revision": 97, "git_revision": "", "ctags": [{"_type": "tag", "name": "amount", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const amount = getRandomInt(10, 1000) + getRandomInt(0, 99) \\/ 100;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "cities", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "customer", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const customer = generateMockCustomer();$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "date", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const date = new Date();$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "firstName", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "firstNames", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "generateMockAddress", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const generateMockAddress = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "generateMockCheckoutSessions", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const generateMockCheckoutSessions = (count = 5) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "generateMockCustomer", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const generateMockCustomer = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "generateMockOrders", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  generateMockOrders,$/", "language": "JavaScript", "kind": "field", "scope": "module.exports", "scopeKind": "class"}, {"_type": "tag", "name": "generateMockOrders", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const generateMockOrders = (count = 10) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "generateMockPayments", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const generateMockPayments = (count = 5) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "generateMockProduct", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const generateMockProduct = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "getRandomDate", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const getRandomDate = (days = 30) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "getRandomInt", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^const getRandomInt = (min, max) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "itemCount", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const itemCount = getRandomInt(1, 5);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "items", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const items = [];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "lastName", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "lastNames", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "orderId", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const orderId = uuidv4();$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "orders", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const orders = [];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "paymentMethods", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const paymentMethods = ['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "payments", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const payments = [];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "product", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const product = products[getRandomInt(0, products.length - 1)];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "products", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const products = [$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "sessions", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const sessions = [];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "shippingCost", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const shippingCost = 10 + (items.length * 0.5);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "states", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "statuses", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const statuses = ['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "statuses", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const statuses = ['CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "streets", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Park Lane'];$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "subtotal", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "tax", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const tax = subtotal * 0.08;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "total", "path": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "pattern": "/^    const total = subtotal + tax + shippingCost;$/", "language": "JavaScript", "kind": "constant"}], "filename": "/home/kavia/workspace/order-processing/mock-api/utils/mockData.js", "hash": "ad9ab601dd72dce3b9113618c30b24e9", "format-version": 4, "code-base-name": "default", "fields": [{"name": "generateMockOrders,", "scope": "module.exports", "scopeKind": "class", "description": "unavailable"}], "revision_history": [{"97": ""}]}