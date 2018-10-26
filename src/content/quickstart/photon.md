---
title: Photon
layout: quickstart.hbs
columns: two
order: 6
---

## What's in the box
![](/assets/images/photon-kit-new.jpg)
<p class="caption">Your new Photon! Note that many components pictured will only be included if you purchased a Photon Kit.</p>



Congratulations on being the owner of a brand new Particle Device! Go ahead and open the box. You can see the different [kit addons](https://docs.particle.io/datasheets/kits) and check out the [Photon datasheet](https://docs.particle.io/datasheets/photon-datasheet/) if you like!

If you have an Internet Button, read through this section to get started and connect your device, then hop over to the [Internet Button tutorial](https://docs.particle.io/guide/tools-and-features/button/) for more detailed info.

Let's quickly go over what you see.

### What's on it?
#### The Wi-Fi module

This is probably why you bought your device-- the Wi-Fi module allows your Photon to communicate with the internet. It connects your device to the internet in the same way that your smartphone might connect to a wifi network. **Do not press down on the Photon's module. Doing so triggers a reset and is generally not good for the Photon.**

#### The microcontroller

The microcontroller is the brain of your device. It runs your software and tells your prototype what to do. Unlike your computer, it can only run one application (often called _firmware_ or an _embedded application_). This application can be simple (just a few lines of code), or very complex, depending on what you want to do. The microcontroller interacts with the outside world using pins.

#### The pins

Pins are the input and output parts of the microcontroller that are exposed on the sides of your device. GPIO pins can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and buzzers to act upon the world. There are also pins to allow you to power your device, or power motors and outputs outside of your device. There are pins for Serial/UART communication, and a pin for resetting your device.

#### Buttons & LEDs

There are several awesome buttons and LEDs on your Photon to make it easier to use.

The SETUP button is on the left and the RESET button is on the right. You can use these buttons to help you set your device's mode.
The RGB LED is in the center of your Photon, above the module. The color of the RGB LED tells you what mode your Photon is currently in.
The D7 LED is next to the D7 pin on your Photon, on the upper right quadrant. This LED will turn on when the D7 pin is set to HIGH.
* **Software**
  * Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-iot-projects-wifi-or-cellular/id991459054?mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app)
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android or Windows smartphone
* **Wi-Fi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcast SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP Wi-Fi settings, for security reasons.*
* **Experience**
    * None! This is your first project.


## Connect Your Photon
In this example, we will connect your device to the internet for the very first time. Then, we will blink the D7 LED on your device by using your smartphone.

<iframe src="https://player.vimeo.com/video/178282058" width="320" height="240" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Step 1: Power On Your Device
![plug in your device!](/assets/images/photon-plugged-in.jpg)

Plug the USB cable into your power source. <span class="footnoteLink">(Your computer works perfectly for this purpose.)<span class="footnote">Your Particle device does not need your computer to connect to wifi. You could just as easily power your device with a power brick, a battery shield, or another power source wired to the VIN pin.</span></span></p>
<p>As soon as it is plugged in, the RGB LED on your device should begin <span class="popupLink">blinking blue.<span class="popup"><iframe src="https://vine.co/v/eZUH7WaWjMT/embed/simple" width="320" height="320" frameborder="0"></iframe></span></span></p>
<p>If your device is not blinking blue, <span class="popupLink">hold down the SETUP button.<span class="popup"><iframe src="https://vine.co/v/eZUHUIjq7pO/embed/simple" width="320" height="320" frameborder="0"></iframe></span></span></p>
<p>If your device is not blinking at all, or if the LED is burning a dull orange color, it may not be getting enough power. Try changing your power source or USB cable.</p>

### Step 2a: Connect your Photon to the Internet using the setup web application
<p>
<ul>
<li><strong>Step 1</strong> Go to <a href="https://setup.particle.io" target="_blank" rel="noopener noreferrer">setup.particle.io</a></li>
<li><strong>Step 2</strong> Click on <code>Setup a Photon</code></li>
<li><strong>Step 3</strong> After clicking on <code>NEXT</code>, you should be presented with a file (<code>photonsetup.html</code>)</li>
<li><strong>Step 4</strong> Open the file</li>
</ul>
<p>After opening the file:</p>
<ul>
<li><strong>Step 5</strong> Connect your PC to the Photon, by connecting to the network named <code>PHOTON-...</code></li>
<li><strong>Step 6</strong> Configure your Wi-Fi credentials</li>
</ul>
<p><em>Note: If you mistyped your credentials, the Photon will blink dark blue or green. You have to go through the process again (by refreshing the page or clicking on the retry process part)</em></p>
<ul>
<li><strong>Step 7</strong> Rename your device. You will also see a confirmation if the device was claimed or not</li>
</ul>
<p><em>Note: Make sure your Photon is not part of a product before claiming it</em></p>
<h4 id="why-a-separate-file-">Why a separate file?<a href="#why-a-separate-file-" class="header-permalinks"><i class="ion-link"></i></a></h4><p>We care a lot about security, and we want to make sure that everything you do is safe. Downloading a local file ensures that the credentials are sent directly to the Photon, without any chance of being intercepted.</p>
<h3 id="step-2b-connect-your-photon-to-the-internet-using-your-smartphone">Step 2b: Connect your Photon to the Internet using your smartphone<a href="#step-2b-connect-your-photon-to-the-internet-using-your-smartphone" class="header-permalinks"><i class="ion-link"></i></a></h3><p>Open the app on your phone. Log in or sign up for an account with Particle if you don&apos;t have one.</p>
<p>Press the plus icon and select the device you&apos;d like to add. Then follow the instructions on the screen to <span class="footnoteLink">connect your device to Wi-Fi.<span class="footnote">Your device remembers up to 5 wifi networks, and it will connect to these automatically if it can find them.</span></span></p>
<p>This may take a little while - but don&apos;t worry.</p>
<p> If this is your Photon&apos;s first time connecting, it will blink purple for a few minutes as it downloads updates. <strong>This is perfectly normal.</strong> It may take 6-12 minutes for the updates to complete, depending on your internet connection, with the Photon restarting a few times in the process. <strong>Please do not restart or unplug your Photon during this time.</strong> If you do, you may need to follow <a href="http://community.particle.io/t/photon-troubleshooting-guide-as-of-firmware-v0-4-5/16042" target="_blank" rel="noopener noreferrer">this guide</a> to fix your device. </p>
<p>Once you have connected your device, it has learned that network. Your device can store up to  five networks. To add a new network after your initial setup, you&apos;d put your device into <span class="popupLink">Listening Mode<span class="popup"><iframe src="https://vine.co/v/eZUH7WaWjMT/embed/simple" width="320" height="320" frameborder="0"></iframe></span></span> again and proceed as above (the claiming part can be skipped). If you feel like your device has too many networks on it, you can wipe your device&apos;s memory of any Wi-Fi networks it has learned. You can do so by continuing to hold the <code>SETUP</code> button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.</p>

<h3 id="step-3-blink-an-led-">Step 3: Blink an LED!<a href="#step-3-blink-an-led-" class="header-permalinks"><i class="ion-link"></i></a></h3><p>The Particle App should now be on the <span class="footnoteLink">Tinker<span class="footnote">We have taken the liberty of loading some firmware onto your device for you. It is called Tinker, and it helps you talk to your device by sending power to the pins and reading power levels from the pins. More info about Tinker is available <a href="/tutorials/developer-tools/tinker/photon">here</a>.</span></span> screen, as shown below.</p>
<p><img src="/assets/images/tinker.png" alt="Tinker on your Phone!"></p>
<p>As you can see on your smartphone, the circles represent different pins on your device. If you tap on these circles, you can see the Tinker functions available for the associated pins.</p>
<p>We could use Tinker and the smartphone app to talk to any pin on your device. If you had a buzzer, an LED, a sensor, etc., you could interact with it using Tinker on your phone. But since I know you&apos;re very eager to get started, let&apos;s use an LED already provided on your device.</p>
<p>The D7 pin comes already wired to a small blue LED on the face of your device. When you set the power of the D7 pin to high, this LED turns on. Let&apos;s do that now.</p>
<p>Tap <code>D7</code> then <code>digitalWrite</code> in the popup. Now when you tap the D7 circle the tiny blue LED should turn off or on!</p>
<p><strong>Congratulations, you just blinked an LED over the internet, using your Particle device!</strong></p>


## Hardware examples
<p>
Here you will find a bunch of examples to get you started with your new Particle device! The diagrams here show the Photon, but these examples will work with either the Photon or the Core.</p>
<p>These examples are also listed in the online IDE in the Code menu.</p>
<p>To complete all the examples, you will need the following materials:</p>
<h4 id="materials">Materials<a href="#materials" class="header-permalinks"><i class="ion-link"></i></a></h4><ul>
<li><strong>Hardware</strong><ul>
<li>Your Particle device</li>
<li>USB to micro USB cable </li>
<li>Power source for USB cable (such as your computer, USB battery, or power brick)</li>
<li>(2) Resistors between 220 Ohms and 1000 Ohms </li>
<li>(1) LED, any color </li>
<li>(1) Photoresistor </li>
</ul>
</li>
</ul>
<ul>
<li><strong>Software</strong><ul>
<li>The <a href="http://build.particle.io" target="_blank" rel="noopener noreferrer">online IDE</a></li>
<li>or the local <a href="http://particle.io/dev" target="_blank" rel="noopener noreferrer">Particle Dev</a></li>
</ul>
</li>
<li><strong>Experience</strong><ul>
<li><a href="/quickstart/photon">Connecting your Device</a> </li>
</ul>
</li>
</ul>



<h2>1. Blink an LED</h2>


<p>Blinking an LED is the <a href="http://en.wikipedia.org/wiki/Hello_world_program" target="_blank" rel="noopener noreferrer">&quot;Hello World&quot;</a> example of the microcontroller universe. It&apos;s a nice way to warm up and start your journey into the land of embedded hardware.</p>
<h3 id="setup">Setup<a href="#setup" class="header-permalinks"><i class="ion-link"></i></a></h3><p>Connect everything together as shown in the image below. The negative (shorter) pin of the LED is connected to ground via a resistor and the positive (longer) pin is connected to D0.</p>
<p>  <img src="/assets/images/photon-led-fritzing.png" alt="One LED illustration"></p>
<p>Next, we&apos;re going to load code onto your device. Copy and paste this code into a new application on <a href="http://build.particle.io" target="_blank" rel="noopener noreferrer">http://build.particle.io</a> or on Particle Dev. We&apos;ve heavily commented this code so that you can see what is going on in each line.</p>
<p>Go ahead and save this application, then flash it to your . You should be able to see that LED blinking away!</p>
<p><em>(In case you wonder how the pretty wiring diagram above was made, check out <a href="http://fritzing.org/" target="_blank" rel="noopener noreferrer">Fritzing</a> and the <a href="https://github.com/particle-iot/hardware-libraries" target="_blank" rel="noopener noreferrer">Particle Fritzing parts library</a>)</em></p>
<h3 id="code">Code<a href="#code" class="header-permalinks"><i class="ion-link"></i></a></h3><pre><code class="lang-cpp" data-firmware-example-code-block="true">
// ------------
// Blink an LED
// ------------

/*-------------

We&apos;ve heavily commented this code for you. If you&apos;re a pro, feel free to ignore it.

Comments start with two slashes or are blocked off by a slash and a star.
You can read them, but your device can&apos;t.
It&apos;s like a secret message just for you.

Every program based on Wiring (programming language used by Arduino, and Particle devices) has two essential parts:
setup - runs once at the beginning of your program
loop - runs continuously over and over

You&apos;ll see how we use these in a second.

This program will blink an led on and off every second.
It blinks the D7 LED on your Particle device. If you have an LED wired to D0, it will blink that LED as well.

-------------*/


// First, we&apos;re going to make some variables.
// This is our &quot;shorthand&quot; that we&apos;ll use throughout the program:

int led1 = D0; // Instead of writing D0 over and over again, we&apos;ll write led1
// You&apos;ll need to wire an LED to this one to see it blink.

int led2 = D7; // Instead of writing D7 over and over again, we&apos;ll write led2
// This one is the little blue LED on your board. On the Photon it is next to D7, and on the Core it is next to the USB jack.

// Having declared these variables, let&apos;s move on to the setup function.
// The setup function is a standard part of any microcontroller program.
// It runs only once when the device boots up or is reset.

void setup() {

  // We are going to tell our device that D0 and D7 (which we named led1 and led2 respectively) are going to be output
  // (That means that we will be sending voltage to them, rather than monitoring voltage that comes from them)

  // It&apos;s important you do this here, inside the setup() function rather than outside it or in the loop function.

  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);

}

