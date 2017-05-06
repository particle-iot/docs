---
title: Particle API JS (Javascript SDK)
layout: reference.hbs
columns: three
order: 4
---

# Particle API JS

ParticleJS is JavaScript library for the Particle Cloud API for Node.js and the browser.
It's also [open source](https://github.com/spark/particle-api-js) so you can edit, change or even send in pull requests if you want to share!

This page contains examples to get started using the library.

For more details, see the [detailed reference below](#detailed-reference) and check the
[examples folder on GitHub](https://github.com/spark/particle-api-js/blob/master/examples).

## Installation

### Node.js

First, make sure you have [node.js](http://nodejs.org/) installed!

Next, open a command prompt or terminal, and install by typing:

```shell
$ npm install particle-api-js
```

## Browser

#### Including Particle API JS

Particle API JS can be included using bower:

```shell
$ bower install particle-api-js
```

Alternately, you can pull in Particle API JS from the JSDelivr and simply include the script in your HTML.

```html
<script type="text/javascript" src="//cdn.jsdelivr.net/particle-api-js/5/particle.min.js">
</script>
```

Now you will have a `Particle` object available that you can use in your application.

## Logging in

### With username/password

You can create an account [here](https://build.particle.io/signup). Use the token from `particle.login` as the `auth` parameter in other calls.

```javascript
var Particle = require('particle-api-js');
var particle = new Particle();
var token;

particle.login({username: 'user@email.com', password: 'pass'}).then(
  function(data) {
    token = data.body.access_token;
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);
```

## Responses

You interact with the API using [promises](https://promisesaplus.com/).

```javascript
particle.login({username: 'email@example.com', password: 'pass'}).then(
  function(data){
    console.log('API call completed on promise resolve: ', data.body.access_token);
  },
  function(err) {
    console.log('API call completed on promise fail: ', err);
  }
);
```

# Supported commands

## Device management

### List devices

List devices for a user

```javascript
var token; // from result of particle.login
var devicesPr = particle.listDevices({ auth: token });

devicesPr.then(
  function(devices){
    console.log('Devices: ', devices);
  },
  function(err) {
    console.log('List devices call failed: ', err);
  }
);
```

### callFunction

Call a function in device

```javascript
var fnPr = particle.callFunction({ deviceId: 'DEVICE_ID', name: 'brew', argument: 'D0:HIGH', auth: token });

fnPr.then(
  function(data) {
    console.log('Function called succesfully:', data);
  }, function(err) {
    console.log('An error occurred:', err);
  });
```

The function needs to be defined in the firmware uploaded to the
device and registered to the Particle cloud.

You pass along the name of the function and the params.

If the function call succeeds, `data.return_value` is the value returned by the function call on the Particle device.

### claimDevice

Claims device and adds it to the user account

```javascript
particle.claimDevice({ deviceId: 'DEVICE_ID', auth: token }).then(function(data) {
  console.log('device claim data:', data);
}, function(err) {
  console.log('device claim err:', err);
});
```

### flash

Flash firmware to device

```javascript
particle.flashDevice({ deviceId: 'DEVICE_ID', files: { file1: './path/file1' }, auth: token }).then(function(data) {
  console.log('Device flashing started successfully:', data);
}, function(err) {
  console.log('An error occurred while flashing the device:', err);
});
```

### getAttributes

Gets all attributes for the device

```javascript
var devicesPr = particle.getDevice({ deviceId: 'DEVICE_ID', auth: token });

devicesPr.then(
  function(data){
    console.log('Device attrs retrieved successfully:', data);
  },
  function(err) {
    console.log('API call failed: ', err);
  }
);
```

### getVariable

Gets a variable value for the device

```javascript
particle.getVariable({ deviceId: 'DEVICE_ID', name: 'temp', auth: token }).then(function(data) {
  console.log('Device variable retrieved successfully:', data);
}, function(err) {
  console.log('An error occurred while getting attrs:', err);
});
```

The variable needs to be defined in your device's code.

If getting the variable succeeds, `data.result` is the value of the variable on the Particle device.


### removeDevice

Removes device from the user account

```javascript
particle.removeDevice({ deviceId: 'DEVICE_ID', auth: token }).then(function(data) {
  console.log('remove call response:', data);
}, function(err) {
  console.log('An error occurred while removing:', err);
});
```

### renameDevice

Renames device for the user account

```javascript
particle.renameDevice({ deviceId: 'DEVICE_ID', name: 'new-name', auth: token }).then(function(data) {
  console.log('Device renamed successfully:', data);
}, function(err) {
  console.log('An error occurred while renaming device:', err);
});
```

### signalDevice

Send a signal to the device to shout rainbows

```javascript
particle.signalDevice({ deviceId: 'DEVICE_ID', signal: true, auth: token }).then(function(data) {
  console.log('Device is shouting rainbows:', data);
}, function(err) {
  console.log('Error sending a signal to the device:', err);
});
```

Send a signal to the device to stop shouting rainbows

```javascript
particle.signalDevice({ deviceId: 'DEVICE_ID', signal: false, auth: token }).then(function(data) {
  console.log('The LED is back to normal:', data);
}, function(err) {
  console.log('Error sending a signal to the device:', err);
});
```

### sendPublicKey

Send public key for a device to the cloud

```javascript
particle.sendPublicKey({ deviceId: 'DEVICE_ID', key: 'key', auth: token }).then(function(data) {
  console.log('Public key sent successfully:', data);
}, function(err) {
  console.log('Error sending public key to the device:', err);
});
```

### Get event stream

Get event listener to an stream in the Particle cloud

```javascript
//Get all events
particle.getEventStream({ auth: token}).then(function(stream) {
  stream.on('event', function(data) {
    console.log("Event: " + data);
  });
});

//Get your devices events
particle.getEventStream({ deviceId: 'mine', auth: token }).then(function(stream) {
  stream.on('event', function(data) {
    console.log("Event: " + data);
  });
});

//Get test event for specific device
particle.getEventStream({ deviceId: 'DEVICE_ID', name: 'test', auth: token }).then(function(stream) {
  stream.on('event', function(data) {
    console.log("Event: " + data);
  });
});
```

`data` is an object with the following properties

```
{
  "name":"Uptime",
  "data":"5:28:54",
  "ttl":"60",
  "published_at":"2014-MM-DDTHH:mm:ss.000Z",
  "coreid":"012345678901234567890123"
}
```

### Publishing event

Register an event stream in the Particle cloud

```javascript
var publishEventPr = particle.publishEvent({ name: 'test', data: {}, auth: token });

publishEventPr.then(
  function(data) {
    if (data.body.ok) { console.log("Event published succesfully") }
  },
  function(err) {
    console.log("Failed to publish event: " + err)
  }
);
```

## Working with code

### Compiling

Compiles files in the Particle cloud

```javascript
var ccPr = particle.compileCode({ files: { 'main.cpp': './project/main.cpp', 'my_lib/lib.cpp': './project/my_lib/lib.cpp' }, auth: token });

ccPr.then(
  function(data) {
    console.log('Code compilation started successfully:', data);
  }, function(err) {
    console.log('An error occurred while compiling the code:', err);
  });
```

### Flashing

Flash firmware to a device

```javascript
var flashPr = particle.flashDevice({ deviceId: 'DEVICE_ID',
  files: { file1: './path/to/your/file1' },
  auth: token });
  
flashPr.then(
  function(data) {
    console.log('Device flashing started successfully:', data);
  }, function(err) {
    console.log('An error occurred while flashing the device:', err);
  });
```

## User management

### Create user

Creates a user in the Particle cloud

```javascript
particle.createUser({ username: 'example@email.com', password: 'pass' }).then(function(data) {
```

We try to login and get back an accessToken to verify user creation

```javascript
  var loginPromise = particle.login('example@email.com', 'pass');
```

We'll use promises to check the result of the login process

```javascript
    loginPromise.then(
      function(data) {
        console.log('Login successful! access_token:', data.access_token);
      },
      function(err) {
        console.log('Login failed:', err);
      }
    );
  }
});
```

### List access tokens

Lists access tokens from the Particle cloud for the specified user.

```javascript
particle.listAccessTokens({ username: 'u@m.com', password: 'pass' }).then(function(data) {
  console.log('data on listing access tokens: ', data);
}, function(err) {
  console.log('error on listing access tokens: ', err);
});
```

### Remove access token

Removes an access token from the Particle cloud for the specified user.

```javascript
particle.removeAccessToken({ username: 'u@m.com', password: 'pass', token: 'token' }).then(function(data) {
  console.log('data on removing accessToken: ', data);
}, function(err) {
  console.log('error on removing accessToken: ', err);
});
```

## Detailed reference

Here a full reference of every function available in the Javascript
client library.

GENERATED_JAVASCRIPT_DOCS
