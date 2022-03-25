---
title: Access Tokens
shared: true
columns: two
layout: commonTwo.hbs
description: Using access tokens with the Particle Cloud API
includeDefinitions: [api-helper, api-helper-cloud,  api-helper-extras, codemirror, api-helper-projects, stackblitz, zip]

---

# {{title}}

Access tokens control access to the Particle Cloud API. While you can use a username and password, and optionally a multi-factor authentication (MFA) code to log into things like the [console](https://console.particle.io), behind the scenes this creates an access token that is used to access the cloud API on your behalf.

Devices don't use access tokens; they use a different technique (RSA public-private key pairs) to securely access the cloud. This makes it difficult to spoof or impersonate a device, and also assures that even if you have physical access to a device you can't extract anything that would be able to access the owner's account information.

There are many different types of access tokens and ways of handling them. This document details access the cloud by a developer, product owner, or server. There is also a separate document on [oAuth authorization](/tutorials/device-cloud/authentication/) that describes less-common scenarios for interacting with customer devices from a mobile app or server, sometimes used with Wi-Fi devices.

## Log in

In order to use the interactive features of this page we recommend logging into your account if you have not already done so.

{{> sso}}

## Getting a user access token

There are two general techniques for dealing an access token

- Saving a pre-generated access token (environment variable, file, command line, etc.)
- Prompting the user (via a web page or command line)


### CLI particle token create

The most common create a user access token is to use the Particle CLI [`particle token create`](/reference/developer-tools/cli/#particle-token-create) command. 

```
particle token create
```

Be sure to keep this token secure, because it allows access to your account and all of your devices. By default, the token will expire in 90 days and will need to be issued again. You can make a non-expiring token by using:

```
particle token create --never-expires
```

### Create a token (browser-based)

You can also create a token using this web-browser control. This creates a token for your account, which can access all devices in your sandbox as well as products and organizations you have access to. Be careful with this token! The username, password, and MFA OTP token (if required) are necessary to create a new token.

{{> cloud-api-create-token-simple}}

Copy and paste the token out of the Access Token field to use in locations where you need an access token. (The password is sent using a Particle Cloud API call using Javascript and TLS/SSL encryption.)

### API rate limits

You should not create a new access token for each API operation! You should instead create one at most for each session, and save the token and reuse it where it's safe to do so. The limits for access token and general API calls are:

{{!-- BEGIN shared-blurb 1ef79152-ac34-11ec-b909-0242ac120002 --}}
#### Create an Access Token - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- Can be increased for enterprise customers
- API Route: POST /oauth/token
{{!-- END shared-blurb --}}


{{!-- BEGIN shared-blurb 18c4e2a8-ac34-11ec-b909-0242ac120002 --}}
#### All API functions - API rate limits

- Maximum of 10,000 requests every 5 minutes
- Limited by source IP address (public IP address)
- Can be increased for enterprise customers
- All API Routes
{{!-- END shared-blurb --}}


## Getting an API user token

Both of the techniques above create a user-based access token, which is appropriate for experimenting and some other use cases.

The [API user](/reference/device-cloud/api/#api-users) feature makes it possible to create a non-expiring access token that only allows access to certain Particle cloud APIs. If you have a back-end that only uses a small number of APIs, using an API user can be more secure than using a user token.

It's only available for products (not developer devices). 

### Create API User

{{> cloud-api-user-create}}

You can also create, list, update, and delete [API user tokens using the Particle Cloud API](/reference/device-cloud/api/#creating-an-api-user).

### List or Delete API Users

{{> cloud-api-user-list}}

To delete an API user, list the users in the product or organization. If there are API users defined, a user selector and a **Delete User** button will appear.


## Creating a customer token (oAuth)

Customer claiming and customer tokens are typically only used for Wi-Fi device with an associated mobile app, and are not required, even in that scenario.

As this is a complex topic, see the [customer claiming tutorial](/tutorials/device-cloud/cloud-api/#customer-claiming) for more information.

## Creating a product bearer token (oAuth)

Before the API User feature (above), the only way to access all devices in a product is with a product bearer token. It's generally better to use the API user feature now, because it allows the token to be restricted to only the operations it needs to be able to perform.

If you think you need to use a product bearer token, see the [product bearer token tutorial](/tutorials/device-cloud/cloud-api/#product-bearer-token-authentication-products-).

## Using with servers

When you implementing a server, you may not want to use interactive login. You should instead have a pre-generated login token and store that in a secure location. This is typically:

- Environment variables
- Configuration files

Most cloud-services should include the access token in an environment variable. They generally provide a secure way to store and pass these variables to your cloud server or cloud function.

In some cases, it may be appropriate to store the access token in a configuration file, but make sure you never commit that file to a public source code repository!

### Using an environment variable

{{> project-browser project="node-list-devices2" default-file="app.js" options="stackblitz"}}

The **Try It** button opened a new web browser which allows you to test the node.js application with no software install required on Windows, Mac, Linux, or Chromebook. The node.js Try It feature only works on Chrome browsers.

To call the script, you just [get an access token](#getting-a-user-access-token) (above), and set the environment variable first. 

For the Try It web-based example, enter the command in a single line in the terminal box at the bottom of the window.

```
PARTICLE_AUTH=27fdffffffffffffffffffffffffffffffff4259 node app.js
```

For Mac or Linux, enter as two separate commands:

```
export PARTICLE_AUTH=27fdffffffffffffffffffffffffffffffff4259
node app.js
```

For Windows:

```
set PARTICLE_AUTH=27fdffffffffffffffffffffffffffffffff4259
node app.js
```

Of course replace 27fdffffffffffffffffffffffffffffffff4259 with your access token. This must be a user access token, not an API user token.


## Prompting for login

There are a number of reasons you would want to prompt for login instead of requiring a token:

- Web pages
- Tools where you want to make sure the user really has authorization

Logging in this way requires a username, password, and, if enabled in the account, a MFA (multi-factor authentication) security code. Once you obtain an access token for the user, that token will have access to the developer sandbox, products, and organizations that the user has access to. 

### From a web page

This is a simple example project for prompting for Particle authentication from a web page. Once logged in it creates a popup menu with a list of devices just an an example.

The **Try It** button will open up a separate web browser window where you can try the web page, as well as edit the code. This example, which only uses HTML and Javascript, should work with all major web browsers.


{{> project-browser project="web-login-demo" default-file="script.js" tryit="web-platform-9hmp3r"}}


For more information, see also application note [AN032 Calling API from a web page](/datasheets/app-notes/an032-calling-api-from-web-page/).

### From a node.js command line tool


{{> project-browser project="node-list-devices3" default-file="app.js" options="stackblitz"}}

An explanation of how this project works can be found in the [node.js tutorial](/tutorials/learn-more/node-js/#list-devices-particle-api-). 

The **Try It** button opened a new web browser which allows you to test the node.js application with no software install required on Windows, Mac, Linux, or Chromebook. The node.js Try It feature only works on Chrome browsers.

