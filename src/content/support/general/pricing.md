---
title: Pricing
layout: support.hbs
columns: two
order: 2
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

### Why is Hardware + Device Cloud presented together?
Particle Hardware and the Device Cloud are tightly
coupled and built from the ground up to work together.
The Hardware is designed specifically to work with the Device Cloud,
and the Device Cloud is designed to work specifically with Particle hardware.

When you purchase Particle development kits or connectivity modules, you are not
buying a piece of standalone silicon. Instead, you are getting a
bundle: IoT hardware that comes pre-programed to work with a full-featured Device
Cloud. This is one of the main value propositions of using Particle --
it's an integrated solution that allows you to focus on what makes
your IoT product unique.

### How am I charged for Hardware?
Hardware is purchased as a one-time cost per device.
Dev kits, modules, and accessories are sold on our <a href="https://store.particle.io"
target="_blank">store</a> as well as through our distribution partners.

You can reduce your Hardware cost-per-device by growing the
size of your fleet. Check out our <a href="https://particle.io/pricing" target="_blank">pricing page</a>
for details on specific device volume break-points.

If you are looking to purchase hardware in large volumes, check out our
<a href="https://www-wholesale.particle.io/wholesale-b2b"
target="_blank">wholesale store</a>.

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
overage rate is $0.40/MB, in 1 MB increments.

The device cloud charge occurs even if you have no data usage in a month, as the SIM is still active in the mobile carrier network. If you do not need to use the device, you can pause the SIM, which will stop billing. 

For more information on cellular billing, check out [the
guide](/tutorials/cellular-connectivity/billing).

### What about 3rd Party SIMs?
While we encourage you to use Particle SIM cards with your cellular
devices, there may be cases when you want to use a different SIM.

As a courtesy, we will wave Device Cloud fees for **up to 100 cellular
devices** that use non-Particle SIM cards. However, we do not support
cellular deployments at large scales that use non-Particle SIMs.

If you are concerned about coverage areas, we can work with you to extend
our cellular carrier network to include coverage where you need it.
<a href="https://particle.io/sales">Contact sales</a> for details.

### How does Device Cloud invoicing work?
When you first activated a cellular device or created your product,
you were put on a _billing period_. That is, you were assigned a day on which you will be
invoiced each month.

At this time, you will receive an email outlining your monthly Device
Cloud fees. Each "billable" Device will receive a line item representing
access to the Device Cloud for the _upcoming month_. There are also 2
potential types of line items that are added to invoices representing costs
incurred in the _previous month_:
- Cellular data overages accrued will be charged at the appropriate rate
  given where the data was consumed ($0.40 for most countries).
- Devices added in the middle of the month can receive a prorated
  charge representing Device Cloud access for the remainder of the
  month.

### What counts as a "billable device"?

A billable device is a device that will receive a non-zero line item for Device
Cloud access on your upcoming invoice. A billable device:

- **Has come online at least once**. We won't bill you for devices that
  haven't ever been turned on
- **Uses a Particle SIM that is in the active
  state (cellular only)**. Devices using deactivated SIMs are not billable. In addition,
  [3rd-party SIMs](#what-about-3rd-party-sims-) SIMs (100 or less) are not
  billable.
- **No longer qualifies for Device Cloud promotional pricing**. This
  includes first 3 months free for cellular devices, or first 100
  devices free for Wi-Fi.

### What if my device and Particle SIM doesn't belong to the same account?
We'd recommend correcting this if you can: things will be much easier
to track and manage if the devices and SIMs are housed either under the
same User or Product account.

However, rest assured we won't double-bill you if your devices and SIM cards happen
to be in different accounts. When an invoice is being generated, our
billing system will detect this and ensure that each device/SIM pair is
only billed once.
- If your device is in a Product and the SIM it uses is owned by a User,
  the User will pay for the device
- If your device is in a Product and the SIM is owned by a different
  product, the product owning the SIM will pay for the device

### I'm cost-conscious. What can I do to keep my bill low?
Particle supports makers, hobbyists and tinkerers alike with low-cost
development kits and generous Device Cloud freebies to make prototyping
easy and inexpensive.

Some tips to keep costs down:

- **Prototype with Wi-Fi**: Our Wi-Fi development kits are significantly less expensive
than cellular, and access to the Device Cloud is always free for your first 100 Wi-Fi devices
- **Manage cellular devices closely**: If you are using cellular, you can
  avoid Device Cloud costs by deactivating your SIM card when it is not
in use. Also, make sure to set and check the data limit on your SIM to avoid
incurring overages. For more info on reducing your cellular bill,
[check out the cellular billing
guide](/tutorials/cellular-connectivity/billing/#how-to-reduce-your-bill)
and the [cellular data guide](/tutorials/cellular-connectivity/data/#what-consumes-data-)

Doing something with Particle that makes a positive social impact? Check
out <a href="https://particle.io/for-good" target="_blank">Particle for
Good</a> to get access to special benefits and resources for approved
organizations.

### Do I have to pay anything to use Particle Mesh devices?

Pricing for mesh deployments is available by visiting http://particle.io/pricing and selecting "Mesh" from the top dropdown.

## Users vs. Products

### What is the difference between User and Product accounts?

When you first got started with Particle, you most likely bought a dev
kit or two from our hardware stores, and created a Particle username and
password in order to claim your device. This is referred to as a _User
account_. This is the account that you use to login to Particle web
properties like the Console, and what allows you to manage Particle devices
you own. For prototyping purposes, all you need to
get going with Particle are devices and a User account.

When you are ready to professionalize your IoT prototype, you'll want to
create a _Product_ and add your devices to it. A product unifies a group of Particle devices into a
homogeneous fleet, and provides additional features to easily manage an IoT deployment
at scale. A Product also has team members, which allows many Particle users to
collaborate on an IoT project together. As a user, you can _belong to_
one or more Product teams. For more information on
Products, [check out the
guide](/guide/tools-and-features/console/#product-tools).

You can think of Users and Products as two different "spaces" in which devices can
be managed. As a result, they are also billed separately from one
another. Each Product has its own Device Cloud plan, separate from the
devices that are associated with your User account.

### What caps exist for User accounts?

You are allowed to have a maximum of **100 Wi-Fi devices** and **100 Cellular
devices** claimed to your user account. Devices that have been added to a
Product **do not count** towards these totals.

We enforce these caps to ensure that you get the benefit of fleet
management features only available with Products. You can view your
User Device Cloud subscriptions on the <a href="https://console.particle.io/billing"
target="_blank">billing page</a> of the Console to
get an idea of how close you are to these caps.

Note that we count both official Particle devices + Compounds towards
these totals, categorized by connectivity type. For instance, Raspberry Pis
provisioned to the Particle Device Cloud will be counted towards your Wi-Fi
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

### I am on an annual account. What happens if I upgrade?
- You will receive a new monthly billing period that will begin the day
that the upgrade occurs.
- You will be credited for the unused time on your annual plan that will
  count towards future invoices
- You will receive your first month of Device Cloud access under the new
  pricing free

