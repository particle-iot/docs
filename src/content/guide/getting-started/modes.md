---
title: Device Modes
template: guide.hbs
columns: two
devices: [ photon, core ]
order: 4
---

#Device Modes

Now that we've gone over connecting your device, we're going to review the different modes for your Core or Photon. We suggest that you loop through this section, putting your device in the different listed modes to familiarize yourself with them.

{{#if photon}}

### Connected

{{{vine "https://vine.co/v/eZUg2ZjVpn7/embed/simple"}}}

When it is breathing cyan, your device is happily connected to the internet. When it is in this mode, you can call functions and flash code.

### Flashing

{{{vine "https://vine.co/v/eZUX322TaU2/embed/simple"}}}

If your device is flashing magenta, it is currently loading an app or updating its firmware. This state is triggered by a firmware update or by flashing code from Particle Dev or Particle Build.


### Looking For Internet

{{{vine "https://vine.co/v/eZUX7KJQnbX/embed/simple"}}}

If your device is flashing green, it is trying to connect to the internet. If you already entered your wifi credentials, give your device a few seconds to connect and start breathing cyan. If you haven't yet connected your device to wifi, then set your device to [Listening Mode](#photon-modes-listening-mode).


### Listening Mode

{{{vine "https://vine.co/v/eZUH7WaWjMT/embed/simple"}}}

When your device is in Listening Mode, it is waiting for your input to connect to the wifi. Your device needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

{{{vine "https://vine.co/v/eZUHUIjq7pO/embed/simple"}}}

To put your device in Listening Mode, hold the `SETUP` button for three seconds, until the RGB LED begins flashing blue.


### Wifi Network Reset

{{{vine "https://vine.co/v/eZUwtJljYnK/embed/simple"}}}

To erase the stored wifi networks on your device, hold the `SETUP` button for about ten seconds, until the RGB LED flashes blue rapidly.

### Selecting various Modes

![Photon Reset Modes](/assets/images/photon-reset-modes.png)

The next four modes are all selected using the same process, but by releasing the `SETUP` button at different times. The diagram to the right details the order, LED codes you'll see, and a little bit about what each does.

### Safe Mode

{{{vine "https://vine.co/v/eZUF2ilvLxJ/embed/simple"}}}

This mode is one of the most useful. If something goes wrong with the app you loaded onto your device, you can set your device to Safe Mode. This runs the device's factory firmware but prevents your user code from executing.

To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the RESET button, while holding down the SETUP button.
3. Wait for the LED to start flashing magenta
6. Release the SETUP button


### DFU Mode (Device Firmware Upgrade)

{{{vine "https://vine.co/v/eZUHnhaUD9Y/embed/simple"}}}

If you wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the [dfu-utility.](https://github.com/Stefan-Schmidt/dfu-util)

Installation tutorial can be found [here.](/photon/cli/#upgrading-from-the-spark-cli-advanced-install)

To enter DFU Mode:

1. Hold down BOTH buttons
2. Release only the RESET button, while holding down the SETUP button.
3. Wait for the LED to start flashing yellow (it will flash magenta first)
6. Release the SETUP button

{{{vine "https://vine.co/v/eZUXM7ETevY/embed/simple"}}}

The device now is in the DFU mode.


### Firmware Reset

{{{vine "https://vine.co/v/eZUwv3Za6Lq/embed/simple"}}}

This type of reset sets the firmware on your Photon back to factory settings without deleting your saved wifi networks.

To perform a firmware reset:

1. Hold down BOTH buttons
2. Release only the RESET button, while holding down the SETUP button.
3. Wait for the LED to start flashing green (it will flash magenta and yellow first)
6. Release the SETUP button


### Factory Reset

{{{vine "https://vine.co/v/eZUXpd2hUqa/embed/simple"}}}

_The above video is at 2x speed._

A factory reset restores the firmware on the device to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the SETUP button until you see the device change from flashing yellow to flashing white. Then release the button.  This will take about 10 seconds. The device should begin after the factory reset is complete.

To perform a factory reset:

1. Hold down BOTH buttons
2. Release only the RESET button, while holding down the SETUP button.
3. Wait for the LED to start flashing magenta, then yellow, then green (continue to hold the SETUP button)
4. The LED will turn solid white (continue to hold the SETUP button)
5. Finally, the LED will turn blink white rapidly
6. Release the SETUP button
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

If you wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the [dfu-utility.](https://github.com/Stefan-Schmidt/dfu-util)

Installation tutorial can be found [here.](/core/cli/#installing-advanced-install)

Procedure:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow
6. Release the MODE button


The device now is in the DFU mode.

{{/if}}
