const path = require('path');

module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'eslint-config-prettier',
  ],
  rules: {
    strict: ['error', 'never'],
  },
  env: {
    browser: true,
    node: true,
  },
  overrides: [
    // ONLY if working with ts files, this config should be applied
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        app: './src/app/tsconfig.json',
        functions: './src/functions/tsconfig.json',
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        // disables some rules that aren't necessary because we're using ts
        'plugin:@typescript-eslint/eslint-recommended',
        // specific rules that are useful for ts files
        'plugin:@typescript-eslint/recommended',
        // disables rules that are covered by prettier
        'eslint-config-prettier/@typescript-eslint',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        '@typescript-eslint/interface-name-prefix': 0,
        'react/prop-types': 0,
        '@typescript-eslint/explicit-function-return-type': [
          1,
          {
            allowExpressions: true,
          },
        ],
        // 'react-hooks/rules-of-hooks': 'error',
        // 'react-hooks/exhaustive-deps': 'warn',
      },
    },
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            // tells eslint to resolve modules same way jest config would resolve modules
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
};
