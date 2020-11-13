---
title: Hardware Examples
layout: tutorials.hbs
columns: two
devices: [photon,electron,xenon,argon,boron]
order: 90
---

# Hardware Examples - {{device}}

You are viewing the Hardware Examples for the **{{device}}**. To view the documentation for other 
devices, use the blue device selector below the Particle logo on the left side of the page.

Here you will find a bunch of examples to get you started with your new Particle device! {{#unless electron}}The diagrams here show the Photon, but these examples will work with either the Photon.{{/unless}}

These examples are also listed in the online IDE in the Code menu.


To complete all the examples, you will need the following materials:

#### Materials
* **Hardware**
  * Your Particle device
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}{{#if electron}}(included with the Electron){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * (2) Resistors between 220 Ohms and 1000 Ohms {{#if photon}}(220 Ohm Resistors included with Photon Kit and Maker Kit){{/if}}{{#if electron}}(included with the Electron){{/if}}
  * (1) LED, any color {{#if photon}}(Red LED included with Photon Kit and Maker Kit){{/if}}{{#if electron}}(included with the Electron){{/if}}
  * (1) Photoresistor or phototransistor (explained below)
  {{#if electron}}
  * LiPo Battery (included with the Electron)
  {{/if}}


{{#if electron}}All of the example circuits are based on the reference card that came along with your Electron kit. If you have misplaced yours, download it [here!](/assets/images/electron/illustrations/electron-card.pdf){{/if}}

{{#if electron}}
<p class = "boxedHead">NOTE:</p>
<p class = "boxed">

Since Electron is a cellular device and OTA usage consumes data, it's important for us to think about conserving data. Every time you update your firmware over the air, push data to the device or remain connected to the network, you are consuming data. In the development phase of your project, it is suggested that you [update firmware happen over USB](/guide/tools-and-features/cli/electron/#flashing-over-serial-for-the-electron), instead of the cellular network. You'll first need to install the [Particle Command Line Interface](/tutorials/developer-tools/cli/) on your computer.

</p>

{{/if}} {{!-- electron --}}



<div style="display: none;" id="blink-an-led" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#blink-an-led" data-firmware-example-title="Blink an LED" data-firmware-example-description="Blink an LED"></div>

## Blink an LED

### Intro

Blinking an LED is the ["Hello World"](http://en.wikipedia.org/wiki/Hello_world_program) example of the microcontroller universe. It's a nice way to warm up and start your journey into the land of embedded hardware.

![LEDs](/assets/images/kit-leds.jpg)

Depending on the kit you have, you may have one or more of the items above. Left to right:

- IR (infrared) LED. It has a blue-ish tint. Don't use that one here, as you can't see the light with the naked eye!
- White LED. It has a rounded top. You can use this instead of the red LED in the examples below.
- Red LED. 
- Photo transistor. The top of this is flat and is not an LED, it's a light sensor. You'll use that later.

There may also be smaller red or green LEDs. Those are also fine.

### Setup

It's good practice to connect the red (+) bus bar on the top to 3V3 and the blue (-) bus bar on the bottom to ground.

{{#if electron}}
- 3V3 is left-most pin on the top (with the USB connector on the left). It is often connected using a red wire.
- Ground is the second from the left on the bottom. It is typically connected using a black wire. 
{{else}}
{{#if photon}}
- 3V3 is left-most pin on the top (with the USB connector on the left). It is often connected using a red wire.
- Ground is the second from the left on the bottom. It is typically connected using a black wire. 
{{else}}
- 3V3 is second from the left on the bottom (with the USB connector on the left). It is often connected using a red wire.
- Ground is the fourth from the left on the bottom. It is typically connected using a black wire. 
{{/if}}
{{/if}}

Position the LED in the breadboard. The long lead (anode) goes to + (left) and the short lead (cathode) goes to - (right). When using an LED, you must always add a current liming resistor. Normally you'd use a 220 ohm resistor (red-red-brown-gold) for 3.3 volt circuits.

In the picture, the long lead of the LED connects to pin D6 using the blue wire. The short lead of the LED connects to a 220 ohm resistor that connects it to ground. That completes the circuit.
 
{{#if electron}}
![Blink LED Circuit](/assets/images/blink-led-electron.jpg)
{{else}}
{{#if photon}}
![Blink LED Circuit](/assets/images/blink-led-photon.jpg)
{{else}}
![Blink LED Circuit](/assets/images/blink-led-argon.jpg)
{{/if}}
{{/if}}

Here's a close-up of the connections

![Blink LED Circuit](/assets/images/led-close.jpg)

- The long lead of the LED is on the left. The blue wire connects to this lead.
- The short lead of the LED is on the right. This connects to ground with a 220 ohm resistor.

Next, we're going to load code onto your device.


### Code

[Click this link](https://go.particle.io/shared_apps/5be2de1e88096abb6e00094f) to open the source code in the Particle Web IDE, or copy and paste the code below.
 
Go ahead and save this application, then flash it to your device. You should be able to see that LED blinking away!

<pre><code class="lang-cpp" data-firmware-example-code-block=true>
// ------------
// Blink an LED
// ------------

/*-------------

We've heavily commented this code for you. If you're a pro, feel free to ignore it.

Comments start with two slashes or are blocked off by a slash and a star.
You can read them, but your device can't.
It's like a secret message just for you.

Every program based on Wiring (programming language used by Arduino, and Particle devices) has two essential parts:
setup - runs once at the beginning of your program
loop - runs continuously over and over

You'll see how we use these in a second.

This program will blink an led on and off every second.
It blinks the D7 LED on your Particle device. If you have an LED wired to D0, it will blink that LED as well.

-------------*/


// First, we're going to make some variables.
// This is our "shorthand" that we'll use throughout the program:

int led1 = D6; // Instead of writing D0 over and over again, we'll write led1
// You'll need to wire an LED to this one to see it blink.

int led2 = D7; // Instead of writing D7 over and over again, we'll write led2
// This one is the little blue LED on your board. On the Photon it is next to D7.

// Having declared these variables, let's move on to the setup function.
// The setup function is a standard part of any microcontroller program.
// It runs only once when the device boots up or is reset.

void setup() {

	// We are going to tell our device that D0 and D7 (which we named led1 and led2 respectively) are going to be output
	// (That means that we will be sending voltage to them, rather than monitoring voltage that comes from them)

	// It's important you do this here, inside the setup() function rather than outside it or in the loop function.

	pinMode(led1, OUTPUT);
	pinMode(led2, OUTPUT);

}

// Next we have the loop function, the other essential part of a microcontroller program.
// This routine gets repeated over and over, as quickly as possible and as many times as possible, after the setup function is called.
// Note: Code that blocks for too long (like more than 5 seconds), can make weird things happen (like dropping the network connection).  The built-in delay function shown below safely interleaves required background activity, so arbitrarily long delays can safely be done if you need them.

void loop() {
	// To blink the LED, first we'll turn it on...
	digitalWrite(led1, HIGH);
	digitalWrite(led2, HIGH);

	// We'll leave it on for 1 second...
	delay(1000);

	// Then we'll turn it off...
	digitalWrite(led1, LOW);
	digitalWrite(led2, LOW);

	// Wait 1 second...
	delay(1000);

	// And repeat!
}
</code></pre>

<div style="display: none;" id="control-led-over-the-net" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#control-leds-over-the-39-net" data-firmware-example-title="Web-Connected LED" data-firmware-example-description="Control an LED over the Internet"></div>

## Control LEDs over the 'net

### Intro

Now that we know how to blink an LED, how about we control it over the Internet? This is where the fun begins.

We've heavily commented the code below so that you can see what's going on. Basically, we are going to:

- Set up the pins as outputs that have LEDs connected to them
- Create and register a Particle function (this gets called automagically when you make an API request to it)
- Parse the incoming command and take appropriate actions

### Setup

Set up the LED as in the previous example.

### Code

[Click this link](https://go.particle.io/shared_apps/5be2dec088096a588500095e) to open the source code in the Particle Web IDE, or copy and paste the code below.


<pre><code class="lang-cpp" data-firmware-example-code-block=true>
// -----------------------------------
// Controlling LEDs over the Internet
// -----------------------------------

/* First, let's create our "shorthand" for the pins
Same as in the Blink an LED example:
led1 is D6, led2 is D7 */

int led1 = D6;
int led2 = D7;

// Last time, we only needed to declare pins in the setup function.
// This time, we are also going to register our Particle function

void setup()
{

   // Here's the pin configuration, same as last time
   pinMode(led1, OUTPUT);
   pinMode(led2, OUTPUT);

   // We are also going to declare a Particle.function so that we can turn the LED on and off from the cloud.
   Particle.function("led",ledToggle);
   // This is saying that when we ask the cloud for the function "led", it will employ the function ledToggle() from this app.

   // For good measure, let's also make sure both LEDs are off when we start:
   digitalWrite(led1, LOW);
   digitalWrite(led2, LOW);

}


/* Last time, we wanted to continously blink the LED on and off
Since we're waiting for input through the cloud this time,
we don't actually need to put anything in the loop */

void loop()
{
   // Nothing to do here
}

// We're going to have a super cool function now that gets called when a matching API request is sent
// This is the ledToggle function we registered to the "led" Particle.function earlier.

int ledToggle(String command) {
    /* Particle.functions always take a string as an argument and return an integer.
    Since we can pass a string, it means that we can give the program commands on how the function should be used.
    In this case, telling the function "on" will turn the LED on and telling it "off" will turn the LED off.
    Then, the function returns a value to us to let us know what happened.
    In this case, it will return 1 for the LEDs turning on, 0 for the LEDs turning off,
    and -1 if we received a totally bogus command that didn't do anything to the LEDs.
    */

    if (command=="on") {
        digitalWrite(led1,HIGH);
        digitalWrite(led2,HIGH);
        return 1;
    }
    else if (command=="off") {
        digitalWrite(led1,LOW);
        digitalWrite(led2,LOW);
        return 0;
    }
    else {
        return -1;
    }
}

</code></pre>

### Testing

The easiest way to test your new function is from [the console](https://console.particle.io). In the devices tab, click on the row for the device you just flashed your code to.

![Device Info](/assets/images/console-function.png)

On the right-hand side of the screen is a box for functions. There should be one labeled "led". If you type "on" (without the quotes") and click the Call button the LED should turn on.

### Use

When we register a function or variable, we're basically making a space for it on the internet, similar to the way there's a space for a website you'd navigate to with your browser. Thanks to the REST API, there's a specific address that identifies you and your device. You can send requests, like `GET` and `POST` requests, to this URL just like you would with any webpage in a browser.

Remember the last time you submitted a form online? You may not have known it, but the website probably sent a `POST` request with the info you put in the form over to another URL that would store your data. We can do the same thing to send information to your device, telling it to turn the LED on and off.

Use the following to view your page:

```
/* Paste the code between the dashes below into a .txt file and save it as an .html file. Replace your-device-ID-goes-here with your actual device ID and your-access-token-goes-here with your actual access token.

---------------------------
<!-- Replace your-device-ID-goes-here with your actual device ID
and replace your-access-token-goes-here with your actual access token-->
<!DOCTYPE>
<html>
  <body>
  <center>
  <br>
  <br>
  <br>
  <form action="https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here" method="POST">
    Tell your device what to do!<br>
    <br>
    <input type="radio" name="arg" value="on">Turn the LED on.
    <br>
    <input type="radio" name="arg" value="off">Turn the LED off.
    <br>
    <br>
    <input type="submit" value="Do it!">
  </form>
  </center>
  </body>
</html>
---------------------------
*/
```

Edit the code in your text file so that "your-device-ID-goes-here" is your actual device ID, and "your-access-token-goes-here" is your actual access token. You can create an access token using [the Particle CLI](/reference/developer-tools/cli/#particle-token-create). You can find the Device IDs of your devices using `particle list`.


Open that `.html` file in a browser. You'll see a very simple HTML form that allows you to select whether you'd like to turn the LED on or off.

When you click "Do it!" you are posting information to the URL `https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here`. The information you give is the `args`, or argument value, of `on` or `off`. This hooks up to your `Particle.function` that we registered with the cloud in our firmware, which in turn sends info to your device to turn the LED on or off.

You'll get some info back after you submit the page that gives the status of your device and lets you know that it was indeed able to post to the URL. If you want to go back, just click "back" on your browser.


If you are using the command line, you can also turn the LED on and off by typing:

`particle call device_name led on`

and

`particle call device_name led off`

Remember to replace `device_name` with either your device ID or the nickname you made for your device when you set it up.

This does the same thing as our HTML page, but with a more slick interface.


The API request will look something like this:

```json
POST /v1/devices/{DEVICE_ID}/led

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef
# Your access token is 123412341234
curl https://api.particle.io/v1/devices/0123456789abcdef/led \
  -d access_token=123412341234 \
  -d arg=on
```

Note that the API endpoint is 'led', not 'ledToggle'. This is because the endpoint is defined by the first argument of [Particle.function()](/reference/device-os/firmware/#particle-function-), which is a string of characters, rather than the second argument, which is a function.

To better understand the concept of making API calls to your device over the cloud checkout the [Cloud API reference.](/reference/device-cloud/api/)

<div style="display: none;" id="variables-and-functions-with-photoresistors" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#read-your-photoresistor-function-and-variable" data-firmware-example-title="Function Variable" data-firmware-example-description="Learn about Variables and Functions using Photoresistors"></div>




## Read your photo sensor: Function and Variable

{{#if electron}}
<p class = "boxedHead">NOTE:</p>
<p class = "boxed">

There is a known issue with the first revision of the product card included with your Electron.
The holes marked "A5" and "A0" are misaligned with the headers of the Electron, and _actually_ align with pins "A4" and "B5", respectively. This issue will be corrected in later revisions of the project card. In the meantime, please ensure that the resistor and photoresistor included with your kit are connected to the correct pins (A5 and A0, _not_ A4 and B5).
</p>

{{/if}} {{!-- electron --}}

### Intro

This example uses the same setup as the LED control example to make a `Particle.function`. This time, though, we're going to add a sensor.

{{#if has-gen3}}
For a short (~4 min) overview of this project, watch the video below.

<iframe width="640" height="360" class="video" src="https://www.youtube.com/embed/iE5ALWSZCis" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{{/if}}

{{#if has-gen3}}
We will get a value from a photo transistor and store it in the cloud. The photo transistor and a clear LED look similar, but the LED has rounded top and the photo transistor has a flat top.

{{collapse op="photoSensor" force="Transistor"}}

{{else}}
We will get a value from a photo resistor or photo transistor and store it in the cloud.

![Photo Resistor or Transistor](/assets/images/photosensor.jpg)

Depending on the kit you have, there may be a photo resistor (left, thin and flat with the squiggle pattern on the face) or photo transistor (right, clear and round with a flat top). The photo transistor and a clear LED look similar, but the LED has rounded top and the photo transistor has a flat top.

{{collapse op="photoSensor"}}

{{/if}}

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

{{#if electron}}
![Electron Diagram](/assets/images/phototransistor-electron.jpg)
{{else}}
{{#if photon}}
![Photon Diagram](/assets/images/phototransistor-photon.jpg)
{{else}}
![Argon Diagram](/assets/images/phototransistor-argon.jpg)
{{/if}}
{{/if}}

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

{{#if electron}}
![Electron Diagram](/assets/images/photoresistor-electron.jpg)
{{else}}
![Photon Diagram](/assets/images/photoresistor-photon.jpg)
{{/if}}
{{collapse op="end"}}

Bend the LED and the photo sensor so that they are pointing at each other. (You want the LED, when turned on, to shine its beam of light directly at the photo sensor.)

### Schematics

A schematic diagram is often use to document a circuit. You don't need to understand schematic diagrams, so feel free to skip this section, but they can make it easier to understand a circuit once you know the basics.

{{collapse op="start" photoSensor="Transistor"}}
{{#if electron}}
![Electron Diagram](/assets/images/schematic-phototransistor-electron.png)
{{else}}
{{#if photon}}
![Photon Diagram](/assets/images/schematic-phototransistor-photon.png)
{{else}}
![Argon Diagram](/assets/images/schematic-phototransistor-argon.png)
{{/if}}
{{/if}}
{{collapse op="end"}}

{{collapse op="start" photoSensor="Resistor"}}
{{#if electron}}
![Electron Diagram](/assets/images/schematic-photoresistor-electron.png)
{{else}}
![Photon Diagram](/assets/images/schematic-photoresistor-photon.png)
{{/if}}
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

[Click this link](https://go.particle.io/shared_apps/5be2df2588096afd2a0009b5) to open the source code in the Particle Web IDE, or copy and paste the code below.

<pre><code class="lang-cpp" data-firmware-example-code-block=true>
// -----------------------------------------------------------------
// Function and Variable with photo sensors (resistor or transistor)
// -----------------------------------------------------------------
// In this example, we're going to register a Particle.variable() with the cloud so that we can read brightness levels from the photoresistor or phototransistor.
// We'll also register a Particle.function so that we can turn the LED on and off remotely.

// We're going to start by declaring which pins everything is plugged into.

int led = D6; // This is where your LED is plugged in. The other side goes to a resistor connected to GND.

int photosensor = A0; // This is where your photoresistor or phototransistor is plugged in. The other side goes to the "power" pin (below).

int analogvalue; // Here we are declaring the integer variable analogvalue, which we will use later to store the value of the photoresistor or phototransistor.

int ledToggle(String command); // Forward declaration

// Next we go into the setup function.

void setup() {
	// This is here to allow for debugging using the USB serial port
	Serial.begin();

	// First, declare all of our pins. This lets our device know which ones will be used for outputting voltage, and which ones will read incoming voltage.
	pinMode(led, OUTPUT); // Our LED pin is output (lighting up the LED)
	digitalWrite(led, HIGH);

	// We are going to declare a Particle.variable() here so that we can access the value of the photosensor from the cloud.
	Particle.variable("analogvalue", &analogvalue, INT);
	// This is saying that when we ask the cloud for "analogvalue", this will reference the variable analogvalue in this app, which is an integer variable.

	// We are also going to declare a Particle.function so that we can turn the LED on and off from the cloud.
	Particle.function("led",ledToggle);
	// This is saying that when we ask the cloud for the function "led", it will employ the function ledToggle() from this app.

}


// Next is the loop function...

void loop() {

	// check to see what the value of the photoresistor or phototransistor is and store it in the int variable analogvalue
	analogvalue = analogRead(photosensor);

	// This prints the value to the USB debugging serial port (for optional debugging purposes)
	Serial.printlnf("%d", analogvalue);

	// This delay is just to prevent overflowing the serial buffer, plus we really don't need to read the sensor more than
	// 10 times per second (100 millisecond delay)
	delay(100);
}


// Finally, we will write out our ledToggle function, which is referenced by the Particle.function() called "led"

int ledToggle(String command) {

	if (command=="on") {
		digitalWrite(led,HIGH);
		return 1;
	}
	else if (command=="off") {
		digitalWrite(led,LOW);
		return 0;
	}
	else {
		return -1;
	}
}

</code></pre>

### Use

Just like with our earlier example, we can toggle our LED on and off by creating an HTML page:

```
/* Paste the code between the dashes below into a .txt file and save it as an .html file. Replace your-device-ID-goes-here with your actual device ID and your-access-token-goes-here with your actual access token.

---------------------------
<!-- Replace your-device-ID-goes-here with your actual device ID
and replace your-access-token-goes-here with your actual access token-->
<!DOCTYPE>
<html>
  <body>
  <center>
  <br>
  <br>
  <br>
  <form action="https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here" method="POST">
    Tell your device what to do!<br>
    <br>
    <input type="radio" name="args" value="on">Turn the LED on.
    <br>
    <input type="radio" name="args" value="off">Turn the LED off.
    <br>
    <br>
    <input type="submit" value="Do it!">
  </form>
  </center>
  </body>
</html>
---------------------------
*/
```

Or we can use the Particle CLI with the command:

`particle call device_name led on`

and

`particle call device_name led off`

where device_name is your device ID or device name.


As for your Particle.variable, the API request will look something like this:

```json
GET /v1/devices/{DEVICE_ID}/analogvalue

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef
# Your access token is 123412341234
curl -G https://api.particle.io/v1/devices/0123456789abcdef/analogvalue \
  -d access_token=123412341234
```

You can see a JSON output of your Particle.variable() call by going to:

https://api.particle.io/v1/devices/your-device-ID-goes-here/analogvalue?access_token=your-access-token-goes-here

(Be sure to replace `your-device-ID-goes-here` with your actual device ID and `your-access-token-goes-here` with your actual access token!)

You can also check out this value by using the command line. Type:

`particle variable get device_name analogvalue`

and make sure you replace `device_name` with either your device ID or the casual nickname you made for your device when you set it up.

Now you can turn your LED on and off and see the values at A0 change based on the phototransistor or photoresistor!

<div style="display: none;" id="publish-and-the-dashboard" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#make-a-motion-detector-publish-and-the-console" data-firmware-example-title="Publish" data-firmware-example-description="Publish and the Console"></div>

## Make a Motion Detector: Publish and the Console

### Intro

What if we simply want to know that something has happened, without all the information of a variable or all the action of a fuction? We might have a security system that tells us, "motion was detected!" or a smart washing machine that tells us "your laundry is done!" In that case, we might want to use `Particle.publish`.

`Particle.publish` sends a message to the cloud saying that some event has occurred. We're allowed to name that event, set the privacy of that event, and add a little bit of info to go along with the event.

In this example, we've created a system where you turn your LED and photo sensor to face each other, making a beam of light that can be broken by the motion of your finger. Every time the beam is broken or reconnected, your device will send a `Particle.publish` to the cloud letting it know the state of the beam. Basically, a tripwire!

For your convenience, we've set up a little calibrate function so that your device will work no matter how bright your LED is, or how bright the ambient light may be. Put your finger in the beam when the D7 LED goes on, and hold it in the beam until you see two flashes from the D7 LED. Then take your finger out of the beam. If you mess up, don't worry-- you can just hit "reset" on your device and do it again!

You can check out the results on your console at [console.particle.io](https://console.particle.io). As you put your finger in front of the beam, you'll see an event appear that says the beam was broken. When you remove your finger, the event says that the beam is now intact.

![Console](/assets/images/console-beamstatus.png)

You can also hook up publishes to IFTTT! More info [here](/tutorials/integrations/ifttt/).

### Setup

The setup for your breadboard is the same as in the last example. 

### Code

[Click this link](https://go.particle.io/shared_apps/5be2df6f88096a97af0008d6) to open the source code in the Particle Web IDE, or copy and paste the code below.

<pre><code class="lang-cpp" data-firmware-example-code-block=true>

// -------------------------------------------------------------
// Publish and Subscribe with photoresistors or phototransistors
/* -------------------------------------------------------------

This example requires two Particle devices claimed to the same account.

Each of you should flash the code to your device.

Breaking the beam on one device will turn on the D7 LED on the second device.

But how does this magic work? Through the miracle of publish and subscribe.

We are going to Particle.publish an event to the cloud.

------------------------------------------*/


int led = D6;
int boardLed = D7;
int photosensor = A0;

int intactValue;
int brokenValue;
int beamThreshold;

bool beamBroken = false;

void myHandler(const char *event, const char *data); // forward declaration

// We start with the setup function.

void setup() {
	// This part is mostly the same:
	pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
	pinMode(boardLed,OUTPUT); // Our on-board LED is output as well

	// Here we are going to subscribe to "beamStatus" events
	Particle.subscribe("beamStatus", myHandler);
	// Subscribe will listen for the event beamStatus and, when it finds it, will run the function myHandler()

	// Since everyone sets up their LEDs differently, we are also going to start by calibrating our photosensor.
	// This one is going to require some input from the user!

	// Calibrate:
	// First, the D7 LED will go on to tell you to put your hand in front of the beam.
	digitalWrite(boardLed,HIGH);
	delay(2000);

	// Then, the D7 LED will go off and the LED will turn on.
	digitalWrite(boardLed,LOW);
	digitalWrite(led,HIGH);
	delay(500);

	// Now we'll take some readings...
	int off_1 = analogRead(photosensor); // read photosensor
	delay(200); // wait 200 milliseconds
	int off_2 = analogRead(photosensor); // read photosensor
	delay(1000); // wait 1 second

	// Now flash to let us know that you've taken the readings...
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);

	// Now the D7 LED will go on to tell you to remove your hand...
	digitalWrite(boardLed,HIGH);
	delay(2000);

	// The D7 LED will turn off...
	digitalWrite(boardLed,LOW);

	// ...And we will take two more readings.
	int on_1 = analogRead(photosensor); // read photosensor
	delay(200); // wait 200 milliseconds
	int on_2 = analogRead(photosensor); // read photosensor
	delay(300); // wait 300 milliseconds

	// Now flash the D7 LED on and off three times to let us know that we're ready to go!
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);

	intactValue = (on_1+on_2)/2;
	brokenValue = (off_1+off_2)/2;
	beamThreshold = (intactValue+brokenValue)/2;

}


void loop() {
	// This loop sends a publish when the beam is broken.
	if (analogRead(photosensor)>beamThreshold) {
		if (beamBroken==true) {
			Particle.publish("beamStatus", "intact");
			// publish this event

			// Set the flag to reflect the current status of the beam.
			beamBroken=false;
		}
	}

	else {
		if (beamBroken==false) {
			// Same deal as before...
			Particle.publish("your_unique_event_name", "broken", PUBLIC);
			beamBroken=true;
		}
	}
}


// Now for the myHandler function, which is called when the cloud tells us that an event is published.
void myHandler(const char *event, const char *data)
{
	/* Particle.subscribe handlers are void functions, which means they don't return anything.
	  They take two variables-- the name of your event, and any data that goes along with your event.
	  In this case, the event will be "beamStatus" and the data will be "intact" or "broken"

	  Since the input here is a char, we can't do
		 data=="intact"
		or
		 data=="broken"

	  chars just don't play that way. Instead we're going to strcmp(), which compares two chars.
	  If they are the same, strcmp will return 0.
	 */

	if (strcmp(data,"intact")==0) {
		// if the beam is intact, then turn your board LED off
		digitalWrite(boardLed,LOW);
	}
	else if (strcmp(data,"broken")==0) {
		// if the beam is broken, turn your board LED on
		digitalWrite(boardLed,HIGH);
	}
	else {
		// if the data is something else, don't do anything.
		// Really the data shouldn't be anything but those two listed above.
	}
}

</code></pre>

<div style="display: none;" id="publish-and-subscribe-with-photoresistors" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#the-buddy-system-publish-and-subscribe" data-firmware-example-title="Subscribe" data-firmware-example-description="Learn about Publish and Subscribe using Photoresistors"></div>

## The Buddy System: Publish and Subscribe

### Intro

This example uses two devices claimed to the same account. When the beam is broken on either device, both D7 blue LEDs will light up; when the beam is intact again, both will turn off.

Flash the firmware to your devices. Calibrate your device when it comes online (same as in the previous example).

### Setup
The setup for your breadboard is the same as in the last example. 

### Code

[Click this link](https://go.particle.io/shared_apps/5be2dfca88096afd2a0009c1) to open the source code in the Particle Web IDE, or copy and paste the code below.

<pre><code class="lang-cpp" data-firmware-example-code-block=true>
// -------------------------------------------------------------
// Publish and Subscribe with photoresistors or phototransistors
/* -------------------------------------------------------------

Flash this code to two devices claimed to the same Particle account.

Breaking the beam on one device will turn on the D7 LED on the second device.

But how does this magic work? Through the miracle of publish and subscribe.

We are going to Particle.publish an event to the cloud.

------------------------------------------*/


int led = D6;
int boardLed = D7;
int photosensor = A0;

int intactValue;
int brokenValue;
int beamThreshold;

bool beamBroken = false;

// We start with the setup function.

void setup() {
	// This part is mostly the same:
	pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
	pinMode(boardLed,OUTPUT); // Our on-board LED is output as well

	// Here we are going to subscribe to the "beamStatus" event using Particle.subscribe
	Particle.subscribe("beamStatus", myHandler);
	// Subscribe will listen for the event "beamStatus" and, when it finds it, will run the function myHandler()

	// Since everyone sets up their LEDs differently, we are also going to start by calibrating our photosensor.
	// This one is going to require some input from the user!

	// Calibrate:
	// First, the D7 LED will go on to tell you to put your hand in front of the beam.
	digitalWrite(boardLed,HIGH);
	delay(2000);

	// Then, the D7 LED will go off and the LED will turn on.
	digitalWrite(boardLed,LOW);
	digitalWrite(led,HIGH);
	delay(500);

	// Now we'll take some readings...
	int off_1 = analogRead(photosensor); // read photosensor
	delay(200); // wait 200 milliseconds
	int off_2 = analogRead(photosensor); // read photosensor
	delay(1000); // wait 1 second

	// Now flash to let us know that you've taken the readings...
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);

	// Now the D7 LED will go on to tell you to remove your hand...
	digitalWrite(boardLed,HIGH);
	delay(2000);

	// The D7 LED will turn off...
	digitalWrite(boardLed,LOW);

	// ...And we will take two more readings.
	int on_1 = analogRead(photosensor); // read photosensor
	delay(200); // wait 200 milliseconds
	int on_2 = analogRead(photosensor); // read photosensor
	delay(300); // wait 300 milliseconds

	// Now flash the D7 LED on and off three times to let us know that we're ready to go!
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);
	delay(100);
	digitalWrite(boardLed,HIGH);
	delay(100);
	digitalWrite(boardLed,LOW);

	intactValue = (on_1+on_2)/2;
	brokenValue = (off_1+off_2)/2;
	beamThreshold = (intactValue+brokenValue)/2;

}


void loop() {
	// This loop sends a publish when the beam is broken.
	if (analogRead(photosensor)>beamThreshold) {
		if (beamBroken==true) {
			Particle.publish("beamStatus","intact");
			// publish this event

			// Set the flag to reflect the current status of the beam.
			beamBroken=false;
		}
	}

	else {
		if (beamBroken==false) {
			// Same deal as before...
			Particle.publish("beamStatus","broken");
			beamBroken=true;
		}
	}
}


// Now for the myHandler function, which is called when the cloud tells us that the event is published.
void myHandler(const char *event, const char *data)
{
	/* Particle.subscribe handlers are void functions, which means they don't return anything.
	  They take two variables-- the name of your event, and any data that goes along with your event.
	  In this case, the event will be "beamStatus" and the data will be "intact" or "broken"
	
	  Since the input here is a char, we can't do
		 data=="intact"
		or
		 data=="broken"
	
	  chars just don't play that way. Instead we're going to strcmp(), which compares two chars.
	  If they are the same, strcmp will return 0.
	 */

	if (strcmp(data,"intact")==0) {
		// if the beam is intact, then turn your board LED off
		digitalWrite(boardLed,LOW);
	}
	else if (strcmp(data,"broken")==0) {
		// if the beam is broken, turn your board LED on
		digitalWrite(boardLed,HIGH);
	}
	else {
		// if the data is something else, don't do anything.
		// Really the data shouldn't be anything but those two listed above.
	}
}


</code></pre>


{{#if electron}}
<div style="display: none;" id="electron-combined-publish" data-firmware-example-url="https://docs.particle.io/guide/getting-started/examples/photon/#electron-combined-publish" data-firmware-example-title="Electron Combined Publishes" data-firmware-example-description="Learn how to send many data points in a single Publish to save data"></div>

## Electron Combined Publish

### Intro
Every message the Electron sends to or from the Cloud has a certain fixed overhead, so we try to minimize the number of messages that are sent. You can do some optimization in your code, too. If you combine many data points in a single publish message, you'll use less data. We combine the data points into a single string, with commas in between them for easy parsing later.


### Setup
You can use the previous circuit, with the photoresistor or phototransistor connected to A0.


### Code

<pre><code class="lang-cpp" data-firmware-example-code-block=true>
// --------------------------------------------
// Combining many data points into one Publish
/* --------------------------------------------

This short bit of code samples an analog sensor connected to A0
every 10 minutes (600,000 milliseconds) and publishes 5 readings
at a time to the cloud. Combining what could be several publishes
into a single publish message saves lots of data, and this example
can easily be modified to send more data points at once, change the
sampling rate, or read a different sensor.

------------------------------------------*/

// Create an array with 5 locations to store values in
int light[5];

// The variable we'll use to keep track of where we are in the array
int i = 0;

// This is where we'll store the last time a measurement was taken
long lastMeasurement = 0;

void setup() {

}

void loop() {

    /* This statement is incredibly useful.
    millis() tells us what the current time is in milliseconds
    lastMeasurement will be when we recorded last; it starts out as 0 because we've never measured
    If the difference in milliseconds between the current time and the last time we've measured
    is more than 600,000 milliseconds (ten minutes) then... do all the things!
    */
    if(millis()-lastMeasurement > 600000){
        // Measure the value on the photoresistor, and put it into the array
        light[i] = analogRead(A0);

        // Keep track of when last measurement was taken
        lastMeasurement = millis();

        // If we've taken 5 measurements (0-4, inclusive) then we should send that data
        if(i == 4){
            /* We're using a short event name "T" to reduce data transmitted
            String::format will create a single string for us out of many data points
            Each %d means to put an integer there. %s is used for strings.
            To learn more, read https://en.wikipedia.org/wiki/Printf_format_string
            Since this will only happen every 5 measurements, we can assume these publishes will be 50 minutes apart*/
            Particle.publish("L", String::format("%d,%d,%d,%d,%d", light[0],light[1],light[2],light[3],light[4]));
            // Reset index to beginning
            i = 0;
        }
        else {
            // If it wasn't the 5th measurement, increase the index by 1
            i++;
        }
    }
}

</code></pre>

If you want to subscribe to these publishes from another Particle device, you can create a handler that splits the data on receipt:

<pre><code class="lang-cpp" data-firmware-example-code-block=true>
// ---------------------------------------------------
// Parsing publishes that contain multiple data points
/* ---------------------------------------------------

Subscribing the the example above, this example will listen for data from
the "L" event, split it up, and put it into the subscribeData array.

------------------------------------------*/

// Create an array with 5 locations to store values from the subscribe
int subscribeData[5];

void setup() {

    Particle.subscribe("L",myHandler);

    // Note that this will subscribe to all events beginning with the name "L" 
    // for devices claimed to the same account.
}

void loop() {
    // nothing here...
}

void myHandler(const char *event, const char *data) {
    if (data) {
        char input[64];
        strcpy(input,data);
        char *p;
        p = strtok(input,",");
        subscribeData[0]=atoi(p);
        p = strtok(NULL,",");
        subscribeData[1]=atoi(p);
        p = strtok(NULL,",");
        subscribeData[2]=atoi(p);
        p = strtok(NULL,",");
        subscribeData[3]=atoi(p);
        p = strtok(NULL,",");
        subscribeData[4]=atoi(p);
        Serial.print("Got data: ");
        Serial.print(subscribeData[0]);
        Serial.print(",");
        Serial.print(subscribeData[1]);
        Serial.print(",");
        Serial.print(subscribeData[2]);
        Serial.print(",");
        Serial.print(subscribeData[3]);
        Serial.print(",");
        Serial.println(subscribeData[4]);
    }
}


</code></pre>

{{/if}} {{!-- electron --}}

<div style="display: none;" id="annotated-tinker-firmware" data-firmware-example-url="http://docs.particle.io/photon/tinker/#annotated-tinker-firmware" data-firmware-example-title="Tinker" data-firmware-example-description="The factory default firmware that mobile apps interact with"></div>

## Tinker

Remember back when we were blinking lights and reading sensors with Tinker on the mobile app?

When you tap a pin on the mobile app, it sends a message up to the cloud. Your device is always listening to the cloud and waiting for instructions-- like "write D7 HIGH" or "read the voltage at A0".

Your device already knew how to communicate with the mobile app because of the firmware loaded onto your device as a default. We call this the Tinker firmware. It's just like the user firmware you've been loading onto your device in these examples. It's just that with the Tinker firmware, we've specified special `Particle.function`s that the mobile app knows and understands.

If your device is new, it already has the Tinker firmware on it. It's the default firmware stored on your device right from the factory. When you put your own user firmware on your device, you'll rewrite the Tinker firmware. (That means that your device will no longer understand commands from the Particle mobile app.) However, you can always get the Tinker firmware back on your device {{#unless electron}}by putting it in [factory reset mode](/tutorials/device-os/led/#factory-reset), or {{/unless}}by re-flashing your device with Tinker in the Particle app.

To reflash Tinker from within the app:

- **iOS Users**: Tap the list button at the top left. Then tap the arrow next to your desired device and tap the "Re-flash Tinker" button in the pop out menu.
- **Android Users**: With your desired device selected, tap the options button in the upper right and tap the "Reflash Tinker" option in the drop down menu.

The Tinker app is a great example of how to build a very powerful application with not all that much code. If you're a technical person, you can have a look at the latest release [here.](https://github.com/particle-iot/device-os/blob/master/user/src/application.cpp)

I know what you're thinking: this is amazing, but I really want to use Tinker *while* my code is running so I can see what's happening! Now you can.

Combine your code with this framework, flash it to your device, and Tinker away. You can also access Tinker code by clicking on the last example in the online IDE's code menu.

<pre><code class="lang-cpp" data-firmware-example-code-block=true>
/* Function prototypes -------------------------------------------------------*/
int tinkerDigitalRead(String pin);
int tinkerDigitalWrite(String command);
int tinkerAnalogRead(String pin);
int tinkerAnalogWrite(String command);

SYSTEM_MODE(AUTOMATIC);

/* This function is called once at start up ----------------------------------*/
void setup()
{
    //Setup the Tinker application here

    //Register all the Tinker functions
    Particle.function("digitalread", tinkerDigitalRead);
    Particle.function("digitalwrite", tinkerDigitalWrite);

    Particle.function("analogread", tinkerAnalogRead);
    Particle.function("analogwrite", tinkerAnalogWrite);
}

/* This function loops forever --------------------------------------------*/
void loop()
{
    //This will run in a loop
}

/*******************************************************************************
 * Function Name  : tinkerDigitalRead
 * Description    : Reads the digital value of a given pin
 * Input          : Pin
 * Output         : None.
 * Return         : Value of the pin (0 or 1) in INT type
                    Returns a negative number on failure
 *******************************************************************************/
int tinkerDigitalRead(String pin)
{
    //convert ASCII to integer
    int pinNumber = pin.charAt(1) - '0';
    //Sanity check to see if the pin numbers are within limits
    if (pinNumber < 0 || pinNumber > 7) return -1;

    if(pin.startsWith("D"))
    {
        pinMode(pinNumber, INPUT_PULLDOWN);
        return digitalRead(pinNumber);
    }
    else if (pin.startsWith("A"))
    {
        pinMode(pinNumber+10, INPUT_PULLDOWN);
        return digitalRead(pinNumber+10);
    }
#if Wiring_Cellular
    else if (pin.startsWith("B"))
    {
        if (pinNumber > 5) return -3;
        pinMode(pinNumber+24, INPUT_PULLDOWN);
        return digitalRead(pinNumber+24);
    }
    else if (pin.startsWith("C"))
    {
        if (pinNumber > 5) return -4;
        pinMode(pinNumber+30, INPUT_PULLDOWN);
        return digitalRead(pinNumber+30);
    }
#endif
    return -2;
}

/*******************************************************************************
 * Function Name  : tinkerDigitalWrite
 * Description    : Sets the specified pin HIGH or LOW
 * Input          : Pin and value
 * Output         : None.
 * Return         : 1 on success and a negative number on failure
 *******************************************************************************/
int tinkerDigitalWrite(String command)
{
    bool value = 0;
    //convert ASCII to integer
    int pinNumber = command.charAt(1) - '0';
    //Sanity check to see if the pin numbers are within limits
    if (pinNumber < 0 || pinNumber > 7) return -1;

    if(command.substring(3,7) == "HIGH") value = 1;
    else if(command.substring(3,6) == "LOW") value = 0;
    else return -2;

    if(command.startsWith("D"))
    {
        pinMode(pinNumber, OUTPUT);
        digitalWrite(pinNumber, value);
        return 1;
    }
    else if(command.startsWith("A"))
    {
        pinMode(pinNumber+10, OUTPUT);
        digitalWrite(pinNumber+10, value);
        return 1;
    }
#if Wiring_Cellular
    else if(command.startsWith("B"))
    {
        if (pinNumber > 5) return -4;
        pinMode(pinNumber+24, OUTPUT);
        digitalWrite(pinNumber+24, value);
        return 1;
    }
    else if(command.startsWith("C"))
    {
        if (pinNumber > 5) return -5;
        pinMode(pinNumber+30, OUTPUT);
        digitalWrite(pinNumber+30, value);
        return 1;
    }
#endif
    else return -3;
}

/*******************************************************************************
 * Function Name  : tinkerAnalogRead
 * Description    : Reads the analog value of a pin
 * Input          : Pin
 * Output         : None.
 * Return         : Returns the analog value in INT type (0 to 4095)
                    Returns a negative number on failure
 *******************************************************************************/
int tinkerAnalogRead(String pin)
{
    //convert ASCII to integer
    int pinNumber = pin.charAt(1) - '0';
    //Sanity check to see if the pin numbers are within limits
    if (pinNumber < 0 || pinNumber > 7) return -1;

    if(pin.startsWith("D"))
    {
        return -3;
    }
    else if (pin.startsWith("A"))
    {
        return analogRead(pinNumber+10);
    }
#if Wiring_Cellular
    else if (pin.startsWith("B"))
    {
        if (pinNumber < 2 || pinNumber > 5) return -3;
        return analogRead(pinNumber+24);
    }
#endif
    return -2;
}

/*******************************************************************************
 * Function Name  : tinkerAnalogWrite
 * Description    : Writes an analog value (PWM) to the specified pin
 * Input          : Pin and Value (0 to 255)
 * Output         : None.
 * Return         : 1 on success and a negative number on failure
 *******************************************************************************/
int tinkerAnalogWrite(String command)
{
    String value = command.substring(3);

    if(command.substring(0,2) == "TX")
    {
        pinMode(TX, OUTPUT);
        analogWrite(TX, value.toInt());
        return 1;
    }
    else if(command.substring(0,2) == "RX")
    {
        pinMode(RX, OUTPUT);
        analogWrite(RX, value.toInt());
        return 1;
    }

    //convert ASCII to integer
    int pinNumber = command.charAt(1) - '0';
    //Sanity check to see if the pin numbers are within limits

    if (pinNumber < 0 || pinNumber > 7) return -1;

    if(command.startsWith("D"))
    {
        pinMode(pinNumber, OUTPUT);
        analogWrite(pinNumber, value.toInt());
        return 1;
    }
    else if(command.startsWith("A"))
    {
        pinMode(pinNumber+10, OUTPUT);
        analogWrite(pinNumber+10, value.toInt());
        return 1;
    }
    else if(command.substring(0,2) == "TX")
    {
        pinMode(TX, OUTPUT);
        analogWrite(TX, value.toInt());
        return 1;
    }
    else if(command.substring(0,2) == "RX")
    {
        pinMode(RX, OUTPUT);
        analogWrite(RX, value.toInt());
        return 1;
    }
#if Wiring_Cellular
    else if (command.startsWith("B"))
    {
        if (pinNumber > 3) return -3;
        pinMode(pinNumber+24, OUTPUT);
        analogWrite(pinNumber+24, value.toInt());
        return 1;
    }
    else if (command.startsWith("C"))
    {
        if (pinNumber < 4 || pinNumber > 5) return -4;
        pinMode(pinNumber+30, OUTPUT);
        analogWrite(pinNumber+30, value.toInt());
        return 1;
    }
#endif
    else return -2;
}

</code></pre>
