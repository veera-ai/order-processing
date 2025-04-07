# Order Processing API Examples

This document provides example API requests for interacting with the Order Processing API endpoints. All examples use curl commands for demonstration.

## Order Endpoints

### 1. Get All Orders
Retrieve a list of all orders in the system:

```bash
curl -X GET http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 2. Get Order by ID
Retrieve a specific order using its ID:

```bash
curl -X GET http://localhost:3000/api/orders/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Create New Order
Create a new order with customer and item details:

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "customerName": "John Smith",
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Laptop",
        "category": "Electronics",
        "unitPrice": 999.99,
        "quantity": 1
      }
    ],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "billingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "subtotal": 999.99,
    "tax": 80.00,
    "shippingCost": 10.50,
    "totalAmount": 1090.49
  }'
```

### 4. Update Order Status
Update the status of an existing order:

```bash
curl -X PUT "http://localhost:3000/api/orders/550e8400-e29b-41d4-a716-446655440000/status?status=PROCESSING" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Available status values:
- CREATED
- PROCESSING
- SHIPPED
- DELIVERED
- CANCELLED

### 5. Delete Order
Delete an existing order:

```bash
curl -X DELETE http://localhost:3000/api/orders/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Response Examples

### Successful Order Response
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "orderNumber": "ORD-1234567890",
  "orderDate": "2023-01-01T12:00:00Z",
  "status": "CREATED",
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "customerName": "John Smith",
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Laptop",
      "category": "Electronics",
      "unitPrice": 999.99,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "subtotal": 999.99,
  "tax": 80.00,
  "shippingCost": 10.50,
  "totalAmount": 1090.49
}
```

### Error Response Example
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data provided",
    "details": [
      {
        "field": "items",
        "message": "At least one item is required"
      }
    ],
    "status": 400,
    "timestamp": "2023-01-01T12:00:00Z"
  }
}
```

## Notes

1. Replace `YOUR_JWT_TOKEN` with a valid JWT authentication token.
2. The API runs on `http://localhost:3000` by default.
3. All requests require JWT authentication except for the status endpoint.
4. All request and response bodies use JSON format.
5. Dates are in ISO 8601 format (UTC).
