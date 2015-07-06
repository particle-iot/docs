---
word: Monitor
title: Monitor
order: 5
shared: true
columns: two
template: docs.hbs
---

#Monitor

##Introduction

Spark Monitor (the name's clearly going to change) is a new product we've built to make it easier to gain insight into the behaviors of your device. It graphs the values on all pins as quickly as it can. When you're Monitoring from the same network, it'll try to set up a local connection to the device and stream data points at around 20 times/second. When you're on a different network, of if it has trouble, you should see updates around once per second.

##Getting Monitor

### The App
You'll need to download the Chrome app from here: [spark-monitor.zip](https://s3.amazonaws.com/spark-website/spark-monitor.zip). To install it:

1. Unzip the spark-monitor.zip file
2. Go to `chrome://extensions` (you'll need to copy/paste it)
3. Click the "Developer mode" check box in the upper right
4. Click "Load unpacked extension..."
5. Select the unzipped directory (`spark-monitor`)
6. Celebrate a hard day's work. The app opens just like any other Chrome packaged app.

Launching the App:
1. In `chrome://extensions` click the "Launch" link under "Spark Monitor"
2. Login to your Particle account so you can access your devices and their data

You can also launch using the Chrome App Launcher:
1. Install [Chrome App Launcher](https://support.google.com/chrome_webstore/answer/3060053?p=cws_app_launcher&rd=1&hl=en)
2. Open Chrome App Launcher and click on "Spark Monitor"

### The Firmware Library
The other part of Monitor is the firmware library. If you're already logged in, you can click this link to the [Monitor library](https://build.particle.io/libs/557649649022b2af38000d4e/tab/1_SimpleMonitor.cpp) or you can search the libraries in [Build](https://build.particle.io/) for "Monitor". The example code shows the simplest setup, with two Monitored variables. The minimum for it to work is here:

```
// Create a Monitor object
Monitor mon;

void setup(){
	// Initialize the monitor
	mon.begin();
}

void loop(){
	/* Run the report() function as often as you want to get data back. You can throttle it by running it less frequently, but once per loop is good */
	mon.report();
}
```
##App Interface

The non-obvious thing here is the Connection state indicator. It'll be a WiFi symbol when you're in "Local" mode, communicating over TCP, and will be a cloud symbol when it's using publishes via the Particle Cloud.

![App Diagram](https://s3.amazonaws.com/spark-website/spark_monitor_diagram_720.png)

##Firmware Reference

### Monitor Variables
Tracking up to 4 variables with Monitor is as easy as swapping out `Spark.variableName()` with `mon.variableName()` (or whatever your Monitor object is named). They use the same format, and support the same variable types. Monitor will also create a Spark variable as part of the process, so you'll still have that variable available to the API and it won't interfere with existing behaviors.

Currently, variables are sampled once every 4 seconds when in remote/cloud mode, and at the same 20Hz as the pins when in local.

### publishMode
The default behavior of Monitor is to [Spark.publish()](http://docs.particle.io/photon/firmware/#spark-publish) data even when it's connected locally. That makes the connection more robust, as in the scenario when the TCP connection is dropped by the app or the device, but the frequent `Spark.publish()` calls will slow down your code. 

This function allows you to disable publishing altogether. Use `.publishMode(false)` when you want to stop the publishes in order to minimize execution speed impact. Remember that with the publishing behavior disabled, Monitor will only work when both the device and the app are on the same network.
```
Monitor mon;

void setup(){
	//disable publishing
	mon.publishMode(false);
	
	mon.begin();
}

void loop(){
	mon.report();
}
```
### Turning the LED off
When the Monitor has connected locally it'll blink the D7 LED every time a message is sent. If you're using the D7 pin, this would be very disruptive. Calling `.ledOff()` before `.begin()` will prevent the blinking behavior and keep the pinMode of D7 from being changed to output.

```
Monitor mon;

void setup(){
	//disable D7 blinking
	mon.ledOff();
	
	mon.begin();
}

void loop(){
	mon.report();
}
```
### Communication
When Monitor is transmitting data via the cloud, it sends two types of events: `~pins~` and `~vars~`. Pins is sent 3x as frequently as vars to make the graphs more responsive. You'll see these events showing up in the [dashboard](https://dashboard.particle.io) if you'd like to view or reuse the format.

Monitor creates a `.variable()` named 'ip' which it uses to broadcast its address to the app.

If the firmware successfully receives a connection request from a client, then it will begin sending data via TCPserver `print()`s. It sends separate messages for vars and pins like it does in cloud mode, but here they're both sent every time. Approximate rate is 20Hz. Sometimes the connection drops on one side or the other, and you can either reset the device or just wait- it'll usually resolve itself in a minute.

### Impact on Code Execution
Monitor is fairly optimized, but it still requires some resources. It has some timing-dependent behaviors, but there are no `delay()`s in the code. It only reads the pins and variables when it intends to transmit them, so there's no extra overhead there. The `.publish()`s once a second are probably the biggest blocking problem, and those can be commented out. Currently, they continue even when it's in local mode in case there's a silent TCP connection drop.


