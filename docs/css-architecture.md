# CSS architecture

How styling is organized in this repo, file by file. Read
`docs/design-language.md` for the visual *why*; this is the structural
*what*.

## `src/index.css` — entry point

The only stylesheet imported by the app (`src/main.tsx` → `App.tsx`) and by
Storybook (`.storybook/preview.tsx`). Everything else on this list is
reached through the `@import`s at its top, in this order:

```css
@import './styles/colors.css';
@import './styles/spacing.css';
@import './styles/typography.css';
@import './styles/layers.css';
@import 'tailwindcss';
@import './styles/theme.css';
```

Below the imports it also carries the global reset (`box-sizing`, margin/
padding zeroing) and base element styles (`body`, `h1`–`h3`).

## `src/styles/colors.css`, `spacing.css`, `typography.css`, `layers.css` — design tokens

The single source of truth for every design token, as plain CSS custom
properties on `:root`:

- **`colors.css`** — the Vista Glass palette: the `--sky-*` scale, the aero
  accent, glass-surface tints, the raised-control gradients
  (`--control-primary-*`/`--control-secondary-*`), recessed-surface tints
  for form fields, text colors, validation colors, and the page background
  gradient.
- **`spacing.css`** — the `--space-*` scale and the `--radius-*` scale.
- **`typography.css`** — font stacks (`--font-display`/`--font-body`/
  `--font-mono`), the `--text-*` size scale, weights, and the semantic
  `--type-*` scale used by the `Text` component.
- **`layers.css`** — `--z-*` stacking-order tokens (`raised` → `toast`).

**These files are never touched when migrating a component to Tailwind.**
Components reference these tokens directly via `var(--token-name)` inside
`theme.css` (see below) — the tokens don't get duplicated or re-aliased.

## `src/styles/theme.css` — Tailwind v4 theme layer

Where composed, multi-property visual effects live as Tailwind `@utility`
classes — gradients, multi-layer `box-shadow`s, `backdrop-filter` blur, and
their `:hover`/`:focus-visible`/`:disabled`/`:checked` states (e.g.
`aero-btn-primary`, `aero-glass`, `aero-checkbox-box`). Each one:

- References the source tokens above directly via `var(...)`.
- Behaves as a real Tailwind utility (same cascade layer/specificity), so
  `tailwind-merge` (see `src/lib/cn.ts`) can detect when a consumer passes a
  conflicting class (e.g. `className="bg-red-500"`) and deterministically
  replace the whole composed class instead of leaving it fighting for
  precedence in the cascade.

This is what makes per-component `.module.css` files unnecessary — see
[`docs/css-architecture.md#migrating-a-component`](#migrating-a-component-off-css-modules)
below.

## `src/App.css` — unused

Empty, and not imported anywhere (`App.tsx` doesn't reference it). Leftover
from the Vite starter template. Safe to delete whenever someone's touching
this area; not removed here only because it's out of scope for whatever
change you're currently reading this doc for.

## Per-component styling — no `.module.css` anymore

Every component under `src/components/<Name>/` used to ship a
`<Name>.module.css`. As of the Tailwind migration, none do — each
component's styling lives inline as Tailwind utility classes (composed via
`class-variance-authority`/`cva` for variants) plus, for anything with a
composed multi-property effect, a class from `theme.css`. See
`src/components/Button/Button.tsx` and `src/components/Card/Card.tsx` for
the reference shape.

### Migrating a component off CSS Modules

If you ever find a stray `.module.css` (there shouldn't be any left):

1. Move single-property rules (a single color, a spacing/font-size value
   that matches Tailwind's default scale) to plain Tailwind utility strings
   in a `cva()` call.
2. Move composed multi-property rules (gradients, layered shadows, blur,
   pseudo-state chains) to a new `@utility aero-<component>-<part>` block in
   `theme.css`, referencing tokens via `var(...)`.
3. If that new utility sets `background`/`background-color`, register its
   class name in the `bg-color` array in `src/lib/cn.ts` — **but only if
   it's a standalone/swappable background** (mutually exclusive variants
   like `aero-btn-primary`/`-secondary`/`-ghost`, or a lone override target
   like `aero-glass`). Don't register a structural base class that a `cva`
   call always renders together with one of its own modifier classes (e.g.
   a "selected" state) — `tailwind-merge` treats same-group classes as
   mutually exclusive alternatives and will silently drop whichever one
   isn't last, which for a base class means losing its padding/border/
   radius, not just its background. This exact bug happened during the
   batch migration (`Tabs`/`List`/`SegmentedControl`) and was fixed by only
   registering the modifier, not the base.
4. Watch for Tailwind's ambiguous `font-` prefix: `font-[var(--font-body)]`
   (arbitrary *font-family*) and `font-medium`/`font-semibold` (*font-
   weight*) land in the same `tailwind-merge` conflict group, so combining
   them silently drops the family. Use the arbitrary-property syntax
   instead: `[font-family:var(--font-body)]`.
5. Delete the `.module.css` file.
