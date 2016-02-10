---
title: Electron Product Changelog
template: reference.hbs
columns: two
order: 8
---

# Electron Changelog

Today, after long last, we're shipping the Electron!

Since our first Kickstarter campaign for the Core in 2013, we've shipped about 100,000 Wi-Fi development kits and gained significant experience building tools to make connected things.

The Electron, which communicates using GSM cellular networks, represented an entirely new set of business and technical challenges from our Wi-Fi products. The M2M (machine to machine) world is set up for big, established companies and not for individuals, product creators, and entrepreneurs. Finding solutions to these problems was extremely challenging, but the result was a cellular development experience that frees developers from the burdens of navigating an industry stacked with barriers to innovation and creativity.

In many ways, little has changed--the Electron benefits from the same great tools and features that are available to the Photon and Core and is hardware compatible with nearly all our previous kits and accessories. That being said, the cellular world is dramatically different from the world of Wi-Fi, so there's a bunch of cool new stuff hiding under the hood.

There's a lot of content here, so here's the short version:

- **The Electron adds on-board power management** to make mobile projects significantly more convenient out of the box
- Every Electron includes **a Particle SIM** and data plans that provide wireless service to more than 100 countries out of the box.
- We've built a bunch of cool new **cellular-specific firmware features** that let you do things like check your Electron's signal strength, put the Electron into very low power sleep modes, and group messages to save bandwidth.
- We've built easy and intuitive tools to **help you manage data usage** on all of your devices.

For those of you who want the nitty gritty details, read on!


## Hardware Changes
### Hardware Variants
There are three hardware variants for the Electron that operate on both 2G and 3G cellular networks. It is important to make sure you purchase the development kit that is compatible with the cellular infrastructure in your home country:

| Electron Name  | Service | Service Location | Bands (MHz) |
| ------------- | :-------------: | :----: | :----: |
| Electron G350  | 2G only | Worldwide | 850/900/1800/1900
| Electron U260  | 3G with 2G fallback | North and South America | 850/1900
| Electron U270 | 3G with 2G fallback | Europe, Asia, Africa, Australia | 900/1800/2100 |

### Pinout
The Electron exposes 36 pins--a 50% increase over the Photon and Core--giving you access to even more user-configurable GPIOs. The top 12 pins of the Electron (A0-VIn, D0-3V3) on each edge are fully pin compatible with accessories and kits for the Photon and Core. Additionally, we've added two new sets of GPIO pins (B0-B5, C0-C5) as well as breakout pads for Li+ and VUsb to give you even more access to the powerful hardware on board the Electron.

### Batteries
Cellular communication requires a different current consumption profile than Wi-Fi communication, so we've included an on-board battery (2,000mAH) and battery management system to make things easier.

- **JST connector**. Each Electron includes a JST connector to make attaching an external battery quick and simple. All batteries we sell come with compatible connectors.
- **Charge management**. The Electron includes a very powerful charge management IC that handles all of the charge/discharge responsibilities of the device.
- **Indicator LED**. An additional red LED lets you know when your device is accumulating charge and when it's all filled up.
- **Fuel Gauge**. The Electron's fuel gauge makes it very easy to monitor power levels in software so your device can save power when it needs it most.

### External Antenna
Because cellular devices operate at a different range of frequencies than Wi-Fi, we partnered with industry leader Taoglas to deliver premium quality penta-band antennas with every Electron. Simply attach the PCB antenna to the u.FL connector at the bottom of the board and your device will connect to your local cellular network.

Need a more powerful antenna for your product? The Electron is compatible with all standard u.FL cellular antennas, so it's easy to swap in the right antenna for the job.


## SIMs and Billing
### Particle's Global SIM
We're an MVNO! Every Electron comes with a Particle SIM which is pre-provisioned for Internet access in over 100 countries. For a full list of supported countries and associated carriers, find your country in the dropdown menu at [http://particle.io/cellular](http://particle.io/cellular).

### SIM Subscriptions
We're also providing low cast data plans specifically for IoT devices that you can pause or cancel at any time without a contract. Data plans start as low as $2.99 a month for 1MB of data--enough to send 20,000 messages on our extremely data-efficient messaging platform.

### SIM Dashboard
We've created a [SIM Management and Billing Dashboard](https://dashboard.particle.io/user/billing) that allows you to visualize your data usage over time, set usage alerts to notify you when you're reaching your limit, and pause service to your SIM at configurable thresholds to avoid overages.

### Cellular coverage
The Particle SIM leverages cellular agreements with most of the major GSM carriers throughout the entire world. Curious if you've got coverage in your neighborhood? Check out [http://opensignal.com](http://opensignal.com) and select the service type (2G or 2G+3G)/carrier that corresponds to your device/country. Have questions about cellular coverage? Don't hesitate to reach out to us at [hello@particle.io](mailto:hello@particle.io).



## Firmware
### UDP Messaging
In order to conserve bandwidth, we've switched all communications on the Electron over from TCP to a byte-efficient implementation of UDP. Besides lowering data consumption, the biggest difference between UDP and TCP is that, unlike TCP, UDP is a connectionless protocol. This means that the Electron does not hold a persistent connection with the Cloud, and only checks in to send/receive messages or to let the Cloud know that it's still hanging around. Don't worry--if you want, you can opt into TCP communication in firmware.

### RSSI Mode
We've made it easier than ever to check the cellular reception of your device. Once your Electron is connected a cellular tower, you can single press the "MODE" button, and the device will reply with between zero and five green blips indicating the number of bars that you have.
`Can you hear me now? Fantastic.`

### Low Power Sleep Modes
The Electron is the perfect tool for untethered and remote projects. We've worked hard to minimize current consumption of the Electron in deep sleep modes to provide you the tools to significantly extend the battery life of your project. Check out the technical documentation of our [sleep() function](https://docs.particle.io/reference/firmware/photon/#sleep-sleep-0) to learn more.

### New Peripherals
The Electron firmware helps you take full advantage of the all the additional hardware exposed on the Electron. In addition to all existing peripherals on the Photon, you'll now have access to 6 additional PWM peripherals, SPI alternate pins, I2C alternate pins, 2 extra serial ports, a second CAN interface, and 4 additional ADCs.


## Cloud/IDE Changes

### "Last Heard"
Because UDP is a connectionless protocol, the concept of a device being "online" or "offline" is fundamentally different for the Electron than for the Photon and Core If you check out your device list in Particle Build/Dev or by issuing a `particle list` command in the CLI, you'll be presented with the "last heard" status for each device, which represents the last time the Cloud successfully received communications from your device.

### Setup
Along with the new hardware, we've shipped a super neat web-based setup process for activating your Particle SIM card and claiming Electrons to your Particle account. This setup flow can be completed on any device with a browser including phones, tablets, and computers! Check it out at [http://setup.particle.io](http://setup.particle.io).

### Confirmed OTA Flash
In order to help you monitor your data usage, we'll present you with a confirmation of the *approximate* size of your user application before it is flashed to your device. Additionally, all system updates will be, by default, optional for the Electron, so you can ensure that you'll only consume data for OTA flashes when you want to.


## Everything Else

Did I forget anything?  Add it here :-)


## More to Come

We've still got a lot of great features planned for the Electron and the rest of the Particle platform.  Like every new product, we expect the Electron to undergo rapid improvement in the upcoming months as we identify improvements to be made to our firmware and developer tools. We're eager for your feedback--if you encounter bugs or want to request new features when you receive your Electron, create a Github issue or contribute a Pull Request. We'd love to have your help :-)
