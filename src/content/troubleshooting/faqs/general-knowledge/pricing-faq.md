---
title: Pricing FAQ
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

Below are some commonly asked questions with respect to Particle's pricing model (announced at Spectra, March 2021).

## What is the new pricing model that was announced?

Particle announced a new pricing model at Spectra, March 2021, the details of which can be found [here](https://particle.io/pricing). This pricing model is divided into three plans: 

* A **Free plan** \- a user operating within the bounds of the Sandbox (a free development space limited to under 100k Data Operations per month and up to 100 devices) can develop without incurring billing.
* A **Growth plan** \- as a given user scales their project, they may wish to opt into support for a larger number of Data Operations and/or devices. Growth Plan users pay for usage in blocks. Each block includes 720k Data Operations per month and allows 100 devices to access the Particle Cloud.
* An **Enterprise plan** \- offering customer Data Operations volume, Premium 24/7 dedicated support, volume discounts, and access to turnkey design and manufacturing services.

Please see the link above and questions below for more details.

## What is a block?

A **block** is a bundle of an additional 720k Data Operations and support for an additional 100 devices. A block is further inclusive to 540 MB of cellular data for cellular devices. 

## What is a data operation and how can I keep track of my consumption?

Each Particle Publish, Subscribe, Function, or Variable consumes one Data Operation regardless of size (currently limited to 622 bytes per operation). In the Console, the user-initiated Ping and Signal buttons are metered as well.

The following do not count against your Data Operations limit:

* Over-the-air firmware updates do not count against your Data Operations limit
* Acknowledgements, session negotiation, device vitals, keep-alives etc. do not count against your Data Operations limit
* Webhooks and server-sent-events (SSE) do not count against your Data Operations limit
* Particle cloud API calls do not count against your Data Operations limit

The[ Particle Console](http://console.particle.io) lists the three limits you will most likely encounter:

* The number of devices (Cellular or Wi-Fi).
* For Free and Growth plans, the number of Data Operations consumed this billing month (for Enterprise plans, Data Operations reporting will be annual). Data Operation reporting will be near real-time, but up to 30 minutes behind.
* For Free and Growth plans, the number of MB of cellular usage this billing month (for Enterprise plans, data usage reporting will be annual). Note that the cellular data usage is not real-time. It can take at least 24 hours, and in some cases may lag several days behind actual usage.

### For a data operations calculator, please follow the link [here](/getting-started/cloud/introduction/#pricing).

For questions regarding the technical specifications of a Data Operation, please review our documentation [here](/getting-started/cloud/introduction/#pricing). 

## How much can one expect to pay per plan?

**Free plan** users (users operating within the bounds of the Sandbox, as defined above), will not be charged as per the terms of the Sandbox.

**Growth plan** users should refer to [Particle's pricing page](https://particle.io/pricing) for more information about the pricing of blocks based on Particle device type.

Potential **Enterprise plan** users should contact Sales in order to determine this information. Existing Enterprise plan users are always encouraged to contact their Customer Success Manager for any questions they may have about the new pricing model. 

## How can I determine what plan I belong to?

You can find your plan in billing page in our Console ([console.particle.io](https://console.particle.io)) and if you cross the thresholds of usage, our UI will provide you with a warning.

## How can I sign up for the growth plan?

To upgrade to the Growth plan, enter your email address at [https://particle.io/upgradetogrowth](https://particle.io/upgradetogrowth)!

## How am I billed while on the growth plan?

* Your Growth account will be billed at the start of each month for the number of blocks allocated.
* If your usage at the end of the month exceeds the number of blocks allocated, you will be billed at the end of the month for any additional blocks used.
* When an overage occurs, your subscription will be updated to reflect the number of blocks used the previous month in order to avoid future overages.

If you would like to lower your block usage in a given month, please contact the [support team](https://support.particle.io)**.**

## How do I create a product for my growth plan devices?

Growth Plan devices are housed within an Organization. An Organization is space set aside for you in your Console **outside** of your Sandbox once you complete the Growth Plan transition process. You can read more about Organizations [here](/getting-started/products/organizations/).

Organizations consist of one or many Particle Products. Products are a schema designed to house and manage similarly-behaving Particle devices at scale. In order to use Particle's Growth Plan, you will need to create at least one Product for Particle to migrate into your new Organization. You can read more about Products [here](/getting-started/products/introduction-to-products/#introduction).

To create a Product, log into your Particle Console and select the Product icon on the left-hand side:  
  
![Screen_Shot_2021-07-23_at_1.03.15_PM.png](/assets/images/support/Screen_Shot_2021-07-23_at_1.03.15_PM.png)

The Product icon is the icon with the 3 small boxes, depicted above.

Once you've entered this screen, click "+ New Product" on the right-hand side:

![Screen_Shot_2021-07-23_at_1.02.38_PM.png](/assets/images/support/Screen_Shot_2021-07-23_at_1.02.38_PM.png)

and fill in all of the required fields:

![Screen_Shot_2021-07-23_at_1.04.00_PM.png](/assets/images/support/Screen_Shot_2021-07-23_at_1.04.00_PM.png)

Congratulations, you've created your first Product! Take note of its ID, located in the top left of the page header, next to a small key icon. **You will need to provide Particle with this ID number to migrate this Product from your Sandbox to your Growth Plan Organization.**

You're almost there! Now you need to migrate the relevant devices into your Product. Please be aware that Products only support one device type (e.g. "Tracker" or "Boron"), so you may need to create multiple Products to support a more varied Growth Plan fleet!

Adding devices to a Product is easy - gather a list of Device IDs, either by hand or [with our API](/getting-started/products/introduction-to-products/#introduction), and then navigate to the Devices page of your Product (https://console.particle.io/:your ProductID/devices). Select "Add Devices" on the right-hand side of the page, and follow the instructions to add one or many devices into your new Product!

## How is my growth plan billed?

Growth plan is billed at the beginning of your monthly beginning cycle for a set amount of blocks. At the end of your billing cycle, your usage is evaluated and if you are over your allocated blocks, you will be invoiced for the extra blocks needed to cover your usage. In addition we will update the number of blocks to be charged for your subsequent billing cycle to the amount used in the previous cycle. 

## If I would like to cancel my billing, what steps must I take?

The majority of Particle users will be moved to the Free plan. If your account belongs to the Free plan, you will not be charged and you need to take no action to suspend further billing.

If you have received notice from Particle via email that your account's current usage exceeds the boundaries of the Free Plan but would like to urgently cancel your billing, the prior model for billing cancellation will remain in effect until the rollout of the Growth plan in Summer 2021\. See [here ](/troubleshooting/faqs/general-knowledge/how-can-I-cancel-billing/)for information about how to proceed. 

## Are there any restrictions on device data usage outside of the Particle cloud?

For Wi-Fi devices (Photon, P1, Argon) there is no limit for direct TCP or UDP data communications, or services that are based on direct communication such as Blynk.

For cellular devices, there is a data limit depending on your pricing plan. The following cellular data limits are pooled across all devices and include all data usage including Data Operations, OTA updates, messaging overhead, and messaging to 3rd-party services:

* Free Plan: 100 MB cellular data per month
* Growth Plan: 540 MB cellular data per block per month
* Enterprise Plan: varies by pricing tier, [contact Particle Sales](http://particle.io/sales) to learn more

## How can I optimize my data operation consumption?

Please see our documentation [here](/getting-started/cloud/introduction/#minimizing-data-operations) for suggested practices to reduce Data Operation consumption. 

## What happens if I cross my data operations threshold?

**Free plan** users who require more Data Operations and/or support for more devices will need to upgrade to the Growth plan. Should you exceed 100K Data Operations, you will be warned and given a 3 day grace period to upgrade your account to a paid plan. If you don’t upgrade in 3 days and your monthly billing cycle on the Free plan doesn’t reset then all communications between your devices and the Particle cloud will be paused until the end of the billing month, when they will be resumed. You cannot add more Data Operations to the Free plan.

In the **Growth plan**, if you use more than your current allotment of Data Operations and/or devices, another block will be automatically used and you will be charged for it at the end of the month. In addition, for the subsequent month, we will update the number of blocks you need and charge you for it.

In the **Enterprise plan**, the number of Data Operations is pooled annually across all devices, instead of monthly in the Free and Growth plans. Please contact your Customer Success Manager for questions about overages. 

## What happens if I cross my device cap threshold?

You cannot add more than 100 devices to the **Free plan**. You instead will need to upgrade to the Growth plan. Free plan users are encouraged to unclaim unused devices if necessary.

You can have any number of devices in the **Growth plan**, but you will need to purchase another block for each group of 100 devices. It's not possible to purchase a fractional block for devices only; each block includes a maximum number of devices, Data Operations, and cellular data usage, and exceeding any one limit will require purchasing an additional block. If you exceed the device cap in the Growth plan mid-cycle, you will be charged for the extra block used at the end of the month, and your total number of blocks used for the subsequent month will be updated and charged.

There is no limit to the number of blocks you can purchase in the Growth plan, however upgrading to an Enterprise contract can reduce the cost.

## What happens if I cross my cellular data threshold?

In the **Free plan**, if you exceed the pooled monthly data quota, then all communications between your devices and the Particle cloud will be paused until the end of the billing month, when they will be resumed. It is not possible to add more data to the free plan.

In the **Growth plan**, if you use more than your current allotment of cellular data another block will be automatically used and you will be charged for it at the end of the month. In addition, for the subsequent month, we will update the number of blocks you need and charge you for it. 

In the **Enterprise plan**, the amount of cellular data is pooled annually across all devices, instead of monthly in the Free and Growth plans. Please contact your Customer Success Manager for questions about overages.
  
  
