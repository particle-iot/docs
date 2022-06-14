---
title: Real-time clocks
shared: true
columns: two
layout: commonTwo.hbs
description: Learn more about real-time clocks (RTC) on Particle IoT devices
---

# Real-time clocks (RTC)

All Particle devices have the ability to maintain a representation of real-time using a combination of a hardware clock in the MCU and time received from the Particle Cloud. It's generally unnecessary to manually set the time on a device as the time is set during the cloud handshake after reset or most sleep modes.

Particle devices do not have a built-in ability to determine the time zone where the device is located. All times are initially in UTC (Universal Coordinated Time). There is no built-in support for daylight saving time, either, as that can vary by location. UTC is unaffected by daylight saving time. 

It is possible to do local time calculations, however you must maintain the timezone and daylight saving transitions yourself.

The RTC is generally accurate within a few seconds of the actual time.

## Gen 2 vs. Gen 3

Gen 2 devices (E Series, Electron, and Photon) have a STM32F205 MCU and Gen 3 devices (Tracker, B Series SoM, Boron, and Argon) have an nRF52840 MCU. These different processors handle the RTC differently, especially with regards to sleep modes.

The most important distinction is that on Gen 3 devices, the RTC does not run in [`HIBERNATE`](/reference/device-os/api/sleep-sleep/hibernate-systemsleepmode/) sleep mode (formerly `SLEEP_MODE_DEEP`). This has two important effects:

- The RTC will not be valid after waking up from `HIBERNATE` sleep mode until the time is synchronized with the cloud again on Gen 3 devices.
- You cannot wake based on a time duration from `HIBERNATE` on Gen 3 devices.

One important mitigating factor is that Gen 3 [`ULTRA_LOW_POWER`](/reference/device-os/api/sleep-sleep/ultra_low_power-systemsleepmode/) uses only slightly more power than `HIBERNATE` and the RTC continues to operate in `ULTRA_LOW_POWER` mode. This is typically the best solution for Gen 3 devices.

## Gen 2 VBAT

Another important difference is that some Gen 2 devices support the VBAT input. This allows an external 3.6 volt lithium coin cell battery such as a CR1220 or CR2032 to power the RTC for years. It's also possible to use a supercap instead of a coin cell battery.

### Photon VBAT

- Connect VBAT to a lithium coin cell battery to always power the RTC.
- Connect VBAT to GND to not power the RTC at all when the MCU is not powered.

It's somewhat counter-intuitive that you connect VBAT to GND on the Photon, however if you leave it floating it's possible that when you power up a Photon from a completely discharged state, [retained memory](/reference/device-os/api/backup-ram-sram/backup-ram-sram/) will not be initialized. If you connect VBAT to GND the MCU is able to detect a completely cold boot and initialize retained memory.

The same is true for the P0 and P1.

### Electron VBAT

The Electron is not intended to be used with an external coin cell battery. It maintains the VBAT pin because of the pin compatibility 
with the Photon, however the pin works differently.

On the Electron, VBAT is connected to 3V3. Since 3V3 is powered when the device is powered by USB, VIN, or the LiPo battery, it is a good choice for keeping the Electron RTC powered. The Photon does not have built-in support for a LiPo battery, so using an external coin cell makes more sense. The Electron 3V3 output is always on, even when in sleep modes.

The exception is if you power off the Electron using the [BATFET](/firmware/low-power/device-powerdown/). The LiPo battery will be completely disconnected in this mode, and thus the RTC will not be powered. 

The connection between VBAT is a 0-ohm resistor, R7. It's on the bottom of the board, next to the SIM card connector. If you remove this resistor, you can use the Electron like the Photon, with an external lithium coin cell. It's impractical to do this at scale and it is not recommended. 

![](/assets/images/Electron-R7.png)

Since VBAT is connected to 3V3 by default, you must never connect the Electron VBAT to GND in its default configuration!

### E Series VBAT

The E Series module has a VBAT pad, and you can connect it as you wish:

- Connect VBAT to 3V3 to power the RTC from any power source including the LiPo battery (like the Electron).
- Connect VBAT to a lithium coin cell battery to always power the RTC (like the Photon).
- Connect VBAT to GND to not power the RTC at all when the MCU is not powered (like the Photon).


## Particle.connected vs. Time.isValid

