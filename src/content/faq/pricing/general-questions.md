---
title: General Questions
layout: faq.hbs
columns: two
devices: [ photon,electron,core,raspberry-pi ]
order: 1
---

# Pricing FAQ
Before reading this FAQ, you may want to explore the <a href="https://particle.io/pricing" target="_blank">interactive pricing
page</a> on the Particle website.


## Hardware + Device Cloud Pricing

### What is Particle Hardware?
Particle Hardware refers to the official Particle development kits and
connectivity modules. Development kits are used during the early phases
of development, while connectivity modules are transitioned to when
scaling up an IoT fleet.

Particle's Hardware is designed from the ground up to work with the
Device Cloud, described below.

### What is the Device Cloud?
The Device Cloud is a powerful set of tools and infrastructure designed
to build, connect, and manage your fleet of Particle devices. It encompasses access to
Particle's cloud-side services, which includes:
- Developer tools
- Device management
- Over-the-air firmware updates
- Fully managed connectivity
- Integrations

For more information on the Device Cloud and its features, check out
<a href="https://www.particle.io/products/software/device-cloud"
target="_blank">our website</a>.

### How am I charged for Hardware?
Hardware is purchased as a one-time cost per device.
Dev kits, modules, and accessories are sold on our <a href="https://store.particle.io"
target="_blank">store</a> as well as through our distribution partners.

You can reduce your Hardware cost-per-device by growing the
size of your fleet. Check out our <a href="https://particle.io/pricing" target="_blank">pricing page</a>
for details on specific device volume break-points.

If you are looking to purchase hardware in large volumes, check out our
<a href="https://www-wholesale.particle.io/wholesale-b2b"
target="_blank">B2B store</a>.

### How am I charged for the Device Cloud?
All Device Cloud costs are captured as a single monthly fee per device
that scales with the actual size of your
fleet.

The price and what's included with the Device Cloud differs for Wi-Fi
and cellular devices:
- **Wi-Fi**: your first 100 devices are always free. Starting at the 101st
device, you will be charged $0.39 per device/mo.
- **Cellular**: The first 3 months for each device is free. After 3 months, you will be
charged $2.99 per device/mo., which includes 3MB of cellular data

You can reduce your Device Cloud cost-per-device by growing the
size of your fleet. Check out our <a href="https://particle.io/pricing" target="_blank">pricing page</a>
for details on specific device volume break-points.

### How is cellular data billed?
Cellular data is _included_ as part of access to the Device Cloud. Each
cellular device has 3MB of cellular data included per month. Regardless
of where data is consumed around the world, the first 3MB per device are
always included in the standard cellular Device Cloud rate ($2.99 per
device/month).

If your device consumes more than 3MB of cellular data in a given month,
you will be charged an overage rate per MB used. For most countries, the
overage rate is $0.40/MB.

For more information on cellular billing, check out [the
guide](/guide/getting-started/billing/electron/).

### Why is Hardware + Device Cloud presented together?
Particle Hardware and the Device Cloud are tightly
coupled and built from the ground up to work together.
The Hardware is designed specifically to work with the Device Cloud,
and the Device Cloud is designed to work specifically with Particle hardware.

When you purchase Particle development kits or connectivity modules, you are not
buying a piece of standalone silicon. Instead, you are getting a
bundle: IoT hardware that comes pre-programemd to work with a full-featured Device
Cloud. This is one of the main value propositions of using Particle --
it's an integrated solution that allows you to focus on what makes
your IoT product unique.

## Users vs. Products

### What is the difference between User and Product accounts?

When you first got started with Particle, you most likely bought a dev
kit or two from our hardware stores, and created a Particle username and
password in order to claim your device. This is referred to as a _User
account_. This is the account that you use to login to Particle web
properties like the Console, and what allows you to manage Particle devices
you own. For prototyping purposes, all you need to
get going with Particle are devices and a Developer account.

When you are ready to professionalize your IoT prototype, you'll want to
create a _Product_. A product unifies a group of Particle devices into a
homogenous fleet, and provides additional features to easily manage an IoT deployment
at scale. A Product also has team members, which allows many Particle users to
collaborate on an IoT project together. As a user, you can _belong to_
one or more Product teams. For more information on
Products, [check out the
guide](/guide/tools-and-features/console/#product-tools).

You can think of Users and Products as two different "spaces" in which devices can
be managed. As a result, they are also billed separately from one
another. Each Product is on its own Device Cloud plan, separate from the
devices that are associated with your User account.

### What caps exist for User accounts?

You are allowed to have a maximum of **100 Wi-Fi devices** and **100 Cellular
devices** claimed to your user account. Devices that have been added to a
Product **do not count** towards these totals.

We enforce these caps to ensure that you get the benefit of fleet
management features only available with Products.

Note that we count both official Particle devices + Compounds towards
these counts, categorized by connectivity type. For instance, Raspberry Pis
provisioned to the Particle Cloud will be counted towards your Wi-Fi
device count.

## Grandfathered Products

### I own a product that was created before the latest pricing change. Am I grandfathered?
Yes. All Product owners that created their Products on our legacy
pricing will remain on their existing plans. You can stay on your
current plan indefinitely.

However, there are many reasons to upgrade your Product to the new
Device Cloud pricing. These include:

- Simple and transparent single monthly cost per device that scales with the actual size of your
  fleet
- Inclusion of **3MB** of cellular data per device/mo. for cellular products
  (up from 1MB)
- No metering on number of team members or outbound events. Both are now
  unlimited.
- Access to [Device Groups](/guide/how-to-build-a-product/device-groups/),
a powerful fleet management tool previously only available to Production customers

### How can I upgrade to the new Device Cloud Pricing?
As the Product owner, you can do so on your <a href="https://console.particle.io/billing"
target="_blank">billing page</a> of the Particle Console. You will see a
section called _Grandfathered Products_ where all products on legacy
pricing will appear. Click the **Upgrade** button and follow the modal
prompts to migrate your product over to the new Device Cloud pricing:

<img src="/assets/images/pricing-faq/upgrade-product.png" />

After confirming, this will immediately move your Product to the new
Device Cloud pricing plans. In addition to the benefits of upgrading listed above,
you will also receive a credit for the unused time left on your current plan's
billing period that will deduct from future invoices.

As an added bonus, Particle will give you the remainder of the current
billing period (month) **FREE** for your current device fleet when you switch to the
new Device Cloud pricing.

### Do I still get 3MB/mo. of included cellular data for devices in a grandfathered Product?

No. The inclusion of 3MB of cellular data only applies to Products under
the new Device Cloud pricing. If your product is on a legacy plan, the
existing pricing rules still apply:

- Flat-rate (or free) for Device Cloud access
- 1MB of cellular data per SIM/mo. starting at $2.99

If you migrate your product to the new Device Cloud pricing plan, you
will start receiving 3MB of cellular data included per device/mo.

### Do I still get the reduced cellular data overage prices for devices in a grandfathered product?
Yes, the reduced overage prices (starting at $0.40/MB) will apply for
everyone, regardless of if your Product is on the new Device Cloud
pricing or not.

