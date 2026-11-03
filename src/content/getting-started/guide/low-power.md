---
title: Low-power
columns: two
layout: commonTwo.hbs
description: Using sleep mode to lower power consumption
---

# {{title}}

{{section-nav}}

In this section, I'll modify the [sensors](/getting-started/guide/sensors/) code to use sleep mode to lower power consumption, such for battery-powered use.

- It uses [sleep mode](/firmware/low-power/wake-publish-sleep-cellular/) to reduce power consumption.
- It uses [environment variables](/getting-started/configuration/environment/) for configuration.
- It uses a [finite state machine](/firmware/software-design/finite-state-machines/), a good design practice.
- It uses [typed and extended publish](/reference/device-os/typed-publish/) (added in Device OS 6.3.0) for more efficient sending of structured (JSON) data.
- Using Serial1 debug for sleep debugging

{{content-nav}}

## Firmware

As in the previous section, you can either:

- **Particle: Create New Project**, create CloudLed, and paste the contents CloudLed.cpp file into your file.
- Download the zip file, extract, then **Particle: Import Project**.

{{> project-browser project="TemperatureSensor3" default-file="src/TemperatureSensor3.cpp" height="400" flash="true"}}

As in the previous section, also do:

- **Particle: Configure project for device**
- **Particle: Flash application (local)**

If you have not already done so, if you flash a device directly from Workbench make sure you set the **Mark as development device** option in the product, otherwise the firmware that you flash will likely be immediately replaced with the product default firmware!

## Explaining the code

This code stores the time until next check on the flash file system. This library makes this easier than making the individual calls.

```cpp
#include "FileHelperRK.h"
```

