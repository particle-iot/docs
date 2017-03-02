---
title: Common Questions
layout: support.hbs
columns: two
devices: [ photon,electron,core ]
order: 5
---

Common Questions
===

**Where can I get more firmware information, like a guide?**
Most of our firmware solutions are now explained in depth, located in our new and improved [{{device}} Guide](/guide/getting-started/intro).

**Do Particle devices play well with IFTTT?**
Yes, and that *how-to* is located in our [IFTTT features section](/guide/tools-and-features/ifttt).

**Do you have Webhooks and JS-Plugins?**
Yes, you can find more information on both of these at [Webhooks features section](/guide/tools-and-features/webhooks).

**I am hosting a Hackathon/Program that includes Particle - do you have any suggestions?**

Yup! [Here are our best practices](/guide/getting-started/hackathon) about setting devices up for a Hackathon.

Feel free to contact [hello @ particle dot io] with **subject line: *"Sponsorship Inquiry for Particle"* **for any additional information about this. Please include as many details about your event and what sort of participation you’re interested in from Particle and allow a week for response.

## How do I get my deviceID [device ID] ?
* Put the device into [Listening Mode](/guide/getting-started/modes/#listening-mode) mode while being plugged into a computer via USB
* Issue `particle serial identify` from the [particle CLI](https://github.com/spark/particle-cli)
	and it should return the deviceID.

{{#if core}}
## Troubleshoot LED Color on the Core

Here is a [comprehensive community guide](https://community.particle.io/t/spark-core-troubleshooting-guide-spark-team/696) on this issue.
{{/if}}

## Installing Particle CLI

For [installation instructions](https://github.com/spark/particle-cli) and to stay up-to-date on the most recent revisions of our Particle-cli, follow our repo
[Particle CLI Repo](https://github.com/spark/particle-cli).


## {{device}} Pinout Map & Datasheets

{{#if photon}}
Go to our Photon datasheets [collection](/datasheets/photon-datasheet/) to get an in-depth view of the Photon pinouts.
{{/if}}

{{#if core}}
Go to our Core datasheets [collection](/datasheets/core-datasheet/) to get an in-depth view of the Core's pinouts.
{{/if}}

{{#if electron}}
Go to our Electron datasheets [collection](/datasheets/electron-datasheet/) to get an in-depth view of the Electron pinouts.
{{/if}}

## Hardware Questions

### Shields and Accessories

For all hardware related questions in regards to all of our available shields, pinouts, and diagrams, and mini-tutorials
feel free to visit our [Datasheets Section](/datasheets/) on these topics.
This includes:

- Shield Shield
- Relay Shield
- Programmer Shield
- Internet Button
- Particle Dev (Electron, Photon, Core) Kit
- Particle Maker Kit

{{#if photon}}
## Avoid Factory Reset

It’s best to avoid doing a Factory Reset on your Photon. Here’s an in-depth explanation and some ways to avoid it
[link here](https://community.particle.io/t/avoid-factory-reset-what-do-do-with-unexpected-led-behavior-on-a-photon/13358).
{{/if}}

**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
