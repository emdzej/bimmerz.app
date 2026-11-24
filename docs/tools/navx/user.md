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

From a CD the app finds the software sets and the voice files. The bar
under the header shows the source and lets you switch the software set
or close it. The V32 CD has four sets, and the picker says which is which:

- **BMW — the cars (E38, E39, E46, E52, E53) · BMWC01S**: the one to
  use, and the default;
- **BMW — second set, smaller UI · BMWM01S**: fewer colour items, no
  start logo;
- **Not for BMW — OEM build · 0102/BMWOCN, 0103/BMWOCN**: a non-BMW
  build without the BMW car tables.

### Tools

All tools work on the same `navboot`:

| Tool | Does |
|---|---|
| **Colours** | the colour tables with BMW's own item names; themes E46 Amber and M Performance, applied to all tables or to one **colour set** (Settings → Colour set 1 or 2, e.g. a day and a night theme); the table picker shows which colour set and screen each table is for, and a badge names the set you are editing; a preview of the MENU and a map screen in the edited colours, in any of the navboot's languages (with your Language edits) |
| **Images** | icons and bitmaps, recoloured with the theme; **replace** any of them with your own picture — rombitmaps #14 (400×234) is the start screen; **Use bimmerz splash** puts the bimmerz emblem there (BMWC01S; **Back to stock** undoes it) |
| **Language** | the menu text: pick the language to **replace** and one to **translate from**, edit strings in place with a preview in the unit's menu font, or export **CSV** (opens in a spreadsheet) / JSON, translate, and import it. Polish letters (ą ć ę ł ń ś ź ż …) are added to the fonts when you save |
| **Modules** | the modules in the pool, with header and CRC checks |
| **Voices** | voice prompts, female and male: play words and phrases, export WAV, replace words. Each phrase shows in English what it says (the same prompt in every language), and you can search them; the hints come from listening and can be off, so play a phrase before relying on one |

**Save navboot** writes the edited pool after re-checking every module.

### Emulator

The emulator boots the source's software like the car does: BMW logo,
then the main menu.

- Use the bezel: scroll on the dial to turn it, click to press, click the
  buttons. Click the drive's slot to insert a map disc, its eject key to
  take it out.
- **Navigation**: MK4 (DVD) or MK3 (CD). MK3 boots the Mk3 software that
  is also on the V32 CD (the newest set, 01.27) to its own MENU; the
  dial and buttons work. MK3 runs in Fast mode only (Full mode emulates
  the MK4 board) and keeps its own settings memory. A Mk3 map CD image
  can go in its drive.
- **Monitor**: the 16:9 or the 4:3 on-board monitor (E46 with the cassette
  radio). The nav asks the monitor what it is at power on and uses the
  matching colours and dial direction, and the picture is shown at the
  panel's shape. A change applies at the next power on.
- **Boot the tools' navboot** runs your edits.
- **Disc drive**: insert a map DVD image (`.iso`). With it, GPS-Navigation
  opens destination input and reads the countries from the disc, and
  Map shows where the GPS puts the car.
- **Key**: ignition position.
- **Language**: the language the car is coded for (German, English UK/US,
  French, Italian, Spanish), applied at power on. As in the car, the nav
  shows the cluster's coded language when its voice is installed.
- **Car** panel (the **Car** tab on the right edge; it slides in over the
  side, so the bezel stays usable, and × or Esc closes it): the emulated car on the I-Bus — doors, windows, lids,
  lock, lights, reverse with parking distances, speed, rpm, temperatures,
  fuel and battery. Stock screens ignore most of it; the
  [car functions](./carbus) show it.
- **GPS** (in the Car panel): where the emulated car is. Choose a fixed
  position, this browser's location, a GPX file (played at 1–10×) or a
  route typed as `lat, lon` lines, driven at the speed you set. The nav
  receives it as from its own receiver, with wheel speed to match. Without
  GPS it stays at its default position near Wetzlar. Turns are not
  modelled well yet.
- **Rain/light sensor** (in the Car panel): the light level and reasons (twilight, darkness, tunnel…) the sensor reports to the light module.
- **Audio** (in the Car panel): an emulated radio with a CD changer and a
  tape. FM, AM, MODE, the presets and ◁ ▷ on the bezel work as in the car,
  and the nav shows the radio's screen (`FM 87.6`, `CD 1 Track 01`,
  `TAPE 1 >>`). Set stations, discs and tracks from the panel. Insert a
  tape there, then pick its side or state, including the two fault
  screens: TAPE ERROR and TAPE CLEAN.
