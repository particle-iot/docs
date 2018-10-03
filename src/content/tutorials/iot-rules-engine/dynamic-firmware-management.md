---
title: Dynamic Firmware Management
layout: tutorials.hbs
columns: two
order: 107
---

# Dynamic Firmware Management with Rules Engine

In many cases, adding business logic around when over-the-air (OTA) firmware
updates are delivered can lead to a better end-user experience. This
automation can make OTA updates more seamless and intelligent, with less need for manual
intervention.

This tutorial shows how to dynamically update application firmware
running on a device using the Rules Engine.

The sample hardware is a Photon with an illuminated button. When there's a firmware update available, the button lights up. Pressing the button installs the update!

![](/assets/images/rules-engine/firmware-device.jpg)

- At startup and every 10 minutes, the Photon sends a checkFirmware event to the cloud with its current product firmware version number.
- If there is a newer version of product firmware available, the Rules Engine calls the device's updateAvailable function.
- The function handler turns on the LED within the button. This is the there's a firmware update available for this device signal.
- As soon as the user presses the illuminated button, the Rules Engine will initiate a lock and flash for the device, causing it to be updated.

![](/assets/images/rules-engine/firmwareUpdate.png)

The Rules Engine flow has three parts:

- Getting the firmware version list
- Handling the checkFirmware event
- Handling the updateFirmware event


![](/assets/images/rules-engine/firmware-flow.png)

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "3e13e0f6.dbb73",
        "type": "tab",
        "label": "Firmware Update",
        "disabled": false,
        "info": ""
    },
    {
        "id": "2b3afb58.74fd74",
        "type": "inject",
        "z": "3e13e0f6.dbb73",
        "name": "At start and every 10 minutes",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "600",
        "crontab": "",
        "once": true,
        "onceDelay": "2",
        "x": 171.5,
        "y": 178,
        "wires": [
            [
                "a97c42c6.acbc5"
            ]
        ]
    },
    {
        "id": "a97c42c6.acbc5",
        "type": "particle-api",
        "z": "3e13e0f6.dbb73",
        "name": "Get Firmware List",
        "auth": "f9c2aa05.593d98",
        "method": "get",
        "url": "/v1/products/8097/firmware",
        "x": 131.5,
        "y": 268,
        "wires": [
            [
                "3c439e40.27ac72"
            ]
        ]
    },
    {
        "id": "c28920f0.d4091",
        "type": "debug",
        "z": "3e13e0f6.dbb73",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 628.5,
        "y": 704,
        "wires": []
    },
    {
        "id": "3c439e40.27ac72",
        "type": "function",
        "z": "3e13e0f6.dbb73",
        "name": "Save Latest Firmware Version",
        "func": "var latest = 0;\n\nfor(var ii = 0; ii < msg.payload.length; ii++) {\n    if (msg.payload[ii].version > latest) {\n        latest = msg.payload[ii].version;\n    }\n}\n\nflow.set('latestFirmwareVersion', latest);\n\nmsg.payload = latest;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 402.5,
        "y": 269,
        "wires": [
            []
        ]
    },
    {
        "id": "59562fa9.c368",
        "type": "particle-subscribe",
        "z": "3e13e0f6.dbb73",
        "name": "Check Firmware Event",
        "auth": "f9c2aa05.593d98",
        "scope": "user",
        "product": "8097",
        "event": "checkFirmware",
        "device": "",
        "x": 139.5,
        "y": 382,
        "wires": [
            [
                "6c468792.ca21c8",
                "471f758d.69dcec"
            ]
        ]
    },
    {
        "id": "6c468792.ca21c8",
        "type": "function",
        "z": "3e13e0f6.dbb73",
        "name": "Compare Version",
        "func": "var deviceFirmwareVersion = parseInt(msg.payload);\n\nvar latestFirmwareVersion = flow.get('latestFirmwareVersion');\n\nif (!latestFirmwareVersion || deviceFirmwareVersion >= latestFirmwareVersion) {\n    // No latest firmware version, or it's the same or newer    \n    return null;\n}\n\nmsg.argument = ''; // latestFirmwareVersion;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 415.5,
        "y": 389,
        "wires": [
            [
                "f9dbf575.732708"
            ]
        ]
    },
    {
        "id": "f9dbf575.732708",
        "type": "particle-function",
        "z": "3e13e0f6.dbb73",
        "name": "Notify New Version",
        "auth": "f9c2aa05.593d98",
        "function": "updateAvailable",
        "argument": "",
        "scope": "user",
        "device": "",
        "product": "8097",
        "x": 661.5,
        "y": 387,
        "wires": [
            []
        ]
    },
    {
        "id": "f2e2324c.d9a27",
        "type": "particle-subscribe",
        "z": "3e13e0f6.dbb73",
        "name": "Update Firmware Event",
        "auth": "f9c2aa05.593d98",
        "scope": "user",
        "product": "8097",
        "event": "updateFirmware",
        "device": "",
        "x": 150.5,
        "y": 638,
        "wires": [
            [
                "c10115c7.b1c9c8"
            ]
        ]
    },
    {
        "id": "19709034.cbe26",
        "type": "particle-api",
        "z": "3e13e0f6.dbb73",
        "name": "Lock And Flash",
        "auth": "f9c2aa05.593d98",
        "method": "put",
        "url": "",
        "x": 645.5,
        "y": 634,
        "wires": [
            []
        ]
    },
    {
        "id": "c10115c7.b1c9c8",
        "type": "function",
        "z": "3e13e0f6.dbb73",
        "name": "Prepare Request",
        "func": "var latestFirmwareVersion = flow.get('latestFirmwareVersion');\n\n\nmsg.url = '/v1/products/8097/devices/' + msg.device;\n\nvar req = {};\nreq.desired_firmware_version = latestFirmwareVersion;\nreq.flash = true;\n\nmsg.payload = JSON.stringify(req);\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "x": 412.5,
        "y": 635,
        "wires": [
            [
                "19709034.cbe26",
                "c28920f0.d4091"
            ]
        ]
    },
    {
        "id": "471f758d.69dcec",
        "type": "debug",
        "z": "3e13e0f6.dbb73",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 391.5,
        "y": 455,
        "wires": []
    }
]
{{/copycode}}

