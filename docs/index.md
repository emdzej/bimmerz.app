---
layout: home

hero:
  name: bimmerz
  text: Modern tooling for your old cars.
  tagline: Open-source replacements for BMW's diagnostic, coding, and documentation software. Cross-platform, browser-native where it matters, no installer.
  image:
    src: /icon.svg
    alt: bimmerz
  actions:
    - theme: brand
      text: Explore the tools
      link: /tools/
    - theme: alt
      text: GitHub
      link: https://github.com/emdzej

features:
  - title: ediabasx
    details: Talk to your BMW's ECUs from a browser tab. Read fault codes, query live values, run any diagnostic job.
    link: /tools/ediabasx/
    linkText: Open

  - title: inpax
    details: BMW's dealer diagnostic tool, running in your browser. Live measurement displays, troubleshooting trees, F-key shortcuts.
    link: /tools/inpax/
    linkText: Open

  - title: ncsx
    details: Code your BMW from a browser tab. Read options in plain English, tick the box, write the change back.
    link: /tools/ncsx/
    linkText: Open

  - title: xbusx
    details: Decode and interact with your BMW's comfort bus — IKE, lights, radio, steering-wheel buttons, door locks.
    link: /tools/xbusx/
    linkText: Open

  - title: tisx
    details: Your BMW's service manual on tap. Repair procedures, service-position diagrams, technical bulletins.
    link: /tools/tisx/
    linkText: Open

  - title: etkx
    details: Look up any part on your BMW. Diagrams, current numbers, supersession history, all searchable.
    link: /tools/etkx/
    linkText: Open

  - title: wdsx
    details: BMW's wiring diagrams in a browser that works. Trace a circuit, follow pin numbers, save it offline for the garage.
    link: /tools/wdsx/
    linkText: Open
---

## Why bimmerz exists

BMW's diagnostic, coding, and documentation tools — EDIABAS, INPA, NCS
Expert, TIS, ETK, WDS — were built for Windows XP, ship as 32-bit
binaries, and need a specific decade-old cable driver to do anything
useful. Getting them running today means VMs, OBDLink serial-to-USB
juggling, and watching for surprise blue-screens whenever Windows Update
touches the registry.

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
