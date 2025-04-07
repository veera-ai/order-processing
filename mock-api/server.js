/**
 * Main server file for the Order Processing Mock API
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const generateSwaggerDocument = require('./swagger.js');
const routes = require('./routes');
const { errorHandler, APIError } = require('./middleware/errorHandler');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging

// API Routes
app.use('/api', routes);

// Swagger documentation
const swaggerDocument = generateSwaggerDocument();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Order Processing API Documentation',
  customfavIcon: '/favicon.ico'
}));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Order Processing Mock API',
    documentation: '/api-docs'
  });
});

// Error handling middleware should be last
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: {
        message: 'Invalid JSON payload',
        status: 400,
        timestamp: new Date().toISOString()
      }
    });
  }
  next(err);
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
