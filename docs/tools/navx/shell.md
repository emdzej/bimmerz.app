# New firmware

> A new look for the whole unit: the stock modules that do the work stay,
> the screens you use are replaced. Work in progress — nothing to install yet.

The [car functions](./carbus) add screens to BMW's software. This goes
further. What if the MENU, the radio screen, the settings and the pop-ups
were all ours, drawn the same way, and the stock parts — the kernel, the
drivers, the I-Bus plumbing — just kept doing their job underneath?

That's the plan. Today it's a working mockup called shellx: it runs as an
app from the Apps menu, in the emulator and on a real unit, with made-up
data where the real data isn't wired yet. The screenshots below come
straight from the emulator, pixel for pixel.

![shellx's home screen in an E46](/navx/shell/advert-v8.jpg)

*A mockup: the car photo is retouched and the screen is pasted in. The
screen itself isn't drawn by hand, though — it's shellx's real output,
captured from the software running in the emulator.*

And here it is on a real unit:

<div style="position:relative;padding-top:56.25%;margin:1em 0">
  <iframe src="https://www.youtube-nocookie.com/embed/w4YjZ5OKI8k?start=44" title="shellx running on a real MK4 unit" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

[Watch on YouTube](https://www.youtube.com/watch?v=w4YjZ5OKI8k&t=44s)

## Two flavours

Not everyone wants the same thing, so the firmware comes in two.

**Classic** keeps BMW's software as it is and adds what NAVX already does:
apps, updates over the serial port, the car screen. BMW's navigation stays,
and so do the OpenStreetMap discs we're building for it.

**Modern** replaces BMW's screens with these. The stock modules the unit
needs keep running; the rest is ours. Full GPS navigation isn't in it —
your phone does that better, and I'd rather not pretend otherwise. What's
there instead is a GPS page (below).

## Home

The menu sits on the left, the selected function on the right, live:
Audio, Car, Phone, Apps, Television, Navigation, Diagnostics and Settings.
Seven rows fit; the list scrolls for the eighth, with a marker on the
right. Phone and Television only show up when the car actually has them —
a phone module (or, later, our ESP32 dongle) or a TV module heard on the
bus.

![Home: the menu and the radio beside it](/navx/shell/home.png)

![The menu scrolled to Settings](/navx/shell/home-settings.png)

## Turn and press, nothing else

Everything works with the knob alone: turn to move, press to choose.
MENU always takes you home, as on the stock unit. Back is not a button —
it's the first stop on every screen, the ‹ next to the title, so you turn
to it and press. There's nothing you have to hold.

Why so strict? Because three inputs are easy to get from somewhere else.
The steering-wheel buttons could drive the same screens later, without a
second way of doing things.

## Split or full screen

A function opens beside the menu or on the whole screen, whichever suits
it, and the expand icon switches between the two. Back steps up one level:
full, split, home.

## Audio

The radio screen is a display, not a remote. The BMBT's own buttons already
tune, seek and store presets, and they go to the radio directly — so the
screen doesn't repeat them. It shows what the radio reports and nothing it
doesn't: a large frequency, the band and which preset is playing. A row
of preset boxes would only repeat the buttons, so it isn't there. The CD
screen does the same with disc and track and how many discs the magazine
holds; there's no CD text, because the changer doesn't send any.

![The radio on the full screen](/navx/shell/audio-full.png)

![The CD changer](/navx/shell/audio-cd.png)

## Car

The car and the on-board computer are one place, in four parts. **Status**:
doors, windows, lock and lights. **Trip**: range, consumption, average
speed, arrival, the speed limit and the stopwatch — the cluster's own
values. **Data**: coolant, battery, outside temperature, speed and revs.
**Settings**.

![Car: doors, windows and the lock](/navx/shell/car-status.png)

![Car: the trip values](/navx/shell/car-trip.png)

## Phone

![Phone: Messages, Contacts and Favourites beside the menu](/navx/shell/phone.png)

One Phone page, whatever the phone is. A phone module in the car — BMW's
or a BlueBus — builds its own screens and sends them as text for the
stock nav to draw; it doesn't hand over contacts as such. Modern reads
those screens instead and fills its own: the directory becomes
Contacts, the phone's top-8 becomes Favourites, and the call shows who,
the state and the time. Picking a contact makes the phone hold it, and
the TEL button dials, as in the stock software. A screen we can't map
yet shows as a plain list.

![Contacts](/navx/shell/contacts.png)

![A contact with several numbers](/navx/shell/contact-numbers.png)

With our own adapter later, the unit gets the phone's data directly, so
the same page also gets recent calls with in, out and missed.

*A mockup from the emulator, with made-up names: nothing is sent to a
phone yet.*

## Settings without holding buttons

Press a value and its choices appear beside it, with Cancel at the end.
Turn to choose, press to take it. Leave it for 15 seconds and nothing
changes.

![Setting the speed limit](/navx/shell/settings-edit.png)

## Navigation, honestly

Instead of route guidance, a GPS page: your speed in large numbers, heading on a compass,
coordinates, altitude and satellites, and an arrow with the distance to a
place you saved — home, the car park, wherever. Later a trip log you can
copy off over the serial port.

![The GPS page](/navx/shell/gps.png)

## Diagnostics

Our own tools, built in: the I-Bus monitor now, then INPA, coding and ECU
flashing. The last three talk to the car over the K-line, so they need the
diagnosis cable; the list says which ones.

![Diagnostics: the built-in tools](/navx/shell/diagnostics.png)

![INPAX live values (a mockup)](/navx/shell/inpax.png)

## Pop-ups, messages and parking

Door and window notes appear over whatever is on the screen, and reverse
gear brings up the parking distance view. Messages — an SMS from the
phone, or a note from the firmware itself — arrive the same way: press to
read, turn to dismiss. While you're moving, you only see who it's from;
the text waits until you stop (or a setting says otherwise). What you
missed stays under Phone, with a badge in the status bar. With a phone
module in the car, the nav only learns that an SMS arrived (the phone's
icon), so the note says "A new message on the phone"; message texts come
with our own adapter.

![A door note](/navx/shell/door-note.png)

![A message arriving](/navx/shell/message.png)

![Parking distance](/navx/shell/pdc.png)

## Day, night and old screens

Every screen has a night version, used after dark. These monitors are
twenty years old — blacks are grey and whites lean warm — so every colour
pair is checked against that, and text stays readable on the real LCD, not
just in a screenshot.

![The radio at night](/navx/shell/audio-night.png)

Prefer a sportier look? Settings › Theme has **M inspired**: a thin
light-blue, dark-blue and red stripe under the status bar and a blue
focus, on the same dark background. It passes the same contrast checks,
day and night. A theme is a small data module, so more can be added later
without a new firmware.

![M inspired: home](/navx/shell/home-m.png)

![Settings › Theme](/navx/shell/settings-theme.png)

## The font

The stock fonts are BMW's, and a font scaled down from a computer font
looks mushy at this size — uneven strokes, holes between letters. So the
text is drawn in a bitmap font of our own, pixel by pixel on the unit's
400 × 234 grid. It covers the accented letters of the European languages
written in Latin script — Polish, Czech, Hungarian, German, French, Nordic
and the rest — and names that don't fit end in "…" rather than shrinking.

## Alongside BlueBus

A car may already have a [BlueBus](https://www.bluebus.dev/). The new
firmware must never fight it:

- It plays the CD changer or the phone on the I-Bus only when nothing
  else answers there, so an installed BlueBus keeps both roles. With
  BlueBus playing, the Audio page shows Bluetooth and BlueBus's track text.
- Features both can do (comfort indicators, welcome and follow-me-home
  lights, auto lock, cluster texts) are off on our side, with the hint
  "BlueBus does this", once BlueBus is detected or Settings › "BlueBus
  installed" is on. The user can still switch ours on.
- It never writes to the cluster's number display while BlueBus does.

*Planned: how BlueBus is recognised on the bus is being worked out; none
of this has run in a car with a BlueBus yet.*

## For developers

Apps draw inside the same frame: the shell owns the status bar, the knob
and the pop-ups, and an app draws its area. The guidelines, the SDK and
the API are documented at [sdk.navx.bimmerz.app](https://sdk.navx.bimmerz.app).

If you have ideas for a screen, let me know.
