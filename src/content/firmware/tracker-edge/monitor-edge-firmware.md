---
title: Monitor Edge firmware
columns: two
layout: commonTwo.hbs
description: Monitor Edge firmware
includeDefinitions: [api-helper, api-helper-config, api-helper-json, api-helper-tracker, codemirror, showdown, zip]
---

# {{title}}


One difference between the Monitor One and other Particle devices is that the Monitor Edge firmware can be used in three different ways:

- Completely off-the-shelf. With its cloud-based configuration, you can use the firmware as-is with no modifications in some cases.
- Semi-custom. The Monitor Edge firmware is customizable on-device making it possible to add new sensors and customize behavior while still making it easy to upgrade the base firmware.
- Custom. The Monitor Edge firmware is open-source so you can duplicate and modify it ("fork") for completely custom applications. Or build your own completely from scratch.

The [Monitor Edge Firmware API Reference](/firmware/tracker-edge/monitor-edge-api-reference/) is also available.

| | Monitor One | Tracker One | Tracker Eval Board | Tracker SoM |
| :--- | :---: | :---: | :---: | :---: |
| Form-factor | Assembled | Assembled | Evaluation board | SMD component |
| Power | M12 connector | M8 or USB-C | USB-C or barrel | 6 - 17 VDC |
| Firmware | Monitor Edge | Tracker Edge | Tracker Edge | Tracker Edge |
| MCU | Tracker SoM | Tracker SoM | Tracker SoM | Tracker SoM |
| Platform | tracker (26) | tracker (26) | tracker (26) | tracker (26) |

{{note op="start" type="note"}}
This page is for the Monitor One. If you are using the Tracker One, see [Tracker Edge](/firmware/tracker-edge/tracker-edge-firmware/).
{{note op="end"}}



{{> sso}}

## Configuration schema

The configuration schema specifies all of the elements that can be cloud-configured via the [Particle console](https://console.particle.io/). The panels vary depending on whether the product is a Tracker One or Monitor One product. You can also customize the panels with options specific to your product.

If you are using the Monitor One, you need to upload a configuration schema to change the console panels from 
the standard Tracker One options to Monitor One options. You can do this with a couple clicks in the 
[configuration schema tool](/tools/cloud-tools/configuration-schema/) or the off-the-shelf release tool, below.

For more information about the console settings, see [Monitor One settings](/getting-started/console/console/#monitor-one-settings).

{{!-- BEGIN do not edit content below, it is automatically generated 40b06c67-b4eb-4be9-b9c2-539ac2f68dbd --}}


### Modbus RS-485 tab

Configuration for Modbus RTU with RS-485.
*Added in version 2*

#### RS-485 Baud configuration

Baud rate to operate the RS-485 bus.

#### RS-485 Parity Bits configuration

Specifies partiy type used for the RS-485 bus.

#### Modbus Inter Message Delay configuration

Delay between the last Modbus response and the next transmission in milliseconds.  This is used for rate limiting transactions.

### Modbus Polling 1 tab

Configuration for polling a Modbus server ID.
*Added in version 2*

#### Modbus Server Enable configuration

If enabled, poll the given Modbus server address.

#### Modbus Server ID configuration

The remote device server ID (also known as slave ID). Range: 1-255.

#### Modbus Timeout configuration

Allowable time to wait for a response in milliseconds. Range: 0-10000.

#### Polling Interval configuration

Defines the frequency (in seconds) in which the register will be polled and results published.

#### Publish polled value configuration

Select when to publish the polled value.

#### Modbus Function configuration

Type of read function.

#### Register Address configuration

Address to read from, zero based. Range: 0-65535.

#### Modbus data type configuration

Type of data being read.

#### Mask Value configuration

16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.

#### Shift Value configuration

Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.

#### Offset Value configuration

Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).

#### Scaling Value configuration

Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).

### Modbus Polling 2 tab

Configuration for polling a Modbus server ID.
*Added in version 2*

#### Modbus Server Enable configuration

If enabled, poll the given Modbus server address.

#### Modbus Server ID configuration

The remote device server ID (also known as slave ID). Range: 1-255.

#### Modbus Timeout configuration

Allowable time to wait for a response in milliseconds. Range: 0-10000.