The RTC is synchronized with the cloud shortly after cloud handshake (within a second or two). Because they are two separate events, 
[`Particle.connected()`](/reference/device-os/api/cloud-functions/particle-connected/) will become true before [`Time.isValid()`](/reference/device-os/api/time/isvalid/) becomes true.

If you wake from [STOP](/reference/device-os/api/sleep-sleep/stop-systemsleepmode/) or [`ULTRA_LOW_POWER`](/reference/device-os/api/sleep-sleep/ultra_low_power-systemsleepmode/) sleep modes, the RTC will continue to be set from before sleep, and `Time.isValid()` will be true immediately.

If you wake from [`HIBERNATE`](/reference/device-os/api/sleep-sleep/hibernate-systemsleepmode/) sleep mode, the device will go through `setup()` again. On Gen 2 devices, the RTC will already be set at boot. On Gen 3 devices, the RTC will not be valid until after the cloud time synchronization.

Of course this assumes that the time was set before going to sleep. If you go to sleep before the time is synchronized, it obviously will not be set on wake, either. You can still sleep by time duration without the RTC being set, but if you want accurate time, you may want to make sure `Time.isValid()` is true before going to sleep.

The [`Particle.timeSyncedLast()`](/reference/device-os/api/cloud-functions/particle-timesyncedlast/#particle-timesyncedlast-) function can be used to determine when the RTC was last synchronized with the Particle cloud. This is different than `Time.isValid()` in that after a restart with the RTC set, the time will be valid, but will not have been synchronized yet. You typically won't care about this scenario, but if you need to know, use that function.

## Refreshing time synchronization

The time is synchronized at cloud handshake time, which generally occurs often enough that you don't have to worry about it. The exceptions are:

On the Photon and P1, if the device does not use sleep mode and is always running, a cloud handshake will only occur if the device loses cloud or Wi-Fi connectivity. This could cause the RTC to drift over time.

On all other devices, even if the device never sleeps and has perfect connectivity, a cloud handshake will still occur every 3 days, so the clock drift will be minimal.

When waking up from sleep, time is generally synchronized on wake except in one case: If you are using [sleep with network active](/reference/device-os/api/sleep-sleep/network-systemsleepconfiguration/) with STOP mode sleep (or ULTRA_LOW_POWER on Gen 3), and are not using `INACTIVE_STANDBY`, time synchronization will not occur on wake, but the RTC will be valid if it was set prior to sleep. The RTC will still be synchronized every 3 days, however.

To manually request synchronizing time, use [`Particle.syncTime()`](/reference/device-os/api/cloud-functions/particle-synctime/).

## Using an external RTC

Another option is to use an external hardware RTC. Two that are well-tested with Particle Gen 3 devices are:

### AB1805

A good choice is the [AB1850](https://github.com/rickkas7/AB1805_RK). Its major advantage is that it implements both an RTC and a hardware watchdog timer in a single device. Particle application note [AN023](/hardware/best-practices/watchdog-timers/#advanced-watchdog-ab1805) shows how to use this chip. It is also included in the Tracker SoM module.

The application note includes designs for powering it either from the LiPo battery, or from a supercap. It's also possible to use a lithium coin cell battery.

### MCP79410

The [MCP79410](https://github.com/rickkas7/MCP79410RK) is a simple external RTC that works well with Particle devices, in particular Gen 3 devices. Included at this link is a software library that allows the MCU RTC to be synchronized at wake and several other useful features.


## Other time sources

In general, the Particle cloud time is sufficient, but other options include:

### GNSS (GPS) time

For designs that include a GNSS (GPS) module, such as the Tracker, these systems provide accurate time. It is not used by Device OS as a time source because the cloud time is generally sufficient and it often takes longer to get GNSS lock than it does to connect to the cloud.

### Cellular network time

In theory, cellular devices can get their time from the cellular network. However, there is little practical benefit from this, as the time will only be valid after connecting to cellular, and it doesn't take much longer to get the time from the Particle cloud.

### NTP (Network Time Protocol)

It is also possible to use the NTP protocol to an Internet time server. There is [a community library](/reference/device-os/libraries/n/NtpTime/) available. NTP uses the UDP protocol and works over both cellular and Wi-Fi, but there is generally little advantage to using this over Particle cloud time synchronization.

