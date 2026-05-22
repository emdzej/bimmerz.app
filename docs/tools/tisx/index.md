# tisx

> Your BMW's service manual on tap, in a modern browser.

Read repair procedures, service-position diagrams, and technical bulletins
the same way the dealer mechanic would — but in a fast SvelteKit app
instead of a Windows-XP-era Access database. Search by document, browse
by chassis, or look up by VIN to filter everything to your specific car.
Symptom-based navigation works too, following the original TIS complaint
tree.

## How to use it

**Self-hosted.** TIS data isn't something you can simply pick up off your
local drive in a browser — it lives in an InstallShield-archived MDB
database, ITW images, and compressed RTF documents. `tisx` ships a Docker
prep pipeline that converts your TIS disc contents into a single portable
SQLite file, then a Docker compose stack to run the viewer.

```bash
git clone https://github.com/emdzej/tisx
cd tisx
# Build the prep image, run it against your TIS disc to produce tis.sqlite,
# then `docker compose up`.
```

You need a copy of the original TIS disc (containing `DATA/DB.Z`,
`GRAFIK/`, and `DOCS/`) and Docker installed.

## Links

- [GitHub](https://github.com/emdzej/tisx)
- [User guide](./user) — navigate documents, decode VINs, bookmark vehicles.
- [Developer guide](./developer) — data pipeline, RTF rendering, schema.
