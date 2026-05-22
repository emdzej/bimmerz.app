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

**Not yet hosted.** The protocol library and CLI are usable today; the
browser web app is on the roadmap but isn't deployed yet. Clone the repo
to run the CLI or build against the protocol library:

```bash
git clone https://github.com/emdzej/xbusx
cd xbusx && pnpm install && pnpm build
```

The protocol reference itself is just markdown — browse it on the GitHub
repo if you only need the documentation side.

The bus interface needs a hardware tap (USB serial or DIY hardwire) on
the same machine as the app; the web app, when it ships, will reach the
cable via Web Serial the same way `ediabasx`, `inpax`, and `ncsx` do.

## Links

- [GitHub](https://github.com/emdzej/xbusx)
- [User guide](./user) — set up a tap, monitor live, send commands.
- [Developer guide](./developer) — package layout, device twins, contributing to the reference.
