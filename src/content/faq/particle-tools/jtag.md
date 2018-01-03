---
title: JTAG and SWD
layout: faq.hbs
columns: two
devices: [ photon,electron,core ]
order: 1005
---

# JTAG and SWD

*JTAG and SWD tips for Particle Photon, P1, and Electron.*

JTAG ("Joint Test Action Group") is a standard for testing and verifying electronic circuit boards. It can be used with Photon, P1 and Electron devices and this document will describe using it for tasks like programming flash and saving configurations.

JTAG can also be used with a source-level debugger ([gdb](https://www.gnu.org/software/gdb/) and [OpenOCD](http://openocd.org)), but that's a big topic and will get its own tutorial.

There is also a variation known as Serial Wire Debug (SWD), used with ARM devices, of which the Photon/P1/Electron are. This is helpful because it only requires two pins (D6 and D7).

Occasionally you'll see SWIM was well, but that's generally for STM8 processors. It won't hurt if your programmer supports SWD and SWIM, but a SWIM-only programmer can't program STM32 Particle devices.


## Programmers 

The standard programmer is the [ST-LINK/V2](http://www.st.com/en/development-tools/st-link-v2.html). It connects to your computer using USB and to the board using JTAG or SWD.

![ST-LINK/V2](/assets/images/jtag-01stlink.jpg)

There are also "ST-LINK/V2 Mini" devices. These also connect by USB but only use the SWD interface. These inexpensive clone devices are available on Amazon and eBay for US$12 or even less.

![ST-LINK/V2 Mini](/assets/images/jtag-07mini.jpg)

Finally, there's the [Particle Programmer Shield](https://github.com/particle-iot/shields/tree/master/photon-shields/programmer-shield), primarily designed for the Photon.  

![Particle Programmer Shield](/assets/images/jtag-08shield.jpg)


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

### Programmer shield

Since you plug the Photon into the programmer shield, there's nothing to connect.


## Using ST/LINK for Windows

By far the easiest way to program the flash is to use the ST/LINK application for Windows. It's a free download from [ST](http://www.st.com/en/development-tools/st-link-v2.html), and works with both the real ST/LINK device and many clone devices. 

For the Mac, Linux, and for the Particle Programmer shield you'll need to use OpenOCD, in the next section.


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

You can download system firmware binaries for all released versions from [the GitHub release site](https://github.com/particle-iot/firmware/releases).

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

## Installing OpenOCD - Standalone Installation

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


## Using OpenOCD

### General Instructions

You generally run OpenOCD in one of three ways:

- To execute a preset list of commands
- To start up an interactive session via telnet
- To start up a debugging session via gdb

The first option makes something you can copy and paste into a terminal window, but because there are so many options and the lines are so long it gets a little unwieldy, especially when something goes wrong. The examples here will use the second option.

For example, using the ST-LINK/V2 Mini on the Mac, you might use a command like this to start OpenOCD:

```
$ cd /usr/local/share/openocd/scripts
$ openocd -f interface/stlink-v2.cfg -f target/stm32f2x.cfg -c "telnet_port 4444"
```

If you are using Eclipse OpenOCD under Windows:

```
cd "C:\Program Files\GNU ARM Eclipse\OpenOCD\0.10.0-201610281609-dev\scripts"
..\bin\openocd -f interface/stlink-v2.cfg -f target/stm32f2x.cfg -c "telnet_port 4444"
```

If you are using Eclipse OpenOCD under Windows with Cygwin:

```
cd "/cygdrive/c/Program Files/GNU ARM Eclipse/OpenOCD/0.10.0-201610281609-dev/scripts"
../bin/openocd -f interface/stlink-v2.cfg -f target/stm32f2x.cfg -c "telnet_port 4444"
```

If you are using Eclipse OpenOCD on the Mac:

```
$ cd "/Applications/GNU ARM Eclipse/OpenOCD/0.10.0-201510281129-dev/scripts"
$ ../bin/openocd -f interface/stlink-v2.cfg -f target/stm32f2x.cfg -c "telnet_port 4444"
```

Then in a separate terminal window, you'd issue commands. The command prompt is the greater than symbol ">" so the commands you type are after that.

```
$ telnet localhost 4444
Connected to localhost.
Escape character is '^]'.
Open On-Chip Debugger
> reset halt
target state: halted
target halted due to debug-request, current mode: Thread 
xPSR: 0x01000000 pc: 0x08002f1c msp: 0x20020000
> flash list
{name stm32f2x base 0 size 0 bus_width 0 chip_width 0}
> flash info 0
device id = 0x20036411
flash size = 1024kbytes
 #0 : stm32f2x at 0x08000000, size 0x00100000, buswidth 0, chipwidth 0
	#  0: 0x00000000 (0x4000 16kB) protected
	#  1: 0x00004000 (0x4000 16kB) not protected
	#  2: 0x00008000 (0x4000 16kB) not protected
	#  3: 0x0000c000 (0x4000 16kB) not protected
	#  4: 0x00010000 (0x10000 64kB) not protected
	#  5: 0x00020000 (0x20000 128kB) protected
	#  6: 0x00040000 (0x20000 128kB) protected
	#  7: 0x00060000 (0x20000 128kB) protected
	#  8: 0x00080000 (0x20000 128kB) protected
	#  9: 0x000a0000 (0x20000 128kB) not protected
	# 10: 0x000c0000 (0x20000 128kB) not protected
	# 11: 0x000e0000 (0x20000 128kB) not protected
STM32F2xx - Rev: X
```

### With the Particle Programmer Shield

On the Mac, I use this command to connect OpenOCD to the Particle Programmer Shield.

```
$ cd /usr/local/share/openocd/scripts
$ openocd -f interface/ftdi/particle-ftdi.cfg -f target/stm32f2x.cfg -c "telnet_port 4444"
```

### With ST-LINK/V2 Mini

It's possible to use the ST-LINK/V2 Mini with OpenOCD as well as ST-LINK. You need to use the stlink-v2.cfg interface file.

```
$ cd /usr/local/share/openocd/scripts
$ openocd -f interface/stlink-v2.cfg -f target/stm32f2x.cfg -c "telnet_port 4444"
Open On-Chip Debugger 0.9.0 (2016-10-13-17:05)
Licensed under GNU GPL v2
For bug reports, read
	http://openocd.org/doc/doxygen/bugs.html
Info : auto-selecting first available session transport "hla_swd". To override use 'transport select <transport>'.
adapter speed: 1000 kHz
adapter_nsrst_delay: 100
Info : The selected transport took over low-level target control. The results might differ compared to plain JTAG/SWD
none separate
Info : Unable to match requested speed 1000 kHz, using 950 kHz
Info : Unable to match requested speed 1000 kHz, using 950 kHz
Info : clock speed 950 kHz
Info : STLINK v2 JTAG v23 API v2 SWIM v4 VID 0x0483 PID 0x3748
Info : using stlink api v2
Info : Target voltage: 3.258847
Info : stm32f2x.cpu: hardware has 6 breakpoints, 4 watchpoints
```

## Common OpenOCD telnet commands

### Programming the boot loader

After you're connected OpenOCD to your hardware device and opened the telnet session, you can program the boot loader via telnet as follows:

```
> reset halt
> flash protect 0 0 0 off
> program /Users/rickk/Downloads/bootloader-photon.bin verify 0x08000000
> flash protect 0 0 0 on
```

You'll need to edit the path to the bootloader-photon.bin file. You need to specify a full path to the directory as well as filename.

### Programming system and user firmware

To program system firmware, use a set of commands like this for the Photon:

```
> reset halt
> flash protect 0 5 8 off
> program /Users/rickk/Downloads/system-part1-0.4.9-photon.bin verify 0x08020000
> program /Users/rickk/Downloads/system-part2-0.4.9-photon.bin verify 0x08060000
> flash protect 0 5 8 on
```

For the P1, the addresses are the same:

```
> reset halt
> flash protect 0 5 8 off
> program /Users/rickk/Downloads/system-part1-0.4.9-p1.bin verify 0x08020000
> program /Users/rickk/Downloads/system-part2-0.4.9-p1.bin verify 0x08060000
> flash protect 0 5 8 on
```

For user firmware on the Photon and P1:

```
> reset halt
> program /Users/rickk/Downloads/firmware.bin verify 0x80A0000
```


For the Electron running 0.5.x or earlier:

```
> reset halt
> flash protect 0 5 8 off
> program /Users/rickk/Downloads/system-part1-0.5.3-electron.bin verify 0x08020000
> program /Users/rickk/Downloads/system-part2-0.5.3-electron.bin verify 0x08040000
> flash protect 0 5 8 on
```

For the Electron running 0.6.0 or later, there are three system parts, and note that the address are not sequential with the part numbers:

```
> reset halt
> flash protect 0 5 8 off
> program /Users/rickk/Downloads/system-part1-0.6.0-electron.bin verify 0x08060000
> program /Users/rickk/Downloads/system-part2-0.6.0-electron.bin verify 0x08020000
> program /Users/rickk/Downloads/system-part3-0.6.0-electron.bin verify 0x08040000
> flash protect 0 5 8 on
```

For user firmware on the Electron:

```
> reset halt
> program /Users/rickk/Downloads/firmware.bin verify 0x8080000
```

### Saving and erasing configuration

To save a copy of your configuration using OpenOCD:

```
> reset halt
> dump_image /Users/rickk/Documents/config.bin 0x08004000 0x8000
```

To restore the configuration image:

```
> reset halt
> program /Users/rickk/Documents/config.bin verify 0x08004000
```


To erase all of your configuration and start from scratch:

```
> reset halt
> flash erase_sector 0 1 2
```

That's bank 0, sectors 1 and 2 (starting at 0x08004000 and 0x080008000).

Note that when you erase the configuration flash your device ID is preserved but your device private key will be lost. This means you won't be able to connect to the cloud until you upload your keys using the CLI command [particle keys doctor](/reference/cli/#particle-keys-doctor).
