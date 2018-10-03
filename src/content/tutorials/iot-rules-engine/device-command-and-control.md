---
title: Device Command and Control
layout: tutorials.hbs
columns: two
order: 102
---

# Device Command and Control with Rules Engine

There are two communication primitives that you can use to remotely
interact with a Particle device in real-time:

- **Functions** allow code on the device to be called when requested by
the Device Cloud. A string is passed to the function and an integer is returned.
- **Variables** allow the device to record a value. The value (integer, double, or string) is only retrieved by the cloud when needed.

The Rules Engine makes it possible to call functions and check variables
as part of a flow. This can help you tell a device to do something under
certain conditions, or check a sensor reading based on a cloud-side
trigger.

In this tutorial, we'll expand on the [previous real-time alerting tutorial](/tutorials/iot-rules-engine/device-command-and-control/) and introduce some new nodes for communicating with your Particle devices.


We'll be using the function and publish nodes in this section.


## Tutorial Hardware

For the hardware side of this project we're using a second Photon and a buzzer. 

If you don't have a buzzer, you can just use a plain Photon because the blue D7 LED turns on whenever the buzzer would be turned on, so you can see the alarm conditions that way.

![](/assets/images/rules-engine/buzzer.jpg)


## Creating the Flow


Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "c72aa09e.bb8fb",
        "type": "tab",
        "label": "Buzzer Flow",
        "disabled": false,
        "info": ""
    },
    {
        "id": "67e55e27.d5971",
        "type": "particle-subscribe",
        "z": "c72aa09e.bb8fb",
        "name": "Level",
        "auth": "2fb2306c.5a31d",
        "scope": "user",
        "product": "",
        "event": "Level",
        "device": "",
        "x": 112.5,
        "y": 136,
        "wires": [
            [
                "32c1a60c.3793ca"
            ]
        ]
    },
    {
        "id": "32c1a60c.3793ca",
        "type": "switch",
        "z": "c72aa09e.bb8fb",
        "name": "Event Type Switch",
        "property": "event",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "LevelAlarm",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "LevelClear",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 305.5,
        "y": 137,
        "wires": [
            [
                "31ea1ab9.005f66"
            ],
            [
                "8bcbc578.b48a18"
            ]
        ]
    },
    {
        "id": "31ea1ab9.005f66",
        "type": "particle-function",
        "z": "c72aa09e.bb8fb",
        "name": "Buzzer On",
        "auth": "2fb2306c.5a31d",
        "function": "buzzer",
        "argument": "on",
        "scope": "user",
        "device": "test2",
        "product": "",
        "x": 624.5,
        "y": 136,
        "wires": [
            []
        ]
    },
    {
        "id": "8bcbc578.b48a18",
        "type": "particle-function",
        "z": "c72aa09e.bb8fb",
        "name": "Buzzer Off",
        "auth": "2fb2306c.5a31d",
        "function": "buzzer",
        "argument": "off",
        "scope": "user",
        "device": "test2",
        "product": "",
        "x": 619.5,
        "y": 212,
        "wires": [
            []
        ]
    }
]
{{/copycode}}

This is the flow we'll be creating:

![](/assets/images/rules-engine/buzzer-nodes.png)

- From the **Particle** group, drag **subscribe** node to your flow.
- Double click to edit it.
- Set **Name** to **Level** (can be anything).
- Set **Auth** to the authentication we created in the real-time alerting tutorial.
- Set **Event** to **Level**. This was LevelAlert in the previous tutorial, but we really only want Level, which will match all of the Level events including LevelAlert, LevelClear, and LevelValue.
- Leave the **Device** field empty
- Leave the **Scope** at **User**.
- Click **Done**.

![](/assets/images/rules-engine/subscribe-level.png)

