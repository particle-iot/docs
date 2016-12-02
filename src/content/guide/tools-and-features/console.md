---
word: Console
title: Console
order: 3
shared: true
columns: two
template: guide.hbs
---


# Console 

The [Device Management Console](https://console.particle.io) is your command center. It allows you and a team to manage firmware running on your devices, collect and analyze product data, and manage team permissions from a single administrative interface.

**Note:** The Console does not yet work in Microsoft Internet Explorer including Edge. Please use another browser, such as Chrome or Firefox, to access the Console. If you're experiencing rendering issues, turn off any ad blocking extensions you may be using.

When you begin using many devices you'll find yourself asking questions like:

- _How many_ of my devices are online right now?
- _Who_ of my customers are using their devices, and who isn't?
- _How_ are my customers using their devices?
- _Which_ firmware version is running on each device?
- _What_ errors and exceptions are the devices generating?

Luckily, the Particle Console is designed to give you full visibility into the
state of your fleet, and provide a centralized control panel to change how
devices are functioning.

The first step to get started is understanding the differences between your
personal devices and those added to a Product.

## Devices vs Product Devices

Up until now, you've been an individual user of Particle. Your devices belong to
you, and you can only act upon one device at a time.

When you create a **Product**, you'll have a few additional important concepts available to you: **devices**, **team members** and **customers**.

First, you'll set up a **Product**, the overarching group responsible for the
development of your Internet of Things products.

Defining a Product is what unifies a group of homogeneous devices together, and your Product can be configured to function exactly how you
envision.

Each Product has its own fleet of associated **devices**. Any hardware on the Particle Cloud including the P0, P1,
Photon, and Electron, could be used inside a Product, but it's important to note that only one type of device will be in each Product

**Customers** own a device, and have permissions to control
their device. You will define the extent of their access to the device when you
configure your Product.

Your Product also has **team members** with access to the Console.

It is important to note that *team members* and *customers* have different levels of access. For instance, only *team members* will typically be able to send an over-the-air firmware update, while *customers* may have the ability to control their own product. These access levels will be controlled through the Console.

## Defining a product

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

## Adding team members

Now that you have created a Product successfully, it's time to add your coworkers and friends that are collaborating with you on your IoT product. Adding a team member will give them full access to your Product's Console.

To do this, click on the *team icon* (<i class="ion-person-stalker"></i>) on the sidebar of your Product Console. This will direct you to the team page, where you can view and manage team members. Right now, your username should be the only one listed as a member of the Product. To add a new team member, just click the *Invite team member* button pictured below:

![Team page](/assets/images/team-page.png)

Clicking this button will open up a modal where you can invite a team member by email address. Before inviting a new team member, **make sure that they already have a Particle account with the email address you will be using to invite them to the Product**. 

![Invite team member](/assets/images/invite-team-member.png)
<p class="caption">The invite team member modal</p>

Once your team member is successfully invited, they will receive an email notifying them of their invitation. The next time they log into their Console, they will have the option of accepting or declining the invitation. Remember that you can have up to 5 team members in the free Prototype tier, so go send some invites!

Nice! Now you have a Product with a team.

## Your Product ID

When you created your product, a unique numeric ID was assigned to it. This small piece of information is *very, very important* to you as a product creator, and it will be used countless times during the development and manufacturing process for your product. You will be able to find your product's ID at any time in the navigation bar when viewing information about your product:

![A new product](/assets/images/product-id.png)
<p class="caption">Your product ID is marked with a key icon</p>

This ID will be used by the Particle Cloud to identify which devices belong to your Product, and subsequently it is part of what empowers you to manage firmware running on those devices *en masse*.

When working with devices that belong to your Product, it is important to note that this product ID must be compiled into the firmware that is running on each device. The product ID that the device reports to the cloud from its firmware will determine which Product it requests to become a part of. This will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

## Adding Devices

Now that you have your Product, it's time to import devices. Importing devices will assign them to your Product and allow you to start viewing and managing these devices within your Product Console.

For any product you may be developing, you likely have one or more Particle development kits (i.e. a Photon) that you have been using internally for prototyping purposes. We strongly recommend importing these devices into your Product, and using them as your *test group*.

Your *test group* will serve as the guinea pigs for new versions of product firmware. You should get into the habit of uploading a new version of firmware to your product, and flashing it to your test group to ensure your code is working as expected. This too will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

To import devices, click on the Devices icon in your product sidebar, then click on the "Import" button.

![Your product's devices](/assets/images/devices-page.png)

To allow you to import devices in bulk, we allow you to upload a file containing multiple device IDs. Create a `.txt` file that contains all of the IDs of devices that you would like to import into your product, one on each line. [Not sure what your device ID is?](http://docs.particle.io/photon/cli/#running-from-source-advanced-particle-identify) *You cannot register devices that have already been 'claimed' by someone outside of your team; all of these devices must either belong to a team member or belong to no one*. The file should look something like this:

```
55ff6d04498b49XXXXXXXXXX
45f96d06492949XXXXXXXXXX
35ee6d064989a9XXXXXXXXXX
```

Where each line is one Device ID. Once you have your file ready, drop it onto the file selector in the import devices modal. Before clicking import, note the checkbox that says *Force imported devices to switch to this product*.

![Import devices modal](/assets/images/import-devices.png)

Checking this checkbox will signal to the Particle Cloud that it should be treated as your product, though this will be overridden by any pre-existing Product relationship (i.e. you can't transfer an existing product this way). Your test devices are likely Photons that do not have your new product ID compiled into its firmware. If this is the case, go ahead and **check this box**.

When you do a real manufacturing run and import those devices into the Console, you will not need to check this box. This is because your devices will receive firmware with your product ID directly on the manufacturing line.

## Rollout Firmware

One of the most significant benefits of your Console is being able to roll out firmware to groups of devices, all from one place. This opens up tremendous possibilities for your IoT product: you now have the power to continuously improve how a customer's device operates after purchase. In addition, over-the-air (OTA) firmware updates can provide you additional flexibility in the manufacturing process. Specifically, you may continue to develop firmware between the time of manufacturing and shipping your product to customers, and send the latest firmware to your customers on setup of their device.

### Preparing a binary

Click the Firmware icon in the left sidebar to get started. This will direct you to your product's firmware page, your centralized hub for viewing and managing firmware for your product's devices. If you haven't yet uploaded any firmware for this Product, your page will look like this:

![Firmware page](/assets/images/firmware-page.png)

If you have been using the Web IDE / Particle Build to develop firmware, you are used to the process of writing, compiling, and then flashing firmware. You will follow the same high-level process here, but altered slightly to work with a group of devices. The first thing you'll need to do is compile a *firmware binary* that you will upload to your Console.

Unlike compiling a binary for a single device, it is critical that the **product ID** and a **firmware version** are included in the compiled binary. Specifically, you must add `PRODUCT_ID([your product ID])` and `PRODUCT VERSION([version])` into the application code of your firmware. This is documented fully [here](https://github.com/spark/firmware/blob/develop/docs/build.md#product-id).

Add these two "macros" near the top of your main aplication `.ino` file, below `#include "application.h"` if it includes that line. Remember that your [product ID](#your-product-id) can be found in the navigation of your Console. The firmware version must be an integer that increments each time a new binary is uploaded to the Console. This allows the Particle Cloud to determine which devices should be running which firmwares.

Here is an example of Blinky with the correct product and version details:

```
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

### Compiling Binaries

If you are in the Web IDE, you can easily download a compiled binary by clicking the Code icon (<i class="ion-code"></i>) in your sidebar. You will see the name of your app in the pane, along with a download icon (<i class="ion-ios7-cloud-download"></i>). Click the download icon to compile and download your current binary.

![Compile firmware](/assets/images/ide-compile.png)
<p class="caption">Compile and download a product binary from the web IDE</p>

If you are using Particle Dev, clicking on the compile icon (<i class="ion-checkmark-circled"></i>) will automatically add a `.bin` file to your current working directory if the compilation is a success. **Note**: Make sure that you have a device selected in Particle Dev before compiling.

![Compile firmware](/assets/images/particle-dev-icon.png)
<p class="caption">Particle Dev will automatically add a compiled binary to your working directory after you compile</p>

Once you have a binary ready to go, it's time to upload it to the Console!

### Uploading firmware

Back on the firmware page, click on the **Upload** button in the top-right corner of the page. This will launch the upload firmware modal:

![Upload firmware](/assets/images/upload-firmware.png)

A few things to keep in mind here:

* The firmware version that you enter into this screen **must match** what you just compiled into your binary. Madness will ensue otherwise!
* You should give your firmware a distinct title that concisely describes how it differs from other versions of firmware. This name will be important in how firmware is rolled out to devices
* Attach your newly compiled `.bin` file in the gray box

Click upload. Congrats! You've uploaded your first version of product firmware! You should now see it appear in your list of firmware versions.

![Product firmware version](/assets/images/product-firmware.png)
<p class="caption">Your firmware version now appears in your list of available binaries</p>

### Releasing firmware

Time to flash that shiny new binary to some devices! Notice that when you hover over a version of firmware, you have the ability to **Release firmware** (<i class="ion-star"></i>). *Releasing* firmware sets that binary as the **preferred firmware version** for all devices reporting as your product. Unless set individually, any device that does not report this released version of firmware will **automatically download and run it** next time it comes online.

Releasing firmware is the mechanism by which any number of devices can receive a single version of firmware without being individually targeted. This is incredibly valuable: imagine identifying a bug in your firmware and pushing out a fix to thousands of devices that are out in the field. Or, consider the possibility of continuing to build new features that can be introduced to customers, even after they have purchased your product and are actively using it. Amazing! This is the power of the Internet of Things.

However, releasing firmware also presents a serious risk. The last thing you would want as a product creator is to break existing functionality for your customers, detracting from their experience with your product. Fear not! Specific safeguards are in place to help you avoid unintended regressions in firmware quality. Namely, **a firmware version must be successfully running on at least one device before it can be released to all devices.**

![Unable to release firmware](/assets/images/unable-to-release.png)
<p class="caption">Releasing a firmware version is disabled until it is running on at least one device</p>

### Recommended development flow

To get the firmware running on a device, head to your devices page by clicking on the devices icon in the sidebar (<i class="im-devices-icon"></i>). Before flashing your device, it's important to first understand the recommended development flow for managing firmware for a Product. This flow is designed to minimize risk when deploying new firmware to devices. As discussed earlier, you should start each cycle of firmware rollout by flashing your firmware to your *test group* of devices. Your test devices should be physically available to you and/or your team for testing purposes. Once you have thoroughly tested the new firmware on your test group and fixed any bugs, you can then release the firmware to all other devices. This signals to the cloud that every device should be running the new firmware, and will trigger an auto-update to this version unless otherwise specified.

![Release firmware flow](/assets/images/release-schedule.png)
<p class="caption">The recommended flow for managing firmware</p>

On the devices page, find one of your test devices in the list of devices and click on the row. A dropdown will appear, populated with each of the firmware versions available for that product. For now, this dropdown may only have one available option (the firmware you just uploaded). Select your firmware from the list.

There are two action buttons available: **Lock and flash now**, and **Lock and flash on reset**. Both options involve "locking" a device to a firmware version. This will force the device to download and run the desired firmware version. Once the device receives and runs that firmware, it will not receive any more OTA updates even if a new firmware version is released. **Lock and flash now** will trigger an immediate OTA of the device to the desired firmware version (only available if the device is currently online). **Lock and flash on reset** will only trigger the OTA the next time the device comes online. If you do not have physical access to the device, it may be a good idea to flash on reset to avoid disrupting any current firmware running on the device.

![Lock a device](/assets/images/lock-firmware-version.png)

Once at least one device is successfully running your new firmware, you will now have the ability to release that version of firmware back on the Firmware page. Get into the habit of following this process as you continue to iterate and prepare new versions of firmware for your product!

To turn a device with locked firmware back into a development device that can be flashed with any firmware, click the padlock to unlock the firmware version.

![Unlock a device](/assets/images/unlock-firmware-version.png)

## Managing Customers

Now that you have set up a Product, your customers will be able to create accounts on the Particle platform that are registered to your Product. When properly implemented, your customers will have no idea that Particle is behind the scenes; they will feel like they are creating an account with *ACME, Inc.*.

There are three ways you can authenticate your customers:

- **Simple authentication**. Your customers will create an account with Particle that is registered to your product. You do not need to set up your own authentication system, and will hit the Particle API directly.
- **Two-legged authentication**. Your customers will create an account on your servers using your own authentication system, and your web servers will create an account with Particle for each customer that is paired to that customer. Your servers will request a scoped access token for each customer to interact with their device. This is a completely white-labeled solution.
- **Login with Particle**. Your customers will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0. Unlike the other authentication options, this option will showcase Particle branding. This is most useful when the customer is aware of Particle and may be using Particle's development tools with the product.

When you create your Product in the Console, you will be asked which authentication method you want to use. Implementation of these methods are covered in detail in the [How to build a web app](/guide/how-to-build-a-product/web-app/) section of this guide.

As customers are created for your product, they will begin to appear on your Customers (<i class="ion-user"></i>) page. For each customer, you will be able to see their username and associated device ID. Note that the device ID column will not be populated until the customer goes through the claiming process with their device.

## Monitoring Event Logs

The Logs page (<i class="icon-terminal"></i>) is also available to product creators! Featuring the same interface as what you are used to with the [developer version of the Console](/guide/tools-and-features/console/), the logs will now include events from any device identifying as your product. Use this page to get a real-time look into what is happening with your devices. In order to take full advantage of the Logs page, be sure to use `Particle.publish()` in your firmware.

## Managing your billing

To see all billing related information, you can click on the billing icon in your Product's sidebar (<i class="ion-card"></i>). This is the hub for all billing-related information and actions. For more specifics about the pricing tiers and frequently asked questions, [go check out the Pricing page](https://www.particle.io/pricing).

### How billing works

#### Product owners 
Each Product has one primary administrator, the product owner. The owner manages the payment options, the pricing tier, and what billing interval the Product is on. This owner is the account that created the Product in the first place. 

#### Devices

Devices are any physical device that uses the Particle Cloud- Photons, Electrons, P1s, P0s, etc. The only devices that count toward your pricing tier are those in a single Product fleet, so you could have many “loose” devices in your personal account without them adding to the number of devices in one of your Products. 

Your personal account’s devices (as well as new, unclaimed devices) are added to a Product when you want to use them as a group for data reporting, firmware updates, and collaboration with coworkers or friends. Only when they’ve been intentionally added to a Product will they count towards that total. 

#### Events

An event is any single outbound message from your fleet that exits the Particle Cloud. For example, this could include a Particle.publish() call on a device that triggers a webhook, an integration such as IFTTT, or a server-sent event (SSE).

If you have multiple JS applications subscribed to an event then each will consume one of your outbound messages with each published event- watch out for running many copies of your app!

When you hit the outbound event limit you can choose to upgrade to the new tier or stay at the current tier. If you do choose to stay with the current tier then any future events that month won’t be sent. You’ll get a fresh batch of events at the beginning of the next month, and normal behavior will resume then. Don’t worry, we’ll send you a warning before and an alert when you reach the event limit. 

#### Team Members

Team members are people that you’ve added to a Product to give them administrative access to the data, controlling firmware on devices, adding integrations, and more. The product owner can add and remove team members as necessary, but they’ll need to have a Particle account before they can be invited to join your team.


#### Billing periods 
Products in the Console are billed separately, so if you have more than one they can be on different pricing tiers and have different billing dates. The billing date for a Product is the anniversary of when it was first created, either day of the month if you’re on a monthly plan or the day of the year (month+day) in the case of an annually paid plan.

All Console plans are billed at the beginning of the plan period; in other words, it’s prepaid. You’ll pay for the following month or year, and can later cancel for a prorated remainder. 

### Status
It’s easy to find out the status of your Product’s metrics. Visit [console.particle.io/billing](https://console.particle.io/billing) and you’ll see an up-to-date list of each Product you own, how many outbound events they’ve used that billing cycle, number of devices in each, and how many team members they have. The renewal date for each Product plan is also shown, so you know when the next bill is coming up.

### Changing Plans 
You can upgrade to a higher tier at any time from the Billing view in order to add more team members or devices, or increase your monthly outbound event limit. We’ll send you notifications before you encounter the outbound event limit, but it’s wise to upgrade early because no events will be sent after you hit it. If you’ve hit the event limit, tried to add more devices than are supported by the current tier, or attempted to add a 6th team member while on the free Prototype tier, you’ll be prompted to upgrade to a higher tier.

When you upgrade we’ll prorate the new price for the rest of the month (or year, depending on your billing period) so you’ll never be double-billed.

Contact us if you need to downgrade or remove a Product; both have potentially complex impacts and ambiguities, so we’ll make sure that exactly the right thing happens.

### Updating your credit card

You can update your credit card from the billing page by clicking on the "UPDATE" button next to the credit card on file. Whenever your credit card on file expires or no longer is valid, be sure to update your credit card info here to avoid any disruptions in your service.

### Failed Payments

If we attempt to charge your credit card and it fails, we do not immediately prevent you or your team from accessing your Device Management Console. We will continue to retry charging your card once every few days <strong>for a maximum of 3 retries</strong>. You will receive an email notification each time an attempt is made and fails. When you receive this notification, the best thing to avoid any interruption in service is to <a href="#updating-your-credit-card">update your credit card</a>.

After we have unsuccessfully tried to charge your card 3 times, your Console account will be locked. <strong>Your Products and all data will not be deleted</strong>. After re-activating your account, you will be able to access your Console once again.

## Configuring Your Product

As a product creator, there are some key decisions you will need to make before devices are shipped to customers. Your configuration page will walk you through key questions that you should be thinking about during the development process. **You don't need to know the answers to all of these questions right now.** You are always able to return to your Configuration page to answer outstanding questions, or change your answers. However, you **should** answer all questions before you can start manufacturing.

It's also worth mentioning that some of the questions asked on the configuration page have tangible impacts on how your product will function within the Particle ecosystem, and others are simply educational to encourage you to be thinking strategically about what needs to happen before your product goes to manufacturing.

There are four main sections to the configuration page: *Overview*, *Working with Particle*, *Customers*, and *Firmware*. A few questions to highlight here:

* **Authentication/Logging in with Particle**: Thinking about how you would like to handle authentication is one of the earlier decisions you should be make as a product creator. There are three options for authentication: *simple auth*, *two-legged auth*, and *login with Particle (oAuth)*. Each option is explained in detail [later](#managing-customers). Picking an authentication method will likely depend on whether/how much you would like Particle to be hidden from your customers, as well as your development's team appetite for complexity.

* **Private Beta**: Do you only want a select group of people to use your product, inviting them as part of a private beta? This is likely a good idea if you would like to run a controlled test for your product. As a manager of a private beta, you will import a list of customers you would like to participate, and each one will be assigned a 4-character activation code that they will need to claim their device during setup.

* **Programming the product during manufacturing**: You can either program each device while they are on the manufacturing line, or send an OTA update to the device on customer setup. The main advantage of programming on the line is that the device will function immediately, instead of requiring the customer to be in range of Wi-Fi when they unbox the device. However, programming on the line will require your binary to be locked down and finalized before manufacturing begins. Programming the device on setup will allow you to continue developing the firmware for your product in between manufacturing and customer unboxing, providing additional flexibility. But, the device will not function properly until the customer connects the device to the internet and receives the OTA.

![Configuration page](/assets/images/configure-page.png)
<p class="caption">The configuration page will identify key decisions you will need to make before manufacturing</p>
