# NFSX — developer guide

## Packages

| Package | Purpose |
|---|---|
| `@emdzej/nfsx-cli` | CLI (`nfsx` command) |
| `@emdzej/nfsx-web` | Browser SPA — direct DS2 / bootmode / checksum |
| `@emdzej/nfsx-flash` | IPO-driven 5-stage FlashSession orchestrator |
| `@emdzej/nfsx-flash-data` | `.0PA`/`.0DA` parser, S37 parser, MS42/MS43 checksums + VIN/immo/UIF field access |
| `@emdzej/nfsx-directmode` | Raw DS2 flashing (SEED/KEY, erase, write, verify) |
| `@emdzej/nfsx-bootmode` | C167 BSL bootmode (MiniMon + JMG blob paths) — browser-safe as of 0.3.0 |
| `@emdzej/nfsx-ms45` | MS45.0 / MS45.1 DME flashing — RSA-1024 auth + CRC-32/MPEG-2 + RSA-1024 firmware signing |
| `@emdzej/nfsx-runtime` | NFS-specific CABI slot overrides on the inpax VM |
| `@emdzej/nfsx-resolver` | SP-Daten lookup chain (HWNR → SG_TYP → IPO + SGBD) |
| `@emdzej/nfsx-data-files` | Parsers for SP-Daten text files |
| `@emdzej/nfsx-fsc` | FSC / certificate manager |

## Architecture

`nfsx flash` (IPO-driven) resolves an HWNR through SP-Daten, loads
the target IPO, and drives the inpax BEST/2 VM through the full
`SG_PROGRAMMIEREN` job — the same code path BMW's WinKFP takes. The
runtime overrides file I/O, BinBuf, and ApiJobData slots so the IPO
can read firmware from `.0PA` archives and push it through ediabasx.

`nfsx directmode` skips the IPO layer and talks DS2 directly: frame
building, SEED/KEY auth, AMD flash erase/write sequences, per-ECU
region tables. Uses ediabasx for the K-line transport.

`nfsx bootmode` bypasses BMW firmware entirely via the Infineon C167
mask-ROM BSL. Two secondary loaders are supported: MiniMon (public,
~394 bytes) with custom flash stubs, and the JMG blob (898 bytes,
monolithic with built-in AMD AM29F400B driver). Fully browser-safe —
the same session code runs against `NodeBootmodeTransport` (CLI) or
`WebBootmodeTransport` (web app) via an injected transport interface.

`nfsx ms45` uses the EDIABAS `D_Motor` SGBD group (auto-resolves to
`MS450DS0.prg` on E46 or `10MDS45.prg` on E60/E65). Handles RSA-1024
level-3 security access (MD5 over `userID || serial || seed`), per-write
CRC-32/MPEG-2 checksum recompute across the parameter blob and the
dual program checksums that span external + MPC flash, and RSA-1024
firmware-signature recompute over the segments named in each blob's
header. Clean-room reimplementation of terraphantm/MS45-Flasher.

## Protocol documentation

In-repo docs cover the wire protocols in detail:

- [`docs/raw-ds2-flashing.md`](https://github.com/emdzej/nfsx/blob/main/docs/raw-ds2-flashing.md) — DS2 framing, SEED/KEY, erase/write/verify, per-ECU region tables, MS4x checksums
- [`docs/bootmode.md`](https://github.com/emdzej/nfsx/blob/main/docs/bootmode.md) — C167 BSL entry, MiniMon command set, JMG blob protocol, annotated disassembly
- [`docs/ms45-flashing.md`](https://github.com/emdzej/nfsx/blob/main/docs/ms45-flashing.md) — MS45 memory model, SGBD job choreography, RSA-1024 security access, CRC-32/MPEG-2 checksums, firmware signing layout, credits
- [`docs/architecture.md`](https://github.com/emdzej/nfsx/blob/main/docs/architecture.md) — IPO lookup chain, slot table, coapiKf* map, SG_PROGRAMMIEREN flow
- [`docs/first-flash-runbook.md`](https://github.com/emdzej/nfsx/blob/main/docs/first-flash-runbook.md) — pre-flight checklist + firmware-decision matrix + failure modes

## Building from source

```bash
git clone git@github.com:emdzej/nfsx.git
cd nfsx
pnpm install
pnpm -r build
pnpm -r test
```

## Dependencies

Built on top of:

- [`@emdzej/inpax`](../inpax/) — IPO bytecode VM
- [`@emdzej/ediabasx`](../ediabasx/) — wire transport (K+DCAN, J2534, ENET)
- [`@emdzej/ncsx`](../ncsx/) — CABI provider scaffold
