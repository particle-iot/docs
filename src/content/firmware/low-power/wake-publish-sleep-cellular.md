---
title: Wake publish sleep example
layout: commonTwo.hbs
columns: two
---
# {{title}}

This example illustrates:

- Checking that the battery has sufficient capacity to connect
- Sleep on multiple connection failure to preserve battery
- Hour sleep, uses hibernate mode (`SLEEP_MODE_DEEP`)
- Use SEMI_AUTOMATIC mode
- Stay awake for firmware updates (optional)

You can download the files associated with this app note [as a zip file](/assets/files/app-notes/AN029.zip).

The hibernate mode uses the lowest power, however there is a trade-off. For sleep periods less than 15 minutes, you'll use less power by using stop mode sleep (pin + time) with `SLEEP_NETWORK_STANDBY`. This is because connecting to cellular uses a significant amount of power, more than is saved by turning off the modem completely. 

Also you must not use hibernate with sleep periods of less than 10 minutes or your SIM could be blocked your mobile carrier for aggressive reconnection.

On Gen 2 devices, the power usage is around 103 µA with this example (tested with an E-Series E402 and Device OS 1.5.0). In this mode, the power usage stays completely constant as the modem is turned off and the MCU is in deep sleep. 

On Gen 3 devices, this example uses stop mode sleep with cellular off, because Gen 3 devices cannot wake from hibernate mode by time.

To connect and publish:

- cloudMinTime set to 0 (no waiting for firmware updates)
- E-Series E402 (LTE Cat M1)
- Device OS 1.5.0

| Measure | Value | Units |
| :--- | ---: | :--- |
| Time | 19.6 | sec |
| Min Current | 104 | µA |
| Mean Current | 121 | mA |
| Max Current | 494 | mA |
| Total Power | 2.38 | mWh |
| Idle Current | 103 | µA |
| Voltage | 3.6 | V |

![Power Graph](/assets/images/app-notes/AN029/power-graph.png)

## Finite state machines

All of the examples use a finite state machine. While this example is simple enough you could do it with nested if statements, it's a good habit to get into using finite state machine design for your user firmware. Once your design starts to get more complicated, it can get very confusing to maintain deeply nested if statements.

![State Diagram](/assets/images/app-notes/AN029/PublishStateDiagram.png)

- When the device boots, it goes into **WAIT CONNECTED** state (`STATE_WAIT_CONNECTED`). 
  - If successfully connected to the cloud, then goes into **PUBLISH** state.
  - If a timeout occurs, then goes into **SLEEP** state.

- In **PUBLISH** state, the sensor is read and the value published to the Particle cloud.
  - If it hasn't been `CLOUD_MIN_MS` milliseconds since connected to the cloud, go into **PRE SLEEP** state. This is optional.
  - Otherwise, go into **SLEEP** state.
  - This example uses a simple method of publishing that blocks the loop thread until complete. The other examples use a more advanced asynchronous mode.

- The **PRE SLEEP** state allows time for the cloud to start a product firmware update. 10 seconds is usually sufficient. If you aren't using product firmware updates, set `CLOUD_MIN_MS` to 0 and this state won't be entered.
  - This example does a firmware update check on every publish. The Stop Sleep Cellular example makes this configurable so you can do it less frequently, like once a day.

- The **SLEEP** prepares to go to sleep
  - If a firmware update has been started, goes into **FIRMWARE UPDATE** state instead.
  - Otherwise, goes into sleep mode. On wake it will start over a **START**.

- The **FIRMWARE UPDATE** waits for a firmware update to complete
  - Normally, the device will automatically reboot and apply the update and then go to **START** again.
  - If the update fails or times out, then it will go into **SLEEP** state to try again later.
 

## Configuration parameters

There are configurable parameters near the top of the source file. This example uses [Chrono Literals](/reference/device-os/api/chrono-literals/chrono-literals/) which is a great feature of Device OS 1.5.0 and later. Instead of setting 6 minutes in milliseconds (360000 or 6 * 60 * 1000), you can just use `6min`. You can also use `30s` for seconds. Or `2h` for hours.

This is the maximum amount of time to wait for the cloud to be connected. This should be at least 5 minutes. If you set this limit shorter, on Gen 2 devices the modem may not get power cycled which may help with reconnection.

