import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The library lives one level up in the same repo. Alias straight to its
// build output instead of a `file:..` install — bun's file-dep linking is
// flaky, and there's nothing to "install" from a sibling folder anyway.
// Run `bun run build:lib` in the repo root before building the site.
const lib = (p: string) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url))

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [
      { find: 'oceanic-ui/styles.css', replacement: lib('styles.css') },
      { find: /^oceanic-ui$/, replacement: lib('index.js') },
    ],
    // The aliased library resolves its imports (`react`, and now
    // `@floating-ui/react` that Popover/Menu pull in) from wherever they
    // sit — two copies breaks hooks ("Cannot read properties of null").
    // `@floating-ui/react` is a direct devDependency of the site so this
    // dedupe has one target to point everything at.
    dedupe: ['react', 'react-dom', '@floating-ui/react'],
  },
  // `oceanic-ui` is aliased to a file outside this project, so vite's
  // dependency scan never sees what it imports. Pre-bundle those here or
  // vite discovers them at request time and thrashes the optimizer
  // (repeated full reloads, transient duplicate React).
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', '@floating-ui/react'],
  },
  server: { port: 5174 },
})
