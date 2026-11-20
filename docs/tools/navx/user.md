# NAVX — user guide

NAVX works on the BMW MK4 software from the V32 CD. It ships no BMW
software or data: it reads your own CD and writes modified copies.

::: tip Keep the stock CD
An unmodified V32 CD is the recovery path for every change below.
:::

## Web app

[navx.bimmerz.app](https://navx.bimmerz.app) runs in the browser;
nothing is uploaded.

### Choosing the source

Pick the source once at the top of the page:

- a **CD image** (`.iso`) — read in place, without loading it whole;
- a **CD folder** (the unpacked disc) or a **flash folder** written by
  `navx flash`;
- a single **`navboot`** file.

From a CD the app finds the software sets (BMW `0101/BMWC01S` first) and
the voice files. The bar under the header shows the source and lets you
switch the software set or close it.

### Tools

All tools work on the same `navboot`:

| Tool | Does |
|---|---|
| **Colours** | the colour tables with BMW's own item names; themes such as E46 Amber; a preview of the MENU and a map screen in the edited colours |
| **Images** | icons and bitmaps, recoloured with the theme; **replace** any of them with your own picture — rombitmaps #14 (400×234) is the start screen |
| **Modules** | the modules in the pool, with header and CRC checks |
| **Voices** | voice prompts: play words, export WAV, replace words |

**Save navboot** writes the edited pool after re-checking every module.

### Emulator

The emulator boots the source's software like the car does: BMW logo,
then the main menu.

- Use the bezel: scroll on the dial to turn it, click to press, click the
  buttons.
- **Boot the tools' navboot** runs your edits.
- **Disc drive**: insert a map DVD image or folder.
- **Key**: ignition position.
- **Car** panel: the emulated car on the I-Bus — doors, windows, lids,
  lock, lights, reverse with parking distances, speed, rpm, temperatures,
  fuel and battery. Stock screens ignore most of it; the
  [car functions](./carbus) show it.
- **Audio** (in the Car panel): an emulated radio and CD changer. FM, AM,
  MODE, the presets and ◁ ▷ on the bezel work as in the car, and the nav
  shows the radio's screen (`FM 87.6`, `CD 1 Track 01`). Set stations,
  discs and tracks from the panel.
- Long presses work: hold a button for a second (MENU hold, storing a
  preset).

## Command line

```sh
git clone https://github.com/emdzej/navx && cd navx
pnpm install && pnpm build
pnpm navx <command> …
```

| Command | Does |
|---|---|
| `navx modules <navboot>` | list the modules in a pool |
| `navx verify <navboot>` | check header parity and CRC of every module |
| `navx colours <navboot> [--module rom_col] [--json]` | dump a colour table with item names |
| `navx theme <navboot> -o <out> [--theme amber] [--preview <file.html>]` | recolour all colour tables, icons and bitmaps |
| `navx image list <navboot>` | icons and bitmaps: index, format, size |
| `navx image replace <navboot> rombitmaps 14 start.png -o <out> [--fit]` | replace an image (here the start screen), encoded in the entry's own format |
| `navx extract <navboot> <module> -o <file>` | write one module to a file |
| `navx add <navboot> <module-file> -o <out>` | append a module; the pool grows by its size |
| `navx voice info` / `export` / `import` | voice prompt files (`.csf`): list, export every word as WAV, replace words |
| `navx cc <file.c>… -o <module> [--name n] [--cflags …]` | build a program module from C (needs clang with MIPS) |
| `navx cd --iso <stock.iso> --add <module>… -o <out.iso>` | update CD with modules added and the version changed |
| `navx flash --cd <iso or dir> <flashdir>` | install the CD's software into an emulated flash |
| `navx boot --flash <dir> [--cd <iso or dir>]` | boot the unit in the emulator |
| `navx run [--cd …] <module> [args…]` | run one program module in the emulator |

### Replacing the start screen

The picture shown while the unit boots is a 400 × 234 GIF (rombitmaps
#14). Make your own at exactly that size (or let the tool scale it), use
few colours — the unit shows 256 at most — and replace it in the web app
or with `navx image replace`. A picture that compresses worse than BMW's
makes the `rombitmaps` module, and so the `navboot`, grow; the tool says
so. It is a single still picture: the unit has no boot animation.

### Putting changes on the unit

For a changed `navboot` (theme, images), replace `V_2/RR/0101/BMWC01S/app_sw/navboot`
in a copy of the CD tree and burn it, or use `navx cd` for added modules.
The unit installs software only when the disc's `sw_rel.tbl` version
differs from the one in flash; `navx cd` changes it for you.
