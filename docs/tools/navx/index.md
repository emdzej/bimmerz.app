# NAVX

> Tools for the BMW MK4 navigation computer — edit the software on the
> V32 CD, run it in an emulator, and add your own functions to the stock
> unit.

The MK4 is the DVD-era navigation computer in the boot of an E38, E39,
E46, E52 or E53. Its software lives on an update CD, and for twenty years
the only way to touch it was NavTweak and NavSpeak, two Windows tools from
2006. I wanted the same on any OS — and then I wanted more than colours.

So what does NAVX do? First — it reads and edits the V32 software: the
module pools, colour tables, icons and bitmaps, and the voice prompts.
Second — it runs that software in an emulator, in your browser, with a
working BMBT, an I-Bus and a car around it. Third — it builds an update CD
with new code inside, so the stock unit gains functions it never had: a
car screen with doors, windows, lights and central locking, a parking
distance view in reverse, and driving data the on-board computer doesn't
show. No extra box behind the dash.

![The car screen, drawn by the stock unit](/navx/car-controls.png)

Is it safe? The writers re-check every module before saving. The first car
disc still bricked a unit: one module's size wasn't a multiple of four, the
kernel crashed on every boot, and that takes a flash programmer to fix. Now
every disc boots on an emulated board first — BMW's own boot loader and
kernel, the emulator's "emulated board" — before it goes near a car. The stock CD
is the way back to stock software, as long as the unit still boots. If you
try it, let me know.

## How to use it

**In your browser** — [navx.bimmerz.app](https://navx.bimmerz.app). Open
the V32 CD image (or a `navboot`) once, then use the **Tools** (colours,
images, modules, voices) or the **Emulator**. Everything stays on your
machine.

**On the command line** — the `navx` CLI does the same and more: themes,
voice export/import, building modules from C, and building the modified
update CD. See the [user guide](./user).

**The new firmware** — [Car functions (carbus)](./carbus) is the manual:
how to install it, which buttons open what, and every screen. It's coming
soon as a closed beta.

**A new look** — [New firmware](./shell) shows where it's going: our own
screens for the whole unit, operated with the knob alone.

## Links

- [GitHub](https://github.com/emdzej/navx) — source, docs, issues.
- [User guide](./user) · [Car functions manual](./carbus) · [New firmware](./shell) · [Developer guide](./developer)
