---
word: JTAG
title: Using SWD/JTAG
layout: reference.hbs
columns: two
redirects: true
order: 50
description: Using SWD/JTAG to program Particle Devices
---

# Using SWD/JTAG

JTAG ("Joint Test Action Group") is a standard for testing and verifying electronic circuit boards. It can be used with Particle devices and this document will describe using it for tasks like programming the device flash.

JTAG can also be used with a source-level debugger, which is a feature of [Particle Workbench](/tutorials/developer-tools/workbench/#debugging-3rd-generation-).

There is also a variation known as Serial Wire Debug (SWD). This is an option for Gen 2 devices (STM32, Photon, P1, Electron, and E Series), and the normal method of connection for Gen 3 devices (Argon, Boron, B Series SoM, Tracker SoM). It uses only two signal wires plus ground. 

All of the JTAG/SWD debuggers can accept an [Intel Hex file](https://en.wikipedia.org/wiki/Intel_HEX) (.hex). One nice thing about .hex files, which are different than the .bin files Particle binaries are distributed in, is that hex files include the address they are to be flashed to. Also, you can combine multiple disjoint binaries into a single hex file, so you only need to flash one file (even on Gen 2 where you must leave a "hole" to for the configuration sectors).

## Restore Binaries

To make it easy to restore a device to a completely known state, we've provided .hex files for several device platforms and Device OS versions.

- Make sure you select the right one! Note that there are two different B Series SoM images, one for the B402 (bsom) and B523 (b5som). Also note that Photon and P1 are different, but Electron and E Series are the same.
- The flash procedure described here does not erase configuration. The following are *not* erased:
  - Emulated EEPROM contents
  - Device Keys
  - Gen 2 Wi-Fi credentials, 6-character identifier used in the default SSID, and antenna configuration
  - Gen 3 Wi-Fi credentials, APN settings, antenna, and SIM selection configuration
  - Anything else in the DCT
  - Gen 3 flash file system contents
- On the Argon and Tracker SoM, the NCP (network coprocessor) image for the ESP32 Wi-Fi module cannot be flashed using SWD/JTAG. It rarely changes, however.
- On Gen 3 devices the Bootloader, Soft Device, UICR bytes, Device OS, and Tinker are restored
- On Gen 2 devices the Bootloader, Device OS, and Tinker are restored.

The general procedure is:

- Download the .hex file.
- Use one of the techniques below to flash it to your device.

{{device-restore mode="download"}}


## Particle Debugger with Web-browser flash

![Particle Debugger](/assets/images/accessories/debugger.png)

You can try the [experimental web browser based Particle debugger interface](/device-restore/). This experimental feature has numerous caveats, but it's pretty neat.

- This tool is experimental, and may not work properly. It could leave your device in a bad state (but you can fix it with one of the other techniques if it happens).
- You must [upgrade the firmware on your Particle Debugger](/datasheets/accessories/debugger/#upgrading-the-debugger) as the version from the factory does not have this functionality.
- There is limited browser support on desktop: Chrome, Edge, and Opera. It does not work with Firefox or Safari. 
- It should work on Mac, Windows, Linux, and Chromebook on supported browsers.
- It should work on some Android phones that support USB OTG when using Chrome or Opera browsers. It may take a few minutes on a phone.
- It does not work on iOS (iPhone or iPad) as the hardware does not support USB OTG.
- It is only recommended for Gen 3 devices (Argon, Boron, B Series SoM, Tracker SoM). It does not work reliably on Gen 2.
- It takes about 3 minutes to restore a device.

<a href="/device-restor/" class="button">Web Browser Device Restore</a>


## Particle Debugger with Drag-and-drop

With the Particle Debugger (CMSIS-DAP), it can expose what looks like a USB thumb drive volume on your computer. This can be used to program Particle Gen 3 devices. It requires no extra software on Windows, Mac, or Linux! 

The caveats are: 

- You must first [upgrade the Particle debugger firmware](/datasheets/accessories/debugger/#upgrading-the-debugger) .
- You should only use it with Gen 3 devices (Argon, Boron, B Series SoM, Tracker SoM) as drag-and-drop does not operate reliably with Gen 2 devices.
- It takes about 1 minute to restore a device.

All you need to do is:

- Download a .hex file above.
- Connect the Particle device by USB to your computer, USB power supply, or battery.
- Connect the Particle device to the debugger with the included 10-pin ribbon cable.
- Connect the Particle debugger to your computer via another USB port.
- Put the Particle device in DFU mode (blinking yellow).
- Drag the .hex file on the **DAPLINK** volume created by the debugger.

## Particle debugger with OpenOCD (via Particle Workbench)

Installing [Particle Workbench](/tutorials/developer-tools/workbench/) installs a copy of OpenOCD ("on-chip-debugger") which works well with the Particle Debugger as well as the ST-LINK/v2 and clones on both Gen 2 and Gen 3. It does not require updating the Particle debugger firmware.

The only catch is that it's command line, and the commands are very long and somewhat complicated.

- Download a .hex file above.
- Connect the Particle device by USB to your computer, USB power supply, or battery.
- Connect the Particle device to the debugger with the included 10-pin ribbon cable.
- Connect the Particle debugger to your computer via another USB port.
- Put the Particle device in DFU mode (blinking yellow).
- Run one of the commands below.

### Find openocd

In your home directory there is a hidden directory **.particle**, which contains **toolchains**, then **openocd**, then a version directory. At the time of writing this was **0.11.2-adhoc6ea4372.0** but this may change in future Workbench updates.

For example:

```sh
$ cd ~.particle/toolchains/openocd/0.11.2-adhoc6ea4372.0
```

The commands below assume you will be in that directory to execute the command. For example:

```sh
$ bin/openocd -f share/openocd/scripts/interface/cmsis-dap.cfg -f share/openocd/scripts/target/nrf52-particle.cfg -c "adapter_khz 1000" -c "transport select swd" -c "init" -c "flash list" -c "exit"
```

### Gen 3

When positioned in the openocd version directory above, this command will flash a Gen 3 device:

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

If you get a Device Security Bit Error when reprogramming a device, you will need to issue the following command, then flash the hex file as above.

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


## Particle debugger with OpenOCD (standalone)




## Segger J-Link with Nordic tools (nrfjprog)

If you have the Nordic SDK installed you can use nrfjprog with the Segger J-Link to program Gen 3 (nRF52840) devices. Reprogramming a device with nrfjprog and a Segger J-Link is insanely fast and the commands are easy to remember.

- Download a .hex file above.
- Connect the Particle device by USB to your computer, USB power supply, or battery.
- Connect the Particle device to the Segger J-Link 
- Connect the Segger J-Link to your computer via another USB port.
- Put the Particle device in DFU mode (blinking yellow).
- Run this command:

```
nrfjprog -f NRF52 --program boron.hex --chiperase --reset
```

## Segger J-Link with Segger tools

The Segger J-Link is very expensive ($400 for the commercial model), however it is by far the fastest SWD/JTAG programmer available. If you are mass-flashing a large number of devices it will likely be worth the cost.



## ST-LINK/v2 with ST-LINK software for Windows

The ST-LINK is only recommended for Gen 2 devices (Photon, P1, Electron, and E Series). 

On Windows, with the ST-LINK/v2 you can use the ST-Link Windows software which provides an easy-to-use graphical interface. It can only be used with Gen 2 devices.

However because it runs on Windows and accepts an easy to use .hex file, some contract manufacturers that frequently work with STM32-based microcontrollers may like this option.


## ST-LINK clone USB stick with OpenOCD

The ST-LINK is only recommended for Gen 2 devices (Photon, P1, Electron, and E Series). 

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
