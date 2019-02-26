---
word: Working with Mesh
title: Working with Mesh
order: 8
columns: two
layout: workshops.hbs
---

# How to Mesh

In this session, we'll leverage a local mesh network to quickly send messages between devices. We'll get a chainable Grove LED to turn on/off when the button on a different device is pushed.

::: tip Did you come prepared?
It is assumed that you came to this session with an Argon and Xenon that you are able to program.
:::

## Setting up the mesh network

In order to set up a mesh network, you need one device with Internet connection, acting as a gateway. This device will create a mesh network, other devices (currently only Xenons) can join. These devices will be the _nodes_ of the mesh network. This part will guide you through setting up an Argon as a gateway, and a Xenon as a node.

The following videos provide an overview of the steps detailed below. First, setting up an Argon as a gateway.

<div align="center">
<iframe width="600" height="337" src="https://www.youtube.com/embed/54kmDEoQSP0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> 
</div>

Next, adding a Xenon to an existing mesh network.

<div align="center">
<iframe width="600" height="337" src="https://www.youtube.com/embed/4bPcRFRHkBc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> 
</div>

1. From the Particle app, add the Argon as a new device, even if it has already been added. This will not override your code on the device. Follow the steps from the previous lab, but select the option to use the Argon in a mesh network.

2. Follow the guide to add Wi-Fi to your Argon.

3. After the Argon has connected to the Device Cloud, name your Argon.

4. Give your new mesh network a name (max 16 characters) and a password.

5. After the mesh network is successfully created, you may exit the setup guide, and set up the Xenon.

6. Add the Xenon in much the same fashion you added the Argon: Start from the "Your devices" and click on the "+" sign.

7. Hold the `Mode` button for 3 seconds to put the Xenon into listening mode.

8. Scan the sticker. The Xenon will now pair with your phone.

9. After successful pairing, the Xenon will scan for local mesh-networks. Chose the network you set up with the Argon before.

10. To connect a new device to the mesh network, you physical access to a device already on the mesh network. This device will act as a commissioner, allowing your new device to join. Put the Argon (already on the mesh network) in listening mode (blinking blue) by holding the `MODE` button down for 3 seconds. Then scan its sticker.

11. Once you have successfully paired with the Argon, enter the mesh network password you created earlier.

12. After your Xenon have successfully joined the mesh network, you may give it a name, and exit the setup guide.

You now have a functioning mesh network of two devices. Let's add some local network interactivity on the new device, and add another Grove sensor to the Argon gateway node.

## Sending & Receiving messages

Let us take a look at two of the newest functions provided by Particle: `Mesh.publish()` and `Mesh.subscribe()`. These primitives allow you to send and receive messages within a Particle Mesh network. These messages will not reach the cloud. Each device can publish messages to the rest of the mesh, and each device can subscribe to messages from other devices – this is called a [pub/sub architecture](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).

