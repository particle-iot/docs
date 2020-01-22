---
title: JTAG and SWD
layout: support.hbs
columns: two
order: 1005
---

# JTAG and SWD

*JTAG and SWD tips for Particle Devices.*

JTAG ("Joint Test Action Group") is a standard for testing and verifying electronic circuit boards. It can be used with Photon, P1 and Electron devices and this document will describe using it for tasks like programming flash and saving configurations.

JTAG can also be used with a source-level debugger ([gdb](https://www.gnu.org/software/gdb/) and [OpenOCD](http://openocd.org)), but that's a big topic and will get its own tutorial.

There is also a variation known as Serial Wire Debug (SWD), used with ARM devices, of which the Photon/P1/Electron are. This is helpful because it only requires two pins (D6 and D7).

SWD is also used with the Gen 3 devices (Argon and Boron; nRF52840) via the 10-pin debugging connector. 

Occasionally you'll see SWIM was well, but that's generally for STM8 processors. It won't hurt if your programmer supports SWD and SWIM, but a SWIM-only programmer can't program STM32 Particle devices.


## Programmers 

### Particle Debugger 

The Particle Debugger is the easiest way to use SWD on Gen 3 devices (Argon and Boron). It connects easily with the included ribbon cable.

![Debugger](/assets/images/debugger2.jpg)

It can also be used with the Photon, P1, Electron, and E Series using the debugging header. 


### ST-LINK/V2

Another common programmer is the [ST-LINK/V2](http://www.st.com/en/development-tools/st-link-v2.html). It connects to your computer using USB and to the board using JTAG or SWD. 

![ST-LINK/V2](/assets/images/jtag-01stlink.jpg)

It can only be used with Gen 1 (Core) and Gen 2 (Photon, P1, Electron, and E Series) devices, not with Gen 3 devices (Argon, Boron).

### ST-LINK/V2 Mini SWD

There are also "ST-LINK/V2 Mini" devices. These also connect by USB but only use the SWD interface. These inexpensive clone devices are available on Amazon and eBay for US$12 or even less.

![ST-LINK/V2 Mini](/assets/images/jtag-07mini.jpg)

It can only be used with 1st and 2nd generation devices (Photon, P1, Electron, E Series, and Core), not with Gen 3 devices.

### Particle Photon Programmer Shield

Finally, there's the [Particle Programmer Shield](https://github.com/particle-iot/shields/tree/master/photon-shields/programmer-shield), primarily designed for the Photon but can be used with the Electron.

![Particle Programmer Shield](/assets/images/jtag-08shield.jpg)

It can only be used with 1st and 2nd generation devices (Photon, Electron, and Core), not with Gen 3 devices.


## Connecting to the Photon/Electron/P1

Since the JTAG/SWD interface uses the same pins as your project may use, it will probably be necessary to stop your code from running so it won't reinitialize the pins needed for JTAG/SWD. The easiest way is to enable DFU mode (blinking yellow). This works even if you have a P1 without a USB port. 

Even if you don't use the pins, you will likely have problems using SWD in normal operating mode (breathing cyan).

### JTAG

Pins:

- D7: TMS
- D6: TCK
- D5: TDI
- D4: TDO
- D3: TRST
- GND

### SWD

Pins:

- D7: SWDIO
- D6: SWCLK
- GND

### Particle Debugger

With the Particle Debugger positioned like this, USB connector toward you and the headers facing up:

![Debugger](/assets/images/debugger1.jpg)

| Left Header | Right Header |
| --- | ----- |
| VDD | SWCLK |
| RTS | SWDIO |
| RX  | NC    |
| TX  | NC    |  
| CTS | GND   | 
| GND | VUSB  |

In order to use SWD debugging you need to connect:

- D7: SWDIO
- D6: SWCLK
- GND

You can optionally connect the serial TX and RX pins for Serial1 serial debugging.

### Programmer shield

Since you plug the Photon into the programmer shield, there's nothing to connect.

## Using ST/LINK for Windows

If you are want to program a Gen 2 device (Photon, P1, Electron, or E Series) using the ST/LINK under Windows, you can use the ST/LINK software. 

{{collapse op="start" label="Additional Details"}}

By far the easiest way to program the flash is to use the ST/LINK application for Windows. It's a free download from [ST](http://www.st.com/en/development-tools/st-link-v2.html), and works with both the real ST/LINK device and many clone devices. 

For the Mac, Linux, and for the Particle Programmer shield you'll need to use OpenOCD, in the next section. 

The pins on the connector are numbered this way when you have the programmer positioned so the logo is upright and the notch is on the bottom of the 20-pin connector.

|||||||||||
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 |
| 1 | 3 | 5 | 7 | 9  | 11 | 13 | 15 | 17 | 19 |
| | | | | notch | | | | | 
 
 
| Pin | Function | Color | P1 Pin |
| --- | --- | --- | --- |
| 1 | VCC | Red | 3V3 |
| 4 | GND | Brown | GND | 
| 7 | SWDIO | Orange | D7 |
| 9 | SWCLK | Yellow | D6 |

![ST-LINK connections](/assets/images/jtag-09stlink.jpg)

With the ST-LINK, make sure you connect the VCC line to 3V3. It's used to detect the device voltage, and if you don't connect it, it does not work reliably.

In the Settings, you will probably need to select:

- **SWD** (you can use JTAG if you connect the rest of the pins)
- **4.0 MHz** (though slower speeds will work too)
- **Access Port 0**
- **Hot Plug** mode 
- **Software System Reset** reset mode


### Programming the boot loader

One of the common uses for a programmer is fixing the situation where the boot loader gets corrupted. One symptom of a corrupted boot loader is the Photon/Electron only has a dim D7 LED and doesn't respond to any other buttons. And the main LED does not light.

Connect the ST/LINK JTAG/SWD programmer as listed above and run the **STM32 ST-LINK Utility** Windows application.

Select **Connect** from the **Target** menu or use the toolbar icon. It should look something like this:

![ST-LINK Connect](/assets/images/jtag-02connect.png)

The bootloader is different for each type of device and changes infrequently. Download the appropriate one for your device:

- [Photon](/assets/files/bootloader-photon.bin) (0.4.9)
- [P1](/assets/files/bootloader-p1.bin) (0.4.9)
- [Electron](/assets/files/bootloader-electron.bin) (0.4.8)

Use the **Program and Verify** menu item from the **Target** menu. The dialog looks like this:

![ST-LINK Program](/assets/images/jtag-03program.png)

Make sure the start address is `0x08000000`, select the bootloader binary, and select **Start**. That's it.

If your flash is very corrupted, you may also need to flash system and user firmware as well, as described below.


### Programming system and user firmware

You can download Device OS binaries for all released versions from [the GitHub release site](https://github.com/particle-iot/device-os/releases).

For the Photon, flash, for example:

- system-part1-0.4.9-photon.bin to 0x08020000
- system-part2-0.4.9-photon.bin to 0x08060000

For the P1, the addresses are the same:

- system-part1-0.4.9-p1.bin to 0x08020000
- system-part2-0.4.9-p1.bin to 0x08060000

For user firmware on the Photon and P1:

- firmware.bin to 0x080A0000

For the Electron running 0.5.x or earlier, note the part2 address is different than the Photon and P1!

- system-part1-0.5.3-electron.bin to 0x08020000
- system-part2-0.5.3-electron.bin to 0x08040000


For the Electron running 0.6.0 or later, there are three system parts and note that the addresses are not sequential with the part numbers!

- system-part1-0.6.0-electron.bin to 0x08060000
- system-part2-0.6.0-electron.bin to 0x08020000
- system-part3-0.6.0-electron.bin to 0x08040000

For user firmware on the Electron (also different than the Photon/P1):

- firmware.bin to 0x08080000


### Saving and erasing configuration

To save a copy of your configuration using ST-LINK, make sure the three parameters at the top of the window are set:

- Address: 0x08004000
- Size: 0x8000
- Data Width: 8 bits

![ST-LINK Save Config](/assets/images/jtag-04saveconfig.png)

Then use the **Save File As** option from the **File** menu to save the data. Save as type **Hex**.

To restore a configuration, use the **Program and Verify** menu item from the **Target** menu. The dialog looks like this: 

![ST-LINK Restore Config](/assets/images/jtag-05restoreconfig.png)

Make sure the Start Address is 0x08004000 and select the .hex file you saved earlier.

To erase all of your configuration and start from scratch, select **Erase Sectors...** from the **Target** menu.

![ST-LINK Erase Config](/assets/images/jtag-06eraseconfig.png)

Select **Sector 1** (0x08004000) and **Sector 2** (0x080008000).

Note that when you erase the configuration flash your device ID is preserved but your device private key will be lost. This means you won't be able to connect to the cloud until you upload your keys using the CLI command [particle keys doctor](/reference/cli/#particle-keys-doctor).

{{collapse op="end"}} {{!-- Additional Details --}}


## Installing OpenOCD Manually

By far the easiest way to install openocd for Windows, Mac, and Linux is to install [Particle Workbench.](/quickstart/workbench). If you really want to install it manually, expand the section below.

{{collapse op="start" label="Additional Details"}}

If you've already set up [Particle Debugging with Eclipse](/faq/particle-tools/eclipse-debug/) you can use the installation of OpenOCD included with that and skip to the next section.

[OpenOCD](http://openocd.org) is more complicated to install, but works on Mac and Linux as well as Windows, and also is a command-line interface which may be helpful if you're automating the setup of devices on an assembly line.

### Installation - Mac

If you have [Homebrew](http://mxcl.github.io/homebrew/) installed, installing OpenOCD is as easy as:

```
brew install openocd
```

If you don't have Homebrew installed, you can follow the [OpenOCD Mac instructions](http://openocd.org/doc-release/README.OSX). 

If you are using the Particle Programmer shield you will also need to install the board file for it. Download the file [particle-ftdi.cfg](/assets/files/particle-ftdi.cfg) and put it in your install location, typically:

```
/usr/local/share/openocd/scripts/interface/ftdi/
```

There are special concerns with the USB driver that may affect the programmer shield. You should check out the [official documentation](https://github.com/particle-iot/shields/tree/master/photon-shields/programmer-shield) for more information about configuring the USB device.

### Installation - Windows

It's theoretically possible to install OpenOCD under Cygwin under Windows. I haven't successfully gotten this to work when enabling USB (--enable-ftdi); I'll update this document when I get it to work.

## Installing OpenOCD - Using Eclipse OpenOCD Installation

If you've already set up [Particle Debugging with Eclipse](/faq/particle-tools/eclipse-debug/) you can use the installation of OpenOCD included with that. The only difference is the path to the scripts and executable.


### Installing OpenOCD - Using Eclipse OpenOCD Installation - Mac

The installation directory will vary depending on the version you have installed, but usually it's something like:

```
cd "/Applications/GNU ARM Eclipse/OpenOCD/0.10.0-201510281129-dev/scripts"
../bin/openocd --version
```

This is the directory you use in place of /usr/local/share/openocd/scripts in the examples below.
 
### Installing OpenOCD - Using Eclipse OpenOCD Installation - Windows

The installation directory will vary depending on the version you have installed, but usually it's something like:

```
cd "C:\Program Files\GNU ARM Eclipse\OpenOCD\0.10.0-201610281609-dev\scripts"
..\bin\openocd --version
```

This is the directory you use in place of /usr/local/share/openocd/scripts in the examples below.

Windows Vista and later do not include telnet, which you'll probably need for programming the flash. If you are using Cygwin, you can install the **inetutils** package to get telnet.

### Installing OpenOCD - Using Eclipse OpenOCD Installation - Linux

The installation directory will vary depending on the version you have installed, but usually it's something like:

```
cd "/opt/gnuarmeclipse/openocd/0.10.0-201610281609-dev/scripts"
../bin/openocd --version
```

This is the directory you use in place of /usr/local/share/openocd/scripts in the examples below.

{{collapse op="end"}} {{!-- Additional Details --}}


## Using OpenOCD

### General Instructions

This assumes you've installed OpenOCD using [Particle Workbench](/quickstart/workbench). If you've installed it a different way, your path to the installation will be different.

| Installation | Path |
| --- | --- |
| Windows | C:\\Users\\*username*\\.particle\\toolchains\\openocd | 
| Mac | /Users/*username*/.particle/toolchains/openocd |
| Linux | /home/*username*/.particle/toolchains/openocd | 

Open a Command Prompt or Terminal window and **cd** into the openocd directory, then **cd** into the version-specific directory. At the time of writing it was **0.10.0-particle.1** but could change.

Mac or Linux Terminal:

```html
$ cd ~/.particle/toolchains/openocd/
$ ls
0.10.0-particle.1
$ cd 0.10.0-particle.1 
```

Windows Command Prompt:

```html
C:\Users\rick>cd .particle\toolchains\openocd

C:\Users\rick\.particle\toolchains\openocd>dir
 Volume in drive C is Windows 10
 Volume Serial Number is 98E3-995C

 Directory of C:\Users\IEUser\.particle\toolchains\openocd

04/09/2019  09:08 AM    <DIR>          .
04/09/2019  09:08 AM    <DIR>          ..
04/09/2019  09:08 AM    <DIR>          0.10.0-particle.1
               0 File(s)              0 bytes
               3 Dir(s)  22,179,033,088 bytes free
C:\Users\rick\.particle\toolchains\openocd>cd 0.10.0-particle.1
```

### With the Particle Debugger (3rd generation)

Using the Particle debugger and Gen 3 devices (Argon, Boron):

- Connect the Particle Debugger ribbon cable between the debugger and device.
- Connect the device by USB to your computer
- Connect the Particle Debugger by USB to your computer
- Put the device in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release MODE.

Then use the command:

```html
bin/openocd -f interface/cmsis-dap.cfg -f target/nrf52-particle.cfg \
-c "adapter_khz 1000" \
-c "transport select swd" \
-c "init" \
-c "flash list" \
-c "exit"
Open On-Chip Debugger 0.10.0 (2019-01-29-17:30)
Licensed under GNU GPL v2
For bug reports, read
	http://openocd.org/doc/doxygen/bugs.html
Warn : Interface already configured, ignoring
Info : auto-selecting first available session transport "swd". To override use 'transport select <transport>'.
adapter speed: 10000 kHz
cortex_m reset_config sysresetreq
adapter speed: 1000 kHz
Warn : Transport "swd" was already selected
swd
Info : CMSIS-DAP: SWD  Supported
Info : CMSIS-DAP: Interface Initialised (SWD)
Info : CMSIS-DAP: FW Version = 1.10
Info : SWCLK/TCK = 1 SWDIO/TMS = 1 TDI = 0 TDO = 0 nTRST = 0 nRESET = 1
Info : CMSIS-DAP: Interface ready
Info : clock speed 1000 kHz
Info : SWD DPIDR 0x2ba01477
Info : nrf52.cpu: hardware has 6 breakpoints, 4 watchpoints
{name nrf51 base 0 size 0 bus_width 1 chip_width 1} {name nrf51 base 268439552 size 0 bus_width 1 chip_width 1}
```

Note that the command line is very long and uses continuation lines (lines ending with a backslash \\) to make it easier to read. 

| Command | Purpose |
| --- | --- |
| bin/openocd | Executable to run | 
| -f interface/cmsis-dap.cfg | Select the type of debugger | 
| -f target/nrf52-particle.cfg | Select the type of device | 
| -c "adapter_khz 1000" | Configure adapter speed |
| -c "transport select swd" | Select SWD mode |
| -c "init" | Initialize the adapter |
| -c "flash list" | Run a command (in this case, list flash modules) | 
| -c "exit" | Exit openocd when done|

The `flash list` command is done here for illustration purposes and to make sure the debugger can connect to the device. More useful commands are listed below.

### With the Particle Debugger (2nd generation)

Using the Particle debugger and a Photon, P1, or Electron:

- Connect the Particle Debugger to pin D6, D7, and GND as shown above.
- Connect the device by USB to your computer
- Connect the Particle Debugger by USB to your computer
- Put the device in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release MODE.

Then use the command:

```html
bin/openocd -f interface/cmsis-dap.cfg -f target/stm32f2x.cfg \
-c "adapter_khz 1000" \
-c "transport select swd" \
-c "init" \
-c "flash list" \
-c "exit"
```

Note the use of **target/stm32f2x.cfg** for Gen 2 devices.

### With the Particle Programmer Shield

```html
bin/openocd -f interface/particle-ftdi.cfg -f target/stm32f2x.cfg \
-c "init" \
-c "flash list" \
-c "exit"
```

For the Particle Programmer Shield (Gen 2), use **interface/particle-ftdi.cfg**.

### With ST-LINK/V2 Mini

With the ST-LINK/V2 or Mini USB stick:

```html
bin/openocd -f interface/stlink-v2.cfg -f target/stm32f2x.cfg \
-c "init" \
-c "flash list" \
-c "exit"
```

For the ST-LINK/V2 use **interface/stlink-v2**. The ST-LINK/V2 can only be used with Gen 2 devices.


## OpenOCD commands (3rd generation)

These commands are for Gen 3 devices including the Argon and Boron.

### Programming the boot loader (3rd generation)

Download the appropriate bootloader bin file from the [release site](https://github.com/particle-iot/device-os/releases). 

```html
bin/openocd -f interface/cmsis-dap.cfg -f target/nrf52-particle.cfg \
-c  "adapter_khz 1000" \
-c "transport select swd" \
-c "init" \
-c "program /Users/rickk/Downloads/bootloader-0.9.0-argon.bin 0xf4000 verify reset" \
-c "exit"
```

Note the addition of the command:

```html
-c "program /Users/rickk/Downloads/bootloader-0.9.0-argon.bin 0xf4000 verify reset"
```

in place of the `-c "flash list"` in the example above. 

Here's an example of a successful execution of the command:

```html
$ bin/openocd -f interface/cmsis-dap.cfg -f target/nrf52-particle.cfg -c  "adapter_khz 1000" -c "transport select swd" -c "init" -c "program /Users/rickk/Downloads/bootloader-0.9.0-argon.bin 0xf4000 verify reset" -c "exit"
Open On-Chip Debugger 0.10.0 (2019-01-29-17:30)
Licensed under GNU GPL v2
For bug reports, read
	http://openocd.org/doc/doxygen/bugs.html
Warn : Interface already configured, ignoring
Info : auto-selecting first available session transport "swd". To override use 'transport select <transport>'.
adapter speed: 10000 kHz
cortex_m reset_config sysresetreq
adapter speed: 1000 kHz
Warn : Transport "swd" was already selected
swd
Info : CMSIS-DAP: SWD  Supported
Info : CMSIS-DAP: Interface Initialised (SWD)
Info : CMSIS-DAP: FW Version = 1.10
Info : SWCLK/TCK = 1 SWDIO/TMS = 1 TDI = 0 TDO = 0 nTRST = 0 nRESET = 1
Info : CMSIS-DAP: Interface ready
Info : clock speed 1000 kHz
Info : SWD DPIDR 0x2ba01477
Info : nrf52.cpu: hardware has 6 breakpoints, 4 watchpoints
target halted due to debug-request, current mode: Thread 
xPSR: 0x01000000 pc: 0x00000998 msp: 0x20000400
** Programming Started **
auto erase enabled
Warn : Unknown device (HWID 0x00000150)
Warn : using fast async flash loader. This is currently supported
Warn : only with ST-Link and CMSIS-DAP. If you have issues, add
Warn : "set WORKAREASIZE 0" before sourcing nrf51.cfg to disable it
wrote 36864 bytes from file /Users/rickk/Downloads/bootloader-0.9.0-argon.bin in 2.690096s (13.382 KiB/s)
** Programming Finished **
** Verify Started **
verified 33632 bytes in 0.286077s (114.807 KiB/s)
** Verified OK **
** Resetting Target **
```

If you flash the bootloader and get no status LED on, you may need to flash the soft device as well. You will definitely need to do this if:

- You erased the whole flash
- You accidentally flashed the bootloader to 0 instead of 0xf4000

Download [s140\_nrf52\_6.0.0\_softdevice.hex](/assets/files/s140_nrf52_6.0.0_softdevice.hex), then use a -c option like:

```html
-c program /Users/rickk/Downloads/s140_nrf52_6.0.0_softdevice.hex verify reset
```

This is not necessary in most cases.


## OpenOCD commands (2nd generation)

These are only for the Photon, P1, Electron and E Series.

### Programming the boot loader (2nd generation)

Download the appropriate bootloader from the [release site](https://github.com/particle-iot/device-os/releases/tag/v1.0.1).

In place of the `-c flash list` command in the examples above, substitute the following commands:

```html
-c "reset halt" \
-c "flash protect 0 0 0 off" \
-c "program /Users/rickk/Downloads/bootloader-1.0.1-photon.bin
 verify 0x08000000" \
-c "flash protect 0 0 0 on" \
```

You'll need to edit the path to the bootloader-1.0.1-photon.bin file. You need to specify a full path to the directory as well as filename.

If you get the error "Device Security Bit Set" you will also need to reset the RDP level.

```html
-c "init" \
-c "reset halt" \
-c "stm32f2x unlock 0" \
-c "reset halt" \
```

After resetting the RDP level to 0 you'll need to flash the boot loader, system firmware, user firmware (or Tinker) and also do a `particle keys server` and `particle keys doctor`. This only applies to 2nd generation devices (Photon, P1, Electron, and E series).

### Programming system and user firmware (2nd generation)

To program Device OS, use a set of commands like this for the Photon:

```html
-c "reset halt" \
-c "flash protect 0 5 8 off" \
-c "program /Users/rickk/Downloads/system-part1-1.0.1-photon.bin verify 0x08020000" \
-c "program /Users/rickk/Downloads/system-part2-1.0.1-photon.bin verify 0x08060000" \
-c "flash protect 0 5 8 on" \
```

For the P1, the addresses are the same:

```html
-c "reset halt" \
-c "flash protect 0 5 8 off" \
-c "program /Users/rickk/Downloads/system-part1-1.0.1-p1.bin verify 0x08020000" \
-c "program /Users/rickk/Downloads/system-part2-1.0.1-p1.bin verify 0x08060000" \
-c "flash protect 0 5 8 on" \
```

For user firmware on the Photon and P1:

```html
-c "reset halt" \
-c "program /Users/rickk/Downloads/firmware.bin verify 0x80A0000" \
```

For the Electron running 0.6.0 or later, there are three system parts, and note that the address are not sequential with the part numbers:

```html
-c "reset halt" \
-c "flash protect 0 5 8 off" \
-c "program /Users/rickk/Downloads/system-part1-1.0.1-electron.bin verify 0x08060000" \
-c "program /Users/rickk/Downloads/system-part2-1.0.1-electron.bin verify 0x08020000" \
-c "program /Users/rickk/Downloads/system-part3-1.0.1-electron.bin verify 0x08040000" \
-c "flash protect 0 5 8 on" \
```

For user firmware on the Electron:

```html
-c "reset halt" \
-c "program /Users/rickk/Downloads/firmware.bin verify 0x8080000" \
```

### Saving and erasing configuration (2nd generation)

To save a copy of your configuration using OpenOCD:

```html
-c "reset halt" \
-c "dump_image /Users/rickk/Documents/config.bin 0x08004000 0x8000" \
```

To restore the configuration image:

```html
-c "reset halt" \
-c "program /Users/rickk/Documents/config.bin verify 0x08004000" \
```


To erase all of your configuration and start from scratch on Gen 2:

```html
-c "reset halt" \
-c "flash erase_sector 0 1 2 " \
```

That's bank 0, sectors 1 and 2 (starting at 0x08004000 and 0x08008000).

Note that when you erase the configuration flash your device ID is preserved but your device private key will be lost. This means you won't be able to connect to the cloud until you upload your keys using the CLI command [particle keys doctor](/reference/cli/#particle-keys-doctor).
