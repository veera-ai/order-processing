# Order Processing Mock API

This is a mock API for the Order Processing Component, built with Express.js. It simulates the API endpoints defined in the Java implementation.

## Features

- Mock endpoints for Order Management
- Mock endpoints for Checkout Process
- Mock endpoints for Payment Processing
- Swagger documentation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
npm install
```

### Running the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on port 3000 by default. You can access the API at `http://localhost:3000/api`.

### API Documentation

Swagger documentation is available at `http://localhost:3000/api-docs`.

## API Endpoints

### Order Management

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete an order

### Checkout Process

- `POST /api/checkout/initialize` - Initialize checkout
- `POST /api/checkout/process` - Process checkout
- `POST /api/checkout/shipping-cost` - Calculate shipping cost
- `POST /api/checkout/tax` - Calculate tax

### Payment Processing

- `POST /api/payments/process` - Process payment
- `GET /api/payments/:id` - Get payment by ID
- `GET /api/payments/order/:orderId` - Get payment by order ID
- `POST /api/payments/:id/refund` - Refund payment
