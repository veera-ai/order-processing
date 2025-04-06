{"is_source_file": true, "format": "JavaScript", "description": "Configuration for MongoDB database connection and management. It includes connection options, URI validation, error handling during connection, and monitoring states of the connection.", "external_files": ["./logger.js"], "external_methods": [], "published": ["connectDB"], "classes": [], "methods": [{"name": "isValidMongoURI", "description": "Validates MongoDB URI for proper format and required parameters."}, {"name": "maskMongoURI", "description": "Masks sensitive parts of the MongoDB URI for logging purposes."}, {"name": "getMongoURI", "description": "Determines the appropriate MongoDB connection URI based on the deployment environment."}, {"name": "setupConnectionMonitoring", "description": "Sets up event listeners to monitor MongoDB connection state changes."}, {"name": "connectDB", "description": "Connects to MongoDB database with retry logic and enhanced error handling."}], "calls": ["mongoose.connect", "logger.warn", "logger.error", "logger.info", "logger.debug"], "search-terms": ["mongoose", "MongoDB", "connection", "database configuration"], "state": 2, "file_id": 13, "knowledge_revision": 141, "git_revision": "de70eaec04521871d60c0576585e126292ef8283", "revision_history": [{"28": ""}, {"43": ""}, {"63": "8296b8630f75858aa9ee4b404a93a5282a92129b"}, {"64": "8296b8630f75858aa9ee4b404a93a5282a92129b"}, {"130": "906589ebe3993184b636ddfb8e96afa429316a90"}, {"131": "12d0961a5dab013b5fd7b91d1e0c74e95b56acde"}, {"132": "cab7f21393f5b9e8c1ff8b931dc40dea7b8c131c"}, {"133": "cab7f21393f5b9e8c1ff8b931dc40dea7b8c131c"}, {"134": "cab7f21393f5b9e8c1ff8b931dc40dea7b8c131c"}, {"135": "cab7f21393f5b9e8c1ff8b931dc40dea7b8c131c"}, {"136": "cab7f21393f5b9e8c1ff8b931dc40dea7b8c131c"}, {"137": "cab7f21393f5b9e8c1ff8b931dc40dea7b8c131c"}, {"138": "de70eaec04521871d60c0576585e126292ef8283"}, {"139": "de70eaec04521871d60c0576585e126292ef8283"}, {"140": "de70eaec04521871d60c0576585e126292ef8283"}, {"141": "de70eaec04521871d60c0576585e126292ef8283"}], "ctags": [{"_type": "tag", "name": "authSource", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  authSource: 'admin',        \\/\\/ Default auth database$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "configuredURI", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  const configuredURI = process.env.MONGODB_URI;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "conn", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^      const conn = await mongoose.connect(mongoURI, connectionOptions);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "connectDB", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^const connectDB = async () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "connectTimeoutMS", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  connectTimeoutMS: 30000,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "connectionOptions", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^const connectionOptions = {$/", "language": "JavaScript", "kind": "class"}, {"_type": "tag", "name": "delay", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^        const delay = Math.pow(2, retryCount) * 1000; \\/\\/ Exponential backoff$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "family", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  family: 4,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "getMongoURI", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^const getMongoURI = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "isDevelopment", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "isProduction", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  const isProduction = process.env.NODE_ENV === 'production';$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "isValidMongoURI", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^const isValidMongoURI = (uri) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "keepAlive", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  keepAlive: true,           \\/\\/ Keep connection alive$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "keepAliveInitialDelay", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  keepAliveInitialDelay: 300000 \\/\\/ 5 minutes initial delay$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "lastError", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  let lastError = null;$/", "language": "JavaScript", "kind": "variable"}, {"_type": "tag", "name": "maskMongoURI", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^const maskMongoURI = (uri) => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "maskedURI", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^    const maskedURI = uri.replace(\\/\\\\\\/\\\\\\/([^:]+):([^@]+)@\\/, '\\/\\/***:***@');$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "maxIdleTimeMS", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  maxIdleTimeMS: 30000,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "maxPoolSize", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  maxPoolSize: 10,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "maxRetries", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  const maxRetries = 3;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "minPoolSize", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  minPoolSize: 2,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "mongoURI", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^      const mongoURI = getMongoURI();$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "params", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^    const params = new URLSearchParams(url.search);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "replicaSetURI", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  const replicaSetURI = process.env.MONGODB_REPLICA_SET_URI;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "retryCount", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  let retryCount = 0;$/", "language": "JavaScript", "kind": "variable"}, {"_type": "tag", "name": "retryReads", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  retryReads: true,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "retryWrites", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  retryWrites: true,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "serverSelectionTimeoutMS", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  serverSelectionTimeoutMS: 5000,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "setupConnectionMonitoring", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^const setupConnectionMonitoring = () => {$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "socketTimeoutMS", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  socketTimeoutMS: 45000,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "ssl", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  ssl: true,                  \\/\\/ Required for Atlas$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "uri", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^    const uri = replicaSetURI || configuredURI;$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "url", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^    const url = new URL(uri);$/", "language": "JavaScript", "kind": "constant"}, {"_type": "tag", "name": "useNewUrlParser", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  useNewUrlParser: true,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "useUnifiedTopology", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  useUnifiedTopology: true,$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}, {"_type": "tag", "name": "wtimeoutMS", "path": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "pattern": "/^  wtimeoutMS: 2500,           \\/\\/ Write concern timeout$/", "language": "JavaScript", "kind": "property", "scope": "connectionOptions", "scopeKind": "class"}], "filename": "/home/kavia/workspace/order-processing/authentication_component/src/config/database.js", "hash": "4f1fae7f4869c6657cc6382f5f2194fe", "format-version": 4, "code-base-name": "default", "fields": [{"name": "authSource: 'admin',        \\/\\/ Default auth database", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "connectTimeoutMS: 30000,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "family: 4,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "keepAlive: true,           \\/\\/ Keep connection alive", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "keepAliveInitialDelay: 300000 \\/\\/ 5 minutes initial delay", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "let lastError = null;", "scope": "", "scopeKind": "", "description": "unavailable"}, {"name": "maxIdleTimeMS: 30000,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "maxPoolSize: 10,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "minPoolSize: 2,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "let retryCount = 0;", "scope": "", "scopeKind": "", "description": "unavailable"}, {"name": "retryReads: true,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "retryWrites: true,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "serverSelectionTimeoutMS: 5000,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "socketTimeoutMS: 45000,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "ssl: true,                  \\/\\/ Required for Atlas", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "useNewUrlParser: true,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "useUnifiedTopology: true,", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}, {"name": "wtimeoutMS: 2500,           \\/\\/ Write concern timeout", "scope": "connectionOptions", "scopeKind": "class", "description": "unavailable"}]}