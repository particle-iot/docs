---
title: System Modes
template: support.hbs
columns: two
devices: [ photon,electron,core ]
order: 6
---


Mode Switching (Firmware)
===

One of our goals with the {{device}} and Particle OS was to abstract away the connectivity layer. When you're running a distributed OS where some of your software runs on the device and some of your software runs in the cloud, you want the connection between the two to "just work".

However, sometimes you don't want everything to be automatic; you want to take control of the connection, so you can decide when the device should try to connect and when it shouldn't. This is particularly helpful when you want your application code to start running immediately as soon as the device is powered, and the connectivity stuff can happen later on.

As of today, the {{device}} has three modes: **AUTOMATIC, SEMI_AUTOMATIC, and MANUAL**. Let's go through each of them in turn.

### Automatic Mode

The default mode of the {{device}} is "automatic mode". This means that the {{device}} will attempt to connect to Wi-Fi automatically. If you don't explicitly define the connection mode, the {{device}} will be running in automatic mode. This is identical to how the {{device}} has always worked up until now.

Behind the scenes, what's running on the {{device}} looks something like this:

	void main() {
	  // First, connect to the internet
	  Particle.connect();

	  // Then run the user-defined setup function
	  setup();

	  while (1) {
	    // Then alternate between processing messages to and from the Cloud...
	    Particle.process();

	    // ...and running the user-defined loop function
	    loop();

	  }
	}

But the whole point of the automatic mode is you don't really need to know that. The Wi-Fi connection just works. So let's say your code looks like this:

	// You don't have to add this, but if you want to be explicit:
	SYSTEM_MODE(AUTOMATIC);

	void setup() {
	  pinMode(D7, OUTPUT);
	}

	void loop() {
	  digitalWrite(D7, HIGH);
	  delay(500);
	  digitalWrite(D7, LOW);
	  delay(500);
	}

What's actually happening is that first we're calling **Particle.connect()**, which will connect the device to the Cloud. Once it's connected, then your code will run, and your **loop()** will alternate with **Particle.process()** so that we can process incoming messages in something that resembles a background process. (Side note: **Particle.process()** also runs during delays).

Ok, that's all well and good, but what if I don't know whether my {{device}} will have an internet connection? I still want my LED to blink. So now we've got:

### Semi-automatic mode

	// Insert firearm metaphor here
	SYSTEM_MODE(SEMI_AUTOMATIC);

	void setup() {
	  pinMode(D7, OUTPUT);
	  attachInterrupt(D0, connect, FALLING);
	}

	void loop() {
	  digitalWrite(D7, HIGH);
	  delay(500);
	  digitalWrite(D7, LOW);
	  delay(500);
	}

	void connect() {
	  if (Particle.connected() == false) {
	    Particle.connect();
	  }
	}

In this version of the code, when the {{device}} is plugged in, the LED will immediately start blinking. When a button attached to D0 is depressed (bringing DO to **LOW**), **Particle.connect()** will be called. If the {{device}} already has Wi-Fi credentials in memory, it will attempt to connect; otherwise, it will enter listening mode, and wait for your network name and password through the Particle mobile app or over USB.

The only main difference between **SEMI_AUTOMATIC** mode and **AUTOMATIC** mode is that **Particle.connect()** is not called at the beginning of your code; you have to do that yourself. Let's go deeper down the rabbit hole with:

### Manual Mode

The {{device}}'s manual mode puts everything in your hands. This mode gives you a lot of rope to hang yourself with, so tread cautiously.

Like **SEMI_AUTOMATIC** mode, in **MANUAL** mode you need to connect to the Cloud using **Particle.connect()** yourself. However, in manual mode, the {{device}} will not call **Particle.process()** automatically; you have to call it yourself. So your code might look like this:

	SYSTEM_MODE(MANUAL);

	void setup() {
	  pinMode(D7, OUTPUT);
	  attachInterrupt(D0, connect, FALLING);
	}

	void loop() {
	  digitalWrite(D7, HIGH);
	  Particle.process();
	  delay(500);
	  digitalWrite(D7, LOW);
	  Particle.process();
	  delay(500);
	}

	void connect() {
	  if (Particle.connected() == false) {
	    Particle.connect();
	  }
	}

**You must call Particle.process() as frequently as possible to process messages from the Wi-Fi module.** If you do not do so, you will encounter erratic behavior, such as:

- The {{device}} losing its connection to the Cloud
- The {{device}} breathing cyan when in fact it is not connected
- Long delays when a request is sent to the {{device}} because the {{device}} won't respond until it's processed the message

Sounds kinda terrible, right? Except this can be really useful when you're writing code that is very sensitive to exact timing, and the **Particle.process()** call might interrupt your sensitive code. By turning on **MANUAL** mode, you can make sure that **Particle.process()** is called when you want, and not when the processor is busy with a time-sensitive task.

As Stan Lee once said: with great power comes great responsibility. Go forth and control the connection. Be careful. Good luck.


**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}


