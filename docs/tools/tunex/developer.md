# TUNEX — developer guide

> This guide is a stub. Content is coming as the docs settle.

Things this guide will cover:

- Workspace layout — `apps/web` (Svelte 5 SPA) and
  `packages/xdf-parser` (pure TS).
- The TunerPro `.xdf` schema as the parser sees it — header,
  CATEGORY, CONSTANT, FLAG, PATCH, TABLE / AXIS, EMBEDDEDDATA,
  MATH, BASEOFFSET, DEFAULTS.
- The MATH evaluator — grammar, linear-form inverter, where the
  fallback to raw editing kicks in.
- Embedded data — type-flag bit layout (signed / lsbfirst / float),
  stride math for sub-view tables, `tableCellAddress` formula.
- The Svelte 5 state shape (`src/lib/state.svelte.ts`,
  `bookmarks.svelte.ts`, `ui-prefs.svelte.ts`) and the runes-based
  reactivity patterns the components rely on.
- Plugging in additional XDF features and outputtype enumerations
  not yet exercised by the bundled fixtures.
- CI flow (typecheck / lint / test / build on push + PR) and the
  manual workflow_dispatch Pages deploy.

In the meantime, the [project README](https://github.com/emdzej/tunex)
covers the package layout and quickstart.
