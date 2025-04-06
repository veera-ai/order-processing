/**
 * Logger configuration using winston
 */
import winston from 'winston';
import path from 'node:path';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Define log directory
const logDir = path.join(process.cwd(), 'logs');

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  defaultMeta: { service: 'authentication-service' },
  transports: [
    // Write logs with level 'error' and below to error.log
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error' 
    }),
    // Write logs with level 'info' and below to combined.log
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log') 
    }),
    // Write security-related logs to security.log
    new winston.transports.File({ 
      filename: path.join(logDir, 'security.log'),
      level: 'info'
    })
  ],
});

// If not in production, also log to console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

// PUBLIC_INTERFACE
/**
 * Log security events
 * @param {string} event - Security event type
 * @param {string} userId - User ID associated with the event
 * @param {Object} [details] - Additional event details
 */
logger.logSecurityEvent = (event, userId, details = {}) => {
  logger.info({
    message: `Security event: ${event}`,
    event,
    userId,
    details,
    timestamp: new Date().toISOString(),
    category: 'SECURITY'
  });
};

// PUBLIC_INTERFACE
/**
 * Log authentication events
 * @param {string} event - Authentication event type
 * @param {string} userId - User ID associated with the event
 * @param {string} status - Status of the authentication event
 * @param {Object} [details] - Additional event details
 */
logger.logAuthEvent = (event, userId, status, details = {}) => {
  logger.info({
    message: `Auth event: ${event} - ${status}`,
    event,
    userId,
    status,
    details,
    timestamp: new Date().toISOString(),
    category: 'AUTHENTICATION'
  });
};

export default logger;
