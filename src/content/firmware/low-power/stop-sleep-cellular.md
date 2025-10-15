---
title: Stop sleep cellular example
layout: commonTwo.hbs
columns: two
---
# {{title}}

This example illustrates:

- Checking that the battery has sufficient capacity to connect
- Sleep on multiple connection failure to preserve battery
- 5 minute sleep, use stop mode sleep with network standby (`SLEEP_NETWORK_STANDBY`)
- Customizable sending of device diagnostics
- Customizable software update behavior

For any sleep period under 15 minutes you will probably want to use stop mode sleep with network standby as it will likely use less power than hibernate mode (`SLEEP_MODE_DEEP`). For sleep periods under 10 minutes you must use network standby or your SIM could be blocked your mobile carrier for aggressive reconnection.

You can download the files associated with this app note [as a zip file](/assets/files/app-notes/AN028.zip).

### E-Series LTE Comparison

For the initial connection to the cloud, both the hibernate (deep sleep, Wake-Publish-Sleep) example and this one use approximately the same amount of energy:

- Red: Stop mode sleep (Stop-Sleep-Cellular)
- Green: Hibernate (Wake-Publish-Sleep-Cellular)

![Initial Current](/assets/images/app-notes/AN028/initial.png)

| Parameter | Hibernate | Stop | 
| :--- | ---: | ---: |
| Time | 25 s | 25 s |
| Average Current | 87.8 mA | 101 mA |
| Maximum Current | 771 mA | 793 mA |
| Energy | 2.24 mWh | 2.57 mWh |

Once the device goes into sleep you can see the difference between hibernate (green) and stop sleep (red). The hibernate mode is constant and very low. The stop mode sleep is a little spiky because the modem is still communicating with the tower.

![Sleep Detail](/assets/images/app-notes/AN028/sleep-detail.png)

Over the full duration of sleep you can see the difference:

![Sleep Current](/assets/images/app-notes/AN028/sleep.png)

| Parameter | Hibernate | Stop | 
| :--- | ---: | ---: |
| Time | 10:15 | 10:15 |
| Average Current | 0.104 mA | 16.8 mA |
| Maximum Current | 0.517 mA | 210.0 mA |
| Energy | 0.0613 mWh | 9.9400 mWh |

At first glance it would seem to be no question that hibernate would use less energy. But the difference is when the device does a subsequent wake and publish.

![Second Wake](/assets/images/app-notes/AN028/second-wake.png)

| Parameter | Hibernate | Stop | 
| :--- | ---: | ---: |
| Time | 11.2 sec | 2.2 sec |
| Average Current | 124 mA | 41 mA |
| Maximum Current | 500 mA | 451 mA |
| Energy | 1.39 mWh | 0.51 mWh |

In this case, since I was using LTE Cat M1 and had a good cellular signal, my time to reconnect from hibernate was quick, only about 6.1 seconds. In fringe areas and with 2G is can take considerably longer and use much more energy.

### Electron 3G Comparison

Using an Electron 3G (U260), here's the second wake from sleep comparison:

![Second Wake 3G](/assets/images/app-notes/AN028/second-wake-3g.png)

| Parameter | Hibernate | Stop | 
| :--- | ---: | ---: |
| Time | 22.9 sec | 14.3 sec |
| Average Current | 123 mA | 82 mA |
| Maximum Current | 506 mA | 239 mA |
| Energy | 2.82 mWh | 1.89 mWh |

As your connection becomes weaker and weaker, not having to reconnect to the tower each time becomes more and more important.


## The future

One of the important techniques used in this code sample is the use of a Future as the return value from Particle.publish. What is a Future? It's a special returned object that encapsulates two things:

- Has the operation completed yet?
- What is the return value? In the case of `Particle.publish()`, it's the boolean success value.

By using a Future, you can make `Particle.publish()` asynchronous! This is especially helpful when using a Finite State Machine, as it keeps the state machine fully asynchronous and returns from `loop()` quickly, even with connection failures.

