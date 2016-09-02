---
title: Google Cloud Platform
template: tutorials.hbs
columns: two
order: 100
---

# {{title}} Integration

Particle has teamed up with Google to create a 1st-class integration
with <a href="https://cloud.google.com/" target="_blank">Google Cloud
Platform</a>. Google Cloud Platform enables developers to build, test,
and deploy applications on Google’s highly scalable and reliable
infrastructure.

<img src="/assets/images/particle+gcp.png" title="Particle + Google
Cloud Platform"/>
<p class="caption">Send device data from Particle into Google Cloud
Platform with ease</p>

Streaming data from Particle devices into Google Cloud Platform creates
countless opportunities to add intelligence and robustness to your IoT
product. Here are some examples of things you could do with Particle +
Google Cloud Platform:

- Store data from a fleet of devices in a durable, long-term hosted
  database
- Combine data sources from an entire fleet into unified data flows that
  provide product-wide business intelligence
- Take action in the physical world based on results of predictive 
  analysis on a historical data set

Google's Cloud Platform is comprised of <a
href="https://cloud.google.com/products/" target="_blank">dozens of
products & services</a>,
providing you with a variety of potential IoT applications. This
tutorial will focus on the first example use case: storing data from
Particle devices into a hosted database inside Google Cloud Platform.

## Preconfiguration

Streaming data into Google Cloud Platform requires an entry point.
<a href="https://cloud.google.com/pubsub/docs/overview"
target="_blank">Google Cloud Pub/Sub</a> provides a scalable,
flexible and reliable entry point for Particle device data. The Particle
cloud will *publish* device data to a Pub/Sub *topic*. Once inside
Google Cloud Platform, any number of *subscribers* can listen for
messages sent to the topic, and relay them to other Google Cloud
Platform products & services.

## Storing Data in a Datastore Database


