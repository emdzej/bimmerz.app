# NAVX — developer guide

The repository is a pnpm/turbo monorepo. Libraries are isomorphic
(`Uint8Array`, no Node APIs) so the web app uses the same code as the CLI.

| Package | Contents |
|---|---|
| `packages/os9` | OS-9000 module pools: parse, verify (parity, CRC), add, serialize-and-verify |
| `packages/colours`, `packages/images`, `packages/voice` | colour tables, icons/bitmaps, `.csf` voice files |
| `packages/emu` | the MK4 emulator: MIPS CPU, OS-9000 kernel calls, devices (flash, NVR, video, I-Bus, disc), the car twins (GM, LCM, IKE, PDC) for testing modules, ISO 9660 reader and patcher |
| `packages/sdk` | building OS-9000/MIPS program modules from C: runtime, `navx cc`, a MIPS I hazard checker |
| `apps/cli` | the `navx` command — the only package that touches the filesystem |
| `apps/web` | the Svelte 5 web app |

Rules the code keeps: no BMW data in the repository (tests on real files
run only with `NAVX_NAVBOOT` or `NAVX_VOICES` set); every
writer re-parses its output and checks parity and CRC before saving; a
change that resizes a module says so.

## Writing a module

```sh
navx cc hello.c -o hello --cflags=-Os
navx run --cd V32.iso hello
```

The SDK runtime (`packages/sdk/runtime`) wraps the OS-9000 calls (paths,
pipes, signals, data modules, memory, getstat/setstat). See
[docs/sdk.md](https://github.com/emdzej/navx/blob/main/docs/sdk.md) for
the argument conventions and the compiler gotchas.

## Reference

- [docs/formats.md](https://github.com/emdzej/navx/blob/main/docs/formats.md) — file formats, each claim with how it was verified.
- [docs/firmware.md](https://github.com/emdzej/navx/blob/main/docs/firmware.md) — boot and update chain, system calls, `navx cd`.
- [docs/emulator.md](https://github.com/emdzej/navx/blob/main/docs/emulator.md) — emulator architecture and status.
