---
title: Application notes
layout: commonTwo.hbs
columns: two
---

# Application Notes

{{box op="start" cssClass="boxed warningBox"}}
This page is no longer maintained and is provided for historical reference only
{{box op="end"}}

Most of the application notes are now integrated into other topics within the documentation.

## Hardware Designs

- [AN001 Basic SoM Design](/hardware/b-series-som/basic-som-design/) is a simple SoM base board. 
Like a Boron it can be powered by LiPo battery, USB, or an external DC supply. It includes: RGB LED, bq24195 PMIC, MAX17043 Fuel Gauge, 
USB Connector, LiPo Connector (JST-PH), and M.2 SoM Connector.
- [AN006 Vehicle Power](/hardware/power/vehicle-power/) provides sample designs for powering Particle devices in vehicles.
- [AN012 Tracker 1-Wire](/hardware/tracker/projects/tracker-1wire/) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](/hardware/tracker/projects/tracker-gpio/) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN015 Tracker Breakout](/hardware/tracker/projects/tracker-breakout/) is a simple breakout board to help prototype using the Tracker One M8 connector.
- [AN016 Tracker Keypad LCD](/hardware/tracker/projects/tracker-keypad-lcd/) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN018 Tracker Tank Level Sensor](/hardware/tracker/projects/tracker-level/) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](/hardware/tracker/projects/tracker-prototype/) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](/hardware/tracker/projects/tracker-4-20ma/) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](/hardware/tracker/projects/tracker-4-20ma-quad/) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](/hardware/tracker/projects/tracker-sht3x-temperature-humidity/) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN023 Watchdog Timers](/hardware/best-practices/watchdog-timers/) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN024 Tracker Relay](/hardware/tracker/projects/tracker-relay/) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](/hardware/tracker/tracker-som/tracker-som-first-board/) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN027 Tracker Button and LEDs](/hardware/tracker/projects/tracker-buttons-leds/) shows how to connect add a push button, two LEDs, a buzzer, and a 5V I2C port for the SHT30 temperature and humidity sensor to the Tracker One using the M8 connector.
- [AN036 LCC Module SMT](/scaling/manufacturing/lcc-module-smt/) includes information about SMT processes for LCC (Leadless Chip Carrier) devices such as the Tracker SoM.


## Solutions Accelerator Projects

- [AN026 Tracker Current Solutions Accelerator](/hardware/tracker/projects/tracker-current-solutions-accelerator/) shows how to measure AC current using the Tracker One via the M8 connector.

## Programming techniques

- [AN002-Device-Powerdown](/firmware/low-power/device-powerdown/) shows how to 
have an Electron, E Series, or Boron gracefully power down under battery power when the power supply is disconnected 
then automatically power up when restored. This can be useful in automotive applications or devices powered by a switch 
in mains power applications.
- [AN005 Threading Explainer](/firmware/software-design/threading-explainer/) provides detailed information on using execution threads on Particle devices.
- [AN008 Using a Xenon with the Nordic SDK](/reference/discontinued/hardware/xenon-nordic-sdk/)
- [AN010 Finite State Machines](/firmware/software-design/finite-state-machines/) shows some of the ways to effectively structure your code using finite state machines.
- [AN011 Publish to Google Sheets](/getting-started/integrations/community-integrations/publish-to-google-sheets/) shows how you can publish directly to Google G Suite spreadsheets using webhooks.
- [AN017 Tracker CAN](/hardware/tracker/projects/tracker-can/) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN023 Watchdog Timers](/hardware/best-practices/watchdog-timers/) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN032 Calling API from web page](/reference/cloud-apis/calling-api-from-web-page/) shows how to use the Particle cloud API from a web page.
- [AN033 256K User Binaries](/reference/device-os/256K-user-binaries/) has information about 256K user firmware binaries on Gen 3 devices with Device OS 3.1 and later.
- [AN035 File System](/reference/device-os/file-system/) includes information about using the LittleFS flash file system on Gen 3 devices.
- [AN037 Ethernet](/hardware/ethernet/ethernet/) includes tips for using Ethernet with Particle Gen 3 devices.
- [AN038 Libraries](/firmware/best-practices/libraries/) includes details on using libraries in Particle projects.
- [AN040 Code Size Tip](/firmware/best-practices/code-size-tips/) includes tips on optimizing code size

## Firmware examples

