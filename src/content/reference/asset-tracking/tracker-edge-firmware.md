---
title: Tracker Edge Firmware Reference
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

## TrackerCore

You typically instantiate the `TrackerCore` object as a global variable. You must call the `init()` method from `setup()` and the `loop()` method on every loop.

```
// INCLUDE
#include "tracker_core.h"

// EXAMPLE
#include "Particle.h"

#include "asset_tracker_config.h"
#include "tracker_core.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

PRODUCT_ID(AT_PRODUCT_ID);
PRODUCT_VERSION(AT_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.tinygps++", LOG_LEVEL_INFO },
    { "app.ubloxgps",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

TrackerCore tracker;

void setup()
{
    tracker.init();

    Particle.connect();
}

void loop()
{
    tracker.loop();
}

``` 

### init() - TrackerCore

```
// PROTOTYPE 
void TrackerCore::init();

// EXAMPLE
tracker.init();
```

You must call the `init()` method from `setup()` in your main application file.


### loop() - TrackerCore

```
// PROTOTYPE 
void loop();

// EXAMPLE
tracker.loop()
```

You must call the `loop()` method from `loop()` in your main application file.

You can add your own code to loop, however you should avoid using `delay()` or other functions that block. If you would like to publish your own events (separate from the location events), you can use the Tracker cloud service to publish safely without blocking the loop.

### stop() - TrackerCore

```
// PROTOTYPE 
int stop();
```

Stops the tracker location and motion services. If you do this, the device will no longer publish based on location change or motion events.

### getModel() - TrackerCore

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

### getVariant()  - TrackerCore

```
// PROTOTYPE 
uint32_t getVariant();
```

Gets the variant of the Tracker. This is current 0x0001 for all devices.


### cloudService - TrackerCore

```
// PROTOTYPE 
CloudService cloudService;
```

Use this to access the [`CloudService`](/reference/asset-tracking/tracker-edge-firmware/#cloudservice) object. The cloud service makes it easy to do non-blocking publishes from your code, in addition to the built-in location publishes. 



### location - TrackerCore

```
// PROTOTYPE 
TrackerCoreLocation location;

// EXAMPLE
tracker.location.regLocGenCallback(locationGenerationCallback);
```

Use this to access the [`TrackerCoreLocation`](/reference/asset-tracking/tracker-edge-firmware/#trackercorelocation) object. Note that there are two different services, `LocationService` and `TrackerCoreLocation`.

The `TrackerCoreLocation` is typically used to register a location generation callback; this allows custom data to be added to the location publish.

### locationService - TrackerCore

```
// PROTOTYPE 
LocationService locationService;

// EXAMPLE
LocationStatus locationStatus;
tracker.locationService.getStatus(locationStatus);
Log.info("GPS lock=%d", locationStatus.locked);
```

Use this to access the [`LocationService`](/reference/asset-tracking/tracker-edge-firmware/#locationservice) object. Note that there are two different services, `LocationService` and `TrackerCoreLocation`.

The `LocationService` is normally configured from the console to enable features like publish on movement outside radius. These settings are made in the console per-product, though they also can be overridden per-device from the cloud.

You may want to use the `LocationService` directly to query GNSS status (fix or not) as well as the most recent location data from your user firmware.

### shipping - TrackerCore

```
// PROTOTYPE 
TrackerCoreShipping shipping;

// EXAMPLE
tracker.shipping.enter();
```

Use this to access the `TrackerCoreShipping` object. You will rarely need to do this because shipping mode is typically managed from the console.

Since the Tracker One has a LiPo battery inside the case, and the case is screwed together, it's inconvenient to unplug the battery. Shipping mode puts the device in a very low power mode (even less than sleep mode) by using the power management controller (PMIC) to disconnect the battery. Shipping mode can be enabled from the console, so you don't need to have a custom firmware build to enter shipping mode. Note that you can only exit shipping mode by externally powering a Tracker One by USB or the M8 connector.

You might want to use the API if you have a physical button to enter shipping mode on a custom device. You could have the button handler in your user firmware call `tracking.shipping.enter();` to enter shipping mode locally.


### configService - TrackerCore

```
// PROTOTYPE 
ConfigService configService;
```

Use this to access the `ConfigService` object. You will rarely need to do this as the Configuration Service is what manages synchronizing configuration changes made in the cloud with the device. It normally happens automatically and you will not generally have to make configuration service calls from user firmware.



### motionService - TrackerCore

```
// PROTOTYPE 
MotionService motionService;
```

Use this to access the `MotionService` object. You will rarely need to do this because the motion detection mode is normally controlled by the configuration service from the cloud. For example, you can set the Tracker to publish on movement, but this setting is normally made from a configuration in the console, not from user firmware.

### rtc - TrackerCore

```
// PROTOTYPE 
AM1805 rtc;
```

Use this to access the `AM1805` (Real-Time Clock and Hardware Watchdog) object. This object can only be used for the watchdog; the rest of the RTC functions are managed by Device OS directly.


### rgb - TrackerCore

```
// PROTOTYPE 
TrackerCoreRGB rgb;
```

Use this to access the `TrackerCoreRGB` object. You will rarely need to do this because the RGB LED mode is normally controlled by the configuration service from the cloud. For example, the RGB LED can be set to Particle mode (breathing cyan, for example), or the Tracker mode (RGB LED shows cellular signal strength) but this setting is normally made from a configuration in the console, not from user firmware.

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

The `CloudService` is initialized by `TrackerCore` so you don't need to set it up, but you may want use some methods for non-blocking publish from your code.


## TrackerCoreLocation

The `TrackerCoreLocation` service is initialized by `TrackerCore` so you don't need to set it up, but you may want use the method for registering a callback to add custom data to location publishes.

### regLocGenCallback() - TrackerCoreLocation 

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

TrackerCore tracker;

void setup()
{
    tracker.init();
    tracker.location.regLocGenCallback(locationGenerationCallback);

    Particle.connect();
}

void loop()
{
    tracker.loop();
}

void locationGenerationCallback(JSONWriter &writer, 
    LocationPoint &point, const void *context)
{
    writer.name("speed").value(point.speed, 2);
}
```

Registers a function or method to be called to add custom data to a location publish.

### regLocPubCallback - TrackerCoreLocation

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

The `LocationService` is initialized by `TrackerCore` so you don't need to set it up, but you may want use it to find the GNSS information such as fix status and the most recent location data from user firmware.


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
tracker.locationService.getStatus(locationStatus);
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


