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

The diagnostic and coding tools (`ediabasx`, `inpax`, `ncsx`) run as live
web apps because the BMW data they need is small enough to read from your
own disk via the browser's File System Access API — nothing is uploaded,
everything stays on your machine.

The documentation tools (`tisx`, `etkx`, `wdsx`) and the bus tool
(`xbusx`) need a one-time data-import or migration step that's too heavy
for the browser to do alone — InstallShield archives, Transbase
migrations, or hardware bus taps. Those are self-hosted: clone the repo,
run the importer, then serve the viewer locally.