#### Polling Interval configuration

Defines the frequency (in seconds) in which the register will be polled and results published.

#### Publish polled value configuration

Select when to publish the polled value.

#### Modbus Function configuration

Type of read function.

#### Register Address configuration

Address to read from, zero based. Range: 0-65535.

#### Modbus data type configuration

Type of data being read.

#### Mask Value configuration

16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.

#### Shift Value configuration

Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.

#### Offset Value configuration

Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).

#### Scaling Value configuration

Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).

### Modbus Polling 3 tab

Configuration for polling a Modbus server ID.
*Added in version 2*

#### Modbus Server Enable configuration

If enabled, poll the given Modbus server address.

#### Modbus Server ID configuration

The remote device server ID (also known as slave ID). Range: 1-255.

#### Modbus Timeout configuration

Allowable time to wait for a response in milliseconds. Range: 0-10000.

#### Polling Interval configuration

Defines the frequency (in seconds) in which the register will be polled and results published.

#### Publish polled value configuration

Select when to publish the polled value.

#### Modbus Function configuration

Type of read function.

#### Register Address configuration

Address to read from, zero based. Range: 0-65535.

#### Modbus data type configuration

Type of data being read.

#### Mask Value configuration

16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.

#### Shift Value configuration

Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.

#### Offset Value configuration

Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).

#### Scaling Value configuration

Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).

### IO tab

Configuration for Inputs and Outputs.

#### 0-10V Voltage Input configuration

Configuration for 0-10V scaling.

##### Sensor low scaling configuration

Scaling applied to calibrated voltage inputs to scale value to sensor units in application.

##### Sensor high scaling configuration

Scaling applied to calibrated voltage inputs to scale value to sensor units in application.

##### Sensor filter cutoff frequency configuration

Frequency for 3db low pass filtering of the voltage input in Hertz.

##### Threshold low comparator limit configuration

Threshold value for comparator.

##### Threshold low hysteresis configuration

Hysteresis value for comparator.

##### Threshold low enable configuration

If enabled, publish an immediate event when the lower threshold is crossed.

##### Threshold high comparator limit configuration

Threshold value for comparator.

##### Threshold high hysteresis configuration

Hysteresis value for comparator.

##### Threshold high enable configuration

If enabled, publish an immediate event when the upper threshold is crossed.

#### 4-20mA Current Input configuration

Configuration for 4-20mA scaling.

##### Sensor low scaling configuration

Scaling applied to calibrated current inputs to scale value to sensor units in application.

##### Sensor high scaling configuration

Scaling applied to calibrated current inputs to scale value to sensor units in application.

##### Sensor filter cutoff frequency configuration

Frequency for 3db low pass filtering of the current input in Hertz.

##### Threshold low comparator limit configuration

Threshold value for comparator.

##### Threshold low hysteresis configuration

Hysteresis value for comparator.

##### Threshold low enable configuration

If enabled, publish an immediate event when the lower threshold is crossed.

##### Threshold high comparator limit configuration

Threshold value for comparator.

##### Threshold high hysteresis configuration

Hysteresis value for comparator.

##### Threshold high enable configuration

If enabled, publish an immediate event when the upper threshold is crossed.

##### Threshold low fault comparator limit configuration

Threshold value, in milliamps, for fault comparator.

##### Threshold low fault hysteresis configuration

Hysteresis value, in milliamps, for fault comparator.

##### Threshold low fault enable configuration

If enabled, publish an immediate event when the lower threshold is crossed.

##### Threshold high fault comparator limit configuration

Threshold value, in milliamps, for fault comparator.

##### Threshold high fault hysteresis configuration

Hysteresis value, in milliamps, for fault comparator.

##### Threshold high fault enable configuration

If enabled, publish an immediate event when the upper threshold is crossed.

#### 24V Digital Input configuration

Configuration for optoisolated digial input.

##### Publish immediately on input change configuration

If enabled, publish an immediate event when the digital input changes.

##### Edge detection configuration

Publish on input change based on edge detected.

### IO Calibration tab

Calibration configuration for inputs.

#### 0-10V Voltage Input configuration

Configuration for 0-10V calibration.

##### Calibration gain configuration

