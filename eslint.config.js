// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    jsxA11y.flatConfigs.recommended,
  ],
  languageOptions: {
    globals: globals.browser,
  },
}, {
  // Popover/Menu compose Floating UI's hooks, which hand back ref-shaped
  // objects (`refs`, `context`) that are safe to read during render — that
  // is the library's designed, compiler-checked usage. The new
  // react-hooks/refs heuristic can't tell them apart from a bare useRef.
  // Sidebar's <Slot> merges refs with the same `useMergeRefs` helper.
  files: ['src/components/Popover/**', 'src/components/Menu/**', 'src/components/Sidebar/**'],
  rules: {
    'react-hooks/refs': 'off',
  },
}, ...storybook.configs["flat/recommended"]])
