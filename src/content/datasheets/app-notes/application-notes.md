---
title: Application Notes
layout: datasheet.hbs
columns: two
order: 2
---

# Application Notes

Technical application notes for hardware and software designs and best-practices are stored in the app-notes Github
repository:

[https://github.com/particle-iot/app-notes/](https://github.com/particle-iot/app-notes/)
### Hardware Designs

- [AN001 Basic SoM Design](https://github.com/particle-iot/app-notes/tree/master/AN001-Basic-SoM-Design) is a simple SoM base board. 
Like a Boron it can be powered by LiPo battery, USB, or an external DC supply. It includes: RGB LED, bq24195 PMIC, MAX17043 Fuel Gauge, 
USB Connector, LiPo Connector (JST-PH), and M.2 SoM Connector.
- [AN006 Vehicle Power](https://github.com/particle-iot/app-notes/tree/master/AN006-Vehicle-Power) provides sample designs for powering Particle devices in vehicles.
- [AN012 Tracker 1-Wire](https://github.com/particle-iot/app-notes/tree/master/AN012-Tracker-1Wire) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](https://github.com/particle-iot/app-notes/tree/master/AN013-Tracker-GPIO) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN015 Tracker Breakout](https://github.com/particle-iot/app-notes/tree/master/AN015-Tracker-Breakout) is a simple breakout board to help prototype using the Tracker One M8 connector.
- [AN016 Tracker Keypad LCD](https://github.com/particle-iot/app-notes/tree/master/AN016-Tracker-Keypad-LCD) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN018 Tracker Tank Level Sensor](https://github.com/particle-iot/app-notes/tree/master/AN018-Tracker-Level) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](https://github.com/particle-iot/app-notes/tree/master/AN019-Tracker-Prototype) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](https://github.com/particle-iot/app-notes/tree/master/AN020-Tracker-4-20mA) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](https://github.com/particle-iot/app-notes/tree/master/AN021-Tracker-4-20mA-Quad) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](https://github.com/particle-iot/app-notes/tree/master/AN022-Tracker-SHT3x-Temperature-Humidity) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN023 Watchdog Timers](https://github.com/particle-iot/app-notes/tree/master/AN023-Watchdog-Timers) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN024 Tracker Relay](https://github.com/particle-iot/app-notes/tree/master/AN024-Tracker-Relay) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](https://github.com/particle-iot/app-notes/tree/master/AN025-Tracker-SoM-First-Board) contains the Eagle CAD files for creating your first Tracker SoM base board design.

### Solutions Accelerator Projects

- [AN026 Tracker Current Solutions Accelerator](https://github.com/particle-iot/app-notes/tree/master/AN026-Tracker-Current-Solutions-Accelerator) shows how to measure AC current using the Tracker One via the M8 connector.

### Programming techniques

- [AN002-Device-Powerdown](https://github.com/particle-iot/app-notes/tree/master/AN002-Device-Powerdown) shows how to 
have an Electron, E Series, or Boron gracefully power down under battery power when the power supply is disconnected 
then automatically power up when restored. This can be useful in automotive applications or devices powered by a switch 
in mains power applications.
- [AN005 Threading Explainer](https://github.com/particle-iot/app-notes/tree/master/AN005-Threading-Explainer) provides detailed information on using execution threads on Particle devices.
- [AN008 Using a Xenon with the Nordic SDK](https://github.com/particle-iot/app-notes/tree/master/AN008-Xenon-Nordic-SDK)
- [AN009 Firmware Examples](https://github.com/particle-iot/app-notes/tree/master/AN009-Firmware-Examples) provides some annotated code examples, including how to effective use sleep modes.
- [AN010 Finite State Machines](https://github.com/particle-iot/app-notes/tree/master/AN010-Finite-State-Machines) shows some of the ways to effectively structure your code using finite state machines.
- [AN011 Publish to Google Sheets](https://github.com/particle-iot/app-notes/tree/master/AN011-Publish-to-Google-Sheets) shows how you can publish directly to Google G Suite spreadsheets using webhooks.
- [AN017 Tracker CAN](https://github.com/particle-iot/app-notes/tree/master/AN017-Tracker-CAN) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN023 Watchdog Timers](https://github.com/particle-iot/app-notes/tree/master/AN023-Watchdog-Timers) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.


### Troubleshooting

- [AN003 Interpreting Cloud Debug](https://github.com/particle-iot/app-notes/tree/master/AN003-Interpreting-Cloud-Debug) shows how to 
interpret cloud debugging logs to troubleshoot various common issues.
- [AN004 Interpreting Cloud Debug-2](https://github.com/particle-iot/app-notes/tree/master/AN004-Interpreting-Cloud-Debug-2) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN007 Tower Info](https://github.com/particle-iot/app-notes/tree/master/AN007-Tower-Info) is a tool for location nearby cellular towers.
- [AN014 Tracker I2C Scanner](https://github.com/particle-iot/app-notes/tree/master/AN014-Tracker-i2c-scanner) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.

### Asset Tracking

- [AN012 Tracker 1-Wire](https://github.com/particle-iot/app-notes/tree/master/AN012-Tracker-1Wire) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](https://github.com/particle-iot/app-notes/tree/master/AN013-Tracker-GPIO) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN014 Tracker I2C Scanner](https://github.com/particle-iot/app-notes/tree/master/AN014-Tracker-i2c-scanner) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.
- [AN016 Tracker Keypad LCD](https://github.com/particle-iot/app-notes/tree/master/AN016-Tracker-Keypad-LCD) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN017 Tracker CAN](https://github.com/particle-iot/app-notes/tree/master/AN017-Tracker-CAN) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN018 Tracker Tank Level Sensor](https://github.com/particle-iot/app-notes/tree/master/AN018-Tracker-Level) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](https://github.com/particle-iot/app-notes/tree/master/AN019-Tracker-Prototype) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](https://github.com/particle-iot/app-notes/tree/master/AN020-Tracker-4-20mA) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](https://github.com/particle-iot/app-notes/tree/master/AN021-Tracker-4-20mA-Quad) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](https://github.com/particle-iot/app-notes/tree/master/AN022-Tracker-SHT3x-Temperature-Humidity) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN024 Tracker Relay](https://github.com/particle-iot/app-notes/tree/master/AN024-Tracker-Relay) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](https://github.com/particle-iot/app-notes/tree/master/AN025-Tracker-SoM-First-Board) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN026 Tracker Current Solutions Accelerator](https://github.com/particle-iot/app-notes/tree/master/AN026-Tracker-Current-Solutions-Accelerator) shows how to measure AC current using the Tracker One via the M8 connector.

## Numerical List

- [AN001 Basic SoM Design](https://github.com/particle-iot/app-notes/tree/master/AN001-Basic-SoM-Design)
- [AN002 Device Powerdown](https://github.com/particle-iot/app-notes/tree/master/AN002-Device-Powerdown)
- [AN003 Interpreting Cloud Debug](https://github.com/particle-iot/app-notes/tree/master/AN003-Interpreting-Cloud-Debug) 
- [AN004 Interpreting Cloud Debug-2](https://github.com/particle-iot/app-notes/tree/master/AN004-Interpreting-Cloud-Debug-2) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN005 Threading Explainer](https://github.com/particle-iot/app-notes/tree/master/AN005-Threading-Explainer) provides detailed information on using execution threads on Particle devices.
- [AN006 Vehicle Power](https://github.com/particle-iot/app-notes/tree/master/AN006-Vehicle-Power) provides sample designs for powering Particle devices in vehicles.
- [AN007 Tower Info](https://github.com/particle-iot/app-notes/tree/master/AN007-Tower-Info) is a tool for location nearby cellular towers.
- [AN008 Using a Xenon with the Nordic SDK](https://github.com/particle-iot/app-notes/tree/master/AN008-Xenon-Nordic-SDK)
- [AN009 Firmware Examples](https://github.com/particle-iot/app-notes/tree/master/AN009-Firmware-Examples) provides some annotated code examples, including how to effective use sleep modes.
- [AN010 Finite State Machines](https://github.com/particle-iot/app-notes/tree/master/AN010-Finite-State-Machines) shows some of the ways to effectively structure your code using finite state machines.
- [AN011 Publish to Google Sheets](https://github.com/particle-iot/app-notes/tree/master/AN011-Publish-to-Google-Sheets) shows how you can publish directly to Google G Suite spreadsheets using webhooks.
- [AN012 Tracker 1-Wire](https://github.com/particle-iot/app-notes/tree/master/AN012-Tracker-1Wire) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](https://github.com/particle-iot/app-notes/tree/master/AN013-Tracker-GPIO) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN014 Tracker I2C Scanner](https://github.com/particle-iot/app-notes/tree/master/AN014-Tracker-i2c-scanner) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.
- [AN015 Tracker Breakout](https://github.com/particle-iot/app-notes/tree/master/AN015-Tracker-Breakout) is a simple breakout board to help prototype using the Tracker One M8 connector.
- [AN016 Tracker Keypad LCD](https://github.com/particle-iot/app-notes/tree/master/AN016-Tracker-Keypad-LCD) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN017 Tracker CAN](https://github.com/particle-iot/app-notes/tree/master/AN017-Tracker-CAN) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN018 Tracker Tank Level Sensor](https://github.com/particle-iot/app-notes/tree/master/AN018-Tracker-Level) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](https://github.com/particle-iot/app-notes/tree/master/AN019-Tracker-Prototype) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](https://github.com/particle-iot/app-notes/tree/master/AN020-Tracker-4-20mA) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](https://github.com/particle-iot/app-notes/tree/master/AN021-Tracker-4-20mA-Quad) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](https://github.com/particle-iot/app-notes/tree/master/AN022-Tracker-SHT3x-Temperature-Humidity) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN023 Watchdog Timers](https://github.com/particle-iot/app-notes/tree/master/AN023-Watchdog-Timers) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN024 Tracker Relay](https://github.com/particle-iot/app-notes/tree/master/AN024-Tracker-Relay) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](https://github.com/particle-iot/app-notes/tree/master/AN025-Tracker-SoM-First-Board) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN026 Tracker Current Solutions Accelerator](https://github.com/particle-iot/app-notes/tree/master/AN026-Tracker-Current-Solutions-Accelerator) shows how to measure AC current using the Tracker One via the M8 connector.