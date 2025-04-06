# Order Processing Component

This component is responsible for managing order lifecycle and processing. It handles checkout workflow, payment simulation, order status management, and integration with other services.

## Core Technologies

- Primary Language: Java 17
- Frameworks: Spring Boot 3.x, Spring Data JPA, Spring State Machine
- Database: PostgreSQL 15.x for order storage
- Message Broker: RabbitMQ 3.9+ for event processing
- Cache: Redis 7.x for distributed caching
- Runtime: JVM 17+

## Key Responsibilities

- Order creation and validation
- Checkout process orchestration
- Payment processing simulation
- Order status management
- Transaction logging
- Integration with other services
- Order history maintenance
- Analytics and reporting

## API Documentation with Swagger UI

The Order Processing Component provides API documentation using Swagger UI. This allows developers to explore and test the API endpoints interactively.

### Accessing Swagger UI

1. Start the Order Processing Service application
2. Open a web browser and navigate to: `http://localhost:8080/swagger-ui.html`

### Using Swagger UI to Test Endpoints

1. The Swagger UI page will display all available API endpoints organized by controller/tag
2. Click on an endpoint to expand it and see detailed information
3. For GET requests:
   - Click the "Try it out" button
   - Fill in any required parameters
   - Click "Execute" to send the request
   - View the response below

4. For POST/PUT requests:
   - Click the "Try it out" button
   - Edit the request body JSON schema as needed
   - Fill in any required parameters
   - Click "Execute" to send the request
   - View the response below

### Available Endpoints

The following API endpoints are available:

#### Order Management
- `GET /api/orders/status` - Check service status
- `POST /api/orders` - Create a new order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders` - Get all orders
- `PUT /api/orders/{id}/status` - Update order status
- `DELETE /api/orders/{id}` - Delete an order

#### Checkout Process
- `POST /api/checkout/initialize` - Initialize checkout
- `POST /api/checkout/process` - Process checkout
- `POST /api/checkout/shipping-cost` - Calculate shipping cost
- `POST /api/checkout/tax` - Calculate tax

#### Payment Processing
- `POST /api/payments/process` - Process payment
- `GET /api/payments/{id}` - Get payment by ID
- `GET /api/payments/order/{orderId}` - Get payment by order ID
- `POST /api/payments/{id}/refund` - Refund payment

## Running the Application

```bash
# Navigate to the OrderProcessingService directory
cd OrderProcessingService

# Build the application
./mvnw clean package

# Run the application
./mvnw spring-boot:run
```

## Testing the API

You can test the API using Swagger UI as described above, or using tools like curl or Postman.

### Example: Check Service Status

```bash
curl -X GET http://localhost:8080/api/orders/status
```

### Example: Create a New Order

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 123,
    "items": [
      {
        "productId": 456,
        "productName": "Product 1",
        "quantity": 2,
        "unitPrice": 19.99
      }
    ]
  }'
```
