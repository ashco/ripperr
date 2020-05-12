// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// // In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// // which contains the path mapping (ie the `compilerOptions.paths` option):
// const { compilerOptions } = require('./src/app/tsconfig.json');
const path = require('path');

module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: 'jest-environment-jsdom',
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleDirectories: ['node_modules', path.join(__dirname, 'src/app')],
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // snapshotSerializers: ['jest-styled-components'], // This packaged needs to be fixed to work with styled-components 7.0
  // globals: {
  //   'ts-jest': {
  //     tsConfig: 'tsconfig.jest.json',
  //   },
  // },
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
  projects: ['./test/jest.lint.js', './test/jest.app.js'],
};
