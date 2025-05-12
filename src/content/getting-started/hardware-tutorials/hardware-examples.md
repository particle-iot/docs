---
title: Blink an LED hardware examples
layout: commonTwo.hbs
columns: two
redirects: true
includeDefinitions: [api-helper, api-helper-extras]
---

# {{title}}

Here you will find a bunch of examples to get you started with your new Particle device! 

{{collapse op="hardwareTutorial"}}

## Logging in

You can interact directly with your device from this tutorial page by logging into your 
Particle account in the box below. This is optional, as you can use Particle 
Workbench or the Web IDE and other techniques directly, if you prefer.

{{> sso }}

## Blink an LED

The "Hello World" of embedded devices is blinking an LED, so here we go!

* **Hardware**
  * Your Particle device
  * USB to micro USB cable
  * Power source for USB cable (such as your computer, USB battery, or power brick)

* **To complete the later examples**
  * (2) Resistors between 220 Ohms and 1000 Ohms
  * (1) LED, any color
  * (1) Photoresistor or phototransistor (explained below)




<div style="display: none;" id="blink-an-led" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#blink-an-led" data-firmware-example-title="Blink an LED" data-firmware-example-description="Blink an LED"></div>


### Code

This example will blink the blue D7 LED on your Particle device.

- On the Photon and Electron it's located next to the D7 pin
- On the Argon and Boron it's located next to the USB connector (on the side with the battery connector)
- The E-Series, B-Series SoM, and Tracker SoM evaluation boards, and the Tracker One, do not have D7 LEDs.

{{> codebox content="/assets/files/hardware-examples/blink-d7.ino" format="cpp" height="500" webide="605b1e92de63ee0017f525ea" flash="true"}}

This code has a lot of comments, but a few things to note:

This defines which pin we want to blink, in this case D7. If you wanted to use an external LED connected to D2, for example,
you could change the constant in this one place at the top of the file. This is a good practice to get into.

```cpp
const pin_t MY_LED = D7;
```

You can learn more about threading in the [firmware API reference](/reference/device-os/api/system-thread/system-thread/), but for now 
you mostly just need to know if you add this line, your code will run immediately at startup, before connecting to the cloud.
If you leave this out, your code won't run (and the LED will not blink) until you've connected to the network and the Particle 
cloud successfully (breathing cyan).

```cpp
SYSTEM_THREAD(ENABLED);
```

The `setup()` function is called once when the device boots to, well, set up the device. In this case we define our LED
pin an an OUTPUT instead of digital input. You can learn more about [`pinMode()`](/reference/device-os/api/input-output/pinmode/) 
in the firmware API reference.

```cpp
void setup() {
	pinMode(MY_LED, OUTPUT);
}
```

The `loop()` function is called repeatedly while your device is running. In this case, we turn the LED on (`HIGH`), wait one second, 
turn it off, wait one second, and repeat. You can learn more about [`digitalWrite()`](/reference/device-os/api/input-output/digitalwrite/) 
and [`delay()`](/reference/device-os/api/time/delay/) in the firmware API reference.


```cpp
void loop() {
	digitalWrite(MY_LED, HIGH);
	delay(1s);
	digitalWrite(MY_LED, LOW);
	delay(1s);
}
```

Note the two delay values of `1s` or 1 second. If you want to make it blink faster, try changing it to milliseconds (250 milliseconds = 1/4 second)!

```cpp
void loop() {
	digitalWrite(MY_LED, HIGH);
	delay(250ms);
	digitalWrite(MY_LED, LOW);
	delay(250ms);
}
```



<div style="display: none;" id="control-led-over-the-net" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#control-leds-over-the-39-net" data-firmware-example-title="Web-Connected LED" data-firmware-example-description="Control an LED over the Internet"></div>

## Control LEDs over the 'net

### Intro

Now that we know how to blink an LED, how about we control it over the Internet? This is where the fun begins.

