---
word: Dashboard
title: Dashboard
order: 3
shared: true
columns: two
template: guide.hbs
---


# Dashboard <small class="beta">(alpha)</small>

The [Dashboard](https://dashboard.particle.io) is a new feature we're working on to improve the developer experience of building connected products with Particle. It's currently in alpha, which means we'll be working on it and releasing frequent updates.

Being in alpha also means we're trying to get your feedback as we build it. Head on over to the community to join the conversation. We'll be making release announcements, answering questions and asking for feedback.

[Talk to us on the Community!](http://community.particle.io/t/fleet-management-dashboard-alpha-run-feedback/11118)

### Home (Coming Soon)

The Dashboard will show you an overview of your devices and their activity. It’ll let you easily monitor which devices are online, what code they’re running, and what data they’re sending back.

### Logs

You can watch events published from your devices with `Spark.publish()` come in, in realtime.

[![Logs App]({{assets}}/images/dashboard/logs-big-picture.png)]({{assets}}/images/dashboard/logs-big-picture.png)



The Logs feature provides a clean interface to view event information in real-time, just from your devices. We're hoping that this is handy both while debugging code during development, and checking out recent activity on your device once you power-on your finished project. Here’s a snapshot of a Spark device monitoring the health of a theoretical aquarium.

Let's look at it starting at the top.

Near the title, we've got a button to pause and un-pause the event stream.

There's also an icon of a terminal window. When you click on it, we give you a hint on how to get the same information from the API.

Below the title is a side-scrolling bar graph. It's a visualization of the number of events from your devices over time. Each color in the bar graph represents a unique event name. Each bar is 5 seconds in duration.

At the bottom is a real-time log of events passing through the cloud. You'll get the name, data, timestamp and the device name associated with each event as it comes in. Oh Yeah! And, if you click on the event, you can see a raw JSON view of the event.

[![Raw event]({{assets}}/images/dashboard/raw-event.jpg)]({{assets}}/images/dashboard/raw-event.jpg)

In this view, you'll only see events that come in while the browser window is open.


### Devices

The Devices page allows you to see a list of the devices registered to your account. Here, you can see specific information about each device, including it's unique Device ID, it's name, the last time it connected to the Particle cloud, and whether or not the device is currently online.

![{Devices]({{assets}}/images/devices.png)

### Data (Coming Soon)

The Data view will provide a processed view of the stored and incoming data, sorted by event and graphed where possible. You can also download stored data from here.

### Errors (Coming Soon)

Errors is where you’ll go to track alert messages that you’ve defined in your code. Think of it as `Serial.println()`, but with history and insights.

### Settings (Coming Soon)

Settings is where to find all the account things you’d expect, plus access token management.
