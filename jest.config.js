// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  // moduleNameMapper: {
  //   '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  // },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // testMatch: ['**/__tests__/*.(ts|tsx)'],
  testRegex: '((\\.|/*.)(test))\\.(js|ts|tsx)?$',
  setupFiles: ['./jest.setup.js', 'dotenv/config'],
  testPathIgnorePatterns: ['./dist/', './node_modules/', '.firebase'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
};