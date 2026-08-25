# Creating a component

This is a component **library**, not an app — every component must work
standalone when imported into a consuming project. No routes, no app-level
state, no assumptions about a surrounding provider tree unless the
component explicitly documents one.

## Folder shape

Every component gets its own folder under `src/components/`:

```
src/components/<Name>/
  <Name>.tsx          the component
  <Name>.module.css    scoped styles (CSS Modules — no Tailwind, no CSS-in-JS)
  <Name>.test.tsx      Vitest + Testing Library
  <Name>.stories.tsx   Storybook story
  index.ts             barrel — exports ONLY the public surface
```

Then add one line to `src/index.ts`, the library's public entry point:

```ts
export { Name } from './components/Name'
export type { NameProps, ... } from './components/Name'
```

Nothing is public unless it's re-exported from `src/index.ts`. A
component's own `index.ts` should only export the component and its
`Props`/variant types — never internal helper components or hooks.

## Naming

| Thing | Convention |
|---|---|
| Component folder/files | `PascalCase` (`IconButton/IconButton.tsx`) |
| Everything else (hooks, utils, lib) | `camelCase` — never kebab-case |
| CSS Module class names | `camelCase` (`styles.fieldError`) |
| Exported types | `<Name>Props`, `<Name>Variant`, `<Name>Size` |

## Component API checklist

Copy this when starting a new component:

- [ ] `forwardRef` to the real DOM element a consumer would want to
      measure or focus (the `<button>`, the `<input>`, the root `<div>`).
- [ ] Accepts `className` and merges it via the local `cn()` helper
      (`src/lib/cn.ts`) — `cn(styles.root, styles[variant], className)`.
- [ ] Extends the matching native HTML attributes interface
      (`ButtonHTMLAttributes<HTMLButtonElement>`,
      `InputHTMLAttributes<HTMLInputElement>`, …) and spreads `...rest`
      onto the root element, so consumers keep every standard HTML prop
      for free.
- [ ] **Watch for name collisions with native attributes.** `size` is the
      most common one — `<input>`/`<select>` already have a numeric
      `size` attribute. If the component's own variant prop reuses a
      native attribute name, `Omit` it explicitly:
      `Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>`. This is a
      real `tsc` error (`TS2430`), not a style nitpick — it will fail the
      build if skipped.
- [ ] Real semantic HTML for anything interactive — `<button>` for
      clickable, `<input>`/`<select>` for entry. Never a styled `<div>`
      standing in for a control (see `docs/dos-and-donts.md`).
- [ ] Icon-only controls require `aria-label` — for `IconButton` this is
      enforced **at the type level**
      (`Omit<..., 'aria-label'> & { 'aria-label': string }`), not just a
      runtime check. Follow that pattern for any future icon-only control.
- [ ] Uses only `var(--token)` references in its `.module.css` — no
      hardcoded hex, px radius, or spacing value. If the token you need
      doesn't exist yet, add it to the matching file in `src/styles/`
      first (don't invent a one-off local value).
- [ ] Controlled/uncontrolled: if the component has state a consumer
      might want to own (checked, value, open), support both — don't
      force one.

## Variant / size pattern

Every interactive component follows the same two-axis shape established
by `Button`:

```ts
export type XVariant = 'primary' | 'secondary' | 'ghost'
export type XSize = 'sm' | 'md' | 'lg'
```

- `primary` — the raised/recessed glass surface using `--control-primary-*`
  tokens, the default action.
- `secondary` — same shape using `--control-secondary-*` (neutral, no blue
  tint).
- `ghost` — transparent until hover, then a soft wash appears
  (`--glass-tint` for buttons, `--control-secondary-*` for
  `IconButton`'s toolbar-style reveal).

Sizes are shared across the whole system — don't invent a new height
scale per component:

| Size | Height |
|---|---|
| `sm` | 32px |
| `md` | 38px (default) |
| `lg` | 46px |

## Writing the story

One `.stories.tsx` per component, title mirrors the folder path
(`Components/Button`). Cover the default state plus every *meaningfully*
different combination — not a story per individual prop permutation:

```tsx
export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Disabled: Story = { args: { variant: 'primary', disabled: true } }
export const Sizes: Story = { render: (args) => (/* sm/md/lg side by side */) }
```

Run `bun run storybook` to check it visually before moving on.

## Writing the tests

Vitest + `@testing-library/react` + `user-event`, co-located as
`<Name>.test.tsx`. Query by accessibility (`getByRole`, `getByLabelText`)
— never `data-testid` unless nothing else can select the element.
Minimum bar for a new component:

- A rendering/association test (label ↔ field, children render).
- A keyboard-interaction test for anything interactive.
- A disabled-state test (interaction is actually blocked, not just styled
  differently).

Run `bun run test` before committing. Run `bunx tsc -b` too — Vitest
passing does not guarantee the types are clean (see the `size`-collision
note above; that class of bug only shows up in the type checker, not the
test run).

## Reference implementation

`Input` (recessed field) and `Button` (raised control) are the two
canonical examples — read those two before building a new component, they
establish every pattern above in practice.
