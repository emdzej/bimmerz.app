# NCSX — developer guide

> This guide is a stub. Content is coming as the docs settle.

Things this guide will cover:

- Package layout — `@emdzej/ncsx-chassis`, `-cabd`, `-coder`,
  `-function-list`, `-identity`, `-INPAX-cabi-provider`, …
- The CABI/CDH bridge — how the per-CABD IPOs call back into host state.
- Per-dispatch cabd-par seeding (matching NCSEXPER's `FUN_00402c70`).
- Encoding / decoding netto bytes ↔ FSW/PSW values.
- Building from source + running the test suite.
- Reverse-engineering notes — see [`docs/`](https://github.com/emdzej/ncsx/tree/main/docs)
  in the repo for the architecture deep-dives.

In the meantime, [`docs/STATUS.md`](https://github.com/emdzej/ncsx/blob/main/docs/STATUS.md)
captures what's wired and what's pending.
