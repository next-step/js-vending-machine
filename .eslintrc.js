module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'class-methods-use-this': 'off',
    'no-alert': 'off',
    'no-undef': 'off',
    'no-new': 'off',
    'no-param-reassign': 'off',
  },
};
