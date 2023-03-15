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

In general, **LTS releases are suitable and recommended for all customer applications** that do not require the latest features from the newest developer preview releases. 

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

LTS versions have an even-numbered major version (2.x, 4.x, ...).

## When should I use a developer preview release?

In some cases, a new product is released out of cadence with a LTS version. The Tracker required 3.x, however once 4.0.0 LTS was released, it could use that. 

Another example is the P2 and Photon 2, which will require 5.x until 6.0.0 LTS comes out, probably in late 2023.

The reason is that adding a new platform is considered to be a feature, so it cannot be added to an existing LTS release. 

In some cases you will need a new feature before it's included in a LTS release. For example, 256K firmware binaries for Gen 3 devices were added in 3.1.0, and some customers needed this feature right away as they were already at the size limit.

Developer preview releases have an odd major version (3.x, 5.x, ...). These were sometimes referred to as feature releases.

{{!-- BEGIN shared-blurb d07841d1-c7b6-4d06-b89d-f906d454d2b7 --}}
## Recommended LTS versions

| Platform | Models | Previous LTS | Test With | Current LTS | Minimum Version |
| :--- | :--- | :--- | :--- | :--- | :--- |
| B Series SoM | B404X |  |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | 4.0.0<sup>2</sup> |
| B Series SoM | B404 | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}}  | 2.3.0<sup>1</sup>|
| B Series SoM | B402, B524, B523 | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}}  | |
| Boron | BRN404X |  |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | 4.0.0<sup>2</sup> |
| Boron | BRN404, BRN402, BRN314, BRN310 | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | |
| Argon | | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | |
| E404X | E404X | | {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | 4.0.0<sup>2</sup> |
| Tracker | T404, T524, T523 ONE404, ONE402, ONE524, ONE523 | {{version mode="latestRelease" line="3"}} | {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} |  |

- <sup>1</sup>B404 SoMs should only use Device OS 2.3.0 or later. While older units worked with older versions, newer units from the factory will only with with 2.3.0 and later due to a required component change. It's recommended that all B404 units use this version for compatibility.
- <sup>2</sup>B404X, BRN404X, E404X, and Tracker X devices require Device OS 4.0.0 or later. The most recent 4.x release, currently {{version mode="latestRelease" line="4"}}. 

### Devices that must stay on 2.x LTS

| Platform | Models | Current LTS | Minimum Version |
| :--- | :--- | :--- | :--- |
| E Series | E404, E402, E314, E313, E310  | {{version mode="latestRelease" line="2"}} | 2.2.0<sup>1</sup> |
| Electron | ELC402, U260, U270, G350  | {{version mode="latestRelease" line="2"}} | 2.2.0<sup>1</sup> |
| P1 | | {{version mode="latestRelease" line="2"}} | 1.2.1<sup>2</sup>|
| Photon | | {{version mode="latestRelease" line="2"}} | 1.2.1<sup>2</sup>|

-<sup>1</sup>The most recent versions of the devices shipped from the factory with 2.2.0. This device can use older versions of Device OS but we do not recommend downgrading the Device OS whenever possible.
-<sup>2</sup>The Photon and P1 shipped with 1.2.1 from the factory. This device can use older versions of Device OS but we do not recommend downgrading the Device OS whenever possible.



### Devices that cannot use LTS yet

| Platform | Current Version | Minimum Version |
| :--- | :--- | :--- |
| P2 | {{version mode="latestRelease" line="5"}} | 5.0.0<sup>1</sup>|

<sup>1</sup>Some devices from the factory shipped with 3.2.1-p2.3. This version should not be used in production, using the latest 5.0 release, currently {{version mode="latestRelease" line="5"}}, is recommended.

{{!-- END shared-blurb --}}

## LTS release cadence and support policy

Particle aims to produce a new LTS release for Device OS approximately **once per year**, though releases may happen a bit sooner or later at our discretion.

All LTS releases **have a support lifecycle of two years** that is broken into two distinct phases: 

**Year 1 - Active LTS:**
   * Active support of high-severity bugs, security vulnerabilities, and issues for a period of one (1) year
   * LTS maintenance releases will generally be made on a quarterly basis, with ad-hoc releases in the event of severe bugs or vulnerabilities

**Year 2 - ESM LTS:**
   * Beginning in the second year of availability, LTS releases enter an Extended Security Maintenance (ESM) phase. In this phase, **only emergency security fixes will be back-ported**
   * Before being transitioned to the ESM phase a newer LTS release will be available and identified as an active LTS release

**Note** that at any given time only one LTS branch will be Denoted as “Active LTS”. 

Particle recommends that customers leveraging LTS for their applications upgrade their fleet every year to stay current with the most recent, active LTS release.

## LTS release process

LTS releases are subject to a higher degree of testing and scrutiny than standard Device OS releases on our development branch. 

* LTS releases are identified months in advance and are scoped with a development roadmap that builds on existing stable releases and significantly limits any new feature development.
* LTS releases go through sequential upgrade testing to ensure that incremental upgrades from previous LTS releases are delivered reliably
* Before a release version can be labeled as an LTS release, it must spend a minimum of 6 weeks as a standard Device OS release where it is used and tested by thousands of developers

## Release stages

Both LTS and regular release may include one or more of the following stages:

- Alpha. These releases have major changes. Alpha releases are for initial testing only and should not be used in production. Many releases will skip this stage.
- Beta. More stable than alpha, but still should not be used on production devices.
- Release Candidate. This release is close to final, but is not final yet. If you are planning to upgrade to this release you should test with a release candidate. The final release candidate is often released as a the final release with few or no changes, depending on customer feedback.
- Final. At release that does not have the a, b, or rc label is a final release. At this point it will never be re-released; if an update is required it will have a new patch version number. Final releases can now be used in production.

## What happens when a LTS version goes into ESM?

For example: Device OS {{version mode="latestRelease" line="2"}} is the current LTS release. This will be the ESM release for customers who wish to remain on 2.x LTS. 

If you are using a Gen 2 device (E Series, Electron, P1, or Photon), these platforms were removed from 4.x and 5.x, and you should stay on 2.x LTS.

The new LTS (4.x) and developer preview (5.x) releases are based on the latest developer preview release (3.3.0), so there will be changes from the 2.x release line. You should still upgrade to the latest LTS, but you should always test your firmware thoroughly on a major version upgrade.

While 4.x and 5.x started from the same place, the 5.0.0-alpha.1 release adds in support for the P2 platform.

Developer preview releases (3.x, for example) do not have an ESM phase, now that 5.0.0 was been released, there will not be additional updates after 3.3.0.

## Switching Between Release Lines

Particle guarantees smooth upgrades to new LTS releases from prior ones, but **does not provide a comparable guarantee for Device OS downgrades, even within an LTS release branch.** 

The information provided below is directional guidance and not a replacement for thorough testing. Whenever possible, downgrading fleets of production devices should be avoided.

### Switching from an LTS release to a standard release 

Make sure that the standard release you’re migrating to has been released after the LTS version you’re migrating from – it should have a greater major version number

- ✅ – migrating from LTS release 2.X.X to standard release 3.X.X
- 🚫 – migrating from LTS release 2.X.X to standard release 1.4.4

### Switching from a standard release to an LTS release

Make sure that the LTS baseline you’re migrating to is more recent (compared numerically) than the Stable Release you’re migrating from. Note that this is true even for LTS releases that were released at a later date than the higher-versioned standard release

- ✅ – migrating from standard release 1.4.4 to LTS release 2.X.X
- 🚫 – migrating from standard release 3.X.X to LTS release 2.X.X