// Next we have the loop function, the other essential part of a microcontroller program.
// This routine gets repeated over and over, as quickly as possible and as many times as possible, after the setup function is called.
// Note: Code that blocks for too long (like more than 5 seconds), can make weird things happen (like dropping the network connection).  The built-in delay function shown below safely interleaves required background activity, so arbitrarily long delays can safely be done if you need them.

void loop() {
  // To blink the LED, first we&apos;ll turn it on...
  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);

  // We&apos;ll leave it on for 1 second...
  delay(1000);

  // Then we&apos;ll turn it off...
  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);

  // Wait 1 second...
  delay(1000);

  // And repeat!
}

</code></pre>

<div style="display: none;" id="control-led-over-the-net" data-firmware-example-url="https://docs.particle.io/tutorials/getting-started/examples/photon/#control-leds-over-the-39-net" data-firmware-example-title="Web-Connected LED" data-firmware-example-description="Control an LED over the Internet"></div>

<h2 id="control-leds-over-the-39-net">2. Control LEDs remotely<a href="#control-leds-over-the-39-net" class="header-permalinks"><i class="ion-link"></i></a></h2><h3 id="intro-1">Intro<a href="#intro-1" class="header-permalinks"><i class="ion-link"></i></a></h3><p>Now that we know how to blink an LED, how about we control it over the Internet? This is where the fun begins.</p>
<p>We&apos;ve heavily commented the code below so that you can see what&apos;s going on. Basically, we are going to:</p>
<ul>
<li>Set up the pins as outputs that have LEDs connected to them</li>
<li>Create and register a Particle function (this gets called automagically when you make an API request to it)</li>
<li>Parse the incoming command and take appropriate actions</li>
</ul>
<h3 id="setup-1">Setup<a href="#setup-1" class="header-permalinks"><i class="ion-link"></i></a></h3><p>As in the previous example, connect everything together as shown in the image below. The negative (shorter) pin of the LED is connected to ground via a resistor and the positive (longer) pin is connected to D0.</p>
<p>  <img src="/assets/images/photon-led-fritzing.png" alt="One LED illustration"></p>
<h3 id="code-1">Code<a href="#code-1" class="header-permalinks"><i class="ion-link"></i></a></h3><pre><code class="lang-cpp" data-firmware-example-code-block="true">
// -----------------------------------
// Controlling LEDs over the Internet
// -----------------------------------

