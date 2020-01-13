---
title: Bluetooth LE
order: 4
columns: two
layout: tutorials.hbs
---

# Bluetooth LE (BLE)

## Introduction

Gen 3 devices (Argon, Boron, Xenon) support Bluetooth. Bluetooth is used to configure your device from the Particle mobile apps for iOS and Android, and Bluetooth LE (BLE) can be used in your firmware to communicate with other devices that support BLE. 

Particle devices support both the peripheral and central roles:

- **Peripheral devices** are typically low-power devices like heart rate sensors, body weight scales, thermometers, proximity tags, etc.. When your Particle device is configured as a peripheral, it might be attached to a sensor and provide that information to a mobile app. It can also be programmed to be an iBeacon, to allow iOS apps know they are near a specific beacon.
- **Central devices** are things like mobile phones and tablets that communicate with peripheral devices. Computers with BLE support can also be central devices. When your Particle device is configured as a central device, it might gather data from a sensor like a heart rate sensor and upload it to the cloud over Wi-Fi or cellular, taking the place of a mobile phone app.

BLE is intended for low data rate sensor applications. Particle devices do not support Bluetooth A2DP and can't be used with Bluetooth headsets, speakers, and other audio devices.

The mesh networking in Gen 3 devices is Thread Mesh (6LoWPAN over 802.15.4). While it uses the same 2.4 GHz radio spectrum as Bluetooth 5 mesh, they are different and not compatible. Particle devices do not support Bluetooth 5 mesh.

The BLE protocol shares the same antenna as the Thread Mesh radio, and can use the built-in chip or trace antenna, or an external antenna if you have installed and configured one. 

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

When sending between two Particle Gen 3 devices, the maximum characteristic that can be sent is 244 bytes. If you attempt to send a larger characteristic, only the first 244 bytes will be sent.

| Characteristic Size | Maximum Data Transfer Rate |
| --- | --- |
| 20 bytes | 222 bytes/sec. |
| 100 bytes | 1100 bytes/sec. |
| 200 bytes | 2210 bytes/sec. |
| 236 bytes | 2186 bytes/sec. |
| 237 bytes | 1753 bytes/sec. |
| 244 bytes | 1793 bytes/sec. |

