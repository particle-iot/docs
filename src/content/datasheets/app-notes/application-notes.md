---
title: Application Notes
layout: commonTwo.hbs
columns: two
---

# Application Notes

## Hardware Designs

- [AN001 Basic SoM Design](/datasheets/app-notes/an001-basic-som-design) is a simple SoM base board. 
Like a Boron it can be powered by LiPo battery, USB, or an external DC supply. It includes: RGB LED, bq24195 PMIC, MAX17043 Fuel Gauge, 
USB Connector, LiPo Connector (JST-PH), and M.2 SoM Connector.
- [AN006 Vehicle Power](/datasheets/app-notes/an006-vehicle-power) provides sample designs for powering Particle devices in vehicles.
- [AN012 Tracker 1-Wire](/datasheets/app-notes/an012-tracker-1wire) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](/datasheets/app-notes/an013-tracker-gpio) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN015 Tracker Breakout](/datasheets/app-notes/an015-tracker-breakout) is a simple breakout board to help prototype using the Tracker One M8 connector.
- [AN016 Tracker Keypad LCD](/datasheets/app-notes/an016-tracker-keypad-lcd) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN018 Tracker Tank Level Sensor](/datasheets/app-notes/an018-tracker-level) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](/datasheets/app-notes/an019-tracker-prototype) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](/datasheets/app-notes/an020-tracker-4-20ma) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](/datasheets/app-notes/an021-tracker-4-20ma-quad) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](/datasheets/app-notes/an022-tracker-sht3x-temperature-humidity) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN023 Watchdog Timers](/datasheets/app-notes/an023-watchdog-timers) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN024 Tracker Relay](/datasheets/app-notes/an024-tracker-relay) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](/datasheets/app-notes/an025-tracker-som-first-board) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN027 Tracker Button and LEDs](/datasheets/app-notes/an027-tracker-buttons-leds) shows how to connect add a push button, two LEDs, a buzzer, and a 5V I2C port for the SHT30 temperature and humidity sensor to the Tracker One using the M8 connector.
- [AN036 LCC Module SMT](/datasheets/app-notes/an036-lcc-module-smt) includes information about SMT processes for LCC (Leadless Chip Carrier) devices such as the Tracker SoM.


## Solutions Accelerator Projects

- [AN026 Tracker Current Solutions Accelerator](/datasheets/app-notes/an026-tracker-current-solutions-accelerator) shows how to measure AC current using the Tracker One via the M8 connector.

## Programming techniques

- [AN002-Device-Powerdown](/datasheets/app-notes/an002-device-powerdown) shows how to 
have an Electron, E Series, or Boron gracefully power down under battery power when the power supply is disconnected 
then automatically power up when restored. This can be useful in automotive applications or devices powered by a switch 
in mains power applications.
- [AN005 Threading Explainer](/datasheets/app-notes/an005-threading-explainer) provides detailed information on using execution threads on Particle devices.
- [AN008 Using a Xenon with the Nordic SDK](/datasheets/app-notes/an008-xenon-nordic-sdk)
- [AN010 Finite State Machines](/datasheets/app-notes/an010-finite-state-machines) shows some of the ways to effectively structure your code using finite state machines.
- [AN011 Publish to Google Sheets](/datasheets/app-notes/an011-publish-to-google-sheets) shows how you can publish directly to Google G Suite spreadsheets using webhooks.
- [AN017 Tracker CAN](/datasheets/app-notes/an017-tracker-can) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN023 Watchdog Timers](/datasheets/app-notes/an023-watchdog-timers) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN032 Calling API from web page](/datasheets/app-notes/an032-calling-api-from-web-page) shows how to use the Particle cloud API from a web page.
- [AN033 256K User Binaries](/datasheets/app-notes/an033-256K-user-binaries) has information about 256K user firmware binaries on Gen 3 devices with Device OS 3.1 and later.
- [AN035 File System](/datasheets/app-notes/an035-file-system) includes information about using the LittleFS flash file system on Gen 3 devices.

