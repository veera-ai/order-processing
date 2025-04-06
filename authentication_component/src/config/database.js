/**
 * MongoDB database configuration
 * Handles connection management, retry logic, and connection state monitoring
 */
import mongoose from 'mongoose';
import logger from './logger.js';
import { env } from './env.js';

// Connection options optimized for MongoDB Atlas
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  retryWrites: true,
  retryReads: true,
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 30000,
  wtimeoutMS: 2500,           // Write concern timeout
  ssl: true,                  // Required for Atlas
  authSource: 'admin',        // Default auth database
  keepAlive: true,           // Keep connection alive
  keepAliveInitialDelay: 300000 // 5 minutes initial delay
};

// Validate MongoDB Atlas URI format
const isValidMongoURI = (uri) => {
  if (!uri) return false;

  try {
    // Parse the URI to validate its components
    const url = new URL(uri);
    
    // Check protocol (must be mongodb+srv:// for Atlas)
    if (url.protocol !== 'mongodb+srv:' && url.protocol !== 'mongodb:') {
      logger.warn('Invalid MongoDB protocol', { protocol: url.protocol });
      return false;
    }

    // Validate Atlas domain
    if (!url.hostname.endsWith('.mongodb.net')) {
      logger.warn('Not a valid Atlas domain', { hostname: url.hostname });
      return false;
    }

    // Check for required query parameters
    const params = new URLSearchParams(url.search);
    if (!params.has('retryWrites')) {
      logger.warn('Missing retryWrites parameter in URI');
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Error validating MongoDB URI:', { error: error.message });
    return false;
  }
};

// Mask sensitive parts of MongoDB URI for logging
const maskMongoURI = (uri) => {
  if (!uri) return 'undefined';
  try {
    const maskedURI = uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    return maskedURI;
  } catch {
    return 'invalid-uri-format';
  }
};

// Handle different deployment scenarios
const getMongoURI = () => {
  // Get validated environment configuration
  const configuredURI = env.MONGODB_URI();
  const replicaSetURI = env.MONGODB_REPLICA_SET_URI();
  const isProduction = env.isProduction();
  const isDevelopment = env.isDevelopment();

  // Log masked URIs for debugging
  logger.debug('MongoDB URIs:', {
    configuredURI: maskMongoURI(configuredURI),
    replicaSetURI: maskMongoURI(replicaSetURI)
  });

  // For production, require properly configured MongoDB URI
  if (isProduction) {
    logger.debug('Running in production mode');
    const uri = replicaSetURI || configuredURI;
    if (!isValidMongoURI(uri)) {
      logger.error('Invalid MongoDB URI in production:', {
        hasReplicaSetURI: !!replicaSetURI,
        hasConfiguredURI: !!configuredURI,
        validationResult: false
      });
      throw new Error('Production requires a valid MongoDB URI. Please set MONGODB_URI or MONGODB_REPLICA_SET_URI in environment variables.');
    }
    logger.debug('Using production MongoDB URI:', { uri: maskMongoURI(uri) });
    return uri;
  }

  // For development environment
  if (isDevelopment) {
    logger.debug('Running in development mode');
    if (!isValidMongoURI(configuredURI)) {
      logger.error('Invalid or missing MongoDB Atlas URI in development environment', {
        hasConfiguredURI: !!configuredURI,
        validationResult: false
      });
      throw new Error('Development environment requires a valid MongoDB Atlas URI. Please set MONGODB_URI in environment variables.');
    }
    logger.debug('Using configured MongoDB Atlas URI:', { uri: maskMongoURI(configuredURI) });
    return configuredURI;
  }

  // For other environments (testing, staging, etc.)
  logger.debug('Running in other environment mode');
  if (!isValidMongoURI(configuredURI)) {
    logger.error('Invalid MongoDB URI in non-production environment:', {
      environment: env.NODE_ENV(),
      hasConfiguredURI: !!configuredURI,
      validationResult: false
    });
    throw new Error('Valid MongoDB URI is required. Please set MONGODB_URI in environment variables.');
  }
  logger.debug('Using configured MongoDB URI for environment:', {
    environment: env.NODE_ENV(),
    uri: maskMongoURI(configuredURI)
  });
  return configuredURI;
};

// Monitor connection states
const setupConnectionMonitoring = () => {
  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established successfully');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB connection disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB connection reestablished');
  });

  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    } catch (err) {
      logger.error(`Error closing MongoDB connection: ${err.message}`);
      process.exit(1);
    }
  });
};

// PUBLIC_INTERFACE
/**
 * Connect to MongoDB database with retry logic and enhanced error handling
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async () => {
  const maxRetries = 3;
  let retryCount = 0;
  let lastError = null;

  while (retryCount < maxRetries) {
    try {
      // Setup connection monitoring before attempting to connect
      setupConnectionMonitoring();

      const mongoURI = getMongoURI();
      if (!mongoURI) {
        throw new Error('MongoDB connection URI is not configured');
      }

      logger.info('Initiating MongoDB Atlas connection...', {
        host: new URL(mongoURI).hostname,
        options: {
          ...connectionOptions,
          // Mask sensitive data
          ssl: connectionOptions.ssl,
          maxPoolSize: connectionOptions.maxPoolSize,
          minPoolSize: connectionOptions.minPoolSize
        }
      });

      const conn = await mongoose.connect(mongoURI, connectionOptions);
      
      logger.info('MongoDB Atlas connection established', {
        host: conn.connection.host,
        database: conn.connection.name,
        state: mongoose.STATES[mongoose.connection.readyState],
        poolSize: conn.connection.getClient().topology?.connections?.size || 'unknown'
      });
      
      return conn;
    } catch (error) {
      lastError = error;
      retryCount++;

      // Log specific error types for better debugging
      if (error.name === 'MongoServerSelectionError') {
        logger.error(`Failed to find MongoDB server: ${error.message}`);
      } else if (error.name === 'MongoNetworkError') {
        logger.error(`MongoDB network error: ${error.message}`);
      } else {
        logger.error(`MongoDB connection error: ${error.message}`);
      }

      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        logger.info(`Retrying connection in ${delay/1000} seconds... (Attempt ${retryCount} of ${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // If all retries failed
  logger.error(`Failed to connect to MongoDB after ${maxRetries} attempts`);
  if (lastError) {
    logger.error(`Last error: ${lastError.message}`);
  }
  process.exit(1);
};

export { connectDB };
