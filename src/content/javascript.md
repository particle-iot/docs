---
word: Javascript
title: Javascript SDK
order: 6
---

sparkjs
=======

SparkJS is a library for interacting with your cores and the Spark Cloud.
It uses node.js and can run on Windows, Mac OS X, and Linux fairly easily.
It's also open source so you can edit, change or even send in pull requests if you want to share!

## Instalation

First, make sure you have [node.js](http://nodejs.org/) installed!

Next, open a command prompt or terminal, and install by typing:

```shell
$ npm install -g spark
```

## Getting Started

To start using SparkJS in your code, require it first

```javascript
var spark = require('spark');
```

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

## Supported commands

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


### compileCode

Compiles files in the Spark cloud

```javascript
var callback = function(err, data) {
  if (err) {
    console.log('An error occurred while flashing the core:', err);
  } else {
    console.log('Core flashing started successfully:', data);
  }
};

spark.compileCode(['./path/to/file1', './path/to/file2'], callback);
```

### createUser

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

### callFunction

Call a function on a Core

```javascript
spark.callFunction('CORE_ID', 'brew', 'D0:HIGH', function(e, data) {
  if (e) {
    console.log('An error occurred:', e);
  } else {
    console.log('Core attr retrieved successfully:', data);
  }
});
```
The function needs to be defined  in the firmware uploaded to the
Spark core and registered to the Spark cloud.


You pass along the name of the function and the params.

### claimCore

Claims a core and adds it to the user currently logged in

```javascript
spark.claimCore('CORE_ID', function(err, data) {
  console.log('spark.claimCore err:', err);
  console.log('spark.claimCore data:', data);
});
```

### downloadBinary

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

### flashCore

Flash firmware to a Core

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

### getAttributes

Gets all attributes for a given core

```javascript
spark.getAttributes(devices[0].id, function(err, data) {
  if (err) {
    console.log('An error occurred while getting core attrs:', err);
  } else {
    console.log('Core attrs retrieved successfully:', data);
  }
});
```

### getAttributesForAll

Retrieves all attributes for all cores for the currently logged in user

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

### getEventStream

Get eventListener to an event stream in the Spark cloud

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

### getVariable

Gets a variable value for a specific Core

```javascript
spark.getVariable('CORE_ID, 'temp', function(err, data) {
  if (err) {
    console.log('An error occurred while getting core attrs:', err);
  } else {
    console.log('Core attr retrieved successfully:', data);
  }
});
```

The variable needs to be defined in Spark Core code.

### listDevices

Returns a list of devices for the logged in user

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

### publishEvent

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

### removeCore

Removes a core from the user currently logged in

```javascript
spark.removeCore('CORE_ID', function(err, data) {
  if (err) {
    console.log('An error occurred while removing core:', err);
  } else {
    console.log('removeCore call response:', data);
  });
```

### removeAccessToken

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

### renameCore

Renames a core for the user currently logged in

```javascript
spark.renameCore('CORE_ID', 'new-name', function(err, data) {
  if (err) {
    console.log('An error occurred while renaming core:', err);
  } else {
    console.log('Core renamed successfully:', data);
  }
});
```

### signalCore

Send a signal to a Core

```javascript
// Signal sent to start playing rainbow in the LED
// Send a 0 if you want animation to stop
spark.signalCore('CORE_ID', 1, function(err, data) {
  if (err) {
    console.log('Error sending a signal to the core:', err);
  } else {
    console.log('Core signal sent successfully:', data);
  }
});
```

## Device object

You can get a list of devices by calling: `spark.devices`

Each device has the following parameters:

```javascript
var device = spark.devices[0];

console.log('Device name: ' + device.name);
console.log('- connected?: ' + device.connected);
console.log('- variables: ' + device.variables);
console.log('- functions: ' + device.functions);
console.log('- version: ' + device.version);
console.log('- requires upgrade?: ' + device.requiresUpgrade);
```

* name
* connected
* variables
* functions
* version
* requiresUpgrade

And you can call the following commands on it:


* call
* claim
* emitSignals
* flash
* event
* getVariable
* remove
* rename
* sendPublicKey
* stopSignals
* update

```javascript
device.call(functionName, params, callback);
device.claim(callback);
device.emitSignals(callback);
device.flash(files, callback);
device.event(eventName, callback);
device.remove(callback);
device.rename(newName, callback);
device.sendPublicKey(buffer, callback);
device.stopSignals(callback);
device.update(callback);
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
