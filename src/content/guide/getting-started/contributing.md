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

Go to http://github.com/spark to see all the available repositories. There are quite a few! Here's a guide of the most popular repos.


### Style guides

Before you contribute to the code base, check out the `style-guides` repo [here](https://github.com/spark/style-guides). This will give you an idea of how we format our code. If you have additional suggestions on good code practices, please make a pull request.


### Firmware

The `firmware` [repo]](https://github.com/spark/firmware) contains the [system firmware](/reference/firmware) that runs on the Core and Photon.


### CLI

The `particle-cli` [repo](https://github.com/spark/particle-cli) contains the code used to run the [Command Line Interface](/guide/tools-and-features/cli).


### ParticleJS

The `sparkjs` [repo](https://github.com/spark/sparkjs) contains the code used to run [ParticleJS](/reference/javascript), the official Particle javascript wrapper.


### Mobile

There are several mobile repos, for both iOS and Android.

- iOS Repos
   - `spark-setup-ios` [repo](https://github.com/spark/spark-setup-ios): the Particle Device Setup library for iOS
   - `spark-sdk-ios` [repo](https://github.com/spark/spark-sdk-ios): the Particle iOS Cloud SDK for iOS
   - `photon-tinker-ios` [repo](https://github.com/spark/photon-tinker-ios): the official Particle App you can download for iOS

- Android Repos
   - `spark-setup-android` [repo](https://github.com/spark/spark-setup-android): the Particle Device Setup library for Android
   - `spark-sdk-android` [repo](https://github.com/spark/spark-sdk-android): the Particle iOS Cloud SDK for Android
   - `photon-tinker-android` [repo](https://github.com/spark/photon-tinker-android): the official Particle App you can download for Android


### Particle Dev

The `spark-dev` [repo](https://github.com/spark/spark-dev) contains the code used to run [Particle Dev](/guide/tools-and-features/dev), our professional, open source, hackable IDE, designed for use with the Particle devices.


### Documentation

The `docs` [repo](https://github.com/spark/docs) contains Particle's open source [documentation](/guide/getting-started/intro). If you want something to be added or changed, just make a pull request.


### Internal Libraries

Particle maintains several open source libraries to be used with official Particle shields. They include:

- `InternetButton` [repo](https://github.com/spark/InternetButton): the library intended for use with the [Internet Button](/datasheets/photon-shields/#internet-button).
- `RelayShield` [repo](https://github.com/spark/RelayShield): the library intended for use with the [Photon Relay Shield](/datasheets/photon-shields/#relay-shield)
- `PowerShield` [repo](https://github.com/spark/PowerShield): the library intended for use with the [Photon Power Shield](/datasheets/photon-shields/#power-shield)


### Local Cloud

The `spark-server` [repo](https://github.com/spark/spark-server) is an API compatible open source server for interacting with devices speaking the `spark-protocol`. If you are interested in the local cloud, this repo is for you.


### Hardware Design

We share some hardware design files for each of our dev boards. These open source repos are designed more to give you a sense of what we are working on, but you are welcome to make contributions here as well if you have interest and expertise.

- `electron` hardware [repo](https://github.com/spark/electron)
- `photon` hardware [repo](https://github.com/spark/photon)
- `core` hardware [repo](https://github.com/spark/core)


## Using Github

During an episode of Particle Interactions, Christine and Will went over how to contribute to the repos. This video is below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/JnI2VjXEAiU?t=15m15s" frameborder="0" allowfullscreen></iframe>

If you're already a Github expert, no need to watch. Otherwise, we suggest the [Github for Desktop](https://desktop.github.com/) application, which has a great built-in tutorial on forking, editing, merging, and creating a pull request.

If you prefer the command line, here's an [extra fast tutorial](http://rogerdudler.github.io/git-guide/) on how to get started. Just make sure you [fork a repo to your Github account](https://help.github.com/articles/fork-a-repo/) before cloning your fork to edit on your local machine.

If you have your own favorite tutorials on how to `git`, make a pull request on this documentation to add them!