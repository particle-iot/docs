Breathing magenta is safe mode, cloud connected.

- User firmware does not run while in safe mode
- You can flash code to the device while it is in safe mode

This is typically done when you need to replace a bad version of user firmware on the device OTA, and you need to boot the device without your bad firmware running.

From blinking magenta, the device will typically proceed through blinking green, blinking cyan, and finallly to breathing magenta. If the device is unable to connect to the network or the Particle cloud, it may not be able to get all the way to breathing magenta.

You can go into safe mode:

- By button press (Hold down MODE or SETUP, tap RESET, then continue to hold down MODE until the status LED blinks magenta, red and blue at the same time, then release)
- By USB request (including the CLI `particle usb start-listening`)
- By connecting by USB serial at the magic baud rate of 28800 baud.


