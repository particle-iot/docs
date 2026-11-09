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

## Demo

You can explore a live demo environment with a continuously operating device fleet, no hardware or setup required!

Visit the [demo site](https://www.particle.io/demo/) for instant access.


## Welcome page

The console welcome page provides easy access to developer, product, and organization features.

{{imageOverlay src="/assets/images/console/welcome.png" class="no-darken"}}

The **Sandbox** popup in the upper left corner switches between your personal view ("Sandbox") and being able to see the devices and products in your organization, if your account is part of an organization.

## Sandbox

### Search - sandbox

The search box makes it easy to search for a device from its Device ID (24-character hex code), serial number, name, or ICCID. You can also search for a product by name.

This can be done at the top level of your sandbox to search your sandbox and all organizations you have access to. There is also a search at the top level of each organization to search only that organization.

{{imageOverlay src="/assets/images/console/console-search.png" class="no-darken"}}

### Left navigation - sandbox

Hovering over the left side of the window expands the left navigation, providing access to all of the console features.

{{imageOverlay src="/assets/images/console/left-nav.png" class="no-darken"}}

### Products - sandbox

The **Products** page shows the products that you own and also the products you have been granted access to as a team member.

If you are part of an organization, there may be additional products that you have access to by navigating into the organization first using the **Sandbox** popup menu in the upper left corner of the window.

{{imageOverlay src="/assets/images/console/products.png" class="no-darken"}}

### Devices - sandbox

The device list shows the devices associated with your account. Note that there are multiple device lists, one for your sandbox, and one in each product that you have access to. 

Clicking on **My Devices** in the left-hand navigation bar brings up the sandbox device list.

{{imageOverlay src="/assets/images/console/device-list.png" class="no-darken"}}

If the **Show sandbox devices only** checkbox is not checked, then the list will only show devices that are claimed to your account, both in your free developer sandbox as well as product devices in free, basic, and enterprise organization products. 

When checked, the list will only include non-product devices claimed to your account in the free developer sandbox.

- **Total personal devices** is the number of non-product devices in your free developer sandbox.
- **Total claimed product devices** is the total number of devices claimed to your account that are in a product.

The 100-device limit in the free plan is the total of the devices claimed to your account in the developer sandbox, plus all devices in any free plan products that you are the owner of. 

You can also take certain actions on devices from this view, such as
renaming the device and unclaiming it from your account.

Unclaiming a cellular device removes it from your account, but does not stop billing. As the claiming status and SIM are separate, you must also pause or release ownership of your SIM to stop billing. You must also release SIM cards for cellular devices to stop billing.

In this example, clicking the checkbox results in no devices, because every device in this part of a product.

{{imageOverlay src="/assets/images/console/device-list-sandbox-only.png" class="no-darken"}}


The product device list will be discussed in more detail below, but this is what it looks like in this account:

{{imageOverlay src="/assets/images/console/device-list-product.png" class="no-darken"}}

The product device list has a number of columns that are not present in the sandbox device list:

- Firmware - Fleet-wide firmware releases only apply to products. While you can flash sandbox devices OTA, there isn't a release number associated with it.
- Device OS - The Device OS version reporting is related to the fleet-wide firmware release process.
- Owner - All sandbox devices are owned by you, the user logged into the account the sandbox is being viewer for.
- Billing status - All sandbox devices count toward the 100-device billing limit.
- Groups - Groups are only available in products.

### SIM cards - sandbox

If you have cellular devices, you may have SIM cards listed in the **SIM cards** panel.

{{imageOverlay src="/assets/images/console/sim-cards.png" class="no-darken"}}

In most cases, however, your devices will be associated with a product, in which case the SIM cards are in the product SIM card view, instead.

{{imageOverlay src="/assets/images/console/sim-cards-product.png" class="no-darken"}}

When you set up a device at [https://setup.particle.io/](https://setup.particle.io/) it is set up as a product device, and Particle recommends making every device part of a product, even if it's a product of one device. There is no limit to the number of products you can have, even in the free tier.

It is unusual to have to use the **Import SIM card** option as adding a device to a product will also add its associated SIM card. 

{{!-- BEGIN shared-blurb 7f993d02-ecbb-4166-bb05-eafb285fd46b --}}
If you click the **...** button to the right of a SIM card you will be presented with two options:

- **Deactivate SIM** deactivates a SIM card with the mobile carrier so it will no longer be able to connect
- **Release SIM** releases a SIM card so it will no longer be able to connect, and can be transferred to another user

Deactivated SIM behavior also varies based on your billing plan:

- Free plan: still counts toward the 100 device limit
- Basic plan: still counts toward the 100 device per block limit
- Enterprise plans: may stop counting the device as a billable device in some cases

{{imageOverlay src="/assets/images/console/sim-card-deactivate-release.png" class="no-darken"}}
{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 71e05c82-b8a6-476f-a69f-a57477aaa43e --}}
To remove a device so it is no longer counted against your free plan 100 device limit, or against the basic plan 100 device per block limit, you must both remove the device from its product and release its SIM card.

- Unclaim (for claimed devices)
- Remove from product (for product devices)
- Release SIM (for cellular devices)
{{!-- END shared-blurb --}}

If you have a Boron device and have enabled using an external 3rd-party SIM card with a plastic 4FF nano SIM card, you will manage the SIM from the SIM provider or mobile carrier's web site, not from the Particle console.

### Logic - sandbox

{{!-- BEGIN shared-blurb 75dc780e-171e-44a5-babe-7042c2fb8cfe --}}
Logic Functions are bits of Javascript code that get called in response to a Logic Trigger, which can be:

- A Particle event, generated by a device, Particle cloud API, or webhook response
- A scheduled, periodic time event ("cron")

Logic Functions run in the cloud and are designed to perform short-running calculations such as:

- Generation of new event (which might be subscribed to by a device, or trigger an integration)
- Storing data in the Ledger database
{{!-- END shared-blurb --}}

In many cases, you will want to access Logic from within a product. Those logic blocks are specific to that product.

For more information, see [Logic](/getting-started/logic-ledger/logic/).

### Ledgers - sandbox

{{!-- BEGIN shared-blurb 21e80dea-8a96-469c-8f9d-86211332beeb --}}
Ledger allows data to be stored in the cloud, per-device, per-product, or per owner account. 

The three types of Ledgers are:

| Scope | Description |
| :--- | :--- |
| Cloud Ledger | Stores information in the cloud without syncing to the edge. |
| Device to Cloud Ledger | Device storage that syncs automatically to the cloud |
| Cloud to Device Ledger | Set data in the cloud that will sync to devices |

Each ledger is a block of JSON data, up to 16 Kbytes in length. You can define the data format yourself, and it does not need to be pre-defined (no schema required). It can contain simple values (string, number, boolean) as well as nested objects and arrays. JSON does not support binary data, but you can store small binary data by encoding it, such as as hex, Base64, or Base85 encoding.

Device to Cloud and Cloud to Device ledgers require Device OS 6.1.0 or later. They can be up to 16 KBytes in size. 

Cloud only ledgers (not synchronized to a device) can be up to 1 Mbyte (1024 Kbyte).
{{!-- END shared-blurb --}}

In many cases, you will want to access Ledger within a product. Those ledgers are specific to that product.

For more information, see [Ledger](/getting-started/logic-ledger/ledger/).

### Integrations - sandbox

Integrations (webhooks) allow interaction with external services. 

{{imageOverlay src="/assets/images/console/integration-gallery.png" class="no-darken"}}

In almost all cases you should create integrations in the product it is associated with, or in the organization it is part of. 

{{note op="start" type="warning"}}
Creating sandbox integrations will greatly complicate the process of moving from the free to the basic or enterprise plans later on.
{{note op="end"}}

For more information, see [Integrations](/integrations/introduction/).

### Events - sandbox

{{!-- BEGIN shared-blurb 0cd8e3ce-a3b1-4a76-94d1-ae4402d5899f --}}
Events are published by devices, Logic, as the result of an integration (webhook), or from the Particle cloud API. They provide a secure, data-efficient way to communicate information between these things. Events are temporal and disappear if not captured by something else, like an integration that could send it to a database, or Ledger. Likewise, the Events view is live, and does not show historical events. It will only show events that pass through the cloud while the panel is open.
{{!-- END shared-blurb --}}

The sandbox **Cloud services - Events** panel allows viewing of published events. It shows events that were generated by claimed devices in your account. You will typically view events in one of the other places where you can view events. Since product devices are often not claimed to your account, you may not see all events in this panel.

{{imageOverlay src="/assets/images/console/events-sandbox.png" class="no-darken"}}

There are also events tabs in each product, that show events from all product devices, whether claimed or not.

{{imageOverlay src="/assets/images/console/events-product.png" class="no-darken"}}

And also for each device, to only show events from that device. Note that the device event view does not show responses from webhooks going to that device, only events from the device.

{{imageOverlay src="/assets/images/console/events-device.png" class="no-darken"}}

#### Exporting events - sandbox

The [Event Viewer Tool](/tools/cloud-tools/events/) can be used if you want to export events to a file or spreadsheet.

### Authentication - sandbox

{{!-- BEGIN shared-blurb 9cacae49-a693-461e-a1c4-a75069ae226c --}}
The **Authentication** tab allows the creation of a new OAuth client ID.

- If you are providing access to the Particle cloud API for an external service, you should use [API users](/reference/cloud-apis/api/#api-users).
- You should avoid using the customer claiming feature and instead manage access for your customers through your own back-end service.
- You should avoid using the Particle iOS and Android device setup SDKs, which are deprecated and not compatible with current devices.
- If you do need to create an OAuth client you should do so at the product level, or organization level, not at the sandbox level.

{{imageOverlay src="/assets/images/console/new-oauth-client.png" class="no-darken"}}
{{!-- END shared-blurb --}}


### Configuration - sandbox

Configuration is a platform‑wide capability for Particle. Configuration is the control plane for tailoring how devices, cloud, and applications behave, used to solve real-life problems like modem behavior and operating system level radio configuration, as well as to align user applications needs from any vertical or use case. 

Configuration scales from organization‑wide defaults, to product‑level settings, to device‑specific overrides where appropriate. 

If you have access to an organization (basic, plus, or enterprise), you can set environment variables at the organization level in the **Organization - Configuration - Environment** section.

{{imageOverlay src="/assets/images/console/config-org.png" class="no-darken"}}

You can also set environment variables in **Sandbox - Configuration - Environment** section.

{{imageOverlay src="/assets/images/console/config-sandbox.png" class="no-darken"}}

Additionally, both sandbox and organization products have their own Environment configuration.

For more information, see:

- [Environment](/getting-started/configuration/environment/): lightweight, non‑secret name - value pairs that shape the runtime environment. They are ideal for fast, system level adjustments (endpoints, feature flags, polling intervals) without changing firmware. Available in the cloud and in the firmware.
- [Secrets](/getting-started/cloud/secrets/): secure, organization‑scoped values that integrations and logic can reference securely.

### Billing & usage - sandbox

The **Billing & Usage** page shows billing information and data usage (data operations and cellular). 

All accounts have a personal sandbox on the free plan. The sandbox can include up to 100 cellular and Wi-Fi devices (in any combination, not to exceed 100 total), free of charge. For the basic plan, this is in addition to devices included in your basic plan blocks.

{{imageOverlay src="/assets/images/console/billing-usage-sandbox.png" class="no-darken"}}

For users who are Administrators of an organization, selecting the organization then **Billing & Usage** icon shows the usage for all products within the organization.

![Organization Billing](/assets/images/console/org-view.png)

In the Basic and Enterprise plans, usage is divided by the class of devices. For example: Wi-Fi and Cellular:

![Wi-Fi and Cellular Usage](/assets/images/console/wifi-cellular-usage.png)

These panels turn yellow at 70% of your plan limits, and red when the limits have been reached.


#### Historical data - billing - sandbox

At the bottom of the Billing & Usage panel you can request a data usage report:

![](/assets/images/console/historical-data.png)

- Time Range: Past week, Past month, Past 3 months, Past year
- Data Requested: Data usage by device, Data usage by product, Metered devices snapshot, Metered devices changes, Devices in grace period

It will take several minutes to generate the data, and you will be emailed a csv file when done. 

This option is also available for organization administrators in the organization Billing & Usage panel.

### Billing limits - sandbox

You will receive warnings by email, and as a pop-up, and in the **Billing & Usage** tab in the console at 70%, 90%, and 100% of the allowable data operations. 

In the free plan, once you reach the 100% limit you have three days to switch the the Basic plan, or data will be stopped until the end of your billing month. It will automatically resume on the free plan at the beginning of the next billing month, still on the free plan, if you do not upgrade.

In the basic plan, once you reach the 100% limit an additional block will be added to your plan. Starting at the next billing month your plan will include these additional block(s) and you will be billed accordingly. There is no additional charge at the time of the overage; it occurs only on the next billing cycle.

### Upgrading to the basic plan

Following the [link from the emails](https://www.particle.io/upgradetogrowth/) or **Billing & Usage** page leads to a contact form to initiate the upgrade process. A representative will contact you by telephone to complete the upgrade process to basic plan.

When you upgrade to the basic plan, you will get an organization, which is the collection of products and accounts in your plan. The usage limits in the basic plan apply monthly across all products of the same type in your organization. Some limits vary between cellular, Wi-Fi, and tracker products. 

Additionally, all organization members still have a private sandbox in their account and can still have their own 100 free devices that do not count against your basic plan limits. 

If you already have your devices in a product, the entire product can be moved into your basic organization without affecting the customers, access tokens, or cloud API endpoints, so this should be a relatively easy transition.

## Products

Products are recommended for all situations, from single developer devices and experimentation to fleets of production devices for a commercial product. Using a product makes it possible to manage firmware updates for a fleet of devices, as well as answer key questions for commercial products like:

- _How many_ of my devices are online right now?
- _Which_ firmware version is running on each device?
- _Who_ of my customers are using their devices, and who isn't?
- _Who_ in my company has access to this fleet, and what information can they
access?

### Working with a product

You can select a product from the tiles in the **My Products** section of the console welcome page.

{{imageOverlay src="/assets/images/console/welcome.png" class="no-darken"}}

Selecting **Products** from the left navigation shows the products that you own and also the products you have been granted access to as a team member.

If you are part of an organization, there may be additional products that you have access to by navigating into the organization first using the **Sandbox** popup menu in the upper left corner of the window.

{{imageOverlay src="/assets/images/console/products.png" class="no-darken"}}

### Left navigation - product

Hovering over the left side of the window expands the left navigation, providing access to all of the console features.

{{imageOverlay src="/assets/images/console/product-left-nav.png" class="no-darken"}}

Note that this is very similar to the one at the top level of the sandbox, but only returns information about the product that you have opened.

### New product

During setup using [setup.particle.io](https://setup.particle.io/) you are typically offered the option of creating a new product. You can also create a product at any time using the **New product** button. There is no limit to the number of products in your account, even on the free plan, however there is a limit to the number of devices in the free plan.

Storage of geolocation data is truly optional. If not enabled, the product will function normally except the device location map will not display and the APIs for obtaining the device location will not return data.

{{imageOverlay src="/assets/images/console/new-product.png" class="no-darken"}}

{{!-- BEGIN shared-blurb df9f7b65-55b3-4923-80c8-f1a57a4b9d56 --}}
Each product can only contain one **platform**. In some cases, like M-SoM or Tracker, there may be different SKUs that share a platform. In some other cases, like the B-SoM, different models may have different platforms, and would need separate products.
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/console/new-product-device-type.png" class="no-darken"}}

### Devices - product

When you open a product, it will open to the **Devices** panel.

{{imageOverlay src="/assets/images/console/product-devices.png" class="no-darken"}}

Along the top you will notice:
- Product name ("Chivalrous Pink Borons")
- Product type (Boron)
- Product ID (46421)

In the device list you'll notice a number of useful fields for a device fleet.

In this example, the Name and Owner fields are none. It is normal and acceptable to have these fields be unset. Using unclaimed product devices is recommended for all products, and naming is optional. You typically only claim devices to your account (set an owner) for devices you have on your desk for active development.


#### Add devices - product

The controls along the top of the window include the **Add devices** button.

{{imageOverlay src="/assets/images/console/product-devices-add.png" class="no-darken"}}

For any product you may be developing, you likely have one or more Particle development kits (i.e. a Photon) that you have been using internally for prototyping purposes. We strongly recommend importing these devices into your Product, and using them as your *development group*.

In addition, you'll want to have a *test group* of devices to serve as the guinea pigs for new versions of product firmware. You should get into the habit of uploading a new version of firmware to your product, and flashing it to your test group to ensure your code is working as expected. This too will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

To add devices, click on the Devices icon in your product sidebar, then click on the **Add Devices** button.

{{imageOverlay src="/assets/images/console/add-devices-1.png" class="no-darken"}}

You will then have several options for what to import:

{{imageOverlay src="/assets/images/console/add-devices-2.png" class="no-darken"}}

##### Add one device - Add devices

You can add a single device by entering its Device ID, ICCID, IMEI, or Serial number. For more information about unique identifiers for devices, see [serial number management](/hardware/best-practices/serial-number/).

{{imageOverlay src="/assets/images/console/add-devices-6.png" class="no-darken"}}

##### Add many devices - Add devices

You can add multiple devices from a file in multiple formats:

- .txt file: One device per line containing the Device ID, serial number, IMEI, or ICCID.
- .csv file: One column must be named `DEVICEID` and contain the 24-character hexadecimal Device ID.

{{imageOverlay src="/assets/images/console/add-devices-4.png" class="no-darken"}}

##### Device import CSV files - Add devices

The CSV file must have a header in the first row that specifies the columns. The only required column is `DEVICEID` but bulk order may include columns such as:

- `DEVICEID` (required)
- `SKU`
- `SERIAL_NUMBER`
- `ICCID`
- `IMEI`
- `MAC_BLE`
- `PACKAGE_SN`
- `OVERPACK_SN`

You can also specify the following optional fields:

- `DEVICE_NAME` sets the device name.
- `GROUP` specifies a device group name to set for this device. This will overwrite any existing device groups for the device.


##### Add from order - Add devices

If you've ordered devices in bulk, you can add all of the devices in the order.

{{imageOverlay src="/assets/images/console/add-devices-3.png" class="no-darken"}}

If no orders can be found, this message will be displayed. Orders of "each" devices placed on the Particle store cannot be automatically imported.

{{imageOverlay src="/assets/images/console/add-devices-5.png" class="no-darken"}}


#### New group - product

The **New group popup allows you to create or delete [device groups](/getting-started/console/device-groups/).

{{imageOverlay src="/assets/images/console/device-group-new.png" class="no-darken"}}

{{imageOverlay src="/assets/images/console/device-group-delete.png" class="no-darken"}}

#### Export - product

The **Export** button downloads a CSV file of the devices in this product. It is typically saved in the Downloads folder on your computer by your web browser.

#### Device options - product

In the **Devices** list, clicking on the **...** button on the right edge provides options:

{{imageOverlay src="/assets/images/console/product-device-list-options.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 74f89cd2-5118-4233-9b9d-7f64a2322a0a --}}
#### Mark development device - product

Using **Mark development** does several things:

- Disables fleet flashing to the device. If you are doing active development and flashing your device by USB or OTA directly from Particle Workbench you need to enable Mark Development, otherwise the cloud may immediately overwrite the firmware you flashed with the product default or pinned versions.
- Enables override for all typed configuration settings for Tracker devices.
- Allows local flashing by USB for devices with device protection enabled (enterprise accounts only).

You can tell which devices have Mark development set by the tool icon to the right of the version number in the product device list.

{{imageOverlay src="/assets/images/console/product-device-development.png" class="no-darken"}}

#### Unclaim device - product

Unclaim device removes the Owner from the device. Not all product devices need owners, but if you have one set, you can remove it with this option.

#### Remove device - product

Removes a device from a product. 

In order to stop billing for cellular devices in the free or basic plan, make sure you release the SIM card, in addition to removing device. You should release the SIM first, from the SIM cards panel.

If the device has an owner set, it will go into that user's sandbox device list, and will count against their 100 device limit. In order to completely release a device, you must first unclaim device, then remove device. Do the unclaim first, because otherwise the device will disappear from this list before you can unclaim it. 
{{!-- END shared-blurb --}}


### Device details - product

Clicking on a device in the device list brings up the device details panel.

{{imageOverlay src="/assets/images/console/product-device-details.png" class="no-darken"}}

Each of the areas within this window will be discussed separately.

#### General information - device details - product

This panel shows general information about the device and its current status.

{{imageOverlay src="/assets/images/console/product-device-general.png" class="no-darken"}}

- A transition from online to offline may be delayed by 45 minutes or more. 
- A handshake can last for up to 3 days, so a device that is active and working may have a last handshake in the past.

#### Controls - device details - product

There are three buttons in the upper right corner of the window:

- **Signal** Tells the device to change the status LED to a rainbow ("nyan") pattern to help find a specific device if you have several.
- **Ping** Sends a request to the device using the Particle cloud to see if it is reachable.
- **Edit** Allows editing of some device settings, see [edit device details](#edit-device-details) below.

{{imageOverlay src="/assets/images/console/product-device-edit.png" class="no-darken"}}


#### Location - device details - product

If location storage has been enabled, this panel will show the location of the device on a small map.

{{imageOverlay src="/assets/images/console/product-device-location.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 671d4e83-3dd3-4bac-97ce-d157708f1b29 --}}
This setting is located in the **Setting** panel for the product.

{{imageOverlay src="/assets/images/console/product-settings-locations.png" class="no-darken"}}

- For non-Tracker devices the location is generally updated once per week
- Depending on the device, the location may be approximate, up to a 10,000 meter radius of uncertainty
- It may take 24 hours for a device to update its location the first time after enabling location storage

See [location](/getting-started/cloud/location/) for more information.
{{!-- END shared-blurb --}}

#### Events - device details - product

{{!-- BEGIN shared-blurb 0cd8e3ce-a3b1-4a76-94d1-ae4402d5899f --}}
Events are published by devices, Logic, as the result of an integration (webhook), or from the Particle cloud API. They provide a secure, data-efficient way to communicate information between these things. Events are temporal and disappear if not captured by something else, like an integration that could send it to a database, or Ledger. Likewise, the Events view is live, and does not show historical events. It will only show events that pass through the cloud while the panel is open.
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/console/product-device-events.png" class="no-darken"}}

When you click on an event, the details are shown in the center panel.

{{imageOverlay src="/assets/images/console/product-device-events-pretty.png" class="no-darken"}}

Clicking **Raw** shows the raw, unformatted data, which can also be copied to the clipboard.

{{imageOverlay src="/assets/images/console/product-device-events-raw.png" class="no-darken"}}


#### Vitals - device details - product

The **Vitals** panel shows device health information for a single device. You can choose the time-frame as well.

{{imageOverlay src="/assets/images/console/product-device-vitals.png" class="no-darken"}}

For more information, see [device vitals](/getting-started/console/device-vitals/).

#### SIM card - device details - product

For cellular devices, information about the SIM card and data usage is available in the **SIM card** panel.

{{imageOverlay src="/assets/images/console/product-device-sim-card.png" class="no-darken"}}

#### Environment - device details - product

The **Environment** panel shows information about environment variables that have been overridden for this device.

{{imageOverlay src="/assets/images/console/product-device-environment.png" class="no-darken"}}

For more information, see [environment](/getting-started/configuration/environment/).

#### Last vitals - device details - product

This panel shows the last device vitals information sent by the device. 

{{imageOverlay src="/assets/images/console/product-device-last-vitals.png" class="no-darken"}}

- The control to the right of **Last vitals** requests the device send new vitals information, if it's online.
- The **Download history** downloads historical vitals information for this device.

For more information, see [device vitals](/getting-started/console/device-vitals/).

#### Notes - device details - product

Notes can be used for information about the device for your own purposes. You might store:
- The specific location of the device
- The batch the device came from
- Notes about the customer

{{imageOverlay src="/assets/images/console/product-device-notes.png" class="no-darken"}}

You can set the notes using the Particle cloud API, or from the **Edit** button in the upper left corner of the window.

{{imageOverlay src="/assets/images/console/product-device-edit.png" class="no-darken"}}

#### Firmware - device details - product

This panel shows the status of OTA firmware updates for this device.

See [OTA firmware updates](/getting-started/cloud/ota-updates/) for more information.

{{imageOverlay src="/assets/images/console/product-device-firmware.png" class="no-darken"}}

#### Functions - device details - product

This panel shows functions defined in the device firmware using [Particle.function](/reference/device-os/api/cloud-functions/particle-function/).

Tracker devices have a **cmd** function for controlling the device remotely. While non-Tracker devices do not include this function, you can implement a similar feature in your own firmware easily.

{{imageOverlay src="/assets/images/console/product-device-functions-tracker.png" class="no-darken"}}

Monitor One devices also allow the relay on the I/O card to be controlled from a function.

{{imageOverlay src="/assets/images/console/product-device-functions-monitor.png" class="no-darken"}}


#### Variables - device details - product

This panel shows functions defined in the device firmware using [Particle.variable](/reference/device-os/api/cloud-functions/particle-variable/).

This is the panel for the Monitor One, which allows access to many fields on the I/O card.

{{imageOverlay src="/assets/images/console/product-device-variables-monitor.png" class="no-darken"}}

Note that you should beware when constantly polling variables from an external service. Each variable request uses one data operation, and if you have a large fleet of devices this can add up quickly. Variables can also only be retrieved when the device is online and not in power-saving sleep mode. 

Depending on your application, you may want to use features such as publish or Ledger instead variables for fleets of devices.

#### Options - device details - product

This options are also available from the device list in the **...** button.

{{imageOverlay src="/assets/images/console/product-device-options.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 74f89cd2-5118-4233-9b9d-7f64a2322a0a --}}
#### Mark development device - device details - product

Using **Mark development** does several things:

- Disables fleet flashing to the device. If you are doing active development and flashing your device by USB or OTA directly from Particle Workbench you need to enable Mark Development, otherwise the cloud may immediately overwrite the firmware you flashed with the product default or pinned versions.
- Enables override for all typed configuration settings for Tracker devices.
- Allows local flashing by USB for devices with device protection enabled (enterprise accounts only).

You can tell which devices have Mark development set by the tool icon to the right of the version number in the product device list.

{{imageOverlay src="/assets/images/console/product-device-development.png" class="no-darken"}}

#### Unclaim device - device details - product

Unclaim device removes the Owner from the device. Not all product devices need owners, but if you have one set, you can remove it with this option.

#### Remove device - device details - product

Removes a device from a product. 

In order to stop billing for cellular devices in the free or basic plan, make sure you release the SIM card, in addition to removing device. You should release the SIM first, from the SIM cards panel.

If the device has an owner set, it will go into that user's sandbox device list, and will count against their 100 device limit. In order to completely release a device, you must first unclaim device, then remove device. Do the unclaim first, because otherwise the device will disappear from this list before you can unclaim it. 
{{!-- END shared-blurb --}}

### SIM cards - product

If you have cellular devices, you may have SIM cards listed in the **SIM cards** panel.

{{imageOverlay src="/assets/images/console/sim-cards-product.png" class="no-darken"}}

It is unusual to have to use the **Import SIM card** option as adding a device to a product will also add its associated SIM card. 

{{!-- BEGIN shared-blurb 7f993d02-ecbb-4166-bb05-eafb285fd46b --}}
If you click the **...** button to the right of a SIM card you will be presented with two options:

- **Deactivate SIM** deactivates a SIM card with the mobile carrier so it will no longer be able to connect
- **Release SIM** releases a SIM card so it will no longer be able to connect, and can be transferred to another user

Deactivated SIM behavior also varies based on your billing plan:

- Free plan: still counts toward the 100 device limit
- Basic plan: still counts toward the 100 device per block limit
- Enterprise plans: may stop counting the device as a billable device in some cases

{{imageOverlay src="/assets/images/console/sim-card-deactivate-release.png" class="no-darken"}}
{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 71e05c82-b8a6-476f-a69f-a57477aaa43e --}}
To remove a device so it is no longer counted against your free plan 100 device limit, or against the basic plan 100 device per block limit, you must both remove the device from its product and release its SIM card.

- Unclaim (for claimed devices)
- Remove from product (for product devices)
- Release SIM (for cellular devices)
{{!-- END shared-blurb --}}

### Location - product

If location storage has been enabled, this panel will show the location of the devices in your product.

{{imageOverlay src="/assets/images/console/product-location.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 671d4e83-3dd3-4bac-97ce-d157708f1b29 --}}
This setting is located in the **Setting** panel for the product.

{{imageOverlay src="/assets/images/console/product-settings-locations.png" class="no-darken"}}

- For non-Tracker devices the location is generally updated once per week
- Depending on the device, the location may be approximate, up to a 10,000 meter radius of uncertainty
- It may take 24 hours for a device to update its location the first time after enabling location storage

See [location](/getting-started/cloud/location/) for more information.
{{!-- END shared-blurb --}}

With real data, it might look like this:

{{imageOverlay src="/assets/images/console/product-location-map.png" class="no-darken"}}

### Logic - product

{{!-- BEGIN shared-blurb 75dc780e-171e-44a5-babe-7042c2fb8cfe --}}
Logic Functions are bits of Javascript code that get called in response to a Logic Trigger, which can be:

- A Particle event, generated by a device, Particle cloud API, or webhook response
- A scheduled, periodic time event ("cron")

Logic Functions run in the cloud and are designed to perform short-running calculations such as:

- Generation of new event (which might be subscribed to by a device, or trigger an integration)
- Storing data in the Ledger database
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/console/product-logic.png" class="no-darken"}}

For more information, see [Logic](/getting-started/logic-ledger/logic/).

### Ledgers - product

{{!-- BEGIN shared-blurb 21e80dea-8a96-469c-8f9d-86211332beeb --}}
Ledger allows data to be stored in the cloud, per-device, per-product, or per owner account. 

The three types of Ledgers are:

| Scope | Description |
| :--- | :--- |
| Cloud Ledger | Stores information in the cloud without syncing to the edge. |
| Device to Cloud Ledger | Device storage that syncs automatically to the cloud |
| Cloud to Device Ledger | Set data in the cloud that will sync to devices |

Each ledger is a block of JSON data, up to 16 Kbytes in length. You can define the data format yourself, and it does not need to be pre-defined (no schema required). It can contain simple values (string, number, boolean) as well as nested objects and arrays. JSON does not support binary data, but you can store small binary data by encoding it, such as as hex, Base64, or Base85 encoding.

Device to Cloud and Cloud to Device ledgers require Device OS 6.1.0 or later. They can be up to 16 KBytes in size. 

Cloud only ledgers (not synchronized to a device) can be up to 1 Mbyte (1024 Kbyte).
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/console/product-ledgers.png" class="no-darken"}}

### Fleet health - product

The **Fleet health** panel shows device health information for devices in a product. You can choose the time-frame as well.

{{imageOverlay src="/assets/images/console/product-fleet-health.png" class="no-darken"}}

For more information, see [device vitals](/getting-started/console/device-vitals/).

### Integrations - product

Integrations (webhooks) allow interaction with external services. 

{{imageOverlay src="/assets/images/console/product-integrations.png" class="no-darken"}}

In almost all cases you should create integrations in the product it is associated with, or in the organization it is part of. If a product integration, use the **Add new integration** button here.

{{imageOverlay src="/assets/images/console/product-integrations-add.png" class="no-darken"}}

For more information, see [Integrations](/integrations/introduction/).

#### List options - integrations - product

If you click on the **...** in the integration list, there are three options:

- **View details**
- **Edit integration**
- **Disable integration**

{{imageOverlay src="/assets/images/console/product-integration-list-options.png" class="no-darken"}}

#### List expand - integrations - product

Clicking on the right allow at the left edge of the integration list expands the entry to show additional information.

{{imageOverlay src="/assets/images/console/product-integration-list-expand.png" class="no-darken"}}

#### View details - integrations - product

{{imageOverlay src="/assets/images/console/product-integration-view.png" class="no-darken"}}

#### View details advanced - integrations - product

Additional details are available by using **Show advanced**:

{{imageOverlay src="/assets/images/console/product-integration-view-advanced.png" class="no-darken"}}

#### View details history - integrations - product

The 10 most recently uses of this integration are shown in the history section.

{{imageOverlay src="/assets/images/console/product-integration-view-history.png" class="no-darken"}}

#### View details history details - integrations - product

Clicking on one of the history options expands to show more details about the event.

{{imageOverlay src="/assets/images/console/product-integration-view-history-details.png" class="no-darken"}}

### Edit integration - integrations - product

Edit integration allows you to adjust all of the settings that you made when you created the integration.

{{imageOverlay src="/assets/images/console/product-integration-edit.png" class="no-darken"}}

### Disable integration - integrations - product

You can disable the integration, so the event will not trigger it. You might do this if the integration is experiencing issues.

Note that a single event can trigger an event at multiple levels, such as the sandbox and a product.

Also note that the event name is a prefix match. And event name that begins with the integration event name will be called.

### Events - product

{{!-- BEGIN shared-blurb 0cd8e3ce-a3b1-4a76-94d1-ae4402d5899f --}}
Events are published by devices, Logic, as the result of an integration (webhook), or from the Particle cloud API. They provide a secure, data-efficient way to communicate information between these things. Events are temporal and disappear if not captured by something else, like an integration that could send it to a database, or Ledger. Likewise, the Events view is live, and does not show historical events. It will only show events that pass through the cloud while the panel is open.
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/console/events-product.png" class="no-darken"}}

There is also an Events panel in the sandbox for claimed device events.

And also for each device, to only show events from that device. Note that the device event view does not show responses from webhooks going to that device, only events from the device.

{{imageOverlay src="/assets/images/console/events-device.png" class="no-darken"}}

### Firmware - product

{{imageOverlay src="/assets/images/console/product-firmware.png" class="no-darken"}}

For more information, see [firmware release process](/firmware/best-practices/firmware-release/).

### Authentication - sandbox

{{imageOverlay src="/assets/images/console/product-authentication.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 9cacae49-a693-461e-a1c4-a75069ae226c --}}
The **Authentication** tab allows the creation of a new OAuth client ID.

- If you are providing access to the Particle cloud API for an external service, you should use [API users](/reference/cloud-apis/api/#api-users).
- You should avoid using the customer claiming feature and instead manage access for your customers through your own back-end service.
- You should avoid using the Particle iOS and Android device setup SDKs, which are deprecated and not compatible with current devices.
- If you do need to create an OAuth client you should do so at the product level, or organization level, not at the sandbox level.

{{imageOverlay src="/assets/images/console/new-oauth-client.png" class="no-darken"}}
{{!-- END shared-blurb --}}

### Customers - product

It is recommended that you not use the **Customers** feature.

{{imageOverlay src="/assets/images/console/product-customers.png" class="no-darken"}}

### Configuration - product

Configuration includes environment and secrets for all product, and also contains Typed configuration for Tracker products (Tracker One and Montior One).

{{imageOverlay src="/assets/images/console/product-configuration-typed.png" class="no-darken"}}

### Environment - product

{{imageOverlay src="/assets/images/console/product-environment.png" class="no-darken"}}

For more information, see:

- [Environment](/getting-started/configuration/environment/): lightweight, non‑secret name - value pairs that shape the runtime environment. They are ideal for fast, system level adjustments (endpoints, feature flags, polling intervals) without changing firmware. Available in the cloud and in the firmware.


### Secrets - product

There is no secrets panel for a product. Secrets can be defined:

- In sandbox, and applies to all products in the sandbox of the product owner
- In organization, and applies to all products in the organization

For more information, see:

- [Secrets](/getting-started/cloud/secrets/): secure, organization‑scoped values that integrations and logic can reference securely.

### Typed configuration - product

Only Tracker products have a **Typed configuration** panel.

#### Tracker one - typed configuration - product

{{imageOverlay src="/assets/images/console/product-configuration-tracker-one.png" class="no-darken"}}

For more information, see [Tracker One configuration](/getting-started/tracker/tracker-one-configuration/).

#### Monitor one - typed configuration - product

{{imageOverlay src="/assets/images/console/product-configuration-monitor-one.png" class="no-darken"}}

For more information, see [Monitor One configuration](/getting-started/tracker/monitor-one-configuration/).

#### Custom - typed configuration - product

You can also add custom configuration panels for your own Tracker products. See [Tracker configuration](/reference/tracker/tracker-configuration/) for more information.

### Team - product

{{imageOverlay src="/assets/images/console/product-team.png" class="no-darken"}}

#### Add API user - team - product

An [API user account](/reference/cloud-apis/api/#api-users) is a specific type of user account in the Particle platform that is designed to replace using 'human' accounts for programmatic tasks. It is highly recommended that you use this feature if you are connecting to the Particle cloud
from an external web service.

{{imageOverlay src="/assets/images/console/product-add-api-user.png" class="no-darken"}}

{{note op="start" type="warning"}}
You may find example code that users a user account access token to access the Particle cloud API. You should never do this for a production product; instead use API users for better access control.
{{note op="end"}}

#### Invite team member - team - product

Products allow multiple users to securely collaborate on a project together. Use the **Invite team member** to invite a user to your product.

{{imageOverlay src="/assets/images/console/product-invite-team.png" class="no-darken"}}

Team members can have a role, which determines what operations they can perform on your product.

{{imageOverlay src="/assets/images/console/product-invite-team-role.png" class="no-darken"}}

For more information, see [team access controls](/getting-started/console/team-access-controls/).

### Settings - product

There are various settings for the product in the **Settings** panel.

{{imageOverlay src="/assets/images/console/product-settings.png" class="no-darken"}}

### Cellular usage - product

To view detailed cellular usage information for SIMs in a product you can use the [cellular usage tool](/troubleshooting/connectivity/cellular-usage/).

## Organizations

An organization makes it easy to manage multiple products with shared team members and billing. Organizations are available in the Basic and Enterprise plans. 

If your account is a member of an organization, the **Sandbox** popup in the upper left corner of the Particle console lists the organizations you can select:

Selecting an organization brings up the organization view which allows you to search for devices, SIM cards, and products in your organization.

{{imageOverlay src="/assets/images/console/organization-welcome.png" class="no-darken"}}

The left navigation also has access to features that can be set at the organization level, such as:

- **Products** - the products in this organization.
- **Team** - the users in this organization and their roles (administrators, developers, etc.).
- **Billing & Usage** - only for users who have an Administrator role.

{{imageOverlay src="/assets/images/console/organization-left-nav.png" class="no-darken"}}

You still have granular access control at the product level when using an organization. For example, if you have a contractor who is working on a single product you can grant developer access to that product only instead of all products in your organization.


## Managing your billing

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

