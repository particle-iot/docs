---
title: Muon USB power
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

If you are having difficulties powering your Muon by USB only, check for the following issues:

## USB-A to USB-C not supported

You must use an actual USB-C port or USB-C power adapter to power the Muon by USB.

**A USB-A to USB-C cable will not power the Muon or charge the battery**

The reason is that the Muon uses USB-C PD to change the USB port voltage to 9V and request enough
current to power the Muon. 

When using a USB-2 or USB-3 port with USB-A to USB-C adapter cable, the USB port voltage cannot
be changed and the port will not be able to power the Muon.


## USB-C adapters without PD

Also beware of some wall adapters that have a USB-C cable, but do not support USB-C PD. Some
of these are advertised as Raspberry Pi power adapters, which only support 5V and cannot be used
to power the Muon.

{{!-- 
The adapter on the left is not compatible at it's 5V-only, but the adapter on the right, 
which includes PD, can be used.

![](/assets/images/support/usb-c-pd.png)
--}}

## Some Apple adapters

Some Apple MacBook chargers have been reported to not work properly with the Muon.

![](/assets/images/support/usb-apple-1.png)
![](/assets/images/support/usb-apple-2.png)