Note, however, the most efficient size is a maximum 236 bytes. Above that size, fragmentation occurs which lowers the transfer rate. The maximum efficient size could vary slightly based on other factors.


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
BlePeerDevice peer = BLE.connect(scanResults[ii].address);
if (peer.connected()) {
	Log.info("successfully connected %02X:%02X:%02X:%02X:%02X:%02X!",
			scanResults[ii].address[0], scanResults[ii].address[1], scanResults[ii].address[2],
			scanResults[ii].address[3], scanResults[ii].address[4], scanResults[ii].address[5]);

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

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Copyright 2011 Bluetooth SIG, Inc. All rights reserved. -->
<Characteristic xsi:noNamespaceSchemaLocation="http://schemas.bluetooth.org/Documents/characteristic.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="org.bluetooth.characteristic.heart_rate_measurement" uuid="2A37" name="Heart Rate Measurement">
    <InformativeText>
    </InformativeText>
    <Value>
        <Field name="Flags">
            <Requirement>Mandatory</Requirement>
            <Format>8bit</Format>
            
            <BitField>
                <Bit index="0" size="1" name="Heart Rate Value Format bit">
                    <Enumerations>
                        <Enumeration key="0" value="Heart Rate Value Format is set to UINT8. Units: beats per minute (bpm)" requires="C1" />
                        <Enumeration key="1" value="Heart Rate Value Format is set to UINT16. Units: beats per minute (bpm)" requires="C2" />
                    </Enumerations>
                </Bit>
                <Bit index="1" size="2" name="Sensor Contact Status bits">
                    <Enumerations>
                        <Enumeration key="0" value="Sensor Contact feature is not supported in the current connection" />
                        <Enumeration key="1" value="Sensor Contact feature is not supported in the current connection" />
                        <Enumeration key="2" value="Sensor Contact feature is supported, but contact is not detected" />
                        <Enumeration key="3" value="Sensor Contact feature is supported and contact is detected" />
                    </Enumerations>
                </Bit>
                
                <Bit index="3" size="1" name="Energy Expended Status bit">
                    <Enumerations>
                        <Enumeration key="0" value="Energy Expended field is not present" />
                        <Enumeration key="1" value="Energy Expended field is present. Units: kilo Joules" requires="C3"/>
                    </Enumerations>
                </Bit>
                <Bit index="4" size="1" name="RR-Interval bit">
                    <Enumerations>
                        <Enumeration key="0" value="RR-Interval values are not present." />
                        <Enumeration key="1" value="One or more RR-Interval values are present." requires="C4"/>
                        </Enumerations>
                </Bit>
                <ReservedForFutureUse index="5" size="3"></ReservedForFutureUse>
                </BitField>
        </Field>
        <Field name="Heart Rate Measurement Value (uint8)">
              <InformativeText>
                Note: The format of the Heart Rate Measurement Value field is dependent upon bit 0 of the Flags field.
              </InformativeText>
            <Requirement>C1</Requirement>
            <Format>uint8</Format>
            <Unit>org.bluetooth.unit.period.beats_per_minute</Unit>
           
        </Field>    
        
         <Field name="Heart Rate Measurement Value (uint16)">
              <InformativeText>
                Note: The format of the Heart Rate Measurement Value field is dependent upon bit 0 of the Flags field.
              </InformativeText>
            <Requirement>C2</Requirement>
            <Format>uint16</Format>
            <Unit>org.bluetooth.unit.period.beats_per_minute</Unit>
           
        </Field>       
        
        <Field name="Energy Expended">
            <InformativeText>The presence of the Energy Expended field is dependent upon bit 3 of the Flags field.</InformativeText>
            <Requirement>C3</Requirement>
            <Format>uint16</Format>
            <Unit>org.bluetooth.unit.energy.joule</Unit>
           
        </Field>
        <Field name="RR-Interval">
            <InformativeText>
               <!-- The presence of the RR-Interval field is dependent upon bit 4 of the Flags field. 
                <p>The RR-Interval value represents the time between two R-Wave detections.</p> 
                
                <p>Because several RR-Intervals may be measured between transmissions of the HEART RATE MEASUREMENT characteristic, 
                multiple RR-Interval sub-fields may be present in the characteristic. The number of RR-Interval sub-fields present 
                is determined by a combination of the overall length of the characteristic and whether or not the characteristic contains 
                the Energy Expended field.</p>
                
                <p>Where there are multiple RR-Interval values transmitted in the HEART RATE MEASUREMENT characteristic, the field uses the following format:</p>
                <p>RR-Interval Value 0 (LSO...MSO), RR-Interval Value 1 (LSO...MSO), RR-Interval Value 2 (LSO...MSO), RR-Interval Value n (LSO...MSO).</p>
                <p>Where the RR-Interval Value 0 is older than the RR-Interval Value 1.</p>
                <p>RR-Interval Value 0 is transmitted first followed by the newer measurements.</p>-->

			</InformativeText>
            <Requirement>C4</Requirement>
            <Format>uint16</Format>
            <Unit>org.bluetooth.unit.time.second</Unit>
            <Description>Resolution of 1/1024 second</Description>
		
            
            
        </Field>
    </Value>
   <Note> <p>The fields in the above table are in the order of LSO to MSO. Where LSO = Least Significant Octet and MSO = Most Significant Octet.</p>
   </Note>
</Characteristic>
```

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

```C++
#include "Particle.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const unsigned long UPDATE_INTERVAL_MS = 2000;
unsigned long lastUpdate = 0;

float getTempC();
uint32_t ieee11073_from_float(float temperature);

// The "Health Thermometer" service is 0x1809.
// See https://www.bluetooth.com/specifications/gatt/services/
BleUuid healthThermometerService(BLE_SIG_UUID_HEALTH_THERMONETER_SVC);

// We're using a well-known characteristics UUID. They're defined here:
// https://www.bluetooth.com/specifications/gatt/characteristics/
// The temperature-measurement is 16-bit UUID 0x2A1C
BleCharacteristic temperatureMeasurementCharacteristic("temp", BleCharacteristicProperty::NOTIFY, BleUuid(0x2A1C), healthThermometerService);

// The battery level service allows the battery level to be monitored
BleUuid batteryLevelService(BLE_SIG_UUID_BATTERY_SVC);

// The battery_level characteristic shows the battery level of
BleCharacteristic batteryLevelCharacteristic("bat", BleCharacteristicProperty::NOTIFY, BleUuid(0x2A19), batteryLevelService);


// We don't actually have a thermometer here, we just randomly adjust this value
float lastValue = 37.0; // 98.6 deg F;

uint8_t lastBattery = 100;

void setup() {
	(void)logHandler; // Does nothing, just to eliminate the unused variable warning

	BLE.addCharacteristic(temperatureMeasurementCharacteristic);

	BLE.addCharacteristic(batteryLevelCharacteristic);
	batteryLevelCharacteristic.setValue(&lastBattery, 1);

	BleAdvertisingData advData;

	// While we support both the health thermometer service and the battery service, we
	// only advertise the health thermometer. The battery service will be found after
	// connecting.
	advData.appendServiceUUID(healthThermometerService);

	// Continuously advertise when not connected
	BLE.advertise(&advData);
}

void loop() {
	if (millis() - lastUpdate >= UPDATE_INTERVAL_MS) {
		lastUpdate = millis();

		if (BLE.connected()) {
			uint8_t buf[6];

			// The Temperature Measurement characteristic data is defined here:
			// https://www.bluetooth.com/wp-content/uploads/Sitecore-Media-Library/Gatt/Xml/Characteristics/org.bluetooth.characteristic.temperature_measurement.xml

			// First byte is flags. We're using Celsius (bit 0b001 == 0), no timestamp (bit 0b010 == 0), with temperature type (bit 0b100), so the flags are 0x04.
			buf[0] = 0x04;

			// Value is a ieee11073 floating point number
			uint32_t value = ieee11073_from_float(getTempC());
			memcpy(&buf[1], &value, 4);

			// TempType is a constant for where the sensor is sensing:
			// <Enumeration key="1" value="Armpit" />
			// <Enumeration key="2" value="Body (general)" />
			// <Enumeration key="3" value="Ear (usually ear lobe)" />
			// <Enumeration key="4" value="Finger" />
			// <Enumeration key="5" value="Gastro-intestinal Tract" />
			// <Enumeration key="6" value="Mouth" />
			// <Enumeration key="7" value="Rectum" />
			// <Enumeration key="8" value="Toe" />
			// <Enumeration key="9" value="Tympanum (ear drum)" />
			buf[5] = 6; // Mouth

			temperatureMeasurementCharacteristic.setValue(buf, sizeof(buf));

			// The battery starts at 100% and drops to 10% then will jump back up again
			batteryLevelCharacteristic.setValue(&lastBattery, 1);
			if (--lastBattery < 10) {
				lastBattery = 100;
			}
		}
	}
}

float getTempC() {
	// Adjust this by a little bit each check so we can see it change
	if (rand() > (RAND_MAX / 2)) {
		lastValue += 0.1;
	}
	else {
		lastValue -= 0.1;
	}

	return lastValue;
}

uint32_t ieee11073_from_float(float temperature) {
	// This code is from the ARM mbed temperature demo:
	// https://github.com/ARMmbed/ble/blob/master/ble/services/HealthThermometerService.h
	// I'm pretty sure this only works for positive values of temperature, but that's OK for the health thermometer.
	uint8_t  exponent = 0xFE; // Exponent is -2
	uint32_t mantissa = (uint32_t)(temperature * 100);

	return (((uint32_t)exponent) << 24) | mantissa;
}
```

- Run the **NRF Toolbox** app on your mobile phone. 
- Tap **HTM** (Health Thermometer)
- Tap **CONNECT**.
- Select your Particle device. For example, mine is **Argon-WVY6DG**.

![BLE Thermometer](/assets/images/ble-thermometer.jpg)

### Heart rate central

This example reads a BLE heart rate sensor (chest band). There are many of these, but I tested with [this one from Amazon](https://www.amazon.com/gp/product/B074CVB4W3/ref=ppx_yo_dt_b_asin_title_o07_s00), which cost around US$44.

I also used and Adafruit FeatherWing OLED Display 128x32. You can purchase one from the [Particle Store](https://store.particle.io/collections/accessories) or from [Adafruit](https://www.adafruit.com/product/2900). You can find more technical information [at Adafruit](https://learn.adafruit.com/adafruit-oled-featherwing/overview).

Both the Argon (in my case, though it works with all Particle Gen 3 devices) and the display are plugged into an Adafruit FeatherWing Doubler. The Doubler is available from [Adafruit](https://www.adafruit.com/product/2890).

![Heart Rate Display](/assets/images/ble-heart-display.jpg)

The code requires the oled-wing-adafruit library:

```
dependencies.oled-wing-adafruit=0.0.5
```

And the following code:

```C++
#include "Particle.h"

#include "oled-wing-adafruit.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const size_t SCAN_RESULT_MAX = 30;

BleCharacteristic heartRateMeasurementCharacteristic;


BleScanResult scanResults[SCAN_RESULT_MAX];
BlePeerDevice peer;
OledWingAdafruit display;
uint16_t lastRate = 0;
bool updateDisplay = false;

void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);