- Long presses work: hold a button for a second (MENU hold, storing a
  preset).

#### Emulated OS or emulated board

**Runs on** picks how the software runs. The setup row above the bezel
(software, runs on, navigation, monitor, language) applies at the next
power on.

- **Emulated OS (quick)**, the default, runs `navboot` on an emulated operating
  system: it starts in seconds and can boot the Tools' edited navboot.
- **Emulated board (real boot)** runs the unit's own boot loader (`lowboot`) and BMW's
  OS-9000 kernel and drivers on a model of the board, as in the car. It
  is slower to start: the boot takes about 90 s of emulated time.
  - **First power on:** the CD's software is installed into an emulated
    flash, with the voices for the chosen Language plus German and
    English. After that the unit boots from that flash.
  - **Flash:** the whole flash is kept in this browser, per navigation
    unit and software set, so settings you change survive power off. It
    is saved at Power off, at ignition off and every 30 s while it
    changes. **Reset flash** forgets it, and the next power on installs
    the CD again. A flash kept from before the language change has no
    voices and stays German until you reset it.
  - **The CD after that:** as in the car, it's only needed to install.
    With a flash kept, power on boots it with no CD (**no CD** takes the
    CD out). A line above the unit says what power on will do: install
    the CD, boot the flash, or update it.
  - **Updating:** pick a CD image (`.iso`) of another version and power
    on with it in the drive, as in the car. The disc's loader installs
    it (about two minutes here), ejects the disc and shows "Update is
    complete! … Please remove CD and confirm with OK". Press OK (the
    right knob), as in the car: the unit saves its settings, shuts down
    properly and restarts into the new software about 5 s later; the
    saved settings stay. Untick **CD in
    the drive at power on** to boot the flash without updating. Going
    back works the same way: power on with the stock CD. The drive takes
    images only, not folders. **Reset flash** still starts over from
    scratch (and forgets the saved settings).
  - **Key off:** the unit saves its settings and switches itself off
    about a minute of its own time later, as in the car. The next boot
    then says "correct power-down". In a slow browser or a background
    tab this takes longer in real time; the panel waits for it (up to
    15 minutes, then it saves the card as it is and says so).
  - **System monitor:** a line under the status shows what the running
    unit reports about itself:
    - CPU load: the time outside the kernel's idle loop. Near 100 % while
      it boots, about 5 % at the menu.
    - Memory: the kernel's own count of used and free RAM.
    - Flash use: code, data, voices and NVR, and the free space on the
      card. This line updates every 30 s and after each save.
  - **Serial console:** the panel shows the unit's serial port (t1,
    19200 baud). On the stock software it stays quiet. A disc made with
    `navx cd --console` writes the boot messages there.
  - A lowboot of your own can be picked instead of the CD's.
  - Not yet: the edited navboot from the Tools isn't used (build an
    update CD with it instead, see below).

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
| `navx theme <navboot> -o <out> [--theme amber\|m] [--preview <file.html>]` | recolour all colour tables, icons and bitmaps |
| `navx theme <navboot> -o <out> --set 1\|2 [--theme amber\|m] [--images]` | recolour only the tables of colour set 1 or 2; icons stay unless `--images` (both sets share them) |
| `navx image list <navboot>` | icons and bitmaps: index, format, size |
| `navx image replace <navboot> rombitmaps 14 start.png -o <out> [--fit]` | replace an image (here the start screen), encoded in the entry's own format |
| `navx extract <navboot> <module> -o <file>` | write one module to a file |
| `navx add <navboot> <module-file> -o <out>` | append a module; the pool grows by its size |
| `navx lang export <navboot> Lng_English -o en.csv` | every menu string by id, as CSV (id, source, text) or JSON |
| `navx lang import <navboot> pl.csv --into Lng_Hollands -o <out>` | your translation in place of the language you pick; the fonts get the letters it uses |
| `navx voice info` / `export` / `import` | voice prompt files (`.csf`, female and male): list, export every word as WAV plus `phrases.json`; import replaces words, adds new ones (`NNN.wav` past the last) and takes an edited `phrases.json` (each phrase's words in spoken order) |
| `navx cc <file.c>… -o <module> [--name n] [--cflags …]` | build a program module from C (needs clang with MIPS) |
| `navx cd --iso <stock.iso> [--add <module>]… [--console] --version NNNN -o <out.iso>` | update CD with modules added and the version changed; `--console` makes the serial port the console (permanent on a unit, see below) |
| `navx flash --cd <iso or dir> <flashdir>` | install the CD's software into an emulated flash |
| `navx boot --flash <dir> [--cd <iso or dir>]` | boot the unit in the emulator |
| `navx run [--cd …] <module> [args…]` | run one program module in the emulator |
| `navx lowboot --cd <iso> --flash <dir> --kernel` | boot a disc on the board model, as the emulated board does in the web app: which bootfile lowboot starts, and whether its kernel comes up |
| `navx nand info\|ls\|get\|fix-navboot <dump> …` | inspect and repair a programmer's dump of the unit's NAND flash |

### Replacing the start screen

The picture shown while the unit boots is a 400 × 234 GIF (rombitmaps
#14). Make your own at exactly that size (or let the tool scale it), use
few colours — the unit shows 256 at most — and replace it in the web app
or with `navx image replace`. A picture that compresses worse than BMW's
makes the `rombitmaps` module, and so the `navboot`, grow; the tool says
so. It is a single still picture: the unit has no boot animation.

**Use bimmerz splash** on that image's tile puts the bimmerz emblem there
in one click, opaque on dark grey and smaller than BMW's picture, so the
`navboot` keeps its size. Boot the edited navboot in the emulator to see
it at power on. The same picture shows on 16:9 and 4:3 monitors.

### Translating the menus

The unit has seven menu languages and no room is kept for more, so a
translation **replaces** one of them: choose one you don't use, and pick
it on the unit (Settings → Language) to see yours. Export the language
you translate from as CSV, fill in the `text` column (keep the `id`
column; rows left empty keep the old text) and import it. Letters
Latin-1 lacks, like Polish ą ć ę ł ń ś ź ż, are drawn from each font's
own glyphs and added to the fonts; the language and font modules grow,
so the `navboot` does too. Longer words may not fit their place on the
screen: boot the saved navboot in the emulator and look. The spoken
prompts are separate (the Voices tool). The language's code (`GB`, `D`,
…) stays the slot's own, so the unit treats it as the language it
replaced; in the language list, change that language's short name (for
Deutsch, string 1.348 `D`) to show yours.

