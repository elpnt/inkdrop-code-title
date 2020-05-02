module.exports = {
  extend: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['prettier', 'react'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
