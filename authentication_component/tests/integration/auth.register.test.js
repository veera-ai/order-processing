/**
 * Tests for the user registration endpoint
 */
import request from 'supertest';
import { jest, describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import app from '../../src/app.js';
import User from '../../src/models/user.model.js';
import { connectDB } from '../../src/config/database.js';

// Mock the User model
jest.mock('../../src/models/user.model.js');
jest.mock('../../src/config/logger.js', () => ({
  info: jest.fn(),
  error: jest.fn(),
  logSecurityEvent: jest.fn()
}));
jest.mock('../../src/config/jwt.js', () => ({
  generateToken: jest.fn(() => 'test-token')
}));

describe('POST /api/v1/auth/register', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case 1: Valid registration
  test('should register a new user with valid data', async () => {
    // Mock User.findOne to return null (user doesn't exist)
    User.findOne = jest.fn().mockResolvedValue(null);
    
    // Mock User.create to return a new user
    const mockUser = {
      _id: '123456',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      toJSON: () => ({
        _id: '123456',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      })
    };
    User.create = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'User'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBe('test-token');
    expect(User.create).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Duplicate email
  test('should return 400 if email is already registered', async () => {
    // Mock User.findOne to return an existing user
    User.findOne = jest.fn().mockResolvedValue({
      _id: '123456',
      email: 'test@example.com'
    });

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'User'
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User already exists');
    expect(User.create).not.toHaveBeenCalled();
  });

  // Test case 3: Invalid email format
  test('should return 400 if email format is invalid', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'invalid-email',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'User'
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid email format');
  });

  // Test case 4: Weak password
  test('should return 400 if password is too weak', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test2@example.com',
        password: 'weak',
        firstName: 'Test',
        lastName: 'User'
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Password does not meet requirements');
  });

  // Test case 5: Missing required fields
  test('should return 400 if required fields are missing', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test3@example.com'
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Missing required fields');
  });
});
