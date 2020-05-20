const path = require('path');

module.exports = {
  moduleDirectories: ['node_modules', path.join(__dirname, 'src/app')],
  collectCoverageFrom: ['**/src/app/**/*.(js|jsx|ts|tsx)'],
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 0,
      functions: 1,
      lines: 1,
    },
  },
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  projects: [
    './test/jest.lint.js',
    // './test/jest.cypress.js',
    './test/jest.app.js',
  ],
};