/* First, let&apos;s create our &quot;shorthand&quot; for the pins
Same as in the Blink an LED example:
led1 is D0, led2 is D7 */

int led1 = D0;
int led2 = D7;

// Last time, we only needed to declare pins in the setup function.
// This time, we are also going to register our Particle function

void setup()
{

   // Here&apos;s the pin configuration, same as last time
   pinMode(led1, OUTPUT);
   pinMode(led2, OUTPUT);

   // We are also going to declare a Particle.function so that we can turn the LED on and off from the cloud.
   Particle.function(&quot;led&quot;,ledToggle);
   // This is saying that when we ask the cloud for the function &quot;led&quot;, it will employ the function ledToggle() from this app.

   // For good measure, let&apos;s also make sure both LEDs are off when we start:
   digitalWrite(led1, LOW);
   digitalWrite(led2, LOW);

}


/* Last time, we wanted to continously blink the LED on and off
Since we&apos;re waiting for input through the cloud this time,
we don&apos;t actually need to put anything in the loop */

void loop()
{
   // Nothing to do here
}

// We&apos;re going to have a super cool function now that gets called when a matching API request is sent
// This is the ledToggle function we registered to the &quot;led&quot; Particle.function earlier.

int ledToggle(String command) {
    /* Particle.functions always take a string as an argument and return an integer.
    Since we can pass a string, it means that we can give the program commands on how the function should be used.
    In this case, telling the function &quot;on&quot; will turn the LED on and telling it &quot;off&quot; will turn the LED off.
    Then, the function returns a value to us to let us know what happened.
    In this case, it will return 1 for the LEDs turning on, 0 for the LEDs turning off,
    and -1 if we received a totally bogus command that didn&apos;t do anything to the LEDs.
    */

    if (command==&quot;on&quot;) {
        digitalWrite(led1,HIGH);
        digitalWrite(led2,HIGH);
        return 1;
    }
    else if (command==&quot;off&quot;) {
        digitalWrite(led1,LOW);
        digitalWrite(led2,LOW);
        return 0;
    }
    else {
        return -1;
    }
}

</code></pre>

<h3 id="use">Use<a href="#use" class="header-permalinks"><i class="ion-link"></i></a></h3><p>When we register a function or variable, we&apos;re basically making a space for it on the internet, similar to the way there&apos;s a space for a website you&apos;d navigate to with your browser. Thanks to the REST API, there&apos;s a specific address that identifies you and your device. You can send requests, like <code>GET</code> and <code>POST</code> requests, to this URL just like you would with any webpage in a browser.</p>
<p>Remember the last time you submitted a form online? You may not have known it, but the website probably sent a <code>POST</code> request with the info you put in the form over to another URL that would store your data. We can do the same thing to send information to your device, telling it to turn the LED on and off.</p>
<p>Use the following to view your page:</p>
<pre><code>/* Paste the code between the dashes below into a .txt file and save it as an .html file. Replace your-device-ID-goes-here with your actual device ID and your-access-token-goes-here with your actual access token.

---------------------------
&lt;!-- Replace your-device-ID-goes-here with your actual device ID
and replace your-access-token-goes-here with your actual access token--&gt;
&lt;!DOCTYPE&gt;
&lt;html&gt;
  &lt;body&gt;
  &lt;center&gt;
  &lt;br&gt;
  &lt;br&gt;
  &lt;br&gt;
  &lt;form action=&quot;https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here&quot; method=&quot;POST&quot;&gt;
    Tell your device what to do!&lt;br&gt;
    &lt;br&gt;
    &lt;input type=&quot;radio&quot; name=&quot;arg&quot; value=&quot;on&quot;&gt;Turn the LED on.
    &lt;br&gt;
    &lt;input type=&quot;radio&quot; name=&quot;arg&quot; value=&quot;off&quot;&gt;Turn the LED off.
    &lt;br&gt;
    &lt;br&gt;
    &lt;input type=&quot;submit&quot; value=&quot;Do it!&quot;&gt;
  &lt;/form&gt;
  &lt;/center&gt;
  &lt;/body&gt;
&lt;/html&gt;
---------------------------
*/
</code></pre><p>Edit the code in your text file so that &quot;your-device-ID-goes-here&quot; is your actual device ID, and &quot;your-access-token-goes-here&quot; is your actual access token. These things are accessible through your IDE at <a href="http://build.particle.io" target="_blank" rel="noopener noreferrer">build.particle.io</a>. Your device ID can be found in your Devices drawer (the crosshairs) when you click on the device you want to use, and your access token can be found in settings (the cogwheel).</p>
<p>Open that <code>.html</code> file in a browser. You&apos;ll see a very simple HTML form that allows you to select whether you&apos;d like to turn the LED on or off.</p>
<p>When you click &quot;Do it!&quot; you are posting information to the URL <code>https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here</code>. The information you give is the <code>args</code>, or argument value, of <code>on</code> or <code>off</code>. This hooks up to your <code>Particle.function</code> that we registered with the cloud in our firmware, which in turn sends info to your device to turn the LED on or off.</p>
<p>You&apos;ll get some info back after you submit the page that gives the status of your device and lets you know that it was indeed able to post to the URL. If you want to go back, just click &quot;back&quot; on your browser.</p>
<p>If you are using the command line, you can also turn the LED on and off by typing:</p>
<p><code>particle call device_name led on</code></p>
<p>and</p>
<p><code>particle call device_name led off</code></p>
<p>Remember to replace <code>device_name</code> with either your device ID or the nickname you made for your device when you set it up.</p>
<p>This does the same thing as our HTML page, but with a more slick interface.</p>
<p>The API request will look something like this:</p>
<pre><code class="lang-json">POST /v1/devices/{DEVICE_ID}/led

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef
# Your access token is 123412341234
curl https://api.particle.io/v1/devices/0123456789abcdef/led \
  -d access_token=123412341234 \
  -d arg=on
