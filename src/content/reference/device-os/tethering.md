---
title: Tethering
columns: two
layout: commonTwo.hbs
description: Tethering
includeDefinitions: [api-helper, api-helper-extras]
---

# Tethering

Tethering is a feature in Device OS 6.2.0 that allows another device to communicate with the Internet
using a Particle B-Series SoM cellular modem. This can be used from a Raspberry Pi, for example, to 
allow it to access the Internet through the Particle B-SoM cellular device.

## Requirements

### LTE Cat 1 cellular module

This features requires a LTE Cat 1 cellular module, available on these SKUs.

{{!-- BEGIN do not edit content below, it is automatically generated 7dc335b7-4ddc-464d-ae96-6231944ccc76 --}}

| SKU | Description | Modem | Region | Gen | Lifecycle |
| :--- | :--- | :--- | :--- | :---: | :--- |
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | EG91-NAX | NORAM | 3 | GA |
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | EG91-NAX | NORAM | 3 | GA |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EG91-E | EMEAA | 3 | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EG91-E | EMEAA | 3 | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | EG91-NAX | NORAM | 3 | In development |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | EG91-NAX | NORAM | 3 | In development |


{{!-- END do not edit content above, it is automatically generated  --}}

You cannot use a LTE Cat M1 module, such as the B404X, Boron 404X, or M404.

### Serial connection

Tethering uses a UART serial connection between the other device (such as a Rasbperry Pi) and the 
Particle device. Hardware flow control (RTS/CTS) is recommended, as is using a high baud rate. 921600 baud works well.

All current Particle devices have 3.3V logic on UART ports, so if your other device
is a 5V device, it would need level shifters. Raspberry Pi devices are 3.3V.

### PPP support

Over this serial connection PPP (point-to-point protocol) is used. This allows the other
device to get an IP address and use features like TCP, UDP, and DNS to transmit data to 
and from the Internet. 

It is not restricted to using the Particle cloud, but it cannot establish permanent listening
sockets for TCP or UDP because these are not supported by the cellular networks.

Note that the other device must support PPP, so you cannot use this for devices like
Arduino that do not support PPP over UART serial as a network connection.

### Data usage

Tethering can use a very large amount of cellular data. Caution should be used with the existing
Particle data plans as you can easily exceed your allowed cellular data limit.