void setup() {
	(void)logHandler; // Does nothing, just to eliminate the unused variable warning

	display.setup();
	display.clearDisplay();
	display.display();

	heartRateMeasurementCharacteristic.onDataReceived(onDataReceived, NULL);
}

void loop() {
	display.loop();

	if (updateDisplay) {
		updateDisplay = false;

		char buf[32];
		display.clearDisplay();
		display.setTextSize(4);
		display.setTextColor(WHITE);
		display.setCursor(0,0);
		snprintf(buf, sizeof(buf), "%d", lastRate);
		display.println(buf);
		display.display();
	}

	if (BLE.connected()) {
		// We're currently connected to a sensor
	}
	else {
		// We are not connected to a sensor, scan for one
		display.clearDisplay();
		display.display();

		int count = BLE.scan(scanResults, SCAN_RESULT_MAX);

	    for (int ii = 0; ii < count; ii++) {
			uint8_t buf[BLE_MAX_ADV_DATA_LEN];
			size_t len;

			// We're looking for devices that have a heart rate service (0x180D)
			len = scanResults[ii].advertisingData.get(BleAdvertisingDataType::SERVICE_UUID_16BIT_COMPLETE, buf, BLE_MAX_ADV_DATA_LEN);
			if (len > 0) {
				//
				for(size_t jj = 0; jj < len; jj += 2) {
					if (*(uint16_t *)&buf[jj] == BLE_SIG_UUID_HEART_RATE_SVC) { // 0x180D
						// Found a device with a heart rate service

						Log.info("rssi=%d address=%02X:%02X:%02X:%02X:%02X:%02X ",
								scanResults[ii].rssi,
								scanResults[ii].address[0], scanResults[ii].address[1], scanResults[ii].address[2],
								scanResults[ii].address[3], scanResults[ii].address[4], scanResults[ii].address[5]);

						peer = BLE.connect(scanResults[ii].address);
						if (peer.connected()) {
							Log.info("successfully connected!");

							// Get the heart rate measurement characteristic
							peer.getCharacteristicByUUID(heartRateMeasurementCharacteristic, BleUuid(0x2a37));
						}
						else {
							Log.info("connection failed");
						}
					}
				}
			}
		}
	}
}


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