```
const std::chrono::milliseconds connectMaxTime = 6min;
```

Other parameters are listed in the comments in the source and in the code walk-through below.

## The code

{{> codebox content="/assets/files/app-notes/AN029/firmware/src/Wake-Publish-Sleep-Cellular.cpp" format="cpp" height="500"}}


## Code walk-through

In order to most effectively check the battery in setup, you need to use `SEMI_AUTOMATIC` mode.

```
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);
```

If you are testing with a developer device you should leave these lines commented out. But if you are testing product firmware updates, you'll need to uncomment these and set your own product ID and version. The PRODUCT_ID must only be added prior to Device OS 4.0.0; this example will compile correctly targeting all versions of Device OS because of the `#ifndef`.

```
// PRODUCT_ID(8761);
// #endif
// PRODUCT_VERSION(4);
// PRODUCT_VERSION(4);
```

Using Serial1 (RX/TX) for debugging logs and an external TTL serial to USB (FT232) converter
is useful when testing sleep modes. Sleep causes USB serial to disconnect, and you will often
lose the debug logs immediately after wake. With an external USB serial converter, your
serial terminal stays connected so you get all log messages. If you don't have one, you can
comment out the Serial1LogHandler and uncomment the SerialLogHandler to use USB.

```
Serial1LogHandler logHandler(115200);
// SerialLogHandler logHandler;
```

These are our configurable parameters. This example uses [Chrono Literals](/reference/device-os/api/chrono-literals/chrono-literals/) which is a great feature of Device OS 1.5.0 and later. Instead of setting 6 minutes in milliseconds (360000 or 6 * 60 * 1000), you can just use `6min`. You can also use `30s` for seconds. Or `2h` for hours.

```
// This is the maximum amount of time to wait for the cloud to be connected.
// This should be at least 5 minutes. If you set this limit shorter,
// on Gen 2 devices the modem may not get power cycled which may help with reconnection.
const std::chrono::milliseconds connectMaxTime = 6min;

// This is the minimum amount of time to stay connected to the cloud. You can set this
// to zero and the device will sleep as fast as possible, however you may not get 
// firmware updates and device diagnostics won't go out all of the time. Setting this
// to 10 seconds is typically a good value to use for getting updates.
const std::chrono::milliseconds cloudMinTime = 10s;

// How long to sleep.
const std::chrono::seconds sleepTime = 15min;

// Maximum time to wait for publish to complete. It normally takes 20 seconds for Particle.publish
// to succeed or time out, but if cellular needs to reconnect, it could take longer, typically
// 80 seconds. This timeout should be longer than that and is just a safety net in case something
// goes wrong.
const std::chrono::milliseconds publishMaxTime = 3min;

// Maximum amount of time to wait for a user firmware download to complete
// before giving up and just going back to sleep
const std::chrono::milliseconds firmwareUpdateMaxTime = 5min;
```

Finite state machine state numbers, global variables, and some forward declarations. The forward declarations are necessary in a .cpp file when you reference the function before it's been implemented.

```
// These are the states in the finite state machine, handled in loop()
enum State {
    STATE_WAIT_CONNECTED = 0,
    STATE_PUBLISH,
    STATE_PRE_SLEEP,
    STATE_SLEEP,
    STATE_FIRMWARE_UPDATE
};
State state = STATE_WAIT_CONNECTED;
unsigned long stateTime;
bool firmwareUpdateInProgress = false;

void readSensorAndPublish(); // forward declaration
void firmwareUpdateHandler(system_event_t event, int param); // forward declaration

```

If the battery state-of-charge (SoC) is too low, a brownout can occur. On Gen 2 devices, this can cause flash sectors to be randomly erased. One way to avoid this is to do a check like this in `setup()`:

```
void setup() {
    FuelGauge fuel;
    if (fuel.getSoC() < 15) {
        // If battery is too low, don't try to connect to cellular, just go back into
        // sleep mode.
        Log.info("low battery, going to sleep immediately");
        state = STATE_SLEEP;
        return;
    }
```

In order to delay sleep while an firmware upgrade is being downloaded, we use a firmware update handler. This is registered in `setup()`.

```
    System.on(firmware_update, firmwareUpdateHandler);
```

