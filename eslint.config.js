export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'assets/data/portfolio.json'],
  },
  {
    files: ['**/*.{js,mjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        process: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      'no-debugger': 'error',
      'no-constant-binary-expression': 'error',
    },
  },
];