</code></pre>
<p>Note that the API endpoint is &apos;led&apos;, not &apos;ledToggle&apos;. This is because the endpoint is defined by the first argument of <a href="/reference/device-os/firmware/#particle-function-">Particle.function()</a>, which is a string of characters, rather than the second argument, which is a function.</p>
<p>To better understand the concept of making API calls to your device over the cloud checkout the <a href="/reference/api">Cloud API reference.</a></p>
<div style="display: none;" id="variables-and-functions-with-photoresistors" data-firmware-example-url="https://docs.particle.io/tutorials/getting-started/examples/photon/#read-your-photoresistor-function-and-variable" data-firmware-example-title="Function Variable" data-firmware-example-description="Learn about Variables and Functions using Photoresistors"></div>




<h2 id="read-your-photoresistor-function-and-variable">3. Read your Photoresistor<a href="#read-your-photoresistor-function-and-variable" class="header-permalinks"><i class="ion-link"></i></a></h2><h3 id="intro-2">Intro<a href="#intro-2" class="header-permalinks"><i class="ion-link"></i></a></h3><p>This example uses the same setup as the LED control example to make a <code>Particle.function</code>. This time, though, we&apos;re going to add a sensor.</p>
<p>We will get a value from a photoresistor and store it in the cloud.</p>
<p>Paste the following code into your IDE, or just access the examples on the left hand menu bar in the online IDE.</p>
<h3 id="setup-2">Setup<a href="#setup-2" class="header-permalinks"><i class="ion-link"></i></a></h3><p>Set up your breadboard as shown in the image below:
<img src="/assets/images/photon-photoresistor-fritzing.png" alt="Fritzing Diagram"></p>
<p>Make sure that the short leg of the LED is plugged into <code>GND</code>. The other orientations do not matter.</p>
<p>Bend the LED and the Photoresistor so that they are pointing at each other. (You want the LED, when turned on, to shine its beam of light directly at the photoresistor.)</p>
<h3 id="code-2">Code<a href="#code-2" class="header-permalinks"><i class="ion-link"></i></a></h3><p>Copy and paste the following code into your <a href="http://build.particle.io" target="_blank" rel="noopener noreferrer">online IDE</a> or <a href="http://particle.io/dev" target="_blank" rel="noopener noreferrer">Particle Dev</a> environment.</p>
<pre><code class="lang-cpp" data-firmware-example-code-block="true">
// -----------------------------------------
// Function and Variable with Photoresistors
// -----------------------------------------
// In this example, we&apos;re going to register a Particle.variable() with the cloud so that we can read brightness levels from the photoresistor.
// We&apos;ll also register a Particle.function so that we can turn the LED on and off remotely.

// We&apos;re going to start by declaring which pins everything is plugged into.

int led = D0; // This is where your LED is plugged in. The other side goes to a resistor connected to GND.

int photoresistor = A0; // This is where your photoresistor is plugged in. The other side goes to the &quot;power&quot; pin (below).

int power = A5; // This is the other end of your photoresistor. The other side is plugged into the &quot;photoresistor&quot; pin (above).
// The reason we have plugged one side into an analog pin instead of to &quot;power&quot; is because we want a very steady voltage to be sent to the photoresistor.
// That way, when we read the value from the other side of the photoresistor, we can accurately calculate a voltage drop.

int analogvalue; // Here we are declaring the integer variable analogvalue, which we will use later to store the value of the photoresistor.


// Next we go into the setup function.

void setup() {

    // First, declare all of our pins. This lets our device know which ones will be used for outputting voltage, and which ones will read incoming voltage.
    pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
    pinMode(photoresistor,INPUT);  // Our photoresistor pin is input (reading the photoresistor)
    pinMode(power,OUTPUT); // The pin powering the photoresistor is output (sending out consistent power)

    // Next, write one pin of the photoresistor to be the maximum possible, so that we can use this for power.
    digitalWrite(power,HIGH);

    // We are going to declare a Particle.variable() here so that we can access the value of the photoresistor from the cloud.
    Particle.variable(&quot;analogvalue&quot;, &amp;analogvalue, INT);
    // This is saying that when we ask the cloud for &quot;analogvalue&quot;, this will reference the variable analogvalue in this app, which is an integer variable.

    // We are also going to declare a Particle.function so that we can turn the LED on and off from the cloud.
    Particle.function(&quot;led&quot;,ledToggle);
    // This is saying that when we ask the cloud for the function &quot;led&quot;, it will employ the function ledToggle() from this app.

}


// Next is the loop function...

void loop() {

    // check to see what the value of the photoresistor is and store it in the int variable analogvalue
    analogvalue = analogRead(photoresistor);
    delay(100);

}


// Finally, we will write out our ledToggle function, which is referenced by the Particle.function() called &quot;led&quot;

int ledToggle(String command) {

    if (command==&quot;on&quot;) {
        digitalWrite(led,HIGH);
        return 1;
    }
    else if (command==&quot;off&quot;) {
        digitalWrite(led,LOW);
        return 0;
    }
    else {
        return -1;
    }

}

