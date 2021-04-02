---
title: Bluetooth LE
order: 10
columns: two
layout: tutorials.hbs
description: Getting started with Bluetooth LE (BLE) on Particle IoT devices
---

# Bluetooth LE (BLE)

## Introduction

Gen 3 devices (Argon, Boron, Xenon) support Bluetooth. Bluetooth is used to configure your device from the Particle mobile apps for iOS and Android, and Bluetooth LE (BLE) can be used in your firmware to communicate with other devices that support BLE. 

Particle devices support both the peripheral and central roles:

- **Peripheral devices** are typically low-power devices like heart rate sensors, body weight scales, thermometers, proximity tags, etc.. When your Particle device is configured as a peripheral, it might be attached to a sensor and provide that information to a mobile app. It can also be programmed to be an iBeacon, to allow iOS apps know they are near a specific beacon.
- **Central devices** are things like mobile phones and tablets that communicate with peripheral devices. Computers with BLE support can also be central devices. When your Particle device is configured as a central device, it might gather data from a sensor like a heart rate sensor and upload it to the cloud over Wi-Fi or cellular, taking the place of a mobile phone app.

BLE is intended for low data rate sensor applications. Particle devices do not support Bluetooth A2DP and can't be used with Bluetooth headsets, speakers, and other audio devices. Particle devices do not support Bluetooth 5 mesh.

The BLE protocol can use the built-in chip or trace antenna, or an external antenna if you have installed and configured one. 

The B Series  SoM (system-on-a-module) requires the external BLE/Mesh antenna connected to the **BT** connector. The SoMs do not have built-in antennas.

