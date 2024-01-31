
Particle Gen 3 devices including the Argon, Boron, and B Series SoM have the ability to use Ethernet.

For the Feather form-factor devices (Argon, Boron) this is typically done using the [Ethernet FeatherWing](/reference/datasheets/accessories/gen3-accessories/#ethernet-featherwing).

Note that the Wiznet W5500 does not support Auto MDI-X so you may need a crossover cable when connecting directly to a computer or laptop instead of an Ethernet switch.


- Ethernet must be enabled. This is done using `System.enableFeature(FEATURE_ETHERNET_DETECTION);` from code, or from the mobile app. The reason is that probing for the Ethernet controller will use SPI and the GPIO pins above, which would adversely affect code that does not use Ethernet but does use those pins for other purposes.

- The `FEATURE_ETHERNET_DETECTION` flag only needs to be enabled once. It's stored in configuration flash and will survive reset, power down, user firmware flashing, and Device OS upgrades.

- Device OS has limited fallback support for switching between network layers, described in detail below.

- Prior to Device OS 5.3.0, Ethernet required a DHCP server on the network; It could not be used with a static IP address. Static IP addresses are supported in Device OS 5.3.0 and later.

- There is no support for Ethernet on Gen 2 devices (Photon, P1, Electron, E Series). There is not enough room for it on the Photon and P1, and the Electron/E Series TCP/IP stack is completely different and incompatible and difficult to port to, and there is not enough space for it.

### Fallback

Device OS only uses the presence of Ethernet link and the ability to obtain a DHCP address for the availability of Ethernet. If Ethernet is available, it will always be used instead of the device's other network (Wi-Fi for Argon or cellular for the Boron or B Series SoM).

This has two consequences:

- In Device OS 5.3.0 and later it is possible to communicate with devices on an isolated LAN, then backhaul the data over cellular. One common use-case of this is Modbus TCP to sensors on Ethernet. In this scenario, set the IP address statically or using DHCP, but [set the gateway address to 0.0.0.0](/reference/device-os/api/network/networkinterfaceconfig/#networkinterfaceconfig-gateway). The gateway address of 0.0.0.0 signifies that this is not a connection to the Internet and cannot be used for cloud communication. For more information, see [Isolated LAN](/hardware/ethernet/ethernet/#isolated-lan).

- If the Ethernet LAN is normally connected to the Internet, it's not possible to fall back to cellular if this Internet connection goes down. This is possible to implement using a 3rd-party library in your application, see the [ethernet reference guide](/hardware/ethernet/ethernet/) for more information.
