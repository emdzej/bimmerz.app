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
  (day) and set 2 (night) by the rain/light sensor.

It uses the unit's own I-Bus connection. No extra hardware, and no stock
module is changed; carbus is added next to them.

::: warning Status
carbus works in the NAVX emulator against emulated body, light, cluster
and PDC modules. **It has not been tried in a car yet.** For a first test
in the car, check the stock functions and the read-only screens before
using Lock / Unlock. Keep the stock V32 CD at hand — it is the way back.
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
  22 KB) and the [NAVX CLI](./user#command-line).
- A CD-R. The modified image is about 281 MB.

carbus comes in variants by body module, because the locking commands
differ: **E46** (ZKE5), **E38/E39/E52/E53 with GM5/GM6**, and **E38/E39
with GM1/GM4**. Each variant can open its screen with TEL and MENU hold,
or with MENU hold only (for cars with a phone or a BlueBus, where TEL
opens the phone screen).

## Building the update CD

```sh
navx cd --iso "BMW MKIV V32 Stock.iso" --add display_clock -o carbus.iso
```

`navx cd` adds the module to both BMW software sets and changes the
version in `sw_rel.tbl` (1000 → 1001). The unit's loader installs
software only when the disc's version differs from the one in flash. All
other files on the disc stay byte-identical; the command reads the whole
image back and checks every module before it finishes. `navboot` grows
by about 22 KB.

### Trying it first

Open the modified `.iso` on [navx.bimmerz.app](https://navx.bimmerz.app),
go to **Emulator** and press **Power on**. The **Car** panel under the
screen plays the car: open doors, switch lights, put it in reverse, set
speed, rpm, temperatures, fuel and the battery voltage. Use the bezel's
TEL button and dial as in the car.

## Installing and going back

Insert the modified CD as a software update. The loader compares the
disc's version (`1001`) with the unit's and installs the new `navboot`.

To remove carbus, insert the **stock V32 CD**. Its version (`1000`)
differs again, so the loader installs the stock software.

## Using it

### Opening the car screen

| On the BMBT | Does |
|---|---|
| **TEL** (press) | opens the car screen with its buttons |
| **MENU** (hold) | the same; a short MENU press stays the normal MENU |
| a door, lid or window opens | the car screen pops up for 10 s |
| reverse gear (PDC on) | the PDC view comes up |

![Popup when the rear-left window and a door open](/navx/car-popup.png)

A popup shows the state only. Any knob or button input closes it at once
and goes to the stock screen as usual.

### Buttons and the dial

With the buttons shown, carbus has the dial to itself; the stock screens
don't react until it closes.

| Control | Does |
|---|---|
| turn the dial | moves the orange focus |
| press the dial | runs the focused button |
| **Data** / **Car** | switches between the car screen and the data view |
| **Lock** / **Unlock** | central locking (all doors) |
| **Close** | back to the stock screen you came from |
| **MENU** | closes and goes on to the stock MENU |

The screen also closes after 30 s without input.

![Car screen with Lock focused](/navx/car-controls.png)

![After Lock: the title bar shows LOCKED](/navx/car-locked.png)

### The car screen

The car is seen from above, front to the left, driver's side (left-hand
drive) at the bottom.

| Shown | Meaning |
|---|---|
| door drawn swung out, red | door open |
| yellow bar along a door | that window open |
| bonnet / boot outline red | open |
| sunroof yellow | open |
| white headlamps, beams | low beam; long beams = high beam; short beams = front fogs |
| bright red rear lamps | parking / tail lights; the small one at the rear = rear fog |
| amber corners | indicators; both sides = hazard lights |
| title bar | `UNLOCKED`, `LOCKED`, `DOUBLE LOCKED` |

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

In reverse, four zones front and four at the rear show each sensor: grey
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

Choosing a set by hand in Settings holds until the light changes the
other way. The switch needs the **rain/light sensor** (cars with
automatic headlights). Modules can also be built to follow the low beam
instead, or with switching off.

Give the two sets their looks with the [Colours tool](./user): choose
**colour set 1** or **colour set 2** as the scope and apply a theme to
each, e.g. stock for the day and E46 Amber for the night, or use
`navx theme --set 2 --theme amber` on the command line.

## Limits and known risks

- **Not tested in a car.** The message layouts come from community
  documentation (Wilhelm, BlueBus, the I-BUS app) and the emulator.
  Unverified: the E46 lock-all job, the light bits, the PDC sensor order,
  the fuel byte on an E46 cluster.
- **No window or sunroof control** — the body module's jobs for them are
  not documented anywhere carbus could use.
- **Day/night switching** has been checked only with an emulated rain/light
  sensor. In the car it depends on the sensor's messages reaching the
  nav, which isn't verified yet. After a switch, the screen that is up
  repaints only where it changes; the next screen is fully in the new
  colours.
- On a 16:9 unit that has booted before, a theme on colour set 1 at full
  screen doesn't show: the unit keeps its first copy of that table.
- If carbus stopped while its buttons were up, the BMBT would stay
  disconnected from the stock screens until the unit restarts.
- Screen size: built for the 16:9 BMBT layout (400 × 234). The 4:3
  layout has not been checked.
- Oil temperature and engine power (shown by some phone apps) are not
  available: the engine's control unit isn't on the I-Bus.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| TEL opens the phone screen | a phone or BlueBus is fitted: use the MENU-hold-only variant |
| Lock / Unlock do nothing | the variant doesn't match the car's body module |
| no car screen at all | the unit had no display memory for the extra page, or the update wasn't installed (check the CD's version differs) |
| values show `--` | the car hasn't sent that message yet (ignition on, engine running) |
