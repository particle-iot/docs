Spark Core Firmware
==========

Functions
=====

Cloud
---

### Spark.variable()

Expose a *variable* through the Spark Cloud so that it can be called with `GET device/{VARIABLE}`.

```
SYNTAX
Spark.variable(var);

EXAMPLE USAGE
int temp_sensor = 0;
int temp;
Spark.variable(temp);

void loop() {
  temp = analogRead(temp_sensor);
}

COMPLEMENTARY API CALL
GET https://api.sprk.io/v1/devices/abcd1234/temp
```

**TO BE RESOLVED: How do we handle typing?**



### Spark.function()

Expose a *function* through the Spark Cloud so that it can be called with `POST device/{FUNCTION}`.

```
SYNTAX
Spark.function(func);

EXAMPLE USAGE
void brew() {
  activateWaterHeater();
  activateWaterPump();
}

Spark.function(brew);

COMPLEMENTARY API CALL
POST https://api.sprk.io/v1/devices/abcd1234/brew
```

### Spark.event()

Send an *event* through the Spark Cloud that will be forwarded to registered callbacks and server-sent event streams.

```
SYNTAX
Spark.event(event_name, event_result);

EXAMPLE USAGE
int motion_sensor = 0;
int sensor_value = 0;

void loop() {
  sensor_value = analogRead(motion_sensor);

  if (sensor_value == 1) {
    Spark.event("motion", "motion detected");
  }
}

COMPLEMENTARY API CALL
I guess this should be callback registration...?
```

### Spark.connected()

Returns `true` when connected to the Spark Cloud, and `false` when disconnected to the Spark Cloud.

```
SYNTAX
Spark.connected();

RETURNS
boolean (true or false)

EXAMPLE USAGE
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Spark.connected()) {
    Serial.println("Connected!");
  }
  delay(1000);
}
```

### Spark.disconnect()

Disconnects the Spark Core from the Spark Cloud.

```
SYNTAX
Spark.disconnect()

EXAMPLE USAGE
Hmm, not sure what this one should look like...
```

NOTE: When the Core is disconnected, over-the-air updates are no longer possible. To re-enable over-the-air firmware updates, initiate a factory reset.



### Spark.connect()

Re-connects the Spark Core to the Spark Cloud after `Spark.disconnect()` is called.

```
SYNTAX
Spark.connect()

EXAMPLE USAGE
Not sure about this one either...
```

The Spark Core connects to the cloud by default, so it's not necessary to call `Spark.connect()` unless you have explicitly disconnected the Core.



### Spark.print()

Prints to the debug console in Spark's web IDE.

### Spark.println()

Prints to the debug console in Spark's web IDE, followed by a *newline* character.

Sleep
---

### Spark.sleep()

`Spark.sleep()` can be used to dramatically improve the battery life of a Spark-powered project by temporarily deactivating the Wi-Fi module, which is by far the biggest power draw.

```SYNTAX
Spark.sleep(int millis);
Spark.sleep(int millis, array peripherals);
```

`Spark.sleep()` takes one argument, an `int`, for the number of milliseconds to sleep.

`Spark.sleep()` can also take an optional second argument, an `array` of other peripherals to deactivate. Deactivating unused peripherals on the micro-controller can take its power consumption into the micro-amps.

Input/Output
---

### pinMode()
### digitalWrite()
### analogWrite()
### digitalRead()
### analogRead()

Communication
===

TCP
-----

### TCPClient()
### TCPServer()

UDP
-----

TBD

Serial
-----

TBD

Other functions
====

Time
---

### millis()
### micros()
### delay()
### delayMicroseconds()


Interrupts
---

### attachInterrupt()
### detatchInterrupt()

Math
---

### min()
### max()
### abs()
### constrain()
### map()
### pow()
### sqrt()

Language Syntax
========

Structure
---
### setup()
### loop()

Control structures
---

### if
### if...else
### for
### switch case
### while
### do... while
### break
### continue
### return
### goto

Further syntax
---

### ; (semicolon)
### {} (curly braces)
### // (single line comment)
### /* */ (multi-line comment)
### #define
### #include

Arithmetic operators
---


Comparison operators
---

Boolean operators
---

Bitwise operators
---

Compound operators
---


Variables
========

Libraries
========