In this example, the publishFuture is a global variable declared:

```
particle::Future<bool> publishFuture;
```

The important difference is that even though we use the WITH_ACK flag, this does not block! We return immediately and can check the result later. This is important because otherwise the publish can end up blocking longer than our timeout and we would never go to sleep on failure. 

To use it, we just store the result from `Particle.publish()` in the `Future` instead of a `bool`.

```
publishFuture = Particle.publish("sensorTest", publishData, PRIVATE | WITH_ACK);
```

When checking the future, the `isDone()` indicates that the future has been resolved, basically this means that `Particle.publish()` would have returned.

`isSucceeded()` is whether the publish succeeded or not, which is basically the boolean return value from `Particle.publish()`.

```
if (publishFuture.isDone()) {
    if (publishFuture.isSucceeded()) {
        Log.info("successfully published %s", publishData);
        state = STATE_SLEEP;
    }
    else {
        Log.info("failed to publish, will discard sample");
        state = STATE_SLEEP;
    }
```

## The code

{{> codebox content="/assets/files/app-notes/AN028/firmware/src/Stop-Sleep-Cellular.cpp" format="cpp" height="500"}}

## Code walk-through

Standard stuff used in most of the examples:

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
// This is the maximum amount of time to wait for the cloud to be connected in
// milliseconds. This should be at least 5 minutes. If you set this limit shorter,
// on Gen 2 devices the modem may not get power cycled which may help with reconnection.
const std::chrono::milliseconds connectMaxTime = 6min;

// This is the minimum amount of time to stay connected to the cloud. You can set this
// to zero and the device will sleep as fast as possible, however you may not get 
// firmware updates and device diagnostics won't go out all of the time. Setting this
// to 10 seconds is typically a good value to use for getting updates.
const std::chrono::milliseconds cloudMinTime = 10s;

// How long to sleep
const std::chrono::seconds sleepTime = 1min;

// Maximum time to wait for publish to complete. It normally takes 20 seconds for Particle.publish
// to succeed or time out, but if cellular needs to reconnect, it could take longer, typically
// 80 seconds. This timeout should be longer than that and is just a safety net in case something
// goes wrong.
const std::chrono::milliseconds publishMaxTime = 3min;

// Maximum amount of time to wait for a user firmware download in milliseconds
// before giving up and just going back to sleep
const std::chrono::milliseconds firmwareUpdateMaxTime = 5min;

// How often to publish device diagnostics (vitals). If you set this 
// equal to the sleep period they'll be sent on every connection, or you can set
// it higher to save data. For example, if you set it to 24 * 60 * 60 it would
// only publish once per day. 
const std::chrono::seconds diagnosticPublishTime = 10min;

// How often to check for firmware updates. This requires disconnecting
// from the cloud and reconnecting, so you don't want to do it too often. For 
// non-product firmware you might want to set this to 0 (never check).
const std::chrono::seconds firmwareUpdateCheckTime = 30min;
```

Finite state machine state numbers, global variables, and some forward declarations. The forward declarations are necessary in a .cpp file when you reference the function before it's been implemented.

```
// These are the states in the finite state machine, handled in loop()
enum State {
    STATE_WAIT_CONNECTED = 0,
    STATE_READ_SENSOR,
    STATE_PUBLISH,
    STATE_PUBLISH_WAIT,
    STATE_SLEEP,
    STATE_DISCONNECT_WAIT,
    STATE_CONNECT_WAIT,
    STATE_CLOUD_WAIT,
    STATE_FIRMWARE_UPDATE,
};
State state = STATE_WAIT_CONNECTED;
unsigned long stateTime;
bool firmwareUpdateInProgress = false;
long lastFirmwareUpdateCheck = 0;
long lastDiagnosticsPublish = 0;
char publishData[256];
particle::Future<bool> publishFuture;

