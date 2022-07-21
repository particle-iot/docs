When your device is in listening mode, it is waiting for networking configuration.

#### Wi-Fi devices (P2, Photon 2, Argon, P1, Photon)

These devices are waiting for their Wi-Fi credentials to be configured so they can connect to the network.

#### Gen 3 (Argon, Boron, B Series SoM, Tracker SoM, Device OS 3.x and earlier)

Normally, when you've successfully configured your Gen 3 device using the mobile apps for iOS or Android, the setup complete flag is set and you will exit Listening Mode.

If you have reset your configuration or have set up using USB, you may need to manually set the configuration done flag using [these instructions](/reference/developer-tools/cli/#particle-usb-setup-done) to use the particle usb setup-done command.

With Device OS 4.x and later, the setup-done flag is no longer used.

#### Electron 

The Electron will also go into listening mode if the SIM card is not installed or is loose.

The Electron LTE (ELC314) and all other cellular devices ds not have a 4FF plastic SIM card and will not enter listening mode for a missing SIM.

#### Entering listening mode

To put your device in Listening Mode, hold the MODE button for three seconds, until the RGB LED begins blinking blue.

You can also use `particle usb start-listening` to enter listening mode.
