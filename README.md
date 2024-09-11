# Bimmerz.app

The goal of this project is to provide an Integration Framework for your trusty BMW. A Software
Development Kit (SDK).

We aim to provide a finished product for the end user. An "app" or even a pair of an app and a device
which will enrich your BMW experience.

## Motivation

Why? Because we love our old, trusty bimmers. We love their reliable engines
and we love their [safe physical buttons](https://www.themanual.com/auto/touchscreen-in-car-less-safe-than-buttons/).
We want to keep them running, because we like owning our stuff and not paying [subscriptions](https://www.thedrive.com/news/mercedes-makes-better-performance-a-1200-subscription-in-its-evs?fbclid=IwAR3BkdhlgUEX13mmHZCOJTvAwrEXmPYMH6SO9F5yZS6i0CJVhOWsYiLBSlY) 
for things we already own.

And because we want to OWN our cars, we want to be able to do whatever is possible with them.

There is already a lot of excellent work done on the field of accessing the internals
of older BMW cars (see the resources section), yet we think there is no easy to use, all-purpose 
solution. 

We want to change that.

## Technology

We chose [TypeScript](https://www.typescriptlang.org) as the language of choice.
It (and JavaScript) is hugely popular, and we believe this will make this project
even more accessible to wider audience. 

Not sure how many JavaScript developers own a bimmer though.

Programming electronics with TypeScript? But that's slow...
No, it's not slow anymore and with projects like [DeviceScript](https://microsoft.github.io/devicescript/)
we are able to run it on micros as well.

Yet you can still run it on your laptop or a Raspberry PI.

And even if you don't want to use TypeScript... you can use JavaScript.

On the performance front - the integration bus runs on a 9600 baud speed, so definitively
not a time critical, and the `script` should be plenty.

## Features

So... what is in the box, and what can I do with it?

At the moment we support interaction with several modules in your car:
- Radio
- Instrument Cluster
- Light Control Module
- Parking Sensors
- Comfort Module
- Rain Sensor
- ...

And with that you can:
- Read and display On Board Computer data like: speed, RPM, fuel consumption, odometer, fuel level, coolant temperature and more
- Close your windows when it rains 
- Implement lane change blinkers 
- Display stuff on the radio
- Visualise parking sensors readings
- Add a bluetooth-proximity keyless entry to your car
- Add bluetooth audio / CD changer to your car
- Blink with your lights as the Teslas do

## How To Start?

See more in the [API documentation](./doc/).

## Resources

This project would not be possible if not for the great work of people before us who decided
not only to take the time and effort to gather the information but also to make it open to everyone.

For this we will be forever grateful.

Our work was based on the information provided by:
- [BlueBus](https://github.com/tedsalmon/BlueBus)
- [node-ibus](https://github.com/osvathrobi/node-ibus)
- [Curious Ninja Blog](https://curious.ninja/blog/arduino-bmw-i-bus-interface-intro/)
- [imBMW](https://github.com/toxsedyshev/imBMW)
- [wilhelm-docs](https://github.com/piersholt/wilhelm-docs)
- [HackTheIbus](https://github.com/TheKikGen/HackTheIbus/wiki/Ibus-Inside)
- https://github.com/kmalinich/node-bmw-ref/tree/master
- https://github.com/kmalinich/node-bmw-share