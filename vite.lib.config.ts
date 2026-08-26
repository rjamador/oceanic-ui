import { fileURLToPath } from 'node:url'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/guide/build.html#library-mode
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.stories.tsx',
        'src/App.tsx',
        'src/main.tsx',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Externalize every bare import (react, react-dom, clsx, ...) —
      // only relative/absolute imports (our own source files) get
      // bundled into the library output. Rollup's `external` check runs
      // on the import specifier as written, BEFORE the `@` alias below
      // resolves it to a real path — so `@/lib/cn` looks like a bare
      // specifier here and must be excluded explicitly, or it gets
      // treated as an external package instead of being bundled.
      external: (id) => !id.startsWith('.') && !id.startsWith('@/') && !path.isAbsolute(id),
    },
  },
})
