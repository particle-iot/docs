---
title: Setting up your Particle Dashboard
columns: 2
---

As you've developed your product with Particle, you've probably become very familiar with our development tools. Now that you're transitioning to production, you're about to become very familiar with a new part of our software stack: our device dashboard.

### Introducing your dashboard

Once you're shipping your connected product at scale, you will be exposed to a whole bunch of new problems and opportunities. You'll be asking questions like:

- How many of my devices are online right now?
- Which of my customers are using their devices, and which aren't?
- What firmware versions are running on each device?
- What errors and exceptions are the devices generating?

Our device dashboard is designed to provide visibility into the state of your "fleet" of devices and provide tools to monitor and make changes to the fleet. In order to manage a fleet, you need to start by setting up an organization with Particle.

### Organizations vs. individuals

Up until now, you've been an individual user of Particle. Your devices belong to you.

Setting up an organization makes sense when your *team* and your *users* are different people.

- Your organization has a *team* with access to the dashboard.
- Your organization has *users* who are the end users of your product. If you make a connected toaster, the person who purchased the toaster is the *user*.
- *Team members* and *users* have different levels of access. For instance, only *team members* will typically be able to send an over-the-air firmware update, while only *users* may have the ability to control the product. These access levels can be controlled in the dashboard.

### Setting up an organization

Currently the organization dashboard is in private beta. If you are interested in gaining access, please contact [sales@particle.io](sales@particle.io). The dashboard will be available to everyone in Summer 2015.

### Authenticating your users

Once you have set up an organization, users will be able to create accounts on the Particle platform that are registered to your organization. When properly implemented, your users will have no idea that Particle is behind the scenes; they will feel like they are creating an account with *ACME, Inc.*.

There are three ways you can authenticate your users:

- **Simple authentication**. Your users will create an account with Particle that is registered to your organization. You will be able to see each of these users in your dashboard. You do not need to set up your own authentication system.
- **Two-legged authentication**. Your users will create an account on your servers using your own authentication system, and your web servers will create an account with Particle that is paired to that user.
- **OAuth 2.0**. Your users will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0. This is most useful when the product is reprogrammable and the user will be using Particle's development tools to reprogram it.

When you create your organization/product, you will be asked which authentication method you want to use. Implementation of these authentication protocols will be covered later in this tutorial.

### Defining a product

Our cloud platform thinks that all devices are *Photons* or *Cores* — unless it's told otherwise. Now's the time to define your own product within the platform and tell us a bit about how that product should behave.

*Photons* are development kits. They're designed to be easy to reprogram and run a variety of software applications that you, our users, develop.

Your product is (probably) not a development kit. While some of the characteristics of the development kits will carry over, you're going to want to make a bunch of changes to how your product works. These include:

- Limiting access (e.g. only certain people can reprogram them)
- Collecting bulk data, events, errors, and logs from all of your devices
- Distributing firmware updates

#### TODO

MORE
