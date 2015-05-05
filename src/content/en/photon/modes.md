---
word: Modes
title: Device Modes
order: 2
---

Photon Modes
===
Use this section to understand your Photon's different states, and how to trigger them.

## Connected
When breathing cyan, your device is happily connected to the internet. When it is in this mode, you can call functions and flash code.
[video]

## Flashing
Your device is currently loading an app or updating its firmware. Triggered by a firmware update or by flashing code from Particle Dev or Particle Build.
[video]

## Looking For Internet
Your device is trying to find the internet. If you already entered your wifi credentials, give your device a few seconds to connect and start breathing cyan. If you haven't yet connected your device to wifi, then set your device to [Listening Mode](LINK).
[video]

## Listening Mode

When your device is in Listening Mode, it is waiting for your input to connect to the wifi. Your device needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

To put your device in Listening Mode, hold the `MODE` button for three seconds, until the RGB LED begins flashing blue.

[INSERT VINE VIDEO HERE]


## Safe Mode

If something goes wrong with the app you loaded onto your device, you can set your device to Safe Mode. This keeps all of the device's factory firmware but erases any apps you have loaded onto your device.

To put your device in Safe Mode, [INSTRUCTIONS HERE]

[VINE VIDEO HERE]

## Factory Reset

A factory reset restores the firmware on the device to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the device change from flashing yellow to flashing white. Then release the button.  The device should begin after the factory reset is complete.

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow (continue to hold the MODE button)
4. The LED will turn solid white (continue to hold the MODE button)
5. Finally, the LED will turn blink white rapidly
6. Release the MODE button

[VIDEO]



## DFU Mode (Device Firmware Upgrade)

If you wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the dfu-utility.

Procedure:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow
6. Release the MODE button


The device now is in the DFU mode.

[VIDEO]