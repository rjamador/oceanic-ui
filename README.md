# oceanic-ui

A React component library inspired by **Ocean** — the blue Metal Look and
Feel theme from Java Swing, default since Java 5 (2004): cool near-white-
to-blue gradients, restrained rounding, a soft glow instead of gloss,
every surface fully opaque. See
[`docs/design-language.md`](docs/design-language.md) for the full visual
language.

> **Status:** pre-release. The API is still settling and this isn't
> published to npm yet — use it by cloning the repo for now. See
> [Using it before it's on npm](#using-it-before-its-on-npm) below.

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

## Using it before it's on npm

```bash
git clone https://github.com/rjamador/oceanic-ui.git
cd oceanic-ui
npm install
```

- `npm run dev` — the local demo app (`src/App.tsx`)
- `npm run storybook` — browse every component in isolation, with controls
- `npm test` — Vitest + Testing Library
- `npm run build` — typecheck + production build of the demo app
- `npm run lint` — ESLint

The library build (ESM, with type declarations and a distributable
`styles.css`) is ready — `npm run build:lib` produces it — but the
package isn't published to npm yet. Until it is, install it directly
from a local tarball or a Git dependency:

```bash
npm run build:lib && npm pack
npm install /path/to/oceanic-ui-<version>.tgz   # in a consumer project
```

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
