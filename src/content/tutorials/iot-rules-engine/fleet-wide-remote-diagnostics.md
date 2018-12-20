---
title: Fleet-wide Remote Diagnostics
layout: tutorials.hbs
columns: two
order: 105
---

# Fleet-wide Remote Diagnostics with Rules Engine

Remote Diagnostics allow you to monitor the health of your fleet of
devices in real time. The Rules Engine can help you understand device
health indicators in aggregate.

## Flagging devices based on diagnostic data

In this section, we'll use the diagnostic data to automatically add devices to a group "investigate" when they report bad signal strength.

![](/assets/images/rules-engine/grouping-console.png)

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "dca81592.1511d8",
        "type": "tab",
        "label": "Grouping",
        "disabled": false,
        "info": ""
    },
    {
        "id": "37b9c5c0.10fd0a",
        "type": "particle-subscribe",
        "z": "dca81592.1511d8",
        "name": "Diagnostics Update",
        "auth": "3381abaa.6ace34",
        "scope": "user",
        "product": "1319",
        "event": "spark/device/diagnostics/update",
        "device": "",
        "x": 132.5,
        "y": 193,
        "wires": [
            [
                "488e68b3.aad758",
                "2ae20af3.4398a6"
            ]
        ]
    },
    {
        "id": "488e68b3.aad758",
        "type": "debug",
        "z": "dca81592.1511d8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 356.5,
        "y": 111,
        "wires": []
    },
    {
        "id": "2ae20af3.4398a6",
        "type": "function",
        "z": "dca81592.1511d8",
        "name": "Check RSSI",
        "func": "var jsonPayload = JSON.parse(msg.payload);\n\nvar rssi = jsonPayload.device.network.signal.rssi;\n\nif (rssi > -70) {\n    // Strong signal - ignore\n    return null;\n}\n\n// Weak signal - pass this device along for grouping\n// First get the existing group data\nmsg.url = '/v1/products/1319/devices/' + msg.device;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 353.5,
        "y": 190,
        "wires": [
            [
                "f15558f1.d60718"
            ]
        ]
    },
    {
        "id": "f15558f1.d60718",
        "type": "particle-api",
        "z": "dca81592.1511d8",
        "name": "Get Device Info",
        "auth": "3381abaa.6ace34",
        "method": "get",
        "url": "",
        "x": 557.5,
        "y": 190,
        "wires": [
            [
                "f0c87e71.6ce59"
            ]
        ]
    },
    {
        "id": "f0c87e71.6ce59",
        "type": "function",
        "z": "dca81592.1511d8",
        "name": "Add to investigate group",
        "func": "\nvar groups = msg.payload.groups;\ngroups.push('investigate');\n\nmsg.url = '/v1/products/1319/devices/' + msg.device;\n\nvar req = {};\nreq.groups = groups;\n\nmsg.payload = JSON.stringify(req);\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "x": 199.5,
        "y": 330,
        "wires": [
            [
                "30ddcb31.09ea74",
                "f68ffd40.b114b"
            ]
        ]
    },
    {
        "id": "30ddcb31.09ea74",
        "type": "debug",
        "z": "dca81592.1511d8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 447.5,
        "y": 421,
        "wires": []
    },
    {
        "id": "f68ffd40.b114b",
        "type": "particle-api",
        "z": "dca81592.1511d8",
        "name": "Update Groups",
        "auth": "3381abaa.6ace34",
        "method": "put",
        "url": "",
        "x": 460.5,
        "y": 332,
        "wires": [
            []
        ]
    }
]
{{/copycode}}

We'll be creating this flow:

![](/assets/images/rules-engine/grouping-flow.png)

- From the Particle group, drag a **subscribe** node to the workspace.
- Double click to edit.
- Set the Name, Auth, and Event ("spark/device/diagnostics/update").
- Leave the Device field blank (allow all devices)
- Set the Scope to **Product** and set your Product ID (mine is 1319).

![](/assets/images/rules-engine/grouping-1.png)

- From the Function group, drag a function node to the workspace. Note that this is a Function function, not a Particle function!
- Double click to edit.
- Set the function body to:

```
var jsonPayload = JSON.parse(msg.payload);

var rssi = jsonPayload.device.network.signal.rssi;

if (rssi > -70) {
    // Strong signal - ignore
    return null;
}

// Weak signal - pass this device along for grouping
// First get the existing group data
msg.url = '/v1/products/1319/devices/' + msg.device;

return msg;
```

This checks the RSSI (signal strength), and if it's low, starts by querying the existing information for this device.

![](/assets/images/rules-engine/grouping-2.png)

- In the Particle section, drag a **particle api** node into the workspace.
- Double click to edit.
- Set your product authentication.
- Set **Method GET**.
- Leave the URL field blank, as it's set by the previous function node.

![](/assets/images/rules-engine/grouping-3.png)

- From the Function group, drag a function node to the workspace. Note that this is a Function function, not a Particle function!
- Double click to edit.
- Set the function body to:

