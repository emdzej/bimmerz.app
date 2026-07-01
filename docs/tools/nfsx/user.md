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

## Flash (MS45)

MS45.0 (E46) and MS45.1 (E60/E65) DMEs via the EDIABAS `D_Motor`
group. You need an ECU dir containing `MS450DS0.prg` / `10MDS45.prg`
(from your BMW Standard Tools install).

```bash
# IDENT — variant, VIN, HW/SW ref, diag protocol
nfsx ms45 probe

# Read the 116 KB tune blob
nfsx ms45 read -o tune.bin -m tune

# Read full flash: <output>.bin + <output>_MPC.bin
nfsx ms45 read -o full.bin -m full

# Flash a tune (CRC-32 + RSA-1024 signature recomputed automatically)
nfsx ms45 write -i tune.bin -m tune

# Flash a full program (needs both external + MPC files)
nfsx ms45 write -i full.bin --mpc full_MPC.bin -m full
```

Options: `--skip-checksum`, `--skip-sign`, `--skip-verify`, `--yes`
(skip the "type FLASH to proceed" confirmation), `--ecu-dir <path>`.

## Checksum verification (MS42 / MS43 / MS45)

Verify or recompute firmware checksums offline (no hardware needed):

```bash
# MS42 / MS43 — CRC-16 (+ MS43 add-32)
nfsx checksum -f firmware.bin
nfsx checksum -f firmware.bin --rewrite -o patched.bin

# MS45 — CRC-32/MPEG-2 + RSA-1024 signature
nfsx ms45 checksum -f tune.bin
nfsx ms45 checksum -f full.bin --mpc full_MPC.bin --rewrite
```

Auto-detects the ECU variant from the BIN's header pointers.

## Offline BIN tune (MS42 / MS43)

Read or write firmware fields without an ECU connection:

```bash
# Read VIN, immobilizer status, ECU number, software version, UIF
nfsx tune read -f firmware.bin --feature vin
nfsx tune read -f firmware.bin --feature immo
nfsx tune read -f firmware.bin --feature uif

# Write a new VIN (stamps all 14 UIF rows)
nfsx tune apply -f firmware.bin --feature vin --value WBAXX...

# Virginize — clear ISN + EWS pairing so the DME re-pairs via INPA
nfsx tune apply -f firmware.bin --feature virginize
```

Checksums are recomputed automatically after every `apply`. Pass
`--skip-checksum` to disable.

## Verify after flash

```bash
nfsx verify --hwnr 7544721 --against ./backups/pre-flash.json
```
