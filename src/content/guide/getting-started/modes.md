---
title: Device Modes
template: guide.hbs
columns: two
devices: [ photon, core ]
order: 4
---

# Device Modes

Now that we've gone over connecting your device, we're going to review the different modes for your Core or Photon. We suggest that you loop through this section, putting your device in the different listed modes to familiarize yourself with them.

{{#if photon}}

## Standard Modes

These modes are the typical behaviors you will see from your Photon on a regular basis. They are the light patterns of a healthy photon.

### Connected

{{{vine "https://vine.co/v/eZUg2ZjVpn7/embed/simple"}}}

When it is breathing cyan, your device is happily connected to the internet. When it is in this mode, you can call functions and flash code.


### OTA Firmware Update

{{{vine "https://vine.co/v/eZUX322TaU2/embed/simple"}}}

If your device is flashing magenta, it is currently loading an app or updating its firmware. This state is triggered by a firmware update or by flashing code from Particle Dev or Particle Build. You will often see this mode when you connect your Photon to the cloud for the first time.

Note that, if you enter this mode by holding `SETUP` on boot, flashing magenta indicates that letting go of the `SETUP` button will enter safe mode to connect to the cloud and not run application firmware.


### Looking For Internet

{{{vine "https://vine.co/v/eZUX7KJQnbX/embed/simple"}}}

If your device is flashing green, it is trying to connect to the internet. If you already entered your wifi credentials, give your device a few seconds to connect and start breathing cyan. If you haven't yet connected your device to wifi, then set your device to [Listening Mode](#photon-modes-listening-mode).


### Connecting to the Cloud

When the device is in the process of connecting to the cloud, it will rapidly flash cyan. You often see this mode when you first connect your Photon to a network, after it has just flashed green.


### Wi-Fi Off

If your device is breathing white, the Wi-Fi module is off. You might see this mode if:

- You have set your module to `MANUAL` or `SEMI_AUTOMATIC` in your user firmware
- You have called `WiFi.off()` in your user firmware


### Listening Mode

{{{vine "https://vine.co/v/eZUH7WaWjMT/embed/simple"}}}

When your device is in Listening Mode, it is waiting for your input to connect to the wifi. Your device needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

{{{vine "https://vine.co/v/eZUHUIjq7pO/embed/simple"}}}

To put your device in Listening Mode, hold the `SETUP` button for three seconds, until the RGB LED begins flashing blue.


### Wi-Fi Network Reset

{{{vine "https://vine.co/v/eZUwtJljYnK/embed/simple"}}}

To erase the stored wifi networks on your device, hold the `SETUP` button for about ten seconds, until the RGB LED flashes blue rapidly.

You can also reset the Wi-Fi networks by holding the `SETUP` button and tapping `RESET`, then continuing to hold `SETUP` until the light on the Photon turns white. (This differs from the Core. Doing this action on the Core will result in a factory reset.)

### Safe Mode

{{{vine "https://vine.co/v/eZUF2ilvLxJ/embed/simple"}}}

Safe mode connects the device to the cloud, but does not run any application firmware. This mode is one of the most useful for development or for troubleshooting. If something goes wrong with the app you loaded onto your device, you can set your device to Safe Mode. This runs the device's system firmware but doesn't execute any application code, which can be useful if the application code contains bugs that stop the device from connecting to the cloud.

**The device indicates that it is in Safe Mode with the LED, which breathes magenta.**


To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the RESET button, while holding down the SETUP button.
3. Wait for the LED to start flashing magenta
6. Release the SETUP button

The device will itself automatically enter safe mode if there is no application code flashed to the device or when the application is not valid.

### DFU Mode (Device Firmware Upgrade)

{{{vine "https://vine.co/v/eZUHnhaUD9Y/embed/simple"}}}

If you wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the [dfu-utility.](https://s3.amazonaws.com/spark-assets/dfu-util-0.8-binaries.tar.xz)

Installation tutorial can be found [here.](/photon/cli/#upgrading-from-the-spark-cli-advanced-install)

To enter DFU Mode:

1. Hold down BOTH buttons
2. Release only the RESET button, while holding down the SETUP button.
3. Wait for the LED to start flashing yellow (it will flash magenta first)
6. Release the SETUP button

{{{vine "https://vine.co/v/eZUXM7ETevY/embed/simple"}}}

The device now is in the DFU mode.

### Firmware Reset

Firmware reset is not available on the Photon/P1, but not to worry! If you are experiencing problems with your application firmware, you can use [Safe Mode](#safe-mode) to recover.

### Factory Reset

Factory reset is not available on the Photon/P1, but not to worry! If you are experiencing problems with your application firmware, you can use [Safe Mode](#safe-mode) to recover.

You can reset Wi-Fi credentials by performing a [WiFi Network Reset](#wifi-network-reset).

## Troubleshooting Modes

These modes let you know about more atypical issues your photon might be exhibiting. Use this section to troubleshoot strange colors you might see from your Photon.


### Wi-Fi Module Not Connected

If the Wi-Fi module is on but not connected to a network, your Photon will breathe blue. Note that this will be dark blue and not cyan.


### Cloud Not Connected

When the device is connected to a Wi-Fi network but not to the cloud, it will breathe green.


### Bad Public Key

When the server public key is bad, the device will flash alternately cyan and red.


### Red Flash Basic Errors

Flashing red indicates various errors.

- 2 red flashes: Could not reach the internet.
- 3 red flashes: Connected to the internet, but could not reach the Particle Cloud.
- Flashing "orange": This sometimes is misdiagnosed as yellow or red and indicates bad device keys.


{{/if}}

{{#if core}}

### Connected

{{{vine "https://vine.co/v/eZU92D9X9ge/embed/simple"}}}

When breathing cyan, your device is happily connected to the internet. When it is in this mode, you can call functions and flash code.

### Flashing

{{{vine "https://vine.co/v/eZU9LDuVKnr/embed/simple"}}}

Your device is currently loading an app or updating its firmware. Triggered by a firmware update or by flashing code from Particle Dev or Particle Build.


### Looking For Internet

{{{vine "https://vine.co/v/eZU6zBzpW6U/embed/simple"}}}

Your device is trying to find the internet. If you already entered your wifi credentials, give your device a few seconds to connect and start breathing cyan. If you haven't yet connected your device to wifi, then set your device to [Listening Mode](/core/modes/#core-modes-listening-mode). If your Core continuously flashes green and won't stop, then try doing a [full firmware update](https://community.particle.io/t/spark-core-common-issues/12383).


### Listening Mode

{{{vine "https://vine.co/v/eZU6YiK20Hl/embed/simple"}}}

When your device is in Listening Mode, it is waiting for your input to connect to the wifi. Your device needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

{{{vine "https://vine.co/v/eZUgHYYrYgl/embed/simple"}}}

To put your device in Listening Mode, hold the `MODE` button for three seconds, until the RGB LED begins flashing blue.


### Wifi Network Reset

{{{vine "https://vine.co/v/eZU6expA5bA/embed/simple"}}}

To erase the stored wifi networks on your device, hold the `MODE` button for about ten seconds, until the RGB LED flashes blue rapidly.


### Factory Reset

{{{vine "https://vine.co/v/eZU6XdrYbd5/embed/simple"}}}

A factory reset restores the firmware on the device to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the device change from flashing yellow to flashing white. Then release the button.  The device should begin after the factory reset is complete.

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow (continue to hold the MODE button)
4. The LED will turn solid white (continue to hold the MODE button)
5. Finally, the LED will turn blink white rapidly
6. Release the MODE button



### DFU Mode (Device Firmware Upgrade)

{{{vine "https://vine.co/v/eZUgeu0r639/embed/simple"}}}

If you wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the [dfu-utility.](https://s3.amazonaws.com/spark-assets/dfu-util-0.8-binaries.tar.xz)

Installation tutorial can be found [here.](/core/cli/#installing-advanced-install)

Procedure:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow
6. Release the MODE button


The device now is in the DFU mode.

{{/if}}

### Red Flash SOS

Is your device flashing red? Oh no!

A pattern of more than 10 red flashes is caused by the firmware crashing. The pattern is 3 short flashes, 3 long flashes, 3 short flashes (SOS pattern), followed by a number of flashes that depend on the error, then the SOS pattern again.

{{#if photon}}
[Enter safe mode](#safe-mode), tweak your firmware and try again!
{{else}}
[Perform a factory reset](#factory-reset), tweak your firmware and try again!
{{/if}}

There are a number of other red flash codes that may be expressed after the SOS blinks:

#1 Hard fault
#2 Non-maskable interrupt fault
#3 Memory Manager fault
#4 Bus fault
#5 Usage fault
#6 Invalid length
#7 Exit
#8 Out of heap memory
#9 SPI over-run
#10 Assertion failure
#11 Invalid case
#12 Pure virtual call


Don't forget that the [community forum is always there to help](https://community.particle.io).
