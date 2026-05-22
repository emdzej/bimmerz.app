# INPAX

> BMW's dealer diagnostic tool, running in your browser.

Pick an INPA script, see the same screens, menus, and F-key shortcuts the
dealer tool shows — backed by the original `.ipo` bytecode BMW ships
unchanged. Useful for live measurement displays, troubleshooting trees,
and any other diagnostic procedure your shop manual references.

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

## Links

- [GitHub](https://github.com/emdzej/inpax)
- [User guide](./user) — pick a script, drive the cable.
- [Developer guide](./developer) — embed the VM, write providers.
