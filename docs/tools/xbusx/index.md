# XBUSX

> Decode and interact with your BMW's comfort bus.

The I-Bus and K-Bus are the chatty backbone behind your IKE, lights,
radio, steering-wheel buttons, and door locks. `XBUSX` lets you watch
those messages live in human-readable form, look up what each one means
in a citation-backed reference manual, and send commands back to specific
devices — useful for retrofits, troubleshooting comfort modules, or
building your own integrations.

Covers E31, E38, E39, E46, E52, E53, E83, E85, E86, and E87 (~1989–2013).

## How to use it

**In your browser** — [xbusx.bimmerz.app](https://xbusx.bimmerz.app).
Plug a USB-serial tap into the I-Bus or K-Bus, point the app at the port,
and watch telegrams decode in real time. Files and bus traffic stay on
your machine.

**From a terminal** — the CLI and protocol library aren't published to
npm yet; clone the repo to run them:

```bash
git clone https://github.com/emdzej/xbusx
cd xbusx && pnpm install && pnpm build
```

The protocol reference itself is just markdown — browse it on the GitHub
repo if you only need the documentation side.

The bus interface needs a hardware tap (USB serial or DIY hardwire) on
the same machine as the app; the web app reaches the cable via Web Serial
the same way `EDIABASX`, `INPAX`, and `NCSX` do, so the same Chromium-based
browsers (Chrome, Edge, Opera, Brave) work.

## Links

- [GitHub](https://github.com/emdzej/xbusx)
- [User guide](./user) — set up a tap, monitor live, send commands.
- [Developer guide](./developer) — package layout, device twins, contributing to the reference.
