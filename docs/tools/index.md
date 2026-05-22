# Tools

The bimmerz suite is split across seven projects. Each one tackles a
specific slice of what BMW's factory toolchain does — diagnostics, coding,
documentation, or bus communication.

## Diagnostic & coding

| Tool | What it's for |
|---|---|
| [**ediabasx**](./ediabasx/) | Read fault codes and run diagnostic jobs against your ECUs. |
| [**inpax**](./inpax/) | Run BMW's interactive diagnostic scripts — live measurements, troubleshooting trees, F-key shortcuts. |
| [**ncsx**](./ncsx/) | Read and write ECU coding. Tick boxes for the options you want; no hex required. |

## Bus & ECU

| Tool | What it's for |
|---|---|
| [**xbusx**](./xbusx/) | Watch and interact with the I-Bus / K-Bus comfort messages — IKE, lights, radio, doors, steering wheel. |

## Documentation

| Tool | What it's for |
|---|---|
| [**tisx**](./tisx/) | Read repair procedures and technical bulletins (BMW's Technical Information System, in a modern browser). |
| [**etkx**](./etkx/) | Look up any part — diagrams, numbers, supersession history. |
| [**wdsx**](./wdsx/) | Read wiring diagrams. Trace a circuit, follow pin numbers, find connectors. |

## Web app vs self-hosted

The diagnostic and coding tools — [`ediabasx`](./ediabasx/),
[`inpax`](./inpax/), and [`ncsx`](./ncsx/) — run as live web apps. They
read the BMW data they need from your own disk via the browser's File
System Access API; nothing is uploaded.

The documentation tools — [`tisx`](./tisx/), [`etkx`](./etkx/), and
[`wdsx`](./wdsx/) — need a one-time data-import or migration step that's
too heavy for the browser to do alone (InstallShield archives, Transbase
migrations, RTF decompression). Those are self-hosted: clone the repo,
run the importer, then serve the viewer locally.

[`xbusx`](./xbusx/) is the odd one out for now. The protocol library and
CLI are usable today; a hosted web app is on the roadmap but isn't
deployed yet, so it's source-only for the moment.
