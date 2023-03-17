---
title: Product Lifecycle Stages
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

Our primary focus at Particle is to enable you and your team to create high-impact connected products — from your first prototype to millions of deployed units in the field. As new features and products are rolled out, it’s important for us to provide clarity around when and how to incorporate these capabilities into your IoT deployment and when platform Service Level Agreements (SLAs) you may have agreed with Particle apply. We apply consistent, industry-standard release phases to our growing portfolio of offerings as they move through their lifecycle. These phases apply both to Particle’s hardware and software products.

Two pre-release lifecycle phases — Alpha and Beta — are designed to allow customers to begin safely testing the latest Particle technology and providing us with early feedback. Products then move to General Availability, which signals production readiness. Aging hardware products will be marked as Not recommended for new designs (NRND) with specified migration paths for existing customers and alternate recommended SKUs for new designs. Some products and features will eventually become Deprecated, then ultimately reach End of Support (hardware only) and/or End of Life.

Products in the pre-release phases (Alpha or Beta) or those on the path to being retired will be clearly marked as such in documentation and in the context of the product itself. Products without a qualifier can be considered to be Generally Available.

## Alpha

**Alpha products are for early testing and validation by a private group of customers.**

These products will be functional, but need to be evaluated in testing environments before being approved for broader use. Typically, Alpha participation is granted by invitation and customers agree to relevant terms before beginning use of the feature including sharing feedback with the Particle team.

_For software_

Alpha software products will likely not be feature complete, and the APIs supporting Alpha products may change significantly (including breaking changes) in future release phases based on feedback received. Documentation may not be available for Alpha products.

No platform SLAs apply to Alpha releases. We strongly recommend using Alpha software features in test environments only and/or with prototyping devices to avoid introducing risk to production deployments.

_For hardware_

Alpha hardware products are early prototypes that are used to collect design feedback and validate the hardware functionality. They are not thoroughly tested, and may have design flaws that prevent features from performing as intended. Alpha hardware is not certified and is not intended for production deployments of any size.

## Beta

**Beta products are made publicly available for piloting by a broader group of customers.**

Beta releases are _more_ feature complete and stable than Alpha releases, but there may still be some additions and modifications to product behaviors before moving to General Availability. Products in Beta are still intended to be used primarily in testing environments. However, use of Beta products in limited production environments may be appropriate.

_For software_

Customers using beta software should be aware that some outstanding issues may be present and consistency of interfaces are not guaranteed (i.e. behaviors and APIs may still change). Documentation will be present, but will evolve as the Particle team addresses bugs and makes improvements in anticipation of General Availability.

Like Alphas, Beta features are not subject to platform SLAs. In addition, there is no guaranteed publicly available pricing at this time.

_For hardware_

Beta releases of hardware are equivalent to the industry standard term “engineering samples.” The hardware is expected to be final or nearly final, though design changes may still be implemented before General Availability. Large design features like pinouts and peripheral counts, for example, should be finalized.

Beta hardware is sold in individual units only, and is not made available for purchase in mass production quantities or packaging. Beta hardware may be sold through our online stores, and will be identified as in beta in the product listing hardware.

## General availability

**Generally Available products are considered to be fully supported and production ready.***

A product will become Generally Available (GA) when Particle has full confidence in its readiness for use in production contexts. While General Availability products and features can still be improved over time, GA products are considered feature complete and perform stably and reliably.

_For software_

GA software products or features are subject to platform SLAs and are supported with publicly available pricing and complete documentation. No breaking changes will be made to behaviors or APIs without proper versioning practices and/or advanced communication.

_For hardware_

We will begin selling SKUs in mass production quantities and packaging formats once they become Generally Available. GA hardware is subject to our limited warranties and SLAs, and is recommended for use in scaling deployments.

## Not recommended for new designs (NRND)

**NRND is a hardware-specific phase used to identify aging or at-risk products that are no longer recommended for new designs.** 

Hardware may be marked as NRND for a variety of reasons and is not necessarily an indication that the SKU is scheduled for deprecation. Reasons might include:

* Limited availability of components required for production by upstream vendors
* Availability of newer products with equivalent or expanded functionality
* Changes in telephony and connectivity partner roadmaps (eg: 2G/3G network sunsets)

NRND hardware is still available for purchase in all formats, is supported by Particle SLAs, and does not have a defined End of Support or End of Life date. Note that MOQs for hardware SKUs marked as NRND may different from MOQs in General Availability.

## Deprecated

**Deprecated products are scheduled to be removed from the platform.**

Particle may choose to deprecate certain products if it has been superseded by another product, or if it no longer aligns with Particle's strategic product roadmap. Customers should begin migrating away from deprecated products before the End of Support, or End of Life timeframe for that product.

_For software_

No further additions will be made to Deprecated products, but these products will continue to function as-is until the end of life date. New versions of APIs or Device OS will likely not include support for Deprecated products/features. Like General Availability, applicable products in the Deprecated phase are still covered by platform SLAs.

_For hardware_

Deprecated SKUs can no longer be purchased. Existing devices will continue to work and be supported by at least one Particle development tool until the End of Support date, but new versions of Device OS may no longer support devices that have been deprecated.

## End of support

**End of Support is a hardware-specific phase in which active, ongoing support of a hardware product by Particle's platform and team has ended.**

Hardware in the End of Support phase can no longer be purchased in any quantity from Particle and is not guaranteed to be supported by Particle’s official developer tools including our IDEs, SDKs, and mobile applications.

Discontinued hardware _can_ still connect to the Particle Device Cloud, but is no longer supported by our SLAs, customer support team, or limited hardware warranties.

## End of life

**A product or feature has reached the end of its life when there is no longer any level of product functionality or platform support.**

We will notify customers using features planned for end of life ahead of time, with clear instructions of how to avoid any disruption and a reasonable time window to implement any necessary changes.

Particle makes no guarantees of supporting products which have reached their End of Life. Behaviors and APIs relating to End of Life products may be removed entirely. Future releases will not include support for end-of-life features. Platform SLAs do not apply to features that have reached the end of their life.

---

## Product lifecycle policies and status

The product lifecycle policies and status can now be found [here](/reference/product-lifecycle/product-lifecycle-policy-status/).
