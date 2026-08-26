import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const stylesDir = join(root, 'src/styles')
const distDir = join(root, 'dist')

// Same order src/index.css already imports these in, minus the
// `@import 'tailwindcss'` line — the consumer's own Tailwind build
// supplies that.
const files = ['colors.css', 'spacing.css', 'typography.css', 'layers.css', 'theme.css']

const combined = files.map((name) => readFileSync(join(stylesDir, name), 'utf8')).join('\n')

mkdirSync(distDir, { recursive: true })
writeFileSync(join(distDir, 'styles.css'), combined)

console.log(`Wrote dist/styles.css from ${files.join(', ')}`)
