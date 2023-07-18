---
title: Store and forward
columns: two
layout: commonTwo.hbs
description: Store and forward
---

# {{title}}

Store and Forward is a feature of Tracker Edge and Monitor Edge software to store location events to the local filesystem when the device is unable 
to publish due to poor or non-existent cellular signal.

The events are stored on the flash file system of the device, and you can configure the size and other parameters about how events are saved, and discarded when there isn't sufficient space.

This feature is available in Tracker Edge v18 and Monitor Edge v1 and later.

## Console configuration

The configuration is available in the fleet settings in the [Particle console](https://console.particle.io/).

![Store and Forward](/assets/images/tracker/store-and-forward.png)

When disabled, location publishes that occur when the device does not have cellular connectivity are discarded. This makes sense if you only want to know where the device is currently, not where it has been in the past.

- **Store and forward** is enabled when the checkbox is checked. 

- **Storage Size Limit** in kilobytes. Default: 64K. While the flash file system is 4 MB, you should not use the entire file system for store and forward. Also, since publishes occur one per second when reconnecting, sending large amount of historical location data will use a lot of data operations and time.

- **Discard Policy** is **drop_old** or **drop_new** which determines whether to discard the oldest or newest location data when the storage size reaches the limit.

The disk queue is implemented as first-in, first-out, FIFO.  New items to store are pushed to the back of the queue while older items are popped from the front of the queue.

When drop_old is used, and the queue is at maximum size, a new entry is added to the back of queue and the oldest discarded,

When drop_new is used, and the queue is at maximum size, new entries are immediately discarded.

Each event in the queue is a single file on the LittleFS flash file system. The file system uses 4096 byte (4K) sectors, and the minimum size size is 2 sectors, one for data and one of the file metadata. Thus each even will take 8K of flash file system space, regardless of the size of the data in the event. 

## Edge firmware

There are a number of classes that work together to implement the store and forward feature. 

![Edge firmware classes](/assets/images/tracker/store-and-forward-classes.png)

When using edge firmware, you should always use its built-in functionality instead of the underlying Device OS functionality when there is overlap. For example:

- Don't use `Particle.publish()` directly from your customizations to edge firmware. Doing so can exceed the rate limits for publishing messages when you do so at the same time that the disk queue for store and forward is being empty.

- Don't use `System.sleep()` directly. Instead, use the edge sleep functions, otherwise the two will conflict and behave unpredictably.

### Adding to the `loc` event

In many cases, you may want to just add to the `loc` event instead of publishing a separate event.

- Adding to the `loc` event follows the settings for publish rate, store and forward, etc.
- You are still limited to the maximum publish size (typically 1024 bytes), however, additional data like nearby Wi-Fi access points for Wi-Fi geolocation are added after your data, and limited to the available space. If your event is large, the access points with a weak signal could be omitted, for example.
- Adding to the `loc` event does not add additional data operations.
- The additional fields you add to `loc` are also saved with historical location information and are available when queried by the Particle Cloud API.

If you want to add to the `loc` event, see these documents:

- Adding to `loc` in [Tracker Edge](/firmware/tracker-edge/tracker-edge-firmware/#adding-to-the-location-event)
- Adding to `loc` in [Monitor Edge](/firmware/tracker-edge/monitor-edge-firmware/#adding-to-the-location-event)

However, in some cases you data will be too large, or have a different cadence than the location publishes, in which case you can use 

### Priority queues


![Priority queues](/assets/images/tracker/priority-queues.png)

### BackgroundPublish

The `BackgroundPublish` class is available in both Tracker Edge and Monitor Edge, however you will typically not need to use it directly. It handles publishing events from a thread so the calling thread does not block.

As this is a specialized class, the the class is somewhat complicated to use, it is not documented here, but the source code can be found in `lib/background-publish/` in the Tracker Edge and Monitor Edge firmware if you are interested.

### DiskQueue

