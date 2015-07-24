---
title: Building your own web app
columns: two
template: guide.hbs
order: 4
---

# Building your own web app

For most connected products, the heart of the customer experience lies with the
hardware device and the firmware that runs it. But to unlock the true potential
of the internet of things, to create a valuable, maybe even magical experience
for your customers, there need to be capabilities that rely on the power of the
internet.

How do you surprise and delight your customers?
You want them to think, “Wow! How is that possible?”
How do you take deeply complex data from around the internet and make a product
that “just works” even though it shouldn't at that price point?

_You do the hard work on a server, keeping the device simple._

(Back when we used to be named Spark, we made
[a video to help explain this](https://vimeo.com/100195659).)

Our [REST API](/reference/api/) allows you easily to build web services that
interact with your products in real time. You can build these web services in
any programming language (Javascript/Node.js, Ruby, Python, C#, PHP, etc.),
although we provide the most support for Javascript/Node.js through our
[ParticleJS](/reference/javascript/) Javascript SDK.
If you are interested in libraries for interacting with our API in other
programming languages, please [search our forum](https://community.particle.io)
for community-generated libraries.

## Creating an OAuth Client

Go to the [Particle dashboard](https://dashboard.particle.io/) and click
“Create app”. In the process you'll generate a client ID and secret.
Your web app will use these when you hit the Particle API.

## Collecting data through webhooks or an event stream

Imagine you're making a social game that creates a live feed of pictures as
customers use your product. Each time a customer hits a button, a picture is
added to a twitter-like timeline. To accomplish this, you will listen to the
events published by all your products in customers' hands all over the world.

Note: [subscribing to event streams ](/reference/api/#subscribing-to-events)
is more efficient than webhooks, but it is not as simple to deploy on heroku.

JK - worker process...

- https://github.com/heroku-examples/node-articles-nlp
- https://devcenter.heroku.com/articles/asynchronous-web-worker-model-using-rabbitmq-in-node

## Initiating device behavior by calling functions

Now imagine you want a customer's device to dance rainbows when someone likes a
picture they've posted. The web app will need to hit the Particle API to call a
function on one device to cause it to dance rainbows.

## Handling authentication and device setup

When a customer signs up on your website, you create a corresponding customer in
Particle's systems. This lets you use the full capabilities of the Particle
dashboard to manage customers and devices. If you manage authentication entirely
on your site, the customers in Particle's systems do not need a password. Only
members of your organization will be able to access and manage them.

Before the customer can setup her device, you need to create an access token
scoped to the customer and give it to her browser or mobile app. That way she
can make API calls against the Particle API like getting a claim code as part of
the device setup process.

## Quick deploy of a web app (Node.js on Heroku)

TODO

## Resources for building a complex web service for your product

TODO
