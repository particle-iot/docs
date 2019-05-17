---
title: Cellular Billing Guide
layout: tutorials.hbs
columns: two
order: 21
---

## Billing Service with Particle
Welcome to the wonderful world of inexpensive cellular data for your
devices! Up to 3MB of Cellular data is _included_ with your Device Cloud
subscription for your cellular Particle devices (Electrons and E Series
modules). You will be charged overages for cellular data consumed beyond
3MB in a given month. 

The monthly device cloud charge applies even if you have no data usage, as the SIM card is still active in the mobile carrier network. You can pause the SIM if you do not intend to use it; this will stop billing.

This page will outline some specifics around how cellular billing works,
and how to manage your cellular devices from a billing perspective.

For more information about Device Cloud pricing, check out <a
href="https://particle.io/pricing" target="_blank">our pricing page</a>.

There are also FAQs for cellular Device Cloud pricing
[here](/support/general/pricing).

## Data Limits
Limits act as a safety cutoff for your data usage to avoid paying
unexpected overages. They let you set the most MB that you'd like a
particular SIM to be allowed to consume. You won't be billed for this
number unless you actually use that much data, so you set it wherever
you like. **By default the data limit on new SIMs is 5MB** to avoid
pausing behavior if you go a little higher than you expected. Remember,
if you let a SIM hit this limit in the US it'll only be about $5!
For applications that are cost sensitive and non-critical then you can set the limit lower; if the application or data are critical then we recommend raising it.

When a SIM reaches or exceeds the set limit then data service will be paused. It can be unpaused in the Console by increasing the limit, or it will be automatically unpaused at the next billing anniversary. You'll also receive an email when a SIM gets to 90% of the current limit, so you have time to raise it if desired. On a 5MB limit, for instance, you'll get an email when 4.5MB have been used.

We measure data use by querying cellular carriers for what they've measured. Because of this our knowledge of a SIM's usage has a little lag and it's possible to go over a set limit, especially if you're using data very quickly. 

You can set data limits on each SIM independently, see what your current limits are, and unpause SIMs in the [Console](https://console.particle.io).

## Activation, Deactivation, Reactivation, Pausing
Pausing is related to temporary behaviors of individual SIMs, and the activation terms can apply in a couple of ways. Remember that if your Electron doesn't have data service then any application running will not function as you expect unless you've explicitly written it for offline behavior! Check out System Modes and Threading over in the Firmware Reference for details.

**Activation** is the process you go through when first setting up a SIM. We associate the ICCID (aka SIM number) with your account and payment method and get it turned on and ready to go. Currently activation will only happen right at the beginning.

**Deactivation** can happen when there's a payment failure, like if your credit card has expired. We'll send you an email and try the card a few times, but if we can't get the payment to go through then we'll have to deactivate all SIMs on that account to avoid accumulating more charges. It's also possible to deactivate an individual SIM from the Console. A device that's been deactivated will stay that way unless some action is taken. <insert dashboard expanded menu screenshot here>

**Reactivation** is when you restore service to a SIM or group of SIMs. If you fix your billing info on a deactivated account or individually reactivate a SIM, data service comes back on! Your Electron should automatically get back online within ten minutes, and often much less than that. If you watch the Logs view in the Console then you'll see when it comes back.

**Pausing** is most commonly caused by a SIM exceeding the data limit. When paused a SIM cannot consume data until either the monthly anniversary happens and it receives a sparkly fresh MB and automatically unpauses or the data limit is raised.

**Unpausing** occurs when a SIM reaches its data cap during a billing period, and the next billing period begins. Particle will automatically unpause your SIM at this time, allowing cellular data transfer to resume. You are also able to manually unpause a SIM card during the billing period in which it was paused by raising the data limit. If you raise the data limit one month, it will stay at that selection in subsequent months until it is changed again.

## Overages (Zones)

Billing occurs in 1 MB increments, so once you exceed 3 MB, you'll incur a 1 MB overage until you cross the 4 MB level.

Countries are sorted into Zones, and each Zone has an
overage rate per MB. In the US this is $0.40, and other countries that are also in Zone 2 like Turkey and South Africa share this rate.

You will be charged the overage rate based on the country in which the
data was consumed.

![](/assets/images/Coverage-Map-V3.png)
<p class="caption">A map indicating cellular zone grouping. <a target="_blank" href="/assets/images/Coverage-Map-V3.png">Click here</a> for a full size image.</p>

For more information about pricing and carriers in each Zone/Country,
please visit [our pricing page](https://www.particle.io/products/connectivity/cellular-iot-sim-2g-3g-lte#additional-mbs) and inspect the dropdown menu of country names.

## Initial Electron Promotion included with your order
First, thank you for your purchase! The first 3 months of our Device
Cloud plan is FREE for developer devices! The cellular Device Cloud _includes_ 3MB of cellular
data per device per month.  This promotion will be automatically applied
upon activation of your device.

**The promotion covers your base Device Cloud cost for 3 consecutive
months**. We do have to collect a payment method at activation time to
cover any additional MBs used in a given month, and so your device will
seamlessly continue to work after those 3 months. Pausing or deactivating
a SIM doesn't pause the 3 month clock, so once you activate your SIM,
you should keep rocking for the next quarter year.

If you activate another SIM at a later date, the equation gets slightly more complicated. The TL;DR is that we're making sure you get the full value of your months, but read on for more detail. We don't want you to miss out on the full discount on a month's base rate, so instead of counting your first partial month leading up to your billing anniversary as one month, we're prorating a credit of your base rate against the percentage of the month remaining. This remainder will show up on your receipt four months later as a credit towards your first non-promo-discounted month.

If you are creating using your SIM in a product, the promotion does not apply.

## Monitoring your Data Usage

Unlike a Wi-Fi device kit, you're likely going to want to keep an eye on
how much data your SIM card has used. Although Particle has automated
mechanisms in place to avoid exorbitant data costs (i.e. data limits),
**close monitoring of data usage will ensure that there are no surprises
when you receive your monthly invoice**.

Luckily, the [Console](https://console.particle.io/sims) makes it easy to get up-to-date
information on data usage for each one of your SIMs.
Visiting the SIMs page and clicking a SIM will reveal a visualization of how much data your
SIM has consumed over time during the current billing period, as well as
an estimated cost of any overages to be applied at the end of the month.

<Add a screenshot of the data usage sparkline>

It's important to note that the estimated cost represents data used *up to that point in time*, as opposed to a projection until the end of the billing period. In addition, reported data usage may be up to 1 hour behind, so don't expect to see the data used by an over-the-air flash right away.

## How to Reduce Your Bill
You can reduce your monthly cost in two main ways. One is by setting your data limit lower. This will make sure that your bill will never be much higher than you expect (allowing for taxes and fees). It's also a bit abrupt. Your device will lose connection and the behavior will change unless you've written in offline behavior.

The lighter approach is to reduce the amount of data consumed by the device itself via firmware optimization. We have a whole guide for that! [Data Usage Guide](/tutorials/cellular-connectivity/data)

## How to Update Billing Info
If there's ever a need to update your billing information, or add a new credit card, you can do this easily from the Console. If a payment attempt ever fails, we'll ask you to go and edit your billing information before we try and charge your card again. To do this, simply visit the [Edit Card](https://console.particle.io/billing/edit-card) screen on the billing page of your Console.

<Add a screenshot of the Edit Card modal>
