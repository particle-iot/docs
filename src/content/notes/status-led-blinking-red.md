Blinking red is typically an SOS code that indicates a problem with the user firmware on the device.

See [SOS codes](/troubleshooting/led/argon/#red-flash-sos) for more information.

This is typically caused by a bug in user firmware, so going into Safe Mode (breathing magenta) can allow the device to stay running to accept new firmware OTA. Hold down MODE or SETUP, tap RESET, then continue to hold down MODE until the status LED blinks magenta, red and blue at the same time, then release. The device will go through the normal sequence of blinking green, blinking cyan, then breathing cyan. Once breathing cyan you can flash new firmware OTA.

You can also use [Device Restore](/tools/device-restore/device-restore-usb/) to recover a device that keeps going into SOS mode.

