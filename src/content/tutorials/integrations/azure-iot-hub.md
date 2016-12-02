---
title: Azure IoT Hub
template: tutorials.hbs
columns: two
order: 200
---

# {{title}} <sub style="color: #777;font-size:18px; bottom: 0;">beta</sub>

Particle and Microsoft have teamed up to provide a 1st-class
integration with <a href="https://azure.microsoft.com/en-us/services/iot-hub/" target="_blank">Azure IoT Hub</a>.
Azure IoT Hub provides a seamless way to get Particle device data
into Azure, effective both during prototyping and when at scale.

<img src="/assets/images/azure-iot-hub/particle+iot-hub.png"
alt="Particle + Azure IoT Hub"/>
<p class="caption">Send device data from Particle into Azure IoT Hub with ease</p>

Acting as the "front door" to Azure, streaming from Particle into IoT Hub will
make it easy to forward device data onto any of
<a href="https://azure.microsoft.com/en-us/services/"
target="_blank">Azure's products</a> to add intelligence and
robustness to your IoT product or application. Here are some examples of
things you could do with Particle + Azure IoT Hub:

- Predict when a piece of equipment needs maintenence ahead of time using
  predictive analyctics
- Detect anomalies in product behavior by analyzing device data from an
  entire fleet simultaneously
- Trigger a notification to a device owner when supplies are running low


Some of the most relevant Azure products to use with Particle are:
- <a href="https://azure.microsoft.com/en-us/services/stream-analytics/"
  target="_blank">Stream Analytics</a>: Real time data stream processing
from millions of IoT devices
- <a href="https://azure.microsoft.com/en-us/services/machine-learning/"
  target="_blank">Machine Learning</a>: Powerful cloud based predictive
analytics tool to enable predictive maintenance
- <a href="https://azure.microsoft.com/en-us/services/notification-hubs/"
  target="_blank">Notification Hubs</a>: A scalable, push notification
engine for quickly sending millions of messages

<img
src="/assets/images/azure-iot-hub/particle+iot-hub-architecture.png"
alt="Particle and Azure IoT Hub architecture diagram"/>
<p class="caption">Send device data into Azure through IoT Hub, then onto other
Azure products</p>

Note that Azure IoT Hub has
<a
href="https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-what-is-iot-hub" target="_blank">many features</a>,
but the main focus of this integration as it currently
exists is to provide one-way event ingestion from Particle to Azure IoT Hub
(and then onto other Azure products).

## Key Concepts in IoT Hub

Before using this integration, it is helpful to understand a few
key concepts fundamental to how Azure IoT Hub works. These concepts will
come up during preconfiguration and enabling of the IoT Hub integration.

### Device Identities and Registry

From IoT Hub's <a
href="https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-identity-registry" target="_blank">documentation</a>:

*"Every IoT Hub has an identity registry that stores information about
the devices that are permitted to connect to the IoT hub. Before a
device can connect to an IoT hub, there must be an entry for that
device in the IoT hub's identity registry."*

Each Particle device that triggers this integration will have its
counterpart device identity in your IoT Hub. The Particle cloud will
manage this entirely for you, **there is no need to manually create your
own device identities for your fleet of Particle devices**.

The identity in the IoT Hub registry will be created with the same
device ID as used in the Particle system for easy correlation of data
and events.

### Device-to-cloud Message

Related to device identities are device-to-cloud messages. Each device
in the IoT Hub registry has its own messaging stream, allowing the
Particle cloud to publish messages on behalf of individual devices to
their corresponding message stream.

From IoT Hub's <a
href="https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messaging#device-to-cloud-messages" target="_blank">documentation</a>:

*"Use device-to-cloud messages for sending time series telemetry and
alerts from your device...You send device-to-cloud messages through a
device-facing endpoint"*

The Particle cloud will ensure that events emitted from a given device
in your fleet will be sent as a device-to-cloud message to the correct
device-specific stream. Specifically, when a device executes
`Particle.publish()` in its firmware with a matching event name, this
event (plus its included data) will be sent to it's corresponding
message stream in IoT Hub.

### Shared Access Policy

The Particle cloud must successfully authenticate with your IoT Hub to
have permissions to both manage the device identity registry as well as publish
device-to-cloud messages. This is done through the use of shared access
policies.

From IoT Hub's documentation:

*"Shared access policies can grant any combination of permissions...Azure
IoT Hub grants access to endpoints by verifying a token against the
shared access policies"*

