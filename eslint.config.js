export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
      },
    },
    rules: {
      'quote-props': 'off',
      'no-unused-vars': 'off',
    },
  },
];