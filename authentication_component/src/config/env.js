/**
 * Environment configuration module
 * Handles loading and validation of environment variables
 */
import dotenv from 'dotenv';
import logger from './logger.js';

// Load environment variables from .env file
const loadEnvConfig = () => {
  const result = dotenv.config();
  
  if (result.error) {
    logger.warn('Error loading .env file:', { error: result.error.message });
    logger.info('Continuing with existing environment variables');
  }

  validateEnvVariables();
  logEnvStatus();
};

// Required environment variables
const REQUIRED_VARS = [
  'NODE_ENV',
  'JWT_SECRET',
  'JWT_EXPIRE',
  'JSON_STORAGE_PATH'
];

// Optional environment variables with defaults
const DEFAULT_VALUES = {
  PORT: '3000',
  LOG_LEVEL: 'info',
  RATE_LIMIT_WINDOW: '15',
  RATE_LIMIT_MAX: '100'
};

// Validate required environment variables
const validateEnvVariables = () => {
  const missing = [];

  // Check required variables
  REQUIRED_VARS.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  // Set default values for optional variables
  Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
      logger.debug(`Using default value for ${key}:`, { value });
    }
  });

  if (missing.length > 0) {
    const error = new Error(`Missing required environment variables: ${missing.join(', ')}`);
    logger.error('Environment validation failed:', { missing });
    throw error;
  }
};

// Log environment status (safely)
const logEnvStatus = () => {
  const envStatus = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    LOG_LEVEL: process.env.LOG_LEVEL,
    JSON_STORAGE_PATH_SET: !!process.env.JSON_STORAGE_PATH,
    JWT_SECRET_SET: !!process.env.JWT_SECRET,
    JWT_EXPIRE_SET: !!process.env.JWT_EXPIRE,
    RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX
  };

  logger.debug('Environment configuration loaded:', envStatus);
};

// Get environment variable with validation
const getEnvVar = (key, required = true) => {
  const value = process.env[key];
  
  if (!value && required) {
    logger.error(`Required environment variable ${key} is not set`);
    throw new Error(`Required environment variable ${key} is not set`);
  }
  
  return value || DEFAULT_VALUES[key];
};

// Environment configuration object
const env = {
  NODE_ENV: () => getEnvVar('NODE_ENV'),
  PORT: () => parseInt(getEnvVar('PORT', false)),
  JSON_STORAGE_PATH: () => getEnvVar('JSON_STORAGE_PATH'),
  JWT_SECRET: () => getEnvVar('JWT_SECRET'),
  JWT_EXPIRE: () => getEnvVar('JWT_EXPIRE'),
  LOG_LEVEL: () => getEnvVar('LOG_LEVEL', false),
  RATE_LIMIT_WINDOW: () => parseInt(getEnvVar('RATE_LIMIT_WINDOW', false)),
  RATE_LIMIT_MAX: () => parseInt(getEnvVar('RATE_LIMIT_MAX', false)),
  isDevelopment: () => getEnvVar('NODE_ENV') === 'development',
  isProduction: () => getEnvVar('NODE_ENV') === 'production',
  isTest: () => getEnvVar('NODE_ENV') === 'test'
};

export { loadEnvConfig, env };
