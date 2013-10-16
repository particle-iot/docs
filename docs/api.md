Spark Cloud API
==========

The Spark Cloud API is a [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer) API. REST means a lot of things, but first and foremost it means that we use the URL in the way that it's intended: as a "Unique Resource Locator".

In this case, the "unique resource" in question is your Spark Core. Every Spark Core has a URL, which can be used to `GET` variables, `POST` a function call, or `PUT` new firmware. The variables and functions that you have written in your firmware are exposed as *subresources* within the Spark Core.

All requests to the Spark Core come through our common API endpoint:

```
API ENDPOINT
https://api.sprk.io/
```

There are a number of API calls available, which are summarized here, and described in more detail below.

List devices the currently authenticated user has access to.

```
GET /v1/devices
```

Returns basic information about the given Core, including the custom variables and functions the core has exposed.

```
GET /v1/devices/{DEVICE_ID}
```

Update the firmware on the core with the file (either binary or source) in the request body.

```
PUT /v1/devices/{DEVICE_ID}
```

Server-sent Events stream for the entire set of devices that belong to the user. This connection will remain open indefinitely.

```
GET /v1/devices/events
```

Server-sent Events stream for all of the devices in a group. This connection will remain open indefinitely.

```
GET /v1/groups/:id/events
```

Request the current value of a variable exposed by the core, e.g., `GET /v1/devices/12345678abcdef/temperature`

```
GET /v1/devices/{DEVICE_ID}/{VARIABLE}
```

Call a function exposed by the core, arguments passed in request body, e.g., `POST /v1/devices/8764823/brewCoffee`

```
POST /v1/devices/{DEVICE_ID}/{FUNCTION}
```

Server-Sent Events stream.  This connection will remain open indefinitely.

```
GET /v1/devices/{DEVICE_ID}/events
```

List groups the user has access to.

```
GET /v1/groups
```
Create a new group.

```
POST /v1/groups
```

List devices in a group.

```
GET /v1/groups/{GROUP_ID}
```

Change the state of all the cores in a group, e.g., setting pins or custom message.

```
POST /v1/groups/{GROUP_ID}
```

Change which devices are in an existing group.

```
PUT /v1/groups/{GROUP_ID}
```

Delete a group.

```
DELETE /v1/groups/{GROUP_ID}
```

Get the value of the given variable exposed by every core in the group.

```
GET /v1/groups/{GROUP_ID}/{VARIABLE}
```

Call the given function on every core in a group.

```
POST /v1/groups/{GROUP_ID}/{VARIABLE}
```

Authentication
-------

Just because you've connected your Spark Core to the internet doesn't mean anyone should have access to it. Permissions for controlling and communciating with your Spark Core are managed through an OAuth2 authentication system. When you create a developer account with Spark, you'll be provided an API Key. When you connect your Spark Core to the Cloud for the first time, it will be associated with your account, and only you will have permission to control your Spark Core through your account and API Key.

``` Bash
EXAMPLE REQUEST
curl https://api.sprk.io/v1/devices/s83kjd9dksa/ \
  -u a93kdkf8sal248vmsk483j4:
```

In the future, you will be able to provision access to your Spark Core to other accounts and to third-party app developers, and transfer ownership of your Spark Core to another account; however, these features are not yet available.

Errors
-------

The Spark Cloud uses traditional HTTP response codes to provide feedback from the Core regarding the validity of the request and its success or failure. As with other HTTP resources, response codes in the 200 range indicate success; codes in the 400 range indicate failure due to the information provided; codes in the 500 range indicate failure within Spark's server infrastructure.

```
200 OK - API call successfully delivered to the Core and executed.

400 Bad Request - Your request is not understood by the Core,
    or the requested subresource (variable/function) has not been exposed.

401 Unauthorized - Your API Key is not valid.

403 Forbidden - Your API Key is not authorized to interface with this Core.

404 Not Found - The Core you requested is not currently connected to the cloud.

500, 502, 503, 504 Server errors - Fail whale. Something's wrong on our end.
```

Versioning
-------

Spark's approach to versioning has not yet been determined. For now, the API is stable, and a versioning system will be implemented with the first API changes. 

Basic functions
========

Controlling a Core
--------



To control a Core, you must first define and expose *functions* in the Core firmware. You then call these functions remotely using the Spark Cloud API.

```
DEFINITION
POST https://api.sprk.io/v1/devices/{DEVICE_ID}/{FUNCTION}

EXAMPLE REQUEST
$ curl https://api.sprk.io/v1/devices/abcd1234/brew
    -u abcdefgh12345678

EXAMPLE RESPONSE
{
  TBD
}

```

Let's say, as an example, you created a Spark-powered coffeemaker. Within the firmware, we might expect to see something like this:

`void brew()`

Where the brew function might activate a heating element and start a water pump to pump water through the coffee filter. In a normal application, this function might be called when a button on the front of the coffeemaker is pressed.

To make this function available through the Spark Cloud, simply add:

`Spark.function(brew);`

This *exposes* the brew function so that it can be called through the API. When this code is present in the firmware, if you now make the API call:

`POST https://api.sprk.io/v1/devices/spark-coffee-maker/brew`

The `brew()` function will be called. If the function requires arguments, those arguments can be sent in as data.




Reading data from a Core
--------

### Variables

### Events

#### Registering a callback

#### Subscribing to events

Flashing new software
---------

Working with groups
========

Creating a group
-----

Adding a Core to a group
-----

Removing a Core from a group
------

Calling functions on a group
-------

Deleting a group
-------