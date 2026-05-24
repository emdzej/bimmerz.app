# INPAX

> BMW's diagnostic tool, running in your browser.

Pick an INPA script and run it against your ECU — live data, ECU
configuration, and the built-in diagnostic procedures BMW shipped in
the original `.ipo` bytecode. Same scripts the dealer tool runs, in a
browser tab instead of a Windows VM.

## How to use it

**In your browser** — [inpax.bimmerz.app](https://inpax.bimmerz.app).
Point it at your INPA install, browse the script catalogue, pick one,
plug in your cable. Files stay on your machine.

**From a terminal** — install the CLI globally and drive scripts from
the shell or an interactive TUI:

```bash
npm install -g @emdzej/inpax-cli
inpax info script.ipo
inpax disasm script.ipo
inpax run script.ipo                       # interactive TUI
inpax run script.ipo --headless            # batch mode
```

Two more globally-installable tools ship alongside the CLI:

```bash
npm install -g @emdzej/inpax-compiler      # IPS → IPO compiler
npm install -g @emdzej/inpax-ipo-editor    # TUI editor for IPO constants
```

Chromium-based browsers on desktop (Chrome, Edge, Opera, Brave) for the
web app. Node 20+ for the CLI tools.

## Community patches

Compiled `.IPO` files are bytecode — once published, BMW never updates
the strings, thresholds, or jump tables a script ships with. `inpax`'s
`patch` command (and the in-browser editor) let you apply non-invasive
constant-level tweaks without touching the original file: translations
for the German prompts, label corrections, threshold overrides, and so
on.

The shared catalogue lives at
[ipo-community-patches](https://github.com/emdzej/ipo-community-patches) —
patch files indexed by script and chassis, free to download and apply.
Contributions welcome — submit a PR with your patch and a short
description of what it changes.

## Links

- [GitHub](https://github.com/emdzej/inpax)
- [User guide](./user) — pick a script, drive the cable.
- [Developer guide](./developer) — embed the VM, write providers.