- Put on your heart rate monitor.
- Flash the code to your Particle device.
- It should automatically detect the heart rate monitor and display your BPM on the display.

There is additional debugging information provided by USB serial debugging, for example using `particle serial monitor`.


### Device Nearby

In this demo you have an central device and two or more peripheral devices. Each peripheral is assigned a color (red, green, blue, yellow, or magenta). As you wander closer and farther away from the central device, the peripheral with the strongest signal will show that color on the central status LED.

#### Device Nearby Central

```C++
#include "Particle.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const size_t SCAN_RESULT_MAX = 30;

BleScanResult scanResults[SCAN_RESULT_MAX];
LEDStatus ledOverride(RGB_COLOR_WHITE, LED_PATTERN_SOLID, LED_SPEED_NORMAL, LED_PRIORITY_IMPORTANT);

void setup() {
	(void)logHandler; // Does nothing, just to eliminate the unused variable warning
}

void loop() {
	// Only scan for 500 milliseconds
	BLE.setScanTimeout(50);
	int count = BLE.scan(scanResults, SCAN_RESULT_MAX);

	uint32_t curColorCode;
	int curRssi = -999;

	for (int ii = 0; ii < count; ii++) {
		uint8_t buf[BLE_MAX_ADV_DATA_LEN];
		size_t len;

		// When getting a specific AD Type, the length returned does not include the length or AD Type so len will be one less
		// than what we put in the beacon code, because that includes the AD Type.
		len = scanResults[ii].advertisingData.get(BleAdvertisingDataType::MANUFACTURER_SPECIFIC_DATA, buf, BLE_MAX_ADV_DATA_LEN);
		if (len == 7) {
			// We have manufacturer-specific advertising data (0xff) and it's 7 bytes (without the AD type)

			// Byte: BLE_SIG_AD_TYPE_MANUFACTURER_SPECIFIC_DATA (0xff)
			// 16-bit: Company ID (0xffff)
			// Byte: Internal packet identifier (0x55)
			// 32-bit: Color code

			if (buf[0] == 0xff && buf[1] == 0xff && buf[2] == 0x55) {
				// Company ID and internal packet identifier match

				uint32_t colorCode;
				memcpy(&colorCode, &buf[3], 4);

				Log.info("colorCode: 0x%lx rssi=%d address=%02X:%02X:%02X:%02X:%02X:%02X ",
						colorCode, scanResults[ii].rssi,
						scanResults[ii].address[0], scanResults[ii].address[1], scanResults[ii].address[2],
						scanResults[ii].address[3], scanResults[ii].address[4], scanResults[ii].address[5]);

				if (scanResults[ii].rssi > curRssi) {
					// Show whatever device has the strongest signal
					curRssi = scanResults[ii].rssi;
					curColorCode = colorCode;
				}
			}
		}
	}
	if (curRssi != -999) {
		ledOverride.setColor(curColorCode);
		ledOverride.setActive(true);
	}
	else {
		ledOverride.setActive(false);
	}
}

```

