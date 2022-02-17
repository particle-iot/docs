---
title: AN039 Remote Logging
layout: commonTwo.hbs
columns: two
---

# AN039 Remote Logging

We recommend using the [Logging system](/cards/firmware/logging/logging/) built into Device OS. For example:

```cpp
// Use primary serial over USB interface for logging output
SerialLogHandler logHandler;

void setup() {
    // Log some messages with different logging levels
    Log.info("This is info message");
    Log.warn("This is warning message");
    Log.error("This is error message, error=%d", errCode);

    // Format text message
    Log.info("System version: %s", (const char*)System.version());
}

void loop() {
}
```

There are a number of advantages over using `Serial.print` calls:

- The `Log` class is thread-safe.
- You can easily redirect logs to `Serial1` (hardware UART) instead of `Serial`.
- You can control the log level of individual modules separately.
- You can add other log handlers to write to a [remote log](https://github.com/rickkas7/RemoteLogRK), [SD card](https://github.com/rickkas7/SdCardLogHandlerRK), and more.

## Remote logging

The [remote logging](https://github.com/rickkas7/RemoteLogRK) library supports several modes of operation, however this note will concentrate on using it with syslog over UDP. There are pros and cons of this:

- This method is best with Wi-Fi devices.
- It works with cellular, but beware of cellular data limits if you generate a lot of logs.
- Data is sent unencrypted.

It is possible to set up your own syslog server on a computer on your local network, but this note will concentrate on using it with a commercial service, [SolarWinds Papertrail](https://www.papertrail.com/). Papertrail has a nice web-based user interface, fast searching, and live tail for displaying logs as they are generated. 

- If you are a hobbyist with a very small number of devices, you may be able to use the free tier (50 MB/month)
- If you are a hobbyist with a medium number of devices but with some money to spend, the 1 GB, 2 GB, or 4 GB plans are reasonable.
- If you are a product developer and want to use this for beta test devices, it will likely be affordable.

Logging an entire large device fleet would likely be cost-prohibitive, and for cellular, would likely run into cellular data limits or incur additional block charges. 

However, during development and testing in particular, being able to see your logs is invaluable for troubleshooting.

## Papertrail setup

In addition to creating your account, you will need a **Log destination** from the Settings - Log Destinations menu. Click **Create Log Destination**.

![](/assets/images/app-notes/AN039/setup.png)

In particular, make sure you select:

- Accept connections via: **Port** 
- Check the **USB: Plain text** box

When you create your log destination, you'll get something like this back:

logs999.papertrailapp.com:44567

The part before the : is the host (logs999.papertrailapp.com), and the port is 44567 in this made-up example. You should keep this relatively secret because anyone with this host and port can log to your log destination if they know this and you have the **Yes, recognize logs from new systems** box checked. If your set of devices is relatively constant, you may want to uncheck this box.

## Library setup

### Device name or identifier

One thing you'll need to decide is how you want to identify the systems in the logs:

- Device name
- Device ID
- Custom method

Using the device name is convenient, however:

- It requires a request to the cloud to get the device name, which is two data operations
- It cannot be done from unclaimed product devices
- To reduce data operations, you can store the name in EEPROM. 

The easiest way to use the device name is by using the **DeviceNameHelperRK** library. You can find the [full documentation on GitHub](https://github.com/rickkas7/DeviceNameHelperRK).

If you do not want to use the device name, the device ID is a good alternative.

### Add library

If you are using Particle Workbench, from the Command Palette (Ctrl-Shift-P or Command-Shift-P), select **Particle: Install Library** and install **RemoteLogRK** and **DeviceNameHelperRK** (if you are using the device name).

If you are using the Web IDE, click the **Libraries** icon and search for **RemoteLogRK** and add it to your project. Repeat for **DeviceNameHelperRK**.


### Example with device name


{{> codebox content="/assets/files/app-notes/AN039/papertrail-example.cpp" format="cpp" height="500"}}


## Code walk-through

This example stores log entries in retained memory, so they are preserved if the device reboots. It also
allows logs generated early in startup, before the Wi-Fi or cellular network is up, to be preserved. 

You can make the value 2560 smaller if you are using retained memory for other purposes, or a little
larger, though the limit is 3068 bytes on both Gen 2 and Gen 3 devices.

```cpp
retained uint8_t remoteLogBuf[2560];
RemoteLog remoteLog(remoteLogBuf, sizeof(remoteLogBuf));
```

Here's where you update the host and port to match what you got when you configured your log destination.

```cpp
const char *LOG_HOST = "logsXXX.papertrailapp.com";
const uint16_t LOG_PORT = 39999;
```

This example stores the device name in EEPROM. If you are already using the EEPROM, set this to be an offset
after your data.

```cpp
const int EEPROM_OFFSET = 0;
```

You can still enable the USB serial debug log, so logs will go to both:

```cpp
SerialLogHandler serialLog;
```

This, in setup(), is part of the device name retrieval. There's also a line in loop().

```cpp
DeviceNameHelperEEPROM::instance().setup(EEPROM_OFFSET);
```

This sets up remote logging to syslog over UDP, the mode to use for Papertrail.

```cpp
RemoteLogSyslogUDP *logServer = new RemoteLogSyslogUDP(LOG_HOST, LOG_PORT);
```

Since the device name helper and remote logging libraries do not know about each other, this bit of boilerplate code links the two together:

```cpp
logServer->withDeviceNameCallback([](String &deviceName) {
    if (DeviceNameHelperEEPROM::instance().hasName()) {
        deviceName = DeviceNameHelperEEPROM::instance().getName();
        return true;
    }
    else {
        return false;
    }
});
```

This completes the setup of remote logging:

```cpp
remoteLog.withServer(logServer);
remoteLog.setup();
```

These two lines are required in loop() if using the device name:

```cpp
DeviceNameHelperRetained::instance().loop();
remoteLog.loop();
```

This code just generates a log message every 10 seconds for testing. You almost certainly do not want to add this to your production code!

```cpp
static unsigned long lastLog = 0;
static int counter = 0;

if (millis() - lastLog >= 10000) {
    lastLog = millis();
    Log.info("counter=%d memory=%lu", ++counter, System.freeMemory());
}
```


### Example with Device ID

If you only want to use the Device ID as the identifier in your logs, the device name callback is simply:

```cpp
logServer->withDeviceNameCallback([](String &deviceName) {
    deviceName = System.deviceID();
    return true;
});
```

You do not need to include the **DeviceNameHelperRK** and do not need to use any EEPROM if using the Device ID as the logging identifier.

### Example output

In this example, the device does not generate many logs, but you can easily see when it needs to refresh its cloud session every 3 days:

![](/assets/images/app-notes/AN039/log1.png)

You might also want to use it to log things specific to your code. For example:

![](/assets/images/app-notes/AN039/log2.png)
