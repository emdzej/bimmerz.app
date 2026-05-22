# NCSX

> Code your BMW from a browser tab — checkboxes instead of hex.

Read what's coded on each ECU, see every option in plain English (with the
matching FSW / PSW names), tick the box for "Sport package", "Comfort
Access", or whatever you want to add, and write the change back. Same
underlying coding flow NCS Expert uses — auth gates, multi-step writes,
and post-write checksums all honoured.

## How to use it

**In your browser** — [ncsx.bimmerz.app](https://ncsx.bimmerz.app).
Point it at your BMW Standard Tools folder, connect a K+DCAN cable, pick
an ECU. Read coding, edit values, write back. Files stay on your machine.

End-to-end verified on E46 KMB / AKMB / GM5; identity reading (VIN + FA
or ZCS) works across the FA-master and ZCS-master chassis families.

Chromium-based browsers on desktop (Chrome, Edge, Opera, Brave) — uses
Web Serial for the cable and File System Access for your install folder.

## Links

- [GitHub](https://github.com/emdzej/ncsx)
- [User guide](./user) — read, edit, write a coding setting.
- [Developer guide](./developer) — architecture, the IPO bridge, reverse-engineering notes.
