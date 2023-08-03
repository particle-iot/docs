---
title: Function and publish demo
columns: two
layout: commonTwo.hbs
description: Function and publish demo
includeDefinitions: [api-helper,api-helper-cloud,api-helper-events,api-helper-extras,api-helper-library,api-helper-projects,usb-serial,webhook-demo,zip]
---

# {{title}}

This is an interactive tutorial that show the difference between functions and subscribing to Particle events on-device, and how you can use these techniques to send commands to remote devices.

- Use a function to set the status LED color of a single device.
- Use a published event to set the status LED color of all devices in your fleet.
- Use device groups to set the status LED color of a subset of your device fleet.

To fully experience the demo, you should have two or more devices of the same type. Both cellular and Wi-Fi devices are supported, however this demo does not work with the Tracker and isn't useful if your device does not have a visible status LED.

- If you're interesting in having devices trigger external services, see the [webhook demo](/integrations/webhook-demo/).

In order to use this tutorial, you must be logged into your Particle account:

{{> sso}}

## Cloud setup

### Select a product

You should typically start with a product. You'll eventually need one to scale, and it makes it easier to group devices. 

This demo requires a product, and each product can only have a single device platform, so you must select that first.

{{> webhook-demo-select-product}}

You can find all of your sandbox products in the {{webhook-demo-link link="sandbox/products" text="productsTab"}} in the Particle console.

There is no charge for creating products in your free developer sandbox and there is no limit on the number of products, though there is a limit to the number of devices in the free plan.

### Start demo

Starting the demo will start monitoring events and set up the product you have selected.

{{> webhook-demo-start mode="function-publish" options="noTracker"}}

### Product setup

{{> webhook-demo-product-config options="functionPublishApiUser,functionPublishWebhook,functionPublishDeviceGroups,productFirmware"}}

{{collapse op="start" label="Tell me more about what was set up"}}

#### API users

In order for the webhook to determine the device groups of a device, an API user is used. The access token only gives access to reading device information for a single product, so it's less sensitive than your actual user token that provides access to all products and devices you have access to.

#### Webhooks

The webhook is called by the device group helper library to query the device groups for the device. 

- The device publishes the event `G52ES20Q_DeviceGroup` at startup.
- The webhook triggers on this event and requests the URL `https://api.particle.io/v1/products/20379/devices/{{PARTICLE_DEVICE_ID}}`. The `{{PARTICLE_DEVICE_ID}}` is replaced by the Device ID of the requesting device.
This will get the device information for that device.
- The response template extracts the grous, name, product_id, development, and notes fields out of the device info. Only a subset is returned so the response will fit in 1024 bytes.
- The response topic includes `{{{PARTICLE_DEVICE_ID}}}` so the response will only go to that specified device, not all devices in the fleet.


#### Device groups

Each device can belong to zero or more groups. You can set these in the console in the {{webhook-demo-link link="devices" text="devices tab"}}, however for this demo
it's better to set them below in [your device fleet](#your-device-fleet).

#### Product firmware

Setting up product firmware involves several steps:

- Compiling the firmware, typically using Particle Workbench.
- Uploading to the console from the {{webhook-demo-link link="webhook" text="firmware"}} tab of your product.
- Flashing the firmware to at least one device manually.
- Releasing the firmware as the default firmware for the product.

Once you've set the default firmware, and newly added device will automatically be flashed with this firmware when it connects to the cloud.

{{collapse op="end"}}


### Add devices to product

Whenever you have a product, you must add devices to it. When you scale, you will typically add all of the devices in your order at once, as you will be emailed a list of the Device IDs in your order. In the growth and enterprise plans, just adding the Device ID to the product does not affect billing; billing only starts the first time the device connects to the Particle cloud.

For this demo, you can just select existing devices from your developer sandbox to use in this tutorial. If you do not have a device yet, you can skip this step and use the **Test** feature to show how the webhook works without a device.

{{> webhook-demo-add-devices}}

You will normally use the **Add Devices** button in the {{webhook-demo-link link="devices" text="devices tab"}} in the console to do this in your real products.

### Your device fleet

This control shows the status of devices in your product fleet. It's similar to the {{webhook-demo-link link="devices" text="devices tab"}} in your product in the console.

{{> webhook-demo-fleet options="groupSelector"}}

- The **online** column shows a green checkbox if the device is online and connected to the Particle cloud.

- The **firmware** column shows a green checkbox if the device has product firmware and has come online at least once. 
When you onboard your first device, you have to manually request the firmware be flashed to it. Click the **Flash** link to do this.

- The **development** column checkbox shows if the device has the **Mark as Development device** flag set. You can also change the 
state using this checkbox. You normally should leave this turned off.

- Use the **groupa** and **groupb** checkboxes to set some devices to **groupa** and some to **groupb**. A device can be in more than one group, if desired.
Clicking the checkbox changes the state in the cloud and if the device is online, reconfigures it in a few seconds. If the device is offline or in sleep mode, it will get the current device group settings from the cloud after it comes online.

## Testing

The test firmware updates the status LED color of the device on request from the cloud in several situations:

- A function call to the specified device
- A publish of the `setColor` event to all devices in the product
- A publish to the group-specific event, such as `groupa/setColor`. This event will trigger all devices in `groupa` to set their status LED color.

### Functions

{{> webhook-demo-function-publish-function}}

This control will set the status LED of the specified device to the specified color for 10 seconds.

Functions are directed at a single device, by its Device ID. This is good when you want to control a single device at a time.

You can only call functions when the device is online. If the device is turned off or in sleep mode, the function call will fail with an error.