We've heavily commented the code below so that you can see what's going on. Basically, we are going to:

- Set up the pins as outputs that have LEDs connected to them
- Create and register a Particle function (this gets called automagically when you make an API request to it)
- Parse the incoming command and take appropriate actions


### Code

{{> codebox content="/assets/files/hardware-examples/blink-function.ino" format="cpp" height="500" webide="605b22dd4c3ada0017fd896e" flash="true"}}

This code should look familiar if you've followed the previous example, but there are a few changes:

In `setup()` we now register a [`Particle.function()`](/reference/device-os/api/cloud-functions/particle-function/). This provides a way for the Particle 
cloud to trigger a function on the device to do something. In this case, change the state of the blue D7 LED.

```cpp
Particle.function("led", ledToggle);
```

The process is the same for all kinds of devices, both Wi-Fi and cellular, and also works from within network firewalls, generally without 
any reconfiguration. It's also secure, since the Particle device uses public key cryptography and encryption to secure the cloud connection.

The other change is the function to handle the Particle.function.

```cpp
int ledToggle(String command) {
	if (command.equals("on")) {
        digitalWrite(MY_LED, HIGH);
        return 1;
    }
    else if (command.equals("off")) {
        digitalWrite(MY_LED, LOW);
        return 0;
    }
    else {
		// Unknown option
        return -1;
    }
}
```

There are two complementary cloud features:

- Functions request the device to do something, allowing the cloud to pass a command string to the device to specify exactly what it wants done.
- Variables get data from the device, allowing the cloud to request a value. This is often used with sensor data.

