/**
 * Server entry point
 */
import app from './app.js';
import logger from './config/logger.js';
import { connectDB } from './config/database.js';
import { connectRedis } from './config/redis.js';
import { mkdir, existsSync } from 'node:fs';
import { join } from 'node:path';

// Set port
const PORT = process.env.PORT || 3000;

// Create directory for logs if it doesn't exist
const logDir = join(process.cwd(), 'logs');
if (!existsSync(logDir)) {
  mkdir(logDir, { recursive: true });
}

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Connect to Redis
    await connectRedis();
    
    // Start Express server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});

// Start the server
startServer();
