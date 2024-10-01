import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] }, // Ignore 'dist' folder from linting
  {
    files: ['**/*.{js,jsx}'], // Targets all JavaScript and JSX files
    languageOptions: {
      ecmaVersion: 'latest', // Ensures latest ECMAScript features
      globals: globals.browser, // Browser globals like 'window', 'document'
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enables JSX
        sourceType: 'module', // Use ES modules
      },
    },
    settings: { react: { version: '18.2' } }, // React version 18.2.0 (latest stable)
    plugins: {
      react, // Enables react plugin
      'react-hooks': reactHooks, // React hooks linting
      'react-refresh': reactRefresh, // Hot module reloading in development
    },
    rules: {
      ...js.configs.recommended.rules, // Include ESLint recommended rules
      ...react.configs.recommended.rules, // React recommended rules
      ...react.configs['jsx-runtime'].rules, // React JSX runtime (since React 17+)
      ...reactHooks.configs.recommended.rules, // React hooks linting rules

      // Specific rules
      'react/jsx-no-target-blank': 'off', // Disable warning for target=_blank without rel="noopener noreferrer"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // Warning for non-component exports in HMR context

      // Additional recommended rule examples (optional):
      'react/jsx-uses-react': 'off', // Not needed for React 17+ (automatic runtime)
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+ (automatic runtime)
      'react/prop-types': 'off', // Disable prop-types checking (if using TypeScript)
    },
  },
]
  