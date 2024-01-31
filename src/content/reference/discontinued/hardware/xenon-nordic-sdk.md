---
title: Xenon with the Nordic SDK
layout: commonTwo.hbs
columns: two
---
# {{title}}

With the [deprecation of Thread Mesh](/reference/discontinued/hardware/mesh/), some options for Xenons include:

- Using Xenons in [standalone mode, with no network connectivity](/reference/device-os/api/system-modes/manual-mode/).
- Using them standalone as a [CircuitPython devices](/archives/xenon-circuit-python/).

If you need to have the ability to create and use mesh networking features after December 31, 2020, one option is to use the Nordic  SDK native Thread support. If you absolutely need to continue using Thread mesh, this is the best option, however there are important caveats:

- The Xenon will cease to be a Particle device, and you must instead use the Nordic development tools and APIs.
- None of the Particle cloud features (publish, subscribe, functions, variables, and OTA code flash) will be available.
- The Particle mobile apps and CLI cannot be used with Nordic SDK devices.
- It is not possible to use Argon or Boron gateways; you'll need to use a separate Thread mesh border router. 
- There is no ability to flash code OTA or over USB. You will need to use a SWD debugger. The nRF SDK recommended debugger is the Segger J-Link and all of their tools use it. While it's theoretically possible to flash code with the Particle debugger, it's not supported by their tools and doing so will be difficult.
- Particle Workbench can be used as an editor, however the preferred environment for Nordic development is Segger Embedded Studio (SES).
- The Nordic development environment is somewhat Windows-centric. While you can get Segger Embedded Studio and the nrfjprog utility for Mac and Linux, some tools are only available for Windows.
- While technically this process also works with the Argon or Boron, it's not practical to access the Wi-Fi or cellular modem from native nRF SDK code, so essentially those devices would behave as a Xenon.

Still on board with this plan? Let's get started!



## Segger J-Link

As mentioned earlier, you will probably want a Segger J-Link. There are three versions you can use

