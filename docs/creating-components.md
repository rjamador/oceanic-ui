# Creating a component

This is a component **library**, not an app — every component must work
standalone when imported into a consuming project. No routes, no app-level
state, no assumptions about a surrounding provider tree unless the
component explicitly documents one.

## Folder shape

Every component gets its own folder under `src/components/`:

```
src/components/<Name>/
  <Name>.tsx          the component — styled with Tailwind utilities + cva
  <Name>.test.tsx      Vitest + Testing Library
  <Name>.stories.tsx   Storybook story
  index.ts             barrel — exports ONLY the public surface
```

No `.module.css` — styling lives inline as Tailwind utility classes,
composed with `class-variance-authority` (`cva`) for variants. Any
composed multi-property effect (a gradient, a layered `box-shadow`, a
`backdrop-filter` blur, a pseudo-state chain) that doesn't map to a single
Tailwind utility goes in `src/styles/theme.css` as a custom `@utility`
class instead — see `docs/css-architecture.md` for the full pattern and
`src/components/Button/Button.tsx`/`Card/Card.tsx` for the reference
shape.

Then add one line to `src/index.ts`, the library's public entry point:

```ts
export { Name } from './components/Name'
export type { NameProps, ... } from './components/Name'
```

Nothing is public unless it's re-exported from `src/index.ts`. A
component's own `index.ts` should only export the component and its
`Props`/variant types — never internal helper components or hooks.

## Compound components

Some components have parts that must share state — `Tabs`/`Tabs.List`/
`Tabs.Tab`/`Tabs.Panel` is the reference example. These still live in a
**single file** inside the component's folder (`Tabs/Tabs.tsx`), not one
file per part:

- A local `React.createContext` (not exported from the barrel) holds the
  shared state, created at the top of the file.
- Each part is its own component, assembled onto the root via
  `Object.assign(Root, { List, Tab, Panel })` and exported as one named
  export (`Tabs`).
- Reaching for `Object.assign` here (over some manual-typing alternative)
  is the one case in this codebase where that's the right call — it's how
  you attach static properties to a `forwardRef` component while keeping
  full prop types on both the root and every sub-component.
- If state needs to be shared across parts *and* something a consumer
  might genuinely want to control from outside (open tab, checked, value),
  back it with `useControllableState` (`src/hooks/`) instead of plain
  `useState` — see `Tabs`' `value`/`defaultValue`/`onValueChange` props.
- `eslint-plugin-react-refresh` flags multiple component exports from one
  file by default; a compound component is a deliberate, documented
  exception — silence it with a single `eslint-disable` at the top of the
  file with a `-- reason:` comment, don't split the file to satisfy the
  linter.

## Naming

| Thing | Convention |
|---|---|
| Component folder/files | `PascalCase` (`IconButton/IconButton.tsx`) |
| Everything else (hooks, utils, lib) | `camelCase` — never kebab-case |
| `theme.css` `@utility` classes | `kebab-case`, prefixed `aero-<component>-<part>` (`aero-btn-primary`, `aero-checkbox-box`) |
| Exported types | `<Name>Props`, `<Name>Variant`, `<Name>Size` |

## Component API checklist

Copy this when starting a new component:

- [ ] `forwardRef` to the real DOM element a consumer would want to
      measure or focus (the `<button>`, the `<input>`, the root `<div>`).
