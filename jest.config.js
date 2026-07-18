module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/handlers/api.ts'
  ],
  coverageThreshold: {
    global: {
      functions: 80
    }
  }
};
