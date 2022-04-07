---
title: AN041 Scheduling
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

Also, is certain modes this can affect OTA transfers, and it's generally bad practice to block the loop function from returning. So don't do it.

### Using millis

The recommended way is to calculate intervals is using the `millis()` counter, which increments 1000 times per second (millis = milliseconds).

Here's a full code example that also publishes once a minute, but using millis:

```cpp
#include "Particle.h"

SYSTEM_THREAD(ENABLED);
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

The interval to publish is declared here. This uses chrono literals, so you can enter `60s` for 60 seconds instead of 60000 (milliseconds). Or you could use `15min` for every 15 minutes, or `2h` for every 2 hours.

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

## Software Timers

Another option is to use software timers. At first they might seem like a good option, however:

- You can only have 10 of them.
- They're called sequentially, so if one blocks, the other timers stop running.
- You should not use functions like `Particle.publish` from a timer callback. 
- Do not use `Serial.print` and its variations from a timer callback as writing to `Serial` is not thread safe. Use `Log.info` instead.
- It is best to avoid using long `delay()` in a timer callback as it will delay other timers from running.
- Avoid using functions that interact with the cellular modem like `Cellular.RSSI()` and `Cellular.command()`.
- Software timers run with a smaller stack (1024 bytes vs. 6144 bytes). This can limit the functions you use from the callback function.

Because of all of the limitations, in most cases you're better off using loop.

## Sub-millisecond timing

One limitation of both millis() and Software Timers is that you can't schedule anything to occur more than once a millisecond. This should generally be avoided because that's also the interval of the FreeRTOS thread scheduler, which eliminates threads as a possible solution.

On Gen 2 devices (E Series, Electron, P1, Photon), it's possible to use the SparkIntervalTimer 3rd-party library that uses a STM32 hardware timer. This library does not work on Gen 3 devices.

There is no similar library for hardware timers on Gen 3, primarily because there are very few hardware timers, and the interrupt latency on the nRF52 makes it hard to get stable timing of interrupts.

## Real-time clock timing

Sometimes you will want to schedule things to occur relative to clock time. A few important caveats to this:

- On cold boot, most devices will not have valid real-time clock settings until after their first cloud connection.
- On Gen 3 devices (Argon, Boron, B Series SoM, but not the Tracker), after waking from HIBERNATE sleep mode there will not be valid real time until cloud connected.
- The clock is always at UTC, not local time in your timezone.

Real time is stored in a `time_t`, a signed 32-bit long number of seconds since January 1, 1970 at UTC ("Unix Time"). 

The `time_t` will not roll over until 2038. Well before then, the size of the `time_t` will be expanded from 32-bit to 64-bit, preventing the rollover. This change has already occurred in desktop Linux environments, but has not yet been made in Device OS, due to incompatibilities that can occur with changing the size of the variable.

Due to the lack of rollover, it's easy and quick to test real time like this:

```cpp
if (Time.isValid() && Time.now() >= nextPublishTime)
```

- Be sure to check that you have a valid time. It doesn't always have to be right before Time.now, as the time will never become un-valid except on cold boot, reset, or in some cases, right after wake.
- You can compare against the last time + interval, or next time, since you don't have to worry about rollover.
- `Time.now()` is fast as it just reads a variable and can be called frequently. Same for `Time.isValid()`.

### Clock synchronization

The real-time clock is synchronized 

### Hardware RTC

It is possible to use an external hardware real-time clock, typically connected by I2C, SPI, or UART serial. In the Tracker SoM and Tracker One, this is an AM1805 RTC and Watchdog chip, connected by I2C.

The [xxx]() application note shows how you can use this chip in your own designs.

### GNSS (GPS)

GNSS (GPS) provides a precise time reference at UTC. The Particle Tracker does not use this as a time reference, but it is possible to do so. One caveat is that it generally takes longer to acquire a GNSS lock than it does to connect to the Particle cloud, so in the most common use cases, it is neither faster nor significantly more accurate.

### NTP (Network Time Protocol)

The network time protocol is used to set clocks on Internet connected computers. It can be used on Particle devices, however it requires a 3rd-party library, an external time server to use, and is not significantly more accurate than the Particle cloud time, so there is little reason to go through the effort, unless you have devices that are connected to the Internet but not the Particle cloud.

## Time in local timezone

While the `Time` object in Device OS has useful sounding functions like `Time.zone()` and `Time.isDST()` these functions are completely manual! You must manually set the zone to the correct zone, and turn DST on and off yourself. This severely limits their usefulness.

There are various techniques for determining your local timezone, such as using Wi-Fi or cellular geolocation and an external time database or service. 


