---
title: Your Particle Dashboard
columns: two
template: guide.hbs
order: 5
---

# {{title}}

Everything up to this point in the product creator guide has asked you to
think about how you will scale your Internet of Things product from a single prototype to hundreds, thousands,
or even millions of units.

It's an exciting time: your idea is now coming
to life at scale! However, you may quickly realize that managing a "fleet" of
devices brings a new set of challenges to the table requiring specialized
tooling to help you provide the best possible experience for end-users of your
product.

Fear not! By setting up a dashboard for your organization, you will be equipped
with everything you need to effectively oversee your fleet of devices and corresponding
customers that makeup your IoT product.

<div class="dashboard-teaser">
  ![Particle Dashboard](/assets/images/dashboard-teaser.png)
  <p class="caption">The Particle Dashboard has a suite of tools to make your life as a product creator easier</p>
</div>

### Introducing your dashboard

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
individual developer dashboard and the Fleet Management Dashboard.

### Organizations vs. Individuals

Up until now, you've been an individual user of Particle. Your devices belong to
you, and you can only act upon one device at a time.

The Fleet Management Dashboard presents a new architecture designed to empower
product creators, specifically by introducing **organizations**,
**products**, **devices**, and **customers**.

![Organization architecture](/assets/images/organization-structure.png)

In words, you set up an **organization**, the overarching group responsible for the
development of your Internet of Things products.

Your organization can have multiple **products**. Defining a product is what unifies a
group of devices together, and can be configured to function exactly how you
envision.

Each product has its own fleet of associated **devices**. Either a P0, P1,
Photon, or eventually, an Electron, can be used inside of each device.

**Customers** own a device, and have permissions to control
their device. The extent of their access to the device is defined by you when
configuring your product.

Your organization has **team members** with access to the dashboard.

It is important to note that *team members* and *customers* have different levels of access. For instance, only *team members* will typically be able to send an over-the-air firmware update, while *customers* may have the ability to control the product. These access levels will be controlled through the dashboard.

### Setting up an organization

Currently the Fleet Management dashboard is in private beta. If you are interested
in gaining access, please contact [hello@particle.io](mailto:hello@particle.io).
The dashboard will be available to everyone in Fall 2015.

