---
title: Device Modes
layout: guide.hbs
columns: two
devices: [ photon,electron,core ]
order: 4
---

# Device Modes

Now that we've gone over connecting your device, we're going to review the different modes for your {{device}}. We suggest that you work through this section, putting your device in the different listed modes to familiarize yourself with them.

## Standard Modes
These modes are the typical behaviors you will see from your {{device}} on a regular basis. They are the light patterns of a healthy {{device}}.

Here's the typical pattern of {{a-device}} after power up.

{{#if has-cellular}}
{{device-animation device "pattern"
  "off 1000ms"
  "on white 1000ms"
  "blink lime 16 times"
  "blink cyan 8 times"
  "breathe cyan 3 times"
  "off 1000ms"
}}
{{/if}}

{{#unless has-cellular}}
{{device-animation device "pattern"
  "off 1000ms"
  "on white 1000ms"
  "blink lime 8 times"
  "blink cyan 8 times"
  "breathe cyan 3 times"
  "off 1000ms"
}}
{{/unless}}


### Connected

{{device-animation device "breathe" "cyan" }}

When it is breathing cyan, your {{device}} is happily connected to the Internet. When it is in this mode, you can call functions and flash code.


### OTA Firmware Update

{{device-animation device "blink" "magenta" }}

If your {{device}} is blinking magenta (red and blue at the same time), it is currently loading an app or updating its firmware. This state is triggered by a firmware update or by flashing code from the Web IDE or Desktop IDE. You might see this mode when you connect your {{device}} to the cloud for the first time.

Note that, if you enter this mode by holding `{{system-button}}` on boot, blinking magenta indicates that letting go of the `{{system-button}}` button will enter safe mode to connect to the cloud and not run application firmware.

### Looking For Internet

{{device-animation device "blink" "lime" }}

If your {{device}} is blinking green, it is trying to connect to the internet. 

If you are stuck in blinking green, there are additional instructions in the [Status LED Reference](/reference/led#looking-for-internet).

{{#if photon}}

### Connecting to the Cloud

{{device-animation device "blink" "cyan" }}

When the {{device}} is in the process of connecting to the cloud, it will rapidly blink cyan. You often see this mode when you first connect your {{device}} to a network, after it has just blinked green.

{{/if}}

### Listening Mode

{{device-animation device "blink" "blue" 300 300 }}

{{#if has-wifi}}
When your {{device}} is in Listening Mode, it is waiting for your input to connect to Wi-Fi. Your {{device}} needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.
{{/if}}
{{#if has-cellular}}
If your {{device}} enters listening mode, it may be caused by a loose SIM. There are additional instructions in the [Status LED Reference](/reference/led#listening-mode).
{{/if}}


{{#if photon}}
{{vine "https://vine.co/v/eZUHUIjq7pO/embed/simple"}}

To put your {{device}} in Listening Mode, hold the `{{system-button}}` button for three seconds, until the RGB LED begins blinking blue.
{{/if}}

{{#if electron}}
{{#if photon}}
{{vine "https://vine.co/v/eZUHUIjq7pO/embed/simple"}}
{{/if}}

To put your {{device}} in Listening Mode, hold the `{{system-button}}` button for three seconds, until the RGB LED begins blinking blue.
{{/if}}

{{#if core}}
{{vine "https://vine.co/v/eZUgHYYrYgl/embed/simple"}}

To put your {{device}} in Listening Mode, hold the `{{system-button}}` button for three seconds, until the RGB LED begins blinking blue.
{{/if}}

### Safe Mode

{{device-animation device "breathe" "magenta" }}

Safe mode, breathing magenta (red and blue at the same time), connects the {{device}} to the cloud, but does not run any application firmware. This mode is one of the most useful for
development or for troubleshooting. If something goes wrong with the app
you loaded onto your device, you can set your device to Safe Mode. This
runs the Device OS but doesn't execute any application code, which can be useful if the application code contains bugs that stop the device from connecting to the cloud.

**The {{device}} indicates that it is in Safe Mode with the LED breathing magenta.**

To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start blinking magenta
6. Release the `{{system-button}}` button

Before entering safe mode, the {{device}} will proceed through the normal steps of connecting to the cloud; blinking green, blinking cyan, and fast blinking cyan. If you're unable to connect to the cloud, you won't be able to enter safe mode.

The device will itself automatically enter safe mode if there is no application code flashed to the device or when the application is not valid.

{{#if photon}}
{{vine "https://vine.co/v/eZUF2ilvLxJ/embed/simple"}}
{{/if}}

### DFU Mode (Device Firmware Upgrade)

{{device-animation device "blink" "yellow" }}

If you wish to program your {{device}} with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via [dfu-util](/faq/particle-tools/installing-dfu-util/)
(Note: Some users reported issues with dfu-util on a USB3.0 ports on Windows. Use a USB2.0 port if the USB3.0 port doesn't work.)

Installation tutorial can be found [here.](/guide/tools-and-features/cli/)

And a usage guide [here.](/reference/cli/)

To enter DFU Mode:

{{#unless core}}

1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start flashing yellow (it will flash magenta first)
4. Release the `{{system-button}}` button

{{#if photon}}
{{vine "https://vine.co/v/eZUHnhaUD9Y/embed/simple"}}
{{/if}}

{{/unless}}

{{#if core}}

1. Hold down BOTH buttons
2. Release only the `RST` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start flashing yellow
4. Release the `{{system-button}}` button
"
{{vine "https://vine.co/v/eZUgeu0r639/embed/simple"}}

{{/if}}

The {{device}} now is in the DFU mode.

## Other modes

There are many other modes described in the [Status LED Reference](/reference/led).

