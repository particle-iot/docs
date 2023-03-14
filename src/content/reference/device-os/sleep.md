---
title: Sleep
layout: commonTwo.hbs
columns: two
description: Learn more conserving power by using sleep with Particle IoT devices
---

# {{title}}

Sleep modes provide a way to power down all or parts of a Particle device. This is mainly done to conserve power when running off a battery. There are a large number of options because there are many ways you can use sleep. You don't necessarily want to go for the lowest idle power consumption, because that involves tradeoffs in the ways you can wake the device, the time to reconnect, and the amount of power used during reconnection.

This graph (not to scale) shows that not sleeping uses a lot of power, but you can publish data very quickly. The cellular standby options use less power, but are pretty quick. The lowest power, hibernate, takes the longest time to publish an event because it needs to reconnect to cellular and the cloud.

![Sleep Power](/assets/images/tutorials/sleep-power.png)

Another dimension to consider is how long you intend to be asleep for:

- If you are sleeping for less than 10 seconds, shouldn't use sleep at all, and instead just stay awake.
- If you are sleeping less than 10 minutes, you should never use a cellular off mode because frequently reconnecting to cellular may use more power than it saves, and also your SIM may be banned from the cellular network for aggressive reconnection.
- If you are sleeping more than 15 minutes, using cellular off mode uses the least power.
- From 10 to 15 minutes, generally speaking, using cellular standby or cellular off is a toss-up, and will depend on other factors.

![Sleep Duration](/assets/images/tutorials/sleep-duration2.png)

Power is not always your only consideration! For example, if you are building a device that detects that something has moved, it might be important that the notification go out immediately. Waiting 15 to 90 seconds to reconnect to cellular might be too long. In that case, using a cellular standby mode might make sense, especially if you have an external power supply available.

- If you need to send immediately (within a few seconds), stay awake or use cellular standby.
- If you can tolerate greater latency, cellular off is an option, subject to other constraints.
- The amount of latency to connect to cellular is unpredictable, and worst with 2G/3G and poor cellular connectivity.

![Sleep Latency](/assets/images/tutorials/sleep-latency.png)

There are three different sleep modes, STOP, ultra-low power (ULP), and HIBERNATE. While HIBERNATE is the lowest power, it also has the fewest options for how to wake up. You typically choose the method that has the lowest power for the method you require.

For example, if you need to wake after an amount of time on Gen 3 devices, you would probably use ULP. If you need to wake by cellular on Gen 2 devices, you need to use STOP.

![Wake Methods](/assets/images/tutorials/wake-methods.png)


The other thing to consider is what happens after wake. In `HIBERNATE` mode, the devices wakes as if reset. It goes through `setup()` again, and all local and global variables (that are not retained) are reset. In `ULTRA_LOW_POWER` and `STOP` mode, execution continues after the sleep statement with variables preserved.

![Wake Methods](/assets/images/tutorials/sleep-variables.png)


## Selecting sleep options

### Do I need to sleep?

- If you want to sleep less than 10 seconds (give or take), you probably do not want to use a sleep mode at all. The amount of power saved will be small, and it will be hard to keep the wake cycle constant, because the amount of time it takes to go to sleep and wake are somewhat variable and hard to predict.
- If you have ample external power, you may not want to sleep at all. For a product connected to power mains, the difference in consumption is so small that it may not be worthwhile to use a sleep mode. 

### How do I want to wake?

The three sleep modes are:

- `STOP` (most wake options, highest power)
- `ULTRA_LOW_POWER` (ULP)
- `HIBERNATE` (fewest wake options, lowest power)

You'll probably want to choose the lowest power option that has the options you need to wake. These are described in the [sleep modes documentation](/reference/device-os/api/sleep-sleep/stop-systemsleepmode/).

Additionally, in `HIBERNATE` mode, the device wakes as if it has been reset. It goes through `setup()` again and starts with all non-retained variables cleared. In `ULTRA_LOW_POWER` and `STOP` modes, execution continues after the line of code that put the device to sleep, with all variables preserved.

