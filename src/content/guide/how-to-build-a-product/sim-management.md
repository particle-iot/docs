---
title: SIM Management
columns: two
template: guide.hbs
devices: [ electron ]
order: 10
---

# {{title}} <sub style="color: #777;font-size:18px; bottom: 0;">beta</sub>

SIM Management equips product creators with the functionality needed to operate at scale with
cellular-connected devices. This suite of tools is focused on reducing friction of
managing a fleet of Particle SIM cards at all stages of the SIM lifecycle.

Some of the most notable features of SIM management for products include:
- **Import and pre-activate SIM cards en-masse** to ensure a smooth unboxing experience
for end users of your products
- **Gain meaningful insights into data usage patterns** by viewing fleet-wide usage information
- **Set sensible cellular defaults** to save you time and effort without
sacrificing control of individual SIM cards
- **Take advantage of <a href="https://www.particle.io/pricing#cellular-data" target="_blank">volume-based pricing</a>**
for cellular service available exclusively to product creators

![SIM Management for
products](/assets/images/sims-for-products/sims-for-products.png)
<p class="caption">Seamlessly manage a large fleet of SIM cards by
associating them with your Particle product</p>

This set of features is currently released as a beta and is subject to change.
Please report any issues you experience via our <a href="/support">support form</a>.

## Introduction

The SIMs view is a new page on the Console that will be visible to those products
that are cellular-based (i.e. you chose the Electron as the device type during product
creation). It will appear as a SIM card icon in the Console side bar when
looking at your product. To access this view and start exploring, click on the SIM card icon ( <i
class="im-sim-vertical-detailed"></i> ).

Much like devices, SIM cards can now be associated with a Particle
product instead of an individual developer account. It is important to
be aware of 2 main implications of product ownership of a SIM card:

