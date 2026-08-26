# Design language — Vista Glass

`aero-ui` is **inspired by** Windows Vista/7 dialog chrome (2006–2009 era
"Aero Glass") — it borrows that era's visual *grammar* (restrained
rounding, cool near-white gradients, recessed vs. raised surfaces, a glow
instead of a gloss), not the broader/looser "Frutiger Aero" umbrella and
specifically **not** the saturated "Web 2.0 glossy orb" button style
(think old Skype/badge icons). Those two related-but-different looks were
both tried and rejected during this project's early iterations — see
[Rejected directions](#rejected-directions) below for what to avoid and
why.

**This is not a pixel-accurate clone of Windows Vista.** The font stack
(Baloo 2 / Sora / Space Mono) is nothing like Vista's actual Segoe UI, the
color palette is an original invention rather than sampled from any real
Windows theme file, and nothing here does true translucent
desktop-composited glass. These are our own design decisions, inspired by
that era but not a spec we're required to match exactly — judge any
change against the principles below (or a reference screenshot), not
against "how Vista really did it."

## What "Vista-inspired" means here

- **Restrained rounding.** Corners are modest (3–10px), never liquid pills.
  A rounded-rect reads as a real OS control; a full pill reads as a mobile
  app or a 2008 web badge.
- **Cool, near-white gradients.** Controls go from almost-white at the top
  to a pale blue at the bottom — never a saturated, fully-colored fill.
- **Text is always dark.** Vista never put white text on a filled button.
  The "default"/primary action is communicated through a *stronger blue
  tint + glow*, not through color-inversion or a solid brand-color fill.
- **Thin, light borders — not colored rings.** A 1px border in a pale
  blue-grey, not a dark saturated ring around the control.
- **Glow, not gloss.** The only "shine" is a soft blue glow that appears on
  `hover`/`:focus-visible` (`box-shadow: 0 0 0 3px var(--aero-accent-glow)`).
  There is no permanent decorative reflection, sweep animation, or
  elliptical highlight sitting on top of controls.
- **Recessed vs. raised surfaces.** Actionable controls (`Button`,
  `IconButton`) are *raised* (gradient light-to-dark, top-lit). Data-entry
  fields (`Input`, `Select`, `Checkbox`, `Radio`) are *recessed* — an inset
  shadow carves them into the surface, the opposite gradient direction.
  Keep this distinction; it's how a user's eye tells "click me" from "type
  here" apart at a glance — the same trick that era of OS chrome used, one
  of the few things here that actually is a direct borrow rather than a
  loose inspiration.
- **Glass panels for containers.** `Card` uses `backdrop-filter: blur()`
  with a soft white specular gradient across the top — this is the one
  place a "reflection" motif is still correct, because it's mimicking
  actual frosted window glass, not a candy-coated button.

## Rejected directions

Two aesthetic branches were explored and explicitly turned down.

1. **"Web 2.0 glossy orb"** — saturated 3-stop sphere gradients, a **dark
   saturated ring border** around the shape, and a static **elliptical
   white highlight blob** positioned upper-left on every control (the
   MSN/Skype-orb look). Rejected for being too loud/dated-in-the-wrong-way
   and reading as candy rather than an OS.
2. **Frutiger Aero (broad)** — the wider 2004–2012 aesthetic umbrella
   (bokeh, water droplets, lens flares, chrome text). Only the "Windows
   Aero" sub-branch survived; the others were considered and passed over.

To make something feel more prominent, reach for a **stronger glow or a
slightly deeper gradient stop**, not a reflection or a dark ring — that's
the line between "more Vista" and "back to the orb."

## Tokens

All tokens live in `src/styles/`, one file per concern, and are consumed
as `var(--token)` — never hardcode a hex/px value in a component's
Tailwind classes or in a `theme.css` `@utility` block.

### `colors.css`

| Token | Value | Use |
|---|---|---|
| `--sky-50` … `--sky-900` | `#eef8ff` → `#0a2c57` | Blue scale — borders, hover states, ghost text |
| `--aero-accent` / `--aero-accent-strong` | `#33d6e0` / `#12b8c4` | The focus/hover glow color |
| `--aero-accent-glow` | `rgba(51,214,224,.55)` | Used directly in `box-shadow` for glow rings |
| `--glass-white` / `--glass-white-strong` | `rgba(255,255,255,.55/.78)` | `Card` frosted surface |
| `--glass-tint` | `rgba(200,232,255,.35)` | Ghost-button hover wash |
| `--glass-border` / `--glass-border-bottom` | near-white / pale navy | `Card`'s top-lit border pair |
| `--glass-shadow` | drop shadow + inset highlight | `Card`'s elevation |
| `--control-primary-top/mid/bottom/border` | `#eef6ff` → `#b7d7f5`, border `#9dc3ea` | `Button`/`IconButton` primary variant |
| `--control-secondary-top/mid/bottom/border` | `#ffffff` → `#e4eaf1`, border `#c9d3dd` | `Button`/`IconButton` secondary variant |
| `--text` / `--text-muted` | `#0d3151` / `#4c6b89` | Body text — always dark |
| `--text-on-accent` | `#ffffff` | Reserved; not currently used by any shipped variant (no white-on-fill buttons) |
| `--danger` / `--danger-glow` | `#d43d5c` / `rgba(212,61,92,.45)` | Validation error state |
| `--bg` | sky-to-white gradient | Page background |

`colors.css` is light-theme only for now — add a
`prefers-color-scheme: dark` block only when a component actually needs to
render on a dark surface, don't pre-build it.

### `spacing.css`

`--space-1` (4px) through `--space-16` (64px), plus radius tokens:
`--radius-sm` 3px, `--radius-md` 6px (the default for controls),
`--radius-lg` 10px (`Card`), `--radius-full` 999px (circular controls only
— `Radio`'s dot; we don't use pill-shaped buttons/fields anywhere in this
system, but a fully round selection control fits the same restrained-radius
principle).

### `typography.css`

- `--font-display`: **Baloo 2** — headings only.
- `--font-body`: **Sora** — everything else, including all control labels.
- `--font-mono`: **Space Mono** — code/technical strings.
- Raw size scale `--text-xs` (12px) through `--text-3xl` (40px) — used
  directly by controls (`Button`, `Input`, …) that need one fixed size.
- Semantic type scale `--type-display-lg/md/sm`, `--type-heading-lg/md/sm`,
  `--type-body-lg/md/sm`, `--type-label-lg/md/sm` — rem-based, consumed by
  the `Text` component (`src/components/Text`), not referenced directly by
  other components. `display`/`heading` sizes are fluid
  (`clamp(min, preferred, max)`) so they scale down on narrow viewports
  without a breakpoint per size; `body`/`label` sizes are fixed — they're
  already small enough that shrinking further would hurt readability.
- Weights `--weight-regular` (400) through `--weight-bold` (700); controls
  use `--weight-medium`, never bold.

Fonts load via Google Fonts `<link>` tags in `index.html` (app) and
`.storybook/preview-head.html` (Storybook) — both must stay in sync if the
font stack ever changes.

Any text that isn't a control's own label (a heading, a paragraph, a
caption) should go through `<Text variant="...">` rather than a raw
`<h1>`/`<p>`/hardcoded `font-size` — see `docs/creating-components.md` for
the variant list and the `as` prop for decoupling style from semantic
element.

### `layers.css`

A z-index scale (`--z-base` 0 → `--z-toast` 60). Use it for any `position`d
overlay instead of a magic number.

## Motion

- **Hover/focus glow** is the only permanent interaction affordance:
  `box-shadow: 0 0 0 3px var(--aero-accent-glow)` (or the pale-blue
  variant for `secondary`). Applied via CSS transition
  (`box-shadow .15s ease`), no JS.
- **Press** state shifts the gradient stops (light↔dark swap) rather than
  scaling or bouncing — `Button:active` inverts its gradient direction.
- Nothing auto-plays, loops, or sweeps across a control. If a future
  component needs entrance motion, prefer a plain CSS transition over a
  keyframe animation, and always respect
  `@media (prefers-reduced-motion: reduce)`.

## Icons

Every icon is built on the `Icon` component (`src/components/Icon/Icon.tsx`)
— a 24×24 outline `<svg>` shell (`stroke="currentColor"`, round line
caps/joins, `fill="none"`). No icon font, no filled/solid icon style —
stroke-only, in the same outline spirit as that era's toolbar icons,
though not copied from them.

`size` and `strokeWidth` are props, not CSS — a control that needs a
smaller icon (`IconButton`'s `sm`) passes `<CheckIcon size={16} />` rather
than relying on a `.sm svg { width: ... }` override. `Icon` is
`aria-hidden` by default (most icons sit inside an already-labeled
control); pass `aria-label` yourself for a standalone icon and it becomes
`role="img"` automatically.

Pre-built icons live in `src/components/Icon/icons.tsx` — `CheckIcon`,
`CloseIcon`, `ChevronRightIcon`, `ChevronDownIcon`, `GearIcon` as of this
writing. Every component that needs one of these imports it from there;
don't redeclare a `<svg>` locally, even for a one-off. Add a new icon to
that file (a small component wrapping `<Icon>{...}</Icon>` with the path
data) the first time a component genuinely needs one not already there.
