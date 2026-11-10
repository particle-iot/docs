---
title: Tracker One configuration
columns: two
layout: commonTwo.hbs
description: Tracker One configuration
---


All Asset Tracker devices are intended to be used in a product, not as developer devices. This makes it easy to manage a fleet of asset trackers, allowing per-fleet and per-device configuration settings, and features like fleet mapping. The Product Features in the previous section also apply to Tracker devices.


### Map

{{imageOverlay src="/assets/images/tracker/map-view.png" alt="Map view" }}

The map view shows your fleet of devices or selected devices on a map. The Map view is available for Asset Tracker products in the **Maps** icon.

![Map Icon](/assets/images/tracker/map-icon.png)

You can show a subset of your devices on the map by searching:

- By Device ID
- By Device Name
- By [Device Groups](/getting-started/console/device-groups/)

{{!-- 
You can also search by the last known location, or within a certain time range.

![Map Search](/assets/images/tracker/map-search.png)
--}}

Each device has an overview available.

{{imageOverlay src="/assets/images/tracker/device-overview.png" alt="Device overview" }}

And view details about a specific device:

![Details](/assets/images/tracker/details.png)

On the Tracker One the temperature ("temp") is shown in degrees Celsius. This is the temperature on the board, within the enclosure, and will typically be several degrees warmer than the ambient temperature.

#### Accuracy circle

While GNSS is generally accurate, there can be uncertainty to the exact location when using cellular
tower geolocation. There can also be uncertainty with Wi-Fi, and in some cases with GNSS if a 
a full set of satellites is not visible.

When zooming into the map, a circle indicates the radius of uncertainty; the device could be anywhere 
within the circle; it's exact location is not known.

![Accuracy circle](/assets/images/tracker/accuracy-circle.png)


### Configuration settings

Your Tracker devices are intended to, in general, be configured with fleet-wide settings that are used for all devices in your fleet. The fleet-wide settings are available in Configuration - Typed Configuration in the left-hand navigation bar.

{{imageOverlay src="/assets/images/console/product-configuration-tracker-one.png" class="no-darken"}}

Note that the settings are automatically synchronized with the device, even if the device is asleep or disconnected at the time the change is made. When the device connects to the cloud again, the checksum of the current device and cloud settings are compared, and if they are different, an updated configuration is sent to the device.

Additionally, the Geofence settings are always per-device, with no fleet-wide default. It's also possible to have per-device configuration for your own custom settings. The per-device settings are within the device configuration, and do not appear in the fleet settings.

Finally, when a device is marked as a Development Device, all configuration fields can be configured per-device, and these can override the fleet settings. Development devices also do not get automatic fleet firmware updates.


#### Location settings

{{imageOverlay src="/assets/images/tracker/settings-1.png" alt="Location Settings" }}

The Location settings include:

- **Radius Trigger** in meters, floating point. When the current position's distance from the last publish exceeds this distance, the new position is published. 0.0 means do not use a publish radius. The GNSS is not monitored during sleep mode, and the radius will only be checked when otherwise waking from sleep. The maximum location update frequency still limits how frequently publishes occur even if the radius trigger is reached.

| US Units | Meters |
| :--- | :--- |
| 1 yard (3 feet) | 0.91 meters (approximately 1 meter) |
| 100 feet | 30.5 meters |
| 100 yards (length of American football field) | 91.4 meters |
| 1/4 mile | 402 meters |
| 1/2 mile | 805 meters |
| 1 mile | 1609 meters |

- **Maximum location update frequency** in seconds. Wait at least this long in seconds after the last location publish before publishing again. 0 means do not limit. The maximum location update frequency prevents publishing too frequently, which can use excessive amounts of data. 

  When using sleep modes, this also controls how often to connect to the cellular network. A maximum location update frequency value of 10 minutes (600 seconds) or larger is recommended. Setting a very short maximum location update frequency with sleep mode can cause your SIM card to be banned for excessive reconnection to the cellular network by your mobile carrier. 

- **Minimum location update frequency** in seconds. Publish location this often (in seconds) even if there is no movement or other wake trigger. 0 means do not use an minimum update frequency; only publish location information when there is another trigger, such as movement. Including a minimum location update frequency of 8 hours (28800 seconds) or 24 hours (86400) can be helpful to make sure the device is still responding and report its battery level.

