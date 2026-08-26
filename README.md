<p align="center">
  <img src=".github/assets/logo.png" alt="" width="120">
</p>

<h1 align="center">oceanic-ui</h1>

A React component library inspired by **Ocean** — the blue Metal Look and
Feel theme from Java Swing, default since Java 5 (2004): cool near-white-
to-blue gradients, restrained rounding, a soft glow instead of gloss,
every surface fully opaque. See
[`docs/design-language.md`](docs/design-language.md) for the full visual
language.

> **Status:** pre-1.0 — the API is still settling, expect breaking
> changes between minor versions until `1.0.0`.

```bash
npm install oceanic-ui
```

## Why Tailwind

Every component is built with Tailwind CSS v4 utilities + `cva`, so if
your app already uses Tailwind, you can override any component's styling
with a plain `className` — conflicting utility classes replace the
component's own deterministically (via a configured `tailwind-merge`),
not just pile on top of it. See
[`docs/css-architecture.md`](docs/css-architecture.md) for how that's
wired, and [`docs/creating-components.md`](docs/creating-components.md)
for the pattern if you're adding a component.

`tailwindcss` (`^4.0.0`) is a required peer dependency.

```css
@import "tailwindcss";
@import "oceanic-ui/styles.css";
```

`dist/styles.css` ships pre-compiled — every class the components use is
already generated as real CSS, so unlike a source-only Tailwind plugin,
nothing needs to scan `oceanic-ui`'s `node_modules` for class names.

## Components

Button, IconButton, Card, Input, Textarea, Checkbox, Radio, Switch,
Select, Dialog, Tabs, Accordion, Tooltip, Toast, Progress, Slider, Badge,
Text, Icon, Spinner, Divider, SegmentedControl, List, Skeleton, Avatar,
Pagination.

Every component is documented and browsable in Storybook (see below), and
[`docs/roadmap.md`](docs/roadmap.md) tracks what's built vs. planned.

## Local development

```bash
git clone https://github.com/rjamador/oceanic-ui.git
cd oceanic-ui
npm install
```

- `npm run dev` — the local demo app (`src/App.tsx`)
- `npm run storybook` — browse every component in isolation, with controls
- `npm test` — Vitest + Testing Library
- `npm run build` — typecheck + production build of the demo app
- `npm run build:lib` — the actual publishable library build (ESM, type
  declarations, and a distributable `styles.css`)
- `npm run lint` — ESLint

## Contributing

Read these three before touching a component:

- [`docs/design-language.md`](docs/design-language.md) — the visual
  language and why it looks the way it does.
- [`docs/dos-and-donts.md`](docs/dos-and-donts.md) — a fast do/don't
  checklist for reviewing or building UI here.
- [`docs/creating-components.md`](docs/creating-components.md) — folder
  shape, styling pattern, naming, and the checklist every new component
  should satisfy.

## License

[MIT](LICENSE)
