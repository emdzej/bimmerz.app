# xbusx

> Decode and interact with your BMW's comfort bus.

The I-Bus and K-Bus are the chatty backbone behind your IKE, lights,
radio, steering-wheel buttons, and door locks. `xbusx` lets you watch
those messages live in human-readable form, look up what each one means
in a citation-backed reference manual, and send commands back to specific
devices — useful for retrofits, troubleshooting comfort modules, or
building your own integrations.

Covers E31, E38, E39, E46, E52, E53, E83, E85, E86, and E87 (~1989–2013).

## How to use it

**Self-hosted.** Plug a hardware bus tap into your USB or serial port,
clone the repo, and run the CLI / TUI / web app of your choice:

```bash
git clone https://github.com/emdzej/xbusx
cd xbusx && pnpm install && pnpm build
```

No live hosted version — the bus interface needs hardware on the same
machine as the app.

The protocol reference itself is just markdown; browse it directly on the
GitHub repo if you only need the documentation side.

## Links

- [GitHub](https://github.com/emdzej/xbusx)
- [User guide](./user) — set up a tap, monitor live, send commands.
- [Developer guide](./developer) — package layout, device twins, contributing to the reference.
