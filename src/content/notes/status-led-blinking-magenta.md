When your device is in blinking magenta (red and blue at the same time), it is either:

- In the progress of downloading a software update
- In the progress of installing a software update (fast blinking magenta)
- In safe mode, has not yet attempted to connect to the cloud

Safe mode occurs when there is a missing system dependency. Normally, this should resolve itself quickly as the cloud will send the missing binary and the device will recover. Other causes include:

- By button press (Hold down MODE or SETUP, tap RESET, then continue to hold down MODE until the status LED blinks magenta, red and blue at the same time, then release)
- By USB request (including the CLI `particle usb start-listening`)
- By connecting by USB serial at the magic baud rate of 28800 baud.
- The firmware on the device has manually entered safe mode using `System.enterSafeMode()`. This will never resolve itself until you flash new firmware.

From blinking magenta, the device will typically proceed through blinking green, blinking cyan, and finallly to breathing magenta. If the device is unable to connect to the network or the Particle cloud, it may not be able to get all the way to breathing magenta.

You can use [Device Restore](/tools/device-restore/device-restore-usb/) to recover a device that is stuck in safe mode.