- From the **function** group, drag a **switch** node to your flow.
- Double click to edit it.
- Set the **Name** to **Event Type Switch** (can be anything).
- Change the *Property** to msg.**event** instead of msg.payload.
- Set the first option to **==** **LevelAlarm**.
- Click the Add button below the list box.
- Set the second option to **==** **LevelClear**.
- Click **Done**.
 
![](/assets/images/rules-engine/event-switch.png)

- Unlike the nodes we've used before, you'll notice there are two outputs from our newly created **switch** node.

![](/assets/images/rules-engine/event-switch-node.png)


- From the **Particle** group, drag **function** node to your flow.
- Double click to edit it.
- Set **Name** to **Buzzer On** (can be anything).
- Set **Auth** to the authentication we created in the real-time alerting tutorial.
- Set **Function** to **buzzer** (case-sensitive, must match what the device firmware uses).
- Set **Argument** to **on** (case-sensitive).
- Set **Device** to the name of the device that's running the buzzer.
- Leave the **Scope** at **User**.
![](/assets/images/rules-engine/buzzer-on.png)

- Create another function node, but this time:
- Set **Argument** to **off** (case-sensitive).

![](/assets/images/rules-engine/buzzer-off.png)

- Connect the nodes together as pictured.
- Deploy your flow.

- Causing an level alarm situation should turn on the buzzer.
- Removing the level alarm situation should turn off the buzzer.


## Device firmware

The Photon is programmed with the following code. You can also use [this link](https://go.particle.io/shared_apps/5babbaa43242a990ac0015b5) to open it in the Particle Web IDE.

```cpp
#include "Particle.h"

SerialLogHandler logHandler;

// This is the pin the buzzer is connected to
const int BUZZER_PIN = D2;
const int LED_PIN = D7;

void buttonHandler(system_event_t event);
int buzzerFunction(String cmd);

void setup() {
	Serial.begin();

	pinMode(BUZZER_PIN, OUTPUT);
	digitalWrite(BUZZER_PIN, LOW);

	pinMode(LED_PIN, OUTPUT);
	digitalWrite(LED_PIN, LOW);

	Particle.function("buzzer", buzzerFunction);

	System.on(button_click, buttonHandler);
}

void loop() {
}

int buzzerFunction(String cmd) {
	if (cmd.equals("on")) {
		digitalWrite(BUZZER_PIN, HIGH);
		digitalWrite(LED_PIN, HIGH);
	}
	else {
		digitalWrite(BUZZER_PIN, LOW);
		digitalWrite(LED_PIN, LOW);
	}
	return 0;
}

void buttonHandler(system_event_t event) {
	// Clicking the SETUP button mutes the buzzer.
	// The blue D7 LED will stay lit until the alarm condition is no longer occurring.
	digitalWrite(BUZZER_PIN, LOW);
}
```

### Variables

In the **Particle** section of the palette, a **variable** allows a flow to get a value from a specific device in real-time. This node is used in the **Visualization and Analytics** tutorial, **Querying the value**.


### Publish

Instead of using a Particle function to turn on a buzzer on a specific device, you can use Particle publish to notify any buzzer in your account. You can have as many as you want, without changing the Rules Engine code!

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "1bf0248c.fd2f6b",
        "type": "tab",
        "label": "Buzzer 2",
        "disabled": false,
        "info": ""
    },
    {
        "id": "e58b8f89.261a9",
        "type": "particle-subscribe",
        "z": "1bf0248c.fd2f6b",
        "name": "Level",
        "auth": "2fb2306c.5a31d",
        "scope": "user",
        "product": "",
        "event": "Level",
        "device": "",
        "x": 122.5,
        "y": 110,
        "wires": [
            [
                "3eb56a52.1cd756",
                "9e88b02d.5ce62"
            ]
        ]
    },
    {
        "id": "3eb56a52.1cd756",
        "type": "function",
        "z": "1bf0248c.fd2f6b",
        "name": "Set Payload",
        "func": "if (msg.event === 'LevelAlarm') {\n    // LevelAlarm turns on the buzzer\n    msg.payload = 'on';\n}\nelse\nif (msg.event === 'LevelClear') {\n    // LevelClear turns off the buzzer\n    msg.payload = 'off';\n}\nelse {\n    // Ignore any other event\n    // (most likely LevelValue)\n    return null;\n}\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 308.5,
        "y": 112,
        "wires": [
            [
                "fec85b62.05dc18",
                "69ee497e.65ff98"
            ]
        ]
    },
    {
        "id": "fec85b62.05dc18",
        "type": "debug",
        "z": "1bf0248c.fd2f6b",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 553.5,
        "y": 205,
        "wires": []
    },
    {
        "id": "69ee497e.65ff98",
        "type": "particle-publish",
        "z": "1bf0248c.fd2f6b",
        "name": "Publish alertBuzzer",
        "auth": "3381abaa.6ace34",
        "scope": "user",
        "product": "",
        "event": "alertBuzzer",
        "x": 566.5,
        "y": 113,
        "wires": []
    },
    {
        "id": "9e88b02d.5ce62",
        "type": "debug",
        "z": "1bf0248c.fd2f6b",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 290.5,
        "y": 209,
        "wires": []
    }
]
{{/copycode}}

