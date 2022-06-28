---
title: How Do I Collect Trace Logs From My Device?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Log Levels and Log Handlers

Our Serial Log Handler class is a great resource when it comes to quickly sourcing traces from firmware that is behaving unexpectedly. You can read more about Log Handlers [here](https://docs.particle.io/reference/device-os/firmware/electron/#log-handlers). For collecting trace logs from a device, it's best to use a Serial Log Handler with a certain priority: `SerialLogHandler logHandler(LOG_LEVEL_ALL);`. Simply prepend this logHandler to your firmware, above the `setup()` function. 

Here are some examples of what you might look for in these logs:

* Error messages.
* Unusual/unexpected behavior (e.g. loops, resets).
* AT commands - the language with which a given cellular device's modem speaks to a given tower. This is especially useful for cellular connectivity debugging - you can find a dictionary of these commands by searching [u-blox.com](http://u-blox.com/) for the modem on your device.

In addition to generic logs triggered by system subroutines, you can also flag certain elements in your code by using the logHandler. For example, should you enter some problematic case in a `switch` function, you could add `Log.warn("This is a warning message!");` to draw attention to this state when reviewing your logs.

```
Log.trace(const char *format, ...)
```

```
Log.info(const char *format, ...)
```

```
Log.warn(const char *format, ...)
```

```
Log.error(const char *format, ...)
```

SerialLogHandler may interact with`Serial.begin()`) negatively, so if you are using the general Serial class for generic debugging, it may be better to switch to the logHandler class instead.

To collect logs, make sure you have the CLI ([link](https://docs.particle.io/tutorials/developer-tools/cli/)) installed. Then open up your Terminal (Mac) or Command Line (Windows) and run the command `particle serial monitor --follow`, and **only** **then** connect a device with logging enabled via its USB connection. 

If you are collecting logs to bring to a Technical Support Engineer, it's strongly recommended that you annotate your firmware using log flags like the above - e.g. `Log.info("LOOP BEGINS--");` \- this will help someone unfamiliar with your firmware to quickly grasp its architecture.
