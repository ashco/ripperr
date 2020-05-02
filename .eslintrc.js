module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    'react/prop-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    'prettier/prettier': ['error'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
