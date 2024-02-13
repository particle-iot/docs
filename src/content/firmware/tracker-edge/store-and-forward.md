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

Each event in the queue is a single file on the LittleFS flash file system. The file system uses 4096 byte (4K) sectors, and the minimum size size is 2 sectors, one for data and one of the file metadata. Thus each event will take 8K of flash file system space, regardless of the size of the data in the event. 

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

However, in some cases your data will be too large, or have a different cadence than the location publishes, in which case you can use 
the techniques below.

For a detailed description of the fields in the `loc` event, see [asset tracking events](/reference/cloud-apis/api/#asset-tracking-events) in the cloud API reference.

### Priority queues

There are two priority queues:

- 0 (high priority) can be used to send out urgent, timely events
- 1 (normal priority) is used and is the default when using the helper library

For location publishes, it will initially attempt to use the high priority queue. If the device is offline, it will be added to
the disk queue. When the disk queue is uploaded after coming back online, the loc events will be put into the normal priority queue.

![Priority queues](/assets/images/tracker/priority-queues.png)

It is possible to add additional priority queues by modifying the cloud_service.h file, but this is not generally necessary.


### CloudService send

If you want to publish your own custom events that are not queued, but still mixed in with and rate-limited with store and forward events, 
use the CloudService in Tracker Edge and Monitor Edge. 

- It does not block the calling thread; it will call a callback either on success or failure.
- It handles buffering events (in memory) to rate limit outgoing publishes. 
- Up to 8 events will be buffered in RAM. Beyond that, the publish function returns false and the event is not queued.
- It handles two priority queues, managing rate limiting between Edge, DiskQueue, and your events.
- In cases of immediate failure (queue full, invalid parameters), the function will return and will not call the callback.

{{!-- 

#### CloudService send - helper

There are two annoyances with using `CloudService::send` directly from your code:

- The API is slightly different between Tracker Edge and Monitor Edge
- There are a bunch of options you don't need

There is a helper library, described below, that makes it easier to use CloudService send, but this is optional.

#### CloudService send - Monitor Edge

There are many options and overloads to `CloudService::send()` however you will typically only need a subset:

```cpp
// PROTOTYPE - CloudService - Monitor Edge
int send(const char *data,
    PublishFlags publish_flags = PRIVATE,
    CloudServicePublishFlags cloud_flags = CloudServicePublishFlags::NONE,
    cloud_service_ack_callback cb=nullptr,
    unsigned int timeout_ms=std::numeric_limits<system_tick_t>::max(),
    const char *event_name=nullptr,
    uint32_t req_id=0,
    std::size_t priority=0u);
```

- `data` is the event data, same as `Particle.publish`. It is copied and does not need to remain allocated after send returns.
- `publish_flags` are the `PublishFlags`. The default is `PRIVATE`. The only other option you may want to use is `NO_ACK` (cellular devices only).
- `cloud_flags` are flags for the CloudService. Default is `CloudServicePublishFlags::NONE`. The other valid value is `FULL_ACK` however this is not practical to use outside of the Edge configuration service because it requires server-side support.
- `cb` is the callback to call on success or failed (optional), see below.
- `timeout_ms` is the timeout. Default is `std::numeric_limits<system_tick_t>::max()` (no timeout). This is only used for `FULL_ACK`.
- `event_name` is the name of the event, as used with `Particle.publish`. It is copied and does not need to remain allocated after send returns.
- `req_id` is only used for `FULL_ACK`, pass 0 or use the default value otherwise.
- `priority` is the priority level. The default is 0 (high priority) and there is also 1 (low priority).

Return 0 on success, or a non-zero error code. Returns `-EBUSY` (-16) if BackgroundPublish was unable to queue the event for sending because the RAM-based queue was full.


```cpp
// PROTOTYPE - cloud_service_ack_callback - Monitor Edge
int (CloudServiceStatus status, String &&) 
```
- `status` is `particle::Error::NONE` (0) or an system error code on error

The return value for the callback is not currently used, but you should return 0.

#### CloudService send - Tracker Edge

There are many options and overloads to `CloudService::send()` however you will typically only need a subset:

```cpp
// PROTOTYPE - CloudService - Tracker Edge
int send(const char *data,
    PublishFlags publish_flags = PRIVATE,
    CloudServicePublishFlags cloud_flags = CloudServicePublishFlags::NONE,
    cloud_service_send_cb_t cb=nullptr,
    unsigned int timeout_ms=std::numeric_limits<system_tick_t>::max(),
    const char *event_name=nullptr,
    uint32_t req_id=0,
    std::size_t priority=0u);
```

- `data` is the event data, same as `Particle.publish`. It is copied and does not need to remain allocated after send returns.
- `publish_flags` are the `PublishFlags`. The default is `PRIVATE`. The only other option you may want to use is `NO_ACK` (cellular devices only).
- `cloud_flags` are flags for the CloudService. Default is `CloudServicePublishFlags::NONE`. The other valid value is `FULL_ACK` however this is not practical to use outside of the Edge configuration service because it requires server-side support.
- `cb` is the callback to call on success or failed (optional), see below.
- `timeout_ms` is the timeout. Default is `std::numeric_limits<system_tick_t>::max()` (no timeout). This is only used for `FULL_ACK`.
- `event_name` is the name of the event, as used with `Particle.publish`. It is copied and does not need to remain allocated after send returns.
- `req_id` is only used for `FULL_ACK`, pass 0 or use the default value otherwise.
- `priority` is the priority level. The default is 0 (high priority) and there is also 1 (low priority).

Return 0 on success, or a non-zero error code. Returns `-EBUSY` (-16) if BackgroundPublish was unable to queue the event for sending because the RAM-based queue was full.


```cpp
// PROTOTYPE - cloud_service_ack_callback - Tracker Edge
int (CloudServiceStatus status, JSONValue *, const char *, const void *context) 
```
- `status` is `particle::Error::NONE` (0) or an system error code on error

The return value for the callback is not currently used, but you should return 0.
--}}

{{!-- 
### BackgroundPublish

The `BackgroundPublish` class is available in both Tracker Edge only. While the class is available in Monitor Edge, you cannot 

You should use this class instead of calling `Particle.publish()` directly, if you only want to publish and not queue the event using store and forward. This is useful for temporal events that indicate the current state and you do not need all of the historical events when offline.

The `BackgroundPublish` class is a singleton and you can get the object using `BackgroundPublish::instance()`. The header file is `BackgroundPublish.h` though within the Edge files it will already be included in most cases.

The main differences between BackgroundPublish and regular `Particle.publish` are:

- BackgroundPublish will never block the calling thread; it will call a callback either on success or failure.
- It handles buffering events (in memory) to rate limit outgoing publishes. 
- Up to 8 events will be buffered in RAM. Beyond that, the publish function returns false and the event is not queued.
- It handles two priority queues, managing rate limiting between Edge, DiskQueue, and your events.
- In cases of immediate failure (queue full, invalid parameters), the function will return `false` and will not call the callback.

#### publish - BackgroundPublish

```cpp
// PROTOTYPE
bool publish(const char* name,
                const char* data = nullptr,
                PublishFlags flags = PRIVATE,
                std::size_t priority = 0u,
                publish_callback cb = nullptr);

// EXAMPLE
BackgroundPublish::instance().publish("myCustomEvent", eventData);
```

- `name` is the event name, same as `Particle.publish`. This parameter is required.
- `data` is the event data (optional), same as `Particle.publish`.
- `flags` are the `PublishFlags`. The default is `PRIVATE`. The only other option you may want to use is `NO_ACK` (cellular devices only).
- `priority` is the priority level. The default is 0 (high priority) and there is also 1 (low priority).
- `cb` is the callback to call on success or failed (optional)

You can omit the callback if you want to publish if online, but discard if offline.

The event name and data are copied and do not need to remain in scope until the callback is called.

```cpp
// PROTOTYPE for publish_callback
void callback(particle::Error status, const char *event_name, const char *event_data)
```

- `status` is `particle::Error::NONE` (0) or an system error code on error
- `event_name` is the event name that was published (on success) or did not publish (on error)
- `event_data` is the event data

Note that on error the event is not queued to disk when using `BackgroundPublish` directly. You must use the higher level classes if you also want to handle queuing when there is no connectivity. This is intentionally omitted from `BackgroundPublish`.

There are other overloads that take a `Context` which allows you to pass additional data to the callback but because `publish_callback` is a `std::function` you can also use lamba capture to pass additional data to your callback.

--}}

## EdgeEventQueue Helper library

While you can use `CloudService` and `DiskQueue` directly, it's easier to use a helper library which encapsulates some of the complexity. 

The [EdgeEventQueue](https://github.com/particle-iot/EdgeEventQueue/) library makes it easy to implement both queued and non-queued publishes
while maintaining compatibility with the rate-limiting built into the Edge software. It works with both Tracker Edge (v18 and later) and Monitor Edge
firmware. The Github link includes additional information on setup options and the API.

### Initialization example - helper

Add to `setup()` (Tracker Edge) or `user_setup()` (Monitor Edge):

```cpp
privateEventQueue
    .withSizeLimit(50 * 1024)
    .withQueuePath("/usr/testq")
    .setup();
```

### Add to loop - helper

Add to `loop()` (Tracker Edge) or `user_loop()` (Monitor Edge):

```cpp
privateEventQueue.loop();
```

### Queued send - helper

This automatically handles:

- Queuing events to the flash file system
- Rate limiting publishes
- Managing high and normal priority event queues

```cpp
// EXAMPLE
privateEventQueue.publish("eventQueueTest", eventData);
```


### Non-queued send - helper

It also implements a helper function to making using CloudService send easier. You can use this even if you are not using the disk queue.

```cpp
// PROTOTYPE - EdgeEventQueueRK
static int cloudServicePublish(const char *eventName, const char *eventData, PublishFlags publishFlags = {}, size_t priority = 0, std::function<int(CloudServiceStatus)> cb = 0);
```

- `eventName` The event name, as is used in `Particle.publish`. 

- `eventData` The event data, as is used in `Particle.publish`.

- `publishFlags` Publish flags, as is used in Particle.publish. This is optional, and if omitted the default flags are used.

- `priority` 0 or 1. 0 is the default queue and 1 is the low priority queue.

- `cb` Callback function to be called on successful completion or error. Optional. Not called if an immediate error
results in a non-zero result code; callback is only called if the return value is 0.

- Returns `int` 0 on success or a non-zero error code

The callback function has this prototype:

```cpp
int callback(CloudServiceStatus status)
```

- `status` is `particle::Error::NONE` (0) or an system error code on error

Callback is a `std::function` so you can pass a lambda, which allows you to pass additional data via capture variables, or
call a C++ class method and instance easily.

The `eventName` and `eventValue` are copied and do not need to remain valid until the callback is called. Once the
cloudServicePublish call returns, the variables can go out of scope, so it's safe for them to be local variables
on the stack.

Using cloudServicePublish interleaves your event with others in the system in a queue in RAM. The queue is finite
in size (currently 8 elements per priority queue) and if the queue is full, -EBUSY (-16) is returned.

Note that this function does not use the disk queue! It's a low-level function used by the publish method in this
class, or you can use it for your own purposes if you want to publish events that are not saved to disk if the device
is currently offline.
