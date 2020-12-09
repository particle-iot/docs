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

![](/asset/images/tracker/settings-1.png)

You can also use this technique to create your own custom configuration panels!

This picture shows how elements in the schema directly map to what you can see in the console:

![](/asset/images/tracker/tracker-schema-ui.png)

It should be noted that setting a custom schema replaces the existing schema. This means that as new features are added to Tracker Edge you will want to periodically merge your changes into the latest schema so you will get any new options.

### Example Schema


### Data types

The schema and support in Tracker Edge can include standard JSON data types, including:

- Boolean values (true or false, a checkbox)
- Integer values (optionally with a range of valid values)
- Floating point values (optionally with a range of valid values)
- Strings
- Enumerations (a string with fixed options, a dropdown menu)
- JSON arrays (of the types above, with some limitations)
- JSON objects (of the above types, with some limitations)

There is a limit to the size of the data, as it needs to fit in a 622-byte publish. You should keep the data of a reasonable size and avoid overly lengthy JSON key names for this reason.

## Adding to the schema





