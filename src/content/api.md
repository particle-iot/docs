---
word: API
title: Cloud API reference
order: 4
---

Spark Cloud API
==========

Introduction
===

The Spark Cloud API is a [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer) API.
REST means a lot of things, but first and foremost it means that we use the URL in the way that it's intended:
as a "Uniform Resource Locator".

In this case, the unique "resource" in question is your Spark Core.
Every Spark Core has a URL, which can be used to `GET` variables, `POST` a function call, or `PUT` new firmware.
The variables and functions that you have written in your firmware are exposed as *subresources* within the Spark Core.

All requests to the Spark Core come through our API server using TLS security.

```
PROTOCOL AND HOST
https://api.spark.io
```

There are a number of API calls available, which are summarized here, and described in more detail below.

List devices the currently authenticated user has access to.

```
GET /v1/devices
```

Get basic information about the given Core, including the custom variables and functions it has exposed.

```
GET /v1/devices/{DEVICE_ID}
```

Update the Core, including the display name or the firmware (either binary or source).

```
PUT /v1/devices/{DEVICE_ID}
```

Request the current value of a variable exposed by the core,
e.g., `GET /v1/devices/0123456789abcdef01234567/temperature`

```
GET /v1/devices/{DEVICE_ID}/{VARIABLE}
```

Call a function exposed by the core, with arguments passed in request body,
e.g., `POST /v1/devices/0123456789abcdef01234567/brew`

```
POST /v1/devices/{DEVICE_ID}/{FUNCTION}
```