Gain applied to raw voltage inputs to correct gain errors.

##### Calibration offset configuration

Offset applied to raw voltage inputs to correct offset errors.

#### 4-20mA Current Input configuration

Configuration for 4-20mA calibration.

##### Calibration gain configuration

Gain applied to raw current inputs to correct gain errors.

##### Calibration offset configuration

Offset applied to raw current inputs to correct offset errors.

### Location tab

Configuration for published locations.

#### Radius Trigger (meters) configuration

Publish location if it has moved this many meters from the last publish. 0 for unused.

#### Maximum location update frequency (every n seconds) configuration

Never publish location information more often than this setting.

#### Minimum location update frequency (every n seconds) configuration

Always publish location, when possible, this often

#### Minimize Data configuration

If enabled, publish minimal location with only latitude and longitude. If disabled, publish additional information including speed, heading, etc.

#### Publish on GPS lock configuration

If enabled, a change in GPS lock status will trigger a location publish, which will happen after the Minimum Interval has passed.

#### Acknowledge location publishes configuration

If enabled, the device will expect cloud acknowledgement of location publishes and retry sending if cloud is unresponsive.  If disabled, the device will publish location messages and not account for cloud acknowledgement (fire-and-forget).  See https://docs.particle.io/reference/device-cloud/api/#tracker-configuration-events for more information

#### Enhanced location configuration

If enabled, the cloud will process and send enhanced geolocation events based on GNSS, WiFi access points, and cellular tower triangulation.

#### Publish cellular tower data configuration

If enabled, the device will collect nearby cellular towers and publish details with location events.

#### Publish GNSS data configuration

If enabled, the device will utilize the GNSS module to generate and publish geolocation coordinates with location events.

#### Publish WiFi access point data configuration

If enabled, the device will collect nearby WiFi access points and publish details with location events.

#### Call back to device with enhanced location data configuration

If enabled, the cloud will send an enhanced geolocation to the device based on GNSS, WiFi access points, and cellular tower triangulation.

#### Publish extra information to assist with debugging GNSS configuration

If enabled, publish GNSS constellation counts and C/NO characteristics.

### Store and Forward tab

Configuration for Store and Forward.
*Added in version 1*

#### Store and Forward configuration

If enabled, the device will store unpublished location publishes to the local filesystem when offline and publish them when back online.

#### Storage Size Limit configuration

Size in kilobytes to limit storage on the local filesytem for unpublished messages.

#### Discard Policy configuration

When storage size limit is exceeded drop_old deletes the oldest logged publish to retry, drop_new deletes the newest

### Motion tab

Configuration for motion detection.

#### Movement Sensitivity configuration

If not disabled, device will publish location if it detects movement. Low sensitivity requires a large motion to publish.

#### High-G configuration

If enabled, device will publish location if it detects a High-G acceleration event.

### Temperature tab

Configuration for temperature thresholding.

#### High temperature threshold (Celsius) configuration

Publish location once if temperature is greater than or equal to threshold. The temperature will be required to be less than the high threshold minus hysteresis to clear event, when latching, or publish again when latching disabled.  Hysteresis must be valid.

#### High temperature monitoring configuration

If enabled, compare current temperature against high threshold.

#### High temperature event latching. configuration

Enable latching of high temperature trigger event until temperature has fallen below hysteresis level; otherwise, generate one high temperature event.

#### Low temperature threshold (Celsius) configuration

Publish location once if temperature is less than or equal to threshold. The temperature will be required to be more than the low threshold plus hysteresis to clear event, when latching, or publish again when latching disabled. Hysteresis must be valid.

#### Low temperature monitoring. configuration

If enabled, compare current temperature against low threshold.

#### Low temperature event latching. configuration

Enable latching of low temperature trigger event until temperature has risen above hysteresis level; otherwise, generate one low temperature event.

#### Hysteresis temperature threshold (Celsius) configuration

Hysteresis threshold applied to high and low thresholds to allow further temperature publishes. 0.0 for unused.

### Sleep tab

Configuration for low power operation. Supported in Asset Tracker Firmware v10 and later
*Added in version 1*

#### Sleep Mode configuration

If enabled, device will operate with low power states during inactive periods.  The device will be inaccessible while in low power states