In some cases, you will want to set the maximum and minimum to the same value. This is common if you are not using a trigger like movement and instead always want to publish at a fixed frequency.

| Common Unit | Seconds |
| :--- | ---: |
| 1 minute | 60 |
| 5 minutes | 300 |
| 10 minutes | 600 |
| 15 minutes | 900 |
| 30 minutes | 1800 |
| 1 hour | 3600 |
| 2 hours | 7200 |
| 4 hours | 14400 |
| 8 hours | 28800 |
| 24 hours | 86400 |


- **Minimize Data**. If checked, only latitude and longitude data is sent on each location publish. If unchecked (the default), additional information such as speed and heading are sent.

- **Publish on GPS lock**. If checked, publish location when GNSS lock is obtained, even if the device has not reached the radius trigger or maximum location update frequency yet. The minimum location update frequency is still obeyed.

- **Acknowledge location publishes**. If checked, the device will expect cloud acknowledgement of location publishes and retry failed transmissions. If unchecked, one attempt will be made to send, which may or may not succeed. If you are publishing frequently, it may be preferable to lose some points, rather than record delayed information.

- **Enhanced location**. If checked, the Particle cloud will process location fusion, enhanced geolocation using Wi-Fi access points and cellular tower information.

- **Publish cellular tower data**. If checked, the Tracker will include information about nearby cellular towers with location events.

- **Publish GNSS data**. If checked, the Tracker will use the GNSS (GPS) module for geolocation.

- **Publish Wi-Fi access point data**. If checked, the Tracker will include nearby Wi-Fi access points in location publishes. The Wi-Fi access points are not connected to; most Wi-Fi access points periodically broadcast their presence to allow Wi-Fi devices to find them. This public information is used by the Wi-Fi geolocation service.

- **Callback to device with enhanced location data**. If checked, the Particle cloud will send back enhanced geolocation data obtained from Wi-Fi or cellular tower information back to the device. This is useful if your device firmware wants to process this information on device. If you're only tracking location from the cloud, it's not necessary to enable this option.

{{!-- BEGIN do not edit content below, it is automatically generated 38cf5c3c-cd20-45a4-b87f-a541b9bbef70 --}}


##### Radius Trigger (meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius Trigger (meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish location if it has moved this many meters from the last publish. 0 for unused.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">5</td></tr>
</tbody>
</table>

##### Maximum location update frequency (every n seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/interval_min</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Maximum location update frequency (every n seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Never publish location information more often than this setting.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">900</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

##### Minimum location update frequency (every n seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/interval_max</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Minimum location update frequency (every n seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Always publish location, when possible, this often</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">3600</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">7200</td></tr>
</tbody>
</table>

##### Minimize Data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/min_publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Minimize Data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish minimal location with only latitude and longitude. If disabled, publish additional information including speed, heading, etc.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish on GPS lock configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/lock_trigger</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on GPS lock</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, a change in GPS lock status will trigger a location publish, which will happen after the Minimum Interval has passed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

##### Acknowledge location publishes configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/loc_ack</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Acknowledge location publishes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will expect cloud acknowledgement of location publishes and retry sending if cloud is unresponsive.  If disabled, the device will publish location messages and not account for cloud acknowledgement (fire-and-forget).  See https://docs.particle.io/reference/device-cloud/api/#tracker-configuration-events for more information</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Enhanced location configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/enhance_loc</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enhanced location</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the cloud will process and send enhanced geolocation events based on GNSS, WiFi access points, and cellular tower triangulation.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish cellular tower data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/tower</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish cellular tower data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will collect nearby cellular towers and publish details with location events.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish GNSS data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/gnss</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish GNSS data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will utilize the GNSS module to generate and publish geolocation coordinates with location events.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish WiFi access point data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/wps</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish WiFi access point data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will collect nearby WiFi access points and publish details with location events.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Call back to device with enhanced location data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/loc_cb</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Call back to device with enhanced location data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the cloud will send an enhanced geolocation to the device based on GNSS, WiFi access points, and cellular tower triangulation.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish extra information to assist with debugging GNSS configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/diag</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish extra information to assist with debugging GNSS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish GNSS constellation counts and C/NO characteristics.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


