---
word: API
title: Cloud code (API)
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

List devices
-------

List devices the currently authenticated user has access to.

```
GET /v1/devices

# A typical JSON response will look like this
[
  {
    "id": "53ff6f0650723",
    "name": "plumber_laser",
    "last_app": null,
    "last_heard": null,
    "connected": false
  },
  {
    "id": "53ff291839887",
    "name": "spark_love",
    "last_app": null,
    "last_heard": 2014-12-15T20:12:51.974Z,
    "connected": true
  }
]
```

Claim core
-------

You can claim a brand new or released core through a simple API call. All you need as an access token and core id!

```
POST /v1/devices

# EXAMPLE REQUEST
curl https://api.spark.io/v1/devices \
     -d access_token=1234 \
     -d id=0123456789abcdef01234567
```

Device information
-------

Get basic information about the given Core, including the custom variables and functions it has exposed.

```
GET /v1/devices/{DEVICE_ID}
```

Update the Core, including the display name or the firmware (either binary or source).

```
PUT /v1/devices/{DEVICE_ID}
```

Requesting a variable value
-------

Request the current value of a variable exposed by the core,
e.g., `GET /v1/devices/0123456789abcdef01234567/temperature`

```
GET /v1/devices/{DEVICE_ID}/{VARIABLE}
```

Calling a function
-------

Call a function exposed by the core, with arguments passed in request body,
e.g., `POST /v1/devices/0123456789abcdef01234567/brew`

```
POST /v1/devices/{DEVICE_ID}/{FUNCTION}
```

