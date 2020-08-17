---
title: Rules Engine
layout: landing.hbs
---

# Rules Engine

{{box op="start"}}

**The Particle-hosted IoT Rules Engine has been discontinued. However, the Particle node is now open-source, so you can continue to use its features locally-hosted or cloud-hosted, including the free tier of the IBM Cloud.**

{{box op="end"}}

## Introduction

The Particle IoT Rules Engine is a branded version of [Node-RED](https://nodered.org/), an open-source visual programming tool. As it's open source, even though the rules engine itself has been discontinued, you can still use the underlying Node-RED project and the [newly open-source Particle node](https://github.com/particle-iot/node-red-contrib-particle-official) to achieve similar functionality.

- [Using a Cloud Service](#using-a-cloud-service)
- [Running Locally](#running-locally)
- [Migrating From the Particle Rules Engine](#migrating-from-the-particle-rules-engine)
- [Original Documentation](#original-documentation)

## Using a Cloud Service

There are a number of cloud services that support Node-RED, however the most convenient is the IBM Cloud. There's built-in support for deploying Node-RED, and you can do so in the free tier for simple flows. 

- [Official Node-RED Instructions](https://nodered.org/docs/getting-started/ibmcloud) for IBM Cloud.
- [A helpful article](https://hackernoon.com/how-to-securely-host-node-red-in-cloud-for-free-and-safely-expose-it-to-the-internet-over-https-hw5d3220) about setting up IBM Cloud.
- Or, if you prefer, instruction for using [AWS](https://nodered.org/docs/getting-started/aws) or [Microsoft Azure](https://nodered.org/docs/getting-started/azure).

### Using IBM Cloud

The [official instructions](https://nodered.org/docs/getting-started/ibmcloud) are quite complete, but the basic process is:

- Sign up for a free [IBM Cloud](https://cloud.ibm.com) account if you do not already have one. No credit card is required to start.

- After signing in create a **Create Resource +**, the blue button in the upper-right corner of the window. 

![Create Resource](/assets/images/rules-create-resource.png)

- Search for **node-red**:

![Create Resource](/assets/images/rules-search-node-red.png)

- Select the **Node-RED App**:

![Create Resource](/assets/images/rules-node-red-app.png)

- Create an API Key if you don't already have one.

- Deploy your instance. You don't need to add services to it first; the Node-RED app itself contains everything you need to run it.

## Running Locally

It's also possible to run Node-RED on your own computer, either natively or in a Docker container.

- [In a Docker container](#running-locally-docker)
- [Native installation](#running-locally-native)


### Running Locally - Docker

[The Node-RED Docker instructions](https://nodered.org/docs/getting-started/docker) are a good place to start.

Using Docker is especially convenient since it's less likely to be affected by node.js versions and such. Once you've installed Docker, it can be as easy as:

- Make a named data volume to hold the Node-RED data. The second command lists all volumes so you can verify that it was created. You should only do this once; you can create and destroy containers and keep your data volume, which contains your flows, so you won't lose those.

```
$ docker volume create --name node_red_user_data
$ docker volume ls
```

And then build the container and run it:

```
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered nodered/node-red
```

And then open it in your browser: [http://127.0.0.1:1880/](http://127.0.0.1:1880/)!

To detach the session from your terminal, type ctrl-p ctrl-q and the container will continue to run in the background.

To reattach to the terminal run:

```
$ docker attach mynodered
```

If you need to restart the container, such as after a reboot or restart of the Docker daemon:

```
$ docker start mynodered
```

And stop it:

```
docker stop mynodered
```

And delete it:

```
docker rm mynodered
```

### Running Locally - Native

[The Node-RED local install documentation](https://nodered.org/docs/getting-started/local) is a good place to start.

For Mac and Linux, it may be as easy as:

```
$ sudo npm install -g node-red
```

To start:

```
$ node-red
```

The data directory should be **.node-red** in your home directory.

To connect to the server open it in your browser: [http://127.0.0.1:1880/](http://127.0.0.1:1880/).

For Windows, the process is similar; just leave out the sudo.

To uninstall:

```
$ sudo npm uninstall -g node-red
```

## Migrating From the Particle Rules Engine

### Nodes in Particle Rules Engine

| Node | Description |
| :--- | :--- |
| [@particle/node-red-contrib-particle-official](https://flows.nodered.org/node/@particle/node-red-contrib-particle-official) | Particle Node |
| [node-red-dashboard](https://flows.nodered.org/node/node-red-dashboard) | Dashboards |
| Storage | |
| [node-red-node-mongodb](https://flows.nodered.org/node/node-red-node-mongodb) | MongoDB |
| [node-red-contrib-postgres](https://www.npmjs.com/package/node-red-contrib-postgres) | PostgreSQL |
| [node-red-node-mysql](https://flows.nodered.org/node/node-red-node-mysql) | MySQL | 
| [node-red-contrib-influxdb](https://flows.nodered.org/node/node-red-contrib-influxdb) | InfluxDB | 
| Cloud Platforms | |
| [node-red-contrib-salesforce](https://www.npmjs.com/package/node-red-contrib-salesforce) | Salesforce |
| [node-red-contrib-aws](https://flows.nodered.org/node/node-red-contrib-aws) | Amazon AWS |
| [NodeRedIoTHub](https://github.com/lcarli/NodeRedIoTHub) | Azure IoT Hub |
| [node-red-contrib-ibm-watson-iot](https://flows.nodered.org/node/node-red-contrib-ibm-watson-iot) | IBM Watson Internet of Things Platform |
| [node-red-contrib-google-pubsub](https://flows.nodered.org/node/node-red-contrib-google-pubsub) | Google Cloud Pubsub | 


To add the nodes you need into your new Node-RED instance, click the **hamburger icon** in the upper right (1), then select **Manage Palette** (2).

![Rules Manage Palette](/assets/images/rules-manage-palette.png)


In the **User Settings** window in the **Palette** tab, select **Install** (1) then enter the name, like **particlel** in the search box (2). Then add the **@particle/node-red-confib-particle-official** node by clicking **Install** (3).

![Rules Install](/assets/images/rules-install.png)


### Exporting Your Rules

To export your rules from the Particle Rules Engine:

- Log into your Rules Engine instance.

- Select the **Hamburger Menu** in the upper right corner of the window (1). Then **Export** (2). Then **Clipboard** (3).

![Rules Export](/assets/images/rules-export.png)

- From the **Export to nodes Clipboard** window, you'll probably want to select **All Flows**, or if you only want some, individually select and save the flows you want to keep.

![Rules Export Clipboard](/assets/images/rules-export-clipboard.png)

- Open your use Node-RED instance and select **Hamburger Menu** then **Import**. You can import directly from the clipboard or save to a file first.

Note: The exported rules contain any passwords you saved when you configured your nodes, along with the secret for your Particle authentication. Keep this secure.

## Original Documentation

Snapshots of the documentation that has been removed have been taken and saved as PDFs below, however the instructions may no longer work properly.

- [Quickstart Guide](/assets/pdfs/rules-engine/QuickStart.pdf)
- [Real-time Alerting](/assets/pdfs/rules-engine/Alerting.pdf)
- [Device Command and Control](/assets/pdfs/rules-engine/DeviceCommand.pdf)
- [Data Management](/assets/pdfs/rules-engine/DataManagement.pdf)
- [Visualization and Analytics](/assets/pdfs/rules-engine/Visualization.pdf)
- [Fleet-wide Remote Diagnostics](/assets/pdfs/rules-engine/RemoteDiagnostics.pdf)
- [Dynamic Firmware Management](/assets/pdfs/rules-engine/DynamicFirmwareManagement.pdf)