#### Device Nearby Beacon

```C++
#include "Particle.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler(LOG_LEVEL_TRACE);

const uint32_t myColor = 0xff0000;
// 0xff0000 = red
// 0x00ff00 = green
// 0x0000ff = blue

void setAdvertisingData();

void setup() {
	(void)logHandler; // Does nothing, just to eliminate the unused variable warning

	setAdvertisingData();
}

void loop() {

}

void setAdvertisingData() {
	uint8_t buf[BLE_MAX_ADV_DATA_LEN];

	size_t offset = 0;

	// Manufacturer-specific data
	// 16-bit: Company ID (0xffff)
	// Byte: Internal packet identifier (0x55)
	// 32-bit: Color code

	// Company ID (0xffff internal use/testing)
	buf[offset++] = 0xff;
	buf[offset++] = 0xff;

	// Internal packet type. This is arbitrary, but provides an extra
	// check to make sure the data is my data, since we use the 0xffff company
	// code.
	buf[offset++] = 0x55;

	// Our specific data, color code
	memcpy(&buf[offset], &myColor, 4);
	offset += 4;

	BleAdvertisingData advData;
	advData.appendCustomData(buf, offset);

	// Advertise every 100 milliseconds. Unit is 0.625 millisecond intervals.
	BLE.setAdvertisingInterval(130);

	// Continuously advertise
	BLE.advertise(&advData);
}

```

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

```C++
#include "Particle.h"

SYSTEM_THREAD(ENABLED);

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler;

const uint16_t STATUS_RED = A0;
const uint16_t STATUS_GREEN = A1;
const uint16_t STATUS_BLUE = A2;
const uint16_t SWITCH_PIN = D6;
const uint16_t SWITCH_LED_PIN = D5;

BleUuid serviceUuid("09b17c16-3498-4c02-beb6-3d5792528181");
BleUuid buttonCharacteristicUuid("fe0a8cd7-9f69-45c7-b7a1-3ecb0c9e97c7");

const size_t MAX_BUTTONS = 2;
BlePeerDevice peers[MAX_BUTTONS];
BleCharacteristic buttonCharacteristic[MAX_BUTTONS];

const size_t SCAN_RESULT_MAX = 20;
BleScanResult scanResults[SCAN_RESULT_MAX];

const unsigned long COLOR_DISPLAY_TIME_MS = 1000;
uint32_t lastColor = 0;
unsigned long lastTime = 0;
bool updatedLed = false;

const unsigned long SCAN_PERIOD_MS = 1000;
unsigned long lastScan = 0;

void setStatusLed(uint32_t color);
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);

void setup() {
	pinMode(STATUS_RED, OUTPUT);
	pinMode(STATUS_GREEN, OUTPUT);
	pinMode(STATUS_BLUE, OUTPUT);
	setStatusLed(0x000000);

	pinMode(SWITCH_LED_PIN, OUTPUT);
	pinMode(SWITCH_PIN, INPUT_PULLUP);

	for(size_t ii = 0; ii < MAX_BUTTONS; ii++) {
		buttonCharacteristic[ii].onDataReceived(onDataReceived, NULL);
	}
}

void loop() {
	//

	if (lastTime != 0) {
		if (!updatedLed) {
			updatedLed = true;
			setStatusLed(lastColor);
			Log.info("updated status LED %06lx", lastColor);
		}
		if (millis() - lastTime >= COLOR_DISPLAY_TIME_MS) {
			// The color has been up for appropriate time, revert back to off
			lastTime = 0;
			setStatusLed(0x000000);

			Log.info("cleared status LED");
		}
	}

	if (millis() - lastScan >= SCAN_PERIOD_MS) {
		lastScan = millis();

		// Find an available peers slot
		int availableButtonIndex = -1;
		for(size_t ii = 0; ii < MAX_BUTTONS; ii++) {
			if (!peers[ii].connected()) {
				availableButtonIndex = (int) ii;
				break;
			}
		}
		if (availableButtonIndex < 0) {
			// No available slots so there's nothing to do here. When data arrives
			// the onDataReceived handler will automatically be called
			return;
		}

		// Scan for more sensors for 1/2 second (500 milliseconds)
		BLE.setScanTimeout(50);
		int count = BLE.scan(scanResults, SCAN_RESULT_MAX);

		for (int ii = 0; ii < count; ii++) {
			// Since the buzzer peripheral only supports one service we only need to check for the one service ID
			// But often you'd want to get all of the service IDs and check all of them as a device could support
			// more than one service.
			BleUuid foundServiceUUID;
			size_t svcCount = scanResults[ii].advertisingData.serviceUUID(&foundServiceUUID, 1);
			if (svcCount > 0 && foundServiceUUID == serviceUuid) {
				// This device supports the private buzzer service

				BlePeerDevice peer = BLE.connect(scanResults[ii].address);
				if (peer.connected()) {
					Log.info("successfully connected %02X:%02X:%02X:%02X:%02X:%02X!",
							scanResults[ii].address[0], scanResults[ii].address[1], scanResults[ii].address[2],
							scanResults[ii].address[3], scanResults[ii].address[4], scanResults[ii].address[5]);

					// Get the button characteristic
					peer.getCharacteristicByUUID(buttonCharacteristic[availableButtonIndex], buttonCharacteristicUuid);
					peers[availableButtonIndex] = peer;
				}
				else {
					Log.info("connection failed");
				}
			}
		}
	}
}

void setStatusLed(uint32_t color) {
	// The SwitchDemo board uses a common anode LED, so values are 0 = on full, 255 = off
	analogWrite(STATUS_RED, 255 - ((color >> 16) & 0xff));
	analogWrite(STATUS_GREEN, 255 - ((color >> 8) & 0xff));
	analogWrite(STATUS_BLUE, 255 - (color & 0xff));
}


void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
	if (lastTime == 0) {
		lastTime = millis();
		updatedLed = false;
		memcpy(&lastColor, data, sizeof(uint32_t));

		Log.info("got %06lx from %02X:%02X:%02X:%02X:%02X:%02X",
				lastColor,
				peer.address()[0], peer.address()[1], peer.address()[2],
				peer.address()[3], peer.address()[4], peer.address()[5]);
	}
}

```

