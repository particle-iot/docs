---
title: Thread & interrupt safety
layout: commonTwo.hbs
columns: two
---

# {{title}}

Some care must be taken for thread safety

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
- Things used from your own worker thread

### Disabling interrupts

In general, you should avoid disabling interrupts. Doing so can affect the performance of the system
and there are better techniques such as using mutex locks and atomic operations.


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

If you are using I2C (Wire), it's highly recommended that you surround your I2C operations with a lock() and
unlock(). This will prevent another thread from accessing the I2C bus in the middle of your transaction.

This is less likely than with SPI, but is still a good practice.

### Serial lock

There is a lock available in the Serial (USB), Serial1 (UART), and additional UART classes. However the SerialLogHandler
does not use the lock, so it's of limited use. If you are only using serial for logging, you should always use
the log handler and never write directly to the serial port.

### lock, unlock, trylock


## Atomic operations

Atomic operations are especially useful for ISRs, where you cannot use a mutex. These are a standard part of C++11.

A common use is when you are counting interrupts, such as from flow sensors, anemometers, etc.. 

Even with integral types like `uint32_t`, incrementing requires a read, increment, write sequence. If you are clearing the value,
you could clear it after read, which causes the clear to be lost. Additional, particularly on Gen 4 (RTL872x), it's possible
to read a half-written value updated in an ISR, so the bytes are invalid.


## os\_queue

The [os\_queue functions](/firmware/software-design/threading-explainer/#queue-functions) implement a fixed-length FIFO queue that is thread safe. 

Additionally, `os_queue_put` can be called from an ISR. This is particularly useful since you can't use a mutex from an ISR and provides 
a safe way to queue data from an ISR and dequeue it from loop (or another thread).

