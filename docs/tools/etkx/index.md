# etkx

> Look up any part on your BMW — diagrams, numbers, the lot.

Browse the factory parts catalogue (ETK) the way the dealership does:
chassis → assembly → diagram with clickable hotspots over every item.
See the current part number, what it replaced, and what it's been
superseded by. Modern Svelte frontend on top of a fast backend service.

## How to use it

**Self-hosted.** ETK data sits in a 1990s-era Transbase database that no
modern OS speaks natively. `etkx` ships a migration tool to extract that
data into a portable SQLite file, then a Spring Boot service + Svelte
frontend you can run locally:

```bash
git clone https://github.com/emdzej/etkx
cd etkx
# Migrate from your Transbase install (see repo README), then:
cd service && ./gradlew bootRun
cd ../frontend && pnpm install && pnpm dev
```

You need Java 21+, Node 20+ with pnpm, and a copy of the original ETK
data (or access to a running Transbase instance to migrate from).

## Links

- [GitHub](https://github.com/emdzej/etkx)
- [User guide](./user) — find parts by diagram, number, or supersession.
- [Developer guide](./developer) — migration pipeline, service surface.
