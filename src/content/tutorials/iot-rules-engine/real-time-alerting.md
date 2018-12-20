---
title: Real-time Alerting
layout: tutorials.hbs
columns: two
order: 101
---

# Real-time Alerting with Rules Engine

The Rules Engine makes it easy to trigger alerts in the cloud when
important events happen in the physical world. This is a very common
component of almost any IoT product.

In this tutorial,
we'll start by creating a device that measures water depth.
Then, using the Rules Engine, when the water level gets too high,  we can:

- Alert by SMS using Twilio
- Alert by email
- Alert by Slack

Using the Rules Engine makes it easy to customize the message you send and the recipients, and switch between a variety of notification methods. You can even combine them.

## Tutorial Hardware

For the hardware side of this project we're using a [eTape Liquid Level Sensor](https://www.adafruit.com/product/3827) and a Particle Photon. The device firmware reads this sensor continuously and:

- Publishes an alert notification immediately if the level exceeds 2"
- Every minute, checks to see if the level changed, and if so, publishes the new level. 

![](/assets/images/rules-engine/etape.jpg)

However, for ease of testing with ordinary parts you probably have on hand, you can simulate this using a potentiometer.

Connect the outer legs to 3V3 and GND, and the center tap to A0.

![](/assets/images/rules-engine/potentiometer.jpg)

The device firmware is included at the end of this tutorial.

## Setting up Authentication

The Rules Engine will need access to your Particle account in order to interact with your devices.

