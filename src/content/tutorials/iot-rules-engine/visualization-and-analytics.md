---
title: Visualization and Analytics
layout: tutorials.hbs
columns: two
order: 104
---

# Visualization and Analytics with Rules Engine

With all the data coming from IoT devices, it's really difficult to
consume without some aspect of visualization. Data visualization can
help your team or your customers glean insight from connected devices in
the field.

In this tutorial, we'll be creating dashboards, a handy way to visualize information using the Rules Engine.

## First Dashboard

We'll make a simple gauge to show the current level of our [level sensor from the first tutorial](/tutorials/iot-rules-engine/real-time-alerting/) as our first dashboard.

![](/assets/images/rules-engine/dashboard-gauge-display.png)

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "a42a1c06.aff9f",
        "type": "particle-subscribe",
        "z": "c385e5b4.d0dbe8",
        "name": "Level",
        "scope": "user",
        "product": "",
        "event": "Level",
        "device": "",
        "x": 152,
        "y": 163,
        "wires": [
            [
                "717136d6.68cfd8",
                "52e5cf35.22f0f"
            ]
        ]
    },
    {
        "id": "717136d6.68cfd8",
        "type": "ui_gauge",
        "z": "c385e5b4.d0dbe8",
        "name": "Level",
        "group": "14efde1d.e9ec42",
        "order": 0,
        "width": 0,
        "height": 0,
        "gtype": "gage",
        "title": "Level",
        "label": "inches",
        "format": "\{{value | number:1}}",
        "min": 0,
        "max": "5",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "seg1": "",
        "seg2": "",
        "x": 336.5,
        "y": 163,
        "wires": []
    },
    {
        "id": "ebc10445.0a57c8",
        "type": "ui_button",
        "z": "c385e5b4.d0dbe8",
        "name": "Update Button",
        "group": "14efde1d.e9ec42",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": false,
        "label": "Update",
        "color": "",
        "bgcolor": "",
        "icon": "",
        "payload": "",
        "payloadType": "str",
        "topic": "",
        "x": 178.5,
        "y": 335,
        "wires": [
            [
                "89c1b056.3c699"
            ]
        ]
    },
    {
        "id": "89c1b056.3c699",
        "type": "particle-variable",
        "z": "c385e5b4.d0dbe8",
        "name": "Get Level Variable",
        "variable": "level",
        "scope": "user",
        "device": "test4",
        "product": "",
        "x": 399.5,
        "y": 334,
        "wires": [
            [
                "717136d6.68cfd8"
            ]
        ]
    },
    {
        "id": "52e5cf35.22f0f",
        "type": "ui_chart",
        "z": "c385e5b4.d0dbe8",
        "name": "",
        "group": "14efde1d.e9ec42",
        "order": 0,
        "width": 0,
        "height": 0,
        "label": "chart",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "dot": false,
        "ymin": "0",
        "ymax": "5",
        "removeOlder": 1,
        "removeOlderPoints": "",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "useOneColor": false,
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "useOldStyle": false,
        "x": 351.5,
        "y": 80,
        "wires": [
            [
                "ad35e7a4.cb7368"
            ],
            []
        ]
    },
    {
        "id": "ad35e7a4.cb7368",
        "type": "debug",
        "z": "c385e5b4.d0dbe8",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 564.5,
        "y": 95,
        "wires": []
    },
    {
        "id": "14efde1d.e9ec42",
        "type": "ui_group",
        "z": "",
        "name": "Default",
        "tab": "dc1415f.d8cdee8",
        "disp": true,
        "width": "6",
        "collapse": false
    },
    {
        "id": "dc1415f.d8cdee8",
        "type": "ui_tab",
        "z": "",
        "name": "Home",
        "icon": "dashboard"
    }
]
{{/copycode}}

This is the flow we'll be building:

![](/assets/images/rules-engine/dashboard-connect.png)


- From the **Particle** group, drag **subscribe** node to your flow.
- Double click to edit it.
- Set **Name** to **Level** (can be anything).
- Set **Auth** to the authentication we created in the real-time alerting tutorial.
- Set **Event** to **Level**. 
- Leave the **Device** field empty
- Leave the **Scope** at **User**.
- Click **Done**.