```
var groups = msg.payload.groups;
groups.push('investigate');

msg.url = '/v1/products/1319/devices/' + msg.device;

var req = {};
req.groups = groups;

msg.payload = JSON.stringify(req);

return msg;
```

This adds "investigate" group to the existing device groups for this device and prepares the Particle API request.

![](/assets/images/rules-engine/grouping-4.png)

- In the Particle section, drag a **particle api** node into the workspace.
- Double click to edit.
- Set your product authentication.
- Set **Method PUT**.
- Leave the URL field blank, as it's set by the previous function node.

![](/assets/images/rules-engine/grouping-5.png)

- Connect the nodes as pictured above.
- Deploy!

The Rules Engine debug log should show something like this:

![](/assets/images/rules-engine/grouping-log.png)


## Showing tables of devices in the dashboard

In this section we will:

- Show a table of devices in the dashboard
- Automatically update the temperatures from all of the sensors

Adding on this, in the second part we will:

- Add rules so when the temperature is out of range, the LED turn red

And in the third part we will:

- Add device diagnostics to the table, to show the current Wi-Fi signal strength (RSSI) for the sensor

We'll be using our demonstration temperature monitor product. The hardware consists of a Photon, a temperature sensor, and a bright RGB LED for alerting.

![](/assets/images/rules-engine/tempmon-board.jpg)

