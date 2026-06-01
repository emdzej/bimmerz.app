# NFSX

> Flash your BMW's ECUs from the command line — three paths, one tool.

TypeScript reconstruction of BMW's **NFS** (Nachfluss-System) /
WinKFP flash-programming toolchain. Read flash contents, verify
checksums, and write firmware to engine and transmission ECUs on
the E36 / E39 / E46 / E53 generation.

## Three flash paths

- **IPO-driven** (`nfsx flash`) — mirrors what BMW's WinKFP does.
  Resolves IPO + SGBD from SP-Daten, drives the BEST/2 VM through
  the full `SG_PROGRAMMIEREN` flow. For in-vehicle flashing with
  BMW `.0PA` firmware files.
- **Direct DS2** (`nfsx directmode`) — raw DS2 protocol over K-line.
  IDENT, SEED/KEY auth, erase, write, verify. Per-ECU region tables
  for full and calibration-only modes. For tuner BINs or standalone
  use without SP-Daten.
- **Bootmode** (`nfsx bootmode`) — C167 silicon BSL. Bypasses BMW
  firmware entirely; uploads a loader into RAM, drives the flash chip
  directly. Bench-pull only. Recovers bricked ECUs.

## Supported ECUs

| ECU | Type | DS2 addr | Flash paths |
|---|---|---|---|
| MS42 (C167CR) | Engine | `0x12` | directmode, bootmode |
| MS43 (C167CS) | Engine | `0x12` | directmode, bootmode |
| GS20 | Transmission | `0x32` | IPO-driven, directmode |

## How to use it

**CLI** — `nfsx` is a Node.js command-line tool. Install globally
via npm or clone the repo:

```bash
pnpm install && pnpm -r build
pnpm link --global --filter @emdzej/nfsx-cli
```

Requires [`@emdzej/ediabasx`](../ediabasx/) for the K+DCAN / J2534 /
ENET transport layer (IPO-driven and directmode paths). Bootmode
talks to the serial port directly.

## Status

Pre-release `0.1.0`. All three flash paths are implemented and
bench-verified:

- IPO-driven flash succeeded on GS20 (HWNR 7544721) via K+DCAN.
- Direct DS2 flash + readback verify succeeded on GS20.
- Bootmode full-chip erase + 512 KB write + verify succeeded on MS42
  (both MiniMon + custom stubs and JMG blob paths).

## Links

- [GitHub](https://github.com/emdzej/nfsx)
- [User guide](./user) — install, configure, flash.
- [Developer guide](./developer) — architecture, packages, protocol docs.
