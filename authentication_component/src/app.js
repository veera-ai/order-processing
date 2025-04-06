/**
 * Main application file
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { join } from 'node:path';
import { createWriteStream, readFileSync } from 'node:fs';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import logger from './config/logger.js';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

// Import middleware
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';

// Create Express app
const app = express();

// Setup request logging
const accessLogStream = createWriteStream(
  join(process.cwd(), 'logs/access.log'),
  { flags: 'a' }
);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(morgan('combined', { stream: accessLogStream })); // HTTP request logging

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// API documentation route
if (process.env.NODE_ENV !== 'production') {
  try {
    const swaggerPath = join(process.cwd(), 'src/docs/swagger.json');
    const swaggerDocument = JSON.parse(
      readFileSync(swaggerPath, 'utf8')
    );
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    logger.info('Swagger UI initialized successfully');
  } catch (error) {
    logger.error(`Error initializing Swagger UI: ${error.message}`);
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
