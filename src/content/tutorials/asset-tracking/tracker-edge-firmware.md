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

This doesn't look like much, but a lot of stuff happens behind the scenes and is cloud-controllable:

- Publishing location periodically, or when movement larger than a specified radius occurs
- Publishing on movement sensed by the IMU (inertial measurement unit, the accelerometer)
- Control of the RGB status LED


Digging into this:


**TODO: Additional Content **


## Adding to the location event

```cpp

#include "Particle.h"

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

// hook into the tracker application
TrackerCore tracker;

// button stuff
int32_t clicks_for_publish = 1;
int button_triggers = 0;

// a callback to add custom fields to output location publishes
void loc_gen_cb(JSONWriter &writer, LocationPoint &point, const void *context)
{
    writer.name("button_triggers").value(button_triggers);
}

// a callback for the system MODE button
// WARNING - 2 clicks is defined in Device-OS as a soft power-off...
void button_clicked(system_event_t event, int param)
{
    if(system_button_clicks(param) == clicks_for_publish)
    {
        button_triggers++;
        tracker.location.triggerLocPub(true);
    }
}

void setup()
{
    tracker.init();

    tracker.location.regLocGenCallback(loc_gen_cb);

    // WARNING - ConfigObject initialization will allocate dynamic memory and
    // is not appropriate to perform in global scope. Should be local static or
    // allocated at runtime.
    static ConfigObject button_pub_desc(
        "button_pub",
        {
            ConfigInt("clicks_for_publish", &clicks_for_publish, 0, 10),
        }
    );
    tracker.configService.registerModule(button_pub_desc);

    System.on(button_click, button_clicked);

    Particle.connect();
}

void loop()
{
    tracker.loop();
}
```


**TODO: Additional Content **


