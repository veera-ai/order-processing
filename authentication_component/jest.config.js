export default {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  setupFiles: ['./tests/setup.js'],
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\.{1,2}/.*)\.js$': '$1'
  },
  transform: {},
  transformIgnorePatterns: [
    'node_modules/(?!(module-that-needs-transform)/)',
  ],
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
};
