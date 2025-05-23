---
title: AN009 Firmware Examples
layout: commonTwo.hbs
columns: two
---
# AN009 Firmware examples

{{box op="start" cssClass="boxed warningBox"}}
This page is no longer maintained and is provided for historical reference only
{{box op="end"}}

This application note has been split out into separate application notes.




## Publishing examples, Sleeping Cellular Devices

There are three examples of periodically publishing data from an E-Series, Electron, Boron, or B-Series SoM that mostly sleeps.

#### Wake publish sleep cellular

This example illustrates:

- Checking that the battery has sufficient capacity to connect.
- Sleep on multiple connection failure to preserve battery.
- Hour sleep, uses hibernation (`SLEEP_MODE_DEEP`).
- This example is best for long sleep times, 15 minutes or more.
- Use SEMI_AUTOMATIC mode.
- Stay awake for firmware updates (optional).
- [AN029 Wake, publish, then sleep for cellular devices](/firmware/low-power/wake-publish-sleep-cellular/)  provides an annotated code example for doing wake, publish, then sleep cycles with cellular devices.

#### Stop sleep cellular

This example illustrates:

- Checking that the battery has sufficient capacity to connect.
- Sleep on multiple connection failure to preserve battery.
- 5 minute sleep, using stop mode sleep with cellular standby (`SLEEP_NETWORK_STANDBY`).
- This example is best with short sleep times, under 15 minutes or if you want to be able to publish very quickly after waking up.
- Customizable sending of device diagnostics.
- Customizable software update behavior.
- [AN028 Stop mode sleep for cellular devices](/firmware/low-power/stop-sleep-cellular/) provides an annotated code example for using stop mode sleep with cellular devices.

#### EEPROM Samples

This is the most complicated example. It illustrates:

- 5 minute sleep, using stop mode sleep with cellular standby (`SLEEP_NETWORK_STANDBY`).
- This example is best with short sleep times, under 15 minutes or if you want to be able to publish very quickly after waking up.
- Customizable sending of device diagnostics.
- Customizable software update behavior.
- Stores samples in EEPROM so they are preserved even if the connection fails.
- Periodic sampling with minimal drift, even with connection failures.
- [AN030 Saving samples in EEPROM](/reference/device-os/eeprom/) provides an annotated code example for using saving samples in EEPROM and publishing them when connected.