</code></pre>

<h3 id="use-1">Use<a href="#use-1" class="header-permalinks"><i class="ion-link"></i></a></h3><p>Just like with our earlier example, we can toggle our LED on and off by creating an HTML page:</p>
<pre><code>/* Paste the code between the dashes below into a .txt file and save it as an .html file. Replace your-device-ID-goes-here with your actual device ID and your-access-token-goes-here with your actual access token.

---------------------------
&lt;!-- Replace your-device-ID-goes-here with your actual device ID
and replace your-access-token-goes-here with your actual access token--&gt;
&lt;!DOCTYPE&gt;
&lt;html&gt;
  &lt;body&gt;
  &lt;center&gt;
  &lt;br&gt;
  &lt;br&gt;
  &lt;br&gt;
  &lt;form action=&quot;https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here&quot; method=&quot;POST&quot;&gt;
    Tell your device what to do!&lt;br&gt;
    &lt;br&gt;
    &lt;input type=&quot;radio&quot; name=&quot;args&quot; value=&quot;on&quot;&gt;Turn the LED on.
    &lt;br&gt;
    &lt;input type=&quot;radio&quot; name=&quot;args&quot; value=&quot;off&quot;&gt;Turn the LED off.
    &lt;br&gt;
    &lt;br&gt;
    &lt;input type=&quot;submit&quot; value=&quot;Do it!&quot;&gt;
  &lt;/form&gt;
  &lt;/center&gt;
  &lt;/body&gt;
&lt;/html&gt;
---------------------------
*/
</code></pre><p>Or we can use the Particle CLI with the command:</p>
<p><code>particle call device_name led on</code></p>
<p>and</p>
<p><code>particle call device_name led off</code></p>
<p>where device_name is your device ID or device name.</p>
<p>As for your Particle.variable, the API request will look something like this:</p>
<pre><code class="lang-json">GET /v1/devices/{DEVICE_ID}/analogvalue

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef
# Your access token is 123412341234
curl -G https://api.particle.io/v1/devices/0123456789abcdef/analogvalue \
  -d access_token=123412341234
</code></pre>
<p>You can see a JSON output of your Particle.variable() call by going to:</p>
<p>https://api.particle.io/v1/devices/your-device-ID-goes-here/analogvalue?access_token=your-access-token-goes-here</p>
<p>(Be sure to replace <code>your-device-ID-goes-here</code> with your actual device ID and <code>your-access-token-goes-here</code> with your actual access token!)</p>
<p>You can also check out this value by using the command line. Type:</p>
<p><code>particle variable get device_name analogvalue</code></p>
<p>and make sure you replace <code>device_name</code> with either your device ID or the casual nickname you made for your device when you set it up.</p>
<p>Now you can turn your LED on and off and see the values at A0 change based on the photoresistor!</p>
<div style="display: none;" id="publish-and-the-dashboard" data-firmware-example-url="https://docs.particle.io/tutorials/getting-started/examples/photon/#make-a-motion-detector-publish-and-the-console" data-firmware-example-title="Publish" data-firmware-example-description="Publish and the Console"></div>

<h2 id="make-a-motion-detector-publish-and-the-console"> 4. Make a Motion Detector<a href="#make-a-motion-detector-publish-and-the-console" class="header-permalinks"><i class="ion-link"></i></a></h2><h3 id="intro-3">Intro<a href="#intro-3" class="header-permalinks"><i class="ion-link"></i></a></h3><p>What if we simply want to know that something has happened, without all the information of a variable or all the action of a fuction? We might have a security system that tells us, &quot;motion was detected!&quot; or a smart washing machine that tells us &quot;your laundry is done!&quot; In that case, we might want to use <code>Particle.publish</code>.</p>
<p><code>Particle.publish</code> sends a message to the cloud saying that some event has occured. We&apos;re allowed to name that event, set the privacy of that event, and add a little bit of info to go along with the event.</p>
<p>In this example, we&apos;ve created a system where you turn your LED and photoresistor to face each other, making a beam of light that can be broken by the motion of your finger. Every time the beam is broken or reconnected, your device will send a <code>Particle.publish</code> to the cloud letting it know the state of the beam. Basically, a tripwire!</p>
<p>For your convenience, we&apos;ve set up a little calibrate function so that your device will work no matter how bright your LED is, or how bright the ambient light may be. Put your finger in the beam when the D7 LED goes on, and hold it in the beam until you see two flashes from the D7 LED. Then take your finger out of the beam. If you mess up, don&apos;t worry-- you can just hit &quot;reset&quot; on your device and do it again!</p>
<p>You can check out the results on your console at <a href="https://console.particle.io" target="_blank" rel="noopener noreferrer">console.particle.io</a>. As you put your finger in front of the beam, you&apos;ll see an event appear that says the beam was broken. When you remove your finger, the event says that the beam is now intact.</p>
<p>You can also hook up publishes to IFTTT! More info <a href="/guide/tools-and-features/ifttt">here</a>.</p>
<h3 id="setup-3">Setup<a href="#setup-3" class="header-permalinks"><i class="ion-link"></i></a></h3><p>The setup is the same as in the last example. Set up your breadboard as follows:</p>
<p><img src="/assets/images/photon-photoresistor-fritzing.png" alt="Fritzing Diagram"></p>
<p>Ensure that the short end of the LED is plugged into <code>GND</code> and that the LED and Photoresistor are bent to face each other. (You want the LED, when turned on, to shine its beam of light directly at the photoresistor.) Try to leave enough space between the LED and the Photoresistor for your finger or a piece of paper.</p>
<h3 id="code-3">Code<a href="#code-3" class="header-permalinks"><i class="ion-link"></i></a></h3><pre><code class="lang-cpp" data-firmware-example-code-block="true">
// -----------------------------------------
// Publish and Console with Photoresistors
// -----------------------------------------
// This app will publish an event when the beam of light between the LED and the photoresistor is broken.
// It will publish a different event when the light is intact again.

// Just like before, we&apos;re going to start by declaring which pins everything is plugged into.

int led = D0; // This is where your LED is plugged in. The other side goes to a resistor connected to GND.
int boardLed = D7; // This is the LED that is already on your device.
// On the Core, it&apos;s the LED in the upper right hand corner.
// On the Photon, it&apos;s next to the D7 pin.

int photoresistor = A0; // This is where your photoresistor is plugged in. The other side goes to the &quot;power&quot; pin (below).

