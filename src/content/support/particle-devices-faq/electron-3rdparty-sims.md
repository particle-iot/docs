---
title: 3rd-party SIM cards
layout: support.hbs
columns: two
order: 1020
---

# 3rd-party SIM cards

The Particle **Electron** comes with a SIM card that allows easy and often inexpensive 2G or 3G cellular access.

Sometimes, however, you may want to use a different mobile provider. You may need to transfer large amounts of data, which may be cheaper on another provider, or you may need to use the Electron in a country that's not supported by the Particle SIM. Fortunately, the Electron can easily be used with 3rd-party SIM cards.

The **E Series** does not have a SIM card slot and cannot use a 3rd-party SIM card. It uses a M2FF embedded SIM card, which is basically a regular SIM card in a small SMD form-factor and soldered to the board. 

The **Boron** has both a M2FF embedded SIM card (the default) and a nano SIM card slot for a 3rd-party SIM card. You need to tell the device which one you want to use, however.

{{collapse op="cellularDevice"}}

Several of the steps below require the Particle CLI, so if you haven't installed it yet, you should do so now. The instructions are at the [top of CLI page](/tutorials/developer-tools/cli/).

All SIMs, including 3rd-party SIMs, must be activated. The method for activating varies by carrier; you might do this from a web site or with a phone call. If you're using the SIM that was in your phone, it's already activated. Being activated or not is part of the state of the SIM and doesn't depend on what device it's being used in. 

Activation is different than claiming an Electron or other Particle device, which adds the device to your account. Claiming is discussed below.

## About ICCIDs

Every SIM card has an ICCID ("integrated circuit card identifier") that uniquely identifies the card. The number is usually 19 or 20 digits long and is usually printed on the card, though some carriers only print part of the number on the card.

Assuming your phone accepts nano-sized SIM cards (iPhone 5 and later, for example), your phone can show the ICCID. On the iPhone, it's in Settings - General - About - ICCID. 

The location varies on Android phones, and sometimes it's called the SIM ID or SIM Number instead of ICCID. There are other numbers like the IMSI and IMEI that are different, and shorter.

You can also easily find out the ICCID using the Particle CLI. Connect the Electron by USB to your computer. Hold down the MODE button until the main status LED blinks blue, then release. Issue the command:

```
particle identify
```

## About SIM PINs

The Electron and Boron do not currently support SIM cards with a PIN. If your SIM card requires a PIN, even if it's 0000, you must remove the PIN before it will work in the Electron.

The easiest way to remove a SIM PIN is from a phone. On the iPhone, it's in Settings - Phone - SIM PIN. 

## Finding your APN

The APN ("Access Point Name") specifies how the Electron should connect to the Internet. The setting varies by carrier, and sometimes by country. If you're searching Google for your APN, be aware that some carriers may list separate WAP APN or MMS APNs; you want to use the Generic or Internet APN.

There is no set structure to an APN. Here are some examples: broadband, internet, three.co.uk.

If you have set your APN correctly the Electron should proceed through the normal states: breathing white, blinking green, blinking cyan, fast blinking cyan, and finally to breathing cyan, even before you've claimed the Electron. In fact, the Electron must be in breathing cyan to complete the claiming process.

Some carriers may also require a username and password. Note those, if they are required, as well.


{{collapse op="cellularDevice"}}

{{collapse op="start" cellularDevice="Boron"}}
## Setting up a 3rd-party SIM card - Boron

- For the Boron 2G/3G most nano SIM cards are compatible.
- For the Boron LTE, support for LTE Cat M1 is required. This is an IoT-specific subset of LTE, and not all carriers support LTE Cat M1 at this time. Some may not have approved the u-blox SARA-R410M-02B modem used in the Boron LTE yet and may not allow it on their network, as well.

If you're ready to set up your Boron, follow these steps:

