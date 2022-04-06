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

Sometimes you will want to schedule things to occur relative to clock time, not 
