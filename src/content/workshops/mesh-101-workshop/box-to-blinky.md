---
word: From Box to Blinky
title: From Box to Blinky
order: 4
columns: two
layout: workshops.hbs
---

# Get your device running some code

In this lab, you'll claim your first Particle Mesh device, the Argon, with the help of the Particle mobile app. Once you've claimed it, you'll flash some code that blinks an LED on the Argon.

::: tip Do you come prepared?
Make sure you have completed **all** the [preparations](prerequisites.md) before advancing beyond this point.
:::

## Claim your device

Now you will set up your Argon and claim it to your Particle account.

1. Open your glorious new Argon Kit. Click on the Wi-Fi antenna to the u.fl. connector labeled _WIFI_. Afterwards, use the USB cable to plug the Argon into your computer. This should power up your device.

![](./images/01/Argon-plugged-in.jpg)

2. Once the Argon powers up for the first time, it will automatically enter "[listening mode](https://docs.particle.io/tutorials/device-os/led/argon/#listening-mode)" (indicated by the RGB LED blinking blue), which means it's ready to be claimed. If you need to actively put your device in to "Listening Mode", hold down the `MODE` button for three seconds, until the RGB LED begins blinking blue.

3. Make sure your phone has Bluetooth turned on. Open the Particle Mobile App and login to your particle account, if you have not already.

![](./images/01/app-login-filled.jpg)

4.  On the "Your Devices" screen, click the "+" icon to add a new device.

<img src="./images/01/app-your-devices-empty.jpg" class="two-per-line" />
<img src="./images/01/app-add-device.jpg" class="two-per-line" />

5.  Select the "Mesh" option and choose the "Argon" option.

![](./images/01/app-choose-mesh-device.jpg)

6.  The next screen will instruct you to find the data matrix printed on your Argon and scan it with your Phone's camera. Make sure to allow the app to access your camera to complete this step.

<img src="./images/01/app-argon-get-ready.jpg" class="two-per-line" />
<img src="./images/01/app-argon-scan-sticker.jpg" class="two-per-line" />

7. The app will now use Bluetooth to pair with your device. If this is the first time your Argon is connected, it is probably due for a device OS update. This is handled automatically by the App. this may take some time, depending on the number of updates pending.

<img src="./images/01/app-update-device-os.jpg" class="two-per-line" />
<img src="./images/01/app-updating-device-os.jpg" class="two-per-line" />

8. After the update is complete the <!--Argon will return to listening mode (blinking blue) and the-->app will ask if you want to add the Argon to a mesh network. For now, select _NO, DON'T USE IN MESH_, as we will will explore the mesh networking capabilities later on.

![](./images/01/app-argon-use-in-mesh.jpg)

9. Conecct your device to the cloud, by providing it with wifi. Select the WiFi you intend to use, and enter the password.

<img src="./images/01/app-argon-choose-wifi.jpg" class="two-per-line" />
<img src="./images/01/app-argon-connecting-to-cloud.jpg" class="two-per-line" />

10. When your device has connected successfully, you may give it a name. After that, exit the setup.

<img src="./images/01/app-argon-give-name.jpg" class="two-per-line" />
<img src="./images/01/app-lets-get-building.jpg" class="two-per-line" />

Congratulations, you've claimed your first Argon. Now, you'll program it to blink an LED.

## Program your device

You will now flash firmware (hardware speak for sending code to a device) from the [Particle Web IDE](https://build.particle.io/build/)

1. Go to the [Particle Web IDE](https://build.particle.io/build/) and login if you have not already.

2. Create a new app by submitting a title (e.g. "blinky") and press enter.

![](./images/01/webide-new-app.png)

3. You should now have a right-side section (the code pane) with two empty functions declared.

![](./images/01/webide-empty-app.png)

The goal is now to write code that turns the onboard blue LED on and off every second - a hardware equivalent of the classic "Hello world!".

4. The physical pin connected to the blue LED is `D7`, we give it a name, so we can call it later on. Do this _above_ the `setup` function.

```cpp
// Blink an LED.
// Declare variables.
int ledPin = D7; // The onboard blue LED is connected to pin D7.
```

5. We now need to configure this pin as an output to be able to control the voltage (`HIGH` or `LOW`). This is done _inside_ the `setup` function.

```cpp
// Set the pin mode to output, so we may control it.
pinMode(ledPin, OUTPUT);
```

6. Turn on the LED by setting the pin value to `HIGH`. This is done _inside_ the `loop` function.

```cpp
// Turn on the LED.
digitalWrite(ledPin, HIGH);
```

7. To keep the LED on for a fixed amount of time before turning it off again, introduce a delay immediately after.

```cpp
// We'll leave it on for 1 second (1000milliseconds).
delay(1000);
```

8. Now turn the LED off by setting the pin value `LOW`.

```cpp
// Turn off the LED.
digitalWrite(ledPin, LOW);
```

9. To finalize the code, add a delay after turning the diode off, so it is off for a while, before the loop restarts and turns the diode back on again.

```cpp
// We'll leave it off for 1 second.
delay(1000);
```

The "blinky" code is now complete, and it is time to flash it to your physical device.

10. Choose which device to target with this code by clicking the crosshair icon in the left pane.

![](./images/01/webide-devices.png)

11. Your Argon should be on the list, if you have claimed it successfully. If it is online it will have a "breathing" cyan circle right of its name.
    ![](./images/01/webide-device-list.png)

...and that's how you get to blinky!

::: tip Got stuck in the code?
The final code for this lab is [available here](https://go.particle.io/shared_apps/5bfefd038bf964af88000409).
:::
