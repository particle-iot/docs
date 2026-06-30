---
title: Long Term Support (LTS) Releases
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

Particle manages Device OS releases through defined lifecycle states that reflect a version's maturity, stability, and intended audience.

This model ensures customers can choose the version that best fits their needs, whether that's early access to new capabilities, or a proven release for long-term production use.

Each release moves through several states as we gain confidence in its performance, based on testing, field metrics, and customer feedback.

## Device OS release states

These states describe how widely a release is distributed across Particle's tools and which audiences it is intended for.

|  | **Preview** | **General Availability (GA)** | **Archived** |
| --- | --- | --- | --- |
| **Purpose** | Limited external access for early evaluation | Public, stable release for all users | Older or superseded versions |
| **Workbench local compile** | Yes | Yes | Yes (warning) |
| **Workbench version selector** | No | Yes | No |
| **Included in Workbench manifest** | Yes | Yes | Yes |
| **Cloud compile** | Yes | Yes | Yes |
| **Visible in Web IDE** | No | Yes | No (but remains usable if previously selected) |
| **CLI update / local flash** | Yes (using `--target`) | Yes | Yes (using `--target`) |

### Device OS Release Process

1. **Preview** – shared with select customers for limited evaluation (typically through Technical Account Managers).
2. **General Availability (GA)** – promoted when the release demonstrates stability across a wide range of devices and platforms.
3. **Archived** – older releases like release-candidates or releases that don't meet our standards for stability may be moved to Archived so they are not shown in the version selector in Workbench and Web IDE, preventing new projects from adopting it.

To see the current versions and release states, see [versions and upgrades](/reference/device-os/versions/).

## Criteria for promotion between states

Device OS releases advance through the release states based on their maturity, reliability, and field performance.

When evaluating a release, Particle considers:

- Results from internal regression and integration testing.
- Stability and performance data collected from fleet monitoring tools.
- Cumulative device-hours and time-in-field metrics across multiple platforms.
- Feedback from early-access customers, partners, and the developer community.

Releases that meet the highest standards of stability and long-term reliability may earn the LTS designation, a mark that identifies them as the recommended baseline for production deployments.

## Device OS Long-Term Support (LTS) designation

Particle's Long-Term Support (LTS) releases provide developers with known stable versions of Device OS suitable for production deployments, with continued support in the following point releases. This ensures that the recommended LTS version remains stable and predictable, even as development continues on newer versions.

**An LTS designation is applied to a specific version not to an entire major release.**

After an LTS version is designated, Particle may continue to:

- Release newer versions (for example, 6.5.0) that include new features.
- Release patch updates within the LTS line (for example, 6.4.3, 6.4.4) that contain only critical fixes or security improvements.

![LTS versions](/assets/images/lts-versions.svg)

LTS releases are designed for:

- Reliability-focused teams who prioritize stability over new features
- Customers who need a consistent foundation to support rapid iteration of their firmware application

It is expected that 6.4.2 will be declared an LTS version in the future.

Note: Prior to 2025, Particle maintained separate LTS (2.x & 4.x) and mainline (3.x, 5.x) branches. With the introduction of Device OS 6, we streamlined this approach to maintain a single active line of development.

### LTS release phases

All LTS releases **have a support lifecycle of two years** that is broken into two distinct phases:

**Year 1 - Active LTS**

Active support of high-severity bugs, security vulnerabilities, and issues for a period of one (1) year.

**Year 2 - ESM LTS**

Beginning in the second year of availability, LTS releases enter an Extended Security Maintenance (ESM) phase. In this phase, **only emergency security fixes will be back-ported**.

## Default and Recommended Versions

Each platform has:

- A default version, automatically selected when you compile or create a new project in Workbench or the Web IDE.
- A recommended LTS version, which represents the most stable and field-proven release for production use.
    
Patch releases may be issued on top of a designated LTS version without changing the LTS designation (e.g., `6.4.2` → `6.4.3`) if critical fixes are required.

### Recommended LTS Versions

{{!-- BEGIN shared-blurb d07841d1-c7b6-4d06-b89d-f906d454d2b7 --}}
| **Platform** | **Models** | **Current LTS** | **Minimum Version** |
| --- | --- | --- | --- |
| B-SoM | B404X | {{version mode="lts" platform="23"}} | 4.0.0 |
| B-SoM | B404 | {{version mode="lts" platform="23"}} | 2.3.0 |
| B-SoM | B402, B524, B523 | {{version mode="lts" platform="23"}} |  |
| B-SoM | B504e | {{version mode="ga" platform="25"}} | 6.3.5 |
| Boron | BRN404X | {{version mode="lts" platform="13"}} | 4.0.0 |
| Boron | BRN404, BRN402, BRN314, BRN310 | {{version mode="lts" platform="13"}} |  |
| Argon |  | {{version mode="lts" platform="12"}} |  |
| E404X | E404X | {{version mode="lts" platform="15"}} | 4.0.0 |
| Tracker | T404, T524, T523 ONE404, ONE402, ONE524, ONE523 | {{version mode="lts" platform="26"}} |  |
| M-SoM | M524, M404 | {{version mode="lts" platform="35"}}<sup>1</sup> | 5.6.0 |
| Photon 2, P2 |  | {{version mode="lts" platform="32"}}<sup>1</sup> | 5.0.0 |

<sup>1</sup>It is expected that the 6.4.x release line will be declared LTS after the 6.4.2 release.

**Devices that must stay on 2.x LTS**

| **Platform** | **Models** | **Current LTS** | **Minimum Version** |
| --- | --- | --- | --- |
| E-Series | E404, E402, E314, E313, E310 | {{version mode="lts" platform="10"}} | 2.2.0 |
| Electron | ELC402, U260, U270, G350 | {{version mode="lts" platform="10"}} | 2.2.0 |
| P1 |  | {{version mode="lts" platform="8"}} | 1.2.1 |
| Photon |  | {{version mode="lts" platform="6"}} | 1.2.1 |

{{!-- END shared-blurb --}}

