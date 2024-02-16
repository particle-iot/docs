This scenario commonly occurs when you have missing dependencies. For example, if you flash code that requires a Device OS upgrade, or other upgrades such as the bootloader or softdevice. If there are missing dependencies, user firmware will not be able to run, and the device will attempt to connect to the cloud to get the missing dependencies. 

- If you flash code from Workbench using **Particle: Flash application and Device OS (local)** it does **not** upgrade required dependencies. If you are upgrading the device to a newer version of Device OS, using [Device Restore USB](/tools/device-restore/device-restore-usb/) to the same version first will assure that you have the right dependencies.

- If you want to troubleshoot missing dependencies, use the [Device Inspect Tool](/tools/developer-tools/device-inspect/), or the `particle serial inspect` command.

- If you have a Wi-Fi device that does not have Wi-Fi credentials set, the device will not be able to connect to the cloud to get missing dependencies and instead will go into listening mode (blinking dark blue).

- If you have a cellular device that does not have an active SIM, it will attempt to connect to cellular, but will get stuck at blinking green and not be able to resolve missing dependencies.

