Blinking yellow (DFU mode) means the device is waiting for a software update by USB.

You can enter DFU mode:

- By button press (Hold down MODE or SETUP, tap RESET, then continue to hold down MODE until the status LED blinks yellow, then release)
- By USB request (including the CLI `particle usb dfu`)
- By connecting by USB serial at the magic baud rate of 28800 baud
- By connecting by serial at the magic baud rate 14400 baud
- The firmware on the device has manually entered DFU mode using `System.dfu()`.
- If the device does not have a valid copy of Device OS, or does not have user firmware flashed to it

Once in DFU mode, you can flash binaries using the Particle CLI or you can use [Device Restore](/tools/device-restore/device-restore-usb/) to recover a device that is stuck in DFU mode.

