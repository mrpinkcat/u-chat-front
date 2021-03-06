module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'max-len': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-else-return': 'off',
    'import/no-cycle': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': [2, { allow: ['_id'] }],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
