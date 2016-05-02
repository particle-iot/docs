---
word: Updater
title: Device Updater
order: 4
columns: two
devices: [ photon,electron,core ]
template: guide.hbs
---

# Device Updater

The device updater is a desktop application that upgrades your Electron to latest system firmware. It provides an easy way to update system firmware while avoiding cellular data charges.

## Getting Started

The device updater is available for Windows and OS X. 

### <img style="margin:0; block:inline" src="{{assets}}/images/updater-windows-logo.png"> Windows

Click [Device Updater for Windows](https://github.com/spark/device-updater/releases/download/v0.5.0/particle_system_firmware_0.5.0.exe) to download the application to your downloads folder. The file name will begin with "particle_system_firmware".

Once the download is complete, double-click the downloaded file to run.

The first time the updater is run, you will be prompted to enable administrator access.  This is so the updater can install the Particle USB Drivers to your machine.

 
### <img style="margin:0; block:inline" src="{{assets}}/images/updater-apple-logo.png"> OS X

Click [Device Updater for OS X](https://github.com/spark/device-updater/releases/download/v0.5.0/particle_system_firmware_0.5.0.zip) to download the application to your downloads folder.

The updater is provided as a Zip file. Once the file has downloaded, double-click the file to start unpacking the application. This will take just a few seconds and you'll then see a folder named "Particle system firmware" with a Particle icon.  

Double-click the "Particle system firmware" folder to launch the updater application.

## Usage overview

Using the updater follows these steps:

1. Launching the device updater
2. Connecting your device
3. Updating your device
4. Update complete!


### Opening Screen

When the device updater starts, you'll see a screen like this:

![Updater Start Screen]({{assets}}/images/updater-start.png)

### Connecting your Device

If you haven't already connected your Electron to your computer with a USB cable, do that now. When connected, the screen will look like this:

![Updater Connected]({{assets}}/images/updater-connected.png)

(On Windows, the device location will be shown as COM1: or similar.)

### Updating Firmware on your Device

When you're ready to update your device, click on the button "Update to 0.5.0". (The version number may be different.)

The progress bar will start to change to magenta as the update progresses

![Update in progress]({{assets}}/images/updater-updating.png)

... and the LED on your device will start blinking magenta, like this:

{{{device-animation device "blink" "magenta" }}}

The update will pause for a short while halfway through as the device restarts and gets ready for the second part of the update. You don't need to do anything here - the device will automatically continue with the next part of the update.

### Update complete

When the update is complete you'll see this screen

![Update complete]({{assets}}/images/updater-complete.png)

Congratulations! You've updated the system firmware on your Electron.

Your device will automatically reboot and will run your app using the updated system firmware.


## Troubleshooting

### Device not detected

If the updater doesn't detect your device, try disconnecting and reconnecting the device. This is especially true on Windows after installing the USB drivers - Windows will not detect the device using the newly installed drivers until the device has been reconnected.

### Update stops halfway

If the update gets stuck or you see an error message, try starting the process with the device in safe mode.

- Restart the device in [Safe Mode](/guide/getting-started/modes/electron/#safe-mode)
- Close the device updater if it's already open
- Launch the device updater and proceed with the update

We hope that fixes it for you, but if you are still experiencing problems, please check our
[GitHub Issues](https://github.com/spark/device-updater/issues) and file a new issue.

