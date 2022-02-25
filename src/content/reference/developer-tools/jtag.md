---
word: JTAG
title: Using SWD/JTAG
layout: commonTwo.hbs
columns: two
redirects: true
description: Using SWD/JTAG to program Particle Devices
---

# Using SWD/JTAG

JTAG ("Joint Test Action Group") is a standard for testing and verifying electronic circuit boards. It can be used with Particle devices and this document will describe using it for tasks like programming the device flash.

JTAG can also be used with a source-level debugger, which is a feature of [Particle Workbench](/tutorials/developer-tools/workbench/#debugging-3rd-generation-).

There is a variation known as Serial Wire Debug (SWD). This is an option for Gen 2 devices (STM32, Photon, P1, Electron, and E Series), and the normal method of connection for Gen 3 devices (Argon, Boron, B Series SoM, Tracker SoM). It uses only two signal wires plus ground.

All of the JTAG/SWD debuggers can accept an [Intel Hex file](https://en.wikipedia.org/wiki/Intel_HEX) (.hex). One nice thing about .hex files, which are different than the .bin files Particle binaries are distributed in, is that hex files include the address they are to be flashed to. Also, you can combine multiple disjoint binaries into a single hex file, so you only need to flash one file, even on Gen 2 where you must leave a "hole" for the configuration sectors.

You must put the device in DFU mode (blinking yellow) before flashing. It's not using DFU mode, but SWD mode is disabled in normal operating mode and safe mode, but is enabled in DFU mode. Put your Particle device in DFU mode (blinking yellow) by holding down MODE and tapping RESET. Continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release MODE. If the device is non-responsive with no LED or a dim D7 blue LED, you may still be able to flash it, even though it's not in DFU mode because if there is no valid bootloader SWD is also enabled.

## Restore binaries

To make it easy to restore a device to a completely known state, we've provided .hex files for several device platforms and Device OS versions.

- Make sure you select the right one! Note that there are two different B Series SoM images, one for the B4xx and different one for the B5xx. Also note that Photon and P1 are different, but Electron and E Series are the same.
- The flash procedure described here does not erase configuration. The following are *not* erased:
  - Emulated EEPROM contents
  - Device Keys
  - Gen 2 Wi-Fi credentials, 6-character identifier used in the default SSID, and antenna configuration
  - Gen 3 Wi-Fi credentials, APN settings, antenna, and SIM selection configuration
  - Anything else in the DCT
  - Gen 3 flash file system contents
- On the Argon and Tracker SoM, the NCP (network coprocessor) image for the ESP32 Wi-Fi module cannot be flashed using SWD/JTAG. See [Argon and Tracker NCP](#argon-and-tracker-ncp) below for more information.
- On Gen 3 devices the Bootloader, Soft Device, UICR bytes, Device OS, and Tinker are restored.
- On the Tracker, Tracker Edge is restored instead of Tinker. However since the 5x2 SWD connector is not populated on the Tracker One, and the pins are not exposed through the M8, it may not be practical to flash a Tracker One by SWD/JTAG.
- On Gen 2 devices the Bootloader, Device OS, and Tinker are restored.

The general procedure is:

- Download the .hex file.
- Use one of the techniques below to flash it to your device.
- You can both upgrade and downgrade using restore images.

{{device-restore mode="download"}}


## Special Notes for Downgrading

{{blurb name="downgrade"}}

## Custom hex files

Using the [Hex File Generator](/tools/device-programming/hex-generator/), you can take one of the base restore images, replace Tinker with your own user firmware, and download the resulting hex file. This makes it easy to flash devices with known firmware quickly and easily.

This is an excellent option if your contract manufacturer will be programming your devices as they will likely be able to use the .hex files and a SWD/JTAG programmer to easily reprogram your devices. This can be done with the standard JTAG programmer software and does not require the Particle toolchains or Particle CLI be installed.


## Particle Debugger with OpenOCD (via Particle Workbench)

Installing [Particle Workbench](/tutorials/developer-tools/workbench/) installs a copy of OpenOCD ("on-chip-Debugger") which works well with the Particle Debugger as well as the ST-LINK/v2 and clones on both Gen 2 and Gen 3. It does not require updating the Particle Debugger firmware.

The only catch is that it's command line, and the commands are very long and somewhat complicated.

- Download a .hex file above.
- Connect the Particle device by USB to your computer, USB power supply, or battery.
- Connect the Particle device to the Debugger with the included 10-pin ribbon cable.
- Connect the Particle Debugger to your computer via another USB port.
- Put the Particle device in DFU mode (blinking yellow).
- Run one of the commands below.

### Find openocd

In your home directory there is a hidden directory **.particle**, which contains **toolchains**, then **openocd**, then a version directory. At the time of writing this was **0.11.2-adhoc6ea4372.0** but this may change in future Workbench updates.

For example:

```sh
$ cd ~/.particle/toolchains/openocd/0.11.2-adhoc6ea4372.0
```

The commands below assume you will be in that directory to execute the command. For example:

```sh
$ bin/openocd -f share/openocd/scripts/interface/cmsis-dap.cfg -f share/openocd/scripts/target/nrf52-particle.cfg -c "adapter_khz 1000" -c "transport select swd" -c "init" -c "flash list" -c "exit"
```

### Gen 3

![Particle Debugger Gen 3](/assets/images/debugger2.jpg)

When positioned in the openocd version directory above, this command will flash a Gen 3 device with a restore image.

```sh
% bin/openocd -f share/openocd/scripts/interface/cmsis-dap.cfg -f share/openocd/scripts/target/nrf52-particle.cfg -c "adapter_khz 1000" -c "transport select swd" -c "init" -c "soft_reset_halt" -c "nrf5 mass_erase" -c "flash write_image /Users/rick/Downloads/boron.hex" -c "reset" -c "exit"
```

Make sure you replace `/Users/rick/Downloads/boron.hex` with the actual path to your file. It must be an absolute path, because of the way the parameter is passed to openocd.

What this does:

| Command | Notes |
| :--- | :--- |
| `bin/openocd` | Runs openocd |
| `-f share/openocd/scripts/interface/cmsis-dap.cfg` | Debugger configuration file for Particle Debugger |
| `-f share/openocd/scripts/target/nrf52-particle.cfg` | Configuration file for MCU (nRF52) |
| `-c "adapter_khz 1000"` | Adapter speed |
| `-c "transport select swd"` | Use SWD mode |
| `-c "init"` | Initialize adapter |
| `-c "soft_reset_halt"` | Reset and halt the MCU |
| `-c "nrf5 mass_erase"` | Erase the entire MCU internal flash! |
| `-c "flash write_image /Users/rick/Downloads/boron.hex"` | Write the hex file to the Particle device |
| `-c "reset"` | Reset the Particle device after flashing |
| `-c "exit"` | Exit openocd |


### Gen 2

![Particle Debugger Gen 2](/assets/images/debugger1.jpg)

With the Debugger positioned as in the picture above (USB connector toward you):

| Left Header | Right Header |
| :---------: | :---: |
| VDD         | SWCLK |
| RTS         | SWDIO |
| RX          | NC    |
| TX          | NC    |
| CTS         | GND   |
| GND         | VUSB  |

Note: Hardware flow control is not supported, so RTS and CTS are essentially NC.

In order to use SWD you need to connect:

| Device Pin | SWD   |
| :--------: | :---: |
| D7         | SWDIO |
| D6         | SWCLK |
| GND        | GND   |

When positioned in the openocd version directory above, this command will flash a Gen 2 device:

```sh
$ bin/openocd -f share/openocd/scripts/interface/cmsis-dap.cfg -f share/openocd/scripts/target/stm32f2x.cfg -c "adapter_khz 1000" -c "transport select swd" -c "init" -c "reset halt" -c "flash protect 0 0 8 off" -c "program /Users/rick/Downloads/photon.hex" -c "flash protect 0 0 0 on" -c "flash protect 0 5 8 on" -c "reset" -c "exit"
```

Make sure you replace `/Users/rick/Downloads/photon.hex` with the actual path to your file. It must be an absolute path, because of the way the parameter is passed to openocd.

What this does:

| Command | Notes |
| :--- | :--- |
| `bin/openocd` | Runs openocd |
| `-f share/openocd/scripts/interface/cmsis-dap.cfg` | Debugger configuration file for Particle Debugger |
| `-f share/openocd/scripts/target/stm32f2x.cfg` | Configuration file for MCU (STM32F2xx) |
| `-c "adapter_khz 1000"` | Adapter speed |
| `-c "transport select swd"` | Use SWD mode |
| `-c "init"` | Initialize adapter |
| `-c "reset halt"` | Reset and halt the MCU |
| `-c "flash protect 0 0 8 off"` | Disable write protection on bootloader and system |
| `-c "program /Users/rick/Downloads/photon.hex"` | Write the hex file to the Particle device |
| `-c "flash protect 0 0 0 on"` | Enable write protection on bootloader | 
| `-c "flash protect 0 5 8 on"` | Enable write protection on the Device OS | 
| `-c "reset"` | Reset the Particle device after flashing |
| `-c "exit"` | Exit openocd |

### Gen 2 Device Security Bit Error

If you get a **Device Security Bit Error** when reprogramming a device, you will need to issue the following command, then flash the hex file as above.

```sh
$ bin/openocd -f share/openocd/scripts/interface/cmsis-dap.cfg -f share/openocd/scripts/target/stm32f2x.cfg -c "adapter_khz 1000" -c "transport select swd" -c "init" -c "reset halt" -c "stm32f2x unlock 0" \ -c "reset halt" -c "exit"
```

What this does:

| Command | Notes |
| :--- | :--- |
| `bin/openocd` | Runs openocd |
| `-f share/openocd/scripts/interface/cmsis-dap.cfg` | Debugger configuration file for Particle Debugger |
| `-f share/openocd/scripts/target/stm32f2x.cfg` | Configuration file for MCU (STM32F2xx) |
| `-c "adapter_khz 1000"` | Adapter speed |
| `-c "transport select swd"` | Use SWD mode |
| `-c "init"` | Initialize adapter |
| `-c "reset halt"` | Reset and halt the MCU |
| `-c "stm32f2x unlock 0"` | Set the STM32 RDP (readout protection level) to 0 |
| `-c "reset halt"` | Reset and halt the MCU |
| `-c "exit"` | Exit openocd |

After setting the RDP level you will have to flash the firmware restore above, as well as reset the device keys. The easiest way to do that is to use [`particle keys doctor`](/reference/developer-tools/cli/#particle-keys-doctor).


## Particle Debugger with drag-and-drop

With the Particle Debugger (CMSIS-DAP), it can expose what looks like a USB thumb drive volume on your computer. This can be used to program Particle Gen 3 devices. It requires no extra software on Windows, Mac, or Linux! 

The caveats are: 

- You must first [upgrade the Particle Debugger firmware](/datasheets/accessories/debugger/#upgrading-the-debugger) .
- You should only use it with Gen 3 devices (Argon, Boron, B Series SoM, Tracker SoM) as drag-and-drop does not operate reliably with Gen 2 devices.
- It takes about 1 minute to restore a device.

All you need to do is:

- Download a .hex restore file or custom firmware binary, above.
- Connect the Particle device by USB to your computer, USB power supply, or battery.
- Connect the Particle device to the Debugger with the included 10-pin ribbon cable.
- Connect the Particle Debugger to your computer via another USB port.
- Put the Particle device in DFU mode (blinking yellow).
- Drag the .hex file on the **DAPLINK** volume created by the Debugger.


## Particle Debugger with Web-browser flash

![Particle Debugger](/assets/images/accessories/debugger.png)

You can try the [experimental web browser based Particle Debugger interface](/tools/device-programming/device-restore-jtag/). This experimental feature has numerous caveats, but it's pretty neat.

- This tool is experimental, and may not work properly. It could leave your device in a bad state (but you can fix it with one of the other techniques if it happens).
- You must [upgrade the firmware on your Particle Debugger](/datasheets/accessories/debugger/#upgrading-the-debugger) as the version from the factory does not have this functionality.
- There is limited browser support on desktop: Chrome, Edge, and Opera. It does not work with Firefox or Safari. 
- It should work on Mac, Windows, Linux, and Chromebook on supported browsers that support WebUSB.
- It should work on some Android phones that support USB OTG when using Chrome or Opera browsers that support WebUSB.
- It does not work on iOS (iPhone or iPad) as the hardware does not support USB OTG.
- It is only recommended for Gen 3 devices (Argon, Boron, B Series SoM, Tracker SoM). It does not work reliably on Gen 2.
- It takes about 3 minutes to restore a device.

<a href="/tools/device-programming/device-restore-jtag/" class="button">Web Browser Device Restore</a>


## Particle Debugger with OpenOCD (standalone)

It's also possible to install [OpenOCD standalone](https://openocd.org/pages/getting-openocd.html), without Particle Workbench. This is useful if you have a contract manufacturer or your own manufacturing station that you don't want to or can't install the entire Particle Workbench tool chain on.

Just follow the instructions above to install OpenOCD for Windows, Mac, or Linux, then follow the command line instructions above as for Workbench.


## Segger J-Link with Nordic tools (nrfjprog)

If you have the [Nordic command line tools](https://www.nordicsemi.com/Software-and-tools/Development-Tools/nRF-Command-Line-Tools) installed you can use nrfjprog with the [Segger J-Link](https://www.segger.com/products/debug-probes/j-link/) to program Gen 3 (nRF52) devices. The Nordic tools are available for Windows, Linux, and Mac.

The Segger J-Link is really fast. It takes about 7 seconds for a full device restore of a Gen 3 device using nrfjprog!

The links below are from Adafruit but you can buy them many other source. One advantage of using Adafruit is that they have a handy adapter board which you will probably need.

| Product | Price |
| :--- | ---: |
| [SEGGER J-Link EDU Mini](https://www.adafruit.com/product/3571) | $19.95 |
| [SEGGER J-Link EDU](https://www.adafruit.com/product/1369) | $69.95 |
| [SEGGER J-Link BASE](https://www.adafruit.com/product/2209) | $399.95 |

For educational use and home use for non-commercial projects you can use the less expensive EDU version. For commercial projects you'll need the BASE version.

If you use either non-mini version you'll also need two adapters. The second cable is the same as the one with the Particle Debugger, so you can use the cable from that if you have one available.

| Product | Price |
| :--- | ---: |
| [JTAG (2x10 2.54mm) to SWD (2x5 1.27mm) Cable Adapter Board](https://www.adafruit.com/product/2094) | $4.95 |
| [10-pin 2x5 Socket-Socket 1.27mm IDC (SWD) Cable - 150mm long](https://www.adafruit.com/product/1675) | $2.95 |

- Download a .hex file above.
- Connect the Particle device by USB to your computer, USB power supply, or battery.
- Connect the Particle device to the Segger J-Link 
- Connect the Segger J-Link to your computer via another USB port.
- Put the Particle device in DFU mode (blinking yellow).
- Run this command:

```
nrfjprog -f NRF52 --program boron.hex --chiperase --reset
```

This technique cannot be used to program Gen 2 devices, but you can use the Segger tools like J-Flash instead of nrfjprog to program Gen 2 devices with the Segger J-Link.


## Segger J-Link with Segger tools

The Segger J-Link is by far the fastest SWD/JTAG programmer available. If you are mass-flashing a large number of devices it will likely be worth the cost, even for the expensive commercial model ("BASE") or higher. The Segger Flasher is a standalone programmer that does not require a computer at all.

You can download the standalone J-Link tools for Windows, Mac, or [here](https://www.segger.com/products/debug-probes/j-link/). A license is required to flash devices using the Segger tools.

The Segger tools can be used to program both Gen 2 and Gen 3 devices. The J-Flash is a graphical user interface application that makes it easy flash.


## ST-LINK/v2 with ST-LINK software for Windows

![ST-LINK/v2](/assets/images/jtag-09stlink.jpg)

The ST-LINK can only be used with Gen 2 devices (Photon, P1, Electron, and E Series) that use a STM32 processor.

On Windows, with the ST-LINK/v2 you can use the ST-Link Windows software which provides an easy-to-use graphical interface. It can only be used with Gen 2 devices.

However because it runs on Windows and accepts an easy to use .hex file, some contract manufacturers that frequently work with STM32-based microcontrollers may like this option.


With the ST-LINK positioned as the picture above (ST logo right-side-up) and the notch at the bottom of the 20-pin header:

<table>
<tr><td style="text-align:center; width:15px;">2</td><td style="text-align:center; width:15px;">4</td><td style="text-align:center; width:15px;">6</td><td style="text-align:center; width:15px;">8</td><td style="text-align:center; width:15px;">10</td><td style="text-align:center; width:15px;">12</td><td style="text-align:center; width:15px;">14</td><td style="text-align:center; width:15px;">16</td><td style="text-align:center; width:15px;">18</td><td style="text-align:center; width:15px;">20</td></tr>
<tr><td style="text-align:center;">1</td><td style="text-align:center;">3</td><td style="text-align:center;">5</td><td style="text-align:center;">7</td><td style="text-align:center;">9</td><td style="text-align:center;">11</td><td style="text-align:center;">13</td><td style="text-align:center;">15</td><td style="text-align:center;">17</td><td style="text-align:center;">19</td></tr>
<tr><td></td><td></td><td></td><td></td><td colspan="2" style="text-align:center;">notch</td><td></td><td></td><td></td><td></td></tr>
</table>


| Pin   | Function | Color | Particle Pin |
| :---: | :---: | :---: | :---: |
|  1    | VCC | Red | 3V3 |
|  4    | GND | Brown | GND |
|  7    | SWDIO | Orange | D7 |
|  9    | SWCLK | Yellow | D6 |
	
Note that you must connect VCC to 3V3 with the real ST-LINK because it uses that pin to sense the MCU voltage.

## ST-LINK clone USB stick with OpenOCD

![ST-LINK Mini](/assets/images/jtag-07mini.jpg)

The ST-LINK can only be used with Gen 2 devices (Photon, P1, Electron, and E Series) that use a STM32 processor.

In order to use SWD you need to connect:

| Device Pin | SWD   |
| :--------: | :---: |
| D7         | SWDIO |
| D6         | SWCLK |
| GND        | GND   |

[Find your openocd binary for Workbench](#find-openocd) or a [standalone install](#particle-debugger-with-openocd-standalone-).

```sh
$ bin/openocd -f share/openocd/scripts/interface/stlink-v2.cfg -f share/openocd/scripts/target/stm32f2x.cfg -c "adapter_khz 1000" -c "transport select swd" -c "init" -c "reset halt" -c "flash protect 0 0 8 off" -c "program /Users/rick/Downloads/photon.hex" -c "flash protect 0 0 0 on" -c "flash protect 0 5 8 on" -c "reset" -c "exit"
```

Make sure you replace `/Users/rick/Downloads/photon.hex` with the actual path to your file. It must be an absolute path, because of the way the parameter is passed to openocd.

What this does:

| Command | Notes |
| :--- | :--- |
| `bin/openocd` | Runs openocd |
| `-f share/openocd/scripts/interface/cmsis-dap.cfg` | Debugger configuration file for Particle Debugger |
| `-f share/openocd/scripts/target/stm32f2x.cfg` | Configuration file for MCU (STM32F2xx) |
| `-c "adapter_khz 1000"` | Adapter speed |
| `-c "transport select swd"` | Use SWD mode |
| `-c "init"` | Initialize adapter |
| `-c "reset halt"` | Reset and halt the MCU |
| `-c "flash protect 0 0 8 off"` | Disable write protection on bootloader and system |
| `-c "program /Users/rick/Downloads/photon.hex"` | Write the hex file to the Particle device |
| `-c "flash protect 0 0 0 on"` | Enable write protection on bootloader | 
| `-c "flash protect 0 5 8 on"` | Enable write protection on the Device OS | 
| `-c "reset"` | Reset the Particle device after flashing |
| `-c "exit"` | Exit openocd |


## Argon and Tracker NCP

The Argon and Tracker NCP (Network Coprocessor) is an ESP32, used for Wi-Fi communication only.

- It is rarely updated
- It can be upgraded OTA
- It can be upgraded using --serial mode with the device in listening mode (blinking dark blue)
- It cannot be upgraded in DFU (blinking yellow) or by SWD/JTAG
- The `particle update` command does not update the NCP

Releases can be found on the [GitHub release site](https://github.com/particle-iot/esp32-ncp-firmware/releases).

- Download the appropriate .bin file
- Connect the device by USB to your computer
- Put the device in listening mode (blinking dark blue) by
  - Holding down the MODE button until the status LED blinks dark blue
  - Or by using `particle usb start-listening`
- Flash the NCP image:

```
particle flash --serial tracker-esp32-ncp@0.0.7.bin
```

### Argon

| Version | Release Date | Notes |
| :--- | :--- | :--- |
| 0.0.5 | 2018-10-22 | Initial Release for Argon |

As there has only been one Argon NCP image you should not need to upgrade it for new devices from the factory.

### Tracker

| Version | Release Date | Notes |
| :--- | :--- | :--- |
| 0.0.6 | 2020-04-29 | Initial Release for Tracker |
| 0.0.7 | 2020-12-22 | Required with Device OS 3.0.0-rc.1 and later, works with earlier Device OS |

The 0.0.7 version is required to is 3.0.0-rc.1 and later. It will be upgraded OTA if required. Prior to Device OS 3.0.0, the NCP was not used on the Tracker, so it is not necessary to downgrade, even when going back to Device OS 2.x or 1.5.4.

