---
title: Device OS API
layout: reference.hbs
columns: three
devices: [photon,electron,core,raspberry-pi,xenon,argon,boron]
order: 20
---

Particle Device Firmware
==========

## Cloud Functions

{{#if has-cellular}}
### Optimizing Cellular Data Use with Cloud connectivity on the {{device}}

{{since when="0.6.0"}}

When the device first connects to the cloud, it establishes a secure channel
and informs the cloud of the registered functions, variables and subscriptions. This uses 4400 bytes of data, plus additional data for each function, variable and subscription.

Subsequent reconnections to the cloud while the device is still powered does not resend this data. Instead, a small reconnection message is sent to the cloud, which uses 135 bytes.

Prior to 0.6.0, when the device was reset or woken from deep sleep, the cloud connection would be fully reinitialized, which meant resending the 4400 bytes of data. From 0.6.0, the device determines that a full reinitialization isn't needed and reuses the existing session (providing it still exists and is usable - see [`Particle.keepAlive()`](#particle-keepalive-)), after validating that the local state matches what was last communicated to the cloud. Connecting to the cloud after reset or wake-up sends just a reconnect message, using 135 bytes of data. A key requirement for the device to be able to determine that the existing session can be reused is that the functions, variables and subscriptions are registered BEFORE connecting to the cloud.

One way to make sure of that is registering functions and variables before connecting to the cloud is easily done using `SEMI_AUTOMATIC` mode:

```cpp
// EXAMPLE USAGE
// Using SEMI_AUTOMATIC mode to get the lowest possible data usage by
// registering functions and variables BEFORE connecting to the cloud.
SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
    // register cloudy things
    Particle.function(....);
    Particle.variable(....);
    Particle.subscribe(....);
    // etc...
    // then connect
    Particle.connect();
}
```
{{/if}} {{!-- has-cellular --}}

**Overview of API field limits**

| API Field | Prior to 0.8.0 | Since 0.8.0 | Comment |
|--:|--:|--:|:--|
| Variable Key | 12 | 64 | |
| Variable Data | 622 | 622 | |
| Function Key | 12 | 64 | |
| Function Argument | 63 | 622 | |
| Publish/Subscribe Event Name | 64 | 64 | |
| Publish/Subscribe Event Data | 255 | 622 |  |
**Note:** Spark Core limits remain as-is prior to 0.8.0

### Particle.variable()

Expose a *variable* through the Cloud so that it can be called with `GET /v1/devices/{DEVICE_ID}/{VARIABLE}`.
Returns a success value - `true` when the variable was registered.

Particle.variable registers a variable, so its value can be retrieved from the cloud in the future. You only call Particle.variable once per variable, typically passing in a global variable. You can change the value of the underlying global variable as often as you want; the value is only retrieved when requested, so simply changing the global variable does not use any data. You do not call Particle.variable when you change the value.

```C++
// EXAMPLE USAGE

int analogvalue = 0;
double tempC = 0;
char *message = "my name is particle";
String aString;

void setup()
{
  Particle.variable("analogvalue", analogvalue);
  Particle.variable("temp", tempC);
  if (Particle.variable("mess", message)==false)
  {
      // variable not registered!
  }
  Particle.variable("mess2", aString);

  pinMode(A0, INPUT);
}

void loop()
{
  // Read the analog value of the sensor (TMP36)
  analogvalue = analogRead(A0);
  //Convert the reading into degree celcius
  tempC = (((analogvalue * 3.3)/4095) - 0.5) * 100;
  delay(200);
}
```

Up to 20 cloud variables may be registered and each variable name is limited to a maximum of 12 characters (_prior to 0.8.0_), 64 characters (_since 0.8.0_).  The Spark Core remains limited to 12 characters.

**Note:** Only use letters, numbers, underscores and dashes in variable names. Spaces and special characters may be escaped by different tools and libraries causing unexpected results.

It is fine to call this function when the cloud is disconnected - the variable
will be registered next time the cloud is connected.

When using [SYSTEM_THREAD(ENABLED)](/reference/device-os/firmware#system-thread) you must be careful of when you register your variables. At the beginning of setup(), before you do any lengthy operations, delays, or things like waiting for a key press, is best. The reason is that variable and function registrations are only sent up once, about 30 seconds after connecting to the cloud. Calling Particle.variable after the registration information has been sent does not re-send the request and the variable will not work.

You will almost never call Particle.variable from loop() (or a function called from loop()).

Prior to 0.4.7 firmware, variables were defined with an additional 3rd parameter
to specify the data type of the variable. From 0.4.7 onward, the system can
infer the type from the actual variable. Additionally, the variable address
was passed via the address-of operator (`&`). With 0.4.7 and newer, this is no longer required.

This is the pre-0.4.7 syntax:

```
int analogvalue = 0;
double tempC = 0;
char *message = "my name is particle";

void setup()
{
  Particle.variable("analogvalue", &analogvalue, INT);
  Particle.variable("temp", &tempC, DOUBLE);
  if (Particle.variable("mess", message, STRING)==false)
      // variable not registered!
  pinMode(A0, INPUT);
}
```

There are three supported data types:

 * `INT`
 * `DOUBLE`
 * `STRING`   (maximum string length is 622 bytes)




```json
# EXAMPLE REQUEST IN TERMINAL
# Device ID is 0123456789abcdef
# Your access token is 123412341234
curl "https://api.particle.io/v1/devices/0123456789abcdef/analogvalue?access_token=123412341234"
curl "https://api.particle.io/v1/devices/0123456789abcdef/temp?access_token=123412341234"
curl "https://api.particle.io/v1/devices/0123456789abcdef/mess?access_token=123412341234"

# In return you'll get something like this:
960
27.44322344322344
my name is particle

```

### Particle.function()

Expose a *function* through the Cloud so that it can be called with `POST /v1/devices/{DEVICE_ID}/{FUNCTION}`.

Particle.function allows code on the device to be run when requested from the cloud API. You typically do this when you want to control something on your {{device}}, say a LCD display or a buzzer, or control features in your firmware from the cloud.

```cpp
// SYNTAX
bool success = Particle.function("funcKey", funcName);

// Cloud functions must return int and take one String
int funcName(String extra) {
  return 0;
}
```

Up to 15 cloud functions may be registered and each function name is limited to a maximum of 12 characters (_prior to 0.8.0_), 64 characters (_since 0.8.0_). The Spark Core remains limited to 12 characters.

**Note:** Only use letters, numbers, underscores and dashes in function names. Spaces and special characters may be escaped by different tools and libraries causing unexpected results.
A function callback procedure needs to return as quickly as possible otherwise the cloud call will timeout.

In order to register a cloud  function, the user provides the `funcKey`, which is the string name used to make a POST request and a `funcName`, which is the actual name of the function that gets called in your app. The cloud function has to return an integer; `-1` is commonly used for a failed function call.

A cloud function is set up to take one argument of the [String](#string-class) datatype. This argument length is limited to a max of 63 characters (_prior to 0.8.0_), 622 characters (_since 0.8.0_). The Spark Core remains limited to 63 characters.

When using [SYSTEM_THREAD(ENABLED)](/reference/device-os/firmware#system-thread) you must be careful of when you register your functions. At the beginning of setup(), before you do any lengthy operations, delays, or things like waiting for a key press, is best. The reason is that variable and function registrations are only sent up once, about 30 seconds after connecting to the cloud. Calling Particle.function after the registration information has been sent does not re-send the request and the function will not work.

```cpp
// EXAMPLE USAGE

int brewCoffee(String command);

void setup()
{
  // register the cloud function
  Particle.function("brew", brewCoffee);
}

void loop()
{
  // this loops forever
}

// this function automagically gets called upon a matching POST request
int brewCoffee(String command)
{
  // look for the matching argument "coffee" <-- max of 64 characters long
  if(command == "coffee")
  {
    // some example functions you might have
    //activateWaterHeater();
    //activateWaterPump();
    return 1;
  }
  else return -1;
}
```

---

You can expose a method on a C++ object to the Cloud.

```C++
// EXAMPLE USAGE WITH C++ OBJECT

class CoffeeMaker {
  public:
    CoffeeMaker() {
    }
    
    void setup() {
      // You should not call Particle.function from the constructor 
      // of an object that will be declared as a global variable.
      Particle.function("brew", &CoffeeMaker::brew, this);
    }

    int brew(String command) {
      // do stuff
      return 1;
    }
};

CoffeeMaker myCoffeeMaker;

void setup() {
	myCoffeeMaker.setup();
}
```

---

The API request will be routed to the device and will run your brew function. The response will have a return_value key containing the integer returned by brew.

```json
COMPLEMENTARY API CALL
POST /v1/devices/{DEVICE_ID}/{FUNCTION}

# EXAMPLE REQUEST
curl https://api.particle.io/v1/devices/0123456789abcdef/brew \
     -d access_token=123412341234 \
     -d "args=coffee"
```


### Particle.publish()

Publish an *event* through the Particle Device Cloud that will be forwarded to all registered listeners, such as callbacks, subscribed streams of Server-Sent Events, and other devices listening via `Particle.subscribe()`.

This feature allows the device to generate an event based on a condition. For example, you could connect a motion sensor to the device and have the device generate an event whenever motion is detected.

Particle.publish pushes the value out of the device at a time controlled by the device firmware. Particle.variable allows the value to be pulled from the device when requested from the cloud side.

{{#if has-mesh}}
Mesh devices support Particle.publish as well as Mesh.publish, which allows publishing to devices on your local mesh network only. 
{{/if}}

Cloud events have the following properties:

* name (1–64 ASCII characters)

**Note:** Only use letters, numbers, underscores, dashes and slashes in event names. Spaces and special characters may be escaped by different tools and libraries causing unexpected results.

* PUBLIC/PRIVATE (prior to 0.8.0 default PUBLIC - thereafter it's a required parameter and PRIVATE is advisable)
* ttl (time to live, 0–16777215 seconds, default 60)
  !! NOTE: The user-specified ttl value is not yet implemented, so changing this property will not currently have any impact.
* optional data (up to 255 characters (_prior to 0.8.0_), 622 characters (_since 0.8.0_)).  The Spark Core remains limited to 255 characters.

Anyone may subscribe to public events; think of them like tweets.
Only the owner of the device will be able to subscribe to private events.

A device may not publish events beginning with a case-insensitive match for "spark".
Such events are reserved for officially curated data originating from the Cloud.

Calling `Particle.publish()` when the cloud connection has been turned off will not publish an event. This is indicated by the return success code
of `false`.

If the cloud connection is turned on and trying to connect to the cloud unsuccessfully, Particle.publish may block for 20 seconds to 5 minutes. Checking `Particle.connected()` can prevent this.

For the time being there exists no way to access a previously published but TTL-unexpired event.

**NOTE 1:** Currently, a device can publish at rate of about 1 event/sec, with bursts of up to 4 allowed in 1 second. Back to back burst of 4 messages will take 4 seconds to recover.

**NOTE 2:** `Particle.publish()` and the `Particle.subscribe()` handler(s) share the same buffer. As such, calling `Particle.publish()` within a `Particle.subscribe()` handler will wipe the subscribe buffer! In these cases, copying the subscribe buffer's content to a separate char buffer prior to calling `Particle.publish()` is recommended.

---

Publish a public event with the given name, no data, and the default TTL of 60 seconds.

```C++
// SYNTAX
Particle.publish(const char *eventName, PublishFlags flags);
Particle.publish(String eventName, PublishFlags flags);

RETURNS
boolean (true or false)

// EXAMPLE USAGE
bool success;
success = Particle.publish("motion-detected", PUBLIC);
if (!success) {
  // get here if event publish did not work
}
```

---

Publish a public event with the given name and data, with the default TTL of 60 seconds.

```C++
// SYNTAX
Particle.publish(const char *eventName, const char *data, PublishFlags flags);
Particle.publish(String eventName, String data, PublishFlags flags);

// EXAMPLE USAGE
Particle.publish("temperature", "19 F", PUBLIC);
```

---

Publish a public event with the given name, data, and TTL.

```C++
// SYNTAX
Particle.publish(const char *eventName, const char *data, int ttl, PublishFlags flags);
Particle.publish(String eventName, String data, int ttl, PublishFlags flags);

// EXAMPLE USAGE
Particle.publish("lake-depth/1", "28m", 21600, PUBLIC);
```

---

Publish a private event with the given name, data, and TTL.
In order to publish a private event, you must pass all four parameters.

```C++
// SYNTAX
Particle.publish(const char *eventName, const char *data, int ttl, PublishFlags flags);
Particle.publish(String eventName, String data, int ttl, PublishFlags flags);

// EXAMPLE USAGE
Particle.publish("front-door-unlocked", NULL, 60, PRIVATE);
```

Publish a private event with the given name.

```C++
// SYNTAX
Particle.publish(const char *eventName, PublishFlags flags);
Particle.publish(String eventName, PublishFlags flags);

// EXAMPLE USAGE
Particle.publish("front-door-unlocked", PRIVATE);
```


```json
COMPLEMENTARY API CALL
GET /v1/events/{EVENT_NAME}

# EXAMPLE REQUEST
curl -H "Authorization: Bearer {ACCESS_TOKEN_GOES_HERE}" \
    https://api.particle.io/v1/events/motion-detected

# Will return a stream that echoes text when your event is published
event: motion-detected
data: {"data":"23:23:44","ttl":"60","published_at":"2014-05-28T19:20:34.638Z","deviceid":"0123456789abcdef"}
```

{{#if has-udp-cloud}}
---

*`NO_ACK` flag*

Unless specified otherwise, events sent to the cloud are sent as a reliable message. The Electron waits for
acknowledgement from the cloud that the event has been received, resending the event in the background up to 3 times before giving up.

The `NO_ACK` flag disables this acknowledge/retry behavior and sends the event only once.  This reduces data consumption per event, with the possibility that the event may not reach the cloud.

For example, the `NO_ACK` flag could be useful when many events are sent (such as sensor readings) and the occasional lost event can be tolerated.

```C++
// SYNTAX

float temperature = sensor.readTemperature();  // by way of example, not part of the API
Particle.publish("t", String::format("%.2f",temperature), NO_ACK);  // make sure to convert to const char * or String
Particle.publish("t", String::format("%.2f",temperature), PRIVATE, NO_ACK);
Particle.publish("t", String::format("%.2f",temperature), ttl, PRIVATE, NO_ACK);
```

{{/if}} {{!-- electron --}}
---

*`WITH_ACK` flag*

{{since when="0.6.1"}}

This flag causes `Particle.publish()` to return only after receiving an acknowledgement that the published event has been received by the Cloud.

```C++
// SYNTAX

Particle.publish("motion-detected", NULL, WITH_ACK);
Particle.publish("motion-detected", NULL, PRIVATE, WITH_ACK);
Particle.publish("motion-detected", NULL, ttl, PRIVATE, WITH_ACK);
```

---

{{since when="0.7.0"}}

`Particle.publish()` flags can be combined using a regular syntax with OR operator (`|`).

```cpp
// EXAMPLE - combining Particle.publish() flags

Particle.publish("motion-detected", PRIVATE | WITH_ACK);
```

If you wish to send a public event, you should specify PUBLIC explictly. This will be required in the future, but is optional in 0.7.0.

```cpp
Particle.publish("motion-detected", PUBLIC);
```

PUBLIC and PRIVATE are mutually exclusive.

Unlike functions and variables, you typically call Particle.publish from loop() (or a function called from loop). 

### Particle.publishVitals()

{{since when="1.2.0"}}

{{#if core}}
```cpp
// SYNTAX

system_error_t Particle.publishVitals(system_tick_t period_s = particle::NOW)

Particle.publishVitals();  // Publish vitals immmediately
Particle.publishVitals(<any value>);  // Publish vitals immediately
```
{{/if}}{{#unless core}}
```cpp
// SYNTAX

system_error_t Particle.publishVitals(system_tick_t period_s = particle::NOW)

Particle.publishVitals();  // Publish vitals immmediately
Particle.publishVitals(particle::NOW);  // Publish vitals immediately
Particle.publishVitals(5);  // Publish vitals every 5 seconds, indefinitely
Particle.publishVitals(0);  // Publish immediately and cancel periodic publishing
```
{{/unless}} {{!-- unless core --}}

Publish vitals information

Provides a mechanism to control the interval at which system diagnostic messages are sent to the cloud. Subsequently, this controls the granularity of detail on the fleet health metrics.

**Argument(s):**

{{#if core}}
_none._
{{/if}}{{#unless core}}
* `period_s` The period _(in seconds)_ at which vitals messages are to be sent to the cloud (default value: `particle::NOW`)

  * `particle::NOW` - A special value used to send vitals immediately
  * `0` - Publish a final message and disable periodic publishing
  * `s` - Publish an initial message and subsequent messages every `s` seconds thereafter
{{/unless}} {{!-- unless core --}}

**Returns:**

A `system_error_t` result code

* `system_error_t::SYSTEM_ERROR_NONE`
* `system_error_t::SYSTEM_ERROR_IO`

**Examples:**

```cpp
// EXAMPLE - Publish vitals intermittently

bool condition;

setup () {
}

loop () {
  ...  // Some logic that either will or will not set "condition"

  if ( condition ) {
    Particle.publishVitals();  // Publish vitals immmediately
  }
}
```

{{#unless core}}
```cpp
// EXAMPLE - Publish vitals periodically, indefinitely

setup () {
  Particle.publishVitals(3600);  // Publish vitals each hour
}

loop () {
}
```

```cpp
// EXAMPLE - Publish vitals each minute and cancel vitals after one hour

size_t start = millis();

setup () {
  Particle.publishVitals(60);  // Publish vitals each minute
}

loop () {
  // Cancel vitals after one hour
  if (3600000 < (millis() - start)) {
    Particle.publishVitals(0);  // Publish immediately and cancel periodic publishing
  }
}
```
{{/unless}} {{!-- unless core --}}

>_**NOTE:** Diagnostic messages can be viewed in the [Console](https://console.particle.io/devices). Select the device in question, and view the messages under the "EVENTS" tab._

<div style="margin-left:35px;"><img src="/assets/images/diagnostic-events.png"/></div>

### Particle.subscribe()

Subscribe to events published by devices.

This allows devices to talk to each other very easily.  For example, one device could publish events when a motion sensor is triggered and another could subscribe to these events and respond by sounding an alarm.

```cpp
int i = 0;

void myHandler(const char *event, const char *data)
{
  i++;
  Serial.print(i);
  Serial.print(event);
  Serial.print(", data: ");
  if (data)
    Serial.println(data);
  else
    Serial.println("NULL");
}

void setup()
{
  Particle.subscribe("temperature", myHandler, ALL_DEVICES);
  Serial.begin(9600);
}
```

To use `Particle.subscribe()`, define a handler function and register it in `setup()`.


---

You can listen to events published only by your own devices by adding a `MY_DEVICES` constant. 

```cpp
// only events from my devices
Particle.subscribe("the_event_prefix", theHandler, MY_DEVICES);
```

- Specifying MY\_DEVICES only receives PRIVATE events. 
- Specifying ALL\_DEVICES or omitting the third parameter only receives PUBLIC events.

| flags | subscribe ALL\_DEVICES | subscribe MY\_DEVICES | subscribe default |
| --- | --- | --- | --- | --- |
| publish PUBLIC | Y | - | Y |
| publish PRIVATE | - | Y | - |
| publish default | Y | - | Y |


---

You can register a method in a C++ object as a subscription handler.

```cpp
class Subscriber {
  public:
   Subscriber() {
      Particle.subscribe("some_event", &Subscriber::handler, this, ALL_DEVICES);
    }
    void handler(const char *eventName, const char *data) {
      Serial.println(data);
    }
};

Subscriber mySubscriber;
// now nothing else is needed in setup() or loop()
```

---

A subscription works like a prefix filter.  If you subscribe to "foo", you will receive any event whose name begins with "foo", including "foo", "fool", "foobar", and "food/indian/sweet-curry-beans".

Received events will be passed to a handler function similar to `Particle.function()`.
A _subscription handler_ (like `myHandler` above) must return `void` and take two arguments, both of which are C strings (`const char *`).

- The first argument is the full name of the published event.
- The second argument (which may be NULL) is any data that came along with the event.

`Particle.subscribe()` returns a `bool` indicating success. It is OK to register a subscription when
the device is not connected to the cloud - the subscription is automatically registered
with the cloud next time the device connects.

**NOTE 1:** A device can register up to 4 event handlers. This means you can call `Particle.subscribe()` a maximum of 4 times; after that it will return `false`.


**NOTE 2:** `Particle.publish()` and the `Particle.subscribe()` handler(s) share the same buffer. As such, calling `Particle.publish()` within a `Particle.subscribe()` handler will wipe the subscribe buffer! In these cases, copying the subscribe buffer's content to a separate char buffer prior to calling `Particle.publish()` is recommended.

Unlike functions and variables, you can call Particle.subscribe from setup() or from loop(). The subscription list can be added to at any time, and more than once.

### Particle.unsubscribe()

Removes all subscription handlers previously registered with `Particle.subscribe()`.

```cpp
// SYNTAX
Particle.unsubscribe();
```

### Particle.connect()

`Particle.connect()` connects the device to the Cloud. This will automatically activate the {{network-type}} connection and attempt to connect to the Particle cloud if the device is not already connected to the cloud.

{{#if has-mesh}}
**Note:** Due to an open [issue](https://github.com/particle-iot/device-os/issues/1631) the automatic activation of the {{network-type}} connection is currently not working as expected. If the {{network-type}} module is not already powered up, your code needs to explicitly call {{#if has-wifi}}[`WiFi.on()`](#on--2){{/if}}{{#if has-cellular}}[`Cellular.on()`](#on--2){{/if}} before calling `Particle.connect()`.
{{/if}}

```cpp
void setup() {}

void loop() {
  if (Particle.connected() == false) {
    Particle.connect();
  }
}
```

After you call `Particle.connect()`, your loop will not be called again until the device finishes connecting to the Cloud. Typically, you can expect a delay of approximately one second.

In most cases, you do not need to call `Particle.connect()`; it is called automatically when the device turns on. Typically you only need to call `Particle.connect()` after disconnecting with [`Particle.disconnect()`](#particle-disconnect-) or when you change the [system mode](#system-modes).


### Particle.disconnect()

`Particle.disconnect()` disconnects the device from the Cloud.

```C++
int counter = 10000;

void doConnectedWork() {
  digitalWrite(D7, HIGH);
  Serial.println("Working online");
}

void doOfflineWork() {
  digitalWrite(D7, LOW);
  Serial.println("Working offline");
}

bool needConnection() {
  --counter;
  if (0 == counter)
    counter = 10000;
  return (2000 > counter);
}

void setup() {
  pinMode(D7, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (needConnection()) {
    if (!Particle.connected())
      Particle.connect();
    doConnectedWork();
  } else {
    if (Particle.connected())
      Particle.disconnect();
    doOfflineWork();
  }
}
```

{{#if has-wifi}}
While this function will disconnect from the Cloud, it will keep the connection to the Wi-Fi network. If you would like to completely deactivate the Wi-Fi module, use [`WiFi.off()`](#off-).
{{/if}}
{{#if has-cellular}}
While this function will disconnect from the Cloud, it will keep the connection to the Cellular network. If you would like to completely deactivate the Cellular module, use [`Cellular.off()`](#off-).
{{/if}}

**NOTE:* When the device is disconnected, many features are not possible, including over-the-air updates, reading Particle.variables, and calling Particle.functions.

*If you disconnect from the Cloud, you will NOT BE ABLE to flash new firmware over the air. 
{{#if core}}A factory reset should resolve the issue.{{/if}}{{#unless core}}Safe mode can be used to reconnect to the cloud.{{/unless}}*

### Particle.connected()

Returns `true` when connected to the Cloud, and `false` when disconnected from the Cloud.

```C++
// SYNTAX
Particle.connected();

RETURNS
boolean (true or false)

// EXAMPLE USAGE
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Particle.connected()) {
    Serial.println("Connected!");
  }
  delay(1000);
}
```

{{#if has-udp-cloud}}
### Particle.keepAlive()

Sets the duration between keep-alive messages used to maintain the connection to the cloud.

```C++
// SYNTAX
Particle.keepAlive(23 * 60);	// send a ping every 23 minutes
```

A keep-alive is used to implement "UDP hole punching" which helps maintain the connection from the cloud to the device. A temporary port-forwarded back-channel is set up by the network to allow packets to be sent from the cloud to the device. As this is a finite resource, unused back-channels are periodically deleted by the network.

Should a device becomes unreachable from the cloud (such as a timed out function call or variable get), one possible cause of this is that the keep alives have not been sent often enough.

The keep-alive for cellular devices duration varies by mobile network operator. The default keep-alive is set to 23 minutes, which is sufficient to maintain the connection on Particle SIM cards. 3rd party SIM cards will need to determine the appropriate keep alive value, typically ranging from 30 seconds to several minutes.

**Note:** Each keep alive ping consumes 122 bytes of data (61 bytes sent, 61 bytes received).

For the Xenon, you will need to match the keep-alive to the gateway. If your gateway, for example, is a Boron with a 3rd-party SIM card with a short keep-alive, you'll also need to set this short keep-alive on Xenon nodes. The reason is that each Xenon has its own cloud connection that needs to be kept alive.

For the Argon, the keep-alive is not generally needed. However, in unusual networking situations if the network router/firewall removes the port forwarded back-channels unusually aggressively, you may need to use a keep-alive.

{{/if}} {{!-- has-udp-cloud --}}


### Particle.process()

Runs the background loop. This is the public API for the former internal function
`SPARK_WLAN_Loop()`.

{{#unless has-linux}}
`Particle.process()` checks the {{network-type}} module for incoming messages from the Cloud,
and processes any messages that have come in. It also sends keep-alive pings to the Cloud,
so if it's not called frequently, the connection to the Cloud may be lost.

Even in non-cloud-bound applications it can still be advisable to call `Particle.process()` to explicitly provide some processor time to the {{network-type}} module (e.g. immediately after `{{#if has-wifi}}WiFi{{else}}{{#if has-cellular}}Cellular{{/if}}{{/if}}.ready()` to update system variables).
{{/unless}}

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  while (1) {
    Particle.process();
    redundantLoop();
  }
}

void redundantLoop() {
  Serial.println("Well that was unnecessary.");
}
```

`Particle.process()` is a blocking call, and blocks for a few milliseconds. `Particle.process()` is called automatically after every `loop()` and during delays. Typically you will not need to call `Particle.process()` unless you block in some other way and need to maintain the connection to the Cloud, or you change the [system mode](#system-modes). If the user puts the device into `MANUAL` mode, the user is responsible for calling `Particle.process()`. The more frequently this function is called, the more responsive the device will be to incoming messages, the more likely the Cloud connection will stay open, and the less likely that the Wi-Fi module's buffer will overrun.

### Particle.syncTime()

Synchronize the time with the Particle Device Cloud.
This happens automatically when the device connects to the Cloud.
However, if your device runs continuously for a long time,
you may want to synchronize once per day or so.

```C++
#define ONE_DAY_MILLIS (24 * 60 * 60 * 1000)
unsigned long lastSync = millis();

void loop() {
  if (millis() - lastSync > ONE_DAY_MILLIS) {
    // Request time synchronization from the Particle Device Cloud
    Particle.syncTime();
    lastSync = millis();
  }
}
```

Note that this function sends a request message to the Cloud and then returns.
The time on the device will not be synchronized until some milliseconds later
when the Cloud responds with the current time between calls to your loop.
See [`Particle.syncTimeDone()`](#particle-synctimedone-), [`Particle.timeSyncedLast()`](#particle-timesyncedlast-), [`Time.isValid()`](#isvalid-) and [`Particle.syncTimePending()`](#particle-synctimepending-) for information on how to wait for request to be finished.

### Particle.syncTimeDone()

{{since when="0.6.1"}}

Returns `true` if there is no `syncTime()` request currently pending or there is no active connection to Particle Device Cloud. Returns `false` when there is a pending `syncTime()` request.

```C++
// SYNTAX
Particle.syncTimeDone();

// RETURNS
// boolean (true or false)
```

```C++
// EXAMPLE

void loop()
{
  // Request time synchronization from the Particle Device Cloud
  Particle.syncTime();
  // Wait until {{device}} receives time from Particle Device Cloud (or connection to Particle Device Cloud is lost)
  waitUntil(Particle.syncTimeDone);
  // Print current time
  Serial.println(Time.timeStr());
}
```

See also [`Particle.timeSyncedLast()`](#particle-timesyncedlast-) and [`Time.isValid()`](#isvalid-).

### Particle.syncTimePending()

{{since when="0.6.1"}}

Returns `true` if there a `syncTime()` request currently pending. Returns `false` when there is no `syncTime()` request pending or there is no active connection to Particle Device Cloud.

```C++
// SYNTAX
Particle.syncTimePending();

// RETURNS
// boolean (true or false)
```

```C++
// EXAMPLE

void loop()
{
  // Request time synchronization from the Particle Device Cloud
  Particle.syncTime();
  // Wait until {{device}} receives time from Particle Device Cloud (or connection to Particle Device Cloud is lost)
  while(Particle.syncTimePending())
  {
    //
    // Do something else
    //

    Particle.process();
  }
  // Print current time
  Serial.println(Time.timeStr());
}
```

See also [`Particle.timeSyncedLast()`](#particle-timesyncedlast-) and [`Time.isValid()`](#isvalid-).

### Particle.timeSyncedLast()

{{since when="0.6.1"}}

Used to check when time was last synchronized with Particle Device Cloud.

```C++
// SYNTAX
Particle.timeSyncedLast();
Particle.timeSyncedLast(timestamp);
```

Returns the number of milliseconds since the device began running the current program when last time synchronization with Particle Device Cloud was performed.

This function takes one optional argument:
- `timestamp`: `time_t` variable that will contain a UNIX timestamp received from Particle Device Cloud during last time synchronization

```C++
// EXAMPLE
#define ONE_DAY_MILLIS (24 * 60 * 60 * 1000)

void loop() {
  time_t lastSyncTimestamp;
  unsigned long lastSync = Particle.timeSyncedLast(lastSyncTimestamp);
  if (millis() - lastSync > ONE_DAY_MILLIS) {
    unsigned long cur = millis();
    Serial.printlnf("Time was last synchronized %lu milliseconds ago", millis() - lastSync);
    if (lastSyncTimestamp > 0)
    {
      Serial.print("Time received from Particle Device Cloud was: ");
      Serial.println(Time.timeStr(lastSyncTimestamp));
    }
    // Request time synchronization from Particle Device Cloud
    Particle.syncTime();
    // Wait until {{device}} receives time from Particle Device Cloud (or connection to Particle Device Cloud is lost)
    waitUntil(Particle.syncTimeDone);
    // Check if synchronized successfully
    if (Particle.timeSyncedLast() >= cur)
    {
      // Print current time
      Serial.println(Time.timeStr());
    }
  }
}
```

### Get Public IP

Using this feature, the device can programmatically know its own public IP address.

```cpp
// Open a serial terminal and see the IP address printed out
void handler(const char *topic, const char *data) {
    Serial.println("received " + String(topic) + ": " + String(data));
}

void setup() {
    Serial.begin(115200);
    Particle.subscribe("particle/device/ip", handler);
    Particle.publish("particle/device/ip");
}
```


### Get Device name

This gives you the device name that is stored in the cloud,

```cpp
// Open a serial terminal and see the device name printed out
void handler(const char *topic, const char *data) {
    Serial.println("received " + String(topic) + ": " + String(data));
}

void setup() {
    Serial.begin(115200);
    Particle.subscribe("particle/device/name", handler);
    Particle.publish("particle/device/name");
}
```

### Get Random seed

Grab 40 bytes of randomness from the cloud and {e}n{c}r{y}p{t} away!

```cpp
void handler(const char *topic, const char *data) {
    Serial.println("received " + String(topic) + ": " + String(data));
}

void setup() {
    Serial.begin(115200);
    Particle.subscribe("particle/device/random", handler);
    Particle.publish("particle/device/random");
}
```

{{#if has-mesh}}
## Mesh

### Antenna selection

At the time of writing (Device OS 0.8.0-rc.27), mesh antenna selection is not yet supported. Only the internal mesh antenna can be used at this time. However, you can use this function to select the external mesh antenna. The setting is not saved and the default is internal.

```
void selectExternalMeshAntenna() {

#if (PLATFORM_ID == PLATFORM_ARGON)
    digitalWrite(ANTSW1, 1);
    digitalWrite(ANTSW2, 0);
#elif (PLATFORM_ID == PLATFORM_BORON)
    digitalWrite(ANTSW1, 0);
#else
    digitalWrite(ANTSW1, 0);
    digitalWrite(ANTSW2, 1);
#endif
}
```

### publish()

On Mesh devices, there are two publish options: Particle.publish and Mesh.publish:

- Particle.publish communicates by the cloud. It's used when interacting with an external web service (webhooks, server-sent-events, or rules engine), a classic device (Photon or Electron), or across different mesh networks.
- Mesh.publish communicates locally within a Mesh network. It is faster and does not send data across the Internet, but can only communicate between Mesh devices (Argon, Boron, Xenon) that are on the same Mesh network in the same location. 

The publish function takes two parameters:

* name (1–63 ASCII characters)

**Note:** Only use letters, numbers, underscores, dashes and slashes in event names. Spaces and special characters may be escaped by different tools and libraries causing unexpected results.

* optional data (up to 255 bytes)


```C++
// SYNTAX
Mesh.publish(const char *name, const char *data);

RETURNS
boolean (true or false)

// EXAMPLE USAGE
Mesh.publish("motion-sensor", "living room");
```

### subscribe()

Mesh.subscribe subscribes to events within the Mesh network. Like Particle.subscribe, the event name is a prefix, matching any event that begins with that name. You can have up to 5 mesh subscription handlers.

```C++

void myHandler(const char *event, const char *data)
{
  Serial.printlnf("event=%s data=%s", event, data ? data : "NULL");
}

void setup()
{
  Serial.begin(9600);
  Mesh.subscribe("motion-sensor", myHandler);
}
```

The return value is an int (integer), `SYSTEM_ERROR_NONE` if successful or `SYSTEM_ERROR_NO_MEMORY` if there are no slots left. This is different from Particle.subscribe which returns a bool (boolean).


### on()

`Mesh.on()` turns on the Mesh module. Useful when you've turned it off, and you changed your mind.

Note that `Mesh.on()` does not need to be called unless you have changed the [system mode](#system-modes) or you have previously turned the Mesh module off.

### off()

`Mesh.off()` turns off the Mesh module. 
 
### connect()

Attempts to connect to the Mesh network. If there are no credentials stored, this will enter listening mode. When this function returns, the device may not have an IP address on the LAN; use `Mesh.ready()` to determine the connection status.

```cpp
// SYNTAX
Mesh.connect();
```

### disconnect()

Disconnects from the Mesh network, but leaves the Mesh module on.

```cpp
// SYNTAX
Mesh.disconnect();
```

### connecting()

This function will return `true` once the device is attempting to connect using stored credentials, and will return `false` once the device has successfully connected to the Mesh network.

```cpp
// SYNTAX
Mesh.connecting();
```

### ready()

This function will return `true` once the device is connected to the network and has been assigned an IP address, which means that it's ready to open TCP sockets and send UDP datagrams. Otherwise it will return `false`.

```cpp
// SYNTAX
Mesh.ready();
```

### listen()

This will enter or exit listening mode, which opens a Serial connection to get Mesh credentials over USB, and also listens for credentials over
Bluetooth.

```cpp
// SYNTAX - enter listening mode
Mesh.listen();
```

Listening mode blocks application code. Advanced cases that use multithreading, interrupts, or system events
have the ability to continue to execute application code while in listening mode, and may wish to then exit listening
mode, such as after a timeout. Listening mode is stopped using this syntax:

```cpp

// SYNTAX - exit listening mode
Mesh.listen(false);

```



### listening()

```cpp
// SYNTAX
Mesh.listening();
```

This command is only useful in connection with `SYSTEM_THREAD(ENABLED)`, otherwise it will always return `false`, because listening mode blocks application code.
With a dedicated system thread though `Mesh.listening()` will return `true` once `Mesh.listen()` has been called
or the {{system-button}} button has been held for 3 seconds, when the RGB LED should be blinking blue.
It will return `false` when the device is not in listening mode.

### setListenTimeout()

```cpp
// SYNTAX
Mesh.setListenTimeout(seconds);
```

`Mesh.setListenTimeout(seconds)` is used to set a timeout value for Listening Mode.  Values are specified in `seconds`, and 0 disables the timeout.  By default, Mesh devices do not have any timeout set (seconds=0).  As long as interrupts are enabled, a timer is started and running while the device is in listening mode (Mesh.listening()==true).  After the timer expires, listening mode will be exited automatically.  If Mesh.setListenTimeout() is called while the timer is currently in progress, the timer will be updated and restarted with the new value (e.g. updating from 10 seconds to 30 seconds, or 10 seconds to 0 seconds (disabled)).  
**Note:** Enabling multi-threaded mode with SYSTEM_THREAD(ENABLED) will allow user code to update the timeout value while Listening Mode is active.

```cpp
// EXAMPLE
// If desired, use the STARTUP() macro to set the timeout value at boot time.
STARTUP(Mesh.setListenTimeout(60)); // set listening mode timeout to 60 seconds

void setup() {
  // your setup code
}

void loop() {
  // update the timeout later in code based on an expression
  if (disableTimeout) Mesh.setListenTimeout(0); // disables the listening mode timeout
}
```


### getListenTimeout()

```cpp
// SYNTAX
uint16_t seconds = Mesh.getListenTimeout();
```

`Mesh.getListenTimeout()` is used to get the timeout value currently set for Listening Mode.  Values are returned in (uint16_t)`seconds`, and 0 indicates the timeout is disabled.  By default, Mesh devices do not have any timeout set (seconds=0).

```cpp
// EXAMPLE
void setup() {
  Serial.begin();
  Serial.println(Mesh.getListenTimeout());
}
```

### localIP()


`Mesh.localIP()` is used to get the ML-EID (Mesh-Local EID) IP address of the mesh node. This is an IPv6 address.

```cpp
// EXAMPLE
void setup() {
  Serial.begin();
  Serial.printlnf("localIP: %s", Mesh.localIP().toString().c_str());
}
```
{{/if}}

{{#if has-ethernet}}
## Ethernet

Ethernet is available on the Argon, Boron, and Xenon when used with the [Ethernet FeatherWing](/datasheets/accessories/mesh-accessories/#ethernet-featherwing).

By default, Ethernet detection is not done because it will toggle GPIO that may affect circuits that are not using Ethernet. When you select Ethernet during mobile app setup, it is enabled and the setting stored in configuration flash.

It's also possible to enable Ethernet detection from code. This is saved in configuration flash so you don't need to call it every time.

```
STARTUP(System.enableFeature(FEATURE_ETHERNET_DETECTION));
```

If you are using the Adafruit Ethernet Feather Wing (instead of the Particle Feather Wing), be sure to connect the nRESET and nINTERRUPT pins (on the small header on the short side) to pins D3 and D4 with jumper wires. These are required for proper operation.

| Argon, Boron, Xenon| B Series SoM | Ethernet FeatherWing Pin  |
|:------:|:------------:|:--------------------------|
|MISO    | MISO         | SPI MISO                  |
|MOSI    | MOSI         | SPI MOSI                  |
|SCK     | SCK          | SPI SCK                   |
|D3      | A7           | nRESET                    |
|D4      | D22          | nINTERRUPT                |
|D5      | D8           | nCHIP SELECT              |

When using the FeatherWing Gen 3 devices (Argon, Boron, Xenon), pins D3, D4, and D5 are reserved for Ethernet control pins (reset, interrupt, and chip select).

When using Ethernet with the Boron SoM, pins A7, D22, and D8 are reserved for the Ethernet control pins (reset, interrupt, and chip select).


### on()

`Ethernet.on()` turns on the Ethernet module. Useful when you've turned it off, and you changed your mind.

Note that `Ethernet.on()` does not need to be called unless you have changed the [system mode](#system-modes) or you have previously turned the Ethernet module off.

### off()

`Ethernet.off()` turns off the Ethernet module. 
 
### connect()

Attempts to connect to the Ethernet network. If there are no credentials stored, this will enter listening mode. When this function returns, the device may not have an IP address on the LAN; use `Ethernet.ready()` to determine the connection status.

```cpp
// SYNTAX
Ethernet.connect();
```

### disconnect()

Disconnects from the Ethernet network, but leaves the Ethernet module on.

```cpp
// SYNTAX
Ethernet.disconnect();
```

### connecting()

This function will return `true` once the device is attempting to connect using stored credentials, and will return `false` once the device has successfully connected to the Ethernet network.

```cpp
// SYNTAX
Ethernet.connecting();
```

### ready()

This function will return `true` once the device is connected to the network and has been assigned an IP address, which means that it's ready to open TCP sockets and send UDP datagrams. Otherwise it will return `false`.

```cpp
// SYNTAX
Ethernet.ready();
```

### listen()

This will enter or exit listening mode, which opens a Serial connection to get Ethernet credentials over USB, and also listens for credentials over
Bluetooth.

```cpp
// SYNTAX - enter listening mode
Ethernet.listen();
```

Listening mode blocks application code. Advanced cases that use multithreading, interrupts, or system events
have the ability to continue to execute application code while in listening mode, and may wish to then exit listening
mode, such as after a timeout. Listening mode is stopped using this syntax:

```cpp

// SYNTAX - exit listening mode
Ethernet.listen(false);

```

### listening()

```cpp
// SYNTAX
Ethernet.listening();
```

This command is only useful in connection with `SYSTEM_THREAD(ENABLED)`, otherwise it will always return `false`, because listening mode blocks application code.
With a dedicated system thread though `Ethernet.listening()` will return `true` once `Ethernet.listen()` has been called
or the {{system-button}} button has been held for 3 seconds, when the RGB LED should be blinking blue.
It will return `false` when the device is not in listening mode.

### setListenTimeout()

```cpp
// SYNTAX
Ethernet.setListenTimeout(seconds);
```

`Ethernet.setListenTimeout(seconds)` is used to set a timeout value for Listening Mode.  Values are specified in `seconds`, and 0 disables the timeout.  By default, Ethernet devices do not have any timeout set (seconds=0).  As long as interrupts are enabled, a timer is started and running while the device is in listening mode (Ethernet.listening()==true).  After the timer expires, listening mode will be exited automatically.  If Ethernet.setListenTimeout() is called while the timer is currently in progress, the timer will be updated and restarted with the new value (e.g. updating from 10 seconds to 30 seconds, or 10 seconds to 0 seconds (disabled)).  
**Note:** Enabling multi-threaded mode with SYSTEM_THREAD(ENABLED) will allow user code to update the timeout value while Listening Mode is active.

```cpp
// EXAMPLE
// If desired, use the STARTUP() macro to set the timeout value at boot time.
STARTUP(Ethernet.setListenTimeout(60)); // set listening mode timeout to 60 seconds

void setup() {
  // your setup code
}

void loop() {
  // update the timeout later in code based on an expression
  if (disableTimeout) Ethernet.setListenTimeout(0); // disables the listening mode timeout
}
```


### getListenTimeout()

```cpp
// SYNTAX
uint16_t seconds = Ethernet.getListenTimeout();
```

`Ethernet.getListenTimeout()` is used to get the timeout value currently set for Listening Mode.  Values are returned in (uint16_t)`seconds`, and 0 indicates the timeout is disabled.  By default, Ethernet devices do not have any timeout set (seconds=0).

```cpp
// EXAMPLE
void setup() {
  Serial.begin();
  Serial.println(Ethernet.getListenTimeout());
}
```


### macAddress()

`Ethernet.macAddress()` gets the MAC address of the Ethernet interface.

```cpp
// EXAMPLE
void setup() {
  Serial.begin();
  
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  uint8_t addr[6];
  Ethernet.macAddress(addr);
  
  Serial.printlnf("mac: %02x-%02x-%02x-%02x-%02x-%02x", addr[0], addr[1], addr[2], addr[3], addr[4], addr[5]);
}
```

### localIP()

`Ethernet.localIP()` is used to get the IP address of the Ethernet interface as an `IPAddress`.

```cpp
// EXAMPLE
void setup() {
  Serial.begin();

  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  Serial.printlnf("localIP: %s", Ethernet.localIP().toString().c_str());
}
```

### subnetMask()

`Ethernet.subnetMask()` returns the subnet mask of the network as an `IPAddress`.

```cpp

void setup() {
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  // Prints out the subnet mask over Serial.
  Serial.println(Ethernet.subnetMask());
}
```

### gatewayIP()

`Ethernet.gatewayIP()` returns the gateway IP address of the network as an `IPAddress`.

```cpp

void setup() {
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  // Prints out the gateway IP over Serial.
  Serial.println(Ethernet.gatewayIP());
}
```

### dnsServerIP()

`Ethernet.dnsServerIP()` retrieves the IP address of the DNS server that resolves
DNS requests for the device's network connection. This will often be 0.0.0.0.

### dhcpServerIP()

`Ethernet.dhcpServerIP()` retrieves the IP address of the DHCP server that manages
the IP address used by the device's network connection. This often will be 0.0.0.0.

{{/if}}


{{#if has-wifi}}
## WiFi

### on()

`WiFi.on()` turns on the Wi-Fi module. Useful when you've turned it off, and you changed your mind.

Note that `WiFi.on()` does not need to be called unless you have changed the [system mode](#system-modes) or you have previously turned the Wi-Fi module off.

### off()

`WiFi.off()` turns off the Wi-Fi module. Useful for saving power, since most of the power draw of the device is the Wi-Fi module.

### connect()

Attempts to connect to the Wi-Fi network. If there are no credentials stored, this will enter listening mode (see below for how to avoid this.). If there are credentials stored, this will try the available credentials until connection is successful. When this function returns, the device may not have an IP address on the LAN; use `WiFi.ready()` to determine the connection status.

```cpp
// SYNTAX
WiFi.connect();
```

{{since when="0.4.5"}}

It's possible to call `WiFi.connect()` without entering listening mode in the case where no credentials are stored:

```cpp
// SYNTAX
WiFi.connect(WIFI_CONNECT_SKIP_LISTEN);
```

If there are no credentials then the call does nothing other than turn on the Wi-Fi module.

{{#if has-mesh}}
**Note:** Due to an open [issue](https://github.com/particle-iot/device-os/issues/1631) the automatic activation of the {{network-type}} connection is currently not working as expected. If the {{network-type}} module is not already powered up, your code needs to explicitly call {{#if has-wifi}}[`WiFi.on()`](#on--2){{/if}}{{#if has-cellular}}[`Cellular.on()`](#on--2){{/if}} before calling {{#if has-wifi}}[`WiFi.connect()`](#connect--2){{/if}}{{#if has-cellular}}[`Cellular.connect()`](#on-){{/if}}.
{{/if}}

### disconnect()

Disconnects from the Wi-Fi network, but leaves the Wi-Fi module on.

```cpp
// SYNTAX
WiFi.disconnect();
```

### connecting()

This function will return `true` once the device is attempting to connect using stored Wi-Fi credentials, and will return `false` once the device has successfully connected to the Wi-Fi network.

```cpp
// SYNTAX
WiFi.connecting();
```

### ready()

This function will return `true` once the device is connected to the network and has been assigned an IP address, which means that it's ready to open TCP sockets and send UDP datagrams. Otherwise it will return `false`.

```cpp
// SYNTAX
WiFi.ready();
```

{{#if has-wifi-antenna-switch}}
### selectAntenna() [Antenna]

Selects which antenna the device should connect to Wi-Fi with and remembers that
setting until it is changed.

```cpp
// SYNTAX
STARTUP(WiFi.selectAntenna(ANT_INTERNAL)); // selects the CHIP antenna
STARTUP(WiFi.selectAntenna(ANT_EXTERNAL)); // selects the u.FL antenna
STARTUP(WiFi.selectAntenna(ANT_AUTO)); // continually switches at high speed between antennas
```

`WiFi.selectAntenna()` selects one of three antenna modes on your Photon or P1.  It takes one argument: `ANT_AUTO`, `ANT_INTERNAL` or `ANT_EXTERNAL`.
`WiFi.selectAntenna()` must be used inside another function like STARTUP(), setup(), or loop() to compile.

You may specify in code which antenna to use as the default at boot time using the STARTUP() macro.

> Note that the antenna selection is remembered even after power off or when entering safe mode.
This is to allow your device to be configured once and then continue to function with the
selected antenna when applications are flashed that don't specify which antenna to use.

This ensures that devices which must use the external antenna continue to use the external
antenna in all cases even when the application code isn't being executed (e.g. safe mode.)

If no antenna has been previously selected, the `ANT_INTERNAL` antenna will be chosen by default.

`WiFi.selectAntenna()` returns 0 on success, or -1005 if the antenna choice was not found.
Other errors that may appear will all be negative values.

```cpp
// Use the STARTUP() macro to set the default antenna
// to use system boot time.
// In this case it would be set to the chip antenna
STARTUP(WiFi.selectAntenna(ANT_INTERNAL));

void setup() {
  // your setup code
}

void loop() {
  // your loop code
}
```

{{/if}} {{!-- has-wifi-antenna-switch --}}

### listen()

This will enter or exit listening mode, which opens a Serial connection to get Wi-Fi credentials over USB, and also listens for credentials over
{{#if core}}Smart Config{{/if}}{{#if photon}}Soft AP{{/if}}.

```cpp
// SYNTAX - enter listening mode
WiFi.listen();
```

Listening mode blocks application code. Advanced cases that use multithreading, interrupts, or system events
have the ability to continue to execute application code while in listening mode, and may wish to then exit listening
mode, such as after a timeout. Listening mode is stopped using this syntax:

```cpp

// SYNTAX - exit listening mode
WiFi.listen(false);

```



### listening()

```cpp
// SYNTAX
WiFi.listening();
```

{{#unless has-threading}}
Because listening mode blocks your application code on the {{device}}, this command is not useful on the Core.
It will always return `false`.
{{/unless}} {{!-- has-threading --}}
{{#if has-threading}}
This command is only useful in connection with `SYSTEM_THREAD(ENABLED)`, otherwise it will always return `false`, because listening mode blocks application code.
With a dedicated system thread though `WiFi.listening()` will return `true` once `WiFi.listen()` has been called
or the {{system-button}} button has been held for 3 seconds, when the RGB LED should be blinking blue.
It will return `false` when the device is not in listening mode.
{{/if}} {{!-- has-threading --}}


### setListenTimeout()

{{since when="0.6.1"}}

```cpp
// SYNTAX
WiFi.setListenTimeout(seconds);
```

`WiFi.setListenTimeout(seconds)` is used to set a timeout value for Listening Mode.  Values are specified in `seconds`, and 0 disables the timeout.  By default, Wi-Fi devices do not have any timeout set (seconds=0).  As long as interrupts are enabled, a timer is started and running while the device is in listening mode (WiFi.listening()==true).  After the timer expires, listening mode will be exited automatically.  If WiFi.setListenTimeout() is called while the timer is currently in progress, the timer will be updated and restarted with the new value (e.g. updating from 10 seconds to 30 seconds, or 10 seconds to 0 seconds (disabled)).  {{#if has-threading}}**Note:** Enabling multi-threaded mode with SYSTEM_THREAD(ENABLED) will allow user code to update the timeout value while Listening Mode is active.{{/if}} 

{{#if core}}
Because listening mode blocks your application code on the Core, this command should be avoided in loop().  It can be used with the STARTUP() macro or in setup() on the Core.
It will always return `false`.

This setting is not persistent in memory if the {{device}} is rebooted.
{{/if}}

```cpp
// EXAMPLE
// If desired, use the STARTUP() macro to set the timeout value at boot time.
STARTUP(WiFi.setListenTimeout(60)); // set listening mode timeout to 60 seconds

void setup() {
  // your setup code
}
{{#if has-threading}}
void loop() {
  // update the timeout later in code based on an expression
  if (disableTimeout) WiFi.setListenTimeout(0); // disables the listening mode timeout
}
{{/if}}
```


### getListenTimeout()

{{since when="0.6.1"}}

```cpp
// SYNTAX
uint16_t seconds = WiFi.getListenTimeout();
```

`WiFi.getListenTimeout()` is used to get the timeout value currently set for Listening Mode.  Values are returned in (uint16_t)`seconds`, and 0 indicates the timeout is disabled.  By default, Wi-Fi devices do not have any timeout set (seconds=0).

```cpp
// EXAMPLE
void setup() {
  Serial.begin();
  Serial.println(WiFi.getListenTimeout());
}
```


### setCredentials()

Allows the application to set credentials for the Wi-Fi network from within the code. These credentials will be added to the device's memory, and the device will automatically attempt to connect to this network in the future.

Your device can remember more than one set of credentials:
- Core: remembers the 7 most recently set credentials
- Photon: remembers the 5 most recently set credentials.
- Argon: remembers the 10 most recently set credentials.

{{#if has-stm32}}
{{since when="0.7.0"}} Photon can store one set of WPA Enterprise credentials.
{{/if}}

```cpp
// Connects to an unsecured network.
WiFi.setCredentials(ssid);
WiFi.setCredentials("My_Router_Is_Big");

// Connects to a network secured with WPA2 credentials.
WiFi.setCredentials(ssid, password);
WiFi.setCredentials("My_Router", "mypasswordishuge");

// Connects to a network with a specified authentication procedure.
// Options are WPA2, WPA, or WEP.
WiFi.setCredentials(ssid, password, auth);
WiFi.setCredentials("My_Router", "wepistheworst", WEP);
```

{{#if photon}}
When the Photon is used with hidden or offline networks, the security cipher is also required.

```cpp

// for hidden and offline networks on the Photon, the security cipher is also needed
// Cipher options are WLAN_CIPHER_AES, WLAN_CIPHER_TKIP and WLAN_CIPHER_AES_TKIP
WiFi.setCredentials(ssid, password, auth, cipher);
WiFi.setCredentials("SSID", "PASSWORD", WPA2, WLAN_CIPHER_AES);
```

{{/if}} {{!-- photon --}}

```c++
// Connects to a network with an authentication procedure specified by WiFiCredentials object
WiFi.setCredentials(credentials);
WiFiCredentials credentials;
credentials.setSsid("My_Router")
           .setSecurity(WEP)
           .setPassword("wepistheworst");
WiFi.setCredentials(credentials);
```

{{since when="0.7.0"}}

Credentials can be set using [WiFiCredentials class](#wificredentials-class).

{{#if has-wpa-enterprise}}
```cpp
// WPA2 Enterprise with EAP-TLS

// We are setting WPA2 Enterprise credentials
WiFiCredentials credentials("My_Enterprise_AP", WPA2_ENTERPRISE);
// EAP type: EAP-TLS
credentials.setEapType(WLAN_EAP_TYPE_TLS);
// Client certificate in PEM format
credentials.setClientCertificate("-----BEGIN CERTIFICATE-----\r\n" \
                                 /* ... */ \
                                 "-----END CERTIFICATE-----\r\n\r\n"
                                );
// Private key in PEM format
credentials.setPrivateKey("-----BEGIN RSA PRIVATE KEY-----\r\n" \
                          /* ... */ \
                          "-----END RSA PRIVATE KEY-----\r\n\r\n"
                         );
// Root (CA) certificate in PEM format (optional)
credentials.setRootCertificate("-----BEGIN CERTIFICATE-----\r\n" \
                               /* ... */ \
                               "-----END CERTIFICATE-----\r\n\r\n"
                              );
// EAP outer identity (optional, default - "anonymous")
credentials.setOuterIdentity("anonymous");
// Save credentials
WiFi.setCredentials(credentials);
```

```cpp
// WPA Enterprise with PEAP/MSCHAPv2

// We are setting WPA Enterprise credentials
WiFiCredentials credentials("My_Enterprise_AP", WPA_ENTERPRISE);
// EAP type: PEAP/MSCHAPv2
credentials.setEapType(WLAN_EAP_TYPE_PEAP);
// Set username
credentials.setIdentity("username");
// Set password
credentials.setPassword("password");
// Set outer identity (optional, default - "anonymous")
credentials.setOuterIdentity("anonymous");
// Root (CA) certificate in PEM format (optional)
credentials.setRootCertificate("-----BEGIN CERTIFICATE-----\r\n" \
                               /* ... */ \
                               "-----END CERTIFICATE-----\r\n\r\n"
                              );
// Save credentials
WiFi.setCredentials(credentials);
```
{{/if}}

Parameters:
- `ssid`: SSID (string)
- `password`: password (string)
- `auth`: see [SecurityType](#securitytype-enum) enum.
- `cipher`: see [WLanSecurityCipher](#wlansecuritycipher-enum) enum.
- `credentials`: an instance of [WiFiCredentials class](#wificredentials-class).

This function returns `true` if credentials were successfully saved, or `false` in case of an error.

**Note:** Setting WPA/WPA2 Enterprise credentials requires use of [WiFiCredentials class](#wificredentials-class).

**Note:** In order for `WiFi.setCredentials()` to work, the Wi-Fi module needs to be on (if switched off or disabled via non_AUTOMATIC SYSTEM_MODEs call `WiFi.on()`).

### getCredentials()

{{since when="0.4.9"}}

Lists the Wi-Fi networks with credentials stored on the device. Returns the number of stored networks.

Note that this returns details about the Wi-Fi networks, but not the actual password.

{{#if core}}

*Core: always returns 0 since Wi-Fi credentials cannot be read back from the CC3000 Wi-Fi module.*

{{else}}

```cpp
// EXAMPLE
WiFiAccessPoint ap[5];
int found = WiFi.getCredentials(ap, 5);
for (int i = 0; i < found; i++) {
    Serial.print("ssid: ");
    Serial.println(ap[i].ssid);
    // security is one of WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA, WLAN_SEC_WPA2, WLAN_SEC_WPA_ENTERPRISE, WLAN_SEC_WPA2_ENTERPRISE
    Serial.print("security: ");
    Serial.println(ap[i].security);
    // cipher is one of WLAN_CIPHER_AES, WLAN_CIPHER_TKIP or WLAN_CIPHER_AES_TKIP
    Serial.print("cipher: ");
    Serial.println(ap[i].cipher);
}
```

{{/if}}

### clearCredentials()

This will clear all saved credentials from the Wi-Fi module's memory. This will return `true` on success and `false` if the Wi-Fi module has an error.

```cpp
// SYNTAX
WiFi.clearCredentials();
```

### hasCredentials()

Will return `true` if there are Wi-Fi credentials stored in the Wi-Fi module's memory.

```cpp
// SYNTAX
WiFi.hasCredentials();
```

### macAddress()

`WiFi.macAddress()` returns the MAC address of the device.

```cpp
// EXAMPLE USAGE

byte mac[6];

void setup() {
  WiFi.on();
  Serial.begin(9600);
  // wait up to 10 seconds for USB host to connect
  // requires firmware >= 0.5.3
  waitFor(Serial.isConnected, 10000);

  WiFi.macAddress(mac);

  for (int i=0; i<6; i++) {
    Serial.printf("%02x%s", mac[i], i != 5 ? ":" : "");
  }
}
```

```cpp
// EXAMPLE USAGE

// Only for Spark Core using firmware < 0.4.0
// Mac address is in the reversed order and
// is fixed from v0.4.0 onwards

byte mac[6];

void setup() {
  Serial.begin(9600);
  // wait until a character sent from USB host
  while (!Serial.available()) Spark.process();

  WiFi.macAddress(mac);

  for (int i=5; i>0; i--) {
    Serial.print(mac[i]>>4,HEX);
    Serial.print(mac[i]&0x0f,HEX);
    if (i != 0) {
      Serial.print(":");
    }
  }
}

void loop() {}
```

### SSID()

`WiFi.SSID()` returns the SSID of the network the device is currently connected to as a `char*`.

### BSSID()

`WiFi.BSSID()` retrieves the 6-byte MAC address of the access point the device is currently connected to.

```cpp
byte bssid[6];

void setup() {
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  WiFi.BSSID(bssid);
  Serial.printlnf("%02X:%02X:%02X:%02X:%02X:%02X", bssid[0], bssid[1], bssid[2], bssid[3], bssid[4], bssid[5]);
}
```

### RSSI()

`WiFi.RSSI()` returns the signal strength of a Wi-Fi network from -127 (weak) to -1dB (strong) as an `int`. Positive return values indicate an error with 1 indicating a Wi-Fi chip error and 2 indicating a time-out error.

```cpp
// SYNTAX
int rssi = WiFi.RSSI();
WiFiSignal rssi = WiFi.RSSI();
```

_Since 0.8.0_

`WiFi.RSSI()` returns an instance of [`WiFiSignal`](#wifisignal-class) class.

```cpp
// SYNTAX
WiFiSignal sig = WiFi.RSSI();
```

If you are passing the RSSI value as a variable argument, such as with Serial.printlnf, Log.info, snprintf, etc. make sure you add a cast:

```
Serial.printlnf("RSSI=%d", (int8_t) WiFi.RSSI()).
```

This is necessary for the compiler to correctly convert the WiFiSignal class into a number.

### WiFiSignal Class

This class allows to query a number of signal parameters of the currently connected WiFi network.

#### getStrength()

Gets the signal strength as a percentage (0.0 - 100.0). See [`getStrengthValue()`](#getstrengthvalue-) on how strength values are mapped to 0%-100% range.

```cpp
// SYNTAX
WiFiSignal sig = WiFi.RSSI();
float strength = sig.getStrength();

// EXAMPLE
WiFiSignal sig = WiFi.RSSI();
Log.info("WiFi signal strength: %.02f%%", sig.getStrength());
```

Returns: `float`

#### getQuality()

Gets the signal quality as a percentage (0.0 - 100.0). See [`getQualityValue()`](#getqualityvalue-) on how quality values are mapped to 0%-100% range.

```cpp
// SYNTAX
WiFiSignal sig = WiFi.RSSI();
float quality = sig.getQuality();

// EXAMPLE
WiFiSignal sig = WiFi.RSSI();
Log.info("WiFi signal quality: %.02f%%", sig.getQuality());
```

Returns: `float`

#### getStrengthValue()

```cpp
// SYNTAX
WiFiSignal sig = WiFi.RSSI();
float strength = sig.getStrengthValue();
```

Gets the raw signal strength value in dBm. Range: [-90, 0].

Returns: `float`

#### getQualityValue()

```cpp
// SYNTAX
WiFiSignal sig = WiFi.RSSI();
float quality = sig.getQualityValue();
```

Gets the raw signal quality value (SNR) in dB. Range: [0, 90].

Returns: `float`

### ping()

`WiFi.ping()` allows you to ping an IP address and returns the number of packets received as an `int`. It takes two forms:

`WiFi.ping(IPAddress remoteIP)` takes an `IPAddress` and pings that address.

`WiFi.ping(IPAddress remoteIP, uint8_t nTries)` and pings that address a specified number of times.

### scan()

Returns information about access points within range of the device.

The first form is the simplest, but also least flexible. You provide a
array of `WiFiAccessPoint` instances, and the call to `WiFi.scan()` fills out the array.
If there are more APs detected than will fit in the array, they are dropped.
Returns the number of access points written to the array.

```cpp
// EXAMPLE - retrieve up to 20 Wi-Fi APs

WiFiAccessPoint aps[20];
int found = WiFi.scan(aps, 20);
for (int i=0; i<found; i++) {
    WiFiAccessPoint& ap = aps[i];
    Serial.print("SSID: ");
    Serial.println(ap.ssid);
    Serial.print("Security: ");
    Serial.println(ap.security);
    Serial.print("Channel: ");
    Serial.println(ap.channel);
    Serial.print("RSSI: ");
    Serial.println(ap.rssi);
}
```

The more advanced call to `WiFi.scan()` uses a callback function that receives
each scanned access point.

```
// EXAMPLE using a callback
void wifi_scan_callback(WiFiAccessPoint* wap, void* data)
{
    WiFiAccessPoint& ap = *wap;
    Serial.print("SSID: ");
    Serial.println(ap.ssid);
    Serial.print("Security: ");
    Serial.println(ap.security);
    Serial.print("Channel: ");
    Serial.println(ap.channel);
    Serial.print("RSSI: ");
    Serial.println(ap.rssi);
}

void loop()
{
    int result_count = WiFi.scan(wifi_scan_callback);
    Serial.print(result_count);
    Serial.println(" APs scanned.");
}
```

The main reason for doing this is that you gain access to all access points available
without having to know in advance how many there might be.

You can also pass a 2nd parameter to `WiFi.scan()` after the callback, which allows
object-oriented code to be used.

```
// EXAMPLE - class to find the strongest AP

class FindStrongestSSID
{
    char strongest_ssid[33];
    int strongest_rssi;

    // This is the callback passed to WiFi.scan()
    // It makes the call on the `self` instance - to go from a static
    // member function to an instance member function.
    static void handle_ap(WiFiAccessPoint* wap, FindStrongestSSID* self)
    {
        self->next(*wap);
    }

    // determine if this AP is stronger than the strongest seen so far
    void next(WiFiAccessPoint& ap)
    {
        if ((ap.rssi < 0) && (ap.rssi > strongest_rssi)) {
            strongest_rssi = ap.rssi;
            strcpy(strongest_ssid, ap.ssid);
        }
    }

public:

    /**
     * Scan Wi-Fi Access Points and retrieve the strongest one.
     */
    const char* scan()
    {
        // initialize data
        strongest_rssi = -128;
        strongest_ssid[0] = 0;
        // perform the scan
        WiFi.scan(handle_ap, this);
        return strongest_ssid;
    }
};

// Now use the class
FindStrongestSSID strongestFinder;
const char* ssid = strongestFinder.scan();

}
```

### resolve()

`WiFi.resolve()` finds the IP address for a domain name.

```cpp
// SYNTAX
ip = WiFi.resolve(name);
```

Parameters:

- `name`: the domain name to resolve (string)

It returns the IP address if the domain name is found, otherwise a blank IP address.

```cpp
// EXAMPLE USAGE

IPAddress ip;
void setup() {
   ip = WiFi.resolve("www.google.com");
   if(ip) {
     // IP address was resolved
   } else {
     // name resolution failed
   }
}
```

### localIP()

`WiFi.localIP()` returns the local IP address assigned to the device as an `IPAddress`.

```cpp

void setup() {
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  // Prints out the local IP over Serial.
  Serial.println(WiFi.localIP());
}
```

### subnetMask()

`WiFi.subnetMask()` returns the subnet mask of the network as an `IPAddress`.

```cpp

void setup() {
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  // Prints out the subnet mask over Serial.
  Serial.println(WiFi.subnetMask());
}
```

### gatewayIP()

`WiFi.gatewayIP()` returns the gateway IP address of the network as an `IPAddress`.

```cpp

void setup() {
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  // Prints out the gateway IP over Serial.
  Serial.println(WiFi.gatewayIP());
}
```

### dnsServerIP()

`WiFi.dnsServerIP()` retrieves the IP address of the DNS server that resolves
DNS requests for the device's network connection.

Note that for this value to be available requires calling `Particle.process()` after Wi-Fi
has connected.


### dhcpServerIP()

`WiFi.dhcpServerIP()` retrieves the IP address of the DHCP server that manages
the IP address used by the device's network connection.

Note that for this value to be available requires calling `Particle.process()` after Wi-Fi
has connected.


{{#if photon}}

### setStaticIP()

Defines the static IP addresses used by the system to connect to the network when static IP is activated.

```cpp
// SYNTAX

void setup() {
    IPAddress myAddress(192,168,1,100);
    IPAddress netmask(255,255,255,0);
    IPAddress gateway(192,168,1,1);
    IPAddress dns(192,168,1,1);
    WiFi.setStaticIP(myAddress, netmask, gateway, dns);

    // now let's use the configured IP
    WiFi.useStaticIP();
}

```

The addresses are stored persistently so that they are available in all subsequent
application and also in safe mode.


### useStaticIP()

Instructs the system to connect to the network using the IP addresses provided to
`WiFi.setStaticIP()`

The setting is persistent and is remembered until `WiFi.useDynamicIP()` is called.

### useDynamicIP()

Instructs the system to connect to the network using a dynamically allocated IP
address from the router.

A note on switching between static and dynamic IP. If static IP addresses have been previously configured using `WiFi.setStaticIP()`, they continue to be remembered
by the system after calling `WiFi.useDynamicIP()`, and so are available for use next time `WiFi.useStaticIP()`
is called, without needing to be reconfigured using `WiFi.setStaticIP()`

### setHostname()


{{since when="0.7.0"}}

Sets a custom hostname to be used as DHCP client name (DHCP option 12).

Parameters:

- `hostname`: the hostname to set (string)

```cpp
// SYNTAX

WiFi.setHostname("photon-123");
```

By default the {{device}} uses its [device ID](#deviceid-) as hostname.

The hostname is stored in persistent memory. In order to reset the hostname to its default value (device ID) `setHostname()` needs to be called with `hostname` argument set to `NULL`.

```cpp
// Reset hostname to default value (device ID)
WiFi.setHostname(NULL);
// Both these functions should return the same value.
Serial.println(WiFi.getHostname());
Serial.println(System.deviceID());
```

### hostname()

{{since when="0.7.0"}}

Retrieves device hostname used as DHCP client name (DHCP option 12).

This function does not take any arguments and returns a `String`.

```cpp
// SYNTAX
String hostname = WiFi.hostname();
```

By default the {{device}} uses its [device ID](#deviceid-) as hostname. See [WiFi.setHostname()](#sethostname-) for documentation on changing the hostname.

{{/if}} {{!-- photon --}}

### WiFiCredentials class
This class allows to define WiFi credentials that can be passed to [WiFi.setCredentials()](#setcredentials-) function.

```c++
// EXAMPLE - defining and using WiFiCredentials class

void setup() {
    // Ensure that WiFi module is on
    WiFi.on();
    // Set up WPA2 access point "My AP" with password "mypassword" and AES cipher
    WiFiCredentials credentials("My AP", WPA2);
    credentials.setPassword("mypassword")
               .setCipher(WLAN_CIPHER_AES);
    // Connect if settings were successfully saved
    if (WiFi.setCredentials(credentials)) {
        WiFi.connect();
        waitFor(WiFi.ready, 30000);
        Particle.connect();
        waitFor(Particle.connected, 30000);
    }
}

void loop() {
}
```

#### WiFiCredentials()
Constructs an instance of the WiFiCredentials class. By default security type is initialized to unsecured (`UNSEC`).

```c++
// SYNTAX
WiFiCredentials credentials(SecurityType security = UNSEC); // 1
WiFiCredentials credentials(const char* ssid, SecurityType security = UNSEC); // 2
```

```c++
// EXAMPLE - constructing WiFiCredentials instance
// Empty instance, security is set to UNSEC
WiFiCredentials credentials;
// No SSID, security is set to WPA2
WiFiCredentials credentials(WPA2);
// SSID set to "My AP", security is set to UNSEC
WiFiCredentials credentials("My AP");
// SSID set to "My WPA AP", security is set to WPA
WiFiCredentials credentials("My AP", WPA);
```

Parameters:
- `ssid`: SSID (string)
- `security`: see [SecurityType](#securitytype-enum) enum.

#### setSsid()
Sets access point SSID.

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setSsid(const char* ssid);
```

```c++
// EXAMPLE - setting ssid
WiFiCredentials credentials;
credentials.setSsid("My AP");
```

Parameters:
- `ssid`: SSID (string)

#### setSecurity()
Sets access point security type.

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setSecurity(SecurityType security);
```

```c++
// EXAMPLE - setting security type
WiFiCredentials credentials;
credentials.setSecurity(WPA2);
```

Parameters:
- `security`: see [SecurityType](#securitytype-enum) enum.

#### setCipher()
Sets access point cipher.

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setCipher(WLanSecurityCipher cipher);
```

```c++
// EXAMPLE - setting cipher
WiFiCredentials credentials;
credentials.setCipher(WLAN_CIPHER_AES);
```

Parameters:
- `cipher`: see [WLanSecurityCipher](#wlansecuritycipher-enum) enum.

#### setPassword()
Sets access point password.

{{#if has-wpa-enterprise}}
When configuring credentials for WPA/WPA2 Enterprise access point with PEAP/MSCHAPv2 authentication, this function sets password for username set by [setIdentity()](#setidentity-).
{{/if}} {{!-- has-wpa-enterprise --}}

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setPassword(const char* password);
```

```c++
// EXAMPLE - setting password
WiFiCredentials credentials("My AP", WPA2);
credentials.setPassword("mypassword");
```

Parameters:
{{#if has-wpa-enterprise}}
- `password`: WEP/WPA/WPA2 access point password, or user password for PEAP/MSCHAPv2 authentication (string)
{{else}}
- `password`: WEP/WPA/WPA2 access point password (string)
{{/if}} {{!-- has-wpa-enterprise --}}

#### setChannel()
Sets access point channel.

```c++
// SYNYAX
WiFiCredentials& WiFiCredentials::setChannel(int channel);
```

```c++
// EXAMPLE - setting channel
WiFiCredentials credentials("My AP");
credentials.setChannel(10);
```

Parameters:
- `channel`: WLAN channel (int)

{{#if has-wpa-enterprise}}
#### setEapType()
Sets EAP type.

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setEapType(WLanEapType type);
```

```c++
// EXAMPLE - setting EAP type
WiFiCredentials credentials("My Enterprise AP", WPA2_ENTERPRISE);
credentials.setEapType(WLAN_EAP_TYPE_PEAP);
```

Parameters:
- `type`: EAP type. See [WLanEapType](#wlaneaptype-enum) enum for a list of supported values.

#### setIdentity()
Sets EAP inner identity (username in case of PEAP/MSCHAPv2).

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setIdentity(const char* identity);
```

```c++
// EXAMPLE - setting PEAP identity (username)
WiFiCredentials credentials("My Enterprise AP", WPA2_ENTERPRISE);
credentials.setEapType(WLAN_EAP_TYPE_PEAP);
credentials.setIdentity("username");
```

Parameters:
- `identity`: inner identity (string)

#### setOuterIdentity()
Sets EAP outer identity. Defaults to "anonymous".

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setOuterIdentity(const char* identity);
```

```c++
// EXAMPLE - setting outer identity
WiFiCredentials credentials("My Enterprise AP", WPA2_ENTERPRISE);
credentials.setOuterIdentity("notanonymous");
```

Parameters:
- `identity`: outer identity (string)

#### setClientCertificate()
Sets client certificate used for EAP-TLS authentication.

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setClientCertificate(const char* cert);
```

```c++
// EXAMPLE - setting client certificate
WiFiCredentials credentials;
credentials.setClientCertificate("-----BEGIN CERTIFICATE-----\r\n" \
                                 /* ... */ \
                                 "-----END CERTIFICATE-----\r\n\r\n"
                                );
```

Parameters:
- `cert`: client certificate in PEM format (string)

#### setPrivateKey()
Sets private key used for EAP-TLS authentication.

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setPrivateKey(const char* key);
```

```c++
// EXAMPLE - setting private key
WiFiCredentials credentials;
credentials.setPrivateKey("-----BEGIN RSA PRIVATE KEY-----\r\n" \
                          /* ... */ \
                          "-----END RSA PRIVATE KEY-----\r\n\r\n"
                         );
```

Parameters:
- `key`: private key in PEM format (string)

#### setRootCertificate()
Sets one more root (CA) certificates.

```c++
// SYNTAX
WiFiCredentials& WiFiCredentials::setRootCertificate(const char* cert);
```

```c++
// EXAMPLE - setting one root certificate
WiFiCredentials credentials;
credentials.setClientCertificate("-----BEGIN CERTIFICATE-----\r\n" \
                                 /* ... */ \
                                 "-----END CERTIFICATE-----\r\n\r\n"
                                );
// EXAMPLE - setting multiple root certificates
WiFiCredentials credentials;
credentials.setClientCertificate("-----BEGIN CERTIFICATE-----\r\n" \
                                 /* ... */ \
                                 "-----END CERTIFICATE-----\r\n"
                                 "-----BEGIN CERTIFICATE-----\r\n" \
                                 /* ... */ \
                                 "-----END CERTIFICATE-----\r\n\r\n"
                                );
```

Parameters:
- `cert`: one or multiple concatenated root certificates in PEM format (string)

### WLanEapType Enum
This enum defines EAP types.

| Name                 | Description                                                     |
|----------------------|-----------------------------------------------------------------|
| `WLAN_EAP_TYPE_PEAP` | PEAPv0/EAP-MSCHAPv2 (draft-josefsson-pppext-eap-tls-eap-06.txt) |
| `WLAN_EAP_TYPE_TLS`  | EAP-TLS (RFC 2716)                                              |

{{/if}} {{!-- has-wpa-enterprise --}}

### SecurityType Enum
This enum defines wireless security types.

| Name              | Description                          |
|-------------------|--------------------------------------|
| `UNSEC`           | Unsecured                            |
| `WEP`             | Wired Equivalent Privacy             |
| `WPA`             | Wi-Fi Protected Access               |
| `WPA2`            | Wi-Fi Protected Access II            |
| `WPA_ENTERPRISE`  | Wi-Fi Protected Access-Enterprise    |
| `WPA2_ENTERPRISE` | Wi-Fi Protected Access-Enterprise II |

### WLanSecurityCipher Enum
This enum defines wireless security ciphers.

| Name                   | Description        |
|------------------------|--------------------|
| `WLAN_CIPHER_NOT_SET`  | No cipher          |
| `WLAN_CIPHER_AES`      | AES cipher         |
| `WLAN_CIPHER_TKIP`     | TKIP cipher        |
| `WLAN_CIPHER_AES_TKIP` | AES or TKIP cipher |

{{/if}} {{!-- has-wifi --}}


{{#if has-softap}}
## SoftAP HTTP Pages

{{since when="0.5.0"}}

When the device is in listening mode, it creates a temporary access point (AP) and a HTTP server on port 80. The HTTP server is used to configure the Wi-Fi access points the device attempts to connect to. As well as the system providing HTTP URLs, applications can add their own pages to the
SoftAP HTTP server.

SoftAP HTTP Pages is presently an advanced feature, requiring moderate C++ knowledge.  To begin using the feature:

- add `#include "Particle.h"` below that, then
- add `#include "softap_http.h"` below that still


```cpp
// SYNTAX

void myPages(const char* url, ResponseCallback* cb, void* cbArg, Reader* body, Writer* result, void* reserved);

STARTUP(softap_set_application_page_handler(myPages, nullptr));
```

The `softap_set_application_page_handler` is set during startup. When the system is in setup mode (listening mode, blinking dark blue), and a request is made for an unknown URL, the system
calls the page handler function provided by the application (here, `myPages`.)

The page handler function is called whenever an unknown URL is requested. It is called with these parameters:

- `url`: the path of the file requested by the client. It doesn't include the server name or port. Examples: `/index`,  `/someimage.jpg`.
- `cb`: a response callback - this is used by the application to indicate the type of HTTP response, such as 200 (OK) or 404 (not found). More on this below.
- `cbArg`: data that should be passed as the first parameter to the callback function `cb`.
- `body`: a reader object that the page handler uses to retrieve the HTTP request body
- `result`: a writer object that the page handler uses to write the HTTP response body
- `reserved`: reserved for future expansion. Will be equal to `nullptr` and can be ignored.

The application MUST call the page callback function `cb` to provide a response for the requested page. If the requested page url isn't recognized by the application, then a 404 response should be sent, as described below.

### The page callback function

When your page handler function is called, the system passes a result callback function as the `cb` parameter.
The callback function takes these parameters:

- `cbArg`: this is the `cbArg` parameter passed to your page callback function. It's internal state used by the HTTP server.
- `flags`: presently unused. Set to 0.
- `status`: the HTTP status code, as an integer, such as 200 for `OK`, or 404 for `page not found`.
- `mime-type`: the mime-type of the response as a string, such as `text/html` or `application/javascript`.
- `header`: an optional pointer to a `Header` that is added to the response sent to the client.

For example, to send a "not found" error for a page that is not recognized, your application code would call

```cpp
//  EXAMPLE - send a 404 response for an unknown page
cb(cbArg, 0, 404, "text/plain", nullptr);
```


### Retrieving the request data

When the HTTP request contains a request body (such as with a POST request), the `Reader` object provided by the `body` parameter can be used
to retrieve the request data.

```cpp
// EXAMPLE

if (body->bytes_left) {
	char* data = body->fetch_as_string();
	// handle the body data
 	dostuff(data);
 	// free the data! IMPORTANT!
 	free(data);
}

```

### Sending a response

When sending a page, the page function responds with a HTTP 200 code, meaning the content was found, followed by the page data.

```
// EXAMPLE - send a page

if (!stricmp(url, '/helloworld') {
	// send the response code 200, the mime type "text/html"
	cb(cbArg, 0, 200, "text/html", nullptr);
	// send the page content
	result->write("<h2>hello world!</h2>");
}
```

### The default page

When a browser requests the default page (`http://192.168.0.1/`) the system internally redirects this to `/index` so that it can be handled
by the application.

The application may provide an actual page at `/index` or redirect to another page if the application prefers to have another page as its launch page.

### Sending a Redirect

The application can send a redirect response for a given page in order to manage the URL namespace, such as providing aliases for some resources.

The code below sends a redirect from the default page `/index` to `/index.html`

```cpp
// EXAMPLE - redirect from /index to /index.html
// add this code in the page hanler function

if (strcmp(url,"/index")==0) {
    Header h("Location: /index.html\r\n");
    cb(cbArg, 0, 301, "text/plain", &h);
    return;
}

```

### Complete Example

Here's a complete example providing a Web UI for setting up WiFi via HTTP. Credit for the HTTP pages goes to GitHub user @mebrunet! ([Included from PR #909 here](https://github.com/particle-iot/device-os/pull/906)) ([Source code here](https://github.com/mebrunet/softap-setup-page))



```
#include "Particle.h"
#include "softap_http.h"

struct Page
{
    const char* url;
    const char* mime_type;
    const char* data;
};


const char index_html[] = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1'><title>Setup your device</title><link rel='stylesheet' type='text/css' href='style.css'></head><body><h1>Connect me to your WiFi!</h1><h3>My device ID:</h3><input type=text id='device-id' size='25' value='' disabled/><button type='button' class='input-helper' id='copy-button'>Copy</button><div id='scan-div'><h3>Scan for visible WiFi networks</h3><button id='scan-button' type='button'>Scan</button></div><div id='networks-div'></div><div id='connect-div' style='display: none'><p>Don't see your network? Move me closer to your router, then re-scan.</p><form id='connect-form'><input type='password' id='password' size='25' placeholder='password'/><button type='button' class='input-helper' id='show-button'>Show</button><button type='submit' id='connect-button'>Connect</button></form></div><script src='rsa-utils/jsbn_1.js'></script><script src='rsa-utils/jsbn_2.js'></script><script src='rsa-utils/prng4.js'></script><script src='rsa-utils/rng.js'></script><script src='rsa-utils/rsa.js'></script><script src='script.js'></script></body></html>";

const char rsa_js[] = "function parseBigInt(a,b){return new BigInteger(a,b);}function linebrk(a,b){var c='';var d=0;while(d+b<a.length){c+=a.substring(d,d+b)+'\\n';d+=b;}return c+a.substring(d,a.length);}function byte2Hex(a){if(a<0x10)return '0'+a.toString(16);else return a.toString(16);}function pkcs1pad2(a,b){if(b<a.length+11){alert('Message too long for RSA');return null;}var c=new Array();var d=a.length-1;while(d>=0&&b>0){var e=a.charCodeAt(d--);if(e<128)c[--b]=e;else if((e>127)&&(e<2048)){c[--b]=(e&63)|128;c[--b]=(e>>6)|192;}else{c[--b]=(e&63)|128;c[--b]=((e>>6)&63)|128;c[--b]=(e>>12)|224;}}c[--b]=0;var f=new SecureRandom();var g=new Array();while(b>2){g[0]=0;while(g[0]==0)f.nextBytes(g);c[--b]=g[0];}c[--b]=2;c[--b]=0;return new BigInteger(c);}function RSAKey(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null;}function RSASetPublic(a,b){if(a!=null&&b!=null&&a.length>0&&b.length>0){this.n=parseBigInt(a,16);this.e=parseInt(b,16);}else alert('Invalid RSA public key');}function RSADoPublic(a){return a.modPowInt(this.e,this.n);}function RSAEncrypt(a){var b=pkcs1pad2(a,(this.n.bitLength()+7)>>3);if(b==null)return null;var c=this.doPublic(b);if(c==null)return null;var d=c.toString(16);if((d.length&1)==0)return d;else return '0'+d;}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;";

const char style_css[] = "html{height:100%;margin:auto;background-color:white}body{box-sizing:border-box;min-height:100%;padding:20px;background-color:#1aabe0;font-family:'Lucida Sans Unicode','Lucida Grande',sans-serif;font-weight:normal;color:white;margin-top:0;margin-left:auto;margin-right:auto;margin-bottom:0;max-width:400px;text-align:center;border:1px solid #6e6e70;border-radius:4px}div{margin-top:25px;margin-bottom:25px}h1{margin-top:25px;margin-bottom:25px}button{border-color:#1c75be;background-color:#1c75be;color:white;border-radius:5px;height:30px;font-size:15px;font-weight:bold}button.input-helper{background-color:#bebebe;border-color:#bebebe;color:#6e6e70;margin-left:3px}button:disabled{background-color:#bebebe;border-color:#bebebe;color:white}input[type='text'],input[type='password']{background-color:white;color:#6e6e70;border-color:white;border-radius:5px;height:25px;text-align:center;font-size:15px}input:disabled{background-color:#bebebe;border-color:#bebebe}input[type='radio']{position:relative;bottom:-0.33em;margin:0;border:0;height:1.5em;width:15%}label{padding-top:7px;padding-bottom:7px;padding-left:5%;display:inline-block;width:80%;text-align:left}input[type='radio']:checked+label{font-weight:bold;color:#1c75be}.scanning-error{font-weight:bold;text-align:center}.radio-div{box-sizing:border-box;margin:2px;margin-left:auto;margin-right:auto;background-color:white;color:#6e6e70;border:1px solid #6e6e70;border-radius:3px;width:100%;padding:5px}#networks-div{margin-left:auto;margin-right:auto;text-align:left}#device-id{text-align:center}#scan-button{min-width:100px}#connect-button{display:block;min-width:100px;margin-top:10px;margin-left:auto;margin-right:auto;margin-bottom:20px}#password{margin-top:20px;margin-bottom:10px}";

const char rng_js[] = "var rng_state;var rng_pool;var rng_pptr;function rng_seed_int(a){rng_pool[rng_pptr++]^=a&255;rng_pool[rng_pptr++]^=(a>>8)&255;rng_pool[rng_pptr++]^=(a>>16)&255;rng_pool[rng_pptr++]^=(a>>24)&255;if(rng_pptr>=rng_psize)rng_pptr-=rng_psize;}function rng_seed_time(){rng_seed_int(new Date().getTime());}if(rng_pool==null){rng_pool=new Array();rng_pptr=0;var t;if(window.crypto&&window.crypto.getRandomValues){var ua=new Uint8Array(32);window.crypto.getRandomValues(ua);for(t=0;t<32;++t)rng_pool[rng_pptr++]=ua[t];}if(navigator.appName=='Netscape'&&navigator.appVersion<'5'&&window.crypto){var z=window.crypto.random(32);for(t=0;t<z.length;++t)rng_pool[rng_pptr++]=z.charCodeAt(t)&255;}while(rng_pptr<rng_psize){t=Math.floor(65536*Math.random());rng_pool[rng_pptr++]=t>>>8;rng_pool[rng_pptr++]=t&255;}rng_pptr=0;rng_seed_time();}function rng_get_byte(){if(rng_state==null){rng_seed_time();rng_state=prng_newstate();rng_state.init(rng_pool);for(rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr)rng_pool[rng_pptr]=0;rng_pptr=0;}return rng_state.next();}function rng_get_bytes(a){var b;for(b=0;b<a.length;++b)a[b]=rng_get_byte();}function SecureRandom(){}SecureRandom.prototype.nextBytes=rng_get_bytes;";

const char jsbn_2_js[] = "function bnpRShiftTo(a,b){b.s=this.s;var c=Math.floor(a/this.DB);if(c>=this.t){b.t=0;return;}var d=a%this.DB;var e=this.DB-d;var f=(1<<d)-1;b[0]=this[c]>>d;for(var g=c+1;g<this.t;++g){b[g-c-1]|=(this[g]&f)<<e;b[g-c]=this[g]>>d;}if(d>0)b[this.t-c-1]|=(this.s&f)<<e;b.t=this.t-c;b.clamp();}function bnpSubTo(a,b){var c=0,d=0,e=Math.min(a.t,this.t);while(c<e){d+=this[c]-a[c];b[c++]=d&this.DM;d>>=this.DB;}if(a.t<this.t){d-=a.s;while(c<this.t){d+=this[c];b[c++]=d&this.DM;d>>=this.DB;}d+=this.s;}else{d+=this.s;while(c<a.t){d-=a[c];b[c++]=d&this.DM;d>>=this.DB;}d-=a.s;}b.s=(d<0)?-1:0;if(d<-1)b[c++]=this.DV+d;else if(d>0)b[c++]=d;b.t=c;b.clamp();}function bnpMultiplyTo(a,b){var c=this.abs(),d=a.abs();var e=c.t;b.t=e+d.t;while(--e>=0)b[e]=0;for(e=0;e<d.t;++e)b[e+c.t]=c.am(0,d[e],b,e,0,c.t);b.s=0;b.clamp();if(this.s!=a.s)BigInteger.ZERO.subTo(b,b);}function bnpSquareTo(a){var b=this.abs();var c=a.t=2*b.t;while(--c>=0)a[c]=0;for(c=0;c<b.t-1;++c){var d=b.am(c,b[c],a,2*c,0,1);if((a[c+b.t]+=b.am(c+1,2*b[c],a,2*c+1,d,b.t-c-1))>=b.DV){a[c+b.t]-=b.DV;a[c+b.t+1]=1;}}if(a.t>0)a[a.t-1]+=b.am(c,b[c],a,2*c,0,1);a.s=0;a.clamp();}function bnpDivRemTo(a,b,c){var d=a.abs();if(d.t<=0)return;var e=this.abs();if(e.t<d.t){if(b!=null)b.fromInt(0);if(c!=null)this.copyTo(c);return;}if(c==null)c=nbi();var f=nbi(),g=this.s,h=a.s;var i=this.DB-nbits(d[d.t-1]);if(i>0){d.lShiftTo(i,f);e.lShiftTo(i,c);}else{d.copyTo(f);e.copyTo(c);}var j=f.t;var k=f[j-1];if(k==0)return;var l=k*(1<<this.F1)+((j>1)?f[j-2]>>this.F2:0);var m=this.FV/l,n=(1<<this.F1)/l,o=1<<this.F2;var p=c.t,q=p-j,r=(b==null)?nbi():b;f.dlShiftTo(q,r);if(c.compareTo(r)>=0){c[c.t++]=1;c.subTo(r,c);}BigInteger.ONE.dlShiftTo(j,r);r.subTo(f,f);while(f.t<j)f[f.t++]=0;while(--q>=0){var s=(c[--p]==k)?this.DM:Math.floor(c[p]*m+(c[p-1]+o)*n);if((c[p]+=f.am(0,s,c,q,0,j))<s){f.dlShiftTo(q,r);c.subTo(r,c);while(c[p]<--s)c.subTo(r,c);}}if(b!=null){c.drShiftTo(j,b);if(g!=h)BigInteger.ZERO.subTo(b,b);}c.t=j;c.clamp();if(i>0)c.rShiftTo(i,c);if(g<0)BigInteger.ZERO.subTo(c,c);}function bnMod(a){var b=nbi();this.abs().divRemTo(a,null,b);if(this.s<0&&b.compareTo(BigInteger.ZERO)>0)a.subTo(b,b);return b;}function Classic(a){this.m=a;}function cConvert(a){if(a.s<0||a.compareTo(this.m)>=0)return a.mod(this.m);else return a;}function cRevert(a){return a;}function cReduce(a){a.divRemTo(this.m,null,a);}function cMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c);}function cSqrTo(a,b){a.squareTo(b);this.reduce(b);}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;function bnpInvDigit(){if(this.t<1)return 0;var a=this[0];if((a&1)==0)return 0;var b=a&3;b=(b*(2-(a&0xf)*b))&0xf;b=(b*(2-(a&0xff)*b))&0xff;b=(b*(2-(((a&0xffff)*b)&0xffff)))&0xffff;b=(b*(2-a*b%this.DV))%this.DV;return(b>0)?this.DV-b:-b;}function Montgomery(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&0x7fff;this.mph=this.mp>>15;this.um=(1<<(a.DB-15))-1;this.mt2=2*a.t;}function montConvert(a){var b=nbi();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);if(a.s<0&&b.compareTo(BigInteger.ZERO)>0)this.m.subTo(b,b);return b;}function montRevert(a){var b=nbi();a.copyTo(b);this.reduce(b);return b;}function montReduce(a){while(a.t<=this.mt2)a[a.t++]=0;for(var b=0;b<this.m.t;++b){var c=a[b]&0x7fff;var d=(c*this.mpl+(((c*this.mph+(a[b]>>15)*this.mpl)&this.um)<<15))&a.DM;c=b+this.m.t;a[c]+=this.m.am(0,d,a,b,0,this.m.t);while(a[c]>=a.DV){a[c]-=a.DV;a[++c]++;}}a.clamp();a.drShiftTo(this.m.t,a);if(a.compareTo(this.m)>=0)a.subTo(this.m,a);}function montSqrTo(a,b){a.squareTo(b);this.reduce(b);}function montMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c);}Montgomery.prototype.convert=montConvert;Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return((this.t>0)?(this[0]&1):this.s)==0;}function bnpExp(a,b){if(a>0xffffffff||a<1)return BigInteger.ONE;var c=nbi(),d=nbi(),e=b.convert(this),f=nbits(a)-1;e.copyTo(c);while(--f>=0){b.sqrTo(c,d);if((a&(1<<f))>0)b.mulTo(d,e,c);else{var g=c;c=d;d=g;}}return b.revert(c);}function bnModPowInt(a,b){var c;if(a<256||b.isEven())c=new Classic(b);else c=new Montgomery(b);return this.exp(a,c);}BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);";

const char jsbn_1_js[] = "var dbits;var canary=0xdeadbeefcafe;var j_lm=((canary&0xffffff)==0xefcafe);function BigInteger(a,b,c){if(a!=null)if('number'==typeof a)this.fromNumber(a,b,c);else if(b==null&&'string'!=typeof a)this.fromString(a,256);else this.fromString(a,b);}function nbi(){return new BigInteger(null);}function am1(a,b,c,d,e,f){while(--f>=0){var g=b*this[a++]+c[d]+e;e=Math.floor(g/0x4000000);c[d++]=g&0x3ffffff;}return e;}function am2(a,b,c,d,e,f){var g=b&0x7fff,h=b>>15;while(--f>=0){var i=this[a]&0x7fff;var j=this[a++]>>15;var k=h*i+j*g;i=g*i+((k&0x7fff)<<15)+c[d]+(e&0x3fffffff);e=(i>>>30)+(k>>>15)+h*j+(e>>>30);c[d++]=i&0x3fffffff;}return e;}function am3(a,b,c,d,e,f){var g=b&0x3fff,h=b>>14;while(--f>=0){var i=this[a]&0x3fff;var j=this[a++]>>14;var k=h*i+j*g;i=g*i+((k&0x3fff)<<14)+c[d]+e;e=(i>>28)+(k>>14)+h*j;c[d++]=i&0xfffffff;}return e;}if(j_lm&&(navigator.appName=='Microsoft Internet Explorer')){BigInteger.prototype.am=am2;dbits=30;}else if(j_lm&&(navigator.appName!='Netscape')){BigInteger.prototype.am=am1;dbits=26;}else{BigInteger.prototype.am=am3;dbits=28;}BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=((1<<dbits)-1);BigInteger.prototype.DV=(1<<dbits);var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM='0123456789abcdefghijklmnopqrstuvwxyz';var BI_RC=new Array();var rr,vv;rr='0'.charCodeAt(0);for(vv=0;vv<=9;++vv)BI_RC[rr++]=vv;rr='a'.charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;rr='A'.charCodeAt(0);for(vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(a){return BI_RM.charAt(a);}function intAt(a,b){var c=BI_RC[a.charCodeAt(b)];return(c==null)?-1:c;}function bnpCopyTo(a){for(var b=this.t-1;b>=0;--b)a[b]=this[b];a.t=this.t;a.s=this.s;}function bnpFromInt(a){this.t=1;this.s=(a<0)?-1:0;if(a>0)this[0]=a;else if(a<-1)this[0]=a+this.DV;else this.t=0;}function nbv(a){var b=nbi();b.fromInt(a);return b;}function bnpFromString(a,b){var c;if(b==16)c=4;else if(b==8)c=3;else if(b==256)c=8;else if(b==2)c=1;else if(b==32)c=5;else if(b==4)c=2;else{this.fromRadix(a,b);return;}this.t=0;this.s=0;var d=a.length,e=false,f=0;while(--d>=0){var g=(c==8)?a[d]&0xff:intAt(a,d);if(g<0){if(a.charAt(d)=='-')e=true;continue;}e=false;if(f==0)this[this.t++]=g;else if(f+c>this.DB){this[this.t-1]|=(g&((1<<(this.DB-f))-1))<<f;this[this.t++]=(g>>(this.DB-f));}else this[this.t-1]|=g<<f;f+=c;if(f>=this.DB)f-=this.DB;}if(c==8&&(a[0]&0x80)!=0){this.s=-1;if(f>0)this[this.t-1]|=((1<<(this.DB-f))-1)<<f;}this.clamp();if(e)BigInteger.ZERO.subTo(this,this);}function bnpClamp(){var a=this.s&this.DM;while(this.t>0&&this[this.t-1]==a)--this.t;}function bnToString(a){if(this.s<0)return '-'+this.negate().toString(a);var b;if(a==16)b=4;else if(a==8)b=3;else if(a==2)b=1;else if(a==32)b=5;else if(a==4)b=2;else return this.toRadix(a);var c=(1<<b)-1,d,e=false,f='',g=this.t;var h=this.DB-(g*this.DB)%b;if(g-->0){if(h<this.DB&&(d=this[g]>>h)>0){e=true;f=int2char(d);}while(g>=0){if(h<b){d=(this[g]&((1<<h)-1))<<(b-h);d|=this[--g]>>(h+=this.DB-b);}else{d=(this[g]>>(h-=b))&c;if(h<=0){h+=this.DB;--g;}}if(d>0)e=true;if(e)f+=int2char(d);}}return e?f:'0';}function bnNegate(){var a=nbi();BigInteger.ZERO.subTo(this,a);return a;}function bnAbs(){return(this.s<0)?this.negate():this;}function bnCompareTo(a){var b=this.s-a.s;if(b!=0)return b;var c=this.t;b=c-a.t;if(b!=0)return(this.s<0)?-b:b;while(--c>=0)if((b=this[c]-a[c])!=0)return b;return 0;}function nbits(a){var b=1,c;if((c=a>>>16)!=0){a=c;b+=16;}if((c=a>>8)!=0){a=c;b+=8;}if((c=a>>4)!=0){a=c;b+=4;}if((c=a>>2)!=0){a=c;b+=2;}if((c=a>>1)!=0){a=c;b+=1;}return b;}function bnBitLength(){if(this.t<=0)return 0;return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));}function bnpDLShiftTo(a,b){var c;for(c=this.t-1;c>=0;--c)b[c+a]=this[c];for(c=a-1;c>=0;--c)b[c]=0;b.t=this.t+a;b.s=this.s;}function bnpDRShiftTo(a,b){for(var c=a;c<this.t;++c)b[c-a]=this[c];b.t=Math.max(this.t-a,0);b.s=this.s;}function bnpLShiftTo(a,b){var c=a%this.DB;var d=this.DB-c;var e=(1<<d)-1;var f=Math.floor(a/this.DB),g=(this.s<<c)&this.DM,h;for(h=this.t-1;h>=0;--h){b[h+f+1]=(this[h]>>d)|g;g=(this[h]&e)<<c;}for(h=f-1;h>=0;--h)b[h]=0;b[f]=g;b.t=this.t+f+1;b.s=this.s;b.clamp();}";

const char script_js[] = "var base_url='http://192.168.0.1/';var network_list;var public_key;var rsa=new RSAKey();var scanButton=document.getElementById('scan-button');var connectButton=document.getElementById('connect-button');var copyButton=document.getElementById('copy-button');var showButton=document.getElementById('show-button');var deviceID=document.getElementById('device-id');var connectForm=document.getElementById('connect-form');var public_key_callback={success:function(a){console.log('Public key: '+a.b);public_key=a.b;rsa.setPublic(public_key.substring(58,58+256),public_key.substring(318,318+6));},error:function(a,b){console.log(a);window.alert('There was a problem fetching important information from your device. Please verify your connection, then reload this page.');}};var device_id_callback={success:function(a){var b=a.id;deviceID.value=b;},error:function(a,b){console.log(a);var c='COMMUNICATION_ERROR';deviceID.value=c;}};var scan=function(){console.log('Scanning...!');disableButtons();scanButton.innerHTML='Scanning...';connectButton.innerHTML='Connect';document.getElementById('connect-div').style.display='none';document.getElementById('networks-div').style.display='none';getRequest(base_url+'scan-ap',scan_callback);};var scan_callback={success:function(a){network_list=a.scans;console.log('I found:');var b=document.getElementById('networks-div');b.innerHTML='';if(network_list.length>0)for(var c=0;c<network_list.length;c++){ssid=network_list[c].ssid;console.log(network_list[c]);add_wifi_option(b,ssid);document.getElementById('connect-div').style.display='block';}else b.innerHTML='<p class=\\'scanning-error\\'>No networks found.</p>';},error:function(a){console.log('Scanning error:'+a);document.getElementById('networks-div').innerHTML='<p class=\\'scanning-error\\'>Scanning error.</p>';},regardless:function(){scanButton.innerHTML='Re-Scan';enableButtons();document.getElementById('networks-div').style.display='block';}};var configure=function(a){a.preventDefault();var b=get_selected_network();var c=document.getElementById('password').value;if(!b){window.alert('Please select a network!');return false;}var d={idx:0,ssid:b.ssid,pwd:rsa.encrypt(c),sec:b.sec,ch:b.ch};connectButton.innerHTML='Sending credentials...';disableButtons();console.log('Sending credentials: '+JSON.stringify(d));postRequest(base_url+'configure-ap',d,configure_callback);};var configure_callback={success:function(a){console.log('Credentials received.');connectButton.innerHTML='Credentials received...';postRequest(base_url+'connect-ap',{idx:0},connect_callback);},error:function(a,b){console.log('Configure error: '+a);window.alert('The configuration command failed, check that you are still well connected to the device\\'s WiFi hotspot and retry.');connectButton.innerHTML='Retry';enableButtons();}};var connect_callback={success:function(a){console.log('Attempting to connect to the cloud.');connectButton.innerHTML='Attempting to connect...';window.alert('Your device should now start flashing green and attempt to connect to the cloud. This usually takes about 20 seconds, after which it will begin slowly blinking cyan. \\n\\n\\nIf this process fails because you entered the wrong password, the device will flash green indefinitely. In this case, hold the setup button for 6 seconds until the device starts blinking blue again. Then reconnect to the WiFi hotspot it generates and reload this page to try again.');},error:function(a,b){console.log('Connect error: '+a);window.alert('The connect command failed, check that you are still well connected to the device\\'s WiFi hotspot and retry.');connectButton.innerHTML='Retry';enableButtons();}};var disableButtons=function(){connectButton.disabled=true;scanButton.disabled=true;};var enableButtons=function(){connectButton.disabled=false;scanButton.disabled=false;};var add_wifi_option=function(a,b){var c=document.createElement('INPUT');c.type='radio';c.value=b;c.id=b;c.name='ssid';c.className='radio';var d=document.createElement('DIV');d.className='radio-div';d.appendChild(c);var e=document.createElement('label');e.htmlFor=b;e.innerHTML=b;d.appendChild(e);a.appendChild(d);};var get_selected_network=function(){for(var a=0;a<network_list.length;a++){ssid=network_list[a].ssid;if(document.getElementById(ssid).checked)return network_list[a];}};var copy=function(){window.prompt('Copy to clipboard: Ctrl + C, Enter',deviceID.value);};var toggleShow=function(){var a=document.getElementById('password');inputType=a.type;if(inputType==='password'){showButton.innerHTML='Hide';a.type='text';}else{showButton.innerHTML='Show';a.type='password';}};var getRequest=function(a,b){var c=new XMLHttpRequest();c.open('GET',a,true);c.timeout=8000;c.send();c.onreadystatechange=function(){if(c.readyState==4)if(b){if(c.status==200){if(b.success)b.success(JSON.parse(c.responseText));}else if(b.error)b.error(c.status,c.responseText);if(b.regardless)b.regardless();}};};var postRequest=function(a,b,c){var d=JSON.stringify(b);var e=new XMLHttpRequest();e.open('POST',a,true);e.timeout=4000;e.setRequestHeader('Content-Type','multipart/form-data');e.send(d);e.onreadystatechange=function(){if(e.readyState==4)if(c){if(e.status==200){if(c.success)c.success(JSON.parse(e.responseText));}else if(c.error)c.error(e.status,e.responseText);if(c.regardless)c.regardless();}};};if(scanButton.addEventListener){copyButton.addEventListener('click',copy);showButton.addEventListener('click',toggleShow);scanButton.addEventListener('click',scan);connectForm.addEventListener('submit',configure);}else if(scanButton.attachEvent){copyButton.attachEvent('onclick',copy);showButton.attachEvent('onclick',toggleShow);scanButton.attachEvent('onclick',scan);connectForm.attachEvent('onsubmit',configure);}getRequest(base_url+'device-id',device_id_callback);getRequest(base_url+'public-key',public_key_callback);";

const char prng4_js[] = "function Arcfour(){this.i=0;this.j=0;this.S=new Array();}function ARC4init(a){var b,c,d;for(b=0;b<256;++b)this.S[b]=b;c=0;for(b=0;b<256;++b){c=(c+this.S[b]+a[b%a.length])&255;d=this.S[b];this.S[b]=this.S[c];this.S[c]=d;}this.i=0;this.j=0;}function ARC4next(){var a;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;a=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=a;return this.S[(a+this.S[this.i])&255];}Arcfour.prototype.init=ARC4init;Arcfour.prototype.next=ARC4next;function prng_newstate(){return new Arcfour();}var rng_psize=256;";

Page myPages[] = {
     { "/index.html", "text/html", index_html },
     { "/rsa-utils/rsa.js", "application/javascript", rsa_js },
     { "/style.css", "text/css", style_css },
     { "/rsa-utils/rng.js", "application/javascript", rng_js },
     { "/rsa-utils/jsbn_2.js", "application/javascript", jsbn_2_js },
     { "/rsa-utils/jsbn_1.js", "application/javascript", jsbn_1_js },
     { "/script.js", "application/javascript", script_js },
     { "/rsa-utils/prng4.js", "application/javascript", prng4_js },
     { nullptr }
};

void myPage(const char* url, ResponseCallback* cb, void* cbArg, Reader* body, Writer* result, void* reserved)
{
    Serial.printlnf("handling page %s", url);

    if (strcmp(url,"/index")==0) {
        Serial.println("sending redirect");
        Header h("Location: /index.html\r\n");
        cb(cbArg, 0, 301, "text/plain", &h);
        return;
    }

    int8_t idx = 0;
    for (;;idx++) {
        Page& p = myPages[idx];
        if (!p.url) {
            idx = -1;
            break;
        }
        else if (strcmp(url, p.url)==0) {
            break;
        }
    }

    if (idx==-1) {
        cb(cbArg, 0, 404, nullptr, nullptr);
    }
    else {
        cb(cbArg, 0, 200, myPages[idx].mime_type, nullptr);
        result->write(myPages[idx].data);
    }
}

STARTUP(softap_set_application_page_handler(myPage, nullptr));

// Press SETUP for 3 seconds to make the Photon enter Listening mode
// Navigate to http://192.168.0.1 to setup Wi-Fi

// Include the rest of your application below,
// including your setup and loop functions
```

{{/if}} {{!-- has-softap --}}


{{#if has-cellular}}
## Cellular

### on()

`Cellular.on()` turns on the Cellular module. Useful when you've turned it off, and you changed your mind.

Note that `Cellular.on()` does not need to be called unless you have changed the [system mode](#system-modes) or you have previously turned the Cellular module off.  When turning on the Cellular module, it will go through a full re-connect to the Cellular network which will take anywhere from 30 to 60 seconds in most situations.

```cpp
// SYNTAX
Cellular.on();
```

### off()

`Cellular.off()` turns off the Cellular module. Useful for saving power, since most of the power draw of the device is the Cellular module.  Note: turning off the Cellular module will force it to go through a full re-connect to the Cellular network the next time it is turned on.

```cpp
// SYNTAX
Cellular.off();
```

### connect()

Attempts to connect to the Cellular network. If there are no credentials entered, the default Particle APN for Particle SIM cards will be used.  If no SIM card is inserted, the {{device}} will enter listening mode. If a 3rd party APN is set, these credentials must match the inserted SIM card for the {{device}} to connect to the cellular network. When this function returns, the device may not have a local (private) IP address; use `Cellular.ready()` to determine the connection status.

```cpp
// SYNTAX
Cellular.connect();
```

{{#if has-mesh}}
**Note:** Due to an open [issue](https://github.com/particle-iot/device-os/issues/1631) the automatic activation of the {{network-type}} connection is currently not working as expected. If the {{network-type}} module is not already powered up, your code needs to explicitly call {{#if has-wifi}}[`WiFi.on()`](#on--2){{/if}}{{#if has-cellular}}[`Cellular.on()`](#on--2){{/if}} before calling {{#if has-wifi}}[`WiFi.connect()`](#connect--2){{/if}}{{#if has-cellular}}[`Cellular.connect()`](#on-){{/if}}.
{{/if}}

### disconnect()

Disconnects from the Cellular network, but leaves the Cellular module on.

```cpp
// SYNTAX
Cellular.disconnect();
```

### connecting()

This function will return `true` once the device is attempting to connect using the default Particle APN or 3rd party APN cellular credentials, and will return `false` once the device has successfully connected to the cellular network.

```cpp
// SYNTAX
Cellular.connecting();
```

### ready()

This function will return `true` once the device is connected to the cellular network and has been assigned an IP address, which means it has an activated PDP context and is ready to open TCP/UDP sockets. Otherwise it will return `false`.

```cpp
// SYNTAX
Cellular.ready();
```

### listen()

This will enter or exit listening mode, which opens a Serial connection to get Cellular information such as the IMEI or CCID over USB.

```cpp
// SYNTAX - enter listening mode
Cellular.listen();
```

Listening mode blocks application code. Advanced cases that use multithreading, interrupts, or system events
have the ability to continue to execute application code while in listening mode, and may wish to then exit listening
mode, such as after a timeout. Listening mode is stopped using this syntax:

```cpp

// SYNTAX - exit listening mode
Cellular.listen(false);

```

### listening()

```cpp
// SYNTAX
Cellular.listening();
```

Without multithreading enabled, this command is not useful (always returning `false`) because listening mode blocks application code.

This command becomes useful on the {{device}} when system code runs as a separate RTOS task from application code.

Once system code does not block application code,
`Cellular.listening()` will return `true` once `Cellular.listen()` has been called
or the setup button has been held for 3 seconds, when the RGB LED should be blinking blue.
It will return `false` when the device is not in listening mode.


### setListenTimeout()

{{since when="0.6.1"}}

```cpp
// SYNTAX
Cellular.setListenTimeout(seconds);
```

`Cellular.setListenTimeout(seconds)` is used to set a timeout value for Listening Mode.  Values are specified in `seconds`, and 0 disables the timeout.  By default, Cellular devices have a 5 minute timeout set (seconds=300).  As long as interrupts are enabled, a timer is started and running while the device is in listening mode (Cellular.listening()==true).  After the timer expires, listening mode will be exited automatically.  If Cellular.setListenTimeout() is called while the timer is currently in progress, the timer will be updated and restarted with the new value (e.g. updating from 10 seconds to 30 seconds, or 10 seconds to 0 seconds (disabled)).  **Note:** Enabling multi-threaded mode with SYSTEM_THREAD(ENABLED) will allow user code to update the timeout value while Listening Mode is active.

This setting is not persistent in memory if the {{device}} is rebooted.

```cpp
// EXAMPLE
// If desired, use the STARTUP() macro to set the timeout value at boot time.
STARTUP(Cellular.setListenTimeout(60)); // set listening mode timeout to 60 seconds

void setup() {
  // your setup code
}

void loop() {
  // update the timeout later in code based on an expression
  if (disableTimeout) Cellular.setListenTimeout(0); // disables the listening mode timeout
}
```


### getListenTimeout()

{{since when="0.6.1"}}

```cpp
// SYNTAX
uint16_t seconds = Cellular.getListenTimeout();
```

`Cellular.getListenTimeout()` is used to get the timeout value currently set for Listening Mode.  Values are returned in (uint16_t)`seconds`, and 0 indicates the timeout is disabled.  By default, Cellular devices have a 5 minute timeout set (seconds=300).

```cpp
// EXAMPLE
void setup() {
  Serial.begin();
  Serial.println(Cellular.getListenTimeout());
}
```

{{#if has-set-credentials}}

### setCredentials()

Sets 3rd party SIM credentials for the Cellular network from within the user application. 

These credentials added to the device's non-volatile memory and only need to be set once. The setting will be preserved across reset, power down, and firmware upgrades. 
This is different than the Electron and E series where you must call `cellular_credentials_set()` from all user firmware.

You may set credentials in 3 different ways:

- APN only
- USERNAME & PASSWORD only
- APN, USERNAME & PASSWORD

The following example can be copied to a file called `setcreds.ino` and compiled and flashed to your {{device}} over USB via the [Particle CLI](/tutorials/developer-tools/cli).  With your {{device}} in [DFU mode](/tutorials/device-os/led/electron#dfu-mode-device-firmware-upgrade-), the command for this is:

`particle compile electron setcreds.ino --saveTo firmware.bin && particle flash --usb firmware.bin`


```cpp
SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	// Clears any existing credentials. Use this to restore the use of the Particle SIM.
	Cellular.clearCredentials();

	// You should only use one of the following three commands.
	// Only one set of credentials can be stored.

	// Connects to a cellular network by APN only
	Cellular.setCredentials("broadband");

	// Connects to a cellular network with USERNAME and PASSWORD only
	Cellular.setCredentials("username", "password");

	// Connects to a cellular network with a specified APN, USERNAME and PASSWORD
	Cellular.setCredentials("some-apn", "username", "password");
	
	Particle.connect();
}

void loop() {
}

```

**Note**: Your {{device}} only uses one set of credentials, and they
must be correctly matched to the SIM card that's used.  If using a
Particle SIM, using `Cellular.setCredentials()` is not necessary as the
default APN will be used. If you have set a different APN to use a 3rd-party
SIM card, you can restore the use of the Particle SIM by using
`Cellular.clearCredentials()`. 

{{/if}} {{!-- has-nrfhas-set-credentials52 --}}


{{#unless has-set-credentials}} {{!-- Electron and E series that don't save credentials in non-volatile memory --}}

### setCredentials()

**Note**: `Cellular.setCredentials()` is not currently enabled, however read on to find out how to use the cellular_hal to do the same thing with `cellular_credentials_set()`.

Sets 3rd party credentials for the Cellular network from within the user application. These credentials are currently not added to the device's non-volatile memory and need to be set every time from the user application.  You may set credentials in 3 different ways:

- APN only
- USERNAME & PASSWORD only
- APN, USERNAME & PASSWORD

**Note**: When using the default `SYSTEM_MODE(AUTOMATIC)` connection behavior, it is necessary to call `cellular_credentials_set()` with the `STARTUP()` macro outside of `setup()` and `loop()` so that the system will have the correct credentials before it tries to connect to the cellular network (see EXAMPLE).

The following examples can be copied to a file called `setcreds.ino` and compiled and flashed to your {{device}} over USB via the [Particle CLI](/tutorials/developer-tools/cli).  With your {{device}} in [DFU mode](/tutorials/device-os/led/electron#dfu-mode-device-firmware-upgrade-), the command for this is:

`particle compile electron setcreds.ino --saveTo firmware.bin && particle flash --usb firmware.bin`

**Note**: Your {{device}} only uses one set of credentials, and they
must be correctly matched to the SIM card that's used.  If using a
Particle SIM, using `cellular_credentials_set()` is not necessary as the
default APN of "spark.telefonica.com" with no username or password will
be used by Device OS. To switch back to using a Particle SIM after successfully connecting with a 3rd Party SIM, just flash any app that does not include cellular_credentials_set().  Then ensure you completely power cycle the {{device}} to remove the settings from the modem’s volatile memory.

```C++
// SYNTAX
// Connects to a cellular network by APN only
STARTUP(cellular_credentials_set(APN, "", "", NULL));

// Connects to a cellular network with USERNAME and PASSWORD only
STARTUP(cellular_credentials_set("", USERNAME, PASSWORD, NULL));

// Connects to a cellular network with a specified APN, USERNAME and PASSWORD
#include “cellular_hal.h”
STARTUP(cellular_credentials_set(APN, USERNAME, PASSWORD, NULL));
```

```C++
// EXAMPLE - an AT&T APN with no username or password in AUTOMATIC mode

#include "cellular_hal.h"
STARTUP(cellular_credentials_set("broadband", "", "", NULL));

void setup() {
  // your setup code
}

void loop() {
  // your loop code
}
```
{{/unless}} {{!-- has-set-credentials --}}


{{#if has-set-active-sim}}

### setActiveSim()

The {{device}} can use either the built-in MFF2 embedded Particle SIM card or an external nano SIM card in 
the SIM card connector. The active SIM card setting is stored in non-volatile memory and only needs to be set 
once. The setting will be preserved across reset, power down, and firmware upgrades.


```cpp
SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	// Choose one of these:
	Cellular.setActiveSim(EXTERNAL_SIM);
	Cellular.setActiveSim(INTERNAL_SIM);
}

void loop() {
}
```

### getActiveSim()

Get the current active SIM (internal or external):

- INTERNAL_SIM = 1
- EXTERNAL_SIM = 2

```cpp
void setup() {
	Serial.begin();
}

void loop() {
	SimType simType = Cellular.getActiveSim();
	Serial.printlnf("simType=%d", simType);
	delay(5000);
}
```

{{/if}} {{!-- has-set-active-sim --}}

### getDataUsage()

A software implementation of Data Usage that pulls sent and received session and total bytes from the cellular modem's internal counters.  The sent / received bytes are the gross payload evaluated by the protocol stack, therefore they comprise the TCP and IP header bytes and the packets used to open and close the TCP connection.  I.e., these counters account for all overhead in cellular communications.

**Note**: Cellular.getDataUsage() should only be used for relative measurements on data at runtime.  Do not rely upon these figures for absolute and total data usage of your SIM card.

**Note**: There is a known issue with Sara U260/U270 modem firmware not being able to set/reset the internal counters (which does work on the Sara G350).  Because of this limitation, the set/reset function is implemented in software, using the modem's current count as the baseline.

**Note**: The internal modem counters are typically reset when the modem is power cycled (complete power removal, soft power down or Cellular.off()) or if the PDP context is deactivated and reactivated which can happen asynchronously during runtime. If the Cellular.getDataUsage() API has been read, reset or set, and then the modem's counters are reset for any reason, the next call to Cellular.getDataUsage() for a read will detect that the new reading would be less than the previous reading.  When this is detected, the current reading will remain the same, and the now lower modem count will be used as the new baseline.  Because of this mechanism, it is generally more accurate to read the getDataUsage() count often. This catches the instances when the modem count is reset, before the count starts to increase again.

To use the data usage API, an instance of the `CellularData` type needs to be created to read or set counters.  All data usage API functions and the CellularData object itself return `bool` - `true` indicating the last operation was successful and the CellularData object was updated. For set and get functions, `CellularData` is passed by reference `Cellular.dataUsage(CellularData&);` and updated by the function.  There are 5 integers and 1 boolean within the CellularData object:

- **ok**: (bool) a boolean value `false` when the CellularData object is initially created, and `true` after the object has been successfully updated by the API. If the last reading failed and the counters were not changed from their previous value, this value is set to `false`.
- **cid**: (int) a value from 0-255 that is the index of the current PDP context that the data usage counters are valid for.  If this number is -1, the data usage counters have either never been initially set, or the last reading failed and the counters were not changed from their previous value.
- **tx_session**: (int) number of bytes sent for the current session
- **rx_session**: (int) number of bytes sent for the current session
- **tx_total**: (int) number of bytes sent total (typical equals the session numbers)
- **rx_total**: (int) number of bytes sent total (typical equals the session numbers)

CellularData is a Printable object, so using it directly with `Serial.println(data);` will be output as follows:

```
cid,tx_session,rx_session,tx_total,rx_total
31,1000,300,1000,300
```

```c++
// SYNTAX
// Read Data Usage
CellularData data;
Cellular.getDataUsage(data);
```

```c++
// EXAMPLE

void setup()
{
  Serial.begin(9600);
}

void loop()
{
    if (Serial.available() > 0)
    {
        char c = Serial.read();
        if (c == '1') {
            Serial.println("Read counters of sent or received PSD data!");
            CellularData data;
            if (!Cellular.getDataUsage(data)) {
                Serial.print("Error! Not able to get data.");
            }
            else {
                Serial.printlnf("CID: %d SESSION TX: %d RX: %d TOTAL TX: %d RX: %d",
                    data.cid,
                    data.tx_session, data.rx_session,
                    data.tx_total, data.rx_total);
                Serial.println(data); // Printable
            }
        }
        else if (c == '2') {
            Serial.println("Set all sent/received PSD data counters to 1000!");
            CellularData data;
            data.tx_session = 1000;
            data.rx_session = 1000;
            data.tx_total = 1000;
            data.rx_total = 1000;
            if (!Cellular.setDataUsage(data)) {
                Serial.print("Error! Not able to set data.");
            }
            else {
                Serial.printlnf("CID: %d SESSION TX: %d RX: %d TOTAL TX: %d RX: %d",
                    data.cid,
                    data.tx_session, data.rx_session,
                    data.tx_total, data.rx_total);
                Serial.println(data); // Printable
            }
        }
        else if (c == '3') {
            Serial.println("Reset counter of sent/received PSD data!");
            if (!Cellular.resetDataUsage()) {
                Serial.print("Error! Not able to reset data.");
            }
        }
        else if (c == 'p') {
            Serial.println("Publish some data!");
            Particle.publish("1","a");
        }
        while (Serial.available()) Serial.read(); // Flush the input buffer
    }

}
```

### setDataUsage()

Sets the Data Usage counters to the values indicated in the supplied CellularData object.

Returns `bool` - `true` indicating this operation was successful and the CellularData object was updated.

```c++
// SYNTAX
// Set Data Usage
CellularData data;
Cellular.setDataUsage(data);
```

### resetDataUsage()

Resets the Data Usage counters to all zero.  No CellularData object is required.  This is handy to call just before an operation where you'd like to measure data usage.

Returns `bool` - `true` indicating this operation was successful and the internally stored software offset has been reset to zero. If getDataUsage() was called immediately after without any data being used, the CellularData object would indicate zero data used.

```c++
// SYNTAX
// Reset Data Usage
Cellular.resetDataUsage();
```

### RSSI()

`Cellular.RSSI()` returns an instance of [`CellularSignal`](#cellularsignal-class) class that contains two integers: the signal strength (`rssi`) and signal quality (`qual`) of the currently connected Cellular network.

`CellularSignal`
- `rssi`: (`int`) is the signal strength with range -113dBm to -51dBm (in 2dBm steps). This variable also doubles as an error response for the entire struct; positive return values indicate an error with:
    - 1: indicating a Cellular module or time-out error
    - 2: the module responded that the RSSI value is not known, not detectable or currently not available.
- `qual`: (`int`) is a number in UMTS RAT indicating the Energy per Chip/Noise ratio in dB levels of the current cell. This value ranges from 0 to 49, higher numbers indicate higher signal quality.

**Note**: `qual` is not supported on 2G Electrons (Model G350) and will return 0.

_Since 0.8.0_
See additional documentation on [`CellularSignal`](#cellularsignal-class) class.

```C++
// SYNTAX

CellularSignal sig = Cellular.RSSI();
Serial.println(sig.rssi);
Serial.println(sig.qual);
Serial.println(sig); // Complete structure also printable

// Output
-95    // RSSI (-dBm)
19     // QUAL (dB)
-95,19 // RSSI,QUAL

// EXAMPLE
uint32_t lastUpdate;
#define now millis()

void setup()
{
  Serial.begin(9600);
  lastUpdate = now;
}

void loop()
{
  // Print two methods of signal strength and signal quality every 20 seconds
  if (now - lastUpdate > 20000UL) {
    lastUpdate = now;
    CellularSignal sig = Cellular.RSSI();
    String s = String(sig.rssi) + String(",") + String(sig.qual);
    Serial.print(s);
    Serial.print(" is the same as ");
    Serial.println(sig);
  }
}
```

### CellularSignal Class

This class allows to query a number of signal parameters of the currently connected Cellular network.

#### getAccessTechnology()

```cpp
// SYNTAX
CellularSignal sig = Cellular.RSSI();
int rat = sig.getAccessTechnology();
```

Gets the current radio access technology (RAT) in use.

The following radio technologies are defined:
- `NET_ACCESS_TECHNOLOGY_GSM`: 2G RAT
- `NET_ACCESS_TECHNOLOGY_EDGE`: 2G RAT with EDGE
- `NET_ACCESS_TECHNOLOGY_UMTS`/`NET_ACCESS_TECHNOLOGY_UTRAN`/`NET_ACCESS_TECHNOLOGY_WCDMA`: UMTS RAT
- `NET_ACCESS_TECHNOLOGY_LTE`: LTE RAT

#### getStrength()

Gets the signal strength as a percentage (0.0 - 100.0). See [`getStrengthValue()`](#getstrengthvalue-) on how raw RAT-specific strength values are mapped to 0%-100% range.

```cpp
// SYNTAX
CellularSignal sig = Cellular.RSSI();
float strength = sig.getStrength();

// EXAMPLE
CellularSignal sig = Cellular.RSSI();
Log.info("Cellular signal strength: %.02f%%", sig.getStrength());
```

Returns: `float`

#### getQuality()

Gets the signal quality as a percentage (0.0 - 100.0). See [`getQualityValue()`](#getqualityvalue-) on how raw RAT-specific quality values are mapped to 0%-100% range.

```cpp
// SYNTAX
CellularSignal sig = Cellular.RSSI();
float quality = sig.getQuality();

// EXAMPLE
CellularSignal sig = Cellular.RSSI();
Log.info("Cellular signal quality: %.02f%%", sig.getQuality());
```

Returns: `float`

#### getStrengthValue()

```cpp
// SYNTAX
CellularSignal sig = Cellular.RSSI();
float strength = sig.getStrengthValue();
```

Gets the raw signal strength value. This value is RAT-specific. See [`getAccessTechnology()`](#getaccesstechnology-) for a list of radio access technologies.

- 2G RAT / 2G RAT with EDGE: RSSI in dBm. Range: [-111, -48] as specified in 3GPP TS 45.008 8.1.4.
- UMTS RAT: RSCP in dBm. Range: [-121, -25] as specified in 3GPP TS 25.133 9.1.1.3.

Returns: `float`

#### getQualityValue()

```cpp
// SYNTAX
CellularSignal sig = Cellular.RSSI();
float quality = sig.getQualityValue();
```

Gets the raw signal quality value. This value is RAT-specific. See [`getAccessTechnology()`](#getaccesstechnology-) for a list of radio access technologies.

- 2G RAT: Bit Error Rate (BER) in % as specified in 3GPP TS 45.008 8.2.4. Range: [0.14%, 18.10%]
- 2G RAT with EDGE: log10 of Mean Bit Error Probability (BEP) as defined in 3GPP TS 45.008. Range: [-0.60, -3.60] as specified in 3GPP TS 45.008 10.2.3.3.
- UMTS RAT: Ec/Io (dB) [-24.5, 0], as specified in 3GPP TS 25.133 9.1.2.3.

Returns: `float`

### getBandAvailable()

{{since when="0.5.0"}}

Gets the cellular bands currently available in the modem.  `Bands` are the carrier frequencies used to communicate with the cellular network.  Some modems have 2 bands available (U260/U270) and others have 4 bands (G350).

To use the band select API, an instance of the `CellularBand` type needs to be created to read or set bands.  All band select API functions and the CellularBand object itself return `bool` - `true` indicating the last operation was successful and the CellularBand object was updated. For set and get functions, `CellularBand` is passed by reference `Cellular.getBandSelect(CellularBand&);` and updated by the function.  There is 1 array, 1 integer, 1 boolean and 1 helper function within the CellularBand object:

- **ok**: (bool) a boolean value `false` when the CellularBand object is initially created, and `true` after the object has been successfully updated by the API. If the last reading failed and the bands were not changed from their previous value, this value is set to `false`.
- **count**: (int) a value from 0-5 that is the number of currently selected bands retrieved from the modem after getBandAvailble() or getBandSelect() is called successfully.
- **band[5]**: (MDM_Band[]) array of up to 5 MDM_Band enumerated types.  Available enums are: `BAND_DEFAULT, BAND_0, BAND_700, BAND_800, BAND_850, BAND_900, BAND_1500, BAND_1700, BAND_1800, BAND_1900, BAND_2100, BAND_2600`.  All elements set to 0 when CellularBand object is first created, but after getBandSelect() is called successfully the currently selected bands will be populated started with index 0, i.e., (`.band[0]`). Can be 5 values when getBandAvailable() is called on a G350 modem, as it will return factory default value of 0 as an available option, i.e., `0,850,900,1800,1900`.
- **bool isBand(int)**: helper function built into the CellularBand type that can be used to check if an integer is a valid band.  This is helpful if you would like to test a value before manually setting a band in the .band[] array.

CellularBand is a Printable object, so using it directly with `Serial.println(CellularBand);` will print the number of bands that are retrieved from the modem.  This will be output as follows:

```
// EXAMPLE PRINTABLE
CellularBand band_sel;
// populate band object with fake data
band_sel.band[0] = BAND_850;
band_sel.band[1] = BAND_1900;
band_sel.count = 2;
Serial.println(band_sel);

// OUTPUT: band[0],band[1]
850,1900
```

Here's a full example using all of the functions in the <a href="https://gist.github.com/technobly/b0e2f160b9d969d978337c0561999998" target="_blank">Cellular Band Select API</a>

There is one supported function for getting available bands using the CellularBand object:

`bool Cellular.getBandAvailable(CellularBand &band_avail);`

**Note:** getBandAvailable() always sets the first band array element `.band[0]` as 0 which indicates the first option available is to set the bands back to factory defaults, which includes all bands.

```
// SYNTAX
CellularBand band_avail;
Cellular.getBandAvailable(band_avail);
```

```
// EXAMPLE
CellularBand band_avail;
if (Cellular.getBandSelect(band_avail)) {
    Serial.print("Available bands: ");
    for (int x=0; x<band_avail.count; x++) {
        Serial.printf("%d", band_avail.band[x]);
        if (x+1 < band_avail.count) Serial.printf(",");
    }
    Serial.println();
}
else {
    Serial.printlnf("Bands available not retrieved from the modem!");
}
```

### getBandSelect()

{{since when="0.5.0"}}

Gets the cellular bands currently set in the modem.  `Bands` are the carrier frequencies used to communicate with the cellular network.

There is one supported function for getting selected bands using the CellularBand object:

`bool Cellular.getBandSelect(CellularBand &band_sel);`

```
// SYNTAX
CellularBand band_sel;
Cellular.getBandSelect(band_sel);
```

```
// EXAMPLE
CellularBand band_sel;
if (Cellular.getBandSelect(band_sel)) {
    Serial.print("Selected bands: ");
    for (int x=0; x<band_sel.count; x++) {
        Serial.printf("%d", band_sel.band[x]);
        if (x+1 < band_sel.count) Serial.printf(",");
    }
    Serial.println();
}
else {
    Serial.printlnf("Bands selected not retrieved from the modem!");
}
```

### setBandSelect()
{{since when="0.5.0"}}
Sets the cellular bands currently set in the modem.  `Bands` are the carrier frequencies used to communicate with the cellular network.

**Caution:** The Band Select API is an advanced feature designed to give users selective frequency control over their {{device}}. When changing location or between cell towers, you may experience connectivity issues if you have only set one specific frequency for use. Because these settings are permanently saved in non-volatile memory, it is recommended to keep the factory default value of including all frequencies with mobile applications.  Only use the selective frequency control for stationary applications, or for special use cases.

- Make sure to set the `count` to the appropriate number of bands set in the CellularBand object before calling `setBandSelect()`.
- Use the `.isBand(int)` helper function to determine if an integer value is a valid band.  It still may not be valid for the particular modem you are using, in which case `setBandSelect()` will return `false` and `.ok` will also be set to `false`.
- When trying to set bands that are already set, they will not be written to Non-Volatile Memory (NVM) again.
- When updating the bands in the modem, they will be saved to NVM and will be remain as set when the modem power cycles.
- Setting `.band[0]` to `BAND_0` or `BAND_DEFAULT` and `.count` to 1 will restore factory defaults.

There are two supported functions for setting bands, one uses the CellularBand object, and the second allow you to pass in a comma delimited string of bands:

`bool Cellular.setBandSelect(const char* band_set);`

`bool Cellular.setBandSelect(CellularBand &band_set);`

```
// SYNTAX
CellularBand band_set;
Cellular.setBandSelect(band_set);

// or

Cellular.setBandSelect("850,1900"); // set two bands
Cellular.setBandSelect("0"); // factory defaults
```

```
// EXAMPLE
Serial.println("Setting bands to 850 only");
CellularBand band_set;
band_set.band[0] = BAND_850;
band_set.band[1] = BAND_1900;
band_set.count = 2;
if (Cellular.setBandSelect(band_set)) {
    Serial.print(band_set);
    Serial.println(" band(s) set! Value will be saved in NVM when powering off modem.");
}
else {
    Serial.print(band_set);
    Serial.println(" band(s) not valid! Use getBandAvailable() to query for valid bands.");
}
```

```
// EXAMPLE
Serial.println("Restoring factory defaults with the CellularBand object");
CellularBand band_set;
band_set.band[0] = BAND_DEFAULT;
band_set.count = 1;
if (Cellular.setBandSelect(band_set)) {
    Serial.println("Factory defaults set! Value will be saved in NVM when powering off modem.");
}
else {
    Serial.println("Restoring factory defaults failed!");
}
```

```
// EXAMPLE
Serial.println("Restoring factory defaults with strings");
if (Cellular.setBandSelect("0")) {
    Serial.println("Factory defaults set! Value will be saved in NVM when powering off modem.");
}
else {
    Serial.println("Restoring factory defaults failed!");
}
```

### resolve()
{{since when="0.6.1"}}

`Cellular.resolve()` finds the IP address for a domain name.

```cpp
// SYNTAX
IPAddress ip = Cellular.resolve(name);
```

Parameters:

- `name`: the domain name to resolve (string)

It returns the IP address if the domain name is found, otherwise a blank IP address.

```cpp
// EXAMPLE USAGE

IPAddress ip;
void setup() {
   ip = Cellular.resolve("www.google.com");
   if(ip) {
     // IP address was resolved
   } else {
     // name resolution failed
   }
}
```

### localIP()

{{since when="0.5.0"}}

`Cellular.localIP()` returns the local (private) IP address assigned to the device as an `IPAddress`.

```C++
// EXAMPLE
void setup() {
  Serial.begin(9600);

  // Prints out the local (private) IP over Serial
  Serial.println(Cellular.localIP());
}
```

### command()

`Cellular.command()` is a powerful API that allows users access to directly send AT commands to, and parse responses returned from, the Cellular module.  Commands may be sent with and without printf style formatting. The API also includes the ability pass a callback function pointer which is used to parse the response returned from the cellular module.

{{#if boron}}
{{since when="0.9.0"}}
On the Boron, Cellular.command requires Device OS 0.9.0 or later; it is not supported on 0.8.0-rc versions.
{{/if}}

**Note:** Obviously for this command to work the cellular module needs to be switched on, which is not automatically the case in [`SYSTEM_MODE(MANUAL)`](#manual-mode) or [`SYSTEM_MODE(SEMI_AUTOMATIC)`](#semi-automatic-mode). This can be achieved explicitly via [`Cellular.on()`](#on-) or implicitly by calling [`Cellular.connect()`](#connect-) or [`Particle.connect()`](#particle-connect-).

You can download the latest <a href="https://www.u-blox.com/en/product-resources/2432?f[0]=field_file_category%3A210" target="_blank">u-blox AT Commands Manual</a>.

Another good resource is the <a href="https://www.u-blox.com/sites/default/files/AT-CommandsExamples_AppNote_%28UBX-13001820%29.pdf" target="_blank">u-blox AT Command Examples Application Note</a>.

The prototype definition is as follows:

`int Cellular.command(_CALLBACKPTR_MDM cb, void* param, system_tick_t timeout, const char* format, ...);`

`Cellular.command()` takes one or more arguments in 4 basic types of signatures.

```C++
// SYNTAX (4 basic signatures with/without printf style formatting)
int ret = Cellular.command(cb, param, timeout, format, ...);
int ret = Cellular.command(cb, param, timeout, format);
int ret = Cellular.command(cb, param, format, ...);
int ret = Cellular.command(cb, param, format);
int ret = Cellular.command(timeout, format, ...);
int ret = Cellular.command(timeout, format);
int ret = Cellular.command(format, ...)
int ret = Cellular.command(format);
```

- `cb`: callback function pointer to a user specified function that parses the results of the AT command response.
- `param`: (`void*`) a pointer to the variable that will be updated by the callback function.
- `timeout`: (`system_tick_t`) the timeout value specified in milliseconds (default is 10000 milliseconds).
- `format`: (`const char*`) contains your AT command and any desired [format specifiers](http://www.cplusplus.com/reference/cstdio/printf/), followed by `\r\n`.
- `...`: additional arguments optionally required as input to their respective `format` string format specifiers.

`Cellular.command()` returns an `int` with one of the following 6 enumerated AT command responses:

- `NOT_FOUND`    =  0
- `WAIT`         = -1 // TIMEOUT
- `RESP_OK`      = -2
- `RESP_ERROR`   = -3
- `RESP_PROMPT`  = -4
- `RESP_ABORTED` = -5

```C++
// EXAMPLE - Get the ICCID number of the inserted SIM card
int callbackICCID(int type, const char* buf, int len, char* iccid)
{
  if ((type == TYPE_PLUS) && iccid) {
    if (sscanf(buf, "\r\n+CCID: %[^\r]\r\n", iccid) == 1)
      /*nothing*/;
  }
  return WAIT;
}

void setup()
{
  Serial.begin(9600);
  char iccid[32] = "";
  if ((RESP_OK == Cellular.command(callbackICCID, iccid, 10000, "AT+CCID\r\n"))
    && (strcmp(iccid,"") != 0))
  {
    Serial.printlnf("SIM ICCID = %s\r\n", iccid);
  }
  else
  {
    Serial.println("SIM ICCID NOT FOUND!");
  }
}

void loop()
{
  // your loop code
}
```
The `cb` function prototype is defined as:

`int callback(int type, const char* buf, int len, void* param);`

The four Cellular.command() callback arguments are defined as follows:

- `type`: (`int`) one of 13 different enumerated AT command response types.
- `buf`: (`const char*`) a pointer to the character array containing the AT command response.
- `len`: (`int`) length of the AT command response `buf`.
- `param`: (`void*`) a pointer to the variable or structure being updated by the callback function.
- returns an `int` - user specified callback return value, default is `return WAIT;` which keeps the system invoking the callback again as more of the AT command response is received.  Optionally any one of the 6 enumerated AT command responses previously described can be used as a return type which will force the Cellular.command() to return the same value. AT commands typically end with an `OK` response, so even after a response is parsed, it is recommended to wait for the final `OK` response to be parsed and returned by the system. Then after testing `if(Cellular.command() == RESP_OK)` and any other optional qualifiers, should you act upon the results contained in the variable/structure passed into the callback.

There are 13 different enumerated AT command responses passed by the system into the Cellular.command() callback as `type`. These are used to help qualify which type of response has already been parsed by the system.

- `TYPE_UNKNOWN`    = 0x000000
- `TYPE_OK`         = 0x110000
- `TYPE_ERROR`      = 0x120000
- `TYPE_RING`       = 0x210000
- `TYPE_CONNECT`    = 0x220000
- `TYPE_NOCARRIER`  = 0x230000
- `TYPE_NODIALTONE` = 0x240000
- `TYPE_BUSY`       = 0x250000
- `TYPE_NOANSWER`   = 0x260000
- `TYPE_PROMPT`     = 0x300000
- `TYPE_PLUS`       = 0x400000
- `TYPE_TEXT`       = 0x500000
- `TYPE_ABORTED`    = 0x600000

{{/if}} {{!-- electron --}}

{{#if has-battery-voltage}}
## Battery Voltage

The {{device}} does not have a fuel gauge chip, however you can determine the voltage of the LiPo battery, if present.

```C++
float voltage = analogRead(BATT) * 0.0011224;
```

The constant 0.0011224 is based on the voltage divider circuit (R1 = 806K, R2 = 2M) that lowers the 3.6V LiPo battery output to a value that can be read by the ADC.

{{/if}}

{{#if has-fuel-gauge}}
## FuelGauge
The on-board Fuel Gauge allows you to monitor the battery voltage, state of charge and set low voltage battery thresholds. Use an instance of the `FuelGauge` library to call the various fuel gauge functions.

```C++
// EXAMPLE
FuelGauge fuel;
```

### getVCell()
Returns the battery voltage as a `float`.

```C++
// EXAMPLE
FuelGauge fuel;
Serial.println( fuel.getVCell() );
```

### getSoC()
Returns the State of Charge in percentage from 0-100% as a `float`.

```C++
// EXAMPLE
FuelGauge fuel;
Serial.println( fuel.getSoC() );
```

Note that in most cases, "fully charged" state (red charging LED goes off) will result in a SoC of 80%, not 100%. 

In some cases you can [increase the charge voltage](#setchargevoltage-) to get a higher SoC, but there are limits, based on temperature.

### getVersion()
`int getVersion();`

### getCompensateValue()
`byte getCompensateValue();`

### getAlertThreshold()
`byte getAlertThreshold();`

### setAlertThreshold()
`void setAlertThreshold(byte threshold);`

### getAlert()
`boolean getAlert();`

### clearAlert()
`void clearAlert();`

### reset()
`void reset();`

### quickStart()
`void quickStart();`

### sleep()
`void sleep();`

### wakeup()
`void wakeup();`
{{/if}} {{!-- has-fuel-gauge --}}

## Input/Output

Additional information on which pins can be used for which functions is available on the [pin information page](/reference/hardware/pin-info).

### pinMode()

`pinMode()` configures the specified pin to behave either as an input (with or without an internal weak pull-up or pull-down resistor), or an output.

```C++
// SYNTAX
pinMode(pin,mode);
```

`pinMode()` takes two arguments, `pin`: the number of the pin whose mode you wish to set and `mode`: `INPUT, INPUT_PULLUP, INPUT_PULLDOWN or OUTPUT.`

`pinMode()` does not return anything.

```C++
// EXAMPLE USAGE
int button = D0;                      // button is connected to D0
int LED = D1;                         // LED is connected to D1

void setup()
{
  pinMode(LED, OUTPUT);               // sets pin as output
  pinMode(button, INPUT_PULLDOWN);    // sets pin as input
}

void loop()
{
  // blink the LED as long as the button is pressed
  while(digitalRead(button) == HIGH) {
    digitalWrite(LED, HIGH);          // sets the LED on
    delay(200);                       // waits for 200mS
    digitalWrite(LED, LOW);           // sets the LED off
    delay(200);                       // waits for 200mS
  }
}
```

- When using INPUT\_PULLDOWN make sure a high level signal does not exceed 3.3V.

{{#if has-stm32}}
- INPUT\_PULLUP does not work as expected on TX on the P1, Electron, and  E Series and should not be used. 
- INPUT\_PULLDOWN does not work as expected on D0 and D1 on the P1 because the P1 module has hardware pull-up resistors on these pins. 

Also beware when using pins D3, D5, D6, and D7 as OUTPUT controlling external devices. After reset, these pins will be briefly taken over for JTAG/SWD, before being restored to the default high-impedance INPUT state during boot.

- D3, D5, and D7 are pulled high with a pull-up
- D6 is pulled low with a pull-down
- D4 is left floating

The brief change in state (especially when connected to a MOSFET that can be triggered by the pull-up or pull-down) may cause issues when using these pins in certain circuits. You can see this with the D7 blue LED which will blink dimly and briefly at boot.
{{/if}}

{{#if has-nrf52}}
If you are using the Particle Ethernet FeatherWing you cannot use the pins for GPIO as they are used for the Ethernet interface:

| Argon, Boron, Xenon| B Series SoM | Ethernet FeatherWing Pin  |
|:------:|:------------:|:--------------------------|
|MISO    | MISO         | SPI MISO                  |
|MOSI    | MOSI         | SPI MOSI                  |
|SCK     | SCK          | SPI SCK                   |
|D3      | A7           | nRESET                    |
|D4      | D22          | nINTERRUPT                |
|D5      | D8           | nCHIP SELECT              |

When using the FeatherWing Gen 3 devices (Argon, Boron, Xenon), pins D3, D4, and D5 are reserved for Ethernet control pins (reset, interrupt, and chip select).

When using Ethernet with the Boron SoM, pins A7, D22, and D8 are reserved for the Ethernet control pins (reset, interrupt, and chip select).
{{/if}}

{{#if xenon}}
On the Xenon only, there is an optional second UART (serial) interface. If using Serial2, the following pins cannot be used as GPIO:

- D4 (TX for Serial2)
- D5 (RX for Serial2)
- D6 (CTS for Serial2)
- D8 (RTS for Serial2)

As these pins overlap the Particle Ethernet FeatherWing, you cannot use Serial2 and the Ethernet FeatherWing at the same time.
{{/if}}

### getPinMode(pin)

Retrieves the current pin mode.

```cpp
// EXAMPLE

if (getPinMode(D0)==INPUT) {
  // D0 is an input pin
}
```

### digitalWrite()

Write a `HIGH` or a `LOW` value to a GPIO pin.

```C++
// SYNTAX
digitalWrite(pin, value);
```

If the pin has been configured as an `OUTPUT` with `pinMode()` or if previously used with `analogWrite()`, its voltage will be set to the corresponding value: 3.3V for HIGH, 0V (ground) for LOW.

`digitalWrite()` takes two arguments, `pin`: the number of the pin whose value you wish to set and `value`: `HIGH` or `LOW`.

`digitalWrite()` does not return anything.

```C++
// EXAMPLE USAGE
int LED = D1;              // LED connected to D1

void setup()
{
  pinMode(LED, OUTPUT);    // sets pin as output
}

void loop()
{
  digitalWrite(LED, HIGH); // sets the LED on
  delay(200);              // waits for 200mS
  digitalWrite(LED, LOW);  // sets the LED off
  delay(200);              // waits for 200mS
}
```

{{#if has-stm32}}
**Note:** All GPIO pins (`A0`..`A7`, {{#if electron}}`B0`..`B5`, `C0`..`C5`, {{/if}}`D0`..`D7`, `DAC`, `WKP`, `RX`, `TX`) can be used as long they are not used otherwise (e.g. as `Serial1` `RX`/`TX`).
{{/if}}
{{#if has-nrf52}}
**Note:** For all Feather Gen 3 devices (Argon, Boron, Xenon) all GPIO pins (`A0`..`A5`, `D0`..`D13`) can be used for digital output as long they are not used otherwise (e.g. as `Serial1` `RX`/`TX`).

**Note:** For the Boron SoM all GPIO pins (`A0`..`A7`, `D0`..`D13`, `D22`, `D23`) can be used for digital input as long they are not used otherwise (e.g. as `Serial1` `RX`/`TX`).

{{/if}}


### digitalRead()

Reads the value from a specified digital `pin`, either `HIGH` or `LOW`.

```C++
// SYNTAX
digitalRead(pin);
```

`digitalRead()` takes one argument, `pin`: the number of the digital pin you want to read.

`digitalRead()` returns `HIGH` or `LOW`.

```C++
// EXAMPLE USAGE
int button = D0;                   // button is connected to D0
int LED = D1;                      // LED is connected to D1
int val = 0;                       // variable to store the read value

void setup()
{
  pinMode(LED, OUTPUT);            // sets pin as output
  pinMode(button, INPUT_PULLDOWN); // sets pin as input
}

void loop()
{
  val = digitalRead(button);       // read the input pin
  digitalWrite(LED, val);          // sets the LED to the button's value
}

```

{{#if has-stm32}}
**Note:** All GPIO pins (`A0`..`A7`, {{#if electron}}`B0`..`B5`, `C0`..`C5`, {{/if}}`D0`..`D7`, `DAC`, `WKP`, `RX`, `TX`) can be used as long they are not used otherwise (e.g. as `Serial1` `RX`/`TX`).
{{/if}}

{{#if has-nrf52}}
**Note:** For all Feather Gen 3 devices (Argon, Boron, Xenon) all GPIO pins (`A0`..`A5`, `D0`..`D13`) can be used for digital input as long they are not used otherwise (e.g. as `Serial1` `RX`/`TX`).

**Note:** For the Boron SoM all GPIO pins (`A0`..`A7`, `D0`..`D13`, `D22`, `D23`) can be used for digital input as long they are not used otherwise (e.g. as `Serial1` `RX`/`TX`).

{{/if}}

{{#if has-pwm}}

### analogWrite() (PWM)

Writes an analog value to a pin as a digital PWM (pulse-width modulated) signal. The default frequency of the PWM signal is 500 Hz.

Can be used to light a LED at varying brightnesses or drive a motor at various speeds. After a call to analogWrite(), the pin will generate a steady square wave of the specified duty cycle until the next call to `analogWrite()` (or a call to `digitalRead()` or `digitalWrite()` on the same pin).

```C++
// SYNTAX
analogWrite(pin, value);
analogWrite(pin, value, frequency);
```

`analogWrite()` takes two or three arguments:

- `pin`: the number of the pin whose value you wish to set
- `value`: the duty cycle: between 0 (always off) and 255 (always on). _Since 0.6.0:_ between 0 and 255 (default 8-bit resolution) or `2^(analogWriteResolution(pin)) - 1` in general.
{{#if has-stm32}}
- `frequency`: the PWM frequency: between 1 Hz and 65535 Hz (default 500 Hz) on Gen 2 devices (Photon, P1, Electron). _Since 0.6.0:_ between 1 Hz and `analogWriteMaxFrequency(pin)`.
{{/if}}
{{#if has-nrf52}}
- `frequency`: the PWM frequency:from 5 Hz to `analogWriteMaxFrequency(pin)`, currently 500 kHz on Gen 3 devices (Argon, Boron, Xenon). The default value is 500 Hz.
{{/if}}


**NOTE:** `pinMode(pin, OUTPUT);` is required before calling `analogWrite(pin, value);` or else the `pin` will not be initialized as a PWM output and set to the desired duty cycle.

`analogWrite()` does not return anything.

```C++
// EXAMPLE USAGE

int ledPin = D1;               // LED connected to digital pin D1
int analogPin = A0;            // potentiometer connected to analog pin A0
int val = 0;                   // variable to store the read value

void setup()
{
  pinMode(ledPin, OUTPUT);     // sets the pin as output
}

void loop()
{
  val = analogRead(analogPin); // read the input pin
  analogWrite(ledPin, val/16); // analogRead values go from 0 to 4095,
                               // analogWrite values from 0 to 255.
  delay(10);
}
```

{{#if has-stm32}}
{{#if core}}- On the Core, this function works on pins D0, D1, A0, A1, A4, A5, A6, A7, RX and TX.{{/if}}
- On the Photon, P1 and Electron, this function works on pins D0, D1, D2, D3, A4, A5, WKP, RX and TX with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 7 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.
- Additionally on the Electron, this function works on pins B0, B1, B2, B3, C4, C5.
- Additionally on the P1, this function works on pins P1S0, P1S1, P1S6 (note: for P1S6, the WiFi Powersave Clock should be disabled for complete control of this pin. {{#if has-backup-ram}}See [System Features](#system-features)).{{/if}}

The PWM frequency must be the same for pins in the same timer group.

{{#if core}}- On the Core, the timer groups are D0/D1, A0/A1/RX/TX, A4/A5/A6/A7.{{/if}}
- On the Photon, the timer groups are D0/D1, D2/D3/A4/A5, WKP, RX/TX.
- On the P1, the timer groups are D0/D1, D2/D3/A4/A5/P1S0/P1S1, WKP, RX/TX/P1S6.
- On the Electron, the timer groups are D0/D1/C4/C5, D2/D3/A4/A5/B2/B3, WKP, RX/TX, B0/B1.
{{/if}}
{{#if has-nrf52}}
On Gen 3 Feather devices (Argon, Boron, Xenon), pins A0, A1, A2, A3, D2, D3, D4, D5, D6, D7, and D8 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 3: Pins D2, D3, A4, and A5.

- Group 2: Pins A0, A1, A2, and A3.

- Group 1: Pins D4, D5, D6, and D8.

- Group 0: Pin D7 and the RGB LED. This must use the default resolution of 8 bits (0-255) and frequency of 500 Hz.

On the Boron SoM, pins D4, D5, D7, A0, A1, A6, and A7 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 2: Pins A0, A1, A6, and A7.
- Group 1: Pins D4, D5, and D6.
- Group 0: Pin D7 and the RGB LED. This must use the default resolution of 8 bits (0-255) and frequency of 500 Hz.

{{/if}}


**NOTE:** When used with PWM capable pins, the `analogWrite()` function sets up these pins as PWM only.  {{#if has-dac}}This function operates differently when used with the [`Analog Output (DAC)`](#analog-output-dac-) pins.{{/if}}

Additional information on which pins can be used for PWM output is available on the [pin information page](/reference/hardware/pin-info).

{{/if}} {{!-- has-pwm --}}

{{#if has-pwm}}

{{#if has-dac}}
### analogWriteResolution() (PWM and DAC)
{{else}}
### analogWriteResolution() (PWM)
{{/if}}

{{since when="0.6.0"}}

Sets or retrieves the resolution of `analogWrite()` function of a particular pin.

`analogWriteResolution()` takes one or two arguments:

- `pin`: the number of the pin whose resolution you wish to set or retrieve
- `resolution`: (optional) resolution in bits. The value can range from 2 to 31 bits. If the resolution is not supported, it will not be applied. The default is 8.

`analogWriteResolution()` returns currently set resolution.

```C++
// EXAMPLE USAGE
pinMode(D1, OUTPUT);     // sets the pin as output
analogWriteResolution(D1, 12); // sets analogWrite resolution to 12 bits
analogWrite(D1, 3000, 1000); // 3000/4095 = ~73% duty cycle at 1kHz
```

{{#if has-dac}}
**NOTE:** DAC pins `DAC1` (`A6`) and `DAC2` (`A3`) support only either 8-bit or 12-bit (default) resolutions.
{{/if}}

**NOTE:** The resolution also affects maximum frequency that can be used with `analogWrite()`. The maximum frequency allowed with current resolution can be checked by calling `analogWriteMaxFrequency()`.

### analogWriteMaxFrequency() (PWM)

{{since when="0.6.0"}}

Returns maximum frequency that can be used with `analogWrite()` on this pin.

`analogWriteMaxFrequency()` takes one argument:

- `pin`: the number of the pin

```C++
// EXAMPLE USAGE
pinMode(D1, OUTPUT);     // sets the pin as output
analogWriteResolution(D1, 12); // sets analogWrite resolution to 12 bits
int maxFreq = analogWriteMaxFrequency(D1);
analogWrite(D1, 3000, maxFreq / 2); // 3000/4095 = ~73% duty cycle
```

{{/if}} {{!-- has-pwm --}}

{{#if has-dac}}
### Analog Output (DAC)

The Photon and Electron support true analog output on pins DAC (`DAC1` or `A6` in code) and A3 (`DAC2` or `A3` in code). Using `analogWrite(pin, value)`
with these pins, the output of the pin is set to an analog voltage from 0V to 3.3V that corresponds to values
from 0-4095.

**NOTE:** This output is buffered inside the STM32 to allow for more output current at the cost of not being able to achieve rail-to-rail performance, i.e., the output will be about 50mV when the DAC is set to 0, and approx 50mV less than the 3V3 voltage when DAC output is set to 4095.

**NOTE:** Device OS version 0.4.6 and 0.4.7 only - not applicable to versions from 0.4.9 onwards: While for PWM pins one single call to `pinMode(pin, OUTPUT);` sets the pin mode for multiple `analogWrite(pin, value);` calls, for DAC pins you need to set `pinMode(DAC, OUTPUT);` each time you want to perform an `analogWrite()`.

```C++
// SYNTAX
pinMode(DAC1, OUTPUT);
analogWrite(DAC1, 1024);
// sets DAC pin to an output voltage of 1024/4095 * 3.3V = 0.825V.
```
{{/if}} {{!-- has-dac --}}

{{#if has-adc}}

### analogRead() (ADC)

Reads the value from the specified analog pin. 

{{#if has-stm32}}
The device has 8 channels (A0 to A7) with a 12-bit resolution. This means that it will map input voltages between 0 and 3.3 volts into integer values between 0 and 4095. This yields a resolution between readings of: 3.3 volts / 4096 units or, 0.0008 volts (0.8 mV) per unit.

_Before 0.5.3_ **Note**: do *not* set the pinMode() with `analogRead()`. The pinMode() is automatically set to AN_INPUT the first time analogRead() is called for a particular analog pin. If you explicitly set a pin to INPUT or OUTPUT after that first use of analogRead(), it will not attempt to switch it back to AN_INPUT the next time you call analogRead() for the same analog pin. This will create incorrect analog readings.

_Since 0.5.3_ **Note:** you do not need to set the pinMode() with analogRead(). The pinMode() is automatically set to AN_INPUT any time analogRead() is called for a particular analog pin, if that pin is set to a pinMode other than AN_INPUT.  If you explicitly set a pin to INPUT, INPUT_PULLUP, INPUT_PULLDOWN or OUTPUT before using analogRead(), it will switch it back to AN_INPUT before taking the reading.  If you use digitalRead() afterwards, it will automatically switch the pinMode back to whatever you originally explicitly set it to.
{{/if}}

{{#if has-nrf52}}
The Gen 3 Feather devices (Argon, Boron, Xenon) have 6 channels (A0 to A5) with a 12-bit resolution. This means that it will map input voltages between 0 and 3.3 volts into integer values between 0 and 4095. This yields a resolution between readings of: 3.3 volts / 4096 units or, 0.0008 volts (0.8 mV) per unit.

The sample time to read one analog value is 10 microseconds.

The Boron SoM has 8 channels, A0 to A7.
{{/if}}

```C++
// SYNTAX
analogRead(pin);
```

`analogRead()` takes one argument `pin`: the number of the analog input pin to read from ({{pins op='all-a'}})

`analogRead()` returns an integer value ranging from 0 to 4095.

```C++
// EXAMPLE USAGE
int ledPin = D1;                // LED connected to digital pin D1
int analogPin = A0;             // potentiometer connected to analog pin A0
int val = 0;                    // variable to store the read value

void setup()
{
  // Note: analogPin pin does not require pinMode()

  pinMode(ledPin, OUTPUT);      // sets the ledPin as output
}

void loop()
{
  val = analogRead(analogPin);  // read the analogPin
  analogWrite(ledPin, val/16);  // analogRead values go from 0 to 4095, analogWrite values from 0 to 255
  delay(10);
}
```

{{#if has-adc-sample-time}}

### setADCSampleTime()

The function `setADCSampleTime(duration)` is used to change the default sample time for `analogRead()`.

{{#if core}}
On the Core, this parameter can be one of the following values (ADC clock = 18MHz or 55.6ns per cycle):

 * ADC_SampleTime_1Cycles5: Sample time equal to 1.5 cycles, 83ns
 * ADC_SampleTime_7Cycles5: Sample time equal to 7.5 cycles, 417ns
 * ADC_SampleTime_13Cycles5: Sample time equal to 13.5 cycles, 750ns
 * ADC_SampleTime_28Cycles5: Sample time equal to 28.5 cycles, 1.58us
 * ADC_SampleTime_41Cycles5: Sample time equal to 41.5 cycles, 2.31us
 * ADC_SampleTime_55Cycles5: Sample time equal to 55.5 cycles, 3.08us
 * ADC_SampleTime_71Cycles5: Sample time equal to 71.5 cycles, 3.97us
 * ADC_SampleTime_239Cycles5: Sample time equal to 239.5 cycles, 13.3us
{{/if}}

 On the Photon and Electron, this parameter can be one of the following values (ADC clock = 30MHz or 33.3ns per cycle):

 * ADC_SampleTime_3Cycles: Sample time equal to 3 cycles, 100ns
 * ADC_SampleTime_15Cycles: Sample time equal to 15 cycles, 500ns
 * ADC_SampleTime_28Cycles: Sample time equal to 28 cycles, 933ns
 * ADC_SampleTime_56Cycles: Sample time equal to 56 cycles, 1.87us
 * ADC_SampleTime_84Cycles: Sample time equal to 84 cycles, 2.80us
 * ADC_SampleTime_112Cycles: Sample time equal to 112 cycles, 3.73us
 * ADC_SampleTime_144Cycles: Sample time equal to 144 cycles, 4.80us
 * ADC_SampleTime_480Cycles: Sample time equal to 480 cycles, 16.0us

The default is ADC_SampleTime_480Cycles. This means that the ADC is sampled for 16 us which can provide a more accurate reading, at the expense of taking longer than using a shorter ADC sample time. If you are measuring a high frequency signal, such as audio, you will almost certainly want to reduce the ADC sample time.
 
Furthermore, 5 consecutive samples at the sample time are averaged in analogRead(), so the time to convert is closer to 80 us, not 16 us, at 480 cycles.
{{/if}} {{!-- has-adc-sample-time --}}


{{/if}} {{!-- has-adc --}}

## Low Level Input/Output

The Input/Ouput functions include safety checks such as making sure a pin is set to OUTPUT when doing a digitalWrite() or that the pin is not being used for a timer function.  These safety measures represent good coding and system design practice.

There are times when the fastest possible input/output operations are crucial to an applications performance. The SPI, UART (Serial) or I2C hardware are examples of low level performance-oriented devices.  There are, however, times when these devices may not be suitable or available.  For example, One-wire support is done in software, not hardware.

In order to provide the fastest possible bit-oriented I/O, the normal safety checks must be skipped.  As such, please be aware that the programmer is responsible for proper planning and use of the low level I/O functions.

Prior to using the following low-level functions, `pinMode()` must be used to configure the target pin.


### pinSetFast()

Write a `HIGH` value to a digital pin.

```C++
// SYNTAX
pinSetFast(pin);
```

`pinSetFast()` takes one argument, `pin`: the number of the pin whose value you wish to set `HIGH`.

`pinSetFast()` does not return anything.

```C++
// EXAMPLE USAGE
int LED = D7;              // LED connected to D7

void setup()
{
  pinMode(LED, OUTPUT);    // sets pin as output
}

void loop()
{
  pinSetFast(LED);		   // set the LED on
  delay(500);
  pinResetFast(LED);	   // set the LED off
  delay(500);
}
```

### pinResetFast()

Write a `LOW` value to a digital pin.

```C++
// SYNTAX
pinResetFast(pin);
```

`pinResetFast()` takes one argument, `pin`: the number of the pin whose value you wish to set `LOW`.

`pinResetFast()` does not return anything.

```C++
// EXAMPLE USAGE
int LED = D7;              // LED connected to D7

void setup()
{
  pinMode(LED, OUTPUT);    // sets pin as output
}

void loop()
{
  pinSetFast(LED);		   // set the LED on
  delay(500);
  pinResetFast(LED);	   // set the LED off
  delay(500);
}
```

### digitalWriteFast()

Write a `HIGH` or `LOW` value to a digital pin.  This function will call pinSetFast() or pinResetFast() based on `value` and is useful when `value` is calculated. As such, this imposes a slight time overhead.

```C++
// SYNTAX
digitalWriteFast(pin, value);
```

`digitalWriteFast()` `pin`: the number of the pin whose value you wish to set and `value`: `HIGH` or `LOW`.

`digitalWriteFast()` does not return anything.

```C++
// EXAMPLE USAGE
int LED = D7;              // LED connected to D7

void setup()
{
  pinMode(LED, OUTPUT);    // sets pin as output
}

void loop()
{
  digitalWriteFast(LED, HIGH);		   // set the LED on
  delay(500);
  digitalWriteFast(LED, LOW);	      // set the LED off
  delay(500);
}
```

### pinReadFast()

Reads the value from a specified digital `pin`, either `HIGH` or `LOW`.

```C++
// SYNTAX
pinReadFast(pin);
```

`pinReadFast()` takes one argument, `pin`: the number of the digital pin you want to read.

`pinReadFast()` returns `HIGH` or `LOW`.

```C++
// EXAMPLE USAGE
int button = D0;                   // button is connected to D0
int LED = D1;                      // LED is connected to D1
int val = 0;                       // variable to store the read value

void setup()
{
  pinMode(LED, OUTPUT);            // sets pin as output
  pinMode(button, INPUT_PULLDOWN); // sets pin as input
}

void loop()
{
  val = pinReadFast(button);       // read the input pin
  digitalWriteFast(LED, val);      // sets the LED to the button's value
}

```

## Advanced I/O

### tone()

Generates a square wave of the specified frequency and duration (and 50% duty cycle) on a timer channel pin which supports PWM. Use of the tone() function will interfere with PWM output on the selected pin. tone() is generally used to make sounds or music on speakers or piezo buzzers.

{{#if core}}
- On the Core, this function works on pins D0, D1, A0, A1, A4, A5, A6, A7, RX and TX.
{{/if}}

{{#if has-stm32}}
- On the Photon, P1 and Electron, this function works on pins D0, D1, D2, D3, A4, A5, WKP, RX and TX with a caveat: Tone timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 7 total independent Tone outputs. For example: Tone may be used on A5 while D2 is used as a GPIO, or D2 for Tone while A5 is used as an analog input. However A5 and D2 cannot be used as independent Tone outputs at the same time.

- Additionally on the Electron, this function works on pins B0, B1, B2, B3, C4, C5.
- Additionally on the P1, this function works on pins P1S0, P1S1, P1S6 (note: for P1S6, the WiFi Powersave Clock should be disabled for complete control of this pin. {{#if has-backup-ram}}See [System Features](#system-features)).{{/if}}
{{/if}}

{{#if has-nrf52}}
On Gen 3 Feather devices (Argon, Boron, Xenon), pins A0, A1, A2, A3, D2, D3, D4, D5, D6, and D8 can be used for tone(). Pins are assigned a PWM group. Each group must share the same frequency. Thus you can only output 3 different frequencies at the same time.

- Group 3: Pins D2, D3, A4, and A5.

- Group 2: Pins A0, A1, A2, and A3.

- Group 1: Pins D4, D5, D6, and D8.

On the Boron SoM, pins D4, D5, D7, A0, A1, A6, and A7 can be used for PWM. Pins are assigned a PWM group. Pins are assigned a PWM group. Each group must share the same frequency.

- Group 2: Pins A0, A1, A6, and A7.
- Group 1: Pins D4, D5, and D6.

{{/if}}

```C++
// SYNTAX
tone(pin, frequency, duration)
```

`tone()` takes three arguments, `pin`: the pin on which to generate the tone, `frequency`: the frequency of the tone in hertz and `duration`: the duration of the tone in milliseconds (a zero value = continuous tone).

The frequency range is from 20Hz to 20kHz. Frequencies outside this range will not be played.

`tone()` does not return anything.

{{#if has-stm32}}
**NOTE:** The PWM pins / timer channels are allocated as per the following table. If multiple, simultaneous tone() calls are needed (for example, to generate DTMF tones), use pins allocated to separate timers to avoid stuttering on the output:

Pin  | TMR1 | TMR3 | TMR4 | TMR5
:--- | :--: | :--: | :--: | :--:
D0   |      |      |  x   |  
D1   |      |      |  x   |  
D2   |      |  x   |      |  
D3   |      |  x   |      |  
A4   |      |  x   |      |  
A5   |      |  x   |      |  
WKP  |      |      |      |  x
RX   | x    |      |      |
TX   | x    |      |      |

On the P1:

Pin  | TMR1 | TMR3 | TMR4 | TMR5
:--- | :--: | :--: | :--: | :--:
D0   |      |      |  x   |  
D1   |      |      |  x   |  
D2   |      |  x   |      |  
D3   |      |  x   |      |  
A4   |      |  x   |      |  
A5   |      |  x   |      |  
WKP  |      |      |      |  x
RX   | x    |      |      |
TX   | x    |      |      |
P1S0 |      |  x   |      |
P1S1 |      |  x   |      | 
P1S6 |  x   |      |      |

On the Electron and E Series:

Pin  | TMR1 | TMR3 | TMR4 | TMR5 | TMR8
:--- | :--: | :--: | :--: | :--: | :--:
D0   |      |      |  x   |      |      |
D1   |      |      |  x   |      |      |  
D2   |      |  x   |      |      |      |  
D3   |      |  x   |      |      |      |  
A4   |      |  x   |      |      |      |  
A5   |      |  x   |      |      |      |  
WKP  |      |      |      |      |  x   |
RX   | x    |      |      |      |      |
TX   | x    |      |      |      |      |
B0   |      |      |      |      |  x   |
B1   |      |      |      |      |  x   |
B2   |      |  x   |      |      |      |  
B3   |      |  x   |      |      |      |  
C4   |      |      |  x   |      |      |  
C5   |      |      |  x   |      |      |  
{{/if}}

{{#if has-nrf52}}
**NOTE:** The PWM pins / timer channels are allocated as per the following table. If multiple, simultaneous tone() calls are needed (for example, to generate DTMF tones), different timer numbers must be used to for each frequency:

 On the Argon, Boron, and Xenon:

| Pin  | Timer |
| :--: | :---: |
| A0   | PWM2  |  
| A1   | PWM2  |
| A2   | PWM2  |
| A3   | PWM2  | 
| A4   | PWM3  |
| A5   | PWM3  | 
| D2   | PWM3  | 
| D3   | PWM3  | 
| D4   | PWM1  |
| D5   | PWM1  |
| D6   | PWM1  | 
| D8   | PWM1  |

On the B Series SoM:

| Pin  | Timer |
| :--: | :---: |
| A0   | PWM2  |  
| A1   | PWM2  |
| A6   | PWM2  |
| A7   | PWM2  | 
| D4   | PWM1  |
| D5   | PWM1  |
| D6   | PWM1  | 

{{/if}}


Additional information on which pins can be used for tone() is available on the [pin information page](/reference/hardware/pin-info).


```C++
#include "application.h"
// The Photon has 9 PWM pins: D0, D1, D2, D3, A4, A5, A7, RX and TX.
//
// EXAMPLE USAGE
// Plays a melody - Connect small speaker to speakerPin
int speakerPin = D0;

// Notes defined in microseconds (Period/2) 
// from note C to B, Octaves 3 through 7
int notes[] = 
{0,
/* C,  C#,   D,  D#,   E,   F,  F#,   G,  G#,   A,  A#,   B */
3817,3597,3401,3205,3030,2857,2703,2551,2404,2273,2146,2024,   // 3 (1-12)
1908,1805,1701,1608,1515,1433,1351,1276,1205,1136,1073,1012,   // 4 (13-24)
 956, 903, 852, 804, 759, 716, 676, 638, 602, 568, 536, 506,   // 5 (25-37)
 478, 451, 426, 402, 379, 358, 338, 319, 301, 284, 268, 253,   // 6 (38-50)
 239, 226, 213, 201, 190, 179, 169, 159, 151, 142, 134, 127 }; // 7 (51-62)

#define NOTE_G3  2551
#define NOTE_G4  1276
#define NOTE_C5  956
#define NOTE_E5  759
#define NOTE_G5  638
#define RELEASE  20
#define BPM      100

// notes in the melody:
int melody[] = {NOTE_E5,NOTE_E5,0,NOTE_E5,0,NOTE_C5,NOTE_E5,0,NOTE_G5,0,0,NOTE_G4};

// note durations: 4 = quarter note, 2 = half note, etc.:
int noteDurations[] = {4,4,4,4,4,4,4,4,4,2,4,4};

void setup() {
  // iterate over the notes of the melody:
  for (int thisNote = 0; thisNote < 12; thisNote++) {

    // to calculate the note duration, take one second
    // divided by the note type.
    // e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 60*1000/BPM/noteDurations[thisNote];
    tone(speakerPin, (melody[thisNote]!=0)?(500000/melody[thisNote]):0,noteDuration-RELEASE);

    // blocking delay needed because tone() does not block
    delay(noteDuration);
  }
}
```

### noTone()

Stops the generation of a square wave triggered by tone() on a specified pin. Has no effect if no tone is being generated.

The available pins are the same as for tone().


```C++
// SYNTAX
noTone(pin)
```

`noTone()` takes one argument, `pin`: the pin on which to stop generating the tone.

`noTone()` does not return anything.

```C++
//See the tone() example
```

### shiftOut()

Shifts out a byte of data one bit at a time on a specified pin. Starts from either the most (i.e. the leftmost) or least (rightmost) significant bit. Each bit is written in turn to a data pin, after which a clock pin is pulsed (taken high, then low) to indicate that the bit is available.

**NOTE:** if you're interfacing with a device that's clocked by rising edges, you'll need to make sure that the clock pin is low before the call to `shiftOut()`, e.g. with a call to `digitalWrite(clockPin, LOW)`.

This is a software implementation; see also the SPI function, which provides a hardware implementation that is faster but works only on specific pins.


```C++
// SYNTAX
shiftOut(dataPin, clockPin, bitOrder, value)
```
```C++
// EXAMPLE USAGE

// Use digital pins D0 for data and D1 for clock
int dataPin = D0;
int clock = D1;

uint8_t data = 50;

setup() {
	// Set data and clock pins as OUTPUT pins before using shiftOut()
	pinMode(dataPin, OUTPUT);
	pinMode(clock, OUTPUT);

	// shift out data using MSB first
	shiftOut(dataPin, clock, MSBFIRST, data);

	// Or do this for LSBFIRST serial
	shiftOut(dataPin, clock, LSBFIRST, data);
}

loop() {
	// nothing to do
}
```

`shiftOut()` takes four arguments, 'dataPin': the pin on which to output each bit, `clockPin`: the pin to toggle once the dataPin has been set to the correct value, `bitOrder`: which order to shift out the bits; either MSBFIRST or LSBFIRST (Most Significant Bit First, or, Least Significant Bit First) and `value`: the data (byte) to shift out.

`shiftOut()` does not return anything.



### shiftIn()

Shifts in a byte of data one bit at a time. Starts from either the most (i.e. the leftmost) or least (rightmost) significant bit. For each bit, the clock pin is pulled high, the next bit is read from the data line, and then the clock pin is taken low.

**NOTE:** if you're interfacing with a device that's clocked by rising edges, you'll need to make sure that the clock pin is low before the call to shiftOut(), e.g. with a call to `digitalWrite(clockPin, LOW)`.

This is a software implementation; see also the SPI function, which provides a hardware implementation that is faster but works only on specific pins.


```C++
// SYNTAX
shiftIn(dataPin, clockPin, bitOrder)
```
```C++
// EXAMPLE USAGE

// Use digital pins D0 for data and D1 for clock
int dataPin = D0;
int clock = D1;

uint8_t data;

setup() {
	// Set data as INPUT and clock pin as OUTPUT before using shiftIn()
	pinMode(dataPin, INPUT);
	pinMode(clock, OUTPUT);

	// shift in data using MSB first
	data = shiftIn(dataPin, clock, MSBFIRST);

	// Or do this for LSBFIRST serial
	data = shiftIn(dataPin, clock, LSBFIRST);
}

loop() {
	// nothing to do
}
```

`shiftIn()` takes three arguments, 'dataPin': the pin on which to input each bit, `clockPin`: the pin to toggle to signal a read from dataPin, `bitOrder`: which order to shift in the bits; either MSBFIRST or LSBFIRST (Most Significant Bit First, or, Least Significant Bit First).

`shiftIn()` returns the byte value read.


### pulseIn()


{{since when="0.4.7"}}

Reads a pulse (either HIGH or LOW) on a pin. For example, if value is HIGH, pulseIn() waits for the pin to go HIGH, starts timing, then waits for the pin to go LOW and stops timing. Returns the length of the pulse in microseconds or 0 if no complete pulse was received within the timeout.

The timing of this function is based on an internal hardware counter derived from the system tick clock.  Resolution is 1/Fosc (1/72MHz for Core, 1/120MHz for Photon/P1/Electron). Works on pulses from 10 microseconds to 3 seconds in length. Please note that if the pin is already reading the desired `value` when the function is called, it will wait for the pin to be the opposite state of the desired `value`, and then finally measure the duration of the desired `value`. This routine is blocking and does not use interrupts.  The `pulseIn()` routine will time out and return 0 after 3 seconds.

```C++
// SYNTAX
pulseIn(pin, value)
```

`pulseIn()` takes two arguments, `pin`: the pin on which you want to read the pulse (this can be any GPIO, e.g. D1, A2, C0, B3, etc..), `value`: type of pulse to read: either HIGH or LOW. `pin` should be set to one of three [pinMode()](#pinmode-)'s prior to using pulseIn(), `INPUT`, `INPUT_PULLUP` or `INPUT_PULLDOWN`.

`pulseIn()` returns the length of the pulse (in microseconds) or 0 if no pulse is completed before the 3 second timeout (unsigned long)

```C++
// EXAMPLE
unsigned long duration;

void setup()
{
    Serial.begin(9600);
    pinMode(D0, INPUT);

    // Pulse generator, connect D1 to D0 with a jumper
    // PWM output is 500Hz at 50% duty cycle
    // 1000us HIGH, 1000us LOW
    pinMode(D1, OUTPUT);
    analogWrite(D1, 128);
}

void loop()
{
    duration = pulseIn(D0, HIGH);
    Serial.printlnf("%d us", duration);
    delay(1000);
}

/* OUTPUT
 * 1003 us
 * 1003 us
 * 1003 us
 * 1003 us
 */
```

{{#if has-pmic}}

## PMIC (Power Management IC)

*Note*: This is advanced IO and for experienced users. This
controls the LiPo battery management system and is handled automatically
by the Device OS.

### begin()
`bool begin();`

### getVersion()
`byte getVersion();`

### getSystemStatus()
`byte getSystemStatus();`

### getFault()
`byte getFault();`

---

### Input source control register

#### readInputSourceRegister()
`byte readInputSourceRegister(void);`

#### enableBuck()
`bool enableBuck(void);`

#### disableBuck()
`bool disableBuck(void);`

#### setInputCurrentLimit()
`bool setInputCurrentLimit(uint16_t current);`

#### getInputCurrentLimit()
`byte getInputCurrentLimit(void);`

#### setInputVoltageLimit()
`bool setInputVoltageLimit(uint16_t voltage);`

#### getInputVoltageLimit()
`byte getInputVoltageLimit(void);`

---

### Power ON Configuration Reg

#### enableCharging()
`bool enableCharging(void);`

#### disableCharging()
`bool disableCharging(void);`

#### enableOTG()
`bool enableOTG(void);`

#### disableOTG()
`bool disableOTG(void);`

#### resetWatchdog()
`bool resetWatchdog(void);`

#### setMinimumSystemVoltage()
`bool setMinimumSystemVoltage(uint16_t voltage);`

#### getMinimumSystemVoltage()
`uint16_t getMinimumSystemVoltage();`

#### readPowerONRegister()
`byte readPowerONRegister(void);`

---

### Charge Current Control Reg

#### setChargeCurrent()
`bool setChargeCurrent(bool bit7, bool bit6, bool bit5, bool bit4, bool bit3, bool bit2);`

The total charge current is the 512mA + the combination of the current that the following bits represent
                     
- bit7 = 2048mA
- bit6 = 1024mA
- bit5 = 512mA
- bit4 = 256mA
- bit3 = 128mA
- bit2 = 64mA

For example, to set a 1408 mA charge current:

```
PMIC pmic;
pmic.setChargeCurrent(0,0,1,1,1,0);
```

- 512mA + (0+0+512mA+256mA+128mA+0) = 1408mA
                    
                    

#### getChargeCurrent()
`byte getChargeCurrent(void);`

Returns the charge current register. This is the direct register value from the BQ24195 PMIC. The bits in this register correspond to the bits you pass into setChargeCurrent.

- bit7 is the MSB, value 0x80
- bit2 is the LSB, value 0x04

---

### PreCharge/Termination Current Control Reg

#### setPreChargeCurrent()
`bool setPreChargeCurrent();`

#### getPreChargeCurrent()
`byte getPreChargeCurrent();`

#### setTermChargeCurrent()
`bool setTermChargeCurrent();`

#### getTermChargeCurrent()
`byte getTermChargeCurrent();`

---

### Charge Voltage Control Reg

#### setChargeVoltage()
`bool setChargeVoltage(uint16_t voltage);`

Voltage can be:

- 4112 (4.112 volts), the default
- 4208 (4.208 volts), only safe at lower temperatures

The default charge voltage is 4112, which corresponds to 4.112 volts. 

You can also set it 4208, which corresponds to 4.208 volts. This higher voltage should not be used if the battery will be charged in temperatures exceeding 45°C. Using a higher charge voltage will allow the battery to reach a higher state-of-charge (SoC) but could damage the battery at high temperatures.


```
void setup() {
    PMIC power;
    power.setChargeVoltage(4208);
}
```

Note: Do not use 4208 with Device OS 0.4.8 or 0.5.0, as a bug will cause an incorrect, even higher, voltage to be used.

#### getChargeVoltageValue()

`uint16_t getChargeVoltageValue();`

Returns the charge voltage constant that could pass into setChargeVoltage, typically 4208 or 4112.

#### getChargeVoltage()

`byte getChargeVoltage();`

Returns the charge voltage register. This is the direct register value from the BQ24195 PMIC.

- 155, 0x9b, 0b10011011, corresponds to 4112
- 179, 0xb3, 0b10110011, corresponds to 4208

---

### Charge Timer Control Reg

#### readChargeTermRegister()
`byte readChargeTermRegister();`

#### disableWatchdog()
`bool disableWatchdog(void);`

#### setWatchdog()
`bool setWatchdog(byte time);`

---

### Thermal Regulation Control Reg

#### setThermalRegulation()
`bool setThermalRegulation();`

#### getThermalRegulation()
`byte getThermalRegulation();`

---

### Misc Operation Control Reg

#### readOpControlRegister()
`byte readOpControlRegister();`

#### enableDPDM()
`bool enableDPDM(void);`

#### disableDPDM()
`bool disableDPDM(void);`

#### enableBATFET()
`bool enableBATFET(void);`

#### disableBATFET()
`bool disableBATFET(void);`

#### safetyTimer()
`bool safetyTimer();`

#### enableChargeFaultINT()
`bool enableChargeFaultINT();`

#### disableChargeFaultINT()
`bool disableChargeFaultINT();`

#### enableBatFaultINT()
`bool enableBatFaultINT();`

#### disableBatFaultINT()
`bool disableBatFaultINT();`

---

### System Status Register

#### getVbusStat()
`byte getVbusStat();`

#### getChargingStat()
`byte getChargingStat();`

#### getDPMStat()
`bool getDPMStat();`

#### isPowerGood()
`bool isPowerGood(void);`

#### isHot()
`bool isHot(void);`

#### getVsysStat()
`bool getVsysStat();`

---

### Fault Register

#### isWatchdogFault()
`bool isWatchdogFault();`

#### getChargeFault()
`byte getChargeFault();`

#### isBatFault()
`bool isBatFault();`

#### getNTCFault()
`byte getNTCFault();`

{{/if}} {{!-- has-pmic --}}

## Serial

{{#unless raspberry-pi}}

{{#if electron}}
Used for communication between the {{device}} and a computer or other devices. The {{device}} has four hardware (USART) serial channels. 
{{/if}}

{{#unless electron}}

{{#if has-serial2}}
Used for communication between the {{device}} and a computer or other devices. The {{device}} has two hardware (USART) serial channels. 
{{/if}}

{{#unless has-serial2}}
Used for communication between the {{device}} and a computer or other devices. The {{device}} has one hardware (USART) serial channel.
{{/unless}} 

{{/unless}} {{!-- electron --}} 

It also has {{#if has-usb-serial1}}two{{else}}one{{/if}} USB serial channel{{#if has-usb-serial1}}s{{else}}{{/if}}.

{{/unless}}{{!-- raspberry-pi --}}

{{#unless raspberry-pi}}
`Serial:` This channel communicates through the USB port and when connected to a computer, will show up as a virtual COM port.
{{else}}
`Serial:` This channel communicates between the terminal and the firmware running. It uses standard input and standard output.
{{/unless}}

```C++
// EXAMPLE USAGE
void setup()
{
  Serial.begin();
  Serial.println("Hello World!");
}
```
{{#if has-usb-serial1}}
`USBSerial1`: _Since 0.6.0_ This channel communicates through the USB port and when connected to a computer, will show up as a second virtual COM port. This channel is disabled by default.
{{/if}}

`Serial1:` This channel is available via the device's TX and RX pins.

{{#if has-nrf52}}
Hardware flow control for Serial1 is optionally available on pins D3(CTS) and D2(RTS) on the {{device}}. 
{{/if}}

{{#if raspberry-pi}}
**IMPORTANT**: Support for `Serial1` is not complete for the Raspberry Pi so `Serial1` never returns any data.
{{/if}}

{{#if has-serial2}}

{{#if core}}
`Serial2:` This channel is optionally available via the device's D1(TX) and D0(RX) pins.
{{/if}}

{{#if photon}}
`Serial2:` This channel is optionally available via pins 28/29 (RGB LED Blue/Green). These pins are accessible via the pads on the bottom of the PCB [See PCB Land Pattern](/datasheets/photon-datasheet#recommended-pcb-land-pattern-photon-without-headers-). The Blue and Green current limiting resistors should be removed.

If the user enables Serial2, they should also consider using RGB.onChange() to move the RGB functionality to an external RGB LED on some PWM pins.
{{/if}}

{{#if electron}}
`Serial2:` This channel is optionally available via the device's RGB Green (TX) and Blue (RX) LED pins. The Blue and Green current limiting resistors should be removed.

If the user enables Serial2, they should also consider using RGB.onChange() to move the RGB functionality to an external RGB LED on some PWM pins.
{{/if}}

{{#if xenon}}
`Serial2:` This channel is optionally available on D4(TX) and D5(RX). Optional hardware flow control is available on D6(CTS) and D8(RTS) on the {{device}}. 
{{/if}}

To use Serial2, add `#include "Serial2/Serial2.h"` near the top of your app's main code file.


{{/if}} {{!-- has-serial2 --}}

{{#if has-serial4-5}}
`Serial4:` This channel is optionally available via the Electron's C3(TX) and C2(RX) pins. To use Serial4, add `#include "Serial4/Serial4.h"` near the top of your app's main code file.

`Serial5:` This channel is optionally available via the Electron's C1(TX) and C0(RX) pins. To use Serial5, add `#include "Serial5/Serial5.h"` near the top of your app's main code file.
{{/if}}

To use the Serial1{{#if has-serial2}} or Serial2{{/if}} pins to communicate with your personal computer, you will need an additional USB-to-serial adapter. To use them to communicate with an external TTL serial device, connect the TX pin to your device's RX pin, the RX to your device's TX pin, and the ground of your Core to your device's ground.

```C++
// EXAMPLE USAGE
{{#if has-serial2}}
// IMPORTANT: Include the header file for Serial2
#include "Serial2/Serial2.h"
{{/if}}
{{#if has-serial4-5}}
// IMPORTANT: Include the header file for Serial4/5
#include "Serial4/Serial4.h"
#include "Serial5/Serial5.h"
{{/if}}

void setup()
{
  Serial1.begin(9600);
{{#if has-serial2}}
  Serial2.begin(9600);
{{/if}}
{{#if has-serial4-5}}
  Serial4.begin(9600);
  Serial5.begin(9600);
{{/if}}

  Serial1.println("Hello World!");
{{#if has-serial2}}
  Serial2.println("Hello World!");
{{/if}}
{{#if has-serial4-5}}
  Serial4.println("Hello World!");
  Serial5.println("Hello World!");
{{/if}}
}
```

To use the hardware serial pins of (Serial1{{#if has-serial2}}/2{{/if}}{{#if has-serial4-5}}/4/5{{/if}}) to communicate with your personal computer, you will need an additional USB-to-serial adapter. To use them to communicate with an external TTL serial device, connect the TX pin to your device's RX pin, the RX to your device's TX pin, and the ground of your {{device}} to your device's ground.

**NOTE:** Please take into account that the voltage levels on these pins operate at 0V to 3.3V and should not be connected directly to a computer's RS232 serial port which operates at +/- 12V and will damage the {{device}}.

{{#unless raspberry-pi}}

{{#if has-usb-serial1}}
**NOTE:** On Windows 10, using `USBSerial1` on the Electron and P1 may not be reliable due to limitations of the USB peripheral used for those 2 platforms. Characters may be dropped between the computer and device. `USBSerial1` is reliable for other Particle platforms and other operating systems. `Serial` is reliable for all platforms and operating systems.
{{/if}} {{!-- has-usb-serial1 --}}

#### Connect to Serial with a computer

For **Windows** users, we recommend downloading [PuTTY](http://www.putty.org/). Plug your {{device}} into your computer over USB, open a serial port in PuTTY using the standard settings, which should be:

- Baud rate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

On **macOS (OS X) and Linux** systems, you can access the serial port through the terminal.

For macOS, open the terminal and type:

```screen /dev/tty.u```

and pressing tab to autocomplete.

On Linux, you can accomplish the same thing by using:

```screen /dev/ttyACM```

and pressing tab to autocomplete.

Now you are ready to read data sent by the {{device}} over Serial and send data back.
{{/unless}} {{!-- raspberry-pi --}}

### begin()

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Enables serial channel with specified configuration.

```C++
// SYNTAX
Serial.begin();          // via USB port

{{#if has-usb-serial1}}
USBSerial1.begin();      // via USB port
{{/if}}

Serial1.begin(speed);         // via TX/RX pins
Serial1.begin(speed, config); //  "

Serial1.begin(9600, SERIAL_9N1); // via TX/RX pins, 9600 9N1 mode
Serial1.begin(9600, SERIAL_DATA_BITS_8 | SERIAL_STOP_BITS_1_5 | SERIAL_PARITY_EVEN); // via TX/RX pins, 9600 8E1.5

{{#if has-serial2}}
#include "Serial2/Serial2.h"
Serial2.begin(speed);         {{#if core}}// D1(TX) and D0(RX) pins{{else}}// RGB-LED green(TX) and blue (RX) pins{{/if}}
Serial2.begin(speed, config); //  "

Serial2.begin(9600);         // via RGB Green (TX) and Blue (RX) LED pins
Serial2.begin(9600, SERIAL_DATA_BITS_8 | SERIAL_STOP_BITS_1_5 | SERIAL_PARITY_EVEN); // via RGB Green (TX) and Blue (RX) LED pins, 9600 8E1.5
{{/if}} {{!-- has-serial2 --}}
{{#if has-serial4-5}}

#include "Serial4/Serial4.h"
Serial4.begin(speed);         // via C3(TX)/C2(RX) pins
Serial4.begin(speed, config); //  "

#include "Serial5/Serial5.h"
Serial5.begin(speed);         // via C1(TX)/C0(RX) pins
Serial5.begin(speed, config); //  "
{{/if}} {{!-- has-serial4-5 --}}
```

Parameters:
- `speed`: parameter that specifies the baud rate *(long)* _(optional for `Serial` {{#if has-usb-serial1}}and `USBSerial1`{{/if}})_ 
- `config`: parameter that specifies the number of data bits used, parity and stop bits *(long)* _(not used with `Serial` {{#if has-usb-serial1}}and `USBSerial1`{{/if}})_

{{#if core}}
Hardware serial port baud rates are: 600, 1200, 2400, 4800, 9600, 19200, 38400, 57600, and 115200 on the {{device}}.
{{/if}}

{{#if has-stm32f2}}
Hardware serial port baud rates are: 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, and 230400 on the {{device}}.
{{/if}}

{{#if has-nrf52}}
Hardware serial port baud rates are: 1200, 2400, 4800, 9600, 19200, 28800, 38400, 57600, 76800, 115200, 230400, 250000, 460800, 921600 and 1000000 on the {{device}}.
{{/if}}


```C++
// EXAMPLE USAGE
void setup()
{
  Serial.begin(9600);   // open serial over USB
  // On Windows it will be necessary to implement the following line:
  // Make sure your Serial Terminal app is closed before powering your device
  // Now open your Serial Terminal!
  while(!Serial.isConnected()) Particle.process();

  Serial1.begin(9600);  // open serial over TX and RX pins

  Serial.println("Hello Computer");
  Serial1.println("Hello Serial 1");
}

void loop() {}
```

{{since when="0.5.0"}} 28800 baudrate set by the Host on `Serial` will put the device in Listening Mode, where a YMODEM download can be started by additionally sending an `f` character. Baudrate 14400 can be used to put the device into DFU Mode.

When using hardware serial channels (Serial1, Serial2{{#if electron}}, Serial4, Serial5{{/if}}), the configuration of the serial channel may also specify the number of data bits, stop bits, parity, flow control and other settings. The default is SERIAL_8N1 (8 data bits, no parity and 1 stop bit) and does not need to be specified to achieve this configuration.  To specify one of the following configurations, add one of these defines as the second parameter in the `begin()` function, e.g. `Serial1.begin(9600, SERIAL_8E1);` for 8 data bits, even parity and 1 stop bit.

Pre-defined Serial configurations available:

{{#if has-stm32f2}}

- `SERIAL_8N1` - 8 data bits, no parity, 1 stop bit (default)
- `SERIAL_8N2` - 8 data bits, no parity, 2 stop bits
- `SERIAL_8E1` - 8 data bits, even parity, 1 stop bit
- `SERIAL_8E2` - 8 data bits, even parity, 2 stop bits
- `SERIAL_8O1` - 8 data bits, odd parity, 1 stop bit
- `SERIAL_8O2` - 8 data bits, odd parity, 2 stop bits
- `SERIAL_9N1` - 9 data bits, no parity, 1 stop bit
- `SERIAL_9N2` - 9 data bits, no parity, 2 stop bits

{{since when="0.6.0"}}

- `SERIAL_7O1` - 7 data bits, odd parity, 1 stop bit
- `SERIAL_7O2` - 7 data bits, odd parity, 1 stop bit
- `SERIAL_7E1` - 7 data bits, even parity, 1 stop bit
- `SERIAL_7E2` - 7 data bits, even parity, 1 stop bit
{{#if has-linbus}}
- `LIN_MASTER_13B` - 8 data bits, no parity, 1 stop bit, LIN Master mode with 13-bit break generation
- `LIN_SLAVE_10B` - 8 data bits, no parity, 1 stop bit, LIN Slave mode with 10-bit break detection
- `LIN_SLAVE_11B` - 8 data bits, no parity, 1 stop bit, LIN Slave mode with 11-bit break detection
{{/if}}

Alternatively, configuration may be constructed manually by ORing (`|`) the following configuration constants:

Data bits:
- `SERIAL_DATA_BITS_7` - 7 data bits
- `SERIAL_DATA_BITS_8` - 8 data bits
- `SERIAL_DATA_BITS_9` - 9 data bits

Stop bits:
- `SERIAL_STOP_BITS_1` - 1 stop bit
- `SERIAL_STOP_BITS_2` - 2 stop bits
- `SERIAL_STOP_BITS_0_5` - 0.5 stop bits
- `SERIAL_STOP_BITS_1_5` - 1.5 stop bits

Parity:
- `SERIAL_PARITY_NO` - no parity
- `SERIAL_PARITY_EVEN` - even parity
- `SERIAL_PARITY_ODD` - odd parity

{{/if}} {{!-- has-stm32 --}}
 
{{#if has-nrf52}}
- `SERIAL_8N1` - 8 data bits, no parity, 1 stop bit (default)
- `SERIAL_8E1` - 8 data bits, even parity, 1 stop bit

Other options, including odd parity, and 7 and 9 bit modes, are not available on the {{device}}. 

{{/if}} {{!-- has-nrf52 --}}


{{#if core}}
Hardware flow control, available only on Serial1 (`CTS` - `A0`, `RTS` - `A1`):
{{/if}}

{{#if has-stm32f2}} {{!-- photon and electron --}}
Hardware flow control, available only on Serial2 (`CTS` - `A7`, `RTS` - `RGBR` ):
{{/if}}

{{#if has-nrf52}}
On Gen 3 devices (Argon, Boron, Xenon), flow control is available on Serial1 D3(CTS) and D2(RTS). If you are not using flow control (the default), then these pins can be used as regular GPIO.
{{/if}}

{{#if xenon}}
On the {{device}} flow control is also available on Serial2 D6(CTS) and D8(RTS). 
{{/if}}


- `SERIAL_FLOW_CONTROL_NONE` - no flow control
- `SERIAL_FLOW_CONTROL_RTS` - RTS flow control
- `SERIAL_FLOW_CONTROL_CTS` - CTS flow control
- `SERIAL_FLOW_CONTROL_RTS_CTS` - RTS/CTS flow control

{{#if has-linbus}}
LIN configuration:
- `LIN_MODE_MASTER` - LIN Master
- `LIN_MODE_SLAVE` - LIN Slave
- `LIN_BREAK_13B` - 13-bit break generation
- `LIN_BREAK_10B` - 10-bit break detection
- `LIN_BREAK_11B` - 11-bit break detection

**NOTE:** LIN break detection may be enabled in both Master and Slave modes.
{{/if}} {{!-- has-linbus --}}

{{#if has-usb-serial1}}
**NOTE** {{since when="0.6.0"}} When `USBSerial1` is enabled by calling `USBSerial1.begin()` in `setup()` or during normal application execution, the device will quickly disconnect from Host and connect back with `USBSerial1` enabled. If such behavior is undesirable, `USBSerial1` may be enabled with `STARTUP()` macro, which will force the device to connect to the Host with both `Serial` and `USBSerial1` by default.

```C++
// EXAMPLE USAGE
STARTUP(USBSerial1.begin());
void setup()
{
  while(!Serial.isConnected())
    Particle.process();
  Serial.println("Hello Serial!");

  while(!USBSerial1.isConnected())
    Particle.process();
  USBSerial1.println("Hello USBSerial1!");
}
```
{{/if}} {{!-- has-usb-serial1 --}}

### end()

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Disables serial channel.

When used with hardware serial channels (Serial1, Serial2{{#if electron}}, Serial4, Serial5{{/if}}), disables serial communication, allowing channel's RX and TX pins to be used for general input and output. To re-enable serial communication, call `SerialX.begin()`.

{{#unless core}}{{#unless raspberry-pi}}

{{since when="0.6.0"}}

When used with USB serial channels (`Serial`{{#if has-usb-serial1}} or `USBSerial1`{{/if}}), `end()` will cause the device to quickly disconnect from Host and connect back without the selected serial channel.
{{/unless}}{{/unless}}

```C++
// SYNTAX
Serial1.end();
```

### available()

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Get the number of bytes (characters) available for reading from the serial port. This is data that's already arrived and stored in the serial receive buffer.

The receive buffer size for hardware serial channels (Serial1, Serial2{{#if electron}}, Serial4, Serial5{{/if}}) is {{#if has-stm32}}64{{/if}}{{#if has-nrf52}}128{{/if}} bytes and cannot be changed. 

{{#if has-usb-serial1}}
The receive buffer size for USB serial channels (Serial and USBSerial1) is 256 bytes. Also see [`acquireSerialBuffer`](#acquireserialbuffer-).
{{else}}
The receive buffer size for Serial is 64 bytes. 
{{/if}}

```C++
// EXAMPLE USAGE
void setup()
{
  Serial.begin(9600);
  Serial1.begin(9600);

}

void loop()
{
  // read from port 0, send to port 1:
  if (Serial.available())
  {
    int inByte = Serial.read();
    Serial1.write(inByte);
  }
  // read from port 1, send to port 0:
  if (Serial1.available())
  {
    int inByte = Serial1.read();
    Serial.write(inByte);
  }
}
```

### availableForWrite()

{{since when="0.4.9"}} Available on Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}.

{{since when="0.5.0"}} Available on USB Serial (Serial)

{{#if has-usb-serial1}}{{since when="0.6.0"}} Available on `USBSerial1`{{/if}}

Retrieves the number of bytes (characters) that can be written to this serial port without blocking.

If `blockOnOverrun(false)` has been called, the method returns the number of bytes that can be written to the buffer without causing buffer overrun, which would cause old data to be discarded and overwritten.

{{#if has-usb-serial1}}
Also see [`acquireSerialBuffer`](#acquireserialbuffer-).
{{/if}}

{{#if has-usb-serial1}}
### acquireSerialBuffer()

```C++
// SYNTAX
HAL_USB_USART_Config acquireSerialBuffer()
{
  HAL_USB_USART_Config conf = {0};

  // The usable buffer size will be 128
  static uint8_t serial_rx_buffer[129];
  static uint8_t serial_tx_buffer[129];

  conf.rx_buffer = serial_rx_buffer;
  conf.tx_buffer = serial_tx_buffer;
  conf.rx_buffer_size = 129;
  conf.tx_buffer_size = 129;

  return conf;
}

HAL_USB_USART_Config acquireUSBSerial1Buffer()
{
  HAL_USB_USART_Config conf = {0};

  // The usable buffer size will be 128
  static uint8_t usbserial1_rx_buffer[129];
  static uint8_t usbserial1_tx_buffer[129];

  conf.rx_buffer = usbserial1_rx_buffer;
  conf.tx_buffer = usbserial1_tx_buffer;
  conf.rx_buffer_size = 129;
  conf.tx_buffer_size = 129;

  return conf;
}
```

{{since when="0.6.0"}}

It is possible for the application to allocate its own buffers for `Serial` (USB serial) and `USBSerial1` by implementing `acquireSerialBuffer` and `acquireUSBSerial1Buffer` functions. Minimum receive buffer size is 65 bytes.

{{/if}} {{!-- has-usb-serial1 --}}

### blockOnOverrun()

{{since when="0.4.9"}} Available on Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}.

{{since when="0.5.0"}} Available on USB Serial (Serial)

{{#if has-usb-serial1}}{{since when="0.6.0"}} Available on `USBSerial1`{{/if}}

Defines what should happen when calls to `write()/print()/println()/printlnf()` that would overrun the buffer.

- `blockOnOverrun(true)` -  this is the default setting.  When there is no room in the buffer for the data to be written, the program waits/blocks until there is room. This avoids buffer overrun, where data that has not yet been sent over serial is overwritten by new data. Use this option for increased data integrity at the cost of slowing down realtime code execution when lots of serial data is sent at once.

- `blockOnOverrun(false)` - when there is no room in the buffer for data to be written, the data is written anyway, causing the new data to replace the old data. This option is provided when performance is more important than data integrity.

```cpp
// EXAMPLE - fast and furious over Serial1
Serial1.blockOnOverrun(false);
Serial1.begin(115200);
```

### serialEvent()

A family of application-defined functions that are called whenever there is data to be read
from a serial peripheral.

- serialEvent: called when there is data available from `Serial`
{{#if has-usb-serial1}}- usbSerialEvent1: called when there is data available from `USBSerial1`{{/if}}
- serialEvent1: called when there is data available from `Serial1`
{{#if has-serial2}}
- serialEvent2: called when there is data available from `Serial2`
{{/if}} {{!-- has-serial2 --}}
{{#if has-serial4-5}}
- serialEvent4: called when there is data available from `Serial4`
- serialEvent5: called when there is data available from `Serial5`
{{/if}} {{!-- has-serial4-5 --}}

The `serialEvent` functions are called in between calls to the application `loop()`. This means that if `loop()` runs for a long time due to `delay()` calls or other blocking calls the serial buffer might become full between subsequent calls to `serialEvent` and serial characters might be lost. Avoid long `delay()` calls in your application if using `serialEvent`.

Since `serialEvent` functions are an
extension of the application loop, it is ok to call any functions that you would also call from `loop()`. Because of this, there is little advantage to using serial events over just reading serial from loop(). 

```cpp
// EXAMPLE - echo all characters typed over serial

void setup()
{
   Serial.begin(9600);
}

void serialEvent()
{
    char c = Serial.read();
    Serial.print(c);
}

```

### peek()

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Returns the next byte (character) of incoming serial data without removing it from the internal serial buffer. That is, successive calls to peek() will return the same character, as will the next call to `read()`.

```C++
// SYNTAX
Serial.peek();
Serial1.peek();
```
`peek()` returns the first byte of incoming serial data available (or `-1` if no data is available) - *int*

### write()

_Available on Serial, Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Writes binary data to the serial port. This data is sent as a byte or series of bytes; to send the characters representing the digits of a number use the `print()` function instead.

```C++
// SYNTAX
Serial.write(val);
Serial.write(str);
Serial.write(buf, len);
```

```C++
// EXAMPLE USAGE

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  Serial.write(45); // send a byte with the value 45

  int bytesSent = Serial.write(“hello”); //send the string “hello” and return the length of the string.
}
```

*Parameters:*

- `val`: a value to send as a single byte
- `str`: a string to send as a series of bytes
- `buf`: an array to send as a series of bytes
- `len`: the length of the buffer

`write()` will return the number of bytes written, though reading that number is optional.


### read()

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Reads incoming serial data.

```C++
// SYNTAX
Serial.read();
Serial1.read();
```
`read()` returns the first byte of incoming serial data available (or -1 if no data is available) - *int*

```C++
// EXAMPLE USAGE
int incomingByte = 0; // for incoming serial data

void setup() {
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
}

void loop() {
  // send data only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
  }
}
```
### print()

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Prints data to the serial port as human-readable ASCII text.
This command can take many forms. Numbers are printed using an ASCII character for each digit. Floats are similarly printed as ASCII digits, defaulting to two decimal places. Bytes are sent as a single character. Characters and strings are sent as is. For example:

- Serial.print(78) gives "78"
- Serial.print(1.23456) gives "1.23"
- Serial.print('N') gives "N"
- Serial.print("Hello world.") gives "Hello world."

An optional second parameter specifies the base (format) to use; permitted values are BIN (binary, or base 2), OCT (octal, or base 8), DEC (decimal, or base 10), HEX (hexadecimal, or base 16). For floating point numbers, this parameter specifies the number of decimal places to use. For example:

- Serial.print(78, BIN) gives "1001110"
- Serial.print(78, OCT) gives "116"
- Serial.print(78, DEC) gives "78"
- Serial.print(78, HEX) gives "4E"
- Serial.println(1.23456, 0) gives "1"
- Serial.println(1.23456, 2) gives "1.23"
- Serial.println(1.23456, 4) gives "1.2346"

### println()

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Prints data to the serial port as human-readable ASCII text followed by a carriage return character (ASCII 13, or '\r') and a newline character (ASCII 10, or '\n'). This command takes the same forms as `Serial.print()`.

```C++
// SYNTAX
Serial.println(val);
Serial.println(val, format);
```

*Parameters:*

- `val`: the value to print - any data type
- `format`: specifies the number base (for integral data types) or number of decimal places (for floating point types)

`println()` returns the number of bytes written, though reading that number is optional - `size_t (long)`

```C++
// EXAMPLE
//reads an analog input on analog in A0, prints the value out.

int analogValue = 0;    // variable to hold the analog value

void setup()
{
  // Make sure your Serial Terminal app is closed before powering your device
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);
}

void loop() {
  // read the analog input on pin A0:
  analogValue = analogRead(A0);

  // print it out in many formats:
  Serial.println(analogValue);       // print as an ASCII-encoded decimal
  Serial.println(analogValue, DEC);  // print as an ASCII-encoded decimal
  Serial.println(analogValue, HEX);  // print as an ASCII-encoded hexadecimal
  Serial.println(analogValue, OCT);  // print as an ASCII-encoded octal
  Serial.println(analogValue, BIN);  // print as an ASCII-encoded binary

  // delay 10 milliseconds before the next reading:
  delay(10);
}
```

### printf()

{{since when="0.4.6"}}

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Provides [printf](http://www.cplusplus.com/reference/cstdio/printf/)-style formatting over serial.

`printf` allows strings to be built by combining a number of values with text.

```C++
Serial.printf("Reading temperature sensor at %s...", Time.timeStr().c_str());
float temp = readTemp();
Serial.printf("the temperature today is %f Kelvin", temp);
Serial.println();
```

Running this code prints:

```
Reading temperature sensor at Thu 01 Oct 2015 12:34...the temperature today is 293.1 Kelvin.
```

The last `printf()` call could be changed to `printlnf()` to avoid a separate call to `println()`.


### printlnf()


{{since when="0.4.6"}}

_Available on Serial, {{#if has-usb-serial1}}USBSerial1, {{/if}}Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

formatted output followed by a newline.
Produces the same output as [printf](#printf-) which is then followed by a newline character,
so to that subsequent output appears on the next line.


### flush()

Waits for the transmission of outgoing serial data to complete.

```C++
// SYNTAX
Serial.flush();
Serial1.flush();
```

`flush()` neither takes a parameter nor returns anything.


{{#if has-serial-half-duplex}}

### halfduplex()

_Available on Serial1{{#if has-serial2}}, Serial2{{/if}}{{#if has-serial4-5}}, Serial4, Serial5{{/if}}._

Puts Serial1 into half-duplex mode.  In this mode both the transmit and receive
are on the TX pin.  This mode can be used for a single wire bus communications
scheme between microcontrollers.

```C++
// SYNTAX
Serial1.halfduplex(true);  // Enable half-duplex mode
Serial1.halfduplex(false); // Disable half-duplex mode
```

```C++
// EXAMPLE
// Initializes Serial1 at 9600 baud and enables half duplex mode

Serial1.begin(9600);
Serial1.halfduplex(true);

```
`halfduplex()` takes one argument: `true` enables half-duplex mode, `false` disables half-duplex mode

`halfduplex()` returns nothing

{{/if}}

### isConnected()

```C++
// EXAMPLE USAGE
void setup()
{
  Serial.begin();   // open serial over USB
  while(!Serial.isConnected()) // wait for Host to open serial port
    Particle.process();

  Serial.println("Hello there!");
}
```

_Since 0.5.3 Available on `Serial`._

_Since 0.6.0 Available on `Serial`{{#if has-usb-serial1}} and `USBSerial1`{{/if}}._

Used to check if host has serial port (virtual COM port) open.

{{#if core}}***NOTE:*** This function always returns `true` on {{device}}.{{/if}}

Returns:
- `true` when Host has virtual COM port open.

{{#if has-usb-hid}}
Mouse
----

```cpp
// EXAMPLE USAGE
// Use STARTUP() macro to avoid USB disconnect/reconnect (see begin() documentation)
STARTUP(Mouse.begin());

void setup() {
  // Set screen size to 1920x1080 (to scale [0, 32767] absolute Mouse coordinates)
  Mouse.screenSize(1920, 1080);
  // Move mouse to the center of the screen and click left button
  Mouse.moveTo(1920 / 2, 1080 / 2);
  Mouse.click(MOUSE_LEFT);
  // Move mouse from the current position by 100 points (not pixels) left
  Mouse.move(-100, 0);
  // Press right mouse button (and leave it pressed)
  Mouse.press(MOUSE_RIGHT);
  // Scroll wheel in the negative direction
  Mouse.scroll(-127);
  // Release right mouse button
  Mouse.release(MOUSE_RIGHT);
}

void loop() {
}
```

{{since when="0.6.0"}}

This library allows {{device}} to act as a native USB HID Mouse.

In terms of USB HID, {{device}} presents itself as two separate devices: Mouse (supporting relative movement) and Digitizer (supporting absolute movement).

Full capabilities include:
- Relative XY movement [-32767, 32767]
- Absolute XY movement [0, 32767]
- 3-buttons (left, right, middle)
- Wheel [-127, 127]

***NOTE:*** Linux X11 doesn't support HID devices reporting both absolute and relative coordinates. By default only absolute movement is possible by using [`Mouse.moveTo()`](#moveto-). In order for regular relative [`Mouse.move()`](#move-) to work, a call to [`Mouse.enableMoveTo(false)`](#enablemoveto-) is required.

### begin()

```cpp
// SYNTAX
Mouse.begin();
```

Initializes Mouse library and enables USB HID stack.

```cpp
// Example
STARTUP(Mouse.begin());
void setup() {
  // At this point {{device}} is already connected to Host with Mouse enabled
}
```

***NOTE:*** When `Mouse.begin()` is called in `setup()` or during normal application execution, the device will quickly disconnect from Host and connect back with USB HID enabled. If such behavior is undesirable, `Mouse` may be enabled with `STARTUP()` macro, which will force the device to connect to the Host after booting with `Mouse` already enabled.

This function takes no parameters and does not return anything.

### end()

```cpp
// SYNTAX
Mouse.end();
```

Disables USB Mouse functionality.

```cpp
// Example
// Enable both Keyboard and Mouse on startup
STARTUP(Mouse.begin());
STARTUP(Keyboard.begin());

void setup() {
  // A call to Mouse.end() here will not cause the device to disconnect and connect back to the Host
  Mouse.end();
  // Disabling both Keyboard and Mouse at this point will trigger the behavior explained in NOTE.
  Keyboard.end();
}
```

***NOTE:*** Calling `Mouse.end()` will cause the device to quickly disconnect from Host and connect back without USB HID enabled if [`Keyboard`](#keyboard) is disabled as well.

This function takes no parameters and does not return anything.

### move()

```cpp
// SYNTAX
Mouse.move(x, y);
Mouse.move(x, y, wheel);
```

Moves the cursor relative to the current position.

*Parameters:*

- `x`: amount to move along the X axis - `int16_t` [-32767, 32767]
- `y`: amount to move along the Y axis - `int16_t` [-32767, 32767]
- `wheel`: amount to move the scroll wheel - `int8_t` [-127, 127]

`move()` does not return anything.

### moveTo()

```cpp
// SYNTAX
Mouse.moveTo(x, y);
```

Moves the cursor to an absolute position. (0, 0) position is the top left corner of the screen. By default both X and Y axes span from 0 to 32767.

The default range [0, 32767] can be mapped to actual screen resolution by calling [`screenSize()`](#screensize-). After the call to [`screenSize()`](#screensize-), `moveTo()` will accept screen coordinates and automatically map them to the default range.

*Parameters:*

- `x`: X coordinate - `uint16_t` _[0, 32767] (default)_
- `y`: Y coordinate - `uint16_t` _[0, 32767] (default)_

`moveTo()` does not return anything.

### scroll()

```cpp
// SYNTAX
Mouse.scroll(wheel);
```

Scrolls the mouse wheel by the specified amount.

*Parameters:*

- `wheel`: amount to move the scroll wheel - `int8_t` [-127, 127]

`scroll()` does not return anything.

### click()

```cpp
// SYNTAX
Mouse.click();
Mouse.click(button);
```

Momentarily clicks specified mouse button at the current cursor position. A click is a [`press()`](#press-) quickly followed by [`release()`](#release-).

```cpp
// EXAMPLE USAGE
// Click left mouse button
Mouse.click(MOUSE_LEFT);
// Click right mouse button
Mouse.click(MOUSE_RIGHT);
// Click middle mouse button
Mouse.click(MOUSE_MIDDLE);
// Click both left and right mouse buttons at the same time
Mouse.click(MOUSE_LEFT | MOUSE_RIGHT);
```

*Parameters:*

- `button`: which mouse button to click - `uint8_t` - `MOUSE_LEFT` (default), `MOUSE_RIGHT`, `MOUSE_MIDDLE` or any ORed (`|`) combination of buttons for simultaneous clicks

`click()` does not return anything.

### press()

```cpp
// SYNTAX
Mouse.press();
Mouse.press(button);
```

Presses specified mouse button at the current cursor position and holds it pressed. A press can be cancelled by [`release()`](#release-).

```cpp
// EXAMPLE USAGE
// Press left mouse button
Mouse.press(MOUSE_LEFT);
// Press right mouse button
Mouse.press(MOUSE_RIGHT);
// Press middle mouse button
Mouse.press(MOUSE_MIDDLE);
// Press both left and right mouse buttons at the same time
Mouse.press(MOUSE_LEFT | MOUSE_RIGHT);
```

*Parameters:*

- `button`: which mouse button to press - `uint8_t` - `MOUSE_LEFT` (default), `MOUSE_RIGHT`, `MOUSE_MIDDLE` or any ORed (`|`) combination of buttons for simultaneous press

`press()` does not return anything.

### release()

```cpp
// SYNTAX
Mouse.release();
Mouse.release(button);
```

Releases previously pressed mouse button at the current cursor position.

```cpp
// EXAMPLE USAGE
// Release left mouse button
Mouse.release(MOUSE_LEFT);
// Release right mouse button
Mouse.release(MOUSE_RIGHT);
// Release middle mouse button
Mouse.release(MOUSE_MIDDLE);
// Release both left and right mouse buttons at the same time
Mouse.release(MOUSE_LEFT | MOUSE_RIGHT);
```

*Parameters:*

- `button`: which mouse button to release - `uint8_t` - `MOUSE_LEFT` (default), `MOUSE_RIGHT`, `MOUSE_MIDDLE` or any ORed (`|`) combination of buttons to release simultaneously. To release all buttons simultaneously, `MOUSE_ALL` can also be used.

`release()` does not return anything.

### isPressed()

```cpp
// SYNTAX
Mouse.isPressed();
Mouse.isPressed(button);
```

This function checks the current state of mouse buttons and returns if they are currently pressed or not.

```cpp
// EXAMPLE USAGE
bool pressed;
// Check if left mouse button is currently pressed
pressed = Mouse.isPressed(MOUSE_LEFT);
// Check if right mouse button is currently pressed
pressed = Mouse.isPressed(MOUSE_RIGHT);
// Check if middle mouse button is currently pressed
pressed = Mouse.isPressed(MOUSE_MIDDLE);
```

*Parameters:*

- `button`: which mouse button to check - `uint8_t` - `MOUSE_LEFT` (default), `MOUSE_RIGHT`, `MOUSE_MIDDLE`

`isPressed()` returns `true` if provided button is currently pressed.

### screenSize()

```cpp
// SYNTAX
Mouse.screenSize(screenWidth, screenHeight);
Mouse.screenSize(screenWidth, screenHeight,
                 marginLeft, marginRight,
                 marginTop, marginBottom);
Mouse.screenSize(screenWidth, screenHeight,
                 std::array<4, float>);
```

Maps the default absolute movement range [0, 32767] used by [`moveTo()`](#moveto-) to actual screen resolution. After setting the screen size, `moveTo()` will accept screen coordinates and automatically map them to the default range.

```cpp
// EXAMPLE USAGE
// Use STARTUP() macro to avoid USB disconnect/reconnect (see begin() documentation)
STARTUP(Mouse.begin());

void setup() {
  // Set screen size to 1920x1080 (to scale [0, 32767] absolute Mouse coordinates)
  Mouse.screenSize(1920, 1080);
  // Move mouse to the center of the screen
  Mouse.moveTo(1920 / 2, 1080 / 2);
}

void loop() {
}
```

*Parameters:*

- `screenWidth`: screen width in pixels - `uint16_t`
- `screenHeight`: screen height in pixels - `uint16_t`
- `marginLeft`: _(optional)_ left screen margin in percent (e.g. 10.0) - `float`
- `marginRight`: _(optional)_ right screen margin in percent (e.g. 10.0) - `float`
- `marginTop`: _(optional)_ top screen margin in percent (e.g. 10.0) - `float`
- `marginBottom`: _(optional)_ bottom screen margin in percent (e.g. 10.0) - `float`

`screenSize()` does not return anything.

### enableMoveTo()

```cpp
// SYNTAX
Mouse.enableMoveTo(false);
Mouse.enableMoveTo(true);
```

Disables or enables absolute mouse movement (USB HID Digitizer).

```cpp
// EXAMPLE USAGE
// Use STARTUP() macro to avoid USB disconnect/reconnect (see begin() documentation)
STARTUP(Mouse.begin());
// Disable absolute mouse movement
STARTUP(Mouse.enableMoveTo(false));

void setup() {
  // Move cursor by 100 points along X axis and by 100 points Y axis
  Mouse.move(100, 100);
  // Mouse.moveTo() calls do nothing
  Mouse.moveTo(0, 0);
}

void loop() {
}
```

***NOTE:*** Linux X11 doesn't support HID devices reporting both absolute and relative coordinates. By default only absolute movement is possible by using [`Mouse.moveTo()`](#moveto-). In order for regular relative [`Mouse.move()`](#move-) to work, a call to [`Mouse.enableMoveTo(false)`](#enablemoveto-) is required.

***NOTE:*** When `Mouse.enableMoveTo()` is called in `setup()` or during normal application execution, the device will quickly disconnect from Host and connect back with new settings. If such behavior is undesirable, `moveTo()` may be disable or enabled with `STARTUP()` macro, which will force the device to connect to the Host after booting with correct settings already in effect.

*Parameters:*

- `state`: `true` to enable absolute movement functionality, `false` to disable - `bool`

`enableMoveTo()` does not return anything.

Keyboard
----

```cpp
// EXAMPLE USAGE
// Use STARTUP() macro to avoid USB disconnect/reconnect (see begin() documentation)
STARTUP(Keyboard.begin());

void setup() {
  // Type 'SHIFT+h', 'e', 'l', 'l', 'o', 'SPACE', 'w', 'o', 'r', 'l', 'd', 'ENTER'
  Keyboard.println("Hello world!");

  // Type 'SHIFT+t', 'e', 's', 't', 'SPACE', '1', '2', '3', '.', '4', '0', 'ENTER'
  Keyboard.printf("%s %.2f\n", "Test", 123.4f);

  // Quickly press and release Ctrl-Alt-Delete
  Keyboard.click(KEY_DELETE, MOD_LCTRL | MOD_LALT);

  // Press Ctrl, then Alt, then Delete and release them all
  Keyboard.press(KEY_LCTRL);
  Keyboard.press(KEY_LALT);
  Keyboard.press(KEY_DELETE);
  Keyboard.releaseAll();
}

void loop() {
}
```

{{since when="0.6.0"}}

This library allows {{device}} to act as a native USB HID Keyboard.

### begin()

```cpp
// SYNTAX
Keyboard.begin();
```

Initializes Keyboard library and enables USB HID stack.

```cpp
// Example
STARTUP(Keyboard.begin());
void setup() {
  // At this point {{device}} is already connected to Host with Keyboard enabled
}
```

***NOTE:*** When `Keyboard.begin()` is called in `setup()` or during normal application execution, the device will quickly disconnect from Host and connect back with USB HID enabled. If such behavior is undesirable, `Keyboard` may be enabled with `STARTUP()` macro, which will force the device to connect to the Host after booting with `Keyboard` already enabled.

This function takes no parameters and does not return anything.

### end()

```cpp
// SYNTAX
Keyboard.end();
```

Disables USB Keyboard functionality.

```cpp
// Example
// Enable both Keyboard and Mouse on startup
STARTUP(Mouse.begin());
STARTUP(Keyboard.begin());

void setup() {
  // A call to Mouse.end() here will not cause the device to disconnect and connect back to the Host
  Mouse.end();
  // Disabling both Keyboard and Mouse at this point will trigger the behavior explained in NOTE.
  Keyboard.end();
}
```

***NOTE:*** Calling `Keyboard.end()` will cause the device to quickly disconnect from Host and connect back without USB HID enabled if [`Mouse`](#mouse) is disabled as well.

This function takes no parameters and does not return anything.

### write()

```cpp
// SYNTAX
Keyboard.write(character);
```

Momentarily clicks a keyboard key. A click is a [`press()`](#press--1) quickly followed by [`release()`](#release--1). This function works only with ASCII characters. ASCII characters are translated into USB HID keycodes according to the [conversion table](https://github.com/particle-iot/device-os/blob/develop/wiring/src/spark_wiring_usbkeyboard.cpp#L33). For example ASCII character 'a' would be translated into 'a' keycode (leftmost middle row letter key on a QWERTY keyboard), whereas 'A' ASCII character would be sent as 'a' keycode with SHIFT modifier.

```cpp
// EXAMPLE USAGE
STARTUP(Keyboard.begin());

void setup() {
  const char hello[] = "Hello world!\n";
  // This for-loop will type "Hello world!" followed by ENTER
  for (int i = 0; i < strlen(hello); i++) {
    Keyboard.write(hello[i]);
  }
}
```

This function is used by [`print()`](#print--1), [`println()`](#println--1), [`printf()`](#printf--1), [`printlnf()`](#printlnf--1) which provide an easy way to type text.

*Parameters:*

- `ch`: ASCII character - `char`

`write()` does not return anything.

### click()

```cpp
// SYNTAX
Keyboard.click(key);
Keyboard.click(key, modifiers);
```

Momentarily clicks a keyboard key as well as one or more modifier keys (e.g. ALT, CTRL, SHIFT etc.). A click is a [`press()`](#press--1) quickly followed by [`release()`](#release--1). This function works only with USB HID [keycodes (defined in `enum UsbKeyboardScanCode`)](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L5) and [modifiers (defined in `enum UsbKeyboardModifier`)](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L396). `Keyboard` implementation supports keycodes ranging from `0x04 (KEY_A / Keyboard a and A)` to `0xDD (KEY_KPHEX / Keypad Hexadecimal)`.

```cpp
// EXAMPLE USAGE
STARTUP(Keyboard.begin());

void setup() {
  // Quickly press and release Ctrl-Alt-Delete
  Keyboard.click(KEY_DELETE, MOD_LCTRL | MOD_LALT);
}
```

*Parameters:*

- `key`: USB HID key code (see [`enum UsbKeyboardScanCode`](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L5)) - `uint16_t`
- `modifier`: _(optional)_ one or more ORed (`|`) USB HID modifier codes (see [`enum UsbKeyboardModifier`](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L396) - `uint16_t`

`click()` does not return anything.

### press()

```cpp
// SYNTAX
Keyboard.press(key);
Keyboard.press(key, modifier);
```

Presses specified keyboard key as well as one or more modifier keys and holds them pressed. A press can be cancelled by [`release()`](#release--1) or [`releaseAll()`](#releaseall-).

Up to 8 keys can be pressed simultaneously. Modifier keys (e.g. CTRL, ALT, SHIFT etc) are sent separately and do not add to the currently pressed key count, i.e. it is possible to press and keep pressing 8 regular keyboard keys and all the modifiers (LSHIFT, LALT, LGUI, LCTRL, RSHIFT, RALT, RSHIFT, RCTRL) at the same time.

See [`Keyboard.click()`](#click--1) documentation for information about keycodes and modifier keys.

```cpp
// EXAMPLE USAGE
STARTUP(Keyboard.begin());

void setup() {
  // Press Ctrl, then Alt, then Delete and release them all
  Keyboard.press(KEY_LCTRL);
  Keyboard.press(KEY_LALT);
  Keyboard.press(KEY_DELETE);
  Keyboard.releaseAll();
}
```

*Parameters:*

- `key`: USB HID key code (see [`enum UsbKeyboardScanCode`](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L5)) - `uint16_t`
- `modifier`: _(optional)_ one or more ORed (`|`) USB HID modifier codes (see [`enum UsbKeyboardModifier`](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L396) - `uint16_t`

`press()` does not return anything.

### release()

```cpp
// SYNTAX
Keyboard.release(key);
Keyboard.release(key, modifier);
```

Releases previously pressed keyboard key as well as one or more modifier keys.

```cpp
// EXAMPLE USAGE
STARTUP(Keyboard.begin());

void setup() {
  // Press Delete and two modifiers (left ALT and left CTRL) simultaneously
  Keyboard.press(KEY_DELETE, MOD_LCTRL | MOD_LALT);
  // Release Delete and two modifiers (left ALT and left CTRL) simultaneously
  Keyboard.release(KEY_DELETE, MOD_LCTRL | MOD_LALT);
}
```

See [`Keyboard.click()`](#click--1) documentation for information about keycodes and modifier keys.

*Parameters:*

- `key`: USB HID key code (see [`enum UsbKeyboardScanCode`](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L5)) - `uint16_t`
- `modifier`: _(optional)_ one or more ORed (`|`) USB HID modifier codes (see [`enum UsbKeyboardModifier`](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_usbkeyboard_scancode.h#L396) - `uint16_t`

`release()` does not return anything.

### releaseAll()

```cpp
// SYNTAX
Keyboard.releaseAll();
```

Releases any previously pressed keyboard keys and modifier keys.

```cpp
// EXAMPLE USAGE
STARTUP(Keyboard.begin());

void setup() {
  // Press Ctrl, then Alt, then Delete and release them all
  Keyboard.press(KEY_LCTRL);
  Keyboard.press(KEY_LALT);
  Keyboard.press(KEY_DELETE);
  Keyboard.releaseAll();
}
```

This function takes no parameters and does not return anything.

### print()

See [`Keyboard.write()`](#write--1) and [`Serial.print()`](#print-) documentation.

### println()

See [`Keyboard.write()`](#write--1) and [`Serial.println()`](#println-) documentation.

### printf()

See [`Keyboard.write()`](#write--1) and [`Serial.printf()`](#printf-) documentation.

### printlnf()

See [`Keyboard.write()`](#write--1) and [`Serial.printlnf()`](#printlnf-) documentation.

{{/if}} {{!-- has-usb-hid --}}

{{#if has-spi}}
SPI
----
This library allows you to communicate with SPI devices, with the {{device}} as the master device.

{{#if has-spi-slave}}
{{#if has-stm32}}_Since 0.5.0_ {{/if}}The {{device}} can function as a SPI slave.
{{/if}}

{{#if core}}
![SPI](/assets/images/core-pin-spi.jpg)
{{/if}}

{{#if has-embedded}}

The hardware SPI pin functions, which can
be used via the `SPI` object, are mapped as follows:
{{#if has-stm32}}
* `SS` => `A2` (default)
* `SCK` => `A3`
* `MISO` => `A4`
* `MOSI` => `A5`
{{/if}}
{{#if has-nrf52}}
On the Argon, Boron, and Xenon:
* `SS` => `A5 (D14)` (but can use any available GPIO)
* `SCK` => `SCK (D13)`
* `MISO` => `MISO (D11)`
* `MOSI` => `MOSI (D12)`

On the B Series SoM:
* `SS` => `D8` (but can use any available GPIO)
* `SCK` => `SCK (D13)`
* `MISO` => `MISO (D11)`
* `MOSI` => `MOSI (D12)`

{{/if}}

{{#if has-multiple-spi}}
There is a second hardware SPI interface available, which can
be used via the `SPI1` object. This second port is mapped as follows:
{{#if has-stm32}}
* `SS` => `D5` (default)
* `SCK` => `D4`
* `MISO` => `D3`
* `MOSI` => `D2`
{{/if}}
{{#if has-nrf52}}
* `SCK` => `D2`
* `MOSI` => `D3`
* `MISO` => `D4`

Note: On Gen 3 devices (mesh), the SPI1 pins different than 2nd-generation (Photon/Electron), so you cannot use SPI1 on a mesh device with the classic adapter.
{{/if}}
{{/if}}

{{#if electron}}
Additionally on the Electron, there is an alternate pin location for the second SPI interface, which can
be used via the `SPI2` object. This alternate location is mapped as follows:
* `SS` => `D5` (default)
* `SCK` => `C3`
* `MISO` => `C2`
* `MOSI` => `C1`
{{/if}}

{{#if has-multiple-spi}}
**Note**: Because there are multiple SPI peripherals available, be sure to use the same `SPI`,`SPI1`{{#if electron}},`SPI2`{{/if}} object with all associated functions. I.e.,

Do **NOT** use **SPI**.begin() with **SPI1**.transfer();

**Do** use **SPI**.begin() with **SPI**.transfer();
{{/if}}

{{/if}} {{!-- has-embedded --}}

{{#if raspberry-pi}}

There are dedicated pins for SPI on the Raspberry Pi: `MOSI`, `MISO`, `SCK` and 2 chip select pins `CE0` and `CE1`.

**Note**: Before using the SPI interface on the Raspberry Pi, you have to enable it in hardware. In a terminal, type `sudo raspi-config`, go to `Advanced Options`, select `SPI` and answer `Yes` to enable it. Reboot the Raspberry Pi before flashing firmware that uses the SPI peripheral.

It is not recommended to use the SPI pins for general purpose IO. If you need to, you must disable the SPI peripheral in `raspi-config`, reboot and use the `MOSI`, `MISO`, `SCK`, `CE0` and `CE1` pins with `pinMode`, `digitalRead` or `digitalWrite`.
{{/if}} {{!-- raspberry-pi --}}

### begin()

Initializes the SPI bus by setting SCK, MOSI, and a user-specified slave-select pin to outputs, MISO to input. SCK is pulled either high or low depending on the configured SPI data mode (default high for `SPI_MODE3`). Slave-select is pulled high.

**Note:**  The SPI firmware ONLY initializes the user-specified slave-select pin as an `OUTPUT`. The user's code must control the slave-select pin with `digitalWrite()` before and after each SPI transfer for the desired SPI slave device. Calling `SPI.end()` does NOT reset the pin mode of the SPI pins.

```C++
// SYNTAX
SPI.begin(ss);
{{#if has-multiple-spi}}
SPI1.begin(ss);
{{#if electron}}
SPI2.begin(ss);
{{/if}}
{{/if}}
```

Where, the parameter `ss` is the `SPI` device slave-select pin to initialize.  If no pin is specified, the default pin is:
- Argon, Boron, Xenon: `A5 (D14)`
- B Series SoM: `D8`
- Photon, P1, Electron, and E Series: `A2`
{{#if core}}
- Gen 1 (Core): `A2`
{{/if}} {{!-- core --}}
{{#if has-multiple-spi}}
For `SPI1`, the default `ss` pin is `D5`.
{{#if electron}}
For `SPI2`, the default `ss` pin is also `D5`.
{{/if}} {{!-- electron --}}
{{/if}} {{!-- has-multiple-spi --}}

```C++
// Example using SPI1, with D5 as the SS pin:
SPI1.begin();
// or
SPI1.begin(D5);
```
{{#if electron}}
```C++
// Example using SPI2, with C0 as the SS pin:
SPI2.begin(C0);
```
{{/if}}
{{/if}}

{{#if has-spi-slave}}

### begin(SPI_Mode, uint16_t)

{{since when="0.5.0"}}

Initializes the {{device}} SPI peripheral in master or slave mode.

**Note:** MISO, MOSI and SCK idle in high-impedance state when SPI peripheral is configured in slave mode and the device is not selected.

Parameters:

- `mode`: `SPI_MODE_MASTER` or `SPI_MODE_SLAVE`
- `ss_pin`: slave-select pin to initialize. If no pin is specified, the default pin is:
- Argon, Boron, Xenon: `A5 (D14)`
- B Series SoM: `D8`
- Photon, P1, Electron, and E Series: `A2`
{{#if core}}
- Gen 1 (Core): `A2`
{{/if}}
{{#if has-multiple-spi}}
For `SPI1`, the default `ss` pin is `D5`.
{{#if electron}}
For `SPI2`, the default `ss` pin is also `D5`.
{{/if}}

```C++
// Example using SPI in master mode, with the default SS pin:
SPI.begin(SPI_MODE_MASTER);
{{#if has-multiple-spi}}
// Example using SPI1 in slave mode, with D5 as the SS pin
SPI1.begin(SPI_MODE_SLAVE, D5);
{{#if electron}}
// Example using SPI2 in slave mode, with C0 as the SS pin
SPI2.begin(SPI_MODE_SLAVE, C0);
{{/if}}
{{/if}}
```

{{#if has-nrf52}}
Gen 3 devices (Argon, Boron, and Xenon), SPI slave can only be used on SPI1. It is not supported on SPI. The maximum speed is 8 MHz on SPI1.
{{/if}}

{{/if}} {{!-- has-spi-slave --}}

### end()

Disables the SPI bus (leaving pin modes unchanged).

```C++
// SYNTAX
SPI.end();
{{#if has-multiple-spi}}
SPI1.end();
{{#if electron}}
SPI2.end();
{{/if}}
{{/if}}
```

### setBitOrder()

Sets the order of the bits shifted out of and into the SPI bus, either LSBFIRST (least-significant bit first) or MSBFIRST (most-significant bit first).

```C++
// SYNTAX
SPI.setBitOrder(order);
{{#if has-multiple-spi}}
SPI1.setBitOrder(order);
{{#if electron}}
SPI2.setBitOrder(order);
{{/if}}
{{/if}}
```

Where, the parameter `order` can either be `LSBFIRST` or `MSBFIRST`.

### setClockSpeed

Sets the SPI clock speed. The value can be specified as a direct value, or as
as a value plus a multiplier.


```C++
// SYNTAX
SPI.setClockSpeed(value, scale);
SPI.setClockSpeed(frequency);
{{#if has-multiple-spi}}
SPI1.setClockSpeed(value, scale);
SPI1.setClockSpeed(frequency);
{{#if electron}}
SPI2.setClockSpeed(value, scale);
SPI2.setClockSpeed(frequency);
{{/if}}
{{/if}}
```

```
// EXAMPLE
// Set the clock speed as close to 15MHz (but not over)
SPI.setClockSpeed(15, MHZ);
SPI.setClockSpeed(15000000);
```

The clock speed cannot be set to any arbitrary value, but is set internally by using a
divider (see `SPI.setClockDivider()`) that gives the highest clock speed not greater
than the one specified.

This method can make writing portable code easier, since it specifies the clock speed
absolutely, giving comparable results across devices. In contrast, specifying
the clock speed using dividers is typically not portable since is dependent upon the system clock speed.

{{#if raspberry-pi}}
On the Raspberry Pi, the default SPI clock is 4 MHz.
{{/if}}

{{#if has-nrf52}}
Gen 3 devices (Argon, Boron, and Xenon) support SPI speeds up to 32 MHz on SPI and 8 MHz on SPI1.
{{/if}}


### setClockDividerReference

This function aims to ease porting code from other platforms by setting the clock speed that
`SPI.setClockDivider` is relative to.

For example, when porting an Arduino SPI library, each to `SPI.setClockDivider()` would
need to be changed to reflect the system clock speed of the device being used.

This can be avoided by placing a call to `SPI.setClockDividerReference()` before the other SPI calls.

```cpp

// setting divider reference

// place this early in the library code
SPI.setClockDividerReference(SPI_CLK_ARDUINO);

// then all following calls to setClockDivider() will give comparable clock speeds
// to running on the Arduino Uno

// sets the clock to as close to 4MHz without going over.
SPI.setClockDivider(SPI_CLK_DIV4);
```

The default clock divider reference is the system clock.
{{#if core}}
On the Core, this is 72 MHz.
{{else}}
{{#if raspberry-pi}}
On the Raspberry Pi, this is 64 MHz.
{{else}}
{{#if has-stm32}}
On the Photon and Electron, the system clock speeds are:
- SPI - 60 MHz
- SPI1 - 30 MHz
{{/if}}
{{#if has-nrf52}}
On Gen 3 devices (Argon, Boron, Xenon), system clock speed is 64 MHz.
{{/if}} {{!-- has-nrf52 --}}
{{/if}} {{!-- else raspberry-pi --}}
{{/if}} {{!-- else core --}}



### setClockDivider()

Sets the SPI clock divider relative to the selected clock reference. The available dividers  are 2, 4, 8, 16, 32, 64, 128 or 256. The default setting is SPI_CLOCK_DIV4, which sets the SPI clock to one-quarter the frequency of the system clock.

```C++
// SYNTAX
SPI.setClockDivider(divider);
{{#if has-multiple-spi}}
SPI1.setClockDivider(divider);
{{#if electron}}
SPI2.setClockDivider(divider);
{{/if}}
{{/if}}
```
Where the parameter, `divider` can be:

 - `SPI_CLOCK_DIV2`
 - `SPI_CLOCK_DIV4`
 - `SPI_CLOCK_DIV8`
 - `SPI_CLOCK_DIV16`
 - `SPI_CLOCK_DIV32`
 - `SPI_CLOCK_DIV64`
 - `SPI_CLOCK_DIV128`
 - `SPI_CLOCK_DIV256`

The clock reference varies depending on the device.

{{#if core}}
On the Core, the clock reference is 72 MHz.
{{else}}
{{#if raspberry-pi}}
On the Raspberry Pi, the clock reference is 64 MHz.
{{else}}
{{#if has-stm32}}
On the Photon and Electron, the clock reference is 120 MHz.
{{/if}}
{{#if has-nrf52}}
On Gen 3 devices (Argon, Boron, Xenon), the clock reference is 64 MHz.
{{/if}} {{!-- has-nrf52 --}}
{{/if}} {{!-- else raspberry-pi --}}
{{/if}} {{!-- else core --}}



### setDataMode()

Sets the SPI data mode: that is, clock polarity and phase. See the [Wikipedia article on SPI](http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus) for details.

```C++
// SYNTAX
SPI.setDataMode(mode);
{{#if has-multiple-spi}}
SPI1.setDataMode(mode);
{{#if electron}}
SPI2.setDataMode(mode);
{{/if}}
{{/if}}
```
Where the parameter, `mode` can be:

 - `SPI_MODE0`
 - `SPI_MODE1`
 - `SPI_MODE2`
 - `SPI_MODE3`

### transfer()

Transfers one byte over the SPI bus, both sending and receiving.

```C++
// SYNTAX
SPI.transfer(val);
{{#if has-multiple-spi}}
SPI1.transfer(val);
{{#if electron}}
SPI2.transfer(val);
{{/if}}
{{/if}}
```
Where the parameter `val`, can is the byte to send out over the SPI bus.

{{#unless core}}
### transfer(void\*, void\*, size_t, std::function)

For transferring a large number of bytes, this form of transfer() uses DMA to speed up SPI data transfer and at the same time allows you to run code in parallel to the data transmission. The function initializes, configures and enables the DMA peripheral’s channel and stream for the selected SPI peripheral for both outgoing and incoming data and initiates the data transfer. If a user callback function is passed then it will be called after completion of the DMA transfer. This results in asynchronous filling of RX buffer after which the DMA transfer is disabled till the transfer function is called again. If NULL is passed as a callback then the result is synchronous i.e. the function will only return once the DMA transfer is complete.

**Note**: The SPI protocol is based on a one byte OUT / one byte IN interface. For every byte expected to be received, one (dummy, typically 0x00 or 0xFF) byte must be sent.

```C++
// SYNTAX
SPI.transfer(tx_buffer, rx_buffer, length, myFunction);
{{#if has-multiple-spi}}
SPI1.transfer(tx_buffer, rx_buffer, length, myFunction);
{{#if electron}}
SPI2.transfer(tx_buffer, rx_buffer, length, myFunction);
{{/if}}
{{/if}}
```

Parameters:

- `tx_buffer`: array of Tx bytes that is filled by the user before starting the SPI transfer. If `NULL`, default dummy 0xFF bytes will be clocked out.
- `rx_buffer`: array of Rx bytes that will be filled by the slave during the SPI transfer. If `NULL`, the received data will be discarded.
- `length`: number of data bytes that are to be transferred
- `myFunction`: user specified function callback to be called after completion of the SPI DMA transfer. It takes no argument and returns nothing, e.g.: `void myHandler()`

NOTE: `tx_buffer` and `rx_buffer` sizes MUST be identical (of size `length`)

_Since 0.5.0_ When SPI peripheral is configured in slave mode, the transfer will be canceled when the master deselects this slave device. The user application can check the actual number of bytes received/transmitted by calling `available()`.

### transferCancel()

{{since when="0.5.0"}}

Aborts the configured DMA transfer and disables the DMA peripheral’s channel and stream for the selected SPI peripheral for both outgoing and incoming data.

**Note**: The user specified SPI DMA transfer completion function will still be called to indicate the end of DMA transfer. The user application can check the actual number of bytes received/transmitted by calling `available()`.

### onSelect()

{{since when="0.5.0"}}

Registers a function to be called when the SPI master selects or deselects this slave device by pulling configured slave-select pin low (selected) or high (deselected).

{{#if has-nrf52}}
On Gen 3 devices (Argon, Boron, and Xenon), SPI slave can only be used on SPI1.
{{/if}} {{!-- has-nrf52 --}}

```C++
// SYNTAX
SPI.onSelect(myFunction);
{{#if has-multiple-spi}}
SPI1.onSelect(myFunction);
{{#if electron}}
SPI2.onSelect(myFunction);
{{/if}}
{{/if}}

void myFunction(uint8_t state) {
  // called when selected or deselected
}
```

Parameters: `handler`: the function to be called when the slave is selected or deselected; this should take a single uint8_t parameter (the current state: `1` - selected, `0` - deselected) and return nothing, e.g.: `void myHandler(uint8_t state)`

{{#if has-stm32}}
```C++
// SPI slave example
static uint8_t rx_buffer[64];
static uint8_t tx_buffer[64];
static uint32_t select_state = 0x00;
static uint32_t transfer_state = 0x00;

void onTransferFinished() {
    transfer_state = 1;
}

void onSelect(uint8_t state) {
    if (state)
        select_state = state;
}

/* executes once at startup */
void setup() {
    Serial.begin(9600);
    for (int i = 0; i < sizeof(tx_buffer); i++)
      tx_buffer[i] = (uint8_t)i;
    SPI.onSelect(onSelect);
    SPI.begin(SPI_MODE_SLAVE, A2);
}

/* executes continuously after setup() runs */
void loop() {
    while (1) {
        while(select_state == 0);
        select_state = 0;

        transfer_state = 0;
        SPI.transfer(tx_buffer, rx_buffer, sizeof(rx_buffer), onTransferFinished);
        while(transfer_state == 0);
        if (SPI.available() > 0) {
            Serial.printf("Received %d bytes", SPI.available());
            Serial.println();
            for (int i = 0; i < SPI.available(); i++) {
                Serial.printf("%02x ", rx_buffer[i]);
            }
            Serial.println();
        }
    }
}
```
{{/if}} {{!-- has-stm32 --}}

{{#if has-nrf52}}
```C++
// SPI slave example
static uint8_t rx_buffer[64];
static uint8_t tx_buffer[64];
static uint32_t select_state = 0x00;
static uint32_t transfer_state = 0x00;

void onTransferFinished() {
    transfer_state = 1;
}

void onSelect(uint8_t state) {
    if (state)
        select_state = state;
}

/* executes once at startup */
void setup() {
    Serial.begin(9600);
    for (int i = 0; i < sizeof(tx_buffer); i++)
      tx_buffer[i] = (uint8_t)i;
    SPI1.onSelect(onSelect);
    SPI1.begin(SPI_MODE_SLAVE, A5);
}

/* executes continuously after setup() runs */
void loop() {
    while (1) {
        while(select_state == 0);
        select_state = 0;

        transfer_state = 0;
        SPI1.transfer(tx_buffer, rx_buffer, sizeof(rx_buffer), onTransferFinished);
        while(transfer_state == 0);
        if (SPI1.available() > 0) {
            Serial.printf("Received %d bytes", SPI.available());
            Serial.println();
            for (int i = 0; i < SPI.available(); i++) {
                Serial.printf("%02x ", rx_buffer[i]);
            }
            Serial.println();
        }
    }
}
```
{{/if}} {{!-- has-nrf52 --}}

### available()

{{since when="0.5.0"}}

Returns the number of bytes available for reading in the `rx_buffer` supplied in `transfer()`. In general, returns the actual number of bytes received/transmitted during the ongoing or finished DMA transfer.

```C++
// SYNTAX
SPI.available();
```

Returns the number of bytes available.

{{/unless}} {{!-- core --}}

{{#if has-spi-settings}}
### SPISettings

{{since when="0.6.2"}}

The `__SPISettings` object specifies the SPI peripheral settings. This object can be used with [`beginTransaction()`](#begintransaction-) function and can replace separate calls to [`setClockSpeed()`](#setclockspeed), [`setBitOrder()`](#setbitorder-) and [`setDataMode()`](#setdatamode-).

**Note:** Either `SPISettings()` (_Since 0.6.1_) or `__SPISettings()` (_Since 0.6.2_) may be used **with** `#include "Arduino.h"`
`__SPISettings()` should be used **without** `#include "Arduino.h"`

```C++
// SYNTAX
SPI.beginTransaction(__SPISettings(4*MHZ, MSBFIRST, SPI_MODE0));
// Pre-declared __SPISettings object
__SPISettings settings(4*MHZ, MSBFIRST, SPI_MODE0);
SPI.beginTransaction(settings);

{{#if has-multiple-spi}}
SPI1.beginTransaction(__SPISettings(4*MHZ, MSBFIRST, SPI_MODE3));
{{#if electron}}
SPI2.beginTransaction(__SPISettings(1*MHZ, LSBFIRST, SPI_MODE3));
{{/if}}
{{/if}}
```

Parameters:
- `clockSpeed`: maximum SPI clock speed (see [`setClockSpeed()`](#setclockspeed))
- `bitOrder`: bit order of the bits shifted out of and into the SPI bus, either `LSBFIRST` (least significant bit first) or `MSBFIRST` (most-significant bit first)
- `dataMode`: `SPI_MODE0`, `SPI_MODE1`, `SPI_MODE2` or `SPI_MODE3` (see [`setDataMode()`](#setdatamode-))

### beginTransaction()

{{since when="0.6.1"}}

Reconfigures the SPI peripheral with the supplied settings (see [`SPISettings`](#spisettings) documentation).

{{#if has-threading}}
In addition to reconfiguring the SPI peripheral, `beginTransaction()` also acquires the SPI peripheral lock, blocking other threads from using the selected SPI peripheral until [`endTransaction()`](#endtransaction-) is called. See [Synchronizing Access to Shared System Resources](#synchronizing-access-to-shared-system-resources) section for additional information on shared resource locks.

{{/if}} {{!-- has-threading --}}

```C++
// SYNTAX
SPI.beginTransaction(__SPISettings(4*MHZ, MSBFIRST, SPI_MODE0));
// Pre-declared __SPISettings object
SPI.beginTransaction(settings);

{{#if has-multiple-spi}}
SPI1.beginTransaction(__SPISettings(4*MHZ, MSBFIRST, SPI_MODE3));
{{#if electron}}
SPI2.beginTransaction(__SPISettings(1*MHZ, LSBFIRST, SPI_MODE3));
{{/if}}
{{/if}}
```

Parameters:
- `settings`: [`SPISettings`](#spisettings) object with chosen settings

Returns: Negative integer in case of an error.

### endTransaction()

{{since when="0.6.1"}}

Releases the SPI peripheral.

{{#if core}}
**NOTE:** This function does nothing on {{device}}.
{{/if}} {{!-- core --}}

{{#if has-threading}}
This function releases the SPI peripheral lock, allowing other threads to use it. See [Synchronizing Access to Shared System Resources](#synchronizing-access-to-shared-system-resources) section for additional information on shared resource locks.

{{/if}} {{!-- has-threading --}}

```C++
// SYNTAX
SPI.endTransaction();
{{#if has-multiple-spi}}
SPI1.endTransaction();
{{#if electron}}
SPI2.endTransaction();
{{/if}}
{{/if}}
```

Returns: Negative integer in case of an error.

{{/if}} {{!-- has-spi-settings --}}

{{/if}} {{!-- has-spi --}}

{{#if has-i2c}}

Wire (I2C)
----

{{#if core}}
![I2C](/assets/images/core-pin-i2c.jpg)
{{/if}}

This library allows you to communicate with I2C / TWI (Two Wire Interface) devices.

{{#if has-embedded}}

{{#if has-stm32}}
On the Core/Photon/Electron, D0 is the Serial Data Line (SDA) and D1 is the Serial Clock (SCL). {{#if electron}}Additionally on the Electron, there is an alternate pin location for the I2C interface: C4 is the Serial Data Line (SDA) and C5 is the Serial Clock (SCL).{{/if}} Both SCL and SDA pins are open-drain outputs that only pull LOW and typically operate with 3.3V logic, but are tolerant to 5V. Connect a pull-up resistor(1.5k to 10k) on the SDA line to 3V3. Connect a pull-up resistor(1.5k to 10k) on the SCL line to 3V3.  If you are using a breakout board with an I2C peripheral, check to see if it already incorporates pull-up resistors.
{{/if}} {{!-- has-stm32 --}}

{{#if has-nrf52}}
On the Argon/Boron/Xenon, D0 is the Serial Data Line (SDA) and D1 is the Serial Clock (SCL). Additionally, there is a second optional I2C interface on D2 and D3 on the Argon and Xenon only.

Both SCL and SDA pins are open-drain outputs that only pull LOW and typically operate with 3.3V logic. Connect a pull-up resistor(1.5k to 10k) on the SDA line to 3V3. Connect a pull-up resistor(1.5k to 10k) on the SCL line to 3V3.  If you are using a breakout board with an I2C peripheral, check to see if it already incorporates pull-up resistors.

Note that unlike the Gen 1 (Core) and Gen 2 devices (Photon/P1/Electron), Gen 3 devices are not 5V tolerant.
{{/if}} {{!-- has-nrf52 --}}


These pins are used via the `Wire` object.

* `SCL` => `D1`
* `SDA` => `D0`

{{#if has-i2c-wire1}}

{{#if electron}}
Additionally on the Electron, there is an alternate pin location for the I2C interface, which can
be used via the `Wire1` object. This alternate location is mapped as follows:
* `SCL` => `C5`
* `SDA` => `C4`
Note that you cannot use both Wire and Wire1. These are merely alternative pin locations for a 
single hardware I2C port.
{{/if}}
{{#if has-nrf52}}
Additionally, on the Argon and Xenon, there a second I2C port that can be used with the `Wire1` object:
* `SCL` => `D3`
* `SDA` => `D2` 
{{/if}}

**Note**: Because there are multiple I2C locations available, be sure to use the same `Wire` or `Wire1` object with all associated functions. 
For example, do not use `Wire.begin()` with `Wire1.write()`.

{{/if}}

{{/if}} {{!-- has-embedded --}}

{{#if raspberry-pi}}
There are dedicated pins for I2C on the Raspberry Pi: Serial Data Line (SDA) and Serial Clock (SCL). [See the pin out diagram](/datasheets/raspberrypi-datasheet#pin-out-diagram) to find out where pins are located.

**Note**: Before using the I2C interface on the Raspberry Pi, you have to enable it in hardware. In a terminal, type `sudo raspi-config`, go to `Advanced Options`, select `I2C` and answer `Yes` to enable it. Reboot the Raspberry Pi before flashing firmware that uses the I2C peripheral.

It is not recommended to use the I2C pins for general purpose IO. If you need to, you must disable the I2C peripheral in `raspi-config`, reboot and use the `SCL` and `SDA` pins with `pinMode`, `digitalRead` or `digitalWrite`.
{{/if}} {{!-- raspberry-pi --}}

{{#if has-embedded}}

### setSpeed()

Sets the I2C clock speed. This is an optional call (not from the original Arduino specs.) and must be called once before calling begin().  The default I2C clock speed is 100KHz and the maximum clock speed is 400KHz.

```C++
// SYNTAX
Wire.setSpeed(clockSpeed);
Wire.begin();
```

Parameters:

- `clockSpeed`: CLOCK_SPEED_100KHZ, CLOCK_SPEED_400KHZ or a user specified speed in hertz (e.g. `Wire.setSpeed(20000)` for 20kHz)

### stretchClock()

Enables or Disables I2C clock stretching. This is an optional call (not from the original Arduino specs.) and must be called once before calling begin(). I2C clock stretching is only used with I2C Slave mode. The default I2C clock stretching mode is enabled.

```C++
// SYNTAX
Wire.stretchClock(stretch);
Wire.begin(4); // I2C Slave mode, address #4
```

Parameters:

- `stretch`: boolean. `true` will enable clock stretching (default). `false` will disable clock stretching.

{{/if}} {{!-- has-embedded --}}

### begin()

Initiate the Wire library and join the I2C bus as a master{{#if has-i2c-slave}} or slave{{/if}}. This should normally be called only once.

```C++
// SYNTAX
Wire.begin();
{{#if has-i2c-slave}}
Wire.begin(address);
{{/if}} {{!-- has-i2c-slave --}}
```

{{#if has-i2c-slave}}
Parameters: `address`: the 7-bit slave address (optional); if not specified, join the bus as an I2C master.  If address is specified, join the bus as an I2C slave.
{{/if}} {{!-- has-i2c-slave --}}


### end()

{{since when="0.4.6"}}

Releases the I2C bus so that the pins used by the I2C bus are available for general purpose I/O.

### isEnabled()

Used to check if the Wire library is enabled already.  Useful if using multiple slave devices on the same I2C bus.  Check if enabled before calling Wire.begin() again.

```C++
// SYNTAX
Wire.isEnabled();
```

Returns: boolean `true` if I2C enabled, `false` if I2C disabled.

```C++
// EXAMPLE USAGE

// Initialize the I2C bus if not already enabled
if (!Wire.isEnabled()) {
    Wire.begin();
}
```

### requestFrom()

Used by the master to request bytes from a slave device. The bytes may then be retrieved with the `available()` and `read()` functions.

```C++
// SYNTAX
Wire.requestFrom(address, quantity);
Wire.requestFrom(address, quantity, stop);
```

Parameters:

- `address`: the 7-bit address of the device to request bytes from
- `quantity`: the number of bytes to request (Max. 32)
- `stop`: boolean. `true` will send a stop message after the request, releasing the bus. `false` will continually send a restart after the request, keeping the connection active. The bus will not be released, which prevents another master device from transmitting between messages. This allows one master device to send multiple transmissions while in control.  If no argument is specified, the default value is `true`.

Returns: `byte` : the number of bytes returned from the slave device.  If a timeout occurs, will return `0`.

{{#if has-embedded}}

### reset()

{{since when="0.4.6"}}

Attempts to reset the I2C bus. This should be called only if the I2C bus has
has hung. In 0.4.6 additional rework was done for the I2C bus on the Photon and Electron, so
we hope this function isn't required, and it's provided for completeness.

{{/if}} {{!-- has-embedded --}}

### beginTransmission()

Begin a transmission to the I2C slave device with the given address. Subsequently, queue bytes for transmission with the `write()` function and transmit them by calling `endTransmission()`.

```C++
// SYNTAX
Wire.beginTransmission(address);
```

Parameters: `address`: the 7-bit address of the device to transmit to.

### endTransmission()

Ends a transmission to a slave device that was begun by `beginTransmission()` and transmits the bytes that were queued by `write()`.


```C++
// SYNTAX
Wire.endTransmission();
Wire.endTransmission(stop);
```

Parameters: `stop` : boolean.
`true` will send a stop message after the last byte, releasing the bus after transmission. `false` will send a restart, keeping the connection active. The bus will not be released, which prevents another master device from transmitting between messages. This allows one master device to send multiple transmissions while in control.  If no argument is specified, the default value is `true`.

Returns: `byte`, which indicates the status of the transmission:

- 0: success
- 1: busy timeout upon entering endTransmission()
- 2: START bit generation timeout
- 3: end of address transmission timeout
- 4: data byte transfer timeout
- 5: data byte transfer succeeded, busy timeout immediately after

### write()

Queues bytes for transmission from a master to slave device (in-between calls to `beginTransmission()` and `endTransmission()`){{#if has-i2c-slave}}, or writes data from a slave device in response to a request from a master{{/if}}. Buffer size is truncated to 32 bytes; writing bytes beyond 32 before calling endTransmission() will be ignored.

```C++
// SYNTAX
Wire.write(value);
Wire.write(string);
Wire.write(data, length);
```
Parameters:

- `value`: a value to send as a single byte
- `string`: a string to send as a series of bytes
- `data`: an array of data to send as bytes
- `length`: the number of bytes to transmit (Max. 32)

Returns:  `byte`

`write()` will return the number of bytes written, though reading that number is optional.

```C++
// EXAMPLE USAGE

// Master Writer running on Device No.1 (Use with corresponding Slave Reader running on Device No.2)

void setup() {
  Wire.begin();              // join i2c bus as master
}

byte x = 0;

void loop() {
  Wire.beginTransmission(4); // transmit to slave device #4
  Wire.write("x is ");       // sends five bytes
  Wire.write(x);             // sends one byte
  Wire.endTransmission();    // stop transmitting

  x++;
  delay(500);
}
```

### available()

Returns the number of bytes available for retrieval with `read()`. This should be called on a master device after a call to `requestFrom()`{{#if has-i2c-slave}} or on a slave inside the `onReceive()` handler{{/if}}.

```C++
Wire.available();
```

Returns: The number of bytes available for reading.

### read()

Reads a byte that was transmitted from a slave device to a master after a call to `requestFrom()`{{#if has-i2c-slave}} or was transmitted from a master to a slave{{/if}}. `read()` inherits from the `Stream` utility class.

```C++
// SYNTAX
Wire.read() ;
```

Returns: The next byte received

```C++
// EXAMPLE USAGE

// Master Reader running on Device No.1 (Use with corresponding Slave Writer running on Device No.2)

void setup() {
  Wire.begin();              // join i2c bus as master
  Serial.begin(9600);        // start serial for output
}

void loop() {
  Wire.requestFrom(2, 6);    // request 6 bytes from slave device #2

  while(Wire.available()){   // slave may send less than requested
    char c = Wire.read();    // receive a byte as character
    Serial.print(c);         // print the character
  }

  delay(500);
}
```

### peek()

Similar in use to read(). Reads (but does not remove from the buffer) a byte that was transmitted from a slave device to a master after a call to `requestFrom()`{{#if has-i2c-slave}} or was transmitted from a master to a slave{{/if}}. `read()` inherits from the `Stream` utility class. Useful for peeking at the next byte to be read.

```C++
// SYNTAX
Wire.peek();
```

Returns: The next byte received (without removing it from the buffer)

{{#if has-i2c-slave}}

### onReceive()

Registers a function to be called when a slave device receives a transmission from a master.

Parameters: `handler`: the function to be called when the slave receives data; this should take a single int parameter (the number of bytes read from the master) and return nothing, e.g.: `void myHandler(int numBytes) `

**Note:** This handler will lock up the device if System calls such as Particle.publish() are made within, due to interrupts being disabled for atomic operations during this handler.  Do not overload this handler with extra function calls other than what is immediately required to receive I2C data.  Post process outside of this handler.

```C++
// EXAMPLE USAGE

// Slave Reader running on Device No.2 (Use with corresponding Master Writer running on Device No.1)

// function that executes whenever data is received from master
// this function is registered as an event, see setup()
void receiveEvent(int howMany) {
  while(1 < Wire.available()) { // loop through all but the last
    char c = Wire.read();       // receive byte as a character
    Serial.print(c);            // print the character
  }
  int x = Wire.read();          // receive byte as an integer
  Serial.println(x);            // print the integer
}

void setup() {
  Wire.begin(4);                // join i2c bus with address #4
  Wire.onReceive(receiveEvent); // register event
  Serial.begin(9600);           // start serial for output
}

void loop() {
  delay(100);
}
```

### onRequest()

Register a function to be called when a master requests data from this slave device.

Parameters: `handler`: the function to be called, takes no parameters and returns nothing, e.g.: `void myHandler() `

**Note:** This handler will lock up the device if System calls such as Particle.publish() are made within, due to interrupts being disabled for atomic operations during this handler.  Do not overload this handler with extra function calls other than what is immediately required to send I2C data.  Post process outside of this handler.

```C++
// EXAMPLE USAGE

// Slave Writer running on Device No.2 (Use with corresponding Master Reader running on Device No.1)

// function that executes whenever data is requested by master
// this function is registered as an event, see setup()
void requestEvent() {
  Wire.write("hello ");         // respond with message of 6 bytes as expected by master
}

void setup() {
  Wire.begin(2);                // join i2c bus with address #2
  Wire.onRequest(requestEvent); // register event
}

void loop() {
  delay(100);
}
```
{{/if}} {{!-- has-i2c-slave --}}

{{/if}} {{!-- has-i2c --}}

{{#if has-can}}

## CAN (CANbus)

![CAN bus](/assets/images/can.png)

{{since when="0.4.9"}}

<a href="https://en.wikipedia.org/wiki/CAN_bus" target="_blank">Controller area network (CAN bus)</a> is a bus used in most automobiles, as well as some industrial equipment, for communication between different microcontrollers.

The Photon and Electron support communicating with CAN devices via the CAN bus.

- The Photon and Electron have a CANbus on pins D1 (CAN2_TX) and D2 (CAN2_RX).
- The Electron only, has a second CANbus on pins C4 (CAN1_TX) and C5 (CAN1_RX).

**Note**: an additional CAN transceiver integrated circuit is needed to convert the logic-level voltages of the Photon or Electron to the voltage levels of the CAN bus.

On the Photon or Electron, connect pin D1 to the TX pin of the CAN transceiver and pin D2 to the RX pin.

On the Electron only, connect pin C4 to the TX pin of the CAN transceiver and pin C5 to the RX pin.

```
// EXAMPLE USAGE on pins D1 & D2
CANChannel can(CAN_D1_D2);

void setup() {
    can.begin(125000); // pick the baud rate for your network
    // accept one message. If no filter added by user then accept all messages
    can.addFilter(0x100, 0x7FF);
}

void loop() {
    CANMessage message;

    message.id = 0x100;
    can.transmit(message);

    delay(10);

    if(can.receive(message)) {
        // message received
    }
}
```

### CANMessage

The CAN message struct has these members:

```
struct CANMessage
{
   uint32_t id;
   bool     extended;
   bool     rtr;
   uint8_t  len;
   uint8_t  data[8];
}
```

### CANChannel

Create a `CANChannel` global object to connect to a CAN bus on the specified pins.

```C++
// SYNTAX
CANChannel can(pins, rxQueueSize, txQueueSize);
```

Parameters:

- `pins`: the Photon and Electron support pins `CAN_D1_D2`, and the Electron only, supports pins `CAN_C4_C5`
- `rxQueueSize` (optional): the receive queue size (default 32 message)
- `txQueueSize` (optional): the transmit queue size (default 32 message)

```C++
// EXAMPLE
CANChannel can(CAN_D1_D2);
// Buffer 10 received messages and 5 transmitted messages
CANChannel can(CAN_D1_D2, 10, 5);
```

### begin()

Joins the bus at the given `baud` rate.

```C++
// SYNTAX
can.begin(baud, flags);
```

Parameters:

- `baud`: common baud rates are 50000, 100000, 125000, 250000, 500000, 1000000
- `flags` (optional): `CAN_TEST_MODE` to run the CAN bus in test mode where every transmitted message will be received back

```C++
// EXAMPLE
CANChannel can(CAN_D1_D2);
can.begin(500000);
// Use for testing without a CAN transceiver
can.begin(500000, CAN_TEST_MODE);
```

### end()

Disconnect from the bus.

```
// SYNTAX
CANChannel can(CAN_D1_D2);
can.end();
```

### available()

The number of received messages waiting in the receive queue.

Returns: `uint8_t` : the number of messages.

```
// SYNTAX
uint8_t count = can.available();
```

```
// EXAMPLE
CANChannel can(CAN_D1_D2);
if(can.available() > 0) {
  // there are messages waiting
}
```

### receive()

Take a received message from the receive queue. This function does not wait for a message to arrive.

```
// SYNTAX
can.receive(message);
```

Parameters:

- `message`: where the received message will be copied

Returns: boolean `true` if a message was received, `false` if the receive queue was empty.

```
// EXAMPLE
CANChannel can(CAN_D1_D2);
CANMessage message;
if(can.receive(message)) {
  Serial.println(message.id);
  Serial.println(message.len);
}
```

### transmit()

Add a message to the queue to be transmitted to the CAN bus as soon as possible.

```
// SYNTAX
can.transmit(message);
```

Parameters:

- `message`: the message to be transmitted

Returns: boolean `true` if the message was added to the queue, `false` if the transmit queue was full.

```
// EXAMPLE
CANChannel can(CAN_D1_D2);
CANMessage message;
message.id = 0x100;
message.len = 1;
message.data[0] = 42;
can.transmit(message);
```

**Note**: Since the CAN bus requires at least one other CAN node to acknowledge transmitted messages if the Photon or Electron is alone on the bus (such as when using a CAN shield with no other CAN node connected) then messages will never be transmitted and the transmit queue will fill up.

### addFilter()

Filter which messages will be added to the receive queue.

```
// SYNTAX
can.addFilter(id, mask);
can.addFilter(id, mask, type);
```

By default all messages are received. When filters are added, only messages matching the filters will be received. Others will be discarded.

Parameters:

- `id`: the id pattern to match
- `mask`: the mask pattern to match
- `type` (optional): `CAN_FILTER_STANDARD` (default) or `CAN_FILTER_EXTENDED`

Returns: boolean `true` if the filter was added, `false` if there are too many filters (14 filters max).

```
// EXAMPLES
CANChannel can(CAN_D1_D2);
// Match only message ID 0x100
can.addFilter(0x100, 0x7FF);
// Match any message with the highest ID bit set
can.addFilter(0x400, 0x400);
// Match any message with the higest ID bit cleared
can.addFilter(0x0, 0x400);
// Match only messages with extended IDs
can.addFilter(0, 0, CAN_FILTER_EXTENDED);
```

### clearFilters()

Clear filters and accept all messages.

```
// SYNTAX
CANChannel can(CAN_D1_D2);
can.clearFilters();
```

### isEnabled()

Used to check if the CAN bus is enabled already.  Check if enabled before calling can.begin() again.

```
// SYNTAX
CANChannel can(CAN_D1_D2);
can.isEnabled();
```

Returns: boolean `true` if the CAN bus is enabled, `false` if the CAN bus is disabled.

### errorStatus()

Get the current error status of the CAN bus.

```
// SYNTAX
int status = can.errorStatus();
```

Returns: int `CAN_NO_ERROR` when everything is ok, `CAN_ERROR_PASSIVE` when not attempting to transmit messages but still acknowledging messages, `CAN_BUS_OFF` when not transmitting or acknowledging messages.

```
// EXAMPLE
CANChannel can(CAN_D1_D2);
if(can.errorStatus() == CAN_BUS_OFF) {
  Serial.println("Not properly connected to CAN bus");
}
```

This value is only updated when attempting to transmit messages.

The two most common causes of error are: being alone on the bus (such as when using a CAN shield not connected to anything) or using the wrong baud rate. Attempting to transmit in those situations will result in `CAN_BUS_OFF`.

Errors heal automatically when properly communicating with other microcontrollers on the CAN bus.

{{/if}} {{!-- has-can --}}

## IPAddress

Creates an IP address that can be used with TCPServer, TCPClient, and UDP objects.

```C++
// EXAMPLE USAGE

IPAddress localIP;
IPAddress server(8,8,8,8);
IPAddress IPfromInt( 167772162UL );  // 10.0.0.2 as 10*256^3+0*256^2+0*256+2
uint8_t server[] = { 10, 0, 0, 2};
IPAddress IPfromBytes( server );
```

The IPAddress also allows for comparisons.

```C++
if (IPfromInt == IPfromBytes)
{
  Serial.println("Same IP addresses");
}
```

You can also use indexing the get or change individual bytes in the IP address.

```C++
// PING ALL HOSTS ON YOUR SUBNET EXCEPT YOURSELF
IPAddress localIP = WiFi.localIP();
uint8_t myLastAddrByte = localIP[3];
for(uint8_t ipRange=1; ipRange<255; ipRange++)
{
  if (ipRange != myLastAddrByte)
  {
    localIP[3] = ipRange;
    WiFi.ping(localIP);
  }
}
```

You can also assign to an IPAddress from an array of uint8's or a 32-bit unsigned integer.

```C++
IPAddress IPfromInt;  // 10.0.0.2 as 10*256^3+0*256^2+0*256+2
IPfromInt = 167772162UL;
uint8_t server[] = { 10, 0, 0, 2};
IPAddress IPfromBytes;
IPfromBytes = server;
```

Finally IPAddress can be used directly with print.

```C++
// PRINT THE DEVICE'S IP ADDRESS IN
// THE FORMAT 192.168.0.10
IPAddress myIP = WiFi.localIP();
Serial.println(myIP);    // prints the device's IP address
```

{{#if has-tcpserver}}
## TCPServer

Create a server that listens for incoming connections on the specified port.

{{#if has-mesh}}
The TCPServer can only be used on a Wi-Fi or Ethernet mesh gateway, including the Argon and the Xenon when used in an Ethernet shield. 
The Thread mesh network does not support TCP across the mesh network; it only supports UDP from nodes that are only on mesh. 
{{/if}}

```C++
// SYNTAX
TCPServer server = TCPServer(port);
```

Parameters: `port`: the port to listen on (`int`)

```C++
// EXAMPLE USAGE

// telnet defaults to port 23
TCPServer server = TCPServer(23);
TCPClient client;

void setup()
{
  // start listening for clients
  server.begin();

  // Make sure your Serial Terminal app is closed before powering your device
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  Serial.println(WiFi.localIP());
  Serial.println(WiFi.subnetMask());
  Serial.println(WiFi.gatewayIP());
  Serial.println(WiFi.SSID());
}

void loop()
{
  if (client.connected()) {
    // echo all available bytes back to the client
    while (client.available()) {
      server.write(client.read());
    }
  } else {
    // if no client is yet connected, check for a new connection
    client = server.available();
  }
}
```


### begin()

Tells the server to begin listening for incoming connections.

```C++
// SYNTAX
server.begin();
```

### available()

Gets a client that is connected to the server and has data available for reading. The connection persists when the returned client object goes out of scope; you can close it by calling `client.stop()`.

`available()` inherits from the `Stream` utility class.

### write()

Write data to the last client that connected to a server. This data is sent as a byte or series of bytes. This function is blocking by default and may block the application thread indefinitely until all the data is sent.

_Since 0.7.0_
{{#if photon}}

This function also takes an optional argument `timeout`, which allows the caller to specify the maximum amount of time the function may take. If `timeout` value is specified, write operation may succeed partially and it's up to the caller to check the actual number of bytes written and schedule the next `write()` call in order to send all the data out.
{{/if}}

The application code may additionally check if an error occurred during the last `write()` call by checking [`getWriteError()`](#getwriteerror-) return value. Any non-zero error code indicates and error during write operation.


```C++
// SYNTAX
server.write(val);
server.write(buf, len);
{{#if photon}}
server.write(val, timeout);
server.write(buf, len, timeout);
{{/if}}
```

Parameters:

- `val`: a value to send as a single byte (byte or char)
- `buf`: an array to send as a series of bytes (byte or char)
- `len`: the length of the buffer
{{#if photon}}
- `timeout`: timeout in milliseconds (`0` - non-blocking mode)
{{/if}}

Returns: `size_t`: `write()` returns the number of bytes written.

**NOTE**: `write()` currently may return negative error codes. This behavior will change in the next major release (0.9.0). Applications will be required to use [`getWriteError()`](#getwriteerror-) to check for write errors.

### print()

Print data to the last client connected to a server. Prints numbers as a sequence of digits, each an ASCII character (e.g. the number 123 is sent as the three characters '1', '2', '3').

```C++
// SYNTAX
server.print(data);
server.print(data, BASE) ;
```

Parameters:

- `data`: the data to print (char, byte, int, long, or string)
- `BASE`(optional): the base in which to print numbers: BIN for binary (base 2), DEC for decimal (base 10), OCT for octal (base 8), HEX for hexadecimal (base 16).

Returns:  `byte`:  `print()` will return the number of bytes written, though reading that number is optional

### println()

Print data, followed by a newline, to the last client connected to a server. Prints numbers as a sequence of digits, each an ASCII character (e.g. the number 123 is sent as the three characters '1', '2', '3').

```C++
// SYNTAX
server.println();
server.println(data);
server.println(data, BASE) ;
```

Parameters:

- `data` (optional): the data to print (char, byte, int, long, or string)
- `BASE` (optional): the base in which to print numbers: BIN for binary (base 2), DEC for decimal (base 10), OCT for octal (base 8), HEX for hexadecimal (base 16).

### getWriteError()

Get the error code of the most recent [`write()`](#write--3) operation.

Returns: int `0` when everything is ok, a non-zero error code in case of an error.

This value is updated every after every call to [`write()`](#write--3) or can be manually cleared by  [`clearWriteError()`](#clearwriteerror-)

```C++
// SYNTAX
int err = server.getWriteError();
```

```C++
// EXAMPLE
TCPServer server;
// Write in non-blocking mode to the last client that connected to the server
int bytes = server.write(buf, len, 0);
int err = server.getWriteError();
if (err != 0) {
  Log.trace("TCPServer::write() failed (error = %d), number of bytes written: %d", err, bytes);
}
```

### clearWriteError()

Clears the error code of the most recent [`write()`](#write--3) operation setting it to `0`. This function is automatically called by [`write()`](#write--3).
{{/if}}

{{#if has-tcpclient}}

`clearWriteError()` does not return anything.

## TCPClient

Creates a client which can connect to a specified internet IP address and port (defined in the `client.connect()` function).

{{#if has-mesh}}
The TCPClient can only be used on mesh gateway, including the Argon, Boron, and the Xenon when used in an Ethernet shield. 
The Thread mesh network does not support TCP across the mesh network; it only supports UDP from nodes that are only on mesh. 
{{/if}}

```C++
// SYNTAX
TCPClient client;
```

```C++
// EXAMPLE USAGE

TCPClient client;
byte server[] = { 74, 125, 224, 72 }; // Google
void setup()
{
  // Make sure your Serial Terminal app is closed before powering your device
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  Serial.println("connecting...");

  if (client.connect(server, 80))
  {
    Serial.println("connected");
    client.println("GET /search?q=unicorn HTTP/1.0");
    client.println("Host: www.google.com");
    client.println("Content-Length: 0");
    client.println();
  }
  else
  {
    Serial.println("connection failed");
  }
}

void loop()
{
  if (client.available())
  {
    char c = client.read();
    Serial.print(c);
  }

  if (!client.connected())
  {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    for(;;);
  }
}
```

{{#if has-cellular}}
**Data Usage Warning**

When using a Particle SIM with the {{device}}, be careful interacting with web hosts with `TCPClient` or libraries using `TCPClient`. These can use a lot of data in a short period of time resulting in a higher bill. To keep the data usage low, use [`Particle.publish`](#particle-publish-) along with [webhooks](/tutorials/device-cloud/webhooks).
{{/if}} {{!-- has-cellular --}}

### connected()

Whether or not the client is connected. Note that a client is considered connected if the connection has been closed but there is still unread data.

```C++
// SYNTAX
client.connected();
```

Returns true if the client is connected, false if not.

### status()

Returns true if the network socket is open and the underlying network is ready. 

```C++
// SYNTAX
client.status();
```

This is different than connected() which returns true if the socket is closed but there is still unread buffered data, available() is non-zero.

### connect()

Connects to a specified IP address and port. The return value indicates success or failure. Also supports DNS lookups when using a domain name.

```C++
// SYNTAX
client.connect();
client.connect(ip, port);
client.connect(hostname, port);
```

Parameters:

- `ip`: the IP address that the client will connect to (array of 4 bytes)
- `hostname`: the host name the client will connect to (string, ex.:"particle.io")
- `port`: the port that the client will connect to (`int`)

Returns true if the connection succeeds, false if not.

### write()

Write data to the server the client is connected to. This data is sent as a byte or series of bytes. This function is blocking by default and may block the application thread indefinitely until all the data is sent.

_Since 0.7.0_
{{#if photon}}

This function also takes an optional argument `timeout`, which allows the caller to specify the maximum amount of time the function may take. If `timeout` value is specified, write operation may succeed partially and it's up to the caller to check the actual number of bytes written and schedule the next `write()` call in order to send all the data out.
{{/if}}

The application code may additionally check if an error occurred during the last `write()` call by checking {{#if has-tcpserver}}[`getWriteError()`](#getwriteerror--1){{/if}}{{#if has-no-tcpserver}}[`getWriteError()`](#getwriteerror-){{/if}} return value. Any non-zero error code indicates and error during write operation.


```C++
// SYNTAX
client.write(val);
client.write(buf, len);
{{#if photon}}
client.write(val, timeout);
client.write(buf, len, timeout);
{{/if}}
```

Parameters:

- `val`: a value to send as a single byte (byte or char)
- `buf`: an array to send as a series of bytes (byte or char)
- `len`: the length of the buffer
{{#if photon}}
- `timeout`: timeout in milliseconds (`0` - non-blocking mode)
{{/if}}

Returns: `size_t`: `write()` returns the number of bytes written.

**NOTE**: `write()` currently may return negative error codes. This behavior will change in the next major release (0.9.0). Applications will be required to use {{#if has-tcpserver}}[`getWriteError()`](#getwriteerror--1){{/if}}{{#if has-no-tcpserver}}[`getWriteError()`](#getwriteerror-){{/if}} to check for write errors.

### print()

Print data to the server that a client is connected to. Prints numbers as a sequence of digits, each an ASCII character (e.g. the number 123 is sent as the three characters '1', '2', '3').

```C++
// SYNTAX
client.print(data);
client.print(data, BASE) ;
```

Parameters:

- `data`: the data to print (char, byte, int, long, or string)
- `BASE`(optional): the base in which to print numbers: BIN for binary (base 2), DEC for decimal (base 10), OCT for octal (base 8), HEX for hexadecimal (base 16).

Returns:  `byte`:  `print()` will return the number of bytes written, though reading that number is optional

### println()

Print data, followed by a carriage return and newline, to the server a client is connected to. Prints numbers as a sequence of digits, each an ASCII character (e.g. the number 123 is sent as the three characters '1', '2', '3').

```C++
// SYNTAX
client.println();
client.println(data);
client.println(data, BASE) ;
```

Parameters:

- `data` (optional): the data to print (char, byte, int, long, or string)
- `BASE` (optional): the base in which to print numbers: BIN for binary (base 2), DEC for decimal (base 10), OCT for octal (base 8), HEX for hexadecimal (base 16).

### available()

Returns the number of bytes available for reading (that is, the amount of data that has been written to the client by the server it is connected to).

```C++
// SYNTAX
client.available();
```

Returns the number of bytes available.

### read()
Read the next byte received from the server the client is connected to (after the last call to `read()`).

```C++
// SYNTAX
client.read();
```

Returns the next byte (or character), or -1 if none is available.

or `int read(uint8_t *buffer, size_t size)` reads all readily available bytes up to `size` from the server the client is connected to into the provided `buffer`.

```C++
// SYNTAX
bytesRead = client.read(buffer, length);
```

Returns the number of bytes (or characters) read into `buffer`.

### flush()

Waits until all outgoing data in buffer has been sent.

**NOTE:** That this function does nothing at present.

```C++
// SYNTAX
client.flush();
```

### remoteIP()

{{since when="0.4.5"}}

Retrieves the remote `IPAddress` of a connected `TCPClient`. When the `TCPClient` is retrieved
from `TCPServer.available()` (where the client is a remote client connecting to a local server) the
`IPAddress` gives the remote address of the connecting client.

When `TCPClient` was created directly via `TCPClient.connect()`, then `remoteIP`
returns the remote server the client is connected to.

```C++

// EXAMPLE - TCPClient from TCPServer

TCPServer server(80);
// ...

void setup()
{
    Serial.begin(9600);
    server.begin(80);
}

void loop()
{
    // check for a new client to our server
    TCPClient client = server.available();
    if (client.connected())
    {
        // we got a new client
        // find where the client's remote address
        IPAddress clientIP = client.remoteIP();
        // print the address to Serial
        Serial.println(clientIP);
    }
}
```

```C++
// EXAMPLE - TCPClient.connect()

TCPClient client;
client.connect("www.google.com", 80);
if (client.connected())
{
    IPAddress clientIP = client.remoteIP();
    // IPAddress equals whatever www.google.com resolves to
}

```


### stop()

Disconnect from the server.

```C++
// SYNTAX
client.stop();
```

### getWriteError()

Get the error code of the most recent [`write()`](#write--4) operation.

Returns: int `0` when everything is ok, a non-zero error code in case of an error.


This value is updated every after every call to [`write()`](#write--4) or can be manually cleared by {{#if has-tcpserver}}[`clearWriteError()`](#clearwriteerror--1){{/if}}{{#if has-no-tcpserver}}[`clearWriteError()`](#clearwriteerror-){{/if}}


```C++
// SYNTAX
int err = client.getWriteError();
```

```C++
// EXAMPLE
TCPClient client;
// Write in non-blocking mode
int bytes = client.write(buf, len, 0);
int err = client.getWriteError();
if (err != 0) {
  Log.trace("TCPClient::write() failed (error = %d), number of bytes written: %d", err, bytes);
}
```

### clearWriteError()

Clears the error code of the most recent [`write()`](#write--4) operation setting it to `0`. This function is automatically called by [`write()`](#write--4).

`clearWriteError()` does not return anything.
{{/if}}

## UDP

This class enables UDP messages to be sent and received.

```cpp
// EXAMPLE USAGE

// UDP Port used for two way communication
unsigned int localPort = 8888;

// An UDP instance to let us send and receive packets over UDP
UDP Udp;

void setup() {
  // start the UDP
  Udp.begin(localPort);

  // Print your device IP Address via serial
  Serial.begin(9600);
  Serial.println(WiFi.localIP());
}

void loop() {
  // Check if data has been received
  if (Udp.parsePacket() > 0) {

    // Read first char of data received
    char c = Udp.read();

    // Ignore other chars
    while(Udp.available())
      Udp.read();

    // Store sender ip and port
    IPAddress ipAddress = Udp.remoteIP();
    int port = Udp.remotePort();

    // Echo back data to sender
    Udp.beginPacket(ipAddress, port);
    Udp.write(c);
    Udp.endPacket();
  }
}
```

_Note that UDP does not guarantee that messages are always delivered, or that
they are delivered in the order supplied. In cases where your application
requires a reliable connection, `TCPClient` is a simpler alternative._

{{#if core}}
The UDP protocol implementation has known issues that will require extra consideration when programming with it. Please refer to the Known Issues category of the Community for details. The are also numerous working examples and workarounds in the searchable Community topics.
{{/if}}

There are two primary ways of working with UDP - buffered operation and unbuffered operation.

1. buffered operation allows you to read and write packets in small pieces, since the system takes care of allocating the required buffer to hold the entire packet.
 - to read a buffered packet, call `parsePacket`, then use `available` and `read` to retrieve the packet received
 - to write a buffered packet, optionally call `setBuffer` to set the maximum size of the packet (the default is 512 bytes), followed by
  `beginPacket`, then as many calls to `write`/`print` as necessary to build the packet contents, followed finally by `end` to send the packet over the network.

2. unbuffered operation allows you to read and write entire packets in a single operation - your application is responsible for allocating the buffer to contain the packet to be sent or received over the network.
 - to read an unbuffered packet, call `receivePacket` with a buffer to hold the received packet.
 - to write an unbuffered packet,  call `sendPacket` with the packet buffer to send, and the destination address.


{{#if has-cellular}}
**Data Usage Warning**

When using a Particle SIM with the {{device}}, be careful interacting with web hosts with `UDP` or libraries using `UDP`. These can use a lot of data in a short period of time resulting in a higher bill. To keep the data usage low, use [`Particle.publish`](#particle-publish-) along with [webhooks](/tutorials/device-cloud/webhooks).
{{/if}} {{!-- has-cellular --}}

### begin()

Initializes the UDP library and network settings.

```cpp
// SYNTAX
Udp.begin(port);
```

{{#if has-threading}}

If using [`SYSTEM_THREAD(ENABLED)`](#system-thread), you'll need
to wait until the network is connected before calling `Udp.begin()`.

If you are listening on a specific port, you need to call begin(port) again every time the network is disconnected and reconnects, as well.

```
const int LISTENING_PORT = 8080;

SYSTEM_THREAD(ENABLED);

UDP udp;
bool wasConnected = false;

void setup() {

}

void loop() {
{{#if has-cellular}}
	if (Cellular.ready()) {
{{/if}}
{{#if has-wifi}}
	if (WiFi.ready()) {
{{/if}}

		if (!wasConnected) {
			udp.begin(LISTENING_PORT);
			wasConnected = true;
		}
	}
	else {
		wasConnected = false;
	}
}
```


{{/if}} {{!-- has-threading --}}

### available()

Get the number of bytes (characters) available for reading from the buffer. This is data that's already arrived.

```cpp
// SYNTAX
int count = Udp.available();
```

This function can only be successfully called after `UDP.parsePacket()`.

`available()` inherits from the `Stream` utility class.

Returns the number of bytes available to read.

### beginPacket()

Starts a connection to write UDP data to the remote connection.

```cpp
// SYNTAX
Udp.beginPacket(remoteIP, remotePort);
```

Parameters:

 - `remoteIP`: the IP address of the remote connection (4 bytes)
 - `remotePort`: the port of the remote connection (int)

It returns nothing.

### endPacket()

Called after writing buffered UDP data using `write()` or `print()`. The buffered data is then sent to the
remote UDP peer.


```cpp
// SYNTAX
Udp.endPacket();
```

Parameters: NONE

### write()

Writes UDP data to the buffer - no data is actually sent. Must be wrapped between `beginPacket()` and `endPacket()`. `beginPacket()` initializes the packet of data, it is not sent until `endPacket()` is called.

```cpp
// SYNTAX
Udp.write(message);
Udp.write(buffer, size);
```

Parameters:

 - `message`: the outgoing message (char)
 - `buffer`: an array to send as a series of bytes (byte or char)
 - `size`: the length of the buffer

Returns:

 - `byte`: returns the number of characters sent. This does not have to be read


### receivePacket()

Checks for the presence of a UDP packet and returns the size. Note that it is possible to receive a valid packet of zero bytes, this will still return the sender's address and port after the call to receivePacket().

```cpp
// SYNTAX
size = Udp.receivePacket(buffer, size);
// EXAMPLE USAGE - get a string without buffer copy
UDP Udp;
char message[128];
int port = 8888;
int rxError = 0;

Udp.begin (port);
int count = Udp.receivePacket((byte*)message, 127);
if (count >= 0 && count < 128) {
  message[count] = 0;
  rxError = 0;
} else if (count < -1) {
  rxError = count;
  // need to re-initialize on error
  Udp.begin(port);
}
if (!rxError) {
  Serial.println (message);
}
```

Parameters:
 - `buffer`: the buffer to hold any received bytes (uint8_t).
 - `size`: the size of the buffer.

Returns:

 - `int`: on success the size (greater then or equal to zero) of a received UDP packet. On failure the internal error code.

### parsePacket()

Checks for the presence of a UDP packet, and reports the size. `parsePacket()` must be called before reading the buffer with `UDP.read()`.

```cpp
// SYNTAX
size = Udp.parsePacket();
```

Parameters: NONE

Returns:

 - `int`: the size of a received UDP packet

### read()

Reads UDP data from the specified buffer. If no arguments are given, it will return the next character in the buffer.

This function can only be successfully called after `UDP.parsePacket()`.

```cpp
// SYNTAX
count = Udp.read();
count = Udp.read(packetBuffer, MaxSize);
```
Parameters:

 - `packetBuffer`: buffer to hold incoming packets (char)
 - `MaxSize`: maximum size of the buffer (int)

Returns:

 - `int`: returns the character in the buffer or -1 if no character is available

### flush()

Waits until all outgoing data in buffer has been sent.

**NOTE:** That this function does nothing at present.

```C++
// SYNTAX
Udp.flush();
```

### stop()

Disconnect from the server. Release any resource being used during the UDP session.

```cpp
// SYNTAX
Udp.stop();
```

Parameters: NONE

### remoteIP()

Returns the IP address of sender of the packet parsed by `Udp.parsePacket()`/`Udp.receivePacket()`.

```cpp
// SYNTAX
ip = Udp.remoteIP();
```

Parameters: NONE

Returns:

 - IPAddress : the IP address of the sender of the packet parsed by `Udp.parsePacket()`/`Udp.receivePacket()`.

### remotePort()

Returns the port from which the UDP packet was sent. The packet is the one most recently processed by `Udp.parsePacket()`/`Udp.receivePacket()`.

```cpp
// SYNTAX
int port = Udp.remotePort();
```

Parameters: NONE

Returns:

- `int`: the port from which the packet parsed by `Udp.parsePacket()`/`Udp.receivePacket()` was sent.


### setBuffer()

{{since when="0.4.5"}}

Initializes the buffer used by a `UDP` instance for buffered reads/writes. The buffer
is used when your application calls `beginPacket()` and `parsePacket()`.  If `setBuffer()` isn't called,
the buffer size defaults to 512 bytes, and is allocated when buffered operation is initialized via `beginPacket()` or `parsePacket()`.

```cpp
// SYNTAX
Udp.setBuffer(size); // dynamically allocated buffer
Udp.setBuffer(size, buffer); // application provided buffer

// EXAMPLE USAGE - dynamically allocated buffer
UDP Udp;

// uses a dynamically allocated buffer that is 1024 bytes in size
if (!Udp.setBuffer(1024))
{
    // on no, couldn't allocate the buffer
}
else
{
    // 'tis good!
}
```

```cpp
// EXAMPLE USAGE - application-provided buffer
UDP Udp;

char appBuffer[800];
Udp.setBuffer(800, appBuffer);
```

Parameters:

- `unsigned int`: the size of the buffer
- `pointer`:  the buffer. If not provided, or `NULL` the system will attempt to
 allocate a buffer of the size requested.

Returns:
- `true` when the buffer was successfully allocated, `false` if there was insufficient memory. (For application-provided buffers
the function always returns `true`.)

### releaseBuffer()

{{since when="0.4.5"}}

Releases the buffer previously set by a call to `setBuffer()`.

```cpp
// SYNTAX
Udp.releaseBuffer();
```

_This is typically required only when performing advanced memory management and the UDP instance is
not scoped to the lifetime of the application._

### sendPacket()

{{since when="0.4.5"}}

Sends a packet, unbuffered, to a remote UDP peer.

```cpp
// SYNTAX
Udp.sendPacket(buffer, bufferSize, remoteIP, remotePort);

// EXAMPLE USAGE
UDP Udp;

char buffer[] = "Particle powered";

IPAddress remoteIP(192, 168, 1, 100);
int port = 1337;

void setup() {
  // Required for two way communication
  Udp.begin(8888);

  if (Udp.sendPacket(buffer, sizeof(buffer), remoteIP, port) < 0) {
    Particle.publish("Error");
  }
}
```

Parameters:
- `pointer` (buffer): the buffer of data to send
- `int` (bufferSize): the number of bytes of data to send
- `IPAddress` (remoteIP): the destination address of the remote peer
- `int` (remotePort): the destination port of the remote peer

Returns:
- `int`: The number of bytes written. Negative value on error.

{{#if has-udp-multicast}}
### joinMulticast()

{{since when="0.4.5"}}

Join a multicast address for all UDP sockets which are on the same network interface as this one.

```cpp
// SYNTAX
Udp.joinMulticast(IPAddress& ip);

// EXAMPLE USAGE
UDP Udp;

int remotePort = 1024;
IPAddress multicastAddress(224,0,0,0);

Udp.begin(remotePort);
Udp.joinMulticast(multicastAddress);
```

This will allow reception of multicast packets sent to the given address for UDP sockets
which have bound the port to which the multicast packet was sent.
Must be called only after `begin()` so that the network interface is established.

### leaveMulticast()

{{since when="0.4.5"}}

Leaves a multicast group previously joined on a specific multicast address.

```cpp
// SYNTAX
Udp.leaveMulticast(multicastAddress);

// EXAMPLE USAGE
UDP Udp;
IPAddress multicastAddress(224,0,0,0);
Udp.leaveMulticast(multicastAddress);
```

{{/if}} {{!-- has-udp-multicast --}}

## Servo

This library allows your device to control RC (hobby) servo motors. Servos have integrated gears and a shaft that can be precisely controlled. Standard servos allow the shaft to be positioned at various angles, usually between 0 and 180 degrees. Continuous rotation servos allow the rotation of the shaft to be set to various speeds.

This example uses pin D0, but D0 cannot be used for Servo on all devices.

```cpp
// EXAMPLE CODE

Servo myservo;  // create servo object to control a servo
                // a maximum of eight servo objects can be created

int pos = 0;    // variable to store the servo position

void setup()
{
  myservo.attach(D0);  // attaches the servo on the D0 pin to the servo object
  // Only supported on pins that have PWM
}


void loop()
{
  for(pos = 0; pos < 180; pos += 1)  // goes from 0 degrees to 180 degrees
  {                                  // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  for(pos = 180; pos>=1; pos-=1)     // goes from 180 degrees to 0 degrees
  {
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
}
```

**NOTE:** Unlike Arduino, you do not need to include `Servo.h`; it is included automatically.

{{#if has-nrf52}}
**NOTE:** Servo is only supported on mesh devices in Device OS 0.8.0-rc.26 and later.
{{/if}}


### attach()

Set up a servo on a particular pin. Note that, Servo can only be attached to pins with a timer.

- on the Core, Servo can be connected to A0, A1, A4, A5, A6, A7, D0, and D1.
- on the Photon, Servo can be connected to A4, A5, WKP, RX, TX, D0, D1, D2, D3
- on the P1, Servo can be connected to A4, A5, WKP, RX, TX, D0, D1, D2, D3, P1S0, P1S1
- on the Electron, Servo can be connected to A4, A5, WKP, RX, TX, D0, D1, D2, D3, B0, B1, B2, B3, C4, C5
- on Gen 3 Argon, Boron, and Xenon devices, pin A0, A1, A2, A3, D2, D3, D4, D5, D6, and D8 can be used for Servo.
- On Gen 3 B Series SoM devices, pins A0, A1, A6, A7, D4, D5, and D6 can be used for Servo.

```cpp
// SYNTAX
servo.attach(pin)
```

### write()

Writes a value to the servo, controlling the shaft accordingly. On a standard servo, this will set the angle of the shaft (in degrees), moving the shaft to that orientation. On a continuous rotation servo, this will set the speed of the servo (with 0 being full-speed in one direction, 180 being full speed in the other, and a value near 90 being no movement).

```cpp
// SYNTAX
servo.write(angle)
```

### writeMicroseconds()

Writes a value in microseconds (uS) to the servo, controlling the shaft accordingly. On a standard servo, this will set the angle of the shaft. On standard servos a parameter value of 1000 is fully counter-clockwise, 2000 is fully clockwise, and 1500 is in the middle.

```cpp
// SYNTAX
servo.writeMicroseconds(uS)
```

Note that some manufactures do not follow this standard very closely so that servos often respond to values between 700 and 2300. Feel free to increase these endpoints until the servo no longer continues to increase its range. Note however that attempting to drive a servo past its endpoints (often indicated by a growling sound) is a high-current state, and should be avoided.

Continuous-rotation servos will respond to the writeMicrosecond function in an analogous manner to the write function.


### read()

Read the current angle of the servo (the value passed to the last call to write()). Returns an integer from 0 to 180 degrees.

```cpp
// SYNTAX
servo.read()
```

### attached()

Check whether the Servo variable is attached to a pin. Returns a boolean.

```cpp
// SYNTAX
servo.attached()
```

### detach()

Detach the Servo variable from its pin.

```cpp
// SYNTAX
servo.detach()
```

### setTrim()

Sets a trim value that allows minute timing adjustments to correctly
calibrate 90 as the stationary point.

```cpp
// SYNTAX

// shortens the pulses sent to the servo
servo.setTrim(-3);

// a larger trim value
servo.setTrim(30);

// removes any previously configured trim
servo.setTrim(0);
```

{{#if has-rgb}}

## RGB

This library allows the user to control the RGB LED on the front of the device.

```cpp
// EXAMPLE CODE

// take control of the LED
RGB.control(true);

// red, green, blue, 0-255.
// the following sets the RGB LED to white:
RGB.color(255, 255, 255);

// wait one second
delay(1000);

// scales brightness of all three colors, 0-255.
// the following sets the RGB LED brightness to 25%:
RGB.brightness(64);

// wait one more second
delay(1000);

// resume normal operation
RGB.control(false);
```

### control(user_control)

User can take control of the RGB LED, or give control back to the system.

```cpp
// take control of the RGB LED
RGB.control(true);

// resume normal operation
RGB.control(false);
```

### controlled()

Returns Boolean `true` when the RGB LED is under user control, or `false` when it is not.

```cpp
// take control of the RGB LED
RGB.control(true);

// Print true or false depending on whether
// the RGB LED is currently under user control.
// In this case it prints "true".
Serial.println(RGB.controlled());

// resume normal operation
RGB.control(false);
```

### color(red, green, blue)

Set the color of the RGB with three values, 0 to 255 (0 is off, 255 is maximum brightness for that color).  User must take control of the RGB LED before calling this method.

```cpp
// Set the RGB LED to red
RGB.color(255, 0, 0);

// Sets the RGB LED to cyan
RGB.color(0, 255, 255);

// Sets the RGB LED to white
RGB.color(255, 255, 255);
```

### brightness(val)

Scale the brightness value of all three RGB colors with one value, 0 to 255 (0 is 0%, 255 is 100%).  This setting persists after `RGB.control()` is set to `false`, and will govern the overall brightness of the RGB LED under normal system operation. User must take control of the RGB LED before calling this method.

```cpp
// Scale the RGB LED brightness to 25%
RGB.brightness(64);

// Scale the RGB LED brightness to 50%
RGB.brightness(128);

// Scale the RGB LED brightness to 100%
RGB.brightness(255);
```

### brightness()

Returns current brightness value.

```cpp
// EXAMPLE

uint8_t value = RGB.brightness();
```

### onChange(handler)

Specifies a function to call when the color of the RGB LED changes. It can be used to implement an external RGB LED.

```cpp
// EXAMPLE USAGE

void ledChangeHandler(uint8_t r, uint8_t g, uint8_t b) {
  // Duplicate the green color to an external LED
  analogWrite(D0, g);
}

void setup()
{
  pinMode(D0, OUTPUT);
  RGB.onChange(ledChangeHandler);
}

```

---

`onChange` can also call a method on an object.

```
// Automatically mirror the onboard RGB LED to an external RGB LED
// No additional code needed in setup() or loop()

class ExternalRGB {
  public:
    ExternalRGB(pin_t r, pin_t g, pin_t b) : pin_r(r), pin_g(g), pin_b(b) {
      pinMode(pin_r, OUTPUT);
      pinMode(pin_g, OUTPUT);
      pinMode(pin_b, OUTPUT);
      RGB.onChange(&ExternalRGB::handler, this);
    }

    void handler(uint8_t r, uint8_t g, uint8_t b) {
      analogWrite(pin_r, 255 - r);
      analogWrite(pin_g, 255 - g);
      analogWrite(pin_b, 255 - b);
    }

    private:
      pin_t pin_r;
      pin_t pin_g;
      pin_t pin_b;
};

// Connect an external RGB LED to D0, D1 and D2 (R, G, and B)
ExternalRGB myRGB(D0, D1, D2);
```

The onChange handler is called 1000 times per second so you should be careful to not do any lengthy computations or functions that take a long time to execute. Do not call functions like Log.info, Serial.print, or Particle.publish from the onChange handler. Instead, save the values from onChange in global variables and handle lengthy operations from loop if you need to do lengthy operations.

{{#if has-rgb-mirror}}

### mirrorTo()

{{since when="0.6.1"}}

Allows a set of PWM pins to mirror the functionality of the on-board RGB LED.

```C++
// SYNTAX
// Common-cathode RGB LED connected to A4 (R), A5 (G), A7 (B)
RGB.mirrorTo(A4, A5, A7);
// Common-anode RGB LED connected to A4 (R), A5 (G), A7 (B)
RGB.mirrorTo(A4, A5, A7, true);
// Common-anode RGB LED connected to A4 (R), A5 (G), A7 (B)
// Mirroring is enabled in firmware _and_ bootloader
RGB.mirrorTo(A4, A5, A7, true, true);
// Enable RGB LED mirroring as soon as {{device}} starts up
STARTUP(RGB.mirrorTo(A4, A5, A7));
```

Parameters:
  - `pinr`: PWM-enabled pin number connected to red LED (see [`analogWrite()`](#analogwrite-pwm-) for a list of PWM-capable pins)
  - `ping`: PWM-enabled pin number connected to green LED (see [`analogWrite()`](#analogwrite-pwm-) for a list of PWM-capable pins)
  - `pinb`: PWM-enabled pin number connected to blue LED (see [`analogWrite()`](#analogwrite-pwm-) for a list of PWM-capable pins)
  - `invert` (optional): `true` if the connected RGB LED is common-anode, `false` if common-cathode (default).
  - `bootloader` (optional): if `true`, the RGB mirroring settings are saved in DCT and are used by the bootloader. If `false`, any previously stored configuration is removed from the DCT and RGB mirroring only works while the firmware is running (default).

### mirrorDisable()

{{since when="0.6.1"}}

Disables RGB LED mirroring.

Parameters:
  - bootloader: if `true`, RGB mirroring configuration stored in DCT is also cleared disabling RGB mirroring functionality in bootloader (default)

{{/if}} {{!-- has-rgb-mirror --}}

## LED Signaling

{{since when="0.6.1"}}

This library allows applications to share control over the on-device RGB
LED with the Device OS in a non-exclusive way, making it possible for the system to use the LED for various important indications, such as cloud connection errors, even if an application already uses the LED for its own signaling. For this to work, an application needs to assign a [_priority_](#ledpriority-enum) to every application-specific LED indication (using instances of the [`LEDStatus`](#ledstatus-class) class), and the system will ensure that the LED only shows a highest priority indication at any moment of time.

The library also allows to set a custom [_theme_](#ledsystemtheme-class) for the system LED signaling. Refer to the [Device Modes](/tutorials/device-os/led) and [LEDSignal Enum](#ledsignal-enum) sections for information about default LED signaling patterns used by the system.

**Note:** Consider using this library instead of the [RGB API](#rgb) for all application-specific LED signaling, unless a low-level control over the LED is required.

### LEDStatus Class

This class allows to define a _LED status_ that represents an application-specific LED indication. Every LED status is described by a signaling [pattern](#ledpattern-enum), [speed](#ledspeed-enum) and [color](#rgb-colors) parameters. Typically, applications use separate status instance for each application state that requires LED indication.

```cpp
// EXAMPLE - defining and using a LED status
LEDStatus blinkRed(RGB_COLOR_RED, LED_PATTERN_BLINK, LED_SPEED_NORMAL, LED_PRIORITY_IMPORTANT);

void setup() {
    // Blink red for 3 seconds after connecting to the Cloud
    blinkRed.setActive(true);
    delay(3000);
    blinkRed.setActive(false);
}

void loop() {
}
```

In the provided example, the application defines a single LED status (`blinkRed`) and activates it for 3 seconds, causing the LED to start blinking in red color. Note that there is no need to toggle the LED on and off manually – this is done automatically by the system, according to the parameters passed to the status instance.

#### LEDStatus()

Constructs a status instance. Initially, a newly constructed status instance is set to inactive state and doesn't affect the LED until [setActive()](#setactive-) method is called by an application to activate this instance.

```cpp
// SYNTAX
LEDStatus::LEDStatus(uint32_t color = RGB_COLOR_WHITE, LEDPattern pattern = LED_PATTERN_SOLID, LEDPriority priority = LED_PRIORITY_NORMAL); // 1
LEDStatus::LEDStatus(uint32_t color, LEDPattern pattern, LEDSpeed speed, LEDPriority priority = LED_PRIORITY_NORMAL); // 2
LEDStatus::LEDStatus(uint32_t color, LEDPattern pattern, uint16_t period, LEDPriority priority = LED_PRIORITY_NORMAL); // 3
LEDStatus::LEDStatus(LEDPattern pattern, LEDPriority priority = LED_PRIORITY_NORMAL); // 4

// EXAMPLE - constructing LEDStatus instance
// Solid green; normal priority (default)
LEDStatus status1(RGB_COLOR_GREEN);
// Blinking blue; normal priority (default)
LEDStatus status2(RGB_COLOR_BLUE, LED_PATTERN_BLINK);
// Fast blinking blue; normal priority (default)
LEDStatus status3(RGB_COLOR_BLUE, LED_PATTERN_BLINK, LED_SPEED_FAST);
// Breathing red with custom pattern period; important priority
LEDStatus status4(RGB_COLOR_RED, LED_PATTERN_FADE, 1000 /* 1 second */, LED_PRIORITY_IMPORTANT);
```

Parameters:

  * `color` : [RGB color](#rgb-colors) (`uint32_t`, default value is `RGB_COLOR_WHITE`)
  * `pattern` : pattern type ([`LEDPattern`](#ledpattern-enum), default value is `LED_PATTERN_SOLID`)
  * `speed` : pattern speed ([`LEDSpeed`](#ledspeed-enum), default value is `LED_SPEED_NORMAL`)
  * `period` : pattern period in milliseconds (`uint16_t`)
  * `priority` : status priority ([`LEDPriority`](#ledpriority-enum), default value is `LED_PRIORITY_NORMAL`)

#### setColor()

Sets status color.

```cpp
// SYNTAX
void LEDStatus::setColor(uint32_t color);
uint32_t LEDStatus::color() const;

// EXAMPLE - setting and getting status color
LEDStatus status;
status.setColor(RGB_COLOR_BLUE);
uint32_t color = status.color(); // Returns 0x000000ff
```

Parameters:

  * `color` : [RGB color](#rgb-colors) (`uint32_t`)

#### color()

Returns status color (`uint32_t`).

#### setPattern()

Sets pattern type.

```cpp
// SYNTAX
void LEDStatus::setPattern(LEDPattern pattern);
LEDPattern LEDStatus::pattern() const;

// EXAMPLE - setting and getting pattern type
LEDStatus status;
status.setPattern(LED_PATTERN_BLINK);
LEDPattern pattern = status.pattern(); // Returns LED_PATTERN_BLINK
```

Parameters:

  * `pattern` : pattern type ([`LEDPattern`](#ledpattern-enum))

#### pattern()

Returns pattern type ([`LEDPattern`](#ledpattern-enum)).

#### setSpeed()

Sets pattern speed. This method resets pattern period to a system-default value that depends on specified pattern speed and current pattern type set for this status instance.

```cpp
// SYNTAX
void LEDStatus::setSpeed(LEDSpeed speed);

// EXAMPLE - setting pattern speed
LEDStatus status;
status.setSpeed(LED_SPEED_FAST);
```

Parameters:

  * `speed` : pattern speed ([`LEDSpeed`](#ledspeed-enum))

#### setPeriod()

Sets pattern period. Pattern period specifies duration of a signaling pattern in milliseconds. For example, given the pattern type `LED_PATTERN_BLINK` (blinking color) with period set to 1000 milliseconds, the system will toggle the LED on and off every 500 milliseconds.

```cpp
// SYNTAX
void LEDStatus::setPeriod(uint16_t period);
uint16_t LEDStatus::period() const;

// EXAMPLE - setting and getting pattern period
LEDStatus status;
status.setPeriod(1000); // 1 second
uint16_t period = status.period(); // Returns 1000
```

Parameters:

  * `period` : pattern period in milliseconds (`uint16_t`)

#### period()

Returns pattern period in milliseconds (`uint16_t`).

#### setPriority()

Sets status priority. Note that a newly assigned priority will take effect only after [`setActive()`](#setactive-) method is called for the next time.

```cpp
// SYNTAX
void LEDStatus::setPriority(LEDPriority priority);
LEDPriority LEDStatus::priority() const;

// EXAMPLE - setting and getting status priority
LEDStatus status;
status.setPriority(LED_PRIORITY_IMPORTANT);
LEDPriority priority = status.priority(); // Returns LED_PRIORITY_IMPORTANT
```

Parameters:

  * `priority` : status priority ([`LEDPriority`](#ledpriority-enum))

#### priority()

Returns status priority ([`LEDPriority`](#ledpriority-enum)).

#### on()

Turns the LED on.

```cpp
// SYNTAX
void LEDStatus::on();
void LEDStatus::off();
void LEDStatus::toggle();
bool LEDStatus::isOn() const;
bool LEDStatus::isOff() const;

// EXAMPLE - turning the LED on and off
LEDStatus status;
status.off(); // Turns the LED off
bool on = status.isOn(); // Returns false

status.on(); // Turns the LED on
on = status.isOn(); // Returns true

status.toggle(); // Toggles the LED
on = status.isOn(); // Returns false
status.toggle();
on = status.isOn(); // Returns true
```

#### off()

Turns the LED off.

#### toggle()

Toggles the LED on or off.

#### isOn()

Returns `true` if the LED is turned on, or `false` otherwise.

#### isOff()

Returns `true` if the LED turned off, or `false` otherwise.

#### setActive()

Activates or deactivates this status instance. The overloaded method that takes `priority` argument assigns a new priority to this status instance before activating it.

```cpp
// SYNTAX
void LEDStatus::setActive(bool active = true); // 1
void LEDStatus::setActive(LEDPriority priority); // 2
bool LEDStatus::isActive() const;

// EXAMPLE - activating and deactivating a status instance
LEDStatus status;
status.setActive(true); // Activates status
bool active = status.isActive(); // Returns true

status.setActive(false); // Deactivates status
active = status.isActive(); // Returns false

status.setActive(LED_PRIORITY_IMPORTANT); // Activates status with new priority
LEDPriority priority = status.priority(); // Returns LED_PRIORITY_IMPORTANT
active = status.isActive(); // Returns true
```

Parameters:

  * `active` : whether the status should be activated (`true`) or deactivated (`false`). Default value is `true`
  * `priority` : status priority ([`LEDPriority`](#ledpriority-enum))

#### isActive()

Returns `true` if this status is active, or `false` otherwise.

#### Custom Patterns

`LEDStatus` class can be subclassed to implement a custom signaling pattern.

```cpp
// EXAMPLE - implementing a custom signaling pattern
class CustomStatus: public LEDStatus {
public:
    explicit CustomStatus(LEDPriority priority) :
        LEDStatus(LED_PATTERN_CUSTOM, priority),
        colorIndex(0),
        colorTicks(0) {
    }

protected:
    virtual void update(system_tick_t ticks) override {
        // Change status color every 300 milliseconds
        colorTicks += ticks;
        if (colorTicks > 300) {
            if (++colorIndex == colorCount) {
                colorIndex = 0;
            }
            setColor(colors[colorIndex]);
            colorTicks = 0;
        }
    }

private:
    size_t colorIndex;
    system_tick_t colorTicks;

    static const uint32_t colors[];
    static const size_t colorCount;
};

const uint32_t CustomStatus::colors[] = {
    RGB_COLOR_MAGENTA,
    RGB_COLOR_BLUE,
    RGB_COLOR_CYAN,
    RGB_COLOR_GREEN,
    RGB_COLOR_YELLOW
};

const size_t CustomStatus::colorCount =
    sizeof(CustomStatus::colors) /
    sizeof(CustomStatus::colors[0]);

CustomStatus customStatus(LED_PRIORITY_IMPORTANT);

void setup() {
    // Activate custom status
    customStatus.setActive(true);
}

void loop() {
}
```

In the provided example, `CustomStatus` class implements a signaling pattern that alternates between some of the predefined colors.

Any class implementing a custom pattern needs to pass `LED_PATTERN_CUSTOM` pattern type to the constructor of the base `LEDStatus` class and reimplement its `update()` method. Once an instance of such class is activated, the system starts to call its `update()` method periodically in background, passing number of milliseconds passed since previous update in `ticks` argument.

**Note:** The system may call `update()` method within an ISR. Ensure provided implementation doesn't make any blocking calls, returns as quickly as possible, and, ideally, only updates internal timing and makes calls to `setColor()`, `setActive()` and other methods of the base `LEDStatus` class.

### LEDSystemTheme Class

This class allows to set a custom theme for the system LED signaling. Refer to the [LEDSignal Enum](#ledsignal-enum) section for the list of LED signals defined by the system.

```cpp
// EXAMPLE - setting custom colors for network status indication
LEDSystemTheme theme;
theme.setColor(LED_SIGNAL_NETWORK_OFF, RGB_COLOR_GRAY);
theme.setColor(LED_SIGNAL_NETWORK_ON, RGB_COLOR_WHITE);
theme.setColor(LED_SIGNAL_NETWORK_CONNECTING, RGB_COLOR_YELLOW);
theme.setColor(LED_SIGNAL_NETWORK_DHCP, RGB_COLOR_YELLOW);
theme.setColor(LED_SIGNAL_NETWORK_CONNECTED, RGB_COLOR_YELLOW);
theme.apply(); // Apply theme settings
```

#### LEDSystemTheme()

Constructs a theme instance and initializes it with current system settings.

```cpp
// SYNTAX
LEDSystemTheme::LEDSystemTheme();

// EXAMPLE - constructing theme instance
LEDSystemTheme theme;
```

#### setColor()

Sets signal color.

```cpp
// SYNTAX
void LEDSystemTheme::setColor(LEDSignal signal, uint32_t color);
uint32_t LEDSystemTheme::color(LEDSignal signal) const;

// EXAMPLE - setting and getting signal color
LEDSystemTheme theme;
theme.setColor(LED_SIGNAL_NETWORK_ON, RGB_COLOR_BLUE);
uint32_t color = theme.color(LED_SIGNAL_NETWORK_ON); // Returns 0x000000ff
```

Parameters:

  * `signal` : LED signal ([`LEDSignal`](#ledsignal-enum))
  * `color` : [RGB color](#rgb-colors) (`uint32_t`)

#### color()

Returns signal color (`uint32_t`).

#### setPattern()

Sets signal pattern.

```cpp
// SYNTAX
void LEDSystemTheme::setPattern(LEDSignal signal, LEDPattern pattern);
LEDPattern LEDSystemTheme::pattern(LEDSignal signal) const;

// EXAMPLE - setting and getting signal pattern
LEDSystemTheme theme;
theme.setPattern(LED_SIGNAL_NETWORK_ON, LED_PATTERN_BLINK);
LEDPattern pattern = theme.pattern(LED_SIGNAL_NETWORK_ON); // Returns LED_PATTERN_BLINK
```

Parameters:

  * `signal` : LED signal ([`LEDSignal`](#ledsignal-enum))
  * `pattern` : pattern type ([`LEDPattern`](#ledpattern-enum))

#### pattern()

Returns signal pattern ([`LEDPattern`](#ledpattern-enum)).

#### setSpeed()

Sets signal speed.

```cpp
// SYNTAX
void LEDSystemTheme::setSpeed(LEDSignal signal, LEDSpeed speed);

// EXAMPLE - setting signal speed
LEDSystemTheme theme;
theme.setSpeed(LED_SIGNAL_NETWORK_ON, LED_SPEED_FAST);
```

Parameters:

  * `signal` : LED signal ([`LEDSignal`](#ledsignal-enum))
  * `speed` : pattern speed ([`LEDSpeed`](#ledspeed-enum))

#### setPeriod()

Sets signal period.

```cpp
// SYNTAX
void LEDSystemTheme::setPeriod(LEDSignal signal, uint16_t period);
uint16_t LEDSystemTheme::period(LEDSignal signal) const;

// EXAMPLE - setting and getting signal period
LEDSystemTheme theme;
theme.setPeriod(LED_SIGNAL_NETWORK_ON, 1000); // 1 second
uint16_t period = theme.period(); // Returns 1000
```

Parameters:

  * `signal` : LED signal ([`LEDSignal`](#ledsignal-enum))
  * `period` : pattern period in milliseconds (`uint16_t`)

#### period()

Returns signal period in milliseconds (`uint16_t`).

#### setSignal()

Sets several signal parameters at once.

```cpp
// SYNTAX
void LEDSystemTheme::setSignal(LEDSignal signal, uint32_t color); // 1
void LEDSystemTheme::setSignal(LEDSignal signal, uint32_t color, LEDPattern pattern, LEDSpeed speed = LED_SPEED_NORMAL); // 2
void LEDSystemTheme::setSignal(LEDSignal signal, uint32_t color, LEDPattern pattern, uint16_t period); // 3

// EXAMPLE - setting signal parameters
LEDSystemTheme theme;
theme.setSignal(LED_SIGNAL_NETWORK_ON, RGB_COLOR_BLUE, LED_PATTERN_BLINK, LED_SPEED_FAST);
```

Parameters:

  * `signal` : LED signal ([`LEDSignal`](#ledsignal-enum))
  * `color` : [RGB color](#rgb-colors) (`uint32_t`)
  * `pattern` : pattern type ([`LEDPattern`](#ledpattern-enum))
  * `speed` : pattern speed ([`LEDSpeed`](#ledspeed-enum))
  * `period` : pattern period in milliseconds (`uint16_t`)

#### apply()

Applies theme settings.

```cpp
// SYNTAX
{{#unless core}}
void LEDSystemTheme::apply(bool save = false);
{{/unless}}
{{#if core}}
void LEDSystemTheme::apply();
{{/if}}

// EXAMPLE - applying theme settings
LEDSystemTheme theme;
theme.setColor(LED_SIGNAL_NETWORK_ON, RGB_COLOR_BLUE);
theme.apply();
```

{{#unless core}}
Parameters:

  * `save` : whether theme settings should be saved to a persistent storage (default value is `false`)
{{/unless}}

#### restoreDefault()

Restores factory default theme.

```cpp
// SYNTAX
static void LEDSystemTheme::restoreDefault();

// EXAMPLE - restoring factory default theme
LEDSystemTheme::restoreDefault();
```

### LEDSignal Enum

This enum defines LED signals supported by the system:

Name | Description | Priority | Default Pattern
-----|-------------|----------|----------------
LED_SIGNAL_NETWORK_OFF | Network is off | Background | Breathing white
LED_SIGNAL_NETWORK_ON | Network is on | Background | Breathing blue
LED_SIGNAL_NETWORK_CONNECTING | Connecting to network | Normal | Blinking green
LED_SIGNAL_NETWORK_DHCP | Getting network address | Normal | Fast blinking green
LED_SIGNAL_NETWORK_CONNECTED | Connected to network | Background | Breathing green
LED_SIGNAL_CLOUD_CONNECTING | Connecting to the Cloud | Normal | Blinking cyan
LED_SIGNAL_CLOUD_HANDSHAKE | Performing handshake with the Cloud | Normal | Fast blinking cyan
LED_SIGNAL_CLOUD_CONNECTED | Connected to the Cloud | Background | Breathing cyan
LED_SIGNAL_SAFE_MODE | Connected to the Cloud in safe mode | Background | Breathing magenta
LED_SIGNAL_LISTENING_MODE | Listening mode | Normal | Slow blinking blue
{{#unless core}}
LED_SIGNAL_DFU_MODE * | DFU mode | Critical | Blinking yellow
LED_SIGNAL_FIRMWARE_UPDATE * | Performing firmware update | Critical | Blinking magenta
{{/unless}}
LED_SIGNAL_POWER_OFF | Soft power down is pending | Critical | Solid gray

{{#unless core}}
**Note:** Signals marked with an asterisk (*) are implemented within the bootloader and currently don't support pattern type and speed customization due to flash memory constraints. This may be changed in future versions of the firmware.
{{/unless}}

### LEDPriority Enum

This enum defines LED priorities supported by the system (from lowest to highest priority):

  * `LED_PRIORITY_BACKGROUND` : long-lasting background indications
  * `LED_PRIORITY_NORMAL` : regular, typically short indications
  * `LED_PRIORITY_IMPORTANT` : important indications
  * `LED_PRIORITY_CRITICAL` : critically important indications

Internally, the system uses the same set of priorities for its own LED signaling. In a situation when both an application and the system use same priority for their active indications, system indication takes precedence. Refer to the [LEDSignal Enum](#ledsignal-enum) section for information about system signal priorities.

### LEDPattern Enum

This enum defines LED patterns supported by the system:

  * `LED_PATTERN_SOLID` : solid color
  * `LED_PATTERN_BLINK` : blinking color
  * `LED_PATTERN_FADE` : breathing color
  * `LED_PATTERN_CUSTOM` : [custom pattern](#custom-patterns)

### LEDSpeed Enum

This enum defines system-default LED speed values:

  * `LED_SPEED_SLOW` : slow speed
  * `LED_SPEED_NORMAL` : normal speed
  * `LED_SPEED_FAST` : fast speed

### RGB Colors

RGB colors are represented by 32-bit integer values (`uint32_t`) with the following layout in hex: `0x00RRGGBB`, where `R`, `G` and `B` are bits of the red, green and blue color components respectively.

For convenience, the library defines constants for the following basic colors:

  * `RGB_COLOR_BLUE` : blue (`0x000000ff`)
  * `RGB_COLOR_GREEN` : green (`0x0000ff00`)
  * `RGB_COLOR_CYAN` : cyan (`0x0000ffff`)
  * `RGB_COLOR_RED` : red (`0x00ff0000`)
  * `RGB_COLOR_MAGENTA` : magenta (`0x00ff00ff`)
  * `RGB_COLOR_YELLOW` : yellow (`0x00ffff00`)
  * `RGB_COLOR_WHITE` : white (`0x00ffffff`)
  * `RGB_COLOR_GRAY` : gray (`0x001f1f1f`)
  * `RGB_COLOR_ORANGE` : orange (`0x00ff6000`)

{{/if}} {{!-- has-rgb --}}

## Time

The device synchronizes time with the Particle Device Cloud during the handshake.
From then, the time is continually updated on the device.
This reduces the need for external libraries to manage dates and times.

Before the device gets online and for short intervals, you can use the
`millis()` and `micros()` functions.

### millis()

Returns the number of milliseconds since the device began running the current program. This number will overflow (go back to zero), after approximately 49 days.

`unsigned long time = millis();`

```C++
// EXAMPLE USAGE

unsigned long time;

void setup()
{
  Serial.begin(9600);
}
void loop()
{
  Serial.print("Time: ");
  time = millis();
  //prints time since program started
  Serial.println(time);
  // wait a second so as not to send massive amounts of data
  delay(1000);
}
```
**Note:**
The return value for millis is an unsigned long, errors may be generated if a programmer tries to do math with other data types such as ints.

### micros()

Returns the number of microseconds since the device booted.

`unsigned long time = micros();`

```C++
// EXAMPLE USAGE

unsigned long time;

void setup()
{
  Serial.begin(9600);
}
void loop()
{
  Serial.print("Time: ");
  time = micros();
  //prints time since program started
  Serial.println(time);
  // wait a second so as not to send massive amounts of data
  delay(1000);
}
```

In Device OS v0.4.3 and earlier this number will overflow (go back to zero), after exactly 59,652,323 microseconds (0 .. 59,652,322) on the Core and after exactly 35,791,394 microseconds (0 .. 35,791,394) on the Photon and Electron. In newer Device OS versions, it overflows at the maximum 32-bit unsigned long value.

### delay()

Pauses the program for the amount of time (in milliseconds) specified as parameter. (There are 1000 milliseconds in a second.)

```C++
// SYNTAX
delay(ms);
```

`ms` is the number of milliseconds to pause *(unsigned long)*

```C++
// EXAMPLE USAGE

int ledPin = D1;              // LED connected to digital pin D1

void setup()
{
  pinMode(ledPin, OUTPUT);    // sets the digital pin as output
}

void loop()
{
  digitalWrite(ledPin, HIGH); // sets the LED on
  delay(1000);                // waits for a second
  digitalWrite(ledPin, LOW);  // sets the LED off
  delay(1000);                // waits for a second
}
```
**NOTE:**
the parameter for millis is an unsigned long, errors may be generated if a programmer tries to do math with other data types such as ints.

### delayMicroseconds()

Pauses the program for the amount of time (in microseconds) specified as parameter. There are a thousand microseconds in a millisecond, and a million microseconds in a second.

```C++
// SYNTAX
delayMicroseconds(us);
```
`us` is the number of microseconds to pause *(unsigned int)*

```C++
// EXAMPLE USAGE

int outPin = D1;              // digital pin D1

void setup()
{
  pinMode(outPin, OUTPUT);    // sets the digital pin as output
}

void loop()
{
  digitalWrite(outPin, HIGH); // sets the pin on
  delayMicroseconds(50);      // pauses for 50 microseconds
  digitalWrite(outPin, LOW);  // sets the pin off
  delayMicroseconds(50);      // pauses for 50 microseconds
}
```

### hour()

Retrieve the hour for the current or given time.
Integer is returned without a leading zero.

```cpp
// Print the hour for the current time
Serial.print(Time.hour());

// Print the hour for the given time, in this case: 4
Serial.print(Time.hour(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer 0-23

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice.

### hourFormat12()

Retrieve the hour in 12-hour format for the current or given time.
Integer is returned without a leading zero.

```cpp
// Print the hour in 12-hour format for the current time
Serial.print(Time.hourFormat12());

// Print the hour in 12-hour format for a given time, in this case: 3
Serial.print(Time.hourFormat12(1400684400));
`

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer 1-12

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice.

### isAM()

Returns true if the current or given time is AM.

```cpp
// Print true or false depending on whether the current time is AM
Serial.print(Time.isAM());

// Print whether the given time is AM, in this case: true
Serial.print(Time.isAM(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Unsigned 8-bit integer: 0 = false, 1 = true

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice, potentially causing AM/PM to be calculated incorrectly.

### isPM()

Returns true if the current or given time is PM.

```cpp
// Print true or false depending on whether the current time is PM
Serial.print(Time.isPM());

// Print whether the given time is PM, in this case: false
Serial.print(Time.isPM(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Unsigned 8-bit integer: 0 = false, 1 = true

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice, potentially causing AM/PM to be calculated incorrectly.

### minute()

Retrieve the minute for the current or given time.
Integer is returned without a leading zero.

```cpp
// Print the minute for the current time
Serial.print(Time.minute());

// Print the minute for the given time, in this case: 51
Serial.print(Time.minute(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer 0-59

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice.

### second()

Retrieve the seconds for the current or given time.
Integer is returned without a leading zero.

```cpp
// Print the second for the current time
Serial.print(Time.second());

// Print the second for the given time, in this case: 51
Serial.print(Time.second(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer 0-59


### day()

Retrieve the day for the current or given time.
Integer is returned without a leading zero.

```cpp
// Print the day for the current time
Serial.print(Time.day());

// Print the day for the given time, in this case: 21
Serial.print(Time.day(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer 1-31

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice, potentially causing an incorrect date.

### weekday()

Retrieve the weekday for the current or given time.

 - 1 = Sunday
 - 2 = Monday
 - 3 = Tuesday
 - 4 = Wednesday
 - 5 = Thursday
 - 6 = Friday
 - 7 = Saturday

```cpp
// Print the weekday number for the current time
Serial.print(Time.weekday());

// Print the weekday for the given time, in this case: 4
Serial.print(Time.weekday(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer 1-7

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice, potentially causing an incorrect day of week.

### month()

Retrieve the month for the current or given time.
Integer is returned without a leading zero.

```cpp
// Print the month number for the current time
Serial.print(Time.month());

// Print the month for the given time, in this case: 5
Serial.print(Time.month(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer 1-12

If you have set a timezone using zone(), beginDST(), etc. the hour returned will be local time. You must still pass in UTC time, otherwise the time offset will be applied twice, potentially causing an incorrect date.

### year()

Retrieve the 4-digit year for the current or given time.

```cpp
// Print the current year
Serial.print(Time.year());

// Print the year for the given time, in this case: 2014
Serial.print(Time.year(1400647897));
```

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

Returns: Integer


### now()

Retrieve the current time as seconds since January 1, 1970 (commonly known as "Unix time" or "epoch time"). This time is not affected by the timezone setting, it's coordinated universal time (UTC).

```cpp
// Print the current Unix timestamp
Serial.print(Time.now()); // 1400647897
```

Returns: system_tick_t (uint32_t), 32-bit unsigned integer

### local()

Retrieve the current time in the configured timezone as seconds since January 1, 1970 (commonly known as "Unix time" or "epoch time"). This time is affected by the timezone setting.

Note that the functions in the `Time` class expect times in UTC time, so the result from this should be used carefully. You should not pass Time.local() to Time.format(), for example.

_Since 0.6.0_

Local time is also affected by the Daylight Saving Time (DST) settings.

### zone()

Set the time zone offset (+/-) from UTC.
The device will remember this offset until reboot.

*NOTE*: This function does not observe daylight savings time.

```cpp
// Set time zone to Eastern USA daylight saving time
Time.zone(-4);
```

Parameters: floating point offset from UTC in hours, from -12.0 to 14.0

### isDST()

{{since when="0.6.0"}}

Returns true if Daylight Saving Time (DST) is in effect.

```cpp
// Print true or false depending on whether the DST in in effect
Serial.print(Time.isDST());
```

Returns: Unsigned 8-bit integer: 0 = false, 1 = true

This function only returns the current DST setting that you choose using beginDST() or endDST(). The setting does not automatically change based on the calendar date.

### getDSTOffset()

{{since when="0.6.0"}}

Retrieve the current Daylight Saving Time (DST) offset that is added to the current local time when Time.beginDST() has been called. The default is 1 hour.

```cpp
// Get current DST offset
float offset = Time.getDSTOffset();
```

Returns: floating point DST offset in hours (default is +1.0 hours)

### setDSTOffset()

{{since when="0.6.0"}}

Set a custom Daylight Saving Time (DST) offset.
The device will remember this offset until reboot.

```cpp
// Set DST offset to 30 minutes
Time.setDSTOffset(0.5);
```

Parameters: floating point offset in hours, from 0.0 to 2.0

### beginDST()

{{since when="0.6.0"}}

Start applying Daylight Saving Time (DST) offset to the current time.

You must call beginDST() at startup if you want use DST mode. The setting is not remembered and is not automatically changed based on the calendar.

### endDST()

{{since when="0.6.0"}}

Stop applying Daylight Saving Time (DST) offset to the current time.

You must call endDST() on the appropriate date to end DST mode. It is not calculated automatically.

### setTime()

Set the system time to the given timestamp.

*NOTE*: This will override the time set by the Particle Device Cloud.
If the cloud connection drops, the reconnection handshake will set the time again

Also see: [`Particle.syncTime()`](#particle-synctime-)

```cpp
// Set the time to 2014-10-11 13:37:42
Time.setTime(1413034662);
```

Parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

### timeStr()

Return string representation for the given time.
```cpp
Serial.print(Time.timeStr()); // Wed May 21 01:08:47 2014
```

Returns: String

_NB: In 0.3.4 and earlier, this function included a newline at the end of the returned string. This has been removed in 0.4.0._

### format()

Formats a time string using a configurable format. 

```cpp
// SYNTAX
Time.format(time, strFormat); // fully qualified (e.g. current time with custom format)
Time.format(strFormat);       // current time with custom format
Time.format(time);            // custom time with preset format
Time.format();                // current time with preset format
  
// EXAMPLE
time_t time = Time.now();
Time.format(time, TIME_FORMAT_DEFAULT); // Sat Jan 10 08:22:04 2004 , same as Time.timeStr()

Time.zone(-5.25);  // setup a time zone, which is part of the ISO6801 format
Time.format(time, TIME_FORMAT_ISO8601_FULL); // 2004-01-10T08:22:04-05:15

```

The formats available are:

- `TIME_FORMAT_DEFAULT`
- `TIME_FORMAT_ISO8601_FULL`
- custom format based on [strftime()](http://www.cplusplus.com/reference/ctime/strftime/)

Optional parameter: time_t (Unix timestamp), coordinated universal time (UTC), unsigned long integer

If you have set the time zone using Time.zone(), beginDST(), etc. the formatted time will be formatted in local time.

**Note:** The custom time provided to `Time.format()` needs to be UTC based and *not* contain the time zone offset (as `Time.local()` would), since the time zone correction is performed by the high level `Time` methods internally.

{{#if core}}
**Note:** On the Core the format function is implemented using `strftime()` which adds several kilobytes to the size of firmware.
Application firmware that has limited space available may want to consider using simpler alternatives that consume less firmware space, such as `sprintf()`.
{{/if}}

### setFormat()

Sets the format string that is the default value used by `format()`.

```cpp

Time.setFormat(TIME_FORMAT_ISO8601_FULL);

```

In more advanced cases, you can set the format to a static string that follows
the same syntax as the `strftime()` function.

```
// custom formatting

Time.format(Time.now(), "Now it's %I:%M%p.");
// Now it's 03:21AM.

```

### getFormat()

Retrieves the currently configured format string for time formatting with `format()`.


### isValid()

{{since when="0.6.1"}}

```cpp
// SYNTAX
Time.isValid();
```

Used to check if current time is valid. This function will return `true` if:
- Time has been set manually using [`Time.setTime()`](#settime-)
- Time has been successfully synchronized with the Particle Device Cloud. The device synchronizes time with the Particle Device Cloud during the handshake. The application may also manually synchronize time with Particle Device Cloud using [`Particle.syncTime()`](#particle-synctime-)
- Correct time has been maintained by RTC.{{#if has-backup-ram}} See information on [`Backup RAM (SRAM)`](#backup-ram-sram-) for cases when RTC retains the time. RTC is part of the backup domain and retains its counters under the same conditions as Backup RAM.{{/if}}

**NOTE:** When {{device}} is running in `AUTOMATIC` mode {{#if has-threading}}and threading is disabled {{/if}} this function will block if current time is not valid and there is an active connection to Particle Device Cloud. Once {{device}} synchronizes the time with Particle Device Cloud or the connection to Particle Device Cloud is lost, `Time.isValid()` will return its current state. This function is also implicitly called by any `Time` function that returns current time or date (e.g. `Time.hour()`/`Time.now()`/etc).

```cpp
// Print true or false depending on whether current time is valid
Serial.print(Time.isValid());
```

```cpp
void setup()
{
  // Wait for time to be synchronized with Particle Device Cloud (requires active connection)
  waitFor(Time.isValid, 60000);
}

void loop()
{
  // Print current time
  Serial.println(Time.timeStr());
}

```

### Advanced

For more advanced date parsing, formatting, normalization and manipulation functions, use the C standard library time functions like `mktime`. See the [note about the standard library on the {{device}}](#other-functions) and the [description of the C standard library time functions](https://en.wikipedia.org/wiki/C_date_and_time_functions).

{{#if has-interrupts}}

## Interrupts

Interrupts are a way to write code that is run when an external event occurs.
As a general rule, interrupt code should be very fast, and non-blocking. This means
performing transfers, such as I2C, Serial, TCP should not be done as part of the
interrupt handler. Rather, the interrupt handler can set a variable which instructs
the main loop that the event has occurred.

### attachInterrupt()

Specifies a function to call when an external interrupt occurs. Replaces any previous function that was attached to the interrupt.

**NOTE:**
`pinMode()` MUST be called prior to calling attachInterrupt() to set the desired mode for the interrupt pin (INPUT, INPUT_PULLUP or INPUT_PULLDOWN).

{{#if has-nrf52}}
All A and D pins (including TX, RX, and SPI) on Gen 3 (mesh) devices can be used for interrupts, however you can only attach interrupts to 8 pins at the same time.
{{/if}}

{{#if has-stm32}}
External interrupts are supported on the following pins:

**Photon**

Not supported on the Photon (you can't use attachInterrupt on these pins):

  - D0, A5 (shared with SETUP button)

No restrictions on the Photon (all of these can be used at the same time):

  - D5, D6, D7, A2, WKP, TX, RX

Shared on the Photon (only one pin for each bullet item can be used at the same time):

  - D1, A4
  - D2, A0, A3
  - D3, DAC
  - D4, A1
 
For example, you can use attachInterrupt on D1 or A4, but not both. Since they share an EXTI line, there is no way to tell which pin generated the interrupt.

But you can still attachInterrupt to D2, D3, and D4, as those are on different EXTI lines.
 
**P1**
   
Not supported on the P1 (you can't use attachInterrupt on these pins):

  - D0, A5 (shared with MODE button)

No restrictions on the P1 (all of these can be used at the same time):

  - D5, D6, A2, TX, RX

Shared on the P1 (only one pin for each bullet item can be used at the same time):

  - D1, A4
  - D2, A0, A3
  - D3, DAC, P1S3
  - D4, A1
  - D7, P1S4
  - A7 (WKP), P1S0, P1S2
  - P1S1, P1S5

**Electron/E Series**

Not supported on the Electron/E series (you can't use attachInterrupt on these pins):

  - D0, A5 (shared with MODE button)
  - D7 (shared with BATT_INT_PC13)
  - C1 (shared with RXD_UC)
  - C2 (shared with RI_UC)

No restrictions on the Electron/E series (all of these can be used at the same time):

  - D5, D6

Shared on the Electron/E series (only one pin for each bullet item can be used at the same time):

  - D1, A4, B1
  - D2, A0, A3
  - D3, DAC
  - D4, A1
  - A2, C0
  - A7 (WKP), B2, B4
  - B0, C5
  - B3, B5
  - C3, TX
  - C4, RX

{{#if core}}
#### Spark Core

Interrupts supported on D0, D1, D2, D3, D4, A0, A1, A3, A4, A5, A6, A7 only.
{{/if}}
{{/if}} {{!-- has-stm32 --}}

Additional information on which pins can be used for interrupts is available on the [pin information page](/reference/hardware/pin-info).

```
// SYNTAX
attachInterrupt(pin, function, mode);
attachInterrupt(pin, function, mode, priority);
attachInterrupt(pin, function, mode, priority, subpriority);
```

*Parameters:*

- `pin`: the pin number
- `function`: the function to call when the interrupt occurs; this function must take no parameters and return nothing. This function is sometimes referred to as an *interrupt service routine* (ISR).
- `mode`: defines when the interrupt should be triggered. Three constants are predefined as valid values:
    - CHANGE to trigger the interrupt whenever the pin changes value,
    - RISING to trigger when the pin goes from low to high,
    - FALLING for when the pin goes from high to low.
- `priority` (optional): the priority of this interrupt. Default priority is 13. Lower values increase the priority of the interrupt.
- `subpriority` (optional): the subpriority of this interrupt. Default subpriority is 0.

The function returns a boolean whether the ISR was successfully attached (true) or not (false).

```C++
// EXAMPLE USAGE

void blink(void);
int ledPin = D1;
volatile int state = LOW;

void setup()
{
  pinMode(ledPin, OUTPUT);
  pinMode(D2, INPUT_PULLUP);
  attachInterrupt(D2, blink, CHANGE);
}

void loop()
{
  digitalWrite(ledPin, state);
}

void blink()
{
  state = !state;
}
```

You can attach a method in a C++ object as an interrupt handler.

```cpp
class Robot {
  public:
    Robot() {
      pinMode(D2, INPUT_PULLUP);
      attachInterrupt(D2, &Robot::handler, this, CHANGE);
    }
    void handler() {
      // do something on interrupt
    }
};

Robot myRobot;
// nothing else needed in setup() or loop()
```

**Using Interrupts:**
Interrupts are useful for making things happen automatically in microcontroller programs, and can help solve timing problems. Good tasks for using an interrupt may include reading a rotary encoder, or monitoring user input.

If you wanted to insure that a program always caught the pulses from a rotary encoder, so that it never misses a pulse, it would make it very tricky to write a program to do anything else, because the program would need to constantly poll the sensor lines for the encoder, in order to catch pulses when they occurred. Other sensors have a similar interface dynamic too, such as trying to read a sound sensor that is trying to catch a click, or an infrared slot sensor (photo-interrupter) trying to catch a coin drop. In all of these situations, using an interrupt can free the microcontroller to get some other work done while not missing the input.

**About Interrupt Service Routines:**
ISRs are special kinds of functions that have some unique limitations most other functions do not have. An ISR cannot have any parameters, and they shouldn't return anything.

Generally, an ISR should be as short and fast as possible. If your sketch uses multiple ISRs, only one can run at a time, other interrupts will be executed after the current one finishes in an order that depends on the priority they have. `millis()` relies on interrupts to count, so it will never increment inside an ISR. Since `delay()` requires interrupts to work, it will not work if called inside an ISR. Using `delayMicroseconds()` will work as normal.

Typically global variables are used to pass data between an ISR and the main program. To make sure variables shared between an ISR and the main program are updated correctly, declare them as `volatile`.


### detachInterrupt()

Turns off the given interrupt.

```
// SYNTAX
detachInterrupt(pin);
```

`pin` is the pin number of the interrupt to disable.


### interrupts()

Re-enables interrupts (after they've been disabled by `noInterrupts()`). Interrupts allow certain important tasks to happen in the background and are enabled by default. Some functions will not work while interrupts are disabled, and incoming communication may be ignored. Interrupts can slightly disrupt the timing of code, however, and may be disabled for particularly critical sections of code.

```C++
// EXAMPLE USAGE

void setup() {}

void loop()
{
  noInterrupts(); // disable interrupts
  //
  // put critical, time-sensitive code here
  //
  interrupts();   // enable interrupts
  //
  // other code here
  //
}
```

`interrupts()` neither accepts a parameter nor returns anything.

### noInterrupts()

Disables interrupts (you can re-enable them with `interrupts()`). Interrupts allow certain important tasks to happen in the background and are enabled by default. Some functions will not work while interrupts are disabled, and incoming communication may be ignored. Interrupts can slightly disrupt the timing of code, however, and may be disabled for particularly critical sections of code.

```C++
// SYNTAX
noInterrupts();
```

`noInterrupts()` neither accepts a parameter nor returns anything.

{{/if}} {{!-- has-interrupts --}}

{{#if has-software-timers}}

## Software Timers

{{#if has-stm32}}
_Since 0.4.7. This feature is available on the Photon, P1 and Electron out the box. On the Core, the
`freertos4core` Particle library <a href="https://build.particle.io/libs/freertos4core/0.2.0/tab/example/timers.ino" target="_blank">(Timers.ino example found here)</a> should be used to add FreeRTOS to the core._
{{/if}}

Software Timers provide a way to have timed actions in your program.  FreeRTOS provides the ability to have up to 10 Software Timers at a time with a minimum resolution of 1 millisecond.  It is common to use millis() based "timers" though exact timing is not always possible (due to other program delays).  Software timers are maintained by FreeRTOS and provide a more reliable method for running timed actions using callback functions.  Please note that Software Timers are "chained" and will be serviced sequentially when several timers trigger simultaneously, thus requiring special consideration when writing callback functions.

```cpp
// EXAMPLE

void print_every_second()
{
    static int count = 0;
    Serial.println(count++);
}

Timer timer(1000, print_every_second);

void setup()
{
    Serial.begin(9600);
    timer.start();
}
```

Timers may be started, stopped, reset within a user program or an ISR.  They may also be "disposed", removing them from the (max. 10) active timer list.

The timer callback is similar to an interrupt - it shouldn't block. However, it is less restrictive than an interrupt. If the code does block, the system will not crash - the only consequence is that other software timers that should have triggered will be delayed until the blocking timer callback function returns.

// SYNTAX

`Timer timer(period, callback, one_shot)`

- `period` is the period of the timer in milliseconds  (unsigned int)
- `callback` is the callback function which gets called when the timer expires.
- `one_shot` (optional, since 0.4.9) when `true`, the timer is fired once and then stopped automatically.  The default is `false` - a repeating timer.


{{/if}} {{!-- has-software-timers --}}

### Class member callbacks

{{since when="0.4.9"}}

A class member function can be used as a callback using this syntax to create the timer:

`Timer timer(period, callback, instance, one_shot)`

- `period` is the period of the timer in milliseconds  (unsigned int)
- `callback` is the class member function which gets called when the timer expires.
- `instance` the instance of the class to call the callback function on.
- `one_shot` (optional, since 0.4.9) when `true`, the timer is fired once and then stopped automatically.  The default is `false` - a repeating timer.


```
// Class member function callback example

class CallbackClass
{
public:
     void onTimeout();
}

CallbackClass callback;
Timer t(1000, &CallbackClass::onTimeout, callback);

```


### start()

Starts a stopped timer (a newly created timer is stopped). If `start()` is called for a running timer, it will be reset.

`start()`

```C++
// EXAMPLE USAGE
timer.start(); // starts timer if stopped or resets it if started.

```

### stop()

Stops a running timer.

`stop()`

```C++
// EXAMPLE USAGE
timer.stop(); // stops a running timer.

```

### changePeriod()

Changes the period of a previously created timer. It can be called to change the period of an running or stopped timer. Note that changing the period of a dormant timer will also start the timer.

`changePeriod(newPeriod)`

`newPeriod` is the new timer period (unsigned int)

```C++
// EXAMPLE USAGE
timer.changePeriod(1000); // Reset period of timer to 1000ms.

```


### reset()

Resets a timer.  If a timer is running, it will reset to "zero".  If a timer is stopped, it will be started.

`reset()`

```C++
// EXAMPLE USAGE
timer.reset(); // reset timer if running, or start timer if stopped.

```

### startFromISR()
### stopFromISR()
### resetFromISR()
### changePeriodFromISR()

`startFromISR()`
`stopFromISR()`
`resetFromISR()`
`changePeriodFromISR()`

Start, stop and reset a timer or change a timer's period (as above) BUT from within an ISR.  These functions MUST be called when doing timer operations within an ISR.

```C++
// EXAMPLE USAGE
timer.startFromISR(); // WITHIN an ISR, starts timer if stopped or resets it if started.

timer.stopFromISR(); // WITHIN an ISR,stops a running timer.

timer.resetFromISR(); // WITHIN an ISR, reset timer if running, or start timer if stopped.

timer.changePeriodFromISR(newPeriod);  // WITHIN an ISR, change the timer period.
```

### dispose()

`dispose()`

Stop and remove a timer from the (max. 10) timer list, freeing a timer "slot" in the list.

```C++
// EXAMPLE USAGE
timer.dispose(); // stop and delete timer from timer list.

```

### isActive()

{{since when="0.5.0"}}

`bool isActive()`

Returns `true` if the timer is in active state (pending), or `false` otherwise.

```C++
// EXAMPLE USAGE
if (timer.isActive()) {
    // ...
}
```

{{#if has-application-watchdog}}

## Application Watchdog

{{since when="0.5.0"}}

The Application Watchdog is a software-implemented watchdog using a critical-priority thread that wakes up at a given timeout interval to see if the application has checked in.

If the application has not exited loop, or called Particle.process() within the given timeout, or called `ApplicationWatchdog.checkin()`, the watchdog calls the given timeout function, which is typically `System.reset`.  This could also be a user defined function that takes care of critical tasks before finally calling `System.reset`.


```cpp
// SYNTAX
// declare a global watchdog instance
ApplicationWatchdog wd(timeout_milli_seconds, timeout_function_to_call, stack_size);

// default stack_size of 512 bytes is used
ApplicationWatchdog wd(timeout_milli_seconds, timeout_function_to_call);

// EXAMPLE USAGE
// reset the system after 60 seconds if the application is unresponsive
ApplicationWatchdog wd(60000, System.reset);

void loop() {
  while (some_long_process_within_loop) {
    wd.checkin(); // resets the AWDT count
  }
}
// AWDT count reset automatically after loop() ends
```

A default `stack_size` of 512 is used for the thread. `stack_size` is an optional parameter. The stack can be made larger or smaller as needed.  This is the amount of memory needed to support the thread and function that is called.  In practice, on the Photon (v0.5.0) calling the `System.reset` function requires approx. 170 bytes of memory. If not enough memory is allocated, the application will crash due to a Stack Overflow.  The RGB LED will flash a [red SOS pattern, followed by 13 blinks](/tutorials/device-os/led#red-flash-sos).

The application watchdog requires interrupts to be active in order to function.  Enabling the hardware watchdog in combination with this is recommended, so that the system resets in the event that interrupts are not firing.

{{/if}} {{!-- has-application-watchdog --}}

## Math

Note that in addition to functions outlined below all of the newlib math functions described at [sourceware.org](https://sourceware.org/newlib/libm.html) are also available for use by simply including the math.h header file thus:

`#include "math.h"`

### min()

Calculates the minimum of two numbers.

`min(x, y)`

`x` is the first number, any data type
`y` is the second number, any data type

The functions returns the smaller of the two numbers.

```C++
// EXAMPLE USAGE
sensVal = min(sensVal, 100); // assigns sensVal to the smaller of sensVal or 100
                             // ensuring that it never gets above 100.
```

**NOTE:**
Perhaps counter-intuitively, max() is often used to constrain the lower end of a variable's range, while min() is used to constrain the upper end of the range.

**WARNING:**
Because of the way the min() function is implemented, avoid using other functions inside the brackets, it may lead to incorrect results

```C++
min(a++, 100);   // avoid this - yields incorrect results

a++;
min(a, 100);    // use this instead - keep other math outside the function
```

### max()

Calculates the maximum of two numbers.

`max(x, y)`

`x` is the first number, any data type
`y` is the second number, any data type

The functions returns the larger of the two numbers.

```C++
// EXAMPLE USAGE
sensVal = max(senVal, 20); // assigns sensVal to the larger of sensVal or 20
                           // (effectively ensuring that it is at least 20)
```

**NOTE:**
Perhaps counter-intuitively, max() is often used to constrain the lower end of a variable's range, while min() is used to constrain the upper end of the range.

**WARNING:**
Because of the way the max() function is implemented, avoid using other functions inside the brackets, it may lead to incorrect results

```C++
max(a--, 0);   // avoid this - yields incorrect results

a--;           // use this instead -
max(a, 0);     // keep other math outside the function
```

### abs()

Computes the absolute value of a number.

`abs(x);`

where `x` is the number

The function returns `x` if `x` is greater than or equal to `0`
and returns `-x` if `x` is less than `0`.

**WARNING:**
Because of the way the abs() function is implemented, avoid using other functions inside the brackets, it may lead to incorrect results.

```C++
abs(a++);   // avoid this - yields incorrect results

a++;          // use this instead -
abs(a);       // keep other math outside the function
```

### constrain()

Constrains a number to be within a range.

`constrain(x, a, b);`

`x` is the number to constrain, all data types
`a` is the lower end of the range, all data types
`b` is the upper end of the range, all data types

The function will return:
`x`: if x is between `a` and `b`
`a`: if `x` is less than `a`
`b`: if `x` is greater than `b`

```C++
// EXAMPLE USAGE
sensVal = constrain(sensVal, 10, 150);
// limits range of sensor values to between 10 and 150
```

### map()

```C++
// EXAMPLE USAGE

// Map an analog value to 8 bits (0 to 255)
void setup() {
  pinMode(D1, OUTPUT);
}

void loop()
{
  int val = analogRead(A0);
  val = map(val, 0, 4095, 0, 255);
  analogWrite(D1, val);
}
```

Re-maps a number from one range to another. That is, a value of fromLow would get mapped to `toLow`, a `value` of `fromHigh` to `toHigh`, values in-between to values in-between, etc.

`map(value, fromLow, fromHigh, toLow, toHigh);`

Does not constrain values to within the range, because out-of-range values are sometimes intended and useful. The `constrain()` function may be used either before or after this function, if limits to the ranges are desired.

Note that the "lower bounds" of either range may be larger or smaller than the "upper bounds" so the `map()` function may be used to reverse a range of numbers, for example

`y = map(x, 1, 50, 50, 1);`

The function also handles negative numbers well, so that this example

`y = map(x, 1, 50, 50, -100);`

is also valid and works well.

When called with integers, the `map()` function uses integer math so will not generate fractions, when the math might indicate that it should do so. Fractional remainders are truncated, not rounded.

*Parameters can either be integers or floating point numbers:*

- `value`: the number to map
- `fromLow`: the lower bound of the value's current range
- `fromHigh`: the upper bound of the value's current range
- `toLow`: the lower bound of the value's target range
- `toHigh`: the upper bound of the value's target range

The function returns the mapped value, as integer or floating point depending on the arguments.

*Appendix:*
For the mathematically inclined, here's the whole function

```C++
int map(int value, int fromStart, int fromEnd, int toStart, int toEnd)
{
    if (fromEnd == fromStart) {
        return value;
    }
    return (value - fromStart) * (toEnd - toStart) / (fromEnd - fromStart) + toStart;
}
```

### pow()

Calculates the value of a number raised to a power. `pow()` can be used to raise a number to a fractional power. This is useful for generating exponential mapping of values or curves.

`pow(base, exponent);`

`base` is the number *(float)*
`exponent` is the power to which the base is raised *(float)*

The function returns the result of the exponentiation *(double)*

EXAMPLE **TBD**

### sqrt()

Calculates the square root of a number.

`sqrt(x)`

`x` is the number, any data type

The function returns the number's square root *(double)*

## Random Numbers

The firmware incorporates a pseudo-random number generator.

### random()

Retrieves the next random value, restricted to a given range.

 `random(max);`

Parameters

- `max` - the upper limit of the random number to retrieve.

Returns: a random value between 0 and up to, but not including `max`.

```c++
int r = random(10);
// r is >= 0 and < 10
// The smallest value returned is 0
// The largest value returned is 9
```

 NB: When `max` is 0, the result is always 0.

---

`random(min,max);`

Parameters:

 - `min` - the lower limit (inclusive) of the random number to retrieve.
 - `max` - the upper limit (exclusive) of the random number to retrieve.

Returns: a random value from `min` and up to, but not including `max`.


```c++
int r = random(10, 100);
// r is >= 10 and < 100
// The smallest value returned is 10
// The largest value returned is 99
```

  NB: If `min` is greater or equal to `max`, the result is always 0.

### randomSeed()

`randomSeed(newSeed);`

Parameters:

 - `newSeed` - the new random seed

The pseudorandom numbers produced by the firmware are derived from a single value - the random seed.
The value of this seed fully determines the sequence of random numbers produced by successive
calls to `random()`. Using the same seed on two separate runs will produce
the same sequence of random numbers, and in contrast, using different seeds
will produce a different sequence of random numbers.

On startup, the default random seed is [set by the system](http://www.cplusplus.com/reference/cstdlib/srand/) to 1.
Unless the seed is modified, the same sequence of random numbers would be produced each time
the system starts.

Fortunately, when the device connects to the cloud, it receives a very randomized seed value,
which is used as the random seed. So you can be sure the random numbers produced
will be different each time your program is run.


*** Disable random seed from the cloud ***

When the device receives a new random seed from the cloud, it's passed to this function:

```
void random_seed_from_cloud(unsigned int seed);
```

The system implementation of this function calls `randomSeed()` to set
the new seed value. If you don't wish to use random seed values from the cloud,
you can take control of the random seeds set by adding this code to your app:

```cpp
void random_seed_from_cloud(unsigned int seed) {
   // don't do anything with this. Continue with existing seed.
}
```

In the example, the seed is simply ignored, so the system will continue using
whatever seed was previously set. In this case, the random seed will not be set
from the cloud, and setting the seed is left to up you.

{{#if has-eeprom}}

## EEPROM

{{#if has-eeprom-file}}
EEPROM emulation allows small amounts  of data to be stored and persisted even across reset, power down, and user and system firmware flash operations.

On the {{device}} the EEPROM emulation is stored as a file on the flash file system. Since the data is spread across a large number of flash sectors, flash erase-write cycle limits should not be an issue in general.

{{else}}
EEPROM emulation allocates a region of the device's built-in Flash memory to act as EEPROM.
Unlike "true" EEPROM, flash doesn't suffer from write "wear" with each write to
each individual address. Instead, the page suffers wear when it is filled.

Each write containing changed values will add more data to the page until it is full, causing a page erase.  When writing unchanged data, there is no flash wear, but there is a penalty in CPU cycles. Try not write to EEPROM every loop() iteration to avoid unnecessary CPU cycle penalties.  {{#if has-backup-ram}}Backup RAM may be a better storage solution for quickly changing values.  (see [Backup RAM (SRAM)](#backup-ram-sram-)){{/if}}

The EEPROM functions can be used to store small amounts of data in Flash that
will persist even after the device resets after a deep sleep or is powered off.
{{/if}}


### length()
Returns the total number of bytes available in the emulated EEPROM.

```c++
// SYNTAX
size_t length = EEPROM.length();
```

- The Core has 127 bytes of emulated EEPROM.
- The Gen 2 (Photon, P1, Electron, and E Series) have 2047 bytes of emulated EEPROM.
- The Gen 3 (Argon, Boron, Xenon) devices have 4096 bytes of emulated EEPROM.

### put()
This function will write an object to the EEPROM. You can write single values like `int` and
`float` or group multiple values together using `struct` to ensure that all values of the struct are
updated together.

```
// SYNTAX
EEPROM.put(int address, object)
```

`address` is the start address (int) of the EEPROM locations to write. It must be a value between 0
and `EEPROM.length()-1`

`object` is the object data to write. The number of bytes to write is automatically determined from
the type of object.

```C++
// EXAMPLE USAGE
// Write a value (2 bytes in this case) to the EEPROM address
int addr = 10;
uint16_t value = 12345;
EEPROM.put(addr, value);

// Write an object to the EEPROM address
addr = 20;
struct MyObject {
  uint8_t version;
  float field1;
  uint16_t field2;
  char name[10];
};
MyObject myObj = { 0, 12.34f, 25, "Test!" };
EEPROM.put(addr, myObj);
```

The object data is first compared to the data written in the EEPROM to avoid writing values that
haven't changed.

If the {{device}} loses power before the write finishes, the partially written data will be ignored.

If you write several objects to EEPROM, make sure they don't overlap: the address of the second
object must be larger than the address of the first object plus the size of the first object. You
can leave empty room between objects in case you need to make the first object bigger later.

### get()
This function will retrieve an object from the EEPROM. Use the same type of object you used in the
`put` call.

```
// SYNTAX
EEPROM.get(int address, object)
```

`address` is the start address (int) of the EEPROM locations to read. It must be a value between 0
and `EEPROM.length()-1`

`object` is the object data that would be read. The number of bytes read is automatically determined
from the type of object.

```C++
// EXAMPLE USAGE
// Read a value (2 bytes in this case) from EEPROM addres
int addr = 10;
uint16_t value;
EEPROM.get(addr, value);
if(value == 0xFFFF) {
  // EEPROM was empty -> initialize value
  value = 25;
}

// Read an object from the EEPROM addres
addr = 20;
struct MyObject {
  uint8_t version;
  float field1;
  uint16_t field2;
  char name[10];
};
MyObject myObj;
EEPROM.get(addr, myObj);
if(myObj.version != 0) {
  // EEPROM was empty -> initialize myObj
  MyObject defaultObj = { 0, 12.34f, 25, "Test!" };
  myObj = defaultObj;
}
```

The default value of bytes in the EEPROM is 255 (hexadecimal 0xFF) so reading an object on a new
{{device}} will return an object filled with 0xFF. One trick to deal with default data is to include
a version field that you can check to see if there was valid data written in the EEPROM.

### read()
Read a single byte of data from the emulated EEPROM.

```
// SYNTAX
uint8_t value = EEPROM.read(int address);
```

`address` is the address (int) of the EEPROM location to read

```C++
// EXAMPLE USAGE

// Read the value of the second byte of EEPROM
int addr = 1;
uint8_t value = EEPROM.read(addr);
```

When reading more than 1 byte, prefer `get()` over multiple `read()` since it's faster.

### write()
Write a single byte of data to the emulated EEPROM.

```
// SYNTAX
write(int address, uint8_t value);
```

`address` is the address (int) of the EEPROM location to write to
`value` is the byte data (uint8_t) to write

```C++
// EXAMPLE USAGE

// Write a byte value to the second byte of EEPROM
int addr = 1;
uint8_t val = 0x45;
EEPROM.write(addr, val);
```

When writing more than 1 byte, prefer `put()` over multiple `write()` since it's faster and it ensures
consistent data even when power is lost while writing.

The object data is first compared to the data written in the EEPROM to avoid writing values that
haven't changed.

### clear()
Erase all the EEPROM so that all reads will return 255 (hexadecimal 0xFF).

```C++
// EXAMPLE USAGE
// Reset all EEPROM locations to 0xFF
EEPROM.clear();
```

{{#unless has-eeprom-file}}
Calling this function pauses processor execution (including code running in interrupts) for 800ms since
no instructions can be fetched from Flash while the Flash controller is busy erasing both EEPROM
pages.
{{/unless}}

{{#unless has-eeprom-file}}
### hasPendingErase()
### performPendingErase()

*Automatic page erase is the default behavior. This section describes optional functions the
application can call to manually control page erase for advanced use cases.*

After enough data has been written to fill the first page, the EEPROM emulation will write new data
to a second page. The first page must be erased before being written again.

Erasing a page of Flash pauses processor execution (including code running in interrupts) for 500ms since
no instructions can be fetched from Flash while the Flash controller is busy erasing the EEPROM
page. This could cause issues in applications that use EEPROM but rely on precise interrupt timing.

`hasPendingErase()` lets the application developer check if a full EEPROM page needs to be erased.
When the application determines it is safe to pause processor execution to erase EEPROM it calls
`performPendingErase()`. You can call this at boot, or when your device is idle if you expect it to
run without rebooting for a long time.

```
// EXAMPLE USAGE
void setup() {
  // Erase full EEPROM page at boot when necessary
  if(EEPROM.hasPendingErase()) {
    EEPROM.performPendingErase();
  }
}
```

To estimate how often page erases will be necessary in your application, assume that it takes
`2*EEPROM.length()` byte writes to fill a page (it will usually be more because not all bytes will always be
updated with different values).

If the application never calls `performPendingErase()` then the pending page erase will be performed
when data is written using `put()` or `write()` and both pages are full. So calling
`performPendingErase()` is optional and provided to avoid the uncertainty of a potential processor
pause any time `put()` or `write()` is called.
{{/unless}} {{!-- has-eeprom-file --}}


{{/if}}

{{#if has-backup-ram}}
## Backup RAM (SRAM)

The STM32F2xx features 4KB of backup RAM (3068 bytes for Device OS
version v0.6.0 and later) of which is available to the user. Unlike the regular RAM memory, the backup RAM is retained so long as power is provided to VIN or to VBAT. In particular this means that the data in backup RAM is retained when:

- the device goes into deep sleep mode
- the device is hardware or software reset (while maintaining power)
- power is removed from VIN but retained on VBAT (which will retain both the backup RAM and the RTC)

Note that _if neither VIN or VBAT is powered then the contents of the backup RAM will be lost; for data to be
retained, the device needs a power source._  For persistent storage of data through a total power loss, please use the [EEPROM](#eeprom).

Power Conditions and how they relate to Backup RAM initialization and data retention:

| Power Down Method | Power Up Method | When VIN Powered | When VBAT Powered | SRAM Initialized | SRAM Retained |
| -: | :- | :-: | :-: | :-: | :-: |
| Power removed on VIN and VBAT | Power applied on VIN | - | No<sup>[1]</sup> | Yes | No |
| Power removed on VIN and VBAT | Power applied on VIN | - | Yes | Yes | No |
| Power removed on VIN | Power applied on VIN | - | Yes | No | Yes |
| System.sleep(SLEEP_MODE_DEEP) | Rising edge on WKP pin, or Hard Reset | Yes | Yes/No | No | Yes |
| System.sleep(SLEEP_MODE_DEEP,10) | RTC alarm after 10 seconds | Yes | Yes/No | No | Yes |
| System.reset() | Boot after software reset | Yes | Yes/No | No | Yes |
| Hard reset | Boot after hard reset | Yes | Yes/No | No | Yes |

<sup>[1]</sup> Note: If VBAT is floating when powering up for the first time, SRAM remains uninitialized.  When using this feature for Backup RAM, it is recommended to have VBAT connected to a 3V3 or a known good power source on system first boot.  When using this feature for Extra RAM, it is recommended to jumper VBAT to GND to ensure it always initializes on system first boot.

### Storing data in Backup RAM (SRAM)

With regular RAM, data is stored in RAM by declaring variables.

```C++
// regular variables stored in RAM
float lastTemperature;
int numberOfPresses;
int numberOfTriesRemaining = 10;
```

This tells the system to store these values in RAM so they can be changed. The
system takes care of giving them initial values. Before they are set,
they will have the initial value 0 if an initial value isn't specified.

Variables stored in backup RAM follow a similar scheme but use an additional keyword `retained`:

```C++
// retained variables stored in backup RAM
retained float lastTemperature;
retained int numberOfPresses;
retained int numberOfTriesRemaining = 10;
```

A `retained` variable is similar to a regular variable, with some key differences:

- it is stored in backup RAM - no space is used in regular RAM
- instead of being initialized on each program start, `retained` variables are initialized
when the device is first powered on (with VIN, from being powered off with VIN and VBAT completely removed).
When the device is powered on, the system takes care of setting these variables to their initial values.
`lastTemperature` and `numberOfPresses` would be initialized to 0, while `numberOfTriesRemaining` would be initialized to 10.
- the last value set on the variable is retained *as long as the device is powered from VIN or VBAT and is not hard reset*.

`retained` variables can be updated freely just as with regular RAM variables and operate
just as fast as regular RAM variables.

Here's some typical use cases for `retained` variables:

- storing data for use after waking up from deep sleep
- storing data for use after power is removed on VIN, while power is still applied to VBAT (with coin cell battery or super capacitor)
- storing data for use after a hardware or software reset

Finally, if you don't need the persistence of `retained` variables, you
can consider them simply as extra RAM to use.

```C++
// EXAMPLE USAGE
STARTUP(System.enableFeature(FEATURE_RETAINED_MEMORY));

retained int value = 10;

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println(value);
    value = 20;
    Serial.println(value);
    delay(100); // Give the serial TX buffer a chance to empty
    System.sleep(SLEEP_MODE_DEEP, 10);
    // Or try a software reset
    // System.reset();
}

/* OUTPUT
 *
 * 10
 * 20
 * DEEP SLEEP for 10 seconds
 * 20 (value is retained as 20)
 * 20
 *
 */
```

### Enabling Backup RAM (SRAM)

Backup RAM is disabled by default, since it does require some maintenance power
which may not be desired on some low-powered projects.  Backup RAM consumes roughly
5uA or less on VIN and 9uA or less on VBAT.

Backup RAM is enabled with this code (to be placed at the top of your application outside of any functions):

```cpp

STARTUP(System.enableFeature(FEATURE_RETAINED_MEMORY));

```

### Making changes to the layout or types of retained variables

When adding new `retained` variables to an existing set of `retained` variables,
it's a good idea to add them after the existing variables. this ensures the
existing retained data is still valid even with the new code.

For example, if we wanted to add a new variable `char name[50]` we should add this after
the existing `retained` variables:

```
retained float lastTemperature;
retained int numberOfPresses;
retained int numberOfTriesRemaining = 10;
retained char name[50];
```

If instead we added `name` to the beginning or middle of the block of variables,
the program would end up reading the stored values of the wrong variables.  This is
because the new code would be expecting to find the variables in a different memory location.

Similarly, you should avoid changing the type of your variables as this will also
alter the memory size and location of data in memory.

This caveat is particularly important when updating firmware without power-cycling
the device, which uses a software reset to reboot the device.  This will allow previously
`retained` variables to persist.

During development, a good suggestion to avoid confusion is to design your application to work
correctly when power is being applied for the first time, and all `retained` variables are
initialized.  If you must rearrange variables, simply power down the device (VIN and VBAT)
after changes are made to allow reinitialization of `retained` variables on the next power
up of the device.

It's perfectly fine to mix regular and `retained` variables, but for clarity we recommend
keeping the `retained` variables in their own separate block. In this way it's easier to recognize
when new `retained` variables are added to the end of the list, or when they are rearranged.


{{/if}} {{!-- has-backup-ram --}}

## Macros

### STARTUP()

{{since when="0.4.5"}}

Typically an application will have its initialization code in the `setup()` function.
This works well if a delay of a few seconds from power on/reset is acceptable.

In other cases, the application wants to have code run as early as possible, before the cloud or network connection
are initialized. The `STARTUP()` function instructs the system to execute the code early on in startup.

```cpp
void setup_the_fundulating_conbobulator()
{
   pinMode(D3, OUTPUT);
   digitalWrite(D3, HIGH);
}

// The STARTUP call is placed outside of any other function
// What goes inside is any valid code that can be executed. Here, we use a function call.
// Using a single function is preferable to having several `STARTUP()` calls.
STARTUP( setup_the_fundulating_conbobulator() );

```

The code referenced by `STARTUP()` is executed very early in the startup sequence, so it's best suited
to initializing digital I/O and peripherals. Networking setup code should still be placed in `setup()`.
{{#if has-wifi-antenna-switch}}
Although there is one notable exception - `WiFi.selectAntenna()` should be called from `STARTUP()` to select the default antenna before the Wi-Fi connection is made.
{{/if}}

_Note that when startup code performs digital I/O, there will still be a period of at least few hundred milliseconds
where the I/O pins are in their default power-on state, namely `INPUT`. Circuits should be designed with this
in mind, using pullup/pulldown resistors as appropriate._

### PRODUCT_ID()

When preparing software for your product, it is essential to include your product ID and version at the top of the firmware source code.

```cpp
// EXAMPLE
PRODUCT_ID(94); // replace by your product ID
PRODUCT_VERSION(1); // increment each time you upload to the console
```

You can find more details about the product ID and how to get yours in the [_Console_ guide.](/tutorials/device-cloud/console#your-product-id)

## System Events

{{since when="0.4.9"}}

### System Events Overview

System events are messages sent by the system and received by application code. They inform the application about changes in the system, such as when the system has entered setup mode (listening mode, blinking dark blue), or when an Over-the-Air (OTA) update starts, or when the system is about to reset.

System events are received by the application by registering a handler. The handler has this general format:

```
void handler(system_event_t event, int data, void* moredata);
```

Unused parameters can be removed from right to left, giving these additional function signatures:

```
void handler(system_event_t event, int data);
void handler(system_event_t event);
void handler();
```

Here's an example of an application that listens for `reset` events so that the application is notified the device is about to reset. The application publishes a reset message to the cloud and turns off connected equipment before returning from the handler, allowing the device to reset.

```
void reset_handler()
{
	// turn off the crankenspitzen
	digitalWrite(D6, LOW);
	// tell the world what we are doing
	Particle.publish("reset", "going down for reboot NOW!");
}

void setup()
{
	// register the reset handler
	System.on(reset, reset_handler);
}
```

Some event types provide additional information. For example the `button_click` event provides a parameter with the number of button clicks:

```
void button_clicked(system_event_t event, int param)
{
	int times = system_button_clicks(param);
	Serial.printlnf("button was clicked %d times", times);
}
```

#### Registering multiple events with the same handler

It's possible to subscribe to multiple events with the same handler in cases where you want the same handler to be notified for all the events. For example:

```
void handle_all_the_events(system_event_t event, int param)
{
	Serial.printlnf("got event %d with value %d", event, param);
}

void setup()
{
	// listen for Wi-Fi Listen events and Firmware Update events
	System.on(wifi_listen+firmware_update, handle_all_the_events);
}
```

To subscribe to all events, there is the placeholder `all_events`:

```
void setup()
{
	// listen for network events and firmware update events
	System.on(all_events, handle_all_the_events);
}
```

### System Events Reference

These are the system events produced by the system, their numeric value (what you will see when printing the system event to Serial) and details of how to handle the parameter value. The version of firmware these events became available is noted in the first column below.

Setup mode is also referred to as listening mode (blinking dark blue).

| Since | Event Name | ID | Description | Parameter |
|-------|------------|----|-------------|-----------|
|       | setup_begin | 2 | signals the device has entered setup mode |  not used |
|       | setup_update | 4 | periodic event signaling the device is still in setup mode. | milliseconds since setup mode was started |
|       | setup_end | 8 | signals setup mode was exited | time in ms since setup mode was started |
|       | network_credentials | 16 | network credentials were changed | `network_credentials_added` or `network_credentials_cleared` |
| 0.6.1 | network_status | 32 | network connection status | one of `network_status_powering_on`, `network_status_on`, `network_status_powering_off`, `network_status_off`, `network_status_connecting`, `network_status_connected` |
| 0.6.1 | cloud_status | 64 | cloud connection status | one of `cloud_status_connecting`, `cloud_status_connected`, `cloud_status_disconnecting`, `cloud_status_disconnected` |
|       | button_status | 128 | button pressed or released | the duration in ms the button was pressed: 0 when pressed, >0 on release. |
|       | firmware_update | 256 | firmware update status | one of `firmware_update_begin`, `firmware_update_progress`, `firmware_update_complete`, `firmware_update_failed` |
|       | firmware_update_pending | 512 | notifies the application that a firmware update is available. This event is sent even when updates are disabled, giving the application chance to re-enable firmware updates with `System.enableUpdates()` | not used |
|       | reset_pending | 1024 | notifies the application that the system would like to reset. This event is sent even when resets are disabled, giving the application chance to re-enable resets with `System.enableReset()` | not used |
|       | reset | 2048 | notifies that the system will reset once the application has completed handling this event | not used |
|       | button_click | 4096 | event sent each time setup button is clicked. | `int clicks = system_button_clicks(param); ` retrieves the number of clicks so far. |
|       | button_final_click | 8192 | sent after a run of one or more clicks not followed by additional clicks. Unlike the `button_click` event, the `button_final_click` event is sent once, at the end of a series of clicks. | `int clicks = system_button_clicks(param); ` retrieves the number of times the button was pushed. |
| 0.6.1 | time_changed | 16384 | device time changed | `time_changed_manually` or `time_changed_sync` |
| 0.6.1 | low_battery | 32768 | generated when low battery condition is detected. | not used |
| 0.8.0 | out_of_memory | 1<<18 | event generated when a request for memory could not be satisfied | the amount in bytes of memory that could not be allocated | 

## System Modes

System modes help you control how the device manages the connection with the cloud.

By default, the device connects to the Cloud and processes messages automatically. However there are many cases where a user will want to take control over that connection. There are three available system modes: `AUTOMATIC`, `SEMI_AUTOMATIC`, and `MANUAL`. These modes describe how connectivity is handled.
These system modes describe how connectivity is handled and when user code is run.

System modes must be called before the setup() function. By default, the device is always in `AUTOMATIC` mode.

### Automatic mode

The automatic mode of connectivity provides the default behavior of the device, which is that:

```cpp
SYSTEM_MODE(AUTOMATIC);

void setup() {
  // This won't be called until the device is connected to the cloud
}

void loop() {
  // Neither will this
}
```

- When the device starts up, it automatically tries to connect to Wi-Fi and the Particle Device Cloud.
- Once a connection with the Particle Device Cloud has been established, the user code starts running.
- Messages to and from the Cloud are handled in between runs of the user loop; the user loop automatically alternates with [`Particle.process()`](#particle-process-).
- `Particle.process()` is also called during any delay() of at least 1 second.
- If the user loop blocks for more than about 20 seconds, the connection to the Cloud will be lost. To prevent this from happening, the user can call `Particle.process()` manually.
- If the connection to the Cloud is ever lost, the device will automatically attempt to reconnect. This re-connection will block from a few milliseconds up to 8 seconds.
- `SYSTEM_MODE(AUTOMATIC)` does not need to be called, because it is the default state; however the user can invoke this method to make the mode explicit.

In automatic mode, the user can still call `Particle.disconnect()` to disconnect from the Cloud, but is then responsible for re-connecting to the Cloud by calling `Particle.connect()`.

### Semi-automatic mode


The semi-automatic mode will not attempt to connect the device to the Cloud automatically. However once the device is connected to the Cloud (through some user intervention), messages will be processed automatically, as in the automatic mode above.

```cpp
SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
  // This is called immediately
}

void loop() {
  if (buttonIsPressed()) {
    Particle.connect();
  } else {
    doOfflineStuff();
  }
}
```

The semi-automatic mode is therefore much like the automatic mode, except:

- When the device boots up, `setup()` and `loop()` will begin running immediately.
- Once the user calls [`Particle.connect()`](#particle-connect-), the user code will be blocked while the device attempts to negotiate a connection. This connection will block execution of `loop()` or `setup()` until either the device connects to the Cloud or an interrupt is fired that calls [`Particle.disconnect()`](#particle-disconnect-).

### Manual mode


The "manual" mode puts the device's connectivity completely in the user's control. This means that the user is responsible for both establishing a connection to the Particle Device Cloud and handling communications with the Cloud by calling [`Particle.process()`](#particle-process-) on a regular basis.

```cpp
SYSTEM_MODE(MANUAL);

void setup() {
  // This will run automatically
}

void loop() {
  if (buttonIsPressed()) {
    Particle.connect();
  }
  if (Particle.connected()) {
    Particle.process();
    doOtherStuff();
  }
}
```

When using manual mode:

- The user code will run immediately when the device is powered on.
- Once the user calls [`Particle.connect()`](#particle-connect-), the device will attempt to begin the connection process.
- Once the device is connected to the Cloud ([`Particle.connected()`](#particle-connected-) ` == true`), the user must call `Particle.process()` regularly to handle incoming messages and keep the connection alive. The more frequently `Particle.process()` is called, the more responsive the device will be to incoming messages.
- If `Particle.process()` is called less frequently than every 20 seconds, the connection with the Cloud will die. It may take a couple of additional calls of `Particle.process()` for the device to recognize that the connection has been lost.


{{#if has-threading}}
## System Thread

{{since when="0.4.6"}}

The System Thread is a system configuration that helps ensure the application loop
is not interrupted by the system background processing and network management.
It does this by running the application loop and the system loop on separate threads,
so they execute in parallel rather than sequentially.

At present, System Thread is an opt-in change. To enable system threading for your application, add to the top of your application code.

```
// EXAMPLE USAGE
SYSTEM_THREAD(ENABLED);
```



### System Threading Behavior

When the system thread is enabled, application execution changes compared to
non-threaded execution:

- `setup()` is executed immediately regardless of the system mode, which means
setup typically executes before the Network or Cloud is connected.
Calls to network-related code will be impacted and may fail because the network is not up yet.
`Particle.function()`, `Particle.variable()` and `Particle.subscribe()` will function
as intended whether the cloud is connected or not.  `Particle.publish()` will return
`false` when the cloud is not available and the event will not be published.
Other network initialisation (such as those in `UDP`, `TCPServer` and `TCPClient`)
may not function yet.
See `waitUntil` below for details on waiting for the network or cloud connection.

- after `setup()` is called, `loop()` is called repeatedly, independent from the current state of the
network or cloud connection. The system does not block `loop()` waiting
for the network or cloud to be available, nor while connecting to Wi-Fi.

- System modes `SEMI_AUTOMATIC` and `MANUAL` behave identically - both of these
modes do not not start the Networking or a Cloud
connection automatically, while `AUTOMATIC` mode connects to the cloud as soon as possible.
Neither has an effect on when the application `setup()` function is run - it is run
as soon as possible, independently from the system network activities, as described above.

- `Particle.process()` and `delay()` are not needed to keep the background tasks active - they run independently. These functions have a new role in keeping the application events serviced. Application events are:
 - cloud function calls
 - cloud events
 - system events

- Cloud functions registered with `Particle.function()` and event handlers
registered with `Particle.subscribe()` continue to execute on the application
thread in between calls to `loop()`, or when `Particle.process()` or `delay()` is called.
A long running cloud function will block the application loop (since it is application code)
but not the system code, so cloud connectivity is maintained.

 - the application continues to execute during listening mode
 - the application continues to execute during OTA updates

### System Functions

With system threading enabled, the majority of the Particle API continues to run on the calling thread, as it does for non-threaded mode. For example, when a function, such as `Time.now()`, is called, it is processed entirely on the calling thread (typically the application thread when calling from `loop()`.)

There are a small number of API functions that are system functions. These functions execute on the system thread regardless of which thread they are called from.

There are two types of system functions:

- asynchronous system functions: these functions do not return a result to the caller and do not block the caller
- synchronous system functions: these functions return a result to the caller, and block the caller until the function completes

Asynchronous system functions do not block the application thread, even when the system thread is busy, so these can be used liberally without causing unexpected delays in the application.  (Exception: when more than 20 asynchronous system functions are invoked, but not yet serviced by the application thread, the application will block for 5 seconds while attempting to put the function on the system thread queue.)

Synchronous system functions always block the caller until the system has performed the requested operation. These are the synchronous system functions:

- `WiFi.hasCredentials()`, `WiFi.setCredentials()`, `WiFi.clearCredentials()`
- `Particle.function()`
- `Particle.variable()`
- `Particle.subscribe()`
- `Particle.publish()`

For example, when the system is busy connecting to Wi-Fi or establishing the cloud connection and the application calls `Particle.variable()` then the application will be blocked until the system finished connecting to the cloud (or gives up) so that it is free to service the `Particle.variable()` function call.

This presents itself typically in automatic mode and where `setup()` registers functions, variables or subscriptions. Even though the application thread is running `setup()` independently of the system thread, calling synchronous functions will cause the application to block until the system thread has finished connecting to the cloud. This can be avoided by delaying the cloud connection until after the synchronous functions have been called.

```
SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

void setup()
{
	// the system thread isn't busy so these synchronous functions execute quickly
    Particle.subscribe("event", handler);
	Particle.publish("myvar", myvar);
	Particle.connect();    // <-- now connect to the cloud, which ties up the system thread
}
```

### Task Switching

The Device OS includes an RTOS (Real Time Operating System). The RTOS is responsible for switching between the application thread and the system thread, which it does automatically every millisecond. This has 2 main consequences:

- delays close to 1ms are typically much longer
- application code may be stopped at any time when the RTOS switches to the system thread

When executing timing-critical sections of code, the task switching needs to be momentarily disabled.

### SINGLE_THREADED_BLOCK()

`SINGLE_THREADED_BLOCK()` declares that the next code block is executed in single threaded mode. Task switching is disabled until the end of the block and automatically re-enabled when the block exits. Interrupts remain enabled, so the thread may be interrupted for small periods of time, such as by interrupts from peripherals.

```
// SYNTAX
SINGLE_THREADED_BLOCK() {
   // code here is executed atomically, without task switching
   // or interrupts
}
```

Here's an example:

```
void so_timing_sensitive()
{
    if (ready_to_send) {
   		SINGLE_THREADED_BLOCK() { // single threaded execution starts now
	    		digitalWrite(D0, LOW);		// timing critical GPIO
    			delayMicroseconds(1500);
    			digitalWrite(D0, HIGH);
		}
    }  // single threaded execution stops now
}
```


### ATOMIC_BLOCK()

`ATOMIC_BLOCK()` is similar to `SINGLE_THREADED_BLOCK()` in that it prevents other threads executing during a block of code. In addition, interrupts are also disabled.

WARNING: Disabling interrupts prevents normal system operation. Consequently, `ATOMIC_BLOCK()` should be used only for brief periods where atomicity is essential.

```
// SYNTAX
ATOMIC_BLOCK() {
   // code here is executed atomically, without task switching
   // or interrupts
}
```

Here's an example:

```
void so_timing_sensitive_and_no_interrupts()
{
    if (ready_to_send) {
   		ATOMIC_BLOCK() { // only this code runs from here on - no other threads or interrupts
    		digitalWrite(D0, LOW);		// timing critical GPIO
    		delayMicroseconds(1500);
    		digitalWrite(D0, HIGH);
    		}
    }  // other threads and interrupts can run from here
}
```

### Synchronizing Access to Shared System Resources

With system threading enabled, the system thread and the application thread run in parallel. When both attempt to use the same resource, such as writing a message to `Serial`, there is no guaranteed order - the message printed by the system and the message printed by the application are arbitrarily interleaved as the RTOS rapidly switches between running a small part of the system code and then the application code. This results in both messages being intermixed.

This can be avoided by acquiring exclusive access to a resource. To get exclusive access to a resource, we can use locks. A lock
ensures that only the thread owning the lock can access the resource. Any other thread that tries to use the resource via the lock will not be granted access until the first thread eventually unlocks the resource when it is done.

At present there is only one shared resource that is used by the system and the application - `Serial`. The system makes use of `Serial` during listening mode. If the application also makes use of serial during listening mode, then it should be locked before use.

```
void print_status()
{
    WITH_LOCK(Serial) {
	    Serial.print("Current status is:");
    		Serial.println(status);
	}
}
```

The primary difference compared to using Serial without a lock is the `WITH_LOCK` declaration. This does several things:

- attempts to acquire the lock for `Serial`. If the lock isn't available, the thread blocks indefinitely until it is available.

- once `Serial` has been locked, the code in the following block is executed.

- when the block has finished executing, the lock is released, allowing other threads to use the resource.

It's also possible to attempt to lock a resource, but not block when the resource isn't available.

```
TRY_LOCK(Serial) {
    // this code is only run when no other thread is using Serial
}
```

The `TRY_LOCK()` statement functions similarly to `WITH_LOCK()` but it does not block the current thread if the lock isn't available. Instead, the entire block is skipped over.


### Waiting for the system

Use [waitUntil](#waituntil-) to delay the application indefinitely until the condition is met.

Use [waitFor](#waitfor-) to delay the application only for a period of time or the condition is met.

Makes your application wait until/for something that the system is doing, such as waiting for Wi-Fi to be ready or the Cloud to be connected. **Note:** that conditions must be a function that takes a void argument `function(void)` with the `()` removed, e.g. `Particle.connected` instead of `Particle.connected()`.  Functions should return 0/false to indicate waiting, or non-zero/true to stop waiting.  `bool` or `int` are valid return types.  If a complex expression is required, a separate function should be created to evaluate that expression.

#### waitUntil()

To delay the application indefinitely until the condition is met.

```
// SYNTAX
waitUntil(condition);

// Wait until the Cloud is connected to publish a critical event.
waitUntil(Particle.connected);
Particle.publish("weather", "sunny");
```

{{#if has-wifi}}`WiFi.ready` is another common event to wait until complete.

```cpp
// wait until Wi-Fi is ready
waitUntil(WiFi.ready);
```
{{/if}}
{{#if has-cellular}}`Cellular.ready` is another common event to wait until complete.

```cpp
// wait until Cellular is ready
waitUntil(Cellular.ready);
```
{{/if}}

#### waitFor()

To delay the application only for a period of time or the condition is met.

```cpp
// SYNTAX
waitFor(condition, timeout);

// wait up to 10 seconds for the cloud connection to be connected.
if (waitFor(Particle.connected, 10000)) {
    Particle.publish("weather", "sunny");
}

// wait up to 10 seconds for the cloud connection to be disconnected.
// Here we have to add a function to invert the condition.
bool notConnected() {
    return !Particle.connected();
}
if (waitFor(notConnected, 10000)) {
    Particle.publish("weather", "sunny");
}
```

{{/if}} {{!-- has-threading --}}

## System Calls

### version()

{{since when="0.4.7"}}

Determine the version of Device OS available. Returns a version string
of the format:

> MAJOR.MINOR.PATCH

Such as "0.4.7".

For example

```

void setup()
{
   Serial.printlnf("System version: %s", System.version().c_str());
   // prints
   // System version: 0.4.7
}

```

### versionNumber()

Determines the version of Device OS available. Returns the version encoded
as a number:

> 0xAABBCCDD

 - `AA` is the major release
 - `BB` is the minor release
 - `CC` is the patch number
 - `DD` is 0

Firmware 0.4.7 has a version number 0x00040700


### buttonPushed()

{{since when="0.4.6"}}

Can be used to determine how long the System button (MODE on Core/Electron, SETUP on Photon) has been pushed.

Returns `uint16_t` as duration button has been held down in milliseconds.

```C++
// EXAMPLE USAGE
void button_handler(system_event_t event, int duration, void* )
{
    if (!duration) { // just pressed
        RGB.control(true);
        RGB.color(255, 0, 255); // MAGENTA
    }
    else { // just released
        RGB.control(false);
    }
}

void setup()
{
    System.on(button_status, button_handler);
}

void loop()
{
    // it would be nice to fire routine events while
    // the button is being pushed, rather than rely upon loop
    if (System.buttonPushed() > 1000) {
        RGB.color(255, 255, 0); // YELLOW
    }
}
```


### System Cycle Counter

{{since when="0.4.6"}}

The system cycle counter is incremented for each instruction executed. It functions
in normal code and during interrupts. Since it operates at the clock frequency
of the device, it can be used for accurately measuring small periods of time.

```cpp
    // overview of System tick functions
    uint32_t now = System.ticks();

    // for converting an the unknown system tick frequency into microseconds
    uint32_t scale = System.ticksPerMicrosecond();

    // delay a given number of ticks.
    System.ticksDelay(10);
```

The system ticks are intended for measuring times from less than a microsecond up
to a second. For longer time periods, using [micros()](#micros-) or [millis()](#millis-) would
be more suitable.


#### ticks()

Returns the current value of the system tick count. One tick corresponds to
one cpu cycle.

```cpp
    // measure a precise time whens something start
    uint32_t ticks = System.ticks();

```

#### ticksPerMicrosecond();

Retrieves the number of ticks per microsecond for this device. This is useful
when converting between a number of ticks and time in microseconds.

```cpp

    uint32_t start = System.ticks();
    startTheFrobnicator();
    uint32_t end = System.ticks();
    uint32_t duration = (end-start)/System.ticksPerMicrosecond();

    Serial.printlnf("The frobnicator took %d microseconds to start", duration);

```

#### ticksDelay()

Pause execution a given number of ticks. This can be used to implement precise
delays.

```cpp
    // delay 10 ticks. How long this is actually depends upon the clock speed of the
    // device.
    System.ticksDelay(10);

    // to delay for 3 microseconds on any device:
    System.ticksDelay(3*System.ticksPerMicrosecond());

```

The system code has been written such that the compiler can compute the number
of ticks to delay
at compile time and inline the function calls, reducing overhead to a minimum.



### freeMemory()

{{since when="0.4.4"}}

Retrieves the amount of free memory in the system in bytes.

```cpp
uint32_t freemem = System.freeMemory();
Serial.print("free memory: ");
Serial.println(freemem);
```


{{#if core}}
### factoryReset()

This will perform a factory reset and do the following:
- Restore factory reset firmware from external flash (tinker)
- Erase Wi-Fi profiles
- Enter Listening mode upon completion

```cpp
System.factoryReset()
```
{{/if}}
### dfu()

The device will enter DFU-mode to allow new user firmware to be refreshed. DFU mode is cancelled by
- flashing firmware to the device using dfu-util, specifying the `:leave` option, or
- a system reset

```cpp
System.dfu()
```

To make DFU mode permanent - so that it continues to enter DFU mode even after a reset until
new firmware is flashed, pass `true` to the `dfu()` function.

```cpp
System.dfu(true);   // persistent DFU mode - will enter DFU after a reset until firmware is flashed.
```


### deviceID()

`System.deviceID()` provides an easy way to extract the device ID of your device. It returns a [String object](#string-class) of the device ID, which is used to identify your device.

```cpp
// EXAMPLE USAGE

void setup()
{
  // Make sure your Serial Terminal app is closed before powering your device
  Serial.begin(9600);
  // Wait for a USB serial connection for up to 30 seconds
  waitFor(Serial.isConnected, 30000);

  String myID = System.deviceID();
  // Prints out the device ID over Serial
  Serial.println(myID);
}

void loop() {}
```

### enterSafeMode()

{{since when="0.4.6"}}

```C++
// SYNTAX
System.enterSafeMode();
```


Resets the device and restarts in safe mode.

{{#if has-sleep}}

### sleep() [ Sleep ]

`System.sleep()` can be used to dramatically improve the battery life of a Particle-powered project. There are several variations of `System.sleep()` based on which arguments are passed.

{{#if has-nrf52}}
Gen 3 devices (Argon, Boron, Xenon) only support sleep modes in 0.9.0 and later. Sleep does not function properly in 0.8.0-rc versions of Device OS for mesh devices.
{{/if}}

---

{{#if has-stm32}}
`System.sleep(SLEEP_MODE_DEEP, long seconds)` can be used to put the entire device into a *deep sleep* mode, sometimes referred to as "standby sleep mode."

```C++
// SYNTAX
System.sleep(SLEEP_MODE_DEEP, long seconds);

// EXAMPLE USAGE

// Put the device into deep sleep for 60 seconds
System.sleep(SLEEP_MODE_DEEP,60);
// The device LED will shut off during deep sleep

// Since 0.8.0
// Put the device into deep sleep for 60 seconds and disable {{#if core}}A7{{else}}WKP{{/if}} pin
System.sleep(SLEEP_MODE_DEEP, 60, SLEEP_DISABLE_WKP_PIN);
// The device LED will shut off during deep sleep
// The device will not wake up if a rising edge signal is applied to {{#if core}}A7{{else}}WKP{{/if}}
```

{{/if}} {{!-- has-stm32 --}}

{{#if has-nrf52}}
`System.sleep(SLEEP_MODE_DEEP)` can be used to put the entire device into a *deep sleep* mode, sometimes referred to as "standby sleep mode."


```C++
// SYNTAX
System.sleep(SLEEP_MODE_DEEP);

// EXAMPLE USAGE

// Put the device into deep sleep until wakened by D8.
System.sleep(SLEEP_MODE_DEEP);
// The device LED will shut off during deep sleep
```
{{/if}} {{!-- has-nrf52 --}}

In this particular mode, the device shuts down the network subsystem and puts the microcontroller in a standby mode. 

When the device awakens from deep sleep, it will reset and run all user code from the beginning with no values being maintained in memory from before the deep sleep.

The standby mode is used to achieve the lowest power consumption.  After entering standby mode, the RAM and register contents are lost{{#if has-backup-ram}} except for retained memory{{/if}}.


{{#if has-stm32}}
The device will automatically *wake up* after the specified number of seconds or by applying a rising edge signal to the {{#if core}}A7{{else}}WKP{{/if}} pin.

{{since when="0.8.0"}}
Wake up by {{#if core}}A7{{else}}WKP{{/if}} pin may be disabled by passing `SLEEP_DISABLE_WKP_PIN` option to `System.sleep()`: `System.sleep(SLEEP_MODE_DEEP, long seconds, SLEEP_DISABLE_WKP_PIN)`.

{{#if has-fuel-gauge}}
---

`System.sleep(SLEEP_MODE_SOFTPOWEROFF, long seconds)` is just like `SLEEP_MODE_DEEP`, with the added benefit that it also sleeps the Fuel Gauge. This is the only way to achieve the lowest quiescent current on the {{device}}, apart from sleeping the Fuel Gauge before calling `SLEEP_MODE_DEEP`. This is also the same net result as used in the user-activated Soft Power Down feature when you double-tap the Mode button and the Electron powers down.

```C++
// SYNTAX
System.sleep(SLEEP_MODE_SOFTPOWEROFF, long seconds);
```
{{/if}} {{!-- has-fuel-gauge --}}

{{/if}} {{!-- has-stm32 --}}

{{#if has-nrf52}}

The Gen 3 devices (Argon, Boron, Xenon) can only wake from SLEEP_MODE_DEEP by a high level on D8. It's not possible to exit SLEEP_MODE_DEEP based on time because the clock does not run in standby sleep mode on the nRF52. 

Also, the real-time-clock (Time class) will not be set when waking up from SLEEP_MODE_DEEP. It will get set on after the first cloud connection, but initially it will not be set. 

{{#if has-fuel-gauge}}
---

`System.sleep(SLEEP_MODE_SOFTPOWEROFF)` is just like `SLEEP_MODE_DEEP`, with the added benefit that it also sleeps the Fuel Gauge. This is the only way to achieve the lowest quiescent current on the {{device}}, apart from sleeping the Fuel Gauge before calling `SLEEP_MODE_DEEP`.
```C++
// SYNTAX
System.sleep(SLEEP_MODE_SOFTPOWEROFF);
```
{{/if}} {{!-- has-fuel-gauge --}}


{{/if}} {{!-- has-nrf52 --}}


---

`System.sleep(uint16_t wakeUpPin, uint16_t edgeTriggerMode)` can be used to put the entire device into a *stop* mode with *wakeup on interrupt*. In this particular mode, the device shuts down the network and puts the microcontroller in a stop mode with configurable wakeup pin and edge triggered interrupt. When the specific interrupt arrives, the device awakens from stop mode. {{#if core}}The Core is reset on entering stop mode and runs all user code from the beginning with no values being maintained in memory from before the stop mode. As such, it is recommended that stop mode be called only after all user code has completed.{{else}}The {{device}} will not reset before going into stop mode so all the application variables are preserved after waking up from this mode. This mode achieves the lowest power consumption while retaining the contents of RAM and registers.{{/if}}

```C++
// SYNTAX
System.sleep(uint16_t wakeUpPin, uint16_t edgeTriggerMode);
{{#if has-cellular}}
System.sleep(uint16_t wakeUpPin, uint16_t edgeTriggerMode, SLEEP_NETWORK_STANDBY);
{{/if}}

// EXAMPLE USAGE

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 pin
System.sleep(D1,RISING);
// The device LED will shut off during sleep
```

{{#if core}}
It is mandatory to update the *bootloader* (https://github.com/particle-iot/device-os/tree/bootloader-patch-update) for proper functioning of this mode.
{{/if}}

{{#if has-cellular}}
The Electron and Boron maintain the cellular connection for the duration of the sleep when  `SLEEP_NETWORK_STANDBY` is given as the last parameter value. On wakeup, the device is able to reconnect to the cloud much quicker, at the expense of increased power consumption.
{{/if}}


*Parameters:*

- `wakeUpPin`: the wakeup pin number. supports external interrupts on the following pins:
{{#if has-stm32}}
    - supports external interrupts on the following pins:
{{#unless core}}
      - D1, D2, D3, D4, A0, A1, A3, A4, A6, A7
{{else}}
      - D0, D1, D2, D3, D4, A0, A1, A3, A4, A5, A6, A7
{{/unless}}
      - The same [pin limitations as `attachInterrupt`](#attachinterrupt-) apply
{{else}}
    - all pins are allowed, but a maximum of 8 can be used at a time
{{/if}}
- `edgeTriggerMode`: defines when the interrupt should be triggered. Four constants are predefined as valid values:
    - CHANGE to trigger the interrupt whenever the pin changes value,
    - RISING to trigger when the pin goes from low to high,
    - FALLING for when the pin goes from high to low.
{{#if electron}}
- `SLEEP_NETWORK_STANDBY`: optional - keeps the cellular modem in a standby state while the device is sleeping..
{{/if}}

The device will automatically reconnect to the cloud if the cloud was connected when sleep was entered. If disconnected prior to sleep, it will stay disconnected on wake.

{{since when="0.8.0"}}
```C++
// SYNTAX
System.sleep(std::initializer_list<pin_t> wakeUpPins, InterruptMode edgeTriggerMode);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, InterruptMode edgeTriggerMode);

System.sleep(std::initializer_list<pin_t> wakeUpPins, std::initializer_list<InterruptMode> edgeTriggerModes);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, const InterruptMode* edgeTriggerModes, size_t edgeTriggerModesCount);
{{#if has-cellular}}

System.sleep(std::initializer_list<pin_t> wakeUpPins, InterruptMode edgeTriggerMode, SLEEP_NETWORK_STANDBY);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, InterruptMode edgeTriggerMode, SLEEP_NETWORK_STANDBY);

System.sleep(std::initializer_list<pin_t> wakeUpPins, std::initializer_list<InterruptMode> edgeTriggerModes, SLEEP_NETWORK_STANDBY);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, const InterruptMode* edgeTriggerModes, size_t edgeTriggerModesCount, SLEEP_NETWORK_STANDBY);
{{/if}}

// EXAMPLE USAGE

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and A4 pins
// Specify the pins in-place (using std::initializer_list)
System.sleep({D1, A4}, RISING);
// The device LED will shut off during sleep

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and FALLING edge interrupt on A4 pin
// Specify the pins and edge trigger mode in-place (using std::initializer_list)
System.sleep({D1, A4}, {RISING, FALLING});
// The device LED will shut off during sleep

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and A4 pins
// Specify the pins in an array
pin_t wakeUpPins[2] = {D1, A4};
System.sleep(wakeUpPins, 2, RISING);
// The device LED will shut off during sleep

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and FALLING edge interrupt on A4 pin
// Specify the pins and edge trigger modes in an array
pin_t wakeUpPins[2] = {D1, A4};
InterruptMode edgeTriggerModes[2] = {RISING, FALLING};
System.sleep(wakeUpPins, 2, edgeTriggerModes, 2);
// The device LED will shut off during sleep
```

Multiple wakeup pins may be specified for this mode.

*Parameters:*

- `wakeUpPins`: a list of wakeup pins:
    - `std::initializer_list<pin_t>`: e.g. `{D1, D2, D3}`
    - a `pin_t` array. The length of the array needs to be provided in `wakeUpPinsCount` argument
{{#if has-stm32}}
    - supports external interrupts on the following pins:
{{#unless core}}
      - D1, D2, D3, D4, A0, A1, A3, A4, A6, A7
{{else}}
      - D0, D1, D2, D3, D4, A0, A1, A3, A4, A5, A6, A7
{{/unless}}
      - The same [pin limitations as `attachInterrupt`](#attachinterrupt-) apply
{{else}}
    - all pins are allowed, but a maximum of 8 can be used at a time
{{/if}}

- `wakeUpPinsCount`: the length of the list of wakeup pins provided in `wakeUpPins` argument. This argument should only be specified if `wakeUpPins` is an array of pins and not an `std::initializer_list`.
- `edgeTriggerMode`: defines when the interrupt should be triggered. Four constants are predefined as valid values:
    - CHANGE to trigger the interrupt whenever the pin changes value,
    - RISING to trigger when the pin goes from low to high,
    - FALLING for when the pin goes from high to low.
- `edgeTriggerModes`: defines when the interrupt should be triggered on a specific pin from `wakeUpPins` list:
    - `std::initializer_list<InterruptMode>`: e.g. `{RISING, FALLING, CHANGE}`
    - an `InterruptMode` array. The length of the array needs to be provided in `edgeTriggerModesCount` argument
- `edgeTriggerModesCount`: the length of the edge trigger modes provided in `edgeTriggerModes` argument. This argument should only be specified if `edgeTriggerModes` is an array of modes and not an `std::initializer_list`.
{{#if electron}}
- `SLEEP_NETWORK_STANDBY`: optional - keeps the cellular modem in a standby state while the device is sleeping..
{{/if}}

```C++
// SYNTAX
System.sleep(uint16_t wakeUpPin, uint16_t edgeTriggerMode, long seconds);
{{#if has-cellular}}
System.sleep(uint16_t wakeUpPin, uint16_t edgeTriggerMode, SLEEP_NETWORK_STANDBY, long seconds);
{{/if}}

// EXAMPLE USAGE

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 pin or wakeup after 60 seconds whichever comes first
System.sleep(D1,RISING,60);
// The device LED will shut off during sleep
```

`System.sleep(uint16_t wakeUpPin, uint16_t edgeTriggerMode, long seconds)` can be used to put the entire device into a *stop* mode with *wakeup on interrupt* or *wakeup after specified seconds*. In this particular mode, the device shuts network subsystem and puts the microcontroller in a stop mode with configurable wakeup pin and edge triggered interrupt or wakeup after the specified seconds. When the specific interrupt arrives or upon reaching the configured timeout, the device awakens from stop mode. {{#if core}}The Core is reset on entering stop mode and runs all user code from the beginning with no values being maintained in memory from before the stop mode. As such, it is recommended that stop mode be called only after all user code has completed.{{else}}The device will not reset before going into stop mode so all the application variables are preserved after waking up from this mode. The voltage regulator is put in low-power mode. This mode achieves the lowest power consumption while retaining the contents of RAM and registers.{{/if}}

{{#if core}}On the Core, it is necessary to update the *bootloader* (https://github.com/particle-iot/device-os/tree/bootloader-patch-update) for proper functioning of this mode.{{/if}}

*Parameters:*

- `wakeUpPin`: the wakeup pin number. supports external interrupts on the following pins:
{{#if has-stm32}}
    - supports external interrupts on the following pins:
{{#unless core}}
      - D1, D2, D3, D4, A0, A1, A3, A4, A6, A7
{{else}}
      - D0, D1, D2, D3, D4, A0, A1, A3, A4, A5, A6, A7
{{/unless}}
      - The same [pin limitations as `attachInterrupt`](#attachinterrupt-) apply
{{else}}
    - all pins are allowed, but a maximum of 8 can be used at a time
{{/if}}
apply
- `edgeTriggerMode`: defines when the interrupt should be triggered. Four constants are predefined as valid values:
    - CHANGE to trigger the interrupt whenever the pin changes value,
    - RISING to trigger when the pin goes from low to high,
    - FALLING for when the pin goes from high to low.
- `seconds`: wakeup after the specified number of seconds (0 = no alarm is set). {{#if has-nrf52}}On Gen 3 devices (Argon, Boron, Xenon), the maximum sleep time is approximately 24 days.{{/if}}
{{#if has-cellular}}
- `SLEEP_NETWORK_STANDBY`: optional - keeps the cellular modem in a standby state while the device is sleeping..
{{/if}}

{{since when="0.8.0"}}
```C++
// SYNTAX
System.sleep(std::initializer_list<pin_t> wakeUpPins, InterruptMode edgeTriggerMode, long seconds);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, InterruptMode edgeTriggerMode, long seconds);

System.sleep(std::initializer_list<pin_t> wakeUpPins, std::initializer_list<InterruptMode> edgeTriggerModes, long seconds);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, const InterruptMode* edgeTriggerModes, size_t edgeTriggerModesCount, long seconds);
{{#if has-cellular}}

System.sleep(std::initializer_list<pin_t> wakeUpPins, InterruptMode edgeTriggerMode, SLEEP_NETWORK_STANDBY, long seconds);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, InterruptMode edgeTriggerMode, SLEEP_NETWORK_STANDBY, long seconds);

System.sleep(std::initializer_list<pin_t> wakeUpPins, std::initializer_list<InterruptMode> edgeTriggerModes, SLEEP_NETWORK_STANDBY, long seconds);
System.sleep(const pin_t* wakeUpPins, size_t wakeUpPinsCount, const InterruptMode* edgeTriggerModes, size_t edgeTriggerModesCount, SLEEP_NETWORK_STANDBY, long seconds);
{{/if}}

// EXAMPLE USAGE

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and A4 pins or wakeup after 60 seconds whichever comes first
// Specify the pins in-place (using std::initializer_list)
System.sleep({D1, A4}, RISING, 60);
// The device LED will shut off during sleep

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and FALLING edge interrupt on A4 pin or wakeup after 60 seconds whichever comes first
// Specify the pins and edge trigger mode in-place (using std::initializer_list)
System.sleep({D1, A4}, {RISING, FALLING}, 60);
// The device LED will shut off during sleep

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and A4 pins or wakeup after 60 seconds whichever comes first
// Specify the pins in an array
pin_t wakeUpPins[2] = {D1, A4};
System.sleep(wakeUpPins, 2, RISING, 60);
// The device LED will shut off during sleep

// Put the device into stop mode with wakeup using RISING edge interrupt on D1 and FALLING edge interrupt on A4 pin or wakeup after 60 seconds whichever comes first
// Specify the pins and edge trigger modes in an array
pin_t wakeUpPins[2] = {D1, A4};
InterruptMode edgeTriggerModes[2] = {RISING, FALLING};
System.sleep(wakeUpPins, 2, edgeTriggerModes, 2, 60);
// The device LED will shut off during sleep
```

Multiple wakeup pins may be specified for this mode.

*Parameters:*

- `wakeUpPins`: a list of wakeup pins:
    - `std::initializer_list<pin_t>`: e.g. `{D1, D2, D3}`
    - a `pin_t` array. The length of the array needs to be provided in `wakeUpPinsCount` argument
{{#if has-stm32}}
    - supports external interrupts on the following pins:
{{#unless core}}
      - D1, D2, D3, D4, A0, A1, A3, A4, A6, A7
{{else}}
      - D0, D1, D2, D3, D4, A0, A1, A3, A4, A5, A6, A7
{{/unless}}
      - The same [pin limitations as `attachInterrupt`](#attachinterrupt-) apply
{{else}}
    - all pins are allowed, but a maximum of 8 can be used at a time
{{/if}}
(#attachinterrupt-) apply
- `wakeUpPinsCount`: the length of the list of wakeup pins provided in `wakeUpPins` argument. This argument should only be specified if `wakeUpPins` is an array of pins and not an `std::initializer_list`.
- `edgeTriggerMode`: defines when the interrupt should be triggered. Four constants are predefined as valid values:
    - CHANGE to trigger the interrupt whenever the pin changes value,
    - RISING to trigger when the pin goes from low to high,
    - FALLING for when the pin goes from high to low.
- `edgeTriggerModes`: defines when the interrupt should be triggered on a specific pin from `wakeUpPins` list:
    - `std::initializer_list<InterruptMode>`: e.g. `{RISING, FALLING, CHANGE}`
    - an `InterruptMode` array. The length of the array needs to be provided in `edgeTriggerModesCount` argument
- `edgeTriggerModesCount`: the length of the edge trigger modes provided in `edgeTriggerModes` argument. This argument should only be specified if `edgeTriggerModes` is an array of modes and not an `std::initializer_list`.
- `seconds`: wakeup after the specified number of seconds (0 = no alarm is set). {{#if has-nrf52}}On Gen 3 devices (Argon, Boron, Xenon), the maximum sleep time is approximately 24 days.{{/if}}
{{#if has-cellular}}
- `SLEEP_NETWORK_STANDBY`: optional - keeps the cellular modem in a standby state while the device is sleeping..
{{/if}}

_Since 0.4.5._ The state of the {{network-type}} and Cloud connections is restored when the system wakes up from sleep. So if the device was connected to the cloud before sleeping, then the cloud connection
is automatically resumed on waking up.

_Since 0.5.0_ In automatic modes, the `sleep()` function doesn't return until the cloud connection has been established. This means that application code can use the cloud connection as soon as  `sleep()` returns. In previous versions, it was necessary to call `Particle.process()` to have the cloud reconnected by the system in the background.

_Since 0.8.0_ All `System.sleep()` variants return an instance of [`SleepResult`](#sleepresult-) class that can be queried on the result of `System.sleep()` execution.

_Since 0.8.0_ An application may check the information about the latest sleep by using [`System.sleepResult()`](#sleepresult-) or additional accessor methods:
- [`System.wakeUpReason()`](#wakeupreason-)
- [`System.wokenUpByPin()`](#wokenupbypin--1)
- [`System.wokenUpByRtc()`](#wokenupbyrtc--1)
- [`System.wakeUpPin()`](#wakeuppin-)
- [`System.sleepError()`](#sleeperror-)

---

`System.sleep(long seconds)` does NOT stop the execution of application code (non-blocking call).  Application code will continue running while the {{network-type}} module is in this mode.

This mode is not recommended; it is better to manually control the network connection using SYSTEM_MODE(MANUAL) instead.

```C++
// SYNTAX
System.sleep(long seconds);

// EXAMPLE USAGE

// Put the Wi-Fi module in standby (low power) for 5 seconds
System.sleep(5);
// The device LED will breathe white during sleep
```

{{/if}} {{!-- has-sleep --}}

### SleepResult Class

{{since when="0.8.0"}}

This class allows to query the information about the latest `System.sleep()`.

#### reason()

```C++
// SYNTAX
SleepResult result = System.sleepResult();
int reason = result.reason();
```

Get the wake up reason.

```C++
// EXAMPLE
SleepResult result = System.sleepResult();
switch (result.reason()) {
  case WAKEUP_REASON_NONE: {
    Log.info("{{device}} did not wake up from sleep");
    break;
  }
  case WAKEUP_REASON_PIN: {
    Log.info("{{device}} was woken up by a pin");
    break;
  }
  case WAKEUP_REASON_RTC: {
    Log.info("{{device}} was woken up by the RTC (after a specified number of seconds)");
    break;
  }
  case WAKEUP_REASON_PIN_OR_RTC: {
    Log.info("{{device}} was woken up by either a pin or the RTC (after a specified number of seconds)");
    break;
  }
}
```

Returns a code describing a reason {{device}} woke up from sleep. The following reasons are defined:
- `WAKEUP_REASON_NONE`: {{device}} did not wake up from sleep
- `WAKEUP_REASON_PIN`: {{device}} was woken up by an edge signal to a pin
- `WAKEUP_REASON_RTC`: {{device}} was woken up by the RTC (after a specified number of seconds)
- `WAKEUP_REASON_PIN_OR_RTC`: {{device}} was woken up either by an edge signal to a pin or by the RTC (after a specified number of seconds)


#### wokenUpByPin()

```C++
// SYNTAX
SleepResult result = System.sleepResult();
bool r = result.wokenUpByPin();

// EXAMPLE
SleepResult result = System.sleepResult();
if (result.wokenUpByPin()) {
  Log.info("{{device}} was woken up by a pin");
}
```

Returns `true` when {{device}} was woken up by a pin.

#### wokenUpByRtc()

Returns `true` when {{device}} was woken up by the RTC (after a specified number of seconds).

```C++
// SYNTAX
SleepResult result = System.sleepResult();
bool r = result.wokenUpByRtc();

// EXAMPLE
SleepResult result = System.sleepResult();
if (result.wokenUpByRtc()) {
  Log.info("{{device}} was woken up by the RTC (after a specified number of seconds)");
}
```

#### rtc()

An alias to [`wokenUpByRtc()`](#wokenupbyrtc-).

#### pin()

```C++
// SYNTAX
SleepResult result = System.sleepResult();
pin_t pin = result.pin();

// EXAMPLE
SleepResult result = System.sleepResult();
pin_t pin = result.pin();
if (result.wokenUpByPin()) {
  Log.info("{{device}} was woken up by the pin number %d", pin);
}
```

Returns: the number of the pin that woke the device.

#### error()

Get the error code of the latest sleep.

```C++
// SYNTAX
SleepResult result = System.sleepResult();
int err = result.error();
```

Returns: `SYSTEM_ERROR_NONE (0)` when there was no error during latest sleep or a non-zero error code.

### sleepResult()

{{since when="0.8.0"}}

```C++
// SYNTAX
SleepResult result = System.sleepResult();
```

Retrieves the information about the latest sleep.

Returns: an instance of [`SleepResult`](#sleepresult-) class.

### wakeUpReason()

{{since when="0.8.0"}}

```C++
// SYNTAX
int reason = System.wakeUpReason();
```

See [`SleepResult`](#reason-) documentation.

### wokenUpByPin()

{{since when="0.8.0"}}

```C++
// SYNTAX
bool result = System.wokenUpByPin();
```

See [`SleepResult`](#wokenupbypin-) documentation.

### wokenUpByRtc()

_Since 0.8.0_

```C++
// SYNTAX
bool result = System.wokenUpByRtc();
```

See [`SleepResult`](#wokenupbyrtc-) documentation.

### wakeUpPin()

{{since when="0.8.0"}}

```C++
// SYNTAX
pin_t pin = System.wakeUpPin();
```

See [`SleepResult`](#pin-) documentation.

### sleepError()

{{since when="0.8.0"}}

```C++
// SYNTAX
int err = System.sleepError();
```

See [`SleepResult`](#error-) documentation.

### reset()

Resets the device, just like hitting the reset button or powering down and back up.

```C++
uint32_t lastReset = 0;

void setup() {
    lastReset = millis();
}

void loop() {
  // Reset after 5 minutes of operation
  // ==================================
  if (millis() - lastReset > 5*60000UL) {
    System.reset();
  }
}
```

### disableReset()

This method allows to disable automatic resetting of the device on such events as successful firmware update.

```cpp
// EXAMPLE
void on_reset_pending() {
    // Enable resetting of the device. The system will reset after this method is called
    System.enableReset();
}

void setup() {
    // Register the event handler
    System.on(reset_pending, on_reset_pending);
    // Disable resetting of the device
    System.disableReset();

}

void loop() {
}
```

When the system needs to reset the device it first sends the [`reset_pending`](#system-events-reference) event to the application, and, if automatic resetting is disabled, waits until the application has called `enableReset()` to finally perform the reset. This allows the application to perform any necessary cleanup before resetting the device.

### enableReset()

Allows the system to reset the device when necessary.

### resetPending()

Returns `true` if the system needs to reset the device.

### Reset Reason

{{since when="0.6.0"}}

The system can track the hardware and software resets of the device.

```
// EXAMPLE
// Restart in safe mode if the device previously reset due to a PANIC (SOS code)
STARTUP(System.enableFeature(FEATURE_RESET_INFO));

void setup() {
   if (System.resetReason() == RESET_REASON_PANIC) {
       System.enterSafeMode();
   }
}
```

You can also pass in your own data as part of an application-initiated reset:

```cpp
// EXAMPLE
STARTUP(System.enableFeature(FEATURE_RESET_INFO));

void setup() {
    // Reset the device 3 times in a row
    if (System.resetReason() == RESET_REASON_USER) {
        uint32_t data = System.resetReasonData();
        if (data < 3) {
            System.reset(data + 1);
        }
    } else {
		// This will set the reset reason to RESET_REASON_USER
        System.reset(1);
    }
}

```

**Note:** This functionality requires `FEATURE_RESET_INFO` flag to be enabled in order to work.

`resetReason()`

Returns a code describing reason of the last device reset. The following codes are defined:

- `RESET_REASON_PIN_RESET`: Reset button or reset pin
- `RESET_REASON_POWER_MANAGEMENT`: Low-power management reset
- `RESET_REASON_POWER_DOWN`: Power-down reset
- `RESET_REASON_POWER_BROWNOUT`: Brownout reset
- `RESET_REASON_WATCHDOG`: Hardware watchdog reset
- `RESET_REASON_UPDATE`: Successful firmware update
- `RESET_REASON_UPDATE_TIMEOUT`: Firmware update timeout
- `RESET_REASON_FACTORY_RESET`: Factory reset requested
- `RESET_REASON_SAFE_MODE`: Safe mode requested
- `RESET_REASON_DFU_MODE`: DFU mode requested
- `RESET_REASON_PANIC`: System panic
- `RESET_REASON_USER`: User-requested reset
- `RESET_REASON_UNKNOWN`: Unspecified reset reason
- `RESET_REASON_NONE`: Information is not available

`resetReasonData()`

Returns a user-defined value that has been previously specified for the `System.reset()` call.

`reset(uint32_t data)`

This overloaded method accepts an arbitrary 32-bit value, stores it to the backup register and resets the device. The value can be retrieved via `resetReasonData()` method after the device has restarted.

### System Config [ set ]

System configuration can be modified with the `System.set()` call.

```cpp
// SYNTAX
System.set(SYSTEM_CONFIG_..., "value");
System.set(SYSTEM_CONFIG_..., buffer, length);

{{#if has-wifi}}
// EXAMPLE
// Change the SSID prefix in listening mode
System.set(SYSTEM_CONFIG_SOFTAP_PREFIX, "Gizmo");

// Change the SSID suffix in listening mode
System.set(SYSTEM_CONFIG_SOFTAP_SUFFIX, "ABC");
{{/if}} {{!-- has-wifi --}}
```

The following configuration values can be changed:
- `SYSTEM_CONFIG_DEVICE_KEY`: the device private key. Max length of `DCT_DEVICE_PRIVATE_KEY_SIZE` (1216).
- `SYSTEM_CONFIG_SERVER_KEY`: the server public key. Max length of `SYSTEM_CONFIG_SERVER_KEY` (768).
{{#if has-wifi}}
- `SYSTEM_CONFIG_SOFTAP_PREFIX`: the prefix of the SSID broadcast in listening mode. Defaults to Photon. Max length of `DCT_SSID_PREFIX_SIZE-1` (25).
- `SYSTEM_CONFIG_SOFTAP_SUFFIX`: the suffix of the SSID broadcast in listening mode. Defaults to a random 4 character alphanumerical string. Max length of `DCT_DEVICE_ID_SIZE` (6).
{{/if}} {{!-- has-wifi --}}

### System Flags [ disable ]

The system allows to alter certain aspects of its default behavior via the system flags. The following system flags are defined:

  * `SYSTEM_FLAG_PUBLISH_RESET_INFO` : enables publishing of the last [reset reason](#reset-reason) to the cloud (enabled by default)
  * `SYSTEM_FLAG_RESET_NETWORK_ON_CLOUD_ERRORS` : enables resetting of the network connection on cloud connection errors (enabled by default)

```cpp
// EXAMPLE
// Do not publish last reset reason
System.disable(SYSTEM_FLAG_PUBLISH_RESET_INFO);

// Do not reset network connection on cloud errors
System.disable(SYSTEM_FLAG_RESET_NETWORK_ON_CLOUD_ERRORS);
```

`System.enable(system_flag_t flag)`

Enables the system flag.

`System.disable(system_flag_t flag)`

Disables the system flag.

`System.enabled(system_flag_t flag)`

Returns `true` if the system flag is enabled.

### System Uptime

_Since 0.8.0_

#### System.millis()

Returns the number of milliseconds passed since the device was last reset. This function is similar to the global [`millis()`](#millis-) function but returns a 64-bit value.

#### System.uptime()

Returns the number of seconds passed since the device was last reset.

{{#if has-interrupts}}

## System Interrupts

This is advanced, low-level functionality, intended primarily for library writers.

System interrupts happen as a result of peripheral events within the system. These
system interrupts are supported on all platforms:

|Identifier | Description |
|-----------|-------------|
|SysInterrupt_SysTick | System Tick (1ms) handler |
|SysInterrupt_TIM3 | Timer 3 interrupt |
|SysInterrupt_TIM4 | Timer 4 interrupt |

NB: SysInterrupt_TIM3 and SysInterrupt_TIM4 are used by the system to provide `tone()` and PWM output.

{{#if has-stm32f2}}

The {{device}} supports these additional interrupts:

| Identifier | Description |
| -----------|-------------|
| SysInterrupt_TIM5 | Timer 5 interrupt |
| SysInterrupt_TIM6 | Timer 6 interrupt |
| SysInterrupt_TIM7 | Timer 7 interrupt |

NB: SysInterrupt_TIM5 is used by the system to provide `tone()` and PWM output.
NB: SysInterrupt_TIM7 is used as a shadow watchdog timer by WICED when connected to JTAG.

{{/if}} {{!-- has-stm32f2 --}}

See the [full list of interrupts in the firmware
repository](https://github.com/particle-iot/device-os/blob/develop/hal/inc/interrupts_hal.h).

> When implementing an interrupt handler, the handler **must** execute quickly, or the system operation may be impaired. Any variables shared between the interrupt handler and the main program should be declared as `volatile` to ensure that changes in the interrupt handler are visible in the main loop and vice versa.

### attachSystemInterrupt()

Registers a function that is called when a system interrupt happens.

```cpp
void handle_timer5()
{
   // called when timer 5 fires an interrupt
}

void setup()
{
    attachSystemInterrupt(SysInterrupt_TIM5, handle_timer5);
}
```

### detachSystemInterrupt()

Removes all handlers for the given interrupt, or for all interrupts.

```cpp

detachSystemInterrupt(SysInterrupt_TIM5);
// remove all handlers for the SysInterrupt_TIM5 interrupt
```

### attachInteruptDirect()

_Since 0.8.0_

Registers a function that is called when an interrupt happens. This function installs the interrupt handler function directly into the interrupt vector table and will override system handlers for the specified interrupt.

**NOTE**: Most likely use-cases:
- if lower latency is required: handlers registered with `attachInterrupt()` or `attachSystemInterrupt()` may be called with some delay due to handler chaining or some additional processing done by the system
- system interrupt handler needs to be overriden
- interrupt unsupported by `attachSystemInterrupt()` needs to be handled

```cpp
// SYNTAX
attachInterruptDirect(irqn, handler);

// EXAMPLE
void handle_timer5()
{
  // called when timer 5 fires an interrupt
}

void setup()
{
  attachSystemInterrupt(TIM5_IRQn, handle_timer5);
}
```

Parameters:
- `irqn`: platform-specific IRQ number
- `handler`: interrupt handler function pointer

### detachInterruptDirect()

_Since 0.8.0_

Unregisters application-provided interrupt handlers for the given interrupt and restores the default one.

```cpp
// SYNTAX
detachInterruptDirect(irqn);

// EXAMPLE
detachInterruptDirect(TIM5_IRQn);
```

Parameters:
- `irqn`: platform-specific IRQ number

{{/if}} {{!-- has-interrupts --}}

{{#if has-linux}}

## Process Control

You can call scripts and run other programs from the firmware. In Linux, a running program is called a process.

*This interface is in beta. It might change in non-backwards compatible ways.*

### run()

Start running another program in the background. It returns a `Process` object so you can interact with the program while it running and after it has exited.

The `command` argument should start with the name of a program or script (with or without path) and can contain other arguments separated by spaces.

The command is executed through the shell: `/bin/sh -c <command>`

```cpp
// SYNTAX
Process proc = Process::run(command)

// EXAMPLE USAGE
// Simple script and block it is finished
Process proc = Process::run("/home/pi/script.sh");
proc.wait();

// Take a picture with a Pi camera
Process proc = Process::run("raspistill -o /home/pi/photo.jpg");
proc.wait();
```

It's important to call `wait()` to block the firmware until the program finishes running or call `exited()` until it returns true. Otherwise when the program completes the operating system will keep information about the process in memory forever, eventually making it impossible to start any new process on the entire device.

### wait()

Block the firmware until the program finishes. Returns immediately if the process has already finished.

Returns the [exit code of the process](#exitcode-).

```cpp
// SYNTAX
process.wait();

// EXAMPLE USAGE
// Run a Javascript program
Process proc = Process::run("node /home/pi/update.js");
proc.wait();
```

### exited()

Returns true if the process has exited, false otherwise.

A "blank" Process that was never started returns true for `exited()`.

```cpp
// SYNTAX
bool done = process.exited();

// EXAMPLE USAGE
// Blink an LED during a long operation
Process proc = Process::run("updatedb");
pinMode(D7, OUTPUT);
while (!proc.exited()) {
  digitalWrite(D7, HIGH);
  delay(100);
  digitalWrite(D7, LOW);
  delay(100);
}

// Restart a server when it crashes
Process proc;

void loop() {
  if (proc.exited()) {
    proc = Process::run("node /home/pi/server.js");
  }
}
```

### kill()

Stop the process by sending a signal. Defaults to the `SIGTERM` signal which asks the program to quit. To force-quit an unresponsive process, use `SIGKILL`.

```cpp
// SYNTAX
process.kill();
process.kill(signal);

// EXAMPLE USAGE
// Stop a long operation early
Process proc = Process::run("sleep 10");
proc.kill();
proc.wait();
```

`signal` is either a signal number or name. Here are the most useful signals.

| Signal Name | Signal Number | Description |
|-------------|---------------|-------------|
| SIGINT | 2 | Interrupt from keyboard (Ctrl-C) |
| SIGABRT | 6 | Abort. Usually from uncaught C++ exception |
| SIGKILL | 9 | Force quit |
| SIGSEGV | 11 | Bad memory operation (null pointer, bad pointer) |
| SIGTERM | 15 | Graceful quit |

It's important to still call `wait()` or `exited()` after `kill()` to ensure the process information is recycled by the operating system.

### exitCode()

If the process has exited, returns the integer exit code.

```cpp
// SYNTAX
uint8_t code = proccess.exitCode();

// EXAMPLE USAGE
// Did the program finish sucessfully?
Process proc = Process::run("/home/pi/script.sh");
proc.wait();
if (proc.exitCode() == 0) {
  Serial.println("Success!");
}

// Did the program crash?
Process proc = Process::run("my_program");
proc.wait();
uint8_t code = proc.exitCode();
if (code >= 128) {
  Serial.printlnf("my_program crashed with signal %d", code - 128);
}
```

An exit code of 0 means success. The meaning of non-zero error codes are specific to each program.

If a process exits because of a signal, for example it crashed with a bad pointer, the exit code will be 128 plus the signal value. See the table above for the signal values.

### out()
### err()

The output generated by a program is available through the `out()` and `err()` Stream for standard output and standard error.

```cpp
// SYNTAX
process.out();
process.err();

// EXAMPLE USAGE
// Get entire output of program
Process proc = Process::run("ls /home/pi");
proc.wait();
String filenames = proc.out().readString();

// Get CPU temperature
Process proc = Process::run("vcgencmd measure_temp");
proc.wait();
// The output is temp=43.5'C, so read past the = and parse the number
proc.out().find("=");
float cpuTemp = proc.out().parseFloat();
```

All the [Stream](#stream-class) functions are available like `readStringUntil('\n')` to read a line or `parseInt()` to turn the output into an integer.

### in()

To provide input to the program, print to `in()`.

```cpp
// SYNTAX
process.in();

// EXAMPLE USAGE
// Run a calculation using the bc, a calculator program
Process proc = Process::run("bc");
proc.in().println("6 * 7");
proc.in().close(); // <-- THIS IS IMPORTANT
proc.wait();
int result = proc.out().parseInt(); // 42
```

The same functions used to print to `Serial` like `println` and `printf` are available.

**Note**: It is very important to close `in()` so the process knows that no further input is coming. If you don't do this, the process will hang forever waiting for more input.

### Advanced Process Control

Linux process control is a deep topic on its own. If the methods in `Process` don't work for what you're trying to accomplish, you can also use any Linux process control functions like `system`, `fork` and `execve` method directly in your firmware. See the [note about the standard library on the {{device}}](#other-functions).

```cpp
// Run a command using the Linux system() function instead of Process
// The output won't be available
system("my_command");
```

{{/if}} {{!-- has-linux --}}

{{#if has-button-mirror}}
### buttonMirror()

{{since when="0.6.1"}}

Allows a pin to mirror the functionality of the SETUP/MODE button.

```C++
// SYNTAX
System.buttonMirror(D1, RISING);
System.buttonMirror(D1, FALLING, true);
```
Parameters:

  * `pin`: the pin number
  * `mode`: defines the condition that signifies a button press:
    - RISING to trigger when the pin goes from low to high,
    - FALLING for when the pin goes from high to low.
  * `bootloader`: (optional) if `true`, the mirror pin configuration is saved in DCT and pin mirrors the SETUP/MODE button functionality while in bootloader as well. If `false`, any previously stored configuration is removed from the DCT and pin only mirrors the SETUP/MODE button while running the firmware (default).

See also [`System.disableButtonMirror()`](#disablebuttonmirror-).

```cpp
// EXAMPLE
// Mirror SETUP/MODE button on D1 pin. Button pressed state - LOW
STARTUP(System.buttonMirror(D1, FALLING));

// EXAMPLE
// Mirror SETUP/MODE button on D1 pin. Button pressed state - HIGH
// Works in both firmware and bootloader
STARTUP(System.buttonMirror(D1, RISING, true));
```

***NOTE:*** Pins `D0` and `A5` will disable normal SETUP button operation. Pins `D0` and `A5` also can not be used in bootloader, the configuration will not be saved in DCT.

### disableButtonMirror()

{{since when="0.6.1"}}

Disables SETUP button mirroring on a pin.

```C++
// SYNTAX
System.disableButtonMirror();
System.disableButtonMirror(false);
```
Parameters:
  * `bootloader`: (optional) if `true`, the mirror pin configuration is cleared from the DCT, disabling the feature in bootloader (default).

{{/if}} {{!-- button-mirror --}}

{{#if has-backup-ram}}
### System Features

The system allows to alter certain aspects of its default behavior via the system features. The following system features are defined:

  * `FEATURE_RETAINED_MEMORY` : enables/disables retained memory on backup power (disabled by default) (see [Enabling Backup RAM (SRAM)](#enabling-backup-ram-sram-))
{{#if has-powersave-clock}}
  * `FEATURE_WIFI_POWERSAVE_CLOCK` : enables/disables the Wi-Fi Powersave Clock on P1S6 on P1 (enabled by default).
{{/if}} {{!-- has-powersave-clock --}}

#### FEATURE_RETAINED_MEMORY

Enables/disables retained memory on backup power (disabled by default) (see [Enabling Backup RAM (SRAM)](#enabling-backup-ram-sram-))

```cpp
// SYNTAX
// enable RETAINED MEMORY
System.enableFeature(FEATURE_RETAINED_MEMORY);

// disable RETAINED MEMORY (default)
System.disableFeature(FEATURE_RETAINED_MEMORY);
```
{{/if}} {{!-- has-backup-ram --}}

{{#if has-powersave-clock}}
#### FEATURE_WIFI_POWERSAVE_CLOCK

{{since when="0.6.1"}}

```cpp
// SYNTAX
// enable POWERSAVE_CLOCK on P1S6 on P1 (default)
System.enableFeature(FEATURE_WIFI_POWERSAVE_CLOCK);

// disable POWERSAVE_CLOCK on P1S6 on P1
System.disableFeature(FEATURE_WIFI_POWERSAVE_CLOCK);
```

Enables/disables the Wi-Fi Powersave Clock on P1S6 on P1 (enabled by default). Useful for gaining 1 additional GPIO or PWM output on the P1.  When disabled, the 32kHz oscillator will not be running on this pin, and subsequently Wi-Fi Eco Mode (to be defined in the future) will not be usable.

**Note:** the FEATURE_WIFI_POWERSAVE_CLOCK feature setting is remembered even after power off or when entering safe mode. This is to allow your device to be configured once and then continue to function with the feature enabled/disabled.


```cpp
// Use the STARTUP() macro to disable the powersave clock at the time of boot
STARTUP(System.disableFeature(FEATURE_WIFI_POWERSAVE_CLOCK));

void setup() {
  pinMode(P1S6, OUTPUT);
  analogWrite(P1S6, 128); // set PWM output on P1S6 to 50% duty cycle
}

void loop() {
  // your loop code
}
```
{{/if}} {{!-- has-powersave-clock --}}


## OTA Updates
This section describes the Device OS APIs that control firmware updates
for Particle devices.

_Many of the behaviors described below require
Device OS version 1.2.0 or higher_.

### Controlling OTA Availability

This feature allows the application developer to control when the device
is available for firmware updates. This affects both over-the-air (OTA)
and over-the-wire (OTW) updates. OTA availability also affects both
_single device OTA updates_ (flashing a single device) and _fleet-wide OTA updates_
(deploying a firmware update to many devices in a Product).

Firmware updates are enabled by default when the device starts up after a deep sleep or system reset. Applications may choose to disable firmware updates during critical periods by calling the `System.disableUpdates()` function and then enabling them again with `System.enableUpdates()`.

When the firmware update is the result of an [Intelligent
Firmware Release](/tutorials/device-cloud/ota-updates/#intelligent-firmware-releases),
the update is delivered immediately after `System.enableUpdates()` is called.

Standard Firmware Releases are delivered the next time the device connects to the cloud or when the current session expires or is revoked.

**Note**: Calling `System.disableUpdates()` and `System.enableUpdates()`
for devices running Device OS version 1.2.0 or later will result in a
message sent to the Device Cloud. This will result in a small amount of
additional data usage each time they are called.

### System.disableUpdates()
```cpp
// System.disableUpdates() example where updates are disabled
// when the device is busy.

int unlockScooter(String arg) {
  // scooter is busy, so disable updates
  System.disableUpdates();
  // ... do the unlock step
  // ...
  return 0;
}

int parkScooter(String arg) {
  // scooter is no longer busy, so enable updates
  System.enableUpdates();
  // ... do the park step
  // ...
  return 0;
}

void setup() {
  Particle.function("unlockScooter", unlockScooter);
  Particle.function("parkScooter", parkScooter);
}

```
Disables OTA updates on this device. An attempt to begin an OTA update
from the cloud will be prevented by the device. When updates are disabled, firmware updates are not
delivered to the device [unless forced](/tutorials/device-cloud/ota-updates/#force-enable-ota-updates).

**Since 1.2.0**

Device OS version 1.2.0 introduced enhanced support of
`System.disableUpdates()` and `System.enableUpdates()`. When running Device OS version 1.2.0
or higher, the device will notify the Device Cloud of its OTA
availability, which is [visible in the
Console](/tutorials/device-cloud/ota-updates/#ota-availability-in-the-console)
as well as [queryable via the REST
API](/reference/device-cloud/api/#get-device-information). The cloud
will use this information to deliver [Intelligent Firmware
Releases](/tutorials/device-cloud/ota-updates/#intelligent-firmware-releases).

In addition, a cloud-side system event will be emitted when updates are disabled,
`particle/device/updates/enabled` with a data value of `false`. This event is sent
only if updates were not already disabled.

| Version | Self service customers | Standard Product | Enterprise Product |
| ------- | ---------------------- | ---------------- |------------------- |
| Device OS &lt; 1.2.0 | Limited Support | Limited Support | Limited Support |
| Device OS &gt;= 1.2.0 | Full support | Full Support | Full Support |

**Enterprise Feature**

When updates are disabled, an attempt to send a firmware update to a
device that has called `System.disableUpdates()` will result in the
[`System.updatesPending()`](#system-updatespending-) function returning `true`.

### System.enableUpdates()
```cpp
// System.enableUpdates() example where updates are disabled on startup

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
  System.disableUpdates();  // updates are disabled most of the time

  Particle.connect();       // now connect to the cloud 
}

bool isSafeToUpdate() {
  // determine if the device is in a good state to receive updates. 
  // In a real application, this function would inspect the device state
  // to determine if it is busy or not. 
  return true;
}

void loop() {
  if (isSafeToUpdate()) {
    // Calling System.enableUpdates() when updates are already enabled
    // is safe, and doesn't use any data. 
    System.enableUpdates();
  }
  else {
    // Calling System.disableUpdates() when updates are already disabled
    // is safe, and doesn't use any data. 
    System.disableUpdates();
  }
}
```
Enables firmware updates on this device. Updates are enabled by default when the device starts.

Calling this function marks the device as available for updates. When
updates are enabled, updates triggered from the Device Cloud are delivered to
the device.

In addition, a cloud-side system event will be emitted when updates are
enabled,
`particle/device/updates/enabled` with a data value of `true`. This event is sent
only if updates were not already enabled.

**Since 1.2.0**

Device OS version 1.2.0 introduced enhanced support of
`System.disableUpdates()` and `System.enableUpdates()`. If running 1.2.0
or higher, the device will notify the Device Cloud of its OTA update
availability, which is [visible in the
Console](/tutorials/device-cloud/ota-updates/#ota-availability-in-the-console)
as well as [queryable via the REST
API](/reference/device-cloud/api/#get-device-information). The cloud
will use this information to deliver [Intelligent Firmware
Releases](/tutorials/device-cloud/ota-updates/#intelligent-firmware-releases).

| Version | Self service customers | Standard Product | Enterprise Product |
| ------- | ---------------------- | ---------------- |------------------- |
| Device OS &lt; 1.2.0 | Limited Support | Limited Support | Limited Support |
| Device OS &gt;= 1.2.0 | Full support | Full Support | Full Support |

### System.updatesEnabled()
```cpp
// System.updatesEnabled() example
bool isSafeToUpdate() {
  return true;
}

void loop() {
  if (!isSafeToUpdate() && System.updatesEnabled()) {
      Particle.publish("error", "Updates are enabled but the device is not safe to update.");
  }
}
```

Determine if firmware updates are presently enabled or disabled for this device.

Returns `true` on startup, and after `System.enableUpdates()` has been called. Returns `false` after `System.disableUpdates()` has been called.

| Version | Self service customers | Standard Product | Enterprise Product |
| ------- | ---------------------- | ---------------- |------------------- |
| Device OS &lt; 1.2.0 | Supported | Supported | Supported |
| Device OS &gt;= 1.2.0 | Supported | Supported | Supported |

### System.updatesPending()
```cpp
// System.updatesPending() example

SYSETM_MODE(SEMI_AUTOMATIC);

void setup() {
  // When disabling updates by default, you must use either system
  // thread enabled or system mode SEMI_AUTOMATIC or MANUAL
  System.disableUpdates();

  // After setting the disable updates flag, it's safe to connect to
  // the cloud.
  Particle.connect();
}

bool isSafeToUpdate() {
  // ...
  return true;
}

void loop() {
  // NB: System.updatesPending() should only be used in a Product on the Enterprise Plan
  if (isSafeToUpdate() && System.updatesPending()) {
        System.enableUpdates();

        // Wait 2 minutes for the update to complete and the device
        // to restart. If the device doesn't automatically reset, manually
        // reset just in case.
        unsigned long start = millis();
        while (millis() - start < (120 * 1000)) {
            Particle.process();
        }
        // You normally won't reach this point as the device will
        // restart automatically to apply the update.
        System.reset();
    }
    else {
      // ... do some critical activity that shouldn't be interrupted
    }
}

```

**Enterprise Feature, Since 1.2.0**

`System.updatesPending()` indicates if there is a firmware update pending that was not delivered to the device while updates were disabled. When an update is pending, the `firmware_update_pending` system event is emitted and the `System.updatesPending()` function returns `true`.

When new product firmware is released with the `intelligent` option
enabled, the firmware is delivered immediately after release for devices
that have firmware updates are enabled.

For devices with [updates disabled](#system-disableupdates-), firmware
updates are deferred by the device. The device is notified of the
pending update at the time of deferral. The system event
`firmware_update_pending` is emmitted and the `System.updatesPending()`
function returns `true`.  The update is delivered when the application
later re-enables updates by calling `System.enableUpdates()`, or when
updates are force enabled from the cloud, or when the device is restarted.

In addition, a cloud-side system event will be emitted when a pending
OTA update is queued,
`particle/device/updates/pending` with a data value of `true`.

| Version | Self service customers | Standard Product | Enterprise Product |
| ------- | ---------------------- | ---------------- |------------------- |
| Device OS < 1.2.0 | N/A | N/A | N/A |
| Device OS >= 1.2.0 | N/A | N/A | Supported |

### System.updatesForced()

```cpp
// System.updatesForced() example
void loop() {
  if (System.updatesForced()) {
    // don't perform critical functions while updates are forced
  }
  else {
    // perform critical functions
  }
}
```

*Since 1.2.0*

When the device is not available for updates, the pending firmware
update is not normally delivered to the device. Updates can be forced in
the cloud [either via the Console or the REST API](/tutorials/device-cloud/ota-updates/#force-enable-ota-updates) to override the local
setting on the device. This means that firmware updates are delivered
even when `System.disableUpdates()` has been called by the device application.

When updates are forced in the cloud, the `System.updatesForced()` function returns `true`. 

In addition, a cloud-side system event will be emitted when OTA updates
are force enabled from the cloud, `particle/device/updates/forced` with
a data value of `true`.


Updates may be forced for a particular device. When this happens, updates are delivered even when `System.disableUpdates()` has been called.

When updates are forced in the cloud, this function returns `true`.

Forced updates may be used with Product firmware releases or single
device OTA updates.

| Version | Self service customers | Standard Product | Enterprise Product |
--------- | ---------------------- | ---------------- | ------------------ |
| Device OS &lt; 1.2.0 | N/A | N/A | N/A |
| Device OS &gt;= 1.2.0 | Supported | Supported | Supported |



## Checking for Features

User firmware is designed to run transparently regardless of what type of device it is run on. However, sometimes you will need to have code that varies depending on the capabilities of the device.

It's always best to check for a capability, rather than a specific device. For example, checking for cellular instead of checking for the Electron allows the code to work properly on the Boron without modification.

Some commonly used features include:

- Wiring_Cellular
- Wiring_Ethernet
- Wiring_IPv6
- Wiring_Keyboard
- Wiring_Mesh
- Wiring_Mouse
- Wiring_Serial2
- Wiring_Serial3
- Wiring_Serial4
- Wiring_Serial5
- Wiring_SPI1
- Wiring_SPI2
- Wiring_USBSerial1
- Wiring_WiFi
- Wiring_Wire1
- Wiring_Wire3
- Wiring_WpaEnterprise

For example, you might have code like this to declare two different methods, depending on your network type:

```
#if Wiring_WiFi
	const char *wifiScan();
#endif

#if Wiring_Cellular
	const char *cellularScan();
#endif
```

The official list can be found [in the source](https://github.com/particle-iot/device-os/blob/develop/wiring/inc/spark_wiring_platform.h#L47).

### Checking Device OS Version

The define value `SYSTEM_VERSION` specifies the [system version](https://github.com/particle-iot/device-os/blob/develop/system/inc/system_version.h).

For example, if you had code that you only wanted to include in 0.7.0 and later, you'd check for:

```
#if SYSTEM_VERSION >= SYSTEM_VERSION_v070
// Code to include only for 0.7.0 and later
#endif
```

### Checking Platform ID

It's always best to check for features, but it is possible to check for a specific platform:

```
#if PLATFORM_ID == PLATFORM_BORON
// Boron-specific code goes here
#endif
```

You can find a complete list of platforms in [the source](https://github.com/particle-iot/device-os/blob/develop/hal/shared/platforms.h).

## Arduino Compatibility

All versions of Particle firmware to date have supported parts of the [Arduino API](https://www.arduino.cc/en/Reference/HomePage), such as `digitalRead`, `Serial` and `String`.

From 0.6.2 onwards, the firmware API will continue to provide increasing levels of support for new Arduino APIs to make
porting applications and libraries as straightforward as possible.

However, to prevent breaking existing applications and libraries, these new Arduino APIs have to be specifically enabled
in order to be available for use in your application or library.

Arduino APIs that need to be enabled explicitly are marked with "requires Arduino.h" in this reference documentation.


### Enabling Extended Arduino SDK Compatibility

The extended Arduino APIs that are added from 0.6.2 onwards are not immediately available but 
have to be enabled by declaring Arduino support in your app or library.

This is done by adding  `#include "Arduino.h"` to each source file that requires an extended Arduino API.

### Arduino APIs added by Firmware Version

Once `Arduino.h` has been added to a source file, additional Arduino APIs are made available.
The APIs added are determined by the targeted firmware version. In addition to defining the new APIs,
the `ARDUINO` symbol is set to a value that describes the supported SDK version. (e.g. 10800 for 1.8.0)

The table below lists the Arduino APIs added for each firmware version
and the value of the `ARDUINO` symbol.

|API name|description|ARDUINO version|Particle version|
|---|---|---|---|
|SPISettings||10800|0.6.2|
|__FastStringHelper||10800|0.6.2|
|Wire.setClock|synonym for `Wire.setSpeed`|10800|0.6.2|
|SPI.usingInterrupt|NB: this function is included to allow libraries to compile, but is implemented as a empty function.|10800|0.6.2|
|LED_BUILTIN|defines the pin that corresponds to the built-in LED|10800|0.6.2|

### Adding Arduino Symbols to Applications and Libraries

The Arduino SDK has a release cycle that is independent from Particle firmware. When a new Arduino SDK is released,
the new APIs introduced will not be available in the Particle firmware until the next Particle firmware release at
the earliest.

However, this does not have to stop applications and library authors from using these new Arduino APIs.
In some cases, it's possible to duplicate the sources in your application or library. 
However, it is necessary to be sure these APIs defined in your code are only conditionally included,
based on the version of the Arduino SDK provided by Particle firmware used to compile the library or application.

For example, let's say that in Arduino SDK 1.9.5, a new function was added, `engageHyperdrive()`.
You read the description and determine this is perfect for your application or library and that you want to use it.

In your application sources, or library headers you would add the definition like this:

```c++
// Example of adding an Arduino SDK API in a later Arduino SDK than presently supported
#include "Arduino.h" // this declares that our app/library wants the extended Arduino support

#if ARDUINO < 10905   // the API is added in SDK version 1.9.5 so we don't re-define it when the SDK already has it
// now to define the new API
bool engageHyperdrive() {
   return false;  // womp womp
}
#endif
```
 
In your source code, you use the function normally. When compiling against a version of firmware that supports
an older Arduino SDK, then your own version of the API will be used.  Later, when `engageHyperdrive()` is added to
Particle firmware,  our version will be used. This happens when the `ARDUINO` version is the same or greater than
the the corresponding version of the Arduino SDK, which indicates the API is provided by Particle firmware.

By using this technique, you can use new APIs and functions right away, while also allowing them to be later defined
in the Arduino support provided by Particle, and crucially, without clashes.

*Note*: for this to work, the version check has to be correct and must use the value that the Arduino SDK sets the
`ARDUINO` symbol to when the new Arduino API is first introduced in the Arduino SDK.



## String Class

The String class allows you to use and manipulate strings of text in more complex ways than character arrays do. You can concatenate Strings, append to them, search for and replace substrings, and more. It takes more memory than a simple character array, but it is also more useful.

For reference, character arrays are referred to as strings with a small s, and instances of the String class are referred to as Strings with a capital S. Note that constant strings, specified in "double quotes" are treated as char arrays, not instances of the String class.

### String()

Constructs an instance of the String class. There are multiple versions that construct Strings from different data types (i.e. format them as sequences of characters), including:

  * a constant string of characters, in double quotes (i.e. a char array)
  * a single constant character, in single quotes
  * another instance of the String object
  * a constant integer or long integer
  * a constant integer or long integer, using a specified base
  * an integer or long integer variable
  * an integer or long integer variable, using a specified base
  * a float variable, showing a specific number of decimal places

```C++
// SYNTAX
String(val)
String(val, base)
```

```cpp
// EXAMPLES

String stringOne = "Hello String";                     // using a constant String
String stringOne =  String('a');                       // converting a constant char into a String
String stringTwo =  String("This is a string");        // converting a constant string into a String object
String stringOne =  String(stringTwo + " with more");  // concatenating two strings
String stringOne =  String(13);                        // using a constant integer
String stringOne =  String(analogRead(0), DEC);        // using an int and a base
String stringOne =  String(45, HEX);                   // using an int and a base (hexadecimal)
String stringOne =  String(255, BIN);                  // using an int and a base (binary)
String stringOne =  String(millis(), DEC);             // using a long and a base
String stringOne =  String(34.5432, 2);                // using a float showing only 2 decimal places shows 34.54
```
Constructing a String from a number results in a string that contains the ASCII representation of that number. The default is base ten, so

`String thisString = String(13)`
gives you the String "13". You can use other bases, however. For example,
`String thisString = String(13, HEX)`
gives you the String "D", which is the hexadecimal representation of the decimal value 13. Or if you prefer binary,
`String thisString = String(13, BIN)`
gives you the String "1101", which is the binary representation of 13.



Parameters:

  * val: a variable to format as a String - string, char, byte, int, long, unsigned int, unsigned long
  * base (optional) - the base in which to format an integral value

Returns: an instance of the String class



### charAt()

Access a particular character of the String.

```C++
// SYNTAX
string.charAt(n)
```
Parameters:

  * `string`: a variable of type String
  * `n`: the character to access

Returns: the n'th character of the String


### compareTo()

Compares two Strings, testing whether one comes before or after the other, or whether they're equal. The strings are compared character by character, using the ASCII values of the characters. That means, for example, that 'a' comes before 'b' but after 'A'. Numbers come before letters.


```C++
// SYNTAX
string.compareTo(string2)
```

Parameters:

  * string: a variable of type String
  * string2: another variable of type String

Returns:

  * a negative number: if string comes before string2
  * 0: if string equals string2
  * a positive number: if string comes after string2

### concat()

Combines, or *concatenates* two strings into one string. The second string is appended to the first, and the result is placed in the original string.

```C++
// SYNTAX
string.concat(string2)
```

Parameters:

  * string, string2: variables of type String

Returns: None

### endsWith()

Tests whether or not a String ends with the characters of another String.

```C++
// SYNTAX
string.endsWith(string2)
```

Parameters:

  * string: a variable of type String
  * string2: another variable of type String

Returns:

  * true: if string ends with the characters of string2
  * false: otherwise


### equals()

Compares two strings for equality. The comparison is case-sensitive, meaning the String "hello" is not equal to the String "HELLO".

```C++
// SYNTAX
string.equals(string2)
```
Parameters:

  * string, string2: variables of type String

Returns:

  * true: if string equals string2
  * false: otherwise

### equalsIgnoreCase()

Compares two strings for equality. The comparison is not case-sensitive, meaning the String("hello") is equal to the String("HELLO").

```C++
// SYNTAX
string.equalsIgnoreCase(string2)
```
Parameters:

  * string, string2: variables of type String

Returns:

  * true: if string equals string2 (ignoring case)
  * false: otherwise

### format()

{{since when="0.4.6"}}

Provides [printf](http://www.cplusplus.com/reference/cstdio/printf/)-style formatting for strings.

```C++

Particle.publish("startup", String::format("frobnicator started at %s", Time.timeStr().c_str()));

```


### getBytes()

Copies the string's characters to the supplied buffer.

```C++
// SYNTAX
string.getBytes(buf, len)
```
Parameters:

  * string: a variable of type String
  * buf: the buffer to copy the characters into (byte [])
  * len: the size of the buffer (unsigned int)

Returns: None

### c_str()

Gets a pointer (const char *) to the internal c-string representation of the string. You can use this to pass to a function that require a c-string. This string cannot be modified.

The object also supports `operator const char *` so for things that specifically take a c-string (like Particle.publish) the conversion is automatic.

You would normally use c_str() if you need to pass the string to something like Serial.printlnf or Log.info where the conversion is ambiguous:

```C++
Serial.printlnf("the string is: %s", string.c_str());
```

This is also helpful if you want to print out an IP address:

```C++
Serial.printlnf("ip addr: %s", WiFi.localIP().toString().c_str());
```

### indexOf()

Locates a character or String within another String. By default, searches from the beginning of the String, but can also start from a given index, allowing for the locating of all instances of the character or String.

```C++
// SYNTAX
string.indexOf(val)
string.indexOf(val, from)
```

Parameters:

  * string: a variable of type String
  * val: the value to search for - char or String
  * from: the index to start the search from

Returns: The index of val within the String, or -1 if not found.

### lastIndexOf()

Locates a character or String within another String. By default, searches from the end of the String, but can also work backwards from a given index, allowing for the locating of all instances of the character or String.

```C++
// SYNTAX
string.lastIndexOf(val)
string.lastIndexOf(val, from)
```

Parameters:

  * string: a variable of type String
  * val: the value to search for - char or String
  * from: the index to work backwards from

Returns: The index of val within the String, or -1 if not found.

### length()

Returns the length of the String, in characters. (Note that this doesn't include a trailing null character.)

```C++
// SYNTAX
string.length()
```

Parameters:

  * string: a variable of type String

Returns: The length of the String in characters.

### remove()

The String `remove()` function modifies a string, in place, removing chars from the provided index to the end of the string or from the provided index to index plus count.

```C++
// SYNTAX
string.remove(index)
string.remove(index,count)
```

Parameters:

  * string: the string which will be modified - a variable of type String
  * index: a variable of type unsigned int
  * count: a variable of type unsigned int

Returns: None

### replace()

The String `replace()` function allows you to replace all instances of a given character with another character. You can also use replace to replace substrings of a string with a different substring.

```C++
// SYNTAX
string.replace(substring1, substring2)
```

Parameters:

  * string: the string which will be modified - a variable of type String
  * substring1: searched for - another variable of type String (single or multi-character), char or const char (single character only)
  * substring2: replaced with - another variable of type String (single or multi-character), char or const char (single character only)

Returns: None

### reserve()

The String reserve() function allows you to allocate a buffer in memory for manipulating strings.

```C++
// SYNTAX
string.reserve(size)
```
Parameters:

  * size: unsigned int declaring the number of bytes in memory to save for string manipulation

Returns: None

```cpp
//EXAMPLE

String myString;

void setup() {
  // initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  myString.reserve(26);
  myString = "i=";
  myString += "1234";
  myString += ", is that ok?";

  // print the String:
  Serial.println(myString);
}

void loop() {
 // nothing to do here
}
```

### setCharAt()

Sets a character of the String. Has no effect on indices outside the existing length of the String.

```C++
// SYNTAX
string.setCharAt(index, c)
```
Parameters:

  * string: a variable of type String
  * index: the index to set the character at
  * c: the character to store to the given location

Returns: None

### startsWith()

Tests whether or not a String starts with the characters of another String.

```C++
// SYNTAX
string.startsWith(string2)
```

Parameters:

  * string, string2: variable2 of type String

Returns:

  * true: if string starts with the characters of string2
  * false: otherwise


### substring()

Get a substring of a String. The starting index is inclusive (the corresponding character is included in the substring), but the optional ending index is exclusive (the corresponding character is not included in the substring). If the ending index is omitted, the substring continues to the end of the String.

```C++
// SYNTAX
string.substring(from)
string.substring(from, to)
```

Parameters:

  * string: a variable of type String
  * from: the index to start the substring at
  * to (optional): the index to end the substring before

Returns: the substring

### toCharArray()

Copies the string's characters to the supplied buffer.

```C++
// SYNTAX
string.toCharArray(buf, len)
```
Parameters:

  * string: a variable of type String
  * buf: the buffer to copy the characters into (char [])
  * len: the size of the buffer (unsigned int)

Returns: None

### toFloat()

Converts a valid String to a float. The input string should start with a digit. If the string contains non-digit characters, the function will stop performing the conversion. For example, the strings "123.45", "123", and "123fish" are converted to 123.45, 123.00, and 123.00 respectively. Note that "123.456" is approximated with 123.46. Note too that floats have only 6-7 decimal digits of precision and that longer strings might be truncated.

```C++
// SYNTAX
string.toFloat()
```

Parameters:

  * string: a variable of type String

Returns: float (If no valid conversion could be performed because the string doesn't start with a digit, a zero is returned.)

### toInt()

Converts a valid String to an integer. The input string should start with an integral number. If the string contains non-integral numbers, the function will stop performing the conversion.

```C++
// SYNTAX
string.toInt()
```

Parameters:

  * string: a variable of type String

Returns: long (If no valid conversion could be performed because the string doesn't start with a integral number, a zero is returned.)

### toLowerCase()

Get a lower-case version of a String. `toLowerCase()` modifies the string in place.

```C++
// SYNTAX
string.toLowerCase()
```

Parameters:

  * string: a variable of type String

Returns: None

### toUpperCase()

Get an upper-case version of a String. `toUpperCase()` modifies the string in place.

```C++
// SYNTAX
string.toUpperCase()
```

Parameters:

  * string: a variable of type String

Returns: None

### trim()

Get a version of the String with any leading and trailing whitespace removed.

```C++
// SYNTAX
string.trim()
```

Parameters:

  * string: a variable of type String

Returns: None


## Stream Class
Stream is the base class for character and binary based streams. It is not called directly, but invoked whenever you use a function that relies on it.  The Particle Stream Class is based on the Arduino Stream Class.

Stream defines the reading functions in Particle. When using any core functionality that uses a read() or similar method, you can safely assume it calls on the Stream class. For functions like print(), Stream inherits from the Print class.

Some of the Particle classes that rely on Stream include :
`Serial`
`Wire`
`TCPClient`
`UDP`

### setTimeout()
`setTimeout()` sets the maximum milliseconds to wait for stream data, it defaults to 1000 milliseconds.

```C++
// SYNTAX
stream.setTimeout(time);
```

Parameters:

  * stream: an instance of a class that inherits from Stream
  * time: timeout duration in milliseconds (unsigned int)

Returns: None

### find()
`find()` reads data from the stream until the target string of given length is found.

```C++
// SYNTAX
stream.find(target);		// reads data from the stream until the target string is found
stream.find(target, length);	// reads data from the stream until the target string of given length is found
```

Parameters:

  * stream : an instance of a class that inherits from Stream
  * target : pointer to the string to search for (char *)
  * length : length of target string to search for (size_t)

Returns: returns true if target string is found, false if timed out

### findUntil()
`findUntil()` reads data from the stream until the target string or terminator string is found.

```C++
// SYNTAX
stream.findUntil(target, terminal);		// reads data from the stream until the target string or terminator is found
stream.findUntil(target, terminal, length);	// reads data from the stream until the target string of given length or terminator is found
```

Parameters:

  * stream : an instance of a class that inherits from Stream
  * target : pointer to the string to search (char *)
  * terminal : pointer to the terminal string to search for (char *)
  * length : length of target string to search for (size_t)

Returns: returns true if target string or terminator string is found, false if timed out

### readBytes()
`readBytes()` read characters from a stream into a buffer. The function terminates if the determined length has been read, or it times out.

```C++
// SYNTAX
stream.readBytes(buffer, length);
```

Parameters:

  * stream : an instance of a class that inherits from Stream
  * buffer : pointer to the buffer to store the bytes in (char *)
  * length : the number of bytes to read (size_t)

Returns: returns the number of characters placed in the buffer (0 means no valid data found)

### readBytesUntil()
`readBytesUntil()` reads characters from a stream into a buffer. The function terminates if the terminator character is detected, the determined length has been read, or it times out.

```C++
// SYNTAX
stream.readBytesUntil(terminator, buffer, length);
```

Parameters:

  * stream : an instance of a class that inherits from Stream
  * terminator : the character to search for (char)
  * buffer : pointer to the buffer to store the bytes in (char *)
  * length : the number of bytes to read (size_t)

Returns: returns the number of characters placed in the buffer (0 means no valid data found)

### readString()
`readString()` reads characters from a stream into a string. The function terminates if it times out.

```C++
// SYNTAX
stream.readString();
```

Parameters:

  * stream : an instance of a class that inherits from Stream

Returns: the entire string read from stream (String)

### readStringUntil()
`readStringUntil()` reads characters from a stream into a string until a terminator character is detected. The function terminates if it times out.

```C++
// SYNTAX
stream.readStringUntil(terminator);
```

Parameters:

  * stream : an instance of a class that inherits from Stream
  * terminator : the character to search for (char)

Returns: the entire string read from stream, until the terminator character is detected

### parseInt()
`parseInt()` returns the first valid (long) integer value from the current position under the following conditions:

 - Initial characters that are not digits or a minus sign, are skipped;
 - Parsing stops when no characters have been read for a configurable time-out value, or a non-digit is read;

```C++
// SYNTAX
stream.parseInt();
stream.parseInt(skipChar);	// allows format characters (typically commas) in values to be ignored
```

Parameters:

  * stream : an instance of a class that inherits from Stream
  * skipChar : the character to ignore while parsing (char).

Returns: parsed int value (long). If no valid digits were read when the time-out occurs, 0 is returned.

### parseFloat()
`parseFloat()` as `parseInt()` but returns the first valid floating point value from the current position.

```C++
// SYNTAX
stream.parsetFloat();
stream.parsetFloat(skipChar);	// allows format characters (typically commas) in values to be ignored
```

Parameters:

  * stream : an instance of a class that inherits from Stream
  * skipChar : the character to ignore while parsing (char).

Returns: parsed float value (float). If no valid digits were read when the time-out occurs, 0 is returned.



## Logging

{{since when="0.6.0"}}

This library provides various classes for logging.

```cpp
// EXAMPLE

// Use primary serial over USB interface for logging output
SerialLogHandler logHandler;

void setup() {
    // Log some messages with different logging levels
    Log.info("This is info message");
    Log.warn("This is warning message");
    Log.error("This is error message");

    // Format text message
    Log.info("System version: %s", (const char*)System.version());
}

void loop() {
}
```

At higher level, the logging framework consists of two parts represented by their respective classes: [loggers](#logger-class) and [log handlers](#log-handlers). Most of the logging operations, such as generating a log message, are done through logger instances, while log handlers act as _sinks_ for the overall logging output generated by the system and application modules.

The library provides default logger instance named `Log`, which can be used for all typical logging operations. Note that applications still need to instantiate at least one log handler in order to enable logging, otherwise most of the logging operations will have no effect. In the provided example, the application uses `SerialLogHandler` which sends the logging output to the primary serial over USB interface.

Consider the following logging output as generated by the example application:

`0000000047 [app] INFO: This is info message`  
`0000000050 [app] WARN: This is warning message`  
`0000000100 [app] ERROR: This is error message`  
`0000000149 [app] INFO: System version: 0.6.0`

Here, each line starts with a timestamp (a number of milliseconds since the system startup), `app` is a default [logging category](#logging-categories), and `INFO`, `WARN` and `ERROR` are [logging levels](#logging-levels) of the respective log messages.

### Logging Levels

Every log message is always associated with some logging level that describes _severity_ of the message. Supported logging levels are defined by the `LogLevel` enum (from lowest to highest level):

  * `LOG_LEVEL_ALL` : special value that can be used to enable logging of all messages
  * `LOG_LEVEL_TRACE` : verbose output for debugging purposes
  * `LOG_LEVEL_INFO` : regular information messages
  * `LOG_LEVEL_WARN` : warnings and non-critical errors
  * `LOG_LEVEL_ERROR` : error messages
  * `LOG_LEVEL_NONE` : special value that can be used to disable logging of any messages

```cpp
// EXAMPLE - message logging

Log.trace("This is trace message");
Log.info("This is info message");
Log.warn("This is warning message");
Log.error("This is error message");

// Specify logging level directly
Log(LOG_LEVEL_INFO, "This is info message");

// Log message with the default logging level (LOG_LEVEL_INFO)
Log("This is info message");
```

For convenience, [Logger class](#logger-class) (and its default `Log` instance) provides separate logging method for each of the defined logging levels.

Log handlers can be configured to filter out messages that are below a certain logging level. By default, any messages below the `LOG_LEVEL_INFO` level are filtered out.

```cpp
// EXAMPLE - basic filtering

// Log handler processing only warning and error messages
SerialLogHandler logHandler(LOG_LEVEL_WARN);

void setup() {
    Log.trace("This is trace message"); // Ignored by the handler
    Log.info("This is info message"); // Ignored by the handler
    Log.warn("This is warning message");
    Log.error("This is error message");
}

void loop() {
}
```

In the provided example, the trace and info messages will be filtered out according to the log handler settings, which prevent log messages below the `LOG_LEVEL_WARN` level from being logged:

`0000000050 [app] WARN: This is warning message`  
`0000000100 [app] ERROR: This is error message`

### Logging Categories

In addition to logging level, log messages can also be associated with some _category_ name. Categories allow to organize system and application modules into namespaces, and are used for more selective filtering of the logging output.

One of the typical use cases for category filtering is suppressing of non-critical system messages while preserving application messages at lower logging levels. In the provided example, a message that is not associated with the `app` category will be logged only if its logging level is at or above the warning level (`LOG_LEVEL_WARN`).

```cpp
// EXAMPLE - filtering out system messages

SerialLogHandler logHandler(LOG_LEVEL_WARN, { // Logging level for non-application messages
    { "app", LOG_LEVEL_ALL } // Logging level for application messages
});
```

Default `Log` logger uses `app` category for all messages generated via its logging methods. In order to log messages with different category name it is necessary to instantiate another logger, passing category name to its constructor.

```cpp
// EXAMPLE - using custom loggers

void connect() {
    Logger log("app.network");
    log.trace("Connecting to server"); // Using local logger
}

SerialLogHandler logHandler(LOG_LEVEL_WARN, { // Logging level for non-application messages
    { "app", LOG_LEVEL_INFO }, // Default logging level for all application messages
    { "app.network", LOG_LEVEL_TRACE } // Logging level for networking messages
});

void setup() {
    Log.info("System started"); // Using default logger instance
    Log.trace("My device ID: %s", (const char*)System.deviceID());
    connect();
}

void loop() {
}
```

Category names are written in all lower case and may contain arbitrary number of _subcategories_ separated by period character. In order to not interfere with the system logging, it is recommended to always add `app` prefix to all application-specific category names.

The example application generates the following logging output:

`0000000044 [app] INFO: System started`  
`0000000044 [app.network] TRACE: Connecting to server`

Note that the trace message containing device ID has been filtered out according to the log handler settings, which prevent log messages with the `app` category from being logged if their logging level is below the `LOG_LEVEL_INFO` level.

Category filters are specified using _initializer list_ syntax with each element of the list containing a filter string and a minimum logging level required for messages with matching category to be logged. Note that filter string matches not only exact category name but any of its subcategory names as well, for example:

  * `a` – matches `a`, `a.b`, `a.b.c` but not `aaa` or `aaa.b`
  * `b.c` – matches `b.c`, `b.c.d` but not `a.b.c` or `b.ccc`

If more than one filter matches a given category name, the most specific filter is used.

### Additional Attributes

As described in previous sections, certain log message attributes, such as a timestamp, are automatically added to all generated messages. The library also defines some attributes that can be used for application-specific needs:

  * `code` : arbitrary integer value (e.g. error code)
  * `details` : description string (e.g. error message)

```cpp
// EXAMPLE - specifying additional attributes

SerialLogHandler logHandler;

int connect() {
    return ECONNREFUSED; // Return an error
}

void setup() {
    Log.info("Connecting to server");
    int error = connect();
    if (error) {
        // Get error message string
        const char *message = strerror(error);
        // Log message with additional attributes
        Log.code(error).details(message).error("Connection error");
    }
}

void loop() {
}
```

The example application specifies `code` and `details` attributes for the error message, generating the following logging output:

`0000000084 [app] INFO: Connecting to server`  
`0000000087 [app] ERROR: Connection error [code = 111, details = Connection refused]`

### Log Handlers

In order to enable logging, application needs to instantiate at least one log handler. If necessary, several different log handlers can be instantiated at the same time.

```cpp
// EXAMPLE - enabling multiple log handlers

SerialLogHandler logHandler1;
Serial1LogHandler logHandler2(57600); // Baud rate

void setup() {
    Log.info("This is info message"); // Processed by all handlers
}

void loop() {
}
```

The library provides the following log handlers:

- `SerialLogHandler`
- Additional community-supported log handlers can be found further below.

This handler uses primary serial over USB interface for the logging output ([Serial](#serial)).

`SerialLogHandler(LogLevel level, const Filters &filters)`

Parameters:

  * level : default logging level (default value is `LOG_LEVEL_INFO`)
  * filters : category filters (not specified by default)

`Serial1LogHandler`

This handler uses the device's TX and RX pins for the logging output ([Serial1](#serial)).

`Serial1LogHandler(LogLevel level, const Filters &filters)`  
`Serial1LogHandler(int baud, LogLevel level, const Filters &filters)`

Parameters:

  * level : default logging level (default value is `LOG_LEVEL_INFO`)
  * filters : category filters (not specified by default)
  * baud : baud rate (default value is 9600)

#### Community Log Handlers

The log handlers below are written by the community and are not considered "Official" Particle-supported log handlers. If you have any issues with them please raise an issue in the forums or, ideally, in the online repo for the handler.

- [Papertrail](https://papertrailapp.com/) Log Handler by [barakwei](https://community.particle.io/users/barakwei/activity). [[Particle Build](https://build.particle.io/libs/585c5e64edfd74acf7000e7a/)] [[GitHub Repo](https://github.com/barakwei/ParticlePapertrail)] [[Known Issues](https://github.com/barakwei/ParticlePapertrail/issues/)]
- Web Log Handler by [geeksville](https://github.com/geeksville). [[Particle Build](https://build.particle.io/libs/ParticleWebLog)] [[GitHub Repo](https://github.com/geeksville/ParticleWebLog)] [[Known Issues](https://github.com/geeksville/ParticleWebLog/issues/)]
- More to come (feel free to add your own by editing the docs on GitHub)

### Logger Class

This class is used to generate log messages. The library also provides default instance of this class named `Log`, which can be used for all typical logging operations.

`Logger()`  
`Logger(const char *name)`

```cpp
// EXAMPLE
Logger myLogger("app.main");
```

Construct logger.

Parameters:

  * name : category name (default value is `app`)

`const char* name()`

```cpp
// EXAMPLE
const char *name = Log.name(); // Returns "app"
```

Returns category name set for this logger.

`void trace(const char *format, ...)`  
`void info(const char *format, ...)`  
`void warn(const char *format, ...)`  
`void error(const char *format, ...)`

```cpp
// EXAMPLE
Log.trace("This is trace message");
Log.info("This is info message");
Log.warn("This is warn message");
Log.error("This is error message");

// Format text message
Log.info("The secret of everything is %d", 42);
```

Generate trace, info, warning or error message respectively.

Parameters:

  * format : format string

`void log(const char *format, ...)`  
`void operator()(const char *format, ...)`

```cpp
// EXAMPLE
Log("The secret of everything is %d", 42); // Generates info message
```

Generates log message with the default logging level (`LOG_LEVEL_INFO`).

Parameters:

  * format : format string

`void log(LogLevel level, const char *format, ...)`  
`void operator()(LogLevel level, const char *format, ...)`

```cpp
// EXAMPLE
Log(LOG_LEVEL_INFO, "The secret of everything is %d", 42);
```

Generates log message with the specified logging level.

Parameters:

  * format : format string
  * level : logging level (default value is `LOG_LEVEL_INFO`)

`bool isTraceEnabled()`  
`bool isInfoEnabled()`  
`bool isWarnEnabled()`  
`bool isErrorEnabled()`

```cpp
// EXAMPLE
if (Log.isTraceEnabled()) {
    // Do some heavy logging
}
```

Return `true` if logging is enabled for trace, info, warning or error messages respectively.

`bool isLevelEnabled(LogLevel level)`

```cpp
// EXAMPLE
if (Log.isLevelEnabled(LOG_LEVEL_TRACE)) {
    // Do some heavy logging
}
```

Returns `true` if logging is enabled for the specified logging level.

Parameters:

  * level : logging level



## Language Syntax

Particle devices are programmed in C/C++. While the Arduino compatibility features are available as described below, you can also write programs in plain C or C++, specifically gcc C++11.

The following documentation is based on the Arduino reference which can be found [here.](http://www.arduino.cc/en/Reference/HomePage)

### Structure

#### setup()
The setup() function is called when an application starts. Use it to initialize variables, pin modes, start using libraries, etc. The setup function will only run once, after each powerup or device reset.

```cpp
// EXAMPLE USAGE

int button = D0;
int LED = D1;
//setup initializes D0 as input and D1 as output
void setup()
{
  pinMode(button, INPUT_PULLDOWN);
  pinMode(LED, OUTPUT);
}

void loop()
{
  // ...
}
```

#### loop()
After creating a setup() function, which initializes and sets the initial values, the loop() function does precisely what its name suggests, and loops consecutively, allowing your program to change and respond. Use it to actively control the device.  A return may be used to exit the loop() before it completely finishes.

```C++
// EXAMPLE USAGE

int button = D0;
int LED = D1;
//setup initializes D0 as input and D1 as output
void setup()
{
  pinMode(button, INPUT_PULLDOWN);
  pinMode(LED, OUTPUT);
}

//loops to check if button was pressed,
//if it was, then it turns ON the LED,
//else the LED remains OFF
void loop()
{
  if (digitalRead(button) == HIGH)
    digitalWrite(LED,HIGH);
  else
    digitalWrite(LED,LOW);
}
```

### Control structures

#### if

`if`, which is used in conjunction with a comparison operator, tests whether a certain condition has been reached, such as an input being above a certain number.

```C++
// SYNTAX
if (someVariable > 50)
{
  // do something here
}
```
The program tests to see if someVariable is greater than 50. If it is, the program takes a particular action. Put another way, if the statement in parentheses is true, the statements inside the brackets are run. If not, the program skips over the code.

The brackets may be omitted after an *if* statement. If this is done, the next line (defined by the semicolon) becomes the only conditional statement.

```C++
if (x > 120) digitalWrite(LEDpin, HIGH);

if (x > 120)
digitalWrite(LEDpin, HIGH);

if (x > 120){ digitalWrite(LEDpin, HIGH); }

if (x > 120)
{
  digitalWrite(LEDpin1, HIGH);
  digitalWrite(LEDpin2, HIGH);
}                                 // all are correct
```
The statements being evaluated inside the parentheses require the use of one or more operators:

#### Comparison Operators

```C++
x == y (x is equal to y)
x != y (x is not equal to y)
x <  y (x is less than y)
x >  y (x is greater than y)
x <= y (x is less than or equal to y)
x >= y (x is greater than or equal to y)
```

**WARNING:**
Beware of accidentally using the single equal sign (e.g. `if (x = 10)` ). The single equal sign is the assignment operator, and sets x to 10 (puts the value 10 into the variable x). Instead use the double equal sign (e.g. `if (x == 10)` ), which is the comparison operator, and tests whether x is equal to 10 or not. The latter statement is only true if x equals 10, but the former statement will always be true.

This is because C evaluates the statement `if (x=10)` as follows: 10 is assigned to x (remember that the single equal sign is the assignment operator), so x now contains 10. Then the 'if' conditional evaluates 10, which always evaluates to TRUE, since any non-zero number evaluates to TRUE. Consequently, `if (x = 10)` will always evaluate to TRUE, which is not the desired result when using an 'if' statement. Additionally, the variable x will be set to 10, which is also not a desired action.

`if` can also be part of a branching control structure using the `if...else`] construction.

#### if...else

*if/else* allows greater control over the flow of code than the basic *if* statement, by allowing multiple tests to be grouped together. For example, an analog input could be tested and one action taken if the input was less than 500, and another action taken if the input was 500 or greater. The code would look like this:

```C++
// SYNTAX
if (pinFiveInput < 500)
{
  // action A
}
else
{
  // action B
}
```
`else` can proceed another `if` test, so that multiple, mutually exclusive tests can be run at the same time.

Each test will proceed to the next one until a true test is encountered. When a true test is found, its associated block of code is run, and the program then skips to the line following the entire if/else construction. If no test proves to be true, the default else block is executed, if one is present, and sets the default behavior.

Note that an *else if* block may be used with or without a terminating *else* block and vice versa. An unlimited number of such else if branches is allowed.

```C++
if (pinFiveInput < 500)
{
  // do Thing A
}
else if (pinFiveInput >= 1000)
{
  // do Thing B
}
else
{
  // do Thing C
}
```

Another way to express branching, mutually exclusive tests, is with the [`switch case`](#switch-case) statement.

#### for

The `for` statement is used to repeat a block of statements enclosed in curly braces. An increment counter is usually used to increment and terminate the loop. The `for` statement is useful for any repetitive operation, and is often used in combination with arrays to operate on collections of data/pins.

There are three parts to the for loop header:

```C++
// SYNTAX
for (initialization; condition; increment)
{
  //statement(s);
}
```
The *initialization* happens first and exactly once. Each time through the loop, the *condition* is tested; if it's true, the statement block, and the *increment* is executed, then the condition is tested again. When the *condition* becomes false, the loop ends.

```C++
// EXAMPLE USAGE

// slowy make the LED glow brighter
int ledPin = D1; // LED in series with 470 ohm resistor on pin D1

void setup()
{
  // set ledPin as an output
  pinMode(ledPin,OUTPUT);
}

void loop()
{
  for (int i=0; i <= 255; i++){
    analogWrite(ledPin, i);
    delay(10);
  }
}
```
The C `for` loop is much more flexible than for loops found in some other computer languages, including BASIC. Any or all of the three header elements may be omitted, although the semicolons are required. Also the statements for initialization, condition, and increment can be any valid C statements with unrelated variables, and use any C datatypes including floats. These types of unusual for statements may provide solutions to some rare programming problems.

For example, using a multiplication in the increment line will generate a logarithmic progression:

```C++
for(int x = 2; x < 100; x = x * 1.5)
{
  Serial.print(x);
}
//Generates: 2,3,4,6,9,13,19,28,42,63,94
```
Another example, fade an LED up and down with one for loop:

```C++
// slowy make the LED glow brighter
int ledPin = D1; // LED in series with 470 ohm resistor on pin D1

void setup()
{
  // set ledPin as an output
  pinMode(ledPin,OUTPUT);
}

void loop()
{
  int x = 1;
  for (int i = 0; i > -1; i = i + x)
  {
    analogWrite(ledPin, i);
    if (i == 255) x = -1;     // switch direction at peak
    delay(10);
  }
}
```

#### switch case

Like `if` statements, `switch`...`case` controls the flow of programs by allowing programmers to specify different code that should be executed in various conditions. In particular, a switch statement compares the value of a variable to the values specified in case statements. When a case statement is found whose value matches that of the variable, the code in that case statement is run.

The `break` keyword exits the switch statement, and is typically used at the end of each case. Without a break statement, the switch statement will continue executing the following expressions ("falling-through") until a break, or the end of the switch statement is reached.

```C++
// SYNTAX
switch (var)
{
  case label:
    // statements
    break;
  case label:
    // statements
    break;
  default:
    // statements
}
```
`var` is the variable whose value to compare to the various cases
`label` is a value to compare the variable to

```C++
// EXAMPLE USAGE

switch (var)
{
  case 1:
    // do something when var equals 1
    break;
  case 2:
    // do something when var equals 2
    break;
  default:
    // if nothing else matches, do the
    // default (which is optional)
}
```

#### while

`while` loops will loop continuously, and infinitely, until the expression inside the parenthesis, () becomes false. Something must change the tested variable, or the `while` loop will never exit. This could be in your code, such as an incremented variable, or an external condition, such as testing a sensor.

```C++
// SYNTAX
while(expression)
{
  // statement(s)
}
```
`expression` is a (boolean) C statement that evaluates to true or false.

```C++
// EXAMPLE USAGE

var = 0;
while(var < 200)
{
  // do something repetitive 200 times
  var++;
}
```

#### do... while

The `do` loop works in the same manner as the `while` loop, with the exception that the condition is tested at the end of the loop, so the do loop will *always* run at least once.

```C++
// SYNTAX
do
{
  // statement block
} while (test condition);
```

```C++
// EXAMPLE USAGE

do
{
  delay(50);          // wait for sensors to stabilize
  x = readSensors();  // check the sensors

} while (x < 100);
```

#### break

`break` is used to exit from a `do`, `for`, or `while` loop, bypassing the normal loop condition. It is also used to exit from a `switch` statement.

```C++
// EXAMPLE USAGE

for (int x = 0; x < 255; x++)
{
  digitalWrite(ledPin, x);
  sens = analogRead(sensorPin);
  if (sens > threshold)
  {
    x = 0;
    break;  // exit for() loop on sensor detect
  }
  delay(50);
}
```

#### continue

The continue statement skips the rest of the current iteration of a loop (`do`, `for`, or `while`). It continues by checking the conditional expression of the loop, and proceeding with any subsequent iterations.

```C++
// EXAMPLE USAGE

for (x = 0; x < 255; x++)
{
    if (x > 40 && x < 120) continue;  // create jump in values

    digitalWrite(PWMpin, x);
    delay(50);
}
```

#### return

Terminate a function and return a value from a function to the calling function, if desired.

```C++
//EXAMPLE USAGE

// A function to compare a sensor input to a threshold
 int checkSensor()
 {
    if (analogRead(0) > 400) return 1;
    else return 0;
}
```
The return keyword is handy to test a section of code without having to "comment out" large sections of possibly buggy code.

```C++
void loop()
{
  // brilliant code idea to test here

  return;

  // the rest of a dysfunctional sketch here
  // this code will never be executed
}
```

#### goto

Transfers program flow to a labeled point in the program

```C++
// SYNTAX

label:

goto label; // sends program flow to the label

```

**TIP:**
The use of `goto` is discouraged in C programming, and some authors of C programming books claim that the `goto` statement is never necessary, but used judiciously, it can simplify certain programs. The reason that many programmers frown upon the use of `goto` is that with the unrestrained use of `goto` statements, it is easy to create a program with undefined program flow, which can never be debugged.

With that said, there are instances where a `goto` statement can come in handy, and simplify coding. One of these situations is to break out of deeply nested `for` loops, or `if` logic blocks, on a certain condition.

```C++
// EXAMPLE USAGE

for(byte r = 0; r < 255; r++) {
  for(byte g = 255; g > -1; g--) {
    for(byte b = 0; b < 255; b++) {
      if (analogRead(0) > 250) {
        goto bailout;
      }
      // more statements ...
    }
  }
}
bailout:
// Code execution jumps here from
// goto bailout; statement
```

### Further syntax

#### ; (semicolon)

Used to end a statement.

`int a = 13;`

**Tip:**
Forgetting to end a line in a semicolon will result in a compiler error. The error text may be obvious, and refer to a missing semicolon, or it may not. If an impenetrable or seemingly illogical compiler error comes up, one of the first things to check is a missing semicolon, in the immediate vicinity, preceding the line at which the compiler complained.

#### {} (curly braces)

Curly braces (also referred to as just "braces" or as "curly brackets") are a major part of the C programming language. They are used in several different constructs, outlined below, and this can sometimes be confusing for beginners.

```C++
//The main uses of curly braces

//Functions
  void myfunction(datatype argument){
    statements(s)
  }

//Loops
  while (boolean expression)
  {
     statement(s)
  }

  do
  {
     statement(s)
  } while (boolean expression);

  for (initialisation; termination condition; incrementing expr)
  {
     statement(s)
  }

//Conditional statements
  if (boolean expression)
  {
     statement(s)
  }

  else if (boolean expression)
  {
     statement(s)
  }
  else
  {
     statement(s)
  }

```

An opening curly brace "{" must always be followed by a closing curly brace "}". This is a condition that is often referred to as the braces being balanced.

Beginning programmers, and programmers coming to C from the BASIC language often find using braces confusing or daunting. After all, the same curly braces replace the RETURN statement in a subroutine (function), the ENDIF statement in a conditional and the NEXT statement in a FOR loop.

Because the use of the curly brace is so varied, it is good programming practice to type the closing brace immediately after typing the opening brace when inserting a construct which requires curly braces. Then insert some carriage returns between your braces and begin inserting statements. Your braces, and your attitude, will never become unbalanced.

Unbalanced braces can often lead to cryptic, impenetrable compiler errors that can sometimes be hard to track down in a large program. Because of their varied usages, braces are also incredibly important to the syntax of a program and moving a brace one or two lines will often dramatically affect the meaning of a program.


#### // (single line comment)
#### /\* \*/ (multi-line comment)

Comments are lines in the program that are used to inform yourself or others about the way the program works. They are ignored by the compiler, and not exported to the processor, so they don't take up any space on the device.

Comments only purpose are to help you understand (or remember) how your program works or to inform others how your program works. There are two different ways of marking a line as a comment:

```C++
// EXAMPLE USAGE

x = 5;  // This is a single line comment. Anything after the slashes is a comment
        // to the end of the line

/* this is multiline comment - use it to comment out whole blocks of code

if (gwb == 0) {   // single line comment is OK inside a multiline comment
  x = 3;          /* but not another multiline comment - this is invalid */
}
// don't forget the "closing" comment - they have to be balanced!
*/
```

**TIP:**
When experimenting with code, "commenting out" parts of your program is a convenient way to remove lines that may be buggy. This leaves the lines in the code, but turns them into comments, so the compiler just ignores them. This can be especially useful when trying to locate a problem, or when a program refuses to compile and the compiler error is cryptic or unhelpful.


#### #define

`#define` is a useful C component that allows the programmer to give a name to a constant value before the program is compiled. Defined constants don't take up any program memory space on the chip. The compiler will replace references to these constants with the defined value at compile time.

`#define constantName value`

Note that the # is necessary.

This can have some unwanted side effects if the constant name in a `#define` is used in some other constant or variable name. In that case the text would be replaced by the `#define` value.

```C++
// EXAMPLE USAGE

#define ledPin 3
// The compiler will replace any mention of ledPin with the value 3 at compile time.
```

In general, the `const` keyword is preferred for defining constants and should be used instead of #define.

**TIP:**
There is no semicolon after the #define statement. If you include one, the compiler will throw cryptic errors further down the page.

`#define ledPin 3;   // this is an error`

Similarly, including an equal sign after the #define statement will also generate a cryptic compiler error further down the page.

`#define ledPin = 3  // this is also an error`

#### #include

`#include` is used to include outside libraries in your application code. This gives the programmer access to a large group of standard C libraries (groups of pre-made functions), and also libraries written especially for your device.

Note that #include, similar to #define, has no semicolon terminator, and the compiler will yield cryptic error messages if you add one.

### Arithmetic operators

#### = (assignment operator)

Stores the value to the right of the equal sign in the variable to the left of the equal sign.

The single equal sign in the C programming language is called the assignment operator. It has a different meaning than in algebra class where it indicated an equation or equality. The assignment operator tells the microcontroller to evaluate whatever value or expression is on the right side of the equal sign, and store it in the variable to the left of the equal sign.

```C++
// EXAMPLE USAGE

int sensVal;                // declare an integer variable named sensVal
senVal = analogRead(A0);    // store the (digitized) input voltage at analog pin A0 in SensVal
```
**TIP:**
The variable on the left side of the assignment operator ( = sign ) needs to be able to hold the value stored in it. If it is not large enough to hold a value, the value stored in the variable will be incorrect.

Don't confuse the assignment operator `=` (single equal sign) with the comparison operator `==` (double equal signs), which evaluates whether two expressions are equal.

#### + - * / (addition subtraction multiplication division)

These operators return the sum, difference, product, or quotient (respectively) of the two operands. The operation is conducted using the data type of the operands, so, for example,`9 / 4` gives 2 since 9 and 4 are ints. This also means that the operation can overflow if the result is larger than that which can be stored in the data type (e.g. adding 1 to an int with the value 2,147,483,647 gives -2,147,483,648). If the operands are of different types, the "larger" type is used for the calculation.

If one of the numbers (operands) are of the type float or of type double, floating point math will be used for the calculation.

```C++
// EXAMPLE USAGES

y = y + 3;
x = x - 7;
i = j * 6;
r = r / 5;
```

```C++
// SYNTAX
result = value1 + value2;
result = value1 - value2;
result = value1 * value2;
result = value1 / value2;
```
`value1` and `value2` can be any variable or constant.

**TIPS:**

  - Know that integer constants default to int, so some constant calculations may overflow (e.g. 50 * 50,000,000 will yield a negative result).
  - Choose variable sizes that are large enough to hold the largest results from your calculations
  - Know at what point your variable will "roll over" and also what happens in the other direction e.g. (0 - 1) OR (0 + 2147483648)
  - For math that requires fractions, use float variables, but be aware of their drawbacks: large size, slow computation speeds
  - Use the cast operator e.g. (int)myFloat to convert one variable type to another on the fly.

#### % (modulo)

Calculates the remainder when one integer is divided by another. It is useful for keeping a variable within a particular range (e.g. the size of an array).  It is defined so that `a % b == a - ((a / b) * b)`.

`result = dividend % divisor`

`dividend` is the number to be divided and
`divisor` is the number to divide by.

`result` is the remainder

The remainder function can have unexpected behavior when some of the operands are negative.  If the dividend is negative, then the result will be the smallest negative equivalency class.  In other words, when `a` is negative, `(a % b) == (a mod b) - b` where (a mod b) follows the standard mathematical definition of mod.  When the divisor is negative, the result is the same as it would be if it was positive.

```C++
// EXAMPLE USAGES

x = 9 % 5;   // x now contains 4
x = 5 % 5;   // x now contains 0
x = 4 % 5;   // x now contains 4
x = 7 % 5;   // x now contains 2
x = -7 % 5;  // x now contains -2
x = 7 % -5;  // x now contains 2
x = -7 % -5; // x now contains -2
```

```C++
EXAMPLE CODE
//update one value in an array each time through a loop

int values[10];
int i = 0;

void setup() {}

void loop()
{
  values[i] = analogRead(A0);
  i = (i + 1) % 10;   // modulo operator rolls over variable
}
```

**TIP:**
The modulo operator does not work on floats.  For floats, an equivalent expression to `a % b` is `a - (b * ((int)(a / b)))`

### Boolean operators

These can be used inside the condition of an if statement.

#### && (and)

True only if both operands are true, e.g.

```C++
if (digitalRead(D2) == HIGH  && digitalRead(D3) == HIGH)
{
  // read two switches
  // ...
}
//is true only if both inputs are high.
```

#### || (or)

True if either operand is true, e.g.

```C++
if (x > 0 || y > 0)
{
  // ...
}
//is true if either x or y is greater than 0.
```

#### ! (not)

True if the operand is false, e.g.

```C++
if (!x)
{
  // ...
}
//is true if x is false (i.e. if x equals 0).
```

**WARNING:**
Make sure you don't mistake the boolean AND operator, && (double ampersand) for the bitwise AND operator & (single ampersand). They are entirely different beasts.

Similarly, do not confuse the boolean || (double pipe) operator with the bitwise OR operator | (single pipe).

The bitwise not ~ (tilde) looks much different than the boolean not ! (exclamation point or "bang" as the programmers say) but you still have to be sure which one you want where.

`if (a >= 10 && a <= 20){}   // true if a is between 10 and 20`

### Bitwise operators

#### & (bitwise and)

The bitwise AND operator in C++ is a single ampersand, &, used between two other integer expressions. Bitwise AND operates on each bit position of the surrounding expressions independently, according to this rule: if both input bits are 1, the resulting output is 1, otherwise the output is 0. Another way of expressing this is:

```
    0  0  1  1    operand1
    0  1  0  1    operand2
    ----------
    0  0  0  1    (operand1 & operand2) - returned result
```

```C++
// EXAMPLE USAGE

int a =  92;    // in binary: 0000000001011100
int b = 101;    // in binary: 0000000001100101
int c = a & b;  // result:    0000000001000100, or 68 in decimal.
```
One of the most common uses of bitwise AND is to select a particular bit (or bits) from an integer value, often called masking.

#### | (bitwise or)

The bitwise OR operator in C++ is the vertical bar symbol, |. Like the & operator, | operates independently each bit in its two surrounding integer expressions, but what it does is different (of course). The bitwise OR of two bits is 1 if either or both of the input bits is 1, otherwise it is 0. In other words:

```
    0  0  1  1    operand1
    0  1  0  1    operand2
    ----------
    0  1  1  1    (operand1 | operand2) - returned result
```
```C++
// EXAMPLE USAGE

int a =  92;    // in binary: 0000000001011100
int b = 101;    // in binary: 0000000001100101
int c = a | b;  // result:    0000000001111101, or 125 in decimal.
```

#### ^ (bitwise xor)

There is a somewhat unusual operator in C++ called bitwise EXCLUSIVE OR, also known as bitwise XOR. (In English this is usually pronounced "eks-or".) The bitwise XOR operator is written using the caret symbol ^. This operator is very similar to the bitwise OR operator |, only it evaluates to 0 for a given bit position when both of the input bits for that position are 1:

```
    0  0  1  1    operand1
    0  1  0  1    operand2
    ----------
    0  1  1  0    (operand1 ^ operand2) - returned result
```
Another way to look at bitwise XOR is that each bit in the result is a 1 if the input bits are different, or 0 if they are the same.

```C++
// EXAMPLE USAGE

int x = 12;     // binary: 1100
int y = 10;     // binary: 1010
int z = x ^ y;  // binary: 0110, or decimal 6
```

The ^ operator is often used to toggle (i.e. change from 0 to 1, or 1 to 0) some of the bits in an integer expression. In a bitwise OR operation if there is a 1 in the mask bit, that bit is inverted; if there is a 0, the bit is not inverted and stays the same.


#### ~ (bitwise not)

The bitwise NOT operator in C++ is the tilde character ~. Unlike & and |, the bitwise NOT operator is applied to a single operand to its right. Bitwise NOT changes each bit to its opposite: 0 becomes 1, and 1 becomes 0. For example:

```
    0  1    operand1
   ----------
    1  0   ~ operand1

int a = 103;    // binary:  0000000001100111
int b = ~a;     // binary:  1111111110011000 = -104
```
You might be surprised to see a negative number like -104 as the result of this operation. This is because the highest bit in an int variable is the so-called sign bit. If the highest bit is 1, the number is interpreted as negative. This encoding of positive and negative numbers is referred to as two's complement. For more information, see the Wikipedia article on [two's complement.](http://en.wikipedia.org/wiki/Twos_complement)

As an aside, it is interesting to note that for any integer x, ~x is the same as -x-1.

At times, the sign bit in a signed integer expression can cause some unwanted surprises.

#### << (bitwise left shift), >> (bitwise right shift)

There are two bit shift operators in C++: the left shift operator << and the right shift operator >>. These operators cause the bits in the left operand to be shifted left or right by the number of positions specified by the right operand.

More on bitwise math may be found [here.](http://playground.arduino.cc/Code/BitMath)

```
variable << number_of_bits
variable >> number_of_bits
```

`variable` can be `byte`, `int`, `long`
`number_of_bits` and integer <= 32

```C++
// EXAMPLE USAGE

int a = 5;        // binary: 0000000000000101
int b = a << 3;   // binary: 0000000000101000, or 40 in decimal
int c = b >> 3;   // binary: 0000000000000101, or back to 5 like we started with
```
When you shift a value x by y bits (x << y), the leftmost y bits in x are lost, literally shifted out of existence:

```C++
int a = 5;        // binary: 0000000000000101
int b = a << 14;  // binary: 0100000000000000 - the first 1 in 101 was discarded
```
If you are certain that none of the ones in a value are being shifted into oblivion, a simple way to think of the left-shift operator is that it multiplies the left operand by 2 raised to the right operand power. For example, to generate powers of 2, the following expressions can be employed:

```
1 <<  0  ==    1
1 <<  1  ==    2
1 <<  2  ==    4
1 <<  3  ==    8
...
1 <<  8  ==  256
1 <<  9  ==  512
1 << 10  == 1024
...
```
When you shift x right by y bits (x >> y), and the highest bit in x is a 1, the behavior depends on the exact data type of x. If x is of type int, the highest bit is the sign bit, determining whether x is negative or not, as we have discussed above. In that case, the sign bit is copied into lower bits, for esoteric historical reasons:

```C++
int x = -16;     // binary: 1111111111110000
int y = x >> 3;  // binary: 1111111111111110
```
This behavior, called sign extension, is often not the behavior you want. Instead, you may wish zeros to be shifted in from the left. It turns out that the right shift rules are different for unsigned int expressions, so you can use a typecast to suppress ones being copied from the left:

```C++
int x = -16;                   // binary: 1111111111110000
int y = (unsigned int)x >> 3;  // binary: 0001111111111110
```

If you are careful to avoid sign extension, you can use the right-shift operator >> as a way to divide by powers of 2. For example:

```C++
int x = 1000;
int y = x >> 3;   // integer division of 1000 by 8, causing y = 125
```
### Compound operators

#### ++ (increment), -- (decrement)

Increment or decrement a variable

```C++
// SYNTAX
x++;  // increment x by one and returns the old value of x
++x;  // increment x by one and returns the new value of x

x-- ;   // decrement x by one and returns the old value of x
--x ;   // decrement x by one and returns the new value of x
```

where `x` is an integer or long (possibly unsigned)

```C++
// EXAMPLE USAGE

x = 2;
y = ++x;      // x now contains 3, y contains 3
y = x--;      // x contains 2 again, y still contains 3
```

#### compound arithmetic

- += (compound addition)
- -= (compound subtraction)
- *= (compound multiplication)
- /= (compound division)

Perform a mathematical operation on a variable with another constant or variable. The += (et al) operators are just a convenient shorthand for the expanded syntax.

```C++
// SYNTAX
x += y;   // equivalent to the expression x = x + y;
x -= y;   // equivalent to the expression x = x - y;
x *= y;   // equivalent to the expression x = x * y;
x /= y;   // equivalent to the expression x = x / y;
```

`x` can be any variable type
`y` can be any variable type or constant

```C++
// EXAMPLE USAGE

x = 2;
x += 4;      // x now contains 6
x -= 3;      // x now contains 3
x *= 10;     // x now contains 30
x /= 2;      // x now contains 15
```

#### &= (compound bitwise and)

The compound bitwise AND operator (&=) is often used with a variable and a constant to force particular bits in a variable to the LOW state (to 0). This is often referred to in programming guides as "clearing" or "resetting" bits.

`x &= y;   // equivalent to x = x & y;`

`x` can be a char, int or long variable
`y` can be an integer constant, char, int, or long

```
   0  0  1  1    operand1
   0  1  0  1    operand2
   ----------
   0  0  0  1    (operand1 & operand2) - returned result
```
Bits that are "bitwise ANDed" with 0 are cleared to 0 so, if myByte is a byte variable,
`myByte & B00000000 = 0;`

Bits that are "bitwise ANDed" with 1 are unchanged so,
`myByte & B11111111 = myByte;`

**Note:** because we are dealing with bits in a bitwise operator - it is convenient to use the binary formatter with constants. The numbers are still the same value in other representations, they are just not as easy to understand. Also, B00000000 is shown for clarity, but zero in any number format is zero (hmmm something philosophical there?)

Consequently - to clear (set to zero) bits 0 & 1 of a variable, while leaving the rest of the variable unchanged, use the compound bitwise AND operator (&=) with the constant B11111100

```
   1  0  1  0  1  0  1  0    variable
   1  1  1  1  1  1  0  0    mask
   ----------------------
   1  0  1  0  1  0  0  0

 variable unchanged
                     bits cleared
```
Here is the same representation with the variable's bits replaced with the symbol x

```
   x  x  x  x  x  x  x  x    variable
   1  1  1  1  1  1  0  0    mask
   ----------------------
   x  x  x  x  x  x  0  0

 variable unchanged
                     bits cleared
```

So if:
`myByte =  10101010;`
`myByte &= B1111100 == B10101000;`


#### |= (compound bitwise or)

The compound bitwise OR operator (|=) is often used with a variable and a constant to "set" (set to 1) particular bits in a variable.

```C++
// SYNTAX
x |= y;   // equivalent to x = x | y;
```
`x` can be a char, int or long variable
`y` can be an integer constant or char, int or long

```
   0  0  1  1    operand1
   0  1  0  1    operand2
   ----------
   0  1  1  1    (operand1 | operand2) - returned result
```
Bits that are "bitwise ORed" with 0 are unchanged, so if myByte is a byte variable,
`myByte | B00000000 = myByte;`

Bits that are "bitwise ORed" with 1 are set to 1 so:
`myByte | B11111111 = B11111111;`

Consequently - to set bits 0 & 1 of a variable, while leaving the rest of the variable unchanged, use the compound bitwise OR operator (|=) with the constant B00000011

```
   1  0  1  0  1  0  1  0    variable
   0  0  0  0  0  0  1  1    mask
   ----------------------
   1  0  1  0  1  0  1  1

 variable unchanged
                     bits set
```
Here is the same representation with the variables bits replaced with the symbol x
```
   x  x  x  x  x  x  x  x    variable
   0  0  0  0  0  0  1  1    mask
   ----------------------
   x  x  x  x  x  x  1  1

 variable unchanged
                     bits set
```
So if:
`myByte =  B10101010;`
`myByte |= B00000011 == B10101011;`



### Variables

#### HIGH | LOW

When reading or writing to a digital pin there are only two possible values a pin can take/be-set-to: HIGH and LOW.

`HIGH`

The meaning of `HIGH` (in reference to a pin) is somewhat different depending on whether a pin is set to an `INPUT` or `OUTPUT`. When a pin is configured as an INPUT with pinMode, and read with digitalRead, the microcontroller will report HIGH if a voltage of 3 volts or more is present at the pin.

A pin may also be configured as an `INPUT` with `pinMode`, and subsequently made `HIGH` with `digitalWrite`, this will set the internal 40K pullup resistors, which will steer the input pin to a `HIGH` reading unless it is pulled LOW by external circuitry. This is how INPUT_PULLUP works as well

When a pin is configured to `OUTPUT` with `pinMode`, and set to `HIGH` with `digitalWrite`, the pin is at 3.3 volts. In this state it can source current, e.g. light an LED that is connected through a series resistor to ground, or to another pin configured as an output, and set to `LOW.`

`LOW`

The meaning of `LOW` also has a different meaning depending on whether a pin is set to `INPUT` or `OUTPUT`. When a pin is configured as an `INPUT` with `pinMode`, and read with `digitalRead`, the microcontroller will report `LOW` if a voltage of 1.5 volts or less is present at the pin.

When a pin is configured to `OUTPUT` with `pinMode`, and set to `LOW` with digitalWrite, the pin is at 0 volts. In this state it can sink current, e.g. light an LED that is connected through a series resistor to, +3.3 volts, or to another pin configured as an output, and set to `HIGH.`

#### INPUT, OUTPUT, INPUT_PULLUP, INPUT_PULLDOWN

Digital pins can be used as INPUT, INPUT_PULLUP, INPUT_PULLDOWN or OUTPUT. Changing a pin with `pinMode()` changes the electrical behavior of the pin.

Pins Configured as `INPUT`

The device's pins configured as `INPUT` with `pinMode()` are said to be in a high-impedance state. Pins configured as `INPUT` make extremely small demands on the circuit that they are sampling, equivalent to a series resistor of 100 Megohms in front of the pin. This makes them useful for reading a sensor, but not powering an LED.

If you have your pin configured as an `INPUT`, you will want the pin to have a reference to ground, often accomplished with a pull-down resistor (a resistor going to ground).

Pins Configured as `INPUT_PULLUP` or `INPUT_PULLDOWN`

The STM32 microcontroller has internal pull-up resistors (resistors that connect to power internally) and pull-down resistors (resistors that connect to ground internally) that you can access. If you prefer to use these instead of external resistors, you can use these argument in `pinMode()`.

Pins Configured as `OUTPUT`

Pins configured as `OUTPUT` with `pinMode()` are said to be in a low-impedance state. This means that they can provide a substantial amount of current to other circuits. STM32 pins can source (provide positive current) or sink (provide negative current) up to 20 mA (milliamps) of current to other devices/circuits. This makes them useful for powering LED's but useless for reading sensors. Pins configured as outputs can also be damaged or destroyed if short circuited to either ground or 3.3 volt power rails. The amount of current provided by the pin is also not enough to power most relays or motors, and some interface circuitry will be required.

#### true | false

There are two constants used to represent truth and falsity in the Arduino language: true, and false.

`false`

`false` is the easier of the two to define. false is defined as 0 (zero).

`true`

`true` is often said to be defined as 1, which is correct, but true has a wider definition. Any integer which is non-zero is true, in a Boolean sense. So -1, 2 and -200 are all defined as true, too, in a Boolean sense.

Note that the true and false constants are typed in lowercase unlike `HIGH, LOW, INPUT, & OUTPUT.`

### Data Types

**Note:** The Core/Photon/Electron uses a 32-bit ARM based microcontroller and hence the datatype lengths are different from a standard 8-bit system (for e.g. Arduino Uno).

#### void

The `void` keyword is used only in function declarations. It indicates that the function is expected to return no information to the function from which it was called.

```cpp

//EXAMPLE
// actions are performed in the functions "setup" and "loop"
// but  no information is reported to the larger program

void setup()
{
  // ...
}

void loop()
{
  // ...
}
```

#### boolean

A `boolean` holds one of two values, `true` or `false`. (Each boolean variable occupies one byte of memory.)

```cpp
//EXAMPLE

int LEDpin = D0;       // LED on D0
int switchPin = A0;   // momentary switch on A0, other side connected to ground

boolean running = false;

void setup()
{
  pinMode(LEDpin, OUTPUT);
  pinMode(switchPin, INPUT_PULLUP);
}

void loop()
{
  if (digitalRead(switchPin) == LOW)
  {  // switch is pressed - pullup keeps pin high normally
    delay(100);                        // delay to debounce switch
    running = !running;                // toggle running variable
    digitalWrite(LEDpin, running)      // indicate via LED
  }
}

```

#### char

A data type that takes up 1 byte of memory that stores a character value. Character literals are written in single quotes, like this: 'A' (for multiple characters - strings - use double quotes: "ABC").
Characters are stored as numbers however. You can see the specific encoding in the ASCII chart. This means that it is possible to do arithmetic on characters, in which the ASCII value of the character is used (e.g. 'A' + 1 has the value 66, since the ASCII value of the capital letter A is 65). See Serial.println reference for more on how characters are translated to numbers.
The char datatype is a signed type, meaning that it encodes numbers from -128 to 127. For an unsigned, one-byte (8 bit) data type, use the `byte` data type.

```cpp
//EXAMPLE

char myChar = 'A';
char myChar = 65;      // both are equivalent
```

#### unsigned char

An unsigned data type that occupies 1 byte of memory. Same as the `byte` datatype.
The unsigned char datatype encodes numbers from 0 to 255.
For consistency of Arduino programming style, the `byte` data type is to be preferred.

```cpp
//EXAMPLE

unsigned char myChar = 240;
```

#### byte

A byte stores an 8-bit unsigned number, from 0 to 255.

```cpp
//EXAMPLE

byte b = 0x11;
```

#### int

Integers are your primary data-type for number storage. On the Core/Photon/Electron, an int stores a 32-bit (4-byte) value. This yields a range of -2,147,483,648 to 2,147,483,647 (minimum value of -2^31 and a maximum value of (2^31) - 1).
int's store negative numbers with a technique called 2's complement math. The highest bit, sometimes referred to as the "sign" bit, flags the number as a negative number. The rest of the bits are inverted and 1 is added.

Other variations:

  * `int32_t` : 32 bit signed integer
  * `int16_t` : 16 bit signed integer
  * `int8_t`  : 8 bit signed integer

#### unsigned int

The Core/Photon/Electron stores a 4 byte (32-bit) value, ranging from 0 to 4,294,967,295 (2^32 - 1).
The difference between unsigned ints and (signed) ints, lies in the way the highest bit, sometimes referred to as the "sign" bit, is interpreted.

Other variations:

  * `uint32_t`  : 32 bit unsigned integer
  * `uint16_t`  : 16 bit unsigned integer
  * `uint8_t`   : 8 bit unsigned integer

#### word

`word` stores a 32-bit unsigned number, from 0 to 4,294,967,295.

#### long

Long variables are extended size variables for number storage, and store 32 bits (4 bytes), from -2,147,483,648 to 2,147,483,647.

#### unsigned long

Unsigned long variables are extended size variables for number storage, and store 32 bits (4 bytes). Unlike standard longs unsigned longs won't store negative numbers, making their range from 0 to 4,294,967,295 (2^32 - 1).

#### short

A short is a 16-bit data-type. This yields a range of -32,768 to 32,767 (minimum value of -2^15 and a maximum value of (2^15) - 1).

#### float

Datatype for floating-point numbers, a number that has a decimal point. Floating-point numbers are often used to approximate analog and continuous values because they have greater resolution than integers. Floating-point numbers can be as large as 3.4028235E+38 and as low as -3.4028235E+38. They are stored as 32 bits (4 bytes) of information.

Floating point numbers are not exact, and may yield strange results when compared. For example 6.0 / 3.0 may not equal 2.0. You should instead check that the absolute value of the difference between the numbers is less than some small number.
Floating point math is also much slower than integer math in performing calculations, so should be avoided if, for example, a loop has to run at top speed for a critical timing function. Programmers often go to some lengths to convert floating point calculations to integer math to increase speed.

#### double

Double precision floating point number. On the Core/Photon/Electron, doubles have 8-byte (64 bit) precision.

#### string - char array

A string can be made out of an array of type `char` and null-terminated.

```cpp
// EXAMPLES

char Str1[15];
char Str2[8] = {'a', 'r', 'd', 'u', 'i', 'n', 'o'};
char Str3[8] = {'a', 'r', 'd', 'u', 'i', 'n', 'o', '\0'};
char Str4[ ] = "arduino";
char Str5[8] = "arduino";
char Str6[15] = "arduino";
```

Possibilities for declaring strings:

  * Declare an array of chars without initializing it as in Str1
  * Declare an array of chars (with one extra char) and the compiler will add the required null character, as in Str2
  * Explicitly add the null character, Str3
  * Initialize with a string constant in quotation marks; the compiler will size the array to fit the string constant and a terminating null character, Str4
  * Initialize the array with an explicit size and string constant, Str5
  * Initialize the array, leaving extra space for a larger string, Str6

*Null termination:*
Generally, strings are terminated with a null character (ASCII code 0). This allows functions (like Serial.print()) to tell where the end of a string is. Otherwise, they would continue reading subsequent bytes of memory that aren't actually part of the string.
This means that your string needs to have space for one more character than the text you want it to contain. That is why Str2 and Str5 need to be eight characters, even though "arduino" is only seven - the last position is automatically filled with a null character. Str4 will be automatically sized to eight characters, one for the extra null. In Str3, we've explicitly included the null character (written '\0') ourselves.
Note that it's possible to have a string without a final null character (e.g. if you had specified the length of Str2 as seven instead of eight). This will break most functions that use strings, so you shouldn't do it intentionally. If you notice something behaving strangely (operating on characters not in the string), however, this could be the problem.

*Single quotes or double quotes?*
Strings are always defined inside double quotes ("Abc") and characters are always defined inside single quotes('A').

Wrapping long strings

```cpp
//You can wrap long strings like this:
char myString[] = "This is the first line"
" this is the second line"
" etcetera";
```

*Arrays of strings:*
It is often convenient, when working with large amounts of text, such as a project with an LCD display, to setup an array of strings. Because strings themselves are arrays, this is in actually an example of a two-dimensional array.
In the code below, the asterisk after the datatype char "char*" indicates that this is an array of "pointers". All array names are actually pointers, so this is required to make an array of arrays. Pointers are one of the more esoteric parts of C for beginners to understand, but it isn't necessary to understand pointers in detail to use them effectively here.


```cpp
//EXAMPLE

char* myStrings[] = {"This is string 1", "This is string 2",
"This is string 3", "This is string 4", "This is string 5",
"This is string 6"};

void setup(){
  Serial.begin(9600);
}

void loop(){
  for (int i = 0; i < 6; i++) {
    Serial.println(myStrings[i]);
    delay(500);
  }
}

```

#### String - object

More info can be found [here.](#string-class)

#### array

An array is a collection of variables that are accessed with an index number.

*Creating (Declaring) an Array:*
All of the methods below are valid ways to create (declare) an array.

```cpp
int myInts[6];
int myPins[] = {2, 4, 8, 3, 6};
int mySensVals[6] = {2, 4, -8, 3, 2};
char message[6] = "hello";
```

You can declare an array without initializing it as in myInts.

In myPins we declare an array without explicitly choosing a size. The compiler counts the elements and creates an array of the appropriate size.
Finally you can both initialize and size your array, as in mySensVals. Note that when declaring an array of type char, one more element than your initialization is required, to hold the required null character.

*Accessing an Array:*
Arrays are zero indexed, that is, referring to the array initialization above, the first element of the array is at index 0, hence

`mySensVals[0] == 2, mySensVals[1] == 4`, and so forth.
It also means that in an array with ten elements, index nine is the last element. Hence:
```cpp
int myArray[10] = {9,3,2,4,3,2,7,8,9,11};
//  myArray[9]    contains the value 11
//  myArray[10]   is invalid and contains random information (other memory address)
```

For this reason you should be careful in accessing arrays. Accessing past the end of an array (using an index number greater than your declared array size - 1) is reading from memory that is in use for other purposes. Reading from these locations is probably not going to do much except yield invalid data. Writing to random memory locations is definitely a bad idea and can often lead to unhappy results such as crashes or program malfunction. This can also be a difficult bug to track down.
Unlike BASIC or JAVA, the C compiler does no checking to see if array access is within legal bounds of the array size that you have declared.

*To assign a value to an array:*
`mySensVals[0] = 10;`

*To retrieve a value from an array:*
`x = mySensVals[4];`

*Arrays and FOR Loops:*
Arrays are often manipulated inside `for` loops, where the loop counter is used as the index for each array element. To print the elements of an array over the serial port, you could do something like the following code example.  Take special note to a MACRO called `arraySize()` which is used to determine the number of elements in `myPins`.  In this case, arraySize() returns 5, which causes our `for` loop to terminate after 5 iterations.  Also note that `arraySize()` will not return the correct answer if passed a pointer to an array.

```cpp
int myPins[] = {2, 4, 8, 3, 6};
for (int i = 0; i < arraySize(myPins); i++) {
  Serial.println(myPins[i]);
}
```

## Other Functions

{{#if has-linux}}
The C standard library and other Linux libraries are available on the {{device}}. See this [description of the standard library](https://en.wikipedia.org/wiki/C_standard_library).
{{else}}
The C standard library used on the {{device}} is called newlib and is described at [https://sourceware.org/newlib/libc.html](https://sourceware.org/newlib/libc.html)
{{/if}} {{!-- has-linux --}}

For advanced use cases, those functions are available for use in addition to the functions outlined above.

## Preprocessor

When you are using the Particle Device Cloud to compile your `.ino` source code, a preprocessor comes in to modify the code into C++ requirements before producing the binary file used to flash onto your devices.

```
// EXAMPLE
/* This is my awesome app! */
#include "TinyGPS++.h"

TinyGPSPlus gps;
enum State { GPS_START, GPS_STOP };

void updateState(State st); // You must add this prototype

void setup() {
  updateState(GPS_START);
}

void updateState(State st) {
  // ...
}

void loop() {
  displayPosition(gps);
}

void displayPosition(TinyGPSPlus &gps) {
  // ...
}

// AFTER PREPROCESSOR
#include "Particle.h" // <-- added by preprocessor
/* This is my awesome app! */
#include "TinyGPS++.h"

void setup(); // <-- added by preprocessor
void loop();  // <-- added by preprocessor
void displayPosition(TinyGPSPlus &gps); // <-- added by preprocessor

TinyGPSPlus gps;
enum State { GPS_START, GPS_STOP };

void updateState(State st); // You must add this prototype

void setup() {
  updateState(GPS_START);
}

void updateState(State st) {
  // ...
}

void loop() {
  displayPosition(gps);
}

void displayPosition(TinyGPSPlus &gps) {
  // ...
}
```

The preprocessor automatically adds the line `#include "Particle.h"` to the top of the file, unless your file already includes "Particle.h", "Arduino.h" or "application.h".

The preprocessor adds prototypes for your functions so your code can call functions declared later in the source code. The function prototypes are added at the top of the file, below `#include` statements.

If you define custom classes, structs or enums in your code, the preprocessor will not add prototypes for functions with those custom types as arguments. This is to avoid putting the prototype before the type definition. This doesn't apply to functions with types defined in libraries. Those functions will get a prototype.

If you need to include another file or define constants before Particle.h gets included, define `PARTICLE_NO_ARDUINO_COMPATIBILITY` to 1 to disable Arduino compatibility macros, be sure to include Particle.h manually in the right place.

---

If you are getting unexpected errors when compiling valid code, it could be the preprocessor causing issues in your code. You can disable the preprocessor by adding this pragma line. Be sure to add `#include "Particle.h"` and the function prototypes to your code.

```
#pragma PARTICLE_NO_PREPROCESSOR
//
#pragma SPARK_NO_PREPROCESSOR
```

{{#if has-stm32f2}}

## Memory

The Photon, P1, and Electron all have an STM32F205 processor with 128K of available RAM and 128K of flash for your user firmware.

Some tips for understanding the memory used by your firmware [can be found here](/faq/particle-devices/code-size-tips).

Some of the available resources are used by the system, so there's about 80K of free RAM available for the user firmware to use.

### Stack

The available stack depends on the environment:

- Main loop thread: 6144 bytes
- Software timer callbacks: 1024 bytes

The stack size cannot be changed as it's allocated by the Device OS before the user firmware is loaded. 

{{/if}}

## Device OS Versions

Particle Device OS firmware is open source and stored [here on GitHub](https://github.com/particle-iot/device-os).

New versions are published [here on GitHub](https://github.com/particle-iot/device-os/releases) as they are created, tested and deployed.

### New version release process

The process in place for releasing all Device OS versions as prerelease or default release versions can be found [here on GitHub](https://github.com/particle-iot/device-os/wiki/Firmware-Release-Process).

### GitHub Release Notes

Please go to GitHub to read the Changelog for your desired firmware version (Click a version below).

|Firmware Version||||||||
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|v1.2.x prereleases|[v1.2.0-beta.1](https://github.com/particle-iot/device-os/releases/tag/v1.2.0-beta.1)|-|-|-|-|-|-|
|v1.1.x default releases|[v1.1.0](https://github.com/particle-iot/device-os/releases/tag/v1.1.0)|-|-|-|-|-|-|
|v1.1.x prereleases|[v1.1.0-rc.1](https://github.com/particle-iot/device-os/releases/tag/v1.1.0-rc.1)|[v1.1.0-rc.2](https://github.com/particle-iot/device-os/releases/tag/v1.1.0-rc.2)|-|-|-|-|-|
|v1.0.x default releases|[v1.0.0](https://github.com/particle-iot/device-os/releases/tag/v1.0.0)|[v1.0.1](https://github.com/particle-iot/device-os/releases/tag/v1.0.1)|-|-|-|-|-|
|v1.0.x prereleases|[v1.0.1-rc.1](https://github.com/particle-iot/device-os/releases/tag/v1.0.1-rc.1)|-|-|-|-|-|-|
|v0.8.x-rc.x prereleases|[v0.8.0-rc.10](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.10)|[v0.8.0-rc.11](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.11)|[v0.8.0-rc.12](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.12)|[v0.8.0-rc.14](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.14)|-|-|-|
|v0.8.x-rc.x prereleases|[v0.8.0-rc.1](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.1)|[v0.8.0-rc.2](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.2)|[v0.8.0-rc.3](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.3)|[v0.8.0-rc.4](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.4)|[v0.8.0-rc.7](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.7)|[v0.8.0-rc.8](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.8)|[v0.8.0-rc.9](https://github.com/particle-iot/device-os/releases/tag/v0.8.0-rc.9)|
|v0.7.x default releases|[v0.7.0](https://github.com/particle-iot/device-os/releases/tag/v0.7.0)|-|-|-|-|-|-|
|v0.7.x-rc.x prereleases|[v0.7.0-rc.1](https://github.com/particle-iot/device-os/releases/tag/v0.7.0-rc.1)|[v0.7.0-rc.2](https://github.com/particle-iot/device-os/releases/tag/v0.7.0-rc.2)|[v0.7.0-rc.3](https://github.com/particle-iot/device-os/releases/tag/v0.7.0-rc.3)|[v0.7.0-rc.4](https://github.com/particle-iot/device-os/releases/tag/v0.7.0-rc.4)|[v0.7.0-rc.5](https://github.com/particle-iot/device-os/releases/tag/v0.7.0-rc.5)|[v0.7.0-rc.6](https://github.com/particle-iot/device-os/releases/tag/v0.7.0-rc.6)|[v0.7.0-rc.7](https://github.com/particle-iot/device-os/releases/tag/v0.7.0-rc.7)|
|v0.6.x default releases|[v0.6.0](https://github.com/particle-iot/device-os/releases/tag/v0.6.0)|[v0.6.1](https://github.com/particle-iot/device-os/releases/tag/v0.6.1)|[v0.6.2](https://github.com/particle-iot/device-os/releases/tag/v0.6.2)|[v0.6.3](https://github.com/particle-iot/device-os/releases/tag/v0.6.3)|[v0.6.4](https://github.com/particle-iot/device-os/releases/tag/v0.6.4)|-|-|
|v0.6.x-rc.x prereleases|[v0.6.2-rc.1](https://github.com/particle-iot/device-os/releases/tag/v0.6.2-rc.1)|[v0.6.2-rc.2](https://github.com/particle-iot/device-os/releases/tag/v0.6.2-rc.2)|-|-|-|-|-|
|-|[v0.6.0-rc.1](https://github.com/particle-iot/device-os/releases/tag/v0.6.0-rc.1)|[v0.6.0-rc.2](https://github.com/particle-iot/device-os/releases/tag/v0.6.0-rc.2)|[v0.6.1-rc.1](https://github.com/particle-iot/device-os/releases/tag/v0.6.1-rc.1)|[v0.6.1-rc.2](https://github.com/particle-iot/device-os/releases/tag/v0.6.1-rc.2)|-|-|-|
|v0.5.x default releases|[v0.5.0](https://github.com/particle-iot/device-os/releases/tag/v0.5.0)|[v0.5.1](https://github.com/particle-iot/device-os/releases/tag/v0.5.1)|[v0.5.2](https://github.com/particle-iot/device-os/releases/tag/v0.5.2)|[v0.5.3](https://github.com/particle-iot/device-os/releases/tag/v0.5.3)|[v0.5.4](https://github.com/particle-iot/device-os/releases/tag/v0.5.4)|[v0.5.5](https://github.com/particle-iot/device-os/releases/tag/v0.5.5)|-|
|v0.5.x-rc.x prereleases|[v0.5.3-rc.1](https://github.com/particle-iot/device-os/releases/tag/v0.5.3-rc.1)|[v0.5.3-rc.2](https://github.com/particle-iot/device-os/releases/tag/v0.5.3-rc.2)|[v0.5.3-rc.3](https://github.com/particle-iot/device-os/releases/tag/v0.5.3-rc.3)|-|-|-|-|

### Programming and Debugging Notes

If you don't see any notes below the table or if they are the wrong version, please select your Firmware Version in the table below to reload the page with the correct notes.  Otherwise, you must have come here from a firmware release page on GitHub and your version's notes will be found below the table :)

|Firmware Version||||||||
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|v1.2.x prereleases|[v1.2.0-beta.1](/reference/device-os/firmware/photon/?fw_ver=1.2.0-beta.1&cli_ver=1.40.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|-|-|
|v1.1.x default releases|[v1.1.0](/reference/device-os/firmware/photon/?fw_ver=1.1.0&cli_ver=1.41.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|-|-|-|
|v1.0.x prereleases|[v1.0.1-rc.1](/reference/device-os/firmware/photon/?fw_ver=1.0.1-rc.1&cli_ver=1.38.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|-|-|-|
|v1.1.x prereleases|[v1.1.0-rc.1](/reference/device-os/firmware/photon/?fw_ver=1.1.0-rc.1&cli_ver=1.40.0&electron_parts=3#programming-and-debugging-notes)|[v1.1.0-rc.2](/reference/device-os/firmware/photon/?fw_ver=1.1.0-rc.2&cli_ver=1.40.0&electron_parts=3#programming-and-debugging-notes)-|-|-|-|
|v1.0.x default releases|[v1.0.0](/reference/device-os/firmware/photon/?fw_ver=1.0.0&cli_ver=1.37.0&electron_parts=3#programming-and-debugging-notes)|[v1.0.1](/reference/device-os/firmware/photon/?fw_ver=1.0.1&cli_ver=1.39.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|-|-|
|v1.0.x prereleases|[v1.0.1-rc.1](/reference/device-os/firmware/photon/?fw_ver=1.0.1-rc.1&cli_ver=1.38.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|-|-|-|
|v0.8.x-rc.x prereleases|[v0.8.0-rc.10](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.10&cli_ver=1.33.0&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.11](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.11&cli_ver=1.35.0&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.12](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.12&cli_ver=1.36.3&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.14](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.14&cli_ver=1.36.3&electron_parts=3#programming-and-debugging-notes)|-|-|-|
|v0.8.x-rc.x prereleases|[v0.8.0-rc.1](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.1&cli_ver=1.29.0&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.2](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.2&cli_ver=1.29.0&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.3](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.3&cli_ver=1.29.0&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.4](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.4&cli_ver=1.29.0&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.7](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.7&cli_ver=1.29.0&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.8](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.8&cli_ver=1.32.1&electron_parts=3#programming-and-debugging-notes)|[v0.8.0-rc.9](/reference/device-os/firmware/photon/?fw_ver=0.8.0-rc.9&cli_ver=1.32.4&electron_parts=3#programming-and-debugging-notes)|
|v0.7.x default releases|[v0.7.0](/reference/device-os/firmware/photon/?fw_ver=0.7.0&cli_ver=1.29.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|-|-|-|
|v0.7.x-rc.x prereleases|[v0.7.0-rc.1](/reference/device-os/firmware/photon/?fw_ver=0.7.0-rc.1&cli_ver=1.23.1&electron_parts=3#programming-and-debugging-notes)|[v0.7.0-rc.2](/reference/device-os/firmware/photon/?fw_ver=0.7.0-rc.2&cli_ver=1.23.1&electron_parts=3#programming-and-debugging-notes)|[v0.7.0-rc.3](/reference/device-os/firmware/photon/?fw_ver=0.7.0-rc.3&cli_ver=1.23.1&electron_parts=3#programming-and-debugging-notes)|[v0.7.0-rc.4](/reference/device-os/firmware/photon/?fw_ver=0.7.0-rc.4&cli_ver=1.23.1&electron_parts=3#programming-and-debugging-notes)|[v0.7.0-rc.5](/reference/device-os/firmware/photon/?fw_ver=0.7.0-rc.5&cli_ver=1.23.1&electron_parts=3#programming-and-debugging-notes)|[v0.7.0-rc.6](/reference/device-os/firmware/photon/?fw_ver=0.7.0-rc.6&cli_ver=1.23.1&electron_parts=3#programming-and-debugging-notes)|[v0.7.0-rc.7](/reference/device-os/firmware/photon/?fw_ver=0.7.0-rc.7&cli_ver=1.23.1&electron_parts=3#programming-and-debugging-notes)|
|v0.6.x default releases|[v0.6.0](/reference/device-os/firmware/photon/?fw_ver=0.6.0&cli_ver=1.18.0&electron_parts=3#programming-and-debugging-notes)|[v0.6.1](/reference/device-os/firmware/photon/?fw_ver=0.6.1&cli_ver=1.20.1&electron_parts=3#programming-and-debugging-notes)|[v0.6.2](/reference/device-os/firmware/photon/?fw_ver=0.6.2&cli_ver=1.22.0&electron_parts=3#programming-and-debugging-notes)|[v0.6.3](/reference/device-os/firmware/photon/?fw_ver=0.6.3&cli_ver=1.25.0&electron_parts=3#programming-and-debugging-notes)|[v0.6.4](/reference/device-os/firmware/photon/?fw_ver=0.6.4&cli_ver=1.26.2&electron_parts=3#programming-and-debugging-notes)|-|-|
|v0.6.x-rc.x prereleases|[v0.6.2-rc.1](/reference/device-os/firmware/photon/?fw_ver=0.6.2-rc.1&cli_ver=1.21.0&electron_parts=3#programming-and-debugging-notes)|[v0.6.2-rc.2](/reference/device-os/firmware/photon/?fw_ver=0.6.2-rc.2&cli_ver=1.21.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|-|-|
|-|[v0.6.0-rc.1](/reference/device-os/firmware/photon/?fw_ver=0.6.0-rc.1&cli_ver=1.17.0&electron_parts=3#programming-and-debugging-notes)|[v0.6.0-rc.2](/reference/device-os/firmware/photon/?fw_ver=0.6.0-rc.2&cli_ver=1.17.0&electron_parts=3#programming-and-debugging-notes)|[v0.6.1-rc.1](/reference/device-os/firmware/photon/?fw_ver=0.6.1-rc.1&cli_ver=1.18.0&electron_parts=3#programming-and-debugging-notes)|[v0.6.1-rc.2](/reference/device-os/firmware/photon/?fw_ver=0.6.1-rc.2&cli_ver=1.18.0&electron_parts=3#programming-and-debugging-notes)|-|-|-|
|v0.5.x default releases|[v0.5.0](/reference/device-os/firmware/photon/?fw_ver=0.5.0&cli_ver=1.12.0&electron_parts=2#programming-and-debugging-notes)|[v0.5.1](/reference/device-os/firmware/photon/?fw_ver=0.5.1&cli_ver=1.14.2&electron_parts=2#programming-and-debugging-notes)|[v0.5.2](/reference/device-os/firmware/photon/?fw_ver=0.5.2&cli_ver=1.15.0&electron_parts=2#programming-and-debugging-notes)|[v0.5.3](/reference/device-os/firmware/photon/?fw_ver=0.5.3&cli_ver=1.17.0&electron_parts=2#programming-and-debugging-notes)|[v0.5.4](/reference/device-os/firmware/photon/?fw_ver=0.5.4&cli_ver=1.24.1&electron_parts=2#programming-and-debugging-notes)|[v0.5.5](/reference/device-os/firmware/photon/?fw_ver=0.5.5&cli_ver=1.24.1&electron_parts=2#programming-and-debugging-notes)|-|
|v0.5.x-rc.x prereleases|[v0.5.3-rc.1](/reference/device-os/firmware/photon/?fw_ver=0.5.3-rc.1&cli_ver=1.15.0&electron_parts=2#programming-and-debugging-notes)|[v0.5.3-rc.2](/reference/device-os/firmware/photon/?fw_ver=0.5.3-rc.2&cli_ver=1.16.0&electron_parts=2#programming-and-debugging-notes)|[v0.5.3-rc.3](/reference/device-os/firmware/photon/?fw_ver=0.5.3-rc.3&cli_ver=1.16.0&electron_parts=2#programming-and-debugging-notes)|-|-|-|-|

<!--
CLI VERSION is compatable with FIRMWARE VERSION
v1.41.0 = 1.1.0
v1.40.0 = 1.1.0-rc.1, 1.1.0-rc.2, 1.2.0-beta.1
v1.39.0 = 1.0.1
v1.38.0 = 1.0.1-rc.1
v1.37.0 = 1.0.0
v1.36.3 = 0.8.0-rc.14
v1.36.3 = 0.8.0-rc.12
v1.35.0 = 0.8.0-rc.11
v1.33.0 = 0.8.0-rc.10
v1.32.4 = 0.8.0-rc.9
v1.32.1 = 0.8.0-rc.8
v1.29.0 = 0.7.0, 0.8.0-rc.1, 0.8.0-rc2, 0.8.0-rc.3, 0.8.0-rc.4, 0.8.0-rc.7
v1.26.2 = 0.6.4
v1.25.0 = 0.6.3
v1.23.1 = 0.7.0-rc.1 support for WPA Enterprise setup
v1.22.0 = 0.6.2
v1.21.0 = 0.6.2-rc.1, 0.6.2-rc.2
v1.20.1 = 0.6.1
v1.19.4 = Particle Libraries v2
v1.18.0 = 0.6.0, 0.6.1-rc.1, 0.6.1-rc.2
v1.24.1 = 0.5.4 (technically this doesn't have 0.5.4 binaries in it for `particle update` but this was the version currently out when 0.5.4 was released)
v1.17.0 = 0.5.3, 0.6.0-rc.1, 0.6.0-rc.2
v1.16.0 = required to recognize system part 3 of electron, 0.5.3-rc.2, 0.5.3-rc.3
v1.15.0 = 0.5.2, 0.5.3-rc.1
v1.14.2 = 0.5.1
v1.12.0 = 0.5.0
-->

#### release-notes-wrapper

<!-- these empty if/endif blocks are required to be used first before any other use later on -->
##### @FW_VER@0.5.0if
##### @FW_VER@0.5.0endif
##### @FW_VER@0.5.1if
##### @FW_VER@0.5.1endif
##### @FW_VER@0.5.2if
##### @FW_VER@0.5.2endif
##### @FW_VER@0.5.3if
##### @FW_VER@0.5.3endif
##### @FW_VER@0.5.4if
##### @FW_VER@0.5.4endif
##### @FW_VER@0.5.5if
##### @FW_VER@0.5.5endif
##### @FW_VER@0.6.0if
##### @FW_VER@0.6.0endif
##### @FW_VER@0.6.1if
##### @FW_VER@0.6.1endif
##### @FW_VER@0.6.2if
##### @FW_VER@0.6.2endif
##### @FW_VER@0.6.3if
##### @FW_VER@0.6.3endif
##### @FW_VER@0.6.4if
##### @FW_VER@0.6.4endif
##### @FW_VER@0.7.0if
##### @FW_VER@0.7.0endif
##### @CLI_VER@1.15.0if
##### @CLI_VER@1.15.0endif
##### @CLI_VER@1.17.0if
##### @CLI_VER@1.17.0endif
##### @CLI_VER@1.18.0if
##### @CLI_VER@1.18.0endif
##### @CLI_VER@1.20.1if
##### @CLI_VER@1.20.1endif
##### @CLI_VER@1.21.0if
##### @CLI_VER@1.21.0endif
##### @CLI_VER@1.22.0if
##### @CLI_VER@1.22.0endif
##### @CLI_VER@1.23.1if
##### @CLI_VER@1.23.1endif
##### @CLI_VER@1.24.1if
##### @CLI_VER@1.24.1endif
##### @CLI_VER@1.25.0if
##### @CLI_VER@1.25.0endif
##### @CLI_VER@1.26.2if
##### @CLI_VER@1.26.2endif
##### @CLI_VER@1.29.0if
##### @CLI_VER@1.29.0endif
##### @CLI_VER@1.32.1if
##### @CLI_VER@1.32.1endif
##### @CLI_VER@1.32.4if
##### @CLI_VER@1.32.4endif
##### @CLI_VER@1.33.0if
##### @CLI_VER@1.33.0endif
##### @CLI_VER@1.35.0if
##### @CLI_VER@1.35.0endif
##### @CLI_VER@1.36.3if
##### @CLI_VER@1.36.3endif
##### @CLI_VER@1.37.0if
##### @CLI_VER@1.37.0endif
##### @CLI_VER@1.38.0if
##### @CLI_VER@1.38.0endif
##### @CLI_VER@1.39.0if
##### @CLI_VER@1.39.0endif
##### @CLI_VER@1.40.0if
##### @CLI_VER@1.40.0endif
##### @CLI_VER@1.41.0if
##### @CLI_VER@1.41.0endif
##### @ELECTRON_PARTS@2if
##### @ELECTRON_PARTS@2endif
##### @ELECTRON_PARTS@3if
##### @ELECTRON_PARTS@3endif

<!-- HOW TO USE if/endif blocks
##### @FW_VER@0.5.3if
This is for firmware version 0.5.3 ONLY!
##### @FW_VER@0.5.3endif

##### @FW_VER@0.5.4if
This is for firmware version 0.5.4 ONLY!
##### @FW_VER@0.5.4endif

##### @FW_VER@0.5.3if
This is another for 0.5.3
##### @FW_VER@0.5.3endif

##### @ELECTRON_PARTS@3if
particle flash YOUR_DEVICE_NAME system-part3-@FW_VER@-electron.bin
##### @ELECTRON_PARTS@3endif
-->

The following instructions are for upgrading to **Device OS v@FW_VER@** which requires **Particle CLI v@CLI_VER@**.

**Updating Device OS Automatically**

To update your Photon, P1 or Core Device OS version automatically, compile and flash your application in the [Build IDE](https://build.particle.io), selecting version **@FW_VER@** in the devices drawer. The app will be flashed, following by the system part1 and part2 firmware for Photon and P1. Other update instructions for Core, Photon, P1 and Electron can be found below.

---

**The easy local method using Particle CLI**

##### @FW_VER@0.5.4if
**Note:** There is no version of the Particle CLI released that supports the `particle update` command for firmware version **@FW_VER@**. Please download the binaries and use one of the other supported programming methods.
##### @FW_VER@0.5.4endif

##### @FW_VER@0.5.5if
**Note:** There is no version of the Particle CLI released that supports the `particle update` command for firmware version **@FW_VER@**. Please download the binaries and use one of the other supported programming methods.
##### @FW_VER@0.5.5endif

The easiest way to upgrade to Device OS Version @FW_VER@ is to use the
Particle CLI with a single command.  You will first upgrade the Device
OS, then optionally program Tinker on the device. This **requires CLI version @CLI_VER@**. You can check with `particle --version`.

If you have the [Particle CLI](/tutorials/developer-tools/cli) installed already, you can update it with the following command `sudo npm update -g particle-cli@v@CLI_VER@` (note: you can try without sudo first if you wish).

To upgrade Device OS, make sure the device is in [DFU mode](/tutorials/device-os/led#dfu-mode-device-firmware-upgrade-) (flashing yellow LED) and run these commands in order:

```
The easy local method using Particle CLI

1) Make sure the device is in DFU mode and run:

particle update

2) Optionally add Tinker as the user firmware instead of an app that you may currently have running on your device.  Have the device in DFU mode and run:

particle flash --usb tinker
```

---

**The OTA method using Particle CLI**

##### @FW_VER@0.6.0if
**Note:** You must update your Electron to (v0.5.3, v0.5.3-rc.2, or v0.5.3-rc.3) first before attempting to use OTA or YModem transfer to update to v0.6.0. If you use DFU over USB, you can update to v0.6.0 directly, but make sure you have installed v1.18.0 of the CLI first.
##### @FW_VER@0.6.0endif

##### @FW_VER@0.7.0if
**Note:** The following update sequence is required!

- First Update to 0.5.3 (if the current version is less than that)
- Then update to 0.6.3(Photon/P1) or 0.6.4(Electron) (if the current version is less than that)
- Then update to 0.7.0

##### @FW_VER@0.7.0endif

**Note:** As a Product in the Console, when flashing a >= 0.6.0 user
app, Electrons can now Safe Mode Heal from < 0.5.3 to >= 0.6.0 firmware.
This will consume about 500KB of data as it has to transfer two 0.5.3
system parts and three >= 0.6.0 system parts. Devices will not
automatically update Device OS if not added as a Product in Console.

**Note**: You must download system binaries to a local directory on your machine for this to work. Binaries are attached to the bottom of the [GitHub Release Notes](#github-release-notes).

If your device is online, you can attempt to OTA (Over The Air) update these system parts as well with the Particle CLI.  Run the following commands in order for your device type:

##### @ELECTRON_PARTS@2if
```
The OTA method using Particle CLI

// Core
particle flash YOUR_DEVICE_NAME tinker-@FW_VER@-core.bin

// Photon
particle flash YOUR_DEVICE_NAME system-part1-@FW_VER@-photon.bin
particle flash YOUR_DEVICE_NAME system-part2-@FW_VER@-photon.bin
particle flash YOUR_DEVICE_NAME tinker (optional)

// P1
particle flash YOUR_DEVICE_NAME system-part1-@FW_VER@-p1.bin
particle flash YOUR_DEVICE_NAME system-part2-@FW_VER@-p1.bin
particle flash YOUR_DEVICE_NAME tinker (optional)

// Electron
particle flash YOUR_DEVICE_NAME system-part1-@FW_VER@-electron.bin
particle flash YOUR_DEVICE_NAME system-part2-@FW_VER@-electron.bin
particle flash YOUR_DEVICE_NAME tinker (optional)
```
##### @ELECTRON_PARTS@2endif

##### @ELECTRON_PARTS@3if
```
The OTA method using Particle CLI

// Core
particle flash YOUR_DEVICE_NAME tinker-@FW_VER@-core.bin

// Photon
particle flash YOUR_DEVICE_NAME system-part1-@FW_VER@-photon.bin
particle flash YOUR_DEVICE_NAME system-part2-@FW_VER@-photon.bin
particle flash YOUR_DEVICE_NAME tinker (optional)

// P1
particle flash YOUR_DEVICE_NAME system-part1-@FW_VER@-p1.bin
particle flash YOUR_DEVICE_NAME system-part2-@FW_VER@-p1.bin
particle flash YOUR_DEVICE_NAME tinker (optional)

// Electron
particle flash YOUR_DEVICE_NAME system-part1-@FW_VER@-electron.bin
particle flash YOUR_DEVICE_NAME system-part2-@FW_VER@-electron.bin
particle flash YOUR_DEVICE_NAME system-part3-@FW_VER@-electron.bin
particle flash YOUR_DEVICE_NAME tinker (optional)
```
##### @ELECTRON_PARTS@3endif

---

**The local method over USB using Particle CLI**

This **requires CLI version @CLI_VER@ or newer**. You can check with `particle --version`.

If you have the [Particle CLI](/tutorials/developer-tools/cli) installed already, you can update it with the following command `sudo npm update -g particle-cli` (note: you can try without sudo first if you wish).

To upgrade Device OS, make sure the device is in [DFU mode](/tutorials/device-os/led#dfu-mode-device-firmware-upgrade-) (flashing yellow LED) and run these commands in order for your device type:

##### @ELECTRON_PARTS@2if
```
The local method over USB using Particle CLI

// Core
particle flash --usb tinker-@FW_VER@-core.bin

// Photon
particle flash --usb system-part1-@FW_VER@-photon.bin
particle flash --usb system-part2-@FW_VER@-photon.bin
particle flash --usb tinker (optional)

// P1
particle flash --usb system-part1-@FW_VER@-p1.bin
particle flash --usb system-part2-@FW_VER@-p1.bin
particle flash --usb tinker (optional)

// Electron
particle flash --usb system-part1-@FW_VER@-electron.bin
particle flash --usb system-part2-@FW_VER@-electron.bin
particle flash --usb tinker (optional)
```
##### @ELECTRON_PARTS@2endif

##### @ELECTRON_PARTS@3if
```
The local method over USB using Particle CLI

// Core
particle flash --usb tinker-@FW_VER@-core.bin

// Photon
particle flash --usb system-part1-@FW_VER@-photon.bin
particle flash --usb system-part2-@FW_VER@-photon.bin
particle flash --usb tinker (optional)

// P1
particle flash --usb system-part1-@FW_VER@-p1.bin
particle flash --usb system-part2-@FW_VER@-p1.bin
particle flash --usb tinker (optional)

// Electron
particle flash --usb system-part1-@FW_VER@-electron.bin
particle flash --usb system-part2-@FW_VER@-electron.bin
particle flash --usb system-part3-@FW_VER@-electron.bin
particle flash --usb tinker (optional)
```
##### @ELECTRON_PARTS@3endif

---

**The local DFU-UTIL method**
can be applied to offline devices locally over USB using `dfu-util`
- Put the device in [DFU mode](/tutorials/device-os/led#dfu-mode-device-firmware-upgrade-) (flashing yellow LED)
- open a terminal window, change to the directory where you downloaded the files above, and run these commands in order for your device type:

##### @ELECTRON_PARTS@2if
```
The local DFU-UTIL method

// Core
dfu-util -d 1d50:607f -a 0 -s 0x8005000:leave -D tinker-@FW_VER@-core.bin

// Photon
dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-@FW_VER@-photon.bin
dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-@FW_VER@-photon.bin

// P1
dfu-util -d 2b04:d008 -a 0 -s 0x8020000 -D system-part1-@FW_VER@-p1.bin
dfu-util -d 2b04:d008 -a 0 -s 0x8060000:leave -D system-part2-@FW_VER@-p1.bin

// Electron
dfu-util -d 2b04:d00a -a 0 -s 0x8020000 -D system-part1-@FW_VER@-electron.bin
dfu-util -d 2b04:d00a -a 0 -s 0x8040000:leave -D system-part2-@FW_VER@-electron.bin
```
##### @ELECTRON_PARTS@2endif

##### @ELECTRON_PARTS@3if
```
The local DFU-UTIL method

// Core
dfu-util -d 1d50:607f -a 0 -s 0x8005000:leave -D tinker-@FW_VER@-core.bin

// Photon
dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-@FW_VER@-photon.bin
dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-@FW_VER@-photon.bin

// P1
dfu-util -d 2b04:d008 -a 0 -s 0x8020000 -D system-part1-@FW_VER@-p1.bin
dfu-util -d 2b04:d008 -a 0 -s 0x8060000:leave -D system-part2-@FW_VER@-p1.bin

// Electron
dfu-util -d 2b04:d00a -a 0 -s 0x8060000 -D system-part1-@FW_VER@-electron.bin
dfu-util -d 2b04:d00a -a 0 -s 0x8020000 -D system-part2-@FW_VER@-electron.bin
dfu-util -d 2b04:d00a -a 0 -s 0x8040000:leave -D system-part3-@FW_VER@-electron.bin
```
##### @ELECTRON_PARTS@3endif

---

**Downgrading from @FW_VER@ to current default firmware**

Current default Device OS would be the latest non-rc.x firmware version.  E.g. if the current list of default releases was 0.5.3, 0.6.0, **0.6.1** (would be the latest).

##### @FW_VER@0.5.1if
**Caution:** After upgrading to 0.5.1, DO NOT downgrade Device OS via OTA remotely! This will cause Wi-Fi credentials to be erased on the Photon and P1.  This does not affect the Core or Electron.  Feel free to downgrade locally with the understanding that you will have to re-enter Wi-Fi credentials.  Also note that 0.5.1 fixes several important bugs, so there should be no reason you'd normally want to downgrade.
##### @FW_VER@0.5.1endif

##### @FW_VER@0.5.2if
**Note:** Upgrading to 0.5.2 will now allow you to downgrade remotely OTA to v0.5.0 or earlier without erasing Wi-Fi credentials.  There are still some cases where a downgrade will erase credentials, but only if you have explicitly set the country code to something other than the `default` or `JP2`.  For example, if you set the country code to `GB0` or `US4`, if you downgrade to v0.5.0 your Wi-Fi credentials will be erased.  Leaving the country code at `default` or set to `JP2` will not erase credentials when downgrading to v0.5.0.  **Do not** downgrade to v0.5.1 first, and then v0.5.0... this will erase credentials in all cases.
##### @FW_VER@0.5.2endif

##### @FW_VER@0.7.0if
**Note:** If you need to downgrade, you must downgrade to 0.6.3(Photon/P1) or 0.6.4(Electron) to ensure that the bootloader downgrades automatically. When downgrading to older versions, downgrade to 0.6.3(Photon/P1) or 0.6.4(Electron) first, then to an older version such as 0.5.3. You will have to manually downgrade the bootloader as well (see release notes in 0.7.0-rc.3 release)
##### @FW_VER@0.7.0endif

##### @FW_VER@0.7.0if
**Note:** The following is not applicable for 0.7.0, please see above.
##### @FW_VER@0.7.0endif
The easiest way to downgrade from a Device OS Version @FW_VER@ is to use the Particle CLI with a single command.  You will first put the Tinker back on the device, then downgrade the Device OS. Running the commands in this order prevents the device from automatically re-upgrading (based on user app version dependencies) after downgrading.  This will **require a CLI version associated with your desired default firmware**. To determine which version to use, click on the default version desired in the table under [Programming and Debugging Notes](#programming-and-debugging-notes) and refer to the CLI version required in **The easy local method using Particle CLI** section.

If you have the [Particle CLI](/tutorials/developer-tools/cli) installed already, you can install a specific version like v1.16.0 with the following command `sudo npm update -g particle-cli@v1.16.0` (note: you can try without sudo first if you wish).  Replace v1.16.0 with your desired version.

To downgrade Device OS, make sure the device is in [DFU mode](/tutorials/device-os/led#dfu-mode-device-firmware-upgrade-) (flashing yellow LED) and run these commands in order:

```
Downgrading from @FW_VER@ to current default firmware

1) Make sure Tinker is installed, instead of a @FW_VER@ app that you may currently have running on your device.  Have the device in DFU mode and run:

particle flash --usb tinker

2) Make sure the device is in DFU mode and run:

particle update
```

**Note:** The CLI and `particle update` command is only updated when default firmware versions are released.  This is why we install a specific version of the CLI to get a specific older version of default firmware.

---

**Debugging for Electron**

##### Instructions on using the Tinker USB Debugging app [are here](https://docs.google.com/document/d/1NdYxPPk_i_mM2wM9oSbSZB1ElDlHA_x-IHY-UC7w62M/pub)
This is useful for simply capturing the Electron's connection process.

---

##### Instructions on using the Electron Troubleshooting app [are here](https://docs.google.com/document/d/1U_Wzy2SPRC3hZnKtw8d6QN2Tm8Q7QwtEbSUAeTkO3bk/pub)
This is useful for interacting with the Electron's connection process.

#### release-notes-wrapper
