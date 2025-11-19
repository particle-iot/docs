---
title: Debug log tool
layout: commonTwo.hbs
description: Device firmware inspection tool
includeDefinitions: [api-helper, api-helper-extras, debug-log]
---

# {{title}}

Debugging logs can help troubleshoot problems with devices.

The [Web Device Doctor](/tools/doctor/) flashes firmware to your device and monitors the logs. 

You can also monitor or decode logs using the tool below.

{{> debug-log }}

## Firmware

### Using your own firmware

You can add USB serial debugging to your own firmware using:

```
SerialLogHandler logHandler(LOG_LEVEL_TRACE);
```

You can then monitor the output using the tool above, or the Particle CLI `particle serial monitor`.

### Web device doctor firmware

The web device doctor firmware also generates logs and outputs additional useful debugging information.

### Cloud debug firmware





