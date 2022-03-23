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

## Getting an access token

### Particle CLI


### Cloud API


### Prompting for login


## Testing an access token



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


                        