#### Buzzer peripheral

```C++
#include "Particle.h"

SYSTEM_THREAD(ENABLED);

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler;

uint32_t myColor = 0xff0000;

const uint16_t STATUS_RED = A0;
const uint16_t STATUS_GREEN = A1;
const uint16_t STATUS_BLUE = A2;
const uint16_t SWITCH_PIN = D6;
const uint16_t SWITCH_LED_PIN = D5;

BleUuid serviceUuid("09b17c16-3498-4c02-beb6-3d5792528181");
BleUuid buttonCharacteristicUuid("fe0a8cd7-9f69-45c7-b7a1-3ecb0c9e97c7");

BleCharacteristic buttonCharacteristic("b", BleCharacteristicProperty::NOTIFY, buttonCharacteristicUuid, serviceUuid);

volatile bool buttonPressed = false;

void setStatusLed(uint32_t color);
void interruptHandler();

void setup() {
	pinMode(STATUS_RED, OUTPUT);
	pinMode(STATUS_GREEN, OUTPUT);
	pinMode(STATUS_BLUE, OUTPUT);
	setStatusLed(0x000000);

	pinMode(SWITCH_LED_PIN, OUTPUT);

	pinMode(SWITCH_PIN, INPUT_PULLUP);
	attachInterrupt(SWITCH_PIN, interruptHandler, FALLING);

    BLE.addCharacteristic(buttonCharacteristic);

    BleAdvertisingData data;
    data.appendServiceUUID(serviceUuid);
    BLE.advertise(&data);
}

void loop() {
    if (BLE.connected()) {
		if (buttonPressed) {
			// Button was pressed, turn on LED button
			digitalWrite(SWITCH_LED_PIN, 1);

			buttonPressed = false;

			// Transmit color to central to indicate button pressed
			buttonCharacteristic.setValue((uint8_t *)&myColor, sizeof(myColor));
		}

		// Lock out delay/debounce
		delay(1000);
		digitalWrite(SWITCH_LED_PIN, 0);

		// Set status to light green
    	setStatusLed(0x004000);
    }
    else {
    	// Not connected to central - set status to light red
    	setStatusLed(0x400000);
    }
}

void setStatusLed(uint32_t color) {
	// The SwitchDemo board uses a common anode LED, so values are 0 = on full, 255 = off
	analogWrite(STATUS_RED, 255 - ((color >> 16) & 0xff));
	analogWrite(STATUS_GREEN, 255 - ((color >> 8) & 0xff));
	analogWrite(STATUS_BLUE, 255 - (color & 0xff));
}

void interruptHandler() {
	buttonPressed = true;
}
```

{{/if}} {{!-- has-ble-multiple-peripheral --}}

### UART peripheral


The UART peripheral example shows how your Particle device can appear to be a BLE serial data stream. You can view this using apps such as:

- Adafruit Bluefruit app 
- Nordic BLE UART app

These are available for both iOS and Android.

