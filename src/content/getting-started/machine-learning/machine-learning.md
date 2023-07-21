---
title: Machine learning
layout: commonTwo.hbs
columns: two
---

# {{title}}

Particle has teamed up with [Edge Impulse](https://www.edgeimpulse.com/) to provide edge machine learning (ML), artificial intelligence (AI) for the Particle platform, in particular the P2 and Photon 2. The faster processor and large RAM and flash memory on these devices are ideal for on-device machine learning.

You can find additional projects on the [Edge Impulse ML projects page](https://www.edgeimpulse.com/projects/all?search=particle).

## Tutorials

We have two tutorials available that utilize the Photon 2 and the PDM digital microphone in the [Edge ML Kit](/reference/datasheets/accessories/edge-ml-kit/).

![Photon 2 with Microphone](/assets/images/edge-kit/mic-3.jpeg)

### Doorbell SMS sender

![Doorbell SMS](/assets/images/edge-kit/doorbell.jpeg)

The doorbell detector works by training a model to detect the sound of your doorbell. The Photon 2 runs a classifier to detect this sound and when detected, publishes as Particle event, which triggers a Webhook, which goes to a Twilio service to generate a SMS message. 

The sound processing is done entirely on-device and no ambient audio is uploaded to the Internet and cannot be saved locally. 

- [Doorbell SMS tutorial page](/getting-started/machine-learning/doorbell/)

### You're muted

![Zoom](/assets/images/edge-kit/zoom.png)

This detector is trained to recognize the phrase "You're muted" and generate a keystroke to unmute your Zoom session. 

- [You're muted tutorial page](/getting-started/machine-learning/youre-muted/)
