---
title: Electron
layout: quickstart.hbs
columns: two
order: 7
setdevice: electron
---

<h1 id="getting-started">Getting Started<a href="#getting-started" class="header-permalinks"><i class="ion-link"></i></a></h1><h2 id="what-39-s-in-the-box-">What&apos;s in the Box?<a href="#what-39-s-in-the-box-" class="header-permalinks"><i class="ion-link"></i></a></h2><p><img src="/assets/images/electronItemBox.jpg" alt=""></p>
<p class="caption">Introducing the Electron.</p>

<p>Congratulations on being the owner of a brand new Particle Device! Go ahead and open the box. You can see the different <a href="/datasheets/kits">kit addons</a> and check out the <a href="/datasheets/electron-datasheet/">Electron datasheet</a> if you like!</p>
<p>Let&apos;s quickly go over what you see.</p>

<div  align="center">
<br />
<a href="https://setup.particle.io/"  target="_blank" class="button">SET UP YOUR ELECTRON</a>
</div>

<h3 id="what-39-s-all-here-">What&apos;s all here?<a href="#what-39-s-all-here-" class="header-permalinks"><i class="ion-link"></i></a></h3><p><span class="popupLink"><strong>The Cellular Module.</strong><span class="popup"><img src="/assets/images/electronUblox.jpg" style="margin:auto; max-width:100%"></span></span>
This is probably why you bought your device-- the cellular module allows your Electron to communicate with the internet in over 120 countries!
The cellular module is also accompanied with a Particle SIM card.</p>
<p>It connects your device to the internet in the same way that your smartphone might connect to its cellular network.</p>
<p><span class="popupLink"><strong>The Microcontroller.</strong><span class="popup"><img src="/assets/images/electronMCU.jpg" style="margin:auto; max-width:100%"></span></span>
The microcontroller is the brain of your device. It runs your software and tells your prototype what to do. Unlike your computer, it can only run one application (often called <em>firmware</em> or an <em>embedded application</em>). This application can be simple (just a few lines of code), or very complex, depending on what you want to do. The microcontroller interacts with the outside world using pins.</p>
<p><span class="popupLink"><strong>The Pins.</strong><span class="popup"><img src="/assets/images/mk-header-male.jpg" style="margin:auto; max-width:100%"></span></span></p>
<p>Pins are the input and output parts of the microcontroller that are exposed on the sides of your device. GPIO pins can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and buzzers to act upon the world. There are also pins to allow you to power your device, or power motors and outputs outside of your device. There are pins for Serial/UART communication, and a pin for resetting your device.</p>
<p><span class="popupLink"><strong>The Antenna &amp; USB Cable.</strong><span class="popup"><img src="/assets/images/electronAntenna.jpg" style="margin:auto; max-width:100%"></span></span>
The cellular antenna is imperative for the Electron to reach connection to a cellular tower. It will operate for all 2G/3G frequencies that your
Electron needs, depending on the version you have. The USB cable provides a means to charge your Electron as well as send serial and DFU commands to your device.</p>
<p><span class="popupLink"><strong>The Battery.</strong><span class="popup"><img src="/assets/images/electronBattery.jpg" style="margin:auto; max-width:100%"></span></span>
The Electron comes with a standard 1,800mAh 3.7V LiPo battery (rechargeable) which allows the Electron to be powered over long periods of time without needing a connection
to wired power source. Consider this battery your Electron&apos;s best friend!</p>
<p><strong>Buttons and LEDs.</strong>
There are several awesome buttons and LEDs on your Electron to make it easier to use.</p>
<ul>
<li>The <code>MODE</code> button is on the left and the <code>RESET</code> button is on the right. You can use these buttons to help you set your device&apos;s <a href="/tutorials/device-os/led">mode</a>.</li>
<li>The <strong>RGB LED</strong> is in the center of your Electron, above the module. The color of the RGB LED tells you what <a href="/tutorials/device-os/led">mode</a> your Electron is currently in.</li>
<li>The <strong>D7 LED</strong> is next to the D7 pin on your Electron, on the upper right quadrant. This LED will turn on when the D7 pin is set to <code>HIGH</code>.</li>
</ul>
  <h1 id="annotated-examples">Annotated examples<a href="#annotated-examples" class="header-permalinks"><i class="ion-link"></i></a></h1><p>Here you will find a bunch of examples to get you started with your new Particle device! </p>
<p>These examples are also listed in the online IDE in the Code menu.</p>
<p>To complete all the examples, you will need the following materials:</p>
<h4 id="materials">Materials<a href="#materials" class="header-permalinks"><i class="ion-link"></i></a></h4><ul>
<li><strong>Hardware</strong><ul>
<li>Your Particle device</li>
<li>USB to micro USB cable (included with the Electron)</li>
<li>Power source for USB cable (such as your computer, USB battery, or power brick)</li>
<li>(2) Resistors between 220 Ohms and 1000 Ohms (included with the Electron)</li>
<li>(1) LED, any color (included with the Electron)</li>
<li>(1) Photoresistor (included with the Electron)</li>
<li>LiPo Battery (included with the Electron)</li>
</ul>
</li>
</ul>
<p>All of the example circuits are based on the reference card that came along with your Electron kit. If you have misplaced yours, download it <a href="/assets/images/electron/illustrations/electron-card.pdf">here!</a></p>
<ul>
<li><strong>Software</strong><ul>
<li>The <a href="http://build.particle.io" target="_blank" rel="noopener noreferrer">online IDE</a></li>
<li>or the local <a href="http://particle.io/dev" target="_blank" rel="noopener noreferrer">Particle Dev</a></li>
</ul>
</li>
<li><strong>Experience</strong><ul>
<li>Connecting your Device with your browser or smartphone</li>
</ul>
</li>
</ul>
<p class="boxedHead">NOTE:</p>
<p class="boxed">

Since Electron is a cellular device and OTA usage consumes data, it&apos;s important for us to think about conserving data. Every time you update your firmware over the air, push data to the device or remain connected to the network, you are consuming data. In the development phase of your project, it is suggested that you update firmware happen over USB, instead of the cellular network. You&apos;ll first need to install the <a href="/tutorials/developer-tools/cli">Particle Command Line Interface</a> on your computer.

</p>


For more hardware examples to try, visit the [hardware examples](/tutorials/hardware-projects/hardware-examples/electron).

