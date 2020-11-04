---
title: Tracker Sleep
columns: two
layout: tutorials.hbs
order: 34
description: Particle Tracker Sleep Support
---

# Tracker Sleep

Sleep modes made it possible to extend battery life by putting the device into a low-power state. The 

/reference/device-os/firmware/tracker-som/#ultra_low_power-systemsleepmode-



## Cloud Settings

The following settings can be configured across your whole device fleet, or for individual devices that are marked as development devices.

#### Location Settings

![Location Settings](/assets/images/tracker/settings-1.png)

The Location settings include:

- **Radius Trigger** in meters, floating point. When the current position's distance from the last publish exceeds this distance, the new position is published. 0.0 means do not use a publish radius. The GNSS is not monitored during sleep mode, and the radius will only be checked when otherwise waking from sleep. 
- **Minimum Interval** Wait at least this long in seconds after the last location publish before publishing again. 0 means do not use an interval minimum. The Minimum Interval prevents publishing too frequently. When using sleep modes, this also controls how often to connect to the cellular network. A minimum value of 10 minutes (600 seconds) is recommended. Setting a very short minimum interval with sleep mode can cause your SIM card to be banned for excessive reconnection to the cellular network by your mobile carrier. 
- **Maximum Interval** Publish location at least this often (in seconds) even if there is no movement. 0 means do not use an interval maximum. The maximum is used to make sure publishes occur this often, even if there are no other triggering events. When using sleep modes, the device will wake up at least this often if there are no other wake triggers.

By using custom sleep settings in the Tracker Edge firmware it is possible to customize the sleep mode so you can:



#### Motion Settings

![Motion Settings](/assets/images/tracker/settings-2.png)

The motion settings determine how the IMU (inertial measurement unit, the accelerometer) is used to determine whether to publish a location. The **Interval minimum** also applies to motion events. If IMU events are enabled, these will also wake the device from sleep mode.

- **Movement** publishes if the device moves, and has several sensitivity options:

  - **Disable**: Do not use motion detection (the default).
  - **Low**: Least sensitive, large motion is required to publish.
  - **Medium**
  - **High**: Most sensitive, even a small amount of motion will trigger publish.

- **High G** publishes if there is a High-G acceleration event, such as the device falling. This is 4g for at least 2.5ms.

  - **Disable**: High-G events are not generated (the default).
  - **Enable**: High-G events are generated.

#### Sleep Settings

![Sleep Settings](/assets/images/settings-5.png)

**Sleep Mode** can be set to **enable** or **disable**. 

**Post Publish Execution Time** is the minimum duration in seconds to stay awake after publishing before going to sleep. THe default is 10 seconds. This provides enough time to make sure a software update can be started when waking up from sleep. If a software update starts, the device will automatically stay awake until the update completes.

**Maximum Connecting Time** is the maximum duration, in seconds, to wait for being cellular-connected and to obtain a GNSS lock before publishing. If connecting takes too long, then the device will go back to sleep instead of continuously attempting to connect. The default is 90 seconds.

## Common Scenarios

### Publish at fixed frequency with sleep

Say you want to publish once per hour, regardless of movement, and sleep the rest of the time.

| Parameter | Value | Details
| :--- | :--- | :--- | 
| Radius Trigger | 0.0 | Disabled |
| Minimum Interval | 3600 seconds | 1 hour |
| Maximum Interval | 3600 seconds | 1 hour |
| Movement | Disable | | 
| Sleep Mode | Enable | |

Set the minimum and maximum intervals to 1 hour (3600 seconds) and enable sleep mode.

The minimum interval determines the minimum time between publishes. Setting this to a value of less than 10 minutes can result in excessive battery consumption and can result in your SIM card being banned by your mobile carrier for aggressive reconnection. If you need to wake up and publish very frequently, you will probably not want to use the default sleep mode (ULTRA_LOW_POWER with cellular off).

### Publish on movement

| Parameter | Value | Details
| :--- | :--- | :--- | 
| Radius Trigger | 0.0 | Disabled |
| Minimum Interval | 900 seconds | 15 minutes |
| Maximum Interval | 14400 seconds | 4 hours |
| Movement | Medium | | 
| Sleep Mode | Enable | |

This configuration uses the IMU (inerial measurement unit) to detect motion to wake from sleep. The minimum interval determines the minimum time between publishes. Even if you move more often than that, it will restrict wake and publish. Setting this to a value of less than 10 minutes can result in excessive battery consumption and can result in your SIM card being banned by your mobile carrier for aggressive reconnection.

The maximum interval determines how often to wake up if there is no movement.

### Frequent short wake with less frequent publish