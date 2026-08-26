import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outFile = join(root, 'dist/styles.css')

const compiled = readFileSync(outFile, 'utf8')
const stripped = stripLayer(compiled, 'base')

if (stripped === compiled) {
  throw new Error(
    `Expected an "@layer base { ... }" block in ${outFile} to strip — none found. ` +
      'Did the Tailwind CLI output format change?',
  )
}

writeFileSync(outFile, stripped)
console.log('Stripped @layer base (preflight) from dist/styles.css — the consumer supplies their own.')

// Removes a top-level `@layer <name> { ... }` block, tracking brace depth
// so nested rules/media queries inside the block don't confuse where it
// actually ends.
function stripLayer(css, layerName) {
  const marker = `@layer ${layerName} {`
  const start = css.indexOf(marker)
  if (start === -1) return css

  let depth = 1
  let end = start + marker.length
  while (depth > 0 && end < css.length) {
    if (css[end] === '{') depth++
    else if (css[end] === '}') depth--
    end++
  }

  return css.slice(0, start) + css.slice(end)
}
