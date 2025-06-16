---
title: Power measurement
columns: two
layout: commonTwo.hbs
description: Power measurement for Particle devices
includeDefinitions: [api-helper, power-comparison]
---

# {{title}}

## Measurement tools

### Standard DMMs

In general, most portable DMMs that have a physical range selector are not suitable for current measurement for Particle devices. 

The reason is that the large current range for cellular devices, in particular. It could be as high as 1.5 A during connection to 100 µA (0.0001 A) in sleep mode, which is beyond the range of most inexpensive meters.

If you are in the low current range and exceed the rating, *burden voltage* will affect the operation of the device because the voltage will be lower than the rated version.

This problem can be corrected using the µCurrent Gold.

### µCurrent Gold

The [µCurrent Gold](https://www.digikey.com/reference-designs/en/sensor-solutions/current-sensing/2637) works with a regular digital multi-meter and eliminates the burden voltage issue. This also requires an external power supply. Typically you would use a DC bench supply, though you could also use a battery.

- Relatively inexpensive.
- Works with tools you probably already have.

### Siglent SDM3055

The [Siglent SDM3055](https://siglentna.com/digital-multimeters/sdm3055-5-%c2%bd-digits-dual-display-digital-multimeters/#) bench DMM is suitable for measuring current usage from Particle devices because it can auto-range without interrupting the power. It can also log the data to its software for Windows over USB.

- Logs data to a computer.
- Also performs other bench DMM features.
- Requires an external power supply. Typically you would use a DC bench supply.

### Qoitech Otii Arc Pro

The [Qoitech Otii Arc Pro](https://www.qoitech.com/otii-arc-pro/) is the tool of choice at Particle. It is what the current measurements are done with.

- Logs data to a computer.
- Built in power supply.
- Can synchronize UART serial logs with the power consumption graph.


## Tips for Particle devices

### LiPo battery input vs. VIN

All of the current measurements are done at 3.6V to the battery input for devices with a battery input.

Additionally, devices with a bq24195 PMIC provide the lowest current only when using the LiPo battery input. This is especially important when you need low current in sleep mode. When using VIN, an additional voltage regulator within the PMIC is enabled, which has some current use even at idle. While the difference is negligible in operating mode as a percentage of total usage, in sleep mode it can be significant compared to the 100 µA sleep current on some devices.

### Particle devices with a PMIC

The following devices include a PMIC.

{{collapse op="start" label="Show devices with a PMIC"}}

{{!-- BEGIN do not edit content below, it is automatically generated 1e4ff400-8197-4485-ab74-b81d81c3eedc --}}

| SKU | Description | PMIC | Lifecycle |
| :--- | :--- | :--- | :--- |
| ASSET2GV2 | Asset Tracker 2G | bq24195 | Deprecated |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | bq24195 | Deprecated |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | bq24195 | Deprecated |
| [BRN310KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global) Starter Kit, [x1] | bq24195 | Deprecated |
| [BRN310TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global), Tray [x50] | bq24195 | Deprecated |
| [BRN314KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global) Starter Kit, [x1] | bq24195 | Deprecated |
| [BRN314TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global), Tray [x50] | bq24195 | Deprecated |
| [BRN402](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | bq24195 | Deprecated |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | bq24195 | Deprecated |
| [BRN402KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | bq24195 | Deprecated |
| [BRN402TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | bq24195 | NRND |
| [BRN404](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | bq24195 | Deprecated |
| [BRN404KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | bq24195 | Deprecated |
| [BRN404TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | bq24195 | Deprecated |
| [BRN404X](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | bq24195 | GA |
| [BRN404XKIT](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | bq24195 | GA |
| [BRN404XTRAY50](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | bq24195 | GA |
| [E260KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | bq24195 | Deprecated |
| [E260TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Americas/Aus), Tray [x50] | bq24195 | Deprecated |
| [E270KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (EMEA) Starter Kit, [x1] | bq24195 | Deprecated |
| [E270TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (EMEA), Tray [x50] | bq24195 | NRND |
| [E310KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | bq24195 | NRND |
| [E310MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E310), [x1] | bq24195 | Deprecated |
| [E310TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E310), Tray [x50] | bq24195 | Deprecated |
| [E313EA](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E313), [x1] | bq24195 | Deprecated |
| [E313TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E313), Tray [x50] | bq24195 | End of life |
| [E314KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | bq24195 | NRND |
| [E314MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E314), [x1] | bq24195 | Deprecated |
| [E314TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E314), Tray [x50] | bq24195 | NRND |
| [E350KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G Kit (Global) | bq24195 | Deprecated |
| [E350TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G (Global), Tray [x50] | bq24195 | Deprecated |
| [E402KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | bq24195 | NRND |
| [E402MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm), [x1] | bq24195 | Deprecated |
| [E402TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm), Tray [x50] | bq24195 | NRND |
| [E404KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | bq24195 | NRND |
| [E404MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE-M (NorAm, EtherSIM), [x1] | bq24195 | NRND |
| [E404TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | bq24195 | Deprecated |
| [E404XTRAY50](/reference/datasheets/e-series/e404x-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | bq24195 | GA |
| [ELC314TY](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Global - U201) , Tray [x50] | bq24195 | NRND |
| [ELC402EA](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm), [x1] | bq24195 | Deprecated |
| [ELC402TY](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm), Tray [x50] | bq24195 | Deprecated |
| [ELC404TY](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | bq24195 | Deprecated |
| [ELC504EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x1] | bq24195 | In development |
| [ELC504EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x50] | bq24195 | In development |
| [ELC524EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x1] | bq24195 | In development |
| [ELC524EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x50] | bq24195 | In development |
| [M2BREAKOUT](/reference/datasheets/m-series/m2-breakout-datasheet/) | Particle M.2 SoM Breakout Board [x1] | bq24195 | GA |
| [M2EVAL](/reference/datasheets/b-series/b-series-eval-board/) | Particle M.2 SoM Evaluation Board [x1] | bq24195 | GA |
| MHAT | M-HAT | bq24195 | In development |
| MHAT504e | M-HAT with LTE CAT1 for North America | bq24195 | In development |
| MHAT524e | M-HAT with LTE CAT1 for Rest of World | bq24195 | In development |
| [MON404E01C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | bq24195 | GA |
| [MON404E02C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | bq24195 | In development |
| [MON524E01C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | bq24195 | GA |
| [MUON404](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | bq24195 | GA |
| [MUON404EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | bq24195 | GA |
| [MUON524](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | bq24195 | GA |
| [MUON524EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | bq24195 | GA |
| [MUON635](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | bq24195 | In development |
| [MUON635EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | bq24195 | In development |
| MUONCBKIT | Muon Carrier Board Kit | bq24195 | GA |
| [ONE402MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm), [x1] | bq24195 | Deprecated |
| [ONE402MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm), Bulk [x40] | bq24195 | Deprecated |
| [ONE404MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | bq24195 | GA |
| [ONE404MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | bq24195 | GA |
| [ONE523MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE CAT1/3G/2G (Europe), [x1] | bq24195 | GA |
| [ONE523MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | bq24195 | GA |
| [ONE524MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | bq24195 | GA |
| [ONE524MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | bq24195 | GA |
| PMBATH1EA | Particle Power Module, Battery, with Header [x1] | bq24195 | GA |
| PMBATH1EA  | Particle Power Module, Battery, with Header | bq24195 | In development |
| PMBATH1TY | Particle Power Module, Battery, with Header [x50] | bq24195 | GA |
| PMBATNH1EA | Particle Power Module, Battery, No Header | bq24195 | In development |
| PMBATNH1TY | Particle Power Module, Battery, without Header [x50] | bq24195 | GA |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | bq24195 | Deprecated |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | bq24195 | Deprecated |
| [T402MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm), [x1] | bq24195 | Deprecated |
| [T402MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | bq24195 | Deprecated |
| [T402MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm), Tray [x50] | bq24195 | NRND |
| [T404MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | bq24195 | GA |
| [T404MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | bq24195 | GA |
| [T404MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | bq24195 | GA |
| [T523MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | bq24195 | Deprecated |
| [T523MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | bq24195 | NRND |
| [T523MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | bq24195 | Deprecated |
| [T524MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | bq24195 | GA |
| [T524MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | bq24195 | GA |
| [T524MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | bq24195 | GA |


{{!-- END do not edit content above, it is automatically generated --}}


{{collapse op="end"}}


### Beware of peripherals

The Particle [B-Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/) is not well suited for testing power consumption. The Ethernet port (WIZnet W5500) cannot be disabled, and uses a significant amount of power.

The newer [M.2 breakout board](/reference/datasheets/m-series/m2-breakout-datasheet/) does not have a built-in Ethernet port and does not exhibit this behavior.


### Cellular power differences

When calculating a power budget, the cellular connection has a high degree of variability. As a general rule, in order of lowest power to highest is: 

- LTE Cat M1
- LTE Cat 1 (4G)
- 3G
- 2G

In particular, on devices that can connect to 2G, the modem uses the highest current, and also takes the longest to connect. Be sure to take this into account when establishing a power budget where you may be connecting by 2G.

## Comparison tool

{{> power-comparison }}

- Current measured from the LiPo battery input at 3.6 VDC.
