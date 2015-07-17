---
title: Cloud API Gen
template: api.hbs
columns: three
order: 6
---

# Particle Cloud API

The Particle Cloud API is a [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer) API.
REST means a lot of things, but first and foremost it means that we use the URL in the way that it's intended:
as a "Uniform Resource Locator".

In this case, the unique "resource" in question is your device (Spark Core, Photon, Electron).
Every device has a URL, which can be used to `GET` variables, `POST` a function call, or `PUT` new firmware.
The variables and functions that you have written in your firmware are exposed as *subresources* under the device.

All requests to the device come through our API server using TLS security.

```
PROTOCOL AND HOST
"https://api.particle.io"
```

There are a number of API calls available, which are summarized here, and described in more detail below.

*Formatting note:* When we write something prefixed with a colon `:`, we mean you should substitute your own information.
For example when you see something like `/v1/devices/:deviceId`
you might code something like `/v1/devices/55ff8800beefcafe12345678`.
