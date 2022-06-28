---
title: Troubleshooting the Setup Process
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
The following document seeks to locate all of Particle's resources for troubleshooting setup issues in one place. Scroll to the device type in question, walk through the suggested process, and ensure that you have taken the appended troubleshooting steps before submitting a support ticket!.

## Photon/P1

_For issues setting up a Particle Photon/P1, it's best to use the CLI (Command Line Interface) for device configuration. You can find CLI installation instructions here ([link](https://docs.particle.io/tutorials/developer-tools/cli/)) and CLI troubleshooting tactics here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)) should you experience an issue with this tool._

**1\.** Ensure your device powers on. If the device does not power on (does not display any information via its status LED) follow the instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801176309-Identifying-Damaged-Hardware)) to diagnose further.

**2.** Assuming that the device can power on correctly, connect it via USB. Open up your computer's Terminal (Mac) / cmd.exe (Windows) for Command Line access to the device.

**3.** Run the following commands, taking note of expected responses:

* `particle usb dfu` \- the device should blink yellow. If it does not blink yellow, this is for the most part OK - you can do this manually. Press both RESET and MODE buttons on the device and hold them down together. Release the RESET button, and wait until the Status LED Blinks Yellow. Then release the MODE button. The device should continue to Blink Yellow.
* `particle update` \- the device should blink a variety of colors as it performs an operating system update. Wait until the CLI signals that the process is complete.
* `particle usb dfu` \- the device should more easily enter DFU mode this time.
* `particle flash --usb tinker` \- the device should blink a variety of colors as it updates application firmware. Wait until the CLI signals the completion of this process; the device should blink dark blue or green.
* If the device does not blink dark blue, use the command: `particle usb start-listening`.
* From there, use `particle serial wifi` to configure WiFi. Skip to **Troubleshooting Resources** if you run into any errors here. Otherwise your device should blink green, flash cyan, and after a few seconds it should stabilize with a gently breathing cyan light.
* After you've done this, use `particle usb start-listening`, after which the device should go back to blinking dark blue. Run `particle identify` and copy your Device ID.
* Reset the device, allow it to return to breathing cyan, and then run the command `particle device add YOURDEVICEID`, replacing `YOURDEVICEID` with the value from the command above.

### Troubleshooting Resources:

