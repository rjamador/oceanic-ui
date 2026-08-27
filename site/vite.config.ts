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
    // The aliased library resolves `react` from the repo-root node_modules
    // while the site resolves its own — two copies, which breaks hooks in
    // the production bundle ("reading 'useState' of null"). Force one.
    dedupe: ['react', 'react-dom'],
  },
  server: { port: 5174 },
})