- Log into [the console](https://console.particle.io). 
- Select **Authentication** (1)
- Click **New Client** (2)

![](/assets/images/rules-engine/create-client.png)

- In the **New OAuth Client** window, select **Two-Legged Auth (Server)**
- Enter a name. I called mine **Rules Engine**.

![](/assets/images/rules-engine/new-client.png)

- Copy the Client ID (rulesengine-2316 in my example)
- Copy the Client Secret. Note that this should be kept secret, and this is the only chance you have to copy it. Once you close this window you can't get the secret back!

![](/assets/images/rules-engine/copy-secret.png)

## Setting up the flow

We'll be using a subscribe node. This allows the Rules Engine to listen for events posted by devices in your account. The firmware above publishes events periodically with the level (LevelValue), when an alarm occurs (LevelAlarm) and when it stops (LevelClear).

This is the flow we'll be creating in this section:

![](/assets/images/rules-engine/debug-node.png)

- In the Rules Engine, from the **Particle** section of the palette, drag a **subscribe** node to the flow. You'll notice it has an red triangle, so it needs to be configured. 

![](/assets/images/rules-engine/drag-subscribe.png)

- Click the pencil icon to **Add Particle config**.

![](/assets/images/rules-engine/add-particle-config.png)

- Enter your Client ID and Client Secret from the console into the Particle config window.

![](/assets/images/rules-engine/particle-config.png)

- Fill in the rest of the subscribe node configuration. 
- Set **Name** and **Event** to "LevelAlarm".
- Leave the **Device** field blank. 
- The **Scope** should be be left the default of **User**.

![](/assets/images/rules-engine/subscribe-config.png)

- From the **Output** section of the palette, drag a **debug** node next to your **subscribe** node.
- Then click on one of the handles and drag to the other to connect them.

![](/assets/images/rules-engine/debug-node.png)

- Click the Deploy button to start your flows running.
- View the **Debug** tab on the right hand side of the Rules Engine.
- Cause an alarm condition in the Photon sensor.

![](/assets/images/rules-engine/debug-output.png)

- If you didn't set up the circuit, you can simulate it using the Particle CLI:

```
particle publish "LevelAlarm" "3.0" --private
```

![](/assets/images/rules-engine/debug-output2.png)

The debug log isn't very interesting or all that useful, so lets send an SMS.

## Configure Twilio

This part of the example uses Twilio. There are some more examples below if you want to use other services.

You will need:

1. An active **Twilio account**
2. A project with **Programmable SMS enabled**
3. A Twilio **phone number** to send SMS from
4. Your account's **SID** and **Auth token**

This can all be configured quite easily using the [Twilio
Console](https://www.twilio.com/console).

- From the Twilio console, select **Programmable Messaging** and **Dashboard** (1). Then click **Show API Credentials** (2) in the upper  right. This is where you can get your Account SID and Auth Token. You'll need these later.

![](/assets/images/rules-engine/twilio-dashboard.png)

- Back in the Rules Engine, click the "hamburger icon" in the upper right of the Rules Engine window (1) then **Settings** (2).

![](/assets/images/rules-engine/settings.png)

- Click **Palette** (1).
- Then **Install** (2).
- Type **twilio** in the search box (3).
- Install the item **node-red-node-twilio** (4).

![](/assets/images/rules-engine/install-twilio.png)

- There will be a new section **mobile** in the palette with **twilio** in it.
- Drag the **twilio** node to your flow.

![](/assets/images/rules-engine/twilio-flow.png)

- Double click to configure your Twilio node. 
- Click the pencil icon to create a new configuration.
- Enter your Account SID, Twilio Phone Number, and Auth Token. 
- The name is just for display purposes and you can set it to anything.
- Click Add.

![](/assets/images/rules-engine/twilio-config.png)

- Then configure the **twilio out node**.
- Make sure **Output** is **SMS**
- Enter the phone number in the **To** field. Note that for US phone numbers, its "+1" then the phone number with area code. For other countries, the "1" would be replaced by the country code.

![](/assets/images/rules-engine/twilio-out-config.png)

- Now drag a connection from the **LevelAlarm** to the twilio node **Notify Rick**.

![](/assets/images/rules-engine/twilio-added.png)

- Deploy your flow.
- Trigger an alarm condition and you should receive an SMS!

![](/assets/images/rules-engine/received-sms.png)


## Making the output more readable

There are two problems we want to fix first.

1. Limit the number of SMS messages to at most one every 5 minutes.
2. Make the output a bit more readable than just the number of inches.

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "852e0d10.dee97",
        "type": "tab",
        "label": "Twilio 2",
        "disabled": true,
        "info": ""
    },
    {
        "id": "41e637f7.801268",
        "type": "particle-subscribe",
        "z": "852e0d10.dee97",
        "name": "LevelAlarm",
        "auth": "2fb2306c.5a31d",
        "scope": "user",
        "product": "",
        "event": "LevelAlarm",
        "device": "",
        "x": 126,
        "y": 105,
        "wires": [
            [
                "10b01643.ef841a",
                "99ba1bd6.39ea28"
            ]
        ]
    },
    {
        "id": "8ba1920d.221c2",
        "type": "function",
        "z": "852e0d10.dee97",
        "name": "Make Readable Message",
        "func": "msg.payload = \"Level alert! Level is \" + msg.payload;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 415,
        "y": 208,
        "wires": [
            [
                "a15df1ee.c3af7"
            ]
        ]
    },
    {
        "id": "99ba1bd6.39ea28",
        "type": "delay",
        "z": "852e0d10.dee97",
        "name": "Rate Limit",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "5",
        "rateUnits": "minute",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "x": 200.5,
        "y": 210,
        "wires": [
            [
                "8ba1920d.221c2"
            ]
        ]
    },
    {
        "id": "10b01643.ef841a",
        "type": "debug",
        "z": "852e0d10.dee97",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 366.5,
        "y": 102,
        "wires": []
    },
    {
        "id": "a15df1ee.c3af7",
        "type": "twilio out",
        "z": "852e0d10.dee97",
        "twilio": "e933fdc8.19c1a",
        "twilioType": "sms",
        "url": "",
        "number": "18027934458",
        "name": "Notify Rick",
        "x": 630.5,
        "y": 208,
        "wires": []
    }
]
{{/copycode}}

This is the flow we'll be building:

![](/assets/images/rules-engine/connect-nodes.png)


- In the **function** portion of the palette, select **delay**.

![](/assets/images/rules-engine/delay-palette.png)

- Drag it to your flow and double click to configure it.
- Click on **Action** and change it from **Delay** to **Rate Limit**
- Select **All messages**
- Select **1** msg(s) per **5** **Minutes**
- Select **drop intermediate messages**
- Set the name to **Rate limit** (or something else of your choosing).

![](/assets/images/rules-engine/delay-config.png)

- Find **function** in the palette in the **Function** section. Note that this is not the function in the Particle section.
- Drag it into your flow.

![](/assets/images/rules-engine/add-function-node.png)

- Double click the **function** node to configure it.
- Set the name. I made mine **Make Readable Message**.
- In the function box, set the function to:

```
msg.payload = "Level alert! Level is " + msg.payload;
return msg;
```

![](/assets/images/rules-engine/make-readable-message.png)

