---
title: Create a custom cold chain solution using Gen3 devices and BLE
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Overview

This application note will show how you can create a system for monitoring temperature of assets using tags that advertise their temperature using Bluetooth Low Energy (BLE).

![Cold_Chain.png](/assets/images/support/Cold_Chain.png)

## Asset tags

There are many options for BLE advertisers that can transmit their temperature. For example, the Eddystone TLM specification includes the beacon's temperature as part of the advertised packet.

For this example, I had available some kontakt.io asset tags S18-3, which include an accelerometer with temperature sensor. They can be configured to send iBeacon data, Eddystone, and/or the Kontakt telemetry packet which includes all the data.

![DSC_1714.JPG](/assets/images/support/DSC_1714.JPG)

## Beacon scanner library

The bulk of the work on the firmware that is running on the Boron or Argon collecting the data is done by the BeaconScanner library. To find out more about how to include a library in your project, see the documentation [here](/getting-started/device-os/firmware-libraries/#using-libraries)

The Github repository for this library is [here](https://github.com/particle-iot/beacon-scanner-library)

Since the library can be setup to automatically scan and publish the data received, the code that runs in the Boron/Argon is simply: 

```cpp
#include "Particle.h"  
#include "Beaconscanner.h"  
  
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif  
  
Beaconscanner scanner;  
  
void setup() {}  
  
unsigned long scannedTime = 0;  
  
void loop() {  
    if (Particle.connected() && (millis() - scannedTime) > 60000) {  
        scannedTime = millis();  
        scanner.scanAndPublish(20, SCAN_KONTAKT, "test", PRIVATE);  
    }  
}
```

Once per minute, the scanner library will scan and collect Kontakt TLM data for 20 seconds, and publish it with the "test-kontakt" event name. Make sure, if using these same asset tags, that you enable the Kontakt TLM packet in their configuration.

You can see the data in the Particle Console like this:

![kontakt-example.png](/assets/images/support/kontakt-example.png)

## Connect to Google Cloud Platform

I used the built-in Google Cloud Platform integration in the Particle Console to send the data to the Google Pub/Sub system when an event is received. The configuration is done by adding a new integration, and following the instructions given.

![gcpintegration.png](/assets/images/support/gcpintegration.png)

The topic created in Pub/Sub is called temp:

![topic-name.png](/assets/images/support/topic-name.png)

## Send from Pub/Sub to Firebase

Next, I wanted to store the data in a database. Since the data is already in Google Cloud Platform Pub/Sub, it is easy to store it in the Firebase Cloud Firestore. 

So I created a Cloud Function within Firebase that subscribes to the "temp" topic in Pub/Sub, extracts the JSON data, creates a document in the Firestore for each BLE address, and an array with the temperature in that document:

```js
exports.helloPubSub = functions.pubsub.topic('temp').onPublish((message) => {  
  let obj=null;  
  try {  
    obj=message.json;  
  } catch (e) {  
    console.error('PubSub message was not JSON', e);  
  }  
  if (obj!=null) {  
    for (const tag in obj) {  
      db.collection("devices").doc(tag).collection("temps").add({temps:obj[tag],created: admin.firestore.Timestamp.fromDate(new Date()) });   }  
  }  
});
```

This function will then populate the Firebase database with the data as it arrives:

![database.png](/assets/images/support/database.png)

## What's next?

Now that you can update your asset's temperature every minute (or update the firmware to make it any interval that you would like), it is time to add the business intelligence that your application requires.

With the data in the Firebase database, you could write a Cloud Function that watches for minimum or maximum temperature and send an alert if they are exceeded:

![coldgraph.png](/assets/images/support/coldgraph.png)

