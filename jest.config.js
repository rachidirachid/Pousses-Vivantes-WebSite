module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js', 'server.js'],
  coverageDirectory: 'tests/coverage',
  verbose: true
};
