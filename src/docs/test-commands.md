# Registration Endpoint Test Commands

This document provides curl commands for testing the registration endpoint of the Authentication Service. These commands can be used to verify the endpoint's functionality and validation rules.

## Base Information

- **Base URL**: http://localhost:3000
- **Endpoint**: /auth/register
- **Method**: POST
- **Content-Type**: application/json

## Test Scenarios

### 1. Valid Registration

Test a successful registration with valid data:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "StrongP@ss123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Expected Response (201 Created):
```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": {
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### 2. Duplicate Email

Test registration with an email that already exists:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "StrongP@ss123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Expected Response (400 Bad Request):
```json
{
  "success": false,
  "message": "User already exists"
}
```

### 3. Invalid Email Format

Test registration with an invalid email format:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid.email",
    "password": "StrongP@ss123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Expected Response (400 Bad Request):
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 4. Weak Password

Test registration with a weak password:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "weak",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Expected Response (400 Bad Request):
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Password must be at least 8 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### 5. Missing Required Fields

Test registration with missing required fields:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "StrongP@ss123"
  }'
```

Expected Response (400 Bad Request):
```json
{
  "success": false,
  "errors": [
    {
      "msg": "First name is required",
      "param": "firstName",
      "location": "body"
    },
    {
      "msg": "Last name is required",
      "param": "lastName",
      "location": "body"
    }
  ]
}
```

## Notes

1. All requests must include the `Content-Type: application/json` header.
2. The password must be at least 8 characters long and meet strength requirements.
3. All fields (email, password, firstName, lastName) are required.
4. Email addresses are normalized before processing (lowercase, remove dots from Gmail addresses, etc.).
5. Successful registration returns a JWT token that can be used for authenticated requests.