![](/assets/images/rules-engine/dashboard-subscribe.png)

- Find the **Dashboard** section of the palette.
- Drag a **gauge** output to a new flow.

![](/assets/images/rules-engine/dashboard-palette.png)

- Double click the **gauge** node to edit it.
- Click the pencil icon to edit the dashboard group node.

![](/assets/images/rules-engine/dashboard-pencil.png)

- You don't have anything you really need to change in the dashboard group node, but this is what it looks like.

![](/assets/images/rules-engine/dashboard-group.png)

- Back in the **edit gauge node** window:
- Set the **Label** to **Level** (can be anything).
- Set the **Value format** to **&#123;&#123;value &#124; number:1&#125;&#125;**. This displays the value, as a number, with 1 decimal point.
- Set the **Units** to **inches**.
- Set the **Range** to 0 - 5.
- Set the **Name** to **Level** (can be anything).

![](/assets/images/rules-engine/dashboard-gauge.png)

- Connect the nodes.
- Deploy your flow.

- In the upper right corner of the window, select the **Dashboard** tab (1).
- Then click the small **open dashboard** icon (2) under it. This will open a new browser tab or window with the dashboard.

![](/assets/images/rules-engine/dashboard-open.png)



## Querying the value

The way our firmware is designed, it only updates the level every minute, or when an alarm occurs or clears. What if you want to get the value right now?

![](/assets/images/rules-engine/dashboard2-gauge-display.png)

Adding onto the previous flow:

![](/assets/images/rules-engine/dashboard2-flow.png)

- Find the **Dashboard** section of the palette.
- Drag a **button** output to a new flow.
- Double click the **button** node to edit it.
- Set the **Label** to **Update** (this is what the title of the button is when displayed in the dashboard).
- Set the **Name** to **Update Button** (can be anything).

![](/assets/images/rules-engine/dashboard2-button.png)

- From the **Particle** section of the palette, drag a **variable** to your flow.
- Double click the **variable** node to edit it.
- Set the **Name** to **Get Level Variable** (can be anything).
- Set the **Auth** to the authentication we set up earlier.
- Set the **Variable** to **level** (case-sensitive).
- Set the **Device** to the device name of your Photon running the level sensor.
- Leave the **Scope** at **User**.

![](/assets/images/rules-engine/dashboard2-variable.png)

- Connect up the nodes into a flow.
- Note that both the output from the **Get Level Variable** and subscribe node to into the same gauge node.
- Deploy your flow.

- View the dashboard page.
- Now, when you click the **Update** button, the gauge is updated right away.


## Charting from a database

This is a much more complicated example that charts the level over time. 

![](/assets/images/rules-engine/dashboard3-output.png)