Unlike publish, however, the error indicates that the function was or was not handled. With publish, there is no indication to the caller whether any device received the publish.

### Publish

{{> webhook-demo-function-publish-publish}}

This control will set the status LED of all devices or certain device groups to the specified color for 10 seconds.

Publish goes out to zero or more devices. This is handy when you need to broadcast to many devices, or a selection of devices, at the same time.

The downside is that you don't know whether any devices received the publish, and if the device is offline, the publish is lost forever and the device will not receive it later.

## Device firmware

{{> project-browser project="function-publish-demo" default-file="src/function-publish-demo.cpp" height="400" flash="true"}}

{{collapse op="start" label="Tell me more the device firmware"}}

These are the header files. 

- Particle.h file is used in all .cpp files to include the standard Particle features.
- DeviceGroupHelperRK.h is a library used to handle device groups.
- SetColor.h is file that handles updating the RGB status LED. It's included in the source to this project.

```cpp
#include "Particle.h"

#include "DeviceGroupHelperRK.h"
#include "SetColor.h"
```

This is recommended for all applications:

```cpp
SerialLogHandler logHandler;
SYSTEM_THREAD(ENABLED);
```

All products must include the version number, and increment it when creating a new product firmware version to upload to the console. This is an integer, not a semver.

```cpp
PRODUCT_VERSION(1);
```

This is a forward declaration of a C++ function. When you use a .cpp file (as opposed to a .ino file) you must include forward declarations for function you use before the implementation.

```cpp
void groupCallback(DeviceGroupHelper::NotificationType notificationType, const char *group);
```

Global variables, which will be described below when they are used.

```cpp
int firmwareVersion = (int) __system_product_version;
SetColor setColor;
```

The setup() function is called at boot. This firmware creates a variable called "FunctionPublishDemo01". This is useful because it makes it easy to see what
product firmware is flashed to a device from the console. 

```cpp
void setup() 
{
    // This variable is used to more easily identify which product firmware is running
    Particle.variable("FunctionPublishDemo01", firmwareVersion);
```

This registers a function ("setColor") and subscribes to the "setColor" event. Even though they share a name, they're independent.

```cpp
setColor.function("setColor");
setColor.subscribe("setColor");
```

This sets up the [Device Group Helper library](https://github.com/rickkas7/DeviceGroupHelperRK). 

- It retrieves the device groups at boot (this uses 2 data operations). This uses a product webhook.
- It calls a function when the device groups are retrieved
- It also registers a function to allow the device groups to be set from the cloud. The demo website uses this to update groups immediately after changing them.

```cpp
DeviceGroupHelper::instance()
    .withRetrievalModeAtStart()
    .withNotifyCallback(groupCallback)
    .withFunction("setDeviceGroups")
    .setup();   
```

The loop() function is called 1000 times per second. This firmware just gives time to the setColor pseudo-library and the actual device group helper library. 
You would probably have more things in your actual firmware.

```cpp
void loop() 
{
    setColor.loop();
    DeviceGroupHelper::instance().loop();
}
```

This function is called from the device group helper library when the device groups are retrieved.

```cpp
void groupCallback(DeviceGroupHelper::NotificationType notificationType, const char *group) {
    switch(notificationType) {
    case DeviceGroupHelper::NotificationType::UPDATED:
        {
```

The most important part is handing update. 

- Remove all previous subscriptions.
- Resubscribe to the setColor event. This affects all devices in the fleet.
- For each device group the device is subscribed to, also subscribe to "groupName/setColor". This is used to set the status LED color of all devices in a device group.

```cpp
Log.info("updated groups");
Particle.unsubscribe();
setColor.subscribe("setColor");
auto groups = DeviceGroupHelper::instance().getGroups();
for(auto it = groups.begin(); it != groups.end(); it++) {
    String groupName = (*it).c_str();
    String subEvent = String::format("%s/setColor", groupName.c_str());
    Log.info("subscribing to %s", subEvent.c_str());
    setColor.subscribe(subEvent);
}
```

Also note the contents of the project.properties file. To include a library, you must include it in project.properties and include any relevant header files.


{{collapse op="end"}}

### Event log

This control shows the same information that is shown in the {{webhook-demo-link link="events" text="events tab"}} in your product so you don't need to switch between multiple windows.

Published events show up here, but function calls and variable requests do not, as they are not events.

{{> webhook-demo-events }}



### Device logs

If you have your Particle device connected by USB to your computer (Windows, Linux, Mac, or Chromebook), and you are using the Chrome web browser, you can monitor your device's USB serial debug log from this interactive control. You can also use `particle serial monitor` from the Particle CLI if you prefer. Both are optional, but are good for troubleshooting.

{{> usb-serial-console}}



### Open in Workbench

The recommended development environment for Particle firmware is [Particle Workbench](/workbench/). To open this project in Workbench:

- Use the **Download Full Project (*.zip)** option in [Device Firmware](#device-firmware), above.
- Extract the zip file on your computer.
- Open Visual Studio Code
- Use the File - Open option to open the directory you just extracted. Make sure you open the directory, not a single file in it.

Most operations are in the **command palette** (Ctrl-Shift-P on Windows and Linux, Command-Shift-P on Mac). Some useful commands:

- **Particle: Login** Log into your Particle account.
- **Particle: Configure Project for Device** Set the type of device and the version of Device OS you want to use.
- **Particle: Cloud flash** Compile the project and flash it to a device OTA.
- **Particle: Cloud compile** Compile the project and download the .bin file.


## Clean up

If you are done using this tutorial, you can clean up the things that were created during this tutorial.

{{> webhook-demo-cleanup }}

