---
title: AN007 Tower Info
layout: commonTwo.hbs
columns: two
---
# AN007 Tower info

{{box op="start" cssClass="boxed warningBox"}}
This page is no longer maintained and is provided for historical reference only
{{box op="end"}}

The Tower Info tool is not being maintained because it is not compatible with the most recently cellular modems.

Tower Info is a tool to show the location of nearby cellular towers on a mobile device, tablet, or laptop. This can be helpful it siting devices in the field, and troubleshooting connectivity issues.

It uses a Boron 2G/3G to scan for towers and communicates with the device using Web BLE (Bluetooth).

It can also be used with a Boron LTE to find information about the LTE Cat M1 tower you're connected to (but not neighboring towers).

You can download the files associated with this app note [as a zip file](/assets/files/app-notes/AN007.zip).



### The tower scanner

The tower scanner can only do scanning for nearby towers on a Boron 2G/3G. Tower scan will only see 2G/3G towers. It should be able to see other GSM carriers, even ones the SIM cannot connect to, but cannot see non-GSM carriers like Verizon and Sprint in the United States. 

The Boron LTE's cellular modem doesn't support scanning for towers, but will report information about the tower you're connected to. Since it only reports the connected tower, it won't report towers from other carriers or 2G/3G towers. The Boron LTE version only works when you have a working cloud connection (breathing cyan).

In the United States, AT&T will often have both 3G and LTE Cat M1 on the same towers, though often on different frequencies. But knowing the location of 3G towers can still be helpful even if you are using LTE Cat M1.

The Electron and E Series don't support BLE to connect to the mobile device or laptop and cannot be used. However, since the cellular modems are often the same, you can use a Boron to search for towers and the towers should be the same for an Electron or E Series device.

You'll need to flash the firmware to your Boron. You can download the [prebuilt binary](/assets/files/app-notes/AN007/firmware/firmware.bin) and flash it by USB.

```
cd firmware
particle update
particle flash --usb firmware.bin
```

You can also download the [zip file](/assets/files/app-notes/AN007.zip). Use the **firmware** directory in it, and compile it using Particle Workbench or the Particle CLI.

Or, if you want to use the Web IDE, you can click on [this link](https://go.particle.io/shared_apps/5d9aff81688fb200221769e7) to clone the project.

A Boron 2G/3G will breathe dark blue when running this firmware. It uses MANUAL mode with cellular on. To put regular firmware on it again, put the device in safe mode (breathing magenta) or flash tinker or your own code over USB.

A Boron LTE runs in normal cloud-connected mode (breathing cyan).

### The tower display

The display program is a web page that uses Web BLE. The selection of browsers that support Web BLE is limited:

- Chrome on Android
- Chrome on Chromebooks
- Chrome on some Macs
- Chrome on some Windows PCs
- The **WebBLE** iOS app for iPhone and iPad.

You may need to enable experimental Chrome features on Linux: `chrome://flags/#enable-experimental-web-platform-features`.

It does not work on other browsers like Firefox, Safari, Edge, and Internet Explorer. 

It might work on some versions of Opera for Mac, Windows, Linux and Android. 

- Load the firmware above on your Boron. It should breathe dark blue (2G/3G) or cyan (LTE).
- Just navigate to [this page](https://rickkas7.github.io/TowerInfo) on your mobile device, tablet, or laptop.
- Click the **Start** button.
- Select the Boron from the dialog.
- Wait for the results to come in! It takes about 2 minutes for 2G/3G.

The **Show My Location** checkbox determines whether it will ask the browser for its current location and plot it on the map.