*Coming soon* Open a stream of [Server-Sent Events](http://www.w3.org/TR/eventsource/)


Authentication
-------

Just because you've connected your Spark Core to the internet doesn't mean anyone else should have access to it.
Permissions for controlling and communciating with your Spark Core are managed with OAuth2.

```
# You type in your terminal
curl https://api.spark.io/v1/devices/0123456789abcdef01234567/brew \
     -d access_token=9876987698769876987698769876987698769876
# Response status is 200 OK, which means
# the Core says, "Yes ma'am!"

# Sneaky Pete tries the same thing in his terminal
curl https://api.spark.io/v1/devices/0123456789abcdef01234567/brew \
     -d access_token=1234123412341234123412341234123412341234
# Response status is 403 Forbidden, which means
# the Core says, "You ain't the boss of me."

# LESSON: Protect your access token.
```

Your access token can be found in the Spark Build web IDE on the 'Settings' page.

[Spark Build >](https://www.spark.io/build)

When you connect your Spark Core to the Cloud for the first time, it will be associated with your account,
and only you will have permission to control your Spark Core—using your access token.

In the future, you will be able to provision access to your Spark Core to other accounts
and to third-party app developers, and transfer ownership of your Spark Core to another account;
however, these features are not yet available.

Errors
-------

The Spark Cloud uses traditional HTTP response codes to provide feedback from the Core regarding the validity
of the request and its success or failure. As with other HTTP resources, response codes in the 200 range
indicate success; codes in the 400 range indicate failure due to the information provided;
codes in the 500 range indicate failure within Spark's server infrastructure.

```
200 OK - API call successfully delivered to the Core and executed.

400 Bad Request - Your request is not understood by the Core,
    or the requested subresource (variable/function) has not been exposed.

401 Unauthorized - Your access token is not valid.

403 Forbidden - Your access token is not authorized to interface with this Core.

404 Not Found - The Core you requested is not currently connected to the cloud.

500 Server errors - Fail whale. Something's wrong on our end.
```

Versioning
-------

The API endpoints all start with `/v1` to represent the first official version of the Spark Cloud API.
The existing API is stable, and we may add new endpoints with the `/v1` prefix.

If in the future we make backwards-incompatible changes to the API, the new endpoints will start with
something different, probably `/v2`.  If we decide to deprecate any `/v1` endpoints,
we'll give you lots of notice and a clear upgrade path.

Basic functions
========

Controlling a Core
--------

To control a Core, you must first define and expose *functions* in the Core firmware.
You then call these functions remotely using the Spark Cloud API.

```cpp
/* FIRMWARE */
int brew(String args)
{
  // parse brew temperature and duration from args
  // ...

  activate_heating_element(temperature);
  start_water_pump(duration_seconds);

  // int status_code = ...
  return status_code;
}
```

---

Let's say, as an example, you create a Spark-powered coffeemaker.
Within the firmware, we might expect to see something like this brew function.

```cpp
/* FIRMWARE */
void setup()
{
  Spark.function("brew", brew);
}
```

In a normal coffeemaker, `brew` might be called when a button on the front of the coffeemaker is pressed.

To make this function available through the Spark Cloud, simply add a `Spark.function` call to your `setup()`.



---

This *exposes* the brew function so that it can be called through the API. When this code is present in the firmware, you can make this API call.

```bash
POST /v1/devices/{DEVICE_ID}/{FUNCTION}

# EXAMPLE REQUEST
curl https://api.spark.io/v1/devices/0123456789abcdef01234567/brew \
     -d access_token=1234123412341234123412341234123412341234 \
     -d "args=202,230"
```

---

The API request will be routed to the Spark Core and will run your `brew` function. The response will have a `return_value` key containing the integer returned by `brew`.

```json
// EXAMPLE RESPONSE
{
  "id": "0123456789abcdef01234567",
  "name": "prototype99",
  "connected": true,
  "return_value": 42
}

```

All Spark functions take a String as the only argument and must return a 32-bit integer.


Reading data from a Core
--------

### Variables

Imagine you have a temperature sensor attached to the A0 pin of your Spark Core
and your firmware has exposed the value of the sensor as a Spark variable.

```cpp
/* FIRMWARE */
int temperature = 0;

void setup()
{
  Spark.variable("temperature", &temperature, INT);
  pinMode(A0, INPUT);
}

void loop()
{
  temperature = analogRead(A0);
}
```

---

You can now make a `GET` request, even with your browser, to read the sensor at any time.
The API endpoint is `/v1/devices/{DEVICE_ID}/{VARIABLE}` and as always, you have to include your access token.

```bash
# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef01234567
# Your access token is 1234123412341234123412341234123412341234
curl "https://api.spark.io/v1/devices/0123456789abcdef01234567/temperature?access_token=1234123412341234123412341234123412341234"
```

**NOTE**: Variable names are truncated after the 12th character: `temperature_sensor` is accessable as `temperature_`

### Events

Event-related Spark Cloud behaviors (callbacks and event streams) are not ready yet, but they will be soon.
Here's a sneak peak.

#### Registering a callback

In the build section of the Spark website, you will be able to register a URL on your own server
that we will hit each time your Spark Core emits a certain event.

#### Subscribing to events

You will soon be able to make an API call that will open a stream of
[Server-Sent Events](http://www.w3.org/TR/eventsource/).
You will make one API call that opens a connection to the Spark Cloud.
That connection will stay open, unlike normal HTTP calls which end quickly.
Very little data will come to you across the connection unless your Spark Core emits an event,
at which point you will be immediately notified.


Verifing and Flashing new firmware
---------

All your Spark firmware coding can happen entirely in the build section of the website.
However, if you prefer to use your own text editor or IDE, you can!
It just means that instead of hitting the "Flash" or "Verify" buttons, you'll make API calls that reference a file.


### Flash a Core with source code

If you have written a source code file that defines `setup()` and `loop()` functions,
you can flash it to your Spark Core with an HTTP PUT request.

```
# HTTP REQUEST DEFINITION
PUT /v1/devices/{DEVICE_ID}
Content-Type: multipart/form-data

Send the source code file as "file" in request body.
```

---

The API request should be encoded as `multipart/form-data` with a `file` field populated.
Your filename does not matter.  In particular, the extension can be .c, .cpp, .ino, or anything else your prefer.

This API request will submit your firmware to be compiled into a Spark binary, after which,
if compilation was successful, the binary will be flashed to your Core wirelessly.

```bash
# EXAMPLE REQUEST IN TERMINAL
# Flash a Core with a file called "my-firmware-app.cpp"
curl -X PUT -F file=@my-firmware-app.cpp \
  "https://api.spark.io/v1/devices/0123456789abcdef01234567?access_token=1234123412341234123412341234123412341234"
```

---

There are three possible response formats:

* A successful response, in which both compilation and flashing succeed.
  * Note that the LED on your Core will blink magenta while updating.
* A failure due to compilation errors.
* A failure due to inability to transmit the binary to the core.


```js
// EXAMPLE SUCCESSFUL RESPONSE
{
  "ok": true,
  "firmware_binary_id": "12345"
}
```

```js
// EXAMPLE COMPILE FAILURE RESPONSE
{
  "ok": false,
  "errors": ["Compile error"],
  "output": ".... lots of debug output from the compiler..."
}
```

```js
// EXAMPLE FLASH FAILURE RESPONSE
{
  "ok": false,
  "firmware_binary_id": "1234567",
  "errors": ["Device is not connected."]
}
```

### Flash a Core with a pre-compiled binary

If you want to compile the firmware yourself and send a binary instead of a source file, you can do that too!
Just add `file_type=binary` to the request body, and we will skip the compilation stage altogether.
The response format will look like those shown above.

```bash
# EXAMPLE REQUEST IN TERMINAL TO FLASH A BINARY
curl -X PUT -F file=@my-firmware-app.bin -F file_type=binary \
  "https://api.spark.io/v1/devices/0123456789abcdef01234567?access_token=1234123412341234123412341234123412341234"
```