- [SEGGER J-Link EDU Mini - JTAG/SWD Debugger](https://www.adafruit.com/product/3571) $19.95 
- [SEGGER J-Link EDU - JTAG/SWD Debugger](https://www.adafruit.com/product/1369) $69.95
- [SEGGER J-Link BASE - JTAG/SWD Debugger](https://www.adafruit.com/product/2209) $399.95

For educational use and home use for non-commercial projects you can use the less expensive EDU version. For commercial projects you'll need the BASE version.

If you use either non-mini version you'll also need two adapters. The second cable is the same as the one with the Particle Debugger, so you can use the cable from that if you have one available.

- [JTAG (2x10 2.54mm) to SWD (2x5 1.27mm) Cable Adapter Board](https://www.adafruit.com/product/2094) $4.95
- [10-pin 2x5 Socket-Socket 1.27mm IDC (SWD) Cable - 150mm long](https://www.adafruit.com/product/1675) $2.95 

Since all of the Nordic tools use the J-Link it really is recommended. It's also really fast!

## Learn about OpenThread

Particle Mesh is really OpenThread, with much of the complexity hidden. Unfortunately when you run a native OpenThread stack you'll now have to deal with that. A good place to start are the [OpenThread Guides](https://openthread.io/guides).

## Setting up the Nordic development environment

A few bits of information that may help as you navigate the Nordic environment.

- The Xenon has a Nordic nRF52840 SoC.
- Particle Mesh is actually Thread mesh, based on 802.15.4. You'll see both Thread and 802.15.4 used in the Nordic SDK.
- The Nordic SDK uses Mesh to mean Bluetooth Mesh, which is probably not what you want.
- The Nordic SoftDevice is the code that implements protocols like BLE and ANT. It's not actually used for Thread mesh.
- The Xenon has many features in common with the nRF52840 development kit (DK), PCA10056. In fact, following the [nRF52840 DK](https://infocenter.nordicsemi.com/topic/ug_nrf52840_dk/UG/nrf52840_DK/intro.html) instructions are a reasonable place to start. Some of the binaries for the PCA10056 even run unmodified on the Xenon.

There are several tools you should [download to get started](https://infocenter.nordicsemi.com/topic/ug_nrf52840_dk/UG/common/nordic_tools.html):

- [Segger Embedded Studio](https://www.segger.com/products/development-tools/embedded-studio/). This is free for use when programming Nordic devices. You need **Embedded Studio for ARM**.
- [nRF5 SDK for Thread and Zigbee](https://infocenter.nordicsemi.com/topic/struct_sdk/struct/sdk_thread_zigbee_latest.html). Tested with version 4.0.0.
- [nRF Command Line Tools for Windows](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Command-Line-Tools/Download#infotabs) or [other platforms](https://infocenter.nordicsemi.com/topic/ug_nrf5x_cltools/UG/cltools/nrf5x_installation.html).

If you have not already installed a terminal program like [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) or CoolTerm, you might want to do that as well.  For Linux and Mac you can use screen.

In Segger Embedded Studio you will need to select then **Tools - Package Manager** menu, then in the **Select Packages** window in the **Nordic** section, install the **nRF CPU Support Package**.


## Back up your device

The steps below will completely erase your device and remove all Particle functionality, so making a backup copy is helpful in case you want to restore it later.

- Connect your Segger J-Link using the large JTAG cable to Cortex SWD Adapter.
- Use the micro SWD table to connect the Cortex SWD Adapter to the Xenon.
- Also connect the Xenon by USB to your computer. You need both.
- Put the Xenon in DFU mode (blinking yellow).

```
nrfjprog -f NRF52 --readcode backupcode.hex
nrfjprog -f NRF52 --readuicr backupuicr.hex
```

If you have multiple devices you really only have do to this once. You can restore the files to a different Xenon and it will still work. The things like device ID, serial number, and device secret are *not* stored in these files. 

## Running the Thread CLI Example

The fastest way to get started is to use the Thread CLI. You can learn more about it in the [tutorial](https://codelabs.developers.google.com/codelabs/openthread-hardware/#0). The [Full OpenThread CLI Manual](https://github.com/openthread/openthread/blob/master/src/cli/README.md) is also helpful.


**FTD** is the Full Thread Device as what we'll be using. **MTD** is the Minimal Thread Device.

Each of the examples is available in **UART** which uses the UART on the debugger and also **USB** which uses the nRF52 USB.

Look in the nRF5 SDK you downloaded earlier in the examples. The path should be something like:

**nRF5_SDK_for_Thread_and_Zigbee_v4.0.0_dc7186b\examples\thread\cli\ftd\usb\hex**

In that folder should be **nrf52840_xxaa_pca10056.hex**. Even though that file is for the Nordic development kit (DK) PC10056 it works on the Xenon! Make sure you use the USB version, the UART version doesn't work on the Xenon.

Flash this to the Xenon. This will completely erase everything on your Xenon so you should make sure you made a backup, above.

```
nrfjprog -f NRF52 --program nrf52840_xxaa_pca10056.hex --chiperase
nrfjprog -f NRF52 --reset
```

Note that when using the PCA10056 binaries the status LED and buttons do not work. However, after several seconds you should see a USB CDC (serial) device available.

On Windows you can use a program like PuTTY or CoolTerm to connect to this port. For example, COM6 at 115200 baud.

Press return a few times and you should get a prompt (>). The help command should show help.

```
> ifconfig up
Done
> ipaddr
fe80:0:0:0:b4b6:50b4:489f:efa5
Done
```

Once you've set up two devices you can start following the instructions at [Build a Thread network with nRF52840 boards and OpenThread](https://codelabs.developers.google.com/codelabs/openthread-hardware/#5).


## Setting up a Thread mesh border router 

While you can communicate between Xenons at this point, you won't be able to communicate with the Internet until you set up a Border Router. You cannot use your existing Argon or Boron gateways. Border Router is the OpenThread term for what Particle called a Gateway.

There are several options for setting up an [OpenThread Border Router](https://openthread.io/guides/border-router). All of these options connect Linux implementations of wpantund with an OpenThread hardware device, such as the nRF52 development kit. This is a good choice.

- One option is to download the [RaspPIoT Border Router Demo](https://www.nordicsemi.com/Software-and-tools/Software/nRF5-SDK-for-Thread-and-Zigbee/Download#infotabs) and run it on a Raspberry Pi 3B Plus. 

- It is also possible to use a Linux machine with [wpantund](https://codelabs.developers.google.com/codelabs/openthread-hardware/#3) directly.

- There is also a version for Docker so you don't have to install all of the Linux dependencies.

## Writing firmware

Unfortunately writing code to the nRF52 SDK is beyond this tutorial, but there are a lot of examples in the nRF5 SDK. It will show how you can use GPIO, network features like UDP, etc.. The projects in the nRF5 SDK include Segger Embedded Studio project files so it's easy to view and run them.

You can find several examples of setting up and flashing a device using the nRF SDK [here](https://medium.com/home-wireless/using-segger-studio-and-nordic-sdk-with-particle-xenon-91e34aeb632a).

## Restoring Particle firmware

The easiest way to restore the Particle firmware is to restore the backup you created earlier.

```
nfrjprog -f NRF52 --program backupuicr.hex --chiperase
nfrjprog -f NRF52 --program backupcode.hex
```

If you didn't save a backup, you can back up a different, working Xenon and restore it. It's possible to do it from the software release files, however it's a pain because you need to convert the .bin files from the releases into Intel hex files in order to use nrfjprog. It's easier to just backup and restore the whole device.

