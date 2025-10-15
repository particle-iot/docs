---
title: Ethernet
layout: commonTwo.hbs
columns: two
---

# {{title}}

Particle Gen 3 devices including the Argon, Boron, and B-Series SoM have the ability to use Ethernet.

For the Feather form-factor devices (Argon, Boron) this is typically done using the [Ethernet FeatherWing](/reference/datasheets/accessories/gen3-accessories/#ethernet-featherwing). If using the [Adafruit Ethernet Featherwing](https://www.adafruit.com/product/3201), follow the instructions [here](/hardware/ethernet/ethernet/#adafruit-featherwing).

For the B-Series SoM devices (B404, B402, B524, B523), the [B-Series Evaluation Board](/reference/datasheets/b-series/b-series-eval-board/) includes Ethernet. You can also use the same Wiznet W5500 chip on your own custom base board for the B-Series SoM.

Both the Ethernet FeatherWing and B-Series Evaluation Board have a socket to enable Power-over-Ethernet (PoE), however the [PoE Adapter](/reference/datasheets/accessories/gen3-accessories/#poe-power-over-ethernet-) is discontinued and no longer available from Particle. You could still include the Silvertel Ag9905M on your custom B-Series SoM base board.

Note that the Wiznet W5500 does not support Auto MDI-X so you may need a crossover cable when connecting directly to a computer or laptop instead of an Ethernet switch.

## Pinouts

The pins used for reset, interrupt, and chip select are hardcoded into Device OS and are not user-configurable.

### FeatherWing Pinouts

These are the default pins for the Ethernet FeatherWing, Argon, Boron, P2, and Photon 2.

|Particle Pin|Ethernet FeatherWing Pin   |
|:-------|:--------------------------|
|MISO    | SPI MISO                  |
|MOSI    | SPI MOSI                  |
|SCK     | SPI SCK                   |
|D3      | nRESET     |
|D4      | nINTERRUPT  |
|D5      | nCHIP SELECT|

Pins D3 and D4 are the same as `SPI1` on the Argon and Boron. You can use [pin reconfiguration](/reference/device-os/api/ethernet/ethernet/#pin-configuration-ethernet) to change the pins used for reset, interrupt, and chip select.

### Adafruit FeatherWing

If you are using the Adafruit Ethernet Feather Wing (instead of the Particle Feather Wing), by default nRESET and nINTERRUPT pins are not connected. You will either need to connect them (on the small header on the short side) to pins D3 and D4 with jumper wires, or use Device OS 5.9.0 and operate without these two hardware control pins.

The following code enables the use of the Adafruit Ethernet FeatherWing without having to solder jumper wires:

```cpp
// Enable Ethernet (requires Device OS 5.9.0 or later)
if_wiznet_pin_remap remap = {};
remap.base.type = IF_WIZNET_DRIVER_SPECIFIC_PIN_REMAP;

System.enableFeature(FEATURE_ETHERNET_DETECTION);
remap.cs_pin = D5;
remap.reset_pin = PIN_INVALID;
remap.int_pin = PIN_INVALID;
auto ret = if_request(nullptr, IF_REQ_DRIVER_SPECIFIC, &remap, sizeof(remap), nullptr);
```

### B-SoM and M-SoM default pins

| Particle Pin | M.2 Pin | Ethernet Pin |
| :---: | :---: | :--- |
| D8 | CS | ETH\_CS |
| A7 | RESERVED | ETH\_RESET |
| SCK | SCK | ETH\_CLK |
| MISO | MISO | ETH\_MISO |
| MOSI | MOSI | ETH\_MOSI |
| D22 | GPIO0 | ETH\_INT |

### Muon default pins

|Particle Pin|Ethernet Pin   |
|:-------|:--------------------------|
|MISO    | SPI MISO                  |
|MOSI    | SPI MOSI                  |
|SCK     | SPI SCK                   |
|A4      | Interrupt  |
|A3      | Chip Select (CS) |


### Tracker default pins

|Particle Pin|Ethernet Pin   |
|:-------|:--------------------------|
|MISO    | SPI MISO                  |
|MOSI    | SPI MOSI                  |
|SCK     | SPI SCK                   |
|D6      | Reset     |
|D7      | Interrupt  |
|D2      | Chip Select (CS) |


## Device OS support

- The Device OS API for Ethernet is [available here](/reference/device-os/api/ethernet/ethernet/).

- Ethernet must be enabled. This is done using `System.enableFeature(FEATURE_ETHERNET_DETECTION);`, typically from code. The reason is that probing for the Ethernet controller will use SPI and the GPIO pins above, which would adversely affect code that does not use Ethernet but does use those pins for other purposes.

- The `FEATURE_ETHERNET_DETECTION` flag only needs to be enabled once. It's stored in configuration flash and will survive reset, power down, user firmware flashing, and Device OS upgrades.

- Device OS has limited fallback support for switching between network layers, described in detail below.

- Ethernet networks without a DHCP server require Device OS 5.3.0 or later. Earlier versions did not support static IP addresses.

- There is no support for Ethernet on Gen 2 devices (Photon, P1, Electron, E-Series). There is not enough room for it on the Photon and P1, and the Electron/E-Series TCP/IP stack is completely different and incompatible and difficult to port to, and there is not enough space for it.

### Fallback

Device OS only uses the presence of Ethernet link and the ability to obtain a DHCP address for the availability of Ethernet. If Ethernet is available, it will always be used instead of the device's other network (Wi-Fi for Argon or cellular for the Boron or B-Series SoM).

This has two consequences:

- In Device OS 5.3.0 and later it is possible to communicate with devices on an isolated LAN, then backhaul the data over cellular. One common use-case of this is Modbus TCP to sensors on Ethernet. In this scenario, set the IP address statically or using DHCP, but [set the gateway address to 0.0.0.0](/reference/device-os/api/network/networkinterfaceconfig/#networkinterfaceconfig-gateway). The gateway address of 0.0.0.0 signifies that this is not a connection to the Internet and cannot be used for cloud communication. See [isolated LAN](#isolated-lan) below.

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

Note that this only provides cellular Internet to the Boron or B-Series SoM. It is not a general-purpose WAN backup solution for other devices on the LAN!

### Keep-alive

The [Particle.keepAlive](/reference/device-os/api/cloud-functions/particle-keepalive/) is necessary to maintain the cloud connection. For cellular devices, this defaults to 23 minutes for the Particle SIM. (For 3rd-party SIM cards, it could be as low as 30 seconds.)

For Ethernet, the period will dependent on the local LAN connection. If you using the Argon and 2.1.0 or later, the default is 25 seconds.

The library above automatically handles switching this for you depending on whether you are connected by Ethernet or cellular, but if you are managing the connection yourself you will also need to do this.

If, after a period of time, you are no longer able to make a request to the device from the cloud side, but are able to communicate from the device, then you likely need to make your keep-alive setting shorter.

## Isolated LAN

This example code uses a static IP address and an isolated Ethernet LAN. This code was tested with a Boron and the Particle Ethernet Featherwing, but should work on other cellular devices. It was tested with Device OS 5.5.0.

- It sets up the device with a static IP address on Ethernet. The Ethernet network can be isolated and does not need DHCP or an Internet connection.
- It uses cellular for the Particle cloud connection.

```cpp
#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// LOG_LEVEL_TRACE includes enough messages so you can be sure it's connecting by cellular
SerialLogHandler logHandler(LOG_LEVEL_TRACE);

void setup() {
    // This line is only here so you can see all of the log messages, remove for production
    waitFor(Serial.isConnected, 10000); delay(2000);

    System.enableFeature(FEATURE_ETHERNET_DETECTION);

    // Configure a static IP address (192.168.2.40) and subnet mask (255.255.255.0)
    // By setting the gateway to 0.0.0.0 Ethernet will not be used for the cloud connection
    auto conf = NetworkInterfaceConfig()
                .source(NetworkInterfaceConfigSource::STATIC, AF_INET)
                .address(IPAddress(192,168,2,40), IPAddress(255,255,255,0))
                .gateway(IPAddress(0,0,0,0));
    Ethernet.setConfig(conf);

    // Turn on Ethernet and connect (asynchronously)
    Ethernet.on();
    waitFor(Ethernet.isOn, 2000);
    Ethernet.connect();
    Log.info("Ethernet IP address: %s", Ethernet.localIP().toString().c_str());

    // Turn on cellular and connect; this is used for the cloud connection
    Cellular.on();
    waitFor(Cellular.isOn, 2000);
    Cellular.connect();
    waitFor(Cellular.ready, 30000);
    Log.info("Cellular connected");

    // Now connect to the cloud (over cellular)
    Particle.connect();    
}

void loop() {
}

```

You can tell it's working from the log messages. Here's where it updated the network configuration and brought up Ethernet:

```
0000003334 [system.nm] TRACE: Updated file: /sys/network.dat
0000003450 [system.nm] TRACE: Request to power on the interface
0000003450 [system.nm] INFO: State changed: DISABLED -> IFACE_DOWN
0000003552 [system.nm] INFO: State changed: IFACE_DOWN -> IFACE_REQUEST_UP
0000003558 [system.nm] INFO: State changed: IFACE_REQUEST_UP -> IFACE_UP
0000003582 [system.nm] INFO: State changed: IFACE_UP -> IFACE_LINK_UP
0000013449 [app] INFO: Ethernet IP address: 192.168.2.40
```

You can then see a lot of messages that are cellular-related, ending with:

```
0000035464 [system] INFO: Cloud connected
```

Other useful tests:

- In the [Particle console](https://console.particle.io/) you can use the **Ping** feature in the device details page with Ethernet disconnected to make sure.
- From a computer on the Ethernet LAN you should be able to use the ICMP ping command to ping the address you have configured:

```
% ping 192.168.2.40
PING 192.168.2.40 (192.168.2.40): 56 data bytes
64 bytes from 192.168.2.40: icmp_seq=0 ttl=255 time=9.327 ms
64 bytes from 192.168.2.40: icmp_seq=1 ttl=255 time=3.928 ms
^C
```

### Ethernet.ready

Also note In order for Ethernet to be considered ready the Ethernet link must be up, and IP address assigned, DNS configured, and a gateway set. Thus if you using isolated Ethernet (gateway of 0.0.0.0), you cannot use `Ethernet.ready()` to determine if it's up. This is because Ethernet.ready() implies that it's ready to be used for the cloud connection, which is not true for isolated LANs. 

If you want to check for isolated LAN up, you can use `!Ethernet.connecting() && Ethernet.localIP() != IPAddress()`.
