---
title: Supply Secure FAQ
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Silicon shortage background

#### What's this about a silicon shortage?
Demand for silicon has increased dramatically, driven by demand for 5G phones and cars, next-generation laptops and video game consoles, and GPUs for cryptocurrency mining. At the same time, supply of silicon is constrained as new manufacturing capacity takes 18-24 months to bring online, and manufacturing challenges associated with COVID-19 have limited even existing supply. As a result, a wide variety of chips and ICs are either unavailable in the market or are only available on extremely long lead times (52 weeks+).

#### How has Particle been solving these problems through 2021?
Particle has been purchasing excess inventory of all of our supply-constrained chips throughout 2021, and has been delivering to customers "on allocation". We have secured supply to ensure delivery of our existing products through at least mid-2022, at which point we will be transitioning customers onto new Supply Secure modules with alternative components.

## Supply secure product details

**When will Supply Secure SKUs become available?**  
Supply Secure SKUs will be sampling in Q1 and Q2 of 2022 with General Availability planned for Q3 and Q4 of 2022.For availability details for a specific product, please contact your designated AE or CSM.

**How can I get access to samples?**  
Please contact your designed Account Executive (AE) or Customer Success Manager (CSM) to request access to Supply Secure Hardware samples.

**What version of Device OS will I need to use?**  
Device OS support for existing and new Supply Secure SKUs is as documented below:  

### Device OS support  

See [Recommended Device OS versions](/reference/device-os/versions/) for the current recommended versions.

#### How will prices change for these new modules?
All Supply Secure SKUs will be offered at pricing that is equivalent to the contracted pricing of the SKUs that they replace.

## Product lifecycle changes

#### Which product lines are affected by the silicon shortage?
The scope of impact of the silicon shortage is extremely broad, and has affected nearly every hardware SKU in our portfolio.  
The following enterprise (bulk) SKUs _**are impacted**_ by the silicon shortage and _**will be Deprecated and designed End of Sale once material availability is exhausted**_:  

For the specific SKUs affected by this notice, see [Product lifecycle policy status](/reference/product-lifecycle/product-lifecycle-policy-status/).
)  
The following enterprise SKUs are _**not currently impacted**_ by the silicon shortage (currently Supply Secure, no replacements planned):  
   * B-Series LTE CAT 1 (B524MTY)

Originally, there were planned "X" Tracker devices T404XMTY, T524XMTY, ONE404XMTY, and ONE524XMTY, however the is now a sufficient supply of parts available that the existing 404 and 524 variations can be produced in quantity. The existing T404MTY, T524MTY, ONE404MTY, and ONE524MTY are now considered to be supply secure.


#### What SKUs are going to be deprecated, and when?
A complete list of new and deprecated SKUs is available [here](/reference/product-lifecycle/notices/product-deprecation-notice-march-16-2022/).

#### How long will the existing products be available?
According to our [hardware lifecycle policy](/reference/product-lifecycle/product-lifecycle-policy-status/), Particle typically provides one year after formal deprecation of a product for customers to complete a Last Buy, and an additional year after that to accept Last Shipment. However, due to the significant and unprecedented circumstances of the silicon shortage, we have identified a “Last Request to Buy” date for all impacted and deprecated SKUs of **June 30, 2022**. We request that all POs for deprecated SKUs be submitted before this date and include a requested delivery schedule that extends no more than 12 months, through **June 30, 2023** at the latest. Due to the severity of the silicon shortage, it is likely that we will only be able to fulfill a very limited quantity of existing customers orders for impacted SKUs, as well as new orders placed before the Last Buy date. For this reason, POs placed before the Last Buy date will be eligible for customer cancellation, rescheduling, or conversion to Supply Secure SKUs as reasonable.

#### How long will the existing products be supported?
All products deprecated from a GA lifecycle state as a result of the silicon shortage will still be fully supported according to our product lifecycle policy for 3 years, through **April 30 2025\.**  
This support commitment applies to existing products deployed in the field as well as newly purchased products delivered before the Last Ship date. Particle will continue to honor hardware warranties for defective products with refunds or exchanges while supplies remain available.

#### What if I don't want to transition to particle's new supply secure modules?

Customers who do not transition to our Supply Secure modules are at risk of going without access to additional hardware for the next 18-24 months, if not indefinitely.  
Market indications suggest that the silicon crisis is going to get worse before it gets better, with a complete recovery not expected until 2023 or even 2024\. Many parts will _never_ recover, as manufacturers are discontinuing entire product lines altogether without the intention of reviving them.  

Particle has invested significant resources into establishing smooth, simple, and reliable migration paths that enable our customers to continue deploying products throughout this challenging environment and believe it is in the best interests of _every_ customer to migrate to our Supply Secure modules.

## Migrating to supply secure

#### What level of effort will be required to transition to supply secure components?

The level of effort required will depend on your design and which SKU you are migrating to and from. In general, the migration effort:  

**Will** _**always**_ **include**  
  - Updating your firmware application to the minimum supported version of Device OS  
  - Validating the performance of your application on the new hardware SKU  
  - Re-completing additional certifications you previously completed beyond Particle's FCC, PTCRB, and carrier certifications  

**May** _**sometimes**_ **include**  
  - Re-routing supported peripherals from one pin to another  
  - Incorporating support for BLE-based Wi-Fi credential configuration  

**Should** _**rarely, if ever,**_ **include**  
  - Changing the mechanical dimensions or landing pattern of your Particle device  
  - Adding support for lost peripherals or functionality to your carrier board  
  - Making changes to your application firmware  
  - Increases to the cost of the Particle device or BOM of your product

#### What kind of testing should I do on the Supply Secure modules before shipping to customers?

Particle's Supply Secure modules are "code-compatible" with existing modules, so if you are already running on an up-to-date Device OS, your code should cross-compile to these new modules without issue. That said, many customers will be making Device OS upgrades with breaking changes, and different connectivity modules may have differences in behavior in the field, so devices on these modules should be rigorously tested. Particle will be releasing testing guidelines along with the engineering samples for our new Supply Secure modules.

#### How much time will I have to complete the migration?

In general, our goal is for all customers to complete technical evaluation of our Supply Secure SKUs prior to depleting allocations of their existing hardware. The timeline for migration will thus depend on (a) the POs you have submitted, (b) the portion of those POs that we have confirmed with allocated inventory, (c) the sell through rate for that inventory, and (d) your internal technical validation and certification timelines.  
It is critically important that all customers place confirmed POs for the next 12 months of demand so that our team can allocate inventory to support your migration. Without confirmed POs, we cannot guarantee any future availability of existing hardware SKUs.

#### What support and resources will Particle provide to help me complete this migration? 

Particle will be providing engineering samples, data sheets, migration guides, certification documentation, cost neutral pricing, and optional professional services to assist customers with migrations. Our organizational focus is to make all our customers successful in migrating to Supply Secure components. Please do not hesitate to reach out if we can be of further assistance.

#### What about SKUs that aren’t getting a “supply secure” replacement SKU, like the Photon?

Particle is not planning to build replacement SKUs for hardware platforms like the Photon that already have a functionally equivalent and Supply Secure Gen 3 replacement in a similar form factor. Further information is available [here](/reference/product-lifecycle/notices/product-deprecation-notice-march-16-2022/).