## Firmware examples

- [AN028 Stop mode sleep for cellular devices](/datasheets/app-notes/an028-stop-sleep-cellular) provides an annotated code example for using stop mode sleep with cellular devices.
- [AN029 Wake, publish, then sleep for cellular devices](/datasheets/app-notes/an029-wake-publish-sleep-cellular)  provides an annotated code example for doing wake, publish, then sleep cycles with cellular devices.
- [AN030 Saving samples in EEPROM](/datasheets/app-notes/an030-eeprom-samples) provides an annotated code example for using saving samples in EEPROM and publishing them when connected.


## Troubleshooting

- [AN003 Interpreting Cloud Debug](/datasheets/app-notes/an003-interpreting-cloud-debug) shows how to 
interpret cloud debugging logs to troubleshoot various common issues.
- [AN004 Interpreting Cloud Debug-2](/datasheets/app-notes/an004-interpreting-cloud-debug-2) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN007 Tower Info](/datasheets/app-notes/an007-tower-info) is a tool for location nearby cellular towers.
- [AN014 Tracker I2C Scanner](/datasheets/app-notes/an014-tracker-i2c-scanner) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.

## Asset Tracking

- [AN012 Tracker 1-Wire](/datasheets/app-notes/an012-tracker-1wire) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](/datasheets/app-notes/an013-tracker-gpio) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN014 Tracker I2C Scanner](/datasheets/app-notes/an014-tracker-i2c-scanner) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.
- [AN016 Tracker Keypad LCD](/datasheets/app-notes/an016-tracker-keypad-lcd) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN017 Tracker CAN](/datasheets/app-notes/an017-tracker-can) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN018 Tracker Tank Level Sensor](/datasheets/app-notes/an018-tracker-level) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](/datasheets/app-notes/an019-tracker-prototype) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](/datasheets/app-notes/an020-tracker-4-20ma) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](/datasheets/app-notes/an021-tracker-4-20ma-quad) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](/datasheets/app-notes/an022-tracker-sht3x-temperature-humidity) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN024 Tracker Relay](/datasheets/app-notes/an024-tracker-relay) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](/datasheets/app-notes/an025-tracker-som-first-board) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN026 Tracker Current Solutions Accelerator](/datasheets/app-notes/an026-tracker-current-solutions-accelerator) shows how to measure AC current using the Tracker One via the M8 connector.
- [AN027 Tracker Button and LEDs](/datasheets/app-notes/an027-tracker-buttons-leds) shows how to connect add a push button, two LEDs, a buzzer, and a 5V I2C port for the SHT30 temperature and humidity sensor to the Tracker One using the M8 connector.
- [AN036 LCC Module SMT](/datasheets/app-notes/an036-lcc-module-smt) includes information about SMT processes for LCC (Leadless Chip Carrier) devices such as the Tracker SoM.


## Certification

- [AN031 Enabling Wi-Fi RF Test for ESP32](/datasheets/app-notes/an031-enabling-wifi-rf-test-for-esp32) provides instructions for conducting RF tests with the ESP32 Wi-Fi chip on the Argon development kit.


## Numerical List