int power = A5; // This is the other end of your photoresistor. The other side is plugged into the &quot;photoresistor&quot; pin (above).

// The following values get set up when your device boots up and calibrates:
int intactValue; // This is the average value that the photoresistor reads when the beam is intact.
int brokenValue; // This is the average value that the photoresistor reads when the beam is broken.
int beamThreshold; // This is a value halfway between ledOnValue and ledOffValue, above which we will assume the led is on and below which we will assume it is off.

bool beamBroken = false; // This flag will be used to mark if we have a new status or not. We will use it in the loop.

// We start with the setup function.

void setup() {
  // This part is mostly the same:
  pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
  pinMode(boardLed,OUTPUT); // Our on-board LED is output as well
  pinMode(photoresistor,INPUT);  // Our photoresistor pin is input (reading the photoresistor)
  pinMode(power,OUTPUT); // The pin powering the photoresistor is output (sending out consistent power)

  // Next, write the power of the photoresistor to be the maximum possible, which is 4095 in analog.
  digitalWrite(power,HIGH);

  // Since everyone sets up their leds differently, we are also going to start by calibrating our photoresistor.
  // This one is going to require some input from the user!

  // First, the D7 LED will go on to tell you to put your hand in front of the beam.
  digitalWrite(boardLed,HIGH);
  delay(2000);

  // Then, the D7 LED will go off and the LED will turn on.
  digitalWrite(boardLed,LOW);
  digitalWrite(led,HIGH);
  delay(500);

  // Now we&apos;ll take some readings...
  int on_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int on_2 = analogRead(photoresistor); // read photoresistor
  delay(300); // wait 300 milliseconds

  // Now flash to let us know that you&apos;ve taken the readings...
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
  int off_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int off_2 = analogRead(photoresistor); // read photoresistor
  delay(1000); // wait 1 second

  // Now flash the D7 LED on and off three times to let us know that we&apos;re ready to go!
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


  // Now we average the &quot;on&quot; and &quot;off&quot; values to get an idea of what the resistance will be when the LED is on and off
  intactValue = (on_1+on_2)/2;
  brokenValue = (off_1+off_2)/2;

  // Let&apos;s also calculate the value between ledOn and ledOff, above which we will assume the led is on and below which we assume the led is off.
  beamThreshold = (intactValue+brokenValue)/2;

}


// Now for the loop.

void loop() {
  /* In this loop function, we&apos;re going to check to see if the beam has been broken.
  When the status of the beam changes, we&apos;ll send a Particle.publish() to the cloud
  so that if we want to, we can check from other devices when the LED is on or off.

  We&apos;ll also turn the D7 LED on when the Photoresistor detects a beam breakage.
  */

  if (analogRead(photoresistor)&gt;beamThreshold) {

    /* If you are above the threshold, we&apos;ll assume the beam is intact.
    If the beam was intact before, though, we don&apos;t need to change anything.
    We&apos;ll use the beamBroken flag to help us find this out.
    This flag monitors the current status of the beam.
    After the beam is broken, it is set TRUE
    and when the beam reconnects it is set to FALSE.
    */

    if (beamBroken==true) {
        // If the beam was broken before, then this is a new status.
        // We will send a publish to the cloud and turn the LED on.

        // Send a publish to your devices...
        Particle.publish(&quot;beamStatus&quot;,&quot;intact&quot;,60,PRIVATE);
        // And flash the on-board LED on and off.
        digitalWrite(boardLed,HIGH);
        delay(500);
        digitalWrite(boardLed,LOW);

        // Finally, set the flag to reflect the current status of the beam.
        beamBroken=false;
    }
    else {
        // Otherwise, this isn&apos;t a new status, and we don&apos;t have to do anything.
    }
  }

  else {
      // If you are below the threshold, the beam is probably broken.
      if (beamBroken==false) {

        // Send a publish...
        Particle.publish(&quot;beamStatus&quot;,&quot;broken&quot;,60,PRIVATE);
        // And flash the on-board LED on and off.
        digitalWrite(boardLed,HIGH);
        delay(500);
        digitalWrite(boardLed,LOW);

        // Finally, set the flag to reflect the current status of the beam.
        beamBroken=true;
      }
      else {
          // Otherwise, this isn&apos;t a new status, and we don&apos;t have to do anything.
      }
  }

}
</code></pre>

<div style="display: none;" id="publish-and-subscribe-with-photoresistors" data-firmware-example-url="https://docs.particle.io/tutorials/getting-started/examples/photon/#the-buddy-system-publish-and-subscribe" data-firmware-example-title="Subscribe" data-firmware-example-description="Learn about Publish and Subscribe using Photoresistors"></div>

<h2 id="the-buddy-system-publish-and-subscribe">5. Publish & Subscribe<a href="#the-buddy-system-publish-and-subscribe" class="header-permalinks"><i class="ion-link"></i></a></h2><h3 id="intro-4">Intro<a href="#intro-4" class="header-permalinks"><i class="ion-link"></i></a></h3><p>In the previous example, we sent a private publish. This publish went to you alone; it was just for you and your own apps, programs, integrations, and devices. We can also send a public publish, though, which allows anyone anywhere to see and subscribe to our event in the cloud. All they need is our event name.</p>
<p>Go find a buddy who has a Core, Photon, or Electron. Your buddy does not have to be next to you--she or he can be across the world if you like! All you need is a connection.</p>
<p>Connect your device and copy the firmware on the right into a new app. Pick a weird name for your event. If your device were named <code>starfish</code> for example, you could make your event name something like <code>starfish_special_event_20150515</code>. Have your buddy pick a name for their event as well. No more than 63 ASCII characters, and no spaces!</p>
<p>Now replace <code>your_unique_event_name</code> with your actual event name and <code>buddy_unique_event_name</code> with your buddy&apos;s unique event name.</p>
<p>Have your buddy do the same thing, only with their event name and yours (swap &apos;em).</p>
<p>Flash the firmware to your devices. Calibrate your device when it comes online (same as in the previous example).</p>
<p>When the beam is broken on your device, the D7 LED on your buddy&apos;s device will light up! Now you can send little messages to each other in morse code... though if one of you is using an Electron, you should be restrained.</p>
<h3 id="setup-4">Setup<a href="#setup-4" class="header-permalinks"><i class="ion-link"></i></a></h3><p>The setup is the same as in the last example. Set up your breadboard as follows:</p>
<p><img src="/assets/images/photon-photoresistor-fritzing.png" alt="Fritzing Diagram"></p>
<p>Ensure that the short end of the LED is plugged into <code>GND</code> and that the LED and Photoresistor are bent to face each other. (You want the LED, when turned on, to shine its beam of light directly at the photoresistor.) Try to leave enough space between the LED and the Photoresistor for your finger or a piece of paper.</p>
<h3 id="code-4">Code<a href="#code-4" class="header-permalinks"><i class="ion-link"></i></a></h3><pre><code class="lang-cpp" data-firmware-example-code-block="true">
// -----------------------------------------
// Publish and Subscribe with Photoresistors
/* -----------------------------------------

Go find a buddy who also has a Particle device.
Each of you will pick a unique event name
   (make it weird so that no one else will have it)
   (no more that 63 ASCII characters, and no spaces)

In the following code, replace &quot;your_unique_event_name&quot; with your chosen name.
Replace &quot;buddy_unique_event_name&quot; with your buddy&apos;s chosen name.

Have your buddy do the same on his or her IDE.

Then, each of you should flash the code to your device.

Breaking the beam on one device will turn on the D7 LED on the second device.

But how does this magic work? Through the miracle of publish and subscribe.

We are going to Particle.publish a public event to the cloud.
That means that everyone can see you event and anyone can subscribe to it.
You and your buddy will both publish an event, and listen for each others events.

------------------------------------------*/


