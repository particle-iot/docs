---
title: Installing DFU-util
layout: faq.hbs
columns: two
devices: [ photon,electron,core ]
order: 1000
---

# Installing dfu-util

This guide explains how to install [dfu-util](http://dfu-util.sourceforge.net), the utility for programming the flash memory on Particle devices like the Core, Photon, P1 (with USB) and Electron over USB.

It can be used to program both system firmware and user firmware, and save and restore configurations.

If you are using Windows, you can use the [Windows CLI Installer](https://binaries.particle.io/cli/installer/windows/ParticleCLISetup.exe) to automatically install dfu-util and the CLI rather than using these instructions.

## Activating DFU mode (blinking yellow)

In order to use dfu-util, your Particle device must be in DFU mode (blinking yellow).

{{#if photon}}
Hold down RESET and SETUP, release RESET and continue to hold down SETUP while the main status LED blinks magenta until it blinks yellow, then release.
{{/if}}

{{#if electron}}
Hold down RESET and MODE, release RESET and continue to hold down MODE while the main status LED blinks magenta until it blinks yellow, then release.
{{/if}}

{{#if core}}
Hold down RST and MODE, release RST and continue to hold down MODE while the main status LED blinks magenta until it blinks yellow, then release.
{{/if}}

If your device is in a particularly odd and confused state, sometimes you may need to unplug the power, hold down the SETUP/MODE button, and then plug in USB power. Release SETUP/MODE when blinking yellow.


## Installation - Windows

The easiest way to install dfu-util under Windows is to use the [Particle CLI installer](https://binaries.particle.io/cli/installer/windows/ParticleCLISetup.exe), which installs it automatically.

**Seriously, use the installer if you can.**

The following instructions will be helpful if you want to install it manually, or you are having trouble getting it to work.

You must download Zadig installer from the [Zadig web site](http://zadig.akeo.ie).

Put the Particle device in DFU mode (blinking yellow) as described above. Then run the **Zadig_2.2.exe** file (or whatever version you downloaded). The following window should be displayed.

In the item that's highlighted, select **libusbK** using the tiny arrows. Then click the **Install Driver** button. For more information about libusbK, see [their wiki](https://github.com/libusb/libusb/wiki/Windows#How_to_use_libusb_on_Windows
).

![Zadig Installer](/assets/images/installing-dfu-util-01zadig.png)

If you're installing for an Electron, note that the Zadig installer will still say **Photon DFU Mode**. This is normal. You can tell it's actually an Electron because the highlighted box will be D00A for an Electron.

![Zadig for Electron](/assets/images/installing-dfu-util-24zadig.png)

Some common values are:

- D000: Core
- D006: Photon
- D008: P1
- D00A: Electron

Also, you will have to run Zadig for each type of device. In other words, if you have both a Photon and and Electron, you'll need to run it once in DFU mode for each.

Next is installing the actual dfu-util software. If you are unsure of whether you have 32-bit or 64-bit windows, this Microsoft knowledge base article on [how to tell whether you have a 32-bit or 64-bit Windows installation](https://support.microsoft.com/en-us/kb/827218) may be helpful.

### Windows 32-bit

For 32-bit Windows, you will need to download three files from:

[http://dfu-util.sourceforge.net/releases/dfu-util-0.8-binaries/win32-mingw32/](http://dfu-util.sourceforge.net/releases/dfu-util-0.8-binaries/win32-mingw32/)

![DFU Windows 32-bit download](/assets/images/installing-dfu-util-02download32.png)

You must download:

- dfu-prefix.exe
- dfu-suffix.exe
- dfu-util-static.exe

You do not need to download the other two files.


### Windows 64-bit

Download the [dfu-util-0.9-win64.zip](http://dfu-util.sourceforge.net/releases/dfu-util-0.9-win64.zip) file from the dfu-util release site.

You will only need these files from it:

- dfu-prefix.exe
- dfu-suffix.exe
- dfu-util-static.exe

### Moving the dfu-util files to their own directory

You first need to create a place to save your dfu-util installation. I like to put the files in C:\Program Files\dfu-util. In the Windows File Explorer:

1. Select This PC
2. Select your C: drive, called **Windows 10 (C:)** in this example, but your may be different.
3. Double click Program Files

![Create folder in program files](/assets/images/installing-dfu-util-10programfiles.png)

Right click on the right side of the window, select **New** then **Folder**.

![Create folder in program files](/assets/images/installing-dfu-util-11newfolder.png)

Name the new folder **dfu-util**. Then moved the files you downloaded into this directory.

![Copy DFU files](/assets/images/installing-dfu-util-12copyfiles.png)

Rename the **dfu-util-static.exe** file to just **dfu-util.exe**.

Depending on your settings, the **.exe** part may not display. In Windows 8, for example, it looks like this:

![Copy DFU files](/assets/images/installing-dfu-util-04dfufiles.png)


### Editing the path - Windows 10

Click on the Windows Start menu, then the Settings (gear icon).

![Start Settings](/assets/images/installing-dfu-util-13startsettings.png)

In the Windows 10 Settings window, type **environment** into the box at the top and select **Edit the system environment variables.**

![Settings](/assets/images/installing-dfu-util-14settings.png)

Click the **Environment Variables** button at the bottom of the page.

![Enviroment Variables](/assets/images/installing-dfu-util-15environmentvariables.png)

In the **Environment Variables** window, select **Path** in the bottom list (System variables) and click Edit.

![Edit](/assets/images/installing-dfu-util-16edit.png)

In the **Edit environment variable** window, click **New** then enter a new row in the table, **C:\Program Files\dfu-util**.

![Edit New](/assets/images/installing-dfu-util-17editnew.png)

After editing the system path environment variable you'll need to restart the computer.

To test it, open a command prompt window and enter the command:

```
dfu-util -l
```

The result should look something like this:

![command prompt](/assets/images/installing-dfu-util-21command.png)



### Editing the path - Windows 7 and 8

You need to open the Control Panel.

![Open Control Panel](/assets/images/installing-dfu-util-05controlpanel.png)

And then click on **System and Security**.

![System and Security](/assets/images/installing-dfu-util-06systemandsecurity.png)

Then click **System**.

![System and Secury](/assets/images/installing-dfu-util-18system.png)

Then click on the **Advanced System Settings** link on the left side of the window.

![Advanced Settings](/assets/images/installing-dfu-util-08advanced.png)

Then click on **Environment Variables...**

![Environment](/assets/images/installing-dfu-util-09environment.png)

Click on **Path** in the bottom list (System variables) and click Edit.

Finally, position the cursor at the end of the box and add to the end:

```
;C:\Program Files\dfu-util
```
There must be a semicolon separating the new item from the previous last item, and then the path to the directory we just created.

![Edit variable](/assets/images/installing-dfu-util-19editvar.png)

After editing the system path environment variable you'll need to restart the computer or log out and log back in.

To test it, open a command prompt window and enter the command:

```
dfu-util -l
```

It should look something like this:

![Edit variable](/assets/images/installing-dfu-util-20command.png)

## Windows - Debugging drivers

There are two separate device drivers in Windows, depending on whether the Particle device is in DFU or regular operating mode (or listening mode).

When in DFU mode, the Device Manager looks like this: (Note that it says **Photon DFU Mode** for all device types, including Electrons; this is normal.)

![DFU driver](/assets/images/installing-dfu-util-22dfu.png)

And when in normal operating mode or listening mode (blinking blue), the Device Manager looks like this:

![COM driver](/assets/images/installing-dfu-util-23com.png)


## Installation - Mac

### Mac - Using homebrew

If you have [homebrew](http://brew.sh) installed, it's as simple as running:

```
brew install dfu-util
```

If you have neither homebrew nor MacPorts installed, I recommend installing homebrew as the easiest way to install dfu-util. Just follow the instructions on the [homebrew](http://brew.sh) site to install it first.

One thing about homebrew: it is designed to run without requiring superuser privileges (su). If you get a permission denied error, it's probably because your installation has incorrect permissions. You should stop and fix that first, because all sorts of strange things will continue to happen until you fix it. [This community forum post](https://community.particle.io/t/dfu-util-install-on-mac-os-x/18361) has more details on how to fix permission problems with homebrew.

### Mac - Using MacPorts

If you use [MacPorts](https://www.macports.org) you can install it using:

```
port install libusb dfu-util
```


## Installation - Linux

Most Linux installations have packages for dfu-util already. These are but a few examples:

Ubuntu and Debian:

```
sudo apt-get install dfu-util
```

Fedora:

```
sudo yum install dfu-util
```

Arch:

```
sudo pacman -Sy dfu-util
```

You will also want to add a udev rule. This allows dfu-util to work without requiring sudo, which is convenient, and also necessary when using certain CLI and local build commands.

Download the [50-particle.rules](/assets/files/50-particle.rules) file, then copy it to /etc/udev/rules.d.

```
sudo cp 50-particle.rules /etc/udev/rules.d/
```

You may need to restart after this step.

## Using dfu-util

A good command to test dfu-util is the `-l` (list) command. For a Photon, it returns something like this:

```
$ dfu-util -l
dfu-util 0.9

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2016 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/

Deducing device DFU version from functional descriptor length
Found DFU: [2b04:d006] ver=0200, devnum=18, cfg=1, intf=0, path="253-1.1.6", alt=1, name="@DCT Flash   /0x00000000/01*016Kg", serial="00000000010C"
Found DFU: [2b04:d006] ver=0200, devnum=18, cfg=1, intf=0, path="253-1.1.6", alt=0, name="@Internal Flash   /0x08000000/03*016Ka,01*016Kg,01*064Kg,07*128Kg", serial="00000000010C"
```

And for an Electron:

```
$ dfu-util -l
dfu-util 0.9

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2016 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/

Deducing device DFU version from functional descriptor length
Found DFU: [2b04:d00a] ver=0200, devnum=18, cfg=1, intf=0, path="253-1.1.6", alt=1, name="@DCT Flash   /0x00000000/01*016Kg", serial="00000000010C"
Found DFU: [2b04:d00a] ver=0200, devnum=18, cfg=1, intf=0, path="253-1.1.6", alt=0, name="@Internal Flash   /0x08000000/03*016Ka,01*016Kg,01*064Kg,07*128Kg", serial="00000000010C"
```

They're nearly identical but you can tell by their USB IDs:

- [2b04:d000] Core
- [2b04:d006] Photon
- [2b04:d008] P1
- [2b04:d00a] Electron


### Updating system firmware with dfu-util

Normally it's easier to use the Particle CLI, which calls dfu-util to do the actual work. For example, for the Photon you might use:

```
particle flash --usb system-part1-0.5.3-photon.bin
particle flash --usb system-part2-0.5.3-photon.bin
```

This internally will use dfu-util with options like:

```
dfu-util -d 2b04:d006 -a 0 -s 0x08020000 -D system-part1-0.4.9-photon.bin
dfu-util -d 2b04:d006 -a 0 -s 0x08060000:leave -D system-part2-0.4.9-photon.bin
```

Note the addresses are different for the Electron; you should refer to the [release notes](https://docs.particle.io/reference/firmware/photon/?fw_ver=0.5.3&cli_ver=1.17.0&electron_parts=2#programming-and-debugging-notes) to find the addresses to use for your device and system firmware version.

You will often see this warning in the output from dfu-util. It's normal:

```
dfu-util: Invalid DFU suffix signature
dfu-util: A valid DFU suffix will be required in a future dfu-util release!!!
```


### Saving and restoring device private keys

Saving your device private and public keys is useful if you're going to completely erase the configuration. If you don't do this, new keys can be generated but you'll need to update the cloud using `particle keys doctor`.

Saving keys. Replace d006 with the appropriate value, such as d00a for an Electron:

```
dfu-util -d 2b04:d006 -a 1 -s 34:1600 -U keys.bin
```

Restoring keys:

```
dfu-util -d 2b04:d006 -a 1 -s 34 -D keys.bin
```
