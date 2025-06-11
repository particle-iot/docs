---
title: Console
shared: true
columns: two
layout: commonTwo.hbs
description: Web-based management for your Particle IoT devices
includeDefinitions: [api-helper, api-helper-config, api-helper-json, api-helper-tracker, codemirror, zip]
---

# {{title}}

The [Particle Console](https://console.particle.io) is your
centralized IoT command center. It provides interfaces to make
interacting with and managing Particle devices easy. This guide is
divided into two main sections, [tools for developers](#developer-tools)
and [tools to manage product fleets](#product-tools).

**Note:** The Console does not work in Microsoft Internet Explorer including Edge. Please use another browser, such as Chrome or Firefox, to access the Console. If you're experiencing rendering issues, turn off any ad blocking extensions you may be using.

{{> sso}}

## Developer tools

While actively developing an IoT project or product, the Console offers
many helpful features to make prototyping a breeze. See the last time a
device connected, debug a firmware issue by observing event logs,
set up a webhook to send data to an external service, and more.

### Search

The console makes it easy to search for a device from its Device ID (24-character hex code), serial number, name, or ICCID. You can also search for a product by name.

This can be done at the top level of your sandbox to search your sandbox and all organizations you have access to. There is also a search at the top level of each organization to search only that organization.

![Console search](/assets/images/console/console-search.png)


### Devices

The Devices page allows you to see a list of the devices associated with
your account. Here, you can see specific information about each device,
including it's unique Device ID, it's name, the type of device, the last time it connected
to the Particle cloud, and whether or not the device is currently
online.

{{!-- BEGIN shared-blurb 164b5ce0-9baa-11ec-b909-0242ac12000 --}}
![Sandbox device list](/assets/images/console/sandbox-devices.png)

When **Sandbox** (1) is selected, you will see the devices in your personal sandbox, vs. your basic or enterprise organization. 

Clicking the **Devices** icon (2) shows the Device List.

If the **Show sandbox devices only** checkbox (3) is not checked, then the list will be like the old, pre-checkbox, behavior and will show devices that are claimed to your account, both in your free developer sandbox as well as product devices in free, basic, and enterprise organization products. 

When checked, the list will only include non-product devices claimed to your account in the free developer sandbox.

- **Total personal devices** is the number of non-product devices in your free developer sandbox.
- **Total claimed product devices** is the total number of devices claimed to your account that are in a product.

The 100-device limit in the free plan is the total of the devices claimed to your account in the developer sandbox, plus all devices in any free plan products that you are the owner of. 
{{!-- END shared-blurb --}}

You can also take certain actions on devices from this view, such as
renaming the device and unclaiming it from your account.

Unclaiming a cellular device removes it from your account, but does not stop billing. As the claiming status and SIM are separate, you must also pause or release ownership of your SIM to stop billing.

### Event logs

The Logs feature provides a clean interface to view event information in real-time, just from your devices. We're hoping that this is handy both while debugging code during development, and checking out recent activity on your device once you power-on your finished project. Tailored around improving the experience of browsing logs, the page provides a handful of tools, like filtering, modifiers which enable you to narrow down your search for events, making it easier to view only the data that is relevant to you. In this view, you'll only see events that come in while the browser window is open.

To visit the page go to [https://console.particle.io/events](https://console.particle.io/events)

<img src="/assets/images/eventlogs/full.png" class="full-width" />

#### Logs

The left side of the page contains a real-time log of events passing through the cloud. You'll get the name, data, timestamp and the device name associated with each event as it comes in. Oh Yeah! And, if you click on the event, you can see the event data.

#### Exporting events

The [Event Viewer Tool](/tools/cloud-tools/events/) can be used if you want to export events to a file or spreadsheet.

#### How to publish events

Publishing events can be achieved in multiple ways:
- Using `particle.publish` in firmware ([docs](/reference/device-os/api/cloud-functions/particle-publish/))
- Using Particle API JS's `publishEvent` ([docs](/reference/cloud-apis/javascript/#publishevent))
- Using the Publish event button in the Event Logs page:

<img src="/assets/images/eventlogs/publish.png" class="full-width" />

#### Filtering the events

Filters let you narrow down your search and only see events that are relevant.

You can filter the events by writing anything in the input. Your query will be compared with the event name, data, publisher, and date.
<img src="/assets/images/eventlogs/filter_word.gif" class="full-width" />

#### Modifiers

Besides writing in the input, you can use modifiers to narrow down your search even further. You can see the list of modifiers by pressing the Advanced button.

<img src="/assets/images/eventlogs/filters.png" class="full-width" />

- `device` Filter by device ID (example: `device:34003d001647353236343012`). The `device` modifier is not usable when viewing a device's individual page, as the stream is already listening only for events coming from that device.
- `event` Filter by event name (example: `event:status`)
- `range` Only show events that have a number value between min and max (`range:min-max`, example: `range:20-100`)
- `data` Filter by data (example: `data:device-is-ok`)

Modifiers can be grouped: `device:34003d001647353236343012 event:temperature range:30-50`

** Note: Having multiple modifiers of the same type is not yet supported (you can not filter by 2 device IDs) **

You can combine modifiers with a query. In this example, we combine the query '35' with the modifier 'event:temperature'. The page will only show events named `temperature` that have `35` as their data.
<img src="/assets/images/eventlogs/filter_multiple.png" class="full-width" />

#### Viewing event data

To view more details about an event, click on it. If the event data is a valid JSON string, it will be displayed in a way that makes it easier to read and understand.

<img src="/assets/images/eventlogs/eventdata_pretty.png" />

To view the raw version of the JSON, click on the `RAW` button.

<img src="/assets/images/eventlogs/eventdata_raw.png" class="full-width" />

You can copy the data to the clipboard if you click on the copy button.

** Note: You can also navigate through the event list by using the up and down arrow keys **

#### Clearing the event logs

You can empty the list of received events by pressing on the Clear button.

#### Pausing the event stream

If lots of events are coming through, you can put events in a queue by clicking on the Pause button. This should help you navigate through the list of events that you have already received.

To make the events from the queue visible click on the Play button.

<img src="/assets/images/eventlogs/queue.png" class="full-width" />

### Integrations

Integrations allow you to send data from your Particle devices to
external tools and services. The Console provides an interface to
create, view, edit, and delete Particle integrations.

<img src="{{assets}}/images/console/integrations-view.png"
class="full-width"/>

For more information on how to start using integrations, you should
check out:

- [Webhooks
guide](/integrations/webhooks/)
- [Webhooks
tutorial](/integrations/webhooks/)
- [Azure IoT Hub
tutorial](/integrations/community-integrations/azure-iot-hub/)
- [Google Cloud Platform
tutorial](/integrations/integrations/google-cloud-platform/)

## Billing & usage

The **Billing & Usage** page shows billing information and data usage (data operations and cellular). 

All accounts have a personal sandbox on the free plan. The sandbox can include up to 100 cellular and Wi-Fi devices (in any combination, not to exceed 100 total), free of charge. For the basic plan, this is in addition to devices included in your basic plan blocks.

From this page you can view the total number of devices and data operations consumed by your free sandbox devices.

![Sandbox](/assets/images/console/sandbox.png)

For users who are Administrators of an organization, selecting the organization then **Billing & Usage** icon shows the usage for all products within the organization.

![Organization Billing](/assets/images/console/org-view.png)

In the Basic and Enterprise plans, usage is divided by the class of devices. For example: Wi-Fi and Cellular:

![Wi-Fi and Cellular Usage](/assets/images/console/wifi-cellular-usage.png)

These panels turn yellow at 70% of your plan limits, and red when the limits have been reached.


You can also quickly view your usage from the popup under your email address in the upper-right corner of the console window.

<div align="center"><img src="/assets/images/console/usage-popup.png" class="small"></div>

The numbers of devices and data operations will be updated within a half hour. Cellular data usage may be delayed for up to a week.

### Historical data

At the bottom of the Billing & Usage panel you can request a data usage report:

![](/assets/images/console/historical-data.png)

- Time Range: Past week, Past month, Past 3 months, Past year
- Data Requested: Data usage by device, Data usage by product

It will take several minutes to generate the data, and you will be emailed a csv file when done. 

This option is also available for organization administrators in the organization Billing & Usage panel.

### Billing limits

You will receive warnings by email, and as a pop-up, and in the **Billing & Usage** tab in the console at 70%, 90%, and 100% of the allowable data operations. 

In the free plan, once you reach the 100% limit you have three days to switch the the Basic plan, or data will be stopped until the end of your billing month. It will automatically resume on the free plan at the beginning of the next billing month, still on the free plan, if you do not upgrade.

In the basic plan, once you reach the 100% limit an additional block will be added to your plan. Starting at the next billing month your plan will include these additional block(s) and you will be billed accordingly. There is no additional charge at the time of the overage; it occurs only on the next billing cycle.

### Upgrading to the basic plan

Following the [link from the emails](https://www.particle.io/upgradetogrowth/) or **Billing & Usage** page leads to a contact form to initiate the upgrade process. A representative will contact you by telephone to complete the upgrade process to basic plan.

When you upgrade to the basic plan, you will get an organization, which is the collection of products and accounts in your plan. The usage limits in the basic plan apply monthly across all products of the same type in your organization. Some limits vary between cellular, Wi-Fi, and tracker products. 

Additionally, all organization members still have a private sandbox in their account and can still have their own 100 free devices that do not count against your basic plan limits. 

If you already have your devices in a product, the entire product can be moved into your basic organization without affecting the customers, access tokens, or cloud API endpoints, so this should be a relatively easy transition.

### Cellular usage

To view detailed cellular usage information for SIMs in a product you can use the [cellular usage tool](/troubleshooting/connectivity/cellular-usage/).


## Product tools

For many using Particle, the end-goal is to move from a single prototype
to a professional deployment of thousands or millions of units in the
field. When you begin making this transition to managing a larger fleet
of devices, you'll find yourself asking questions like:

- _How many_ of my devices are online right now?
- _Which_ firmware version is running on each device?
- _Who_ of my customers are using their devices, and who isn't?
- _Who_ in my company has access to this fleet, and what information can they
access?

This is where creating a Particle product is vital to ensure scaling can
happen seamlessly and successfully.

Luckily, the Particle Console is designed to give you full visibility into the
state of your product fleet, and provide a centralized control panel to change how
devices are functioning. It allows you and a team to manage firmware running on your devices, collect and analyze product data, and manage team permissions from a single administrative interface.

The first step to get started is understanding the differences between your
personal devices and those added to a Product.

### Devices vs product devices

Up until now, you've been an individual user of Particle. Your devices belong to
you, and you can only act upon one device at a time.

When you create a **Product**, you'll have a few additional important concepts available to you: **devices**, **team members** and **customers**.

First, you'll set up a **Product**, the overarching group responsible for the
development of your Internet of Things products.

Defining a Product is what unifies a group of homogeneous devices together, and your Product can be configured to function exactly how you
envision.

Each Product has its own fleet of associated **devices**. Any hardware
on the Particle Device Cloud including the PØ, P1,
Photon, and Electron, could be used inside a Product, but it's important to note that only one type of device will be in each Product

**Customers** own a device, and have permissions to control
their device. You will define the extent of their access to the device when you
configure your Product. 

For cellular devices, it is also common to have all devices claimed to a single account, rather than using individual customer accounts. It is also possible to use unclaimed product devices.

Your Product also has **team members** with access to the Console.

It is important to note that *team members* and *customers* have different levels of access. For instance, only *team members* will typically be able to send an over-the-air firmware update, while *customers* may have the ability to control their own product. These access levels will be controlled through the Console.

### Defining a product

Our cloud platform thinks that all devices are *Photons*, *Electrons*, or *Cores* — unless it's told otherwise. Now's the time to define your own product within the platform and tell us a bit about how that product should behave.

*Photons* are development kits. They're designed to be easy to reprogram and run a variety of software applications that you, our users, develop.

*Your product* is (probably) not a development kit. While some of the characteristics of the development kits will carry over, you're going to want to make a bunch of changes to how your product works. These include:

- Limiting access (e.g. only certain people can reprogram them)
- Collecting bulk data, events, errors, and logs from all of your devices
- Distributing firmware updates in a controlled fashion

To create a product, return to your personal console page and click on the **New Product** button.

![Your product page](/assets/images/products-page.png)

This will open up a modal where you can add basic details about your product:

![A new product](/assets/images/new-product-modal.png)

You now have your very first Particle product! Woot!

### Adding team members

Now that you have created a Product successfully, it's time to add your coworkers and friends that are collaborating with you on your IoT product. Adding a team member will give them full access to your Product's Console.

To do this, click on the *team icon* (<i class="ion-person-stalker"></i>) on the sidebar of your Product Console. This will direct you to the team page, where you can view and manage team members. Right now, your username should be the only one listed as a member of the Product. To add a new team member, just click the *Invite team member* button pictured below:

![Team page](/assets/images/team-page.png)

Clicking this button will open up a modal where you can invite a team member by email address. Before inviting a new team member, **make sure that they already have a Particle account with the email address you will be using to invite them to the Product**. 

![Invite team member](/assets/images/invite-team-member.png)
<p class="caption">The invite team member modal</p>

Once your team member is successfully invited, they will receive an email notifying them of their invitation. The next time they log into their Console, they will have the option of accepting or declining the invitation. Remember that you can have up to 5 team members in the free Prototype tier, so go send some invites!

[API Users](/reference/cloud-apis/api/#api-users) are also displayed in the team members tab.

Nice! Now you have a Product with a team.

### API users

An [API user account](/reference/cloud-apis/api/#api-users) is a specific type of user account in the Particle platform that is designed to replace using 'human' accounts for programmatic tasks. It is highly recommended that you use this feature if you are connecting to the Particle cloud
from an external web service.

In the **Team** tab for a product or organization, click the **Add API user** button.

![Add API user](/assets/images/console/add-api-user.png)

From this window you can select common scopes, or use the **Advanced customization** slider to access all of the available scopes.

Once you've created API users, they are listed below team members and can be edited or removed there.

Unlike most user tokens, API users tokens do not expire, since they are intended to be embedded in external services. For security reasons, you should still prevent accidentally exposing them, and also use the minimum set of scopes that are necessary.


### Your product ID

When you created your product, a unique numeric ID was assigned to it. This small piece of information is *very, very important* to you as a product creator, and it will be used countless times during the development and manufacturing process for your product. You will be able to find your product's ID at any time in the navigation bar when viewing information about your product:

![A new product](/assets/images/product-id.png)
<p class="caption">Your product ID is marked with a key icon</p>

This ID will be used by the Particle Device Cloud to identify which devices belong to your Product, and subsequently it is part of what empowers you to manage firmware running on those devices *en masse*.

When working with devices that belong to your Product, it is important to note that this product ID must be compiled into the firmware that is running on each device. The product ID that the device reports to the cloud from its firmware will determine which Product it requests to become a part of. This will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

### Adding devices

Now that you have your Product, it's time to import devices. Importing devices will assign them to your Product and allow you to start viewing and managing these devices within your Product Console.

For any product you may be developing, you likely have one or more Particle development kits (i.e. a Photon) that you have been using internally for prototyping purposes. We strongly recommend importing these devices into your Product, and using them as your *development group*.

In addition, you'll want to have a *test group* of devices to serve as the guinea pigs for new versions of product firmware. You should get into the habit of uploading a new version of firmware to your product, and flashing it to your test group to ensure your code is working as expected. This too will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

To import devices, click on the Devices icon in your product sidebar, then click on the "Import" button.

![Your product's devices](/assets/images/devices-page.png)

To allow you to import devices in bulk, we allow you to upload a file containing multiple device IDs. Create a `.txt` file that contains all of the IDs of devices that you would like to import into your product, one on each line. [Not sure what your device ID is?](/getting-started/developer-tools/cli/#running-from-source-advanced-particle-identify) *You cannot register devices that have already been 'claimed' by someone outside of your team; all of these devices must either belong to a team member or belong to no one*. The file should look something like this:

```
55ff6d04498b49XXXXXXXXXX
45f96d06492949XXXXXXXXXX
35ee6d064989a9XXXXXXXXXX
```

Where each line is one Device ID. Once you have your file ready, drop it onto the file selector in the import devices dialog box.

![Import devices modal](/assets/images/import-devices.png)

As noted at the bottom of the dialog box, if you previously rolled out
firmware, those newly imported devices will be updated over the air to
that firmware next time they connect to the Particle Device Cloud.

The [Import Devices Tool](/tools/cloud-tools/import-devices/) can be used to simplify the process of doing multiple operations such as adding the device, claiming, naming, etc. for multiple devices.


### Rollout firmware

One of the most valuable features of a Particle product is being able
to seamlessly manage firmware on a fleet of IoT devices. You now have
the ability to continuously improve how a device functions after
deployment. In addition, product firmware management allows you to
quickly and remotely fix bugs identified in the field, fleet-wide.

This happens through **firmware releases**, which targets some or all of
a device fleet to automatically download and run a firmware binary.

#### Recommended development flow

When releasing firmware your fleet, it's helpful to first understand
Particle's recommended release flow. This flow has been designed to minimize
risk when deploying new firmware to devices:

<img src="/assets/images/release-firmware-flow.png" class="full-width" />
<p class="caption">The recommended flow for releasing firmware</p>

1. The first step of the release flow is using [**development
devices**](/getting-started/console/development-devices/) to rapidly develop and iterate on product firmware. These are special
product devices marked specifically for internal testing.
This gives you the flexibility to experiment with
new firmwares while still simulating behaviors of deployed devices in
the production fleet. For information on marking a device as a
development devices, check out [the
guide](/getting-started/console/development-devices/#marking-a-development-device).

2. When you have finalized a firmware that you feel confident in releasing
to your fleet, [**prepare the binary and upload it to your
product**](#preparing-a-binary).

3. Before releasing, you will need to ensure that the uploaded product
firmware is running on at least one device in your product fleet.
Your development device(s) may already be running the firmware,
but we also recommend [**locking one or more devices**](#locking-firmware)
to the newly updated firmware and ensure that it re-connects
successfully to the cloud. This is because locking more closely
represents a release action, with the specific firmware being delivered
to a product device.

4. [**Mark the firmware as released**](#releasing-firmware). This will
target product devices to automatically download and run the firmware.
The Particle Device Cloud will respect the [precedence
rules](#firmware-precedence-rules) to determine which firmware is
delivered to a given device. You can also use [device groups](/getting-started/console/device-groups/),
to more safely roll out the firmware by targeting a subset of the
fleet for release.

The rest of this section contains details around how to go through this
process.

#### Development devices

Please visit the [guide on development
devices](/getting-started/console/development-devices/) for
information on this feature.

#### Preparing a binary

Click the Firmware icon in the left sidebar to get started. This will direct you to your product's firmware page, your centralized hub for viewing and managing firmware for your product's devices. If you haven't yet uploaded any firmware for this Product, your page will look like this:

<img src="/assets/images/firmware-page.png" class="full-width"
alt="Firmware page"/>

If you have been using the [Web IDE](/getting-started/developer-tools/build/) to
develop firmware, you are used to the process of writing, compiling, and
then flashing firmware. You will follow the same high-level process
here, but altered slightly to work with a fleet of devices. The first thing you'll need to do is compile a *firmware binary* that you will upload to your Console.


#### Preparing firmware (4.x and later)

Unlike compiling a binary for a single device, it is critical that the **firmware version** is included in the compiled binary when targeting Device OS 4.0 or later. 

Add the PRODUCT_VERSION macro to your main application `.ino`
file, below `#include "Particle.h"` if it includes that line. For more information, see [PRODUCT_VERSION](/reference/device-os/api/macros/product_version/).

The firmware version must be an integer that increments
each time a new binary is uploaded to the Console. This allows the
Particle Device Cloud to determine which devices should be running which firmware versions.

Here is an example of Blinky with the correct product version details:

```cpp
#include "Particle.h"

PRODUCT_VERSION(1);

int led = D0;  // You'll need to wire an LED to this one to see it blink.

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);   // Turn ON the LED pins
  delay(300);               // Wait for 1000mS = 1 second
  digitalWrite(led, LOW);    // Turn OFF the LED pins
  delay(300);               // Wait for 1 second in off mode
}
```


#### Preparing firmware (3.x and earlier)

Unlike compiling a binary for a single device, it is critical that the **product ID** and a **firmware version** are included in the compiled binary. Specifically, you must add `PRODUCT_ID([your product ID])` and `PRODUCT_VERSION([version])` into the application code of your firmware. For more information, see [PRODUCT_VERSION](/reference/device-os/api/macros/product_version/).

Add these two *macros* near the top of your main application `.ino`
file, below `#include "Particle.h"` if it includes that line. Remember
that your [product ID](/getting-started/console/console/#your-product-id) can be found in the navigation
of your Console. The firmware version must be an integer that increments
each time a new binary is uploaded to the Console. This allows the
Particle Device Cloud to determine which devices should be running which firmwares.

Here is an example of Blinky with the correct product and version details:

```cpp
PRODUCT_ID(94);
PRODUCT_VERSION(1);

int led = D0;  // You'll need to wire an LED to this one to see it blink.

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);   // Turn ON the LED pins
  delay(300);               // Wait for 1000mS = 1 second
  digitalWrite(led, LOW);    // Turn OFF the LED pins
  delay(300);               // Wait for 1 second in off mode
}
```


#### Compiling binaries

If you are using Particle Workbench, follow the instructions to use the [**Particle: Cloud Compile**](/getting-started/developer-tools/workbench/#particle-cloud-compile) or [**Particle: Compile Application (local)**](/getting-started/developer-tools/workbench/#particle-compile-application-local-) to create a firmware binary.


If you are in the Web IDE, you can easily download a compiled binary by
clicking the code icon (<i class="ion-code"></i>) in your sidebar. You
will see the name of your app in the pane, along with a download icon
(shown below). Click the download icon to compile and download your current binary.

![Compile firmware](/assets/images/ide-compile.png)
<p class="caption">Compile and download a product binary from the web IDE</p>

Once you have a binary ready to go, it's time to upload it to the Console!

#### Uploading firmware

Back on the firmware page, click on the **Upload** button in the top-right corner of the page. This will launch the upload firmware modal:

![Upload firmware](/assets/images/upload-firmware.png)

A few things to keep in mind here:

* The firmware version that you enter into this screen **must match** what you just compiled into your binary. Madness will ensue otherwise!
* You should give your firmware a distinct title that concisely describes how it differs from other versions of firmware. This name will be important in how firmware is rolled out to devices
* Attach your newly compiled `.bin` file in the gray box

Click upload. Congrats! You've uploaded your first version of product firmware! You should now see it appear in your list of firmware versions.

![Product firmware version](/assets/images/product-firmware.png)
<p class="caption">Your firmware version now appears in your list of available binaries</p>

You can update the details of your product firmware version by clicking
Edit when hovering over that firmware version.

If you find a problem with your firmware version during testing, you can
delete the firmware version, recompile it and reupload it. It is only
possible to delete a firmware version before marking it as released.

![Product firmware editor](/assets/images/product-firmware-editor.png)
<p class="caption">Edit the details of your firmware version or delete an unreleased version</p>

#### Releasing firmware

Time to flash that shiny new binary to some devices! Notice that when
you hover over a version of firmware, you have the ability to
**release firmware**. Releasing firmware is the mechanism by which any
number of devices can receive a single version of firmware
without being individually targeted.

Imagine identifying a bug in your firmware and pushing out a fix to
thousands of devices that are out in the field. Or, consider the
possibility of continuing to add new capabilities to your fleet connected
devices, even after being deployed. It is all possible via releasing
firmware.

As a product creator, you can choose to release firmware to *some* or *all* of your
product fleet. Releasing a firmware as the **product default** sets the
firmware as the default version available to *all*
devices in the fleet to download and run.

To start the release process, place your cursor over the firmware you
want to release and click **Release firmware**:

<img class="full-width" src="/assets/images/release-firmware-list.png" />

A modal will appear, asking you to confirm the action you are about to
take:

![Release firmware confirmation](/assets/images/release-firmware-confirmation.png)
<p class="caption">Always confirm the version, targeted group(s) and impacted devices
before releasing firmware to your device fleet to ensure you are taking
the desired action.</p>

*Impacted devices* refers specifically to the number of devices
that will receive an OTA firmware update as a direct result of this
action. Keep in mind  that releasing firmware always presents risk. Anytime the code on a
device is changed, there is a chance of introducing bugs or regressions.
As a safeguard, **a firmware version must be successfully running on at
least one device before it can be released**.

When you have confirmed the release is what you have intended, click the
**Release this firmware** button. Note that the devices will not receive the firmware immediately;
instead, they will be targeted for an over-the-air update the next time
they start a new secure session with the cloud (this is called a
*handshake*).

It is also possible to release firmware to a subset of your product
fleet, using [device
groups](/getting-started/console/device-groups/). For more
information on fine-grained firmware management, please check out
[the guide](/getting-started/console/device-groups/) on device
groups.

#### Locking firmware

In many cases, you may want to force a device to download and run a specific
version of product firmware. This is referred to as **locking** the
device. You can lock a device to a new version of product
firmware to test it before releasing the firmware to the fleet.

To lock a device to a firmware, find the device on your product's
devices view. Click on the device, which
will take you to the device details view. Click on the **Edit** button:

<img class="full-width" alt="Edit device" src="/assets/images/edit-device.png" />

This will allow you to edit many aspects of the device's state,
including the firmware it is targeted to run. Find the **Firmware**
section, select a version of firmware you want to lock the device to,
and click the **Lock** button as sown below:

<img class="full-width" alt="Lock device firmware"
src="/assets/images/lock-firmware.png" />

If the device is currently online, you can optionally immediately
trigger an OTA update to the device by checking *Flash now* next to the
lock button. Otherwise, the device will download and run the locked
firmware the next time it handshakes with the cloud (starts a new secure
session, most often on reset).

Once the device downloads and runs the locked firmware, it will no
longer be targeted by the Particle cloud for automatic firmware updates,
until it is unlocked. For more details, please read the [firmware
precedence rules](#firmware-precedence-rules).

#### Unlocking firmware

Unlocking a product device breaks its association with the locked
firmware version and makes the device eligible to receive released
product firmwares once again.

To unlock a device, visit the device's details view by clicking on it
from your product's device list. Click the **Edit button** (shown
above), and then click the **Unlock** button:

<img class="full-width" alt="Unlock device firmware"
src="/assets/images/unlock-firmware.png" />

The device above is now unlocked from version 3 of product firmware, and
may be targeted to receive a released firmware next time it handshakes
with the cloud.

#### Firmware precedence rules

Devices in your fleet will be targeted to
receive a version of product firmware according to these precedence
rules:

- A device that has been **individually locked** to a version of product
firmware is respected above all else, and will not be overwritten by any
released firmwares.

- If unlocked, devices **belonging to a group** will receive the
corresponding group's released firmware (if a firmware has been released
to the group). When a device belongs to multiple groups that each have
released firmware, the _highest firmware version_ will be preferred

- If a device is unlocked and **does not belong to any groups** with
released firmware, it will receive the **Product default** released
firmware (if a firmware has been released as the Product default)

- If none of the above conditions result in a device being targeted for
a product firmware, it will not receive an automatic OTA update from the
Particle cloud

### Managing customers

**Customers are generally unnecessary unless you are using the Device Setup SDK for the P1 and Photon.** We recommend not using customers unless absolutely necessary as it will add considerable complexity. The Device Setup SDK cannot be used with the P2, Photon 2, or Argon.

{{collapse op="start" label="Show older information"}}

Now that you have set up a Product, your customers will be able to create accounts on the Particle platform that are registered to your Product. When properly implemented, your customers will have no idea that Particle is behind the scenes; they will feel like they are creating an account with *ACME, Inc.*.

There are three ways you can authenticate your customers:

- **Simple authentication**. Your customers will create an account with Particle that is registered to your product. You do not need to set up your own authentication system, and will hit the Particle API directly.
- **Two-legged authentication**. Your customers will create an account on your servers using your own authentication system, and your web servers will create an account with Particle for each customer that is paired to that customer. Your servers will request a scoped access token for each customer to interact with their device. This is a completely white-labeled solution.
- **Login with Particle**. Your customers will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0. Unlike the other authentication options, this option will showcase Particle branding. This is most useful when the customer is aware of Particle and may be using Particle's development tools with the product.

As customers are created for your product, they will begin to appear on your Customers (<i class="ion-user"></i>) page. For each customer, you will be able to see their username and associated device ID. Note that the device ID column will not be populated until the customer goes through the claiming process with their device. Customers are commonly used for Wi-Fi products because you will often need a mobile app to configure Wi-Fi network credentials. Creating a customer associates a user with their device or devices, and allows a mobile app to communicate directly with the Particle cloud API on behalf of only that user.

For cellular devices, you can use customer accounts as well. However, it is common to use two other methods:

Single account claiming claims all devices to a single account owned by the product creator. Cellular apps often use a web app, which does not need to have Particle API access per-user. Instead, they can handle this in the back-end. Even cellular products that have a mobile app may prefer to implement them using a mobile framework and communicate from the app to their own back-end using standard web technologies instead of the Particle API. This makes it easier to find app developers, since they don't need to know about the Particle platform.

Unclaimed product devices eliminate the claiming step entirely. This simplifies device setup. They can receive OTA updates, and handle Particle functions and variables. The Asset Tracker Tracker Edge firmware typically operates using unclaimed product devices.

{{!-- BEGIN shared-blurb 04d55e8d-8af5-4d4b-b6a4-d4db886c669d --}}
- Prior to March 2023, claiming was required if the device firmware subscribed to events on-device. This is no longer necessary.
- You still need to claim a device is if you are using a webhook in the sandbox of the user who claimed the device. It is recommended that you use product webhooks instead, which do not require claiming.
- If you are using a device with Mark as Development device, you may want to claim the device to your account so you can easily OTA flash it from Particle Workbench or other development environments.
- If you previously had firmware that subscribed to events but was the device was unclaimed, the events previously disappeared. This is no longer the case and the device will now start receiving those events, and each event will count as a data operation.
- Claiming is still allowed, if you prefer to continue to use claiming, but not recommended.
{{!-- END shared-blurb --}}

{{collapse op="end"}}

### Monitoring event logs

The Logs page (<i class="icon-terminal"></i>) is also available to product creators! Featuring the same interface as what you are used to with the [developer version of the Console](/getting-started/console/console/), the logs will now include events from any device identifying as your product. Use this page to get a real-time look into what is happening with your devices. In order to take full advantage of the Logs page, be sure to use `Particle.publish()` in your firmware.

Prior to March 2023, webhook events like hook-sent, hook-error, and hook-response only went to the device owner's event stream. If the device was unclaimed, the events disappeared. Now, these events also appear in the product event stream, in the console, SSE event stream, and webhooks. 

### Managing your billing

To see all billing related information, you can click on the billing icon in the sidebar (<i class="ion-card"></i>). This is the hub for all billing-related information and actions. For more specifics about the pricing plans and frequently asked questions, [go check out the Pricing page](https://www.particle.io/pricing).

### How billing works

#### Free plan

- Up to {{freeTierDevices}} devices, any mix of cellular and Wi-Fi
- {{freeTierDataOperationsUnit}} Data Operations ({{freeTierDataOperationsComma}}) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to {{freeTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, at no charge
- No credit card required
- Device communication is paused<sup>1</sup> when the monthly limit is reached

For more information see [Device Cloud - Introduction - Pricing](/getting-started/cloud/introduction/#pricing).

<sup>1</sup> You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations. Once you reach the 100% limit you have three days to switch the the Basic plan, or data will be stopped until the end of your billing month. It will automatically resume on the free plan at the beginning of the next billing month, still on the free plan, if you do not upgrade.


#### Free plan products

Products can be prototyped in the Free plan at no charge. However, there is a limit of {{freeTierDevices}} devices for Free plan products. 

#### Basic plan

- A block includes {{basicTierDataOperationsUnit}} Data Operations ({{basicTierDataOperationsComma}}) per month and up to {{basicTierDevices}} devices
- Add as many blocks as you need for more Data Operations or more devices
- No limit to the number of blocks you can purchase self-service
- Up to {{basicTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, for each block purchased

In the Basic plan, usage is measured by blocks. You can choose how many blocks you initially want to purchase in advance. It is also possible to add blocks if you run out of Data Operations, available devices, or cellular data. 

You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations for your current number of blocks. Once you reach the 100% limit, an additional block will be added to your plan. Starting at the next billing month your plan will include these additional block(s) and you will be billed accordingly. There is no additional charge at the time of the overage; it occurs only on the next billing cycle.

In the Basic and Enterprise plans, you will also have access to an **Organization**, which allows finer access control to multiple products. 

The number of devices is limited by the number of blocks you have purchased, 100 devices per block. You can purchase as many blocks as necessary to support number of devices you need.


### Status
It’s easy to find out the status of your Product’s metrics. Visit [console.particle.io/billing](https://console.particle.io/billing) and you’ll see an up-to-date list of each Product you own, how many outbound events they’ve used that billing cycle, number of devices in each, and how many team members they have. The renewal date for each Product plan is also shown, so you know when the next bill is coming up.

### Updating your credit card

You can update your credit card from the billing page by clicking on the "UPDATE" button next to the credit card on file. Whenever your credit card on file expires or no longer is valid, be sure to update your credit card info here to avoid any disruptions in your service.

### Failed payments

If we attempt to charge your credit card and it fails, we do not immediately prevent you or your team from accessing your Device Management Console. We will continue to retry charging your card once every few days <strong>for a maximum of 3 retries</strong>. You will receive an email notification each time an attempt is made and fails. When you receive this notification, the best thing to avoid any interruption in service is to <a href="#updating-your-credit-card">update your credit card</a>.

## Organizations

An organization makes it easy to manage multiple products with shared team members and billing. Organizations are available in the Basic and Enterprise plans. 

If your account is a member of an organization, the **Sandbox** popup in the upper left corner of the Particle console lists the organizations you can select:

<div align="center"><img src="/assets/images/console/org-popup.png" class="small"></div>

Selecting an organization brings up the organization view, which typically has:

- **Products** - the products in this organization.
- **Team** - the users in this organization and their roles (administrators, developers, etc.).
- **Billing & Usage** - only for users who have an Administrator role.

![Organization View](/assets/images/console/org-view.png)

You still have granular access control at the product level when using an organization. For example, if you have a contractor who is working on a single product you can grant developer access to that product only instead of all products in your organization.


## Asset Tracker features

All Asset Tracker devices are intended to be used in a product, not as developer devices. This makes it easy to manage a fleet of asset trackers, allowing per-fleet and per-device configuration settings, and features like fleet mapping. The Product Features in the previous section also apply to Tracker devices.

{{!-- 
### Create product

When you create a product with **Asset Tracker (Cellular** as the type, the Asset Tracker features are enabled for the product. Even if you have an existing product, you'll need to create a new Asset Tracker product as products can only have  a single type of device. For example, a product cannot have both an Asset Tracker and a Boron in it. This is done automatically for you if you use [setup.particle.io](https://setup.particle.io).

![Create Product](/assets/images/tracker/create-product.png)

It's OK if you're starting out with a single Tracker; you can create a free prototyping level product that only has one device in it.
--}}

### Map

{{imageOverlay src="/assets/images/tracker/map-view.png" alt="Map view" }}

The map view shows your fleet of devices or selected devices on a map. The Map view is available for Asset Tracker products in the **Maps** icon.

![Map Icon](/assets/images/tracker/map-icon.png)

You can show a subset of your devices on the map by searching:

- By Device ID
- By Device Name
- By [Device Groups](/getting-started/console/device-groups/)

{{!-- 
You can also search by the last known location, or within a certain time range.

![Map Search](/assets/images/tracker/map-search.png)
--}}

Each device has an overview available.

{{imageOverlay src="/assets/images/tracker/device-overview.png" alt="Device overview" }}

And view details about a specific device:

![Details](/assets/images/tracker/details.png)

On the Tracker One the temperature ("temp") is shown in degrees Celsius. This is the temperature on the board, within the enclosure, and will typically be several degrees warmer than the ambient temperature.

#### Accuracy circle

While GNSS is generally accurate, there can be uncertainty to the exact location when using cellular
tower geolocation. There can also be uncertainty with Wi-Fi, and in some cases with GNSS if a 
a full set of satellites is not visible.

When zooming into the map, a circle indicates the radius of uncertainty; the device could be anywhere 
within the circle; it's exact location is not known.

![Accuracy circle](/assets/images/tracker/accuracy-circle.png)


### Device fleet settings

Your Tracker devices are intended to, in general, be configured with fleet-wide settings that are used for all devices in your fleet. The fleet-wide settings are in the **Map View**. Click **Configure fleet** button in the upper-left corner of the map to update Tracker Settings.

![Settings Icon](/assets/images/tracker/map-settings.png)

Note that the settings are automatically synchronized with the device, even if the device is asleep or disconnected at the time the change is made. When the device connects to the cloud again, the checksum of the current device and cloud settings are compared, and if they are different, an updated configuration is sent to the device.

Additionally, the Geofence settings are always per-device, with no fleet-wide default. It's also possible to have per-device configuration for your own custom settings. The per-device settings are within the device configuration, and do not appear in the fleet settings.

Finally, when a device is marked as a Development Device, all configuration fields can be configured per-device, and these can override the fleet settings. Development devices also do not get automatic fleet firmware updates.


#### Location settings

{{imageOverlay src="/assets/images/tracker/settings-1.png" alt="Location Settings" }}

The Location settings include:

- **Radius Trigger** in meters, floating point. When the current position's distance from the last publish exceeds this distance, the new position is published. 0.0 means do not use a publish radius. The GNSS is not monitored during sleep mode, and the radius will only be checked when otherwise waking from sleep. The maximum location update frequency still limits how frequently publishes occur even if if the radius trigger is reached.

| US Units | Meters |
| :--- | :--- |
| 1 yard (3 feet) | 0.91 meters (approximately 1 meter) |
| 100 feet | 30.5 meters |
| 100 yards (length of American football field) | 91.4 meters |
| 1/4 mile | 402 meters |
| 1/2 mile | 805 meters |
| 1 mile | 1609 meters |

- **Maximum location update frequency** in seconds. Wait at least this long in seconds after the last location publish before publishing again. 0 means do not limit. The maximum location update frequency prevents publishing too frequently, which can use excessive amounts of data. 

  When using sleep modes, this also controls how often to connect to the cellular network. A maximum location update frequency value of 10 minutes (600 seconds) or larger is recommended. Setting a very short maximum location update frequency with sleep mode can cause your SIM card to be banned for excessive reconnection to the cellular network by your mobile carrier. 

- **Minimum location update frequency** in seconds. Publish location this often (in seconds) even if there is no movement or other wake trigger. 0 means do not use an minimum update frequency; only publish location information when there is another trigger, such as movement. Including a minimum location update frequency of 8 hours (28800 seconds) or 24 hours (86400) can be helpful to make sure the device is still responding and report its battery level.

In some cases, you will want to set the maximum and minimum to the same value. This is common if you are not using a trigger like movement and instead always want to publish at a fixed frequency.

| Common Unit | Seconds |
| :--- | ---: |
| 1 minute | 60 |
| 5 minutes | 300 |
| 10 minutes | 600 |
| 15 minutes | 900 |
| 30 minutes | 1800 |
| 1 hour | 3600 |
| 2 hours | 7200 |
| 4 hours | 14400 |
| 8 hours | 28800 |
| 24 hours | 86400 |


- **Minimize Data**. If checked, only only latitude and longitude data is sent on each location publish. If unchecked (the default), additional information such as speed and heading are sent.

- **Publish on GPS lock**. If checked, publish location when GNSS lock is obtained, even if the device has not reached the radius trigger or maximum location update frequency yet. The minimum location update frequency is still obeyed.

- **Acknowledge location publishes**. If checked, the device will expect cloud acknowledgement of location publishes and retry failed transmissions. If unchecked, one attempt will be made to send, which may or may not succeed. If you are publishing frequently, it may be preferable to lose some points, rather than record delayed information.

- **Enhanced location**. If checked, the Particle cloud will process location fusion, enhanced geolocation using Wi-Fi access points and cellular tower information.

- **Publish cellular tower data**. If checked, the Tracker will include information about nearby cellular towers with location events.

- **Publish GNSS data**. If checked, the Tracker will use the GNSS (GPS) module for geolocation.

- **Publish Wi-Fi access point data**. If checked, the Tracker will include nearby Wi-Fi access points in location publishes. The Wi-Fi access points are not connected to; most Wi-Fi access points periodically broadcast their presence to allow Wi-Fi devices to find them. This public information is used by the Wi-Fi geolocation service.

- **Callback to device with enhanced location data**. If checked, the Particle cloud will send back enhanced geolocation data obtained from Wi-Fi or cellular tower information back to the device. This is useful if your device firmware wants to process this information on device. If you're only tracking location from the cloud, it's not necessary to enable this option.

{{!-- BEGIN do not edit content below, it is automatically generated 38cf5c3c-cd20-45a4-b87f-a541b9bbef70 --}}


##### Radius Trigger (meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius Trigger (meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish location if it has moved this many meters from the last publish. 0 for unused.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">5</td></tr>
</tbody>
</table>

##### Maximum location update frequency (every n seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/interval_min</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Maximum location update frequency (every n seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Never publish location information more often than this setting.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">900</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

##### Minimum location update frequency (every n seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/interval_max</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Minimum location update frequency (every n seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Always publish location, when possible, this often</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">3600</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">7200</td></tr>
</tbody>
</table>

##### Minimize Data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/min_publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Minimize Data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish minimal location with only latitude and longitude. If disabled, publish additional information including speed, heading, etc.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish on GPS lock configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/lock_trigger</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on GPS lock</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, a change in GPS lock status will trigger a location publish, which will happen after the Minimum Interval has passed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

##### Acknowledge location publishes configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/loc_ack</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Acknowledge location publishes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will expect cloud acknowledgement of location publishes and retry sending if cloud is unresponsive.  If disabled, the device will publish location messages and not account for cloud acknowledgement (fire-and-forget).  See https://docs.particle.io/reference/device-cloud/api/#tracker-configuration-events for more information</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Enhanced location configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/enhance_loc</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enhanced location</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the cloud will process and send enhanced geolocation events based on GNSS, WiFi access points, and cellular tower triangulation.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish cellular tower data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/tower</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish cellular tower data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will collect nearby cellular towers and publish details with location events.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish GNSS data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/gnss</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish GNSS data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will utilize the GNSS module to generate and publish geolocation coordinates with location events.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish WiFi access point data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/wps</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish WiFi access point data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will collect nearby WiFi access points and publish details with location events.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Call back to device with enhanced location data configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/loc_cb</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Call back to device with enhanced location data</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the cloud will send an enhanced geolocation to the device based on GNSS, WiFi access points, and cellular tower triangulation.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Publish extra information to assist with debugging GNSS configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/location/properties/diag</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish extra information to assist with debugging GNSS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish GNSS constellation counts and C/NO characteristics.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


#### Store and forward

![Store and Forward](/assets/images/tracker/store-and-forward.png)

In Tracker Edge v18 and later, it's possible to enable store and forward mode from this panel. If the device is offline, such as from poor cellular connectivity, location publishes are saved to the device flash file system and published when connectivity is restored.

When disabled, location publishes that occur when the device does not have cellular connectivity are discarded. This makes sense if you only want to know where the device is currently, not where it has been in the past.

- **Store and forward** is enabled when the checkbox is checked. 

- **Storage Size Limit** in kilobytes. Default: 64K. While the flash file system is 4 MB, you should not use the entire file system for store and forward. Also, since publishes occur one per second when reconnecting, sending large amount of historical location data will use a lot of data operations and time.

- **Discard Policy** is **drop_old** or **drop_new** which determines whether to discard the oldest or newest location data when the storage size reaches the limit.

{{!-- BEGIN do not edit content below, it is automatically generated 192e9889-fb5c-4082-af99-19d65beadc02 --}}


##### Store and Forward configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/store/properties/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Store and Forward</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the device will store unpublished location publishes to the local filesystem when offline and publish them when back online.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">true</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Storage Size Limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/store/properties/quota</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Storage Size Limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Size in kilobytes to limit storage on the local filesytem for unpublished messages.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">64</td></tr>
</tbody>
</table>

##### Discard Policy configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/store/properties/policy</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Discard Policy</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">When storage size limit is exceeded drop_old deletes the oldest logged publish to retry, drop_new deletes the newest</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">drop_old</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">drop_old,<br>drop_new</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}

#### Motion settings

![Motion Settings](/assets/images/tracker/settings-2.png)

The motion settings determine how the IMU (inertial measurement unit, the accelerometer) is used to determine whether to publish a location. The **Interval minimum** also applies to motion events. Movement events can occur while the device is awake, also also wake a device from sleep mode.

- **Movement** publishes if the device moves, and has several sensitivity options:

  - **Disable**: Do not use motion detection (the default).
  - **Low**: Least sensitive, large motion is required to publish.
  - **Medium**
  - **High**: Most sensitive, even a small amount of motion will trigger publish.

- **High G** publishes if there is a High-G acceleration event, such as the device falling. This is 4g for at least 2.5ms.

  - **Disable**: High-G events are not generated (the default).
  - **Enable**: High-G events are generated.

{{!-- BEGIN do not edit content below, it is automatically generated 36859bbf-9198-4f15-bf70-cd7471c84827 --}}


##### Movement Sensitivity configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/imu_trig/properties/motion</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Movement Sensitivity</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If not disabled, device will publish location if it detects movement. Low sensitivity requires a large motion to publish.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">disable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">disable,<br>low,<br>medium,<br>high</td></tr>
</tbody>
</table>

##### High-G configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/imu_trig/properties/accel</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High-G</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will publish location if it detects a High-G acceleration event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">disable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">disable,<br>enable</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}

### RGB LED Settings

![RGB LED Settings](/assets/images/tracker/settings-4.png)

The Tracker Firmware configures the RGB status LED. 

The **Type** popup menu has the following options:

- **off**: The RGB LED is turned off (dark).
- **tracker**: Color indicates signal strength (yellow = lower signal strength, green = higher signal strength). Fast breathing red while connecting to cellular.
- **particle**: Use standard Particle colors like breathing cyan instead of tracker-style colors. Default for Tracker SoM Evaluation Board.

{{!-- BEGIN do not edit content below, it is automatically generated da5553f8-b134-484e-9b04-64aa241b66dd --}}


##### Type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/rgb/properties/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Can control the LED to be off, default Particle RGB behavior or custom tracker behavior.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">particle</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">off,<br>particle,<br>tracker</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}

#### Sleep settings

![Sleep Settings](/assets/images/tracker/settings-5.png)

Sleep mode allows the device to enter a low-power state when idle, conserving battery power. Sleep requires Tracker Edge v10 and Device OS 2.0.0-rc.3 or later. There are additional details in the [Tracker Sleep](/reference/tracker/tracker-sleep/) page.

**Sleep Mode** can be set to **enable** or **disable**. 

**Post Publish Execution Time** is the minimum duration in seconds to stay awake after publishing before going to sleep. The default is 10 seconds. This provides enough time to make sure a software update can be started when waking up from sleep.

**Maximum Connecting Time** is the maximum duration, in seconds, to wait for being cellular-connected and to obtain a GNSS lock before publishing. If connecting takes too long, then the device will go back to sleep instead of continuously attempting to connect. The default is 90 seconds.

You can find out more in the [Tracker Sleep Tutorial](/reference/tracker/tracker-sleep/).

{{!-- BEGIN do not edit content below, it is automatically generated b7d34d6c-e7e3-4125-85bb-6965346098ed --}}


##### Sleep Mode configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/sleep/properties/mode</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sleep Mode</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will operate with low power states during inactive periods.  The device will be inaccessible while in low power states</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">disable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">disable,<br>enable</td></tr>
</tbody>
</table>

##### Post Publish Execution Time configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/sleep/properties/exe_min</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Post Publish Execution Time</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Minimum duration, in seconds, of guaranteed execution time after publishing and before entering sleep.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

##### Maximum Connecting Time configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/sleep/properties/conn_max</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Maximum Connecting Time</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Maximum duration, in seconds, to wait for a cellular connected state and GNSS lock before publish.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">90</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">120</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}





#### Device monitoring

![Device Monitoring](/assets/images/tracker/device-monitoring.png)

Device Monitoring publishes additional metrics and also fault (crash log) information. This can help troubleshoot problems, however it will use additional data operations.

See the [Memfault Integration](/integrations/community-integrations/memfault/) for more information.

{{!-- BEGIN do not edit content below, it is automatically generated 77fd453b-6ad4-4a69-adae-a7f31118c4ca --}}


##### Device Monitoring configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/monitoring/device_monitor</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Device Monitoring</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will publish metrics and fault details.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


#### Temperature trigger
{{!-- BEGIN do not edit content below, it is automatically generated 62c6ee9b-ac47-4a85-aeae-075c62511901 --}}


##### High temperature threshold (Celsius) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/high</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High temperature threshold (Celsius)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish location once if temperature is greater than or equal to threshold. The temperature will be required to be less than the high threshold minus hysteresis to clear event, when latching, or publish again when latching disabled.  Hysteresis must be valid.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">150</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">65</td></tr>
</tbody>
</table>

##### High temperature monitoring configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High temperature monitoring</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, compare current temperature against high threshold.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### High temperature event latching. configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/high_latch</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">High temperature event latching.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Enable latching of high temperature trigger event until temperature has fallen below hysteresis level; otherwise, generate one high temperature event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Low temperature threshold (Celsius) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/low</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Low temperature threshold (Celsius)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish location once if temperature is less than or equal to threshold. The temperature will be required to be more than the low threshold plus hysteresis to clear event, when latching, or publish again when latching disabled. Hysteresis must be valid.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">-40</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

##### Low temperature monitoring. configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Low temperature monitoring.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, compare current temperature against low threshold.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Low temperature event latching. configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/low_latch</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Low temperature event latching.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Enable latching of low temperature trigger event until temperature has risen above hysteresis level; otherwise, generate one low temperature event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Hysteresis temperature threshold (Celsius) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/temp_trig/hyst</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Hysteresis temperature threshold (Celsius)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis threshold applied to high and low thresholds to allow further temperature publishes. 0.0 for unused.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


### Tracker settings

{{!-- BEGIN do not edit content below, it is automatically generated 77fd453b-6ad4-4a69-adae-a7f31118c4ca --}}


##### Device Monitoring configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/monitoring/device_monitor</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Device Monitoring</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, device will publish metrics and fault details.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


{{!-- The following catches any new schema elements --}}

{{!-- BEGIN do not edit content below, it is automatically generated 'a0a2120c-78c7-4d51-84af-062f116d70be' --}}

 

{{!-- END do not edit content above, it is automatically generated --}}



### Device settings

Geofence settings are only configurable per-device, not in the fleet settings.

Normally, for other settings, you will use the product settings across your fleet of Tracker devices. If you mark a device as a Development Device, you can change settings on a per-device basis within the Device Configuration.

![Per-Device Settings](/assets/images/tracker/per-device.png)


#### Geofence settings

{{imageOverlay src="/assets/images/tracker/geofence-settings.png" alt="Geofence Settings" }}


**Wake interval** configures how often to wake to check whether the device is inside or outside of the geofence. If no notification is required, and the Minimum location update frequency has not been met yet, then the device may go back to sleep quickly without having to connect to cellular. If zero, the geofence will only be checked when otherwise waking from sleep. If you are not using sleep modes, the wake interval is ignored.

There are up to four notification zones, each of which can have their own settings.

**Enable** turns on or off a zone, allowing it to be easily disabled.

**Shape** sets the shape. Only one shape, Circular, is supported at this time.

**Latitude (Degrees)** is the latitude of the center of the circle. This must be a decimal number (not hours, minutes, seconds), -90.0 to 90.0.

**Longitude (Degrees)** is the latitude of the center of the circle. This must be a decimal number (not hours, minutes, seconds), -180.0 to 180.0.

**Radius (Meters)** is the radius of the circle in meters (decimal).

**Publish inside zone** publishes when inside the circle, limited by the Maximum location update frequency. 

**Publish outside zone** publishes when outside the circle, limited by the Maximum location update frequency. 

**Publish on enter zone** publishes when the device moves into the circle.

**Publish on exit zone** publishes when the device moves out of the circle.

**Time Before Trigger** requires that the device be inside or outside of the zone for this many seconds before notification. This can help reduce false alarms when the device may be near the edge of the zone. 0 means notify immediately without waiting. This is an integer.

The publish on inside, outside, enter, and exit affect the `trig` array in the location event. The following values may be present in the `trig` array for geofence events. Multiple items may be present:

- `outside1` The device is currently outside of geofence zone 1 (and outside trigger is enabled)
- `inside1` The device is currently inside of geofence zone 1 (and inside trigger is enabled)
- `enter1` The device has entered geofence zone 1 (and enter trigger is enabled)
- `exit1` The device has exited geofence zone 1 (and exit trigger is enabled)
- `outside2`, `inside2`, `enter2`, and `exit2`
- `outside3`, `inside3`, `enter3`, and `exit3`


{{!-- BEGIN do not edit content below, it is automatically generated b1bb1d44-9b07-4237-ad3c-1050a7125619 --}}


##### Wake interval (every n seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Wake interval (every n seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If device is configured for sleep, periodic interval to wake in order to evaluate geofences.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">900</td></tr>
</tbody>
</table>

##### Zone 1 configuration

Configuration for Zone 1 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone1/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Zone 2 configuration

Configuration for Zone 2 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone2/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Zone 3 configuration

Configuration for Zone 3 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone3/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Zone 4 configuration

Configuration for Zone 1 settings.

###### Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, the zone will be evaluated by the device.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Shape configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/shape_type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shape</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shape of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">circular</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">circular</td></tr>
</tbody>
</table>

###### Latitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/lat</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Latitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Latitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

###### Longitude (Degrees) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/lon</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Longitude (Degrees)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Longitudinal coordinate for the center point of the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">121</td></tr>
</tbody>
</table>

###### Radius (Meters) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/radius</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Radius (Meters)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines circular area covered by the geofence.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1000</td></tr>
</tbody>
</table>

###### Publish inside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/inside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish inside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is inside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish outside zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/outside</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish outside zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device is outside the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on enter zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/enter</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on enter zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has entered the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Publish on exit zone configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/exit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish on exit zone</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish event when the device has exited the zone.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Time Before Trigger (Seconds) configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/geofence/zone4/verif</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Time Before Trigger (Seconds)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Amount of time the device is inside or outside the zone before triggering an event.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}



### Typical settings

Typical settings in common scenarios:

**Vehicle (detailed information)**

  - Radius Trigger: 151 meters (500 feet)
  - Maximum location update frequency: 30 seconds
  - Minimum location update frequency: 900 seconds (15 minutes)
  - Sleep: disabled

  This will get detailed location information, but limits the data to at most once every 30 seconds. If the vehicle is moving 24 hours a day you will exceed your 25 MB data quota, but as long as it's in movement less than half of the time you'll be within the limit. The minimum location update frequency assures that events will be published periodically when stationary, so the cellular signal and battery strength will be known.

**Vehicle (less detail)**

  - Radius Trigger: 1600 meters (1 mile)
  - Maximum location update frequency: 300 seconds (5 minutes)
  - Minimum location update frequency: 900 seconds (15 minutes)
  - Sleep: disabled

  This will provide an approximate location while using less data, for example if you are looking for the general area of the vehicle. The minimum location update frequency assures that events will be published periodically when stationary, so the cellular signal and battery strength will be known.

**Tracking an item for location and theft prevention with external power**

  - Movement: Medium
  - Maximum location update frequency: 30 seconds
  - Minimum location update frequency: 3600 seconds (1 hour)
  - Sleep: disabled
  
  If the item is moving, the location will be published every 30 seconds. This should not be used if the item will be in movement 24 hours a day, as you will exceed the 25 MB data limit. However, if it's typically not moving this will be fine. It also updates the location information every hour even when not moving.

**Tracking an item - battery only**

  - Movement: Medium
  - Maximum location update frequency: 900 seconds (15 minutes)
  - Minimum location update frequency: 28800 seconds (8 hours)
  - Sleep: enabled
  
  If the item is moving, the location will be published every 15 minutes, otherwise the device will be in sleep mode to conserve battery power. It will also update location every 8 hours even when not moving. More sleep-related examples can be found in the [Tracker Sleep Tutorial](/reference/tracker/tracker-sleep/#common-scenarios).

**Periodically sending information**

  - Maximum location update frequency: 120 seconds (2 minutes)
  - Minimum location update frequency: 120 seconds (2 minutes)
  - Sleep: disabled

  If you have additional sensors that you are monitoring, and you want to continuously send samples at set time intervals, just set the maximum.


### Data usage

A location publish uses one data operation to send the location data to the Particle cloud. If you subscribe to enhanced location events on the device, an additional data operation will be used.

You can estimate the number of data operations you will consume using this calculator. For more information on the free plan, basic plan, blocks, and data operations, see [Pricing Plans](/getting-started/cloud/introduction/#pricing).

{{> dataoperationscalc}}

{{collapse op="start" label="More information"}}

**With Location Fusion**

With Location Fusion (enhanced location) enabled, it's difficult to determine the data size, because it will be dependent on how many cellular and Wi-Fi networks are visible at your location. At the low end it's close to the size with Location Fusion disabled, at the high end it can be near 1024 bytes of payload, plus the additional overhead below.

**Without Location Fusion**

The location publish will vary in size depending on the trigger reason(s) and other factors, but this is a rough guideline.

This is a typical location publish you can see in the console. It is 209 bytes. 

```json
{"cmd":"loc","time":1596043291,"loc":{"lck":1,"time":1596043291,"lat":42.46973211,"lon":-75.06480125,"alt":322.294,"hd":214.60,"h_acc":10.000,"v_acc":16.000,"cell":40.2,"batt":99.6},"trig":["time"],"req_id":3}
```

The actual overhead is:

- 209 Location publish payload
-  40 Location publish overhead
- 231 Event confirmation and other acknowledgements

For the purposes of our calculations and to leave a bit of room for other data fields that might be present we'll assume 500 bytes per location publish.

If you're adding custom data to the publish, measure the size of your total payload as viewed in the console, then add 271 bytes (40 + 231) to see how much data your larger publish will use.

For time trigger, here are some general guidelines. These are just location publishes and do not include overhead such as connecting to the cloud, firmware updates, etc..

| Time Interval | Data Usage Per Month |
| :------------ | :------------------- |
| 1 minute      |   20 MB |
| 5 minute      |    4 MB |
| 1 hour        |  351 KB |
| 1 day         |   15 KB |

(Assumes 30 days in a month on average.)

{{collapse op="end"}}


### View device

#### Using the cmd box

When viewing a device in the console, in the functions and variables area on the right, is the **cmd** box.

<div align=center><img src="/assets/images/tracker/tracker-enter-shipping.png" class="small"></div>

Some commands you can enter into the box:

{{!-- BEGIN shared-blurb d529b260-c0c2-481a-ac2b-87680b9cf2d8 --}} 
| Command | Purpose |
| :------ | :--- |
| `{"cmd":"enter_shipping"}` | Enter shipping mode |
| `{"cmd":"get_loc"}` | Gets the location now (regardless of settings) |
| `{"cmd":"reset"}` | Gracefully reset the device |
| `{"cmd":"get_cfg"}` |  Get all configuration objects in the device |
| `{"cmd":"reset_to_factory"}` | Perform a factory reset for configuration |
{{!-- END shared-blurb --}}

Shipping mode powers off the device by disconnecting the battery. This allows a Tracker One to be shipped in a way that the battery does not discharge without having to open the case and disconnect the battery. Note that you can only get out of shipping mode by connecting the device to USB power or power by the M8 connector. It works on the Tracker SoM evaluation board, but is less useful there since it has physical power switches.

It's also possible to [create custom `cmd` handlers](/firmware/tracker-edge/tracker-edge-api-reference/#registercommand-cloudservice). These can be used instead of creating a custom Particle function handler and make it possible to add more than 12 handlers and automatically decode JSON arguments to the cmd handler.

On a successful cmd request, the result is 0. A result of -22 indicates the JSON is invalid. 

**Warning:** Particle has discovered an issue with GPIO current leakage through Tracker One's M8 connector that affects Tracker One v1.0 devices manufactured prior to August 31, 2020 and can adversely affect the use of shipping mode for devices that use the M8 connection to an external peripheral device. For more information see [TAN002 - Tracker One v1.0 Shipping Mode](/reference/technical-advisory-notices/tan002-tracker-one-v10-shipping-mode/).

## Monitor One Settings

Tracker One and Monitor One devices share the same platform ID, and by default new products default to being Tracker One products.

To enable the Monitor One features, use this control to change the product schema to Monitor One and add the additional tabs shown below,
use the [configuration schema tool](/tools/cloud-tools/configuration-schema/).

### Settings shared with the tracker

The following settings, shown above, are the same for the Tracker One and Monitor One:

- [Location settings](#location-settings)
- [Store and forward settings](#store-and-forward)
- [Motion settings](#motion-settings)
- [RGB LED settings](#rgb-led-settings)
- [Sleep settings](#sleep-settings)
- [Device monitoring settings](/#device-monitoring)
- [Geofence settings](/#geofence-settings)
                      

### I/O card config

These settings are for the I/O Card configuration. 

{{imageOverlay src="/assets/images/tracker/io-config-1.png" alt="I/O card settings" }}

{{!-- BEGIN do not edit content below, it is automatically generated 'cef0011b-49a1-4992-ab61-ee8eea74abc2' --}}


##### 0-10V Voltage Input configuration

Configuration for 0-10V scaling.

###### Sensor low scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/sensorlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor low scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated voltage inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

###### Sensor high scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/sensorhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor high scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated voltage inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Sensor filter cutoff frequency configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/sensorfc</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor filter cutoff frequency</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Frequency for 3db low pass filtering of the voltage input in Hertz.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">12</td></tr>
</tbody>
</table>

###### Threshold low comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/threshlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/hystlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/th_low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the lower threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold high comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/threshhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/hysthigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/th_high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the upper threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### 4-20mA Current Input configuration

Configuration for 4-20mA scaling.

###### Sensor low scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/sensorlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor low scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated current inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.004</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

###### Sensor high scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/sensorhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor high scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated current inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.02</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

###### Sensor filter cutoff frequency configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/sensorfc</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor filter cutoff frequency</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Frequency for 3db low pass filtering of the current input in Hertz.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">12</td></tr>
</tbody>
</table>

###### Threshold low comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/threshlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.008</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hystlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.002</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the lower threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold high comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/threshhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.016</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hysthigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.002</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the upper threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold low fault comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_low</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low fault comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.003875</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low fault hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hyst_fault_low</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low fault hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.000125</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low fault enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low fault enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the lower threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold high fault comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_high</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high fault comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.016</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high fault hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hyst_fault_high</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high fault hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.002</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high fault enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high fault enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the upper threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### 24V Digital Input configuration

Configuration for optoisolated digial input.

###### Publish immediately on input change configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/input/immediate</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish immediately on input change</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the digital input changes.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Edge detection configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/input/edge</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Edge detection</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish on input change based on edge detected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">none</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">none,<br>rising,<br>falling,<br>both</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


### I/O card calibration

{{imageOverlay src="/assets/images/tracker/io-calibration-config.png" alt="I/O card calibration settings" }}

{{!-- BEGIN do not edit content below, it is automatically generated '23d4ca8b-c845-4939-bf6b-e259dc45af27' --}}


##### 0-10V Voltage Input configuration

Configuration for 0-10V calibration.

###### Calibration gain configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/voltage/calgain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration gain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Gain applied to raw voltage inputs to correct gain errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.95</td></tr>
</tbody>
</table>

###### Calibration offset configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/voltage/caloffset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to raw voltage inputs to correct offset errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">-0.01</td></tr>
</tbody>
</table>

##### 4-20mA Current Input configuration

Configuration for 4-20mA calibration.

###### Calibration gain configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/current/calgain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration gain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Gain applied to raw current inputs to correct gain errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.95</td></tr>
</tbody>
</table>

###### Calibration offset configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/current/caloffset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to raw current inputs to correct offset errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">-0.01</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


### Modbus

The following settings, available in Monitor Edge v2, are for the Modbus (RS485) support on the Monitor One I/O card.

{{!-- BEGIN do not edit content below, it is automatically generated 'c7548071-4421-40b6-b229-bf8e51e625cc' --}}


##### RS-485 Baud configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus_rs485/baud</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">RS-485 Baud</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Baud rate to operate the RS-485 bus.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">38400</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">1200,<br>2400,<br>4800,<br>9600,<br>19200,<br>28800,<br>38400,<br>57600,<br>76800,<br>115200</td></tr>
</tbody>
</table>

##### RS-485 Parity Bits configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus_rs485/parity</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">RS-485 Parity Bits</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Specifies partiy type used for the RS-485 bus.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">none</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">none,<br>even</td></tr>
</tbody>
</table>

##### Modbus Inter Message Delay configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus_rs485/imd</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Inter Message Delay</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Delay between the last Modbus response and the next transmission in milliseconds.  This is used for rate limiting transactions.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0</td></tr>
</tbody>
</table>

##### Modbus Server Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, poll the given Modbus server address.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Modbus Server ID configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/id</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server ID</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">The remote device server ID (also known as slave ID). Range: 1-255.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Modbus Timeout configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Allowable time to wait for a response in milliseconds. Range: 0-10000.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2000</td></tr>
</tbody>
</table>

##### Polling Interval configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/poll</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Polling Interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines the frequency (in seconds) in which the register will be polled and results published.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Publish polled value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish polled value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Select when to publish the polled value.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">always</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">always</td></tr>
</tbody>
</table>

##### Modbus Function configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of read function.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">coil</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">coil,<br>discrete_input,<br>input_register,<br>holding_register</td></tr>
</tbody>
</table>

##### Register Address configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Register Address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Address to read from, zero based. Range: 0-65535.</td></tr>
</tbody>
</table>

##### Modbus data type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus data type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of data being read.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">uint16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">int16,<br>uint16,<br>int32,<br>uint32,<br>float32_abcd,<br>float32_badc,<br>float32_cdab,<br>float32_dcba,<br>bits</td></tr>
</tbody>
</table>

##### Mask Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/mask</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Mask Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">65535</td></tr>
</tbody>
</table>

##### Shift Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/shift</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shift Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.</td></tr>
</tbody>
</table>

##### Offset Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Offset Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.5</td></tr>
</tbody>
</table>

##### Scaling Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/scale</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Scaling Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

##### Modbus Server Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, poll the given Modbus server address.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Modbus Server ID configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/id</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server ID</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">The remote device server ID (also known as slave ID). Range: 1-255.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Modbus Timeout configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Allowable time to wait for a response in milliseconds. Range: 0-10000.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2000</td></tr>
</tbody>
</table>

##### Polling Interval configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/poll</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Polling Interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines the frequency (in seconds) in which the register will be polled and results published.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Publish polled value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish polled value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Select when to publish the polled value.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">always</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">always</td></tr>
</tbody>
</table>

##### Modbus Function configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of read function.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">coil</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">coil,<br>discrete_input,<br>input_register,<br>holding_register</td></tr>
</tbody>
</table>

##### Register Address configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Register Address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Address to read from, zero based. Range: 0-65535.</td></tr>
</tbody>
</table>

##### Modbus data type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus data type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of data being read.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">uint16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">int16,<br>uint16,<br>int32,<br>uint32,<br>float32_abcd,<br>float32_badc,<br>float32_cdab,<br>float32_dcba,<br>bits</td></tr>
</tbody>
</table>

##### Mask Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/mask</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Mask Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">65535</td></tr>
</tbody>
</table>

##### Shift Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/shift</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shift Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.</td></tr>
</tbody>
</table>

##### Offset Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Offset Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.5</td></tr>
</tbody>
</table>

##### Scaling Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/scale</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Scaling Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

##### Modbus Server Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, poll the given Modbus server address.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Modbus Server ID configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/id</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server ID</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">The remote device server ID (also known as slave ID). Range: 1-255.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Modbus Timeout configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Allowable time to wait for a response in milliseconds. Range: 0-10000.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2000</td></tr>
</tbody>
</table>

##### Polling Interval configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/poll</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Polling Interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines the frequency (in seconds) in which the register will be polled and results published.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Publish polled value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish polled value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Select when to publish the polled value.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">always</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">always</td></tr>
</tbody>
</table>

##### Modbus Function configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of read function.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">coil</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">coil,<br>discrete_input,<br>input_register,<br>holding_register</td></tr>
</tbody>
</table>

##### Register Address configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Register Address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Address to read from, zero based. Range: 0-65535.</td></tr>
</tbody>
</table>

##### Modbus data type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus data type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of data being read.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">uint16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">int16,<br>uint16,<br>int32,<br>uint32,<br>float32_abcd,<br>float32_badc,<br>float32_cdab,<br>float32_dcba,<br>bits</td></tr>
</tbody>
</table>

##### Mask Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/mask</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Mask Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">65535</td></tr>
</tbody>
</table>

##### Shift Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/shift</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shift Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.</td></tr>
</tbody>
</table>

##### Offset Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Offset Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.5</td></tr>
</tbody>
</table>

##### Scaling Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/scale</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Scaling Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


{{!-- New settings from the schema go here --}}
{{!-- BEGIN do not edit content below, it is automatically generated '40b06c67-b4eb-4be9-b9c2-539ac2f68dbd' --}}

 

{{!-- END do not edit content above, it is automatically generated --}}


## Devices and SIM cards

There are multiple lists of devices and SIM card lists, and this section describes which one is which.

### Devices - sandbox

The devices list includes devices that are claimed to your account, that you are the owner of, in your free developer sandbox. These devices count against your free plan limit of 100 devices.

It also includes devices that are claimed to your account, that are part of a product (free, basic, or enterprise). Devices that are claimed to your account but are part of product do not count toward your free device limit.

The exception is free plan products owned by you, in which case all devices, whether claimed by you or not, count toward the 100 device limit. Only devices claimed by you show up in this list; the others are only in the product device list but still count toward the limit.

In the developer sandbox, non-product, there is no add devices button. The intended paths to add a device are:

- Using the [Particle CLI](/getting-started/developer-tools/cli/)
- Using [setup.particle.io](https://setup.particle.io) 

![Devices - sandbox](/assets/images/console/sandbox-devices2.png)

- **Sandbox** is selected in the upper left (1).
- The **Devices** icon is selected in the left navigation bar (2).

### SIM cards - sandbox

Cellular devices with Particle SIM cards, either built-in (MFF2) or plastic nano SIM cards (4FF) show up in this list. 

In the developer sandbox, non-product, there is no import button. The intended paths to activate a SIM card are:

- From [setup.particle.io](https://setup.particle.io) where you can set up a cellular device with a SIM card, or activate just the SIM card

![SIM cards - sandbox](/assets/images/console/sandbox-sims.png)

- **Sandbox** is selected in the upper left (1).
- The **SIM cards** icon is selected in the left navigation bar (2).

### Products - sandbox

The products list in the sandbox shows:

- Free plan products that you are the owner of
- Free plan products that you are a team member of

You can tell by the email address under the product description as this is the owner of the product (3). If you are the owner, all devices in that product count toward your 100 device limit.

![Products - sandbox](/assets/images/console/sandbox-products.png)

- **Sandbox** is selected in the upper left (1).
- The **Products** icon is selected in the left navigation bar (2).

### Products devices - sandbox

This list shows all devices that are included in a product, regardless of claiming. 

![Product devices - sandbox](/assets/images/console/sandbox-product-devices.png)

- **Sandbox** is selected in the upper left (1).
- The **Products** icon is selected, then a product. The current product is shown at the top (2).
- The **Devices** icon is selected in the left navigation bar (3). Make sure you select the Devices icon inside the product, not the one at the top level of the console!

If you click the **...** button on the right side of the product device list, there are three options:

- **Mark as development device** 
- **Unclaim device**
- **Remove device**


**Add Devices** allows a single device ID, or a file of device IDs, to be added to a product. Within the free sandbox, there is a limit of 100 devices. This is across all device types, and is further reduced by the non-product devices claimed by the product owner.

If you wish to both unclaim and remove a device, always select **Unclaim device** first. If you remove the device from the product, it will no longer appear in the list.

The [List Devices Tool](/tools/cloud-tools/list-devices) can be used to export a list of devices to a spreadsheet.

The [Device Remove Tool](/tools/cloud-tools/device-remove/) can be used to simplify the process of removing multiple devices.

### Products SIM cards - sandbox

Cellular devices with Particle SIM cards, either built-in (MFF2) or plastic nano SIM cards (4FF), show up in this list. The cellular usage by these SIM cards count against the cellular data limit for the user account that owns the product.

If the 100 MB per month limit is exceeded for the free sandbox account, the account is paused until the next billing cycle.

![Product SIMs - sandbox](/assets/images/console/sandbox-product-sims.png)

- **Sandbox** is selected in the upper left (1).
- The **Products** icon is selected, then a product. The current product is shown at the top (2).
- The **SIM cards** icon is selected in the left navigation bar (3). Make sure you select the SIM cards icon inside the product, not the one at the top level of the console!

**Import SIM cards** adds a SIM to the product. This is normally only necessary if you have an Electron 2G/3G with a 4FF plastic nano SIM card. For all devices with a built-in MFF2 SMD SIM card, if you add the device to the product, its matching SIM card is automatically added as well.


### Products - organization

The products list in the organization shows all products in the organization you have selected. The Organization Team configuration determines what access you have (Administrator, Developer, View-Only, etc.) for all products in the organization. 

It is also possible to invite team members to the product who are not part of the organization. For example, if you hire a outside contractor to work on a specific project you could grant developer access to only that product, not the whole organization.

Organizations are used for both basic and enterprise plans. An organization is a collection of products, shared team access controls, and shared billing that span across all products. This makes it much easier to manage multiple products. Every member of an organization also has a free sandbox associated with their account.

![Products - organization](/assets/images/console/org-products.png)


### Products devices - organization

This list shows all devices that are included in a product, regardless of claiming. 

![Product devices - organization](/assets/images/console/org-product-devices.png)

- An organization is selected in the upper left (1). 
- The **Products** icon is selected, then a product. The current product is shown at the top (2).
- The **Devices** icon is selected in the left navigation bar (3). Make sure you select the Devices icon inside the product, not the one at the top level of the console!

**Add Devices** allows a single device ID, or a file of device IDs, to be added to a product. 


### Products SIM cards - organization

Cellular devices with Particle SIM cards, either built-in (MFF2) or plastic nano SIM cards (4FF), show up in this list. The cellular usage by these SIM cards count against the cellular data limit for the organization that owns the product.

In the basic plan, for each class of class device (cellular or tracker), there is a pool of data based on the number of blocks. If you exceed this pool of cellular data, a new block is added to the organization.

![Product SIMs - organization](/assets/images/console/org-product-sims.png)

- An organization is selected in the upper left (1). 
- The **Products** icon is selected, then a product. The current product is shown at the top (2).
- The **SIM cards** icon is selected in the left navigation bar (3). Make sure you select the SIM cards icon inside the product, not the one at the top level of the console!