#### Store and forward

![Store and Forward](/assets/images/tracker/store-and-forward.png)

In Tracker Edge v18 and later, it's possible to enable store and forward mode from this panel. If the device is offline, such as from poor cellular connectivity, location publishes are saved to the device flash file system and published when connectivity is restored.

When disabled, location publishes that occur when the device does not have cellular connectivity are discarded. This makes sense if you only want to know where the device is currently, not where it has been in the past.

- **Store and forward** is enabled when the checkbox is checked. 

- **Storage Size Limit** in kilobytes. Default: 64K. While the flash file system is 4 MB, you should not use the entire file system for store and forward. Also, since publishes occur one per second when reconnecting, sending large amount of historical location data will use a lot of data operations and time.

- **Discard Policy** is **drop_old** or **drop_new** which determines whether to discard the oldest or newest location data when the storage size reaches the limit.

{{!-- BEGIN do not edit content below, it is automatically generated 192e9889-fb5c-4082-af99-19d65beadc02 --}}


##### Store and Forward configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/store/properties/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Store and Forward</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will store unpublished location publishes to the local filesystem when offline and publish them when back online.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Storage Size Limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/store/properties/quota</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Storage Size Limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Size in kilobytes to limit storage on the local filesytem for unpublished messages.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">64</td></tr>
</tbody>
</table>

##### Discard Policy configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/store/properties/policy</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Discard Policy</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">When storage size limit is exceeded drop_old deletes the oldest logged publish to retry, drop_new deletes the newest</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">drop_old</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">drop_old,<br>drop_new</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}

#### Motion settings

![Motion Settings](/assets/images/tracker/settings-2.png)

The motion settings determine how the IMU (inertial measurement unit, the accelerometer) is used to determine whether to publish a location. The **Interval minimum** also applies to motion events. Movement events can occur while the device is awake, also wake a device from sleep mode.

- **Movement** publishes if the device moves, and has several sensitivity options:

  - **Disable**: Do not use motion detection (the default).
  - **Low**: Least sensitive, large motion is required to publish.
  - **Medium**
  - **High**: Most sensitive, even a small amount of motion will trigger publish.

- **High G** publishes if there is a High-G acceleration event, such as the device falling. This is 4g for at least 2.5ms.

  - **Disable**: High-G events are not generated (the default).
  - **Enable**: High-G events are generated.

{{!-- BEGIN do not edit content below, it is automatically generated 36859bbf-9198-4f15-bf70-cd7471c84827 --}}


##### Movement Sensitivity configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/imu_trig/properties/motion</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Movement Sensitivity</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If not disabled, device will publish location if it detects movement. Low sensitivity requires a large motion to publish.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">disable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">disable,<br>low,<br>medium,<br>high</td></tr>
</tbody>
</table>

##### High-G configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/imu_trig/properties/accel</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High-G</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will publish location if it detects a High-G acceleration event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">disable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">disable,<br>enable</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}

### RGB LED Settings

![RGB LED Settings](/assets/images/tracker/settings-4.png)

The Tracker Firmware configures the RGB status LED. 

The **Type** popup menu has the following options:

- **off**: The RGB LED is turned off (dark).
- **tracker**: Color indicates signal strength (yellow = lower signal strength, green = higher signal strength). Fast breathing red while connecting to cellular.
- **particle**: Use standard Particle colors like breathing cyan instead of tracker-style colors. Default for Tracker SoM Evaluation Board.

{{!-- BEGIN do not edit content below, it is automatically generated da5553f8-b134-484e-9b04-64aa241b66dd --}}


##### Type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/rgb/properties/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Can control the LED to be off, default Particle RGB behavior or custom tracker behavior.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">particle</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">off,<br>particle,<br>tracker</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}

#### Sleep settings

![Sleep Settings](/assets/images/tracker/settings-5.png)

Sleep mode allows the device to enter a low-power state when idle, conserving battery power. Sleep requires Tracker Edge v10 and Device OS 2.0.0-rc.3 or later. There are additional details in the [Tracker Sleep](/reference/tracker/tracker-sleep/) page.