In order to prevent connecting to cellular before the battery SoC is checked, `SEMI_AUTOMATIC` mode is used. This requires that cellular the connection be started in `setup()`.

```
    Cellular.on();
    Particle.connect();
    stateTime = millis();
}
```

The `loop()` function implements the finite state machine as a switch statement.

The first state after `setup()` is `STATE_WAIT_CONNECTED`. This waits until the cloud connects and then goes into `STATE_PUBLISH`.

If a timeout occurs, connecting takes longer than `connectMaxTime` then it transitions into `STATE_SLEEP`.


{{!-- BEGIN shared-blurb 2f1882b9-de7d-41ed-ae9e-14b6f77d2882 --}}
Normally, Device OS automatically handles connecting to the network and cloud and retrying as necessary.

If you manually add a timeout, for example to put the device to sleep to conserve battery when it cannot 
connect to cellular, you should do so with care.

- Even though a cellular connection can occur in as little as 10 seconds with LTE Cat 1, it can take
significantly longer, especially with 3G and 2G. A minimum of 120 seconds is recommended for this reason.
- You must also stay awake trying to connect for at least 5 minutes periodically. The SIM may switch between
IMSI when failing to connect, and if you do not try for long enough, it may not cycle through them properly,
causing the device to stay stuck on one that can't be used in your location.
- After 10 minutes of failing to connect, Device OS will do a full shutdown of the cellular modem and 
restart it. This can help clear issues in some cases. It is recommended that you wait at least 11 minutes to be
sure this can occur.
- If you do not want to wait 11 minutes for battery life reasons, you should implement a variable backoff
scheme were you at least do this periodically, say once every several hours, to be sure it will be done
eventually. This will also assure that the 5 minute IMSI cycling time requirement is met.
- The 11 minute shutdown of the cellular modem consists of sending it command to full reset, and also removing
the power to the modem. This is more thorough than entering sleep mode, or using the reset button on the device.
{{!-- END shared-blurb --}}

```
void loop() {
    switch(state) {
        case STATE_WAIT_CONNECTED:
            // Wait for the connection to the Particle cloud to complete
            if (Particle.connected()) {
                Log.info("connected to the cloud in %lu ms", millis() - stateTime);
                state = STATE_PUBLISH; 
                stateTime = millis(); 
            }
            else
            if (millis() - stateTime >= connectMaxTime.count()) {
                // Took too long to connect, go to sleep
                Log.info("failed to connect, going to sleep");
                state = STATE_SLEEP;
            }
            break;
```

The `STATE_PUBLISH` reads a value and publishes it. The `readSensorAndPublish()` function blocks until the publish completes. A better technique is used in the other examples like the **Stop-Sleep-Cellular** example.

If `cloudMinTime` is non-zero, then we wait for that amount of time after connecting to the cloud before going to sleep. This is to provide enough time for a software update to start. The minimum amount of time is 10 seconds. If waiting is requires, it goes into `STATE_PRE_SLEEP`.

Otherwise, it goes into `STATE_SLEEP`.

```
        case STATE_PUBLISH:
            readSensorAndPublish();

            if (millis() - stateTime < cloudMinTime.count()) {
                Log.info("waiting %lu ms before sleeping", cloudMinTime.count() - (millis() - stateTime));
                state = STATE_PRE_SLEEP;
            }
            else {
                state = STATE_SLEEP;
            }
            break;
```

The `STATE_PRE_SLEEP` waits long enough for a firmware update to start, if that feature is enabled using `cloudMinTime`.

```
        case STATE_PRE_SLEEP:
            // This delay is used to make sure firmware updates can start and diagnostics go out
            // It can be eliminated by setting cloudMinTime to 0 and sleep will occur as quickly
            // as possible. 
            if (millis() - stateTime >= cloudMinTime.count()) {
                state = STATE_SLEEP;
            }
            break;
```

The `STATE_SLEEP` first checks to see if a firmware update has started. If it has, goes into `STATE_FIRMWARE_UPDATE` state.

If not, then it goes into sleep. This state is never exited; upon wake, the device is reset and goes through `setup()` again.

