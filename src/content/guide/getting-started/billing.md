---
title: Electron Billing Guide
layout: guide.hbs
columns: two
devices: [ electron ]
order: 8
---

## Billing Service with Particle
Welcome to the wonderful world of inexpensive cellular for your devices! Monthly services always come with some complexity, and we're here to clear up as much of that as we can. If you have specific questions, you may want to use the navigation on the left to jump to the relevant section.

Electrons need data to get online, so we created the Particle SIM and service. Particle plans work very similarly to prepaid plans for cellphones. **At the beginning of a monthly billing period you're charged for the "base rate"**, which is the cost of having the SIM card live on the network. The base rate includes the first megabyte (MB). If you go over the first MB, then we'll add another MB to your service plan at a lower cost than the base rate. In the US, for instance, the base rate is $2.99 and additional MBs are $0.99. These **additional MBs are added to the next month's bill**.

Your base rate and additional MB rates are determined by where you're using the SIM. The rates are country-by-country, and countries are grouped together into Zones that we've negotiated rates on. You should choose the correct home country when you set up a SIM or you won't get the the first MB included with the base rate, and will immediately have an additional roaming MB added! To find out more about roaming, hop down to that section.

You can see your usage, SIMs, data limits, payments and more in the [Console](https://console.particle.io/billing).

## Billing Period
The first day you set up your first SIM becomes your monthly anniversary. Congrats! Each month on that date we'll refill all your SIM plans in exchange for a few hundred pennies. If you signed up on January 30th, then we're not going to bill you on February 30th... that would be silly. The next refill would happen on February 28th.

**If you add more SIMs to your account then they'll also sync up to the original SIM's anniversary**. We do that by giving you a full MB for the remainder of the month, but only charging you for the percentage of the days! If your anniversary date is the 1st, and you add a new SIM on the 15th of a month, we'll charge you for about half of the base rate, but give you the full 1 MB. Additional MBs will go for your usual rate.

## Data Limits
Limits act as a safety cutoff for your data usage. They let you set the most MB that you'd like a particular SIM to be allowed to consume. You won't be billed for this number unless you actually use that much data, so you set it wherever you like. **By default the data limit on new SIMs is 5MB** to avoid pausing behavior if you go a little higher than you expected. Remember, if you let a SIM hit this limit in the US it'll only be about $7! For applications that are cost sensitive and non-critical then you can set the limit lower; if the application or data are critical then we recommend raising it.

When a SIM reaches or exceeds the set limit then data service will be paused. It can be unpaused in the Console by increasing the limit, or it will be automatically unpaused at the next billing anniversary. You'll also receive an email when a SIM gets to 90% of the current limit, so you have time to raise it if desired. On a 5MB limit, for instance, you'll get an email when 4.5MB have been used.

We measure data use by querying cellular carriers for what they've measured. Because of this our knowledge of a SIM's usage has a little lag and it's possible to go over a set limit, especially if you're using data very quickly. For additional use above a pre-set data limit we'll charge a pro-rated amount based on your additional MB rate. If you're in the US and get 0.01MB over your limit then you'll see about an additional penny on your bill.

You can set data limits on each SIM independently, see what your current limits are, and unpause SIMs in the [Console](https://console.particle.io).

## Activation, Deactivation, Reactivation, Pausing
With this shiny new cellular service we've introduced some new terminology! Pausing is related to temporary behaviors of individual SIMs, and the activation terms can apply in a couple of ways. Remember that if your Electron doesn't have data service then any application running will not function as you expect unless you've explicitly written it for offline behavior! Check out System Modes and Threading over in the Firmware Reference for details.

**Activation** is the process you go through when first setting up a SIM. We associate the ICCID (aka SIM number) with your account and payment method and get it turned on and ready to go. Currently activation will only happen right at the beginning.

**Deactivation** can happen when there's a payment failure, like if your credit card has expired. We'll send you an email and try the card a few times, but if we can't get the payment to go through then we'll have to deactivate all SIMs on that account to avoid accumulating more charges. It's also possible to deactivate an individual SIM from the Console. A device that's been deactivated will stay that way unless some action is taken. <insert dashboard expanded menu screenshot here>

**Reactivation** is when you restore service to a SIM or group of SIMs. If you fix your billing info on a deactivated account or individually reactivate a SIM, data service comes back on! Your Electron should automatically get back online within ten minutes, and often much less than that. If you watch the Logs view in the Console then you'll see when it comes back.

**Pausing** is most commonly caused by a SIM exceeding the data limit. When paused a SIM cannot consume data until either the monthly anniversary happens and it receives a sparkly fresh MB and automatically unpauses or the data limit is raised.

**Unpausing** occurs when a SIM reaches its data cap during a billing period, and the next billing period begins. Particle will automatically unpause your SIM at this time, allowing cellular data transfer to resume. You are also able to manually unpause a SIM card during the billing period in which it was paused by raising the data limit. If you raise the data limit one month, it will stay at that selection in subsequent months until it is changed again.

## Roaming (Zones)
SIMs have a home country, and this is determined during the Electron setup process. Countries are sorted into Zones, and each Zone has both a base rate and an additional MB rate. In the US this is $2.99/$0.99, and other countries that are also in Zone 2 like Turkey and South Africa share this rate. If you consume data on a SIM within countries of the same Zone, then everything works as if you're still in the same country. If you use the SIM in a new country, outside of the SIM's home country's Zone, then an additional MB at the new country's rate will be added so that you can get online!

If you do travel the world with your SIM, your monthly receipt will show MB use grouped by Zone for easy calculation.

You may notice that Zones aren't always the same in countries that share borders. We're doing what we can to simplify cellular, but this is driven by carrier deals on a country-by-country basis. The result is that there are countries like Canada that are in a different Zone than nearby or bordering countries like the US and Mexico. Sorry Canada!

![](/assets/images/Coverage-Map-V3.png)
<p class="caption">A map indicating Zone grouping under Particle's cellular data plan. <a target="_blank" href="/assets/images/Coverage-Map-V3.png">Click here</a> for a full size image.</p>

More more information about pricing and carriers in each Zone/Country, please visit [https://particle.io/pricing](https://www.particle.io/pricing#cellular-data) and inspect the dropdown menu of country names.

## Initial Electron Promotion included with your order
First, thank you for your purchase! The first 3 months of our 1MB data plan are FREE! This promotion will be automatically applied upon activation of your SIM. (Note: Only SIMs purchased through our retail or wholesale stores, or reseller partners are eligible for this promotion.)

**The promotion pays for your base rate/first MB for 3 consecutive months**. We do have to collect a payment method at activation time to cover any additional MBs used in a given month, and so your Electron will seamlessly continue to work after those 3 months! Pausing or deactivating a SIM doesn't pause the 3 month clock, so once you activate your SIM, you should keep rocking for the next quarter year.

If you activate another SIM at a later date, the equation gets slightly more complicated. The TL;DR is that we're making sure you get the full value of your months, but read on for more detail. We don't want you to miss out on the full discount on a month's base rate, so instead of counting your first partial month leading up to your billing anniversary as one month, we're prorating a credit of your base rate against the percentage of the month remaining. This remainder will show up on your receipt four months later as a credit towards your first non-promo-discounted month.

## Monitoring your Data Usage

Unlike a Wi-Fi development kit, you're likely going to want to keep an eye on how much data your SIM card has used. Although Particle has automated mechanisms in place to avoid exorbitant data costs (i.e. data limits), **close monitoring of data usage will ensure that there are no surprises when you receive your monthly bill**.

Luckily, the [Console](https://console.particle.io/billing) makes it easy to get up-to-date information on data usage for each one of your SIMs. Visiting your Console will reveal a visualization of how much data your SIM has consumed over time during the current billing period, as well as an estimated cost of that data.

<Add a screenshot of the data usage sparkline>

It's important to note that the estimated cost represents data used *up to that point in time*, as opposed to a projection until the end of the billing period. In addition, reported data usage may be up to 1 hour behind, so don't expect to see the data used by an over-the-air flash right away.

## How to Reduce Your Bill
You can reduce your monthly cost in two main ways. One is by setting your data limit lower. This will make sure that your bill will never be much higher than you expect (allowing for taxes, fees, and slight overshoots). It's also a bit abrupt. Your device will lose connection and the behavior will change unless you've written in offline behavior.

The lighter approach is to reduce the amount of data consumed by the device itself via firmware optimization. We have a whole guide for that! [Data Usage Guide](/guide/getting-started/data)

## How to Update Billing Info
If there's ever a need to update your billing information, or add a new credit card, you can do this easily from the Console. If a payment attempt ever fails, we'll ask you to go and edit your billing information before we try and charge your card again. To do this, simply visit the [Edit Card](https://console.particle.io/billing/edit-card) screen on the billing page of your Console.

<Add a screenshot of the Edit Card modal>

## Example Billing Cases **coming soon**
- typical single-device that stays under 1MB
- single device that goes over 1MB
- month where second device is added
- overages on multiple devices
- pausing a device partway through the month
- devices deactivated
- roaming
