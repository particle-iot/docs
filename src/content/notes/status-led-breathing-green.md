Breathing green means the device is connected to network (cellular, Wi-Fi, etc.) but not to the Particle cloud.

This mode can only be entered if the user firmware requests this mode. If the cloud is inaccessible, the device would be stuck in blinking cyan, not breathing green.

Without a cloud connection, it is not possible to flash the device OTA (over-the-air).

Since this is caused by user firmware, so going into Safe Mode (breathing magenta) can allow the device to stay running to accept new firmware OTA. Hold down MODE or SETUP, tap RESET, then continue to hold down MODE until the status LED blinks magenta, red and blue at the same time, then release. The device will go through the normal sequence of blinking green, blinking cyan, then breathing cyan. Once breathing cyan you can flash new firmware OTA.

You can also use [Device Restore](/tools/device-restore/device-restore-usb/) to recover a device in breathing green.