```
        case STATE_SLEEP:
            if (firmwareUpdateInProgress) {
                Log.info("firmware update detected");
                state = STATE_FIRMWARE_UPDATE;
                stateTime = millis();
                break;
            }

            Log.info("going to sleep for %ld seconds", (long) sleepTime.count());
            
            {
                SystemSleepConfiguration config;
#if HAL_PLATFORM_NRF52840
                // Gen 3 (nRF52840) does not suppport HIBERNATE with a time duration
                // to wake up. This code uses ULP sleep instead. 
                config.mode(SystemSleepMode::ULTRA_LOW_POWER)
                    .duration(sleepTime);
                System.sleep(config);

                // One difference is that ULP continues execution. For simplicity,
                // we just match the HIBERNATE behavior by resetting here.
                System.reset();
#else
                config.mode(SystemSleepMode::HIBERNATE)
                    .duration(sleepTime);
                System.sleep(config);
                // This is never reached; when the device wakes from sleep it will start over 
                // with setup()
#endif
            }

            break; 
```

The `STATE_FIRMWARE_UPDATE` state keeps track of when an update starts or times out. If the update completes, the device will reset by itself and start over with calling `setup()`.

```
        case STATE_FIRMWARE_UPDATE:
            if (!firmwareUpdateInProgress) {
                Log.info("firmware update completed");
                state = STATE_SLEEP;
            }
            else
            if (millis() - stateTime >= firmwareUpdateMaxTime.count()) {
                Log.info("firmware update timed out");
                state = STATE_SLEEP;
            }
            break;
    }
}
```

This example just reads the value of A0 and publishes it which isn't that useful. You'd replace this with the code for reading your sensor or whatever you're publishing.

This example does a blocking publish. The other examples use a more advanced asynchronous technique.

```
void readSensorAndPublish() {
    // This is just a placeholder for code that you're write for your actual situation
    int a0 = analogRead(A0);

    // Create a simple JSON string with the value of A0
    char buf[256];
    snprintf(buf, sizeof(buf), "{\"a0\":%d}", a0);

    bool result = Particle.publish("sensorTest", buf, PRIVATE | WITH_ACK);

    Log.info("published %s (result=%d)", buf, result);
}
```

The firmware update handler sets a global variable when the firmware update starts, so we can defer sleep until it completes (or times out). It may take a little while for the begin handler to be called, 10 seconds is a good minimum value.

```
void firmwareUpdateHandler(system_event_t event, int param) {
    switch(param) {
        case firmware_update_begin:
            firmwareUpdateInProgress = true;
            break;

        case firmware_update_complete:
        case (int)firmware_update_failed:
            firmwareUpdateInProgress = false;
            break;
    }
}
```

## Power and log examples

### Cold boot, full set of messages send to the cloud

- cloudMinTime set to 10 seconds to allow for product firmware updates to be started
- E-Series E402 (LTE Cat M1)
- Device OS 1.5.0

| Measure | Value | Units |
| :--- | ---: | :--- |
| Time | 29.8 | sec |
| Min Current | 42.6 | µA |
| Mean Current | 114 | mA |
| Max Current | 474 | mA |
| Total Power | 3.26 | mWh |
| Voltage | 3.6 | V |


![Cold Boot Power](/assets/images/app-notes/AN029/cold-boot.png)


The debugging log for a Gen 2 device will look something like this. Your log likely will not have the leftmost column.

The first part almost always looks like this. The amount of time to `Cloud: connecting` will vary depending on your cellular connection and technology. LTE Cat M1 tends to be fastest, and 2G the slowest. The part before `Cloud: connecting` is blinking green, after is blinking cyan.

```
1335 - 0000000083 [comm] INFO: channel inited
6260 - 0000005009 [system] INFO: Sim Ready
6264 - 0000005009 [system] INFO: ARM_WLAN_WD 1
8014 - 0000006763 [system] INFO: ARM_WLAN_WD 2
8019 - 0000006763 [system] INFO: CLR_WLAN_WD 1, DHCP success
8023 - 0000006765 [system] INFO: Cloud: connecting
8027 - 0000006775 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
8034 - 0000006777 [system] ERROR: Failed to load session data from persistent storage
8041 - 0000006783 [system] INFO: Discarding session data
8646 - 0000007395 [system] INFO: Resolved xxx.udp.particle.io to 34.194.48.89
8722 - 0000007471 [system] INFO: Cloud socket connected
8727 - 0000007473 [system] INFO: Starting handshake: presense_announce=0
8733 - 0000007475 [comm.protocol.handshake] INFO: Establish secure connection
8753 - 0000007501 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=2
```

