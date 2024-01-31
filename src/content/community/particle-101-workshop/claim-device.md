---
word: Claim a Particle Device
title: Claim Device Lab
columns: two
layout: commonTwo.hbs
---

# Lab 1: Claiming Your Particle Argon

{{box op="start" cssClass="boxed warningBox"}}
This page is no longer maintained and is provided for historical reference only
{{box op="end"}}

| **Project Goal**            | Get your Particle Argon online and claimed to your account                     |
| --------------------------- | --------------------------------------------------------------------------------- |
| **What you’ll learn**       | How to claim a new Particle Argon using a browser and the Particle mobile app. |
| **Tools you’ll need**       | A Particle Argon, USB Cable, and the Particle mobile app for iOS or Android.                |
| **Time needed to complete** | 15 minutes                                                                        |

In this lab, you'll claim your first Particle third generation device, the Argon, with the help of the Particle mobile app. Once you've claimed it, you'll flash some code that blinks an LED on the Argon.

{{box op="start" cssClass="boxed warningBox"}}
**Reminder:** Did you come prepared?</br>
Make sure you have completed **all** the prerequisites before advancing beyond this point.
{{box op="end"}}

## Claim your device

First, you will set up your Argon and claim it to your Particle account. This will allow you to manage your Argon from the Particle Device Cloud. 

1. Open your glorious new Argon Kit. Attach the Wi-Fi antenna to the U.FL connector labeled _WIFI_. Afterwards, use the USB cable to plug the Argon into your computer. This will power-up your device, and you'll see built-in LEDs illuminate and blinking.
![](/assets/images/workshops/particle-101/01/Argon-plugged-in.JPG)
<br />
2. Once the Argon powers up for the first time, it will automatically enter "[listening mode](/tutorials/device-os/led/argon/#listening-mode)" (indicated by the RGB LED blinking blue). This means your device is ready to be claimed.

  If you need to actively put your device in to *Listening Mode*, hold down the `MODE` button for three seconds, until the RGB LED begins blinking blue.
<br /><br />
3. Make sure your phone has Bluetooth turned on. Open the Particle Mobile App and login to your particle account, if you have not already.
![](/assets/images/workshops/particle-101/01/app-login-filled.png)
<br />
4.  On the *Your Devices* screen, click the *+* icon to add a new device. Choose the *Argon or Boron* option.
![](/assets/images/workshops/particle-101/01/app-your-devices-empty.png)
![](/assets/images/workshops/particle-101/01/app-add-device.png)
<br />
5.  The next screen will instruct you to find the data matrix printed on your Argon. Using your phone's camera, scan the code. 
![](/assets/images/workshops/particle-101/01/app-argon-scan-sticker.png)
{{box op="start" cssClass="boxed warningBox"}}
**Note:** Give the app Camera permissions<br/>
Make sure to allow the app to access your camera to complete this step.
{{box op="end"}}
![](/assets/images/workshops/particle-101/01/app-argon-scan-sticker2.png)
![](/assets/images/workshops/particle-101/01/app-argon-get-ready.png)
![](/assets/images/workshops/particle-101/01/app-argon-paired.png)
<br />
6. The app will now use Bluetooth to pair with your device. If this is the first time your Argon is connected, it is probably due for a Device OS update. This is handled automatically by the App — this may take some time, depending on the number of updates pending.
![](/assets/images/workshops/particle-101/01/app-update-device-os.png)
![](/assets/images/workshops/particle-101/01/app-updating-device-os.jpg)
<br />
7. After the update is complete, the <!--Argon will return to listening mode (blinking blue) and the-->app will ask if you want to add the Argon to a mesh network. For now, select *NO, DON'T USE IN MESH*, as you will explore the mesh networking capabilities later on.
![](/assets/images/workshops/particle-101/01/app-argon-use-in-mesh.png)
<br />
8. Connect your device to the cloud, by providing it with Wi-Fi. Select the Wi-Fi you intend to use, and enter the password.
![](/assets/images/workshops/particle-101/01/app-argon-choose-wifi.png)
![](/assets/images/workshops/particle-101/01/app-argon-connecting-to-cloud.png)
<br />
9. When your device has connected successfully, you may give it a name. After that, exit the setup.
![](/assets/images/workshops/particle-101/01/app-argon-give-name.png)
![](/assets/images/workshops/particle-101/01/app-lets-get-building.png)

Congratulations, you've claimed your first Argon. Now, you'll program it to blink an LED.

## Program your device

To program (also commonly called *flashing*) your device, you'll use the [Particle Web IDE](https://build.particle.io/build/)


{{box op="start" cssClass="boxed warningBox"}}
**Tip:** Flashing... what's flashing?<br/>
Flashing is hardware-speak for sending code to a device. For Particle devices, this can be done from the Web IDE, Particle Workbench, or the Command-Line Interface (often abbreviated as CLI).
{{box op="end"}}

1. Go to the [Particle Web IDE](https://build.particle.io/build/) and login if you have not already.
<br />
2. Create a new app by submitting a title (e.g. "blinky") and press enter.
![](/assets/images/workshops/particle-101/01/webide-new-app.png)
<br />
3. You should now have a right-side section (the code pane) with two empty functions declared.
![](/assets/images/workshops/particle-101/01/webide-empty-app.png)
At this point, your goal is now to write code that turns the onboard blue LED on and off every second — a hardware equivalent of the classic "Hello world!"
<br /><br />
4. The physical pin connected to the blue LED is `D7`, you give it a name, so you can call it later on. Do this _above_ the `setup` function.
```cpp
// Blink an LED.
// Declare variables.
int ledPin = D7; // The onboard blue LED is connected to pin D7.
```
<br />
5. You now need to configure this pin as an output to be able to control the voltage (`HIGH` or `LOW`). This is done _inside_ the `setup` function.
```cpp
// Set the pin mode to output, so you may control it.
pinMode(ledPin, OUTPUT);
```
<br />
6. Turn on the LED by setting the pin value to `HIGH`. This is done _inside_ the `loop` function.
```cpp
// Turn on the LED.
digitalWrite(ledPin, HIGH);
```
<br />
7. To keep the LED on for a fixed amount of time before turning it off again, introduce a delay immediately after.
```cpp
// We'll leave it on for 1 second (1000milliseconds).
delay(1000);
```
<br />
8. Now turn the LED off by setting the pin value `LOW`.
```cpp
// Turn off the LED.
digitalWrite(ledPin, LOW);
```
<br />
9. To finalize the code, add a delay after turning the diode off, so it is off for a while, before the loop restarts and turns the diode back on again.
```cpp
// We'll leave it off for 1 second.
delay(1000);
```
The "blinky" code is now complete, and it is time to flash it to your physical device.
<br />
<br />
10. Choose which device to target with this code by clicking the crosshair icon in the left pane.
![](/assets/images/workshops/particle-101/01/webide-devices.png)
<br />
11. Your Argon should be in the list, if you have claimed it successfully. If it is online it will have a *breathing* cyan circle right of its name.
<br /><br />
If this is your first device, it will be selected automatically and you can flash code to it by clicking the lightning bolt icon.
<br /><br />
If you have other Particle devices associated to your account, click the star icon next to your new device to select it. Then, click the lightning bolt icon to flash.
    ![](/assets/images/workshops/particle-101/01/webide-device-list.png)

... and that's how you get to blinky!

{{box op="start" cssClass="boxed warningBox"}}
**Tip:** See all the code in one place<br />
You can find the final code for this lab [right here](https://go.particle.io/shared_apps/5bfefd038bf964af88000409).
{{box op="end"}}