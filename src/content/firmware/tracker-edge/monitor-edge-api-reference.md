---
title: Monitor Edge firmware API reference
columns: two
layout: commonTwo.hbs
description: Monitor Edge firmware API reference
---

# {{title}}

One difference between the Monitor One, Tracker One, and other Particle devices is that the Tracker One firmware can be used in three different ways:

- Completely off-the-shelf. With its cloud-based configuration, you can use the firmware as-is with no modifications in some cases.
- Semi-custom. The Tracker One firmware is customizable on-device making it possible to add new sensors and customize behavior while still making it easy to upgrade the base firmware.
- Custom. The Tracker One firmware is open-source so you can duplicate and modify it ("fork") for completely custom applications. Or build your own completely from scratch.

This reference guide describes the API for use with semi-custom and custom device firmware.

The Monitor Edge firmware is similar to the Tracker Edge firmnware. For an introduction to Tracker Edge Firmware, see the [Tracker Edge Tutorial](/firmware/tracker-edge/tracker-edge-firmware/#using-github-with-tracker-edge). 

For a detailed description of the fields in the `loc` and `loc-enhanced` events that are published by the Monitor Edge firmware, see [asset tracking events](/reference/cloud-apis/api/#asset-tracking-events) in the cloud API reference.

## Edge

The `Edge` object is a singleton that you access using `Edge::instance()`. You must call the `init()` method from `setup()` and the `loop()` method on every loop. This replaces the `Tracker` object in Tracker Edge.

```cpp
#include "Particle.h"
#include "edge.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

#if EDGE_PRODUCT_NEEDED
PRODUCT_ID(EDGE_PRODUCT_ID);
#endif // EDGE_PRODUCT_NEEDED
PRODUCT_VERSION(EDGE_PRODUCT_VERSION);

STARTUP(
    Edge::startup();
);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

void setup()
{
    Edge::instance().init();
}

void loop()
{
    Edge::instance().loop();
}


``` 

### init() - Edge

```cpp
// PROTOTYPE 
void Edge::init();

// EXAMPLE
Edge::instance().init();
```

You must call the `init()` method from `setup()` in your main application file.

---

```cpp
// EXAMPLE
void setup()
{
    EdgeConfiguration config;
    config.enableIoCanPowerSleep(true)
          .enableIoCanPower(true);

    Edge::instance().init(config);
}
```

You can also specify additional configuration parameters via the `EdgeConfiguration` class passed to the `init()` method. This is explained in greater detail [below](#edgeconfiguration). 

This example shows how to control the behavior of CAN_PWR, the 5V supply for the CAN bus. 

For more information about the reason for using `Edge::instance()` and the singleton pattern, see application note [AN034 singleton pattern](/firmware/software-design/singleton/).


### loop() - Edge

```
// PROTOTYPE 
void loop();

// EXAMPLE
Edge::instance().loop()
```

You must call the `loop()` method from `loop()` in your main application file.

You can add your own code to loop, however you should avoid using `delay()` or other functions that block. If you would like to publish your own events (separate from the location events), you can use the Edge cloud service to publish safely without blocking the loop.

### stop() - Edge

```
// PROTOTYPE 
int stop();
```

Stops the tracker location and motion services. If you do this, the device will no longer publish based on location change or motion events.

### enableIoCanPower() - Edge

```
// PROTOTYPE 
void enableIoCanPower(bool enable);
```

Turn on or off CAN_PWR, the 5V supply for the CAN bus.

This can be used in addition to [`EdgeConfiguration`](#edgeconfiguration) for more fine-grained control over CAN_PWR. For example, you might leave it off except during the brief intervals where you want to read an external sensor connected to I2C on the M8.

### getModel() - Edge

```
// PROTOTYPE 
uint32_t getModel();
```

Gets the model.

| Model Code | Constant | Description | 
| :--------- | :--- | :---- |
| 0x0000     | `TRACKER_MODEL_BARE_SOM` | Tracker SoM (bare, not in one of the cases below) |
| 0x0001     | `TRACKER_MODEL_EVAL` | Tracker SoM Evaluation Board |
| 0x0002     | `TRACKER_MODEL_TRACKERONE` | Tracker One |
| 0x0003     | `TRACKER_MODEL_MONITORONE` | Monitor One |

### getVariant()  - Edge

```
// PROTOTYPE 
uint32_t getVariant();
```

Gets the variant. This is current 0x0001 for all devices.


### cloudService - Edge

```
// PROTOTYPE 
CloudService cloudService;
```

Use this to access the [`CloudService`](#cloudservice) object. The cloud service makes it easy to do non-blocking publishes from your code, in addition to the built-in location publishes. 



### location - Edge

```
// PROTOTYPE 
EdgeLocation location;

// EXAMPLE
Edge::instance().location.regLocGenCallback(myLocationGenerationCallback);
```

Use this to access the [`EdgeLocation`](#edgelocation) object. Note that there are two different services, `EdgeGnssAbstraction` and `EdgeLocation`.

The `EdgeLocation` is typically used to register a location generation callback; this allows custom data to be added to the location publish.

### locationService - Edge

```
// PROTOTYPE 
EdgeGnssAbstraction locationService;

// EXAMPLE
LocationStatus locationStatus;
Edge::instance().locationService.getStatus(locationStatus);
Log.info("GPS lock=%d", locationStatus.locked);
```

Use this to access the [`EdgeGnssAbstraction`](#edgegnssabstraction) object. Note that there are two different services, `EdgeGnssAbstraction` and `EdgeLocation`.

The `EdgeGnssAbstraction` is normally configured from the console to enable features like publish on movement outside radius. These settings are made in the console per-product, though they also can be overridden per-device from the cloud.

You may want to use the `EdgeGnssAbstraction` directly to query GNSS status (fix or not) as well as the most recent location data from your user firmware.

### shipping - Edge

```
// PROTOTYPE 
EdgeShipping shipping;

// EXAMPLE
Edge::instance().shipping.enter();
```

Use this to access the `EdgeShipping` object. You will rarely need to do this because shipping mode is typically managed from the console.

Since the Monitor One has a LiPo battery inside the case, and the case is screwed together, it's inconvenient to unplug the battery. Shipping mode puts the device in a very low power mode (even less than sleep mode) by using the power management controller (PMIC) to disconnect the battery. Shipping mode can be enabled from the console, so you don't need to have a custom firmware build to enter shipping mode. Note that you can only exit shipping mode by externally powering the Monitor One by the M12 connector or the internal USB connector.

You might want to use the API if you have a physical button to enter shipping mode on a custom device. You could have the button handler in your user firmware call `Edge::instance().shipping.enter()` to enter shipping mode locally.

### configService - Edge

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

See the [Tracker Configuration Tutorial](/reference/tracker/tracker-configuration/) for how all of these pieces fit together.

### motionService - Edge

```
// PROTOTYPE 
EdgeMotion motionService;
```

Use this to access the `EdgeMotion` object. You will rarely need to do this because the motion detection mode is normally controlled by the configuration service from the cloud. For example, you can set the Monitor One to publish on movement, but this setting is normally made from a configuration in the console, not from user firmware.


## EdgeConfiguration

The `EdgeConfiguration` class is used to customize the behavior at setup time. It replaces the `TrackerConfiguration` class in Tracker Edge.

```cpp
// EXAMPLE
void setup()
{
    EdgeConfiguration config;
    config.enableIoCanPowerSleep(true)
          .enableIoCanPower(true);

    Edge::instance().init(config);
}
```

### enableIoCanPower - EdgeConfiguration

The `enableIoCanPower()` method controls the behavior of Edge FW to enable the power on at initialization as well as coming out of sleep. If this is true then the firmware will control it on and off. If false, the user must control.

| enableIoCanPower | enableIoCanPowerSleep | Meaning |
| :--------------: | :-------------------: | :--- |
| false            | false                 | CAN_PWR off at startup, user controls completely |
| false            | true                  | CAN_PWR off at startup, CAN_PWR is turned off prior to sleep, user must power on in all cases |
| true             | false                 | CAN_PWR on at startup, CAN_PWR remains on always |
| true             | true                  | CAN_PWR on at startup, CAN_PWR off at sleep, on again on wake |

### enableIoCanPowerSleep - EdgeConfiguration

The `enableIoCanPowerSleep()` controls behavior before and after sleep. If enabled, the firmware will power down the supply prior to going to sleep. If in combination with enableIoCanPower, it will re-enable the supply on wake.

### disableCharging (set) - EdgeConfiguration

If the application wishes to manually disable charging, these methods can be used. This is not typical, normally the Monitor One will manage enabling or disabling charging automatically based on input current available and temperature.

However if the application has knowledge of its external power supply, it may want to fine-tune the charging behavior of the tracker in cases such as:

- The external supply may not be in a state to deliver enough current to the platform
- At the time it may not be convenient for increased input current

```cpp
// PROTOTYPE
EdgeConfiguration& disableCharging(bool disable)
```

- `disable` set to `true`: Charging is disabled
- `disable` set to `false`: Charging is enabled (default)

This setting is not saved to flash, you should set it in your application whenever you believe charging should be manually disabled.

### disableCharging (get) - EdgeConfiguration

```cpp
// PROTOTYPE
bool disableCharging() const
```

Gets the current state of the disable charging feature. The default is not disabled, which is to say charging is enabled.

- `true` Charging is disabled
- `false` Charging is enabled (default)

### enableFastLock (set) - EdgeConfiguration

```cpp
// PROTOTYPE
 EdgeConfiguration& enableFastLock(bool enable)
```

Enable or disable faster GNSS lock based on HDOP.

- Enabled (true): Faster GNSS lock, but may result on less horizontal accuracy
- Disabled (false): Slower GNSS lock but greater horizontal accurance. This is the default.


### enableFastLock (get) - EdgeConfiguration

```cpp
// PROTOTYPE
bool enableFastLock() const
```

Gets the current state of the fast lock feature. The default is false (fast lock is disabled).

- `true` Charging is disabled
- `false` Charging is enabled (default)

### gnssRetryCount (set) - EdgeConfiguration

```cpp
// PROTOTYPE
EdgeConfiguration& gnssRetryCount(unsigned int count)
```

Sets the number of times to try GNSS initialization. The default is 1, which is appropriate in most situations.

### gnssRetryCount (get) - EdgeConfiguration

```cpp
// PROTOTYPE
unsigned int gnssRetryCount() const 
```

Gets the number of times to try GNSS initialization. The default is 1.

## CloudService

The `CloudService` is initialized by `Edge` so you don't need to set it up, but you may want use some methods for non-blocking publish from your code. You can also register a custom command handler:

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

{{!-- BEGIN shared-blurb d529b260-c0c2-481a-ac2b-87680b9cf2d8 --}} 
| Command | Purpose |
| :------ | :--- |
| `{"cmd":"enter_shipping"}` | Enter shipping mode |
| `{"cmd":"get_loc"}` | Gets the location now (regardless of settings) |
| `{"cmd":"reset"}` | Gracefully reset the device |
| `{"cmd":"get_cfg"}` |  Get all configuration objects in the device |
| `{"cmd":"reset_to_factory"}` | Perform a factory reset for configuration |
{{!-- END shared-blurb --}}


Using `regCommandCallback` is an alternative to using `Particle.function`. One advantage is that `cmd` handlers are always in JSON format and the JSON parameters are automatically parsed and passed to your callback. 

## EdgeLocation

The `EdgeLocation` service is initialized by `Edge` so you don't need to set it up, but you may want use the method for registering a callback to add custom data to location publishes. This replaces the `TrackerLocation` object in Tracker Edge.

### regLocGenCallback() - EdgeLocation 

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
void myLocationGenerationCallback(JSONWriter &writer, 
    LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    Edge::instance().init();
    Edge::instance().location.regLocGenCallback(myLocationGenerationCallback);

    Particle.connect();
}

void loop()
{
    Edge::instance().loop();
}

void myLocationGenerationCallback(JSONWriter &writer, 
    LocationPoint &point, const void *context)
{
    writer.name("speed").value(point.speed, 2);
}
```

Note: Tracker Edge v12 and later have built-in support for speed in the "spd" field of the location publish so you no longer need to add code to view the speed as detected by the GNSS, this is just an illustration of using the callback.


Registers a function or method to be called to add custom data to a location publish.

### regLocPubCallback - EdgeLocation

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

### regEnhancedLocCallback - EdgeLocation

```cpp
void enhancedCb(const LocationPoint& point, const void* context) {
    Log.info("Enhanced location callback");
}

void setup() {
    Edge::instance().init();
    EdgeLocation::instance().regEnhancedLocCallback(enhancedCb);
}
```

Registers a function to be called back with enhanced location information. If enabled in the [location configuration](/getting-started/console/console/#location-settings), location fusion, Wi-Fi and cellular tower information can be used to get an approximate location when GNSS is not available. This information is generated by the Particle cloud, but it is also possible to receive the enhanced location update on-device using regEnhancedLocCallback.


## EdgeGnssAbstraction

The `EdgeGnssAbstraction` is initialized by `Edge` so you don't need to set it up, but you may want use it to find the GNSS information such as fix status and the most recent location data from user firmware.


### getLocation() - EdgeGnssAbstraction

```cpp
// PROTOTYPE
int getLocation(LocationPoint& point);
```

### LocationPoint - EdgeGnssAbstraction

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
| `bool` | `stable` | Indication if GNSS lock is stable (if applicable) |
| `time_t` | `epochTime` | Epoch time from device sources | 
| `LocationTimescale` | `timeScale` | Epoch timescale |
| `float` | `latitude` | Point latitude in degrees |
| `float` | `longitude` | Point longitude in degrees |
| `float` | `altitude` | Point altitude in meters |
| `float` | `speed` | Point speed in meters per second |
| `float` | `heading` | Point heading in degrees |
| `float` | `horizontalAccuracy` | Point horizontal accuracy in meters |
| `float` | `verticalAccuracy` | Point vertical accuracy in meters |




### LocationTimescale - EdgeGnssAbstraction 

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


### getStatus() - EdgeGnssAbstraction 

```cpp
// PROTOTYPE
int getStatus(LocationStatus& status);

// EXAMPLE
LocationStatus locationStatus;
Edge::instance().locationService.getStatus(locationStatus);
Log.info("GPS lock=%d", locationStatus.locked);
```

Get the status of the GNSS, including whether it's powered on and has a fix. The [`LocationStatus`](#locationstatus-edgegnssabstraction) object is filled in by this method.

### LocationStatus - EdgeGnssAbstraction

```cpp
// DEFINITION
struct LocationStatus {
    int powered;
    int locked; 
};
```

The `LocationStatus` struct is filled in by [`getStatus()`](#getstatus-edgegnssabstraction). It has two fields that contain boolean values (0 = false, 1 = true):

| Field | Description |
| :--- | :--- |
| `powered` | The GNSS has power turned on (1) or off (0) |
| `locked` | The GNSS has lock or fix (1) or not (0) | 


## EdgeSleep

The `EdgeSleep` object manages sleep mode on the Monitor One.

You can find out more in the [Tracker Sleep Tutorial](/reference/tracker/tracker-sleep/).

### isSleepDisabled() - EdgeSleep

```cpp
// PROTOTYPE
bool isSleepDisabled();

// EXAMPLE
if (!EdgeSleep::instance().isSleepDisabled()) {
    // Execute this code when sleep is enabled
}
```

Sleep mode is enabled in the [cloud configuration settings](/getting-started/console/console/#sleep-settings). To determine of it is enabled from your code, call `isSleepDisabled()`. This allows you to customize your code depending on how the configuration is set in the cloud. 

This call just checks the value of a variable so you do not need to cache the result; you can call this frequently if needed.

### isFullWakeCycle() - EdgeSleep

```cpp
// PROTOTYPE
bool isFullWakeCycle();

// EXAMPLE
if (EdgeSleep::instance().isFullWakeCycle()) {
    // Do extra processing on full wake cycle
}
```

The maximum location update frequency is determined from the [cloud configuration](/getting-started/console/console/#location-settings). When waking up from external sources such as motion (IMU), BLE, GPIO pin interrupts, etc. it's possible to do a short wake cycle to handle this interrupt, then go back to sleep without turning on the cellular modem. This preserves battery power and also prevents excessive reconnection. It is possible for your mobile carrier to ban your SIM for aggressive reconnection if it does a full reconnection more often than every 10 minutes.

You can determine if this is a full wake cycle (connecting to cellular) using `isFullWakeCycle()`. To force a full wake cycle, use [`forceFullWakeCycle()`](#forcefullwakecycle-edgesleep).

### forceFullWakeCycle() - EdgeSleep

```cpp
// PROTOTYPE
int forceFullWakeCycle();

// EXAMPLE
EdgeSleep::instance().forceFullWakeCycle();
```

The maximum location update frequency is determined from the [cloud configuration](/getting-started/console/console/#location-settings). When waking up from external sources such as motion (IMU), BLE, GPIO pin interrupts, etc. it's possible to do a short wake cycle to handle this interrupt, then go back to sleep without turning on the cellular modem. This preserves battery power and also prevents excessive reconnection. It is possible for your mobile carrier to ban your SIM for aggressive reconnection if it does a full reconnection more often than every 10 minutes.

To force a full wake cycle, use `forceFullWakeCycle()`. This should be done with care, as it will override the cloud settings for minimum publish duration, which may cause aggressive reconnection, excessive data usage, or shortened battery life.

Forcing a full wake cycle will shift the full wake period. For example, if you have a minimum publish period of 15 minutes and force a full wake cycle prematurely, then next full wake cycle will be 15 minutes from now (not from the previous full wake).

### wakeFor(pin) - EdgeSleep

```cpp
// PROTOTYPE
int wakeFor(pin_t pin, InterruptMode mode);

// EXAMPLE
EdgeSleep::instance().wakeFor(D5, RISING);
```

Set a pin as a wake source. The mode is one of:

  - `CHANGE` to trigger the interrupt whenever the pin changes value.
  - `RISING` to trigger when the pin goes from low to high.
  - `FALLING` for when the pin goes from high to low.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

Waking by a pin still is subject to the minimum publish period. If the minimum publish period has not been met yet, then this will be a short wake cycle and the device will wake, but will not connect to cellular. Your code can override this by calling [`forceFullWakeCycle()`](#forcefullwakecycle-edgesleep).

To stop using a pin as a wake-up source, use [`ignore()`](#ignore-pin-edgesleep).

Waking from GPIO is common if you have a hardware sensor connected to a GPIO that you want to use for a wake source. If you have an I2C or SPI sensor, you may instead want to use [`wakeAt()`](#wakeat-edgesleep) to wake the MCU, read the sensor, and go back to sleep. Note that this also will obey the minimum publish period so you can wake frequently using `wakeAt()` without excessive reconnection or battery use.

### ignore(pin) - EdgeSleep

```cpp
// PROTOTYPE
int ignore(pin_t pin);

// EXAMPLE
EdgeSleep::instance().ignore(D5);
```

To no longer use pin as a wake source, reversing a `wakeFor` call, use `ignore()`.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

### wakeForBle() - EdgeSleep

```cpp
// PROTOTYPE
int wakeForBle();

// EXAMPLE
EdgeSleep::instance().wakeForBle();
```

Enable BLE (Bluetooth LE) as a wake-up source. 

In addition to wake on BLE, this keeps the BLE subsystem activated so the nRF52 MCU can wake up briefly to:

- Advertise when in BLE peripheral mode. This allows the MCU to wake when a connection is attempted.
- Keep an already open connection alive, in both central and peripheral mode. This allows the MCU to wake when data arrives on the connection or when the connection is lost.

This brief wake-up only services the radio. User firmware and Device OS do not resume execution if waking only to service the radio. If the radio receives incoming data or connection attempt packets, then the MCU completely wakes up in order to handle those events.

To stop using BLE as a wake-up source, use [`ignoreBle()`](#ignoreble-edgesleep).

### ignoreBle() - EdgeSleep

```cpp
// PROTOTYPE
int ignoreBle();

// EXAMPLE
EdgeSleep::instance().ignoreBle();
```

Stop using BLE as a wake-up source that was enabled using [`wakeForBle()`](#wakeforble-edgesleep).

### wakeFor(network) - EdgeSleep

```cpp
// PROTOTYPE
int wakeFor(network_interface_t netif);

// EXAMPLE
EdgeSleep::instance().wakeFor(NETWORK_INTERFACE_CELLULAR);
```

Sets wake-on-network mode. This will allow incoming data on the cellular interface such as a function call, variable request, subscribed event, or OTA request to wake the device from sleep. This requires keeping the cellular modem active, which will increase power usage, however it will speed up reconnection and eliminates issues with aggressive reconnection.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code. Only `NETWORK_INTERFACE_CELLULAR` is supported; using a different network interface will result in a `SYSTEM_ERROR_NOT_SUPPORTED` error.

### ignore(network) - EdgeSleep

```cpp
// PROTOTYPE
int ignore(network_interface_t netif);

// EXAMPLE
EdgeSleep::instance().ignore(NETWORK_INTERFACE_CELLULAR);
```

Disables wake-on-network mode.

### wakeFor(SystemSleepFlag) - EdgeSleep

```cpp
// PROTOTYPE
int wakeFor(SystemSleepFlag flag);
```

Adds a [SystemSleepFlag](/reference/device-os/api/sleep-sleep/flag-systemsleepconfiguration/) to the sleep settings.

The only supported flag is:

- `SystemSleepFlag::WAIT_CLOUD`

You do not need to specify this as [graceful disconnect mode](/reference/device-os/api/cloud-functions/particle-setdisconnectoptions/) is used in Monitor Edge, and this also makes sure all cloud messages have been sent.

### pauseSleep() - EdgeSleep

```cpp
// PROTOTYPE
int pauseSleep();

// EXAMPLE
EdgeSleep::instance().pauseSleep();
```

Normally, the [post publish execution time](/getting-started/console/console/#sleep-settings) determines how long to stay awake. If you want to force the device to stay awake, your firmware can use `pauseSleep()`. To resume allowing sleep to occur again, call [`resumeSleep()`](#resumesleep-edgesleep).

To prevent sleep for an additional number of seconds, you can use [`extendExecution()`](#extendexecution-edgesleep).

### resumeSleep() - EdgeSleep

```cpp
// PROTOTYPE
int resumeSleep();

// EXAMPLE
EdgeSleep::instance().resumeSleep();
```

Normally, the [post-publish execution time](/getting-started/console/console/#sleep-settings) determines how long to stay awake. If you want to force the device to stay awake, your firmware can use [`pauseSleep()`](#pausesleep-edgesleep). 

To resume allowing sleep to occur again, call `resumeSleep()`. If the post-publish execution time has not been met yet, resume sleep only allows it to occur when the time is met. It does not force an immediate sleep.

### extendExecution() - EdgeSleep

```cpp
// PROTOTYPE
uint32_t extendExecution(uint32_t seconds) 

// EXAMPLE
EdgeSleep::instance().extendExecution(10);
```

Normally, the [post-publish execution time](/getting-started/console/console/#sleep-settings) determines how long to stay awake. If you want to add additional time to this period, you can use `extendExecution(). This only affects this sleep cycle. On the next sleep - wake cycle the default will be restored from the cloud. You can only make the period longer, not shorter, with this call.

If you want to control staying awake from code instead of by time, your firmware can use [`pauseSleep()`](#pausesleep-edgesleep) and [`resumeSleep()`](#resumesleep-edgesleep). If you want to extend execution for a certain number of seconds from now, use [`extendExecutionFromNow`](#extendexecutionfromnow-edgesleep).

### extendExecutionFromNow - EdgeSleep

```cpp
// PROTOTYPE
uint32_t extendExecutionFromNow(uint32_t seconds, bool force = false) 

// EXAMPLE
EdgeSleep::instance().extendExecutionFromNow(30);
```

Normally, the [post-publish execution time](/getting-started/console/console/#sleep-settings) determines how long to stay awake. To stay awake for additional time from now, use `extendExecutionFromNow()`.

For example, `EdgeSleep::instance().extendExecutionFromNow(30)` will extend execution to 30 seconds from now, if this is longer than the configured post-publish execution time.

---

```cpp
// EXAMPLE - Can shorten execution window
EdgeSleep::instance().extendExecutionFromNow(2, true);
```

If you want to set the execution time, with the possibility of shortening the post-publish execution time, pass `true` for the `force` parameter.

If you want to control staying awake from code instead of by time, your firmware can use [`pauseSleep()`](#pausesleep-edgesleep) and [`resumeSleep()`](#resumesleep-edgesleep). If you want to extend execution for a certain number of seconds, use [`extendExecution`](#extendexecution-edgesleep).

### wakeAt() - EdgeSleep

```cpp
// PROTOTYPE
EdgeSleepError wakeAtSeconds(unsigned int uptimeSeconds);
EdgeSleepError wakeAtMilliseconds(system_tick_t milliseconds);
EdgeSleepError wakeAtMilliseconds(uint64_t milliseconds);
EdgeSleepError wakeAt(std::chrono::milliseconds ms);

// EXAMPLE
// Wake 60 seconds from now (60000 ms) if earlier than the currently schedule wake
EdgeSleep::instance().wakeAtMilliseconds(System.millis() + 60000);
```

Normally the wake time is determined by the minimum location update frequency in the [cloud configuration](/getting-started/console/console/#location-settings). You can adjust this from code using the variations of `wakeAt()`.

The next wake time is always calculated using `System.millis()`. This does not rely on the device real-time clock being set, and is not affected by daylight saving time or timezones. It is a 64-bit time millisecond values that will effectively never roll over to 0. Since sleep mode uses ULTRA_LOW_POWER mode, the `System.millis()` counter continues to increment while in sleep. The `System.millis()` value does reset to 0 on reset or cold boot, but the sleep cycles also reset in that condition.

If you have other wake sources such as movement (IMU), GPIO, BLE, network, etc. you can still wake earlier than this time. 

If you schedule a wake before the maximum location update frequency, the wake will be a short wake cycle, where only the device wakes and a cellular connection is enabled. You can override this during your short wake by using [`forceFullWakeCycle()`](#forcefullwakecycle-edgesleep).

You may want to use this feature to take the value of a more complicated sensor that requires external power, or uses I2C or SPI. You can frequently wake using `wakeAt()` but only turn on cellular and publish at the maximum location update frequency. This of course requires that you store these values for later publishing. An example of this can be found in the [short wake with less frequent publish example](/reference/tracker/tracker-sleep/#frequent-short-wake-with-less-frequent-publish).

Returns:

- `EdgeSleepError::NONE` Time was scheduled
- `EdgeSleepError::TIME_IN_PAST` Given time happened in the past
- `EdgeSleepError::TIME_SKIPPED` Given time happens later than a sooner wake request

### SleepCallback - EdgeSleep

```cpp
// DEFINITION
using SleepCallback = std::function<void(EdgeSleepContext context)>;

// PROTOTYPE
void mySleepCallback(EdgeSleepContext context);

// EdgeSleepContext
struct EdgeSleepContext {
    EdgeSleepReason reason;
    size_t loop;
    uint64_t lastSleepMs;
    uint64_t lastWakeMs;
    uint64_t nextWakeMs;
    uint64_t modemOnMs;
};

// EdgeSleepReason
enum class EdgeSleepReason {
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

Your firmware can register functions to be called during sleep-related events. The callback function has this prototype and the `EdgeSleepContext` specifies information about the sleep. Note that the data passed to the callback is a copy of the current state; you cannot affect a change by modifying it directly.

- `reason` The reason for the call, so a single callback function can be registered for multiple purposes.

  - `EdgeSleepReason::PREPARE_SLEEP` Preparing to sleep. You should put lengthy operations and anything that changes the sleep duration here.
  - `EdgeSleepReason::CANCEL_SLEEP` Sleep was started, but then canceled. If you turned off peripherals in `PREPARE_SLEEP`, turn then back on.
  - `EdgeSleepReason::SLEEP` Last step before sleep. Avoid doing anything lengthy here. 
  - `EdgeSleepReason::WAKE` Just woke from sleep.
  - `EdgeSleepReason::STATE_TO_CONNECTING` for state change handlers, entering the CONNECTING state.
  - `EdgeSleepReason::STATE_TO_EXECUTION` for state change handlers, entering the EXECUTION state.
  - `EdgeSleepReason::STATE_TO_SLEEP` for state change handlers, entering the SLEEP state.
  - `EdgeSleepReason::STATE_TO_SHUTDOWN` for state change handlers, entering the SHUTDOWN state (about to enter shipping mode).

- `loop` Incremented on each call to loop.
- `lastSleepMs` The last time, in milliseconds, the device went to sleep.
- `lastWakeMs` The last time, in milliseconds, the device woke from sleep.
- `nextWakeMs` The next time, in milliseconds, the device will wake from sleep.
- `modemOnMs` The time, in milliseconds, when the modem was turned on.
 
The times in milliseconds are values from `System.millis()`. This does not rely on the device real-time clock being set, and is not affected by daylight saving time or timezones. It is a 64-bit time millisecond values that will effectively never roll over to 0. Since sleep mode uses ULTRA_LOW_POWER mode, the `System.millis()` counter continues to increment while in sleep. The `System.millis()` value does reset to 0 on reset or cold boot, but the sleep cycles also reset in that condition.

### registerSleepPrepare - EdgeSleep

```cpp
// PROTOTYPE
int registerSleepPrepare(SleepCallback callback);

// EXAMPLE
EdgeSleep::instance().registerSleepPrepare(myCallback);
```

Register a callback to be called while preparing for sleep. You can register the same function for more than one purpose and use the `reason` field of the context to determine what occurred.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

Any lengthy operations should be done in the `registerSleepPrepare` callback instead of the `registerSleep` callback. The reason is that the sleep duration is calculated after sleep prepare, so preparation steps will not cause the sleep time to drift. 

If you wish to update the sleep duration to allow for a short wake cycle, you must do it from the sleep prepare callback. You cannot set the sleep duration from the final sleep callback. An example of this can be found in the [short wake with less frequent publish example](/reference/tracker/tracker-sleep/#frequent-short-wake-with-less-frequent-publish).

---

```cpp
// Cancel the pending sleep
EdgeSleep::instance().updateNextWake(0);
```

From the sleep prepare callback, call `updateNextWake(0)` to cancel this sleep and stay awake instead. The sleep cancel callback will be called.

If you are powering down external hardware, and the operation is fast, you may want to use `registerSleep` so you don't have to worry about canceling. 

If you have a graceful shutdown process that takes more than a hundred milliseconds or so, you should use `registerSleepPrepare`. You need to handle both the `registerSleepWake` and `registerSleepCancel` to turn your external peripheral back on if you use `registerSleepPrepare`.


### registerSleepCancel - EdgeSleep

```cpp
// PROTOTYPE
int registerSleepCancel(SleepCallback callback);

// EXAMPLE
EdgeSleep::instance().registerSleepCancel(myCallback);
```

Register a callback to be called immediately after cancelling sleep.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

If you powered down external hardware in the `registerSleepPrepare` callback, you should undo that operation here and power it back on, as the device will resume normal execution when sleep is canceled.

### registerSleep - EdgeSleep

```cpp
// PROTOTYPE
int registerSleep(SleepCallback callback);

// EXAMPLE
EdgeSleep::instance().registerSleep(myCallback);
```

Register a callback to be called immediately prior to going to sleep. You can register the same function for more than one purpose and use the `reason` field of the context to determine what occurred.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

You should avoid doing any lengthy operations in the `registerSleep` callback. You cannot cancel sleep from this callback, and you cannot change the sleep duration from this callback.

If you are powering down an external peripheral and the operation is fast, such as changing a GPIO that controls a MOSFET or load switch, you can do that safely from the `registerSleep` callback.

### registerWake - EdgeSleep

```cpp
// PROTOTYPE
int registerWake(SleepCallback callback);

// EXAMPLE
EdgeSleep::instance().registerWake(myCallback);
```

Register a callback to be called immediately after waking from sleep.

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

If you powered down external hardware in the `registerSleepPrepare` or `registerSleep` callback, you should undo that operation here and power it back on. 

Monitor Edge sleep uses `ULTRA_LOW_POWER` mode, so execution continues after sleep with variables intact. It does not run `setup()` again.

### registerStateChange - EdgeSleep

```cpp
// PROTOTYPE
int registerStateChange(SleepCallback callback);

// EXAMPLE
EdgeSleep::instance().registerStateChange(myCallback);
```

Register a callback to be called immediately after sleep state change. You can find out the state being transitioned into using the `context.reason` field, which will be one of:

  - `EdgeSleepReason::STATE_TO_CONNECTING` for state change handlers, entering the CONNECTING state.
  - `EdgeSleepReason::STATE_TO_EXECUTION` for state change handlers, entering the EXECUTION state.
  - `EdgeSleepReason::STATE_TO_SLEEP` for state change handlers, entering the SLEEP state.
  - `EdgeSleepReason::STATE_TO_SHUTDOWN` for state change handlers, entering the SHUTDOWN state (about to enter shipping mode).

Returns `SYSTEM_ERROR_NONE` (0) on success, or a non-zero error code.

## User LED

There are two "user" LEDs, however LED rgb1 (the top one), defaults to being the GNSS lock indicator.

You can, however, use rgb2 (the bottom one), for your own use. To do this, obtain the rgb2 instance using 
`MonitorOneUserLed::instance().get_rgb2_instance().` and then use one of the methods of the `ADP8866_RGB` class.


### color - ADP8866_RGB

```cpp
// PROTOTYPE
void color(uint8_t r, uint8_t g, uint8_t b);

// EXAMPLE
MonitorOneUserLed::instance().get_rgb2_instance().color(0,128,0);
```

Set the color of the LED using red, green, and blue values (0-255). Note that there are `on()` and `off()` methods; you should turn the LED off instead of setting the color to black (0, 0, 0);

### setColor - ADP8866_RGB

```cpp
// PROTOTYPE
void setColor(uint32_t color);
```
Set the color of the LED using a single 24-bit value 0x00RRGGBB in a uint32_t. Note that there are `on()` and `off()` methods; you should turn the LED off instead of setting the color to black (0x00000000).


### brightness - ADP8866_RGB

```cpp
// PROTOTYPE
void brightness(uint8_t brightness, bool update = true);

// EXAMPLE
MonitorOneUserLed::instance().get_rgb2_instance().brightness(80);
```

Sets the brightness from 0 (minimum) to 255 (maximum). The default is maximum.

### off - ADP8866_RGB

```cpp
// PROTOTYPE
void off();
```

Turns the LED off.

### on - ADP8866_RGB

```cpp
// PROTOTYPE
void on();

// EXAMPLE
MonitorOneUserLed::instance().get_rgb2_instance().on();
```

Turns the LED on, with the same color and pattern settings it had prior to being turned off.

### toggle - ADP8866_RGB

```cpp
// PROTOTYPE
void toggle();
```

Toggles the on/off state of the LED. When toggled on the LED will have the same color and pattern settings it had prior to being turned off.

### setPattern - ADP8866_RGB

```cpp
// PROTOTYPE
void setPattern(LEDPattern pattern);

// EXAMPLE
MonitorOneUserLed::instance().get_rgb2_instance().setPattern(LED_PATTERN_FADE);
````

The `LEDPattern` uses the Device OS LED pattern codes:

| Pattern | Value |
| :--- | :---: |
| `LED_PATTERN_SOLID` | 1 |
| `LED_PATTERN_BLINK` | 2 |
| `LED_PATTERN_FADE`  | 3 |


### setPeriod - ADP8866_RGB

```cpp
// PROTOTYPE
void setPeriod(uint16_t period);
```

Set the blink or fade period in milliseconds.
