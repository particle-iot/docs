---
title: Thread & interrupt safety
layout: commonTwo.hbs
columns: two
---

# {{title}}

Some care must be taken for thread safety

## Thread safety

### Inherently safe


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

- Mutex (standard mutex)
- Recursive mutex (recommended)

The two behave differently in one important case: If you have already obtained the mutex in a thread, and you then attempt to lock it again from the same thread, a recursive mutex will maintain a reference count so only when the last lock is released will the mutex be freed. 

With a standard mutex, the second lock from the same thread will block forever. This is rarely the desired behavior. A standard mutex is slightly lower in overhead, and if you're only locking around very small sections of code that's a single layer deep, it may be sufficient.



### SPI transactions

### Wire locks

### Serial lock

### lock, unlock, trylock


## Atomic operations

## Queues


