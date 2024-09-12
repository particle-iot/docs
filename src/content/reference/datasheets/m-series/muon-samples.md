---
title: Muon engineering samples
columns: two
layout: commonTwo.hbs
description: Muon engineering samples
---

# {{title}}

For the complete datasheet, see [Muon preview datasheet](/reference/datasheets/m-series/muon-preview-datasheet/).

## Features

{{imageOverlay src="/assets/images/m-series/muon-labeled.png" alt="Features labeled" class="full-width"}}

| Label | Feature |
| :---: | :--- |
|  1 | M-SoM |
|  2 | Expansion connector |
|  3 | USB-C |
|  4 | USB Power LED ("PD") |
|  5 | Charge LED ("CHG") |
|  6 | VIN (6-12 VDC) |
|  7 | LiPo battery connector (3-pin) |
|  8 | SWD/JTAG debugging connector |
|  9 | Ethernet RJ-45 connector |
| 10 | LoRaWAN antenna |
| 11 | LoRaWAN status LED |
| 12 | QWIIC (3.3V I2C) connector |
| 13 | RESET button | 
| 14 | RGB status LED |
| 15 | MODE button |

## Engineering samples

The Muon engineering samples comes in a plastic case with the following items:

{{imageOverlay src="/assets/images/m-series/muon-preview-labeled.png" alt="Preview labeled" class="full-width"}}

| Label | Feature |
| :---: | :--- |
| 16 | GNSS antenna |
| 17 | Cellular antenna |
| 18 | Wi-Fi/BLE antenna |
| 19 | LiPo battery with temperature sensor |
| 20 | LoRa antenna connector (SMA) |
| 21 | Muon Wi-Fi/BLE connector (preview only, do not use!) |

Be sure to connect the Wi-Fi/BLE antenna to the M-SoM itself, not the U.FL connector on the Muon (21). Future versions
of the Muon will not have this connector on the base board.

## Device setup

To set up your Muon preview device, connect a USB-C cable from connector 3 to your computer, then proceed to [setup.particle.io](https://setup.particle.io/) to complete the setup of your device.

{{imageOverlay src="/assets/images/m-series/muon-usb.png" alt="USB connection" class="full-width"}}

## Errata (v0.5)

This errata applies to version 0.5 of the Muon. The version can be found here:

{{imageOverlay src="/assets/images/m-series/muon-version.png" alt="Version" class="full-width"}}


We would like to inform you about a potential issue with the beta samples of the Muon board, specifically those labeled v0.5. There have been instances where the power module on these boards may become affected if a specific area is touched while the board is powered on. This could cause the unit to stop working.

### Details & Impact - Errata (v0.5)

- **Affected Units:** Beta samples of the Muon board labeled v0.5.
        
- **Issue:** When using the DC screw terminals to power the board, making the connections with live wires may disrupt the power module, causing it to become non-functional. Touching a particular area of the board while it is powered on may cause this issue as well.
    
{{imageOverlay src="/assets/images/m-series/muon-power-warning.png" alt="USB connection" class="full-width"}}
    
In some cases, there may be a very small amount of smoke as the PMIC is overloaded. 
    
### Preventive Measures - Errata (v0.5)

To avoid any problems:

- When using the DC screw terminals, make the wire connections before turning on your DC power source.
- Ensure that you do not touch the area highlighted in red in the picture below while the board is powered on.
    - If you want to take extra precautions, applying conformal coating to the area can provide additional protection.

We appreciate your attention to this matter and are here to assist with any questions or concerns you may have. A solution is implemented for the next version.