This is the flow we'll be creating:

![](/assets/images/rules-engine/buzzer2-flow.png)

- From the Particle group, drag a **subscribe** node to the workspace.
- Double click to edit.
- Set the Name, Auth, and Event ("Level").
- Leave the Device field blank (allow all devices)

![](/assets/images/rules-engine/buzzer2-1.png)

- In the Function section, drag a **function** node into the workspace. Note that this is a function function, not a Particle function!
- Set the function to:

```
if (msg.event === 'LevelAlarm') {
    // LevelAlarm turns on the buzzer
    msg.payload = 'on';
}
else
if (msg.event === 'LevelClear') {
    // LevelClear turns off the buzzer
    msg.payload = 'off';
}
else {
    // Ignore any other event
    // (most likely LevelValue)
    return null;
}

return msg;
```

![](/assets/images/rules-engine/buzzer2-2.png)

- From the Particle group, drag a **publish** node to the workspace.
- Double click to edit.
- Set the Name, Auth, and Event ("alertBuzzer").

![](/assets/images/rules-engine/buzzer2-3.png)

The firmware on the device is quite similar. You can also use [this link](https://go.particle.io/shared_apps/5babbae73242a9571a00172f) to open it in the Particle Web IDE.

```
#include "Particle.h"

SerialLogHandler logHandler;

// This is the pin the buzzer is connected to
const int BUZZER_PIN = D2;
const int LED_PIN = D7;

void buttonHandler(system_event_t event);
void buzzerHandler(const char *event, const char *param);

void setup() {
	Serial.begin();

	pinMode(BUZZER_PIN, OUTPUT);
	digitalWrite(BUZZER_PIN, LOW);

	pinMode(LED_PIN, OUTPUT);
	digitalWrite(LED_PIN, LOW);

	Particle.subscribe("alertBuzzer", buzzerHandler, MY_DEVICES);

	System.on(button_click, buttonHandler);
}

void loop() {
}

void buzzerHandler(const char *event, const char *data) {
	Log.info("buzzerHandler %s %s", event, data);

	if (strcmp(data, "on") == 0) {
		digitalWrite(BUZZER_PIN, HIGH);
		digitalWrite(LED_PIN, HIGH);
	}
	else {
		digitalWrite(BUZZER_PIN, LOW);
		digitalWrite(LED_PIN, LOW);
	}
}

void buttonHandler(system_event_t event) {
	// Clicking the SETUP button mutes the buzzer.
	// The blue D7 LED will stay lit until the alarm condition is no longer occurring.
	digitalWrite(BUZZER_PIN, LOW);
}
```


The debug log in the Rules Engine can be helpful as well:

![](/assets/images/rules-engine/buzzer2-log.png)
