/**
 * Swagger configuration for the Order Processing Mock API
 * This file dynamically generates the Swagger documentation
 */
const fs = require('fs');
const path = require('path');

/**
 * Load the base Swagger configuration from swagger.json
 * @returns {Object} The base Swagger configuration
 */
const loadBaseSwaggerConfig = () => {
  try {
    const swaggerJsonPath = path.join(__dirname, 'swagger.json');
    const swaggerConfig = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8'));
    return swaggerConfig;
  } catch (error) {
    console.error('Error loading swagger.json:', error);
    return createDefaultSwaggerConfig();
  }
};

/**
 * Create a default Swagger configuration if swagger.json is not available
 * @returns {Object} The default Swagger configuration
 */
const createDefaultSwaggerConfig = () => {
  return {
    openapi: '3.0.0',
    info: {
      title: 'Order Processing Mock API',
      description: 'API documentation for the Order Processing Mock API',
      version: '1.0.0',
      contact: {
        name: 'Kavia'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server'
      }
    ],
    tags: [
      {
        name: 'Orders',
        description: 'Order management endpoints'
      },
      {
        name: 'Checkout',
        description: 'Checkout process endpoints'
      },
      {
        name: 'Payments',
        description: 'Payment processing endpoints'
      }
    ],
    paths: {},
    components: {
      schemas: {}
    }
  };
};

/**
 * Add custom routes to the Swagger configuration
 * @param {Object} swaggerConfig - The Swagger configuration
 * @returns {Object} The updated Swagger configuration
 */
const addCustomRoutes = (swaggerConfig) => {
  // You can add custom routes here that aren't in the swagger.json file
  // For example, you can add routes for new endpoints or update existing ones
  
  // Example: Add a health check endpoint
  swaggerConfig.paths['/health'] = {
    get: {
      summary: 'Health Check',
      description: 'Check the health of the API',
      tags: ['Status'],
      responses: {
        '200': {
          description: 'API is healthy',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'healthy'
                  },
                  uptime: {
                    type: 'number',
                    example: 123.45
                  },
                  timestamp: {
                    type: 'string',
                    format: 'date-time',
                    example: '2023-01-01T12:00:00Z'
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  
  return swaggerConfig;
};

/**
 * Add security schemes to the Swagger configuration
 * @param {Object} swaggerConfig - The Swagger configuration
 * @returns {Object} The updated Swagger configuration
 */
const addSecuritySchemes = (swaggerConfig) => {
  // Add security schemes if they don't exist
  if (!swaggerConfig.components) {
    swaggerConfig.components = {};
  }
  
  if (!swaggerConfig.components.securitySchemes) {
    swaggerConfig.components.securitySchemes = {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token'
      },
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-KEY',
        description: 'API key for authorization'
      }
    };
  }
  
  return swaggerConfig;
};

/**
 * Generate the complete Swagger configuration
 * @returns {Object} The complete Swagger configuration
 */
const generateSwaggerConfig = () => {
  let swaggerConfig = loadBaseSwaggerConfig();
  swaggerConfig = addCustomRoutes(swaggerConfig);
  swaggerConfig = addSecuritySchemes(swaggerConfig);
  
  return swaggerConfig;
};

module.exports = generateSwaggerConfig;
