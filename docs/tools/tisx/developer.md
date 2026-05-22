# TISX — developer guide

> This guide is a stub. Content is coming as the docs settle.

Things this guide will cover:

- TIS database schema — tables, columns, relationships (original BMW
  schema preserved).
- Data pipeline — InstallShield V3 archive → MDB → SQLite, ITW images →
  PNG, RTF decompression.
- The RTF rendering pipeline + BMW-specific RTF extensions.
- Cross-reference hotspot resolution (how the disambiguation flow works
  for multi-target links).
- Express API surface + SvelteKit frontend integration.
- Docker compose deployment, health checks.

The [`docs/` tree in the repo](https://github.com/emdzej/tisx/tree/main/docs)
already has detailed schema + RTF / navigation deep-dives.