- [AN028 Stop mode sleep for cellular devices](/firmware/low-power/stop-sleep-cellular/) provides an annotated code example for using stop mode sleep with cellular devices.
- [AN029 Wake, publish, then sleep for cellular devices](/firmware/low-power/wake-publish-sleep-cellular/)  provides an annotated code example for doing wake, publish, then sleep cycles with cellular devices.
- [AN030 Saving samples in EEPROM](/reference/device-os/eeprom/) provides an annotated code example for using saving samples in EEPROM and publishing them when connected.


## Troubleshooting

- [AN003 Interpreting Cloud Debug](/troubleshooting/connectivity/interpreting-cloud-debug/) shows how to 
interpret cloud debugging logs to troubleshoot various common issues.
- [AN004 Interpreting Cloud Debug-2](/troubleshooting/connectivity/interpreting-cloud-debug-2/) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN007 Tower Info](/archives/an007-tower-info/) is a tool for location nearby cellular towers.
- [AN014 Tracker I2C Scanner](/hardware/tracker/projects/tracker-i2c-scanner/) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.

## Asset Tracking

- [AN012 Tracker 1-Wire](/hardware/tracker/projects/tracker-1wire/) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](/hardware/tracker/projects/tracker-gpio/) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN014 Tracker I2C Scanner](/hardware/tracker/projects/tracker-i2c-scanner/) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.
- [AN016 Tracker Keypad LCD](/hardware/tracker/projects/tracker-keypad-lcd/) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN017 Tracker CAN](/hardware/tracker/projects/tracker-can/) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN018 Tracker Tank Level Sensor](/hardware/tracker/projects/tracker-level/) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](/hardware/tracker/projects/tracker-prototype/) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](/hardware/tracker/projects/tracker-4-20ma/) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](/hardware/tracker/projects/tracker-4-20ma-quad/) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](/hardware/tracker/projects/tracker-sht3x-temperature-humidity/) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN024 Tracker Relay](/hardware/tracker/projects/tracker-relay/) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](/hardware/tracker/tracker-som/tracker-som-first-board/) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN026 Tracker Current Solutions Accelerator](/hardware/tracker/projects/tracker-current-solutions-accelerator/) shows how to measure AC current using the Tracker One via the M8 connector.
- [AN027 Tracker Button and LEDs](/hardware/tracker/projects/tracker-buttons-leds/) shows how to connect add a push button, two LEDs, a buzzer, and a 5V I2C port for the SHT30 temperature and humidity sensor to the Tracker One using the M8 connector.
- [AN036 LCC Module SMT](/scaling/manufacturing/lcc-module-smt/) includes information about SMT processes for LCC (Leadless Chip Carrier) devices such as the Tracker SoM.


## Certification

- [AN031 Enabling Wi-Fi RF Test for ESP32](/hardware/certification/enabling-wifi-rf-test-for-esp32/) provides instructions for conducting RF tests with the ESP32 Wi-Fi chip on the Argon development kit.


## Numerical List

