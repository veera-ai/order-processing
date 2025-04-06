import { config } from 'dotenv';
import { jest } from '@jest/globals';

// Load environment variables
config();

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.PORT = '3001';

// Global Jest configurations
jest.setTimeout(10000); // 10 second timeout for tests

// Global mocks
global.console = {
  ...console,
  // Customize console.error to not pollute test output
  error: jest.fn(),
  // Keep console.log for debugging but make it a mock
  log: jest.fn()
};

// Clean up function to run after each test
afterEach(() => {
  jest.clearAllMocks();
});
