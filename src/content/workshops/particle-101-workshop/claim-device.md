---
word: Claim a Particle Device
title: Claim Device Lab
order: 4
columns: two
layout: workshops.hbs
---

# Lab 1: Claiming Your Particle Argon

| **Project Goal**            | Get your Particle Argon online and claimed to your account                     |
| --------------------------- | --------------------------------------------------------------------------------- |
| **What you’ll learn**       | How to claim a new Particle Argon using a browser and the Particle mobile app. |
| **Tools you’ll need**       | A Particle Argon, USB Cable, and the Particle mobile app for iOS or Android.                |
| **Time needed to complete** | 15 minutes                                                                        |

In this lab, you'll claim your first Particle 3rd generation device, the Argon, with the help of the Particle mobile app. Once you've claimed it, you'll flash some code that blinks an LED on the Argon.

{{box op="start" cssClass="boxed warningBox"}}
**Did you come prepared?**</br>
Make sure you have completed **all** the prerequisites before advancing beyond this point.
{{box op="end"}}

## Claim your device

First, you will set up your Argon and claim it to your Particle account.

1. Open your glorious new Argon Kit. Attach the Wi-Fi antenna to the u.fl connector labeled _WIFI_. Afterwards, use the USB cable to plug the Argon into your computer. This should power up your device; you'll see LEDs illuminate and bliniking.
![](/assets/images/workshops/particle-101/01/Argon-plugged-in.jpg)
2. Once the Argon powers up for the first time, it will automatically enter "[listening mode](https://docs.particle.io/tutorials/device-os/led/argon/#listening-mode)" (indicated by the RGB LED blinking blue). This means your device is ready to be claimed.

  If you need to actively put your device in to "Listening Mode", hold down the `MODE` button for three seconds, until the RGB LED begins blinking blue.

3. Make sure your phone has Bluetooth turned on. Open the Particle Mobile App and login to your particle account, if you have not already.
![](/assets/images/workshops/particle-101/01/app-login-filled.png)
4.  On the "Your Devices" screen, click the "+" icon to add a new device. Choose the "Argon/Boron/Xenon" option.
![](/assets/images/workshops/particle-101/01/app-your-devices-empty.png)
![](/assets/images/workshops/particle-101/01/app-add-device.png)
5.  The next screen will instruct you to find the data matrix printed on your Argon. Using your phone's camera, scan the code. 
{{box op="start" cssClass="boxed warningBox"}}
**Give the app Camera permissions** <br/>
Make sure to allow the app to access your camera to complete this step.
{{box op="end"}}
![](/assets/images/workshops/particle-101/01/app-argon-scan-sticker.png)
![](/assets/images/workshops/particle-101/01/app-argon-scan-sticker2.png)
![](/assets/images/workshops/particle-101/01/app-argon-get-ready.png)
![](/assets/images/workshops/particle-101/01/app-argon-paired.png)
6. The app will now use Bluetooth to pair with your device. If this is the first time your Argon is connected, it is probably due for a device OS update. This is handled automatically by the App — this may take some time, depending on the number of updates pending.
![](/assets/images/workshops/particle-101/01/app-update-device-os.png)
![](/assets/images/workshops/particle-101/01/app-updating-device-os.jpg)
7. After the update is complete, the <!--Argon will return to listening mode (blinking blue) and the-->app will ask if you want to add the Argon to a mesh network. For now, select "_NO, DON'T USE IN MESH_," as you will explore the mesh networking capabilities later on.
![](/assets/images/workshops/particle-101/01/app-argon-use-in-mesh.png)
8. Conecct your device to the cloud, by providing it with Wi-Fi. Select the Wi-Fi you intend to use, and enter the password.
![](/assets/images/workshops/particle-101/01/app-argon-choose-wifi.png)
![](/assets/images/workshops/particle-101/01/app-argon-connecting-to-cloud.png)
9. When your device has connected successfully, you may give it a name. After that, exit the setup.
![](/assets/images/workshops/particle-101/01/app-argon-give-name.png)
![](/assets/images/workshops/particle-101/01/app-lets-get-building.png)

Congratulations, you've claimed your first Argon. Now, you'll program it to blink an LED.

## Program your device

To program (aka flash) your device, you'll use the [Particle Web IDE](https://build.particle.io/build/)



{{box op="start" cssClass="boxed warningBox"}}
**Flashing... what's flashing?** <br/>
Flashing is hardware-speak for sending code to a device. For Particle devices, this can be done from the Web IDE, Particle Workbench, or the Command-Line Interface (often abbreviated as CLI).
{{box op="end"}}

1. Go to the [Particle Web IDE](https://build.particle.io/build/) and login if you have not already.

2. Create a new app by submitting a title (e.g. "blinky") and press enter.
![](/assets/images/workshops/particle-101/01/webide-new-app.png)
3. You should now have a right-side section (the code pane) with two empty functions declared.
![](/assets/images/workshops/particle-101/01/webide-empty-app.png)
At this point, your goal is now to write code that turns the onboard blue LED on and off every second — a hardware equivalent of the classic "Hello world!".

4. The physical pin connected to the blue LED is `D7`, you give it a name, so you can call it later on. Do this _above_ the `setup` function.
```cpp
// Blink an LED.
// Declare variables.
int ledPin = D7; // The onboard blue LED is connected to pin D7.
```
5. You now need to configure this pin as an output to be able to control the voltage (`HIGH` or `LOW`). This is done _inside_ the `setup` function.
```cpp
// Set the pin mode to output, so you may control it.
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
![](/assets/images/workshops/particle-101/01/webide-devices.png)
11. Your Argon should be in the list, if you have claimed it successfully. If it is online it will have a "breathing" cyan circle right of its name. If this is your first device, it will be selected automatically and you can flash code to it by clicking the lightning bolt icon. If you have other Particle devices associated to your account, click the star icon next to your new device to select it. Then, click the lightning bolt icon to flash.
    ![](/assets/images/workshops/particle-101/01/webide-device-list.png)

... and that's how you get to blinky!

{{box op="start" cssClass="boxed warningBox"}}
**Got stuck?**</br>
The final code for this lab is [available here](https://go.particle.io/shared_apps/5bfefd038bf964af88000409).
{{box op="end"}}
