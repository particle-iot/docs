---
title: Device Modes
template: guide.hbs
columns: two
devices: [ photon,electron,core ]
order: 4
---

# Device Modes

Now that we've gone over connecting your device, we're going to review the different modes for your {{device}}. We suggest that you work through this section, putting your device in the different listed modes to familiarize yourself with them.

## Standard Modes
{{#if photon}}
These modes are the typical behaviors you will see from your {{device}} on a regular basis. They are the light patterns of a healthy {{device}}.

Here's the typical pattern of a {{device}} after power up.

{{{device-animation device "pattern"
  "off 1000ms"
  "on white 1000ms"
  "blink lime 8 times"
  "blink cyan 8 times"
  "breathe cyan 3 times"
  "off 1000ms"
}}}

{{!-- Use this block for the RSSI UX

{{{device-animation device "pattern"
  "on rgba(0, 255, 0, 0.4) 1000ms"
  "on rgba(0, 255, 0, 1) 200ms"
  "on rgba(0, 255, 0, 0.4) 300ms"
  "on rgba(0, 255, 0, 1) 200ms"
  "on rgba(0, 255, 0, 0.4) 300ms"
  "on rgba(0, 255, 0, 1) 200ms"
  "on rgba(0, 255, 0, 0.4) 300ms"
  "off 2000ms"
}}}

--}}

{{/if}}

### Connected

{{{device-animation device "breathe" "cyan" }}}

When it is breathing cyan, your {{device}} is happily connected to the Internet. When it is in this mode, you can call functions and flash code.


### OTA Firmware Update

{{{device-animation device "blink" "magenta" }}}

If your {{device}} is blinking magenta, it is currently loading an app or updating its firmware. This state is triggered by a firmware update or by flashing code from Particle Dev or Particle Build. You will often see this mode when you connect your {{device}} to the cloud for the first time.


Note that, if you enter this mode by holding {{#if photon}}`SETUP`{{/if}}{{#unless photon}}`MODE`{{/unless}} on boot, blinking magenta indicates that letting go of the {{#if photon}}`SETUP`{{/if}}{{#unless photon}}`MODE`{{/unless}} button will enter safe mode to connect to the cloud and not run application firmware.

### Looking For Internet

{{{device-animation device "blink" "lime" }}}

If your {{device}} is blinking green, it is trying to connect to the internet. If you already entered your {{#if electron}}cellular{{/if}}{{#if photon}}Wi-Fi{{/if}}{{#if core}}Wi-Fi{{/if}} credentials, give your device a few seconds to connect and start breathing cyan.

{{#if photon}}
If you haven't yet connected your {{device}} to Wi-Fi, then set your device to [Listening Mode](#listening-mode).
{{/if}}

{{#if core}}
If you haven't yet connected your {{device}} to Wi-Fi, then set your device to [Listening Mode](#listening-mode). If your {{device}} continuously blinks green and won't stop, then try doing a [full firmware update](https://community.particle.io/t/spark-core-common-issues/12383).
{{/if}}

{{#if electron}}
If you haven't connected your {{device}} to a cellular tower yet, please wait up to ten minutes. If it takes longer than that, refer to [cellular troubleshooting section](/support/troubleshooting/common-issues/electron/#blinking-green).

{{/if}}

{{#if photon}}

### Connecting to the Cloud

{{{device-animation device "blink" "cyan" }}}

When the {{device}} is in the process of connecting to the cloud, it will rapidly blink cyan. You often see this mode when you first connect your {{device}} to a network, after it has just blinked green.

{{/if}}

{{#if electron}}### Cellular Off{{/if}}
{{#if photon}}### Wi-Fi Off
{{/if}}
{{#if core}}### Wi-Fi Off
{{/if}}


{{{device-animation device "breathe" "white" }}}

If your {{device}} is breathing white, the {{#if electron}}cellular{{/if}}{{#if photon}}Wi-Fi{{/if}}{{#if core}}Wi-Fi{{/if}} module is off. You might see this mode if:

- You have set your module to `MANUAL` or `SEMI_AUTOMATIC` in your user firmware
- You have called {{#if electron}}`Cellular.off()`{{/if}}{{#if photon}}`Wifi.off()`{{/if}}{{#if core}}`Wifi.off()`{{/if}} in your user firmware


### Listening Mode

{{{device-animation device "blink" "blue" 300 300 }}}

When your {{device}} is in Listening Mode, it is waiting for your input to connect to {{#if electron}}a cellular tower{{/if}}{{#if photon}}Wi-Fi{{/if}}{{#if core}}Wi-Fi{{/if}}. Your {{device}} needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

{{#if photon}}
{{{vine "https://vine.co/v/eZUHUIjq7pO/embed/simple"}}}

To put your {{device}} in Listening Mode, hold the `SETUP` button for three seconds, until the RGB LED begins blinking blue.
{{/if}}

{{#if electron}}
{{#if photon}}
{{{vine "https://vine.co/v/eZUHUIjq7pO/embed/simple"}}}
{{/if}}

To put your {{device}} in Listening Mode, hold the `MODE` button for three seconds, until the RGB LED begins blinking blue.
{{/if}}

{{#if core}}
{{{vine "https://vine.co/v/eZUgHYYrYgl/embed/simple"}}}

To put your {{device}} in Listening Mode, hold the `MODE` button for three seconds, until the RGB LED begins blinking blue.
{{/if}}


{{#if photon}}

### Wi-Fi Network Reset

{{{vine "https://vine.co/v/eZUwtJljYnK/embed/simple"}}}

To erase the stored wifi networks on your {{device}}, hold the `SETUP` button for about ten seconds, until the RGB LED blinks blue rapidly.

You can also reset the Wi-Fi networks by holding the `SETUP` button and tapping `RESET`, then continuing to hold `SETUP` until the light on the {{device}} turns white. (This differs from the Core. Doing this action on the Core will result in a factory reset.)

{{/if}}

{{#if core}}

### Wi-Fi Network Reset

{{{vine "https://vine.co/v/eZU6expA5bA/embed/simple"}}}

To erase the stored wifi networks on your {{device}}, hold the `MODE` button for about ten seconds, until the RGB LED blinks blue rapidly.

{{/if}}

{{#if photon}}

### Safe Mode

{{{device-animation device "breathe" "magenta" }}}

Safe mode connects the {{device}} to the cloud, but does not run any application firmware. This mode is one of the most useful for development or for troubleshooting. If something goes wrong with the app you loaded onto your device, you can set your device to Safe Mode. This runs the device's system firmware but doesn't execute any application code, which can be useful if the application code contains bugs that stop the device from connecting to the cloud.

**The {{device}} indicates that it is in Safe Mode with the LED, which breathes magenta.**

To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the `RESET` button, while holding down the `SETUP` button.
3. Wait for the LED to start blinking magenta
6. Release the `SETUP` button

The device will itself automatically enter safe mode if there is no application code flashed to the device or when the application is not valid.

{{{vine "https://vine.co/v/eZUF2ilvLxJ/embed/simple"}}}

{{/if}}

{{#if electron}}

### Safe Mode

{{{device-animation device "breathe" "magenta" }}}

Safe mode connects the {{device}} to the cloud, but does not run any application firmware. This mode is one of the most useful for development or for troubleshooting. If something goes wrong with the app you loaded onto your device, you can set your device to Safe Mode. This runs the device's system firmware but doesn't execute any application code, which can be useful if the application code contains bugs that stop the device from connecting to the cloud.

**The {{device}} indicates that it is in Safe Mode with the LED, which breathes magenta.**

To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the `RESET` button, while holding down the `MODE` button.
3. Wait for the LED to start blinking magenta
6. Release the `MODE` button

The device will itself automatically enter safe mode if there is no application code flashed to the device or when the application is not valid.


{{/if}}

### DFU Mode (Device Firmware Upgrade)

{{{device-animation device "blink" "yellow" }}}

If you wish to program your {{device}} with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the [dfu-utility.](https://s3.amazonaws.com/spark-assets/dfu-util-0.8-binaries.tar.xz)

Installation tutorial can be found [here.](/guide/tools-and-features/cli/)

And a usage guide [here.](/reference/cli/)

To enter DFU Mode:

{{#unless core}}

1. Hold down BOTH buttons
2. Release only the `RESET` button, while holding down the {{#if photon}}`SETUP`{{/if}}{{#if electron}}`MODE`{{/if}} button.
3. Wait for the LED to start flashing yellow (it will flash magenta first)
4. Release the {{#if photon}}`SETUP`{{/if}}{{#if electron}}`MODE`{{/if}} button

{{#if photon}}
{{{vine "https://vine.co/v/eZUHnhaUD9Y/embed/simple"}}}
{{/if}}

{{/unless}}

{{#if core}}

1. Hold down BOTH buttons
2. Release only the `RST` button, while holding down the `MODE` button.
3. Wait for the LED to start flashing yellow
4. Release the `MODE` button

{{{vine "https://vine.co/v/eZUgeu0r639/embed/simple"}}}

{{/if}}

The {{device}} now is in the DFU mode.

{{#if photon}}

### Firmware Reset

Firmware reset is not available on the Photon/P1, but not to worry! If you are experiencing problems with your application firmware, you can use [Safe Mode](#safe-mode) to recover.

{{/if}}

{{#if photon}}
### Factory Reset
{{/if}}

{{#if core}}
### Factory Reset
{{/if}}

{{#if photon}}

Factory reset is not available on the Photon/P1, but not to worry! If you are experiencing problems with your application firmware, you can use [Safe Mode](#safe-mode) to recover.

You can reset Wi-Fi credentials by performing a [WiFi Network Reset](#wi-fi-network-reset).
{{/if}}

{{#if core}}

{{{vine "https://vine.co/v/eZU6XdrYbd5/embed/simple"}}}

A factory reset restores the firmware on the {{device}} to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the {{device}} change from blinking yellow to blinking white. Then release the button.  The {{device}} should begin after the factory reset is complete.

1. Hold down BOTH buttons
2. Release only the `RST` button, while holding down the `MODE` button.
3. Wait for the LED to start blinking yellow (continue to hold the `MODE` button)
4. The LED will turn solid white (continue to hold the `MODE` button)
5. Finally, the LED will turn blink white rapidly
6. Release the `MODE` button


You can reset Wi-Fi credentials by performing a [WiFi Network Reset](#wi-fi-network-reset).
{{/if}}



## Troubleshooting Modes

These modes let you know about more atypical issues your {{device}} might be exhibiting. Use this section to troubleshoot strange colors you might see from your {{device}}.

{{#if electron}}
### Cellular Module Not Connected

{{{device-animation device "breathe" "blue" }}}

If the Cellular module is on but not connected to a cellular tower, your {{device}} will breathe blue. Note that this will be dark blue and not cyan.
{{/if}}

{{#if photon}}
### Wi-Fi Module Not Connected

{{{device-animation device "breathe" "blue" }}}

If the Wi-Fi module is on but not connected to a network, your {{device}} will breathe blue. Note that this will be dark blue and not cyan.
{{/if}}

{{#if core}}
### Wi-Fi Module Not Connected

{{{device-animation device "breathe" "blue" }}}

If the Wi-Fi module is on but not connected to a network, your {{device}} will breathe blue. Note that this will be dark blue and not cyan.
{{/if}}

### Cloud Not Connected

{{{device-animation device "breathe" "lime" }}}

When the {{device}} is connected to a {{#if electron}}cellular{{/if}}{{#if photon}}Wi-Fi{{/if}}{{#if core}}Wi-Fi{{/if}} network but not to the cloud, it will breathe green.


### Bad Public Key

When the server public key is bad, the {{device}} will blink alternately cyan and red.


### Red Blink Basic Errors

Blinking red indicates various errors.

- 2 red blinks: Could not reach the internet.
- 3 red blinks: Connected to the internet, but could not reach the Particle Cloud.
- Blinking "orange": This sometimes is seen as yellow or red and indicates bad device keys.


### Red Flash SOS

{{{device-animation device "sos" }}}

Is your {{device}} blinking red? Oh no!

A pattern of more than 10 red blinks is caused by the firmware crashing. The pattern is 3 short blinks, 3 long blinks, 3 short blinks (SOS pattern), followed by a number of blinks that depend on the error, then the SOS pattern again.

{{#if photon}}
[Enter safe mode](#safe-mode), tweak your firmware and try again!
{{/if}}
{{#if electron}}
[Enter safe mode](#safe-mode), tweak your firmware and try again!
{{/if}}
{{#if core}}
[Perform a factory reset](#factory-reset), tweak your firmware and try again!
{{/if}}

There are a number of other red blink codes that may be expressed after the SOS blinks:

1. Hard fault
2. Non-maskable interrupt fault
3. Memory Manager fault
4. Bus fault
5. Usage fault
6. Invalid length
7. Exit
8. Out of heap memory
9. SPI over-run
10. Assertion failure
11. Invalid case
12. Pure virtual call
13. Stack overflow

The two most common ones are:

**Hard Fault (1 blink between 2 SOS patterns)**

{{{device-animation device "sos" 1 }}}

**Out of heap memory (8 blinks between 2 SOS patterns)**

{{{device-animation device "sos" 8 }}}

Don't forget that the [community forum is always there to help](https://community.particle.io).
