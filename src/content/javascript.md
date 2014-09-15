---
word: Javascript
title: Javascript SDK
order: 6
---

# sparkjs

SparkJS is a library for interacting with your cores and the Spark Cloud.
It uses node.js and can run on Windows, Mac OS X, and Linux fairly easily.
It's also open source so you can edit, change or even send in pull requests if you want to share!

# Getting Started

## Instaling library

### Node.js

First, make sure you have [node.js](http://nodejs.org/) installed!

Next, open a command prompt or terminal, and install by typing:

```shell
$ npm install -g spark
```

### Client side

Coming soon

## Logging in

Before performing any action with Sparkjs, you need to login with
your Spark Cloud credentials.

### With username/password

You can create an account [here](https://www.spark.io/signup)

```javascript
var spark = require('spark');

spark.login({username: 'user@email.com', password: 'pass'});
```

### With access token

Or you can use an existing access token.

```javascript
var spark = require('spark');

spark.login({access_token: 'ACCESS_TOKEN'});
```

## Responses

You can interact with the api using callbacks, events or promises,
choose the one you feel more comfortable with.

Have in mind that if callback is provided or event listener is
registered, the return value will be null instead of a Promise.

### Callbacks

If you send a callback function as the last param, it will be executed when
the operation is completed. The first param will be null unless there was
an error, the second param contains success message or data.

```
var callback = function(err, body) {
  console.log('API call login completed on callback:', body);
};

spark.login({username: 'email@example.com', password: 'password'},
            callback);
```

### Promises

If you rather use [promises](http://promisesaplus.com/) you should not send
the callback param and use the returned promise.

```javascript
spark.login({username: 'email@example.com', password: 'pass'}).then(
  function(token){
    console.log('API call completed on promise resolve: ', token);
  },
  function(err) {
    console.log('API call completed on promise fail: ', err);
  }
);
```

### Events

Finally you can also register an event listener to get the result
of the executed command.

```javascript
spark.on('login', function(err, body) {
  console.log('API call completed on Login event:', body);
});

spark.login({username: 'email@example.com', password: 'password'});
```

# Supported commands

To execute this commands you need to login first, it's recommended that you
use a promise, callback or event listener of login command:

```javascript
spark.on('login', function() {
  //Your code here
});

spark.login({username: 'email@example.com', password: 'password'});
```

Check the examples repository [here](https://github.com/spark/sparkjs/tree/master/examples)
for complete implementation

## Device management

### List devices

List devices for the logged in user

```javascript
var devicesPr = spark.listDevices();

devicesPr.then(
  function(devices){
    console.log('Devices: ', devices);
  },
  function(err) {
    console.log('List devices call failed: ', err);
  }
);
```

### Claim a device

Claim a device and add it to the user currently logged in

```javascript
spark.claimCore('CORE_ID', function(err, data) {
  console.log('spark.claimCore err:', err);
  console.log('spark.claimCore data:', data);
});
```

### Remove a device

Remove a device from the user currently logged in

```javascript
spark.removeCore('CORE_ID', function(err, data) {
  if (err) {
    console.log('An error occurred while removing core:', err);
  } else {
    console.log('removeCore call response:', data);
  });
```

### Get attributes for all devices

Get attributes for all devices of the user currenly logged in

```javascript
var devicesPr = spark.getAttributesForAll();

devicesPr.then(
  function(data){
    console.log('Core attrs retrieved successfully:', data);
  },
  function(err) {
    console.log('API call failed: ', err);
  }
);
```

## Device object

You get a list of device instances after calling: `spark.getDevices`,
if you want to access devices without calling API again, you can use
`spark.devices`

```javascript
spark.listDevices(function(devices) {
  var device = devices[0];

  console.log('Device name: ' + device.name);
  console.log('- connected?: ' + device.connected);
  console.log('- variables: ' + device.variables);
  console.log('- functions: ' + device.functions);
  console.log('- version: ' + device.version);
  console.log('- requires upgrade?: ' + device.requiresUpgrade);
});
```

Each device has the following parameters:

* name
* connected
* variables
* functions
* version
* requiresUpgrade

## Commands

And you can call the following commands on it:

### call

Call a function in device

```javascript
device.call('brew', 'D0:HIGH', function(err, data) {
  if (err) {
    console.log('An error occurred:', err);
  } else {
    console.log('Function called succesfully:', data);
  }
});
```

The function needs to be defined in the firmware uploaded to the
Spark core and registered to the Spark cloud.

You pass along the name of the function and the params.

### claim

Claims device and adds it to the user currently logged in

```javascript
device.claim(function(err, data) {
  console.log('device.claim err:', err);
  console.log('device.claim data:', data);
});
```

### flash

Flash firmware to device

```javascript
device.flash(['./path/file1', './path/file2'], function(err, data) {
  if (err) {
    console.log('An error occurred while flashing the core:', err);
  } else {
    console.log('Core flashing started successfully:', data);
  }
});
```

### getAttributes

Gets all attributes for the device

```javascript
device.getAttributes(function(err, data) {
  if (err) {
    console.log('An error occurred while getting device attrs:', err);
  } else {
    console.log('Device attrs retrieved successfully:', data);
  }
});
```

### getVariable

Gets a variable value for the device

```javascript
device.getVariable('temp', function(err, data) {
  if (err) {
    console.log('An error occurred while getting attrs:', err);
  } else {
    console.log('Core attr retrieved successfully:', data);
  }
});
```

The variable needs to be defined in Spark Core code.

### remove

Removes device from the user currently logged in

```javascript
device.remove(function(err, data) {
  if (err) {
    console.log('An error occurred while removing:', err);
  } else {
    console.log('remove call response:', data);
  });
```

### rename

Renames device for the user currently logged in

```javascript
device.rename('new-name', function(err, data) {
  if (err) {
    console.log('An error occurred while renaming device:', err);
  } else {
    console.log('Device renamed successfully:', data);
  }
});
```

### signal

Send a signal to the device

```javascript
device.signal(function(err, data) {
  if (err) {
    console.log('Error sending a signal to the core:', err);
  } else {
    console.log('Core signal sent successfully:', data);
  }
});
```

### stopSignal

Send stop signal to the device

```javascript
device.stopSignal(function(err, data) {
  if (err) {
    console.log('Error sending stop signal to the device:', err);
  } else {
    console.log('Device stop signal sent successfully:', data);
  }
});
```

### sendPublicKey

Send publick key to device

```javascript
device.sendPublicKey('key', function(err, data) {
  if (err) {
    console.log('Error sending public key to the device:', err);
  } else {
    console.log('Public key sent successfully:', data);
  }
});
```

### subscribe

Subscribe to device events

```javascript
device.subscribe('test', function(data) {
  console.log("Event: " + data);
});
```

### update

Refresh device with values from Spark Cloud API

```javascript
device.update(function(data) {
  console.log("Update completed:" + data);
});
```

## Events

### Subscribing to events

Subscribe to an specific event (global/device)

```javascript
//Subscribe to global test event
spark.onEvent('test', function(data) {
  console.log("Event: " + data);
});

//Subscribe to device test event
spark.listdevices().then(function(devices) {
  devices[0].onEvent('test', function(data) {
    console.log("Event: " + data);
  });
});
```

### Get event stream

Get event listener to an stream in the Spark cloud

```javascript
//Get all events
spark.getEventStream(false, false, function(data) {
  console.log("Event: " + data);
});

//Get your devices events
spark.getEventStream(false, 'mine', function(data) {
  console.log("Event: " + data);
});

//Get test event for specific core
spark.getEventStream('test', 'CORE_ID', function(data) {
  console.log("Event: " + data);
});
```

### Publishing event

Register an event stream in the Spark cloud

```javascript
var publishEventPr = spark.publishEvent('test', {});

publishEventPr.then(
  function(data) {
    if (data.ok) { console.log("Event published succesfully") }
  },
  function(err) {
    console.log("Failed to publish event: " + err)
  }
);
```
**This feature is in a limited beta, and is not yet generally available**


## Working with code

### Compiling

Compiles files in the Spark cloud

```javascript
var callback = function(err, data) {
  if (err) {
    console.log('An error occurred while compiling the code:', err);
  } else {
    console.log('Code compilation started successfully:', data);
  }
};

spark.compileCode(['./path/to/file1', './path/to/file2'], callback);
```

### Flashing

Flash firmware to a device

```javascript
spark.flashCore('CORE_ID',
                ['./path/to/your/file1', './path/to/your/file2'],
                function(err, data) {
  if (err) {
    console.log('An error occurred while flashing the core:', err);
  } else {
    console.log('Core flashing started successfully:', data);
  }
});
```

### Downloading a binary

Download binary file compiled in the Spark cloud

```javascript
var promise = spark.compileCode('./path/to/your/file1', callback);

promise.then(
  function(d) {
    setTimeout(function() {
      spark.downloadBinary(d.binary_url, 'bin', function(err, d) {
        if (err) {
          console.log('Error occurred! -->', err);
        } else {
          console.log('Binary downloaded successfully! -->', d);
        }
      });
    }, 5000);
  }
);
```

## User management

### Create user

Creates an user in the Spark cloud

```javascript
spark.createUser('example@email.com', 'pass', function(err, data) {
```

We try to login and get back an accessToken to verify user creation

```javascript
  if (!err) {
    var loginPromise = spark.login('example@email.com', 'pass');
```

We'll use promises to check the result of the login process

```javascript
    loginPromise.then(
      function(accessToken) {
        console.log('Login successful! access_token:', accessToken);
      },
      function(err) {
        console.log('Login failed:', err);
      }
    );
  }
});
```

### Removing access token

Removes accessToken from the Spark cloud for the specified user

```javascript

var callback = function(err, data) {
  if (err) {
    console.log('error on removing accessToken: ', err);
  } else {
    console.log('data on removing accessToken: ', data);
  }
};

spark.removeAccessToken('u@m.com', 'pass', 'token', callback);
```

## Examples

Check the examples repository [here](https://github.com/spark/sparkjs/tree/master/examples)

## Setup your dev environment

Install project dependencies

```shell
$ npm install
```

Install this packages globally

```shell
$ npm install -g mocha
$ npm install -g istanbul
$ npm install -g jshint
```

### Test

Run the mocha test suite

```bash
make test
```

### Lint

Lint your code using jshint

```bash
make lint
```

### Coverage

Generate istanbul coverage report

```bash
make cover
```
