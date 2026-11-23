# Car functions (carbus) — manual

carbus is an add-on for the stock MK4 navigation software (V32). It is
built into the unit's `navboot` on a modified update CD and adds:

- a **car screen**: doors, windows, bonnet, boot, sunroof, lights and the
  central-locking state, drawn on the nav screen;
- **Lock / Unlock** from the BMBT dial;
- a **data view**: speed, rpm, coolant and outside temperature, fuel,
  battery voltage, odometer, gear, engine and handbrake;
- a **PDC view** in reverse: parking-sensor distances front and rear;
- a **popup** of the car screen when a door, lid or window opens;
- **day and night colours**: switches the nav between colour set 1
  (day) and set 2 (night) by the rain/light sensor, or by sunset and
  sunrise from the nav's GPS;
- a **Setup page** for its own settings, kept in the unit.

It uses the unit's own I-Bus connection, with no extra hardware. carbus
runs next to the stock software. For the **Car** entry in the MENU, the
disc build also changes two stock parts in place: the MENU module
(`device_dialog`) and the seven language modules (`Lng_*`, for the
entry's label). The modules keep their sizes, and the build applies the
changes only if they match the stock V32 modules exactly. Like the rest
of the disc, they're built from your own CD; no BMW software is shipped.

::: warning Status
carbus works in the NAVX emulator against emulated body, light, cluster
and PDC modules. **It isn't working in a car yet.** An early test build
made the unit boot-loop: its module had a size the unit's kernel can't
load past, so the unit restarted before its software started. That is
fixed: every module is now padded to the size the kernel needs, and every
disc is checked before release by booting the unit's real boot loader and
kernel in the emulator. The stock V32 CD takes a unit back only while
its software still starts; a disc that stops it from starting can't be
undone from the CD. So try every disc in the emulator first, and do the
first car test on a spare unit.
:::

## Getting carbus

**Coming soon — closed beta.** carbus will be offered as the module for
your car plus a tool that adds it to **your own** V32 CD image. No BMW
software is distributed: the disc is built from the CD you own.

A module can be built for **one car**: it reads the VIN from the light
module when the ignition is on, and works only in the car it was built
for. In another car it stays inactive and leaves the stock software as
it is. Modules can also be built without this limit.

## Requirements

- A BMW MK4 unit running the V32 software (BMW sets `V_2/RR/0101/BMWC01S`
  and `BMWM01S`).
- Your own stock V32 software CD image (`.iso`). carbus doesn't ship any
  BMW software: you build the update disc from your CD.
- The carbus module for your car (a file named `display_clock`, about
  32 KB) and the [NAVX CLI](./user#command-line).
- A CD-R. The modified image is about 281 MB.

carbus comes in variants by body module, because the locking commands
differ: **E46** (ZKE5), **E38/E39/E52/E53 with GM5/GM6**, and **E38/E39
with GM1/GM4**. The car screen opens from **MENU → Car**, or with TEL.

## Building the update CD

```sh
navx cd --iso "BMW MKIV V32 Stock.iso" --add display_clock --version 1003 -o carbus.iso
```

`navx cd` adds the module to both BMW software sets and writes the
version into `sw_rel.tbl`. It doesn't add the MENU's **Car** entry: that
comes with the carbus build tool. Without it, TEL opens the car screen. The unit's loader installs software only when
the disc's version differs from the one in flash, so give every disc a
version that unit hasn't had before (stock is 1000). All
other files on the disc stay byte-identical; the command reads the whole
image back and checks every module before it finishes. `navboot` grows
by about 32 KB.

Before a disc goes near a car, boot it on the emulated board, which runs
the unit's real boot loader and kernel:

```sh
navx flash --cd carbus.iso /tmp/flash
navx lowboot --cd carbus.iso --flash /tmp/flash --kernel
```

It must start the kernel and keep running without a restart.

### The serial console

A disc can also make the unit's serial port its **console**, so a first
test on a spare unit leaves a boot log: the boot loader's messages and
the start-up messages of the unit's software. The port runs at
**19200 baud**. The level is most likely RS-232: the board has RS-232
transceivers, but the pins haven't been traced. In exchange, the BMW
service protocol that normally runs on that port doesn't start, so
service tools that talk to the unit over it won't connect while the
console is on.

The console is **off unless you ask for it**: the carbus build tool and
`navx cd` leave those settings stock, and `--console` turns it on. Both
warn when you do, because it is **permanent**: once a unit has installed
such a disc, no disc turns the console off again (see
[Installing and going back](#installing-and-going-back)). Use it on a
spare unit only:

```sh
navx cd --iso "BMW MKIV V32 Stock.iso" --add display_clock --console --version 1003 -o carbus.iso
```

Only two settings in the disc's configuration archive change, which keeps
its size; every other file in it stays byte for byte. In the emulator,
`navx lowboot --cd carbus.iso --flash /tmp/flash --kernel --console none`
(no console of the emulator's own) then shows the start-up messages from
the disc's settings alone. A stock disc shows nothing there.

### Trying it first

Open the modified `.iso` on [navx.bimmerz.app](https://navx.bimmerz.app),
go to **Emulator** and press **Power on**. The **Car** panel under the
screen plays the car: open doors, switch lights, put it in reverse, set
speed, rpm, temperatures, fuel and the battery voltage. Use the bezel's
TEL button and dial as in the car.

## Installing and going back

Insert the modified CD as a software update. The loader compares the
disc's version with the unit's and installs the new `navboot`.

To remove carbus, insert the **stock V32 CD**. Its version (`1000`)
differs again, so the loader installs the stock software.

A serial console from a `--console` disc stays on after that. The
unit's loader keeps a setting the unit already has when a disc only
offers a default, and the stock disc's service protocol setting is such
a default. A disc made without `--console` doesn't touch these settings.

On a 16:9 unit, choose **Setup → Day colours → Stock** before going back
to stock. Otherwise the day colours at full screen stay themed, because
the unit keeps its saved copy and the stock software never changes it. This needs the
unit's software to start: the running software is what notices the disc
and switches to the loader.

## Using it

### Opening the car screen

| On the BMBT | Does |
|---|---|
| **MENU → Car** | opens the car screen with its buttons |
| **TEL** (press) | the same |
| **MENU** | always the stock MENU, holds included (the service mode too); with the car screen up, it closes it and goes on to the MENU |
| a door, lid or window opens | the car screen pops up for 10 s |
| reverse gear (PDC on) | the PDC view comes up |

![Popup when the rear-left window and a door open](/navx/car-popup.png)

A popup shows the state only. Any knob or button input closes it at once
and goes to the stock screen as usual.

**Car** is in the MENU after the entries your car has, before Set. It's
labelled "Car" in every language for now.

### Buttons and the dial

With the buttons shown, carbus has the dial to itself; the stock screens
don't react until it closes.

| Control | Does |
|---|---|
| turn the dial | moves the cursor |
| press the dial | runs the focused button |
| **Data** / **Car** | switches between the car screen and the data view |
| **Lock** / **Unlock** | central locking (all doors) |
| **Setup** | carbus's settings ([below](#setup)) |
| **Close** | back to the stock screen you came from |
| **MENU** | closes and goes on to the stock MENU |

The screen also closes after 30 s without input.

![Car screen with Lock focused](/navx/car-controls.png)

![After Lock: the title bar shows Locked](/navx/car-locked.png)

### The look

carbus's screens are drawn like the nav's own menus: the same title bar,
list rows, cursor and fonts, in the colours of the colour set that's
showing. They change with **Settings → Colour set**, with carbus's own
day/night switch, and with a theme from the [Colours tool](./user)
(amber, M or your own). The carbus disc comes with **M** on colour set 1
(day) and **E46 Amber** on set 2 (night). While the unit starts, it shows
the bimmerz ///B logo in place of the BMW one.

The unit keeps a saved copy of the day colours from its first start. On
a unit that had run the stock software, carbus updates that copy once, so
the day theme shows on every screen layout. It keeps the original first,
and **Setup → Day colours → Stock** puts it back. Only the car's own signals keep fixed colours:
open doors red, open windows yellow, lamps, and the PDC zones.

carbus redraws its screen only when what it shows changes (a door, a
value, the lock state, the colours) or when you press a button or turn
the dial, so a screen that stays the same doesn't flicker or load the
unit.

![The car screen on the stock, amber and M colour themes](/navx/car-themes.png)

### The car screen

The car is seen from above, front to the left, driver's side (left-hand
drive) at the bottom. It's drawn as your model and body, at its real
length and width: **E46** Sedan, Coupe, Convertible, Touring or Compact;
**E39** Sedan or Touring; **E38**; **E53 X5**; **E52 Z8**. Pick yours in
**Setup → Body**. Coupés and convertibles show two doors, estates and the
X5 a tailgate and roof rails, the open cars their seats. The outlines are
traced from blueprints by [getoutlines.com](https://getoutlines.com)
(CC BY 4.0).

| Shown | Meaning |
|---|---|
| door drawn swung out, red | door open |
| yellow bar along a door | that window open |
| bonnet / boot outline red | open |
| sunroof yellow | open |
| white headlamps, beams | low beam; long beams = high beam; short beams = front fogs |
| bright red rear lamps | parking / tail lights; the small one at the rear = rear fog |
| amber corners | indicators; both sides = hazard lights |
| title bar | `Unlocked`, `Locked`, `Double locked` |

### The data view

![The data view](/navx/data.png)

Values the stock on-board computer doesn't show. Range, consumption,
average speed and the clock stay in the stock on-board computer.

| Value | From |
|---|---|
| speed, rpm | the cluster's broadcast (every few seconds while driving) |
| coolant, outside temperature | the cluster |
| fuel (litres) | the cluster; later clusters only, otherwise `--` |
| battery | a status read from the light module, about every 3 s while the view is up |
| odometer, gear, engine, handbrake | the cluster |

A value shows `--` until the car has sent it.

### The PDC view

![The PDC view in reverse](/navx/pdc.png)

In reverse, four zones front and four at the rear show each sensor: dark
up to the obstacle, then **red** (under 40 cm), **yellow** (under 80 cm)
or **green**. The nearest distance at each end is shown at the top. The
view closes 2 s after reverse; any button press dismisses it until the
next time.

### Day and night colours

The stock software has two colour sets, chosen in **Settings → Colour
set 1 / 2**. With carbus, set 1 is for the day and set 2 for the night,
and carbus switches between them:

| Light | carbus |
|---|---|
| dark for 30 s (rain/light sensor: darkest level, or lights requested at twilight or in darkness) | colour set 2 |
| light again for 60 s | colour set 1 |
| a short tunnel or underpass | no change |

The whole screen that's up changes to the new colours at once, map and
menus alike, as after a change in Settings.

**Without a rain/light sensor** (or while it reports nothing or a fault)
carbus goes by the sun: set 2 from sunset to sunrise where the car is,
worked out from the nav's GPS position and time, to within a couple of
minutes. Without GPS reception, for example in a garage, it uses the
last position and the unit's clock. Before the very first GPS fix after
installing, it can't tell and leaves the colours as they are.

Choosing a set by hand in Settings holds until the light changes the
other way. On the [Setup](#setup) page the source can be set to the sun
only, the low beam, or off; the delays are set there too.

The carbus disc comes with M for the day (set 1) and E46 Amber for the
night (set 2), on both screen formats. To change them, use the [Colours
tool](./user): choose **colour set 1** or **colour set 2** as the scope
and apply a theme to each, or use `navx theme --set 2 --theme amber` on
the command line.

### Setup

**Setup** on the car screen opens carbus's settings. Turn the dial to a
row and press it for the next value. **Back**, MENU, or 30 s without
input saves and leaves.

![The Setup page](/navx/car-setup.png)

| Row | Choices |
|---|---|
| Day/night | Sensor or sun (default: the rain/light sensor, the sun without one), Sun, Low beam, Off |
| Night after | 10, 30 (default), 60, 120 s of darkness |
| Day after | 10, 30, 60 (default), 120, 300 s of daylight |
| Night colours | Set 2 (default; day is set 1), or Set 1 (day is set 2) |
| Door popup | On (default): the car screen pops up when a door, lid or window opens; Off |
| PDC view | On (default): the PDC view in reverse; Off |
| Body | the car drawn: E46 Sedan (default for E46), Coupe, Convertible, Touring, Compact, E39 Sedan (default for the other variants), E39 Touring, E38, E53 X5, E52 Z8 |
| Day colours | Theme (default): the disc's day colours everywhere; Stock: the unit's own saved day colours back. Shows `--` until carbus has saved a copy of them |
| Light now | shown only: what the sensor reports, or the sun's height in degrees while the sun decides, and whether carbus counts it as day or night |

Six rows show at a time, as in the stock Settings; the list scrolls as
you turn, and the arrows in the left column show there's more.

The settings are kept in the unit's settings memory, next to the stock
ones (such as the colour set), and are used from then on. If they can't
be read, carbus uses its defaults. For the sun, carbus also keeps the
car's last GPS position there, rounded to about 10 km. It writes it
again only after the car has moved about 100 km, or when the unit's
clock has changed.

## Limits and known risks

- **Cars with a phone or a BlueBus:** TEL belongs to the phone there; use
  **MENU → Car**. The MENU has room for both the Telephone entry and Car,
  but this hasn't been checked with a phone fitted, in the emulator or
  in a car.
- **Not working in a car yet** (see Status above). The message layouts come from community
  documentation (Wilhelm, BlueBus, the I-BUS app) and the emulator.
  Unverified: the E46 lock-all job, the light bits, the PDC sensor order,
  the fuel byte on an E46 cluster.
- **No window or sunroof control** — the body module's jobs for them are
  not documented anywhere carbus could use.
- **Day/night switching** has been checked only in the emulator, with an
  emulated rain/light sensor and GPS. In the car it depends on the
  sensor's messages reaching the nav, and on the nav's GPS data being
  what the emulator shows; neither is verified yet. Sunset and sunrise
  are within a couple of minutes (about five near the polar circle).
- **Settings kept over a power-off** follow the stock software's own
  saving, which happens when the unit powers down; this hasn't been seen
  in a car yet. If a choice doesn't stick, set it again and report it.
- If carbus stopped while its buttons were up, the BMBT would stay
  disconnected from the stock screens until the unit restarts.
- The stock look needs the nav's own colours and fonts. On software
  carbus doesn't recognise, it falls back to its own colours and a small
  built-in font; it still works.
- Screen size: built for the 16:9 BMBT layout (400 × 234). The 4:3
  layout has not been checked.
- Oil temperature and engine power (shown by some phone apps) are not
  available: the engine's control unit isn't on the I-Bus.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| TEL opens the phone screen | a phone or BlueBus is fitted: use MENU → Car |
| no Car in the MENU | the disc was made with plain `navx cd` (no MENU entry), or the MENU had no free place |
| Lock / Unlock do nothing | the variant doesn't match the car's body module |
| no output on the serial port | the port isn't at 19200 baud, or the disc was built without `--console` (the default) |
| no car screen at all | the unit had no display memory for the extra page, or the update wasn't installed (check the CD's version differs) |
| values show `--` | the car hasn't sent that message yet (ignition on, engine running) |
| colours don't switch | Setup → day/night colours is off or on low beam; without a rain/light sensor, the nav hasn't had a GPS fix yet since installing. "light now" shows `--` while carbus has neither |