void firmwareUpdateHandler(system_event_t event, int param); // forward declaration
```

In order to delay sleep while an firmware upgrade is being downloaded, we use a firmware update handler. This is registered in `setup()`.

Since we're using `SEMI_AUTOMATIC` mode, it's necessary to connect to cellular and the cloud from `setup()`.

```
void setup() {
    System.on(firmware_update, firmwareUpdateHandler);

    // It's only necessary to turn cellular on and connect to the cloud. Stepping up
    // one layer at a time with Cellular.connect() and wait for Cellular.ready() can
    // be done but there's little advantage to doing so.
    Cellular.on();
    Particle.connect();
    stateTime = millis();
}
```

The `loop()` function implements the finite state machine as a switch statement.

The first state after `setup()` is `STATE_WAIT_CONNECTED`. This waits until the cloud connects and then goes into `STATE_READ_SENSOR`.

If a timeout occurs, connecting takes longer than `connectMaxTime` then it transitions into `STATE_SLEEP`.

```
void loop() {
    switch(state) {
        case STATE_WAIT_CONNECTED:
            // Wait for the connection to the Particle cloud to complete (at boot)
 
            if (Particle.connected()) {
                Log.info("connected to the cloud in %lu ms", millis() - stateTime);
                state = STATE_READ_SENSOR; 
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

The `STATE_READ_SENSOR` state just reads the value of A0 and formats JSON data for it. It doesn't really do anything useful in this example; you'd replace it with your own code to read your own sensor or generate whatever data you wanted to publish.

After doing this step, it goes into `STATE_PUBLISH`.

```
        case STATE_READ_SENSOR:
            {
                // This is just a placeholder for code that you're write for your actual situation
                int a0 = analogRead(A0);

                // Create a simple JSON string with the value of A0
                snprintf(publishData, sizeof(publishData), "{\"a0\":%d}", a0);
            }

            state = STATE_PUBLISH;
            stateTime = millis();
            break;
```

In `STATE_PUBLISH` we check the cloud connection state again. This is because on wake we skip `STATE_WAIT_CONNECTED`. `Particle.connected()` returns quickly so this is fine. If not connected, we wait for up to `connectMaxTime` for the reconnection to occur. The reconnection happens automatically, you don't need to do anything special in `SEMI_AUTOMATIC` mode.

If connected, then the publish is started and runs asynchronously using the `Future`. It goes into `STATE_PUBLISH_WAIT` to wait for the publish to complete.

```
        case STATE_PUBLISH:
            if (Particle.connected()) {
                // In this example, we use a Future. The publishFuture is a global variable declared:
                // particle::Future<bool> publishFuture;
                // The important difference is that even though we use the WITH_ACK flag, this does
                // not block! We return immediately and can check the result later. This is important
                // because otherwise the publish can end up blocking longer than our timeout and
                // we would never go to sleep on failure.                
                publishFuture = Particle.publish("sensorTest", publishData, PRIVATE | WITH_ACK);
                state = STATE_PUBLISH_WAIT;
                stateTime = millis();

            }
            else
            if (millis() - stateTime >= connectMaxTime.count()) {
                Log.info("failed to connect, going to sleep and discarding sample");
                state = STATE_SLEEP;
            }
            break;
```

The `STATE_PUBLISH_WAIT` state waits for the publish future to resolve. The `Particle.publish()` function internally retries 3 times over 20 seconds, so it's not necessary to implement another retry, though you could. The **EEPROM-Samples** examples uses an even more advanced persistent queue method.

If the publish succeeds, fails, or times out, it goes into `STATE_SLEEP`.

```
        case STATE_PUBLISH_WAIT:
            // When checking the future, the isDone() indicates that the future has been resolved, 
            // basically this means that Particle.publish would have returned.
            if (publishFuture.isDone()) {
                // isSucceeded() is whether the publish succeeded or not, which is basically the
                // boolean return value from Particle.publish.
                if (publishFuture.isSucceeded()) {
                    Log.info("successfully published %s", publishData);
                    state = STATE_SLEEP;
                }
                else {
                    Log.info("failed to publish, will discard sample");
                    state = STATE_SLEEP;
                }
            }
            else 
            if (millis() - stateTime >= publishMaxTime.count()) {
                Log.info("failed to publish, timed out, will discard sample");
                state = STATE_SLEEP;
            }
            break;
```

The `STATE_SLEEP` state does some checks before going to sleep. 

The `firmwareUpdateCheckTime` specifies how often to check for firmware updates. This requires disconnecting from the cloud and reconnecting (just the cloud, not cellular) so you probably don't want to do this too often. Maybe every 4 hours or 24 hours would be appropriate. If you set this to 0, no update check will be done. This is a appropriate for developer devices. If it's time to do a firmware update check, then `Particle.disconnect()` is called and it goes into `STATE_DISCONNECT_WAIT` state.

The `diagnosticPublishTime` specifies how often to send device diagnostics. Because this example uses stop mode sleep with network standby, device diagnostics won't be sent automatically except after reset, after firmware update check, or every 3 days. Setting it to 0 disables sending extra diagnostics beyond those.

```
        case STATE_SLEEP:
            if (Time.isValid() && Particle.connected()) {
                // If we fail to connect and timeout we can get into this state. However,
                // these two checks only work
                if (lastFirmwareUpdateCheck && firmwareUpdateCheckTime.count() && 
                    Time.now() > (lastFirmwareUpdateCheck + firmwareUpdateCheckTime.count())) {
                    // Do a firmware update check
                    Log.info("starting firmware update check");
                    Particle.disconnect();
                    state = STATE_DISCONNECT_WAIT;
                    break;
                }
                if (lastDiagnosticsPublish && diagnosticPublishTime.count() && 
                    Time.now() > (lastDiagnosticsPublish + diagnosticPublishTime.count())) {
                    Log.info("publishing device vitals");
                    Particle.publishVitals(0);
                    lastDiagnosticsPublish = Time.now();
                }
            }
```

This code does the sleep, which will block until wake-up occurs.

```
            SystemSleepConfiguration config;
            config.mode(SystemSleepMode::STOP)
                .duration(sleepTime)
                .network(NETWORK_INTERFACE_CELLULAR, SystemSleepNetworkFlag::INACTIVE_STANDBY);
            SystemSleepResult result = System.sleep(config);
```

Since this uses stop mode sleep, upon wake execution continues with the next line of code with local and global variables still set, and the cloud still connected (since network standby mode is used). In this mode the device goes immediately into breathing cyan mode.

It then goes into `STATE_READ_SENSOR` state to read the sensor and publish again.

```
            Log.info("woke from sleep");

            // Publish after waking up           
            state = STATE_READ_SENSOR;
            stateTime = millis();
            break; 
```

The `STATE_DISCONNECT_WAIT` state waits for the cloud disconnect to occur. Then it reconnects and goes into `STATE_CONNECT_WAIT` state.

```
        case STATE_DISCONNECT_WAIT:
            // In order to check for a software update we have to disconnect from the Particle
            // cloud, then reconnect. The disconnect is done in STATE_SLEEP if it's time to check
            // for an update. Note that this only disconnects from the cloud, not cellular,
            // so it only takes a few seconds and not much data (just a session resume).
            // 
            // In this state, we wait until disconnected, then reconnect and go into STATE_CONNECT_WAIT.
            if (!Particle.connected()) {
                Log.info("reconnecting to the cloud");
                Particle.connect();
                state = STATE_CONNECT_WAIT;
                stateTime = millis(); 
            }
            break;
```

The `STATE_CONNECT_WAIT` is only used during firmware update check. If the connection succeeds, it goes into `STATE_CONNECT_WAIT` state.

There is also a timeout; if a timeout occurs, for example from bad cellular connectivity, then it goes into `STATE_SLEEP` state and a firmware update check will be done on the next connection.

```
        case STATE_CONNECT_WAIT:
            // Wait for the connection to the Particle cloud to complete
            if (Particle.connected()) {
                Log.info("connected to the cloud in %lu ms, checking for updates", millis() - stateTime);
                state = STATE_CLOUD_WAIT; 
                stateTime = millis(); 

                // Note: Updates both times because connecting to the cloud will also send diagnostic data
                lastFirmwareUpdateCheck = lastDiagnosticsPublish = Time.now();
            }
            else
            if (millis() - stateTime >= connectMaxTime.count()) {
                // Took too long to connect, go to sleep
                Log.info("failed to connect, going to sleep");
                state = STATE_SLEEP;
            }
            break;
```

The `STATE_CLOUD_WAIT` state waits for `cloudMinTime` for the update to start, if one is available. This must be at least 10 seconds.

If an update starts, the `firmwareUpdateHandler()` will set the `firmwareUpdateInProgress` global variable.

```
        case STATE_CLOUD_WAIT:
            // firmwareUpdateInProgress is set from the system event handler function firmwareUpdateHandler.
            // With system thread enabled, updates are downloaded in the background while user firmware
            // continues to run, so we need to make sure we don't go to sleep while downloading.
            if (firmwareUpdateInProgress) {
                Log.info("firmware update detected");
                state = STATE_FIRMWARE_UPDATE;
                stateTime = millis();
            }
            else
            if (millis() - stateTime >= cloudMinTime.count()) {
                Log.info("no update detected, going to sleep");
                state = STATE_SLEEP;
            }
            break;
```

The `STATE_FIRMWARE_UPDATE` state keeps track of when an update starts or times out. If the update completes, the device will reset by itself and start over with calling `setup()`.

```
        case STATE_FIRMWARE_UPDATE:
            // An update is in progress. Stay awake until complete or a timeout occurs.
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
```

This bit at the bottom of the loop sets `lastFirmwareUpdateCheck` and `lastDiagnosticsPublish` after the time is available. This makes the updates occur a full interval after a reset, not immediately after reset, when they are not required.

```
    if (lastFirmwareUpdateCheck == 0 && Time.isValid()) {
        lastFirmwareUpdateCheck = Time.now();
    }
    if (lastDiagnosticsPublish == 0 && Time.isValid()) {
        lastDiagnosticsPublish = Time.now();
    }

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

- E-Series E402 (LTE Cat M1)
- Device OS 1.5.0

### Cold boot

| Measure | Value | Units |
| :--- | ---: | :--- |
| Time | 21.5 | sec |
| Mean Current | 119.0 | mA |
| Max Current | 1100.0 | mA |
| Total Power | 2.42 | mWh |
| Voltage | 3.6 | V |

The maximum current was the spike when the device turned on. It's really 474mA.


![Cold Boot Power](/assets/images/app-notes/AN028/cold-boot.png)

This is the blinking green part:

```
2111 - 0000000017 [system] INFO: Device xxx started
2169 - 0000000075 [comm] INFO: channel inited
7091 - 0000004998 [system] INFO: Sim Ready
7095 - 0000004998 [system] INFO: ARM_WLAN_WD 1
8626 - 0000006533 [system] INFO: ARM_WLAN_WD 2
8630 - 0000006533 [system] INFO: CLR_WLAN_WD 1, DHCP success
```

Here's where blinking cyan starts and authentication starts.

```
8635 - 0000006535 [system] INFO: Cloud: connecting
8639 - 0000006545 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
8646 - 0000006547 [system] ERROR: Failed to load session data from persistent storage
8653 - 0000006553 [system] INFO: Discarding session data
9258 - 0000007165 [system] INFO: Resolved xxx.udp.particle.io to 3.222.253.60
9337 - 0000007244 [system] INFO: Cloud socket connected
9342 - 0000007246 [system] INFO: Starting handshake: presense_announce=0
9348 - 0000007248 [comm.protocol.handshake] INFO: Establish secure connection
9368 - 0000007274 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=2
```

At 15.9 seconds, the device has connected to cellular and authenticated with the Particle cloud. Here's where the required startup messages are sent.

```
18085 - 0000015992 [comm.protocol.handshake] INFO: Sending HELLO message
18374 - 0000016282 [comm.protocol.handshake] INFO: Handshake completed
18380 - 0000016286 [system] INFO: Send spark/device/last_reset event
18529 - 0000016437 [system] INFO: Send subscriptions
18620 - 0000016528 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
18627 - 0000016528 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
18633 - 0000016534 [comm] INFO: Sending TIME request
18701 - 0000016609 [comm.protocol] INFO: message id 2 complete with code 0.00
18708 - 0000016609 [comm.protocol] INFO: rcv'd message type=13
18748 - 0000016656 [comm.protocol] INFO: message id 3 complete with code 0.00
18755 - 0000016656 [comm.protocol] INFO: rcv'd message type=13
18894 - 0000016802 [comm.protocol] INFO: message id 4 complete with code 0.00
18901 - 0000016802 [comm.protocol] INFO: rcv'd message type=13
19040 - 0000016948 [comm.protocol] INFO: message id 5 complete with code 0.00
19047 - 0000016948 [comm.protocol] INFO: rcv'd message type=13
19185 - 0000017093 [comm.protocol] INFO: message id 6 complete with code 0.00
19192 - 0000017093 [comm.protocol] INFO: rcv'd message type=13
19332 - 0000017240 [system] INFO: All handshake messages have been processed
19339 - 0000017240 [comm.protocol] INFO: message id 7 complete with code 2.05
19345 - 0000017246 [comm.protocol] INFO: Received TIME response: 1587650900
19351 - 0000017254 [comm.protocol] INFO: rcv'd message type=12
```

Now `Particle.connected()` will return true.

Since we're not checking for firmware updates, we can publish and go back to sleep quickly.

```
19461 - 0000017369 [system] INFO: Cloud connected
19465 - 0000017369 [app] INFO: connected to the cloud in 17294 ms
19912 - 0000017819 [comm.protocol] INFO: Posting 'S' describe message
20024 - 0000017932 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
20042 - 0000017950 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
20049 - 0000017950 [comm.protocol] INFO: rcv'd message type=1
20189 - 0000018097 [comm.protocol] INFO: Posting 'A' describe message
20224 - 0000018132 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
20230 - 0000018132 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 3
20236 - 0000018138 [comm.protocol] INFO: rcv'd message type=1
20377 - 0000018285 [comm.protocol] INFO: message id 8 complete with code 0.00
20384 - 0000018285 [comm.protocol] INFO: rcv'd message type=13
20389 - 0000018286 [app] INFO: successfully published {"a0":1688}
20394 - 0000018295 [app] INFO: going to sleep for 300 seconds
20399 - 0000018300 [comm] INFO: Waiting for Confirmed messages to be sent.
20553 - 0000018461 [comm.protocol] INFO: Posting 'M' describe message
20616 - 0000018524 [comm.protocol] INFO: rcv'd message type=1
21396 - 0000019305 [comm] INFO: All Confirmed messages sent: client(yes) server(yes)
```

### Subsequent publish


| Measure | Value | Units |
| :--- | ---: | :--- |
| Time | 1.8 | sec |
| Mean Current | 113.0 | mA |
| Max Current | 343.0 | mA |
| Total Power | 0.210 | mWh |
| Voltage | 3.6 | V |

![Subsequent publish](/assets/images/app-notes/AN028/subsequent-publish.png)

You'll notice the log is short. By using stop mode sleep with network standby, the modem and cloud connection stays up, so you can publish super quickly. The device barely blinks on as it only takes 1.8 seconds!

```
923834 - 0000023479 [comm.protocol] INFO: message id 14 complete with code 0.00
923841 - 0000023479 [comm.protocol] INFO: rcv'd message type=13
923981 - 0000023626 [comm.protocol] INFO: message id 15 complete with code 0.00
923988 - 0000023627 [app] INFO: successfully published {"a0":1587}
923994 - 0000023632 [app] INFO: going to sleep for 300 seconds
923998 - 0000023626 [comm.protocol] INFO: rcv'd message type=13
924003 - 0000023641 [comm] INFO: Waiting for Confirmed messages to be sent.
925003 - 0000024648 [comm] INFO: All Confirmed messages sent: client(yes) server(yes)
```

### Check for updates

When using this example, checking for updates requires disconnecting from the cloud, reconnecting, and waiting 10 seconds for updates.


| Measure | Value | Units |
| :--- | ---: | :--- |
| Time | 13.4 | sec |
| Mean Current | 85.4 | mA |
| Max Current | 362.0 | mA |
| Total Power | 1.15 | mWh |
| Voltage | 3.6 | V |

![Check for updates](/assets/images/app-notes/AN028/check-updates.png)


Example log:

```
1826753 - 0000029029 [comm.protocol] INFO: message id 21 complete with code 0.00
1826760 - 0000029029 [comm.protocol] INFO: rcv'd message type=13
1826899 - 0000029175 [comm.protocol] INFO: message id 22 complete with code 0.00
1826906 - 0000029177 [comm.protocol] INFO: rcv'd message type=13
1826911 - 0000029178 [app] INFO: successfully published {"a0":1600}
1826916 - 0000029186 [app] INFO: starting firmware update check
1827004 - 0000029280 [system] INFO: Cloud: disconnecting
1827034 - 0000029310 [system] INFO: Cloud: disconnected
1827039 - 0000029310 [app] INFO: reconnecting to the cloud
1827134 - 0000029410 [system] INFO: Cloud: connecting
1827139 - 0000029414 [system] INFO: Read Server Address = type:1,domain:$id.udp.particle.io
1827146 - 0000029416 [system] INFO: Loaded cloud server address and port from session data
1827223 - 0000029499 [system] INFO: Cloud socket connected
1827228 - 0000029501 [system] INFO: Starting handshake: presense_announce=0
1827234 - 0000029503 [comm.protocol.handshake] INFO: Establish secure connection
1827255 - 0000029531 [comm.dtls] WARN: session has 0 uses
1827263 - 0000029539 [comm.dtls] INFO: (CMPL,RENEG,NO_SESS,ERR) restoreStatus=0
1827270 - 0000029539 [comm.dtls] INFO: out_ctr 0,1,0,0,0,0,0,28, next_coap_id=16
1827276 - 0000029545 [comm.dtls] INFO: app state crc: cached: ddb7e23c, actual: ddb7e23c
1827283 - 0000029553 [comm.dtls] WARN: skipping hello message
1827288 - 0000029557 [comm.dtls] INFO: restored session from persisted session data. next_msg_id=22
1827296 - 0000029565 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 2
1827301 - 0000029571 [comm.protocol.handshake] INFO: resumed session - not sending HELLO message
1827353 - 0000029629 [system] INFO: cloud connected from existing session.
1827712 - 0000029988 [comm.dtls] INFO: session cmd (CLS,DIS,MOV,LOD,SAV): 4
1827719 - 0000029988 [comm.protocol] INFO: message id 23 complete with code 0.00
1827725 - 0000029994 [comm.protocol] INFO: rcv'd message type=13
1827864 - 0000030140 [comm.protocol] INFO: message id 24 complete with code 0.00
1827871 - 0000030140 [comm.protocol] INFO: rcv'd message type=13
1828009 - 0000030285 [system] INFO: All handshake messages have been processed
1828016 - 0000030285 [comm.protocol] INFO: message id 25 complete with code 0.00
1828022 - 0000030293 [comm.protocol] INFO: rcv'd message type=13
1828132 - 0000030408 [system] INFO: Cloud connected
1828136 - 0000030408 [app] INFO: connected to the cloud in 1095 ms, checking for updates
1838135 - 0000040413 [app] INFO: no update detected, going to sleep
1838142 - 0000040413 [app] INFO: going to sleep for 300 seconds
1838146 - 0000040417 [comm] INFO: Waiting for Confirmed messages to be sent.
1839146 - 0000041424 [comm] INFO: All Confirmed messages sent: client(yes) server(yes)
```