This interval, 8.7 seconds, is where the authentication occurs. 

After this, the hello and time message are sent. The example below will show what happens when these can be skipped because they were recently sent successfully.

```
17452 - 0000016201 [comm.protocol.handshake] INFO: Sending HELLO message
17748 - 0000016498 [comm.protocol.handshake] INFO: Handshake completed
17755 - 0000016502 [system] INFO: Send spark/device/last_reset event
17900 - 0000016650 [system] INFO: Send subscriptions
17989 - 0000016739 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
17996 - 0000016739 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
18002 - 0000016745 [comm] INFO: Sending TIME request
18071 - 0000016821 [comm.protocol] INFO: message id 2 complete with code 0.00
18078 - 0000016821 [comm.protocol] INFO: rcv'd message type=13
18116 - 0000016866 [comm.protocol] INFO: message id 3 complete with code 0.00
18123 - 0000016866 [comm.protocol] INFO: rcv'd message type=13
18261 - 0000017011 [comm.protocol] INFO: message id 4 complete with code 0.00
18268 - 0000017011 [comm.protocol] INFO: rcv'd message type=13
18406 - 0000017156 [comm.protocol] INFO: message id 5 complete with code 0.00
18413 - 0000017156 [comm.protocol] INFO: rcv'd message type=13
18550 - 0000017300 [comm.protocol] INFO: message id 6 complete with code 0.00
18557 - 0000017300 [comm.protocol] INFO: rcv'd message type=13
18696 - 0000017446 [system] INFO: All handshake messages have been processed
18703 - 0000017446 [comm.protocol] INFO: message id 7 complete with code 2.05
18709 - 0000017452 [comm.protocol] INFO: Received TIME response: 1585229008
18715 - 0000017460 [comm.protocol] INFO: rcv'd message type=12
```

Now the cloud has been connected at `Particle.connected()` will return true. We publish our example event. Since `cloudMinTime` is non-zero, we'll wait a bit before going to sleep to allow for a product firmware update to start.

```
18825 - 0000017575 [system] INFO: Cloud connected
18829 - 0000017575 [app] INFO: connected to the cloud in 17492 ms
19252 - 0000018002 [comm.protocol] INFO: message id 8 complete with code 0.00
19259 - 0000018002 [comm.protocol] INFO: rcv'd message type=13
19264 - 0000018003 [app] INFO: published {"a0":1763} (result=1)
19269 - 0000018012 [app] INFO: waiting 9566 ms before sleeping
```

The describe messages contain information about the system and application.

```
19414 - 0000018163 [comm.protocol] INFO: Posting 'S' describe message
19526 - 0000018276 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
19544 - 0000018294 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
19551 - 0000018294 [comm.protocol] INFO: rcv'd message type=1
19691 - 0000018441 [comm.protocol] INFO: Posting 'A' describe message
19738 - 0000018488 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
19744 - 0000018488 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
19750 - 0000018494 [comm.protocol] INFO: rcv'd message type=1
20002 - 0000018752 [comm.protocol] INFO: Posting 'M' describe message
20069 - 0000018819 [comm.protocol] INFO: rcv'd message type=1
26202 - 0000024953 [comm.protocol] INFO: Posting 'A' describe message
26249 - 0000025000 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
26256 - 0000025000 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
26262 - 0000025006 [comm.protocol] INFO: rcv'd message type=1
```

Finally, after the `cloudMinTime` is reached with no update started, we go to sleep.

```
28827 - 0000027578 [app] INFO: going to sleep for 900 seconds
28832 - 0000027578 [comm] INFO: Waiting for Confirmed messages to be sent.
29833 - 0000028584 [comm] INFO: All Confirmed messages sent: client(yes) server(yes)
29840 - 0000028585 [system] INFO: Clearing WLAN WD in disconnect()
29845 - 0000028590 [system] INFO: Cloud: disconnecting
29873 - 0000028624 [system] INFO: Cloud: disconnected
29893 - 0000028644 [system] INFO: Clearing WLAN WD in disconnect()
```


### With session resume

- cloudMinTime set to 10 seconds to allow for product firmware updates to be started
- E-Series E402 (LTE Cat M1)
- Device OS 1.5.0