## Getting the firmware version list

In this section we'll get the list of firmware versions using the Particle cloud API and save the version number of the most recent version.

![](/assets/images/rules-engine/firmware-get-list.png)

- In the Input section, drag an **inject** node into the workspace.
- Double click to edit
- Set **Inject once after 2 seconds**
- Set **Repeat interval**
- Set **every 10 minutes**

This will retrieve the list of firmware versions at startup and every 10 minutes thereafter.

![](/assets/images/rules-engine/firmware-1.png)

- In the Particle section, drag a **particle api** node into the workspace.
- Double click to edit
- Set your product authentication
- Set **Method GET**
- Set **URL /v1/products/8097/firmware**

Make sure you select your product client ID and secret, not your personal account. Also make sure you change 8097 to your product ID.

![](/assets/images/rules-engine/firmware-2.png)

- In the Function section, drag a **function** node into the workspace. Note that this is a function function, not a Particle function!
- Set the function to:

```
var latest = 0;

for(var ii = 0; ii < msg.payload.length; ii++) {
    if (msg.payload[ii].version > latest) {
        latest = msg.payload[ii].version;
    }
}

flow.set('latestFirmwareVersion', latest);

msg.payload = latest;

return msg;
```

This saves the latest version number the flow variable lastestFirmwareVersion so it can be used by other parts of the flow.

![](/assets/images/rules-engine/firmware-3.png)


## Handling the checkFirmware event

In this section we'll handle the checkFirmware event that the device sends to the cloud when it wants to know if there's new firmware.

![](/assets/images/rules-engine/firmware-check.png)

- From the Particle group, drag a **subscribe** node to the workspace.
- Double click to edit.
- Set the Name, Auth, and Event ("checkFirmware").
- Leave the Device field blank (allow all devices)
- Set the Scope to **Product** and set your Product ID (mine is 8097).

![](/assets/images/rules-engine/firmware-4.png)

- In the Function section, drag a **function** node into the workspace. Note that this is a function function, not a Particle function!
- Set the function to:

```
var deviceFirmwareVersion = parseInt(msg.payload);

var latestFirmwareVersion = flow.get('latestFirmwareVersion');

if (!latestFirmwareVersion || deviceFirmwareVersion >= latestFirmwareVersion) {
    // No latest firmware version, or it's the same or newer    
    return null;
}

msg.argument = ''; // latestFirmwareVersion;

return msg;
```

What this does is compare the firmware version sent from the device (deviceFirmwareVersion) to the latestFirmwareVersion that the previous flow generated.

If there is no update available, the flow returns null, which means the remainder of the nodes in the flow will not be executed.

If there is an update, control will pass to the next node.

![](/assets/images/rules-engine/firmware-5.png)

