---
word: Mesh & BLE on Particle Devices
title: Mesh & BLE Lab
order: 8
columns: two
layout: workshops.hbs
---

# Lab 3 - Working with Mesh & BLE

| **Project Goal**            | Create a Mesh network and connect a second Xenon to it; Learn how to use BLE features on Gen3 devices.                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | How-to: add a second device to your Mesh network; communicate through a Mesh gateway to an endpoint device; How to configure BLE for broadcasting device data; Using WebBLE to connect to and consume data from Particle devices.        |
| **Tools you’ll need**       | An Argon, Xenon, the Particle Mobile App, A Grove Shield, A Grove Chainable LED |
| **Time needed to complete** | 30 minutes                                                                                                          |

In this lab, we'll leverage a local mesh network to quickly send messages between devices. We'll get a chainable Grove LED to turn on/off when the button on a different device is pushed.

Then, we'll explore using BLE to advertise data from your device. Specifically, we'll use BLE to advertise the uptime, Wi-Fi signal strength, and free memory on your device, which we'll then read from a browser using Web BLE and Chrome.

{{box op="start" cssClass="boxed warningBox"}}
**Did you come prepared?**</br>
Make sure you have completed **all** the prerequisites before advancing beyond this point.
{{box op="end"}}

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

1. Before your setup function, add a few global variables to store whether the `MODE` button has been pressed, as well as whether we've sent the mesh message.
```cpp
bool buttonPressed = false;
bool messageSent = false;
```

2. In the `setup` function, tell the device to call the `button_handler` function, whenever the `button_status` changes (pressed or released). Let's also add a `pinMode` call so we can toggle the `D7` LED on the Xenon when pressed.
```cpp
pinMode(D7, OUTPUT);
System.on(button_status, button_handler);
```
3. Now write the `button_handler` function before the `setup` function.
```cpp
void button_handler(system_event_t event, int duration, void* ) {
  // Empty
}
```
4. Since this function gets called on both press _and_ release of the `MODE` button, we can use the `duration` to check which it is. Replace the line the the _Empty_ comment with the following.
```cpp
if (!duration) {
  // Just pressed.
} else {
  // Button released.
}
```
5. Now, since we now that the button has been pressed, we should tell the whole mesh network to toggle their LEDs. We'll do this by setting the `buttonPressed` variable to `true` when the button is pressed, and false when it is released. Replace the body of the handler with the lines below to finish the code. We'll also turn on the D7 LED when the button is pressed, and off when the button is released.
```cpp
if (!duration) {
  buttonPressed = true;
  digitalWrite(D7, HIGH);
} else {
  buttonPressed = false;
  messageSent = false;
  digitalWrite(D7, LOW);
}
```

