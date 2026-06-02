# TUNEX

> Edit ECU firmware in your browser. Hex view with type interpretation,
> plus structured editing via TunerPro `.xdf` definitions.

Load a `.bin` from your disk and either edit raw bytes (with a hex view
that shows the byte at the cursor as every numeric type, plus inline
hex-pair edit and table-spotting visual modes) or load a TunerPro
`.xdf` definition file and edit the named constants, flags, patches,
and tables it describes — apply community patches, toggle features,
tweak tables, save the modified binary back to disk.

## How to use it

**In your browser** — [tunex.bimmerz.app](https://tunex.bimmerz.app).
Open a firmware file, edit, save. Everything stays on your machine —
no upload, no server.

The structured editor reads any TunerPro-format `.xdf`. The
community-maintained MS42 and MS43 patchlists work end-to-end:
constants, flags, immobilizer/checksum/M3-LED patches, and 1D/2D
tables (including non-contiguous sub-views like the UIF VIN cells).

Chromium-based browsers on desktop (Chrome, Edge, Opera, Brave) — uses
the file picker for both the binary and the `.xdf`, and writes the
modified binary back via a download.

## Features

- **Hex view** — virtualised, handles multi-MB firmware without jank.
  Cursor + keyboard nav, jump-to-offset (`g`), data interpretation
  panel (u8…f64 LE+BE, ASCII, UTF-8), inline hex-pair editing
  (double-click → type `FF AA CC`, Enter commits), contents column
  switchable to ASCII / u8 / u16 / i16 / u32 / i32 with an optional
  bars-mode visualisation for spotting tables.
- **Bookmarks** — named offsets with descriptions, organised into one
  level of folders, persisted to local storage.
- **Structured editor** — categories with item counts on the left;
  per-kind editors on the right:
  - Constants — engineering value via MATH equation, edit + write
    through linear inverse (raw fallback for non-linear).
  - Flags — checkbox toggling the masked bit.
  - Patches — applied / virgin / mixed state per entry, Apply or
    Revert at the entry and whole-patch level (the "virginise" flow).
  - Tables — row/column grid with axis labels, inline cell editing,
    hex/decimal toggle, optional heatmap colouring by value.
- **Cross-link** — selecting a structured item highlights its byte
  range in the hex view; "Jump 0x… →" pops the RAW tab open at that
  address.

## Links

- [GitHub](https://github.com/emdzej/tunex) — source, releases, issues.
- Drop-in support for any TunerPro `.xdf` (`MS41`, `MS42`, `MS43`,
  `ME7`, anything else the community has authored).