```C++
#include "Particle.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

const size_t UART_TX_BUF_SIZE = 20;

void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);

// These UUIDs were defined by Nordic Semiconductor and are now the defacto standard for
// UART-like services over BLE. Many apps support the UUIDs now, like the Adafruit Bluefruit app.
const BleUuid serviceUuid("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid rxUuid("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid txUuid("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

BleCharacteristic txCharacteristic("tx", BleCharacteristicProperty::NOTIFY, txUuid, serviceUuid);
BleCharacteristic rxCharacteristic("rx", BleCharacteristicProperty::WRITE_WO_RSP, rxUuid, serviceUuid, onDataReceived, NULL);

void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
    // Log.trace("Received data from: %02X:%02X:%02X:%02X:%02X:%02X:", peer.address()[0], peer.address()[1], peer.address()[2], peer.address()[3], peer.address()[4], peer.address()[5]);

    for (size_t ii = 0; ii < len; ii++) {
        Serial.write(data[ii]);
    }
}

void setup() {
    Serial.begin();

    BLE.addCharacteristic(txCharacteristic);
    BLE.addCharacteristic(rxCharacteristic);

    BleAdvertisingData data;
    data.appendServiceUUID(serviceUuid);
    BLE.advertise(&data);
}

void loop() {
    if (BLE.connected()) {
    	uint8_t txBuf[UART_TX_BUF_SIZE];
    	size_t txLen = 0;

    	while(Serial.available() && txLen < UART_TX_BUF_SIZE) {
            txBuf[txLen++] = Serial.read();
            Serial.write(txBuf[txLen - 1]);
        }
        if (txLen > 0) {
            txCharacteristic.setValue(txBuf, txLen);
        }
    }
}

```

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

```C++
#include "BleLogging.h"


// This demo works better with system thread enabled, otherwise the BLE log handler is not
// initialized until you've already connected to the cloud, which is not as useful.
SYSTEM_THREAD(ENABLED);

// This sets up the BLE log handler. The <4096> template parameter sets the size of the buffer to hold log data
// The other parameters are like SerialLogHandler. You can set the log level (optional) to things like
// LOG_LEVEL_ALL, LOG_LEVEL_TRACE, LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, etc.. You can also pass a log filter here.
BleLogging<4096> bleLogHandler(LOG_LEVEL_TRACE);

// Optionally you can also enable USB serial log handling (or other log handlers, as desired).
SerialLogHandler serialLogHandler(LOG_LEVEL_TRACE);

// This is just so the demo prints a message every second so the log updates frequently
const unsigned long LOG_INTERVAL = 1000; // milliseconds
unsigned long lastLog = 0;
size_t counter = 0;


void setup() {
	// You must add this to your setup() to initialize the library
	bleLogHandler.setup();
}

void loop() {
	// You must add this to your loop to process BLE requests and data
	bleLogHandler.loop();


	if (millis() - lastLog >= LOG_INTERVAL) {
		lastLog = millis();

		// This is just so the demo prints a message every second so the log updates frequently
		Log.info("counter=%u", counter++);
	}
}
```

#### BleLogging.cpp

```C++
#include "BleLogging.h"

static const size_t MAX_TO_SEND = 20;

static const char* serviceUuid = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
static const char* rxUuid = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";
static const char* txUuid = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";


BleLoggingBase::BleLoggingBase(uint8_t *buf, size_t bufSize, LogLevel level, LogCategoryFilters filters) :
	StreamLogHandler(*this, level, filters),
	buf(buf), bufSize(bufSize),
	txCharacteristic("tx", BleCharacteristicProperty::NOTIFY, txUuid, serviceUuid),
	rxCharacteristic("rx", BleCharacteristicProperty::WRITE_WO_RSP, rxUuid, serviceUuid, onDataReceivedStatic, this) {

	// Add this handler into the system log manager
	LogManager::instance()->addHandler(this);
}

BleLoggingBase::~BleLoggingBase() {

}

void BleLoggingBase::setup() {
    BLE.addCharacteristic(txCharacteristic);
    BLE.addCharacteristic(rxCharacteristic);

    BleAdvertisingData data;
    data.appendServiceUUID(serviceUuid);
    BLE.advertise(&data);
}

void BleLoggingBase::loop() {
    if (BLE.connected()) {
    	// Make sure you don't Log.info, etc. anywhere in this block, otherwise you'll recursively log
    	size_t numToSend = writeIndex - readIndex;
    	if (numToSend > 0) {
    		if (numToSend > MAX_TO_SEND) {
    			numToSend = MAX_TO_SEND;
    		}
            txCharacteristic.setValue(&buf[readIndex % bufSize], numToSend);
            readIndex += numToSend;
    	}
    }

}


size_t BleLoggingBase::write(uint8_t c) {
	// Make sure you don't Log.info, etc. anywhere in this function, otherwise you'll recursively log

	if ((writeIndex - readIndex) >= bufSize) {
		// Buffer is full, discard oldest byte
		readIndex++;
	}

	buf[writeIndex++ % bufSize] = c;

	return 1;
}


void BleLoggingBase::onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer) {
	// Discard all data sent from the UART app
}

// [static]
void BleLoggingBase::onDataReceivedStatic(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
	BleLoggingBase *This = (BleLoggingBase *) context;

	This->onDataReceived(data, len, peer);
}
```

