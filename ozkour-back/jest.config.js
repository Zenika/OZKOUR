const config = {
  transformIgnorePatterns: ['/node_modules/(?!dateformat)'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'test-results' }]],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}

module.exports = config
