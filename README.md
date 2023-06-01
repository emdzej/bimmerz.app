# e46-pi-headunit

The goal of this project is to build a Raspberry Pi based headunit utilising original BMW E46 widescreen navigation monitor.

In my case it's Alpine RD1BE85A.

The goal is to keep the following features working:

- front panel buttons & rotary encoders as USB HID device connected to the main Raspberry PI
- front panel backlight and LEDs likely as part of the HID device as well
- front panel IR sensor
- front panel tilt mechanism to reveal access to some USB ports and SD Card for upgrades.

## Current State

I've created [schematics](doc/schematics) for the front panel buttons and LEDs PCBs. Be aware that these are not re-organised, so if you open them you may face a mess.

A prototype USB keyboard using Arduino Leonardo has been built and coded. At the moment it reports button presses as entire strings with button names. Check out the [source code](src/ if you wish.

A video of it in action is available on [YouTube](https://www.youtube.com/watch?v=6mQApWetY5M).

## Next Steps

I need to polish the schematics for sure, just to allow myself less mistakes. Also rotary encoders need to be added.

Probably I'll shift towards using Raspberry Pi Pico or STM32F01 as the keypad/LED/tilt motor controller, as it has more I/O out of the box compared to Leonardo. Currently I almost run out of pins because of the way part of the keypad is organised. 
Using some I/O expanders would be also an option, but these micros are quite cheap and it'll make entire system less complex.

Based on that choice, I will code support for encoders, LEDs and motors.

Making custom PCB to fit inside the unit seems as a reasonable next-next step.

I have almost all the hardware components (waiting for touch digitizer and LCD screen).

So once I have the HID device built and connected I'll likely setup [OpenAuto Pro](https://bluewavestudio.io/shop/openauto-pro-car-head-unit-solution/) on the Pi itself. Just to begin with something.

# bimmerz.app