This code uses `Serial1LogHandler` to better debug sleep mode issues. See [Using Serial1LogHandler](#using-serial1loghandler), below for more information.

```cpp
// SerialLogHandler logHandler(LOG_LEVEL_TRACE); // // This allows for USB serial debug logs
Serial1LogHandler logHandler2(115200, LOG_LEVEL_TRACE); // This allows for UART serial debug logs at 115200 baud
```

In addition to storing the check time in a file, it's stored as JSON to make it easily extendable in future.
```cpp
// Configuration data is stored in the flash file system. This includes the next check time.
const char *localConfigPath = "/usr/tempconfig.json";
const char *localConfigLastCheckKey = "lastCheck";
Variant localConfig;
```

Various configuration settings:

```cpp
// Various configuration parameters that cannot be configured using environment variables
const std::chrono::milliseconds publishTimeout = 120s; // How long to wait for publish to complete (safety check)
const std::chrono::seconds minimumSleepTime = 5min; // If sleep time is less than this long, don't actually sleep because it won't save power and may cause excessive reconnection
const std::chrono::seconds wakeAdvanceTime = 30s; // How much before check time to wake, to allow time to reconnect to cellular
const std::chrono::milliseconds firmwareUpdateWaitTime = 8s; // How long to wait for a firmware update notification after cloud connecting
```

And environment variables:

```cpp
// Environment variables
int temperaturePeriod = 15; // minutes, make 60 evenly divisible by this for best results
String temperatureSleepMode = "auto"; 
```
This code uses [typed and extended publish](/reference/device-os/typed-publish/) (added in Device OS 6.3.0) for more efficient sending of structured (JSON) data.

```cpp
// This version of the code uses Variant and CloudEvent and will only work with Device OS 6.3.0 and later.
CloudEvent event;
```

It uses a [finite state machine](/firmware/software-design/finite-state-machines/), a good design practice. These functions are the states of the state machine.

```cpp
// Forward declaration for finite state machine states
void statePublishWait();
void statePublishCompletionWait();
void stateCheckFirmwareUpdate();
void stateCheckSleep();
```

The `setup()` function does several things:
- Registers a firmware update handler so the code can prevent sleeping during an update
- Initializes the local configuration from the file system
- Reads environment variables


Because the state machine does all of the work, loop() just calls the current state handler function:

```cpp
void loop()
{
    stateHandler();
}
```

The `statePublishWait()` function:

- Waits until connected to the Particle cloud.
- Waits for clock time synchronization.
- Checks to see if it's time to publish.
- Updates the lastCheck time if necessary.
- Publishes the event.

The `statePublishCompletionWait()` function waits until the publish completes or times out.


The `stateCheckFirmwareUpdate()` function waits to see if there is a firmware update, and if there is, waits until it completes before allowing sleep.

The `stateCheckSleep()` function:
- Checks to see if the temperatureSleepMode has enabled sleep mode.
- Check to see if the amount of time to sleep is long enough. If too short, the device will stay awake and wait instead of going to sleep.
- Enters sleep mode if necessary.


The `checkPower()` function logs information about the power source, battery state, and battery SoC to the published event.

The `checkSensor()` function has minor changes from before due to using typed publish. It also uses single-shot mode so the temperature sensor can go into low power mode between readings.

The `firmwareUpdateHandler()` gets notifications from the system when a firmware update starts and completes, so sleep mode can be blocking during an update.


## Environment variables

This code supports two environment variables

`temperaturePeriod` is the sleep period in minutes. It's best if 60 is evenly divisible by this number if less than 1 hour.

`temperatureSleepMode` is how to handle sleep mode:

  - `auto` Best guess based on period
  - `battery` Like auto, but only sleep when powered by battery
  - `never` Never sleep 



## Using Serial1LogHandler

USB serial debugging is great for troubleshooting, but it can take anywhere from a few seconds to 10 seconds on Windows for it to reconnect. When debugging sleep issues you can lose too many log messages during this period of time. If you are trying to measure sleep current, using USB will affect those results as well.

The solution is to use a USB to UART adapter, sometimes referred to a FT232, which is the chipset that implements it. I am using one from [Sparkfun](https://www.sparkfun.com/sparkfun-usb-to-serial-breakout-ft232rl.html) here: 

{{imageOverlay src="/assets/images/getting-started-guide/ft232.jpg" class="no-darken"}}

You use `Serial1LogHandler` instead of `SerialLogHandler`:

```
Serial1LogHandler logHandler2(115200, LOG_LEVEL_TRACE); // This allows for UART serial debug logs at 115200 baud
```

You also use a terminal program like PuTTY or Coolterm on Windows, or the built-in `screen` command on Linux and Mac instead of using `particle serial monitor`.

The reason this works is that when the device goes to sleep the USB to serial adapter remains powered by the USB port so the connection does not disconnect. This allows it to always be reading and waiting to receive data from the Particle device's Serial1 UART TX pin.

## Using screen

The `screen` utility on Linux and Mac can be used with UART serial debugging. The commands are not always intuitive, but here's a short list of useful commands:

List USB serial devices so you can find the name:<br/>
`ls /dev/tty.usb*`

Connect at 115200 baud:<br/>
`screen /dev/tty.usbserial-AH03FH1E 115200`


Exit (detach) - allows you to resume later:<br/>
Ctrl+A then press `d` (detach)

Resume detached session:<br/>
`screen -r`

Exit (kill) - disconnects from the port:<br/>
Ctrl+A then press k (kill)

View scrollback:<br/>
Ctrl-A then press ESC

Exit viewing scrollback:<br/>
ESC

Make scrollback bigger:<br/>
Ctrl+A then press `:` then enter `scrollback 10000` then press Return

## Logs



```
0000676577 [system] INFO: Cloud connected
0000676578 [comm.coap] TRACE: Sending CoAP message
0000676578 [app] INFO: nextCheck 1793712600 Tue Nov  3 13:30:00 2026
0000676590 [app] INFO: updated nextCheck to 1793713500 Tue Nov  3 13:45:00 2026
0000676584 [comm.coap] TRACE: CON 0.00  size=4 token= id=32
0000676673 [comm.coap] TRACE: Sending CoAP message
0000676673 [comm.coap] TRACE: CON POST /E/temperatureSensorTest size=122 token=fd id=33
0000676684 [app] INFO: published {"battery":"Charged","humid":33.5729,"nextCheck":1793713500,"power":"USB Host","soc":0.125,"temp":26.2097}
0000676761 [comm.coap] TRACE: Received CoAP message
0000676762 [comm.coap] TRACE: ACK 0.00  size=4 token= id=32
0000676836 [comm.coap] TRACE: Received CoAP message
0000676837 [comm.coap] TRACE: ACK 0.00  size=5 token=fd id=33
0000676844 [app] INFO: publish succeeded
0000676847 [app] INFO: going to sleep for 867 seconds, wake at Tue Nov  3 13:44:30 2026
0000676855 [system.sleep] TRACE: Entering system_sleep_ext()
0000676860 [system] INFO: Cloud: disconnecting
0000676863 [system] INFO: Cloud: disconnected
0000676867 [system.nm] INFO: State changed: IP_CONFIGURED -> IFACE_LINK_UP
0000676875 [ncp.at] TRACE: > AT
0000676875 [net.ppp.client] TRACE: PPP thread event LOWER_DOWN data=0
0000676883 [net.ppp.client] TRACE: State CONNECTED -> DISCONNECT
0000676878 [ncp.at] TRACE: < OK
0000676892 [ncp.at] TRACE: > AT+CFUN=0
0000676891 [net.ppp.client] TRACE: State DISCONNECT -> DISCONNECTING
0000676905 [system.nm] INFO: State changed: IFACE_LINK_UP -> IFACE_UP
0000676908 [net.ppp.client] TRACE: PPP phase -> Network
0000676913 [net.ppp.client] TRACE: PPP phase -> Establish
0000676916 [net.ppp.client] TRACE: PPP phase -> Disconnect
0000676922 [net.ppp.client] TRACE: PPP phase -> Dead
0000676928 [net.ppp.client] TRACE: PPP thread event ADM_DOWN data=0
0000676933 [net.ppp.client] TRACE: PPP thread event ERROR data=5
0000676939 [net.pppncp] ERROR: PPP error event data=5
0000676944 [net.ppp.client] TRACE: PPP thread event DOWN data=0
0000676950 [net.ppp.client] TRACE: State DISCONNECTING -> DISCONNECTED
0000676957 [net.ppp.client] TRACE: State DISCONNECTED -> NONE
0000676963 [system.nm] INFO: State changed: IFACE_UP -> IFACE_REQUEST_DOWN
0000676969 [system.nm] INFO: State changed: IFACE_REQUEST_DOWN -> IFACE_DOWN
0000676975 [system.nm] TRACE: Request to power off interface 4
0000676980 [system.nm] TRACE: Interface 4 power state: UP
0000676986 [system.nm] INFO: State changed: IFACE_DOWN -> DISABLED
0000676991 [system.sleep] TRACE: Waiting interface 4 to be off...
0000684333 [ncp.at] TRACE: < OK
0000684333 [ncp.client] TRACE: NCP connection state changed: 0
0000684337 [net.pppncp] TRACE: NCP event 2
0000684343 [net.pppncp] TRACE: State changed event: 0
0000684345 [net.pppncp] TRACE: NCP event 3
0000684351 [net.pppncp] TRACE: NCP power state changed: IF_POWER_STATE_POWERING_DOWN
0000684356 [system.nm] TRACE: Interface 4 power state changed: POWERING_DOWN
0000684365 [ncp.client] TRACE: Powering off using AT command
0000684371 [ncp.at] TRACE: > AT+CPWROFF
0000684346 [net.ppp.client] TRACE: PPP thread event LOWER_DOWN data=0
0000684373 [ncp.at] TRACE: < +CEREG: 0
0000686377 [ncp.at] TRACE: < OK
0000686378 [ncp.client] TRACE: Waiting to be turned off
0000686421 [net.pppncp] TRACE: NCP event 3
0000686422 [net.pppncp] TRACE: NCP power state changed: IF_POWER_STATE_DOWN
0000686428 [system.nm] TRACE: Interface 4 power state changed: DOWN
0000686434 [ncp.client] TRACE: 56 ms to power off the modem.
0000686439 [mux] INFO: Stopping GSM07.10 muxer
0000686445 [mux] INFO: Gracefully stopping GSM07.10 muxer
0000686447 [mux] INFO: Closing all muxed channels
0000686453 [mux] INFO: Closing mux channel 1
0000686456 [mux] INFO: Closing mux channel 2
0000686461 [mux] INFO: Muxed channel 3 already closed
0000686467 [mux] INFO: Muxed channel 4 already closed
0000686470 [mux] INFO: GSM07.10 muxer thread exiting
0000686475 [mux] INFO: GSM07.10 muxer stopped
0000686478 [ncp.client] TRACE: Soft power off success
0000686484 [ncp.client] TRACE: Deinit UART
0000686489 [ncp.client] TRACE: Already off
0000686492 [ncp.client] TRACE: Soft power off success
0000686498 [ncp.client] TRACE: Deinit UART
0000686501 [ncp.client] TRACE: NCP state changed: 0
0000686506 [net.pppncp] TRACE: NCP event 1
0000686509 [system.sleep] TRACE: Interface 3 is off already
```



{{section-nav}}
