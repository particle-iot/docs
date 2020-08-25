---
title: Tracker Edge Firmware
columns: three
layout: reference.hbs
order: 10
description: Particle Tracker Edge Firmware Reference
---

# Tracker Edge Firmware API Reference

One difference between the Tracker One and other Particle devices is that the Tracker One firmware can be used in three different ways:

- Completely off-the-shelf. With its cloud-based configuration, you can use the firmware as-is with no modifications in some cases.
- Semi-custom. The Tracker One firmware is customizable on-device making it possible to add new sensors and customize behavior while still making it easy to upgrade the base firmware.
- Custom. The Tracker One firmware is open-source so you can duplicate and modify it ("fork") for completely custom applications. Or build your own completely from scratch.

This reference guide describes the API for use with semi-custom and custom device firmware.

For an introduction to Tracker Edge Firmware, see the [Tracker Edge Tutorial](/tutorials/asset-tracking/tracker-edge-firmware/#using-github-with-tracker-edge).


## Tracker

The `Tracker` object is a singleton that you access using `Tracker::instance()`. You must call the `init()` method from `setup()` and the `loop()` method on every loop.

```
// INCLUDE
#include "tracker.h"

// EXAMPLE
#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

PRODUCT_ID(PLATFORM_ID);
PRODUCT_VERSION(1);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

void setup()
{
    Tracker::instance().init();

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();
}

``` 

### init() - Tracker

```
// PROTOTYPE 
void Tracker::init();

// EXAMPLE
Tracker::instance().init();
```

You must call the `init()` method from `setup()` in your main application file.


### loop() - Tracker

```
// PROTOTYPE 
void loop();

// EXAMPLE
Tracker::instance().loop()
```

You must call the `loop()` method from `loop()` in your main application file.

You can add your own code to loop, however you should avoid using `delay()` or other functions that block. If you would like to publish your own events (separate from the location events), you can use the Tracker cloud service to publish safely without blocking the loop.

### stop() - Tracker

```
// PROTOTYPE 
int stop();
```

Stops the tracker location and motion services. If you do this, the device will no longer publish based on location change or motion events.

### getModel() - Tracker

```
// PROTOTYPE 
uint32_t getModel();
```

Gets the model of Tracker. 

| Model Code | Description | 
| :--------- | :---- |
| 0x0001     | Tracker SoM Evaluation Board |
| 0x0002     | Tracker One |
| 0xFFFF     | Tracker SoM |

### getVariant()  - Tracker

```
// PROTOTYPE 
uint32_t getVariant();
```

Gets the variant of the Tracker. This is current 0x0001 for all devices.


### cloudService - Tracker

```
// PROTOTYPE 
CloudService cloudService;
```

Use this to access the [`CloudService`](/reference/asset-tracking/tracker-edge-firmware/#cloudservice) object. The cloud service makes it easy to do non-blocking publishes from your code, in addition to the built-in location publishes. 



### location - Tracker

```
// PROTOTYPE 
TrackerLocation location;

// EXAMPLE
Tracker::instance().location.regLocGenCallback(locationGenerationCallback);
```

Use this to access the [`TrackerLocation`](/reference/asset-tracking/tracker-edge-firmware/#Trackerlocation) object. Note that there are two different services, `LocationService` and `TrackerLocation`.

The `TrackerLocation` is typically used to register a location generation callback; this allows custom data to be added to the location publish.

### locationService - Tracker

```
// PROTOTYPE 
LocationService locationService;

// EXAMPLE
LocationStatus locationStatus;
Tracker::instance().locationService.getStatus(locationStatus);
Log.info("GPS lock=%d", locationStatus.locked);
```

Use this to access the [`LocationService`](/reference/asset-tracking/tracker-edge-firmware/#locationservice) object. Note that there are two different services, `LocationService` and `TrackerLocation`.

The `LocationService` is normally configured from the console to enable features like publish on movement outside radius. These settings are made in the console per-product, though they also can be overridden per-device from the cloud.

You may want to use the `LocationService` directly to query GNSS status (fix or not) as well as the most recent location data from your user firmware.

### shipping - Tracker

```
// PROTOTYPE 
TrackerShipping shipping;

// EXAMPLE
Tracker::instance().shipping.enter();
```

Use this to access the `TrackerShipping` object. You will rarely need to do this because shipping mode is typically managed from the console.

Since the Tracker One has a LiPo battery inside the case, and the case is screwed together, it's inconvenient to unplug the battery. Shipping mode puts the device in a very low power mode (even less than sleep mode) by using the power management controller (PMIC) to disconnect the battery. Shipping mode can be enabled from the console, so you don't need to have a custom firmware build to enter shipping mode. Note that you can only exit shipping mode by externally powering a Tracker One by USB or the M8 connector.

You might want to use the API if you have a physical button to enter shipping mode on a custom device. You could have the button handler in your user firmware call `tracking.shipping.enter();` to enter shipping mode locally.

Note: With Version 1.0 of the Tracker One (and Tracker Carrier Board), it's important to disconnect peripherals from the M8 connector before entering shipping mode. If there is current leakage through the GPIO/Serial/I2C pins when shipping mode is entered, the MCU can enter a state where it cannot be woken again unless the LiPo battery is first disconnected, which requires disassembling the Tracker One.

### configService - Tracker

```
// PROTOTYPE 
ConfigService configService;
```

Use this to access the `ConfigService` object. You will rarely need to do this as the Configuration Service is what manages synchronizing configuration changes made in the cloud with the device. It normally happens automatically and you will not generally have to make configuration service calls from user firmware.



### motionService - Tracker

```
// PROTOTYPE 
MotionService motionService;
```

Use this to access the `MotionService` object. You will rarely need to do this because the motion detection mode is normally controlled by the configuration service from the cloud. For example, you can set the Tracker to publish on movement, but this setting is normally made from a configuration in the console, not from user firmware.

### rtc - Tracker

```
// PROTOTYPE 
AM1805 rtc;
```

Use this to access the `AM1805` (Real-Time Clock and Hardware Watchdog) object. This object can only be used for the watchdog; the rest of the RTC functions are managed by Device OS directly.


### rgb - Tracker

```
// PROTOTYPE 
TrackerRGB rgb;
```

Use this to access the `TrackerRGB` object. You will rarely need to do this because the RGB LED mode is normally controlled by the configuration service from the cloud. For example, the RGB LED can be set to Particle mode (breathing cyan, for example), or the Tracker mode (RGB LED shows cellular signal strength) but this setting is normally made from a configuration in the console, not from user firmware.

## Tracker Functions

There are also global functions available.

### getTemperature()

```cpp
// INCLUDE
#include "tracker_core.h"

// PROTOTYPE
float get_temperature();
```

On the Tracker One, returns the temperature using the thermistor on the Tracker Carrier board. Value is a floating point number in degrees Celsius.


## CloudService

The `CloudService` is initialized by `Tracker` so you don't need to set it up, but you may want use some methods for non-blocking publish from your code. You can also register a custom command handler:

### regCommandCallback - CloudService

```cpp
// INCLUDE
#include "cloud_service.h"

// CALLBACK PROTOTYPE
typedef std::function<int(CloudServiceStatus status, JSONValue *, const void *context)> cloud_service_cb_t;

// PROTOTYPE
int regCommandCallback(const char *name, cloud_service_cb_t cb, uint32_t req_id=0, uint32_t timeout_ms=0, const void *context=nullptr);

template <typename T>
int regCommandCallback(const char *name,
    int (T::*cb)(CloudServiceStatus status, JSONValue *, const void *context),
    T *instance,
    uint32_t req_id=0,
    uint32_t timeout_ms=0,
    const void *context=nullptr);

// STATUS CODES
enum CloudServiceStatus {
    SUCCESS = 0,
    FAILURE, // publish to Particle cloud failed, etc
    TIMEOUT, // waiting for application response, etc
};
```

When viewing a device in the console, in the functions and variables area on the right, is the **cmd** box.

<div align=center><img src="/assets/images/tracker/tracker-enter-shipping.png" class="small"></div>

Some commands you can enter into the box:

| Command | Purpose |
| :------ | :--- |
| `{"cmd":"enter_shipping"}` | Enter shipping mode |
| `{"cmd":"get_loc"}` | Gets the location now (regardless of settings) |

Using `regCommandCallback` is an alternative to using `Particle.function`. One advantage is that `cmd` handlers are always in JSON format and the JSON parameters are automatically parsed and passed to your callback. 

## TrackerLocation

The `TrackerLocation` service is initialized by `Tracker` so you don't need to set it up, but you may want use the method for registering a callback to add custom data to location publishes.

### regLocGenCallback() - TrackerLocation 

```cpp
// PROTOTYPE
int regLocGenCallback(
    std::function<void(
        JSONWriter&, LocationPoint &, const void *)>,
    const void *context=nullptr);

template <typename T>
int regLocGenCallback(
    void (T::*cb)(JSONWriter&, LocationPoint &, const void *),
    T *instance,
    const void *context=nullptr);

// EXAMPLE
void locationGenerationCallback(JSONWriter &writer, 
    LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    Tracker::instance().init();
    Tracker::instance().location.regLocGenCallback(locationGenerationCallback);

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();
}

void locationGenerationCallback(JSONWriter &writer, 
    LocationPoint &point, const void *context)
{
    writer.name("speed").value(point.speed, 2);
}
```

Registers a function or method to be called to add custom data to a location publish.

### regLocPubCallback - TrackerLocation

```cpp
// PROTOTYPE
int regLocPubCallback(
    cloud_service_send_cb_t cb, 
    const void *context=nullptr);

template <typename T>
int regLocPubCallback(
    int (T::*cb)(CloudServiceStatus status, JSONValue *, 
        const char *, const void *context),
        T *instance,
    const void *context=nullptr);
```

Registers a function to be called back after the next location publish attempt with success or failure indication.



---

```cpp
enum CloudServiceStatus {
    SUCCESS = 0,
    FAILURE, // publish to Particle cloud failed, etc
    TIMEOUT, // waiting for application response, etc
};
```


## LocationService

The `LocationService` is initialized by `Tracker` so you don't need to set it up, but you may want use it to find the GNSS information such as fix status and the most recent location data from user firmware.


### getLocation() - LocationService

```cpp
// PROTOTYPE
int getLocation(LocationPoint& point);
```

### LocationPoint - LocationService

```cpp
// DEFINTION
struct LocationPoint {
    int locked;
    time_t epochTime;
    LocationTimescale timeScale;
    float latitude;
    float longitude;
    float altitude;
    float speed;
    float heading;
    float horizontalAccuracy;
    float verticalAccuracy;
};
```

| Type | Field | Description |
| :--- | :--- | :--- |
| `int` | `locked` | Indication of GNSS locked status (1=lock/fix obtained) |
| `time_t` | `epochTime` | Epoch time from device sources | 
| `LocationTimescale` | `timeScale` | Epoch timescale |
| `float` | `latitude` | Point latitude in degrees |
| `float` | `longitude` | Point longitude in degrees |
| `float` | `altitude` | Point altitude in meters |
| `float` | `speed` | Point speed in meters per second |
| `float` | `heading` | Point heading in degrees |
| `float` | `horizontalAccuracy` | Point horizontal accuracy in meters |
| `float` | `verticalAccuracy` | Point vertical accuracy in meters |


### LocationTimescale - LocationService 

```cpp
// DEFINITION
enum class LocationTimescale {
    TIMESCALE_UTC,
    TIMESCALE_TAI,
    TIMESCALE_GPS,
    TIMESCALE_GLOSNASS,
    TIMESCALE_GS,
    TIMESCALE_BD,
};

// EXAMPLE
if (locationPoint.timeScale == LocationTimescale::TIMESCALE_GPS) {
    Log.info("is GPS");
}
```

| Enumeration | Description |
| :--- | :--- | 
| `TIMESCALE_UTC` | Coordinated Universal Time |
| `TIMESCALE_TAI` | International Atomic Time |
| `TIMESCALE_GPS` | Global Positioning System (United States) |
| `TIMESCALE_GLOSNASS` | Global Navigation System (Russia) |
| `TIMESCALE_GS` | Galileo System (European Union) |
| `TIMESCALE_BD` | BeiDou (China) |


### getStatus() - LocationService 

```cpp
// PROTOTYPE
int getStatus(LocationStatus& status);

// EXAMPLE
LocationStatus locationStatus;
Tracker::instance().locationService.getStatus(locationStatus);
Log.info("GPS lock=%d", locationStatus.locked);
```

Get the status of the GNSS, including whether it's powered on and has a fix. The [`LocationStatus`](/reference/asset-tracking/tracker-edge-firmware/#locationstatus-locationservice) object is filled in by this method.

### LocationStatus - LocationService

```cpp
// DEFINITION
struct LocationStatus {
    int powered;
    int locked; 
};
```

The `LocationStatus` struct is filled in by [`getStatus()`](/reference/asset-tracking/tracker-edge-firmware/#getstatus-locationservice). It has two fields that contain boolean values (0 = false, 1 = true):

| Field | Description |
| :--- | :--- |
| `powered` | The GNSS has power turned on (1) or off (0) |
| `locked` | The GNSS has lock or fix (1) or not (0) | 