| Measure | Value | Units |
| :--- | ---: | :--- |
| Time | 18.6 | sec |
| Min Current | 46.7 | µA |
| Mean Current | 107 | mA |
| Max Current | 506 | mA |
| Total Power | 2.00 | mWh |
| Voltage | 3.6 | V |


![Resume Power](/assets/images/app-notes/AN029/resume.png)

```
929722 - 0000000073 [comm] INFO: channel inited
934643 - 0000004995 [system] INFO: Sim Ready
934647 - 0000004995 [system] INFO: ARM_WLAN_WD 1
936142 - 0000006494 [system] INFO: ARM_WLAN_WD 2
936146 - 0000006494 [system] INFO: CLR_WLAN_WD 1, DHCP success
936151 - 0000006496 [system] INFO: Cloud: connecting
936155 - 0000006506 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
936162 - 0000006508 [system] INFO: Loaded cloud server address and port from session data
936242 - 0000006594 [system] INFO: Cloud socket connected
936247 - 0000006596 [system] INFO: Starting handshake: presense_announce=0
936253 - 0000006598 [comm.protocol.handshake] INFO: Establish secure connection
936273 - 0000006624 [comm.dtls] WARN: session has 0 uses
936281 - 0000006632 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=0
936288 - 0000006634 [comm.dtls] INFO: out_ctr 0,1,0,0,0,0,0,15, next_coap_id=8
936294 - 0000006640 [comm.dtls] INFO: app state crc: cached: e15b015b, actual: e15b015b
936301 - 0000006646 [comm.dtls] WARN: skipping hello message
936305 - 0000006652 [comm.dtls] INFO: restored session from persisted session data. next_msg_id=8
936313 - 0000006658 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 2
936319 - 0000006664 [comm.protocol.handshake] INFO: resumed session - not sending HELLO message
936365 - 0000006717 [system] INFO: cloud connected from existing session.
936727 - 0000007079 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
936734 - 0000007079 [comm.protocol] INFO: Posting 'A' describe message
936766 - 0000007118 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
936773 - 0000007118 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
936778 - 0000007124 [comm.protocol] INFO: rcv'd message type=1
936919 - 0000007271 [comm.protocol] INFO: message id 9 complete with code 0.00
936926 - 0000007271 [comm.protocol] INFO: rcv'd message type=13
937065 - 0000007417 [comm.protocol] INFO: message id 10 complete with code 0.00
937072 - 0000007417 [comm.protocol] INFO: rcv'd message type=13
937210 - 0000007562 [system] INFO: All handshake messages have been processed
937217 - 0000007562 [comm.protocol] INFO: message id 11 complete with code 0.00
937223 - 0000007570 [comm.protocol] INFO: rcv'd message type=13
```

In this example, since the session was resumed, we got to cloud connected state in 7.6 seconds instead of 17.5 seconds!

This example still uses the 10 second `cloudMinTime` to wait for a firmware update to start. The connection would be around 5 seconds shorter without that.

```
937333 - 0000007685 [system] INFO: Cloud connected
937337 - 0000007685 [app] INFO: connected to the cloud in 7612 ms
937769 - 0000008121 [comm.protocol] INFO: message id 12 complete with code 0.00
937776 - 0000008122 [app] INFO: published {"a0":1732} (result=1)
937781 - 0000008126 [app] INFO: waiting 9562 ms before sleeping
937786 - 0000008121 [comm.protocol] INFO: rcv'd message type=13
941808 - 0000012161 [comm.protocol] INFO: Posting 'A' describe message
941855 - 0000012208 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
941862 - 0000012208 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
941868 - 0000012214 [comm.protocol] INFO: rcv'd message type=1
947335 - 0000017688 [app] INFO: going to sleep for 900 seconds
947340 - 0000017688 [comm] INFO: Waiting for Confirmed messages to be sent.
948340 - 0000018694 [comm] INFO: All Confirmed messages sent: client(yes) server(yes)
948348 - 0000018695 [system] INFO: Clearing WLAN WD in disconnect()
948353 - 0000018700 [system] INFO: Cloud: disconnecting
948381 - 0000018734 [system] INFO: Cloud: disconnected
948403 - 0000018756 [system] INFO: Clearing WLAN WD in disconnect()
```

