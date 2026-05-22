# ediabasx

> Talk to your BMW's ECUs from a browser tab.

Read fault codes, query live values, run any diagnostic job the dealer
tool can — without Windows, without a VM, without admin rights. The same
SGBD files BMW shipped power it; you bring your own copy.

## How to use it

**In your browser** — [ediabasx.bimmerz.app](https://ediabasx.bimmerz.app).
Point it at your BMW Standard Tools folder, plug in a K+DCAN cable, pick
an ECU, run a job. Files stay on your machine; nothing is uploaded.

**From a terminal** — install the CLI globally and drive it from scripts:

```bash
npm install -g @emdzej/ediabasx-cli
ediabasx info file.prg
ediabasx run engine.prg ident
```

Works in Chrome, Edge, Opera, and Brave on desktop. The terminal CLI runs
anywhere Node 20+ does.

## Links

- [GitHub](https://github.com/emdzej/ediabasx)
- [User guide](./user) — read jobs, connect a cable, troubleshoot.
- [Developer guide](./developer) — embed the interpreter in your own app.
