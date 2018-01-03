---
word: Firmware Manager
title: Firmware Manager
order: 4
columns: two
devices: [ photon,electron,core ]
layout: guide.hbs
---

# Firmware Manager

The Firmware Manager is a desktop application that upgrades your {{device}} to the latest system firmware. It provides an easy way to update system firmware while avoiding cellular data charges.

## Getting Started

The Firmware Manager is available for Windows and OS X. 

### <img style="margin:0; block:inline" src="{{assets}}/images/updater-windows-logo.png"> Windows

Click [Firmware Manager for Windows](https://binaries.particle.io/updater/particle_firmware_manager-v0.6.0-windows.exe) to download the application to your downloads folder. The file name will begin with "particle_firmware_manager".

Once the download is complete, double-click the downloaded file to run.

The first time the utility is run, you will be prompted to enable administrator access.  This is so it can install the Particle USB Drivers to your machine.

 
### <img style="margin:0; block:inline" src="{{assets}}/images/updater-apple-logo.png"> OS X

Click [Firmware Manager for OS X](https://binaries.particle.io/updater/particle_firmware_manager-v0.6.0-osx.zip) to download the application to your downloads folder.

The application is provided as a Zip file. Once the file has downloaded, double-click the file to start unpacking the application. This will take just a few seconds and you'll then see a folder named "Particle firmware manager" with a Particle icon.  

Double-click the "Particle firmware manager" folder to launch the application.

## Usage overview

Using the firmware manager follows these steps:

1. Launching the application
2. Connecting your device
3. Updating your device
4. Update complete!


### Opening Screen

When the application starts, you'll see a screen like this:

![Updater Start Screen]({{assets}}/images/updater-start.png)

### Connecting your Device

If you haven't already connected your {{device}} to your computer with a USB cable, do that now. When connected, the screen will look like this:

![Updater Connected]({{assets}}/images/updater-connected.png)

(On Windows, the device location will be shown as COM1: or similar.)

### Updating Firmware on your Device

When you're ready to update your device, click on the button "Update to 0.5.0". (The version number may be different.)

The progress bar will start to change to magenta as the update progresses

![Update in progress]({{assets}}/images/updater-updating.png)

... and the LED on your device will start blinking magenta, like this:

{{device-animation device "blink" "magenta" }}

The update will pause for a short while halfway through as the device restarts and gets ready for the second part of the update. You don't need to do anything here - the device will automatically continue with the next part of the update.

### Update complete

When the update is complete you'll see this screen

![Update complete]({{assets}}/images/updater-complete.png)

Congratulations! You've updated the system firmware on your device.

Your device will automatically reboot and will run your app using the updated system firmware.

{{#if electron}}
### Electron Upgrade

The Electron firmware for 0.6.0 and newer has changed from being made of 2 system modules, to 3 system modules. 

When you are upgrading from a version earlier than 0.5.3, then your Electron has to be upgraded to 0.5.3 first, before upgrading to 0.6.0 or a later version.

You can upgrade to 0.5.3 by downloading the 0.5.3 Firmware Manager for your OS and running that, as described on this page. Once your device is running 0.5.3 system firmware, then it can be upgraded to 0.6.0 or later. 

Firmware Manager 0.5.3

- [Windows](https://binaries.particle.io/updater/particle_firmware_manager-v0.5.3-windows.exe)
- [macOS](https://binaries.particle.io/updater/particle_firmware_manager-v0.5.3-osx.zip)

{{/if}} {{!-- electron --}}

## Troubleshooting

### Device not detected

If the application doesn't detect your device, try disconnecting and reconnecting the device. This is especially true on Windows after installing the USB drivers - Windows will not detect the device using the newly installed drivers until the device has been disconnected and reconnected.


### Update stops halfway

If the update gets stuck or you see an error message, try following these steps

- Close the device updater if it's already open
- Connect the device directly to your computer rather than via USB hubs
- Restart the device in [Safe Mode](/guide/getting-started/modes/#safe-mode)
- When the device has connected to the cloud, put the device in [listening mode](/guide/getting-started/modes/#listening-mode)
- launch the device updater and perform the update as described above



We hope that fixes it for you, but if you are still experiencing problems, please check our
[GitHub Issues](https://github.com/particle-iot/device-updater/issues) and file a new issue.

