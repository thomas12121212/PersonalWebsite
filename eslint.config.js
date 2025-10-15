// eslint.config.js (Flat Config — ESLint v9)
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    settings: {
      react: { version: 'detect' }, // fixes the “version not specified” warning
    },
    plugins: { react },
    extends: [
      js.configs.recommended,
      // Use the plugin's Flat preset:
      react.configs.flat.recommended,
    ],
    rules: {
      // ✔ turn off the legacy requirement to import React in every file
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // fix target=_blank warning (you also added rel already)
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    },
  },
])