- Connect your nodes together by dragging between the handles.

![](/assets/images/rules-engine/connect-nodes.png)

- Deploy your flow.
- Trigger an alert level
- And you should receive a much more readable SMS message!

![](/assets/images/rules-engine/received-sms-2.png)

## Sending Email

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "d6572b76.e55bd8",
        "type": "tab",
        "label": "Email",
        "disabled": false,
        "info": ""
    },
    {
        "id": "ce05bad4.997228",
        "type": "particle-subscribe",
        "z": "d6572b76.e55bd8",
        "name": "LevelAlarm",
        "auth": "2fb2306c.5a31d",
        "scope": "user",
        "product": "",
        "event": "LevelAlarm",
        "device": "",
        "x": 396,
        "y": 102,
        "wires": [
            [
                "62a00453.80497c",
                "dc796fbd.fa0d9"
            ]
        ]
    },
    {
        "id": "8a2bb381.167fc",
        "type": "function",
        "z": "d6572b76.e55bd8",
        "name": "Make Readable Message",
        "func": "msg.payload = \"Level alert! Level is \" + msg.payload;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 685,
        "y": 205,
        "wires": [
            [
                "57188fda.f7a3b"
            ]
        ]
    },
    {
        "id": "dc796fbd.fa0d9",
        "type": "delay",
        "z": "d6572b76.e55bd8",
        "name": "Rate Limit",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "5",
        "rateUnits": "minute",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "x": 470.5,
        "y": 207,
        "wires": [
            [
                "8a2bb381.167fc"
            ]
        ]
    },
    {
        "id": "62a00453.80497c",
        "type": "debug",
        "z": "d6572b76.e55bd8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 636.5,
        "y": 99,
        "wires": []
    },
    {
        "id": "57188fda.f7a3b",
        "type": "e-mail",
        "z": "d6572b76.e55bd8",
        "server": "smtp.gmail.com",
        "port": "465",
        "secure": true,
        "name": "",
        "dname": "Mail Rick",
        "x": 906.5,
        "y": 205,
        "wires": []
    }
]

{{/copycode}}

This is the flow we'll be building:

![](/assets/images/rules-engine/email-flow.png)

In the **social** group of the palette is the **email** (out) node that you can use for email notifications.

- Drag the **email** (out) icon to your flow.
- Double click to configure it.
- **To** is the email address you're sending to
- **Server** is the SMTP email server to use. The default **smtp.gmail.com** is appropriate for gmail.
- **Port** 465 and **Use secure connection** are appropriate for gmail.
- **Userid** is your username (just the username, not the @gmail.com part)
- **Password** may be your password, but if you have Google two-factor authentication enabled, it's [an app-specific password](https://support.google.com/accounts/answer/185833?hl=en) instead.

![](/assets/images/rules-engine/email-config.png)

- Drag the handles to connect the email node to your flow.
- Deploy your flow
- Trigger an alert.
- And you should receive an email!

![](/assets/images/rules-engine/email.png)


## Posting to Slack

It's easy to post your alert in Slack using [a slack incoming webhook](https://api.slack.com/incoming-webhooks).

### Configure Slack

- At the link above, click the green button: **Create your slack app**.

![](/assets/images/rules-engine/slack-create-app.png)

- Click **Incoming webhooks**.

![](/assets/images/rules-engine/slack-configure-incoming-webhook.png)

- Click the slider (1) to **Activate Incoming Webhooks**.
 
- The click **Add New Webhook to Workspace** (2).

![](/assets/images/rules-engine/slack-activate-webhooks.png)

- Confirm your identify and select the channel to post to. I just posted to slackbot for testing, but you would normally select a real channel.

![](/assets/images/rules-engine/slack-select-channel.png)

- Copy the Slack URL, you'll need it later.

![](/assets/images/rules-engine/slack-copy-url.png)

### Add Slack to the Rules Engine

- Back in the Rules Engine, click the "hamburger icon" in the upper right of the Rules Engine window (1) then **Settings** (2).

![](/assets/images/rules-engine/settings.png)

- Click **Palette** (1).
- Then **Install (2).
- Type **slack** in the search box (3).
- Install the item **node-red-contrib-slack** (4).

![](/assets/images/rules-engine/slack-install-node.png)

