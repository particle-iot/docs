---
title: Tethering
columns: two
layout: commonTwo.hbs
description: Tethering
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


{{!-- END do not edit content above, it is automatically generated  --}}

You cannot use a LTE Cat M1 module, such as the B404X, Boron 404X, or M404.

### Serial connection

Tethering uses a UART serial connection between the other device (such as a Rasbperry Pi) and the 
Particle device. Hardware flow control (RTS/CTS) is recommended, as is using a high baud rate.

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

```cpp
#include "Particle.h"

SerialLogHandler dbg(115200, LOG_LEVEL_INFO);

SYSTEM_MODE(SEMI_AUTOMATIC);

SYSTEM_THREAD(ENABLED);

/* executes once at startup */
void setup() {
    // waitUntil(Serial.isConnected);
    // Enable Cellular
    Cellular.on();
    Cellular.connect();
    // Bind Tether interface to Serial1 @ 921600 baudrate with default settings (8n1 + RTS/CTS flow control)
    Tether.bind(TetherSerialConfig().baudrate(921600).serial(Serial1));
    // Turn on Tether interface and bring it up
    Tether.on();
    Tether.connect();
}

void loop() {
}
```

For information about the `Tether` class, see the [Device OS API reference](/reference/device-os/api/tether/).

## Raspberry Pi

If using a Raspberry Pi as the other device, you must configure it to establish a PPP connection
over its serial port instead of Ethernet or Wi-Fi.

A script to automate this will be provided in the future, but if you'd like to attempt it
yourself now, you can follow the brief notes below.


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
ACTION=="add|change|move", KERNEL=="ttyS0", ENV{ID_MM_TTY_BAUDRATE}="460800", ENV{ID_MM_CANDIDATE}="1", ENV{ID_MM_PLATFORM_DRIVER_PROBE}="1", ENV{ID_MM_DEVICE_PROCESS}="1"
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
