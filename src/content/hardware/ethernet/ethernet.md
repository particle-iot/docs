---
title: Ethernet
layout: commonTwo.hbs
columns: two
---

# {{title}}

Particle Gen 3 devices including the Argon, Boron, and B Series SoM have the ability to use Ethernet.

For the Feather form-factor devices (Argon, Boron) this is typically done using the [Ethernet FeatherWing](/reference/datasheets/accessories/gen3-accessories/#ethernet-featherwing).

For the B Series SoM devices (B404, B402, B524, B523), the [B Series Evaluation Board](/reference/datasheets/b-series/b-series-eval-board/) includes Ethernet. You can also use the same Wiznet W5500 chip on your own custom base board for the B Series SoM.

Both the Ethernet FeatherWing and B Series Evaluation Board have a socket to enable Power-over-Ethernet (PoE), however the [PoE Adapter](/reference/datasheets/accessories/gen3-accessories/#poe-power-over-ethernet-) is discontinued and no longer available from Particle. You could still include the Silvertel Ag9905M on your custom B Series SoM base board.

Note that the Wiznet W5500 does not support Auto MDI-X so you may need a crossover cable when connecting directly to a computer or laptop instead of an Ethernet switch.

## Pinouts

The pins used for reset, interrupt, and chip select are hardcoded into Device OS and are not user-configurable.

### FeatherWing Pinouts

These pinouts are using for the Ethernet FeatherWing, Argon, Boron, P2, and Photon 2.

|Particle Pin|Ethernet FeatherWing Pin   |
|:-------|:--------------------------|
|MISO    | SPI MISO                  |
|MOSI    | SPI MOSI                  |
|SCK     | SPI SCK                   |
|D3      | nRESET     |
|D4      | nINTERRUPT  |
|D5      | nCHIP SELECT|

Pins D3 and D4 are the same as `SPI1` on the Argon and Boron thus you cannot use Ethernet and SPI1 at the same time. It is possible to move SPI1 to other pins using [this unsupported technique](https://github.com/rickkas7/spi1-reconfiguration).

If you are using the Adafruit Ethernet FeatherWing, be sure to connect the nRESET and nINTERRUPT pins (on the small header on the short side) to pins D3 and D4 with jumper wires. These are required for proper operation.

### B Series Pinouts

| Particle Pin | M.2 Pin | Ethernet Pin |
| :---: | :---: | :--- |
| D8 | CS | ETH\_CS |
| A7 | RESERVED | ETH\_RESET |
| SCK | SCK | ETH\_CLK |
| MISO | MISO | ETH\_MISO |
| MOSI | MOSI | ETH\_MOSI |
| D22 | GPIO0 | ETH\_INT |

# Tracker Pinouts

|Particle Pin|Ethernet Pin   |
|:-------|:--------------------------|
|MISO    | SPI MISO                  |
|MOSI    | SPI MOSI                  |
|SCK     | SPI SCK                   |
|D6      | nRESET     |
|D7      | nINTERRUPT  |
|D2      | nCHIP SELECT|


## Device OS support

- The Device OS API for Ethernet is [available here](/reference/device-os/api/ethernet/ethernet/).

- Ethernet must be enabled. This is done using `System.enableFeature(FEATURE_ETHERNET_DETECTION);` from code, or from the mobile app. The reason is that probing for the Ethernet controller will use SPI and the GPIO pins above, which would adversely affect code that does not use Ethernet but does use those pins for other purposes.

- The `FEATURE_ETHERNET_DETECTION` flag only needs to be enabled once. It's stored in configuration flash and will survive reset, power down, user firmware flashing, and Device OS upgrades.

- Device OS has limited fallback support for switching between network layers, described in detail below.

- Ethernet networks without a DHCP server require Device OS 5.3.0 or later. Earlier versions did not support static IP addresses.

- There is no support for Ethernet on Gen 2 devices (Photon, P1, Electron, E Series). There is not enough room for it on the Photon and P1, and the Electron/E Series TCP/IP stack is completely different and incompatible and difficult to port to, and there is not enough space for it.

### Fallback

Device OS only uses the presence of Ethernet link and the ability to obtain a DHCP address for the availability of Ethernet. If Ethernet is available, it will always be used instead of the device's other network (Wi-Fi for Argon or cellular for the Boron or B Series SoM).

This has two consequences:

- It is not possible to use Ethernet to communicate with devices on an isolated LAN, then backhaul the data over cellular. One common use-case of this is Modbus TCP to sensors on Ethernet.

- If the Ethernet LAN is normally connected to the Internet, it's not possible to fall back to cellular if this Internet connection goes down. This is possible to implement using a 3rd-party library in your application in the following section, however.

- It is possible to manually switch from Ethernet to cellular by disconnecting the Ethernet interface in software, which is how the library below manages this.

There is one important exception:

With Device OS 5.3.0 and later, setting the gateway address to 0.0.0.0 will still allow communication with devices on the Ethernet LAN, but will not use the Ethernet for Internet and cloud access. This can be useful with the Boron to use the Boron for cloud access while still accessing devices on an isolated Ethernet LAN, which as for Modbus TCP control networks. This can be done for both DHCP and Static IP addressing mode.

### Ethernet with cellular fallback

One use-case that is supported via a 3rd-party library is Ethernet with cellular fallback. In this use-case:

- Ethernet is the primary communication method
- The Ethernet LAN is connected to the Internet
- Cellular is used as a backup when the Internet connection via Ethernet goes down

The [EthernetCellularRK](https://github.com/rickkas7/EthernetCellularRK) library provides this feature with only a couple lines of code in your application.

Note that this only provides cellular Internet to the Boron or B Series SoM. It is not a general-purpose WAN backup solution for other devices on the LAN!

### Keep-alive

The [Particle.keepAlive](/reference/device-os/api/cloud-functions/particle-keepalive/) is necessary to maintain the cloud connection. For cellular devices, this defaults to 23 minutes for the Particle SIM. (For 3rd-party SIM cards, it could be as low as 30 seconds.)

For Ethernet, the period will dependent on the local LAN connection. If you using the Argon and 2.1.0 or later, the default is 25 seconds.

The library above automatically handles switching this for you depending on whether you are connected by Ethernet or cellular, but if you are managing the connection yourself you will also need to do this.

If, after a period of time, you are no longer able to make a request to the device from the cloud side, but are able to communicate from the device, then you likely need to make your keep-alive setting shorter.