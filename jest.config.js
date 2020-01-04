module.exports = {
//   roots: ['<rootDir>/src/app'],
//   preset: 'ts-jest/presets/js-with-ts',
//   testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
//   moduleNameMapper: {
//     '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
//   },
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//   },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
//   setupFiles: ['./jest.setup.js', 'dotenv/config'],
//   testPathIgnorePatterns: ['./.next/', './node_modules/'],
//   globals: {
//     'ts-jest': {
//       tsConfig: 'tsconfig.jest.json',
//     },
//   },
// };

// {
//   "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
// }
