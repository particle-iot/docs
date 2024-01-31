---
title: Device flashing errors
columns: two
layout: commonTwo.hbs
description: Device flashing errors
---

# {{title}}

If you get an error while flashing your device by USB, you may want to use the RESET button to reset the device and try again. If this does not work, some alternatives are:

## USB Cables

One of the most common reasons is accidentally using a USB charging cable instead of a USB data cable. The inexpensive cables that come with devices that are powered or recharged by USB often don't have the data lines needed to program a Particle device, even though it will be powered.

Most devices have a USB 2.0 Micro B receptacle, however some devices have USB C. 

{{collapse op="start" label="Show device cable types"}}

{{!-- BEGIN do not edit content below, it is automatically generated 58997959-6743-4757-8081-18a46c2f6abf --}}

| SKU | Description | USB Cable |
| :--- | :--- | :--- |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | Micro B |
| ARG-LDKT | Argon Leak Detection Kit [x1] | Micro B |
| ARG-STRTKT | Argon Starter Kit [x1] | Micro B |
| ARGN-H | Argon [x1] | Micro B |
| ARGNKIT | Argon, Starter Kit  [x1] | Micro B |
| ASSET2GV2 | Asset Tracker 2G | Micro B |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Micro B |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | Micro B |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Micro B |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Micro B |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | Micro B |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | Micro B |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Micro B |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Micro B |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Micro B |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | Micro B |
| E310KIT | E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Micro B |
| E314KIT | E Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Micro B |
| E350KIT | Electron 2G Kit (Global) | Micro B |
| E402KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | Micro B |
| E404KIT | E Series LTE CAT-M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Micro B |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | Micro B |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | USB-C |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | Micro B |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | Micro B |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | Micro B |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | USB-C |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | USB-C |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | USB-C |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | USB-C |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Micro B |
| PHN2KIT | Photon 2, Kit [x1] | Micro B |
| PHN2MEA | Photon 2 [x1] | Micro B |
| PHOTONH | Photon with Headers, [x1] | Micro B |
| PHOTONKIT | Photon with Headers Starter Kit, [x1] | Micro B |
| PHOTONNOH | Photon without Headers, Dev board Kit [x1] | Micro B |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Micro B |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | Micro B |
| SPKBTTN | Internet Button, [x1] | Micro B |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | USB-C |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Micro B |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | Micro B |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | Micro B |


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}

## Device restore USB

The first thing you should try is  [Device Restore USB](/tools/device-restore/device-restore-usb/). It may be helpful to put the device in DFU mode (blinking yellow) before using the tool:

Press and hold MODE (or SETUP), tap RESET, and continue holding down MODE until the status LED blinks yellow, then release.

## Particle CLI

Another option is to use the [Particle CLI](/getting-started/developer-tools/cli/).

- Use the CLI command:

```
particle update
```

If you get a last page not writeable error like this (the numbers will be different):

```
Downloading to address = 0x080a0000, size = 493844
dfu-util: Last page at 0x08118913 is not writeable
```

there are a few possible causes:

- You are flashing a binary for the wrong platform and using the `--force` option. Use the correct image instead, you should never need to use `--force`.
- The hardware is defective. This particular failure happens more often with Gen 2 devices (STM32F205) and can't be repaired because the failure is in the flash inside the MCU.
- See the less common scenarios below, as well.

In rare cases, the `particle update` may not be able to switch the device into DFU mode (blinking yellow automatically). If this occurs, press and hold MODE (or SETUP), tap RESET, and continue holding down MODE until the status LED blinks yellow, then release to put the device in DFU mode.

## Device restore JTAG (SWD/JTAG)

In some cases, the device can't be restored by DFU, and can only be restored using SWD/JTAG. This requires a special programmer that allows the flash to be reprogrammed externally. See the [SWD/JTAG guide](/reference/developer-tools/jtag/) for more information.

## Less common scenarios

### Unable to change device mode

In rare cases, using the button combination to change into DFU mode may not work. In this case:

- Disconnect the USB cable.

- Hold down the MODE (or SETUP button) while plugging the USB cable back in.

- Continue holding down MODE until the status LED blinks yellow, then release to put the device in DFU mode.

### Dim D7 (Gen 2)

For Gen 2 devices (E Series, Electron, P1, Photon) if the blue D7 LED is on dimly and the status LED is off, the internal flash has been erased.

If this occurs, it can only be repaired using SWD/JTAG. See the [SWD/JTAG guide](/reference/developer-tools/jtag/) for more information.
