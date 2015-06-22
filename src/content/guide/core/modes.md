---
title: Device modes
template: docs.hbs
columns: two
device: core
---

Core Modes
===
Use this section to understand your Core's different states, and how to trigger them.

## Connected

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU92D9X9ge/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

When breathing cyan, your device is happily connected to the internet. When it is in this mode, you can call functions and flash code.

## Flashing

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU9LDuVKnr/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

Your device is currently loading an app or updating its firmware. Triggered by a firmware update or by flashing code from Particle Dev or Particle Build.


## Looking For Internet

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU6zBzpW6U/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

Your device is trying to find the internet. If you already entered your wifi credentials, give your device a few seconds to connect and start breathing cyan. If you haven't yet connected your device to wifi, then set your device to [Listening Mode](/core/modes/#core-modes-listening-mode). If your Core continuously flashes green and won't stop, then try doing a [full firmware update](https://community.particle.io/t/spark-core-common-issues/12383).


## Listening Mode

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU6YiK20Hl/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

When your device is in Listening Mode, it is waiting for your input to connect to the wifi. Your device needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUgHYYrYgl/embed/simple" width="600" height="600" frameborder="0"></iframe>
</div>

To put your device in Listening Mode, hold the `MODE` button for three seconds, until the RGB LED begins flashing blue.


## Wifi Network Reset

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU6expA5bA/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

To erase the stored wifi networks on your device, hold the `MODE` button for about ten seconds, until the RGB LED flashes blue rapidly.


## Factory Reset

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU6XdrYbd5/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

A factory reset restores the firmware on the device to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the device change from flashing yellow to flashing white. Then release the button.  The device should begin after the factory reset is complete.

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow (continue to hold the MODE button)
4. The LED will turn solid white (continue to hold the MODE button)
5. Finally, the LED will turn blink white rapidly
6. Release the MODE button



## DFU Mode (Device Firmware Upgrade)

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUgeu0r639/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

If you wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the [dfu-utility.](http://dfu-util.sourceforge.net)

Installation tutorial can be found [here.](/core/cli/#installing-advanced-install)

Procedure:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow
6. Release the MODE button


The device now is in the DFU mode.
