---
title: Open Source
layout: commonTwo.hbs
columns: two
---

# How to contribute to Particle's open source repositories

{{box op="start" cssClass="boxed warningBox"}}
This page is no longer maintained and is provided for historical reference only
{{box op="end"}}

Particle is an open-source platform. You might find something you'd like changed, a feature you'd like implemented, or a bug you see a fix for. If so, you can create a pull request or an issue on one of our open-source GitHub repos. Here's a quick run-down of some repos you might want to know about, as well as some information on how to contribute.

## Open-Source repos

Go to https://github.com/particle-iot to see all the available repositories. There are quite a few! Here's a guide to the most popular repos.


### Style guides

Before you contribute to the code base, check out the [`style-guides`](https://github.com/particle-iot/style-guides) repo. This will give you an idea of how we format our code. If you have additional suggestions on good code practices, please make a pull request.


### Firmware

The [`firmware`](https://github.com/particle-iot/device-os) repo contains
the [Device OS](/reference/device-os/firmware/) code that runs on the Core and Photon.


### CLI

The [`particle-cli`](https://github.com/particle-iot/particle-cli) repo contains the code used to run the [Command Line Interface](/getting-started/developer-tools/cli/).


### Particle API JS

The [`particle-api-js`](https://github.com/particle-iot/particle-api-js) repo contains the code used to run [Particle API JS](/reference/cloud-apis/javascript/), the official Particle JavaScript wrapper.


### Mobile

There are several mobile repos, for both iOS and Android.

- iOS Repos
   - [`spark-setup-ios`](https://github.com/particle-iot/spark-setup-ios): the Particle Device Setup library
   - [`spark-sdk-ios`](https://github.com/particle-iot/spark-sdk-ios): the Particle iOS Cloud SDK
   - [`photon-tinker-ios`](https://github.com/particle-iot/photon-tinker-ios): the official Particle App

- Android Repos
   - [`spark-setup-android`](https://github.com/particle-iot/spark-setup-android): the Particle Device Setup library
   - [`spark-sdk-android`](https://github.com/particle-iot/spark-sdk-android): the Particle Android Cloud SDK
   - [`photon-tinker-android`](https://github.com/particle-iot/photon-tinker-android): the official Particle App


### Particle Dev

The [`particle-dev`](https://github.com/particle-iot/particle-dev) repo contains the code used to run [Particle Dev](/getting-started/developer-tools/workbench/), our professional, open source, hackable IDE, designed for use with Particle devices.


### Documentation

The [`docs`](https://github.com/particle-iot/docs) repo contains Particle's open source [documentation](/reference/device-os/firmware/). If you want something to be added or changed, just make a pull request.


### Official libraries

Particle maintains several open source libraries to be used with official Particle shields. They include:

- [`InternetButton`](https://github.com/particle-iot/InternetButton): the library intended for use with the [Internet Button](/reference/datasheets/accessories/legacy-accessories/#internet-button).
- [`RelayShield`](https://github.com/particle-iot/RelayShield): the library intended for use with the [Photon Relay Shield](/reference/datasheets/accessories/legacy-accessories/#relay-shield)
- [`PowerShield`](https://github.com/particle-iot/PowerShield): the library intended for use with the [Photon Power Shield](/reference/datasheets/accessories/legacy-accessories/#power-shield)


### Local cloud

The [`spark-server`](https://github.com/particle-iot/spark-server) repo is an API compatible open source server for interacting with devices speaking the [`spark-protocol`](https://github.com/particle-iot/spark-protocol). If you are interested in the local cloud, this repo is for you.


### Hardware design

We share some hardware design files for each of our dev boards. These open source repos are designed mostly to give you a sense of what we are working on, but you are welcome to make contributions here as well if you have interest and expertise.

Current hardware design repos include:
- [`electron`](https://github.com/particle-iot/electron)
- [`photon`](https://github.com/particle-iot/photon)
- [`core`](https://github.com/particle-iot/core)
- [Official Libraries](#official-libraries) such as the [`InternetButton`](https://github.com/particle-iot/InternetButton), [`RelayShield`](https://github.com/particle-iot/RelayShield), and [`PowerShield`](https://github.com/particle-iot/PowerShield)
- [`hardware-libraries`](https://github.com/particle-iot/hardware-libraries)


## Using GitHub

If you're new to GitHub expert, go [here](https://guides.github.com/introduction/flow/index.html) to get a sense of GitHub flow. We also suggest the [GitHub for Desktop](https://desktop.github.com/) application, which has a great built-in tutorial on forking, editing, merging, and creating a pull request.

If you prefer the command line, here's an [extra fast tutorial](http://rogerdudler.github.io/git-guide/) on how to get started. Just make sure you [fork a repo to your GitHub account](https://help.github.com/articles/fork-a-repo/) before cloning your fork to edit on your local machine.

If you have your own favorite tutorials on how to `git`, make a pull request on this documentation to add them!

**Also**, check out and join our [community forums](https://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](https://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](https://community.particle.io/c/troubleshooting)
{{/if}}
