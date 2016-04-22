---
title: Your Particle Dashboard
columns: two
template: guide.hbs
order: 3
---

# {{title}}

So you're building a product! It's an exciting time: your idea is now coming
to life at scale. However, you may quickly realize that managing a "fleet" of
devices brings a new set of challenges to the table requiring specialized
tooling to help you provide the best possible experience for end-users of your
product.

Fear not! By setting up a dashboard for your organization, you will be equipped
with everything you need to effectively oversee your fleet of devices that makeup your IoT product.

<div class="dashboard-teaser">
  ![Particle Dashboard](/assets/images/dashboard-teaser.png)
  <p class="caption">The Particle Dashboard has a suite of tools to make your life as a product creator easier</p>
</div>

## Introducing your dashboard

When you begin the process of manufacturing and distributing your product in
large quantities, you will likely start to ask questions like:

- _How many_ of my devices are online right now?
- _Who_ of my customers are using their devices, and who isn't?
- _How_ are my customers using their devices?
- _Which_ firmware version is running on each device?
- _What_ errors and exceptions are the devices generating?

Without the right tools to answer these questions quickly and accurately, the
health of your product and the relationship you have with your customers will be
put at risk.

Luckily, the Particle dashboard is designed to give you full visibility into the
state of your fleet, and provide a centralized control panel to change how
devices are functioning.

The first step to get started is understanding the differences between your
individual developer dashboard and the organization dashboard.

## Organizations vs. Individuals

Up until now, you've been an individual user of Particle. Your devices belong to
you, and you can only act upon one device at a time.

When you create an **organization**, you'll have a few additional important concepts available to you: **products**, **devices**, and **customers**.

![Organization architecture](/assets/images/organization-structure.png)

First, you'll set up an **organization**, the overarching group responsible for the
development of your Internet of Things products.

Your organization can have multiple **products**. Defining a product is what unifies a
group of devices together, and your product can be configured to function exactly how you
envision.

Each product has its own fleet of associated **devices**. Either a P0, P1,
Photon, or an Electron, could be used inside of each device.

**Customers** own a device, and have permissions to control
their device. You will define the extent of their access to the device when you
configure your product.

Your organization has **team members** with access to the dashboard.

It is important to note that *team members* and *customers* have different levels of access. For instance, only *team members* will typically be able to send an over-the-air firmware update, while *customers* may have the ability to control the product. These access levels will be controlled through the dashboard.

## Setting up an organization

