---
title: Open Source
template: guide.hbs
columns: two
devices: [ photon, core ]
order: 9
---

# How to Contribute to Particle's Open Source Repositories

Particle is an open-source platform. You might find something you'd like changed, a feature you'd like implemented, or a bug you see a fix for. If so, you can create a pull request or an issue on one of our open-source Github repos. Here's a quick run-down of some repos you might want to know about, as well as some information on how to contribute.

## Open-Source Repos

Go to http://github.com/spark to see all the available repositories. There are quite a few! Here's a guide to the most popular repos.


### Style guides

Before you contribute to the code base, check out the [`style-guides`](https://github.com/spark/style-guides) repo. This will give you an idea of how we format our code. If you have additional suggestions on good code practices, please make a pull request.


### Firmware

The [`firmware`](https://github.com/spark/firmware) repo contains the [system firmware](/reference/firmware) that runs on the Core and Photon.


### CLI

The [`particle-cli`](https://github.com/spark/particle-cli) repo contains the code used to run the [Command Line Interface](/guide/tools-and-features/cli).


### ParticleJS

The [`sparkjs`](https://github.com/spark/sparkjs) repo contains the code used to run [ParticleJS](/reference/javascript), the official Particle javascript wrapper.


### Mobile

There are several mobile repos, for both iOS and Android.

- iOS Repos
   - [`spark-setup-ios`](https://github.com/spark/spark-setup-ios): the Particle Device Setup library
   - [`spark-sdk-ios`](https://github.com/spark/spark-sdk-ios): the Particle iOS Cloud SDK
   - [`photon-tinker-ios`](https://github.com/spark/photon-tinker-ios): the official Particle App

- Android Repos
   - [`spark-setup-android`](https://github.com/spark/spark-setup-android): the Particle Device Setup library
   - [`spark-sdk-android`](https://github.com/spark/spark-sdk-android): the Particle Android Cloud SDK
   - [`photon-tinker-android`](https://github.com/spark/photon-tinker-android): the official Particle App


### Particle Dev

The [`spark-dev`](https://github.com/spark/spark-dev) repo contains the code used to run [Particle Dev](/guide/tools-and-features/dev), our professional, open source, hackable IDE, designed for use with Particle devices.


### Documentation

The [`docs`](https://github.com/spark/docs) repo contains Particle's open source [documentation](/guide/getting-started/intro). If you want something to be added or changed, just make a pull request.


### Official Libraries

Particle maintains several open source libraries to be used with official Particle shields. They include:

- [`InternetButton`](https://github.com/spark/InternetButton): the library intended for use with the [Internet Button](/datasheets/photon-shields/#internet-button).
- [`RelayShield`](https://github.com/spark/RelayShield): the library intended for use with the [Photon Relay Shield](/datasheets/photon-shields/#relay-shield)
- [`PowerShield`](https://github.com/spark/PowerShield): the library intended for use with the [Photon Power Shield](/datasheets/photon-shields/#power-shield)


### Local Cloud

The [`spark-server`](https://github.com/spark/spark-server) repo is an API compatible open source server for interacting with devices speaking the [`spark-protocol`](https://github.com/spark/spark-protocol). If you are interested in the local cloud, this repo is for you.


### Hardware Design

We share some hardware design files for each of our dev boards. These open source repos are designed mostly to give you a sense of what we are working on, but you are welcome to make contributions here as well if you have interest and expertise.

Current hardware design repos include:
- [`electron`](https://github.com/spark/electron) 
- [`photon`](https://github.com/spark/photon) 
- [`core`](https://github.com/spark/core) 
- [Official Libraries](/guide/getting-started/contributing/photon/#official-libraries) such as the [`InternetButton`](https://github.com/spark/InternetButton), [`RelayShield`](https://github.com/spark/RelayShield), and [`PowerShield`](https://github.com/spark/PowerShield)
- [`eagle-libraries`](https://github.com/spark/eagle-libraries)


## Using Github

During an episode of Particle Interactions, Christine and Will went over how to contribute to the repos. This video is below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/JnI2VjXEAiU?t=17m11s" frameborder="0" allowfullscreen></iframe>

If you're already a Github expert, no need to watch. Otherwise, go [here](https://guides.github.com/introduction/flow/index.html) to get a sense of Github flow. We also suggest the [Github for Desktop](https://desktop.github.com/) application, which has a great built-in tutorial on forking, editing, merging, and creating a pull request.

If you prefer the command line, here's an [extra fast tutorial](http://rogerdudler.github.io/git-guide/) on how to get started. Just make sure you [fork a repo to your Github account](https://help.github.com/articles/fork-a-repo/) before cloning your fork to edit on your local machine.

If you have your own favorite tutorials on how to `git`, make a pull request on this documentation to add them!