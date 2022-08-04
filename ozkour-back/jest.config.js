const config = {
  transformIgnorePatterns: ['/node_modules/(?!dateformat)'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'test-results' }]],
  setupFilesAfterEnv: ['./jest.setup.js']
}

module.exports = config
