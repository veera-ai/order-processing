/**
 * MongoDB database configuration
 * Handles connection management, retry logic, and connection state monitoring
 */
import mongoose from 'mongoose';
import logger from './logger.js';

// Connection options for better reliability and performance
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
};

// Validate MongoDB URI format
const isValidMongoURI = (uri) => {
  if (!uri) return false;
  // Basic MongoDB URI format validation
  const mongoURIPattern = /^mongodb(\+srv)?:\/\/.+/;
  return mongoURIPattern.test(uri);
};

// Handle different deployment scenarios
const getMongoURI = () => {
  const configuredURI = process.env.MONGODB_URI;
  const replicaSetURI = process.env.MONGODB_REPLICA_SET_URI;
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

  // For production, require properly configured MongoDB URI
  if (isProduction) {
    const uri = replicaSetURI || configuredURI;
    if (!isValidMongoURI(uri)) {
      throw new Error('Production requires a valid MongoDB URI. Please set MONGODB_URI or MONGODB_REPLICA_SET_URI in environment variables.');
    }
    return uri;
  }

  // For development, allow localhost fallback
  if (isDevelopment) {
    if (isValidMongoURI(configuredURI)) {
      logger.debug('Using configured MongoDB URI');
      return configuredURI;
    }
    logger.warn('No valid MongoDB URI configured, falling back to localhost (development only)');
    return 'mongodb://localhost:27017/auth_db';
  }

  // For other environments (testing, staging, etc.)
  if (!isValidMongoURI(configuredURI)) {
    throw new Error('Valid MongoDB URI is required. Please set MONGODB_URI in environment variables.');
  }
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

      const conn = await mongoose.connect(mongoURI, connectionOptions);
      
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      logger.info(`Database name: ${conn.connection.name}`);
      logger.info(`Connection state: ${mongoose.connection.readyState}`);
      
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