(There are also publish and subscribe, which you can learn more about in the [cloud introduction](/getting-started/cloud/introduction/#communication-features).)

In the code above, if the command is "on" we turn the LED on, and if it's "off" we turn the LED off.

### Testing

If you've logged in, you can interact with your devices here:

{{> led-function-test }}

You can also test your new function is from [the console](https://console.particle.io). In the devices tab, click on the row for the device you just flashed your code to.

![Device Info](/assets/images/console-function.png)

On the right-hand side of the screen is a box for functions. There should be one labeled "led". If you type **on** in the box and click the Call button the LED should turn on. To turn it off use **off**.

Or you can also do this from the [Particle CLI](/getting-started/developer-tools/cli/).

```
particle call my-test-device led on
```

Replace `my-test-device` with the name of your device. If you get an "The access token was not found" error, use `particle login` to log into your Particle account first.


### From HTML

It's also possible to call the function from your own HTML page. That's a more complicated scenario and there are a few options, so that's discussed in a [separate application note](/reference/cloud-apis/calling-api-from-web-page/).


<div style="display: none;" id="variables-and-functions-with-photoresistors" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#read-your-photoresistor-function-and-variable" data-firmware-example-title="Function Variable" data-firmware-example-description="Learn about Variables and Functions using Photoresistors"></div>


## Blink an external LED

### Intro

Instead of using the built-in blue LED, we'll now hook up an external LED. 

{{collapse op="hardwareTutorial"}}

The development kits generally include the necessary extra parts, but the bare devices do not. If you do not have the components you can skip these examples.

![LEDs](/assets/images/kit-leds.jpg)

Depending on the kit you have, you may have one or more of the items above. Left to right:

- IR (infrared) LED. It has a blue-ish tint. Don't use that one here, as you can't see the light with the naked eye!
- White LED. It has a rounded top. You can use this instead of the red LED in the examples below.
- Red LED. 
- Photo transistor. The top of this is flat and is not an LED, it's a light sensor. You'll use that later.

There may also be smaller red or green LEDs. Those are also fine.

### Setup

It's good practice to connect the red (+) bus bar on the top to 3V3 and the blue (-) bus bar on the bottom to ground.


{{collapse op="start" hardwareTutorial="Electron"}}
**Electron**:
- 3V3 is left-most pin on the top (with the USB connector on the left). It is often connected using a red wire.
- Ground is the second from the left on the bottom. It is typically connected using a black wire. 
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Photon"}}
**Photon**:
- 3V3 is left-most pin on the top (with the USB connector on the left). It is often connected using a red wire.
- Ground is the second from the left on the bottom. It is typically connected using a black wire. 
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Gen3"}}
**Gen 3 (Argon and Boron)**:
- 3V3 is second from the left on the bottom (with the USB connector on the left). It is often connected using a red wire.
- Ground is the fourth from the left on the bottom. It is typically connected using a black wire. 
{{collapse op="end"}}

Position the LED in the breadboard. The long lead (anode) goes to + (left) and the short lead (cathode) goes to - (right). When using an LED, you must always add a current liming resistor. Normally you'd use a 220 ohm resistor (red-red-brown-gold) for 3.3 volt circuits.

In the picture, the long lead of the LED connects to pin D6 using the blue wire. The short lead of the LED connects to a 220 ohm resistor that connects it to ground. That completes the circuit.


{{collapse op="start" hardwareTutorial="Electron"}}
![Blink LED Circuit](/assets/images/blink-led-electron.jpg)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Photon"}}
![Blink LED Circuit](/assets/images/blink-led-photon.jpg)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Gen3"}}
![Blink LED Circuit](/assets/images/blink-led-argon.jpg)
{{collapse op="end"}}


Here's a close-up of the connections

![Blink LED Circuit](/assets/images/led-close.jpg)

- The long lead of the LED is on the left. The blue wire connects to this lead.
- The short lead of the LED is on the right. This connects to ground with a 220 ohm resistor.

You can use the same code as in the [previous example](#code), just update the declaration of `MY_LED` to be the pin that you used. For example:

```cpp
const pin_t MY_LED = D6;
```


## Read your photo sensor: Function and Variable

### Intro

This example uses the same setup as the LED control example to make a `Particle.function`. This time, though, we're going to add a sensor.

{{collapse op="hardwareTutorial"}}

{{collapse op="start" hardwareTutorial="Gen3"}}
For a short (~4 min) overview of this project, watch the video below.

<iframe width="640" height="360" class="video" src="https://www.youtube.com/embed/iE5ALWSZCis" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{{collapse op="end"}}


We will get a value from a photo resistor or photo transistor and store it in the cloud.

![Photo Resistor or Transistor](/assets/images/photosensor.jpg)

Depending on the kit you have, there may be a photo resistor (left, thin and flat with the squiggle pattern on the face) or photo transistor (right, clear and round with a flat top). The photo transistor and a clear LED look similar, but the LED has rounded top and the photo transistor has a flat top.

All Gen 3 (Argon and Boron) kits have a photo transistor.

{{collapse op="photoSensor"}}


Paste the following code into your IDE, or just access the examples on the left hand menu bar in the online IDE.

### Setup

The basic wiring is the same as the previous example:

- The long lead of the LED connects to D6 using the blue wire.
- The short lead of the LED connects to a 220 ohm (red-red-brown-gold) resistor. The other side of the resistor connects to ground.

{{collapse op="start" photoSensor="Transistor"}}
The photo transistor is connected as follows:

- The short lead of the photo transistor connects to 3V3. In the picture, that's the right lead, using the red wire.
- The long lead of the photo transistor connects to a 220 ohm (red-red-brown-gold) resistor. The other side of the resistor connects to ground.
- The left lead of the photo transistor (connected to the resistor) also connects to pin A0 using the orange wire.

Point the LED and photo transistor at each other.

{{collapse op="start" hardwareTutorial="Electron"}}
![Electron Diagram](/assets/images/phototransistor-electron.jpg)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Photon"}}
![Photon Diagram](/assets/images/phototransistor-photon.jpg)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Gen3"}}
![Argon Diagram](/assets/images/phototransistor-argon.jpg)
{{collapse op="end"}}


Since it's a little hard to follow the complete picture, here it is broken down into two parts.

![LED Circuit](/assets/images/led-close.jpg)

- The long lead of the LED is on the left. The blue wire connects to this lead.
- The short lead of the LED is on the right. This connects to ground with a 220 ohm resistor.

![Photo transistor Circuit](/assets/images/photo-transistor-close.jpg)

- The long lead of the photo transistor is on the left. It connects to ground with a 220 ohm resistor and also to the orange wire.
- The short lead of the photo transistor is on the right. It connects to 3V3 with the red wire.
{{collapse op="end"}}

{{collapse op="start" photoSensor="Resistor"}}
The photo resistor is connected as follows:

- One lead of the photo resistor connects to 3V3. In the picture, that's the right lead, using the red wire.
- The other lead of the photo resistor connects to another 220 ohm resistor. The other side of the resistor connects to ground.
- The left lead of the photo resistor (connected to the resistor) also connects to pin A0 using the orange wire.

Point the LED and photo resistor at each other.

{{collapse op="start" hardwareTutorial="Electron"}}
![Electron Diagram](/assets/images/photoresistor-electron.jpg)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Photon"}}
![Photon Diagram](/assets/images/photoresistor-photon.jpg)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Gen3"}}
You have selected photo resistor, but your Gen 3 (Argon or Boron) kit contains a photo transistor.
{{collapse op="end"}}


{{collapse op="end"}}

Bend the LED and the photo sensor so that they are pointing at each other. (You want the LED, when turned on, to shine its beam of light directly at the photo sensor.)

### Schematics

A schematic diagram is often use to document a circuit. You don't need to understand schematic diagrams, so feel free to skip this section, but they can make it easier to understand a circuit once you know the basics.

{{collapse op="start" photoSensor="Transistor"}}

{{collapse op="start" hardwareTutorial="Electron"}}
![Electron Diagram](/assets/images/schematic-phototransistor-electron.png)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Photon"}}
![Photon Diagram](/assets/images/schematic-phototransistor-photon.png)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Gen3"}}
![Argon Diagram](/assets/images/schematic-phototransistor-argon.png)
{{collapse op="end"}}

{{collapse op="end"}}

{{collapse op="start" photoSensor="Resistor"}}

{{collapse op="start" hardwareTutorial="Electron"}}
![Electron Diagram](/assets/images/schematic-photoresistor-electron.png)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Photon"}}
![Photon Diagram](/assets/images/schematic-photoresistor-photon.png)
{{collapse op="end"}}

{{collapse op="start" hardwareTutorial="Gen3"}}
You have selected photo resistor, but your Gen 3 (Argon or Boron) kit contains a photo transistor.
{{collapse op="end"}}

{{collapse op="end"}}

#### LED

A LED (light emitting diode) produces light. 

- The side with bar is the cathode and connects to ground. It's the short lead.
- The side with the triangle is the anode and connects to 3V3/VCC. It's the long lead.

You must always connect an LED using a current-limiting resistor. It can be on either the + or - side.
 
![LED](/assets/images/schematic-led.png)


#### Resistor

![Resistor](/assets/images/schematic-resistor.png)

#### VCC

VCC in this diagram is 3V3 (3.3 volts DC).

![VCC](/assets/images/schematic-vcc.png)

#### GND (Ground)

![GND](/assets/images/schematic-gnd.png)

{{collapse op="start" photoSensor="Transistor"}}
#### Phototransistor

The photo transistor is used to sense light. 

- The top of the symbol (without the arrow) is the collector. It's the short lead, and connects to 3V3/VCC.
- The bottom of the symbol (with the arrow point out) is the emitter. It's the long lead, and connects to GND with a resistor. You sense the voltage at this pin.

![Phototransistor](/assets/images/schematic-phototransistor.png)
{{collapse op="end"}}
{{collapse op="start" photoSensor="Resistor"}}
#### Photoresistor

![Photoresistor](/assets/images/schematic-photoresistor.png)
{{collapse op="end"}}


#### Lines

The green lines are connections between two pins. 

- When the line crosses and there is no dot, then the crossing lines are just passing by each other and are not connected.
- When the line crosses and there's a dot - both lines are connected.


![Lines](/assets/images/schematic-lines.png)


### Code

{{> codebox content="/assets/files/hardware-examples/analog-sensor.ino" format="cpp" height="500" webide="605b2b28de63ee0017f5261a"}}

This example can optionally print debugging information (the analog output value) to the USB serial output 
when your Particle device is connected by USB to your computer. This line in the code enables it:

```cpp
SerialLogHandler logHandler;
```

To view the output, the easiest way is to use the [Particle CLI](/getting-started/developer-tools/cli/) and use

```
particle serial monitor
```

You can also use dedicated serial terminal programs like `screen` on Mac and Linux, and PuTTY or CoolTerm on Windows.

In this example we register a variable in `setup()`:

```
Particle.variable("analogvalue", analogvalue);
```

You always use `Particle.variable` from setup(). It registers a variable for later retrieval from the cloud. Any time the cloud 
wants the value of the variable, it requests it from the device. This means the device must be online (breathing cyan) in
order to retrieve the value.

| Variable | Publish |
| :--- | :--- |
| Cloud requests value | Device publishes value |
| Device must be online to get value | Device can go offline after publishing |
| Data is used when requested | Data is used on every published change |


In `loop()` we read the analog pin using [`analogRead()`](/reference/device-os/firmware//#analogread-ADC-).

```cpp
analogvalue = analogRead(SENSOR_PIN);
```

We also print this value to the USB serial debug log. In many examples you may see `Serial.print()` used instead, 
but it's good to get into the habit of using [`Log.info()`](/reference/device-os/api/logging/logger-class/) instead.

```cpp
Log.info("analogvalue=%d", analogvalue);
```


### Use

You can turn the LED on and off from the console or the CLI, same as before:

`particle call device_name led on`

and

`particle call device_name led off`

where device_name is your device ID or device name. If you get an "The access token was not found" error, use `particle login` to log into your Particle account first.


As for your Particle.variable, the API request will look something like this:

```json
GET /v1/devices/{DEVICE_ID}/analogvalue

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef
# Your access token is f8a4d380cb6ffffffffffffffffffaf5e496ddf0c0
curl -G https://api.particle.io/v1/devices/0123456789abcdef/analogvalue \
  -H "Authorization: Bearer f8a4d380cb6ffffffffffffffffffaf5e496ddf0c0"
```

Replace the access token with a valid access token, such as from `particle token create`.

You can also check out this value by using the command line. Type:

`particle variable get device_name analogvalue`

and make sure you replace `device_name` with either your device ID or the casual nickname you made for your device when you set it up.

Now you can turn your LED on and off and see the values at A0 change based on the phototransistor or photoresistor!

<div style="display: none;" id="publish-and-the-dashboard" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#make-a-motion-detector-publish-and-the-console" data-firmware-example-title="Publish" data-firmware-example-description="Publish and the Console"></div>

## Make a motion detector: publish and the console

### Intro

What if we simply want to know that something has happened, without all the information of a variable or all the action of a function? We might have a security system that tells us, "motion was detected!" or a smart washing machine that tells us "your laundry is done!" In that case, we might want to use `Particle.publish`.

`Particle.publish` sends a message to the cloud saying that some event has occurred. We're allowed to name that event, set the privacy of that event, and add a little bit of info to go along with the event.

In this example, we've created a system where you turn your LED and photo sensor to face each other, making a beam of light that can be broken by the motion of your finger. Every time the beam is broken or reconnected, your device will send a `Particle.publish` to the cloud letting it know the state of the beam. Basically, a tripwire!

For your convenience, we've set up a little calibrate function so that your device will work no matter how bright your LED is, or how bright the ambient light may be. Put your finger in the beam when the D7 LED goes on, and hold it in the beam until you see two flashes from the D7 LED. Then take your finger out of the beam. If you mess up, don't worry-- you can just hit "reset" on your device and do it again!

You can check out the results on your console at [console.particle.io](https://console.particle.io). As you put your finger in front of the beam, you'll see an event appear that says the beam was broken. When you remove your finger, the event says that the beam is now intact.

![Console](/assets/images/console-beamstatus.png)


### Setup

The setup for your breadboard is the same as in the last example. 

### Code

{{> codebox content="/assets/files/hardware-examples/pub-sub.ino" format="cpp" height="500" webide="5be2df6f88096a97af0008d6"}}

<div style="display: none;" id="publish-and-subscribe-with-photoresistors" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#the-buddy-system-publish-and-subscribe" data-firmware-example-title="Subscribe" data-firmware-example-description="Learn about Publish and Subscribe using Photoresistors"></div>

## The buddy system: publish and subscribe

### Intro

This example uses two devices claimed to the same account. When the beam is broken on either device, both D7 blue LEDs will light up; when the beam is intact again, both will turn off.

Flash the firmware to your devices. Calibrate your device when it comes online (same as in the previous example).

### Setup
The setup for your breadboard is the same as in the last example. 

### Code

{{> codebox content="/assets/files/hardware-examples/pub-sub-buddy.ino" format="cpp" height="500" webide="5be2dfca88096afd2a0009c1"}}



<div style="display: none;" id="electron-combined-publish" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#electron-combined-publish" data-firmware-example-title="Electron Combined Publishes" data-firmware-example-description="Learn how to send many data points in a single Publish to save data"></div>

## Combined publish

### Intro
Every message the Electron sends to or from the Cloud has a certain fixed overhead, so we try to minimize the number of messages that are sent. You can do some optimization in your code, too. If you combine many data points in a single publish message, you'll use less data. We combine the data points into a single string, with commas in between them for easy parsing later.


### Setup
You can use the previous circuit, with the photoresistor or phototransistor connected to A0.


### Code

{{> codebox content="/assets/files/hardware-examples/combined-publish.ino" format="cpp" height="500"}}


If you want to subscribe to these publishes from another Particle device, you can create a handler that splits the data on receipt:

{{> codebox content="/assets/files/hardware-examples/combined-subscribe.ino" format="cpp" height="500"}}


<div style="display: none;" id="annotated-tinker-firmware" data-firmware-example-url="https://docs.particle.io/photon/tinker/#annotated-tinker-firmware" data-firmware-example-title="Tinker" data-firmware-example-description="The factory default firmware that mobile apps interact with"></div>

## Tinker

Remember back when we were blinking lights and reading sensors with Tinker on the mobile app?

When you tap a pin on the mobile app, it sends a message up to the cloud. Your device is always listening to the cloud and waiting for instructions-- like "write D7 HIGH" or "read the voltage at A0".

Your device already knew how to communicate with the mobile app because of the firmware loaded onto your device as a default. We call this the Tinker firmware. It's just like the user firmware you've been loading onto your device in these examples. It's just that with the Tinker firmware, we've specified special `Particle.function`s that the mobile app knows and understands.

If your device is new, it already has the Tinker firmware on it. 

To reflash Tinker from within the Particle mobile app:

- **iOS Users**: Tap the list button at the top left. Then tap the arrow next to your desired device and tap the "Re-flash Tinker" button in the pop out menu.
- **Android Users**: With your desired device selected, tap the options button in the upper right and tap the "Reflash Tinker" option in the drop down menu.

Or from the Particle CLI:

```
particle flash my-device-name tinker
```

Once you flash your own firmware to your device it will no longer have Tinker functionality. However you can easily take the Tinker source and add in your 
own code so it will both have your code and the original Tinker functions you can call from the mobile apps!

{{> codebox content="/assets/files/hardware-examples/tinker.ino" format="cpp" height="500" flash="true"}}
