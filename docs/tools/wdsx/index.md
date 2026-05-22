# WDSX

> BMW's wiring diagrams, finally in a browser that works.

Trace a circuit from the relay through the connectors to the ECU it
feeds, with pin numbers and wire colours preserved from the factory
drawings. Pan and zoom on every diagram, follow clickable hotspots to
related schematics, read the info pages with their original images. The
original WDS was a Java applet from the early 2000s; this one is a fast,
keyboard-driven modern app.

## How to use it

**Self-hosted.** WDS ships as a tangle of proprietary HTML / SVG /
applet-driven data that needs converting before it can be served cleanly.
`WDSX` includes an importer CLI to convert your WDS data dump, then a
SvelteKit viewer to read it:

```bash
git clone https://github.com/emdzej/wdsx
cd wdsx && pnpm install
# Run the importer against your WDS data, then:
pnpm --filter @emdzej/wdsx-viewer dev
```

PWA-ready, so once converted you can install it as an offline app on a
phone or tablet for the garage.

## Links

- [GitHub](https://github.com/emdzej/wdsx)
- [User guide](./user) — trace a circuit, bookmark a diagram.
- [Developer guide](./developer) — importer, viewer architecture.
