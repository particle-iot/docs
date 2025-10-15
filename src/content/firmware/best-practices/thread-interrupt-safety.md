---
title: Thread & interrupt safety
layout: commonTwo.hbs
columns: two
---

# {{title}}

## Thread safety

When there are multiple threads of execution, such as from the system thread, user application loop thread, timers, and
worker threads, there is a possibility that code in one thread will modify or use a resource that is being used in another
thread. Preventing this unwanted behavior is **thread safety**.

### Only called from loop

These callback handlers are only called from the main application loop thread, typically between calls to your loop() function.

- [Particle.function](/reference/device-os/api/cloud-functions/particle-function/) handlers
- [Calculated Particle.variable](/reference/device-os/api/cloud-functions/particle-variable-calculated/) handlers
- [Particle.subscribe](/reference/device-os/api/cloud-functions/particle-subscribe/) handlers
- [Serial event](/reference/device-os/api/serial/serialevent/) handlers

There is no need to synchronize operations with your own loop code, but it does still require thread safety when dealing with:

- Things used from the system thread (such as SPI)
- Things used from `Timer` which runs in a separate thread
- Things used from your own worker threads

### Disabling interrupts

In general, you should avoid disabling interrupts. Doing so can affect the performance of the system
and there are better techniques such as using mutex locks and atomic operations.

Never make calls to cloud calls like `Particle.publish` with interrupts disabled. Do not attempt to obtain
a mutex with interrupts disabled, as the system will deadlock if the mutex is obtained by another thread.

## Interrupt safety

In addition to the rules for thread safety, interrupt service routines (ISR) have additional restrictions:

{{!-- BEGIN shared-blurb 7a43657c-a231-439b-b1bd-f1d4a189dc0c --}}
Things you should not do from an ISR:

- Any memory allocation or free: new, delete, malloc, free, strdup, etc.
- Any Particle class function like Particle.publish, Particle.subscribe, etc.
- Most API functions, with the exception of pinSetFast, pinResetFast, and analogRead.
- delay or other functions that block.
- Log.info, Log.error, etc.
- sprintf, Serial.printlnf, etc. with a `%f` (float) value.
- attachInterrupt and detachInterrupt cannot be called within the ISR.
- Mutex locks. This includes SPI transactions and I2C lock and unlock.
- Start an SPI.transaction with DMA.
{{!-- END shared-blurb --}}


## Using mutex locks

Mutex ("mutually exclusive") locks can only be used for thread safety, and cannot be used from an ISR, but are a good, efficient way of protecting from simultaneous access from multiple threads.

There are two kinds of mutex available in Device OS:

