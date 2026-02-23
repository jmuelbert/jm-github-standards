import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

import pluginJsdoc from 'eslint-plugin-jsdoc';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // ---------------------------------------------------------------------------
  // 1. GLOBAL IGNORES (CI + MegaLinter safe)
  // ---------------------------------------------------------------------------
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'site/**',
      'coverage/**',
      '.cache/**',
      '.eslintcache',
      'venv/**',
      '.venv/**',
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. ESLint Core – Bug Prevention Only
  // ---------------------------------------------------------------------------
  js.configs.recommended,

  // ---------------------------------------------------------------------------
  // 3. Main CI Ruleset (NO formatting, NO style wars)
  // ---------------------------------------------------------------------------
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },

    plugins: {
      import: pluginImport,
      jsdoc: pluginJsdoc,
      'jsx-a11y': pluginJsxA11y,
    },

    rules: {
      // ---------------------------------------------------------------------
      // Core correctness (CI relevant)
      // ---------------------------------------------------------------------
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-debugger': 'error',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // ---------------------------------------------------------------------
      // Import sanity (no resolver magic in CI)
      // ---------------------------------------------------------------------
      'import/no-unresolved': 'off',
      'import/named': 'off',

      // ---------------------------------------------------------------------
      // JSDoc – correctness, not verbosity
      // ---------------------------------------------------------------------
      ...pluginJsdoc.configs.recommended.rules,
      'jsdoc/require-jsdoc': 'off',

      // ---------------------------------------------------------------------
      // Accessibility – safe default, JSX only if present
      // ---------------------------------------------------------------------
      ...(pluginJsxA11y.configs?.recommended?.rules ?? {}),
    },
  },
];