**Sleep Mode** can be set to **enable** or **disable**. 

**Post Publish Execution Time** is the minimum duration in seconds to stay awake after publishing before going to sleep. The default is 10 seconds. This provides enough time to make sure a software update can be started when waking up from sleep.

**Maximum Connecting Time** is the maximum duration, in seconds, to wait for being cellular-connected and to obtain a GNSS lock before publishing. If connecting takes too long, then the device will go back to sleep instead of continuously attempting to connect. The default is 90 seconds.

You can find out more in the [Tracker Sleep Tutorial](/reference/tracker/tracker-sleep/).

{{!-- BEGIN do not edit content below, it is automatically generated b7d34d6c-e7e3-4125-85bb-6965346098ed --}}


##### Sleep Mode configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/sleep/properties/mode</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sleep Mode</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will operate with low power states during inactive periods.  The device will be inaccessible while in low power states</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">disable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">disable,<br>enable</td></tr>
</tbody>
</table>

##### Post Publish Execution Time configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/sleep/properties/exe_min</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Post Publish Execution Time</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Minimum duration, in seconds, of guaranteed execution time after publishing and before entering sleep.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

##### Maximum Connecting Time configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/sleep/properties/conn_max</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Maximum Connecting Time</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Maximum duration, in seconds, to wait for a cellular connected state and GNSS lock before publish.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">90</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">120</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}





#### Device monitoring

![Device Monitoring](/assets/images/tracker/device-monitoring.png)

Device Monitoring publishes additional metrics and also fault (crash log) information. This can help troubleshoot problems, however it will use additional data operations.

See the [Memfault Integration](/integrations/community-integrations/memfault/) for more information.

{{!-- BEGIN do not edit content below, it is automatically generated 77fd453b-6ad4-4a69-adae-a7f31118c4ca --}}


##### Device Monitoring configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/monitoring/device_monitor</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Device Monitoring</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will publish metrics and fault details.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


#### Temperature trigger
{{!-- BEGIN do not edit content below, it is automatically generated 62c6ee9b-ac47-4a85-aeae-075c62511901 --}}


##### High temperature threshold (Celsius) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/high</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High temperature threshold (Celsius)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish location once if temperature is greater than or equal to threshold. The temperature will be required to be less than the high threshold minus hysteresis to clear event, when latching, or publish again when latching disabled.  Hysteresis must be valid.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">150</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">65</td></tr>
</tbody>
</table>

##### High temperature monitoring configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High temperature monitoring</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, compare current temperature against high threshold.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### High temperature event latching. configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/high_latch</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High temperature event latching.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Enable latching of high temperature trigger event until temperature has fallen below hysteresis level; otherwise, generate one high temperature event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Low temperature threshold (Celsius) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/low</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Low temperature threshold (Celsius)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish location once if temperature is less than or equal to threshold. The temperature will be required to be more than the low threshold plus hysteresis to clear event, when latching, or publish again when latching disabled. Hysteresis must be valid.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">-40</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

##### Low temperature monitoring. configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Low temperature monitoring.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, compare current temperature against low threshold.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Low temperature event latching. configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/low_latch</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Low temperature event latching.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Enable latching of low temperature trigger event until temperature has risen above hysteresis level; otherwise, generate one low temperature event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Hysteresis temperature threshold (Celsius) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/hyst</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Hysteresis temperature threshold (Celsius)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis threshold applied to high and low thresholds to allow further temperature publishes. 0.0 for unused.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


### Tracker settings

{{!-- BEGIN do not edit content below, it is automatically generated 77fd453b-6ad4-4a69-adae-a7f31118c4ca --}}


##### Device Monitoring configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/monitoring/device_monitor</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Device Monitoring</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will publish metrics and fault details.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


{{!-- The following catches any new schema elements --}}

{{!-- BEGIN do not edit content below, it is automatically generated 'a0a2120c-78c7-4d51-84af-062f116d70be' --}}

 

{{!-- END do not edit content above, it is automatically generated --}}



### Device settings

Geofence settings are only configurable per-device, not in the fleet settings.

