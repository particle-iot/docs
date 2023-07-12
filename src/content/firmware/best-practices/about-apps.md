---
title: About apps
layout: commonTwo.hbs
columns: two
description: Learn more mobile and web apps for Particle IoT devices
---

# {{title}}

There are many ways to you can build mobile or web apps for your Particle device. This guide is intended to help you narrow down which option will work best for your specific scenario.

## Early decisions

### Cellular vs. Wi-Fi

This is actually one of the most important differentiators, because there Wi-Fi devices need a way to configure Wi-Fi credentials for your customer's Wi-Fi network. This is typically a custom mobile app.

With cellular devices, you generally don't have to directly communicate with the device to set it up, so there are many more options available.

For more the options available for Wi-Fi setup, see [Wi-Fi setup options](/reference/device-os/wifi-setup-options/).


### Web app or mobile app

If you don't have to worry about setting up customer Wi-Fi, you may prefer to use a web-based user interface instead of a mobile app. This is often easier to implement, and you don't have to worry about mobile app testing, app store submissions, and so on. And your customer doesn't need to install apps.

{{note op="start" type="developer"}}
For personal home automation tasks, using a web-based app is often the easiest way to build a custom solution. Both iOS and Android allow you to bookmark a page on your mobile device home screen, making it easy to get to. Of course you may want to experiment with creating a mobile app, and you can do that too.
{{note op="end"}}


### Framework or native mobile apps

There are many mobile app frameworks available now, and some can make it significantly easier to implement apps for both Android and iOS out of a single code base. Some popular frameworks include:

- React Native
- Flutter
- Xamarin
- Ionic
- Apache Cordova (Adobe PhoneGap)

In addition to making development easier, these frameworks are popular, and if you are contracting out mobile app development, it may be easier to find a developer to do the work for you. Some of these frameworks can also generate web apps.

You may prefer to use the native tools and SDKs for iOS and Android. If you only want to support one platform, this is often a good choice.

## Customers

We recommend that you implement your own user management features on your front and back-end. You may want to use common third-party login features such as login with Google, Facebook, Twitter, etc. instead of implementing your own from scratch, but this not required.

Instead of issuing Particle access tokens to your users, encapsulate all Particle REST API calls within your back-end. This will greatly simplify your implementation and eliminate the need to manage user-specific Particle access tokens, customer accounts, and device claiming.

This also encapsulates Particle-specific API calls to a small part of your back-end. This eliminates the need to have a Particle-specific mobile or web app developer if you are contracting out your app development.

{{collapse op="start" label="Show older information"}}

Customers are a feature of the Particle API, mainly to make it easier for your customers using a mobile app to interact with their devices. However, the use of customers is optional, and even though initially they look simple, are actually quite complicated to use.

### Why customers

The purpose is to allow secure access for a customer to access only their devices from a mobile app. A customer can make function and variable calls to their devices within your product, but cannot access other features like the console, or flashing code.

In some cases, the Particle device may be collecting data and storing it on your server, and your customer doesn't need to directly interact with the Particle device. In this use case, you almost certainly do not need to use customers.

You could also use customers with a web app, but it's rare and there are few advantages to doing so.

### Types of customers

There are two types of customers:

- Simple auth customers
- Two-legged shadow customers

With **simple auth customers**, the user registers with an email address and a password, and Particle handles storing this information and authenticating the user. While theoretically simple, in practice you likely won't be able to avoid having a server at some point. For example, there is no built-in way of handling password reset for simple auth users. MFA (multi-factor authentication) is not supported for simple auth.

![](/assets/images/tutorials/simple-auth.png)

With **two-legged shadow customers** you handle the authentication on your server. This allows you to keep all of the personally identifiable information about your customers on your servers. It's initially more complicated to set up, but in practice the flexibility makes it much more useful.

![](/assets/images/tutorials/two-legged.png)


However, remember that customers are optional. You may not need to use either type of customers.

### Alternatives to customers

The purpose of using simple auth or two-legged shadow customers is to get an authentication token for the user. This token can then be used with select APIs such as the get variable and call a function APIs for their devices directly from your mobile app.

However, if you already have your own server to handle authentication, you may prefer to make the Particle API calls from your own server. This is especially true for web apps, but is also applicable for mobile apps.

![](/assets/images/tutorials/your-server.png)

If you are making the Particle API calls from your back-end there is no need to use customer tokens because you can use a product-level token that can access all of your customers' devices, because it's being done from your secure back-end.

### Authentication alternatives

Instead of using Particle's authentication system, or your own proprietary system, it may make sense to use one of the many single sign-on options. For example, allowing you to use your existing login to Facebook, Google, GitHub, etc.. There are many libraries to assist with this, and most web developers will be familiar with doing this if you want to create a web app with single sign-on.

For personal home automation tasks you can hardcode an authentication token for your account directly into your mobile app. For better security, you should use a product (even if it's just for you) and use an [API user](/reference/cloud-apis/api/#api-users) that only has limited functionality, such as get variable and call function. 

**You should never hardcode access tokens in commercial products!**

{{collapse op="end"}}

