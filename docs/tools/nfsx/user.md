# NFSX — user guide

## Install

```bash
git clone git@github.com:emdzej/nfsx.git
cd nfsx
pnpm install
pnpm -r build
pnpm link --global --filter @emdzej/nfsx-cli
```

You also need [`ediabasx`](../ediabasx/) installed and configured for
IPO-driven and directmode commands. Bootmode only needs a serial port.

## Configure

Tell `nfsx` where your SP-Daten lives:

```bash
nfsx configure
# Writes ~/.config/nfsx/config.json with the spDaten path.
```

Configure your transport in `~/.config/ediabasx/config.json`:

```json
{
  "interface": "kdcan",
  "options": {
    "port": "/dev/cu.usbserial-XXXX",
    "baudRate": 9600,
    "protocol": "uart",
    "initMode": "fast"
  }
}
```

## Discover

Look up any HWNR offline:

```bash
nfsx plan --hwnr 7544721
```

Returns the SG type, IPO, SGBD, flash files, and ZB candidates.

## Read ECU identity

```bash
nfsx check --hwnr 7544721
```

Reads HW_REFERENZ, SG_IDENT, SG_AIF, and ZIF_BACKUP from the live ECU.

## Flash (IPO-driven)

Dry-run first (always):

```bash
nfsx flash --hwnr 7544721 --zb 7552752
```

When ready, add `--write`:

```bash
nfsx flash --hwnr 7544721 --zb 7552752 --write
```

## Flash (direct DS2)

```bash
# Probe — detect ECU type
nfsx directmode probe

# Read full flash
nfsx directmode read -o backup.bin -m full

# Write calibration-only
nfsx directmode write -i tune.bin -m calibration
```

Options: `--variant MS42|MS43|GS20`, `--write-baud 38400`,
`--calculate-checksum`, `--skip-verify`.

## Flash (bootmode)

Bench-only. ECU must be pulled from the vehicle with BOOT pin grounded.

```bash
# Probe — verify BSL handshake
nfsx bootmode probe -d /dev/cu.usbserial-XXXX

# Read full 512 KB
nfsx bootmode read -d /dev/cu.usbserial-XXXX -o backup.bin

# Write full 512 KB
nfsx bootmode write -d /dev/cu.usbserial-XXXX -i firmware.bin
```

Use `--alt` for the JMG blob path (monolithic secondary with built-in
flash driver). Default is MiniMon + custom stubs.

Options: `--baud 19200`, `--calculate-checksum`, `--skip-verify`.

## Checksum verification

Verify or recompute MS42/MS43 firmware checksums (no hardware needed):

```bash
nfsx checksum -f firmware.bin
nfsx checksum -f firmware.bin --rewrite -o patched.bin
```

Auto-detects MS42 (3 CRC-16) vs MS43 (3 CRC-16 + 2 add-32).

## Verify after flash

```bash
nfsx verify --hwnr 7544721 --against ./backups/pre-flash.json
```
