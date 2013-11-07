Spark Core Firmware
==========

Functions
=====

Cloud
---

### Spark.variable()

Expose a *variable* through the Spark Cloud so that it can be called with `GET device/{VARIABLE}`.

```C++
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

```C++
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

```C++
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

```C++
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

```C++
SYNTAX
Spark.disconnect()

EXAMPLE USAGE
Hmm, not sure what this one should look like...
```

NOTE: When the Core is disconnected, over-the-air updates are no longer possible. To re-enable over-the-air firmware updates, initiate a factory reset.



### Spark.connect()

Re-connects the Spark Core to the Spark Cloud after `Spark.disconnect()` is called.

```C++
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

```C++
SYNTAX
Spark.sleep(int millis);
Spark.sleep(int millis, array peripherals);
```

`Spark.sleep()` takes one argument, an `int`, for the number of milliseconds to sleep.

`Spark.sleep()` can also take an optional second argument, an `array` of other peripherals to deactivate. Deactivating unused peripherals on the micro-controller can take its power consumption into the micro-amps.

Input/Output
---

### pinMode()

`pinMode()` configures the specified pin to behave either as an input or an output. 

```C++
SYNTAX
pinMode(pin,mode);
```

`pinMode()` takes two arguments, `pin`: the number of the pin whose mode you wish to set and `mode`: `INPUT, INPUT_PULLUP, INPUT_PULLDOWN or OUTPUT.`

`pinMode()` does not return anything.

```C++
EXAMPLE USAGE
int button = D0;                       // button is connected to D0
int LED = D1;                          // LED is connected to D1 

void setup()
{
  pinMode(LED, OUTPUT);               // sets pin as output
  pinMode(button, INPUT_PULLDOWN);    // sets pin as input
}

void loop()
{
  while(digitalRead(button) == HIGH)  // blink the LED as long as the button is pressed
  {
    digitalWrite(LED, HIGH);          // sets the LED on
    delay(200);                       // waits for 200mS
    digitalWrite(LED, LOW);           // sets the LED off
    delay(200);                       // waits for 200mS
  }
}
```

### digitalWrite()

Write a `HIGH` or a `LOW` value to a digital pin.

```C++
SYNTAX
digitalWrite(pin, value);
```

If the pin has been configured as an OUTPUT with pinMode(), its voltage will be set to the corresponding value: 3.3V for HIGH, 0V (ground) for LOW.

`digitalWrite()` takes two arguments, `pin`: the number of the pin whose value you wish to set and `value`: `HIGH` or `LOW`.

`digitalWrite()` does not return anything.

```C++
EXAMPLE USAGE
int LED = D1;                       // LED is connected to D1

void setup()
{
  pinMode(LED, OUTPUT);             // sets pin as output
}

void loop()
{
  digitalWrite(LED, HIGH);          // sets the LED on
  delay(200);                       // waits for 200mS
  digitalWrite(LED, LOW);           // sets the LED off
  delay(200);                       // waits for 200mS
}
```

### digitalRead()

Reads the value from a specified digital `pin`, either `HIGH` or `LOW`.

```C++
SYNTAX
digitalRead(pin);
```

`digitalRead()` takes one argument, `pin`: the number of the digital pin you want to read.

`digitalRead()` returns `HIGH` or `LOW`.

```C++
EXAMPLE USAGE
int button = D0;                       // button is connected to D0
int LED = D1;                          // LED is connected to D1 
int val = 0;                           // variable to store the read value

void setup()
{
  pinMode(LED, OUTPUT);               // sets pin as output
  pinMode(button, INPUT_PULLDOWN);    // sets pin as input
}

void loop()
{
  val = digitalRead(button);          // read the input pin
  digitalWrite(LED, val);             // sets the LED to the button's value
}

```

### analogWrite()

Writes an analog value (PWM wave) to a pin. Can be used to light a LED at varying brightnesses or drive a motor at various speeds. After a call to analogWrite(), the pin will generate a steady square wave of the specified duty cycle until the next call to analogWrite() (or a call to digitalRead() or digitalWrite() on the same pin). The frequency of the PWM signal is approximately 500 Hz.

On the Spark Core, this function works on pins A0, A1, A4, A5, A6, A7, D0 and D1.

You do not need to call pinMode() to set the pin as an output before calling analogWrite().

The analogWrite function has nothing to do with the analog pins or the analogRead function. 

```C++
SYNTAX
analogWrite(pin, value);
```

`analogWrite()` takes two arguments, `pin`: the number of the pin whose value you wish to set and `value`: the duty cycle: between 0 (always off) and 255 (always on).

`analogWrite()` does not return anything.

```C++
EXAMPLE USAGE
int ledPin = D1;                // LED connected to digital pin D1
int analogPin = A0;             // potentiometer connected to analog pin A0
int val = 0;                    // variable to store the read value

void setup()
{
  pinMode(ledPin, OUTPUT);      // sets the pin as output
}

void loop()
{
  val = analogRead(analogPin);  // read the input pin
  analogWrite(ledPin, val/16);  // analogRead values go from 0 to 4095, analogWrite values from 0 to 255
}
```

### analogRead()

Reads the value from the specified analog pin. The Spark Core has 8 channels (A0 to A7) with a 12-bit resolution. This means that it will map input voltages between 0 and 3.3 volts into integer values between 0 and 4095. This yields a resolution between readings of: 3.3 volts / 4096 units or, 0.0008 volts (0.8 mV) per unit.

```C++
SYNTAX
analogRead(pin);
```

`analogRead()` takes one argument `pin`: the number of the analog input pin to read from ('A0 to A7'.)

`analogRead()` returns an integer value ranging from 0 to 4095.

```C++
EXAMPLE USAGE
int ledPin = D1;                // LED connected to digital pin D1
int analogPin = A0;             // potentiometer connected to analog pin A0
int val = 0;                    // variable to store the read value

void setup()
{
  pinMode(ledPin, OUTPUT);      // sets the pin as output
}

void loop()
{
  val = analogRead(analogPin);  // read the input pin
  analogWrite(ledPin, val/16);  // analogRead values go from 0 to 4095, analogWrite values from 0 to 255
}
```


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
The following documentation is based on the Arduino reference which can be found [here.](http://arduino.cc/en/Reference/HomePage)

Structure
---
### setup()
The setup() function is called when an application starts. Use it to initialize variables, pin modes, start using libraries, etc. The setup function will only run once, after each powerup or reset of the Spark Core.

```C++
EXAMPLE USAGE
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

### loop()
After creating a setup() function, which initializes and sets the initial values, the loop() function does precisely what its name suggests, and loops consecutively, allowing your program to change and respond. Use it to actively control the Spark Core.

```C++
EXAMPLE USAGE
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