### Building the slack flow

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "7258ecf0.e116f4",
        "type": "particle-subscribe",
        "z": "8c5f694d.e3dbf8",
        "name": "LevelAlarm",
        "scope": "user",
        "product": "",
        "event": "LevelAlarm",
        "device": "",
        "x": 149.5,
        "y": 163,
        "wires": [
            [
                "ded47faf.b305c"
            ]
        ]
    },
    {
        "id": "31d2ddfb.525892",
        "type": "slack",
        "z": "8c5f694d.e3dbf8",
        "name": "Post To Slack",
        "emojiIcon": "",
        "channel": "",
        "x": 643.5,
        "y": 155,
        "wires": []
    },
    {
        "id": "ded47faf.b305c",
        "type": "function",
        "z": "8c5f694d.e3dbf8",
        "name": "Make Readable Message",
        "func": "msg.payload = \"Level alert! Level is \" + msg.payload;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 376.5,
        "y": 158,
        "wires": [
            [
                "31d2ddfb.525892",
                "d9847203.6fba3"
            ]
        ]
    },
    {
        "id": "d9847203.6fba3",
        "type": "debug",
        "z": "8c5f694d.e3dbf8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 638.5,
        "y": 254,
        "wires": []
    }
]
{{/copycode}}

This is the flow we'll be building:

![](/assets/images/rules-engine/slack-flow.png)

- This flow reuses the **Level Alarm** and **Make Readable Messages** from the previous tutorial. You can either reuse that flow, or copy and paste them into a new flow.
- From the **Social** section of the palette, drag a **slack** (out) node to your flow.
- Double click to configure it.
- Set the **WebHook URL** to the webhook URL you got from Slack.
- Set the other fields as desired.

![](/assets/images/rules-engine/slack-node.png)
 
- Connect up the nodes in your flow.
- I added a debug node, but that's not required.
- Deploy.

- Cause an alarm condition, and you should see a message in Slack!

![](/assets/images/rules-engine/slack-output.png)

## Posting to Slack when a device stops reporting

This tutorial expands on the previous tutorial. 

However, the technique for reporting when a device stops responding could easily be changed to email, Twilio SMS, or any number of other notification methods.

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "25ff0990.f821c6",
        "type": "particle-subscribe",
        "z": "21fcc00.4e5e54",
        "name": "Level Test4",
        "scope": "user",
        "product": "",
        "event": "Level",
        "device": "test4",
        "x": 241,
        "y": 156,
        "wires": [
            [
                "402857ca.af1e58"
            ]
        ]
    },
    {
        "id": "402857ca.af1e58",
        "type": "trigger",
        "z": "21fcc00.4e5e54",
        "op1": "",
        "op2": "",
        "op1type": "nul",
        "op2type": "payl",
        "duration": "125",
        "extend": true,
        "units": "s",
        "reset": "",
        "bytopic": "all",
        "name": "Trigger if no response for 2 minutes",
        "x": 500.5,
        "y": 159,
        "wires": [
            [
                "b207ad88.2478d"
            ]
        ]
    },
    {
        "id": "bc8c9a9a.512268",
        "type": "slack",
        "z": "21fcc00.4e5e54",
        "name": "Post To Slack",
        "emojiIcon": "",
        "channel": "",
        "x": 556,
        "y": 313,
        "wires": []
    },
    {
        "id": "b207ad88.2478d",
        "type": "function",
        "z": "21fcc00.4e5e54",
        "name": "Make Readable Message",
        "func": "msg.payload = 'No response from ' + msg.device_id + ', last level was ' + msg.payload + ' at ' + msg.published_at;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 289,
        "y": 316,
        "wires": [
            [
                "bc8c9a9a.512268",
                "793c6f0e.d7513"
            ]
        ]
    },
    {
        "id": "793c6f0e.d7513",
        "type": "debug",
        "z": "21fcc00.4e5e54",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 551,
        "y": 412,
        "wires": []
    }
]
{{/copycode}}

This is the flow we'll be creating in this section:

![](/assets/images/rules-engine/notresponding-flow.png)

- From the **Particle** section of the palette, drag a **subscribe** node to a new flow.
- Set the **Name** to **Level Test4** (or anything else).
- Set the **Auth** to the Particle authorization you created earlier in the **Real-time Alerting** tutorial.
- Set the **Event** to **Level**. This will trigger on any of the level reporting events.
- Set the **Device** to the name of the device that's reporting. In all of the other examples, we left that field blank, but we're interested in when a specific device stops reporting here.
- Leave the **Scope** as **User**.

