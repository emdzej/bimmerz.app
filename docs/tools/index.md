# Tools

The bimmerz suite is split across eight projects. Each one tackles a
specific slice of what BMW's factory toolchain does — diagnostics, coding,
documentation, or bus communication.

## Diagnostic & coding

| Tool | What it's for |
|---|---|
| [**EDIABASX**](./ediabasx/) | Read fault codes and run diagnostic jobs against your ECUs. |
| [**INPAX**](./inpax/) | Run BMW's diagnostic scripts — live data, ECU configuration, and the built-in diagnostic procedures. |
| [**NCSX**](./ncsx/) | Read and write ECU coding. Tick boxes for the options you want; no hex required. |
| [**NFSX**](./nfsx/) | Flash ECU firmware — IPO-driven, direct DS2, C167 bootmode, or MS45-SGBD. CLI + browser. |
| [**TUNEX**](./tunex/) | Edit ECU firmware in the browser — hex view + structured editor via TunerPro `.xdf` definitions. |

## Bus & ECU

| Tool | What it's for |
|---|---|
| [**XBUSX**](./xbusx/) | Watch and interact with the I-Bus / K-Bus comfort messages — IKE, lights, radio, doors, steering wheel. |

## Aftersales support

| Tool | What it's for |
|---|---|
| [**TISX**](./tisx/) | Read repair procedures and technical bulletins (BMW's Technical Information System, in a modern browser). |
| [**ETKX**](./etkx/) | Look up any part — diagrams, numbers, supersession history. |
| [**WDSX**](./wdsx/) | Read wiring diagrams. Trace a circuit, follow pin numbers, find connectors. |

## Web app vs self-hosted

The diagnostic, coding, and bus tools — [`EDIABASX`](./ediabasx/),
[`INPAX`](./inpax/), [`NCSX`](./ncsx/), [`NFSX`](./nfsx/),
[`TUNEX`](./tunex/), and [`XBUSX`](./xbusx/) — run as live web apps.
They read the BMW data they need from your own disk via the browser's
File System Access API and reach the cable through Web Serial; nothing
is uploaded.

[`NFSX`](./nfsx/) also ships as a Node.js CLI (`nfsx`) — the CLI
covers every flash path end-to-end, while the web app currently
handles direct DS2, C167 bootmode, and offline checksum verification.

The aftersales-support tools — [`TISX`](./tisx/), [`ETKX`](./etkx/), and
[`WDSX`](./wdsx/) — need a one-time data-import or migration step that's
too heavy for the browser to do alone (InstallShield archives, Transbase
migrations, RTF decompression). Those are self-hosted: clone the repo,
run the importer, then serve the viewer locally.