For a full description of authentication and security on Azure IoT Hub,
please visit the <a
href="https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security" target="_blank">Developer guide on security</a>.

## Preconfiguration in Azure IoT Hub

You will need to do some setup in Azure IoT Hub before your integration
will function successfully. Follow the steps outlined below to get
started. Most of this information is also available
when you enable the Azure IoT Hub integration on the <a href="https://console.particle.io" target="_blank">Particle Console</a>.


### Sign up for an Azure account

If you don't already have one, you'll need to sign up for an Azure
account to use this integration.

Visit the <a href="https://azure.microsoft.com/en-us/get-started/" target="_blank">Microsoft Azure signup page</a>.
Click the "Try for free" button,
and follow the instructions to register for a new account. Upon signup,
you will be given $200 in Microsoft Azure credit.

For more details on Azure pricing, please check out Azure's
<a href="https://azure.microsoft.com/en-us/pricing/?b=16.43"
target="_blank">pricing overview</a>.

### Create an Azure IoT Hub

Once you have created an Azure account, the next step is to create an
Azure IoT Hub. You will need to create an Azure IoT Hub to receive
events from your fleet of Particle devices. The Particle cloud will
communicate directly with your IoT Hub when devices in your fleet
publish events that trigger the integration.

#### Navigate to IoT Hub

In your <a href="https://portal.azure.com/"
target="_blank">Azure portal</a>, click the <strong>+</strong> icon in
the side bar, then click <strong>Internet of Things</strong> &gt;
<strong>IoT Hub</strong>.

<img src="/assets/images/azure-iot-hub/create-iot-hub.png"
alt="Create an IoT Hub"/>

#### Configure New IoT Hub

A new IoT Hub blade will appear. Fill out all
required fields of the form. For detailed information on how to
configure an IoT Hub for your specific needs, please visit <a href="https://azure.microsoft.com/en-us/documentation/articles/iot-hub-csharp-csharp-getstarted/#create-an-iot-hub"
target="_blank">IoT Hub's Developer Documentation</a>.

<strong>Want to get started quickly?</strong>
If you are looking to test out the Azure IoT Hub integration with a
small number of devices, use the configuration below:

<img src="/assets/images/azure-iot-hub/configure-iot-hub.png"
alt="Configure an IoT Hub"/>


<strong>Heads up!</strong> A few things to point out when configuring your IoT Hub:
<ul>
	<li>A free IoT Hub cannot be converted to a paid tier once created</li>
	<li>The Device Management preview will allow you to see a list of registered devices in the Azure IoT Hub portal</li>
	<li>You will need your <strong>IoT Hub Name</strong> to enable the integration successfully in the next step</li>
</ul>

When you're ready, click the **Create** button. It will take a few minutes for Azure to successfully provision your new IoT Hub.

### Add a shared access policy

You will need to provide Particle with a shared access policy to allow the Particle cloud to create Azure IoT Hub <a href="https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-identity-registry" target="_blank">device identites</a> on your behalf. For security reasons, you should create a separate access policy specifically for this integration.


#### Create the new policy

Once your IoT Hub has been successfully created, click on its icon from your Azure portal dashboard. Then, click <strong>Shared access policies</strong> &gt; <strong>+ Add</strong> from the IoT Hub blade. Give your policy a name, and ensure that you only give your new policy <strong>registry read, registry write, and device connect permissions</strong> as shown below:

<img src="/assets/images/azure-iot-hub/create-shared-policy.png"
alt="Create shared IoT Hub policy"/>

When you're ready, click **Create** to add the new shared access policy. It will take a few moments for Azure to create your new policy successfully.

#### Retrieve relevant policy info

To enable this integration successfully, you will need both the <strong>policy name</strong> as well as the <strong>policy primary key</strong>. You can access this information at any time by clicking on your new policy from the list of shared access policies for your IoT Hub.

<img src="/assets/images/azure-iot-hub/access-shared-policy-info.png"
alt="Access shared IoT Hub policy info"/>

Awesome! You now have everything you need to move on to enabling the integration on the Particle console.

## Enabling the integration

## Example Use Cases

*We are in need of example use cases for this integration. Please help us
improve this tutorial by <a href="{{edit-link branch path.href path.name}}"
target="_blank">contributing to this page</a>. We will shower you with
kudos and smiley emojis!*
