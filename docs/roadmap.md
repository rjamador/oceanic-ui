# Component roadmap

What's built, and what's next. Update this file whenever a component
lands or a new one gets added to the plan — it's the source of truth for
"what does this library have" at a glance, not `git log`.

## Built

- ~~Button~~
- ~~IconButton~~
- ~~Card~~
- ~~Input~~
- ~~Textarea~~
- ~~Checkbox~~
- ~~Radio~~
- ~~Select~~
- ~~Slider~~
- ~~Dialog~~
- ~~Tabs~~
- ~~Accordion~~
- ~~Tooltip~~
- ~~Toast~~ (provider + `useToast` hook)
- ~~Progress~~
- ~~Badge~~
- ~~Text~~ (typography primitive)
- ~~Icon~~ (icon shell + `icons.tsx` module)
- ~~Spinner~~
- ~~Divider~~
- ~~SegmentedControl~~
- ~~List / ListItem~~
- ~~Switch~~
- ~~Skeleton~~
- ~~Avatar~~
- ~~Pagination~~

## Planned

Roughly ordered by how likely they are to get picked up next — not a
commitment, just the current sense of priority. Move an item up here
before starting it if the priority call changes.

- [ ] **Alert / Banner** — persistent inline message (info/success/
      warning/danger), the non-transient counterpart to `Toast`.
- [ ] **Popover** — generic floating panel anchored to a trigger,
      non-modal (unlike `Dialog`), dismissible on outside click/Escape.
      Foundational: `Menu` and a custom `Select` replacement would build
      on this rather than duplicating positioning logic.
- [ ] **Menu** — actionable dropdown list (role="menu", arrow-key nav,
      type-ahead), built on `Popover`. The right-click/toolbar menu
      pattern, very Explorer-authentic for this theme.
- [ ] **Breadcrumb** — navigation trail. Explorer's address bar is
      literally a breadcrumb; strong thematic fit.
- [ ] **Table** — bigger undertaking; a real data grid (sortable headers,
      row selection) rather than a bare `<table>`.
- [ ] **DatePicker** — calendar-based date input. Complex (positioning,
      keyboard grid nav, locale) — do this after `Popover` exists to
      build on it rather than inventing positioning logic twice.
- [ ] **FileUpload / Dropzone** — styled file input with drag-and-drop.