- Go to the [mesh firmware releases page](https://github.com/particle-iot/firmware/releases/tag/v0.8.0-rc.27).
- Download the hybrid bin file: <a href="https://github.com/particle-iot/firmware/releases/download/v0.8.0-rc.27/hybrid-0.8.0-rc.27-boron.bin" target="_blank">hybrid-0.8.0-rc.27-boron.bin</a>
- While you're at it also download: <a href="https://github.com/particle-iot/firmware/releases/download/v0.8.0-rc.27/tinker-0.8.0-rc.27-boron.bin" target="_blank">tinker-0.8.0-rc.27-boron.bin</a>
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the Device OS:

```html
particle flash --usb hybrid-0.8.0-rc.27-boron.bin
```

- Create a program to set the APN and switch to an external SIM. Here's the code. One way is to save this to a file, I called mine 3rdPartySIM.cpp.

```cpp
#include "Particle.h"

#include "dct.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	Cellular.setActiveSim(EXTERNAL_SIM);
	Cellular.setCredentials("epc.tmobile.com");

	// This clears the setup done flag on brand new devices so it won't stay in listening mode
	const uint8_t val = 0x01;
    dct_write_app_data(&val, DCT_SETUP_DONE_OFFSET, 1);

	// This is just so you know the operation is complete
	pinMode(D7, OUTPUT);
	digitalWrite(D7, HIGH);
}

void loop() {
}
```

- Replace "epc.tmobile.com" with the APN for your SIM card (see above for more details about the APN).
- Compile the code and flash it in DFU mode (blinking yellow):

```html
particle compile boron 3rdPartySIM.cpp --saveTo firmware.bin --target 0.8.0-rc.27
particle flash --usb firmware.bin
```

- The blue LED next to the USB connector should light after reboot to signal that the APN has been set.

- Flash Tinker back to the Boron:

```
particle flash --usb tinker-0.8.0-rc.27-boron.bin
```

- You should now be able to use the device with your 3rd-party SIM card!

- If you have never claimed the Boron to your account you will need to do that manually now.

  * Put the Boron in listening mode by holding down the MODE button
  * Enter this command in a command prompt or terminal window. Note the device ID.

  ```
  particle identify
  ```
  
  * Claim the device to your account. It must be breathing cyan for this to work.

  ```
  particle device add YOUR_DEVICE_ID
  ```
  
  * Name your device if desired.
   
  ```
  particle device rename YOUR_DEVICE_ID "New Name"
  ```

- To restore the use of the embedded M2FF Particle SIM card use this program instead:

```cpp
#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	Cellular.setActiveSim(INTERNAL_SIM);
	Cellular.clearCredentials();

	// This is just so you know the operation is complete
	pinMode(D7, OUTPUT);
	digitalWrite(D7, HIGH);
}

void loop() {
}
```

- This method is intended for using the Boron as a standalone, non-mesh, device, like an Electron. It's difficult to set up a mesh network using a 3rd-party SIM card at this time, because the mobile app will default to trying to activate the Particle SIM card. You can, however, set up the network using the Particle SIM and switch it to a 3rd-party SIM card once set up.
- Alternatively, there is a technique that allows you to set up a Boron with a mesh network when the Particle SIM card cannot be used, such as the Boron LTE out of the United States. It requires the Particle Ethernet FeatherWing and is [described in this community post](https://community.particle.io/t/instructions-creating-mesh-network-with-boron-lte-and-3rd-party-sim-card/46467).

## The APN setting is persistent on the Boron

On the Boron, the APN (also username and password, if used) and the SIM card choice (internal or external) is saved in configuration flash. This setting is saved across reset, power-down, user and system firmware updates.

You only need to set the APN and SIM selection once, however the keep-alive value is not saved, so you will still need to add that to your user firmware.


## Switching back to the Particle SIM - Boron

To switch back to the internal M2FF embedded Particle SIM card on the Boron, you need to flash code to change the SIM card setting:

```cpp
#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	Cellular.setActiveSim(INTERNAL_SIM);
	Cellular.clearCredentials();

	// This is just so you know the operation is complete
	pinMode(D7, OUTPUT);
	digitalWrite(D7, HIGH);
}

void loop() {
}
```

You don't need to do anything with the cloud settings or claiming when swapping between internal and external SIM cards. 

## Models and cellular bands - Boron

### Boron 2G/3G

The Boron 2G/3G uses the 5-band u-blox SARA-U201 cellular modem and can be used for 2G and 3G world-wide:

- In the Americas, it can use 2G and 3G on 850 MHz and 1900 MHz
- In Europe, Asia, and Africa it can use 900/1800 MHz for 2G and 900/2100 MHz for 3G.
- In places with a mix, like Australia, it can use combinations like 850/2100.
- In places that no longer have 2G service, like Australia, Korea, Japan, and Singapore, it will of course only use 3G.

### Boron LTE

Note that the Boron LTE is LTE Cat M1, which is a special subset of LTE for IoT devices. Many carriers do not support Cat M1 LTE at this time.

The embedded M2FF Particle SIM card on the Boron LTE only supports AT&T, and only in the United States. It may be possible to use it with a 3rd-party SIM card in other locations with the Boron LTE, but this is not currently supported and may or may not work.

{{collapse op="end"}}

{{collapse op="start" cellularDevice="Electron"}}

## Using setup.particle.io with 3rd-party SIM - Electron

Using the standard setup at [https://setup.particle.io](https://setup.particle.io) is the easiest way to get started. You'll need the ICCID of your 3rd-party SIM card. 

Sign in and select the left option, **Particle Setup an Electron w/SIM card.**

![Setup an electron with SIM](/assets/images/electron-3rdparty-sims-01electronwithsim.png)

You'll then be taken to the page for non-Particle SIM cards.

![3rd party SIM detected](/assets/images/electron-3rdparty-sims-02setup3rdparty.png)

You can follow the instructions on the page to complete setup. There are some additional hints below, as well.


## Making Tinker with APN setting - Electron

One of the features of setup.particle.io is the ability to download a version of Tinker (the default user firmware on your Electron) that sets the APN for your SIM card. 

You can also just build your own. Copy and paste this into a file, such as tinker.ino.

```cpp
#include "Particle.h"

// Set your 3rd-party SIM APN here
// https://docs.particle.io/reference/device-os/firmware/electron/#setcredentials-
STARTUP(cellular_credentials_set("epc.tmobile.com", "", "", NULL));


/* Function prototypes -------------------------------------------------------*/
int tinkerDigitalRead(String pin);
int tinkerDigitalWrite(String command);
int tinkerAnalogRead(String pin);
int tinkerAnalogWrite(String command);

SYSTEM_MODE(AUTOMATIC);

/* This function is called once at start up ----------------------------------*/
void setup()
{
	// Set the keep-alive value for 3rd party SIM card here
	// https://docs.particle.io/reference/device-os/firmware/electron/#particle-keepalive-
	// Uncomment this when building for 0.5.0 or later
	// Particle.keepAlive(120);

	//Setup the Tinker application here

	//Register all the Tinker functions
	Particle.function("digitalread", tinkerDigitalRead);
	Particle.function("digitalwrite", tinkerDigitalWrite);

	Particle.function("analogread", tinkerAnalogRead);
	Particle.function("analogwrite", tinkerAnalogWrite);
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
	//convert ascii to integer
	int pinNumber = pin.charAt(1) - '0';
	//Sanity check to see if the pin numbers are within limits
	if (pinNumber < 0 || pinNumber > 7) return -1;

	if(pin.startsWith("D"))
	{
		pinMode(pinNumber, INPUT_PULLDOWN);
		return digitalRead(pinNumber);
	}
	else if (pin.startsWith("A"))
	{
		pinMode(pinNumber+10, INPUT_PULLDOWN);
		return digitalRead(pinNumber+10);
	}
#if Wiring_Cellular
	else if (pin.startsWith("B"))
	{
		if (pinNumber > 5) return -3;
		pinMode(pinNumber+24, INPUT_PULLDOWN);
		return digitalRead(pinNumber+24);
	}
	else if (pin.startsWith("C"))
	{
		if (pinNumber > 5) return -4;
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
	//convert ascii to integer
	int pinNumber = command.charAt(1) - '0';
	//Sanity check to see if the pin numbers are within limits
	if (pinNumber < 0 || pinNumber > 7) return -1;

	if(command.substring(3,7) == "HIGH") value = 1;
	else if(command.substring(3,6) == "LOW") value = 0;
	else return -2;

	if(command.startsWith("D"))
	{
		pinMode(pinNumber, OUTPUT);
		digitalWrite(pinNumber, value);
		return 1;
	}
	else if(command.startsWith("A"))
	{
		pinMode(pinNumber+10, OUTPUT);
		digitalWrite(pinNumber+10, value);
		return 1;
	}
#if Wiring_Cellular
	else if(command.startsWith("B"))
	{
		if (pinNumber > 5) return -4;
		pinMode(pinNumber+24, OUTPUT);
		digitalWrite(pinNumber+24, value);
		return 1;
	}
	else if(command.startsWith("C"))
	{
		if (pinNumber > 5) return -5;
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
	//convert ascii to integer
	int pinNumber = pin.charAt(1) - '0';
	//Sanity check to see if the pin numbers are within limits
	if (pinNumber < 0 || pinNumber > 7) return -1;

	if(pin.startsWith("D"))
	{
		return -3;
	}
	else if (pin.startsWith("A"))
	{
		return analogRead(pinNumber+10);
	}
#if Wiring_Cellular
	else if (pin.startsWith("B"))
	{
		if (pinNumber < 2 || pinNumber > 5) return -3;
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

	if(command.substring(0,2) == "TX")
	{
		pinMode(TX, OUTPUT);
		analogWrite(TX, value.toInt());
		return 1;
	}
	else if(command.substring(0,2) == "RX")
	{
		pinMode(RX, OUTPUT);
		analogWrite(RX, value.toInt());
		return 1;
	}

	//convert ascii to integer
	int pinNumber = command.charAt(1) - '0';
	//Sanity check to see if the pin numbers are within limits

	if (pinNumber < 0 || pinNumber > 7) return -1;

	if(command.startsWith("D"))
	{
		pinMode(pinNumber, OUTPUT);
		analogWrite(pinNumber, value.toInt());
		return 1;
	}
	else if(command.startsWith("A"))
	{
		pinMode(pinNumber+10, OUTPUT);
		analogWrite(pinNumber+10, value.toInt());
		return 1;
	}
	else if(command.substring(0,2) == "TX")
	{
		pinMode(TX, OUTPUT);
		analogWrite(TX, value.toInt());
		return 1;
	}
	else if(command.substring(0,2) == "RX")
	{
		pinMode(RX, OUTPUT);
		analogWrite(RX, value.toInt());
		return 1;
	}
#if Wiring_Cellular
	else if (command.startsWith("B"))
	{
		if (pinNumber > 3) return -3;
		pinMode(pinNumber+24, OUTPUT);
		analogWrite(pinNumber+24, value.toInt());
		return 1;
	}
	else if (command.startsWith("C"))
	{
		if (pinNumber < 4 || pinNumber > 5) return -4;
		pinMode(pinNumber+30, OUTPUT);
		analogWrite(pinNumber+30, value.toInt());
		return 1;
	}
#endif
else return -2;
}

```

Put the Electron in DFU mode ([blinking yellow](/tutorials/device-os/led/electron/#dfu-mode-device-firmware-upgrade-)) by holding down the RESET and MODE buttons, releasing RESET and continuing to hold down MODE while the main status LED blinks magenta until it blinks yellow. Then release MODE.

```
particle compile electron --target 0.4.8 tinker.ino --saveTo firmware.bin
particle flash --usb firmware.bin
```

You can flash an Electron with code even before you're claimed it or gotten connected to the Internet. In fact, you'll have to when you're using a 3rd-party SIM.


## About APN setting persistence - Electron

On the Electron, APN setting is not stored in configuration flash. Thus you should include it in every program that you run on the Electron that uses a 3rd party SIM. This is different than the Photon, where configuration parameters like Wi-Fi settings are stored in configuration flash. 

In other words, even though you flashed a APN setting Tinker to your Electron, you still need to set the APN in your own user firmware, because the setting is not saved.

You can be fooled into believing otherwise, because the APN is actually stored in the cellular modem, and flashing new user code or using the RESET button doesn't completely reset the modem to save time and data usage. So it looks like the setting sticks, but as soon as you completely power down the modem by unplugging the battery or using deep sleep the APN setting will go away.

## Switching between Particle and 3rd-party SIM cards - Electron

The only thing you need to do when switching between Particle and 3rd-party SIM cards is update the firmware to set or not set the APN and keep-alive, completely power down the Electron, swap the SIM card, and power it back up.

You don't need to do anything with the cloud settings or claiming when swapping between SIM cards. 

## Models and cellular bands - Electron

### Electron

The 3G Electrons come in two varieties, the Americas/Australia (U260) and Europe/Asia/Africa (U270). 

The lines are not that clearly drawn, however, and may vary by carrier in a given country. For example:

In Australia, we recommend the U260 because the carrier used by the Particle SIM, Telstra, primarily uses 850 MHz. However, if you are using a 3rd-party SIM from Optus, you'll need the U270 because Optus uses 900/2100 MHz.

In Uruguay, the carrier used by the Particle SIM, Movistar, uses 1900 MHz so the U260 Americas model is the correct one. If you're using an Ancel SIM, however, that uses 2100 MHz you you'll nee the U270 model, instead.

The U260 model supports 850/1900 MHz for both 3G (UMTS/HSPA) and 2G (GPRS/EDGE).

The U270 model supports 900/2100 MHz for 3G (UMTS/HSPA) and 900/1800 MHz for 2G (GPRS/EDGE).

The 2G Electron (G350) supports 850, 900, 1800 and 1900 MHz (GPRS/EDGE).

### E Series E310

The E Series E310 uses the 5-band u-blox SARA-U201 cellular modem and can be used for 2G and 3G world-wide:

- In the Americas, it can use 2G and 3G on 850 MHz and 1900 MHz
- In Europe, Asia, and Africa it can use 900/1800 MHz for 2G and 900/2100 MHz for 3G.
- In places with a mix, like Australia, it can use combinations like 850/2100.
- In places that no longer have 2G service, like Australia, Korea, Japan, and Singapore, it will of course only use 3G.

### E Series E402

Note that the E Series LTE is LTE Cat M1, which is a special subset of LTE for IoT devices. Many carriers do not support Cat M1 LTE at this time.

The embedded M2FF Particle SIM card on the E Series E402 only supports AT&T, and only in the United States.


{{collapse op="end"}}


## Claiming an Electron or Boron manually

Once your device is breathing cyan after successfully setting the APN, you can claim it.

You'll need the device ID of your device. You can get it by putting the device in [listening mode](/tutorials/device-os/led/electron/#listening-mode), blinking dark blue, by holding down the MODE button until the main status LED blinks blue, then issuing the CLI command:

```
particle identify
```

The device ID is different from your SIM ICCID.


### Claiming from Particle Build (Web IDE)

Click the devices icon in the lower left corner of the Particle Build [https://build.particle.io](https://build.particle.io) window.

![Particle Build Devices Icon](/assets/images/electron-3rdparty-sims-03devices.png)

At the bottom of your list of devices is **Add New Device** button. Click that and enter the device ID.

### Claiming from Particle Dev (Atom IDE)

Using Particle Dev on Windows or Mac, select **Claim Device...** from the **Particle** menu and enter the device ID.


### Claiming from the CLI

With the device in breathing cyan mode, issue the CLI command:

```
particle device add YOUR_DEVICE_ID
```

## About keep-alive

When mobile devices, including phones and the Electron and Boron, connect to the Internet they share a connection through their mobile carrier, similar to how multiple computers in your home share a connection through your home router.

When the device sends data to the Particle cloud, the carrier also opens up a reverse channel to allow the Particle cloud servers to send data back to the device. 

(Technically speaking, the device sends UDP data out, and the carrier creates port forwarding to a UDP listening port on the device to get data back.)

These return data channels take up resources on the carrier network, so they like to clean up the unused ones to free up the resources. The Particle SIM has an unusually long timeout of 23 minutes. Most carriers use a timeout of between 30 seconds and several minutes.

When the return channel is freed, the device will continue to breathe cyan, because it doesn't know that it has occurred. Also, it will still be able to send data to the cloud, so things like Particle.publish will work, and will also restart the return channel if it has been cleaned up.

The problem is that without a working return channel the following things don't work properly:

- Subscriptions using Particle.subscribe sending data to the device
- Calling Particle functions on the device
- Getting the value of Particle variables on the device
- OTA code flash

If you're using a 3rd-party SIM card you almost certainly will need to use the [Particle.keepAlive()](/reference/device-os/firmware/electron/#particle-keepalive-) function. It's typically added to setup and the parameter is in seconds.

```
void setup()
{
	// Set the keep-alive value for 3rd party SIM card here
	Particle.keepAlive(120);
}
```

Each keep-alive ping uses 122 bytes of data, so you want to make it as long as possible for it to work with your carrier.

One way to determine the correct interval is to run the Tinker firmware on your device with the APN set. Reset the device then wait an interval before using a Particle function like:

```
particle call YOUR_DEVICE_NAME digitalWrite "D7=HIGH"
particle call YOUR_DEVICE_NAME digitalWrite "D7=LOW"
```

Find the longest interval where the calls still work, and that's what you should set as your keep-alive. It's usually between 30 seconds and several minutes.

For the Electron, also note that the keep-alive settings is only in device OS 0.5.0 and later, so if you have the original factory default firmware 0.4.8 you'll need to upgrade the Device OS.

In Device OS 0.6.2 through 0.8.0-rc.3, there is an issue where the Particle.keepAlive value does not stay properly set. The workaround is as follows:

Create a global variable, such as:

```
bool hasSetKeepAlive = false;
```

And add this to your loop:

```
	if (Particle.connected()) {
		if (!hasSetKeepAlive) {
			hasSetKeepAlive = true;
			Particle.keepAlive(120);
		}
	}
	else {
		hasSetKeepAlive = false;		
	}
```

Basically, you need to set the keep alive only after successfully connected to the Particle cloud, and every time you've disconnected.


## More troubleshooting tips

### Blinking Blue

If, when you power on the Electron, it's blinking dark blue ([listening mode blue](/tutorials/device-os/led/electron/#listening-mode)), the most common cause is that the SIM is loose. Try removing it and putting it back in again.

Or you can try to either gently lift the little metal prongs that contact the SIM with a pin (with power off and SIM card removed) or push down on the little metal holder to get a better contact.

### Stuck on blinking green

If the Electron or Boron never progresses past [blinking green](/tutorials/device-os/led/electron/#looking-for-internet), it probably can't contact a cellular tower. There are several possible reasons for this:

- No coverage on the required band. For example, you have a 2G Electron but no 2G coverage. 2G coverage may be different than 3G, 4G or LTE coverage.
- No coverage from the selected carrier/SIM.
- Incompatible Electron (U260 when you need a U270 for example)
- No LTE Cat M1 service for Boron LTE
- Antenna problem

Also note that the 2G Electron is not supported in Japan, Australia, Korea, and Singapore, and has limited coverage in some parts of the United States. Other countries may phase out 2G as well, this is often referred to as "2G Sunset."

### Blinking magenta

[Blinking magenta](/tutorials/device-os/led/electron/#safe-mode) is safe mode, and is an entirely different problem than connectivity. You can find more about safe mode in [this post](https://community.particle.io/t/safe-mode-explained/26259).


{{collapse op="start" cellularDevice="Electron"}}

## Electron troubleshooting app

The Electron troubleshooting app allows you to test individual features of connectivity. A report from this tool is helpful if you have a problem that you need to report to technical support.

[https://docs.google.com/document/d/1U_Wzy2SPRC3hZnKtw8d6QN2Tm8Q7QwtEbSUAeTkO3bk](https://docs.google.com/document/d/1U_Wzy2SPRC3hZnKtw8d6QN2Tm8Q7QwtEbSUAeTkO3bk/edit)


## Electron tester

This program can print some useful information about your cellular connection that may be helpful for debugging:

- Model information
- ICCID, IMEI, IMSI numbers
- Cellular operator ("AT&T" for example)
- Signal strength (RSSI) and quality
- Cellular band ("UMTS 850" for example)


[https://github.com/rickkas7/electron_cellular](https://github.com/rickkas7/electron_cellular)

{{collapse op="end"}}
