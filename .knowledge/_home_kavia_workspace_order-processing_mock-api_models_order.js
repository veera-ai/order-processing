{"is_source_file": true, "format": "JavaScript", "description": "This file defines the Order model along with various data access functions for managing orders in a database using file operations, including initialization, reading, saving, updating, and deleting orders.", "external_files": ["../data/database.json", "../data/database.temp.json", "../data/database.backup.json"], "external_methods": [], "published": ["getOrders", "getOrderById", "createOrder", "updateOrderStatus", "deleteOrder"], "classes": [], "methods": [{"name": "initializeDatabase", "description": "Initializes the database if it doesn't already exist."}, {"name": "readOrdersFromFile", "description": "Reads orders from the database file and returns an array of orders."}, {"name": "saveOrdersToFile", "description": "Saves the given array of orders to the database file using atomic operations."}, {"name": "getOrders", "description": "Retrieves all orders from the database."}, {"name": "getOrderById", "description": "Retrieves a specific order by its ID."}, {"name": "createOrder", "description": "Creates a new order with the provided order data."}, {"name": "updateOrderStatus", "description": "Updates the status of an existing order by its ID."}, {"name": "deleteOrder", "description": "Deletes an order by its ID."}], "calls": ["fs.existsSync", "fs.mkdirSync", "fs.writeFileSync", "fs.readFileSync", "fs.renameSync", "fs.unlinkSync", "fs.copyFileSync"], "search-terms": ["Order", "database operations", "file access", "order management"], "state": 2, "file_id": 41, "knowledge_revision": 143, "git_revision": "337f4868fe55857badb21521f3fa07f7dce42a7a", "revision_history": [{"90": ""}, {"134": "70f23bcd3f2a1a4a2871cd672a5343daafc3826e"}, {"135": "70f23bcd3f2a1a4a2871cd672a5343daafc3826e"}, {"136": "70f23bcd3f2a1a4a2871cd672a5343daafc3826e"}, {"137": "70f23bcd3f2a1a4a2871cd672a5343daafc3826e"}, {"138": "337f4868fe55857badb21521f3fa07f7dce42a7a"}, {"139": "337f4868fe55857badb21521f3fa07f7dce42a7a"}, {"141": "337f4868fe55857badb21521f3fa07f7dce42a7a"}, {"142": "337f4868fe55857badb21521f3fa07f7dce42a7a"}, {"143": "337f4868fe55857badb21521f3fa07f7dce42a7a"}], "ctags": [{"_type": "tag", "name": "backupDbPath", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const backupDbPath = path.join(__dirname, '..\\/data\\/database.backup.json');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "checkoutSessions", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^        checkoutSessions: []$/", "language": "JavaScript", "kind": "property", "scope": "initialData", "scopeKind": "class"}, {"_type": "tag", "name": "createOrder", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const createOrder = (orderData) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "customers", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^        customers: [],$/", "language": "JavaScript", "kind": "property", "scope": "initialData", "scopeKind": "class"}, {"_type": "tag", "name": "data", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^    const data = fs.readFileSync(dbPath, 'utf8');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "db", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^    const db = JSON.parse(data);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "dbPath", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const dbPath = path.join(__dirname, '..\\/data\\/database.json');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "deleteOrder", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const deleteOrder = (id) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "fs", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const fs = require('fs');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "getOrderById", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const getOrderById = (id) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "getOrders", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^  getOrders,$/", "language": "JavaScript", "kind": "field", "scope": "module.exports", "scopeKind": "class"}, {"_type": "tag", "name": "getOrders", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const getOrders = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "id", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^      id: uuidv4(),$/", "language": "JavaScript", "kind": "property", "scope": "newOrder", "scopeKind": "class"}, {"_type": "tag", "name": "initialData", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^      const initialData = {$/", "language": "JavaScript", "kind": "class"}, {"_type": "tag", "name": "initialLength", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^    const initialLength = orders.length;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "initializeDatabase", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const initializeDatabase = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "newOrder", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^    const newOrder = {$/", "language": "JavaScript", "kind": "class"}, {"_type": "tag", "name": "orderDate", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^      orderDate: new Date().toISOString(),$/", "language": "JavaScript", "kind": "property", "scope": "newOrder", "scopeKind": "class"}, {"_type": "tag", "name": "orderIndex", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^    const orderIndex = orders.findIndex(order => order.id === id);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "orderNumber", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^      orderNumber: `ORD-${Date.now()}`,$/", "language": "JavaScript", "kind": "property", "scope": "newOrder", "scopeKind": "class"}, {"_type": "tag", "name": "orderToDelete", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^    const orderToDelete = orders.find(order => order.id === id);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "orders", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^        orders: [],$/", "language": "JavaScript", "kind": "property", "scope": "initialData", "scopeKind": "class"}, {"_type": "tag", "name": "orders", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^let orders = readOrdersFromFile();$/", "language": "JavaScript", "kind": "variable"}, {"_type": "tag", "name": "path", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const path = require('path');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "payments", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^        payments: [],$/", "language": "JavaScript", "kind": "property", "scope": "initialData", "scopeKind": "class"}, {"_type": "tag", "name": "products", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^        products: [],$/", "language": "JavaScript", "kind": "property", "scope": "initialData", "scopeKind": "class"}, {"_type": "tag", "name": "readOrdersFromFile", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const readOrdersFromFile = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "saveOrdersToFile", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const saveOrdersToFile = (orders) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "status", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^      status: 'CREATED',$/", "language": "JavaScript", "kind": "property", "scope": "newOrder", "scopeKind": "class"}, {"_type": "tag", "name": "tempDbPath", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const tempDbPath = path.join(__dirname, '..\\/data\\/database.temp.json');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "updateOrderStatus", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^const updateOrderStatus = (id, status) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "validStatuses", "path": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "pattern": "/^    const validStatuses = ['CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];$/", "language": "JavaScript", "kind": "constant"}], "filename": "/home/kavia/workspace/order-processing/mock-api/models/order.js", "hash": "548a7d4085267e354b1e475fe6406c15", "format-version": 4, "code-base-name": "default", "fields": [{"name": "checkoutSessions: []", "scope": "initialData", "scopeKind": "class", "description": "unavailable"}, {"name": "customers: [],", "scope": "initialData", "scopeKind": "class", "description": "unavailable"}, {"name": "getOrders,", "scope": "module.exports", "scopeKind": "class", "description": "unavailable"}, {"name": "id: uuidv4(),", "scope": "newOrder", "scopeKind": "class", "description": "unavailable"}, {"name": "orderDate: new Date().toISOString(),", "scope": "newOrder", "scopeKind": "class", "description": "unavailable"}, {"name": "orderNumber: `ORD-${Date.now()}`,", "scope": "newOrder", "scopeKind": "class", "description": "unavailable"}, {"name": "orders: [],", "scope": "initialData", "scopeKind": "class", "description": "unavailable"}, {"name": "let orders = readOrdersFromFile();", "scope": "", "scopeKind": "", "description": "unavailable"}, {"name": "payments: [],", "scope": "initialData", "scopeKind": "class", "description": "unavailable"}, {"name": "products: [],", "scope": "initialData", "scopeKind": "class", "description": "unavailable"}, {"name": "status: 'CREATED',", "scope": "newOrder", "scopeKind": "class", "description": "unavailable"}]}