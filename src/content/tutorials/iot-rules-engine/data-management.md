---
title: Data Management
layout: tutorials.hbs
columns: two
order: 103
---

# Data Management with Rules Engine

Storing telemetry data from IoT devices in a database for later
retrieval is useful for a variety of reasons. It can help you or your
audience understand changes in environmental readings over time, serve
as input to a machine learning model, and more.

In this tutorial, we'll save the data in a database. Many databases are supported
by the Rules Engine but this tutorial will use:

- MongoDB
- Firebase

Using the Rules Engine makes it easy to manipulate the data published from the device into the exact format you want to store in your database.

We'll continue to use the device level sensor and device firmware from the first tutorial, [Real-time alerting](/tutorials/iot-rules-engine/real-time-alerting/).

## Creating the Flow

We'll be starting with a new flow because there are number of changes from the last one.

![](/assets/images/rules-engine/mongo-flow.png)

- From the **Particle** group, drag **subscribe** node to your flow.
- Double click to edit it.
- Set **Name** to **LevelValue** (can be anything).
- Set **Auth** to the authentication we created in the real-time alerting tutorial.
- Set **Event** to **LevelValue**. 
- Leave the **Device** field empty
- Leave the **Scope** at **User**.
- Click **Done**.

![](/assets/images/rules-engine/mongo-subscribe.png)

- From the **output** group drag a **debug** node to the flow as well. Leave the default as outputting **msg.payload**.

![](/assets/images/rules-engine/mongo-flow-debug.png)

- You can use this as a basis for any of the database tutorials.

## MongoDB Tutorial

### Getting a database

This example uses MongoDB. If you don't already have a MongoDB instance you can connect to, or have one installed on your computer, you can also use a hosted solution like [MongoDB atlas](https://www.mongodb.com/cloud/atlas) that takes care of all of the hard work.

### Creating the MongoDB flow

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "e16aabab.9db378",
        "type": "mongodb out",
        "z": "41a68e9d.b5d52",
        "name": "Insert Level",
        "collection": "level",
        "payonly": false,
        "upsert": false,
        "multi": false,
        "operation": "insert",
        "x": 412.5,
        "y": 119,
        "wires": []
    },
    {
        "id": "86e57b2e.ced2c8",
        "type": "particle-subscribe",
        "z": "41a68e9d.b5d52",
        "name": "LevelValue",
        "auth": "2fb2306c.5a31d",
        "scope": "user",
        "product": "",
        "event": "LevelValue",
        "device": "",
        "x": 136.5,
        "y": 121,
        "wires": [
            [
                "e16aabab.9db378",
                "ac961fdd.05169"
            ]
        ]
    },
    {
        "id": "ac961fdd.05169",
        "type": "debug",
        "z": "41a68e9d.b5d52",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 410.5,
        "y": 197,
        "wires": []
    }
]
{{/copycode}}

- From the **Storage** section drag the **mongdb** (out) node to your flow.

![](/assets/images/rules-engine/mongo-palette-out.png)

- Double click on the **mongodb** node to edit the configuration.
- Click on the pencil icon to edit the server configuration.

![](/assets/images/rules-engine/mongo-config-server.png)

- In **Host** enter the hostname of your mongodb server. You cannot use a locally hosted server (127.0.0.1) since the Rules Engine is hosted remotely.
- In **Database** enter the database name.
- In **Username** enter your database username. Since you can't use a locally hosted MongoDB, you will almost certainly need a username and password.
- In **Password** enter the password.
- In **Name** you can enter whatever name you'd like.

![](/assets/images/rules-engine/mongo-database-config.png)

- After configuring the Server, set the remaining items.
- In **Collection** specify the collection that you will be storing into.
- In **Operation** change to **Insert** because you want to add a new item to the collection for each publish.
- Leave the **Only store msg.payload object** checkbox unchecked.
- Set **Name** to whatever you'd like.

![](/assets/images/rules-engine/mongo-config-node.png)

- If you haven't connected all of the nodes up yet, connect them up now.
- Deploy your flow.
- In the Debug panel on the right, you can watch events as they arrive:

![](/assets/images/rules-engine/mongo-debug.png)

- If you view the database (in this case, with Robo3T), you can see all of the fields that were automatically added to the database.

![](/assets/images/rules-engine/mongo-element.png)

- Or, more usefully, in table view:

![](/assets/images/rules-engine/mongo-table.png)

## Google Firebase

Another place you can easily save data is in Google Firebase.

### Setting up Firebase

