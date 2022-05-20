---
title: Pricing FAQ
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Below are some commonly asked questions with respect to Particle's pricing model (announced at Spectra, March 2021).

* [What is the new pricing model that was announced?](https://support.particle.io/hc/en-us/articles/360039741073#what-is-the-new-pricing-model-that-was-announced)
* [What is a block?](https://support.particle.io/hc/en-us/articles/360039741073#what-is-a-block)
* [What is a Data Operation and how can I keep track of my consumption?](https://support.particle.io/hc/en-us/articles/360039741073#what-is-a-data-operation-and-how-can-i-keep-track-of-my-consumption)
* [How much can one expect to pay per plan?](https://support.particle.io/hc/en-us/articles/360039741073#how-much-can-one-expect-to-pay-per-plan)
* [How can I determine what plan I belong to?](https://support.particle.io/hc/en-us/articles/360039741073#how-can-i-determine-what-plan-i-belong-to)
* [How can I sign up for the Growth plan?](https://support.particle.io/hc/en-us/articles/360039741073#how-can-i-sign-up-for-the-growth-plan)
* [How am I billed while on the Growth plan?](https://support.particle.io/hc/en-us/articles/360039741073#how-am-i-billed-while-on-the-growth-plan)
* [How do I create a Product for my Growth plan devices?](https://support.particle.io/hc/en-us/articles/360039741073#how-do-i-create-a-product-for-my-growth-plan-devices)
* [If I would like to cancel my billing, what steps must I take?](https://support.particle.io/hc/en-us/articles/360039741073#if-i-would-like-to-cancel-my-billing-what-steps-must-i-take)
* [Are there any restrictions on the device data usage outside of the Particle Cloud?](https://support.particle.io/hc/en-us/articles/360039741073#are-there-any-restrictions-on-device-data-usage-outside-of-the-particle-cloud)
* [How can I optimize my Data Operation consumption?](https://support.particle.io/hc/en-us/articles/360039741073#how-can-i-optimize-my-data-operation-consumption)
* [What happens if I cross my Data Operation threshold?](https://support.particle.io/hc/en-us/articles/360039741073#what-happens-if-i-cross-my-data-operations-threshold)
* [What happens if I cross my device cap threshold?](https://support.particle.io/hc/en-us/articles/360039741073#what-happens-if-i-cross-my-device-cap-threshold)
* [What happens if I cross my cellular data threshold?](https://support.particle.io/hc/en-us/articles/360039741073#what-happens-if-i-cross-my-cellular-data-threshold)

## What Is The New Pricing Model That Was Announced?

Particle announced a new pricing model at Spectra, March 2021, the details of which can be found [here](https://particle.io/pricing). This pricing model is divided into three plans: 

* A **Free plan** \- a user operating within the bounds of the Sandbox (a free development space limited to under 100k Data Operations per month and up to 100 devices) can develop without incurring billing.
* A **Growth plan** \- as a given user scales their project, they may wish to opt into support for a larger number of Data Operations and/or devices. Growth Plan users pay for usage in blocks. Each block includes 720k Data Operations per month and allows 100 devices to access the Particle Cloud.
* An **Enterprise plan** \- offering customer Data Operations volume, Premium 24/7 dedicated support, volume discounts, and access to turnkey design and manufacturing services.

Please see the link above and questions below for more details.

## What Is A Block?

A **block** is a bundle of an additional 720k Data Operations and support for an additional 100 devices. A block is further inclusive to 540 MB of cellular data for cellular devices and 1.5 GB for Tracker devices. 

## What Is a Data Operation And How Can I Keep Track Of My Consumption?

Each Particle Publish, Subscribe, Function, or Variable consumes one Data Operation regardless of size (currently limited to 622 bytes per operation). In the Console, the user-initiated Ping and Signal buttons are metered as well.

The following do not count against your Data Operations limit:

* Over-the-air firmware updates do not count against your Data Operations limit
* Acknowledgements, session negotiation, device vitals, keep-alives etc. do not count against your Data Operations limit
* Webhooks and server-sent-events (SSE) do not count against your Data Operations limit
* Particle cloud API calls do not count against your Data Operations limit

The[ Particle Console](http://console.particle.io) lists the three limits you will most likely encounter:

* The number of devices (Cellular, Wi-Fi, and Tracker).
* For Free and Growth plans, the number of Data Operations consumed this billing month (for Enterprise plans, Data Operations reporting will be annual). Data Operation reporting will be near real-time, but up to 30 minutes behind.
* For Free and Growth plans, the number of MB of cellular usage this billing month (for Enterprise plans, data usage reporting will be annual). Note that the cellular data usage is not real-time. It can take at least 24 hours, and in some cases may lag several days behind actual usage.

### For a Data Operations Calculator, please follow the link [here](https://docs.particle.io/tutorials/device-cloud/introduction/#pricing).

For questions regarding the technical specifications of a Data Operation, please review our documentation [here](https://docs.particle.io/tutorials/device-cloud/introduction/#pricing). 

## How Much Can One Expect To Pay Per Plan?

**Free plan** users (users operating within the bounds of the Sandbox, as defined above), will not be charged as per the terms of the Sandbox.

**Growth plan** users should refer to [Particle's pricing page](https://particle.io/pricing) for more information about the pricing of blocks based on Particle device type.

Potential **Enterprise plan** users should contact Sales in order to determine this information. Existing Enterprise plan users are always encouraged to contact their Customer Success Manager for any questions they may have about the new pricing model. 

## How Can I Determine What Plan I Belong To?

If you are a **current customer,** Particle will reach out via email to notify you of the status of your account. If you haven’t heard from us, please check your Spam folder and then contact support via a support ticket ([support.particle.io](https://support.particle.io)). Particle’s new pricing model allows developers to use our products free with no charges for up to 100 devices and 100k Data Operations.

Many of our existing users will belong to the Free Plan. We will email those customers whose current practices exceed the Sandbox limits about the process of moving to the Growth Plan. Enterprise Plan Customers will be in touch with their Customer Success Manager directly with more information.

If you are a new customer, we encourage you to start developing within the free Sandbox. You will be able to see your monthly usage on the billing page in our Console ([console.particle.io](https://console.particle.io)) and if you cross the thresholds of usage, our UI will provide you with a warning.

## How Can I Sign Up For The Growth Plan?

To upgrade to the Growth plan, enter your email address at <https://particle.io/upgradetogrowth>!

## How am I billed while on the Growth plan?

* Your Growth account will be billed at the start of each month for the number of blocks allocated.
* If your usage at the end of the month exceeds the number of blocks allocated, you will be billed at the end of the month for any additional blocks used.
* When an overage occurs, your subscription will be updated to reflect the number of blocks used the previous month in order to avoid future overages.

If you would like to lower your block usage in a given month, please contact the [support team](https://support.particle.io)**.**

## How Do I Create A Product For My Growth Plan Devices?

Growth Plan devices are housed within an Organization. An Organization is space set aside for you in your Console **outside** of your Sandbox once you complete the Growth Plan transition process. You can read more about Organizations [here](https://docs.particle.io/tutorials/product-tools/organizations/).

Organizations consist of one or many Particle Products. Products are a schema designed to house and manage similarly-behaving Particle devices at scale. In order to use Particle's Growth Plan, you will need to create at least one Product for Particle to migrate into your new Organization. You can read more about Products [here](https://docs.particle.io/tutorials/product-tools/introduction/#introduction).

To create a Product, log into your Particle Console and select the Product icon on the left-hand side:  
  
![Screen_Shot_2021-07-23_at_1.03.15_PM.png](/assets/images/support/Screen_Shot_2021-07-23_at_1.03.15_PM.png)

The Product icon is the icon with the 3 small boxes, depicted above.

Once you've entered this screen, click "+ New Product" on the right-hand side:

![Screen_Shot_2021-07-23_at_1.02.38_PM.png](/assets/images/support/Screen_Shot_2021-07-23_at_1.02.38_PM.png)

and fill in all of the required fields:

![Screen_Shot_2021-07-23_at_1.04.00_PM.png](/assets/images/support/Screen_Shot_2021-07-23_at_1.04.00_PM.png)

Congratulations, you've created your first Product! Take note of its ID, located in the top left of the page header, next to a small key icon. **You will need to provide Particle with this ID number to migrate this Product from your Sandbox to your Growth Plan Organization.**

You're almost there! Now you need to migrate the relevant devices into your Product. Please be aware that Products only support one device type (e.g. "Tracker" or "Boron"), so you may need to create multiple Products to support a more varied Growth Plan fleet!

Adding devices to a Product is easy - gather a list of Device IDs, either by hand or [with our API](https://docs.particle.io/tutorials/product-tools/introduction/#introduction), and then navigate to the Devices page of your Product (https://console.particle.io/:your ProductID/devices). Select "Add Devices" on the right-hand side of the page, and follow the instructions to add one or many devices into your new Product!

## How is my Growth plan billed?

Growth plan is billed at the beginning of your monthly beginning cycle for a set amount of blocks. At the end of your billing cycle, your usage is evaluated and if you are over your allocated blocks, you will be invoiced for the extra blocks needed to cover your usage. In addition we will update the number of blocks to be charged for your subsequent billing cycle to the amount used in the previous cycle. 

## If I Would Like To Cancel My Billing, What Steps Must I Take?

The majority of Particle users will be moved to the Free plan. If your account belongs to the Free plan, you will not be charged and you need to take no action to suspend further billing.

If you have received notice from Particle via email that your account's current usage exceeds the boundaries of the Free Plan but would like to urgently cancel your billing, the prior model for billing cancellation will remain in effect until the rollout of the Growth plan in Summer 2021\. See [here ](https://support.particle.io/hc/en-us/articles/360044518993)for information about how to proceed. 

## Are There Any Restrictions On Device Data Usage Outside Of The Particle Cloud?

For Wi-Fi devices (Photon, P1, Argon) there is no limit for direct TCP or UDP data communications, or services that are based on direct communication such as Blynk.

For cellular devices, there is a data limit depending on your pricing plan. The following cellular data limits are pooled across all devices and include all data usage including Data Operations, OTA updates, messaging overhead, and messaging to 3rd-party services:

* Free Plan: 100 MB cellular data per month
* Growth Plan: 540 MB cellular data per block per month (1.5 GB for Tracker)
* Enterprise Plan: varies by pricing tier, [contact Particle Sales](http://particle.io/sales) to learn more

## How Can I Optimize My Data Operation Consumption?

Please see our documentation [here](https://docs.particle.io/tutorials/device-cloud/introduction/#minimizing-data-operations) for suggested practices to reduce Data Operation consumption. 

## What Happens If I Cross My Data Operations Threshold?

**Free plan** users who require more Data Operations and/or support for more devices will need to upgrade to the Growth plan. Should you exceed 100K Data Operations, you will be warned and given a 3 day grace period to upgrade your account to a paid plan. If you don’t upgrade in 3 days and your monthly billing cycle on the Free plan doesn’t reset then all communications between your devices and the Particle cloud will be paused until the end of the billing month, when they will be resumed. You cannot add more Data Operations to the Free plan.

In the **Growth plan**, if you use more than your current allotment of Data Operations and/or devices, another block will be automatically used and you will be charged for it at the end of the month. In addition, for the subsequent month, we will update the number of blocks you need and charge you for it.

In the **Enterprise plan**, the number of Data Operations is pooled annually across all devices, instead of monthly in the Free and Growth plans. Please contact your Customer Success Manager for questions about overages. 

## What Happens If I Cross My Device Cap Threshold?

You cannot add more than 100 devices to the **Free plan**. You instead will need to upgrade to the Growth plan. Free plan users are encouraged to unclaim unused devices if necessary.

You can have any number of devices in the **Growth plan**, but you will need to purchase another block for each group of 100 devices. It's not possible to purchase a fractional block for devices only; each block includes a maximum number of devices, Data Operations, and cellular data usage, and exceeding any one limit will require purchasing an additional block. If you exceed the device cap in the Growth plan mid-cycle, you will be charged for the extra block used at the end of the month, and your total number of blocks used for the subsequent month will be updated and charged.

There is no limit to the number of blocks you can purchase in the Growth plan, however upgrading to an Enterprise contract can reduce the cost.

## What Happens If I Cross My Cellular Data Threshold?

In the **Free plan**, if you exceed the pooled monthly data quota, all SIMs in your account will be paused until the end of the billing month, when they will be resumed. It is not possible to add more data to the Free plan.

In the **Growth plan**, if you use more than your current allotment of cellular data another block will be automatically used and you will be charged for it at the end of the month. In addition, for the subsequent month, we will update the number of blocks you need and charge you for it. 

In the **Enterprise plan**, the amount of cellular data is pooled annually across all devices, instead of monthly in the Free and Growth plans. Please contact your Customer Success Manager for questions about overages.
  
  
