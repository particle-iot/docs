---
title: Identifying Damaged Hardware
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Please see the following 6 sections, written to help diagnose issues with damaged hardware:

* [Initial Troubleshooting](https://support.particle.io/hc/en-us/articles/1260801176309#initial-troubleshooting)
* [Status LED Not Turning On](https://support.particle.io/hc/en-us/articles/1260801176309#status-led-not-turning-on)
* [Device Fails In Circuit](https://support.particle.io/hc/en-us/articles/1260801176309#device-fails-in-circuit)
* [Device Gets Warm (Battery-Powered)](https://support.particle.io/hc/en-us/articles/1260801176309#device-gets-warm-battery-powered)
* [Device Gets Warm (USB/VUSB/VIN-Powered)](https://support.particle.io/hc/en-us/articles/1260801176309#device-gets-warm-usb-vusb-vin-powered)
* [Device Is Back-Powered](https://support.particle.io/hc/en-us/articles/1260801176309#device-is-back-powered)

## Initial Troubleshooting

Before proceeding with this article, please review the following:

* Is your Status LED going through the connection cycle like it normally would? ([link](https://docs.particle.io/tutorials/device-os/led/boron/#standard-modes))
* If so, does it breathe cyan once done and can you ping it from the cloud?

If neither of the above are true, please proceed to the next section. If the above are true, and if you are concerned that the device was damaged due to a brief short or power incident, be sure to check all the pins by setting them to _digitalWrite(Pin, HIGH);_ and checking for 3V3 (3.3 Volts) across each pin with a multimeter.  
  
Do a second check with _digitalWrite(Pin, LOW);_ and check that the voltage reads 0V on each pin.

If you are using SPI, I2C or analog functions, be sure to check that those protocols still function as expected.

In most cases, the device should emerge unscathed from an errant short. 

## Status LED Not Turning On

If you don’t see a Status LED, begin by removing your device from any shield, mount, or feather and disconnect all cables and batteries.

Try the following steps:

* Tap the RESET button. Your device could be sleeping. If it responds, set the device into [Safe Mode](https://docs.particle.io/tutorials/device-os/led/boron/#safe-mode) and see if it connects.
* Ensure that there is power going to the device. If you are using USB, test the cable on another device. Try powering it from a known-good battery.
* If it is battery powered, try powering it via USB.
* If you are sure power is going to the device, check the EN pin - is it pulled to GND? It should read 3V3 for a device to function normally.
* Use a multimeter to verify that the 3V3 pin reads 3V3.

If you have no luck with the above, it is likely that your device has been damaged and will have to be replaced. 

## Device Fails in Circuit

If your device works in isolation, but plugging into the circuit causes issues, check the following items:

* Verify that there are no shorts between the power pins and GND using a multimeter in Continuity mode - see this [Sparkfun guide](https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter/continuity)  
   * The power pins are 3V3, Li+ and VUSB on Gen 3 devices and 3V3, VIN and VBAT on Gen 2 devices.
* Make sure that none of the GPIO pins are shorted directly to ground when being driven HIGH.

## Device Gets Warm (Battery-Powered)

Make sure your battery connector conforms to the Feather specification and that the polarity is not reversed. See the Particle [battery tutorial.](https://docs.particle.io/tutorials/learn-more/batteries/) 

If the polarity is correct, check with a spare battery if possible.

Measure the voltage on the battery. It should measure between 3.4 and 4.2V. 

## Device Gets Warm (USB/VUSB/VIN-Powered)

Check that there are no shorts between VUSB and GND by using a multimeter in Continuity mode - see this [Sparkfun guide.](https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter/continuity) 

## Device is Back-Powered

The NRF52840 is a very low-power microcontroller, capable of functioning with an input voltage as low as 1.8V. If the main power supplies are cut off, it is possible to “back power” the NRF via pull-ups on the I2C or GPIO pins. Always make sure your pull-ups are connected to the 3V3 pin on the device, and not to an external power rail.
