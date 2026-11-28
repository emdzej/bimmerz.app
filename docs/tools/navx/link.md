# NavX Link: build your own

The nav computer's serial port (t1, on X1312) is how NavX talks to a
computer, and with the right cable it is also the unit's way to the car's
K-line. There are four levels, each built from the one before. All of
them are do-it-yourself, from modules you can buy, plus a few parts.

| Level | What it is | What it gives you |
|---|---|---|
| 0 | A USB RS-232 cable | The serial console from a laptop: updates, `navx serial`, logs |
| 1 | Link Lite, the K-line cable: RS-232 → K-line, to the OBD socket | The unit reaches the car's modules over the K-line (diagnosis apps on the unit) |
| 2 | NavX Link: level 1 with an ESP32-C3 in the middle | Both at once: the K-line plus a wireless link to a phone or computer (updates over Bluetooth, gamepads, the unit online) |
| 3 | NavX Link + Audio: level 2 on an ESP32-S31, plus a DAC | Also Bluetooth audio into the radio's CD changer input |

*Levels 1–3 are designs: nothing here has been built and tested in a car
yet. Each section says what comes from a datasheet and what is still a
guess. Level 0 is the cable we use every day.*

None of the levels connects to the I-Bus. The nav computer is already on
it; for Link + Audio it plays the CD changer and the phone there itself,
and the board only sends it data over t1.

## Level 0: the serial cable