#### Post Publish Execution Time configuration

Minimum duration, in seconds, of guaranteed execution time after publishing and before entering sleep.

#### Maximum Connecting Time configuration

Maximum duration, in seconds, to wait for a cellular connected state and GNSS lock before publish.

### Tracker tab

Configuration for Tracker specific settings

#### USB Command configuration

If enabled, device will parse incoming commands on USB.

### Device Monitoring tab

Configuration for device monitoring specific settings
*Added in version 1*

#### Device Monitoring configuration

If enabled, device will publish metrics and fault details.

### Geofence tab

Configuration for geofencing settings
*Added in version 1*

#### Wake interval (every n seconds) configuration

If device is configured for sleep, periodic interval to wake in order to evaluate geofences.

#### Zone 1 configuration

Configuration for Zone 1 settings.

##### Enable configuration

If enabled, the zone will be evaluated by the device.

##### Shape configuration

Shape of the geofence.

##### Latitude (Degrees) configuration

Latitudinal coordinate for the center point of the geofence.

##### Longitude (Degrees) configuration

Longitudinal coordinate for the center point of the geofence.

##### Radius (Meters) configuration

Defines circular area covered by the geofence.

##### Publish inside zone configuration

If enabled, publish event when the device is inside the zone.

##### Publish outside zone configuration

If enabled, publish event when the device is outside the zone.

##### Publish on enter zone configuration

If enabled, publish event when the device has entered the zone.

##### Publish on exit zone configuration

If enabled, publish event when the device has exited the zone.

##### Time Before Trigger (Seconds) configuration

Amount of time the device is inside or outside the zone before triggering an event.

#### Zone 2 configuration

Configuration for Zone 2 settings.

##### Enable configuration

If enabled, the zone will be evaluated by the device.

##### Shape configuration

Shape of the geofence.

##### Latitude (Degrees) configuration

Latitudinal coordinate for the center point of the geofence.

##### Longitude (Degrees) configuration

Longitudinal coordinate for the center point of the geofence.

##### Radius (Meters) configuration

Defines circular area covered by the geofence.

##### Publish inside zone configuration

If enabled, publish event when the device is inside the zone.

##### Publish outside zone configuration

If enabled, publish event when the device is outside the zone.

##### Publish on enter zone configuration

If enabled, publish event when the device has entered the zone.

##### Publish on exit zone configuration

If enabled, publish event when the device has exited the zone.

##### Time Before Trigger (Seconds) configuration

Amount of time the device is inside or outside the zone before triggering an event.

#### Zone 3 configuration

Configuration for Zone 3 settings.

##### Enable configuration

If enabled, the zone will be evaluated by the device.

##### Shape configuration

Shape of the geofence.

##### Latitude (Degrees) configuration

Latitudinal coordinate for the center point of the geofence.

##### Longitude (Degrees) configuration

Longitudinal coordinate for the center point of the geofence.

##### Radius (Meters) configuration

Defines circular area covered by the geofence.

##### Publish inside zone configuration

If enabled, publish event when the device is inside the zone.

##### Publish outside zone configuration

If enabled, publish event when the device is outside the zone.

##### Publish on enter zone configuration

If enabled, publish event when the device has entered the zone.

##### Publish on exit zone configuration

If enabled, publish event when the device has exited the zone.

##### Time Before Trigger (Seconds) configuration

Amount of time the device is inside or outside the zone before triggering an event.

#### Zone 4 configuration

Configuration for Zone 1 settings.

##### Enable configuration

If enabled, the zone will be evaluated by the device.

##### Shape configuration

Shape of the geofence.

##### Latitude (Degrees) configuration

Latitudinal coordinate for the center point of the geofence.

##### Longitude (Degrees) configuration

Longitudinal coordinate for the center point of the geofence.

##### Radius (Meters) configuration

Defines circular area covered by the geofence.

##### Publish inside zone configuration

If enabled, publish event when the device is inside the zone.

##### Publish outside zone configuration

If enabled, publish event when the device is outside the zone.

##### Publish on enter zone configuration

If enabled, publish event when the device has entered the zone.

##### Publish on exit zone configuration

If enabled, publish event when the device has exited the zone.