Once you have access to create an organization from the Particle team, log into your dashboard at [dashboard.particle.io](https://dashboard.particle.io) and click on the "New Organization" button that appears in the navigation:

![Create a New Organization](/assets/images/new-organization-button.png)
<p class="caption">Click the new organization button to start the process of setting up your organization</p>

If you have been granted access into the private beta, you should see a modal appear asking you to give us some basic information about your organization. You'll notice that this modal includes fields for adding a credit card. Don't worry! **Your card will not be charged**. Members of the private beta will have a 2 month trial period to use your organization dashboard. When your trial is up, we will begin charging $49 per team member per month.

![Create Organization Modal](/assets/images/new-organization-modal.png)
<p class="caption">Setting up your organization. Your credit card won't be charged until the end of your free trial</p>

Fill out all fields in the modal, and click **CREATE**. Congratulations! You now are the proud owner of a shiny new organization on Particle!

### Adding team members

Now that you have created an organization successfully, it's time to add your team members that are collaborating with you on your IoT product. Adding a team member will give them full access to your organization's dashboard.

To do this, click on the *team icon* (<i class="ion-person-stalker"></i>) on the sidebar of your organization's dashboard. This will direct you to the team page, where you can view and manage team members of your organizaiton. Right now, your username should be the only one listed as a member of the organization. To add a new team member, just click the *Invite team member* button pictured below:

![Team page](/assets/images/team-page.png)

Clicking this button will open up a modal where you can invite a team member by email address. Before inviting a new team member, **make sure that they already have a Particle account with the email address you will be using to invite them to the organization**. Also, at this time, you are only allowed to belong to one organization. As such, the person you are trying to invite should not already belong to another organization.

![Invite team member](/assets/images/invite-team-member.png)
<p class="caption">The invite team member modal</p>

Once your team member is successfully invited, they will receive an email notifying them of their invitation. The next time they log into their dashboard, they will have the option of accepting or declining the invitation. Remember that after your free trial, Particle will begin charging $49 per team member per month.

Nice! Now you have an organization with a team.

### Defining a product

Our cloud platform thinks that all devices are *Photons* or *Cores* — unless it's told otherwise. Now's the time to define your own product within the platform and tell us a bit about how that product should behave.

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

### Configuring Your Product

### Your Product ID

When you created your product, a unique numeric ID was assigned to it. This small piece of information is *very, very important* to you as a product creator, and it will be used countless times during the development and manufacturing process for your product. You will be able to find your product's ID at any time in the navigation bar when viewing information about your product:

![A new product](/assets/images/product-id.png)
<p class="caption">Your product ID is marked with a key icon</p>

This ID will be used by the Particle cloud to identify which devices belong to your product, and subsequently it is what empowers you to manage firmware running on those devices *en masse*.

When working with devices that belong to your product, it is important to note that this product ID must be compiled into the firmware that is running on each device. The product ID that the device reports to the cloud from its firmware is considered the source of truth as to how the device should be treated. This will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

### Adding Devices

Now that you have both your organization and your product, it's time to import devices. Importing devices will assign them to your product, and allow you to start viewing and managing these devices within your product dashboard.

For any product you may be developing, you likely have one or more Particle development kits (i.e. a Photon) that you have been using internally for prototyping purposes. We strongly recommend importing these devices into your product, and using them as your *test group*.

Your *test group* will serve as the guinea pigs for new versions of product firmware. You should get into the habit of uploading a new version of firmware to your product, and flashing it to your test group to ensure your code is working as expected. This too will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

To import devices, click on the Devices icon in your product sidebar, then click on the "Import" button.

![Your product's devices](/assets/images/devices-page.png)

To allow you to import devices in bulk, we allow you to upload a file containing multiple device IDs. Create a `.txt` file that contains all of the IDs of devices that you would like to import into your product, one on each line. [Not sure what your device ID is?](http://docs.particle.io/photon/cli/#running-from-source-advanced-particle-identify). *All devices included in this list must be owned by a team member of your organization*. The file should look something like this:

```
55ff6d04498b49XXXXXXXXXX
45f96d06492949XXXXXXXXXX
35ee6d064989a9XXXXXXXXXX
```

Where each line is one Device ID. Once you have your file ready, drop it onto the file selector in the import devices modal. Before clicking import, note the checkbox that says *Force imported devices to switch to this product*.

![Import devices modal](/assets/images/import-devices.png)

Checking this checkbox will signal to the Particle cloud that regardless of which product ID is reported by the device's firmware when it comes online next, it should be treated as your product. Your test devices are likely photons that do not have your new product ID compiled into its firmware. If this is the case, go ahead and **check this box**.

When you do a real manufacturing run and import those devices into the dashboard, you will not need to check this box. This is because your devices will receive firmware with your product ID directly on the manufacturing line.



### Rollout Firmware

### Managing Customers

Once you have set up an organization, your customers will be able to create accounts on the Particle platform that are registered to your organization. When properly implemented, your customers will have no idea that Particle is behind the scenes; they will feel like they are creating an account with *ACME, Inc.*.

There are four ways you can authenticate your customers:

- **Simple authentication**. Your customers will create an account with Particle that is registered to your organization. You will be able to see each of these customers in your dashboard. You do not need to set up your own authentication system.
- **Self-managed authentication**. Your customers will create an account on your servers using your own authentication system. Your web servers will have a single set of credentials that control all of your products, and you will be responsible for mapping access between customers and devices.
- **Two-legged authentication**. Your customers will create an account on your servers using your own authentication system, and your web servers will create an account with Particle for each customer that is paired to that customer.
- **Login with Particle**. Your customers will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0. Unlike the other authentication options, this option must showcase Particle branding. This is most useful when the customer is aware of Particle and may be using Particle's development tools with the product.

When you create your product in the dashboard, you will be asked which authentication method you want to use. Implementation of these authentication protocols will be covered later in this tutorial.

### Monitoring Product Logs

