---
title: Tracker Edge Firmware
columns: two
layout: tutorials.hbs
order: 30
description: Particle Tracker Edge Firmware
---

# Tracker Edge Firmware

One difference between the Tracker One and other Particle devices is that the Tracker One firmware can be used in three different ways:

- Completely off-the-shelf. With its cloud-based configuration, you can use the firmware as-is with no modifications in some cases.
- Semi-custom. The Tracker One firmware is customizable on-device making it possible to add new sensors and customize behavior while still making it easy to upgrade the base firmware.
- Custom. The Tracker One firmware is open-source so you can duplicate and modify it ("fork") for completely custom applications. Or build your own completely from scratch.

The [Tracker Edge Firmware API Reference](/reference/asset-tracking/tracker-edge-firmware/) is also available.

### Using Device OS 1.5.3 in Workbench

Tracker devices currently requires Device OS 1.5.3 or later, and version 1.5.3 is not available in the Web IDE or CLI compilers. If you would like to develop custom tracker firmware you will need to use Particle Workbench with the Device OS from source option.

- Get the latest Device OS source from GitHub. You'll need to have the command line version of git available in order to retrieve the submodules.

```
git clone git@github.com:particle-iot/device-os.git
cd ./device-os
git checkout release/v1.5.3-tracker.1
git submodule update --init --recursive
```

- Launch Visual Studio Code
- Navigate to your Particle settings (docs) and set the Custom Device OS Location

![Custom Device OS Settings](/assets/images/settings-custom-deviceos-location.png)

- Enter the absolute path to your Device OS source code and reload when prompted
- Open a Particle project and open a source file
- Click on the Device OS entry in the status bar to display a list of available toolchains


![Status Bar](/assets/images/statusbar-project-settings.png)

- Select the deviceOS@source entry - it should be first in the list
- Wait for the toolchain to install and activate


## Getting the Tracker Edge Firmware

**TODO: To be determined**


## Overview

A typical main source file looks like this:

```cpp
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

This doesn't look like much, but a lot of stuff happens behind the scenes and is cloud-controllable:

- Publishing location periodically, or when movement larger than a specified radius occurs
- Publishing on movement sensed by the IMU (inertial measurement unit, the accelerometer)
- Control of the RGB status LED


Digging into this:

These are some standard Tracker include files that you will likely need:

```cpp
#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"
```

This is the recommended [threading](/reference/device-os/firmware/tracker-som/#system-thread) and [system mode](/reference/device-os/firmware/tracker-som/#system-modes) to use. 

```cpp
SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);
```

Since all Tracker devices must belong to a product, you should set the product ID and version. You can either set the product ID to `PLATFORM_ID` which means use the product that the device has been added to, or you can set the product ID to your actual product ID value. The version is arbitrary, though it should be sequential and can only have value from 1 to 65535.

```cpp
PRODUCT_ID(PLATFORM_ID);
PRODUCT_VERSION(1);
```

This block is optional, but sets the logging level. It's sets it to TRACE by default, but sets a lower level of INFO for Device OS and tracker internal messages.

```cpp
SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});
```

You must declare a `TrackerCore` object in your main source file. The definition is in the tracker_core.h file. Typically you make it a global variable.

```cpp
TrackerCore tracker;
```

Setup calls `tracker.init()`. This is required! Since the sample uses `SYSTEM_MODE(SEMI_AUTOMATIC)` you should call `Particle.connect()` at the end of `setup()`.

You can add your own code to `setup()` as well.

```
void setup()
{
    tracker.init();

    Particle.connect();
}
```

The `loop()` function must always call `tracker.loop()`. You should do this on every loop.

You can add your own code to loop, however you should avoid using `delay()` or other functions that block. If you would like to publish your own events (separate from the location events), you can use the Tracker cloud service to publish safely without blocking the loop.

```cpp
void loop()
{
    tracker.loop();
}
```



## Adding to the location event

It's easy to add additional data to the location event. For example, if you wanted to include the speed in the location event, along with the GNSS position information, you could modify the sample above to be like this (beginning lines omitted in the code below but are still required):


```cpp
void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

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