##### Time Before Trigger (Seconds) configuration

Amount of time the device is inside or outside the zone before triggering an event.


{{!-- END do not edit content above, it is automatically generated --}}





## Using off-the-shelf releases

Your Monitor One device is pre-configured with Monitor Edge firmware that you can use out of the box with no flashing of firmware necessary.

When new versions are released, you generally go through several steps that can be accomplished with the tool below:

- Select the product you want to work with. Make sure you select a Monitor One product, not an existing Tracker One product.
- Select the Edge version from the **Edge version** popup menu. The default is the newest version, which is recommended.
- Download the Edge version you wish to upgrade to and upload this to your product using the **Upload Edge firmware to product** button.
- Update the configuration schema using the **Set Configuration Schema** button.
- The upload tool only adds the firmware to the product; you will still need to release the firmware to one or more devices from the console.

{{> edge-firmware options="monitor"}}



## Development device setup

If you are going to develop firmware for the Monitor One you have to perform a few additional steps.

- Your firmware will typically be based on Monitor Edge, as outlined below. This is not a requirement and you can build your own firmware from the ground-up, however you will not have the cloud configuration, location event support, and the libraries for the GNSS (GPS), IMU (accelerometer), CAN bus, and other Tracker-specific peripherals.
- All Tracker devices must be part of a product, as described in [setup](/getting-started/tracker/tracker-setup/).
- By default, Tracker devices are not claimed to your account. This may affect development.

### Mark as development device

