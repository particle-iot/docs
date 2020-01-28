---
title: Xenon Standalone
layout: support.hbs
columns: two
order: 1210
---

# Xenon Standalone

It's possible to use a Xenon standalone, with no network connectivity. For example, you might do this if you only wanted to use BLE (Bluetooth LE), and did not want to use Particle cloud features.

- In Xenon standalone mode you can only flash code over USB, not OTA (over-the-air).
- Particle features like functions, variable, publish, and subscribe cannot be used.
- You cannot use low-level networking functions like UDP, TCP, and DNS either.

## Upgrade Device OS

On a standalone device the OTA process for upgrading Device OS does not work, so you must manually update the device over USB.

{{!-- Note: This process will need to be updated after 1.7.0 is released to only go as far forward as 1.6.x! --}}

Put the device in DFU mode (blinking yellow). Hold down the MODE button and tap RESET. Continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release MODE.

Then use the Particle CLI command:

```
particle update
```

Note that there are three things that are upgraded using particle update, so if you are flashing parts manually, be sure that all three parts are updated:

- Bootloader
- nRF5 SoftDevice
- Device OS (system firmware)

## Set the SYSTEM_MODE

In your device firmware, make sure you set the system mode. Here's a modified version of the blink the blue D7 LED program that works on a Xenon with no networking enabled:

```
#include "Particle.h"

SYSTEM_MODE(MANUAL);

const unsigned long BLINK_PERIOD_MS = 1000;
unsigned long lastBlink = 0;
bool blinkState = false;

void setup() {
    pinMode(D7, OUTPUT);
}

void loop() {
    if (millis() - lastBlink >= BLINK_PERIOD_MS) {
        lastBlink = millis();

        digitalWrite(D7, blinkState);
        blinkState = !blinkState;
    }
}
```

In `SYSTEM_MODE(MANUAL)`, the status LED with breathe white. This is normal.

If the device goes into blinking green (connecting to network) or blinking dark blue (and you've never configured it before), the most common causes are:

- You have device firmware that attempts to connect to the cloud. This includes the default Tinker software.
- You have an unresolved system dependency. 

The particle update command usually solves the dependency issues, but if it is not, getting a list of dependencies may help find the cause.

Put the device in listening mode by holding down the MODE button until it blinks dark blue.

Then use the Particle CLI command:

```
particle serial inspect
```

If you are using a Xenon in BLE only mode in `SYSTEM_MODE(MANUAL)` be sure to call `BLE.on()` in setup() as it defaults to off in manual mode.

## Flashing over USB

### Web IDE

In the Web IDE you will need to download the compiled binaries instead of flashing OTA. 

Click on the **Code** icon on the left (<>), the click the cloud button to download a binary.

![Download Binary](/assets/images/blinkManualDownload.png)

You can then flash the binary using the Particle CLI, below.

### Particle Workbench

You can use any of the commands to flash the Xenon over USB:

- **Particle: Flash application (local)**
- **Particle: Flash application & Device OS (local)**
- **Particle: Flash application for debug (local)**

You can also use the two-step process of using **Particle: Cloud Compile** and then use the Particle CLI to flash the *.bin file to the device in DFU mode (blinking yellow).

### Particle CLI

To flash a binary using the Particle CLI, put the Xenon in DFU (blinking yellow).

Hold down the MODE button and tap RESET. Continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release.

Then from a command prompt or terminal window, use a command like:

```
particle flash --usb firmware.bin
```

Your filename may be different that firmware.bin, and you may need to use the `cd` command to change directories. For example, if you downloaded a binary from the Web IDE, you'd probably use commands like:


```
cd Downloads
particle flash --usb firmware.bin
```

The Particle CLI can be used to compile a binary (instead of using the Web IDE or Workbench) using a command like:

```
particle compile xenon . --saveTo firmware.bin
```

This builds the application in the current directory (.). This should either contain a .cpp or .ino file, or a whole project containing a project.propertie file.

## Ethernet FeatherWing

It's not necessary to use standalone mode with an Ethernet FeatherWing. You can establish a full Particle cloud connection when using a Xenon in the Ethernet FeatherWing through Device OS 1.6.x.