- [ ] Accepts `className` and merges it via the local `cn()` helper
      (`src/lib/cn.ts`) — `cn(xVariants({ variant, size }), className)`,
      where `xVariants` is a `cva()` call. `cn()` runs a configured
      `tailwind-merge`, so a consumer's conflicting utility class
      deterministically replaces the component's own — that's the whole
      point of using Tailwind here, see `docs/css-architecture.md`.
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
- [ ] Uses only `var(--token)` references (in Tailwind arbitrary values or
      in a `theme.css` `@utility` block) — no hardcoded hex, px radius, or
      spacing value, *except* where Tailwind's own default scale already
      matches a token exactly (e.g. `p-4` for `--space-4`, both 16px) and
      a plain utility is clearer than an arbitrary-value one. If the token
      you need doesn't exist yet, add it to the matching file in
      `src/styles/` first (don't invent a one-off local value). If a new
      `theme.css` `@utility` sets `background`/`background-color`,
      register it in `src/lib/cn.ts`'s `bg-color` group — but only if it's
      a standalone/swappable background, never a base class that's always
      combined with one of its own modifier classes (see
      `docs/css-architecture.md` for why).
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

- `primary` — the raised/recessed panel surface using `--control-primary-*`
  tokens, the default action.
- `secondary` — same shape using `--control-secondary-*` (neutral, no blue
  tint).
- `ghost` — transparent until hover, then a soft wash appears
  (`--hover-wash` for buttons, `--control-secondary-*` for
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

## Typography — the Text component

Any text that isn't a control's own built-in label goes through
`<Text variant="...">` (`src/components/Text`) instead of a raw
`<h1>`/`<p>`/hardcoded `font-size`:

```tsx
export type TextVariant =
  | 'displayLarge' | 'displayMedium' | 'displaySmall'
  | 'headingLarge' | 'headingMedium' | 'headingSmall'
  | 'bodyLarge'    | 'bodyMedium'    | 'bodySmall'
  | 'labelLarge'   | 'labelMedium'   | 'labelSmall'
```

- Each variant maps to a `--type-*` token in `src/styles/typography.css`
  (font size/weight/line-height/family) — never hardcode those properties
  on an element instead of picking a variant.
- `variant` picks the *style*; the rendered element is a separate concern.
  Every variant has a sensible default element (`displayLarge` → `h1`,
  `bodyMedium` → `p`, `labelSmall` → `span`, …), overridable via the `as`
  prop when the semantic element and the visual style need to diverge
  (e.g. a card title styled `headingSmall` that shouldn't be an `h2` in
  the page's heading outline).
- `color` is a separate prop (`default` | `muted` | `accent` | `danger`)
  — don't reach for an inline `style={{ color: ... }}`.

## Icons

Every icon renders through the `Icon` shell
(`src/components/Icon/Icon.tsx`) — pass raw SVG children (`<path>`,
`<circle>`, …) and it handles the outer `<svg>` (24×24 viewBox,
stroke-only, `size`/`strokeWidth` props, the `aria-hidden`/`role="img"`
default). Pre-built icons live in `src/components/Icon/icons.tsx`
(`CheckIcon`, `CloseIcon`, `ChevronRightIcon`, `ChevronDownIcon`,
`GearIcon`) — import from there, never redeclare a `<svg>` inline in a
component. Adding a new icon means adding one small function to
`icons.tsx`:

```tsx
export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="..." />
    </Icon>
  )
}
```

`icon` props on components (`IconButton`, etc.) take a rendered element,
not a component reference — `icon={<CheckIcon />}`, not `icon={CheckIcon}`.

## Floating / positioned components

Anything that positions a layer against a trigger — `Popover`, `Menu`, and
the planned `DatePicker` — builds on **`@floating-ui/react`** (a runtime
`dependency`, not a peer). Don't hand-roll positioning, a collision/flip
pass, outside-click dismissal, focus return, or roving-focus keyboard
handling: compose Floating UI's hooks (`useFloating`, `useInteractions`,
`useDismiss`, `useRole`, `useListNavigation`, `useTypeahead`) and its
`FloatingPortal` / `FloatingFocusManager`. `Popover` is the reference.

The public API stays ours: a `side` (`top`/`bottom`/`left`/`right`) +
`align` (`start`/`center`/`end`) pair on the root, mapped to a Floating UI
`placement` by `src/lib/placement.ts`. Floating UI is the one sanctioned
exception to "ask before a new dependency" for this problem — reach for it,
not a second positioning implementation.

## Reference implementation

`Input` (recessed field) and `Button` (raised control) are the two
canonical examples for a typical control — read those two before building
a new component, they establish every pattern above in practice. For a
compound component, see `Tabs`; for a provider/hook pair, see `Toast`; for
the typography/icon primitives themselves, see `Text` and `Icon`; for a
floating layer, see `Popover` and `Menu`.