int led = D0;
int boardLed = D7;
int photoresistor = A0;
int power = A5;

int intactValue;
int brokenValue;
int beamThreshold;

bool beamBroken = false;

// We start with the setup function.

void setup() {
  // This part is mostly the same:
  pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
  pinMode(boardLed,OUTPUT); // Our on-board LED is output as well
  pinMode(photoresistor,INPUT);  // Our photoresistor pin is input (reading the photoresistor)
  pinMode(power,OUTPUT); // The pin powering the photoresistor is output (sending out consistent power)

  // Here we are going to subscribe to your buddy&apos;s event using Particle.subscribe
  Particle.subscribe(&quot;buddy_unique_event_name&quot;, myHandler);
  // Subscribe will listen for the event buddy_unique_event_name and, when it finds it, will run the function myHandler()
  // (Remember to replace buddy_unique_event_name with your buddy&apos;s actual unique event name that they have in their firmware.)
  // myHandler() is declared later in this app.

  // Next, deliver power to the photoresistor
  digitalWrite(power,HIGH);

  // Since everyone sets up their LEDs differently, we are also going to start by calibrating our photoresistor.
  // This one is going to require some input from the user!

  // Calibrate:
  // First, the D7 LED will go on to tell you to put your hand in front of the beam.
  digitalWrite(boardLed,HIGH);
  delay(2000);

  // Then, the D7 LED will go off and the LED will turn on.
  digitalWrite(boardLed,LOW);
  digitalWrite(led,HIGH);
  delay(500);

  // Now we&apos;ll take some readings...
  int off_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int off_2 = analogRead(photoresistor); // read photoresistor
  delay(1000); // wait 1 second

  // Now flash to let us know that you&apos;ve taken the readings...
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
  int on_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int on_2 = analogRead(photoresistor); // read photoresistor
  delay(300); // wait 300 milliseconds

  // Now flash the D7 LED on and off three times to let us know that we&apos;re ready to go!
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
  if (analogRead(photoresistor)&gt;beamThreshold) {
    if (beamBroken==true) {
        Particle.publish(&quot;your_unique_event_name&quot;,&quot;intact&quot;);
        // publish this public event
        // rename your_unique_event_name with your actual unique event name. No spaces, 63 ASCII characters.
        // give your event name to your buddy and have them put it in their app.

        // Set the flag to reflect the current status of the beam.
        beamBroken=false;
    }
  }

  else {
      if (beamBroken==false) {
        // Same deal as before...
        Particle.publish(&quot;your_unique_event_name&quot;,&quot;broken&quot;);
        beamBroken=true;
      }
  }
}


// Now for the myHandler function, which is called when the cloud tells us that our buddy&apos;s event is published.
void myHandler(const char *event, const char *data)
{
  /* Particle.subscribe handlers are void functions, which means they don&apos;t return anything.
  They take two variables-- the name of your event, and any data that goes along with your event.
  In this case, the event will be &quot;buddy_unique_event_name&quot; and the data will be &quot;intact&quot; or &quot;broken&quot;

  Since the input here is a char, we can&apos;t do
     data==&quot;intact&quot;
    or
     data==&quot;broken&quot;

  chars just don&apos;t play that way. Instead we&apos;re going to strcmp(), which compares two chars.
  If they are the same, strcmp will return 0.
  */

  if (strcmp(data,&quot;intact&quot;)==0) {
    // if your buddy&apos;s beam is intact, then turn your board LED off
    digitalWrite(boardLed,LOW);
  }
  else if (strcmp(data,&quot;broken&quot;)==0) {
    // if your buddy&apos;s beam is broken, turn your board LED on
    digitalWrite(boardLed,HIGH);
  }
  else {
    // if the data is something else, don&apos;t do anything.
    // Really the data shouldn&apos;t be anything but those two listed above.
  }
}

</code></pre>






<div style="display: none;" id="annotated-tinker-firmware" data-firmware-example-url="http://docs.particle.io/photon/tinker/#annotated-tinker-firmware" data-firmware-example-title="Tinker" data-firmware-example-description="The factory default firmware that mobile apps interact with"></div>

