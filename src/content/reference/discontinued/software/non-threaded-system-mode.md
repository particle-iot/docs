---
title: Non-threaded system mode
columns: two
layout: commonTwo.hbs
description: Non-threaded system mode
---

# {{title}}

System threading, which allows the system components to run concurrently with your user application, has been available since Device OS 0.4.6 and is recommended for all user firmware.

With Device OS {{systemThreadRequired}} and later, system thread is always enabled.

If you are currently using `SYSTEM_THREAD(ENABLED)`, no changes are necessary to your code.

| Device OS | Not specified | `SYSTEM_THREAD(ENABLED)` | `SYSTEM_THREAD(DISABLED)` |
| :--- | :---: | :---: | :---: |
| {{systemThreadRequired}}+ | Enabled | Enabled | Compile error |
| 5.x | Disabled | Enabled | Disabled |
| 4.x | Disabled | Enabled | Disabled |
| 3.x | Disabled | Enabled | Disabled |
| 2.x | Disabled | Enabled | Disabled |
| 1.x | Disabled | Enabled | Disabled |
| 0.4.6+ | Disabled | Enabled | Disabled |
| 0.4.5 | Disabled | Not available | Not available |

If you have an unusual situation where you need to run without the system thread, you should use Device OS 5.x or earlier.

## Detailed differences

If you are currently using `SYSTEM_THREAD(DISABLED)` (or do not specify) and are using `SYSTEM_MODE(AUTOMATIC)` (or do not specify), then minor modifications may be necessary to your code.

The main difference is that user firmware will continue to run in a variety of cases described below, like when not cloud connected, in listening mode, and while downloading updates OTA.

| SYSTEM_THREAD | SYSTEM_MODE | User firmware always runs |
| :---: | :---: | :---: |
| Enabled | Any | Yes |
| Disabled | AUTOMATIC | No |
| Disabled | SEMI_AUTOMATIC | Yes |
| Disabled | MANUAL | Yes |


### While cloud disconnected

A large source of confusion when operating with system thread disabled and using `SYSTEM_MODE(AUTOMATIC)` (which is the default if not specified) is that user firmware stops running when not cloud connected. 

Since your code will now run even when cloud disconnected, you should always check before publishing. For example:

```cpp
if (Particle.connected()) {
    Particle.publish("myEvent");
}
```

While your code will continue to function if you do not add the check, the publish will block until connected, which is probably not what you want, either.


### During setup()

With threading disabled and in AUTOMATIC system mode, setup() does not run until cloud connected. 

With threading always enabled, your code in setup will run before connected to the cloud. If you attempt to 
publish the call will block until cloud connected. This will work, but may be slightly confusing.

It's generally best to wait until loop to publish to avoid blocking setup from completing.


### In listening mode

For Wi-Fi devices, when the device boots without Wi-Fi credentials it will go into listening mode (blinking dark blue) to wait for credentials. All devices can be put into listening mode with a long press to the MODE button.

When operating with system thread disabled and using `SYSTEM_MODE(AUTOMATIC)` (which is the default if not specified) user firmware does not run when in listening mode.


Since your code will now run while in listening mode, this can affect the use of commands sent to the USB serial port. The impact of this is mitigated for several reasons, however:

- Argon, P2, Photon 2, and M-SoM Wi-Fi are typically set up using BLE or USB control request, not USB CDC serial port commands.
- CLI commands like `particle identify` now use USB control requests as well.

If, however, you previously used unthreaded mode and rely on sending USB CDC commands in listening mode, such as `w` to configure Wi-Fi, you must be careful to:

- Avoid writing to USB serial, such as using `SerialLogHandler` when in listening mode.
- Doing other things that read or write `Serial` when in listening mode.

If you do not want your code to run when in listening mode, you can simply check at the top of loop(), like this:

```cpp
void loop() 
{
    // Optional, to make code behave more like non-threaded AUTOMATIC
    if (Network.listening()) {
        return;
    }

    // Put the rest of your code here
}
```

### During firmware updates

When operating with system thread disabled and using `SYSTEM_MODE(AUTOMATIC)` (which is the default if not specified) is that user firmware stops running when firmware is downloading OTA. With threading enabled, the download occurs in the background concurrently with your firmware running.

If you need to prevent updates from occurring in the background, you can use [System.disableUpdates](/reference/device-os/api/ota-updates/ota-updates/). However in most cases it's best to let the download occur and defer the reset to install the update if your application is doing something time-sensitive. See [System.disableReset](/reference/device-os/api/system-calls/disablereset/).


### Concurrent access to resources

There only a few cases where concurrent access to resources between the system thread and user thread can cause issues.

#### SPI

The most common problem is when using SPI from your application while simultaneously using Ethernet, which uses SPI, on the same SPI bus. 

If you consistently use [`SPI.beginTransaction()`](/reference/device-os/api/spi/begintransaction/) and `SPI.endTransaction()` around your SPI operations, you will assure that neither the system nor your code will interrupt the other, and also assure that the correct SPI mode, speed, byte order, etc. are always set.

#### I2C

The same problem can occur with I2C, on devices that have the fuel gauge chip on the primary I2C interface, but this is generally only the B-SoM and M-SoM. Using [`Wire.lock()`](/reference/device-os/api/wire-i2c/lock/) and `Wire.unlock()` can prevent this.

#### USB Serial

It's highly recommended that you use `Log.info` and similar calls instead of `Serial.print`. The reason is that the USB serial port is not protected from simultaneous access and the system thread logs to USB serial if `SerialLogHandler` is used. If you also use `Serial.print` the messages will be intermixed, and in rare cases the device can crash with a SOS+1 hard fault.

See [USB serial logging](/firmware/best-practices/usb-serial/#user-firmware) for more information.

## Things that do not require modification

### Function handlers

Function handlers, calculated variable handlers, and serial event handlers do not require modification. They are dispatched from the user thread in between calls to `loop()` so you do not have to worry about concurrent access.

### Software timers

Software timers have always been dispatched from their own thread, regardless of the state of system thread and are unchanged.

### Function and subscription handlers

It's still OK to register function, calculated variable, and subscription handlers from `setup()` even though you are not cloud connected. They registration will occur after `setup()` exits and you are cloud connected.