- [AN001 Basic SoM Design](/datasheets/app-notes/an001-basic-som-design)
- [AN002 Device Powerdown](/datasheets/app-notes/an002-device-powerdown)
- [AN003 Interpreting Cloud Debug](/datasheets/app-notes/an003-interpreting-cloud-debug) 
- [AN004 Interpreting Cloud Debug-2](/datasheets/app-notes/an004-interpreting-cloud-debug-2) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN005 Threading Explainer](/datasheets/app-notes/an005-threading-explainer) provides detailed information on using execution threads on Particle devices.
- [AN006 Vehicle Power](/datasheets/app-notes/an006-vehicle-power) provides sample designs for powering Particle devices in vehicles.
- [AN007 Tower Info](/datasheets/app-notes/an007-tower-info) is a tool for location nearby cellular towers.
- [AN008 Using a Xenon with the Nordic SDK](/datasheets/app-notes/an008-xenon-nordic-sdk)
- [AN009 Firmware Examples](/datasheets/app-notes/an009-firmware-examples) provides some annotated code examples, including how to effective use sleep modes.
- [AN010 Finite State Machines](/datasheets/app-notes/an010-finite-state-machines) shows some of the ways to effectively structure your code using finite state machines.
- [AN011 Publish to Google Sheets](/datasheets/app-notes/an011-publish-to-google-sheets) shows how you can publish directly to Google G Suite spreadsheets using webhooks.
- [AN012 Tracker 1-Wire](/datasheets/app-notes/an012-tracker-1wire) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](/datasheets/app-notes/an013-tracker-gpio) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN014 Tracker I2C Scanner](/datasheets/app-notes/an014-tracker-i2c-scanner) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.
- [AN015 Tracker Breakout](/datasheets/app-notes/an015-tracker-breakout) is a simple breakout board to help prototype using the Tracker One M8 connector.
- [AN016 Tracker Keypad LCD](/datasheets/app-notes/an016-tracker-keypad-lcd) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN017 Tracker CAN](/datasheets/app-notes/an017-tracker-can) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN018 Tracker Tank Level Sensor](/datasheets/app-notes/an018-tracker-level) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](/datasheets/app-notes/an019-tracker-prototype) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](/datasheets/app-notes/an020-tracker-4-20ma) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](/datasheets/app-notes/an021-tracker-4-20ma-quad) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](/datasheets/app-notes/an022-tracker-sht3x-temperature-humidity) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN023 Watchdog Timers](/datasheets/app-notes/an023-watchdog-timers) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN024 Tracker Relay](/datasheets/app-notes/an024-tracker-relay) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](/datasheets/app-notes/an025-tracker-som-first-board) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN026 Tracker Current Solutions Accelerator](/datasheets/app-notes/an026-tracker-current-solutions-accelerator) shows how to measure AC current using the Tracker One via the M8 connector.
- [AN027 Tracker Button and LEDs](/datasheets/app-notes/an027-tracker-buttons-leds) shows how to connect add a push button, two LEDs, a buzzer, and a 5V I2C port for the SHT30 temperature and humidity sensor to the Tracker One using the M8 connector.
- [AN028 Stop mode sleep for cellular devices](/datasheets/app-notes/an028-stop-sleep-cellular) provides an annotated code example for using stop mode sleep with cellular devices.
- [AN029 Wake, publish, then sleep for cellular devices](/datasheets/app-notes/an029-wake-publish-sleep-cellular)  provides an annotated code example for doing wake, publish, then sleep cycles with cellular devices.
- [AN030 Saving samples in EEPROM](/datasheets/app-notes/an030-eeprom-samples) provides an annotated code example for using saving samples in EEPROM and publishing them when connected.
- [AN031 Enabling Wi-Fi RF Test for ESP32](/datasheets/app-notes/an031-enabling-wifi-rf-test-for-esp32) provides instructions for conducting RF tests with the ESP32 Wi-Fi chip on the Argon development kit.
- [AN032 Calling API from web page](/datasheets/app-notes/an032-calling-api-from-web-page) shows how to use the Particle cloud API from a web page.
- [AN033 256K User Binaries](/datasheets/app-notes/an033-256K-user-binaries) has information about 256K user firmware binaries on Gen 3 devices with Device OS 3.1 and later.
- [AN034 Singleton](/datasheets/app-notes/an034-singleton) includes information about using the singleton pattern for your classes.
- [AN035 File System](/datasheets/app-notes/an035-file-system) includes information about using the LittleFS flash file system on Gen 3 devices.
- [AN036 LCC Module SMT](/datasheets/app-notes/an036-lcc-module-smt) includes information about SMT processes for LCC (Leadless Chip Carrier) devices such as the Tracker SoM.
