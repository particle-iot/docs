---
title: Authentication & Security
columns: two
template: guide.hbs
order: 4
---

# {{title}}

## Introduction

For any Particle-powered product to function properly, there are **four involved
parties**:

* Particle
* Your organization's applications
* A device
* The customer

![four involved authentication parties](/assets/images/four-involved-parties.png)
<p class="caption">Each of the four parties plays a critical role in how
your product will function</p>

Understanding how all four interact, manage data, and  secure information is critical to launching a successful product on the Particle platform.
Specifically, this section of the guide will go deep into decisions you
must make on authentication and security with regards to your product.
The results of these decisions will impact where and how data is
stored as well as the ways in which your organization's applications
interact with Particle to control devices and manage customers.


## OAuth
Particle tightly adheres to OAuth specifications to ensure secure and
correct access to private data and devices. OAuth is an open standard
for authorization, providing client applications "secure delegated
access" to server resources on behalf of a resource owner
([Wikipedia](https://en.wikipedia.org/wiki/OAuth)).

Integral to OAuth is the concept of *clients*, and *client credentials*.
An OAuth client generally represents an application, like a native iOS
application running on an iPhone or a web app running in a browser. As
part of the setup process for your product, you will need to create an
OAuth client for your organization.

Your organization's OAuth client will be needed when hitting the
Particle API to perform actions that only your organization's team
members or applications should be able to perform. An example of this is
creating a customer that belongs to your organization via the Particle
API. Only those with a valid OAuth client will be able to perform this
action, protecting your organization from fake or erroneous new customer
accounts.

*Client credentials* are comprised of two pieces of information: A
**client ID**, and a **secret**. Passing these two pieces of data to
the Particle API will allow you to create **access tokens**, which are
described in detail in the next section.

### Scopes

Scopes allow you to specify exactly what type of access the client (and
tokens created using the client) should have. Scopes are used for
security reasons to limit the allowed applications of OAuth client
credentials. Depending on which authentication method you choose, you
may need to specify a scope when creating your OAuth client. [More on
scopes](http://tools.ietf.org/html/rfc6749#section-3.3).

### Creating an OAuth Client

Soon (Late August 2015) you will be able to go to the
[Particle dashboard](https://dashboard.particle.io/) and click
“Create app” to create a client ID and secret.
(Ping @zachary in the [forum](http://community.particle.io/)
if we fall behind on this estimate or you just want to say how much
you want this feature!)

![Create OAuth Client](/assets/images/create-oauth-client.png)
<p class="caption">Use the dashboard to create your OAuth client
credentials</p>

Right now you can make an API call to create an create an OAuth client using the
instructions in our [API reference](/reference/api/#create-an-oauth-client)
Your web app will use the generated client ID and secret  when you hit the
Particle API on behalf of your organization and your customers to manage all the
devices in your product fleet.

In the API reference, note how there is an optional parameter called
`organization`. In order to create client credentials for your
organization, you should pass the **slug** of your organization as this
parameter. The easiest way to find the slug of your organization is in
the URL address when viewing your organization's dashboard, just after
the `/` in `dashboard.particle.io/`. Example:
`dashboard.particle.io/my-org`, where `my-org` is the organization slug.
The API request to create client credentials scoped to your organization
will look like this:

```bash
$ curl -d name=MyApp -d type=installed -d organization:my-org -d access_token=1234
https://api.particle.io/v1/clients
```

The `type` of the OAuth client will depend on your authentication method
and application medium (web or mobile). More on this
[later](#choosing-an-authentication-method).

There is also an optional `scope` parameter, which can be set to
`create_customer`. This option will scope the client to only be able
to create customers for your organization. Pass this parameter if you
are using [simple authentication](#simple-authentication).

If successful, the API will return your client ID and secret in the
response to the request. **Never expose your client credentials,
especially if they are unscoped**. Credentials are sensitive pieces of
information that, if exposed, could allow unauthorized people or
applications to interact with your organization's data and devices. [More
on registering clients](http://tools.ietf.org/html/rfc6749#section-2).

## Access Tokens
A related concept to understand is how Particle uses access
tokens for authentication and security. If you have ever logged into the
Web IDE, called a function on a Particle device, or read a variable via
the API, you are already using access tokens! It is important to note
that OAuth credentials are needed to create access tokens.

### What's an access token?

An *access token* is a special code that is tied to a Particle customer
or user, that allows reading data from and sending commands to that
person's device(s). Any API endpoint that returns private information,
or allows control of an individual's device requires an access token.
Tokens *inherit scopes* from the OAuth clients used to create them, and
can have more specific scopes of their own. [More on access
tokens](http://tools.ietf.org/html/rfc6749#section-1.4).

Here's a specific example. Let's say that on one of your own personal
devices (with device ID `0123456789abcdef01234567`), you want to call the `lightsOn` function. Here is how you would
do this using the API:

```bash
curl
https://api.particle.io/v1/devices/0123456789abcdef01234567/lightsOn -d
arg=livingRoom -d access_token=1234
```

In order for the API to call the function on your device, you *must*
include a valid access token for the user that is the owner of the
device. In this case, you include your access token of `1234`. Behind
the scenes, the API looks up the access token in our database, checks to
make sure that the user who created the access token is the owner of the
device included in the request, and will only continue if the token has
the proper permissions to call the function.

### Customer access tokens

Similarly, *your customers* will have access tokens that provide
verification of ownership of a particular device. As a product creator,
you will be creating a web or mobile application for your customers to
use your product. As part of your application, you will generate access
tokens on behalf of your customers, and use these access tokens to make
the desired calls to the Particle API to successfully read data from and
control that customer's device.

![Customer access token](/assets/images/customer-access-token.png)
<p class="caption">The access token is linked to the customer and used
to control the customer's device(s)</p>

Luckily, the mobile SDKs and ParticleJS will expose helper methods to
handle token creation and management, without much/any additional code
needed from you or your engineers.

## Choosing an Authentication Method

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
  * **Login with Particle**: Your customers will create a Particle account and a separate account on your website, and link the two together using OAuth 2.0 *(Coming soon)*.

You will also need to choose what *medium* your customers will use to
authenticate and setup their devices. This will likely depend on how you
envision your customers interacting with their connected product.
  * **Mobile**: Use an iOS or Android mobile app to allow your customers to authenticate, setup their devices, and interact with their product. [More info](/guide/how-to-build-a-product/mobile-app/)
  * **Web**: Use a web browser and HTTP to allow your customers to authenticate, setup their devices, and interact with their product (*Coming soon*).

## Simple Authentication

## Two-Legged Authentication

## Login with Particle

