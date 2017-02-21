---
title: Electron Product Changelog
template: reference.hbs
columns: two
order: 11
---

# Electron Changelog

![](/assets/images/electron-hero.jpg)
<p class="caption">Introducing the Electron!</p>

## Introduction

Since our first Kickstarter campaign for the Core in 2013, we’ve shipped about 100,000 Wi-Fi development kits and gained significant experience building tools for making connected things.

The Electron, which communicates using GSM cellular networks, represented an entirely new set of business and engineering challenges from our Wi-Fi products. The M2M (machine to machine) industry is configured for big, established companies and not for individuals, product creators, and entrepreneurs. Finding solutions to these problems was extremely challenging, but the result was a cellular development experience that frees product creators from the burden of navigating an industry stacked with barriers to innovation and creativity.

In many ways, little has changed — the Electron benefits from the same great tools and features that are available to the Photon and Core and is hardware compatible with nearly all our previous kits and accessories. That being said, the world of cellular IoT is dramatically different from the world of Wi-Fi, so there’s a bunch of cool new stuff hiding under the hood.

There’s a lot of content here, so here’s the short version:

### Electron Highlights

- Every Electron includes a **Particle SIM and data plan** that provide wireless service to more than 100 countries out of the box.
- We’ve built easy and intuitive tools to **help you manage data usage** on all of your devices.
- The Electron **adds on-board battery/power management** to make mobile projects significantly more convenient out of the box.
- We’ve built a bunch of cool new **cellular-specific firmware features** that let you do things like check your Electron’s signal strength, put the Electron into very low power sleep modes, and group messages to save bandwidth.

For those of you who want the nitty gritty details, read on!

---

## Hardware Changes
### 3 Hardware Variants

There are three hardware variants for the Electron that operate on both 2G and 3G cellular networks. It is important to make sure you purchase the development kit that is compatible with the cellular infrastructure in your home country:

| Electron Name  | Service | Service Location | Bands (MHz) |
| ------------- | :-------------: | :----: | :----: |
| Electron G350  | 2G only | Worldwide | 850/900/1800/1900
| Electron U260  | 3G with 2G fallback | North and South America, Australia | 850/1900
| Electron U270 | 3G with 2G fallback | Europe, Asia, Africa | 900/1800/2100 |
<p class="caption">Table of Electron hardware variants.</p>

### 12 New Pins

![](/assets/images/electron-horizontal-usb.jpg)
<p class="caption">The Electron boasts an additional 12 pins vs. the Photon and Core.</p>

The Electron exposes 36 pins, a 50% increase over the Photon and Core, giving you access to even more user-configurable GPIOs. The top 12 pins of the Electron (A0-VIn, D0–3V3) on each edge are fully pin compatible with existing accessories and kits for the Photon and Core.

Additionally, we’ve added two new sets of GPIO pins (B0-B5, C0-C5) as well as breakout pads for attached batteries (Li+) and USB Power (VUsb) to give you even more access to hardware on board the Electron.

### Power Management

Cellular communication requires a different current consumption profile than Wi-Fi communication, so we’ve included an attachable Li-Po battery (2,000mAH) and battery management system to make product creation easier.

- **JST connector.** Each Electron includes a JST connector to make attaching an external battery quick and simple. All batteries we sell come with compatible connectors.
- **Charge Management.** The Electron includes a very powerful charge management IC that handles all of the charge/discharge responsibilities of the device.
- **Battery Indicator LED.** An additional red LED lets you know when your device is accumulating charge and when it’s all filled up.
- **Fuel Gauge.** The Electron’s fuel gauge makes it very easy to monitor power levels in software so your device can save power when it needs it most.

### External Antenna

![](/assets/images/electron-battery-antenna.jpg)
<p class="caption">The Electron uses a powerful penta band antenna from industry leader Taoglas.</p>

Because cellular devices communicate at a different range of frequencies than Wi-Fi, we partnered with industry leader Taoglas to deliver premium quality penta band antennas with every Electron. Simply attach the PCB antenna to the u.FL connector at the bottom of the board and your device will connect to your local cellular network.

Need a more powerful antenna for your product? The Electron is compatible with all standard u.FL cellular antennas, so it’s easy to swap in the right antenna for the job.

---

## SIMs and Billing
### Particle SIM Included

![](/assets/images/electron-simcard.jpg)
<p class="caption">The Particle SIM provides worldwide coverage for cellular IoT devices.</p>

