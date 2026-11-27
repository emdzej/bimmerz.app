# NAVX — developer guide

The repository is a pnpm/turbo monorepo. Libraries are isomorphic
(`Uint8Array`, no Node APIs) so the web app uses the same code as the CLI.

| Package | Contents |
|---|---|
| `packages/os9` | OS-9000 module pools: parse, verify (parity, CRC), add, serialize-and-verify |
| `packages/colours`, `packages/images`, `packages/voice` | colour tables, icons/bitmaps, `.csf` voice files (modern and old layouts, phrase editing, English phrase hints) |
| `packages/text` | the UI text (`Lng_*`) and bitmap fonts: read, write, translation files (JSON / CSV), the Polish letters added to the fonts |
| `packages/emu` | the MK4 emulator: MIPS CPU, OS-9000 kernel calls, devices (flash, NVR, video, I-Bus, disc), the car twins (GM, LCM, IKE, PDC) for testing modules, ISO 9660 reader and patcher |
| `apps/cli` | the `navx` command — the only package that touches the filesystem |
| `apps/web` | the Svelte 5 web app |

Rules the code keeps: no BMW data in the repository (tests on real files
run only with `NAVX_NAVBOOT` or `NAVX_VOICES` set); every
writer re-parses its output and checks parity and CRC before saving; a
change that resizes a module says so.

## Writing a module

Programs for the unit are built with the NavX SDK: C compiled with clang
into an OS-9000/MIPS program module, a runtime that wraps the OS-9000
calls (paths, pipes, signals, data modules, memory, getstat/setstat) with
a small C library, and a MIPS I hazard checker. The SDK has moved to its
own repository and isn't public yet; its documentation is: [sdk.navx.bimmerz.app](https://sdk.navx.bimmerz.app) (the toolchain, the app interfaces, the UI guidelines and the UI SDK). Modules built with it run in the
emulator (`navx run --cd V32.iso <module>`) and on the unit with the
bench firmware (`navx serial <port> load <module>`). The first big test
is Doom ([emdzej/navx-doom](https://github.com/emdzej/navx-doom)), which
boots and plays its demo in the emulator; bring your own WAD.

## Reference

- [docs/formats.md](https://github.com/emdzej/navx/blob/main/docs/formats.md) — file formats, each claim with how it was verified.
- [docs/firmware.md](https://github.com/emdzej/navx/blob/main/docs/firmware.md) — boot and update chain, system calls, `navx cd`.
- [docs/emulator.md](https://github.com/emdzej/navx/blob/main/docs/emulator.md) — emulator architecture and status.