### Do I need network standby?

- If you need to wake from the cloud side, you must use network standby.
- If you are going to be sleeping for less than 10 minutes you must use a network standby mode, or your device could be banned from the cellular network for aggressive reconnection.
- If you need low latency (time from wake to publish), you should use network standby regardless of length of sleep.
- If your devices are 2G/3G and are in areas with poor cellular connectivity you may want to consider using network standby because of the lengthy time to connect, and the amount of power this requires.
- Gen 2 Wi-Fi devices (Photon/P1) do not support Wi-Fi network standby. The Argon (Gen 3 Wi-Fi) does support network standby.

The [network sleep configuration](/reference/device-os/api/sleep-sleep/network-systemsleepconfiguration/) options are how you configure network standby.

### Do I want to stay cloud connected?

- If you want to wake the device for functions, variable requests, subscribed events, or OTA requests, you must stay cloud connected.
- If your sleep duration is short, staying cloud connected will save some data. Disconnecting and reconnecting to the cloud doesn't affect your data operations quota, but it does count toward your cellular data limit and adds a few seconds to the sleep/wake cycle.
- If you do not want to wake the device for cloud requests, you should disconnect from the cloud.

Setting `SystemSleepNetworkFlag::INACTIVE_STANDBY` in [network sleep configuration](/reference/device-os/api/sleep-sleep/network-systemsleepconfiguration/) is how you disable the cloud connection while in sleep.


## Connected state

Using [SYSTEM_MODE(SEMI_AUTOMATIC)](/reference/device-os/api/system-modes/semi-automatic-mode/) provides a lot of flexibility with regards to network connectivity and sleep. For example, it's possible to wake the device, then decide whether to publish data or not. You might want to do this to control the number of data operations you use. Or you might wake, take a sensor reading and save it, and only connect to cellular after a number of samples have been taken, to save power.

The general rules are:

If you are using `HIBERNATE` mode, the device runs `setup()` again, and networking is off at startup in `SEMI_AUTOMATIC` mode. Use `Particle.connect()` to reconnect to the network.

In `ULTRA_LOW_POWER` or `STOP` mode, on wake, execution continues after the sleep statement. The network will be restored to the state it was when you went to sleep.

You normally do not need to disconnect the cloud or turn off cellular before going to sleep. That will be handled by Device OS for you. The exception to this is if you were connected, but when you wake from `ULTRA_LOW_POWER` or `STOP` sleep you want to do so with the modem off. Because the connection state is restored on wake, you must manually disconnect before sleep if you want to do this.

## Other situations

### Network standby and being cloud connected

If you are using network standby with cloud connection enabled and are relying on being able to receive requests while asleep:

- The longest time you can sleep is the keep-alive interval, typically 23 minutes. If you exceed this period without sending any data, the cloud can lose the ability to communicate with your device. Fortunately, you can wake, send data, and go back to sleep very quickly in this mode, within a second or two.
- Make sure you are cloud connected (`Particle.connected()` returns true) before going to sleep. If you are not fully connected, then you won't be able to receive cloud messages while asleep.
- You cannot choose which features (function, variable, subscribe, OTA) will wake the device. If enabled, any of those will work to wake the device.

### Battery usage

To get a general idea of how long a battery will last depending on mode and how of you wake, you can use the [Battery Calculator](https://particle-iot.github.io/BatteryCalculator/).

### Very short sleep cycles

Particle Device OS is not intended to handle very short sleep cycles. Practically speaking, the minimum is about 10 seconds.

One exception is Gen 3 and BLE. The nRF52840 MCU on Gen 3 devices is able to "micro-sleep" and wake very briefly to handle BLE advertising, and allowing incoming BLE connections to wake the device. On these cycles Device OS does not consider the device to really be awake and your code does not run, it only wakes enough to handle the BLE stack and go back to sleep, on the order of milliseconds.