Normally, for other settings, you will use the product settings across your fleet of Tracker devices. If you mark a device as a Development Device, you can change settings on a per-device basis within the Device Configuration.

![Per-Device Settings](/assets/images/tracker/per-device.png)


#### Geofence settings

{{imageOverlay src="/assets/images/tracker/geofence-settings.png" alt="Geofence Settings" }}


**Wake interval** configures how often to wake to check whether the device is inside or outside of the geofence. If no notification is required, and the Minimum location update frequency has not been met yet, then the device may go back to sleep quickly without having to connect to cellular. If zero, the geofence will only be checked when otherwise waking from sleep. If you are not using sleep modes, the wake interval is ignored.

There are up to four notification zones, each of which can have their own settings.

**Enable** turns on or off a zone, allowing it to be easily disabled.

**Shape** sets the shape. Only one shape, Circular, is supported at this time.

**Latitude (Degrees)** is the latitude of the center of the circle. This must be a decimal number (not hours, minutes, seconds), -90.0 to 90.0.

**Longitude (Degrees)** is the latitude of the center of the circle. This must be a decimal number (not hours, minutes, seconds), -180.0 to 180.0.

**Radius (Meters)** is the radius of the circle in meters (decimal).

**Publish inside zone** publishes when inside the circle, limited by the Maximum location update frequency. 

**Publish outside zone** publishes when outside the circle, limited by the Maximum location update frequency. 

**Publish on enter zone** publishes when the device moves into the circle.

**Publish on exit zone** publishes when the device moves out of the circle.

**Time Before Trigger** requires that the device be inside or outside of the zone for this many seconds before notification. This can help reduce false alarms when the device may be near the edge of the zone. 0 means notify immediately without waiting. This is an integer.

The publish on inside, outside, enter, and exit affect the `trig` array in the location event. The following values may be present in the `trig` array for geofence events. Multiple items may be present:

- `outside1` The device is currently outside of geofence zone 1 (and outside trigger is enabled)
- `inside1` The device is currently inside of geofence zone 1 (and inside trigger is enabled)
- `enter1` The device has entered geofence zone 1 (and enter trigger is enabled)
- `exit1` The device has exited geofence zone 1 (and exit trigger is enabled)
- `outside2`, `inside2`, `enter2`, and `exit2`
- `outside3`, `inside3`, `enter3`, and `exit3`


{{!-- BEGIN do not edit content below, it is automatically generated b1bb1d44-9b07-4237-ad3c-1050a7125619 --}}


##### Wake interval (every n seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Wake interval (every n seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If device is configured for sleep, periodic interval to wake in order to evaluate geofences.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">900</td></tr>
</tbody>
</table>

##### Zone 1 configuration

Configuration for Zone 1 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Zone 2 configuration

Configuration for Zone 2 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Zone 3 configuration

Configuration for Zone 3 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Zone 4 configuration

Configuration for Zone 1 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}



### Typical settings

Typical settings in common scenarios:

**Vehicle (detailed information)**

  - Radius Trigger: 151 meters (500 feet)
  - Maximum location update frequency: 30 seconds
  - Minimum location update frequency: 900 seconds (15 minutes)
  - Sleep: disabled

  This will get detailed location information, but limits the data to at most once every 30 seconds. If the vehicle is moving 24 hours a day you will exceed your 25 MB data quota, but as long as it's in movement less than half of the time you'll be within the limit. The minimum location update frequency assures that events will be published periodically when stationary, so the cellular signal and battery strength will be known.

**Vehicle (less detail)**

  - Radius Trigger: 1600 meters (1 mile)
  - Maximum location update frequency: 300 seconds (5 minutes)
  - Minimum location update frequency: 900 seconds (15 minutes)
  - Sleep: disabled

  This will provide an approximate location while using less data, for example if you are looking for the general area of the vehicle. The minimum location update frequency assures that events will be published periodically when stationary, so the cellular signal and battery strength will be known.

**Tracking an item for location and theft prevention with external power**

  - Movement: Medium
  - Maximum location update frequency: 30 seconds
  - Minimum location update frequency: 3600 seconds (1 hour)
  - Sleep: disabled
  
  If the item is moving, the location will be published every 30 seconds. This should not be used if the item will be in movement 24 hours a day, as you will exceed the 25 MB data limit. However, if it's typically not moving this will be fine. It also updates the location information every hour even when not moving.

