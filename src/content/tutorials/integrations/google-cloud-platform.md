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

<img src="/assets/images/particle+gcp.png" alt="Particle + Google
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
providing you with a variety of potential IoT applications.

Some of the most relevant Google Cloud Platform products to use with Particle are:
- <a href="https://cloud.google.com/datastore/" target="_blank">Cloud Datastore</a>: A highly-scalable NoSQL database for your web and mobile applications
- <a href="https://cloud.google.com/bigquery/" target="_blank">BigQuery</a>: A fast, economical and fully managed data warehouse for large-scale data analytics
- <a href="https://cloud.google.com/sql/" target="_blank">SQL</a>: A fully managed MySQL database service
- <a href="https://cloud.google.com/dataflow/" target="_blank">Cloud Dataflow</a>: A fully-managed cloud service and programming model for batch and streaming big data processing
- <a href="https://cloud.google.com/prediction/" target="_blank">Prediction API</a>: Machine learning to analyze your data and make predictions

Many of these products relate to data storage. For more information on finding the right data storage option for your particular use case, check out
the docs on <a href="https://cloud.google.com/storage-options/" target="_blank">choosing a storage option</a>.
This tutorial will focus on the first example use case: storing data from
Particle devices into Google Cloud Platform Datastore.

## Preconfiguration in Google Cloud Platform

Regardless of which Google Cloud Platform product(s) you'd like to use,
streaming data into Google Cloud Platform requires an entry point.
<a href="https://cloud.google.com/pubsub/docs/overview"
target="_blank">Google Cloud Pub/Sub</a> provides a scalable,
flexible and reliable entry point for Particle device data into
Google Cloud Platform.

<img src="/assets/images/Particle+GCP-architecture.png" alt="Particle and Google Cloud Platform architecture diagram"/>
<p class="caption">Device data gets routed through the Particle Cloud into Google Cloud Pub/Sub. You can then use that data in
any number of Google Cloud Platform products.</p>

The Particle cloud will *publish* device data to a Pub/Sub *topic*.
Once inside, Google Cloud Platform, any number of *subscribers* can listen for
messages sent to the topic, and relay them to other Google Cloud
Platform products & services. Once you have enabled the Google Cloud Platform integration,
the Particle Cloud will begin listening for Particle publishes with a specific event name from your
fleet of devices, and forward the data payload onto your Google Cloud Pub/Sub topic.

Before setting up the integration in Particle, there are a few pre-configuration steps that you
must do inside Google Cloud Platform. These instructions are also included in the Particle Console
when you enable the Google Cloud Platform integration.

### Sign up for a Google Cloud Platform Account

If you don't already have one, you'll need to sign up for a Google Cloud Platform Account to use this integration.

Visit the <a href="https://cloud.google.com/free-trial/" target="_blank">Google Cloud Platform signup page</a>. Click the "Try it Free" button, and enter the requested information.
Upon signup, you will be enrolled in a 60-day free trial of the service, with $300 in Google Cloud Platform credit.

You can use the <a href="https://cloud.google.com/products/calculator/" target="_blank">Google Cloud Platform Pricing Calculator</a>
to estimate costs of any Google Cloud Platform product.

### Create a Google Cloud Platform Project

In your Google Cloud Platform console, find the project dropdown in the top navigation bar, and select "Create project."
Then, give your project a name. When you're done, click "Create."

<img src="/assets/images/gcp-create-project.png" class="full-width" alt="Create a Google Cloud Platform project"/>

### Create a Pub/Sub Topic with the correct permissions

#### Navigate to Pub/Sub

Click the hamburger menu icon in the top navigation bar. Then, from the slideout menu, select "Pub/Sub" from the list of Google Cloud Platform products.

<img src="/assets/images/gcp-find-pub-sub.png" class="full-width" alt="Navigate to Pub/Sub"/>

#### Create a Topic

If this is your first time using Pub/Sub, you will need to enable the Pub/Sub API before you can create a topic. Once the API is enabled for your account, click on the "Create topic" button from the Pub/Sub dashboard. Then, give your topic a name. Google automatically prefixes your topic name to ensure that you will publish to the right place.

<img src="/assets/images/gcp-create-topic.png" class="full-width" alt="Create a Google Cloud Platform project"/>

#### Give Particle Permission to Publish to your Topic

Once created, check the checkbox next to your topic name, and click on the "Permissions" button. Then, in the "Add members" box, paste in **particle-public@particle-public.iam.gserviceaccount.com**. Choose **Pub/Sub Publisher** from the the "Select a role" dropdown. When you're done, click "Add." Congrats, you're all done!

<img src="/assets/images/gcp-add-permissions.png" class="full-width" alt="Add Particle's Service Account to your Google Cloud Topic"/>

## Storing Data in a Datastore Database


