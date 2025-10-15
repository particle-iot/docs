---
title: Scheduling
layout: commonTwo.hbs
columns: two
---

# {{title}}

It's common to have to schedule things at certain times or certain intervals, and there are number of ways to do it. 

## Simple interval scheduling

### Using delay (not recommended)

Say you wanted to publish once a minute. You could do this, but it's not recommended:

```cpp
void loop() {
    // Do not do this
    Particle.publish("testEvent");
    delay(60000);
}
```

This works in this really simple case, but what if you want to have two different delays for two different things?

Also, is certain modes this can affect OTA transfers, and it's generally bad practice to block the loop function from returning, so don't do it.

### Using millis

The recommended way is to calculate intervals is using the [`millis()`](/reference/device-os/api/time/millis/) counter, which increments 1000 times per second (millis = milliseconds).

Here's a full code example that also publishes once a minute, but using millis:

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SerialLogHandler logHandler;

system_tick_t lastPublish = 0;
std::chrono::milliseconds publishInterval = 60s;

void setup() {
}

void loop() {
    if (Particle.connected()) {
        if (millis() - lastPublish >= publishInterval.count()) {
            lastPublish = millis();
            Particle.publish("testEvent");
        }
    }
}
```

The lastPublish variable holds the millis counter of the last publish. It has to be the last, not the next, for reasons explained below.

```cpp
system_tick_t lastPublish = 0;
```

The interval to publish is declared here. This uses [chrono literals](/reference/device-os/api/chrono-literals/chrono-literals/), so you can enter `60s` for 60 seconds instead of 60000 (milliseconds). Or you could use `15min` for every 15 minutes, or `2h` for every 2 hours.

```cpp
std::chrono::milliseconds publishInterval = 60s;
```

This check should always be done before publishing. If you try to publish while not connected, the publish call can block for long periods of time (up to 10 minutes).

```cpp
    if (Particle.connected()) {
```

The important part is this calculation. A few important details:

- The order is always: `millis()` - (last value) >= (interval). 
- `publishInterval.count()` is the value of the interval in milliseconds (regardless of the units you use for your chrono literal).
- Don't forget to reset the last value if the test succeeds!

```
if (millis() - lastPublish >= publishInterval.count()) {
    lastPublish = millis();
```

The reason for the strict ordering and the use of the last value instead of a next value is because the millis counter (`system_tick_t`) is a 32-bit unsigned long value. It starts at 0 after cold boot, reset, OTA, or HIBERNATE sleep and increments 1000 times per second continuously. This means after around 49 days, the value will roll over from 0xffffffff back to 0x00000000. 

As long as you use the construct `millis()` - (last value) >= (interval) the test will work properly when the value rolls over, because of the way unsigned math behaves when the value turns negative. 

If you use a "next" value instead of "last" when the next crosses the rollover, your code will execute continuously until the rollover occurs, which is definitely not what you want.

### System.millis()

There is also the similarly named but different `System.millis()`. This is also a millisecond counter with the same rules, except it returns a `uint64_t`, an unsigned 64-bit integer. This is handy because it will never roll over to 0. However, because of the larger size of the variable and the difficulty in printing it in log messages (see [sprintf](/reference/device-os/api/other-functions/sprintf/#sprintf)) it's often easier to use the 32-bit and use the technique to avoid issues with rollover.

### More than one interval

The biggest advantage is if you want to time two different things. This is basically impossible using `delay()` but is really easy using millis():

```cpp
system_tick_t lastPublish1 = 0;
std::chrono::milliseconds publishInterval1 = 60s;

system_tick_t lastPublish2 = 0;
std::chrono::milliseconds publishInterval2 = 5min;

void setup() {

}

void loop() {
    if (Particle.connected()) {
        if (millis() - lastPublish1 >= publishInterval1.count()) {
            lastPublish1 = millis();
            Particle.publish("testEvent1");
        }
        if (millis() - lastPublish2 >= publishInterval2.count()) {
            lastPublish2 = millis();
            Particle.publish("testEvent2");
        }
    }
}

```

## Software timers

Another option is to use [software timers](/reference/device-os/api/software-timers/software-timers/). At first they might seem like a good option, however:

- You can only have 10 of them.
- They're called sequentially, so if one blocks, the other timers stop running.
- You should not use functions like `Particle.publish` from a timer callback. 
- Do not use `Serial.print` and its variations from a timer callback as writing to `Serial` is not thread safe. Use `Log.info` instead.
- It is best to avoid using long `delay()` in a timer callback as it will delay other timers from running.
- Avoid using functions that interact with the cellular modem like `Cellular.RSSI()` and `Cellular.command()`.
- Software timers run with a smaller stack (1024 bytes vs. 6144 bytes). This can limit the functions you use from the callback function.

Because of all of the limitations, in most cases you're better off using `millis()`.

## Sub-millisecond timing

One limitation of both `millis()` and software timers is that you can't schedule anything to occur more than once a millisecond. This should generally be avoided because that's also the interval of the FreeRTOS thread scheduler, which eliminates threads as a possible solution.

On Gen 2 devices (E-Series, Electron, P1, Photon), it's possible to use the [SparkIntervalTimer](/reference/device-os/libraries/s/SparkIntervalTimer/) 3rd-party library that uses a STM32 hardware timer. This library does not work on Gen 3 devices.

There is no similar library for hardware timers on Gen 3, primarily because there are very few hardware timers, and the interrupt latency on the nRF52 makes it hard to get stable timing of interrupts.

## Real-time clock timing

Sometimes you will want to schedule things to occur relative to clock time. A few important caveats to this:

- On cold boot, most devices will not have valid real-time clock settings until after their first cloud connection.
- On Gen 3 devices (Argon, Boron, B-Series SoM, but not the Tracker), after waking from HIBERNATE sleep mode there will not be valid real time until cloud connected.
- The clock is always at UTC, not local time in your timezone.

Real time is stored in a `time_t`, a signed 32-bit long number of seconds since January 1, 1970 at UTC ("Unix Time"). 

The `time_t` will not roll over until 2038. Well before then, the size of the `time_t` will be expanded from 32-bit to 64-bit, preventing the rollover. This change has already occurred in desktop Linux environments, but has not yet been made in Device OS, due to incompatibilities that can occur with changing the size of the variable.

Due to the lack of rollover, it's easy and quick to test real time like this:

```cpp
if (Time.isValid() && Time.now() >= nextPublishTime)
```

- Be sure to check that you have a valid time. It doesn't always have to be right before Time.now, as the time will never become un-valid except on cold boot, reset, or in some cases, right after wake.
- You can compare against the last time + interval, or next time, since you don't have to worry about rollover.
- [`Time.now()`](/reference/device-os/api/time/now/) is fast as it just reads a variable and can be called frequently. Same for [`Time.isValid()`](/reference/device-os/api/time/now/).

### Clock synchronization

The real-time clock is synchronized on any Particle cloud session negotiation. This includes:

- After cold boot (power removed).
- After wake from HIBERNATE sleep mode.
- In some, but not all, cases after a hardware reset or `System.reset()`.
- Every 3 days for most devices. 
- Exception is Photon and P1, which technically could go forever, but in practice will reconnect their TCP connection periodically.

It is also possible to [force a clock resynchronization](/reference/device-os/api/cloud-functions/particle-synctime/). This does not use data operations, but on cellular devices it does use cellular data, so you should not do it too frequently. You should not do it more than once a day.

### Hardware RTC

It is possible to use an external hardware real-time clock, typically connected by I2C, SPI, or UART serial. In the Tracker SoM and Tracker One, this is an AM1805 RTC and hardware watchdog chip, connected by I2C.

The [Watchdog Timers](/hardware/best-practices/watchdog-timers/) application note shows how you can use this chip in your own designs.

### GNSS (GPS)

GNSS (GPS) provides a precise time reference at UTC. The Particle Tracker does not use this as a time reference, but it is possible to do so. One caveat is that it generally takes longer to acquire a GNSS lock than it does to connect to the Particle cloud, so in the most common use cases, it is neither faster nor significantly more accurate.

### NTP (network time protocol)

The network time protocol is used to set clocks on Internet connected computers. It can be used on Particle devices, however it requires a 3rd-party library, an external time server to use, and is not significantly more accurate than the Particle cloud time, so there is little reason to go through the effort, unless you have devices that are connected to the Internet but not the Particle cloud.

There are several options if your search for "NTP" in [library search](/reference/device-os/libraries/search/).

## Time in local timezone

While the `Time` object in Device OS has useful sounding functions like [`Time.zone()`](/reference/device-os/api/time/zone/) and [`Time.isDST()`](/reference/device-os/api/time/isdst/) these functions are completely manual! You must manually set the zone to the correct zone, and turn DST on and off yourself. This severely limits their usefulness.

There are various techniques for determining your local timezone, such as using Wi-Fi or cellular geolocation and an external time database or service.

In many cases, however, your device will be in a fixed location. This greatly simplifies the handling of time zones and daylight saving. A [3rd-party Local Time library](https://github.com/rickkas7/LocalTimeRK) is available for this use case.

**What it's good for:**

- Managing local time, and daylight saving time, if needed, on devices in a known location
- Mostly intended for devices in your own home
- Managing scheduling of tasks at a specific local time
- Displaying local time

**What it's not intended for:**

- Mobile devices that may change locations
- Customer devices that could be in any timezone

## Features

- Timezone configuration using a POSIX timezone rule string
- Does not require network access to determine timezone and daylight saving transitions
- Good for displaying local time, such as on clock-like devices
- Good for scheduling operations at a specific local time. For example, every day at 8:00 AM regardless of timezone and DST
- Support for locations with DST and without DST (timezone only)
- Should work in the southern hemisphere were DST is opposite on the calendar
- Should work in any country as long as a compatible POSIX timezone configuration string can be generated

## POSIX time strings

These configuration strings are used in some version of UNIX, and are also used by this library. For example:

| Location | Timezone Configuration |
| :--- | :--- |
| New York | "EST5EDT,M3.2.0/02:00:00,M11.1.0/02:00:00" |
| Chicago | "CST6CDT,M3.2.0/2:00:00,M11.1.0/2:00:00" |
| Denver | "MST7MDT,M3.2.0/2:00:00,M11.1.0/2:00:00" |
| Phoenix | "MST7" |
| Los Angeles | "PST8PDT,M3.2.0/2:00:00,M11.1.0/2:00:00" |
| London | "BST0GMT,M3.5.0/1:00:00,M10.5.0/2:00:00" |
| Sydney, Australia | "AEST-10AEDT,M10.1.0/02:00:00,M4.1.0/03:00:00" | 
| Adelaide, Australia | "ACST-9:30ACDT,M10.1.0/02:00:00,M4.1.0/03:00:00" |
| UTC | "UTC" |

## Advanced scheduling

If your situation requires more complex scheduling of activities such as taking sensor readings, publishing, sleep, or generating reports, and you are in a situation where you can use the [Local Time library](https://github.com/rickkas7/LocalTimeRK), you can use its advanced scheduling features. Some examples:

Every 15 minutes (at :00, :15, :30, :45) every hour of the day:

```cpp
schedule.withMinuteOfHour(15);
```

Every 5 minutes from 9:00 AM to 5:00 PM local time every day:

```cpp
schedule.withMinuteOfHour(5, LocalTimeRange(LocalTimeHMS("09:00:00"), LocalTimeHMS("16:59:59")))
```

Every 5 minutes from 9:00 AM to 5:00 PM local time on weekdays (not Saturday or Sunday):

```cpp
schedule.withMinuteOfHour(5, LocalTimeRange(LocalTimeHMS("09:00:00"), LocalTimeHMS("16:59:59"), LocalTimeRestrictedDate(LocalTimeDayOfWeek::MASK_WEEKDAY)));
```

Every 2 hours (00:00, 02:00, 04:00) local time. Note that this is local time, and takes into account daylight saving.

```cpp
schedule.withHourOfDay(2);
```

Every 2 hours, but starting at 01:30 local time (01:30, 03:30, 05:30, ...).

```cpp
schedule.withHourOfDay(2, LocalTimeRange(LocalTimeHMS("01:30:00"), LocalTimeHMS("23:59:59")));
```

Every 15 minutes between 9:00 AM and 5:00 PM local time, otherwise every 2 hours (00:00, 02:00, 04:00 local time)

```cpp
schedule.withMinuteOfHour(15, LocalTimeRange(LocalTimeHMS("09:00:00"), LocalTimeHMS("16:59:59")));
schedule.withHourOfDay(2);
```

First Saturday of the month at midnight local time:

```cpp
schedule.withDayOfWeekOfMonth(LocalTimeDayOfWeek::DAY_SATURDAY, 1);
```

First Monday of the month at 9:00 AM local time:

```cpp
schedule.withDayOfWeekOfMonth(LocalTimeDayOfWeek::DAY_MONDAY, 1, LocalTimeHMS("09:00:00"));
```

Last Friday of the month at 5 PM local time.

```cpp
schedule.withDayOfWeekOfMonth(LocalTimeDayOfWeek::DAY_FRIDAY, -1, LocalTimeHMS("17:00:00"));
```

The last day of the month at 11:59:59 PM local time:

```cpp
schedule.withDayOfMonth(-1, LocalTimeHMS("23:59:59")); 
```