- Go to the [Firebase Console](https://console.firebase.google.com/)
- Add a project. I named mine **rules-engine-1**

![](/assets/images/rules-engine/firebase-create-project.png)

- Click **Get Started** in the **Database** section.

![](/assets/images/rules-engine/firebase-add-database.png)

- We'll be using the original **Realtime Database** in this example.

![](/assets/images/rules-engine/firebase-realtime-database.png)

- You should use the locked settings. We're using an authentication token to write to the database so the locked settings will work perfectly.

- In the main Database window, note your Firebase URL. In this example, it's https://rules-engine-1.firebaseio.com.

![](/assets/images/rules-engine/firebase-url.png)

- In the main Firebase console window, select the gear icon next to **Project Overview** (1) in the upper left.
- Then select **Users and permissions** (2).

![](/assets/images/rules-engine/firebase-users-and-permissions.png)

- Select **Service Accounts** (1).
- Select **Database secrets** (2).
- Copy the secret key (3). Even though the Firebase secrets are technically deprecated, they're the easiest way to authenticate the Firebase node.

![](/assets/images/rules-engine/firebase-secret-key.png)

### Adding Firebase to the Rules Engine Palette

- In the Rules Engine, click the "hamburger icon" in the upper right of the rules engine window (1) then **Settings** (2).

![](/assets/images/rules-engine/settings.png)

- Click **Palette** (1).
- Click **Install** (2).
- Type in the search field **firebase ** (3).
- Click **Install** (4) for **node-red-contrib-firebase**.

![](/assets/images/rules-engine/firebase-install.png)

### Setting up the firebase flow

- From the **Firebase** section, drag the **firebase modify** (out) node to your flow.

![](/assets/images/rules-engine/firebase-palette.png)

- Double click the **firebase modify** node to edit it.
- Click the pencil icon to **Add new firebase config...**

![](/assets/images/rules-engine/firebase-pencil.png)

- Edit the **Firebase** item with your Firebase URL.
- Set the **Auth Type** to **JSON Web Token**.
- Copy and paste in your **Database Secret**. 
- Click **Update**.

![](/assets/images/rules-engine/firebase-server.png)

- Continue editing in the **Edit firebase modify node**.
- Set the **Child Path** to the key to hold your values. I used **levels**.
- Set the **Method** to **Push**. This creates a new entry for each event.
- Set the **Value** to **msg.payload**.
- Set the **Name** to whatever you want. I used **Write to Firebase**.
- Click **Done**.

![](/assets/images/rules-engine/firebase-config.png)
 
## Setting up the flow

Drag the Copy Rules button into the Rules Engine window to create the flow automatically, or you can create the flow from scratch with the steps below.

{{#copycode title="Copy Rules"}}
[
    {
        "id": "4526ba9f.e9d734",
        "type": "tab",
        "label": "Firebase",
        "disabled": false,
        "info": ""
    },
    {
        "id": "d53ad534.df09a8",
        "type": "particle-subscribe",
        "z": "4526ba9f.e9d734",
        "name": "LevelValue",
        "auth": "2fb2306c.5a31d",
        "scope": "user",
        "product": "",
        "event": "LevelValue",
        "device": "",
        "x": 127,
        "y": 105,
        "wires": [
            [
                "d3cbe746.db3148"
            ]
        ]
    },
    {
        "id": "65ae9220.0696ac",
        "type": "debug",
        "z": "4526ba9f.e9d734",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 560.5,
        "y": 107,
        "wires": []
    },
    {
        "id": "695076aa.1f69f8",
        "type": "firebase modify",
        "z": "4526ba9f.e9d734",
        "name": "Write to Firebase",
        "firebaseconfig": "",
        "childpath": "levels",
        "method": "push",
        "value": "msg.payload",
        "priority": "msg.priority",
        "x": 578.5,
        "y": 201,
        "wires": [
            []
        ]
    },
    {
        "id": "d3cbe746.db3148",
        "type": "function",
        "z": "4526ba9f.e9d734",
        "name": "Format Database Data",
        "func": "msg.payload = {'level':parseFloat(msg.payload),'published_at':msg.published_at};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 334.5,
        "y": 157,
        "wires": [
            [
                "695076aa.1f69f8",
                "65ae9220.0696ac"
            ]
        ]
    }
]
{{/copycode}}

This is the flow we'll be creating:

![](/assets/images/rules-engine/firebase-flow.png)

- The flow begins with **subscribe** node from the **Particle** group. Set the settings as for other subscribe nodes in this tutorial.

![](/assets/images/rules-engine/firebase-subscribe.png)
 
- From the **Function** group, drag a **function** into the flow. (Note: this is the function function, not the Particle function!)
- Set the **Name** to **Format Database Data** (or whatever you want)
- Set the function to:

```
msg.payload = {'level':parseFloat(msg.payload),'published_at':msg.published_at};

return msg;
```

![](/assets/images/rules-engine/firebase-function.png)

This determines what data will be uploaded to Firebase. In this case, a floating point value containing the level and a timestamp from the event.

- From the **Output** section of the palette, drag a **debug** into your flow. This makes debugging easier.
- Finally, connect all of the nodes as shown above.

- Deploy your flow and hopefully everything will work.
- Viewing the **Debug** tab on the right side of the window should show data as it's published.

![](/assets/images/rules-engine/firebase-debug.png)

- And viewing the database in the Firebase console should show the data.

![](/assets/images/rules-engine/firebase-data.png)

