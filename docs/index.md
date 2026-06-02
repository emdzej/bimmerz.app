---
layout: home

hero:
  name: bimmerz
  text: Modern tooling for your old cars.
  tagline: Open-source replacements for BMW's diagnostic, coding, and documentation software. Cross-platform, browser-native where it matters, no installer.
  image:
    light: /icon-light.svg
    dark: /icon-dark.svg
    alt: bimmerz
  actions:
    - theme: brand
      text: Explore the tools
      link: /tools/
    - theme: alt
      text: GitHub
      link: https://github.com/emdzej

features:
  - title: EDIABASX
    details: Talk to your BMW's ECUs from a browser tab. Read fault codes, query live values, run any diagnostic job.
    link: /tools/ediabasx/
    linkText: Open

  - title: INPAX
    details: BMW's diagnostic tool, running in your browser. Live data, ECU configuration, and built-in diagnostic procedures.
    link: /tools/inpax/
    linkText: Open

  - title: NCSX
    details: Code your BMW from a browser tab. Read options in plain English, tick the box, write the change back.
    link: /tools/ncsx/
    linkText: Open

  - title: NFSX
    details: Flash your BMW's ECUs from the command line. Three paths — IPO-driven, direct DS2, and C167 bootmode.
    link: /tools/nfsx/
    linkText: Open

  - title: TUNEX
    details: Edit ECU firmware in your browser. Hex view with type interpretation, plus structured editing via TunerPro .xdf definitions.
    link: /tools/tunex/
    linkText: Open

  - title: XBUSX
    details: Decode and interact with your BMW's comfort bus — IKE, lights, radio, steering-wheel buttons, door locks.
    link: /tools/xbusx/
    linkText: Open

  - title: TISX
    details: Your BMW's service manual on tap. Repair procedures, service-position diagrams, technical bulletins.
    link: /tools/tisx/
    linkText: Open

  - title: ETKX
    details: Look up any part on your BMW. Diagrams, current numbers, supersession history, all searchable.
    link: /tools/etkx/
    linkText: Open

  - title: WDSX
    details: BMW's wiring diagrams in a browser that works. Trace a circuit, follow pin numbers, save it offline for the garage.
    link: /tools/wdsx/
    linkText: Open
---

## Why bimmerz exists

BMW's diagnostic, coding, and documentation tools — EDIABAS, INPA, NCS
Expert, TIS, ETK, WDS — were built for Windows. Some of them only run on
older versions like XP. Running them on a modern machine usually means a
VM and a fragile chain of legacy drivers.

Most owners just want to read a fault code, change a coding setting, or
look up a part number. The whole stack should fit in a browser tab.

bimmerz ports each tool, file format, and protocol piece by piece. The
projects are open source, run on modern operating systems, and run in
modern browsers — desktop, laptop, and (where the relevant Web APIs are
available) some Android devices.

## Right to Repair

Every project here exists because owners shouldn't be locked out of fixing
what they own. Dealership-only diagnostic software, paywalled documentation,
and proprietary cables aren't laws of nature — they're choices manufacturers
make. We make different ones.

[Read more on repair.eu](https://repair.eu)

## License

Most projects ship under [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/);
a few are MIT. Check each repo's `LICENSE` for the canonical statement.

None of these tools ship BMW proprietary data. Every `.prg`, `.dat`, `.ipo`,
RTF document, parts diagram, or schematic the apps consume must come from a
legally-acquired install on the user's own machine.