The device firmware can be found at [this link](https://go.particle.io/shared_apps/5babbb363242a9ea27001621).

This tutorial also shows how to use product mode to interact with a Particle product vs. individual developer devices.

## Product name flow

All of the flows in this section use this recipe to map the device IDs in the events into device names. It's a handy technique to include in your scripts.


We'll be setting up this flow:

![](/assets/images/rules-engine/product-name-flow.png)

- In the Input section, drag an **inject** node into the workspace.
- Double click to edit
- Set **Inject once after 1 seconds**
- Set **Repeat interval**
- Set **every 4 hours**

![](/assets/images/rules-engine/product-name-1.png)

- In the Particle section, drag a **particle api** node into the workspace.
- Double click to edit
- Set your product authentication
- Set **Method GET**
- Set **URL /v1/products/1319/devices**

Make sure you select your product client ID and secret, not your personal account. Also make sure you change 1319 to your product ID.

![](/assets/images/rules-engine/product-name-2.png)

The last node in the flow saves the data so it can be used by other nodes in the flow.

- In the Function section, drag a **function** node into the workspace. Note that this is a function function, not a Particle function!
- Set the function to:

```
// Feedback from the Particle API node
var deviceNames = {};

// Payload devices is an array of devices in devices for this product
for(var ii = 0; ii < msg.payload.devices.length; ii++) {
    deviceNames[msg.payload.devices[ii].id] = msg.payload.devices[ii].name;    
}
    
// Save for future use by this flow    
flow.set('deviceNames', deviceNames);

node.log('got ' + msg.payload.devices.length + ' device names');

return null;
```

What this does is that the response from the list devices API request, and build a table (hash) of mappings from device ID to device name and saves it so other nodes in the flow can access the information.

![](/assets/images/rules-engine/product-name-3.png)



## Show temperature in dashboard

While this example uses temperatures, you could use this technique for displaying a table of any values generated by your sensors.

![](/assets/images/rules-engine/tempmon-dashboard.png)



We'll be creating this flow to process the tempmon events.

![](/assets/images/rules-engine/tempmon-table-flow.png)

- From the Particle group, drag a **subscribe** node to the workspace.
- Double click to edit.
- Set the Name, Auth, and Event.
- Leave the Device field blank (allow all devices)
- Set the Scope to **Product** and set your Product ID (mine is 1319).

![](/assets/images/rules-engine/tempmon-table-1.png)

- From the Function group, drag a function node to the workspace. Note that this is a Function function, not a Particle function!
- Double click to edit.
- Set the function body to:

```
var deviceValues = context.get('deviceValues');
if (deviceValues === undefined) {
    deviceValues = {};
}

var deviceNames = flow.get('deviceNames');

var deviceName;

if (deviceNames != undefined && deviceNames[msg.device]) {
    deviceName = deviceNames[msg.device];
}
else {
    deviceName = msg.device;
}

deviceValues[msg.device] = {
    device:msg.device,
    name:deviceName,
    value:msg.payload
};

context.set('deviceValues', deviceValues);

msg.payload = {deviceValues:deviceValues};

return msg;
```

What this does is:

- Get the saved deviceNames object for this flow, creating it if necessary.
- Convert the device ID to a name (if possible).
- Save the device ID, device name, and the value 


![](/assets/images/rules-engine/tempmon-table-2.png)

- From the Dashboard group, drag a **template** node to the workspace.
- Set the template as follows: 

```
<div layout="row" layout-align="start center">
  <span flex>Device</span>
  <span flex>Temperature</span>
</div>
<div layout="row" layout-align="start center" ng-repeat="device in msg.payload.deviceValues">
  <span flex style="color: black">\{{device.name}}</span>
  <span flex style="color: black">\{{device.value}}</span>
</div>
```

What this does is create an automatically expanding table of devices.

![](/assets/images/rules-engine/tempmon-table-3.png)

- Deploy the flow and view the dashboard

The output should look like the table in the beginning of this section.


## Add business logic and feedback

One thing you can do with the Rules Engine is put your business logic in a more easily edited Rules Engine. For example, we'll add a feature to turn the LED on the board red when the temperature is too high.

Rather than embedding the temperatures and logic in the device firmware, we can put it in the Rules Engine. This makes it easy to change the limits without rebuilding and deploying code. 

Also, you have complete flexibility. Want to have multiple levels so when the temperature gets really high it blinks red? It's a simple change in the Rules Engine!


![](/assets/images/rules-engine/tempmon-rule-flow.png)

This builds on the previous example.

- From the Function group, drag a function node to the workspace. Note that this is a Function function, not a Particle function!
- Double click to edit.
- Set the function body to:

```
var temp = parseFloat(msg.payload);
if (temp < 82.0) {
    // LED0 gray (404040)
    msg.argument = '0404040'; 
}
else {
    // LED0 red (ff0000)
    msg.argument = '0ff0000'; 
}

return msg;
```

This is the business logic. It maps a temperature threshold (82.0) to a command to device firmware.

- Setting the argument to 0404040 sets the LED to light gray.
- Setting the argument to 0ff0000 sets the LED to red.

![](/assets/images/rules-engine/tempmon-rule-1.png)

- From the Particle group, drag a **function** to the workspace.
- Set the parameters as follows.
- Make sure you set the Product to your Product ID

![](/assets/images/rules-engine/tempmon-rule-2.png)

The Debug log in the Rules Engine can be helpful in diagnosing any problems you encounter.

![](/assets/images/rules-engine/tempmon-rule-debug.png)


## Add device diagnostics

While the table of temperatures is nice, you can use the Rules Engine to mix in all sorts of other information. In this example, we use the device diagnostics feature to log the Wi-Fi signal strength (RSSI) in the table as well.

![](/assets/images/rules-engine/tempmon-diag-dashboard.png)

We'll just add a few nodes on the table example.

![](/assets/images/rules-engine/tempmon-diag-flow.png)

- From the Particle group, drag a **subscribe** node to the workspace.
- Double click to edit.
- Set the Name, Auth, and Event ("spark/device/diagnostics/update").
- Leave the Device field blank (allow all devices)
- Set the Scope to **Product** and set your Product ID (mine is 1319).

![](/assets/images/rules-engine/tempmon-diag-1.png)

- From the Function group, drag a function node to the workspace. Note that this is a Function function, not a Particle function!
- Double click to edit.
- Set the function body to:

```
var deviceValues = flow.get('deviceValues');
if (deviceValues === undefined) {
    deviceValues = {};
}

var thisDeviceValues = deviceValues[msg.device];
if (thisDeviceValues === undefined) {
    thisDeviceValues = {};
}

var jsonPayload = JSON.parse(msg.payload);

thisDeviceValues.rssi = jsonPayload.device.network.signal.rssi;

deviceValues[msg.device] = thisDeviceValues;

flow.set('deviceValues', deviceValues);

msg.payload = {deviceValues:deviceValues};

return msg;
```

![](/assets/images/rules-engine/tempmon-diag-2.png)

- Connect the output of the function node Update Signal In Table into the Device Info Table node.
- Edit the Device Info Table node to add the new columns to the template:

```
<div layout="row" layout-align="start center">
  <span flex>Device</span>
  <span flex>Temperature</span>
  <span flex>RSSI</span>
</div>
<div layout="row" layout-align="start center" ng-repeat="device in msg.payload.deviceValues">
  <span flex style="color: black">\{{device.name}}</span>
  <span flex style="color: black">\{{device.value}}</span>
  <span flex style="color: black">\{{device.rssi}}</span>
</div>
```

![](/assets/images/rules-engine/tempmon-diag-3.png)

- Edit the Update Table node code
- This code allows the deviceValues data to include both the temperature and RSSI data, coming from two different sources.

```
var deviceValues = flow.get('deviceValues');
if (deviceValues === undefined) {
    deviceValues = {};
}

var deviceNames = flow.get('deviceNames');

var deviceName;

if (deviceNames != undefined && deviceNames[msg.device]) {
    deviceName = deviceNames[msg.device];
}
else {
    deviceName = msg.device;
}

// Just grab the HH:MM:SS (UTC) out of published_at
var pat = /\d{2}:\d{2}:\d{2}/;

var thisDeviceValues = deviceValues[msg.device];
if (thisDeviceValues === undefined) {
    thisDeviceValues = {};
}

thisDeviceValues.device = msg.device;
thisDeviceValues.name = deviceName;
thisDeviceValues.value = msg.payload;
thisDeviceValues.updated = pat.exec(msg.published_at)[0];
 
deviceValues[msg.device] = thisDeviceValues;

flow.set('deviceValues', deviceValues);

msg.payload = {deviceValues:deviceValues};

return msg;
```

![](/assets/images/rules-engine/tempmon-diag-4.png)