The same code will be used for all devices in the network, so start by creating a new app in the [Particle Web IDE](https://build.particle.io/build/new), name it _MeshPubSubTest.ino_ or come up with a more creative name.

### Sending messages

First, let's send out a message when the `MODE` button on the Xenon is pushed.

1. In the `setup` function, tell the device to call the `button_handler` function, whenever the `button_status` changes (pressed or released). Let's also add a `pinMode` call so we can toggle the `D7` LED on the Xenon when pressed.

```cpp
pinMode(D7, OUTPUT);
System.on(button_status, button_handler);
```

2. Now write the `button_handler` function before the `setup` function.

```cpp
void button_handler(system_event_t event, int duration, void* ) {
  // Empty
}
```

3. Since this function gets called on both press _and_ release of the `MODE` button, we can use the `duration` to check which it is. Replace the line the the _Empty_ comment with the following.

```cpp
if (!duration) {
  // Just pressed.
} else {
  // Button released.
}
```

4. Now, since we now that the button has been pressed, we should tell the whole mesh network to toggle their LEDs. We use the `Mesh.publish()` for that, which takes one or two striings as arguments. The first argument is a topic and the second is data. We will only use the topic, and we should choose a topic that will make sense for the purpose. Later other devices will be able to subscribe to this topic and will get notified whenever we publish to this topic. Replace the body of the handler with the lines below to finish the code. We'll also turn on the D7 LED when the button is pressed, and off when the button is released.

```cpp
if (!duration) {
  Mesh.publish("toggle-led");
  digitalWrite(D7, HIGH);
} else {
  digitalWrite(D7, LOW);
}
```

5. You have now completed the sending part of the code. To see that everything works, first add the following line to the `setup`.

```cpp
Serial.begin(9600);
```

6. Then add a print statement like this inside the if-loop, just under the `mesh.publish` line.

```cpp
Serial.println("Button push published!");
```

7. Flash your device with the code, and see that it behaves as expected.

### Receiving messages

We now want to subscribe to any messages on the `toggle-led` topic (or whatever you have decided to call it). We'll do this on the Argon, and turn on a new Grove device when the message is received.

#### Adding the Grove Chainable LED

First, we'll connect the included chainable LED.

1. Open the bag containing the chainable LED and take one connector out of the bag.

2. Connect one end of the Grove connector to the chainable LED on the side marked IN (the left side if you're looking at the device in a correct orientation.)

![](./images/03/led-connect.jpg)

3. Plug the other end of the connector into the Shield port labeled `A4`.

![](./images/03/led-shield.jpg)

4. As with the other two Grove devices, we'll need a library to help us program the chainable LED. Using the same process you followed in [the last module](./grove-kit-distance-display.html#measuring-distance-with-the-ultrasonic-ranger), add the `Grove_ChainableLED` library to your project in the Web IDE.

5. Once the library has been added, you can create an object for the ChainableLED class at the top of your code file. The first two parameters specify which pin the LED is wired to, and the third is the number of LEDs we have chained together, just one in our case.

```cpp
ChainableLED leds(A4, A5, 1);
```

6. Now, initialize the object in your `setup` function. We'll also set the LED color to off after initialization.

```cpp
leds.init();
leds.setColorHSB(0, 0.0, 0.0, 0.0);
```

With our new device set-up, we can turn it on in response to Mesh messages!

#### Receiving the Mesh message and turning on the LED

1. `Mesh.subscribe` works just like `Particle.subscribe` from a code standpoint. You subscribe to a topic (string) and pass in the name of a function to handle the message if the device receives it. In the `setup` function, subscribe to the `toggle-led` topic (first argument), and tell the device which function to call (second argument) when another device broadcasts a message to the topic.

```cpp
Mesh.subscribe("toggle-led", toggleLed);
```

2. Write the function that handles incoming messages to the `toggle-led`topic. Insert the function before the `setup` function.

```cpp
void toggleLed(const char *event, const char *data) {
  // Empty line
}
```

3. In the `toggleLED` function, add a few lines turn the LED red, delay for half a second, and then turn it off again.

```cpp
leds.setColorHSB(0, 0.0, 1.0, 0.5);

delay(500);

leds.setColorHSB(0, 0.0, 0.0, 0.0);
```

4. The last step is to flash this new code to your Argon. Once it's updated, and your Xenon has the code we wrote in this module to send messages, you should be able to press the `SETUP` button on the Xenon (the button on the left side of the device) and see the LED on the Argon light up!

![](./images/03/led.gif)

:tada: Congratulations, you are now able to send/receive messages to/from the mesh network. Easy, right? What could you do to improve this demo? Maybe add an LED animation, or trigger events with the button is pressed and released? Why not try out a thing or two?

::: tip Got stuck in the code?
The final code for this lab is [available here for the Xenon](https://go.particle.io/shared_apps/5c34d5aee1b63bd1fc00126d) and [here for the Argon portion](https://go.particle.io/shared_apps/5c34d7f3e1b63bbf80000f99).
:::
