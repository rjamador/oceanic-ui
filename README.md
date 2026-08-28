<p align="center">
  <img src=".github/assets/logo.png" alt="oceanic-ui" width="112">
</p>

<h1 align="center">oceanic-ui</h1>

<p align="center">
  A React component library with the calm, desktop-grade feel of
  <strong>Ocean</strong> — Java Swing's blue Metal theme.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/oceanic-ui"><img alt="npm version" src="https://img.shields.io/npm/v/oceanic-ui?color=1e85f0&labelColor=0d3d78"></a>
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/npm/l/oceanic-ui?color=1e85f0&labelColor=0d3d78"></a>
  <img alt="React 19" src="https://img.shields.io/badge/React-19-1e85f0?labelColor=0d3d78">
  <img alt="types included" src="https://img.shields.io/npm/types/oceanic-ui?color=1e85f0&labelColor=0d3d78">
</p>

<p align="center">
  <a href="https://oceanic-ui.netlify.app"><strong>Live components →</strong></a>
</p>

> [!NOTE]
> **Pre-1.0.** The API is still settling — expect breaking changes between
> minor versions until `1.0.0`.

---

## The look: a desktop toolkit, on the web

Ocean shipped as the default cross-platform Java look and feel in 2004.
`oceanic-ui` borrows its *grammar*, not a pixel-for-pixel clone:

- **Cool, near-white gradients** — controls fade from almost-white to a
  pale blue, never a saturated fill.
- **Raised vs. recessed surfaces** — buttons lift toward you, form fields
  sink in. Your eye tells "click here" from "type here" before reading a
  word.
- **Restrained rounding** — 3–10px corners. A rounded rectangle reads as a
  real control; a full pill reads as a 2010 mobile app.
- **Glow, not gloss** — the only shine is a soft blue ring on
  `:focus-visible`. No reflections, no sweeps, nothing sitting on top of a
  control.
- **Every surface opaque** — no frosted glass, no `backdrop-filter`.

The full rationale lives in
[`docs/design-language.md`](docs/design-language.md).

## Add it to your project

```bash
npm install oceanic-ui
```

`react` / `react-dom` `19` and `tailwindcss` `4` are peer dependencies.

## Your first component

```tsx
import { Button, Card, Text } from 'oceanic-ui'
import 'oceanic-ui/styles.css'

export function Example() {
  return (
    <Card>
      <Text variant="headingSmall" as="h2">
        Ready when you are
      </Text>
      <Button onClick={() => console.log('clicked')}>Get started</Button>
    </Card>
  )
}
```

Every component ships with full TypeScript types and forwards its `ref`.

## Loading the stylesheet

`oceanic-ui/styles.css` is **precompiled** — every class the components use
is already real CSS, so nothing has to scan `node_modules` and there's no
Tailwind config to write. Import it once, whichever way suits your setup:

```tsx
// …in your JS entry point
import 'oceanic-ui/styles.css'
```

```css
/* …or at the top of your global stylesheet */
@import 'oceanic-ui/styles.css';
```

Bring your own CSS reset / preflight — the stylesheet deliberately ships
without one.

## Restyling: plain Tailwind classes win

Every component is built from Tailwind v4 utilities composed with
[`cva`](https://cva.style). Pass a `className` and conflicting utilities
**replace** the component's own deterministically — a configured
[`tailwind-merge`](https://github.com/dcastil/tailwind-merge) resolves the
conflict instead of letting both fight in the cascade:

```tsx
// the component's height/padding lose cleanly to yours
<Button className="h-12 px-8">Bigger</Button>
```

If you use Tailwind in your app, add it above the library import so your
utilities land in the same layers:

```css
@import 'tailwindcss';
@import 'oceanic-ui/styles.css';
```

See [`docs/css-architecture.md`](docs/css-architecture.md) for how the
layering is wired.

## What's in the box

43 components today. [`docs/roadmap.md`](docs/roadmap.md) tracks what's
built and what's next (Table, DatePicker…).

| Group | Components |
|---|---|
| **Actions & navigation** | `Button` · `IconButton` · `SegmentedControl` · `Pagination` · `Breadcrumb` · `Menu` · `Sidebar` |
| **Forms & inputs** | `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `Switch` · `Slider` · `FileUpload` · `Composer` |
| **Feedback & status** | `Dialog` · `Popover` · `Tooltip` · `Toast` · `Alert` · `Progress` · `Spinner` · `Skeleton` · `Badge` |
| **Chat & agent** | `Composer` · `Message` · `Bubble` · `Attachment` · `Empty` · `Marker` · `IconSwap` · `Pulse` · `Thinking` · `ToolCall` |
| **Layout & display** | `Card` · `Divider` · `List` · `Accordion` · `Tabs` · `Avatar` · `CodeBlock` |
| **Primitives** | `Text` · `Icon` |

Browse every one — with live controls — at
**[oceanic-ui.netlify.app](https://oceanic-ui.netlify.app)**, or run
Storybook locally (below).

## Working on the library

```bash
git clone https://github.com/rjamador/oceanic-ui.git
cd oceanic-ui
npm install
```

| Command | What it does |
|---|---|
| `npm run dev` | The local demo app (`src/App.tsx`) |
| `npm run storybook` | Every component in isolation, with controls |
| `npm test` | Vitest + Testing Library |
| `npm run lint` | ESLint |
| `npm run build:lib` | The publishable build — ESM, `.d.ts`, and `dist/styles.css` |
| `npm run build:site` | Build the marketing site in [`site/`](site/) |

## Before you send a PR

Read these first — they're short:

- [`docs/design-language.md`](docs/design-language.md) — the visual
  language, and *why* it looks the way it does.
- [`docs/dos-and-donts.md`](docs/dos-and-donts.md) — a do / don't table for
  reviewing or building UI here.
- [`docs/creating-components.md`](docs/creating-components.md) — folder
  shape, styling pattern, naming, and the checklist a new component has to
  pass.

## License

[MIT](LICENSE) © Roberto Amador