- From the Particle group, drag a **function** node to the workspace. Note that this one is a Particle function, not a Function function!
- Double click to edit.
- Set the Name, Auth, and function ("updateAvailable")
- Set the Scope to **Product** and set your Product ID (mine is 8097).

This node uses the Particle function to call the updateAvailable function handler in the device firmware. This turns on the LED in the button so the user knows there is an update available.

![](/assets/images/rules-engine/firmware-6.png)


## Handling the updateFirmware event

![](/assets/images/rules-engine/firmware-update.png)

This section handles the request from the device to update its firmware now. 

- From the Particle group, drag a **subscribe** node to the workspace.
- Double click to edit.
- Set the Name, Auth, and Event ("updateFirmware").
- Leave the Device field blank (allow all devices)
- Set the Scope to **Product** and set your Product ID (mine is 8097).

![](/assets/images/rules-engine/firmware-7.png)

- In the Function section, drag a **function** node into the workspace. Note that this is a function function, not a Particle function!
- Set the function to:

```
var latestFirmwareVersion = flow.get('latestFirmwareVersion');

msg.url = '/v1/products/8097/devices/' + msg.device;

var req = {};
req.desired_firmware_version = latestFirmwareVersion;
req.flash = true;

msg.payload = JSON.stringify(req);

return msg;
```

This gets the latest firmware version and then creates a Particle API request to lock and flash that version.

![](/assets/images/rules-engine/firmware-8.png)

- In the Particle section, drag a **particle api** node into the workspace.
- Double click to edit.
- Set your product authentication.
- Set **Method PUT**.

You can leave the rest blank as the URL and request are set by the previous node.

![](/assets/images/rules-engine/firmware-9.png)


## Device Firmware

The Photon is programmed with the following code. You can also use [this link](https://go.particle.io/shared_apps/5babba3d3242a9571a001728) to open it in the Particle Web IDE.

```
#include "Particle.h"

// particle compile photon --target 0.8.0-rc.10 --saveTo firmware.bin

PRODUCT_ID(8097);
PRODUCT_VERSION(6);
SYSTEM_THREAD(ENABLED);

#include "neopixel.h"
#include "Debounce.h"


SerialLogHandler logHandler;

const int NEOPIXEL_PIN = D2;
const size_t NEOPIXEL_COUNT = 1;
const int NEOPIXEL_BRIGHTNESS = 15;
Adafruit_NeoPixel strip(NEOPIXEL_COUNT, NEOPIXEL_PIN, WS2812B);
Debounce button;

const int SWITCH_IN_PIN = D5;
const int SWITCH_LED_PIN = D3;

const unsigned long VERSION_CHECK_PERIOD_MS = 10 * 60 * 1000; // Every 10 minutes
unsigned long lastVersionCheck = 0;
unsigned long versionCheckPeriod = 10000; // Initially 10 seconds
bool updateAvailable = false;

extern uint16_t __system_product_version; // This is where PRODUCT_VERSION is saved to

int updateAvailableHandler(String param);


void setup() {
	Serial.begin();

	Particle.function("updateAvailable", updateAvailableHandler);

	button.attach(SWITCH_IN_PIN, INPUT_PULLUP);

	pinMode(SWITCH_LED_PIN, OUTPUT);
	digitalWrite(SWITCH_LED_PIN, LOW);

	strip.setBrightness(NEOPIXEL_BRIGHTNESS);
	strip.begin();
}

void loop() {
	if (button.update() && button.fell()) {
		Log.info("button pressed");
		if (updateAvailable && Particle.connected()) {
			updateAvailable = false;
			digitalWrite(SWITCH_LED_PIN, LOW);

			Particle.publish("updateFirmware", "", PRIVATE);
		}
	}

	if (millis() - lastVersionCheck >= versionCheckPeriod) {
		lastVersionCheck = millis();

		if (Particle.connected()) {
			// Check firmware version
			char buf[32];
			snprintf(buf, sizeof(buf), "%d", __system_product_version);
			Particle.publish("checkFirmware", buf, PRIVATE);
			Log.info("requesting checkFirmware %s", buf);

			versionCheckPeriod = VERSION_CHECK_PERIOD_MS;
		}
		else {
			// Not connected, check again in 10 seconds
			versionCheckPeriod = 10000;
		}
	}
}

int updateAvailableHandler(String param) {
	Log.info("updateAvailable %s", param.c_str());

	digitalWrite(SWITCH_LED_PIN, HIGH);
	updateAvailable = true;

	return 0;
}
```

The project.properties file adds these libraries:

```
dependencies.neopixel=0.0.14
dependencies.Debounce=0.0.1
```

