Breathing white means the device network module (cellular or Wi-Fi) is off. Since there is no network, of course there is no cloud connectivity, either.

This mode can only be entered if the user firmware requests this mode. The most common way is to use `SYSTEM_MODE(SEMI_AUTOMATIC)` or `SYSTEM_MODE(MANUAL)` and not call `Particle.connect()`.

Without a cloud connection, it is not possible to flash the device OTA (over-the-air).

Since this is caused by user firmware, so going into Safe Mode (breathing magenta) can allow the device to stay running to accept new firmware OTA. Hold down MODE or SETUP, tap RESET, then continue to hold down MODE until the status LED blinks magenta, red and blue at the same time, then release. The device will go through the normal sequence of blinking green, blinking cyan, then breathing cyan. Once breathing cyan you can flash new firmware OTA.

You can also use [Device Restore](/tools/device-restore/device-restore-usb/) to recover a device in breathing white.
