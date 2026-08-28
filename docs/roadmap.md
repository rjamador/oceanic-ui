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
- ~~Alert / Banner~~
- ~~Popover~~
- ~~Menu~~
- ~~Breadcrumb~~
- ~~FileUpload / Dropzone~~
- ~~Composer~~ (chat input: attachments, slash commands, send/stop)
- ~~Attachment~~
- ~~Message~~ / ~~Bubble~~
- ~~Empty~~
- ~~Marker~~
- ~~IconSwap~~
- ~~CodeBlock~~
- ~~Pulse~~ (activity mark)
- ~~Thinking~~ (reasoning disclosure)
- ~~ToolCall~~ / ~~ToolCall.Group~~ (tool-invocation rows)

## Planned

Roughly ordered by how likely they are to get picked up next — not a
commitment, just the current sense of priority. Move an item up here
before starting it if the priority call changes.

- [ ] **Sidebar** — a general-purpose collapsible side panel (navigation,
      chat history, filters). shadcn-style primitives, built-in mobile
      drawer. Its own spec.
- [ ] **Table** — bigger undertaking; a real data grid (sortable headers,
      row selection) rather than a bare `<table>`.
- [ ] **DatePicker** — calendar-based date input. Complex (positioning,
      keyboard grid nav, locale) — build on `Popover` rather than
      inventing positioning logic twice.
