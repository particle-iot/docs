---
title: Long Term Support (LTS) Releases
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Particle is constantly improving Device OS with new releases that add new features, increase performance, and improve the standard behavior of Particle devices to better meet the needs of our customers. However, for some customers, constant ongoing development and changes in behavior can create undesired risk to the stability and reliability of existing applications.

Many enterprises building and deploying mission-critical solutions with Particle value reliability over everything else. For those customers, Particle develops and releases Long Term Support (LTS) releases of Device OS that deliver consistent behavior and stable performance for device applications over extended periods of time.

## What are Long Term Support (LTS) releases?

Long Term Support (LTS) releases for Device OS are independent branches of Device OS that are feature-frozen in time. They do not receive updates with new features, API changes, or improvements that change the function or standard behavior of the device. 

LTS releases **_are_**, however, supported by an extended support window which address critical bugs, regressions, security vulnerabilities, and issues that affect our wider enterprise customer community.

## Should I build my application on LTS releases?

In general, **LTS releases are suitable and recommended for all customer applications** that do not require the latest features from the newest releases on our master branch. 

Compared to standard Device OS releases, LTS releases are:

* **Enterprise focused. LTS releases are targeted at risk-averse enterprises who are deploying large fleets of devices supporting mission critical operations on a daily basis.**
* **Reliable**. We shorten the development window and increase the testing window for LTS releases to allow for more testing and bug fixing.
* **Supported**. LTS release branches are supported by a Long Term support policy (more details below) that delivers backward-compatible bug fixes and security patches
* **Predictable**. LTS releases have a clearly-identifiable major version number (Device OS 2.X.X) and are released with regular frequency with clear support timelines.
* **Upgradable**. Any further updates to LTS are tested for backward compatibility and upgrade path from earlier LTS versions to make upgrades fast, simple, and low-risk

While we recommend LTS releases for use by _all Particle customers,_ LTS releases may be especially attractive to:  

* Risk-averse customers who value reliability over the latest and greatest features
* Enterprise customers who want access to top-tier, white-glove support SLAs
* Customers who only want to update Device OS when focused improvements to reliability and security are available
* Customers who need a consistent foundation to support rapid iteration of their firmware application

LTS releases are **not**:

* **Feature-based releases. Incremental LTS releases focus on hardening functionality of existing features versus introducing new ones.**
* **Cutting-edge releases**. LTS is not suitable for customers who want access to the newest features of the Particle platform
* **Customizable**. We do not recommend that customers modify the default behavior of LTS releases, as such modifications may interfere with reliable performance and upgrades

## LTS release cadence and support policy

Particle aims to produce a new LTS release for Device OS approximately **once per year**, though releases may happen a bit sooner or later at our discretion.

All LTS releases **have a support lifecycle of two years** that is broken into two distinct phases: 

* **Year 1 - Active LTS:**
   * Active support of high-severity bugs, security vulnerabilities, and issues for a period of one (1) year
   * LTS maintenance releases will generally be made on a quarterly basis, with ad-hoc releases in the event of severe bugs or vulnerabilities
* **Year 2 - ESM LTS:**
   * Beginning in the second year of availability, LTS releases enter an Extended Security Maintenance (ESM) phase. In this phase, **only emergency security fixes will be back-ported**
   * Before being transitioned to the ESM phase a newer LTS release will be available and identified as an active LTS release

**Note** that at any given time only one LTS branch will be Denoted as “Active LTS”. 

Particle recommends that customers leveraging LTS for their applications upgrade their fleet every year to stay current with the most recent, active LTS release.

## LTS release process

LTS releases are subject to a higher degree of testing and scrutiny than standard Device OS releases on our master branch. 

* LTS releases are identified months in advance and are scoped with a development roadmap that builds on existing stable releases and significantly limits any new feature development.
* LTS releases go through sequential upgrade testing to ensure that incremental upgrades from previous LTS releases are delivered reliably
* Before a release version can be labeled as an LTS release, it must spend a minimum of 6 weeks as a standard Device OS release where it is used and tested by thousands of developers

## Switching Between Release Lines

Particle guarantees smooth upgrades to new LTS releases from prior ones, but **does not provide a comparable guarantee for Device OS downgrades, even within an LTS release branch.** 

The information provided below is directional guidance and not a replacement for thorough testing. Whenever possible, downgrading fleets of production devices should be avoided.

### Switching from an LTS release to a standard release 

* Make sure that the standard release you’re migrating to has been released after the LTS version you’re migrating from – it should have a greater major version number
   * ✅ – migrating from LTS release 2.X.X to standard release 3.X.X
   * 🚫 – migrating from LTS release 2.X.X to standard release 1.4.4

### Switching from a standard release to an LTS release

* Make sure that the LTS baseline you’re migrating to is more recent (compared numerically) than the Stable Release you’re migrating from. Note that this is true even for LTS releases that were released at a later date than the higher-versioned standard release
   * ✅ – migrating from standard release 1.4.4 to LTS release 2.X.X
   * 🚫 – migrating from standard release 3.X.X to LTS release 2.X.X
