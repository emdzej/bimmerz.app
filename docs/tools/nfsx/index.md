# NFSX

> Flash your BMW's ECUs — four paths, one tool. CLI + browser.

TypeScript reconstruction of BMW's **NFS** (Nachfluss-System) /
WinKFP flash-programming toolchain. Read flash contents, verify
checksums, and write firmware to engine and transmission ECUs on
the E36 / E39 / E46 / E53 / E60 / E65 generation.

## Four flash paths

- **IPO-driven** (`nfsx flash`) — mirrors what BMW's WinKFP does.
  Resolves IPO + SGBD from SP-Daten, drives the BEST/2 VM through
  the full `SG_PROGRAMMIEREN` flow. For in-vehicle flashing with
  BMW `.0PA` firmware files.
- **Direct DS2** (`nfsx directmode`) — raw DS2 protocol over K-line.
  IDENT, SEED/KEY auth, erase, write, verify. Per-ECU region tables
  for full and calibration-only modes. For tuner BINs or standalone
  use without SP-Daten.
- **C167 bootmode** (`nfsx bootmode`) — Infineon C167 silicon BSL.
  Bypasses BMW firmware entirely; uploads a loader into RAM, drives
  the AM29F400B flash chip directly. Bench-pull only. Recovers
  bricked ECUs.
- **MS45 SGBD** (`nfsx ms45`) — MS45.0 / MS45.1 DMEs via the
  EDIABAS `D_Motor` group. RSA-1024 security access + per-write
  CRC-32/MPEG-2 + RSA-1024 firmware signature recompute. Handles
  the DS2 baud-raise (MS45.0) and BMW-FAST native (MS45.1) split
  transparently.

## Supported ECUs

| ECU | Type | Wire | Flash paths |
|---|---|---|---|
| MS42 (C167CR) | Engine | DS2 K-line | directmode, bootmode |
| MS43 (C167CS) | Engine | DS2 K-line | directmode, bootmode |
| MS45.0 | Engine (E46) | DS2 (with baud raise) | ms45 |
| MS45.1 | Engine (E60/E65) | BMW-FAST / KWP2000 | ms45 |
| GS20 | Transmission | DS2 K-line | IPO-driven, directmode |

## How to use it

**CLI** — `nfsx` is a Node.js command-line tool covering every flash
path. Install globally via npm or clone the repo:

```bash
pnpm install && pnpm -r build
pnpm link --global --filter @emdzej/nfsx-cli
```

**Browser** — a subset also runs in-browser at
[`nfsx.bimmerz.app`](https://nfsx.bimmerz.app): direct DS2 flashing,
C167 bootmode (with bundled MiniMon integrity check via Web Crypto),
and offline MS4x checksum verification. Uses Web Serial for the wire;
nothing uploads.

Requires [`@emdzej/ediabasx`](../ediabasx/) for the K+DCAN / J2534 /
ENET transport layer (IPO-driven, directmode, and MS45 paths).
Bootmode talks to the serial port directly.

## Status

Pre-release `0.3.0`. Four flash paths implemented; three bench-verified:

- IPO-driven flash succeeded on GS20 (HWNR 7544721) via K+DCAN.
- Direct DS2 flash + readback verify succeeded on GS20.
- Bootmode full-chip erase + 512 KB write + verify succeeded on MS42
  (both MiniMon + custom stubs and JMG blob paths).
- MS45: offline BIN helpers (CRC-32/MPEG-2 + RSA-1024 firmware
  signature verify/rewrite) are green against fixture data; the wire
  path is unit-tested against a mock `IEdiabas` and awaits live-fire
  validation on a bench-pulled MS45 DME.

## Links

- [GitHub](https://github.com/emdzej/nfsx)
- [User guide](./user) — install, configure, flash.
- [Developer guide](./developer) — architecture, packages, protocol docs.