**Tracking an item - battery only**

  - Movement: Medium
  - Maximum location update frequency: 900 seconds (15 minutes)
  - Minimum location update frequency: 28800 seconds (8 hours)
  - Sleep: enabled
  
  If the item is moving, the location will be published every 15 minutes, otherwise the device will be in sleep mode to conserve battery power. It will also update location every 8 hours even when not moving. More sleep-related examples can be found in the [Tracker Sleep Tutorial](/reference/tracker/tracker-sleep/#common-scenarios).

**Periodically sending information**

  - Maximum location update frequency: 120 seconds (2 minutes)
  - Minimum location update frequency: 120 seconds (2 minutes)
  - Sleep: disabled

  If you have additional sensors that you are monitoring, and you want to continuously send samples at set time intervals, just set the maximum.


### Data usage

A location publish uses one data operation to send the location data to the Particle cloud. If you subscribe to enhanced location events on the device, an additional data operation will be used.

You can estimate the number of data operations you will consume using this calculator. For more information on the free plan, basic plan, blocks, and data operations, see [Pricing Plans](/getting-started/cloud/introduction/#pricing).

{{> dataoperationscalc}}

{{collapse op="start" label="More information"}}

**With Location Fusion**

With Location Fusion (enhanced location) enabled, it's difficult to determine the data size, because it will be dependent on how many cellular and Wi-Fi networks are visible at your location. At the low end it's close to the size with Location Fusion disabled, at the high end it can be near 1024 bytes of payload, plus the additional overhead below.

**Without Location Fusion**

The location publish will vary in size depending on the trigger reason(s) and other factors, but this is a rough guideline.

This is a typical location publish you can see in the console. It is 209 bytes. 

```json
{"cmd":"loc","time":1596043291,"loc":{"lck":1,"time":1596043291,"lat":42.46973211,"lon":-75.06480125,"alt":322.294,"hd":214.60,"h_acc":10.000,"v_acc":16.000,"cell":40.2,"batt":99.6},"trig":["time"],"req_id":3}
```

The actual overhead is:

- 209 Location publish payload
-  40 Location publish overhead
- 231 Event confirmation and other acknowledgements

For the purposes of our calculations and to leave a bit of room for other data fields that might be present we'll assume 500 bytes per location publish.

If you're adding custom data to the publish, measure the size of your total payload as viewed in the console, then add 271 bytes (40 + 231) to see how much data your larger publish will use.

For time trigger, here are some general guidelines. These are just location publishes and do not include overhead such as connecting to the cloud, firmware updates, etc..

| Time Interval | Data Usage Per Month |
| :------------ | :------------------- |
| 1 minute      |   20 MB |
| 5 minute      |    4 MB |
| 1 hour        |  351 KB |
| 1 day         |   15 KB |

(Assumes 30 days in a month on average.)

{{collapse op="end"}}


### View device

#### Using the cmd box

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

Shipping mode powers off the device by disconnecting the battery. This allows a Tracker One to be shipped in a way that the battery does not discharge without having to open the case and disconnect the battery. Note that you can only get out of shipping mode by connecting the device to USB power or power by the M8 connector. It works on the Tracker SoM evaluation board, but is less useful there since it has physical power switches.

It's also possible to [create custom `cmd` handlers](/firmware/tracker-edge/tracker-edge-api-reference/#registercommand-cloudservice). These can be used instead of creating a custom Particle function handler and make it possible to add more than 12 handlers and automatically decode JSON arguments to the cmd handler.

On a successful cmd request, the result is 0. A result of -22 indicates the JSON is invalid. 

**Warning:** Particle has discovered an issue with GPIO current leakage through Tracker One's M8 connector that affects Tracker One v1.0 devices manufactured prior to August 31, 2020 and can adversely affect the use of shipping mode for devices that use the M8 connection to an external peripheral device. For more information see [TAN002 - Tracker One v1.0 Shipping Mode](/reference/technical-advisory-notices/tan002-tracker-one-v10-shipping-mode/).