void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    writer.name("speed").value(point.speed, 2);
}

```

Note the additions:

- Calls `tracker.location.regLocGenCallback()` to register a location generation callback in `setup()`.
- Adds a new function `locationGenerationCallback()`.
- In the function adds a value to the loc object using the [JSON Writer API](/reference/device-os/firmware/tracker-som/#jsonwriter).

If you look at the location event, you can see the new field for `speed` (in meters/second):

```json
{
    "cmd":"loc"
    "time":1592486562
    "loc":{
        "lck":1
        "time":1592486563
        "lat":42.469732
        "lon":-75.064801
        "alt":321.16
        "hd":122.29
        "h_acc":6.7
        "v_acc":12
        "speed":0.05
    }
    "trig":[
        "time"
    ]
    "req_id":4
}
```

You can add more than one value, and you can also add JSON objects and arrays.

Initially this will not be shown in the map view, but is a possible future enhancement. It is stored, even though it's not visible on the map.

To check the latest data on a device, you can query the Cloud API using the curl command. In order to do this you will need:

- Your product ID. Replace `1234` in the command below with your product ID.
- A product access token. Replace `903a7ab752f2dcf8ed8ffffffffffff24b467131` in the command below with your access token (see below). 
- The device ID you want to query. Replace `e00fce68ffffffffff46f6` in the command below with the device ID (24-character hex).

```bash
curl "https://api.particle.io/v1/products/1234/locations/e00fce68ffffffffff46f6?access_token=903a7ab752f2dcf8ed8ffffffffffff24b467131"
```

This should return something like this. Note the addition of the `speed` data from our custom location event callback.

```json
{"location":{"device_id":"e00fce68ffffffffff46f6","geometry":{"type":"Point","coordinates":[-75.064801,42.469732,337.16]},"product_id":9754,"last_heard":"2020-06-18T14:04:43.000Z","gps_lock":true,"timestamps":["2020-06-18T14:04:43.000Z"],"properties":[{"hd":214.36,"h_acc":4.3,"v_acc":10,"speed":0.04}],"device_name":"Test-TrackerOne","groups":[]},"meta":{}}
```

One easy way to get a temporary access token is to:

- Open the [console](https://console.particle.io).
- Open your Tracker product.
- Click on **Devices**.
- Open your device.
- In the **Events** tab, click on **View events from a terminal** (it's a button).
- Copy and paste the access token from the end of the command that is displayed.
- This token is invalidated when your close the console.

## Multi-function pins

The Tracker One has three multi-function pins on the M8 port:

| M8 Pin | Function   | Function  | Function  | 
| :----: | :-------   | :-------  | :-------  | 
| 6      | Serial1 TX | Wire3 SCL | GPIO D9   | 
| 7      | Serial1 RX | Wire3 SDA | GPIO D8   | 
| 8      | Analog A3  |           | GPIO D3   | 

If you enable `Serial1` you cannot use the pins for I2C or GPIO.

```cpp
Serial1.begin(9600);
```

If you enable `Wire3` you cannot use the pins for Serial or GPIO.

```cpp
Wire3.begin();
```

This feature is also available on the Tracker SoM, however on the Tracker SoM you have access to `Wire` on pins D0 an D1, so there is less of a need to use `Wire3`. Note that they map to the same I2C peripheral so you cannot use `Wire` and `Wire3` at the same time!

If you do not enable `Serial1` or `Wire3`, you can use the pins are regular GPIO, including all [pin modes](/reference/device-os/firmware/tracker-som/#pinmode-), `INPUT`, `INPUT_PULLUP`, `INPUT_PULLDOWN`, and `OUTPUT`.

## Learn More 

- The [Tracker Edge Firmware API Reference](/reference/asset-tracking/tracker-edge-firmware/) has more information on the available APIs.
- The [Tracker Eval Board I2C Example](/tutorials/asset-tracking/tracker-eval-tutorials/#i2c-sensor-example) shows how to add I2C sensor data to your location publishes.