- The owning product takes billing responsibility of the SIM card and the data
usage costs it incurs. This is useful to simplify product billing, which is covered more in the [billing
and invoicing section](#billing-and-invoicing)
- Any member of the owning product team gains access to view and manage the SIM
  (i.e. deactivation, changing the data limit). This makes it more
  accessible for your team to access and control SIM cards when
  necessary.

The SIMs page looks like this:

<img src="/assets/images/sims-for-products/sims-view.png"
class="full-width"/>

Here's a few things you will see on this page:
- A list of your product SIM cards, with details like its
ICCID, connection status, associated device info, data limit, and base
country
- Some statistics about your fleet's [aggregate data
usage](#monitoring-your-fleet)
- Buttons to take action on your fleet, like [importing
new SIMs](#importing-sim-cards) into the
product, setting a [default data limit](#default-data-limits), and more

## Importing SIM Cards

You can import SIM cards into your product a variety of different ways:
- Typing in ICCIDs
- Scanning ICCIDs using your webcam
- Uploading a file containing a list of ICCIDs


Regardless of the method you choose, **importing SIMs into a product also
triggers SIM activation**. This is a key benefit of managing SIM cards on
the product level: you are able to pre-activate large numbers of SIM cards
to ensure a smooth unboxing and setup experience for end-users of your
product.

![Import methods](/assets/images/sims-for-products/import-methods.png)
<p class="caption">You have methods to choose from when importing SIM
cards into your product</p>

SIM activation requires selection of a home country for billing
purposes. For more information on home countries, please see the
[cellular billing guide](/guide/getting-started/billing/electron). You
will be presented with a dropdown to select the home country after
importing the desired ICCIDs:

![Select home country](/assets/images/sims-for-products/select-home-country.png)

You should be sure to choose the country that your SIMs will be
operating in most often to avoid incurring unnecessary roaming charges.
You also will see the SIMs' data plan cost details on this page.
If you have a fleet of SIMs that operate in different countries, we
suggest importing each country's SIM cards separately so they can be
homed accurately.

Upon importing, SIM cards will be activated immediately via Particle's
MVNO service. For each SIM, you will receive a prorated charge for the
first month's 1MB data plan on your next invoice.

### Typing or scanning ICCIDs

For importing smaller numbers of SIM cards, it makes more sense to type
or scan ICCIDs to import into your product. You can find the
full ICCID number on the back of your Particle SIM carrier card, below the
barcode. Alternatively, the ICCID is also printed directly on the micro
SIM, if it has already been popped out of it's SIM carrier card.

<img src="/assets/images/sims-for-products/iccid-carrier-card.png"
class="small"/>
<p class="caption">You can find a Particle SIM's ICCID on the back of
its carrier card</p>

You also have the option to use your computer's webcam to scan a SIM
card's ICCID for product importing. Note that **scanning works best with a
webcam capable of 1080p resolution or higher**. As a result, many default
laptop scanners will not work well for scanning. If you don't have this
kind of webcam handy, we suggest typing ICCIDs or [importing via a
file](#importing-via-files).

![Scan ICCIDs](/assets/images/sims-for-products/scan-sim-cards.png)
<p class="caption">To scan, position the barcode inside the cyan box,
and ensure that it is in focus</p>

Regardless of if you are typing or scanning ICCIDs, SIM cards will queue
up for batch importing. When you have finished queueing up SIMs, click
"Continue" to proceed to selecting a home country for the data plan.

### Importing via files

For large numbers of SIM cards, it will be much easier to import and
activate using a file. If you have purchased a large number of Particle
SIM cards, you should have received a file containing a list of your
ICCIDs from Particle.

The Console's UI makes it easy to drag-and-drop a file containing ICCIDs
to use for importing. Your file must be a `.txt` and have one ICCID per
line. Any other data in the file will be ignored.


### Transferring SIMs owned by a developer
Often times, you will begin developing a cellular product as a
prototype, and claim ownership of a SIM card as a Particle developer.
You now might want to transfer this SIM card into your product to manage
it as part of a larger fleet.

You have the ability to directly transfer ownership of a SIM owned by a
Particle developer account into a product. Particle will seamlessly
transition ownership from your account as a developer to your product.
When importing via scanning or typing ICCIDs, the Console should give
you a heads up that you are about to transfer ownership from your
individual billing account to the product's billing account. In
addition, be aware that these SIMs will:

- Trigger immediate **charges for any data overages** incurred during this
current month
- Be put on a new data plan where **existing promotions from the previous
plan will no longer apply** (i.e. free 1MB data plan for 3 months)

## Default Data Limits

Each SIM card has its own _data limit_ or the maximum data that you'd
like a particular SIM to be allowed to consume as a safety cutoff. For
more information on data limits, please read the docs on [SIM data
limits](/guide/getting-started/billing/electron/#data-limits).

For large product fleet, it can become cumbersome to individually set data
limits for each SIM card. You have the ability to set a default data
limit for your product. This data limit will be applied to any new SIM
card imported into your product fleet moving forward. If your product
does not have a default data limit set, Particle will apply a **5MB**
limit to any SIM imported into your product.

To set or update your fleet-wide data limit, click on the "Set Data
Limit" button on your product's SIMs page:

![Set data limit](/assets/images/sims-for-products/set-data-limit.png)

You also have the ability to override the default data limit on an
individual SIM once it has been added to your product. This is useful if
you know certain SIMs will consume more data, like a SIM used in a test
device. To do this, click on the `...` icon next to a SIM in the product
list and select "Set data limit."

![Override data limit](/assets/images/sims-for-products/override-data-limit.png)
<p class="caption">You can easily override the default data limit for an
individual SIM using the Console</p>

## Monitoring your fleet

Another major benefit of SIM management within a product is gaining
fleet-wide visibility into data usage and estimated cost. Previously,
data usage and cost was only displayed on a per-SIM basis. Now, you have
the ability to monitor your entire fleet of SIMs in real time from the
Console:

<img src="/assets/images/sims-for-products/fleet-stats.png"
class="full-width"/>

The usage sparkline aggregates data consumption from all SIMs in your
product for the current month, and plots usage over time. This could
allow you to identify patterns of data usage, realize the usage impact
of a new version of firmware, or spot unexpected spikes in consumption.

Coupled with the sparkline is some additional information about your
fleet:

- **Data Usage**: represents the total number of megabytes
consumed across your fleet of SIM cards since the start of the current
billing period. Usage reports may be delayed by up to 1 hour.
- **Active SIMs**: represent all the SIM cards in your fleet
that are either active, or temporarily paused due to hitting their
monthly data limit.
- ** Monthly Cost**: an approximation of the amount to
be invoiced for SIM data usage at this point in time. The actual amount
invoiced at the end of the billing period may change as SIMs consume
additional data.

Together, this information paints a picture of how your fleet of SIM
cards is behaving at a high level in the current month.

## Individual SIM actions

Although SIM management within a product provides fleet-wide control and
insight, it does not come at the expense of individual SIM control. In
the SIMs view, you can take the following actions on a SIM
card:

- **Set Data Limit**: Override the default data limit applied to every
SIM in your product. This is especially helpful for SIMs that might use
more data than average, like a SIM used for internal testing. Service
will be temporarily paused on this SIM if the data limit is reached
- **Deactivation**: Immediately stops any device using this SIM from
sending or receiving data via a cellular network
- **Reactivation/Unpausing**: Resume cellular data transfer of a
deactivated or paused SIM and immediately enable the SIM to be used with
a Particle device
- **Removal from Product**: Deactivate the SIM card and dissasociate it
from your product's billing account

## Billing and invoicing

This section will outline billing and invoicing information specific to
associating a SIM with a product. For general information about how
SIM data is billed, check out the
[cellular billing guide](/guide/getting-started/billing/electron/).

### Data plans

Each SIM card will have its own individual data plan and overage cost,
similar to what you might have experienced owning a SIM as a Particle
developer. The particular base rate and overage cost per-MB applied to
your SIMs will depend on 2 things:
- **Where it is "homed"**: When importing the SIM, you choose the home
country for a SIM card(s) where it will operate most frequently.
Different countries have different base and overage rates for data plans
- **How many SIMs are in the product**: Particle offers <a href="https://www.particle.io/pricing#cellular-data" target="_blank">volume-based pricing</a>
for product creators with large fleets of SIM Cards

Note that product SIM cards are **not** eligible for promotional pricing
given to developers (i.e. 3 free months of data). Data plan details will
be communicated clearly during the import process as well as on monthly
invoices.

**Data pooling**, or purchasing a chunk of cellular data shared by a
fleet of SIM cards can be arranged by [contacting us](http://www.particle.io/sales).
This is often useful to help product creators more accurately estimate
cloud infrastructure costs over time.

### Invoices

Cellular data usage will be calculated and charged on a monthly basis,
and included as part of your regular invoice for your <a href="https://www.particle.io/pricing">product plan</a>.
If you are on a monthly plan, this means you will receive an invoice
each month that contains line items for both your platform plan and SIM
costs. For those who have chosen to be billed for their product plan
annually, you will receive monthly invoices for cellular data and still
maintain your annual payment schedule for your product plan.

Your invoice will look something like this:

<img src="/assets/images/sims-for-products/invoice-with-sims.png"
class="full-width"/>

You will notice a few things about your invoice:
- It will contain a summary at the top, that includes a cost for your
product plan and cellular data, which add up to your monthly total cost
- You will see the total number of billable SIMs in your fleet as well
as the total amount of data consumed for the month
- Each SIM's individual cost will be itemized in the invoice details
