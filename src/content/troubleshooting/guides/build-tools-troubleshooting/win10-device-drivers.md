---
title: Windows 10 & 11 device drivers
columns: two
layout: commonTwo.hbs
description: Windows 10 & 11 device drivers
---

# {{title}}

This guide has some tips for debugging driver issues with Windows 10 and Windows 11. If you are experiencing these problems you may have a driver issue:

- No serial device identified in the web-based tools despite using a current version of Chrome or Edge.
- `particle serial list` returns no results.
- `dfu-util -l` returns no devices.

Make sure you are using a USB cable with a data connection! Many inexpensive USB charger cables don't have a data connection and can't be used.

This document does not apply to Linux, Mac, and Chromebook, which do not have device drivers. The process is slightly different for Windows 7, as well.

## Getting Started

One common bit of confusion is that there are two different drivers used, one for normal operating mode with serial enabled and listening mode (blinking dark blue) that maps to a COM port, and a separate set of drivers for use in DFU mode (blinking yellow). It is possible for one set of drivers to work and not the other.

## COM Serial Driver

The COM port serial driver is used in normal operating mode (Serial object) and in listening mode (blinking dark blue). To check the serial drivers, open the **Device Manager**. The easiest way in Windows 10 is to type **Device** in the **Type here to search** box in the lower left corner of the screen next to the Windows button.

With a Particle device connected by USB and in normal operating mode, listening mode, or safe mode, it should look like this in **Ports (COM & LPT)**.

![Device Manager](/assets/images/support/win10-device-drivers/device-manager.png)

If you view the USB Serial Device properties:

![Device Properties](/assets/images/support/win10-device-drivers/device-properties.png)

And the **Driver** tab in the properties:

![Driver Details](/assets/images/support/win10-device-drivers/driver-details.png)

Note that it should be using the Microsoft Windows serial driver.

### The Old Serial Driver

It's possible to have the old serial driver installed in Windows 10. If this happens, you should manually remove it.

If the device shows up as Photon, Electron, Argon, Boron, etc. you probably still have the old driver installed.

![Old Driver Device Manager](/assets/images/support/win10-device-drivers/old-driver-list.png)

You can tell for sure from the **Properties** as it will list **Particle** as the **Driver Provider**.

![Old Driver Properties](/assets/images/support/win10-device-drivers/old-driver-properties.png)

Another possibility is that it has a **libwdi** driver, which generally works, except for web-based USB, where it will cause an Access Denied Error. Switching to the Windows driver will still allow the Particle CLI to work, and works properly with WebUSB.

![Old Driver libwdi](/assets/images/support/win10-device-drivers/old-libwdi.png)

### Removing the Old Serial Driver

To remove the old driver, exit the Device Manager and disconnect all Particle devices from USB.

Open an Administrator Command Prompt. In the **Type here to search** box in the lower left corner of the screen next to the Windows button type **Command** (1). Right click on **Command Prompt** (2). Select **Run as administrator** (3).

![Admin Command Prompt](/assets/images/support/win10-device-drivers/admin-command-prompt.png)

In the command prompt, enter the commands:

```
set devmgr_show_nonpresent_devices=1
devmgmt.msc
```

![Show Non-Present](/assets/images/support/win10-device-drivers/show-nonpresent.png)

Then from the Device Manager **View** menu (1), select **Show hidden devices** (2).

![Show hidden devices](/assets/images/support/win10-device-drivers/show-hidden-devices.png)

If your device list only shows **USB Serial Device** in **Ports (COM & LPT)** you skip down the the DFU mode instructions below. The correct serial driver is assigned.

![Hidden devices](/assets/images/support/win10-device-drivers/hidden-devices.png)

However if you have Particle devices in the device list, you'll need to remove those devices.

![Old hidden devices](/assets/images/support/win10-device-drivers/old-hidden.png)

Select a Particle device item (Photon, Electron, Argon, Boron, etc.) and hit the Delete key, or right-click and select **Uninstall**. 

Make sure you select the **Delete driver software for this device** checkbox, otherwise the Particle device driver will come back when you plug the device back in.

The item will disappear. Repeat for all of the Particle device items.

This should clear up any issues caused by having the old serial driver installed.


## DFU Drivers

The DFU drivers are only used when your Particle device is blinking yellow. You typically enter DFU mode by holding down RESET and MODE, releasing RESET and continuing to hold down MODE while it blinks magenta (red and blue at the same time) until it blinks yellow, then release. (The button is labeled SETUP, not MODE, on the Photon.)

In the Device Manager, check and see if there are any devices under **libusbK** or **libusb-win32**. These are the wrong driver and must be changed to use web-based USB (WebUSB) from a browser.

![libusbK devices](/assets/images/support/win10-device-drivers/libusbk.png)

![libusb-win32 devices](/assets/images/support/win10-device-drivers/libusb.png)

Select a Particle device item (Photon, Electron, Argon, Boron, etc.) and hit the Delete key, or right-click and select **Uninstall**. 

Make sure you select the **Delete driver software for this device** checkbox, otherwise the Particle device driver will come back when you plug the device back in.

![Delete Software](/assets/images/support/win10-device-drivers/boron-delete.png)

- [Download the Zadig utility](https://zadig.akeo.ie/) and run it. It requires Administrator privileges.
- Connect the device by USB to your computer
- Make sure the device is in DFU mode (blinking yellow). If not, hold down the MODE button and tap RESET. Continue to hold down MODE (SETUP on the Photon) while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release MODE.
- In the **View** menu, select **List All Devices**
- Select **Boron DFU Mode** (or whatever device you have)
- Select **WinUSB**. 
- Click **Install WCID Driver** (this may take a few minutes)

![Zadig](/assets/images/support/win10-device-drivers/zadig.png)
 