### Recording a voice

Every voice has the same 1029 phrases (the male voices the first 248),
and a phrase number is the same prompt in every language; each language
has its own words and splits a phrase into them its own way. To make a
voice in another language: use the English hints in the Voices tool as
the script, export a voice with `navx voice export`, record your words
as `NNN.wav` (new words numbered after the last one), set each phrase's
words in `phrases.json`, and `navx voice import` it. Keep the file near
the size of the voice it replaces (the unit's flash holds three voices).
An edited voice hasn't been played on a unit yet.

### Putting changes on the unit

For a changed `navboot` (theme, images), replace `V_2/RR/0101/BMWC01S/app_sw/navboot`
in a copy of the CD tree and burn it, or use `navx cd` for added modules.
The unit installs software only when the disc's `sw_rel.tbl` version
differs from the one in flash; `navx cd` changes it for you.

Before a disc goes into the car, boot it on the board model:
`navx flash --cd out.iso <dir>`, then `navx lowboot --cd out.iso --flash <dir> --kernel`.
It must reach the kernel without restarting. A module of the wrong size
passes the CRC checks but crashes the kernel on every boot, and then
no CD can help: the unit has to be recovered by rewriting its flash
chip.

`--console` is permanent: once a unit has installed it, no disc turns
the serial console off again, and the stock CD leaves the dealer
diagnostics off (a disc with `DiagnosticsMode=1` brings them back).

## Support

The **Support** button at the top of the web app writes to us. Pick what it's about and say what happened. You can
attach the emulator's console and a picture of its screen; black out what the picture shouldn't show. Give an email
only if you want an answer by email. Answers show up under **Support › Messages**, where you can also download or
erase everything kept about you. What's kept and for how long: [Bimmerz support: privacy](/privacy).