- [Mutex](/firmware/software-design/threading-explainer/#mutex) (standard mutex)
- [Recursive mutex](/firmware/software-design/threading-explainer/#recursivemutex) (recommended)

The two behave differently in one important case: If you have already obtained the mutex in a thread, and you then attempt to lock it again from the same thread, a recursive mutex will maintain a reference count so only when the last lock is released will the mutex be freed. 

With a standard mutex, the second lock from the same thread will block forever. This is rarely the desired behavior. A standard mutex is slightly lower in overhead, and if you're only locking around very small sections of code that's a single layer deep, it may be sufficient.

Never attempt to obtain a mutex lock with interrupts disabled or in `SINGLE_THREADED_BLOCK` as the system will deadlock if the mutex is not available.

### SPI transactions

One important place for thread safety is SPI. This is because in certain cases SPI can be accessed from the system thread,
which can interfere with operation in your application loop thread. The solution is that you should always surround 
SPI operations with [beginTransaction](/reference/device-os/api/spi/begintransaction/#begintransaction-) and [endTransaction](/reference/device-os/api/spi/endtransaction/).

In many cases, these will be within a library that you are using, but are still required.

The `SPISettings` used with beginTransaction assures that the SPI settings (mode, byte order, etc.) are set properly
when multiple devices are on the bus. Additionally, there is a mutex lock in beginTransaction and unlock in endTransaction.

This must be outside functions like transfer() because in many cases you will do a SPI write immediately followed by a
read, and the mutex prevents another thread from accessing the SPI bus in between your calls.


### Wire locks

If you are using I2C (Wire), it's highly recommended that you surround your I2C operations with a [lock()](/reference/device-os/api/wire-i2c/lock/) and
unlock(). This will prevent another thread from accessing the I2C bus in the middle of your transaction.

This is less likely than with SPI, but is still a good practice.

### Serial lock

There is a [lock()](/reference/device-os/api/serial/lock/) available in the Serial (USB), Serial1 (UART), and additional UART classes. However the SerialLogHandler
does not use the lock, so it's of limited use. If you are only using serial for logging, you should always use
the [log handler](/reference/device-os/api/logging/) and never write directly to the serial port.

### lock, unlock, trylock, WITH_LOCK

These utility methods can simplify using locks. See [/reference/device-os/api/threading/locking-threading/] in the 
Device OS API reference for more information.


## Atomic operations

Atomic operations are especially useful for ISRs, where you cannot use a mutex. These are a standard part of C++11.

A common use is when you are counting interrupts, such as from flow sensors, anemometers, etc.. 

Even with integral types like `uint32_t`, incrementing requires a read, increment, write sequence. If you are clearing the value,
you could clear it after read, which causes the clear to be lost. Additional, particularly on Gen 4 (RTL872x), it's possible
to read a half-written value updated in an ISR, so the bytes are invalid.

There are methods such as:

- `store` safely set a value
- `fetch_add` add to a value
- `fetch_subtract` to subtract from a value
- `fetch_and` can be used to get the current value and set it to 0

In the example below, `std::memory_order_relaxed` is used. As Particle devices have only a single processor this is
generally sufficient but there are many other options available.

You can find more information at [std::atomic](https://en.cppreference.com/w/cpp/atomic/atomic) at cppreference.com.

In some Arduino example code, you may see `volatile` used. This prevents caching of values in registers by the C/C++
compiler, but does not prevent issues with concurrent access from an ISR.


### Atomic example

```cpp
#include "Particle.h"

#include <atomic>

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

SerialLogHandler logHandler;

void isrD2();
void isrD3();

std::atomic<uint32_t> counterD2;
std::atomic<uint32_t> counterD3;

void setup() {
    Particle.connect();

    counterD2.store(0, std::memory_order_relaxed);
    pinMode(D2, INPUT_PULLUP);
    attachInterrupt(D2, isrD2, FALLING);

    counterD3.store(0, std::memory_order_relaxed);
    pinMode(D3, INPUT_PULLUP);
    attachInterrupt(D3, isrD3, FALLING);
}

void loop() {
    static unsigned long lastCheck = 0;
    if (millis() - lastCheck >= 1000) {
        lastCheck = millis();

        uint32_t tempD2 = counterD2.fetch_and(0, std::memory_order_relaxed);
        uint32_t tempD3 = counterD3.fetch_and(0, std::memory_order_relaxed);

        Log.info("D2=%lu D3=%lu", tempD2, tempD3);
    }
}

void isrD2() {
    // This increments the value atomically. Even if the ISR triggers
    // while we're resetting the value from loop, the count will
    // not be lost.
    counterD2.fetch_add(1, std::memory_order_relaxed);
}

void isrD3() {
    counterD3.fetch_add(1, std::memory_order_relaxed);
}
```

And this is the USB serial output:

```
0000027084 [app] INFO: D2=1000 D3=1000
0000028084 [app] INFO: D2=1000 D3=1000
0000029084 [app] INFO: D2=1000 D3=1000
0000030084 [app] INFO: D2=1000 D3=1000
0000031084 [app] INFO: D2=1000 D3=1000
0000032084 [app] INFO: D2=1000 D3=1000
0000033084 [app] INFO: D2=1000 D3=1000
0000034084 [app] INFO: D2=1000 D3=1000
0000035084 [app] INFO: D2=1000 D3=1000
0000036084 [app] INFO: D2=1000 D3=1000
0000037084 [app] INFO: D2=1000 D3=1000
0000038084 [app] INFO: D2=1000 D3=1000
0000039084 [app] INFO: D2=999 D3=999
0000040084 [app] INFO: D2=1000 D3=1000
0000041084 [app] INFO: D2=1000 D3=1000
0000042084 [app] INFO: D2=1000 D3=1000
0000043084 [app] INFO: D2=1000 D3=1000
0000044084 [app] INFO: D2=1000 D3=1000
0000045084 [app] INFO: D2=1000 D3=1000
0000046084 [app] INFO: D2=1000 D3=1000
0000047084 [app] INFO: D2=1000 D3=1000
0000048084 [app] INFO: D2=1000 D3=1000
0000049084 [app] INFO: D2=1000 D3=1000
0000050084 [app] INFO: D2=1000 D3=1000
0000051084 [app] INFO: D2=1000 D3=1000
0000052084 [app] INFO: D2=999 D3=999
0000053084 [app] INFO: D2=1000 D3=1000
0000054084 [app] INFO: D2=1001 D3=1001
0000055084 [app] INFO: D2=999 D3=999
0000056084 [app] INFO: D2=1000 D3=1000
0000057084 [app] INFO: D2=1000 D3=1000
0000058084 [app] INFO: D2=1000 D3=1000
0000059084 [app] INFO: D2=1000 D3=1000
0000060084 [app] INFO: D2=1000 D3=1000
0000061084 [app] INFO: D2=1000 D3=1000
```

It’s not exactly 1000 on all logs because the logging is done out of the loop thread with the cloud connection active, so it can be off by a little bit, but the counts seem to be equal.

It’s actually possible for the counts to differ if something else disables interrupts, or there’s a thread swap in between the two fetch_and calls.

That’s also a good way to structure counters in an ISR that are interrupt safe without having to disable interrupts.

## os\_queue

The [os\_queue functions](/firmware/software-design/threading-explainer/#queue-functions) implement a fixed-length FIFO queue that is thread safe. 

Additionally, `os_queue_put` can be called from an ISR. This is particularly useful since you can't use a mutex from an ISR and provides 
a safe way to queue data from an ISR and dequeue it from loop (or another thread).

