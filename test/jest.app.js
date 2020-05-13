const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('../src/app/tsconfig.json');

module.exports = {
  ...require('../jest.config'),
  displayName: 'app',
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-styled-components',
  ],
  // snapshotSerializers: ['jest-styled-components'], // does not currently work with styled-components 7.0
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  globals: {
    'ts-jest': {
      tsConfig: './test/tsconfig.jest.json',
    },
  },
};