A good introduction to BLE can be found in the [Adafruit tutorial](https://learn.adafruit.com/introduction-to-bluetooth-low-energy/introduction).

BLE is supported in Device OS 1.3.1 and later. BLE support was in beta test in Device OS 1.3.0. It is not available in earlier Device OS versions. 

## Major concepts


### Advertising

Advertising is the process by which a BLE peripheral device broadcasts periodically. This serves two purposes:

- It allows a BLE central device (like a mobile app) to be able to discover the peripheral device.
- A peripheral device can broadcast continuously as a beacon.

A BLE advertiser doesn't require any authentication between the peripheral device and the mobile app - the advertiser just continuously outputs data over a short range, typically around 10 meters. A mobile app can look for this data and respond to it. 

For example, a beacon embedded in a store display might allow a store app to provide additional information about the item, provide a coupon, or customize a store map.

The interval for advertising ranges from 20 milliseconds to 10.24 seconds, though there is a random 0 to 10 millisecond additional delay added. This prevents two devices with the same advertising interval from being stuck transmitting at exactly the same time forever and possibly interfering with each other.

The normal fast advertising interval is 100 to 500 milliseconds. For devices where latency is not important and want to reduce power consumption, it could be 1 to 2 seconds. Because of radio congestion and random packet loss, it might take more than one advertising broadcast before the message is received.

The advertising data is small (31 bytes, `BLE_MAX_ADV_DATA_LEN`). There are some standard types, or you can use a vendor defined type (0xff) to send any arbitrary data in your advertising payload. 

Standard advertising payload data options include:

- Type: Basic features supported by the peripheral device
- Local Name: a descriptive name for your peripheral device
- Service UUID: UUIDs supported by your peripheral device
- Custom data: beacon data for iBeacon, for example

While central devices do not advertise, they may scan for devices in range and use their advertising data to determine what to connect to. For example, the [heart rate central example](#heart-rate-central) finds the first heart rate sensor in range and connects to it automatically.

### Scan Response

In addition to the 31 bytes of advertising data, the device doing the scanning can request the scan response data. This does not require authentication, and does not require making a connection. The scan response data is an additional 31 bytes of data the peripheral can return to the scanning device, though it takes an extra set of packets to and from the peripheral to request and receive it.

### Services

Services are collections of characteristics (roughly, values). There are defined services [listed here](https://www.bluetooth.com/specifications/gatt/services/). For example, the Heart Rate service includes the Heart Rate Measurement characteristic, below.

The Heart Rate service only has one characteristic (set of values), but some services include multiple characteristics.

A device may support multiple services. For example, most heart rate monitors include both the Heart Rate Measurement Service and Battery Service.

BLE central devices like mobile phones can find known services and characteristics and display the data, without having manufacturer-specific knowledge since the data is standardized.

It's also possible to create custom services for your own proprietary app.

### Characteristics

Characteristics store a value or set of values in a service. In some cases, a service supports multiple characteristics. 

In other cases, like the Heart Rate Measurement Characteristic, the characteristic contains flags, a value, and in some cases additional values. The difference is because a heart rate sensor will always want to send out beats per minute, but if it also calculates energy expended, it will want to publish all of the values at the same time in one transaction.

For assigned characteristics, the data will be in a defined format as defined by the Bluetooth SIG. They are [listed here](https://www.bluetooth.com/specifications/gatt/characteristics/). You can also make custom characteristics, which you self-assign an identifier (long UUID).

A characteristic is also assigned a short name. This can also be used to retrieve it, however the names are not standardized so it's usually better to retrieve a characteristic by UUID.

The maximum size of the characteristic will depend on both devices. For example, different phones may have different limits.

When sending between two Particle Gen 3 devices with the default settings, the maximum characteristic that can be sent is 244 bytes. If you attempt to send a larger characteristic, only the first 244 bytes will be sent.

| Characteristic Size | Maximum Data Transfer Rate |
| --- | --- |
| 20 bytes | 222 bytes/sec. |
| 100 bytes | 1100 bytes/sec. |
| 200 bytes | 2210 bytes/sec. |
| 236 bytes | 2186 bytes/sec. |
| 237 bytes | 1753 bytes/sec. |
| 244 bytes | 1793 bytes/sec. |

Note, however, the most efficient size is a maximum 236 bytes. Above that size, fragmentation occurs which lowers the transfer rate. The maximum efficient size could vary slightly based on other factors.

You can improve performance by adjusting the [PPCP settings](/reference/device-os/firmware/#ble-setppcp-) to reduce the interval setting. It may be possible to transmit as fast as 52 Kbits/sec. with adjusted settings.

#### Peripheral Characteristics

In a BLE peripheral role, each service has one or more characteristics. Each characteristic may have one of more values.

For example, implementing a Health Thermometer peripheral you could use these services and characteristics:

```C++
// The "Health Thermometer" service is 0x1809.
// See https://www.bluetooth.com/specifications/gatt/services/
BleUuid healthThermometerService(0x1809);

// We're using a well-known characteristics UUID. They're defined here:
// https://www.bluetooth.com/specifications/gatt/characteristics/
// The temperature-measurement is 16-bit UUID 0x2A1C
BleCharacteristic temperatureMeasurementCharacteristic("temp", BleCharacteristicProperty::NOTIFY, BleUuid(0x2A1C), healthThermometerService);

// The battery level service allows the battery level to be monitored
BleUuid batteryLevelService(0x180f);

// The battery_level characteristic shows the battery level of
BleCharacteristic batteryLevelCharacteristic("bat", BleCharacteristicProperty::NOTIFY, BleUuid(0x2A19), batteryLevelService);
```

In this case, there are two services, health thermometer (0x1809) and battery level (0x180f). Each service has one characteristic.

For the health thermometer service, only one characteristic is advertised, the temperature measurement characteristic (0x2a1c). A few things about this characteristic:

- Its short name is "temp" (temperature)
- It is a NOTIFY characteristic - the peripheral periodically sends out the value
- It has the UUID 0x2A1C
- It is part of the health thermometer service.

Another use case is like the UART peripheral example:

```C++
const char* serviceUuid = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
const char* rxUuid = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";
const char* txUuid = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";

BleCharacteristic txCharacteristic("tx", BleCharacteristicProperty::NOTIFY, txUuid, serviceUuid);
BleCharacteristic rxCharacteristic("rx", BleCharacteristicProperty::WRITE_WO_RSP, rxUuid, serviceUuid, onDataReceived, NULL);
```

In this case, all of the UUIDs are proprietary. However these were generated by the Nordic Semiconductor team for the UART example, and now they're widely used for UART-like services. The Adafruit Bluefruit hardware and mobile apps support this, for example.

The txCharacteristic looks much like the health monitor example, except the UUIDs are just const char * variables, not BleUuid values. This is an option, however you need to pick one style as both the characteristic and service UUIDs must be the same type.

The rxCharacteristic has some more parameters. This is because data is received by the peripheral with this characteristic.

- `BleCharacteristicProperty::WRITE_WO_RSP` means the peripheral value is written to, without acknowledgement.
- `onDataReceived` The function that is called when data is received.
- `NULL` Context pointer. If your data received handler is part of a C++ class, this is a good place to put the class instance pointer (`this`).

The data received handler has this prototype:

```C++
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context)
```

The 128-bit UUIDs are used for your own custom services and characteristics. These are not assigned by any group. You can use any UUID generator, such as the [online UUID generator](https://www.uuidgenerator.net/) or tools that you run on your computer. There is no central registry; they are statistically unlikely to ever conflict.

A 128-bit (16 byte) UUID is often written like this: `240d5183-819a-4627-9ca9-1aa24df29f18`. It's a series of 32 hexadecimal digits (0-9, a-f) written in a 8-4-4-4-12 pattern. The A-F can be uppercase or lowercase, they are not case-sensitive.


#### Central Characteristics

In a BLE central role (behaving like a phone), you typically have a receive handler to be notified when the peripheral updates each characteristic value that you care about.

Declaring variables for central characteristics is usually just assigning a global variable to hold the value.

```C++
BleCharacteristic heartRateMeasurementCharacteristic;
```

In setup, you hook up a data received handler to your characteristic to be notified when that characteristic is received from the BLE peer:

```C++
	// In setup()
	heartRateMeasurementCharacteristic.onDataReceived(onDataReceived, NULL);
```

The NULL parameter here is the context, an optional pointer value. If you implement your onDataReceive handler in a C++ class, the context is a good place to put the "this" (class instance pointer).

Finally, the onDataReceived handler looks like this:

```
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
    uint8_t flags = data[0];

    uint16_t rate;
    if (flags & 0x01) {
    	// Rate is 16 bits
    	memcpy(&rate, &data[1], sizeof(uint16_t));
    }
    else {
    	// Rate is 8 bits (normal case)
    	rate = data[1];
    }
    if (rate != lastRate) {
    	lastRate = rate;
    	updateDisplay = true;
    }

    Log.info("heart rate=%u", rate);
}
```

In the heart rate measurement characteristic:

- The first byte is a flag byte. The only bit we care about is bit 0, LSB, mask 0x01. If that bit is 1, then the BPM value is 16-bits wide. If it's 0, then the BPM value is 8-bits wide.
- Right after the flag is the BPM value. It's either 8-bit or 16-bit depending on the flag
- The onDataReceived handler updates the global variables lastRate and updateDisplay as necessary.

The other scenario is where you're sending data from the central node to the peripheral. In this example, the central can connect to multiple peripherals, so it needs to store a separate characteristic for each peripheral device:

```C++
BlePeerDevice peer = BLE.connect(scanResults[ii].address());
if (peer.connected()) {
	Log.info("successfully connected %02X:%02X:%02X:%02X:%02X:%02X!",
			scanResults[ii].address()[0], scanResults[ii].address()[1], scanResults[ii].address()[2],
			scanResults[ii].address()[3], scanResults[ii].address()[4], scanResults[ii].address()[5]);

	// Get the button characteristic
	peer.getCharacteristicByUUID(buttonCharacteristic[availableButtonIndex], buttonCharacteristicUuid);
	peers[availableButtonIndex] = peer;
}
else {
	Log.info("connection failed");
}
```

For more information about characteristics, the [Nordic Semiconductor BLE characteristics tutorial](https://devzone.nordicsemi.com/nordic/short-range-guides/b/bluetooth-low-energy/posts/ble-characteristics-a-beginners-tutorial) is good.

#### Characteristic Definitions

If you're not interested in decoding arbitrary characteristics, you can skip this section.

In the [characteristics table](https://www.bluetooth.com/specifications/gatt/characteristics/), clicking on a name brings up the definition for the characteristic. It's a little hard to read (it's XML), but from this example you can find some useful facts about the Heart Rate Measurement Characteristic:

{{> codebox content="/assets/files/ble/heart-rate.xml" format="xml" height="300"}}

- The UUID is `uuid="2A37"`. That's hexadecimal, so you'd usually use `BleUuid(0x2A37)` as the characteristics UUID.

```
<Characteristic xsi:noNamespaceSchemaLocation="http://schemas.bluetooth.org/Documents/characteristic.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="org.bluetooth.characteristic.heart_rate_measurement" uuid="2A37" name="Heart Rate Measurement">
```

- The first field is the flags, which is an 8-bit value (uint8_t) and is required.

```
        <Field name="Flags">
            <Requirement>Mandatory</Requirement>
            <Format>8bit</Format>
```

- The first flag bit is bit index="0" which corresponds to the LSB, a mask value of 0x01 or 0b00000001. In this case, if the bit is 0, the BPM is 8-bits wide. If the bit is 1, the BPM is 16-bits wide.

```
                <Bit index="0" size="1" name="Heart Rate Value Format bit">
                    <Enumerations>
                        <Enumeration key="0" value="Heart Rate Value Format is set to UINT8. Units: beats per minute (bpm)" requires="C1" />
                        <Enumeration key="1" value="Heart Rate Value Format is set to UINT16. Units: beats per minute (bpm)" requires="C2" />
                    </Enumerations>
                </Bit>

```

- There are some other flag bits that we won't worry about right now.

- After the flag bits, is the 8-bit BPM value, if using an 8-bit BPM value. This is a uint8_t value (0-255) for the number of beats per minute.

```
        <Field name="Heart Rate Measurement Value (uint8)">
              <InformativeText>
                Note: The format of the Heart Rate Measurement Value field is dependent upon bit 0 of the Flags field.
              </InformativeText>
            <Requirement>C1</Requirement>
            <Format>uint8</Format>
            <Unit>org.bluetooth.unit.period.beats_per_minute</Unit>           
        </Field>    
```

- If the BPM is 16-bits, then this is used instead:

```
         <Field name="Heart Rate Measurement Value (uint16)">
              <InformativeText>
                Note: The format of the Heart Rate Measurement Value field is dependent upon bit 0 of the Flags field.
              </InformativeText>
            <Requirement>C2</Requirement>
            <Format>uint16</Format>
            <Unit>org.bluetooth.unit.period.beats_per_minute</Unit>           
        </Field>  
```

- Putting this into code, receiving the heart rate data from a BLE heart rate sensor:

```c++
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
    uint8_t flags = data[0];

    uint16_t rate;
    if (flags & 0x01) {
    	// Rate is 16 bits
    	memcpy(&rate, &data[1], sizeof(uint16_t));
    }
    else {
    	// Rate is 8 bits (normal case)
    	rate = data[1];
    }

    Log.info("heart rate=%u", rate);
}
```

### Peripheral Role

Using your Particle device in a peripheral role allows you to do things like:

- Be a beacon that can be located by mobile app
- Be a sensor whose value can be read by a mobile app
- Communicate with a mobile app

There's also a special case of the peripheral role: A **broadcaster** only advertises, and does not accept any connections. 

When in peripheral role the peripheral can advertise to any number of devices, but can only accept a connection from one at a time. A device can also only be a peripheral or central, not both at the same time.

### Advertising (Peripheral)

Advertising is the process by which a BLE peripheral device broadcasts periodically. This serves two purposes:

The minimum you typically need to include is the service UUIDs so your device can be discoverable. For example, in the UART peripheral example, this code is used:

```C++
const BleUuid serviceUuid("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");

BleAdvertisingData data;
data.appendServiceUUID(serviceUuid);
BLE.advertise(&data);
```

When not connected to a central device, the peripheral device will continuously advertise that it supports the UART service.

Another more complicated example is the Health Thermometer peripheral example:

```
BleUuid healthThermometerService(0x1809);

BleCharacteristic temperatureMeasurementCharacteristic("temp", BleCharacteristicProperty::NOTIFY, BleUuid(0x2A1C), healthThermometerService);

BleUuid batteryLevelService(0x180f);

BleCharacteristic batteryLevelCharacteristic("bat", BleCharacteristicProperty::NOTIFY, BleUuid(0x2A19), batteryLevelService);

void setup() {
	BLE.addCharacteristic(temperatureMeasurementCharacteristic);
	BLE.addCharacteristic(batteryLevelCharacteristic);

	BleAdvertisingData advData;

    // While we support both the health thermometer service and the battery service, we
    // only advertise the health thermometer. The battery service will be found after
    // connecting.
    advData.appendServiceUUID(healthThermometerService);

	// Continuously advertise when not connected
	BLE.advertise(&advData);
}
```

While you don't generate advertising data when in central mode, you often use it during scanning, as described in the section below

For more information about Advertising and beacons, the [Argenox BLE advertising primer](https://www.argenox.com/library/bluetooth-low-energy/ble-advertising-primer/) is good.

### iBeacon

One special type of beacon is the [Apple iOS iBeacon](https://developer.apple.com/ibeacon/). 

There are three parameters of interest:

| Field | Size  | Description |
| :---: | :---: | --- |
| UUID | 16 bytes | Application developers should define a UUID specific to their app and deployment use case. |
| Major | 2 bytes | Further specifies a specific iBeacon and use case. For example, this could define a sub-region within a larger region defined by the UUID. |
| Minor | 2 bytes | Allows further subdivision of region or use case, specified by the application developer. |

(From the [Getting Started with iBeacon](https://developer.apple.com/ibeacon/Getting-Started-with-iBeacon.pdf) guide.)

In other words, you'll assign a single UUID to all of the beacons in your fleet of beacons and figure out which one you're at using the major and minor values. When searching for an iBeacon, you need to know the UUID of the beacon you're looking for, so you don't want to assign too many. 

Enabling iBeacon mode is easy:

```
void setup() {
    iBeacon beacon(1, 2, "9c1b8bdc-5548-4e32-8a78-b9f524131206", -55);
    BLE.advertise(beacon);
}
```

The parameters for the beacon are:

- Major version (1)
- Minor version (2)
- Application UUID ("9c1b8bdc-5548-4e32-8a78-b9f524131206")
- Power measurement in dBm (-55)


### Central Role

Using your Particle device in a central role allows you to do things like:

- Detect when BLE beacons are nearby
- Read data from BLE sensors

There's also a special case of the central role: An **observer** only advertises, and does not accept any connections. 

In Device OS 1.3.0, you can only connect to a single peripheral device at a time. This will be expanded to 3 devices in a later version.


## Examples

### Body temperature thermometer

For this tutorial I'm using the **nRF Toolbox** mobile app from Nordic Semiconductor. It's free and available for iOS and Android. It has the ability to work with a number of standard BLE sensors which makes it perfect for this tutorial.

Flash this code to a Gen 3 device:

{{> codebox content="/assets/files/ble/body-thermometer.cpp" format="cpp" height="400"}}


- Run the **NRF Toolbox** app on your mobile phone. 
- Tap **HTM** (Health Thermometer)
- Tap **CONNECT**.
- Select your Particle device. For example, mine is **Argon-WVY6DG**.

![BLE Thermometer](/assets/images/ble-thermometer.jpg)

### Heart rate central

This example reads a BLE heart rate sensor (chest band). There are many of these, but I tested with [this one from Amazon](https://www.amazon.com/Wireless-Monitor-Fitness-Tracker-Bluetooth/dp/B07MC8FRLG/ref=sr_1_2), which cost around US$44.

I also used and Adafruit FeatherWing OLED Display 128x32. You can purchase one from the [Particle Store](https://store.particle.io/collections/accessories) or from [Adafruit](https://www.adafruit.com/product/2900). You can find more technical information [at Adafruit](https://learn.adafruit.com/adafruit-oled-featherwing/overview).

Both the Argon (in my case, though it works with all Particle Gen 3 devices) and the display are plugged into an Adafruit FeatherWing Doubler. The Doubler is available from [Adafruit](https://www.adafruit.com/product/2890).

![Heart Rate Display](/assets/images/ble-heart-display.jpg)

The code requires the oled-wing-adafruit library:

```
dependencies.oled-wing-adafruit=0.0.5
```

And the following code:

**For Device OS 3.0 and later:**

{{> codebox content="/assets/files/ble/heart-rate-oled3.cpp" format="cpp" height="400"}}

**For earlier DeviceOS including 2.x LTS:**

{{> codebox content="/assets/files/ble/heart-rate-oled.cpp" format="cpp" height="400"}}

- Put on your heart rate monitor.
- Flash the code to your Particle device.
- It should automatically detect the heart rate monitor and display your BPM on the display.

There is additional debugging information provided by USB serial debugging, for example using `particle serial monitor`.


### Device Nearby

In this demo you have an central device and two or more peripheral devices. Each peripheral is assigned a color (red, green, blue, yellow, or magenta). As you wander closer and farther away from the central device, the peripheral with the strongest signal will show that color on the central status LED.

#### Device Nearby Central

**For Device OS 3.0 and later:**

{{> codebox content="/assets/files/ble/device-nearby-central3.cpp" format="cpp" height="400"}}

**For earlier DeviceOS including 2.x LTS**

{{> codebox content="/assets/files/ble/device-nearby-central.cpp" format="cpp" height="400"}}

#### Device Nearby Beacon

{{> codebox content="/assets/files/ble/device-nearby-beacon.cpp" format="cpp" height="400"}}

{{!-- this is disabled for now because of the limit of one peripheral device connection at a time in 1.3.0 --}}

{{#if has-ble-multiple-peripherals}}

### Game show buzzer

This example uses a BLE central device along with two BLE peripheral devices. Each peripheral makes a connection to the central device. When the button is pressed on the peripheral, it sets the status LED of the central to the color of the peripheral.

It also shows how you can deal with multiple peripherals from the central device.

<video width="640" height="360" controls>
  <source src="/assets/images/ble-buzzer.mp4" type="video/mp4">
</video>

In the video:

- The green button is connected.
- The red button starts out unconnected (small LED is red) then connects (turns green).
- The white button shows the buzzer status in the small LED under the white button.
- Pressing the green button turns the LED on the white button green.
- Pressing the red button turns the LED on the white button red.
- Pressing the green button turns the LED on the white button green again. And again.

#### Buzzer hardware

This is the schematic for the button:

![BLE buzzer schematic](/assets/images/ble-buzzer-schematic.png)

#### Buzzer central

{{> codebox content="/assets/files/ble/buzzer-central.cpp" format="cpp" height="400"}}

#### Buzzer peripheral

{{> codebox content="/assets/files/ble/buzzer-peripheral.cpp" format="cpp" height="400"}}

{{/if}} {{!-- has-ble-multiple-peripheral --}}

### UART peripheral


The UART peripheral example shows how your Particle device can appear to be a BLE serial data stream. You can view this using apps such as:

- Adafruit Bluefruit app 
- Nordic BLE UART app

These are available for both iOS and Android.

{{> codebox content="/assets/files/ble/uart-peripheral.cpp" format="cpp" height="400"}}

### BLE log handler

The BLE log handler provides a way to see the [Log Handler](/reference/device-os/firmware/#logging) output over BLE, similar to the way you can get it over USB. You may not want to do this on a production device because there is no authentication - anyone can connect to over BLE. 

You configure a buffer size, which makes it possible to see some amount of logging information in the past when you first connect. Also, BLE UART is kind of slow, so you need a buffer.

To see the logs, you use a BLE UART compatible app. Two are:

- Adafruit Bluefruit app 
- Nordic BLE UART app

This code consists of the main application program and what is essentially a library to implement BLE log handling.

To try it:

- Flash the code below to your Particle Argon, Boron, or Xenon.
- Run the Adafruit Bluefruit app for iOS or Android.
- Select your Particle device in the **Central Mode** tab.
- Tap **UART**.

![BLE Logging](/assets/images/ble-logging.jpg)

#### Main source file

{{> codebox content="/assets/files/ble/main.cpp" format="cpp" height="400"}}


#### BleLogging.cpp

{{> codebox content="/assets/files/ble/BleLogging.cpp" format="cpp" height="400"}}

#### BleLogging.h

{{> codebox content="/assets/files/ble/BleLogging.h" format="cpp" height="400"}}


### UART central

It's less common, however the Particle device can also be the central device. You might want to use this as a data stream between two Particle devices, one central and one peripheral, for example.

**For Device OS 3.0 and later:**

{{> codebox content="/assets/files/ble/uart-central3.cpp" format="cpp" height="400"}}

**For earlier DeviceOS including 2.x LTS:**

{{> codebox content="/assets/files/ble/uart-central.cpp" format="cpp" height="400"}}

### Chrome Web BLE

The Google Chrome browser supports BLE from web pages! There is a very good [Google web BLE tutorial](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) that explains the details and provides a number of code samples. 

It only works in the Chrome browser; it does not work on Firefox, Safari, Edge, or Internet Explorer. Support for Web BLE is planned for Opera, however. 

You can use it:

- In the Android web browser (with Android 7.0 or newer)
- On Chromebooks
- In the Chrome web browser on Mac OS X (sometimes)
- In the Chrome web browser on Windows (sometimes)
- On iOS devices with the **Web BLE** app ($1.99). Does not work on iOS with Chrome or Safari.

Here are some Web BLE examples. The project links include the device source, as well as the HTML and Javascript. Just View Source on the page to view the Javascript code.

#### Level Meter

[BLE level meter](https://rickkas7.github.io/ble-potentiometer/) is an example that uses potentiometer connected to a Gen 3 devices to send the data directly to a compatible web browser, which displays the data on a web-based level meter.

#### Live Graph

[BLE live graph](https://rickkas7.github.io/ble-livegraph) is an example that uses potentiometer connected to a Gen 3 devices to send the data directly to a compatible web browser, which displays the data on a live scrolling graph.

<video width="640" height="360" controls>
  <source src="/assets/images/ble-livegraph.mp4" type="video/mp4">
</video>

#### IMU (Accelerometer)

[BLE IMU](https://rickkas7.github.io/ble-imu) connects the Adafruit BNO055 9-DOF IMU to a Gen 3 device and sends the data over BLE to WebBLE. A compatible browser connects directly to the Gen 3 device and streams the orientation information, then uses WebGL to do a 3D animation of the orientation. No server or browser plug-ins required! 

<video width="640" height="360" controls>
  <source src="/assets/images/ble-imu.mp4" type="video/mp4">
</video>


#### Power Source Display

[BLE power source](https://rickkas7.github.io/ble-powersource) uses Device Diagnostics on the device to get the battery level, charging status, and power status (USB, VIN, etc.) and sends it over BLE. Using Web BLE, you can display this data on a compatible web browser. The display updates in real time!

<video width="640" height="360" controls>
  <source src="/assets/images/ble-powersource.mp4" type="video/mp4">
</video>