6. Finally, in the `loop`, add the following code to check the boolean and send a message to the mesh if true and if the message hasn't been set yet. We use the `Mesh.publish()` for that, which takes one or two strings as arguments. The first argument is a topic and the second is data. We will only use the topic, and we should choose a topic that will make sense for the purpose. Later other devices will be able to subscribe to this topic and will get notified whenever we publish to this topic.
```cpp
if (buttonPressed && !messageSent) {
  Mesh.publish("toggle-led");
  messageSent = true;
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

#### Receiving the Mesh message and turning on the LED

1. `Mesh.subscribe` works just like `Particle.subscribe` from a code standpoint. You subscribe to a topic (string) and pass in the name of a function to handle the message if the device receives it. In the `setup` function, subscribe to the `toggle-led` topic (first argument), and tell the device which function to call (second argument) when another device broadcasts a message to the topic.
```cpp
Mesh.subscribe("toggle-led", toggleLedMesh);
```
2. Write the function that handles incoming messages to the `toggle-led`topic. Insert the function before the `setup` function.
```cpp
void toggleLedMesh(const char *event, const char *data) {
  // Empty line
}
```
3. In the `toggleLedMesh` function, add a few lines turn the LED red, delay for half a second, and then turn it off again.
```cpp
leds.setColorHSB(0, 0.0, 1.0, 0.5);
delay(500);
leds.setColorHSB(0, 0.0, 0.0, 0.0);
```

4. The last step is to flash this new code to your Argon. Once it's updated, and your Xenon has the code we wrote in this module to send messages, you should be able to press the `SETUP` button on the Xenon (the button on the left side of the device) and see the LED on the Argon light up!

![](/assets/images/workshops/mesh-101/03/led.gif)

Congratulations, you are now able to send/receive messages to/from the mesh network. Easy, right? What could you do to improve this demo? Maybe add an LED animation, or trigger events with the button is pressed and released? Why not try out a thing or two?

Next, let's explore using Bluetooth with Particle Devices.

## Using Bluetooth with Particle Devices

1. To use Bluetooth with a thrid generation Particle device, you'll need to be running Device OS version 1.3.0 or greater. To set this in Workbench, open the command palette (keyboard shortcut: *SHIFT + CMD/CTRL + P*), select the `Configure Project for Device` option, and select version `deviceOS@1.3.0` or newer.
<br /><br />
2. Next, you'll want to install a new library to help with getting power and battery info from your device. Open the command palette, select the `Install Library` command and enter `DiagnosticsHelperRK` into the textbox. Hit enter and the library will be installed.
<br /><br />
3. At the top of your project, add an include for the DiagnosticsHelper library.
```cpp
#include "DiagnosticsHelperRK.h"
```
<br />
4. Now, let's turn on threading in the app, using the `SYSTEM_THREAD` command below. This opt-in change will allow your user firmware and system firmware to run on separate threads, which can speed things up when you're doing cloud publishes and local operations like Bluetooth.
```
SYSTEM_THREAD(ENABLED);
```
<br />
5. Next, add some global variables to handle timing for updating the device state values outside of the `setup` and `loop` functions.
```cpp
const unsigned long UPDATE_INTERVAL = 2000;
unsigned long lastUpdate = 0;
```
<br />
6. Now, add a UUID for the service, and three characteristic objects to represent uptime, signal strength, and free memory. <br /><br />The service UUID is arbitrary and you should change it from the default below using a UUID generator like the one [here](https://www.uuidgenerator.net/).
<br /><br />
Keep track of the UUID you create here  because you'll need it in the next section as well. The Service UUIDs should remain unchanged.
  ```cpp
  // Private battery and power service UUID
  const BleUuid serviceUuid("5c1b9a0d-b5be-4a40-8f7a-66b36d0a5176"); // CHANGE ME

  BleCharacteristic uptimeCharacteristic("uptime", BleCharacteristicProperty::NOTIFY, BleUuid("fdcf4a3f-3fed-4ed2-84e6-04bbb9ae04d4"), serviceUuid);
  BleCharacteristic signalStrengthCharacteristic("strength", BleCharacteristicProperty::NOTIFY, BleUuid("cc97c20c-5822-4800-ade5-1f661d2133ee"), serviceUuid);
  BleCharacteristic freeMemoryCharacteristic("freeMemory", BleCharacteristicProperty::NOTIFY, BleUuid("d2b26bf3-9792-42fc-9e8a-41f6107df04c"), serviceUuid);
  ```
<br/>
7. Next, create a function to configure and setup BLE advertising from your device. This snippet will add the three characteristics you defined above, as well as the service UUID you specified, and will advertise itself as a connectable device.
```cpp
void configureBLE()
{
  BLE.addCharacteristic(uptimeCharacteristic);
  BLE.addCharacteristic(signalStrengthCharacteristic);
  BLE.addCharacteristic(freeMemoryCharacteristic);

  BleAdvertisingData advData;

  // Advertise our private service only
  advData.appendServiceUUID(serviceUuid);

  // Continuously advertise when not connected
  BLE.advertise(&advData);
}
```
<br />
8. At the end of your `setup` function, call the function you just created.
```cpp
configureBLE();
```

## Refactoring out the blocking delay

Next, let's modify the `loop` function. You'll start by refactoring our firmware to remove the `delay` in the loop. While the delay approach is common when getting started with creating embedded applications, it's a blocking operation. This means that any calls you make to the device during a delay may timeout before being received.

One common way to write periodic code without using `delay` is to use the built-in `millis()` function and keep track of the elapsed time between the last time you performed an operation (like a temp check) and the wait time between operations.

1. First, let's add some global variables to hold the last check time and an interval. Add the following to the top of your project, outside of the `setup` and `loop`.
```cpp
const unsigned long UPDATE_INTERVAL = 2000;
unsigned long lastUpdate = 0;
```
<br />
2. Now, in the `loop`, add a local variable to hold the current time elapsed. The `millis()` function returns the number of milliseconds that have elapsed since your device began running the current program. 
```cpp
unsigned long currentMillis = millis();
```
<br />
3. Next, remove the `delay` at the end of your loop function. Then, wrap the rest of the code with an if statement to see if the `UPDATE_INTERVAL` time has elapsed.
<br />
  Make sure you also update the `lastUpdate` variable to the current `millis` time or this `if` statement will never evaluate to `true` after the first time it runs.
```cpp
if (currentMillis - lastUpdate >= UPDATE_INTERVAL)
{
  lastUpdate = millis();

  /* rest of Loop code here */ 
}
```
Your `loop` should now look like this:
```cpp
void loop()
{
  unsigned long currentMillis = millis();

  if (currentMillis - lastUpdate >= UPDATE_INTERVAL)
  {
    lastUpdate = millis();

    temp = (int)dht.getTempFarenheit();
    humidity = (int)dht.getHumidity();

    Serial.printlnf("Temp: %f", temp);
    Serial.printlnf("Humidity: %f", humidity);

    double lightAnalogVal = analogRead(A0);
    currentLightLevel = map(lightAnalogVal, 0.0, 4095.0, 0.0, 100.0);

    if (currentLightLevel > 50)
    {
      Particle.publish("light-meter/level", String(currentLightLevel), PRIVATE);
    }
  }
}
```
<br />
4. Now, let's add our BLE logic to the `loop`, after the `currentLightLevel` if statement. In this code, you'll check to see if another device (a peripheral) is connected to our Argon.
<br />
<br />
If so, you'll use the diagnostics library to get the device uptime, signal strength, and free memory, and set those values to our characteristics, so the connected client can read them.
```cpp
if (BLE.connected())
{
  uint8_t uptime = (uint8_t)DiagnosticsHelper::getValue(DIAG_ID_SYSTEM_UPTIME);
  uptimeCharacteristic.setValue(uptime);

  uint8_t signalStrength = (uint8_t)(DiagnosticsHelper::getValue(DIAG_ID_NETWORK_SIGNAL_STRENGTH) >> 8);
  signalStrengthCharacteristic.setValue(signalStrength);

  int32_t usedRAM = DiagnosticsHelper::getValue(DIAG_ID_SYSTEM_USED_RAM);
  int32_t totalRAM = DiagnosticsHelper::getValue(DIAG_ID_SYSTEM_TOTAL_RAM);
  int32_t freeMem = (totalRAM - usedRAM);
  freeMemoryCharacteristic.setValue(freeMem);
}
```
<br />
1. And that's all you need on the Argon side. Flash the latest firmware to your device and move on to the next step!

## Viewing Bluetooth data with Web BLE on Chrome

There are a number of methods by which you can connect to your BLE-powered Argon.

For example, you could use a mobile app (like [Bluefruit](https://apps.apple.com/us/app/adafruit-bluefruit-le-connect/id830125974) from Adafruit), or another Particle 3rd Gen device. Or, you could use a browser that supports Web BLE, like Chrome, which you will do in this section. 

<div class="boxed warningBox">
<p>
<strong>NOTE:</strong><br>
At the time this lab ws created, Chrome is the only desktop browser that supports Web BLE, so you'll need to have that browser installed to continue. 
</p>
</div>

1. Clone the [demo web app](https://github.com/bsatrom/particle-web-ble) for this project to your machine using a terminal window
```bash
$ git clone https://github.com/bsatrom/particle-web-ble
```
<br />
2. Open the project in your editor of choice, and modify the following snippet in the `src/scripts/ble.js` file to match the Service UUID you specified in your Argon code above.
<br /><br />
This code scans for available devices that match a specific UUID, so if you changed it, you should only see your device when running the app.
```js
const device = await navigator.bluetooth.requestDevice({
  filters: [{ services: ['5c1b9a0d-b5be-4a40-8f7a-66b36d0a5176'] }] // CHANGE ME
});
```
<br />
3. In a terminal window, run `npm run serve` to build and run the web app locally. Once the build completes, open a new browser tab or window with the URL specified in the terminal window.
<br />
![](/assets/images/workshops/particle-101/02/vue-serve.png)
<br />
4. Click on the `Scan` button. A pop-up will appear as Chrome scans for devices. Once your device appears, click on it and click the `Pair` button. 

![](/assets/images/workshops/particle-101/02/ble-demo.gif)

In the local app, the screen will update as the connection is made and data is retrieved from the device. As new data is reported to the app from the device, these values will change automatically!

Now that you've explored the ins and outs of Particle, let's go beyond the Particle ecosystem and explore some of the ways that you can integrate with other 3rd party services, and backhaul your data into other cloud services.
