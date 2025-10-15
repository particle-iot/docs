---
title: Tracker sleep
columns: two
layout: commonTwo.hbs
description: Particle Tracker Sleep Support
---

# {{title}}

Sleep modes made it possible to extend battery life by putting the device into a low-power state. 

This is the power consumption for the Tracker One 523 in normal operating mode vs. [ultra-low-power sleep mode](/reference/device-os/api/sleep-sleep/ultra_low_power-systemsleepmode/).

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>startup</sub> | 24.2 | 132 | 689 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 51.2 | 112 | 594 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cloud_idle</sub> |  50.9 | 60.2 | 197 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cloud_pub</sub> | 57.2 | 173 | 702  | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> |  | 172 | 556 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> |  | 164 | 561 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> |  | 228 | 1810 | uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> | | 231 | 1100 | uA |
| ULP mode sleep, IMU wake-up | I<sub>imu_imu</sub> | | 194 | 534 | uA |

The Tracker One with cellular connected but idle uses an average of 60.2 mA. With cellular off in sleep mode, it uses 164 uA, or 0.164 mA, with timed wake. This can considerably increase battery life!

You can also see that the BMI160 IMU (inertial measurement unit) is quite power-efficient, requiring only 30 uA more to wake by time or movement, vs. time alone (194 uA vs. 164 uA).

