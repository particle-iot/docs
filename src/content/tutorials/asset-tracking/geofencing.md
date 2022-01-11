---
title: Geofencing
columns: two
layout: commonTwo.hbs
description: Geofencing
includeDefinitions: [api-helper, api-helper-config, api-helper-json, api-helper-tracker, codemirror, zip]
---

# Geofencing

Particle Edge Geofencing is an Asset Tracker feature that enables customers to create virtual geographic boundaries and evaluate entries and exits from the zone.

![Geofence graphic](/assets/images/tracker/geofence.png)

- Geofence evaluation on the device replaces the need to publish high frequency location data for evaluation in the cloud, therefore minimizing cellular costs. Geofence evaluation occurs in the field even when cellular connection is unstable.
- Geofence zones can be configured in Particle Console or by third party applications via Particle Cloud API. For devices in sleep mode, Geofence settings will sync to the device as soon as it is available to receive it.

Some common use cases:

- Theft detection, by triggering if a tracked item leaves a geofenced location
- Destination tracking, by triggering when a tracked item arrives the geofenced location of its destination

{{> sso}}

## Processing location data

Geofencing events are provided as part of the [Tracker location event](/reference/device-cloud/api/#tracker-location-events). 

There are additional values that can be included in the `trig` array that indicate the reason geofence status:

- `outside1` The device is currently outside of geofence zone 1 (and inside trigger is enabled)
- `inside1` The device is currently outside of geofence zone 1 (and outside trigger is enabled)
- `enter1` The device has entered geofence zone 1 (and enter trigger is enabled)
- `exit1` The device has exited geofence zone 1 (and exit trigger is enabled)
- `outside2`, `inside2`, `enter2`, and `exit2`
- `outside3`, `inside3`, `enter3`, and `exit3`
- `outside4`, `inside4`, `enter4`, and `exit4`

Thus geofence data can be processed by any methods used to handle location events, including:

- [Webhooks](/tutorials/device-cloud/webhooks/)
- Other integrations such as [Google Cloud Platform](/tutorials/integrations/google-cloud-platform/)
- The [Server Sent Events Stream](/reference/device-cloud/api/#product-event-stream)
- [Querying historical location data](/reference/device-cloud/api/#location)


## Console configuration

Configuration of Geofence settings can be done from the console on a per-device basis, [as described in the console documentation](/tutorials/device-cloud/console/#geofence-settings).

{{imageOverlay src="/assets/images/tracker/geofence-settings.png" alt="Geofence Settings" }}

Geofence support is part of the [Tracker configuration schema](/tutorials/asset-tracking/tracker-configuration/). If you are using the default schema, it will automatically be enabled for you, however if you are using a custom schema, the feature will not be available in the console until you merge the geofence options into your custom schema. You must do this manually and update your product schema; schema changes are never automatically merged.

## API configuration

In many cases, you will want to programmatically update geofence settings. The geofence settings are part of the standard configuration along with other settings, and are set in the same way.

You will likely need to:

- [Get device configuration](/reference/device-cloud/api/#get-device-configuration)
- [Set device configuration](/reference/device-cloud/api/#set-device-configuration)


The geofence settings are at the same level as the other settings such as location, imu_trig, and sleep, and include:

| | | | | | |
| :--- | :--- | :--- | :--- | :--- | :--- |
| geofence | | | | Geofence settings | |
| | interval | | | Wake interval (every n seconds) | integer |
| | | zone1 | | Configuration for Zone 1 settings | |
| | | | enable | Enable zone 1 configuration | boolean (true or false) |
| | | | shape_type | Shape of the geofence | "circle" |
| | | | lat | Latitude (Degrees) | number -180.0 to 180.0 |
| | | | lon | Longitude (Degrees) | number -90.0 to 90.0 |
| | | | radius | Radius (Meters) | number |
| | | | inside | Publish inside zone | boolean (true or false) |
| | | | outside | Publish outside zone | boolean (true or false) |
| | | | enter | Publish on enter zone | boolean (true or false) |
| | | | leave | Publish on exit zone | boolean (true or false) |
| | | | verif | Time Before Trigger (Seconds) | integer |
| | | zone2 | | Configuration for Zone 2 settings | |
| | | | enable | Enable zone 2 configuration | boolean (true or false) |
| | | | ... | | |
| | | zone3 | | Configuration for Zone 3 settings | |
| | | | ... | | |
| | | zone4 | | Configuration for Zone 4 settings | |
| | | | ... | | |


When managing per-device configuration:

- The set configuration endpoint requires the whole configuration, not just changes, so you will likely always want to read, modify, then write configurations. 
- An entire top-level module (location, imu_trig, sleep, etc.) can be omitted if all of the settings should use the product default settings). 
- There are no product default settings for geofence.

Tracker devices with device level only configuration (such as geofencing) and devices that are marked as development devices can have per-device configuration. In addition to using the console or curl, above, this tool makes it easy to view and edit the configuration in JSON format:


{{> tracker-config row="6" cols="70"}}

This will only show the modules that different than the product default. If the device is not a development device and geofence has not been configured yet, it will show No custom configuration; this is normal.

