---
title: Building your own web app
columns: two
template: guide.hbs
order: 5
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
[a fun video to help explain this](https://vimeo.com/100195659).)

Our [REST API](/reference/api/) allows you easily to
build web services that interact with your products in real time. You can
build these web services in any programming language (Javascript/Node.js,
Ruby, Python, C#, PHP, etc.), although we provide the most support for
Javascript/Node.js through our [ParticleJS](/reference/javascript/) Javascript
SDK. If you are interested in libraries for interacting with our API in other
programming languages, please [search our forum](https://community.particle.io)
for community-generated libraries.

You have already learned a lot about what you'll need to do to build your web
application in the last section on [Authentication &
Security](/guide/how-to-build-a-product/authentication/). This section will
focus more specifically on building web applications.

## Collecting data through webhooks or an event stream

Imagine you're making a social game that creates a live feed of pictures as
customers use your product. Each time a customer hits a physical button on the
hardware product, a picture is added to a Twitter-like timeline.
To accomplish this, you will listen to the events published by all your products
in customers' hands all over the world.

There are two ways to do this.

### Webhooks

Webhooks are well-understood and easy to set up. You write your web app with a
URL that Particle servers will call whenever one of your products publishes an
event.

You make a single Particle API call to create the webhook, and from that moment
on, events matching your webhook will trigger our servers to call your web app.

*Coming soon:* the ability to create a webhook for an organization or product.

Check out our [Webhooks Guide](/guide/tools-and-features/webhooks/) for more
information.

While easy to understand and set up, webhooks are not scalable. If you imagine
having a small beta run of 1000 devices in customers' hands, each publishing on
average once per minute, then your servers will have to handle, _on average_ 17
requests per second. The load will not be smooth either. There will be rapid
spikes of hundreds of requests within a few seconds. Scale up your deployment
and the situation only gets worse.

### Event streams

If you've created an app that subscribes to Twitter's streaming API, you'll feel
right at home with the other solution. Your server can subscribe to a single
stream of server-sent events that will efficiently transport all the data your
products can publish without all the HTTP overhead for every event.

Check out our API reference on
[subscribing to event streams](/reference/api/#subscribing-to-events)
for more information.

When deploying on Heroku, you'll need to create worker process to listen to the
event stream. Here are some links to help out.

- https://github.com/heroku-examples/node-articles-nlp
- https://devcenter.heroku.com/articles/asynchronous-web-worker-model-using-rabbitmq-in-node

*Coming soon:* a easy-to-deploy heroku example.
(Ping @zachary in the [forum](https://community.particle.io/) about this.)


## Initiating device behavior by calling functions

Now imagine you want a customer's device to dance rainbows when someone likes a
picture they've posted. The web app will need to hit the Particle API to call a
function on one device to cause it to dance rainbows.

## What's next?

Expect significant updates to this page in August 2015. We can't wait to show
you how just how easy it is to build a web app for your product on Particle!

If your product is better suited for a mobile app, you will wantto
[build your iOS and Android mobile apps](/guide/how-to-build-a-product/mobile-app/)
using our mobile SDKs.