* If CLI commands are failing with errors, follow the CLI instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)).
* If the CLI reports that it cannot find a device connected, first take care that your device is in the correct mode specified above. Then, follow the USB connectivity troubleshooting instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330/#CLI-does-not-recognize-device)).
* If the device blinks green or cyan with intermittent blinks of orange, green, or yellow - please follow our generic WiFi Connectivity Guide ([link](https://support.particle.io/hc/en-us/articles/360052621274)) to ensure your WiFi is compatible. Proceed further with detailed WiFi troubleshooting instructions here ([link](https://support.particle.io/hc/en-us/articles/1260800692169-Troubleshooting-WiFi-on-the-Particle-Photon-P1)), and **ensure you've collected the logs necessary to open a support ticket**.
* If you receive errors that the device belongs to another user, please follow the instructions here ([link](https://support.particle.io/hc/articles/360045423454/)).

## Electron/E-Series

_For issues setting up a Particle Electron/E-Series, it's best to use the CLI (Command Line Interface) for device configuration. You can find CLI installation instructions here ([link](https://docs.particle.io/tutorials/developer-tools/cli/)) and CLI troubleshooting tactics here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)) should you experience an issue with this tool._

**1\.** Ensure your device powers on. If the device does not power on (does not display any information via its status LED) follow the instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801176309-Identifying-Damaged-Hardware)) to diagnose further.

**2.** Assuming that the device can power on correctly, connect it via USB. Open up your computer's Terminal (Mac) / cmd.exe (Windows) for Command Line access to the device.

**3.** Run the following commands, taking note of expected responses:

* `particle usb dfu` \- the device should blink yellow. If it does not blink yellow, this is for the most part OK - you can do this manually. Press both RESET and MODE buttons on the device and hold them down together. Release the RESET button, and wait until the Status LED Blinks Yellow. Then release the MODE button. The device should continue to Blink Yellow.
* `particle update` \- the device should blink a variety of colors as it performs an operating system update. Wait until the CLI signals that the process is complete.
* `particle usb dfu` \- the device should more easily enter DFU mode this time.
* `particle flash --usb tinker` \- the device should blink a variety of colors as it updates application firmware. Wait until the CLI signals the completion of this process; the device should blink green.
* After you've done this, use `particle usb start-listening`, after which the device should enter a blinking dark blue state. Run `particle identify` and copy your Device ID and ICCID.
* Visit <setup.particle.io> and select "Activate a Particle SIM". Enter the ICCID from the command above. Reset your device and wait for it to breathe cyan - this may take a few minutes (and in some extreme circumstances it can take within 2 hours).
* Once the device is breathing cyan, run the command `particle device add YOURDEVICEID`, replacing `YOURDEVICEID` with the Device ID value from
* `particle identify` command.

### Troubleshooting Resources:

* If CLI commands are failing with errors, follow the CLI instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)).
* If the CLI reports that it cannot find a device connected, first take care that your device is in the correct mode specified above. Then, follow the USB connectivity troubleshooting instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330/#CLI-does-not-recognize-device)).
* If the device blinks green or cyan with intermittent blinks of orange, green, or yellow - ensure your device is in a supported region ([link](https://support.particle.io/hc/en-us/articles/1500000013382)), and then please follow our generic Cellular Connectivity Guide ([link](https://support.particle.io/hc/en-us/articles/360044518213)) to troubleshoot. **Ensure you've collected the logs necessary to open a support ticket**.
* If you receive errors that the device belongs to another user, please follow the instructions here ([link](https://support.particle.io/hc/articles/360045423454/)).

## Argon

_For issues setting up a Particle Argon, it's best to use the CLI (Command Line Interface) for device configuration. You can find CLI installation instructions here ([link](https://docs.particle.io/tutorials/developer-tools/cli/)) and CLI troubleshooting tactics here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)) should you experience an issue with this tool._

**1\.** Ensure your device powers on. If the device does not power on (does not display any information via its status LED) follow the instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801176309-Identifying-Damaged-Hardware)) to diagnose further.

**2.** Follow the instructions here ([link](https://support.particle.io/hc/articles/360045547634/)) to set up your device. We **strongly recommend troubleshooting via the CLI and not the mobile app**, as it eliminates many potential variables from the diagnostic process.

### Troubleshooting Resources:

* If CLI commands are failing with errors, follow the CLI instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)).
* If the CLI reports that it cannot find a device connected, first take care that your device is in the correct mode specified above. Then, follow the USB connectivity troubleshooting instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330/#CLI-does-not-recognize-device)).
* If the device blinks green or cyan with intermittent blinks of orange, green, or yellow - please follow our generic WiFi Connectivity Guide ([link](https://support.particle.io/hc/en-us/articles/360052621274)) to ensure your WiFi is compatible. Proceed further with detailed WiFi troubleshooting instructions here ([link](https://support.particle.io/hc/en-us/articles/1260800691709-Troubleshooting-WiFi-on-the-Particle-Argon)), and **ensure you've collected the logs necessary to open a support ticket**.
* If you receive errors that the device belongs to another user, please follow the instructions here ([link](https://support.particle.io/hc/articles/360045423454/)).

## Boron/B-Series

_For issues setting up a Particle Boron/B-Series, it's best to use the CLI (Command Line Interface) for device configuration. You can find CLI installation instructions here ([link](https://docs.particle.io/tutorials/developer-tools/cli/)) and CLI troubleshooting tactics here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)) should you experience an issue with this tool._

**1\.** Ensure your device powers on. If the device does not power on (does not display any information via its status LED) follow the instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801176309-Identifying-Damaged-Hardware)) to diagnose further.

**2.** Follow the instructions here ([link](https://support.particle.io/hc/articles/360045547634/)) to set up your device. We **strongly recommend troubleshooting via the CLI and not the mobile app**, as it eliminates many potential variables from the diagnostic process.

### Troubleshooting Resources:

* If CLI commands are failing with errors, follow the CLI instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330-Troubleshooting-the-Particle-CLI)).
* If the CLI reports that it cannot find a device connected, first take care that your device is in the correct mode specified above. Then, follow the USB connectivity troubleshooting instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801311330/#CLI-does-not-recognize-device)).
* If the device blinks green or cyan with intermittent blinks of orange, green, or yellow - ensure your device is in a supported region ([link](https://support.particle.io/hc/en-us/articles/1500000013382)), and then please follow our generic Cellular Connectivity Guide ([link](https://support.particle.io/hc/en-us/articles/360044518213)) to troubleshoot. **Ensure you've collected the logs necessary to open a support ticket**.
* If you receive errors that the device belongs to another user, please follow the instructions here ([link](https://support.particle.io/hc/articles/360045423454/)).

## Tracker One/Tracker SoM

**1\.** Ensure your device powers on. If the device does not power on (does not display any information via its status LED) follow the instructions here ([link](https://support.particle.io/hc/en-us/articles/1260801176309-Identifying-Damaged-Hardware)) to diagnose further.

**2.** Follow the instructions here ([link](https://docs.particle.io/tutorials/asset-tracking/setup/#setup)) to set up your device. If the conventional setup mode is failing in some way, take note of the error you are receiving. Go through the "Manual Setup" process, take a note of successes and/or failures, and then submit a support ticket to report the setup issue.

### Troubleshooting Resources:

* If the device blinks green or cyan with intermittent blinks of orange, green, or yellow - ensure your device is in a supported region ([link](https://support.particle.io/hc/en-us/articles/1500000013382)), and then please follow our generic Cellular Connectivity Guide ([link](https://support.particle.io/hc/en-us/articles/360044518213)) to troubleshoot. **Ensure you've collected the logs necessary to open a support ticket**.
* If you receive errors that the device belongs to another user, please follow the instructions here ([link](https://support.particle.io/hc/articles/360045423454/)).
