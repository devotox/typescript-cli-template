import eslintExtreme from 'eslint-config-extreme';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...eslintExtreme.typescript,
  {
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'max-statements': 'off',
      'max-lines-per-function': 'off'
    }
  }
];
export default config;