It's based on the earlier MongoDB example so it can retrieve the previous values from the database. There are more nodes in the example than previous examples!

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "815f6e01.1d3e5",
        "type": "mongodb in",
        "z": "c19d83b.b862a8",
        "name": "Database Find",
        "collection": "level",
        "operation": "find",
        "x": 368.5,
        "y": 1227,
        "wires": [
            [
                "fd920343.15d97"
            ]
        ]
    },
    {
        "id": "6773c4e.931603c",
        "type": "function",
        "z": "c19d83b.b862a8",
        "name": "Prepare Query",
        "func": "msg.payload = {};\nmsg.projection = {_id:0,_msgid:0,event:0};\nmsg.sort = {published_at:-1};\nmsg.limit = 500;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 167.5,
        "y": 1225,
        "wires": [
            [
                "815f6e01.1d3e5"
            ]
        ]
    },
    {
        "id": "fd920343.15d97",
        "type": "function",
        "z": "c19d83b.b862a8",
        "name": "Database To Chart Format",
        "func": "var array = [];\n\nfor(var ii = 0; ii < msg.payload.length; ii++) {\n    array.push({\n        x:Date.parse(msg.payload[ii].published_at), \n        y:msg.payload[ii].payload});    \n}\n\nmsg.payload = [\n    {\n        series:[\"\"],\n        data:[array]\n    }\n];\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 218.5,
        "y": 1372,
        "wires": [
            [
                "1432cab7.d02a05"
            ]
        ]
    },
    {
        "id": "1432cab7.d02a05",
        "type": "ui_chart",
        "z": "c19d83b.b862a8",
        "name": "",
        "group": "14efde1d.e9ec42",
        "order": 0,
        "width": 0,
        "height": 0,
        "label": "chart",
        "chartType": "line",
        "legend": "false",
        "xformat": "HH:mm:ss",
        "interpolate": "linear",
        "nodata": "",
        "dot": false,
        "ymin": "0",
        "ymax": "5",
        "removeOlder": 1,
        "removeOlderPoints": "",
        "removeOlderUnit": "3600",
        "cutout": 0,
        "useOneColor": false,
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "useOldStyle": false,
        "x": 475.5,
        "y": 1374,
        "wires": [
            [],
            []
        ]
    },
    {
        "id": "35521e4a.349302",
        "type": "inject",
        "z": "c19d83b.b862a8",
        "name": "On Start",
        "topic": "start",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "onceDelay": 0.1,
        "x": 170.5,
        "y": 1116,
        "wires": [
            [
                "6773c4e.931603c"
            ]
        ]
    },
    {
        "id": "14efde1d.e9ec42",
        "type": "ui_group",
        "z": "",
        "name": "Default",
        "tab": "dc1415f.d8cdee8",
        "disp": true,
        "width": "6",
        "collapse": false
    },
    {
        "id": "dc1415f.d8cdee8",
        "type": "ui_tab",
        "z": "",
        "name": "Home",
        "icon": "dashboard"
    }
]
{{/copycode}}

![](/assets/images/rules-engine/dashboard3-flow.png)

- From the **Input** section of the palette, drag an **Inject** node into a new flow.
- The payload and topic are mostly ignored.
- Make sure **Inject once after 0.1 seconds, then** is checked.
- Make sure **Repeat** is **none**.
- Set **Name** to **On Start** (or anything else).
- This construct is used to run a flow once when deployed.

![](/assets/images/rules-engine/dashboard3-inject.png)

- From the **function** group group drag a **function** to your flow. Note: Not a Particle function.
- Set the **Name** to **Prepare Query**.
- This node sets the parameters for querying MongoDB.
- Set the **Function** to:

```
msg.payload = {};
msg.projection = {_id:0,_msgid:0,event:0};
msg.sort = {published_at:-1};
msg.limit = 500;
return msg;
```

This searches all documents (payload), omitting several fields (projection), sorts descending, and limits to the most recent 500 documents.

![](/assets/images/rules-engine/dashboard3-prepare-query.png)

- From the **Storage** section of the palette, drag a **mongodb** (in) node to your flow.
- Use the previously configured **Server**.
- Set the **Collection** to **level**.
- Set the **Operation** to **find**.
- Set the **Name** to **Database Find** (or anything else).

![](/assets/images/rules-engine/dashboard3-database-find.png)

One problem is that the output from the database node is in database format, and we need to convert it into something the chart node can consume. This will require a function node.

- From the **function** group group drag a **function** to your flow. Note: Not a Particle function.
- Set the **Name** to **Database to Chart Format**.
- Set the **Function** to:

```
var array = [];

for(var ii = 0; ii < msg.payload.length; ii++) {
    array.push({
        x:Date.parse(msg.payload[ii].published_at), 
        y:msg.payload[ii].payload});    
}

msg.payload = [
    {
        series:[""],
        data:[array]
    }
];
return msg;
```

![](/assets/images/rules-engine/dashboard3-database-to-chart.png)

- From the **dashboard** section of the palette, drag a chart into your flow.
- Change the **Y-axis** to 0 - 5.
- You can leave the rest of the settings as the defaults.

![](/assets/images/rules-engine/dashboard3-chart.png)

- Connect up the nodes in the flow as pictured above.
- Deploy.
- View the dashboard!



