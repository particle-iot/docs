---
title: Cloud Wi-Fi config
columns: two
layout: commonTwo.hbs
description: Tinker
includeDefinitions: [api-helper, api-helper-cloud, api-helper-library, cloud-wifi-config]
---

# {{title}}

This tool demonstrates configuring Wi-Fi on a device from the cloud. This is only useful on the M-SoM that has both cellular and Wi-Fi, and you want to be able to configure the Wi-Fi credentials using the cellular interface.

## Configuration tool

{{> sso}}

{{> cloud-wifi-config}}

## Device firmware

You typically include this functionality in your regular user firmware:

- Include the `CloudWiFiSetupRK` library in your project.
- Include the header file in your main application .cpp file:

```cpp
#include "CloudWiFiSetupRK.h"
```

- Include the setup call in your setup():

```cpp
CloudWiFiSetupRK::instance().setup();
```

That's it!

### View library source and examples

{{> library-browser infoFile="/assets/files/libraries/CloudWiFiSetupRK.json"}}

## Data operations

Because the process uses Particle.function and a number of published events, it will use some data operations. Since Wi-Fi configuration is not expected to occur frequently, this should not amount to a significant number, but could be a dozen or even a few dozen data operations, especially when doing Wi-Fi scans.