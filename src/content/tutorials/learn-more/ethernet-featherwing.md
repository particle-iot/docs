---
title: Ethernet FeatherWing
shared: true
columns: two
layout: commonTwo.hbs
description: Learn more about the Ethernet FeatherWing for Gen 3 Particle IoT devices (Argon, Boron)
---

# Ethernet FeatherWing

In addition to Wi-Fi (Argon, Photon) and cellular (Boron, Electron), you can use Ethernet to connect devices to the Internet. 

![PoE](/assets/images/ethernet-featherwing-2.jpg)

This allows a Particle device in an environment that does not have Wi-Fi, but does have wired Ethernet. This might be the case in industrial situations and factories, for example.

The form-factor is based around the Adafruit FeatherWing Tripler. The two side connectors allow you to plug in one Particle Gen 3 device along with an additional FeatherWing accessory. Ethernet uses the WIZnet W5500 chip.

For example, you might include:

- A display, like a large LED clock display or small LCD
- A sensor, such as a temperature or current sensor
- A relay, to control an external device

## PoE (Power over Ethernet)

The Power over Ethernet, commonly referred to as PoE, provides a way to power a device, in addition to providing networking capabilities, all over existing Cat 5 or Cat 6 twisted-pair Ethernet. 

The Particle PoE module plugs into the Ethernet FeatherWing to add the ability to power your 3rd-generation Particle device such as an Argon or Boron.

It uses the Silvertel [Ag9905M](/assets/datasheets/Ag9900M.pdf) and can supply 1800 mA to your device and any Feather accessories. It is a Class 0 IEEE 802.3af device. 

Note that because the Ethernet FeatherWing with PoE supplies 5V to the device by the VUSB pin, you should not power it by both PoE and the USB serial port at the same time. 

The recommended cable for PoE is Cat 6 twisted pair with a maximum length of 100 meters (328 feet).

![PoE](/assets/images/poe-2.jpg)

If you attach a LiPo battery to the Argon or Boron, it can be charged by PoE. 

The PoE adapter supplies 1800 mA. This is enough to power any Particle Gen 3 device with some power available to power FeatherWings in the extra FeatherWing socket.

### Assembling

- Unplug both the Ethernet and any other power source (battery or USB) before installation.
- Align the pins on the bottom of the PoE adapter with the headers on the Ethernet FeatherWing.
- Gently press down until the board is fully seated.

![PoE](/assets/images/poe-install.jpg)

### Powering by PoE

You can only use the PoE module with a IEEE 802.3af compliant Ethernet switch or power injector. Other common devices that use PoE include some models of security cameras, Wi-Fi access points, and Internet-based telephones.

### PoE Ethernet Switch

There are many compatible Ethernet switches with PoE capabilities, ranging from small unmanaged switches to large industrial devices. 

For example, for home use you might use something like the Netgear GS305P 5-port PoE switch.

![PoE](/assets/images/poe-switch.jpg)

In some cases, you may prefer to centralize the power like this, eliminating the need for small USB power supplies distributed to many locations. It also makes it easier to use one central uninterruptible power supply instead of distributing batteries to many small devices.

### PoE Power Injector

If you are only powering a single device, you may want to use an inexpensive PoE power injector. 

For example, you could use the [TP-LINK TL-PoE150S](https://www.amazon.com/TP-LINK-TL-PoE150S-Injector-Adapter-compliant/dp/B001PS9E5I). It provides power to devices up to 100 meters (328 feet) away over Cat 5 or Cat 6 twisted pair Ethernet cable.

![PoE](/assets/images/poe-injector.jpg)

Make sure you use an IEEE 802.3af compliant injector, however. Some inexpensive devices that include both a power injector and power splitter don't support PoE and instead use an incompatible proprietary scheme. These proprietary devices are not compatible with the PoE for the Ethernet FeatherWing.



