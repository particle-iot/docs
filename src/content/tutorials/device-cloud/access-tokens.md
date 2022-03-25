---
title: Access Tokens
shared: true
columns: two
layout: commonTwo.hbs
description: Using access tokens with the Particle Cloud API
includeDefinitions: [api-helper, api-helper-cloud,  api-helper-extras, api-helper-json, codemirror]
---

# {{title}}

Access tokens control access to the Particle Cloud API. While you use a username and password, and optionally a multi-factor authentication (MFA) code to log into things like the [console](https://console.particle.io), behind the scenes this creates an access token that is used to access the cloud API on your behalf.

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


## Creating a product bearer token (oAuth)

Before the API User feature (above), the only way to access all devices in a product is with a product bearer token. It's generally better to use the API feature now, because it allows the token to be restricted to only the operations it needs to be able to perform.


## Using with servers


- Environment variables
- Configuration files



## Prompting for login

There are a number of reasons you would want to prompt for login instead of requiring a token:

- Web pages
- Tools where you want to make sure the user really has authorization

Logging in this way requires a username, password, and, if enabled in the account, a MFA (multi-factor authentication) security code. Once you obtain an access token for the user, that token will have access to the developer sandbox, products, and organizations that the user has access to. 

### From a web page


For more information, see also application note [AN032 Calling API from a web page](/datasheets/app-notes/an032-calling-api-from-web-page/).

### From a node.js command line tool


## Testing an access token


{{!-- 

## What is an access token

A token is a series of 40 hexadecimal digits, like `67acf71ae39272f967d352bc190f415bd811c34d`.

- A token can represent a user, which allows access to resources (developer devices, products, and organizations) that the user has access to
  - A user may have different levels of access to products through [Team Access Controls](/tutorials/product-tools/team-access-controls/).
- An [API user token](/tutorials/device-cloud/cloud-api/#api-users) allows fine-grained control to certain Particle Cloud API calls
  - API user tokens are only used with products
  - API user tokens cannot log into the console, Web IDE, etc.
- A customer token provides access only to a single user's devices for making function, variable, publish, and subscribe operations.
  - Customer tokens are only used with products
  - Customer tokens do not allow flashing code.
  - Customer tokens cannot log into the console, Web IDE, etc.
- A product token provides access to all devices in a product.
  - This is similar to an API user token, but does not offer the ability to restrict access to only certain APIs.
  - Product tokens cannot log into the console, Web IDE, etc.
  
Tokens generally have a defined lifetime ranging from minutes, to days, months, or forever. 

--}}
                        