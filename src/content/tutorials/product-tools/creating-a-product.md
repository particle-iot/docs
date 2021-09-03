---
title: Creating a Product
columns: two
layout: commonTwo.hbs
description: Creating your first Particle product
---

# {{title}}

Even if you're not ready to scale your product yet, it's worthwhile to start by creating a product. In order to use the Growth or Enterprise tier to scale to more than 100 devices, or add additional cellular data, you'll need a product. 

But even if you won't be scaling, you will almost certainly want one for other reasons:

- [Fleet deployment](/tutorials/device-cloud/ota-updates/#intelligent-firmware-releases), so you can release firmware to many devices at the same time.
- Upgrade firmware on offline devices, so devices can receive updates when they reconnect to the cloud.
- [Teams](/tutorials/product-tools/team-access-controls/), so multiple users can work with the product devices.
- [API users](/reference/device-cloud/api/#api-users), to allow fine-grained access control to Particle APIs from your servers.

Starting out by creating a product first will simplify things later, and also prevent having to reconfigure things, especially if you plan on using webhooks or external servers. For example, if you are using the Particle cloud API from an external server, the API endpoints are different for products than developer devices. However, once you start with product endpoints (even for a product with a single device), you can scale through the free and growth tiers, all the way up to enterprise, without having to change your code.

You can create products in the free tier, and the product and devices are still free. There is a limit of 100 devices in a free product.


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

- If you're a sole proprietor, you may create the product with your own email and Particle account, or create a separate account for better security.

- If you're a company, you may want to create a shared email or group to be the owner of all of the company products. This eliminates the need to transfer ownership if the person who created the account leaves the company.

- If you're a contractor creating a product for another company, you may want to create a new Particle account for the company to own the products. One handy trick: Create this account in an email domain that you control for initial development. When you're ready to transfer ownership of the completed project, change the email to the destination company's email domain. Doing it this way is easier than trying to extract a single product out of your account.

- When you get to the growth or enterprise tier you have an organization, which is your collection of products that belong to your company. Products can be moved into that organization easily from the product configuration.

### Team setup

Each team member will have their own email and Particle account. You can add their Particle accounts to the product from the product [Team Configuration](/tutorials/device-cloud/console/#adding-team-members).

It works best if each developer has at least one device on their desk, separate from the product device fleet. This allows easy access to the buttons on the device and the USB serial debug log. It also makes flashing the device easier. 

You may have a testing device fleet in your product for quality assurance testing that is shared by multiple team members, but also having individual developer devices makes the workflow easier.

In the growth and enterprise tiers the organization also has a team. You can have organization team members as well as product-specific team members that only have access to a specific product.

## Device claiming

One major difference between developer devices and products is with device claiming. There are several options:

- Leave product devices unclaimed. This is a good option if the device does not need to subscribe to Particle events using [`Particle.subscribe()`](/cards/firmware/cloud-functions/particle-subscribe/). This include subscribing to the replies from a webhook. If you need to receive events, then you cannot use this option.

- Claim all devices to a single account. This is a common option for cellular products. The single owner account, which could also be the product owner account, claims all devices. There's full support for receiving events with this option.

- Customer claiming. This is a more common for Wi-Fi products that create separate customer accounts for each customer. These can either be simple auth or two-legged shadow customers. It is also possible, but less common, to use this option for cellular devices.

- Developer team members may want to claim the test devices on their desks to their own account rather than a single account or customer account. This simplifies flashing firmware to their devices.

## Development Tools

### Workbench

[Particle Workbench](/tutorials/developer-tools/workbench/) is the recommended tool for creating and building product firmware. Using a source code control system like git with Workbench has a number of benefits:

- Full log of every code change that has been made.
- Great support for teams, including merging changes made by multiple team members.
- Release management to keep track of your software releases to your product device fleet.
- Better flexibility for libraries and shared code.

Additionally, there is good integration between git and Microsoft Visual Studio Code (vscode, which is what underlies Particle Workbench), making it easy to use git.

One popular provider of git source code repositories is Github. You can have private projects (repositories) in Github where you only allow certain users access, even in the free tier of Github. Each developer will have their own Github account. This could either be the same account email used for their Particle account, or a separate Github account at a different email. They do not need to be the same.

Or course you can use other source code control systems if you prefer.

#### Compilers for Workbench

Particle Workbench supports two ways of compiling your source code:

- Cloud compile uses the same compilers that are used by the Web IDE and the Particle CLI. Your source code is uploaded to the cloud servers, compiled, and the resulting binary either flashed to devices OTA directly from the cloud, or a binary is downloaded back to your computer.

- Local compiler toolchain uses the same compiler toolchain (gcc ARM) as the cloud compiler, but loads the native versions of the toolchain for Windows, Linux, or Mac onto your computer and does the compilation on your computer. Your source code does not leave your computer in this scenario.

The local compiler may be necessary for very large projects, but otherwise you can generally switch back and forth between cloud and local without difficulties. On Windows in particular, the first build will take a very long time because all of Device OS needs to be built. The launching of the compiler, which must be done a very large number of times, occurs much more quickly under Linux and Mac, which is why those local builds are faster. When possible, we recommend using Linux or Mac for this reason.

### Web IDE

The Particle Web IDE can be used to create product firmware, but it's recommended that you use Particle Workbench. It's difficult to share code between multiple users in the Web IDE, and there is no version control.

### Particle CLI

It's also possible to use a different code editor and version control system and still use the [Particle command line interface](/reference/developer-tools/cli/) and cloud compilers to build your code.

## Libraries

In many cases you will use third-party libraries in your product firmware. 

### Particle library system

It is possible to use libraries as you have with development devices. In the Web IDE, using the Libraries icon. In Particle Workbench, **Particle: Install Library**. You can also use `particle library add` in the Particle CLI, or manually edit the project.properties file in your Workbench or Particle CLI project.

One thing to beware of: If you have a project.properties file containing a library in the dependencies section of the file, and you also installed a copy using **Particle: Install Library** or `particle library copy` you will end up with both the source code in the lib directory, and a definition in project.properties. When you build locally, the version in the lib directory is used. When you cloud build, the lib directory is uploaded, but the official version in project.properties is used. If you are locally modifying libraries in the lib directory, be sure the remove the library from project.properties to avoid building the wrong version.

You can search popular public libraries from the [library search tool](/cards/libraries/search/).

### Github (single project)

In some cases, instead of committing the project.properties file to your Github repository, you may prefer to commit the `lib` directory instead. This allows a single git clone operation to obtain all of the files for building your application. It also assures consistent building for both local and cloud builds.

### Github (submodules)

However, if you have more than one project, this will result in a large number of copies of common files, which is best to avoid. Fortunately, git supports [submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules), which allows a project repository to include a reference to another git repository, along with the version to use. Then when the library is cloned, you simply also clone all of the submodules:

```
git submodule update --init --recursive
```

- This is the technique used by the Tracker Edge firmware to pull in libraries into the lib directory of Tracker Edge projects.
- It leverages git for storing libraries, instead of the Particle library system.
- Because of this, it's significantly easier to use your own fork of a public library with your own changes.
- It's a good way to share proprietary code between your own projects.

For example, if you have a custom set of proprietary utilities in your company that are shared between multiple projects, the Particle library system is not ideal because there are only two levels of access: public (everyone) and private (one account). Since there are no team or organization libraries, using git is often a better way to control access to the libraries that  are not public.

It works well to create the lib directory in your project, then use submodules for each "library" that you want to include in your project. This is how the [Tracker Edge firmware](https://github.com/particle-iot/tracker-edge) is designed. Within each "library" it should follow the format of Particle libraries, that is to say containing a directory called "src" with the source code for that submodule.


### GPL and LGPL

Beware of libraries that have GPL (GNU public license) or LGPL licensing if your project will be closed-source. In almost all cases, this will violate the license of the library. This is true even for LGPL, because of the static linking restriction. 

Particle Device OS contains code that is LGPL licensed, but can be used in closed-source projects because Device OS is dynamically linked to your project. 

Libraries, on the other hand, are statically linked to your application. Thus you cannot use the library exemption in LGPL to avoid open-sourcing your proprietary source code.



## Build workflow

### Individual developer

Individual developers generally test with a device on their desk, when possible. This allows easy access to the buttons and the USB serial debug console output. If you have more than one product, one product per device is ideal, but you could switch between products if specialized hardware is not required.

- The device is still added to its product so it can have access to product webhooks and other product features.
- However, it is marked as **Development Device** so firmware flashing is not controlled from the console, but allows for local USB and OTA flashing of the single device.
- Often, the developer will claim the device to their own account, not a product shared account or left unclaimed. This allows for OTA flashing of the device by the developer. 
- If you are flashing by USB you don't have to claim the device to your own account, but you do still need to mark it as a Development Device in the product, otherwise as soon as it connects to the cloud the cloud will flash the standard product firmware to it.
- This provides the most rapid write-test-debug cycles, but is not the only way to develop product software.

### QA testing

Once the product firmware passes the development and initial testing, it may be desirable to deploy it to a test fleet. 

To do this, you build a firmware binary (in Workbench, Web IDE, or CLI), then upload it to the console. Then you can release it to a single device or device group. This exercises the whole upgrade process in the same way that it would be for your customers.

If you don't have a dedicated QA department, you still could use this model if you have a team of developers that share devices for testing code before wide-scale deployment.

### Release to fleet

Finally, once you've tested the binary and upgrade process, you can then flash to a large device group, or to the entire fleet of product devices.

## Events

Events, using [`Particle.publish()`](/cards/firmware/cloud-functions/particle-publish/), from a device or from the cloud API, are a way to communicate from one device to many subscribers. By default, events are private, meaning they go only to the same owner account as it was sent from. For devices, this is the account that claimed the device. For the API, this is the account that created the access token.

Since unclaimed product devices don't have a device owner, they cannot receive private events. This includes events sent from other devices, the cloud API, or webhook responses.

Additionally, when a device is in a product, when it publishes events they not only go to the private event stream of the device owner (if claimed), but also to the product event stream.

The product event stream is unidirectional, from the device to the cloud. Product devices cannot receive product events.

You typically use product events to handle events from devices by webhooks or the server-sent-events stream. This allows the product creator to handle events from any device in the product, regardless of who claimed it, or if it's unclaimed.

### Viewing events

Within [the console](https://console.particle.io) there are a number of Events pages, so make sure you are viewing the correct one:

#### Developer events

- In the top level of the console, **Events** tab displays the events for that account, including from devices claimed to that account or generated from the API using the developer events endpoint and an access token for this user. You will not see unclaimed product device events here.

- In the top level of the console, if you select the **Devices** tab and then open the device, there will be a log of events generated by that device. Note that this will not show integration response events.

- In **Integrations** in your developer sandbox, when you open an integration you can see the 10 most recent requests and response that triggered the integration, but no other events.


#### Product events

If you open a product (either sandbox or organization), you will see similar tabs within the product including the Devices, Events, and Integration icons, but these are for that specific product, not the developer account!

- Inside a product, **Events** displays product events, including events generated by devices within the product, as well as integration responses generated for product integrations. This includes events generated by unclaimed product devices.

- Inside a product, if you select the **Devices** tab and then open the device, there will be a log of events generated by that device. Note that this will not show integration response events. Note that Tracker products do not have a per-device event log; instead the device map and settings appear here.

- Inside a product, if you select **Integrations**, when you open an integration you can see the 10 most recent requests and response that triggered the integration, but no other events.

## Integrations

If you are using Integrations, including Webhooks, there are two different places you can create them, which can lead to confusion.

### Product integrations

The recommended location for webhooks for product devices is within the product configuration. Product integrations can be triggered for any device in the product device fleet, including development devices and unclaimed devices. Make sure you are opening the Integrations tab after going into the product to see this list.

This is necessary if you are using product customers, where claiming will occur to many accounts. Since product customers cannot log into the console, they do not have customer-specific integrations.

Unclaimed product devices cannot receive the response from a product webhook, but they can still send to the webhook.

### Device owner integrations

An integration in the device owner's account can also trigger for a product device event. This is generally not the best place to put the integration, even if you are claiming devices to a single account, as it means development devices must be claimed to the shared account, which is inconvenient for OTA flashing during development.

One use-case of a device owner integration is when a developer is making a new or upgraded product webhook. They could implement it in their own account and test, then copy and paste it into the production product integration when released to the fleet.

Beware: If you have two integrations, one in the owner account and one in the product, both can fire if they have the same event trigger!




