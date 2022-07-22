In order for a cellular device to connect to the cellular network, it must have an activated SIM card.

#### Developer devices

If you set up a device using [setup.particle.io](https://setup.particle.io/) or the Particle mobile app, the SIM will be activated automatically during setup.

If you have deactivated the SIM, you need to reactivate it in the console to use it again, otherwise the device will be stuck in blinking green. The SIM should be listed in the top level SIM cards icon in [the console](https://console.particle.io/).

#### Products

Product SIMs can be activated:

- By the Particle API
- From the Particle console

If you have a device with an embedded SIM card (everything except the Electron 2G/3G), importing Device IDs into a product will also activate their SIMs.

If you have deactivated the SIM, you need to reactivate it with in the product SIM cards icon, after opening the product that the SIM is owned by.

#### Slow activation

If you have deactivated the SIM card on:

- Boron 2G/3G (BRN310 or Boron LTE (BRN402)
- B Series (B402 or B523)
- E Series (E313 or E402)
- Tracker (ONE402, ONE523, T402, T523)

It may take long time to activate the SIM card again. It generally takes a few minutes, but it can take hours, or even more than day, to reactivate the SIM cards on these devices. You should avoid unnecessarily deactivating the SIM cards on these devices.

This problem does not affect the devices whose SKUs end with a 4, such as 404, 404X, or 524), which include most newer devices.
