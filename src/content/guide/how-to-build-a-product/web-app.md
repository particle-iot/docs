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
[a fun video to help explain this](https://vimeo.com/100195659).)

Our [REST API](/reference/api/) allows you easily to
build web services that interact with your products in real time. You can
build these web services in any programming language (Javascript/Node.js,
Ruby, Python, C#, PHP, etc.), although we provide the most support for
Javascript/Node.js through our [ParticleJS](/reference/javascript/) Javascript
SDK. If you are interested in libraries for interacting with our API in other
programming languages, please [search our forum](https://community.particle.io)
for community-generated libraries.


## Creating an OAuth Client

Soon (Late August 2015) you will be able to go to the
[Particle dashboard](https://dashboard.particle.io/) and click
“Create app” to create a client ID and secret.
(Ping @zachary in the [forum](http://community.particle.io/)
if we fall behind on this estimate or you just want to say how much
you want this feature!)

Right now you can make an API call to create an create an OAuth client using the
instructions in our [API reference](/reference/api/#create-an-oauth-client)
Your web app will use the generated client ID and secret  when you hit the
Particle API on behalf of your organization and your customers to manage all the
devices in your product fleet.

As it says in the API reference, two items are coming soon, approximately August
1st, 2015, that you will want to use when building your product:

- creating an OAuth client that is associated with your organization
- using that org client to create scoped access tokens for your customers

(As above, ping @zachary in the forum with questions about this feature.)


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


## Handling authentication and device setup

As described
[earlier](/guide/how-to-build-a-product/dashboard/#organizations-vs-individuals),
end-users of your product are referred to as *customers* in the Particle
ecosystem. As a product creator, you will need to make a strategic decision
about how you will want to handle authentication for your customers. Your choice
will likely be influenced by how much you would like to hide Particle from your
customers, as well as how you would like your product to function.

There are three ways to manage authentication for your customers.
  * **Simple Authentication**: Customers are created and managed directly by Particle
  * **Two-legged Authentication**: You create and manage accounts for your customers yourself, and request scoped access to control customers' devices from Particle
  * **Login with Particle**: Your customers will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0.

You will also need to choose what *medium* your customers will use to
authenticate and setup their devices. This will likely depend on how you
envision your customers interacting with their connected product.
  * **Mobile**: Use an iOS or Android mobile app to allow your customers to authenticate, setup their devices, and interact with their product. [More info](/guide/how-to-build-a-product/mobile-app/)
  * **Web**: Use a web browser and HTTP to allow your customers to authenticate, setup their devices, and interact with their product (*Coming soon*).

### Simple Authentication

Simple authentication involves letting Particle handle the heavy lifting of
customer authentication of device setup. It is the easiest and most
straight-forward method of the three options to implement.

It is important to note that even though Particle is handling authentication in
the background, *it is still possible to hide Particle from your customers*.
This is because all interactions with Particle will happen at the API level. Because
of this, you can still build a whitelabeled front-end to your web or mobile app that will make your interaction
with Particle invisible to your customers.  We even have a system for letting you customize the
password reset page your customers see with your logo, entirely white labeling
Particle's presence behind the scenes.

Using this option, you will not need to implement any custom logic if you are
using Particle's [mobile
SDKs](/guide/how-to-build-a-product/mobile-app/). The SDKs will handle hitting
the correct API endpoints to create customers and claim devices on behalf of
your customers.

Specifically, the *Device Setup Library* is what will handle all logic relating to
claiming devices. The Cloud SDK wraps all session management functionality,
including customer login, logout, and including customer access tokens with API
requests. Mobile SDKs are available for both [iOS](/reference/ios/) and
[Android](/reference/android/).

[PLACEHOLDER FOR WEB APP DOCS]

### Two-legged Authentication

However, it's likely that as you start building a web app, you'll want to have
customers login to your site with accounts that you manage completely.
That allows you to fully customize every aspect of the user experience of your
product, including account creation. Particle has you covered in this scenario
as well. Here's what you do.

When a customer signs up on your website, you create a corresponding customer in
Particle's systems. This also enables the full capabilities of the Particle
dashboard to manage customers and devices. If you manage authentication entirely
on your site, the customers in Particle's systems do not need a password. Only
members of your organization will be able to access and manage the customer
models.

The API endpoint that you will use to create customers is `POST
/v1/orgs/:orgSlug/customers`. This endpoint is [fully documented
here](/reference/api/#create-a-customer).

### Login with Particle

(Coming soon)



Before the customer can setup her device using the mobile app (which you'll
create in the next section of this guide), you need to create an access token
scoped to the customer and give it to her mobile phone or tablet. That way she
can make API calls against the Particle API like getting a claim code as part of
the device setup process.

*Coming soon:* As mentioned in the API reference for
[generating an access token](/reference/api/#generate-a-new-access-token),
around August 1, 2015, you will be able to create access tokens scoped to a
single customer, using an OAuth client attached to your organization.


## What's next?

Expect significant updates to this page in August 2015. We can't wait to show
you how just how easy it is to build a web app for your product on Particle!

After you've got your own web app deployed, you'll want to
[build your iOS and Android mobile apps](/guide/how-to-build-a-product/mobile-app/)
using our mobile SDKs.