Open a stream of [Server-Sent Events](http://www.w3.org/TR/eventsource/)

```
GET /v1/events[/:event_name]
GET /v1/devices/events[/:event_name]
GET /v1/devices/{DEVICE_ID}/events[/:event_name]
```


Authentication
-------

Just because you've connected your Spark Core to the internet doesn't mean anyone else should have access to it.
Permissions for controlling and communciating with your Spark Core are managed with OAuth2.

```bash
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

If you need to transfer ownership of the core to another user, the easiest way is to simply log into the [Spark build site](https://www.spark.io/build), click on the 'cores' drawer on the bottom left, and then click the small 'right arrow' by the core you want to release, then click "Remove Core". This will make it possible for the other person you are transfering the core to, to go through the normal [claiming process](/#/connect/claiming-your-core).

In the future, you will be able to provision access to your Spark Core to other accounts
and to third-party app developers; however, these features are not yet available.



### How to send your access token

There are three ways to send your access token in a request.

* In an HTTP Authorization header (always works)
* In the URL query string (only works with GET requests)
* In the request body (only works for POST & PUT when body is URL-encoded)

In these docs, you'll see example calls written using a terminal program called
[curl](http://curl.haxx.se/)
which may already be available on your machine.

Example commands will always start with `curl`.

---

To send a custom header using curl, use you the `-H` flag.
The access token is called a "Bearer" token and goes in the standard
HTTP `Authorization` header.

```
curl -H "Authorization: Bearer 38bb7b318cc6898c80317decb34525844bc9db55"
  https://...
```

---

The query string is the part of the URL after a `?` question mark.
To send the access token in the query string just add `access_token=38bb...`.
Because your terminal thinks the question mark is special, we escape it with a backslash.

```
curl https://api.spark.io/v1/devices\?access_token=38bb7b318cc6898c80317decb34525844bc9db55
```

---

The request body is how form contents are submitted on the web.
Using curl, each parameter you send, including the access token is preceded by a `-d` flag.
By default, if you add a `-d` flag, curl assumes that the request is a POST.
If you need a different request type, you have to specifically say so with the `-X` flag,
for example `-X PUT`.

```
curl -d access_token=38bb7b318cc6898c80317decb34525844bc9db55
  https://...
```


### Generate a new access token

```
POST /oauth/token

# Using curl in your terminal
curl https://api.spark.io/oauth/token -u spark:spark \
     -d grant_type=password -d username=joe@example.com -d password=SuperSecret

# A typical JSON response will look like this
{
    "access_token": "254406f79c1999af65a7df4388971354f85cfee9",
    "token_type": "bearer",
    "expires_in": 7776000
}
```

When creating a new access token, you need to specify several additional pieces of info.

You must give a valid client ID and password in HTTP Basic Auth.
Any client ID will work right now, so we suggest `spark:spark`.
In the POST body, you need three parameters:

* grant_type=password
* username=YOUR_EMAIL@ADDRE.SS
* password=YOUR_PASSWORD

For now, Spark Build will list the single most recently created token.


### Configure when your token expires

You can control when your access token will expire, or set it to not expire at all!  
There are two ways to specify how / when your token should expire.


####expires_in - Optional

How many seconds should the token last for?  Setting this to 0 seconds will create a token that never expires.

It's generally a little safer to create short lived tokens and refresh them frequently, since it makes it harder to lose a token that has access to your devices.

```
# expires in 3600 seconds, or 1 hour
"expires_in": 3600
```

```
# Setting token lifespan using expires_in with curl in your terminal
curl https://api.spark.io/oauth/token -u spark:spark \
     -d grant_type=password \
     -d username=joe@example.com \
     -d password=SuperSecret \
     -d expires_in=3600
```

 
```
 
```

####expires_at - Optional

At what date and time should the token expire?  This should be an ISO8601 style date string, or null for never


```
# date format: YYYY-MM-DD
# expires in 2020
"expires_at": "2020-01-01"
```

```
# Setting token lifespan using a date string with curl in your terminal
curl https://api.spark.io/oauth/token -u spark:spark \
     -d grant_type=password \
     -d username=joe@example.com \
     -d password=SuperSecret \
     -d expires_at=2020-01-01
```





### List all your tokens

```
GET /v1/access_tokens

# Using curl in your terminal
curl https://api.spark.io/v1/access_tokens -u joe@example.com:SuperSecret

# Example JSON response
[
    {
        "token": "b5b901e8760164e134199bc2c3dd1d228acf2d98",
        "expires_at": "2014-04-27T02:20:36.177Z",
        "client": "spark"
    },
    {
        "token": "ba54b6bb71a43b7612bdc7c972914604a078892b",
        "expires_at": "2014-04-27T06:31:08.991Z",
        "client": "spark"
    }
]
```

You can list all your access tokens by passing your email address and password
in an HTTP Basic Auth header to `/v1/access_tokens`.


### Deleting an access token

```
DELETE /v1/access_tokens/:token

# Using curl in your terminal
curl https://api.spark.io/v1/access_tokens/b5b901e8760164e134199bc2c3dd1d228acf2d98 \
     -u joe@example.com:SuperSecret -X DELETE

# Example JSON response
{
    "ok": true
}
```

If you have a bunch of unused tokens and want to clean up, you can delete tokens.

Just as for listing them, send your username and password in an HTTP Basic Auth header.


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

408 Timed Out - The cloud experienced a significant delay when trying to reach the Core.

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

Note: If you have declared a function name longer than 12 characters it *will be truncated* to 12 characters. Example: Spark.function("someFunction1", ...); exposes a function called **someFunction** and *not* **someFunction1**

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
The maximum length of the argument is 63 characters.


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
And the response contains a `result` like this:

```json
// EXAMPLE RESPONSE
{
  "cmd": "VarReturn",
  "name": "temperature",
  "result": 42,
  "coreInfo": {
    "last_app": "",
    "last_heard": "2014-08-22T22:33:25.407Z",
    "connected": true,
    "deviceID": "53ff6c065075535119511687"
  }

```

**NOTE**: Variable names are truncated after the 12th character: `temperature_sensor` is accessible as `temperature_`

### Events

#### Registering a callback

In the build section of the Spark website, you will be able to register a URL on your own server
to which we will POST each time one of your Spark Cores publishes a certain event. *This feature is still in progress, and will be released later in March.*

#### Subscribing to events

You can make an API call that will open a stream of
[Server-Sent Events](http://www.w3.org/TR/eventsource/) (SSEs).
You will make one API call that opens a connection to the Spark Cloud.
That connection will stay open, unlike normal HTTP calls which end quickly.
Very little data will come to you across the connection unless your Spark Core publishes an event,
at which point you will be immediately notified.

To subscribe to an event stream, make a GET request to one of the following endpoints.
This will open a Server-Sent Events (SSE) stream, i.e., a TCP socket that stays open.
In each case, the event name filter in the URI is optional.  When specifying an event name filter,
published events will be limited to those events with names that begin with the specified string.
For example, specifying an event name filter of 'temp' will return events with names 'temp' and 
'temperature'. 

SSE resources:

* http://dev.w3.org/html5/eventsource/
* https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events
* http://www.html5rocks.com/en/tutorials/eventsource/basics/

---

Subscribe to the firehose of public events, plus private events published by devices one owns:

```
GET /v1/events[/:event_name]

# EXAMPLE
curl -H "Authorization: Bearer 38bb7b318cc6898c80317decb34525844bc9db55"
https://api.spark.io/v1/events/temperature
```

---

Subscribe to all events, public and private, published by devices one owns:

```
GET /v1/devices/events[/:event_name]

# EXAMPLE
curl -H "Authorization: Bearer 38bb7b318cc6898c80317decb34525844bc9db55"
https://api.spark.io/v1/devices/events/temperature
```

---

Subscribe to events from one specific device.
If the API user owns the device, then she will receive all events,
public and private, published by that device.
If the API user does not own the device she will only receive public events.

```
GET /v1/devices/:device_id/events[/:event_name]

# EXAMPLE
curl -H "Authorization: Bearer 38bb7b318cc6898c80317decb34525844bc9db55"
https://api.spark.io/v1/devices/55ff70064939494339432586/events/temperature
```

#### Publishing events

You can publish events to your devices using the publish event endpoint.


```
POST /v1/devices/events

# EXAMPLE
curl https://api.spark.io/v1/devices/events \
     -d access_token=1234123412341234123412341234123412341234 \
     -d "name=myevent" \
     -d "data=Hello World" \
     -d "private=true" \
     -d "ttl=60"      
```

"data", "private", and "ttl" are all optional.  You can also send these with the Spark CLI:

```
# grab the spark-cli here - https://github.com/spark/spark-cli
spark publish test "Hello World"
```


Verifying and Flashing new firmware
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
