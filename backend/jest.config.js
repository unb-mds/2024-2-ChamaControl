module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'api/**/*.{js,jsx}',
    'config/**/*.{js,jsx}',
    'routes/**/*.{js,jsx}',
    'scraper/**/*.{js,jsx}', 
    'app.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/*.test.{js,jsx}', 
    '!**/__tests__/**',
  ],
}