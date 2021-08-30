---
title: First product
columns: two
layout: commonTwo.hbs
description: Creating your first Particle product
---

# {{title}}

Even if you're not ready to scale your product, it's worthwhile to start by creating a product. You'll eventually need one to scale above 100 devices, and you will almost certainly want one for other reasons:

- Fleet deployment, so you can release firmware to many devices at the same time.
- Upgrade offline devices, so devices can receive updates when they reconnect to the cloud.
- Teams, so multiple users can work with the product devices.
- API users, to allow fine-grained access control to Particle APIs from your servers.

Starting out by creating a product first will simplify things later, and also prevent having to reconfigure things, especially if you plan on using webhooks or external servers. For example, if you are using the Particle cloud API from an external server, the API endpoints are different for products than developer devices. However, once you start with product endpoints (even for a single device), you can scale through the free and growth tiers, all the way up to enterprise, without having to change your code.

## Setting up your product

### Create a product

To create a product, open the [Particle console](https://console.particle.io/) and click on the **New Product** button.

![Your product page](/assets/images/products-page.png)

This will open up a modal where you can add basic details about your product:

![A new product](/assets/images/new-product-modal.png)

Note that the product name must be unique across all products and users of the Particle cloud. It is possible to change the display name later from the **Settings** tab of the product. 

**Each product can only contain one type of device**

For example, the Boron, B Series SoM (4xx), and B Series SoM (5xx) are three different device types and thus must be in separate products. The reason is that different device types are compiled for different platforms, and a product can only have a single binary for each version released. 

The Electron and E Series, however, are the same platform and can share a single product. The Tracker SoM and Tracker One are also the same platform and can share a product.

**Each product has an owner**

The owner is the user who initially created the product. To transfer a product to another user later requires a support ticket, so it's best to choose this wisely to begin. Some common scenarios:

- If you're a sole proprietor, you may just create the product with your own email and Particle account, or create a separate account for better security.

- If you're a company, you may want to create a shared email or group to be the owner of all of the company products. This eliminates the need to transfer ownership if the person who created the account leaves the company.

- If you're a contractor creating a product for another company, you may want to create a new Particle account for the company to own the products. One handy trick: Create this account in an email domain that you control for initial development. When you're ready to transfer ownership of the completed project, change the email to the destination company's email domain. Doing it this way is way easier than trying to extract a single product out of your account.


### Team setup

Each team member will have their own email and Particle account. You can add their Particle accounts to the product from the product [Team Configuration](/tutorials/device-cloud/console/#adding-team-members).

It works best if each developer has at least one device on their desk, separate from the product device fleet. This allows easy access to the buttons on the device and the USB serial debug log. It also makes flashing the device easier. 

You may have a testing device fleet in your product for quality assurance testing that is shared by multiple team members, but also having individual developer devices makes the workflow easier.

## Device claiming

One major difference between developer devices and products is with device claiming. There are several options:

- Leave product devices unclaimed. This is a good option if the device does not need to subscribe to Particle events using [`Particle.subscribe()`](/cards/firmware/cloud-functions/particle-subscribe/). This include subscribing to the replies from a webhook. If you need to receive events, then you cannot use this option.

- Claim all devices to a single account. This is a common option for cellular products. The single owner account, which could also be the product owner account, claims all devices. There's full support for receiving events with this option.

- Customer claiming. This is a more common for Wi-Fi products that create separate customer accounts for each customer. These can either be simple auth or two-legged shadow customers. It is also possible, but less common, to use this option for cellular devices.

- Developer team members may want to claim the test devices on their desks to their own account rather than a single account or customer account. This simplifies flashing firmware to their devices.

## Development Tools

### Workbench

[Particle Workbench](/tutorials/developer-tools/workbench/) is the recommended tool for creating and building product firmware. Using a source code control system like Github with Workbench has a number of benefits:

- Full log of every code change that has been made.
- Great support for teams, including merging changes made by multiple team members.
- Release management to keep track of your software releases to your product device fleet.
- Better flexibility for libraries and shared code.

Additionally, there is good integration between Github and Microsoft Visual Studio Code (vscode, which is what underlies Particle Workbench), making it easy to use Github.

Note that you can have private projects (repositories) in Github where you only allow certain users access, even in the free tier of Github.

Each developer will have their own Github account. This could either be the same account email used for their Particle account, or a separate Github account at a different email. They do not need to be the same.

### Web IDE

The Particle Web IDE can be used to create product firmware, but it's recommended that you use Particle Workbench. It's difficult to share code between multiple users in the Web IDE, and there is no version control.

### Particle CLI

It's also possible to use a different code editor and version control system and still use the Particle command line interface and cloud compilers to build your code.

## Libraries

In many cases you will use third-party libraries in your product firmware. 

### Particle library system

It is possible to use libraries as you have with development devices. In the Web IDE, using the Libraries icon. In Particle Workbench, **Particle: Install Library**. You can also use `particle library add` in the Particle CLI, or manually edit the project.properties file in your Workbench or Particle CLI project.

### Github (single project)


### Github (submodules)


### GPL and LGPL

Beware of libraries that have a GPL (GNU public license) or LGPL licensing if your project will be closed-source. In almost all cases, this will violate the license of the library. This is true even for LGPL, because of the static linking restriction. 

Particle Device OS contains code that is LGPL licensed, but can be used in closed-source projects because Device OS is dynamically linked to your project. 

Libraries, on the other hand, are statically linked to your application. This you cannot use the library exemption in LGPL to avoid open-sourcing your proprietary source code.








