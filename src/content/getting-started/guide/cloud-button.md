---
title: Cloud button
columns: two
layout: commonTwo.hbs
description: Cloud-connected button project
---

# {{title}}

{{section-nav}}

This section creates new firmware that sends a Particle event when you triple-tap the MODE button on your device.

## Events

Particle events are one of the [Particle primitives](/getting-started/device-os/introduction-to-device-os/#communication) used to communicate between devices and the Particle cloud. They can be sent in all four directions: device-to-cloud, cloud-to-device, device-to-device, and cloud-to-cloud. It is an one-to-many message that is temporal, not stored in the cloud. The delivery is best-effort, not guaranteed.

There's an event name (a short string), and data. It's often a string, but can be structured data such as JSON or binary data up to 16 Kbytes on some devices and Device OS versions.

When you send an event from the device to cloud, the destination is typically:

- An [integration (webhook)](/integrations/introduction/) to send data to an external service
- The server-sent-events (SSE) data stream
- Another device that subscribed to the event name
- [Particle logic](/getting-started/logic-ledger/logic/), a cloud-based solution for processing event data without requiring an external server

Events flow in the same manner with a common API regardless of network transmission method: Wi-Fi, cellular, or Ethernet. Devices with multiple networks can switch between them, for example using Wi-Fi with cellular backup on the M-SoM.

You don't specify a destination for your event - you just send it to the cloud, and whomever is interested in it will receive it. Events are always private, scoped to your account or product, so you don't need to worry about other users being able to see your events, or send you unsolicited events.

All Particle cloud communication is mutually authenticated (using RSA public-private key pairs) and encrypted (using DTLS for most devices).

## Firmware

As in the previous section, you can either:

- **Particle: Create New Project**, create CloudButton, and paste the contents CloudButton.cpp file into your file.
- Download the zip file, extract, then **Particle: Import Project**.

{{> project-browser project="CloudButton" default-file="src/CloudButton.cpp" height="400" flash="true"}}

As in the previous section, also do:

- **Particle: Configure project for device**
- **Particle: Flash application (local)**

Once the new firmware is running, you can test the functionality by triple-tap of the MODE button on the device.

## Monitoring events in the console

I've opened [console.particle.io](https://console.particle.io/), then my product (Chivalrous Pink Borons), the product device list, then my device (wombat_magnetic).

In the Events section you can see **cloudButtonTest** every time the button. Clicking on the row will show other details including the device that sent the event and a timestamp.

{{imageOverlay src="/assets/images/getting-started-guide/cloudevent-console.png" class="no-darken"}}

Below it you can see the rows that were generated when the device was flashed and restarted.

## USB serial debugging

There is a USB serial debugging log window built into Workbench using **Particle: Serial Monitor**.

You may find it useful to open a separate Terminal (Linux and Mac) or Command Prompt (Windows) window, and instead use the Particle CLI command:

```
particle serial monitor --follow
```

The CLI is installed when you install Workbench and should be available in your terminal window automatically. The `--follow` option retries connecting of the device disconnects, which occurs whenever you reset the device or flash new firmware. Press Ctrl+C or close the window to disconnect when you are done.

Here's a portion of the USB serial debug log.

You can see the `INFO: published event cloudButtonTest` message that corresponds to the Log.info() line in the code above.

Above (before) it, you can see the internal messages for sending. After it, you can see when the message was acknowledged from the cloud.

```
0000009073 [system] INFO: Cloud connected
0000009074 [comm.coap] TRACE: Sending CoAP message
0000009075 [comm.coap] TRACE: CON 0.00  size=4 token= id=180
0000009183 [comm.coap] TRACE: Received CoAP message
0000009184 [comm.coap] TRACE: ACK 0.00  size=4 token= id=180
0000009516 [comm.coap] TRACE: Received CoAP message
0000009517 [comm.coap] TRACE: CON POST /E/particle/device/updates/pending size=47 token=01 id=718
0000009519 [comm.coap] TRACE: Sending CoAP message
0000009520 [comm.coap] TRACE: ACK 0.00  size=4 token= id=718
0000026814 [comm.coap] TRACE: Sending CoAP message
0000026815 [comm.coap] TRACE: CON POST /E/cloudButtonTest size=23 token= id=181
0000026817 [app] INFO: published event cloudButtonTest, result=1
0000027915 [comm.coap] TRACE: Received CoAP message
0000027916 [comm.coap] TRACE: ACK 0.00  size=4 token= id=181
```

If you used LOG_LEVEL_INFO instead of LOG_LEVEL_TRACE all of the TRACE messages would be hidden from the log.


## Explaining the code

In this example, we use `LOG_LEVEL_TRACE`. Previously, this was `LOG_LEVEL_INFO`. The trace level is more verbose, and can be useful for troubleshooting issues.

```cpp
SerialLogHandler logHandler(LOG_LEVEL_TRACE);
```

At the top we declare some variables, one for the event name to send, and a flag that we set when we want to send an event (triple-tap MODE button).

```cpp
const char *eventName = "cloudButtonTest";
bool sendEvent = false;
```

This is a forward declaration, required in C++ when you use a function before it has been declared. 

```cpp
void buttonHandler(system_event_t event, int param);
```

In setup(), which is called once when the device starts up, it registers a [system event](/reference/device-os/api/system-events/) function. The reason for the forward declaration above is that the function buttonHandler hasn't been implemented yet, it's implemented later in the file.

```cpp
void setup()
{
    System.on(button_final_click, buttonHandler);
}
```

As before, the loop function is called frequently, normally 1000 times per second.

In this example, we check the state of the sendEvent flag if we're connected to the Particle cloud.

```cpp
void loop()
{
    if (Particle.connected()) {
        if (sendEvent) {
            sendEvent = false;
```

The reason for the Particle.connected check is that we're about to publish an event, which requires being connected to the cloud. By adding the check, the code will work even if you triple-tap the mode button before being cloud connected.

The code uses [Particle.publish](/reference/device-os/api/cloud-functions/particle-publish/) to publish an event to the cloud.

It also prints a log message to the USB serial debug log.

```cpp
            bool bResult = Particle.publish(eventName);

            Log.info("published event %s, result=%d", eventName, bResult);
        }
    }
}
```

Finally, this is the implementation of the button click handler. If the button is clicked 3 times (triple-tap) it sets the sendEvent flag.

The only reason triple-tap is used is that the device itself uses single-tap for network signal strength and double-tap for put the device into sleep mode, so those are already taken.

If are trying this and the status LED goes off, the device probably detected a double-tap. Tap the reset button to get out of sleep mode.

```cpp
void buttonHandler(system_event_t event, int param) {
	int times = system_button_clicks(param);

	if (times == 3) {
        sendEvent = true;
    }
}
```

## Next steps

This example only sends an event into the cloud, where it sort of disappears after appearing in the console. This isn't very useful by itself, but you would typically send the event to an external service using an integration (webhook). Or you might process the event in the Particle cloud by using Particle logic.

{{section-nav}}