You can find more information about TrackerSleep API calls in the Tracker Edge firmware in the [TrackerSleep API Reference](/firmware/tracker-edge/tracker-edge-api-reference/#trackersleep).

## Cloud settings

The following settings can be configured across your whole device fleet, or for individual devices that are marked as development devices.

#### Location settings

![Location Settings](/assets/images/tracker/settings-1.png)

The Location settings include:

- **Radius Trigger** in meters, floating point. When the current position's distance from the last publish exceeds this distance, the new position is published. 0.0 means do not use a publish radius. The GNSS is not monitored during sleep mode, and the radius will only be checked when otherwise waking from sleep. The maximum location update frequency still limits how frequently publishes occur even if if the radius trigger is reached.

| US Units | Meters |
| :--- | :--- |
| 1 yard (3 feet) | 0.91 meters (approximately 1 meter) |
| 100 feet | 30.5 meters |
| 100 yards (length of American football field) | 91.4 meters |
| 1/4 mile | 402 meters |
| 1/2 mile | 805 meters |
| 1 mile | 1609 meters |

- **Maximum location update frequency** in seconds. Wait at least this long in seconds after the last location publish before publishing again. 0 means do not limit. The maximum location update frequency prevents publishing too frequently, which can use excessive amounts of data. 

  When using sleep modes, this also controls how often to connect to the cellular network. A maximum location update frequency value of 10 minutes (600 seconds) or larger is recommended. Setting a very short maximum location update frequency with sleep mode can cause your SIM card to be banned for excessive reconnection to the cellular network by your mobile carrier. 

- **Minimum location update frequency** in seconds. Publish location this often (in seconds) even if there is no movement or other wake trigger. 0 means do not use an minimum update frequency; only publish location information when there is another trigger, such as movement. Including a minimum location update frequency of 8 hours (28800 seconds) or 24 hours (86400) can be helpful to make sure the device is still responding and reporting its battery level.

In some cases, you will want to set the maximum and minimum to the same value. This is common if you are not using a trigger like movement and instead always want to publish at a fixed frequency.

| Common Unit | Seconds |
| :--- | ---: |
| 1 minute | 60 |
| 5 minutes | 300 |
| 10 minutes | 600 |
| 15 minutes | 900 |
| 30 minutes | 1800 |
| 1 hour | 3600 |
| 2 hours | 7200 |
| 4 hours | 14400 |
| 8 hours | 28800 |
| 24 hours | 86400 |

- **Minimize Data**. If checked, only only latitude and longitude data is sent on each location publish. If unchecked (the default), additional information such as speed and heading are sent.

The other settings are described in [cloud configuration](/getting-started/console/console/#location-settings).

#### Motion settings

![Motion Settings](/assets/images/tracker/settings-2.png)

The motion settings determine how the IMU (inertial measurement unit, the accelerometer) is used to determine whether to publish a location. The **Maximum location update frequency** also applies to motion events. If IMU events are enabled, these will also wake the device from sleep mode.

- **Movement** publishes if the device moves, and has several sensitivity options:

  - **Disable**: Do not use motion detection (the default).
  - **Low**: Least sensitive, large motion is required to publish.
  - **Medium**
  - **High**: Most sensitive, even a small amount of motion will trigger publish.

- **High G** publishes if there is a High-G acceleration event, such as the device falling. This is 4g for at least 2.5ms.

  - **Disable**: High-G events are not generated (the default).
  - **Enable**: High-G events are generated.

#### Sleep settings

![Sleep Settings](/assets/images/tracker/settings-5.png)

**Sleep Mode** can be set to **enable** or **disable**. 

**Post Publish Execution Time** is the minimum duration in seconds to stay awake after publishing before going to sleep. The default is 10 seconds. This provides enough time to make sure a software update can be started when waking up from sleep. If a software update starts, the device will automatically stay awake until the update completes.

**Maximum Connecting Time** is the maximum duration, in seconds, to wait for being cellular-connected and to obtain a GNSS lock before publishing. If connecting takes too long, then the device will go back to sleep instead of continuously attempting to connect. The default is 90 seconds.

## Common scenarios

### Publish at fixed frequency with sleep

Say you want to publish once per hour, regardless of movement, and sleep the rest of the time.

| Parameter | Value | Details
| :--- | :--- | :--- | 
| Radius Trigger | 0.0 | Disabled |
| Maximum location update frequency | 3600 seconds | 1 hour |
| Minimum location update frequency | 3600 seconds | 1 hour |
| Movement | Disable | | 
| Sleep Mode | Enable | |

Set the maximum and minimum location update frequency intervals to 1 hour (3600 seconds) and enable sleep mode.

The maximum location update frequency determines the minimum time between publishes. Setting this to a value of less than 10 minutes can result in excessive battery consumption and can result in your SIM card being banned by your mobile carrier for aggressive reconnection. If you need to wake up and publish very frequently, you will probably not want to use the default sleep mode (ULTRA_LOW_POWER with cellular off).

### Publish on movement

| Parameter | Value | Details
| :--- | :--- | :--- | 
| Radius Trigger | 0.0 | Disabled |
| Maximum location update frequency | 900 seconds | 15 minutes |
| Minimum location update frequency | 14400 seconds | 4 hours |
| Movement | Medium | | 
| Sleep Mode | Enable | |

This configuration uses the IMU (inertial measurement unit) to detect motion to wake from sleep. The maximum location update frequency determines the minimum time between publishes. Even if you move more often than that, it will restrict wake and publish. Setting this to a value of less than 10 minutes can result in excessive battery consumption and can result in your SIM card being banned by your mobile carrier for aggressive reconnection.

The minimum location update frequency determines how often to wake up if there is no movement.

### Frequent short wake with less frequent publish

This example illustrates using a short wake cycle.

| Parameter | Value | Details
| :--- | :--- | :--- | 
| Radius Trigger | 0.0 | Disabled |
| Maximum location update frequency | 900 seconds | 15 minutes |
| Minimum location update frequency | 900 seconds | 15 minutes |
| Movement | Disabled | | 
| Sleep Mode | Enable | |

Normally the wake time is determined by the minimum and maximum location update frequency in the [cloud configuration](/getting-started/console/console/#location-settings). This is the full wake period, where a connection to the cloud is made and the location published.

It's also possible do a short wake between these times. This example illustrates waking up every 5 minutes to read the temperature and go back to sleep. This short wake does not turn on the cellular modem and takes only a few seconds and uses little battery power.

On the full wake cycle (every 15 minutes), the previously saved temperature values are published along with the location and current temperature data.

```cpp
#include "Particle.h"

#include "tracker_config.h"

#include "tracker.h"

#include <vector>

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context);
void prepareSleepCallback(TrackerSleepContext context);
void wakeCallback(TrackerSleepContext context);

std::vector<float> temps;

void setup()
{
    Tracker::instance().init();

    // Register callbacks
    TrackerLocation::instance().regLocGenCallback(myLocationGenerationCallback);
    TrackerSleep::instance().registerSleepPrepare(prepareSleepCallback);
    TrackerSleep::instance().registerWake(wakeCallback);
}

void loop()
{
     Tracker::instance().loop();
}


void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    // Called when we're generating a location
    if (!temps.empty()) {
        // If we have saved temperatures, add them to the location
        // publish as an array.
        writer.name("temps").beginArray();

        for(auto it = temps.begin(); it != temps.end(); it++) {
            writer.value(*it, 2);
        }

        writer.endArray();

        temps.clear();
    }

}

void prepareSleepCallback(TrackerSleepContext context)
{
    // Called before we go to sleep. Adjust the time so we do a short wake 
    // every 5 minutes to get temperature data. 
    // 5 minutes = 300 seconds = 300000 milliseconds
    Log.info("adjusting sleep time");
    TrackerSleep::instance().wakeAtMilliseconds(System.millis() + 300000);
}


void wakeCallback(TrackerSleepContext context)
{
    // Called when we wake from sleep

    if (!TrackerSleep::instance().isFullWakeCycle()) {
        // On short wake cycles the modem is not on and we can't publish
        // but we can do some quick calculations before going back to sleep
        float tempC = get_temperature();
        Log.info("saving tempC=%f", tempC);
        temps.push_back(tempC);
    }
    else {
        // No need to capture temperature on long wake cycles because it's
        // already in the location publish
    }
}

```

In the console event view you can see these additional temperature values:

![Temperature Array](/assets/images/tracker/temps-array.png)

You can find more information about TrackerSleep calls in the [TrackerSleep API Reference](/firmware/tracker-edge/tracker-edge-api-reference/#trackersleep).