- [AN001 Basic SoM Design](/hardware/b-series-som/basic-som-design/)
- [AN002 Device Powerdown](/firmware/low-power/device-powerdown/)
- [AN003 Interpreting Cloud Debug](/troubleshooting/connectivity/interpreting-cloud-debug/) 
- [AN004 Interpreting Cloud Debug-2](/troubleshooting/connectivity/interpreting-cloud-debug-2/) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN005 Threading Explainer](/firmware/software-design/threading-explainer/) provides detailed information on using execution threads on Particle devices.
- [AN006 Vehicle Power](/hardware/power/vehicle-power/) provides sample designs for powering Particle devices in vehicles.
- [AN007 Tower Info](/archives/an007-tower-info/) is a tool for location nearby cellular towers.
- [AN008 Using a Xenon with the Nordic SDK](/reference/discontinued/hardware/xenon-nordic-sdk/)
- [AN009 Firmware Examples](/archives/an009-firmware-examples/) provides some annotated code examples, including how to effective use sleep modes.
- [AN010 Finite State Machines](/firmware/software-design/finite-state-machines/) shows some of the ways to effectively structure your code using finite state machines.
- [AN011 Publish to Google Sheets](/getting-started/integrations/community-integrations/publish-to-google-sheets/) shows how you can publish directly to Google G Suite spreadsheets using webhooks.
- [AN012 Tracker 1-Wire](/hardware/tracker/projects/tracker-1wire/) shows how you can add DS18B20 temperature sensors to your Tracker One and interface with 5V I2C devices.
- [AN013 Tracker GPIO](/hardware/tracker/projects/tracker-gpio/) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well.
- [AN014 Tracker I2C Scanner](/hardware/tracker/projects/tracker-i2c-scanner/) is a version of the I2C scanner application for scanning the I2C bus looking for devices designed to work with the Tracker One M8 connector I2C.
- [AN015 Tracker Breakout](/hardware/tracker/projects/tracker-breakout/) is a simple breakout board to help prototype using the Tracker One M8 connector.
- [AN016 Tracker Keypad LCD](/hardware/tracker/projects/tracker-keypad-lcd/) demonstrates adding a keypad, LCD character display, DAC, and cloud configuration to the Tracker One using the M8 connector.
- [AN017 Tracker CAN](/hardware/tracker/projects/tracker-can/) shows how to use the CAN bus for OBD-II to retrieve engine RPM and other useful techniques you may want to use in your own projects.
- [AN018 Tracker Tank Level Sensor](/hardware/tracker/projects/tracker-level/) shows how to expand the Tracker One via the M8 connector including additional GPIO, ADC, a 240-33 ohm tank level sensor input, and a 12 VDC boost converter.
- [AN019 Tracker Prototype to Board](/hardware/tracker/projects/tracker-prototype/) shows how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation and migrate to using a custom board for the Tracker One M8 Connector.
- [AN020 Tracker 4-20mA Sensor Single](/hardware/tracker/projects/tracker-4-20ma/) shows how connect 4-20mA sensors to the Tracker One. Includes a 24V boost converter that can power from the LiPo battery and overcurrent protection.
- [AN021 Tracker 4-20mA Sensor Quad](/hardware/tracker/projects/tracker-4-20ma-quad/) shows how connect up to four 4-20mA sensors to the Tracker One. Requires an external 12VDC power supply, but includes a boost converter to 24V and an I2C ADC (ADC1015).
- [AN022 Tracker SHT3x Temperature/Humidity](/hardware/tracker/projects/tracker-sht3x-temperature-humidity/) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes.
- [AN023 Watchdog Timers](/hardware/best-practices/watchdog-timers/) has information about watchdog timers, and hardware and software designs for the TPL5010 and AB1805.
- [AN024 Tracker Relay](/hardware/tracker/projects/tracker-relay/) shows how to connect two different types of relays to the Tracker One using the M8 connector.
- [AN025 Tracker SoM First Board](/hardware/tracker/tracker-som/tracker-som-first-board/) contains the Eagle CAD files for creating your first Tracker SoM base board design.
- [AN026 Tracker Current Solutions Accelerator](/hardware/tracker/projects/tracker-current-solutions-accelerator/) shows how to measure AC current using the Tracker One via the M8 connector.
- [AN027 Tracker Button and LEDs](/hardware/tracker/projects/tracker-buttons-leds/) shows how to connect add a push button, two LEDs, a buzzer, and a 5V I2C port for the SHT30 temperature and humidity sensor to the Tracker One using the M8 connector.
- [AN028 Stop mode sleep for cellular devices](/firmware/low-power/stop-sleep-cellular/) provides an annotated code example for using stop mode sleep with cellular devices.
- [AN029 Wake, publish, then sleep for cellular devices](/firmware/low-power/wake-publish-sleep-cellular/)  provides an annotated code example for doing wake, publish, then sleep cycles with cellular devices.
- [AN030 Saving samples in EEPROM](/reference/device-os/eeprom/) provides an annotated code example for using saving samples in EEPROM and publishing them when connected.
- [AN031 Enabling Wi-Fi RF Test for ESP32](/hardware/certification/enabling-wifi-rf-test-for-esp32/) provides instructions for conducting RF tests with the ESP32 Wi-Fi chip on the Argon development kit.
- [AN032 Calling API from web page](/reference/cloud-apis/calling-api-from-web-page/) shows how to use the Particle cloud API from a web page.
- [AN033 256K User Binaries](/reference/device-os/256K-user-binaries/) has information about 256K user firmware binaries on Gen 3 devices with Device OS 3.1 and later.
- [AN034 Singleton](/firmware/software-design/singleton/) includes information about using the singleton pattern for your classes.
- [AN035 File System](/reference/device-os/file-system/) includes information about using the LittleFS flash file system on Gen 3 devices.
- [AN036 LCC Module SMT](/scaling/manufacturing/lcc-module-smt/) includes information about SMT processes for LCC (Leadless Chip Carrier) devices such as the Tracker SoM.
- [AN037 Ethernet](/hardware/ethernet/ethernet/) includes tips for using Ethernet with Particle Gen 3 devices.
- [AN038 Libraries](/firmware/best-practices/libraries/) includes details on using libraries in Particle projects.
- [AN040 Code Size Tip](/firmware/best-practices/code-size-tips/) includes tips on optimizing code size
