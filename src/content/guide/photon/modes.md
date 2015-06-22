---
title: Device modes
template: docs.hbs
columns: two
device: photon
---

Photon Modes
===
Use this section to understand your Photon's different states, and how to trigger them.

## Connected

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUg2ZjVpn7/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

When it is breathing cyan, your device is happily connected to the internet. When it is in this mode, you can call functions and flash code.

## Flashing

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUX322TaU2/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

If your device is flashing magenta, it is currently loading an app or updating its firmware. This state is triggered by a firmware update or by flashing code from Particle Dev or Particle Build.


## Looking For Internet

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUX7KJQnbX/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

If your device is flashing green, it is trying to connect to the internet. If you already entered your wifi credentials, give your device a few seconds to connect and start breathing cyan. If you haven't yet connected your device to wifi, then set your device to [Listening Mode](#photon-modes-listening-mode).


## Listening Mode


<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUH7WaWjMT/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

When your device is in Listening Mode, it is waiting for your input to connect to the wifi. Your device needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUHUIjq7pO/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

To put your device in Listening Mode, hold the `MODE` button for three seconds, until the RGB LED begins flashing blue.


## Wifi Network Reset

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUwtJljYnK/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

To erase the stored wifi networks on your device, hold the `MODE` button for about ten seconds, until the RGB LED flashes blue rapidly.

## Selecting various Modes

![Photon Reset Modes](/assets/images/photon-reset-modes.png)

These four modes are all selected using the same process, but by releasing the `SETUP` button at different times. The diagram to the right details the order, LED codes you'll see, and a little bit about what each does.

### Safe Mode

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUF2ilvLxJ/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

This mode is one of the most useful. If something goes wrong with the app you loaded onto your device, you can set your device to Safe Mode. This runs the device's factory firmware but prevents your user code from executing.

To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing magenta
6. Release the MODE button


### DFU Mode (Device Firmware Upgrade)

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUHnhaUD9Y/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

If you wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the [dfu-utility.](http://dfu-util.sourceforge.net)

Installation tutorial can be found [here.](/photon/cli/#upgrading-from-the-spark-cli-advanced-install)

To enter DFU Mode:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow (it will flash magenta first)
6. Release the MODE button

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUXM7ETevY/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

The device now is in the DFU mode.


### Firmware Reset

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUwv3Za6Lq/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

This type of reset sets the firmware on your Photon back to factory settings without deleting your saved wifi networks.

To perform a firmware reset:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing green (it will flash magenta and yellow first)
6. Release the MODE button


### Factory Reset

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUXpd2hUqa/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

A factory reset restores the firmware on the device to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the device change from flashing yellow to flashing white. Then release the button.  This will take about 10 seconds. The device should begin after the factory reset is complete.

To perform a factory reset:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing magenta, then yellow, then green (continue to hold the MODE button)
4. The LED will turn solid white (continue to hold the MODE button)
5. Finally, the LED will turn blink white rapidly
6. Release the MODE button


````
// The above video is at 2x speed.
````