![](/assets/images/rules-engine/notresponding-subscribe.png)

- From the **Function** section of the palette, drag **trigger** to your flow.
- Double-click to configure it.
- Set **Send** to **nothing**.
- Set **then** to **wait for** **125** **seconds**.
- Make sure **extend delay if new message arrive** is checked.
- Set **Handling** to **all messages**
- Set the **Name** to **trigger if no response for 2 minutes** (or anything else).

![](/assets/images/rules-engine/notresponding-trigger.png)

- From the **Function** section of the palette, drag **function** to your flow. Note that this is not the function in the Particle section of the palette.
- Double-click to configure it.
- Set the **Name** to **Make Readable Message** (or anything else).
- Set the **Function** to:

```
msg.payload = 'No response from ' + msg.device_id + ', last level was ' + msg.payload + ' at ' + msg.published_at;
return msg;
```

![](/assets/images/rules-engine/notresponding-function.png)

- Copy and paste the **Post to Slack** node from the previous tutorial.
- Connect your nodes together into a flow.
- I added a debug of the payload for easier debugging.
- Deploy your flow.

- When an event has been received and it's in the two-minute timeout, a blue dot will appear in the bottom left of the **trigger** node.

![](/assets/images/rules-engine/notresponding-blue-dot.png)

- If you turn off the publishing device and wait 2 minutes, there should be a message in Slack.

![](/assets/images/rules-engine/notresponding-slack.png)

- You can easily expand this to monitor more than one device by adding more **subscribe** and **trigger** nodes. They can just feed into the existing **Make Readable Message**.



## Device firmware

The Photon is programmed with the following code. You can also use [this link](https://go.particle.io/shared_apps/5babb9b33242a939e300171a) to open it in the Particle Web IDE.


```cpp
#include "Particle.h"

SerialLogHandler logHandler;

// This is the pin the sensor is connected to
const int SENSOR_PIN = A0;

// How often to poll the sensor (in milliseconds) to see if it's in alert state
const unsigned long POLL_INTERVAL_MS = 1000;

// How often to publish the sensor (in milliseconds) if the value changes
const unsigned long PUBLISH_INTERVAL_MS = 60000;

// Used to note the last time the value was polled (value from millis())
unsigned long lastPollMs = 0;

// Used to note the last time the value was published (value from millis())
// The initial value means it will publish 3000 milliseconds after startup
unsigned long lastPublishMs = 3000 - PUBLISH_INTERVAL_MS;

// Set to true once we've alerted; flag is cleared when the level drops below ALERT_LEVEL
bool hasAlerted = false;

// The current level (read every second) that's exposed by a Particle.variable
double currentLevel = 0.0;

// The level to alert at
double alertLevel = 2.0;

// Function to read the level in inches
double readLevelInches();


void setup() {
	Serial.begin();

	// In addition to publishing the level, allow it to be retrieved as a variable
	Particle.variable("level", currentLevel);
}

void loop() {
	if (millis() - lastPollMs >= POLL_INTERVAL_MS) {
		lastPollMs = millis();

		// This block is executed once per second

		currentLevel = readLevelInches();
		if (currentLevel >= alertLevel) {
			if (!hasAlerted) {
				Particle.publish("LevelAlarm", String(currentLevel), PRIVATE);
				Log.info("Level %lf published (alarm)", currentLevel);
				hasAlerted = true;
			}
		}
		else {
			// Once level drops below the alert level, clear the hasAlerted flag
			if (hasAlerted) {
				Particle.publish("LevelClear", String(currentLevel), PRIVATE);
				Log.info("Level %lf published (alarm cleared)", currentLevel);
				hasAlerted = false;
			}
		}
	}

	if (millis() - lastPublishMs >= PUBLISH_INTERVAL_MS) {
		lastPublishMs = millis();

		// This block is executed once per minute

		double level = readLevelInches();

		Particle.publish("LevelValue", String(level), PRIVATE);
		Log.info("Level %lf published (periodic)", level);
	}
}

double readLevelInches() {
	// 

	double value = (double) analogRead(SENSOR_PIN);

	// Temporary: connect potentiometer outer pins to 3V3 and GND. Center to A0.
	// Far left =    0V = 0    = 0"
	// Far right = 3.3V = 4096 = 5.0"

	return (value * 5.0) / 4095.0;
}

```

The code above uses the testing potentiometer.
