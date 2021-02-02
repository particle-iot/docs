---
title: Tracker Configuration
columns: two
layout: tutorials.hbs
order: 32
description: Particle Tracker Configuration
---

# Tracker Configuration

The Tracker provides a customizable configuration system:

- **Standard configuration** allows features like publish intervals, sleep settings, etc. to be configured from [the console](https://console.particle.io).
- **Customized configuration** makes it possible to extend this to your own custom parameters!

Additionally:

- **Devices that are currently online** receive the configuration updates immediately.
- **Devices that are offline**, because of poor cellular coverage or use of sleep modes, receive a configuration update when they reconnect to the Particle cloud.

Finally, you can configure:

- **Fleet-wide settings** so all devices in your product have a common setting.
- **Per-device settings** that override settings for a specific device in your product (when marked as a development device).


## Getting and setting configuration

In addition to setting values directly from [the console](https://console.particle.io), you can get and set values from the [Particle Cloud API](/reference/device-cloud/api/#configuration).

The configuration is hierarchical: 

- location
  - radius
  - interval_min
  - interval_max
  - min_publish
  - ...
- imu_trig
  - ...
- temp_trig
  - ...
- rgb
  - ...
- sleep 
  - mode
  - exe_min
  - conn max
  - ...

Using a custom schema, you can add additional configuration elements, either to an existing group (location, sleep, etc.) or to a new custom group for your product (recommended).


## Getting and setting the schema

At this time, the schema can only be set using the Particle Cloud API. Examples are provided using `curl`, a common command-line program for making API calls.


## Schemas

The configuration format is specified using [JSON Schema](https://json-schema.org/). This section is not intended to be a complete reference to writing a schema, as there is literally a whole book devoted to this, available to read online for free at the link above. This should be enough to begin writing your own custom schema, however.

The schema serves several purposes:

- Documenting the options
- Instructing the console how to display the options
- Validating the configuration

## Console

The settings panels in the fleet configuration and device configuration, including all of the built-in settings, are defined using the configuration schema:

![](/assets/images/tracker/settings-1.png)

You can also use this technique to create your own custom configuration panels!

This picture shows how elements in the schema directly map to what you can see in the console:

![](/assets/images/tracker/tracker-schema-ui.png)

It should be noted that setting a custom schema replaces the existing schema. This means that as new features are added to Tracker Edge you will want to periodically merge your changes into the latest schema so you will get any new options.

## Default Schema

This is the full schema for Tracker Edge, as of version 11. You won't need to understand the whole thing yet, but this is what it looks like:

{{codebox content="/assets/files/tracker/tracker-schema.json" format="json" height="300"}}


### Data types

The schema and support in Tracker Edge can include standard JSON data types, including:

- Boolean values (true or false, a checkbox)
- Integer values (optionally with a range of valid values)
- Floating point values (optionally with a range of valid values)
- Strings
- Enumerations (a string with fixed options, a dropdown menu)
- JSON objects (of the above types, with some limitations)

There is a limit to the size of the data, as it needs to fit in a 622-byte publish. You should keep the data of a reasonable size and avoid overly lengthy JSON key names for this reason.

## Setting the Schema

### Getting an access token

One easy way to get a temporary access token is to:

- Open the [console](https://console.particle.io).
- Open your Tracker product.
- Click on **Devices**.
- Open your device.
- In the **Events** tab, click on **View events from a terminal** (it's a button).
- Copy and paste the access token from the end of the command that is displayed.
- This token is invalidated when your close the console.

You can also generate a token using oAuth client credentials. You can adjust the expiration time using this method, including making it non-expiring.

### Backing up the schema

It's a good idea to make a backup copy of the schema before you modify it. The feature to delete the custom schema and revert to the factory default is planned but not currently implemented. 

```
curl -X GET 'https://api.particle.io/v1/products/:productId/config?access_token=:accessToken' -H 'Accept: application/schema+json'
```

- `:productId` with your product ID
- `:accessToken` with a product access token, described above.

This will return a big block of JSON data. Copy and paste this into a file for future use, if necessary.

Or, the device-specific schema for a development device:

```
curl -X GET 'https://api.particle.io/v1/products/:productId/config/:deviceId?access_token=:accessToken' -H 'Accept: application/schema+json'
```

- `:productId` with your product ID
- `:deviceId` with your Device ID that is set as a development device. 
- `:accessToken` with a product access token, described above.


## Adding to the schema

```json
{
    "$schema": "https://particle.io/draft-07/schema#",
    "$id": "https://github.com/particle-iot/tracker-edge/releases/tag/v11",
    "type": "object",
    "title": "Configuration schema for the Tracker Edge firmware from Particle",
    "$comment": "the $id field doesn't strictly mean that this schema only works with that release of tracker-edge, rather, this means that the schema here was created for that version of tracker-edge, and will work on earlier and later versions until a new schema is required.  This means that schema v10 will work with firmware v11, as long as there's no added features in v11 not already mentioned here",
    "description": "",
    "required": [
        "location"
    ],
    "properties": {
        "location": {
            "$id": "#/properties/location",
            
            [... content omitted for readability ...]

        },
        "tracker": {
            "$id": "#/properties/tracker",
            "type": "object",
            "title": "Tracker",
            "description": "Configuration for Tracker specific settings",
            "default": {},
            "properties": {
                "usb_cmd": {
                    "$id": "#/properties/tracker/properties/usb_cmd",
                    "type": "boolean",
                    "title": "USB Command Enable",
                    "description": "If enabled, device will parse incoming commands on USB.",
                    "default": true,
                    "examples": [
                        false
                    ]
                }
            }
        },
        "engine": {
            "$id": "#/properties/engine",
            "type": "object",
            "title": "Engine",
            "description": "CAN demo engine settings",
            "default": {},
            "properties": {
                "idle": {
                    "$id": "#/properties/engine/properties/idle",
                    "type": "integer",
                    "title": "Idle RPM speed",
                    "description": "If engine RPM is less than this value, the engine will be considered to be idling",
                    "default": 1600,
                    "examples": [
                    ],
                    "minimum":0,
                    "maximum":10000
                },
                "fastpub": {
                    "$id": "#/properties/engine/properties/fastpub",
                    "type": "integer",
                    "title": "Publish period when running (milliseconds)",
                    "description": "Publish period when engine is not off or idling in milliseconds (0 = use default)",
                    "default": 0,
                    "examples": [
                    ],
                    "minimum":0,
                    "maximum":3600000
                }
            }
        }
    },
    "additionalProperties": false
}            
```

Here's an example of adding a new **Engine** panel. Of note:

- Since adding a custom schema replaces the default schema, you must include all of the elements from the default schema. It does not merge the two automatically for you.
- The new **engine** block goes directly in line and below the **tracker** block, which is the last configuration block (at the time of writing).
- The new engine configuration includes two elements: Idle RPM speed and Publish period when running (milliseconds); both are integers:

### Setting a custom schema

A full example schema for the engine configuration above can be found [here](https://github.com/particle-iot/app-notes/blob/master/AN017-Tracker-CAN/testengine.json). Download this file and save it as testengine.json.

There is no UI for setting the configuration schema, you will need to set it using curl:

```
curl -X PUT 'https://api.particle.io/v1/products/:productId/config/:deviceId?access_token=:accessToken' -H  'Content-Type: application/schema+json' -d @testengine.json
```

- `:productId` with your product ID
- `:deviceId` with your Device ID that is set as a development device. 
- `:accessToken` with a product access token, described above.

To restore the normal behavior, instead of using @testengine.json, use the backup schema you saved in the previous step.

Or, for product-wide configuration:

```
curl -X PUT 'https://api.particle.io/v1/products/:productId/config?access_token=:accessToken' -H  'Content-Type: application/schema+json' -d @testengine.json
```

- `:productId` with your product ID
- `:accessToken` with a product access token, described above.


### Viewing in the console

This is what it looks like in the [console](https://console.particle.io):

![Engine Settings](/assets/images/tracker/settings-engine.png)


### Setting values using the API

You can also set the values using the API directly, such as by using curl:

```
curl -X PUT 'https://api.particle.io/v1/products/:productId/config/:deviceId?access_token=:accessToken' -H 'Content-Type: application/json' -d '{"engine":{"idle":1550,"fastpub":30000}}'
```

Be sure to update:

- `:productId` with your product ID
- `:deviceId` with your Device ID that is set as a development device. If you want to change the setting across your whole product leave off the slash and device ID.
- `:accessToken` with a product access token, described above.

This sets this configuration object:

```json
{
    "engine":{
        "idle":1550,
        "fastpub":30000
    }
}
```


## Firmware

And finally, this is how you access the data from your application firmware:

```cpp
// Configuration settings, synchronized with the cloud
int fastPublishPeriod = 0;
int idleRPM = 1600;
```

Create some global variables for your settings.

```cpp
// Set up configuration settings
static ConfigObject engineDesc("engine", {
    ConfigInt("idle", &idleRPM, 0, 10000),
    ConfigInt("fastpub", &fastPublishPeriod, 0, 3600000),
});
Tracker::instance().configService.registerModule(engineDesc);
```

In setup(), associate the variables with the location in the configuration schema. While just a couple lines of code, this automatically takes care of:

- Loading the saved configuration from the file system at boot, in case the device is offline.
- When the device comes online, getting any updates that occurred while offline.
- If the device is already online and the settings are changed, they are pushed to the device automatically.


For the full example, see the [AN017 Tracker CAN](https://github.com/particle-iot/app-notes/tree/master/AN017-Tracker-CAN), the CAN bus application note.