Particle is now an MVNO (Mobile virtual network operator)! Every Electron comes with a Particle SIM that is pre-provisioned for Internet access in over 100 countries. For a full list of supported countries and associated carriers, find your country in the dropdown menu [here](http://particle.io/cellular).


### Low Cost Data Plan

We’re also providing low cost data plans specifically for IoT devices that you can pause or cancel at any time without a contract. Data plans start as low as $2.99 a month for 1MB of data — enough to send a few thousand messages on our extremely data-efficient messaging platform.

### SIM Console

![](/assets/images/electron-dashboard.png)
<p class="caption">The Particle SIM console lets you monitor and manage data usage.</p>

We’ve created a SIM management and billing [console](https://console.particle.io/billing) that allows you to visualize your data usage over time, set usage alerts to notify you when you’ve reached your data limit, and pause service to your SIM at configurable thresholds to avoid overages.

### Worldwide Coverage

The Particle SIM leverages cellular agreements with most of the major GSM carriers throughout the world. Want to know who’s providing service in your neighborhood? Head over [here](http://particle.io/cellular) and find your country in the dropdown menu.



## Firmware
### UDP Messaging

In order to conserve bandwidth, we’ve switched all communications on the Electron over from TCP to a bandwidth-efficient implementation of UDP. Besides lowering overall data consumption, the biggest difference between UDP and TCP is that, unlike TCP, UDP is a connection-less protocol. This means that the Electron does not hold a persistent connection with the Cloud, and only checks in to send/receive messages or to let the Cloud know that it’s still around. If you prefer TCP, you can always switch protocols for your device in firmware.

### Check Signal Strength

We’ve made it easier than ever to check the cellular signal of your device. While your Electron is connected a cell tower (breathing cyan), you can single press the “MODE” button, and your device will reply with between zero and five green blips on the main LED, indicating the number of bars that you have.

```Can you hear me now? 01100111 01101111 01101111 01100100.```

### Sleep Modes

The Electron is the perfect tool for untethered and remote projects. We’ve worked hard to minimize current consumption of the Electron in deep sleep modes to provide you the tools to significantly extend the battery life of your project. Check out the technical documentation for our [sleep() function](https://docs.particle.io/reference/firmware/#sleep-sleep-) to learn more.

### New Peripherals

The Electron’s firmware helps you take full advantage of the all the additional hardware exposed on the Electron. In addition to all existing peripherals on the Photon, you’ll now have access to 6 additional PWM peripherals, SPI alternate pins, I2C alternate pins, 2 extra serial ports, a second CAN interface, and 4 additional ADCs.

---

## Cloud/IDE Changes
<!--
### "Last Heard"
Because UDP is a connectionless protocol, the concept of a device being “online” or “offline” is fundamentally different for the Electron than for the Photon and Core. If you inquire your devices’ status in Particle Build/Dev or by issuing a `particle list` command in the CLI, you’ll be presented with the “last heard” status of each device, which represents the last time the Cloud successfully received communications from your device. -->

### "Online vs Offline"
Because UDP is a connectionless protocol, the concept of a device being “online” or “offline” is fundamentally different for the Electron than for the Photon and Core. There are no frequent pings like with TCP that can be used to update Online status.  Currently, if you inquire about your devices’ status in Particle Build/Dev or by issuing a `particle list` command in the CLI, any Electron that has successfully been Online in the past will continue to show as Online.  We are working through possible alternatives for this Online status, to indicate something like Last Heard with a time and date.

### Setup

![](/assets/images/electron-setup.png)
<p class="caption">The Electron features a powerful new web-based setup process.</p>

Along with the new hardware, we’ve shipped a super neat web-based setup process for activating your Particle SIM card and claiming Electrons to your Particle account. This setup flow can be completed on any device with a browser including phones, tablets, and computers! Check it out at our new [setup page](http://setup.particle.io/).

### Smarter Dev Tools

In order to help you monitor your data usage, we’ll present you with a confirmation of the _approximate_ size of your user application before it is flashed to your device. Additionally, all system updates will be, by default, optional for the Electron, so you can ensure that you’ll only consume data for OTA flashes when you want to.

---

## Everything Else
### New Documentation

![](/assets/images/electronItemBox.png)
<p class="caption">The Electron comes loaded with awesome tools to help you build your first project.</p>

Because the Electron is so different from the Photon and Core, we’ve built out a bunch of new example code and technical documentation for beginners, product creators, and everyone in between. Here are some of the highlights:

- [Electron Hardware Datasheet](https://docs.particle.io/datasheets/electron-datasheet/)
- [Electron Billing Guide](https://docs.particle.io/guide/getting-started/billing/)
- [Electron Data Guide](https://docs.particle.io/guide/getting-started/data/)
- [Electron Code Examples](https://docs.particle.io/guide/getting-started/examples/electron/)

We’ll be building integration guides and more detailed application notes for product creators in the near future.

### Fully Certified

The Electron ships with nearly every wireless certification that we could think of which significantly limits the time and cost associated with building products on the Electron platform. The full laundry list includes FCC, CE, IC, RoHS, PTCRB, GCF, and wireless carrier certifications.

If you want more details on certification, visit the [Certification](https://docs.particle.io/guide/how-to-build-a-product/certification/) section of our Product Creator’s Guide.

## More to Come

We’ve still got a lot of great features planned for the Electron and the rest of the Particle platform. Like every new product, we expect the Electron to undergo rapid improvement in the upcoming months as we identify improvements to be made to our firmware and developer tools. We’re eager for your feedback — if you encounter bugs or want to request new features when you receive your Electron join our [online community](http://community.particle.io/) to learn how to create a GitHub issue or [contribute](http://community.particle.io/t/how-to-contribute-to-docs-spark-io/4976) a Pull Request. If you’re working on a project, post it on [Hackster](https://www.hackster.io/particle)--we often share our favorite projects with our community.

Happy hacking--we'll see you online!

Will and the Particle Team
