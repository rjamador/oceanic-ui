# Do / Don't — quick reference

A fast checklist for reviewing or building UI in this library. Read
`docs/design-language.md` first for the *why*; this file is the *what*.

## Visual style

| ✅ Do | ❌ Don't |
|---|---|
| Modest corner radius: `--radius-sm/md/lg` (3/6/10px) | Full pill radius (`--radius-full`) on buttons/inputs |
| Cool near-white → pale-blue gradients on controls | Saturated, fully-colored fills |
| Dark text (`--text`) on every control, always | White text on a filled/colored button |
| A thin, light 1px border (`--control-*-border`) | A dark, saturated ring border around a shape |
| A soft blue glow on `hover`/`:focus-visible` only | A permanent decorative highlight/reflection sitting on the control |
| An elliptical specular highlight — but only on `Card` (real glass) | The same reflection trick on buttons/icon controls (that's the orb look we rejected) |
| Distinguish raised controls (buttons) from recessed fields (inputs) via gradient direction | Style every control the same way regardless of whether it's an action or an entry field |
| `var(--token)` for every color/spacing/radius value | A hardcoded hex, px, or rgba() literal in a component's Tailwind classes or a `theme.css` `@utility` |

## Markup & accessibility

| ✅ Do | ❌ Don't |
|---|---|
| Real `<button>` for anything clickable | `<div onClick>` with a `role="button"` bolted on |
| Real `<input>`/`<select>` for data entry | A custom-rendered fake field |
| `aria-label` on every icon-only control (type-enforced on `IconButton`) | An icon-only button with no accessible name |
| `htmlFor`/`id` pairing (or wrapping `<label>`) for every field | A visual-only label with no programmatic association |
| `role="alert"` on a validation error message | A red `<p>` with no live-region semantics |
| Native `disabled` attribute | `aria-disabled` alone on a real `<button>`/`<input>` (native `disabled` already gives you this for free, plus blocks the click) |
| Visible `:focus-visible` styling on every interactive element | `outline: none` with nothing replacing it |

## Component API

| ✅ Do | ❌ Don't |
|---|---|
| `forwardRef` to the real DOM node | A component that swallows the ref |
| Extend the matching native HTML attributes interface | Reinvent props that HTML already gives you (`onClick`, `placeholder`, `disabled`, …) |
| `Omit<...,'size'>` (or any colliding key) when your variant prop reuses a native attribute name | Let `tsc -b` catch a `size`/`type`/`color` collision after the fact |
| `primary` / `secondary` / `ghost` variant naming, `sm` / `md` / `lg` sizing | A one-off variant name that doesn't fit the shared vocabulary (`variant="fancy"`) |
| Add a token to `src/styles/*.css` the first time a component needs it | Invent a local one-off value "just for this component" |

## Scope

| ✅ Do | ❌ Don't |
|---|---|
| Keep a component presentational — props in, JSX out | Fetch data, read a router, or reach for app-level state inside a library component |
| Support controlled *and* uncontrolled usage when a component has internal state | Force a consumer into one state-management style |
| Ask before reaching for a new dependency | Add a library for something CSS or a native HTML element already covers |

## The one-line version

**If it looks like a bright candy button with a shiny dark-rimmed circle
and a white blob of light on it, it's wrong — see
`docs/design-language.md#rejected-directions` for why.**
