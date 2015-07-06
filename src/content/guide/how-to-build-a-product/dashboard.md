---
title: Your Particle Dashboard
columns: two
template: docs.hbs
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

### Defining a product

Our cloud platform thinks that all devices are *Photons* or *Cores* — unless it's told otherwise. Now's the time to define your own product within the platform and tell us a bit about how that product should behave.

*Photons* are development kits. They're designed to be easy to reprogram and run a variety of software applications that you, our users, develop.

*Your product* is (probably) not a development kit. While some of the characteristics of the development kits will carry over, you're going to want to make a bunch of changes to how your product works. These include:

- Limiting access (e.g. only certain people can reprogram them)
- Collecting bulk data, events, errors, and logs from all of your devices
- Distributing firmware updates in a controlled fashion

Once you have an organization set up in the dashboard, you will be able to add a product and you will be walked through these decisions.

PRIVATE BETA

MANUFACTURING FIRMWARE

MOBILE CREDENTIALS

### Adding Devices

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

