---
title: Ethernet FeatherWing
order: 31
shared: true
columns: two
layout: tutorials.hbs
---

# Ethernet FeatherWing

In addition to Wi-Fi (Argon, Photon) and cellular (Boron, Electron), you can use Ethernet to connect devices to the Internet. Most commonly this is done using the Xenon, the least expensive of the 3rd-generation models, however the Ethernet FeatherWing can be used with the Argon and Boron, as well.

**TKTK: Picture**

Some common situations where Ethernet is useful include:

- Using a Xenon plus Ethernet FeatherWing as a gateway to the Internet for your Particle mesh network of additional Xenons.

- Using a Particle device an an environment that does not have Wi-Fi, but does have wired Ethernet. This might be the case in industrial situations and factories, for example.

- Using a Particle device on an Ethernet network with PoE (Power over Ethernet) to both provide networking and powering the device, eliminating the need for many small power adapters.

The form-factor is based around the Adafruit FeatherWing Tripler. The two side connectors allow you to plug in one Particle Mesh device along with a Feather accessory. Ethernet uses the WIZnet W5500 chip.


## PoE (Power over Ethernet)

The Power over Ethernet, commonly referred to as PoE, provides a way to power a device, in addition to providing networking capabilities, all over existing Cat 5 or Cat 6 twisted-pair Ethernet. 

The Particle PoE module plugs into the Ethernet FeatherWing to add the ability to power your 3rd-generation Particle device, typically a Xenon.

It uses the Silvertel [Ag9905M](/assets/datasheets/Ag9900M.pdf) and can supply 1800 mA to your device and any Feather accessories. It is a Class 0 IEEE 802.3af device. 

Note that because the Ethernet FeatherWing with PoE supplies 5V to the device by the VUSB pin, you should not power it by both PoE and the USB serial port at the same time. 



**TKTK: Picture**

### Assembling

**TKTK: Pictures**

### Powering by PoE

You can only use the PoE module with a IEEE 802.3af compliant Ethernet switch or power injector. Other common devices that use PoE include some models of security cameras, Wi-Fi access points, and Internet-based telephones.

### PoE Ethernet Switch

There are many compatible Ethernet switches with PoE capabilities, ranging from small unmanaged switches to large industrial devices. 

For example, for home use you might use something like the [Netgear GS305P](https://www.amazon.com/dp/B01MRO4M73/) 5-port PoE switch.

**TKTK: Picture**

In some cases, you may prefer to centralize the power like this, eliminating the need for small USB power supplies distributed to many locations. It also makes it easier to use one central uninterruptible power supply instead of distributing batteries to many small devices.

### PoE Power Injector

If you are only powering a single device, you may want to use an inexpensive PoE power injector. 

Make sure you use an IEEE 802.3af compliant version, however. Some inexpensive devices that include both a power injector and power splitter don't support PoE and instead use an incompatible proprietary system. These proprietary devices are not compatible with the PoE for the Ethernet FeatherWing.

For example, you could use the [TP-LINK TL-PoE150S](https://www.amazon.com/TP-LINK-TL-PoE150S-Injector-Adapter-compliant/dp/B001PS9E5I). It provides power to devices up to 100 meters (328 feet) away over Cat 5 or Cat 6 twisted pair Ethernet cable.

**TKTK: Picture**




