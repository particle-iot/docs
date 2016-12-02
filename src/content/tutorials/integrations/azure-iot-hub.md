---
title: Azure IoT Hub
template: tutorials.hbs
columns: two
order: 200
---

# {{title}} <sub style="color: #777;font-size:18px; bottom: 0;">beta</sub>

Particle and Microsoft have teamed up to provide a 1st-class
integration with <a href="https://azure.microsoft.com/en-us/services/iot-hub/" target="_blank">Azure IoT Hub</a>.
Azure IoT Hub provides a seamless way to send Particle device data
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
come up during use of the IoT Hub integration.

### Device Identities and Identity Registry

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
and events. The identity will be created automatically in your Hub the
first time an approved device publishes an event that triggers the integration.

### Device-to-cloud Message

Related to device identities are device-to-cloud messages. Each device
in the IoT Hub registry has its own unique messaging stream. This allows the
Particle cloud to publish messages on behalf of individual devices to
their corresponding stream.

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

Each policy can be scoped to be granted permissions to interact with the
IoT Hub in various ways. It is important that the access policy given to
Particle to authenticate with your IoT Hub has the right permissions to
send device data successfully.

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

Awesome! You now have everything you need to move on to enabling the
integration on the Particle Console.

## Enabling the integration

### Particle Console

Now that you've done all of the pre-configuration required, you are now
ready to enable the Azure IoT Hub integration
on the <a href="https://console.particle.io" target="_blank">Particle Console</a>.

Start by going to the integrations hub by clicking on the integrations icon in the sidebar (<i class="im-integrations-icon"></i>), or
by simply <a href="https://console.particle.io/integrations" target="_blank">following this link</a>. If you'd like to enable the integration
for a <a href="/guide/tools-and-features/console/#devices-vs-product-devices" target="_blank">product</a>, you'll need to visit the integrations
hub for the desired product. Do this by clicking the products icon (<i class="im-product-icon"></i>) in the sidebar, finding your product,
then clicking on the integrations icon (<i class="im-integrations-icon"></i>) in the product context.

Once in the integrations hub, click on the "New Integration" button.
From the list of available integrations, click on "Azure IoT Hub".

<img src="/assets/images/azure-iot-hub/enable-integration.png"/>

You'll see a reminder that setup is required before continuing to enable the integration. If you have followed the steps outlined in
[Preconfiguration in Azure IoT Hub](#preconfiguration-in-azure-iot-hub), you should be good to go. Click the
"I have done all these things" button to advance.

The next step is configuring the integration. Fill out the following fields:
- **Event Name**: The name of the event that will trigger publishing an
event to Azure IoT Hub. This is the name of your event when you call `Particle.publish()` in your firmware.
- **IoT Hub Name**: The name given when you created your Azure IoT Hub
- **Shared Policy Name**: The name of the Azure shared policy that you
created during setup
- **Shared Policy Key**: The associated key of the Azure shared policy that you created
during setup
- **Device**: Select which of your devices will trigger publishing to
Azure. If you'd like the publish to trigger from any of the devices you own, select 'Any.'

<img src="/assets/images/azure-iot-hub/configure-integration.png"/>

Click "Enable Integration." You have now successfully told the Particle
cloud to stream data to Azure IoT Hub!
Make sure that the integration is configured properly by clicking on the
**TEST** button (available for integrations **not** scoped to a single
device).

### Firmware

Now that the integration is enabled in the Particle cloud, the final
step required to get data streaming into Azure IoT Hub
is to flash a device with some firmware that publishes the targeted event. Head over to the <a href="https://build.particle.io" target="_blank">Particle Web IDE</a>,
<a href="https://www.particle.io/products/development-tools/particle-local-ide" target="_blank">Local IDE</a>, or whichever IDE you are using for firmware development.

If you're already working on a firmware application, just make sure you include a `Particle.publish()` with the event name matching the event used to enable the
IoT Hub integration above. Otherwise, if you need some sample firmware, paste in the below code into your firmware app:

```
// The on-board LED
int led = D7;

void setup() {
  pinMode(led, OUTPUT);
}
void loop() {
  // Turn the LED Off
  digitalWrite(led, HIGH);
  // Publish an event to trigger the integration
  // Replace "my-event" with the event name you used when configuring the integration
  // Replace "test-data" with the real data you'd like to send to Azure
  // IoT Hub
  Particle.publish("my-event", "test-data", PRIVATE);
  // Wait for 3 seconds
  delay(3000);
  // Turn the LED off
  digitalWrite(led, LOW);
  delay(3000);
}
```

The above code will publish an event every 6 seconds, when the on-board LED turns on.
In reality, you might publish an event containing the readings from
a temperature or humidity sensor every few minutes, when motion is detected, or when
a user interacts with the device by pushing a button. This firmware is entirely meant as
a sample to illustrate the minimum code needed to stream data into Azure
IoT Hub.

Go ahead and flash the firmware with the `Particle.publish()` that will trigger the integration to
a Particle device.

Once confident in the firmware, you can stream data from large numbers of devices by
<a href="/guide/tools-and-features/console/#rollout-firmware" target="_blank">rolling out the firmware</a>
to a product fleet. Remember that this requires creating the integration under the product scope, allowing
any device in the product fleet to trigger the it.

Congrats! This is all you need to get the integration working end-to-end.
Your device will now begin to publish the targeted event, which will signal to
the Particle cloud to send a device-to-cloud message to IoT Hub.

### Confirming the data reaches Azure IoT Hub

To ensure that the data is successfully being published to Azure IoT
Hub, you can use the <a href="https://github.com/Azure/azure-iot-sdks/tree/master/tools/iothub-explorer" target="_blank">IoT Hub Explorer</a>, an Node-based command line
interface (CLI).

Install the IoT Hub explorer and run the following command:

```bash
iothub-explorer monitor-events [particle-device-id] --login
[IoT-Hub-connection-string]
```

You can find your Hub's connection string in the Azure portal by
**clicking Shared access policies** > **iothubowner** > then click the
clipboard next to **Connection string--primary key**.

<img src="/assets/images/azure-iot-hub/connection-string.png"
alt="Particle + Azure IoT Hub connection string" style="max-width: 100%;"/>
<p class="caption">You can find your IoT Hub connection string in the
shared access policies view</p>

You should see output like this in your terminal:

```bash
Monitoring events from device 3e003f000547343233323032...
{
  "data": "70",
  "device_id": "3e003f000547343233323032",
  "event": "temperature",
  "published_at": "2016-12-02T02:12:28.825Z",
  "fw_version": "1"
}
-------------------
{
  "data": "70",
  "device_id": "3e003f000547343233323032",
  "event": "temperature",
  "published_at": "2016-12-02T02:12:28.825Z"
}
-------------------
{
  "data": "69",
  "device_id": "3e003f000547343233323032",
  "event": "temperature",
  "published_at": "2016-12-02T02:12:34.821Z",
  "fw_version": "1"
}
-------------------
```

In addition, you should now see this Particle device ID appear in your device
registry:

<img src="/assets/images/azure-iot-hub/device-registry.png"
target="_blank" style="max-width:100%;"/>

Yay! You are successfully sending data from Particle devices to your IoT Hub.

## Example Use Cases

*We are in need of example use cases for this integration. Please help us
improve this tutorial by <a href="{{edit-link branch path.href path.name}}"
target="_blank">contributing to this page</a>. We will shower you with
kudos and smiley emojis!*
