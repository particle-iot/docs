---
title: USB control request tool
columns: two
layout: commonTwo.hbs
description: USB control request tool and instructions
includeDefinitions: [api-helper, api-helper-json, api-helper-usb, api-helper-extras, api-helper-mustache, api-helper-primitives, codemirror, api-helper-projects, zip]
---

# {{title}}

This page allows you to send requests from a compatible web browser to the firmware below. You can use that firmware as an example for how to parse requests and return response data from your own application.

{{> usb-control-request rows="10" cols="90"}}

## About USB control requests

USB control requests work for devices connected by USB to a computer. You can use a command line tool or web browser to send the requests.

There are certain built-in request handlers in Device OS; this is how setting Wi-Fi credentials works over USB.

USB control requests work independently from USB serial debug, and both can be operational at the same time.

You can add a user handler (request 10) with a custom payload. The Tracker (and Monitor One) use this for resetting configuration and entering shipping mode, for example.

You can filter requests at the Device OS level using [System.setControlRequestFilter](/reference/device-os/api/system-calls/system-setcontrolrequestfilter/).

Control requests don't have to be in JSON format like the example below, however since there can only be a single custom control request handler per firmware binary, using a standard format like JSON makes it easy to be compatible across modules and libraries.

You can send USB control requests using the [particle-usb](https://github.com/particle-iot/particle-usb) package, which works from node.js or from a browser.

Control requests can also be done over BLE, but this is more complicated and requires using the mobile secret embedded in the data matrix code on the serial number label for the device.

The sample code below also supports sending requests using a Particle.function.

## Sample code

This is sample device firmware code you can test for using control requests.

{{> project-browser project="ControlRequestTest" default-file="src/ControlRequestTest.cpp" height="400" flash="false"}}

### Sample output

If you send the following JSON:

```json
{
  "op": "test",
  "a": 123
}
```

It should respond with:

```json
{"counter":1,"result":0}
```

And the USB serial debug log should show something like this:

```
0000648902 [app] INFO: USB request received op=test {"a":123,"op":"test"}
0000648923 [app] INFO: response {"counter":1,"result":0}
```

### Using Particle.function

The sample code above also supports making a similar request by Particle.function. The Tracker Edge and Monitor Edge firmware supports this.

You do not need to support this, but including it allows a function call to `cmd` containing the same payload to be processed. Since Particle.function can only
return an integer result code and not a string, the response data is discarded and you can only use this for command-like purposes.

```
particle call myDeviceName cmd '{"op":"test"}'
```
