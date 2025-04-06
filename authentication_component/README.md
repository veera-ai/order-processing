# Authentication Component

A secure authentication service built with Node.js, Express.js, MongoDB, and Redis.

## Features

- User registration and login
- Email verification
- Password reset functionality
- JWT-based authentication
- Rate limiting
- Session management with Redis
- Security headers with Helmet
- Comprehensive logging with Winston

## Prerequisites

- Node.js v16 or higher
- MongoDB
- Redis
- npm

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment example file and update with your configurations:
   ```bash
   cp .env.example .env
   ```

## Environment Variables

Configure the following environment variables in your `.env` file:

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `JWT_SECRET`: Secret key for JWT tokens
- `SMTP_*`: Email service configuration

See `.env.example` for all available options.

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the application
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Run ESLint

## API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

Main endpoints:

### Authentication
- POST `/auth/register`: Register new user
- POST `/auth/login`: User login
- GET `/auth/verify-email/:token`: Verify email
- POST `/auth/request-password-reset`: Request password reset
- POST `/auth/reset-password`: Reset password

### User Management
- GET `/user/profile`: Get user profile
- PUT `/user/profile`: Update user profile
- POST `/user/change-password`: Change password

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Rate limiting
- Security headers (Helmet)
- Account locking after failed attempts
- Session management
- Input validation

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Logging

Logs are written to `logs/app.log` and include:
- API requests
- Authentication events
- Security events
- Errors

## Error Handling

The API returns consistent error responses in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT