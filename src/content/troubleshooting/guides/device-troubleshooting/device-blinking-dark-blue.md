---
title: Device Blinking Dark Blue
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

**Caveat:** the following applies to the third generation of the Particle Platform (Argons, Borons, BSoM/B5SoM) only. If you have an Electron with this issue, please see our resource here: ([link](/troubleshooting/led/#listening-mode)). If you have an E-Series that is Blinking Dark Blue, please open a support ticket.


## The setup flag

In order to facilitate a smooth and rapid mobile setup, Gen3 Devices have a flag set in their DCT sector that, when active, boots the Device into Listening Mode. **A Device in Listening Mode awaits further configuration and Blinks Dark Blue.** Normally, when you complete mobile phone-based setup, this flag is marked as done. In the absence of mobile setup (like in our [Gen3 Setup via USB Process](/troubleshooting/guides/device-management/how-can-i-set-up-my-argon-or-boron-via-usb/)) and in a few rare mobile setup edge cases, **Argons or Borons can become stuck in this state. The issue will manifest immediately (upon first reboot after setup) and the fix is permanent and very fast.**

See below for three methods you can use to trip this setup flag in the right direction!

**With Device OS 4.0 and later, there is no setup done flag and this step is unnecessary.**

## Marking setup done using the Particle CLI

This is by far the easiest and fastest way to fix the issue, but it requires a hardwired connection (via USB).

If you haven't already, install the Particle CLI ([link](/getting-started/developer-tools/cli/)). Then connect your Argon or Boron via USB, open up your computer's Terminal, and run the command:

particle usb setup-done

You can optionally specify the name or Device ID of a Device if there is more than one connected by USB.

If this does now work, please take care to place your device in Safe Mode. In order to enter Safe Mode, press both RESET and MODE buttons and hold them down together. Release the RESET button, and wait until the Status LED Blinks Magenta. Then release the MODE button. The device should start Blinking Green (connecting to the Cloud) and then (provided connectivity) Breathing Magenta (connected to the Cloud - the same as Breathing Cyan, but in Safe Mode). **Once your device is in Safe Mode, try again.**

## Marking setup done from code

If the Device is remote, and if there is a tech nearby who can get the Device back online by running your setup configuration again, you can set the flag from code by flashing this firmware to your Device:

```cpp
#include "Particle.h"

#include "dct.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	// 0x01 = setup done
	// 0xff = setup not done (go into listening mode at boot)
	const uint8_t val = 0x01;
	dct_write_app_data(&val, DCT_SETUP_DONE_OFFSET, 1);

	// This is just so you know the operation is complete
	pinMode(D7, OUTPUT);
	digitalWrite(D7, HIGH);
}

void loop() {
}
```

You only need to do this once, as the setting is stored in configuration flash.

**Note: the above sketch was designed to be flashed as separate, preparatory firmware prior to production firmware. One should avoid including the DCT write above within your production firmware, as it could in some rare circumstances lead to DCT corruption.** 

## Marking setup done via dfu-util

You can also set the setup done flag locally using dfu-util. Put the device in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.

**Argon**:

```
echo -n -e \\x01 > dummy.bin
dfu-util -d 2b04:d00c -a 1 -s 8134:leave -D dummy.bin
```

**Boron**:

```
echo -n -e \\x01 > dummy.bin
dfu-util -d 2b04:d00d -a 1 -s 8134:leave -D dummy.bin
```

You only need to do this once, as the setting is stored in configuration flash, unless you clear credentials (fast blinking dark blue), then you need to do it again.