A USB RS-232 adapter wired to X1312: see
[Connecting to the serial port](./user#connecting-to-the-serial-port).
This is all you need for updates and the serial tools.

## Level 1: Link Lite, the K-line cable

The unit's port is RS-232, the K-line is a 12 V single-wire bus, so the
cable needs two converters: RS-232 → logic level (a MAX3232 module), and
logic level → K-line (an L9637D transceiver). Power comes from the OBD
socket.

```elmo
title "Level 1: Link Lite (K-line cable)"

part J1 connector "X1312 (nav computer)" { right 8:TX 9:RX 17:GND 18:GND }
part U1 connector "MAX3232 module" { left R1IN T1OUT right R1OUT T1IN top VCC bottom GND }
part U2 ic "L9637D" link="https://www.st.com/en/automotive-analog-and-power/l9637.html" {
  left 4:TX 1:RX
  right 6:K
  top 3:VCC 7:VS
  bottom 5:GND
}
part U3 connector "Buck 12 → 5 V" { left IN+ IN- right OUT+ OUT- }
part F1 fuse 500mA
part R1 res 510
part SW1 switch_spst "bridge 7–8"
part J2 connector "OBD-II plug" { left 7:K 8:K2 16:+12V 4:CGND 5:SGND }

wire J1.TX -- U1.R1IN
wire U1.T1OUT -- J1.RX
wire U1.R1OUT -- U2.TX
wire U2.RX -- U1.T1IN
net KLINE = U2.K R1.1 J2.K SW1.1
wire SW1.2 -- J2.K2
wire J2.+12V -- F1.1
net VBAT = F1.2 U2.VS R1.2 U3.IN+
power 5V = U3.OUT+ U1.VCC U2.VCC
gnd GND = J1.17 J1.18 U1.GND U2.GND U3.IN- U3.OUT- J2.CGND J2.SGND

group "Power from the OBD socket" { U3 F1 }
group "OBD-II" { J2 SW1 }
```

Parts:

- **MAX3232 module**: the common 3.3–5 V board with the four charge-pump
  capacitors on it. Use its RS-232 side (R1IN, T1OUT) towards X1312 and
  its logic side (R1OUT, T1IN) towards the L9637D. The pin numbers drawn
  on the module are only for the drawing; go by the labels.
- **L9637D** (SO-8; on an SO-8 adapter board), or the L9637 in DIP-8: the
  same chip, same pin numbers. From the
  [ST datasheet](https://www.st.com/en/automotive-analog-and-power/l9637.html):
  VS 4.5–36 V (40 V transients), protected against reverse battery
  down to −24 V; VCC 3–7 V; TX is TTL-compatible (high from 2.5 V);
  TX, RX and LO have pull-ups inside, so no resistors are needed there.
  LI and LO (the L-line) stay unconnected.
- **R1, 510 Ω** from K to VS: the pull-up of the datasheet's ISO 9141
  application circuit (it must be 5 kΩ or less). Add 100 nF from VCC and
  from VS to GND, close to the chip.
- **Buck converter, 12 → 5 V**: any small module that takes up to 28 V
  in (e.g. MP1584), set to 5 V before you connect anything.
- **F1, 500 mA** in the +12 V line.
- **OBD-II plug**: pin 7 K-line, 16 +12 V, 4 and 5 ground.
- **SW1, the 7–8 bridge**: some older cars carry the engine and gearbox
  on a second line, pin 8. Close it only to reach those; leave it open
  otherwise. Cars with only the round 20-pin socket under the bonnet need
  the usual 20-pin to OBD-II adapter.

X1312 is the same connector as for level 0: pin 8 is the unit's TX,
pin 9 its RX, 17 and 18 ground (connect both). It takes MQS contacts
(e.g. TE / AMP `5-928999-1`).

You can also take the power at the nav computer instead of the OBD
socket, from X1313 (blue): pin 1 is +12 V from the battery (not
switched), 10 and 11 ground. That works best for a board that lives
behind the unit. The F1 fuse still goes in the +12 V line, and
everything about the OBD pin 16 draw below applies here too. Use good
splice connectors, e.g. BMW p/n 61138364566 (TE / AMP `0-1393431-1`).

Notes:

- The K-line echoes everything the unit sends, as every K-line cable
  does; diagnosis software expects that.
- OBD pin 16 is live with the car off. The cable draws well under 1 mA
  from the datasheets (L9637D off: 120 µA), but many MAX3232 modules have
  a power LED that draws more than the rest together: take it off, or
  unplug the cable when the car stands for weeks.
- While this cable is on t1, the serial console isn't: t1 is one port.
  Level 2 removes that limit.

## Level 2: NavX Link

The same cable with an ESP32-C3 between the two converters. The ESP32
talks to the unit on one UART and to the K-line on the other, so the unit
gets both the K-line and a wireless link to a phone or computer over the
one port, through NavX's serial protocol. Everything runs at 3.3 V: the
L9637D is fine with VCC = 3.3 V and a 3.3 V TX (datasheet above), so no
level shifter.

```elmo
title "Level 2: NavX Link (ESP32-C3)"

part J1 connector "X1312 (nav computer)" { right 8:TX 9:RX 17:GND 18:GND }
part U1 connector "MAX3232 module" { left R1IN T1OUT right R1OUT T1IN top VCC bottom GND }
part U4 connector "ESP32-C3 SuperMini" { left GPIO4/RX GPIO5/TX right GPIO7/TX1 GPIO6/RX1 top 5V 3V3 bottom GND }
part U2 ic "L9637D" link="https://www.st.com/en/automotive-analog-and-power/l9637.html" {
  left 4:TX 1:RX
  right 6:K
  top 3:VCC 7:VS
  bottom 5:GND
}
part U3 connector "Buck 12 → 5 V" { left IN+ IN- right OUT+ OUT- }
part F1 fuse 500mA
part R1 res 510
part SW1 switch_spst "bridge 7–8"
part J2 connector "OBD-II plug" { left 7:K 8:K2 16:+12V 4:CGND 5:SGND }

wire J1.TX -- U1.R1IN
wire U1.T1OUT -- J1.RX
wire U1.R1OUT -- U4.GPIO4/RX
wire U4.GPIO5/TX -- U1.T1IN
wire U4.GPIO7/TX1 -- U2.TX
wire U2.RX -- U4.GPIO6/RX1
net KLINE = U2.K R1.1 J2.K SW1.1
wire SW1.2 -- J2.K2
wire J2.+12V -- F1.1
net VBAT = F1.2 U2.VS R1.2 U3.IN+
power 5V = U3.OUT+ U4.5V
power 3V3 = U4.3V3 U1.VCC U2.VCC
gnd GND = J1.17 J1.18 U1.GND U4.GND U2.GND U3.IN- U3.OUT- J2.CGND J2.SGND
group "OBD-II" { J2 SW1 }
group "Power from the OBD socket" { U3 F1 }
```

- **ESP32-C3 SuperMini** (or any ESP32-C3 board): 5 V in from the buck,
  its own 3.3 V regulator feeds the MAX3232 module and the L9637D's VCC.
  The C3 has two UARTs and can put them on any GPIO; the K-line pins
  drawn are a suggestion, the firmware sets them. Keep clear of the C3's strapping pins (GPIO2, 8, 9).
- The C3 has Bluetooth LE but no Classic Bluetooth, so no audio: that is
  level 3.
- An ESP32 awake draws tens of milliamps, which would drain the battery
  from OBD pin 16 within days, so the board goes into deep sleep: when
  the nav computer tells it to (the car is going to sleep), or when t1
  has been quiet for a while. The first byte from the unit wakes it.
  That's why the unit's line goes to GPIO4: on the C3 only GPIO0–5 can
  wake it from deep sleep. The sleep is in the Link firmware, still in
  development; until then, unplug it when you park.

The board's firmware and the protocol are in development.

### Setting up the board

The board brings up its own Wi-Fi, `NavX-Link-` and four characters,
with the password `navxlink`. Every new board has that one, and a
factory reset brings it back, so change it first: the setup page asks
until you do. Join it from a phone and its setup page opens (or go to
`192.168.4.1`).

<div class="phone-shots">
  <figure><img src="/navx/link/portal-status.png" alt="Status: the nav computer, the K-line, Wi-Fi and Bluetooth"><figcaption>Status</figcaption></figure>
  <figure><img src="/navx/link/portal-wifi.png" alt="Wi-Fi: the board's access point and a network to join"><figcaption>Wi-Fi</figcaption></figure>
  <figure><img src="/navx/link/portal-bluetooth.png" alt="Bluetooth: paired devices and what may connect"><figcaption>Bluetooth</figcaption></figure>
  <figure><img src="/navx/link/portal-car.png" alt="Car: the K-line for the unit"><figcaption>Car</figcaption></figure>
  <figure><img src="/navx/link/portal-power.png" alt="Power: when the board sleeps"><figcaption>Power</figcaption></figure>
  <figure><img src="/navx/link/portal-update.png" alt="Update: new board firmware from a file"><figcaption>Update</figcaption></figure>
  <figure><img src="/navx/link/portal-system.png" alt="System: name, settings password, restart and reset"><figcaption>System</figcaption></figure>
</div>

| Page | What you set |
|---|---|
| Wi-Fi | When the board's access point is on (always, the first 10 minutes after it starts, or off), its name, password and channel; a network to join, e.g. your phone's hotspot, so the unit can go online |
| Bluetooth | Paired devices, and what may connect: the NavX app, game controllers, and on Link + Audio music from your phone |
| Car | Whether the unit may use the K-line through the board |
| Power | Sleep when the nav computer says so, or after it has been quiet for a while; no sleep while someone is on the page |
| Update | New board firmware from a `.bin` file; it's checked before the board switches to it |
| System | The board's name, a password for changing settings, restart, factory settings |

*Shots from the board's firmware run on a laptop with sample data; it
hasn't been on a board yet. Bluetooth pairing comes with a later board
firmware.*

## Level 3: NavX Link + Audio

Level 2's wiring with an ESP32-S31 in the C3's place (it has Classic
Bluetooth for A2DP, plus BLE and Wi-Fi), and an I2S DAC whose line output
goes into the radio's CD changer input. Until the S31 is easy to get, the
proof of concept runs on a classic ESP32 with the same DAC module.

```elmo
title "Level 3: NavX Link + Audio (the audio part)"

part U4 connector "ESP32 (PoC; ESP32-S31 later)" { right GPIO26/BCK GPIO25/WS GPIO22/DOUT top 5V bottom GND }
part U5 connector "PCM5102A module" { left BCK LCK DIN SCK right L R AGND top VIN bottom GND }
part J3 connector "Radio (CD changer input)" { left 8:CDC_L 9:CDC_R 2:CDC_GND }

wire U4.GPIO26/BCK -- U5.BCK
wire U4.GPIO25/WS -- U5.LCK
wire U4.GPIO22/DOUT -- U5.DIN
wire U5.L -- J3.CDC_L
wire U5.R -- J3.CDC_R
wire U5.AGND -- J3.CDC_GND
power 5V = U4.5V U5.VIN
gnd GND = U4.GND U5.GND U5.SCK
```

- **PCM5102A module** (the common board with the solder jumpers):
  from the [TI datasheet](https://www.ti.com/product/PCM5102A): FMT low
  for I2S, FLT low (normal filter), DEMP low (de-emphasis off), XSMT
  high (not muted). With SCK tied to ground the chip makes its own clock
  from BCK, so the ESP32 needs only BCK, LCK and DIN.
- **Radio connector**: CD changer audio left on pin 8, right on pin 9,
  ground on pin 2 of the radio's 12-pin connector (X13598/X13321). It
  takes MQS contacts, like X1312 (TE / AMP `5-928999-1`).
- The board takes its ground from the OBD socket and the audio ground
  from the radio; if you hear a hum, put a ground-loop isolator in the
  audio line.
- The radio has to think a CD changer is there to switch to its input:
  the nav computer does that on the I-Bus. If you already have a real CD
  changer or a BlueBus, use those instead (see
  [Alongside BlueBus](./shell#alongside-bluebus)).

Schematics drawn with [elmo](https://elmo.emdzej.pl/): schematics as code.
