---
title: Tracker Edge Firmware
columns: three
layout: commonTwo.hbs
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

---

```cpp
// EXAMPLE
void setup()
{
    TrackerConfiguration config;
    config.enableIoCanPowerSleep(true)
          .enableIoCanPower(true);

    Tracker::instance().init(config);
}
```

You can also specify additional configuration parameters via the `TrackerConfiguration` class passed to the `init()` method. This is explained in greater detail [below](/#trackerconfiguration). 

This example shows how to control the behavior of CAN_PWR, the 5V supply for the CAN bus and external I/O on the M8 connector. CAN_PWR must be enabled to use GPIO, analog in (ADC), serial, or I2C ports on the M8 connector. 

Turning off CAN_PWR disconnects the external I/O using a bidirectional analog switch to avoid having leakage current affect the nRF52 MCU.

For more information about the reason for using `Tracker::instance()` and the singleton pattern, see application note [AN034 singleton pattern](/datasheets/app-notes/an034-singleton/).


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

### enableIoCanPower() - Tracker

```
// PROTOTYPE 
void enableIoCanPower(bool enable);
```

Turn on or off CAN_PWR, the 5V supply for the CAN bus and external I/O on the M8 connector. CAN_PWR must be enabled to use GPIO, analog in (ADC), serial, or I2C ports on the M8 connector. Turning off CAN_PWR disconnects the external I/O using a bidirectional analog switch to avoid having leakage current affect the nRF52 MCU.

This can be used in addition to [`TrackerConfiguration`](/#trackerconfiguration) for more fine-grained control over CAN_PWR. For example, you might leave it off except during the brief intervals where you want to read an external sensor connected to I2C on the M8.

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

**Warning:** Particle has discovered an issue with GPIO current leakage through Tracker One's M8 connector that affects Tracker One v1.0 devices manufactured prior to August 31, 2020 and can adversely affect the use of shipping mode for devices that use the M8 connection to an external peripheral device. For more information see [TAN002 - Tracker One v1.0 Shipping Mode](https://support.particle.io/hc/en-us/articles/360052713714).

### configService - Tracker

```
// PROTOTYPE 
ConfigService configService;
```

Use this to access the `ConfigService` object. You will rarely need to do this as the Configuration Service is what manages synchronizing configuration changes made in the cloud with the device. 

You can create a custom configuration that includes:

- Viewing and editing settings in the [console](https://console.particle.io)
- Saving the configuration in the flash memory file system so it's available at startup before the cloud is connected
- Synchronizing your custom configuration between the device and cloud
- Saving data in easy-to-use variables in your code

See the [Tracker Configuration Tutorial](/tutorials/asset-tracking/tracker-configuration) for how all of these pieces fit together.

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

 Note that this is the temperature on the board, within the enclosure, and will typically be several degrees warmer than the ambient temperature.


## TrackerConfiguration

The `TrackerConfiguration` class is used to customize the behavior at setup time.

```cpp
// EXAMPLE
void setup()
{
    TrackerConfiguration config;
    config.enableIoCanPowerSleep(true)
          .enableIoCanPower(true);

    Tracker::instance().init(config);
}
```

### enableIoCanPower - TrackerConfiguration

The `enableIoCanPower()` method controls the behavior of Tracker FW to enable the power on at initialization as well as coming out of sleep. If this is true then the firmware will control it on and off. If false, the user must control.

| enableIoCanPower | enableIoCanPowerSleep | Meaning |
| :--------------: | :-------------------: | :--- |
| false            | false                 | CAN_PWR off at startup, user controls completely |
| false            | true                  | CAN_PWR off at startup, CAN_PWR is turned off prior to sleep, user must power on in all cases |
| true             | false                 | CAN_PWR on at startup, CAN_PWR remains on always |
| true             | true                  | CAN_PWR on at startup, CAN_PWR off at sleep, on again on wake |

### enableIoCanPowerSleep - TrackerConfiguration

The `enableIoCanPowerSleep()` controls behavior before and after sleep. If enabled, the firmware will power down the supply prior to going to sleep. If in combination with enableIoCanPower, it will re-enable the supply on wake.

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
| `{"cmd":"reset"}` | Gracefully reset the device (Tracker Edge v13 and later) |

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

Note: Tracker Edge v12 and later have built-in support for speed in the "spd" field of the location publish so you no longer need to add code to view the speed as detected by the GNSS.


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

### regEnhancedLocCallback - TrackerLocation

```cpp
void enhancedCb(const LocationPoint& point, const void* context) {
    Log.info("Enhanced location callback");
}

void setup() {
    Tracker::instance().init();
    TrackerLocation::instance().regEnhancedLocCallback(enhancedCb);
}
```

Registers a function to be called back with enhanced location information. If enabled in the [location configuration](/tutorials/device-cloud/console/#location-settings), location fusion, Wi-Fi and cellular tower information can be used to get an approximate location when GNSS is not available. This information is generated by the Particle cloud, but it is also possible to receive the enhanced location update on-device using regEnhancedLocCallback.


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
    unsigned int lockedDuration;
    bool stable;
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
| `unsigned int` | `lockedDuration` | Duration of the current GNSS lock (if applicable) | 
| `bool` | `stable` | Indication if GNNS lock is stable (if applicable) |
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


## TrackerSleep

The `TrackerSleep` object manages sleep mode on the Tracker SoM and Tracker One.

You can find out more in the [Tracker Sleep Tutorial](/tutorials/asset-tracking/tracker-sleep/).

### isSleepDisabled() - TrackerSleep

```cpp
// PROTOTYPE
bool isSleepDisabled();

// EXAMPLE
if (!TrackerSleep::instance().isSleepDisabled()) {
    // Execute this code when sleep is enabled
}
```

Sleep mode is enabled in the [cloud configuration settings](/tutorials/device-cloud/console/#sleep-settings). To determine of it is enabled from your code, call `isSleepDisabled()`. This allows you to customize your code depending on how the configuration is set in the cloud. 

This call just checks the value of a variable so you do not need to cache the result; you can call this frequently if needed.

### isFullWakeCycle() - TrackerSleep

```cpp
// PROTOTYPE
bool isFullWakeCycle();

// EXAMPLE
if (TrackerSleep::instance().isFullWakeCycle()) {
    // Do extra processing on full wake cycle
}
```

The maximum location update frequency is determined from the [cloud configuration](/tutorials/device-cloud/console/#location-settings). When waking up from external sources such as motion (IMU), BLE, GPIO pin interrupts, etc. it's possible to do a short wake cycle to handle this interrupt, then go back to sleep without turning on the cellular modem. This preserves battery power and also prevents excessive reconnection. It is possible for your mobile carrier to ban your SIM for aggressive reconnection if it does a full reconnection more often than every 10 minutes.

You can determine if this is a full wake cycle (connecting to cellular) using `isFullWakeCycle()`. To force a full wake cycle, use [`forceFullWakeCycle()`](#forcefullwakecycle-trackersleep).

### forceFullWakeCycle() - TrackerSleep

```cpp
// PROTOTYPE
int forceFullWakeCycle();

// EXAMPLE
TrackerSleep::instance().forceFullWakeCycle();
```

The maximum location update frequency is determined from the [cloud configuration](/tutorials/device-cloud/console/#location-settings). When waking up from external sources such as motion (IMU), BLE, GPIO pin interrupts, etc. it's possible to do a short wake cycle to handle this interrupt, then go back to sleep without turning on the cellular modem. This preserves battery power and also prevents excessive reconnection. It is possible for your mobile carrier to ban your SIM for aggressive reconnection if it does a full reconnection more often than every 10 minutes.

To force a full wake cycle, use `forceFullWakeCycle()`. This should be done with care, as it will override the cloud settings for minimum publish duration, which may cause aggressive reconnection, excessive data usage, or shortened battery life.

Forcing a full wake cycle will shift the full wake period. For example, if you have a minimum publish period of 15 minutes and force a full wake cycle prematurely, then next full wake cycle will be 15 minutes from now (not from the previous full wake).

### wakeFor(pin) - TrackerSleep

```cpp
// PROTOTYPE
int wakeFor(pin_t pin, InterruptMode mode);

// EXAMPLE
TrackerSleep::instance().wakeFor(D5, RISING);
```

Set a pin as a wake source. The mode is one of:

  - `CHANGE` to trigger the interrupt whenever the pin changes value.
  - `RISING` to trigger when the pin goes from low to high.
  - `FALLING` for when the pin goes from high to low.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

Waking by a pin still is subject to the minimum publish period. If the minimum publish period has not been met yet, then this will be a short wake cycle and the device will wake, but will not connect to cellular. Your code can override this by calling [`forceFullWakeCycle()`](#forcefullwakecycle-trackersleep).

To stop using a pin as a wake-up source, use [`ignore()`](#ignore-pin-trackersleep).

Waking from GPIO is common if you have a hardware sensor connected to a GPIO that you want to use for a wake source. If you have an I2C or SPI sensor, you may instead want to use [`wakeAt()`](#wakeat-trackersleep) to wake the MCU, read the sensor, and go back to sleep. Note that this also will obey the minimum publish period so you can wake frequently using `wakeAt()` without excessive reconnection or battery use.

### ignore(pin) - TrackerSleep

```cpp
// PROTOTYPE
int ignore(pin_t pin);

// EXAMPLE
TrackerSleep::instance().ignore(D5);
```

To no longer use pin as a wake source, reversing a `wakeFor` call, use `ignore()`.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

### wakeForBle() - TrackerSleep

```cpp
// PROTOTYPE
int wakeForBle();

// EXAMPLE
TrackerSleep::instance().wakeForBle();
```

Enable BLE (Bluetooth LE) as a wake-up source. 

In addition to wake on BLE, this keeps the BLE subsystem activated so the nRF52 MCU can wake up briefly to:

- Advertise when in BLE peripheral mode. This allows the MCU to wake when a connection is attempted.
- Keep an already open connection alive, in both central and peripheral mode. This allows the MCU to wake when data arrives on the connection or when the connection is lost.

This brief wake-up only services the radio. User firmware and Device OS do not resume execution if waking only to service the radio. If the radio receives incoming data or connection attempt packets, then the MCU completely wakes up in order to handle those events.

To stop using BLE as a wake-up source, use [`ignoreBle()`](#ignoreble-trackersleep).

### ignoreBle() - TrackerSleep

```cpp
// PROTOTYPE
int ignoreBle();

// EXAMPLE
TrackerSleep::instance().ignoreBle();
```

Stop using BLE as a wake-up source that was enabled using [`wakeForBle()`](#wakeforble-trackersleep).

### wakeFor(network) - TrackerSleep

```cpp
// PROTOTYPE
int wakeFor(network_interface_t netif);

// EXAMPLE
TrackerSleep::instance().wakeFor(NETWORK_INTERFACE_CELLULAR);
```

Sets wake-on-network mode. This will allow incoming data on the cellular interface such as a function call, variable request, subscribed event, or OTA request to wake the device from sleep. This requires keeping the cellular modem active, which will increase power usage, however it will speed up reconnection and eliminates issues with aggressive reconnection.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code. Only `NETWORK_INTERFACE_CELLULAR` is supported; using a different network interface will result in a `SYSTEM_ERROR_NOT_SUPPORTED` error.

### ignore(network) - TrackerSleep

```cpp
// PROTOTYPE
int ignore(network_interface_t netif);

// EXAMPLE
TrackerSleep::instance().ignore(NETWORK_INTERFACE_CELLULAR);
```

Disables wake-on-network mode.

### wakeFor(SystemSleepFlag) - TrackerSleep

```cpp
// PROTOTYPE
int wakeFor(SystemSleepFlag flag);
```

Adds a [SystemSleepFlag](/cards/firmware/sleep-sleep/flag-systemsleepconfiguration/) to the sleep settings.

The only supported flag is:

- `SystemSleepFlag::WAIT_CLOUD`

You do not need to specify this as [graceful disconnect mode](/cards/firmware/cloud-functions/particle-setdisconnectoptions/) is used in Tracker Edge, and this also makes sure all cloud messages have been sent.

### pauseSleep() - TrackerSleep

```cpp
// PROTOTYPE
int pauseSleep();

// EXAMPLE
TrackerSleep::instance().pauseSleep();
```

Normally, the [post publish execution time](/tutorials/device-cloud/console/#sleep-settings) determines how long to stay awake. If you want to force the device to stay awake, your firmware can use `pauseSleep()`. To resume allowing sleep to occur again, call [`resumeSleep()`](#resumesleep-trackersleep).

To prevent sleep for an additional number of seconds, you can use [`extendExecution()`](#extendexecution-trackersleep).

### resumeSleep() - TrackerSleep

```cpp
// PROTOTYPE
int resumeSleep();

// EXAMPLE
TrackerSleep::instance().resumeSleep();
```

Normally, the [post-publish execution time](/tutorials/device-cloud/console/#sleep-settings) determines how long to stay awake. If you want to force the device to stay awake, your firmware can use [`pauseSleep()`](#pausesleep-trackersleep). 

To resume allowing sleep to occur again, call `resumeSleep()`. If the post-publish execution time has not been met yet, resume sleep only allows it to occur when the time is met. It does not force an immediate sleep.

### extendExecution() - TrackerSleep

```cpp
// PROTOTYPE
uint32_t extendExecution(uint32_t seconds) 

// EXAMPLE
TrackerSleep::instance().extendExecution(10);
```

Normally, the [post-publish execution time](/tutorials/device-cloud/console/#sleep-settings) determines how long to stay awake. If you want to add additional time to this period, you can use `extendExecution(). This only affects this sleep cycle. On the next sleep - wake cycle the default will be restored from the cloud. You can only make the period longer, not shorter, with this call.

If you want to control staying awake from code instead of by time, your firmware can use [`pauseSleep()`](#pausesleep-trackersleep) and [`resumeSleep()`](#resumesleep-trackersleep). If you want to extend execution for a certain number of seconds from now, use [`extendExecutionFromNow`](#extendexecutionfromnow-trackersleep).

### extendExecutionFromNow - TrackerSleep

```cpp
// PROTOTYPE
uint32_t extendExecutionFromNow(uint32_t seconds, bool force = false) 

// EXAMPLE
TrackerSleep::instance().extendExecutionFromNow(30);
```

Normally, the [post-publish execution time](/tutorials/device-cloud/console/#sleep-settings) determines how long to stay awake. To stay awake for additional time from now, use `extendExecutionFromNow()`.

For example, `TrackerSleep::instance().extendExecutionFromNow(30)` will extend execution to 30 seconds from now, if this is longer than the configured post-publish execution time.

---

```cpp
// EXAMPLE - Can shorten execution window
TrackerSleep::instance().extendExecutionFromNow(2, true);
```

If you want to set the execution time, with the possibility of shortening the post-publish execution time, pass `true` for the `force` parameter.

If you want to control staying awake from code instead of by time, your firmware can use [`pauseSleep()`](#pausesleep-trackersleep) and [`resumeSleep()`](#resumesleep-trackersleep). If you want to extend execution for a certain number of seconds, use [`extendExecution`](#extendexecution-trackersleep).

### wakeAt() - TrackerSleep

```cpp
// PROTOTYPE
TrackerSleepError wakeAtSeconds(unsigned int uptimeSeconds);
TrackerSleepError wakeAtMilliseconds(system_tick_t milliseconds);
TrackerSleepError wakeAtMilliseconds(uint64_t milliseconds);
TrackerSleepError wakeAt(std::chrono::milliseconds ms);

// EXAMPLE
// Wake 60 seconds from now (60000 ms) if earlier than the currently schedule wake
TrackerSleep::instance().wakeAtMilliseconds(System.millis() + 60000);
```

Normally the wake time is determined by the minimum location update frequency in the [cloud configuration](/tutorials/device-cloud/console/#location-settings). You can adjust this from code using the variations of `wakeAt()`.

The next wake time is always calculated using `System.millis()`. This does not rely on the system real-time clock being set, and is not affected by daylight saving time or timezones. It is a 64-bit time millisecond values that will effectively never roll over to 0. Since sleep mode uses ULTRA_LOW_POWER mode, the `System.millis()` counter continues to increment while in sleep. The `System.millis()` value does reset to 0 on reset or cold boot, but the sleep cycles also reset in that condition.

If you have other wake sources such as movement (IMU), GPIO, BLE, network, etc. you can still wake earlier than this time. 

If you schedule a wake before the maximum location update frequency, the wake will be a short wake cycle, where only the device wakes and a cellular connection is enabled. You can override this during your short wake by using [`forceFullWakeCycle()`](#forcefullwakecycle-trackersleep).

You may want to use this feature to take the value of a more complicated sensor that requires external power, or uses I2C or SPI. You can frequently wake using `wakeAt()` but only turn on cellular and publish at the maximum location update frequency. This of course requires that you store these values for later publishing. An example of this can be found in the [short wake with less frequent publish example](/tutorials/asset-tracking/tracker-sleep/#frequent-short-wake-with-less-frequent-publish).

Returns:

- `TrackerSleepError::NONE` Time was scheduled
- `TrackerSleepError::TIME_IN_PAST` Given time happened in the past
- `TrackerSleepError::TIME_SKIPPED` Given time happens later than a sooner wake request

### SleepCallback - TrackerSleep

```cpp
// DEFINITION
using SleepCallback = std::function<void(TrackerSleepContext context)>;

// PROTOTYPE
void mySleepCallback(TrackerSleepContext context);

// TrackerSleepContext
struct TrackerSleepContext {
    TrackerSleepReason reason;
    size_t loop;
    uint64_t lastSleepMs;
    uint64_t lastWakeMs;
    uint64_t nextWakeMs;
    uint64_t modemOnMs;
};

// TrackerSleepReason
enum class TrackerSleepReason {
    PREPARE_SLEEP,
    CANCEL_SLEEP,
    SLEEP,
    WAKE,
    STATE_TO_CONNECTING,
    STATE_TO_EXECUTION,
    STATE_TO_SLEEP,
    STATE_TO_SHUTDOWN
};

```

Your firmware can register functions to be called during sleep-related events. The callback function has this prototype and the `TrackerSleepContext` specifies information about the sleep. Note that the data passed to the callback is a copy of the current state; you cannot affect a change by modifying it directly.

- `reason` The reason for the call, so a single callback function can be registered for multiple purposes.

  - `TrackerSleepReason::PREPARE_SLEEP` Preparing to sleep. You should put lengthy operations and anything that changes the sleep duration here.
  - `TrackerSleepReason::CANCEL_SLEEP` Sleep was started, but then canceled. If you turned off peripherals in `PREPARE_SLEEP`, turn then back on.
  - `TrackerSleepReason::SLEEP` Last step before sleep. Avoid doing anything lengthy here. 
  - `TrackerSleepReason::WAKE` Just woke from sleep.
  - `TrackerSleepReason::STATE_TO_CONNECTING` for state change handlers, entering the CONNECTING state.
  - `TrackerSleepReason::STATE_TO_EXECUTION` for state change handlers, entering the EXECUTION state.
  - `TrackerSleepReason::STATE_TO_SLEEP` for state change handlers, entering the SLEEP state.
  - `TrackerSleepReason::STATE_TO_SHUTDOWN` for state change handlers, entering the SHUTDOWN state (about to enter shipping mode).

- `loop` Incremented on each call to loop.
- `lastSleepMs` The last time, in milliseconds, the system went to sleep.
- `lastWakeMs` The last time, in milliseconds, the system woke from sleep.
- `nextWakeMs` The next time, in milliseconds, the system will wake from sleep.
- `modemOnMs` The time, in milliseconds, when the modem was turned on.
 
The times in milliseconds are values from `System.millis()`. This does not rely on the system real-time clock being set, and is not affected by daylight saving time or timezones. It is a 64-bit time millisecond values that will effectively never roll over to 0. Since sleep mode uses ULTRA_LOW_POWER mode, the `System.millis()` counter continues to increment while in sleep. The `System.millis()` value does reset to 0 on reset or cold boot, but the sleep cycles also reset in that condition.

### registerSleepPrepare - TrackerSleep

```cpp
// PROTOTYPE
int registerSleepPrepare(SleepCallback callback);

// EXAMPLE
TrackerSleep::instance().registerSleepPrepare(myCallback);
```

Register a callback to be called while preparing for sleep. You can register the same function for more than one purpose and use the `reason` field of the context to determine what occurred.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

Any lengthy operations should be done in the `registerSleepPrepare` callback instead of the `registerSleep` callback. The reason is that the sleep duration is calculated after sleep prepare, so preparation steps will not cause the sleep time to drift. 

If you wish to update the sleep duration to allow for a short wake cycle, you must do it from the sleep prepare callback. You cannot set the sleep duration from the final sleep callback. An example of this can be found in the [short wake with less frequent publish example](/tutorials/asset-tracking/tracker-sleep/#frequent-short-wake-with-less-frequent-publish).

---

```cpp
// Cancel the pending sleep
TrackerSleep::instance().updateNextWake(0);
```

From the sleep prepare callback, call `updateNextWake(0)` to cancel this sleep and stay awake instead. The sleep cancel callback will be called.

If you are powering down external hardware, and the operation is fast, you may want to use `registerSleep` so you don't have to worry about canceling. 

If you have a graceful shutdown process that takes more than a hundred milliseconds or so, you should use `registerSleepPrepare`. You need to handle both the `registerSleepWake` and `registerSleepCancel` to turn your external peripheral back on if you use `registerSleepPrepare`.


### registerSleepCancel - TrackerSleep

```cpp
// PROTOTYPE
int registerSleepCancel(SleepCallback callback);

// EXAMPLE
TrackerSleep::instance().registerSleepCancel(myCallback);
```

Register a callback to be called immediately after cancelling sleep.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

If you powered down external hardware in the `registerSleepPrepare` callback, you should undo that operation here and power it back on, as the device will resume normal execution when sleep is canceled.

### registerSleep - TrackerSleep

```cpp
// PROTOTYPE
int registerSleep(SleepCallback callback);

// EXAMPLE
TrackerSleep::instance().registerSleep(myCallback);
```

Register a callback to be called immediately prior to going to sleep. You can register the same function for more than one purpose and use the `reason` field of the context to determine what occurred.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

You should avoid doing any lengthy operations in the `registerSleep` callback. You cannot cancel sleep from this callback, and you cannot change the sleep duration from this callback.

If you are powering down an external peripheral and the operation is fast, such as changing a GPIO that controls a MOSFET or load switch, you can do that safely from the `registerSleep` callback.

### registerWake - TrackerSleep

```cpp
// PROTOTYPE
int registerWake(SleepCallback callback);

// EXAMPLE
TrackerSleep::instance().registerWake(myCallback);
```

Register a callback to be called immediately after waking from sleep.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

If you powered down external hardware in the `registerSleepPrepare` or `registerSleep` callback, you should undo that operation here and power it back on. 

Tracker sleep uses `ULTRA_LOW_POWER` mode, so execution continues after sleep with variables intact. It does not run `setup()` again.

### registerStateChange - TrackerSleep

```cpp
// PROTOTYPE
int registerStateChange(SleepCallback callback);

// EXAMPLE
TrackerSleep::instance().registerStateChange(myCallback);
```

Register a callback to be called immediately after sleep state change. You can find out the state being transitioned into using the `context.reason` field, which will be one of:

  - `TrackerSleepReason::STATE_TO_CONNECTING` for state change handlers, entering the CONNECTING state.
  - `TrackerSleepReason::STATE_TO_EXECUTION` for state change handlers, entering the EXECUTION state.
  - `TrackerSleepReason::STATE_TO_SLEEP` for state change handlers, entering the SLEEP state.
  - `TrackerSleepReason::STATE_TO_SHUTDOWN` for state change handlers, entering the SHUTDOWN state (about to enter shipping mode).

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.



