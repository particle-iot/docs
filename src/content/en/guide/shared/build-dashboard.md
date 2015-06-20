---
title: Setting up your Particle Dashboard
columns: 2
---

As you've developed your product with Particle, you've probably become very familiar with our development tools. Now that you're transitioning to production, you're about to become very familiar with a new part of our software stack: our device dashboard.

**PICTURE OF THE DASHBOARD AND HOW AWESOME IT IS**

### Introducing your dashboard

Once you're shipping your connected product at scale, you will be exposed to a whole bunch of new problems and opportunities. You'll be asking questions like:

- How many of my devices are online right now?
- Which of my customers are using their devices, and which aren't?
- What firmware versions are running on each device?
- What errors and exceptions are the devices generating?

Our device dashboard is designed to provide visibility into the state of your "fleet" of devices and provide tools to monitor and make changes to the fleet. In order to manage a fleet, you need to start by setting up an organization with Particle.

### Organizations vs. individuals

Up until now, you've been an individual user of Particle. Your devices belong to you.

Setting up an organization makes sense when your *team* and your *customers* are different people.

- Your organization has a *team* with access to the dashboard.
- Your organization has *customers* who are the end users of your product. If you make a connected toaster, the person who purchased the toaster is the *customer*.
- *Team members* and *customers* have different levels of access. For instance, only *team members* will typically be able to send an over-the-air firmware update, while *customers* may have the ability to control the product. These access levels will be controlled through the dashboard.

### Setting up an organization

Currently the organization dashboard is in private beta. If you are interested in gaining access, please contact [sales@particle.io](sales@particle.io). The dashboard will be available to everyone in Summer 2015.

### Defining a product

Our cloud platform thinks that all devices are *Photons* or *Cores* — unless it's told otherwise. Now's the time to define your own product within the platform and tell us a bit about how that product should behave.

*Photons* are development kits. They're designed to be easy to reprogram and run a variety of software applications that you, our users, develop.

*Your product* is (probably) not a development kit. While some of the characteristics of the development kits will carry over, you're going to want to make a bunch of changes to how your product works. These include:

- Limiting access (e.g. only certain people can reprogram them)
- Collecting bulk data, events, errors, and logs from all of your devices
- Distributing firmware updates in a controlled fashion

Once you have an organization set up in the dashboard, you will be able to add a product and you will be walked through these decisions.

### Authenticating your customers

Once you have set up an organization, your customers will be able to create accounts on the Particle platform that are registered to your organization. When properly implemented, your customers will have no idea that Particle is behind the scenes; they will feel like they are creating an account with *ACME, Inc.*.

There are four ways you can authenticate your customers:

- **Simple authentication**. Your customers will create an account with Particle that is registered to your organization. You will be able to see each of these customers in your dashboard. You do not need to set up your own authentication system.
- **Self-managed authentication**. Your customers will create an account on your servers using your own authentication system. Your web servers will have a single set of credentials that control all of your products, and you will be responsible for mapping access between customers and devices.
- **Two-legged authentication**. Your customers will create an account on your servers using your own authentication system, and your web servers will create an account with Particle for each customer that is paired to that customer.
- **Login with Particle**. Your customers will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0. Unlike the other authentication options, this option must showcase Particle branding. This is most useful when the customer is aware of Particle and may be using Particle's development tools with the product.

When you create your product in the dashboard, you will be asked which authentication method you want to use. Implementation of these authentication protocols will be covered later in this tutorial.

#### Building your web app

Now that you have set up your product in the dashboard, you're ready to:

[Build your web app >](build-web)

MORE