- Go to the [console](https://console.particle.io).
- Open the product containing your Tracker device.
- In the Device List, click the **...** button and then **Mark development device**.

For more information, see [Development devices](/getting-started/console/development-devices/).

<img src="/assets/images/development-devices/mark-development-device.png"
alt="Mark development device" class="small"/>


### Claiming the device

By default, Tracker devices are not claimed to your account. This will affect the workflow in Workbench and there are two options:

#### Leave unclaimed

You can choose to leave your device unclaimed, however:

- When prompted to select the Tracker device you want to work with, will need to specify it by Device ID (24 character hex) or hit Esc and manually put the Tracker in DFU mode (blinking yellow) using the buttons on the device.

- You will not be able cloud flash (OTA) an unclaimed product device from the Particle CLI or Workbench.

#### Claim

Or you can claim the device to your account. You can do so with the Particle CLI.

- Get the device ID of the tracker. It will be displayed in the device list where you marked the device as a development device, above.

- Use the Particle CLI command:

```
particle device add <device-id>
```

Replace &lt;device-id> with the 24-character hex device ID.

## Getting the Monitor Edge firmware

{{note op="start" type="note"}}
This page is for the Monitor One. If you are using the Tracker One, see [Tracker Edge](/firmware/tracker-edge/tracker-edge-firmware/).
{{note op="end"}}

The Monitor Edge firmware can be downloaded from GitHub:

[https://github.com/particle-iot/monitor-edge](https://github.com/particle-iot/monitor-edge)

Unlike Tracker Edge, Monitor Edge does not use git submodules and does not require additional commands to be issued after cloning or downloading the source.

- Open Particle Workbench.
- From the command palette, **Particle: Import Project**.
- Run **Particle: Configure Workspace for Device**, select version 3.3.0 or later, Tracker, and your device.
- Run **Particle: Flash application (local)**.

Make sure you've used the [**Mark As Development Device**](/getting-started/console/development-devices/) option for your Tracker device in your Tracker product. If you don't mark the device as a development device it will be flashed with the default or locked product firmware version immediately after connecting to the cloud, overwriting the application you just flashed.

## Overview

A typical main source file looks like this:

```cpp
/*
 * Copyright (c) 2023 Particle Industries, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

This doesn't look like much, but a lot of stuff happens behind the scenes and is cloud-controllable:

- Publishing location periodically, or when movement larger than a specified radius occurs
- Publishing on movement sensed by the IMU (inertial measurement unit, the accelerometer)
- Control of the RGB status LED


Digging into this:

These are some standard Monitor Edge include files that you will likely need:

```cpp
#include "Particle.h"
#include "edge.h"
```

This is the recommended [threading](/reference/device-os/api/system-thread/system-thread/) and [system mode](/reference/device-os/api/system-modes/system-modes/) to use. 

```cpp
SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);
```

Since all Tracker devices must belong to a product, you should set the version. The `EDGE_PRODUCT_ID` is not necessary when targeting Device OS 4.0 or later.

```cpp
#if EDGE_PRODUCT_NEEDED
PRODUCT_ID(EDGE_PRODUCT_ID);
#endif // EDGE_PRODUCT_NEEDED
PRODUCT_VERSION(EDGE_PRODUCT_VERSION);
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

Setup calls `Edge::instance().init()`. This is required! Since the sample uses `SYSTEM_MODE(SEMI_AUTOMATIC)` you should call `Particle.connect()` at the end of `setup()`.

You can add your own code to `setup()` as well.

```cpp
void setup()
{
    Edge::instance().init();
}
```

The `loop()` function must always call `Edge::instance().loop()`. You should do this on every loop.

You can add your own code to loop, however you should avoid using `delay()` or other functions that block. If you would like to publish your own events (separate from the location events), you can use the Edge cloud service to publish safely without blocking the loop.

```cpp
void loop()
{
    Edge::instance().loop();
}
```

For more information about the reason for using `Edge::instance()` and the singleton pattern, see application note [AN034 singleton pattern](/firmware/software-design/singleton/).

## Customization

You can add your own source code in `main.cpp` if desired, as there is very little that will change between version of Monitor Edge.

The `user_setup.cpp` file, however, is where most of the changes will be made. The implementation of the features of your expansion card go there, for example.

### buttonHandler

You can implement single-tap, multi-tap, and long press of the user button that's available outside the enclosure. The default implementation
uses it to display the cellular signal strength on the status LED on short press. You can, however, replace the contents of this function 
to do other things instead.

Note that a very long press of greater than approximately 10 seconds causes a hardware reset of the Monitor One, so be careful to not do that accidentally.

## Sending commands

When viewing a device in the console, in the functions and variables area on the right, is the **cmd** box.

<div align=center><img src="/assets/images/tracker/tracker-enter-shipping.png" class="small"></div>

Some commands you can enter into the box:

| Command | Purpose |
| :------ | :--- |
| `{"cmd":"enter_shipping"}` | Enter shipping mode |
| `{"cmd":"get_loc"}` | Gets the location now (regardless of settings) |
| `{"cmd":"reset"}` | Gracefully reset the device |

Shipping mode powers off the device by disconnecting the battery. This allows a Monitor One to be shipped in a way that the battery does not discharge without having to open the case and disconnect the battery. Note that you can only get out of shipping mode by powering the device from the M12 8-pin connector.

It's also possible to [create custom `cmd` handlers](/firmware/tracker-edge/monitor-edge-api-reference/#regcommandcallback-cloudservice). These can be used instead of creating a custom Particle function handler and make it possible to add more than 12 handlers and automatically decode JSON arguments to the cmd handler.

On a successful cmd request, the result is 0. A result of -22 indicates the JSON is invalid. 


## Using GitHub with Monitor Edge

[GitHub](https://github.com/) is a tool for source code control, issue, and release management. It's great for managing Particle projects in Workbench. For many uses, it's free, too. There are many features, entire books, and tutorials about [Git](https://git-scm.com/) (the underlying source code control system) and GitHub (a service that allows you to store files in the cloud). This is just an overview.

Source code control allows you to have a secure record of all of the changes you've made to the source over time. You can roll back to previous versions and compare versions. It also makes sure you have a copy of all of your source separate from your computer, in case something happens to it.

Sign up for a [GitHub](https://github.com/) account if you have not already done so. You will select a username at this point, which will be your primary method of identification, not your email address. Your username will be shown publicly in many instances, so keep that in mind.

Most operations are centered around a **repository**. In many cases, each repository will be a single project. However, in some cases you might want to store multiple Particle firmware projects in a single repository when they are related. For example, if you were writing Bluetooth LE (BLE) communication software, one firmware might be for the central role and one might be the peripheral role, but since they're both part of one project you'd store the source in a single repository.

Each repository can be **public** or **private**. If you are creating an open-source project or library, **public** typically used. Using GitHub **teams** multiple users can access private repositories. Everyone working on a project should always have their own GitHub account; you should never share an account.

While you can download code from the GitHub website, you will probably want to install a [desktop GitHub client](https://desktop.github.com/) on your computer. You should install both the graphical and command line options. 

There is also support for GitHub built into Visual Studio Code (Particle Workbench), but it uses your computer's GitHub desktop installation so you still need to install a desktop client.

### Creating a mirror

In the example above we just use **Clone** to make a private copy of the source on your computer. There is another option that is more common when working with Monitor Edge projects: **Mirror**. A mirror allows you to make a private copy of a repository and link the two, so you can later merge any changes in the original with your changes! This is a power user feature, so you'll need to use some command-line git commands to make it work.

![Create repository](/assets/images/workbench/github-create-repo.png)

Create a new GitHub repository in your account. In this case, I created **mon-test1** and made it a private repository. Since we're going to mirror, it's not necessary to create a README or LICENSE.

```bash
git clone --bare https://github.com/particle-iot/monitor-edge.git
cd monitor-edge.git
git push --mirror https://github.com/rickkas7/mon-test1.git
```

Run the commands to mirror the changes into the repository you just created. Be sure to change the last URL to match the URL for your repository!

At this point you can delete the monitor-edge.git directory as it's no longer needed.

```bash
git clone https://github.com/rickkas7/mon-test1.git
```

Make a clone of your repository and initialize the submodules. You can also use the desktop Github client instead of the command line, however you will eventually need to use the command line.

Open your project in Workbench:

  - Open Particle Workbench.
  - From the command palette, **Particle: Import Project**. Select the project.properties file in the mon-test1 directory.
  - Run **Particle: Configure Workspace for Device**, select version 3.3.0, or later, Tracker, and your device. 
  - Run **Particle: Compile and Flash**.

Now that you have a mirror, you're free to do things like update main.cpp and even edit the other Monitor Edge source as desired. When you **Stage**, **Commit** and **Push**, the changes will be saved to your own GitHub private repository only.

```bash
cd mon-test1
git remote add official https://github.com/particle-iot/monitor-edge.git
```

Link the two repositories. This makes it possible to merge changes from the official version later on, when new versions of Monitor Edge are released. This merge is smart, so it won't overwrite your changes if there are no conflicts, but if both you and Particle changed the same lines of source, this may be flagged as a conflict and you will need to manually figure out which to keep. You only need to run this command once.

```
cd mon-test1
git pull official develop
```

This is how to merge updates from the official repository into yours. When a new version of Monitor Edge is released, you run a command to pull the changes from that release into your repository. You then resolve any conflicts and then push the changes to your repository. The steps are:

- **Pull** the changes from the official repository
- Resolve any conflicts
- **Push** the merged changes to your repository.

```
cd mon-test1
git pull official release/v1
```

If you prefer, you can merge to a specific release instead of develop.

### Making a source code change

![GitHub Stage and Commit](/assets/images/workbench/github-stage.png)

Once you've made some source changes and tested them, you might want to **Commit** and **Push** these changes. 

- Before you can commit you need to **Stage** your changes, which lets Git know you indeed want to upload all of these changes. The easiest way is to click on the **Stage All Changes** (1) + button. It's hidden by default but will appear if you hover over the spot.

- Enter a commit message in the box (2). This can be a reminder of why you made the change.

- Click the **Commit** icon (3) (check mark). This saves a record of the changes, but the changes still only live on your computer.

For personal projects like this you will typically just push to master. This sends the data to the GitHub servers. For more complex projects with team members, code reviews, etc. you will likely use a more complex process of **Pull Requests** instead.

- Click on the **...** (Views and More Actions) at the top of the Source Control tab. Select **Push**. 

Now the changes should be visible on the GitHub web site. Also if other team members **Fetch** and **Pull** the project they'll get your latest changes.

To summarize:

  - **Stage** indicates this file should be committed
  - **Commit** marks all of the changes are ready to go as one package of changes
  - **Push** uploads the package of changes to GitHub


## Learn more 

- The [Monitor Edge Firmware API Reference](/firmware/tracker-edge/monitor-edge-api-reference/) has more information on the available APIs.