Log into your dashboard at [dashboard.particle.io](https://dashboard.particle.io) and click on the "New Organization" button that appears in the navigation:

![Create a New Organization](/assets/images/new-organization-button.png)
<p class="caption">Click the new organization button to start the process of setting up your organization</p>

You should see a modal appear asking you to give us some basic information about your organization. You'll notice that this modal includes fields for adding a credit card. Don't worry! **Your card will not be charged**. Members of the private beta will have a 30-day trial period to use your organization dashboard. When your trial is up, we will begin charging $49 per team member per month.

![Create Organization Modal](/assets/images/new-organization-modal.png)
<p class="caption">Setting up your organization. Your credit card won't be charged until the end of your free trial</p>

Fill out all fields in the modal, and click **CREATE**. Congratulations! You now are the proud owner of a shiny new organization on Particle!

## Adding team members

Now that you have created an organization successfully, it's time to add your team members that are collaborating with you on your IoT product. Adding a team member will give them full access to your organization's dashboard.

To do this, click on the *team icon* (<i class="ion-person-stalker"></i>) on the sidebar of your organization's dashboard. This will direct you to the team page, where you can view and manage team members of your organizaiton. Right now, your username should be the only one listed as a member of the organization. To add a new team member, just click the *Invite team member* button pictured below:

![Team page](/assets/images/team-page.png)

Clicking this button will open up a modal where you can invite a team member by email address. Before inviting a new team member, **make sure that they already have a Particle account with the email address you will be using to invite them to the organization**. At this time, you are only allowed to belong to one organization. As such, the person you are trying to invite should not already belong to another organization.

![Invite team member](/assets/images/invite-team-member.png)
<p class="caption">The invite team member modal</p>

Once your team member is successfully invited, they will receive an email notifying them of their invitation. The next time they log into their dashboard, they will have the option of accepting or declining the invitation. Remember that after your free trial, Particle will begin charging $49 per team member per month.

Nice! Now you have an organization with a team.

## Defining a product

Our cloud platform thinks that all devices are *Photons*, *Electrons*, or *Cores* — unless it's told otherwise. Now's the time to define your own product within the platform and tell us a bit about how that product should behave.

*Photons* are development kits. They're designed to be easy to reprogram and run a variety of software applications that you, our users, develop.

*Your product* is (probably) not a development kit. While some of the characteristics of the development kits will carry over, you're going to want to make a bunch of changes to how your product works. These include:

- Limiting access (e.g. only certain people can reprogram them)
- Collecting bulk data, events, errors, and logs from all of your devices
- Distributing firmware updates in a controlled fashion

Once you have an organization set up in the dashboard, you will be able to add a product and you will be walked through these decisions.

To create a product, return to your organization's products page and click on the **New Product** button.

![Your organization's product page](/assets/images/products-page.png)

This will open up a modal where you can add basic details about your product:

![A new product](/assets/images/new-product-modal.png)

You now have your very first Particle product! Woot!

After successfully creating your product, you will be directed to your product's configuration page.

## Configuring Your Product

As a product creator, there are some key decisions you will need to make before devices are shipped to customers. Your configuration page will walk you through key questions that you should be thinking about during the development process. **You don't need to know the answers to all of these questions right now.** You are always able to return to your configuration page to answer outstanding questions, or change your answers. However, you **must** answer all questions before you can start manufacturing.

It's also worth mentioning that some of the questions asked on the configuration page have tangible impacts on how your product will function within the Particle ecosystem, and others are simply educational to encourage you to be thinking strategically about what needs to happen before your product goes to manufacturing.

There are four main sections to the configuration page: *Overview*, *Working with Particle*, *Customers*, and *Firmware*. A few questions to highlight here:

* **Authentication/Logging in with Particle**: Thinking about how you would like to handle authentication is one of the earlier decisions you should be make as a product creator. There are three options for authentication: *simple auth*, *two-legged auth*, and *login with Particle (oAuth)*. Each option is explained in detail [later](#managing-customers). Picking an authentication method will likely depend on whether/how much you would like Particle to be hidden from your customers, as well as your development's team appetite for complexity.

* **Private Beta**: Do you only want a select group of people to use your product, inviting them as part of a private beta? This is likely a good idea if you would like to run a controlled test for your product. As a manager of a private beta, you will import a list of customers you would like to participate, and each one will be assigned a 4-character activation code that they will need to claim their device during setup.

* **Programming the product during manufaturing**: You can either program each device while they are on the manufacturing line, or send an OTA update to the device on customer setup. The main advantage of programming on the line is that the device will function immediately, instead of requiring the customer to be in range of Wi-Fi when they unbox the device. However, programming on the line will require your binary to be locked down and finalized before manufacturing begins. Programming the device on setup will allow you to continue developing the firmware for your product in between manufacturing and customer unboxing, providing additional flexibility. But, the device will not function properly until the customer connects the device to the internet and receives the OTA.

![Configuration page](/assets/images/configure-page.png)
<p class="caption">The configuration page will identify key decisions you will need to make before manufacturing</p>

## Your Product ID

When you created your product, a unique numeric ID was assigned to it. This small piece of information is *very, very important* to you as a product creator, and it will be used countless times during the development and manufacturing process for your product. You will be able to find your product's ID at any time in the navigation bar when viewing information about your product:

![A new product](/assets/images/product-id.png)
<p class="caption">Your product ID is marked with a key icon</p>

This ID will be used by the Particle cloud to identify which devices belong to your product, and subsequently it is what empowers you to manage firmware running on those devices *en masse*.

When working with devices that belong to your product, it is important to note that this product ID must be compiled into the firmware that is running on each device. The product ID that the device reports to the cloud from its firmware is considered the source of truth as to how the device should be treated. This will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

## Adding Devices

Now that you have both your organization and your product, it's time to import devices. Importing devices will assign them to your product, and allow you to start viewing and managing these devices within your product dashboard.

For any product you may be developing, you likely have one or more Particle development kits (i.e. a Photon) that you have been using internally for prototyping purposes. We strongly recommend importing these devices into your product, and using them as your *test group*.

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

Checking this checkbox will signal to the Particle cloud that regardless of which product ID is reported by the device's firmware when it comes online next, it should be treated as your product. Your test devices are likely photons that do not have your new product ID compiled into its firmware. If this is the case, go ahead and **check this box**.

When you do a real manufacturing run and import those devices into the dashboard, you will not need to check this box. This is because your devices will receive firmware with your product ID directly on the manufacturing line.

## Rollout Firmware

One of the most significant benefits of your organization dashboard is being able to rollout firmware to groups of devices, all from one place. This opens up tremendous possibilities for your IoT product: you now have the power to continuously improve how a customer's device operates after purchase. In addition, over-the-air (OTA) firmware updates can provide you additional flexibility in the manufacturing process. Specifically, you may continue to develop firmware between the time of manufacturing and shipping your product to customers, and send the latest firmware to your customers on setup of their device.

### Preparing a binary

Click the Firmware icon in the left sidebar to get started. This will direct you to your product's firmware page, your centralized hub for viewing and managing firmware for your product's devices. If you haven't yet uploaded any firmware for this product, your page will look like this:

![Firmware page](/assets/images/firmware-page.png)

If you have been using the Web IDE or Particle Build to develop firmware, you are used to the process of writing, compiling, and then flashing firmware. You will follow the same high-level process here, but altered slightly to work with a group of devices. The first thing you'll need to do is compile a *firmware binary* that you will upload to your dashboard.

Unlike compiling a binary for a single device, it is critical that the **product ID** and a **firmware version** are included in the compiled binary. Specifically, you must add `PRODUCT_ID([your product ID])` and `PRODUCT VERSION([version])` into the application code of your firmware. This is documented fully [here](https://github.com/spark/firmware/blob/develop/docs/build.md#product-id).

You can add these two macros anywhere in your application code, but it's likely easiest to add them to the top of your main `.ino` file. Remember that your [product ID](#your-product-id) can be found in the navigation of your dashboard. The firmware version must be an integer that increments each time a new binary is uploaded to the dashboard. This allows the Particle cloud to determine which devices should be running which firmwares.

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

Once you have a binary ready to go, it's time to upload it to the dashboard!

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

However, releasing firmware also presents tremendous risk. The last thing you would want as a product creator is to break existing functionality for your customers, detracting from their experience with your product. Fear not! Specific safeguards are in place to help you avoid unintended regressions in firmware quality. Namely, **a firmware version must be successfully running on at least one device before it can be released to all devices.**

![Unable to release firmware](/assets/images/unable-to-release.png)
<p class="caption">Releasing a firmware version is disabled until it is running on at least one device</p>

### Recommended development flow

To get the firmware running on a device, head to your devices page by clicking on the devices icon in the sidebar (<i class="im-devices-icon"></i>). Before flashing your device, it's important to first understand the recommended development flow for managing firmware for a product. This flow is designed to minimize risk when deploying new firmware to devices. As discussed earlier, you should start each cycle of firmware rollout by flashing your firmware to your *test group* of devices. Your test devices should be physically available to you and/or your team for testing purposes. Once you have thoroughly tested the new firmware on your test group and fixed any bugs, you can then release the firmware to all other devices. This signals to the cloud that every device should be running the new firmware, and will trigger an auto-update to this version unless otherwise specified.

![Release firmware flow](/assets/images/release-schedule.png)
<p class="caption">The recommended flow for managing firmware</p>

On the devices page, find one of your test devices in the list of devices and click on the row. A dropdown will appear, populated with each of the firmware versions available for that product. For now, this dropdown may only have one available option (the firmware you just uploaded). Select your firmware from the list.

There are two action buttons available: **Lock and flash now**, and **Lock and flash on reset**. Both options involve "locking" a device to a firmware version. This will force the device to download and run the desired firmware version. Once the device receives and runs that firmware, it will not receive any more OTA updates even if a new firmware version is released. **Lock and flash now** will trigger an immediate OTA of the device to the desired firmware version (only available if the device is currently online). **Lock and flash on reset** will only trigger the OTA the next time the device comes online. If you do not have physical access to the device, it may be a good idea to flash on reset to avoid disrupting any current firmware running on the device.

![Lock a device](/assets/images/lock-firmware-version.png)

Once at least one device is successfully running your new firmware, you will now have the ability to release that version of firmware back on the Firmware page. Get into the habit of following this process as you continue to iterate and prepare new versions of firmware for your product!

## Managing Customers

Now that you have set up an organization, your customers will be able to create accounts on the Particle platform that are registered to your organization. When properly implemented, your customers will have no idea that Particle is behind the scenes; they will feel like they are creating an account with *ACME, Inc.*.

There are three ways you can authenticate your customers:

- **Simple authentication**. Your customers will create an account with Particle that is registered to your organization. You do not need to set up your own authentication system, and will hit the Particle API directly.
- **Two-legged authentication**. Your customers will create an account on your servers using your own authentication system, and your web servers will create an account with Particle for each customer that is paired to that customer. Your servers will request a scoped access token for each customer to interact with their device. This is a completely white-labeled solution.
- **Login with Particle**. Your customers will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0. Unlike the other authentication options, this option will showcase Particle branding. This is most useful when the customer is aware of Particle and may be using Particle's development tools with the product.

When you create your product in the dashboard, you will be asked which authentication method you want to use. Implementation of these methods are covered in detail in the [How to build a web app](/guide/how-to-build-a-product/web-app/) section of this guide.

As customers are created for your product, they will begin to appear on your Customers (<i class="ion-user"></i>) page. For each customer, you will be able to see their username and associated device ID. Note that the device ID column will not be populated until the customer goes through the claiming process with their device.

## Monitoring Product Logs

The logs page (<i class="icon-terminal"></i>) is also available to product creators! Featuring the same interface as what you are used to with the [developer version of the dashboard](/guide/tools-and-features/dashboard/), the logs will now include events from any device identifying as your product. Use this page to get a real-time look into what is happening with your devices. In order to take full advantage of the logs page, be sure to use `Particle.publish()` in your firmware.

## Managing your subscription

To see all billing related information, you can click on the billing icon in your organization's sidebar (<i class="ion-card"></i>). This is the hub for all billing-related information and actions.

### How billing works

When you signed up for Device Management, you selected a plan. Which plan you selected determines the amount and frequency at which you are billed. For instance, selecting the Team Plan (annually) enrolls you for a $49.00 per team member per month plan, paid annually. This means if you have 1 team member, you will be billed $588 once a year.

It is important to note that charges made to your account are for <em>future billing periods</em>, not <em>previous billing periods</em>. In other words, getting charged extends your organization's access to the end of the <em>upcoming</em> billing period. When that billing period ends, a new charge will occur, once again extending your team's access.

If you update your subscription (i.e adding or removing team members, switching plans) in the middle of the month, we will automatically calculate the proper adjustments to be made, and apply them to your next payment.

### Updating your credit card

You can update your credit card from the billing page by clicking on the "EDIT" button next to the credit card on file. Whenever your credit card on file expires or no longer is valid, be sure to update your credit card info here to avoid any disruptions in your service.

![Update your credit card](/assets/images/edit-card.png)

### Failed Payments

If we attempt to charge your credit card and it fails, we do not immediately prevent you or your team from accessing your Device Management dashboard. We will continue to retry charging your card once every few days <strong>for a maximum of 3 retries</strong>. You will receive an email notification each time an attempt is made and fails. When you receive this notification, the best thing to avoid any interruption in service is to <a href="#updating-your-credit-card">update your credit card</a>.

After we have unsuccessfully tried to charge your card 3 times, your Device Management account will be locked. <strong>Your organization, products, and all data will not be deleted</strong>. After re-activating your subscription, you will be able to access your Organization's dashboard once again.

### Cancelling a subscription

You can cancel your subscription by clicking on the "Cancel subscription" link on your organization's billing page, under the "Manage subscription" header. After cancellation, you and your team are still able to access Device Management until the end of the current billing period.

It is important to note that after cancellation, <strong>your data is not deleted</strong>. Existing devices and products that encompass your organization will still function as normal. After the current billing period has ended, your account will be put in an inacive state. You can re-activate your subscription at any time to resume access to Device Management.

### Re-activate a subscription

If you have cancelled your subscription but are interested in re-activation, fear not! The process is very simple and will have you building again in no time. As discussed in the previous section, your organization's data is not destroyed when you cancel your subscription.

There are two slightly different ways to re-activate, depending on the status of your subscription. If you have cancelled your subscription but are still within the current billing period, you will still have access to your dashboard and can re-activate from your organization's billing page. The manage subscription section should now be replaced with information about your subscription cancellation, and will have a button allowing you to re-activate.

![Reactivate subscription](/assets/images/reactivate-subscription.png)
<p class="caption">You can easily re-activate your subscription from your billing page</p>

If re-activating a subscription that has not been fully cancelled yet, you will remain on the same billing cycle and will be charged at the beginning of the next billing period.

If your subscription has already been marked as inactive (three failed charge attempts, or after the end of the current billing period when cancelled), re-activation is slightly different. Upon login to the dashboard, your team will be directed to an "Inactive Subscription" page, letting you know that you no longer have access to your organization's Device Management dashboard. On this page, there is also a "re-activate subscription" button. In this case, you will need to provide a valid credit card to resume your subscription.

![Inactive subscription](/assets/images/inactive-subscription.png)
<p class="caption">Re-activate your subscription after it has been marked as inactive</p>

If re-activating a subscription that is currently inactive, you will be re-enrolled in the plan you had signed up for. Your credit card will be charged immediately for the next billing period, and will begin a new billing cycle based on the day that you re-activated.
