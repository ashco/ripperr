// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
// const { compilerOptions } = require('../cypress/tsconfig.json');

module.exports = {
  ...require('../jest.config'),
  displayName: 'cypress',
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // setupFilesAfterEnv: [
  //   '@testing-library/jest-dom/extend-expect',
  // ],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  globals: {
    'ts-jest': {
      tsConfig: './cypress/tsconfig.json',
    },
  },
};
