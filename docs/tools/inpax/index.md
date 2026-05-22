# inpax

> BMW's dealer diagnostic tool, running in your browser.

Pick an INPA script, see the same screens, menus, and F-key shortcuts the
dealer tool shows — backed by the original `.ipo` bytecode BMW ships
unchanged. Useful for live measurement displays, troubleshooting trees,
and any other diagnostic procedure your shop manual references.

## How to use it

**In your browser** — [inpax.bimmerz.app](https://inpax.bimmerz.app).
Point it at your INPA install, browse the script catalogue, pick one,
plug in your cable. Files stay on your machine.

**From a terminal** — disassemble, inspect, or run scripts headlessly:

```bash
git clone https://github.com/emdzej/inpax
cd inpax && pnpm install && pnpm build
pnpm cli run script.ipo
```

Chromium-based browsers on desktop (Chrome, Edge, Opera, Brave) for the
web app. Node 20+ for the CLI.

## Links

- [GitHub](https://github.com/emdzej/inpax)
- [User guide](./user) — pick a script, drive the cable.
- [Developer guide](./developer) — embed the VM, write providers.
