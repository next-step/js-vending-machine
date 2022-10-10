module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  plugins: ['cypress', 'prettier'],
  extends: ['airbnb-base', 'plugin:cypress/recommended', 'eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'no-restricted-syntax': ['error', 'ForInStatement'],
    'no-alert': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'max-len': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'dot-notation': 'off',
    "no-param-reassign": 0
  },
};
