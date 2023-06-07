---
title: Monitor One
layout: landing.hbs
description: Particle Monitor One
---

# Particle Monitor One

## External features

{{imageOverlay src="/assets/images/monitor-one/post-corner-labeled.png" alt="External features" class="full-width"}}


| Label | Feature |
| :---: | :--- |
|  1 | System RGB LED |
|  2 | GNSS antenna (internal) |
|  3 | Cellular antenna (internal) |
|  4 | External connectors (on bottom) |
|  5 | Magnetic, bolt-down, or strap-down mounting bracket |
|  6 | User RGB LEDs (2) |
|  7 | User button (externally accessible) |
|  8 | Wi-Fi geolocation antenna (internal) |

### Connectors

{{imageOverlay src="/assets/images/monitor-one/bottom-connectors-labeled.png" alt="Bottom Connectors" class="full-width"}}


The bottom plate of the Monitor One can be customized with different connectors for your application.

| Label | Feature |
| :---: | :--- |
|  1 | Cellular antenna (SMA) |
|  2 | M12 connector (8-pin) |
|  3 | M12 connector (4-pin) |
|  4 | GNSS antenna (SMA) |
|  5 | Mounting plate attachment screw |

By default the Monitor One uses the internal cellular and GNSS antennas, but can be switched to using the external connectors inside the enclosure.

The cellular (1) and GNSS (4) antennas are not connected internally at the factory. In order to use the external connectors you must open the case, disconnect the internal antenna, and instead connect the U.FL connector for the external jack.

The Monitor One is equipped with 2 external-facing SMA bulkhead connectors for both cellular and GNSS but are disconnected internally. The hardware is ready for use with external antennas giving the ability to connect a wide variety of application-specific antennas. It is recommended that the user perform required RF certifications with the selected antenna installed as the Monitor One has only been certified for use in select regions with the internal antennas.


### IO expansion M12 8-pin to flying leads

The Monitor One includes a M12 8-pin male to flying leads cable, 1500&plusmn;20mm (about 60 inches or 5 feet). This is used to power the Monitor One, and also use the 4-20mA, 0-10V analog in, CAN bus, and RS485 (Modbus) interfaces.

![M12 Cable Connector](/assets/images/monitor-one/m12-cable.png)

<p class="attribution">Looking at the pins on the end of the connector on the cable</p>

| Conn P1 (M12)| Color | Function | GPIO |
| :---: | :---: | :--- | :--- | :---: |
| 1 | White | CAN_P | |
| 2 | Red | VIN (6-30 VDC) | |
| 3 | Green | 4-20mA input | A7 |
| 4 | Yellow | 0-10V input | A6 |
| 5 | Gray | RS485_N | |
| 6 | Pink | RS485_P | |
| 7 | Blue | CAN_N | |
| 8 | Black | Ground | |

{{imageOverlay src="/assets/images/monitor-one/m12-8-flying.png" alt="M12 8-pin flying leads" class="full-width"}}

### IO expansion M12 4-pin to flying leads

The Monitor One includes a M12 4-pin male to flying leads cable, 1500&plusmn;20mm (about 60 inches or 5 feet). You do not need to connect this cable initially.

{{imageOverlay src="/assets/images/monitor-one/m12-4-flying.png" alt="M12 8-pin flying leads" class="full-width"}}

| Conn P1 (M12)| Color | Function | GPIO |
| :---: | :---: | :--- | :--- | :---: |
| 1 | Red | 12-24V slow-signal input | A5 |
| 2 | Green | Relay COM | |
| 3 | Black | Ground | |
| 4 | Blue | Relay (NO) | NFC_PIN2 |

## Powering the Monitor One

Also included on the M12 to flying leads cable is an adapter from screw terminals to a 5.5x2.1mm barrel jack, center positive. If you disconnect and reconnect the adapter, make sure the + screw terminal is connected to red and the - screw terminal is connected to black. An appropriate 24 VDC power adapter is included.

Any 6VDC to 30VDC power adapter at 2A with a 5.5x2.1mm barrel connector, center positive can be used instead, if desired. For automotive use, you can use this power input directly to a 12V or 24V vehicle power system as the power supply is designed to handle transient voltage present on vehicle power systems.

## Setting up the device

To set up the device and associate it with your Particle account, visit [setup.particle.io](https://setup.particle.io/). The Monitor One is setup as as Tracker device, as both contain the Tracker SoM module.

## Additional resources

- [Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/)
- [Console settings](/getting-started/console/console/#asset-tracker-features)
- [Monitor Edge firmware](/firmware/tracker-edge/monitor-edge-firmware/)