[Contact sales](https://particle.io/sales/) if you have a need for higher data allowances.

## Application firmware

In order to use tethering, it must be enabled:

{{> codebox content="/assets/files/tether.cpp" format="cpp" height="400" flash="true"}}

For information about the `Tether` class, see the [Device OS API reference](/reference/device-os/api/tether/).

### TCP and UDP

It is possible to use TCPServer, TCPClient, and UDP to communicate between the other device
and the Particle device over TCP or UDP over the tethering connection. 

When binding listening connections, or making an outgoing connection or sending packets,
an optional `nif` specifies the network interface to use. This can be `Tether` for the 
tethering interface.

### Particle M.2 breakout

If you are using the M.2 breakout board or M.2 evaluation board with the B504 and B524, you will 
be using these pins on the expansion header.

{{imageOverlay src="/assets/images/pi/eval-serial.svg"}}

### SoM custom board

If you are using your own custom board you will be using these pins on the B504 and B524 B-Series SoM.

{{!-- BEGIN do not edit content below, it is automatically generated f054fe69-870e-43d3-bd07-4d3168908a2b --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, GPIO | Serial1 TX | P0.06 |
| 38 | RX / D10 | Serial RX, GPIO | Serial1 RX | P0.08 |
| 40 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | Serial1 CTS | P1.01 |
| 42 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | Serial1 RTS | P1.02 |


{{!-- END do not edit content above, it is automatically generated  --}}


## Raspberry Pi 

If using a Raspberry Pi as the other device, you must configure it to establish a PPP connection
over its serial port instead of Ethernet or Wi-Fi.

- Be sure to cross TX &#x2194; RX between the Pi and the B-SoM. For example, the Particle TX connects to the Pi RX.
- Be sure the GND pin is connected between the Pi and the B-SoM.
- Do not connect 3V3 or 5V between the Pi and B-SoM! 
- You may connect the Pi 5V to Particle device VIN if you are powering the Particle device from the Pi hat connector.

This section is separated into two parts. The first is the easy method using 460 Kbaud without flow control on UART0, 
which works on both the Pi 4 and Pi 5.

If you are building your own board, you may want to use the second method, which uses 912 Kbaud with hardware flow
control (RTS/CTS). See [Using flow control](#using-flow-control-raspberry-pi), below.

### Serial connections - Raspberry Pi


The setup script, below, uses UART0 without flow control for the tethering connection on the Raspberry Pi. It
can be used on both the Pi 4 and Pi 5.

{{imageOverlay src="/assets/images/pi/pi4-uart0.svg"}}


{{!-- BEGIN do not edit content below, it is automatically generated c864a725-a712-44ad-b4e9-ccb882e860b7 --}}

| Pi Pin Num | Pi GPIO | Pi Function | ↔ | Particle Name | Particle Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | GPIO14 | UART0_TX | &nbsp; | RX | Serial1 RX |
| 10 | GPIO15 | UART0_RX | &nbsp; | TX | Serial1 TX |
| 6 | GND | &nbsp; | &nbsp; | GND | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}


### Setup script - Raspberry Pi

The script below makes it easy if you are using Debian 12 "bookworm" for 32-bit or 64-bit ARM
on a Raspberry Pi 4 or Raspberry Pi 5.

{{> codebox content="/assets/files/enable-tethering.sh" format="sh" height="400" flash="false"}}

Download and run this script on your Raspberry Pi:

```
bash enable-tethering.sh
```

This script:

1. Disables the linux serial console on the USART needed for tethering
2. Enables a USART with flow control on the USART pins
3. Disables any PPP options, create default options for the new tty PPP device
4. Adds udev rules for the new PPP tty device
5. Scans for the modem in modem manager
6. Creates a connection to the modem using NetworkManager

### Using flow control - Raspberry Pi

Using flow control with a 912 Kbaud data rate provides the optimal performance and is recommended if you are designing
your own board.

One important caveat: On the Pi 4, UART0 does not support hardware flow control. Thus you need to use separate pins 
for Pi 4 vs. Pi 5.

Be sure to cross TX &#x2194; RX and CTS &#x2194; RTS between the Pi and the B-SoM. For example, the Particle CTS connects to the Pi RTS.


### Serial with flow control - Raspberry Pi 5

The setup script, below, uses UART0 for the tethering connection on the Raspberry Pi 5.

{{imageOverlay src="/assets/images/pi/pi5-uart0.svg"}}


{{!-- BEGIN do not edit content below, it is automatically generated 71ebb5bc-2b24-40c6-98fe-40cc38acc89a --}}

| Pi Pin Num | Pi GPIO | Pi Function | ↔ | Particle Name | Particle Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | GPIO14 | UART0_TX | &nbsp; | RX | Serial1 RX |
| 10 | GPIO15 | UART0_RX | &nbsp; | TX | Serial1 TX |
| 36 | GPIO16 | UART0_CTS | &nbsp; | D2 | Serial1 RTS |
| 11 | GPIO17 | UART0_RTS | &nbsp; | D3 | Serial1 CTS |
| 6 | GND | &nbsp; | &nbsp; | GND | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}


If you wish to use a different port, the following ports are available on the Raspberry Pi 5.

{{imageOverlay src="/assets/images/pi/pi5-serial.svg"}}


### Serial with flow control - Raspberry Pi 4

The setup script below uses UART2 on the Raspberry Pi 4 because UART0 does not support hardware flow control on the Pi 4.

{{imageOverlay src="/assets/images/pi/pi4-uart2.svg"}}

{{!-- BEGIN do not edit content below, it is automatically generated 1b6753e8-fead-433a-8fa0-476c6a851e2e --}}

| Pi Pin Num | Pi GPIO | Pi Function | ↔ | Particle Name | Particle Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 27 | GPIO0 | UART2_TX | &nbsp; | RX | Serial1 RX |
| 28 | GPIO1 | UART2_RX | &nbsp; | TX | Serial1 TX |
| 3 | GPIO2 | UART2_CTS | &nbsp; | D2 | Serial1 RTS |
| 5 | GPIO3 | UART2_RTS | &nbsp; | D3 | Serial1 CTS |
| 6 | GND | &nbsp; | &nbsp; | GND | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}


If you wish to use a different port, the following ports are available on the Raspberry Pi 4.

{{imageOverlay src="/assets/images/pi/pi4-serial.svg"}}


### Setup script with flow control - Raspberry Pi

The script below makes it easy if you are using Debian 12 "bookworm" for 32-bit or 64-bit ARM
on a Raspberry Pi 4 or Raspberry Pi 5.

{{> codebox content="/assets/files/enable-tethering-flow.sh" format="sh" height="400" flash="false"}}

Download and run this script on your Raspberry Pi:

```
bash enable-tethering.sh
```

This script:

1. Disables the linux serial console on the USART needed for tethering
2. Enables a USART with flow control on the USART pins
3. Disable sany PPP options, create default options for the new tty PPP device
4. Adds udev rules for the new PPP tty device
5. Scans for the modem in modem manager
6. Creates a connection to the modem using NetworkManager

### Manual setup - Raspberry Pi

If you prefer to set up the connection manually, these notes may be helpful.

{{collapse op="start" label="Manual Linux setup notes"}}

**ModemManager / Network Manager**

Add the udev rule(s) to let Modem Manager know which UART to use for modem detection.

For Raspberry Pi 4, use `ttyS0` 

```bash
# /etc/udev/rules.d/78-mm-user.rules 
ACTION!="add|change|move", GOTO="mm_user_rules_end"
DEVPATH=="/sys/devices/platform/soc/fe215040.serial/tty/ttyS0", ENV{ID_MM_PLATFORM_DRIVER_PROBE}="1"
LABEL="mm_user_rules_end"

# /etc/udev/rules.d/78-mm-user1.rules
ACTION=="add|change|move", KERNEL=="ttyS0", ENV{ID_MM_TTY_BAUDRATE}="921600", ENV{ID_MM_CANDIDATE}="1", ENV{ID_MM_PLATFORM_DRIVER_PROBE}="1", ENV{ID_MM_DEVICE_PROCESS}="1"
```

For Raspberry Pi 5, use `ttyAMA0`

```bash
# /etc/udev/rules.d/78-mm-particle.rules 
ACTION=="add|change|move", KERNEL=="ttyAMA0", ENV{ID_MM_TTY_FLOW_CONTROL}="none", ENV{ID_MM_TTY_BAUDRATE}="921600" ENV{ID_MM_DEVICE_PROCESS}="1"
```

Run the following commands and see that the modem gets detected:

```bash
$ sudo udevadm control -R
$ sudo udevadm trigger
$ sudo mmcli -S # Scan
$ sudo mmcli -L # Retry a few times, give MM some time to detect the "modem"
$ sudo mmcli -m 0 # This should provide detailed info on the detected "modem"
```

**Make sure that `/etc/ppp/options` is empty or has all the options commented out.**

Create `/etc/ppp/options.ttyS0` (Pi 4) or `/etc/ppp/options.ttyAMA0` for Pi 5 with just one line:

```bash
local
```

Add a new connection to Network Manager:

```bash
$ sudo nmcli connection edit type gsm con-name "particle"
nm > set gsm.apn "particle"
nm > set connection.interface "ttyS0"
nm > set ppp.crtscts true # explicitly enable flow control
nm > save
nm > # answer yes to auto-connect
nm > (Ctrl-D)
```

For Raspberry Pi 5:

```bash
$ sudo nmcli connection edit type gsm con-name "particle"
nmcli> set gsm.apn particle
nmcli> set connection.interface ttyAMA0
nmcli> set ppp.crtscts true # explicitly enable flow control
nmcli> save
Saving the connection with 'autoconnect=yes'. That might result in an immediate activation of the connection.
Do you still want to save? (yes/no) [yes] yes
nmcli> (Ctrl-D)
```

At this point the there should be a `ppp0` interface in an up state and `nmcli` should output `particle`/ `ttyS0` connection as up.

To see all of the connection details and settings:

```bash
$ nmcli con show particle
connection.id:                          particle
connection.uuid:                        9a95121b-22b7-44b2-9991-f69ac0f7194a
connection.stable-id:                   --
connection.type:                        gsm
connection.interface-name:              ttyS0
connection.autoconnect:                 yes
...
```
{{collapse op="end"}}
