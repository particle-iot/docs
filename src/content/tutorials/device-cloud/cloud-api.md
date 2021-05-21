---
word: Cloud API
title: Cloud API
shared: true
columns: two
layout: commonTwo.hbs
description: Getting started with the Particle Cloud API
includeDefinitions: [api-helper, api-helper-cloud, api-helper-json, codemirror]
---

# Cloud API Getting Started

This document shows the basics of using the Particle Cloud API in several different ways.

In order to take full advantage of this tutorial, you should log into your Particle account. This will allow the examples to show actual commands, authentication tokens, and devices in your account. 

{{> sso}}

The Particle Cloud API is a REST API that allows a computer or mobile device to make requests to the Particle Cloud and get responses back. It can also affect a change, such as a configuration change, control a real-world device, or get sensor data from a device.

In many cases you'll use a library such as [Particle API JS](/reference/SDKs/javascript/) to make using the API easier, however the API is available to all languages that support REST APIs, which is basically all of them. For example, you might instead use Python, Ruby, or Java on the server-side, or you might use Kotlin, Swift, or Objective C++ on mobile. 

Also you can use the API directly from a terminal using a tool like curl, or from a web-based tool like [Postman](/reference/device-cloud/api/#postman).


## Getting started

### List devices

The first API we'll use is the [List Devices](/reference/device-cloud/api/#list-devices). This is very easy to use as it's a GET operation (get data from the API) with no parameters. There's also an authentication token used behind the scenes, which will cover shortly.

The Particle Cloud API mostly returns [JSON](/tutorials/device-os/json/), which is text-based structured data that is both machine-readable and human-readable. The link is to a tutorial if you need to come up to speed on the basics of JSON.

{{> cloud-api-device-list height="400"}}

Assuming the call completes successfully and you have devices in your account you'll notice a few things:

- The response is an array, surrounded by square brackets []
- Each element in the array is an object, one for each device in your account
- There are a bunch of useful fields, for example:

  - "id" is the Device ID
  - "name" is the name of the device
  - "online" is true if the device is probably currently online
  - "platform_id" is the kind of device

The JSON output has been pretty-printed, adding line breaks, indenting, and colorization in the box above. The actual response from the API is compact JSON format, with no extra whitespace. Note that the order of the fields may change, and fields may be added or removed at any time.

What the **Get Device List** button does is made a GET request to the API `https://api.particle.io/v1/devices/`. 

- The calls are encrypted (https)
- There's an access token required. It's the part from `?access_token=` to the end of the URL.

If you do try to just open that URL in a browser it will work, because it's a GET request. That won't be true for all requests, however. POST and PUT requests can't be opened from the browser URL bar.

**Security warning:** That URL containing your access token allows full access to your account. Keep this a secret!

Also, if you leave off the access_token, you won't be able to retrieve the list, and you'll get the error:

```
{"error":"invalid_request","error_description":"The access token was not found"}
```

There are other ways you can pass the access token, which will be discussed a little later.

### Get variable

Another common tasks is to get the value of a Particle.variable using the [Get Variable API](/reference/device-cloud/api/#get-a-variable-value).

To fully take advantage of this example you'll need firmware on one of your devices that returns a variable. This firmware combines the function and variable examples from the [cloud communication tutorial](/tutorials/device-os/cloud-communication/#variable). You don't need to fully understand how it works right now.

You can select a device and flash it right here. Note that this will replace any existing user firmware on the device and there is no way to undo this operation. You'd need to locate and flash the old firmware back to the device to restore the old code, so make sure you select the correct device.

{{> codebox content="/assets/files/cloud-communication/functionVar.cpp" format="cpp" height="300" flash="true"}}

Once you've flashed the firmware above to a device, you can test it out:

{{> cloud-api-get-variable}}

- **Device** is the device you flashed the firmware to
- **Variable Name** must match the name used in the `Particle.variable` call in the firmware.
- Note how the URL starts out the same as List Devices, but also includes the device ID and the variable to retrieve.

The response JSON contains a number of things, but the most important is `result` which is the value returned by the variable. In this example, it's a random integer, but it might also be a string or a boolean value (true or false).

#### Device offline

If you try to get a variable from a device that is offline, it will fail with a 404 error and a JSON response of:

```json
{"ok":false,"error":"timed out"}
```

#### Invalid variable name

If you request an invalid variable name, you'll also get a 404 error, but the JSON response will be something like:

```json
{"ok":false,"error":"Unknown Variable: sensor2"}
```


### Call a function

Another common thing is to [call a function](/reference/device-cloud/api/#call-a-function). 

To fully take advantage of this tutorial, you should flash the code from the get a variable example, above to a test device. It supports testing function calls, too.

{{> cloud-api-function}}

With the default values, if the function call worked, the status LED on your test device should turn solid red for 10 seconds.

You'll notice that the URL for calling a function is the same as for getting a variable. That works because calling a function uses POST and getting a variable uses GET, so the cloud knows which operation you want to do.

The other difference is that the body of the POST contains the function parameter, encoded one of a few different ways.

Using the setColor example, the parameter is an RGB value. **255,0,0** is red. **0,255,0** is green. **0,0,255** is blue. Try mixing some colors!

Like the get variable example, if the device is offline, you'll get a 404 error. Likewise, if you specify an invalid function name, you'll also get a 404, with a different JSON body.

The JSON response for calling a function looks like this:

```
{"id":"1f0030001647353236343033","connected":true,"return_value":1}
```

The `return_value` is the integer returned by the `Particle.function` handler. The code above returns 1 if the value is a valid-looking RGB value. If you just pass, say **xxx** in the function parameter, the function still returns a 200 success, however you'll notice the `return_value` is 0 instead. This is dependent on how the user firmware is written, however. Some firmware may work the opposite way and return 0 on success and non-zero on error for a function call.


#### POST body - JSON

The example above uses JSON encoding, which makes things symmetrical as the response is always JSON.

The request `Content-Type` is set to `application/json` and the data is a JSON encoded object:

```json
{"arg":"255,255,0"}
```

#### POST body - form URL encoded

The other way is form URL encoded method is the default for how web forms are encoded. It's also the format used when using curl with the `-d` option.

The request `Content-Type` is set to `application/x-www-form-urlencoded` and the data is a series of key=value pairs, separate by `&`. For example:

```
arg=255,255,0
```

This uses form encoding for the POST body:

{{> cloud-api-function style="authHeaderForm"}}


## Access tokens

To this point we've glossed over the access token requirement, but we can't avoid it any longer.

In order to make any API call, you need an access token. This represent both your identity (Particle username, which is your email address) and a secure authentication. It's not actually your password, and given the access token there's no way to work backwards to your password, but it does grant access to your account. Also, if you have MFA (multi-factor authentication) enabled on your account, you will need your MFA code to generate the access token, but the access token at that point no longer requires the MFA. This is another good reason to keep your access tokens secure!

Access tokens have an expiration date. It could be from seconds, to months, to never expiring. It's also possible to revoke an access token so it no longer has access to your account.

One way to create an access token is to use the Particle CLI [`particle token create`](/reference/developer-tools/cli/#particle-token-create) command. There are others, and more types of access tokens, discussed below.

### Using an access token

#### Authorization header

One option for including the access token is including it in the `Authorization` header of the HTTP request. How you do this will depend both on the language and the method you are using for making the REST request. 

For example, this is an example for browser-based Javascript using jQuery AJAX:

```js
$.ajax({
    dataType: 'json',
    error: function(jqXHR) {
        // Error handing code here
    },
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
    },
    method: 'GET',
    success: function(resp, textStatus, jqXHR) {
        // Success handling code here
    },
    url: 'https://api.particle.io/v1/devices/' + deviceId + '/' + variableName,
});    
```

Note that the content of the `Authorization` header is the string `Bearer` followed by a space, then the access token.

This is the calling a function example using the `Authorization` header:

{{> cloud-api-function style="authHeader"}}

#### Form body

The form body can be used with calls that require POST or PUT, like call a function. It cannot be used with GET operations as there is no body for GET.

The form URL encoded method is the default for how web forms are encoded. It's also the format used when using curl with the `-d` option.

The request `Content-Type` is set to `application/x-www-form-urlencoded` and the data is a series of key=value pairs, separate by `&`. For example:

```
arg=255,255,0&access_token=ffff3e262d049ffffc97c5ffffff81cb84f9ffff
```

This is the call a function example with the arg parameter, but also adds in an `access_token`.

This is an example of using form encoding instead of JSON, and including the access token in the form body:

{{> cloud-api-function style="form"}}


#### Query parameter

For GET requests, you can include the access token at the end of the URL. This does not work for POST and PUT requests, so you cannot use this technique for calling a function, for example.

This is what a query parameter would look like using jQuery:

```js
$.ajax({
    dataType: 'json',
    error: function(jqXHR) {
        // Error handing code here
    },
    method: 'GET',
    success: function(resp, textStatus, jqXHR) {
        // Success handling code here
    },
    url: 'https://api.particle.io/v1/devices/?access_token=' + accessToken,
});    
```

The get device list example, above, put the access token in the query parameters in the URL.

{{> cloud-api-device-list height="300"}}

### Types of tokens