#### BleLogging.h

```C++
#ifndef __BLELOGGING_H
#define __BLELOGGING_H

#include "Particle.h"

class BleLoggingBase : public StreamLogHandler, Print {
public:
	BleLoggingBase(uint8_t *buf, size_t bufSize, LogLevel level = LOG_LEVEL_INFO, LogCategoryFilters filters = {});
	virtual ~BleLoggingBase();

	void setup();

	void loop();

	/**
	 * @brief Virtual override for the StreamLogHandler to write data to the log
	 */
    virtual size_t write(uint8_t);

protected:
    void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer);
    static void onDataReceivedStatic(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);

    uint8_t *buf;
    size_t bufSize;
    size_t readIndex = 0;
    size_t writeIndex = 0;

    BleCharacteristic txCharacteristic;
    BleCharacteristic rxCharacteristic;
};

template <size_t BUFFER_SIZE>
class BleLogging : public BleLoggingBase {
public:
	explicit BleLogging(LogLevel level = LOG_LEVEL_INFO, LogCategoryFilters filters = {}) : BleLoggingBase(staticBuf, BUFFER_SIZE, level, filters) {};

protected:
	uint8_t staticBuf[BUFFER_SIZE];
};


#endif // __BLELOGGING_H

```



### UART central

It's less common, however the Particle device can also be the central device. You might want to use this as a data stream between two Particle devices, one central and one peripheral, for example.

```C++
#include "Particle.h"

// This example does not require the cloud so you can run it in manual mode or
// normal cloud-connected mode
// SYSTEM_MODE(MANUAL);

// These UUIDs were defined by Nordic Semiconductor and are now the defacto standard for
// UART-like services over BLE. Many apps support the UUIDs now, like the Adafruit Bluefruit app.
const BleUuid serviceUuid("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid rxUuid("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid txUuid("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

const size_t UART_TX_BUF_SIZE = 20;
const size_t SCAN_RESULT_COUNT = 20;

BleScanResult scanResults[SCAN_RESULT_COUNT];

BleCharacteristic peerTxCharacteristic;
BleCharacteristic peerRxCharacteristic;
BlePeerDevice peer;


uint8_t txBuf[UART_TX_BUF_SIZE];
size_t txLen = 0;

const unsigned long SCAN_PERIOD_MS = 2000;
unsigned long lastScan = 0;

void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
    for (size_t ii = 0; ii < len; ii++) {
        Serial.write(data[ii]);
    }
}

void setup() {
    Serial.begin();
    peerTxCharacteristic.onDataReceived(onDataReceived, &peerTxCharacteristic);
}

void loop() {
    if (BLE.connected()) {
        while (Serial.available() && txLen < UART_TX_BUF_SIZE) {
            txBuf[txLen++] = Serial.read();
            Serial.write(txBuf[txLen - 1]);
        }
        if (txLen > 0) {
        	// Transmit the data to the BLE peripheral
            peerRxCharacteristic.setValue(txBuf, txLen);
            txLen = 0;
        }
    }
    else {
    	if (millis() - lastScan >= SCAN_PERIOD_MS) {
    		// Time to scan
    		lastScan = millis();

    		size_t count = BLE.scan(scanResults, SCAN_RESULT_COUNT);
			if (count > 0) {
				for (uint8_t ii = 0; ii < count; ii++) {
					// Our serial peripheral only supports one service, so we only look for one here.
					// In some cases, you may want to get all of the service UUIDs and scan the list
					// looking to see if the serviceUuid is anywhere in the list.
					BleUuid foundServiceUuid;
					size_t svcCount = scanResults[ii].advertisingData.serviceUUID(&foundServiceUuid, 1);
					if (svcCount > 0 && foundServiceUuid == serviceUuid) {
						peer = BLE.connect(scanResults[ii].address);
						if (peer.connected()) {
							peer.getCharacteristicByUUID(peerTxCharacteristic, txUuid);
							peer.getCharacteristicByUUID(peerRxCharacteristic, rxUuid);

							// Could do this instead, but since the names are not as standardized, UUIDs are better
							// peer.getCharacteristicByDescription(peerTxCharacteristic, "tx");
						}
						break;
					}
				}
			}
    	}

    }
}

```

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