<h2 id="tinker">6. Tinker<a href="#tinker" class="header-permalinks"><i class="ion-link"></i></a></h2><p>Remember back when we were blinking lights and reading sensors with Tinker on the mobile app?</p>
<p>When you tap a pin on the mobile app, it sends a message up to the cloud. Your device is always listening to the cloud and waiting for instructions-- like &quot;write D7 HIGH&quot; or &quot;read the voltage at A0&quot;.</p>
<p>Your device already knew how to communicate with the mobile app because of the firmware loaded onto your device as a default. We call this the Tinker firmware. It&apos;s just like the user firmware you&apos;ve been loading onto your device in these examples. It&apos;s just that with the Tinker firmware, we&apos;ve specified special <code>Particle.function</code>s that the mobile app knows and understands.</p>
<p>If your device is new, it already has the Tinker firmware on it. It&apos;s the default firmware stored on your device right from the factory. When you put your own user firmware on your device, you&apos;ll rewrite the Tinker firmware. (That means that your device will no longer understand commands from the Particle mobile app.) However, you can always get the Tinker firmware back on your device by putting it in <a href="/tutorials/device-os/led/#factory-reset">factory reset mode</a>, or by re-flashing your device with Tinker in the Particle app.</p>
<p>To reflash Tinker from within the app:</p>
<ul>
<li><strong>iOS Users</strong>: Tap the list button at the top left. Then tap the arrow next to your desired device and tap the &quot;Re-flash Tinker&quot; button in the pop out menu.</li>
<li><strong>Android Users</strong>: With your desired device selected, tap the options button in the upper right and tap the &quot;Reflash Tinker&quot; option in the drop down menu.</li>
</ul>
<p>The Tinker app is a great example of how to build a very powerful application with not all that much code. If you&apos;re a technical person, you can have a look at the latest release <a href="https://github.com/particle-iot/firmware/blob/master/user/src/application.cpp" target="_blank" rel="noopener noreferrer">here.</a></p>
<p>I know what you&apos;re thinking: this is amazing, but I really want to use Tinker <em>while</em> my code is running so I can see what&apos;s happening! Now you can.</p>
<p>Combine your code with this framework, flash it to your device, and Tinker away. You can also access Tinker code by clicking on the last example in the online IDE&apos;s code menu.</p>
<pre><code class="lang-cpp" data-firmware-example-code-block="true">
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
    Particle.function(&quot;digitalread&quot;, tinkerDigitalRead);
    Particle.function(&quot;digitalwrite&quot;, tinkerDigitalWrite);

    Particle.function(&quot;analogread&quot;, tinkerAnalogRead);
    Particle.function(&quot;analogwrite&quot;, tinkerAnalogWrite);
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
    int pinNumber = pin.charAt(1) - &apos;0&apos;;
    //Sanity check to see if the pin numbers are within limits
    if (pinNumber &lt; 0 || pinNumber &gt; 7) return -1;

    if(pin.startsWith(&quot;D&quot;))
    {
        pinMode(pinNumber, INPUT_PULLDOWN);
        return digitalRead(pinNumber);
    }
    else if (pin.startsWith(&quot;A&quot;))
    {
        pinMode(pinNumber+10, INPUT_PULLDOWN);
        return digitalRead(pinNumber+10);
    }
#if Wiring_Cellular
    else if (pin.startsWith(&quot;B&quot;))
    {
        if (pinNumber &gt; 5) return -3;
        pinMode(pinNumber+24, INPUT_PULLDOWN);
        return digitalRead(pinNumber+24);
    }
    else if (pin.startsWith(&quot;C&quot;))
    {
        if (pinNumber &gt; 5) return -4;
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
    int pinNumber = command.charAt(1) - &apos;0&apos;;
    //Sanity check to see if the pin numbers are within limits
    if (pinNumber &lt; 0 || pinNumber &gt; 7) return -1;

    if(command.substring(3,7) == &quot;HIGH&quot;) value = 1;
    else if(command.substring(3,6) == &quot;LOW&quot;) value = 0;
    else return -2;

    if(command.startsWith(&quot;D&quot;))
    {
        pinMode(pinNumber, OUTPUT);
        digitalWrite(pinNumber, value);
        return 1;
    }
    else if(command.startsWith(&quot;A&quot;))
    {
        pinMode(pinNumber+10, OUTPUT);
        digitalWrite(pinNumber+10, value);
        return 1;
    }
#if Wiring_Cellular
    else if(command.startsWith(&quot;B&quot;))
    {
        if (pinNumber &gt; 5) return -4;
        pinMode(pinNumber+24, OUTPUT);
        digitalWrite(pinNumber+24, value);
        return 1;
    }
    else if(command.startsWith(&quot;C&quot;))
    {
        if (pinNumber &gt; 5) return -5;
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
    int pinNumber = pin.charAt(1) - &apos;0&apos;;
    //Sanity check to see if the pin numbers are within limits
    if (pinNumber &lt; 0 || pinNumber &gt; 7) return -1;

    if(pin.startsWith(&quot;D&quot;))
    {
        return -3;
    }
    else if (pin.startsWith(&quot;A&quot;))
    {
        return analogRead(pinNumber+10);
    }
#if Wiring_Cellular
    else if (pin.startsWith(&quot;B&quot;))
    {
        if (pinNumber &lt; 2 || pinNumber &gt; 5) return -3;
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

    if(command.substring(0,2) == &quot;TX&quot;)
    {
        pinMode(TX, OUTPUT);
        analogWrite(TX, value.toInt());
        return 1;
    }
    else if(command.substring(0,2) == &quot;RX&quot;)
    {
        pinMode(RX, OUTPUT);
        analogWrite(RX, value.toInt());
        return 1;
    }

    //convert ASCII to integer
    int pinNumber = command.charAt(1) - &apos;0&apos;;
    //Sanity check to see if the pin numbers are within limits

    if (pinNumber &lt; 0 || pinNumber &gt; 7) return -1;

    if(command.startsWith(&quot;D&quot;))
    {
        pinMode(pinNumber, OUTPUT);
        analogWrite(pinNumber, value.toInt());
        return 1;
    }
    else if(command.startsWith(&quot;A&quot;))
    {
        pinMode(pinNumber+10, OUTPUT);
        analogWrite(pinNumber+10, value.toInt());
        return 1;
    }
    else if(command.substring(0,2) == &quot;TX&quot;)
    {
        pinMode(TX, OUTPUT);
        analogWrite(TX, value.toInt());
        return 1;
    }
    else if(command.substring(0,2) == &quot;RX&quot;)
    {
        pinMode(RX, OUTPUT);
        analogWrite(RX, value.toInt());
        return 1;
    }
#if Wiring_Cellular
    else if (command.startsWith(&quot;B&quot;))
    {
        if (pinNumber &gt; 3) return -3;
        pinMode(pinNumber+24, OUTPUT);
        analogWrite(pinNumber+24, value.toInt());
        return 1;
    }
    else if (command.startsWith(&quot;C&quot;))
    {
        if (pinNumber &lt; 4 || pinNumber &gt; 5) return -4;
        pinMode(pinNumber+30, OUTPUT);
        analogWrite(pinNumber+30, value.toInt());
        return 1;
    }
#endif
    else return -2;
}

</code></pre>

<p><strong>Also</strong>, check out and join our <a href="http://community.particle.io/" target="_blank" rel="noopener noreferrer">community forums</a> for advanced help, tutorials, and troubleshooting.</p>
<p><a href="http://community.particle.io/c/troubleshooting" target="_blank" rel="noopener noreferrer">Go to Community Forums &gt;</a></p>

          </div>
        </div>
      </div>
    </div>
