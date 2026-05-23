# Credits

bimmerz wouldn't exist without the work of other people. A lot of the
protocol knowledge, format documentation, and reverse-engineering shortcuts
that make this whole suite possible came from the open-source community
first. Every file format we parse, every protocol we speak, and every
Windows binary we decompile was figured out — or made figurable — by
someone else along the way.

Special thanks to **Revtor**, the author of NCS Dummy, who shared deep
notes on the DATEN file format that became the foundation of `ncsx`'s
parser. And to the broader **NCSDummy community** — every
`KEYCARDREADER → Keycard reader` line in the translation dictionary is
someone's evening of tinkering, made public for the rest of us.

If any of the projects below helped you find this page, please credit
them too.

## Reverse-engineering references

- **[EdiabasLib](https://github.com/uholeschak/ediabaslib)** by Ulrich
  Holeschak — the original C# implementation of EDIABAS that our
  TypeScript port (`ediabasx`) tracks. Long-running, exhaustive, and
  the canonical reference for anyone implementing the BMW diagnostic
  stack.
- **NCS Dummy** by **Revtor** — the community Windows coding tool we
  owe the most to on the NCS side. Revtor personally shared deep-dive
  notes on the DATEN file format that unlocked our parser; we also
  ship a copy of his community-maintained CSV translation dictionary
  so FSW/PSW names render in English instead of raw BMW codes.
- **NCSDummy community translations** — the years-long volunteer
  effort that turns BMW's internal keywords into readable English.
- **[BlueBus](https://github.com/blueBusProject/BlueBus)** — I-Bus /
  K-Bus protocol reference, one of the three community sources
  `xbusx`'s citation-aware manual synthesises.
- **[wilhelm-docs](https://github.com/piersholt/wilhelm-docs)** by
  Piers Holt — the second of the three I-Bus / K-Bus sources, with
  particular strength on Logic7 and radio messages.

## Tools

- **[Ghidra](https://ghidra-sre.org/)** — the NSA's open-source
  software reverse-engineering platform. The decompiler that makes
  reversing the BMW Windows binaries (NCSEXPER, INPA, TIS, …)
  tractable. Without it most of these projects wouldn't exist.

## Bigger picture

- **[Right to Repair](https://repair.eu)** — the "why" behind every
  project in this suite. Owners shouldn't be locked out of fixing
  what they own. Dealership-only diagnostic software, paywalled
  documentation, and proprietary cables aren't laws of nature; they
  are choices. We make different ones.
