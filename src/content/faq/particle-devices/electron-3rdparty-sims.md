---
title: 3rd-party SIM cards
layout: faq.hbs
columns: two
devices: [ electron ]
order: 1020
---

# 3rd-party SIM cards

The [Particle Electron](https://www.particle.io/products/hardware/electron-cellular-dev-kit) comes with a SIM card that allows easy and [often inexpensive](https://www.particle.io/pricing#cellular-data) 2G or 3G cellular access.

Sometimes, however, you may want to use a different mobile provider. You may need to transfer large amounts of data, which may be cheaper on another provider, or you may need to use the Electron in a country that's not supported by the Particle SIM. Fortunately, the Electron can easily be used with 3rd-party SIM cards.

Several of the steps below require the Particle CLI, so if you haven't installed it yet, you should do so now. The instructions are at the [top of CLI page](/guide/tools-and-features/cli/).

All SIMs, including 3rd-party SIMs, must be activated. The method for activating varies by carrier; you might do this from a web site or with a phone call. If you're using the SIM that was in your phone, it's already activated. Being activated or not is part of the state of the SIM and doesn't depend on what device it's being used in. 

Activation is different than claiming an Electron, which adds the Electron to your account. Claiming is discussed below.

## About ICCIDs

Every SIM card has an ICCID ("integrated circuit card identifier") that uniquely identifies the card. The number is usually 19 or 20 digits long and is usually printed on the card, though some carriers only print part of the number on the card.

Assuming your phone accepts nano-sized SIM cards (iPhone 5 and later, for example), your phone can show the ICCID. On the iPhone, it's in Settings - General - About - ICCID. 

The location varies on Android phones, and sometimes it's called the SIM ID or SIM Number instead of ICCID. There are other numbers like the IMSI and IMEI that are different, and shorter.

You can also easily find out the ICCID using the Particle CLI. Connect the Electron by USB to your computer. Hold down the MODE button until the main status LED blinks blue, then release. Issue the command:

```
particle identify
```

## About SIM PINs

The Electron does not currently support SIM cards with a PIN. If your SIM card requires a PIN, even if it's 0000, you must remove the PIN before it will work in the Electron.

The easiest way to remove a SIM PIN is from a phone. On the iPhone, it's in Settings - Phone - SIM PIN. 

## Using setup.particle.io with 3rd-party SIM

Using the standard setup at [https://setup.particle.io](https://setup.particle.io) is the easiest way to get started. You'll need the ICCID of your 3rd-party SIM card. 

Sign in and select the left option, **Particle Setup an Electron w/SIM card.**

![Setup an electron with SIM](/assets/images/electron-3rdparty-sims-01electronwithsim.png)

You'll then be taken to the page for non-Particle SIM cards.

![3rd party SIM detected](/assets/images/electron-3rdparty-sims-02setup3rdparty.png)

You can follow the instructions on the page to complete setup. There are some additional hints below, as well.

## Finding your APN

The APN ("Access Point Name") specifies how the Electron should connect to the Internet. The setting varies by carrier, and sometimes by country. If you're searching Google for your APN, be aware that some carriers may list separate WAP APN or MMS APNs; you want to use the Generic or Internet APN.

There is no set structure to an APN. Here are some examples: broadband, internet, three.co.uk.

If you have set your APN correctly the Electron should proceed through the normal states: breathing white, blinking green, blinking cyan, fast blinking cyan, and finally to breathing cyan, even before you've claimed the Electron. In fact, the Electron must be in breathing cyan to complete the claiming process.

Some carriers may also require a username and password. Note those, if they are required, as well.

## Making Tinker with APN setting

One of the features of setup.particle.io is the ability to download a version of Tinker (the default user firmware on your Electron) that sets the APN for your SIM card. 

You can also just build your own. Copy and paste this into a file, such as tinker.ino.

```cpp
#include "Particle.h"

// Set your 3rd-party SIM APN here
// https://docs.particle.io/reference/firmware/electron/#setcredentials-
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
	// https://docs.particle.io/reference/firmware/electron/#particle-keepalive-
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

Put the Electron in DFU mode ([blinking yellow](/guide/getting-started/modes/electron/#dfu-mode-device-firmware-upgrade-)) by holding down the RESET and MODE buttons, releasing RESET and continuing to hold down MODE while the main status LED blinks magenta until it blinks yellow. Then release MODE.

```
particle compile electron --target 0.4.8 tinker.ino --saveTo firmware.bin
particle flash --usb firmware.bin
```

You can flash an Electron with code even before you're claimed it or gotten connected to the Internet. In fact, you'll have to when you're using a 3rd-party SIM.


## About APN setting (lack of) persistence

The APN setting is not stored in configuration flash on the Electron. Thus you should include it in every program that you run on the Electron that uses a 3rd party SIM. This is different than the Photon, where configuration parameters like Wi-Fi settings are stored in configuration flash. 

In other words, even though you flashed a APN setting Tinker to your Electron, you still need to set the APN in your own user firmware, because the setting is not saved.

You can be fooled into believing otherwise, because the APN is actually stored in the cellular modem, and flashing new user code or using the RESET button doesn't completely reset the modem to save time and data usage. So it looks like the setting sticks, but as soon as you completely power down the modem by unplugging the battery or using deep sleep the APN setting will go away.


## Claiming an Electron manually

In addition to using the setup.particle.io method above, once your Electron is breathing cyan after successfully setting the APN, you can claim an Electron with a 3rd-party SIM or an activated Particle SIM manually.

You'll need the device ID of your Electron. You can get it by putting the Electron in [listening mode](/guide/getting-started/modes/electron/#listening-mode), blinking dark blue, by holding down the MODE button until the main status LED blinks blue, then issuing the CLI command:

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

With the Electron in breathing cyan mode, issue the CLI command:

```
particle device add YOUR_DEVICE_ID
```

## About keep-alive

When mobile devices, including phones and the Electron, connect to the Internet they share a connection through their mobile carrier, similar to how multiple computers in your home share a connection through your home router.

When the Electron sends data to the Particle cloud, the carrier also opens up a reverse channel to allow the Particle cloud servers to send data back to the device. 

(Technically speaking, the Electron sends UDP data out, and the carrier creates port forwarding to a UDP listening port on the Electron to get data back.)

These return data channels take up resources on the carrier network, so they like to clean up the unused ones to free up the resources. The Particle SIM has an unusually long timeout of 23 minutes. Most carriers use a timeout of between 30 seconds and several minutes.

When the return channel is freed, the Electron will continue to breathe cyan, because it doesn't know that it has occurred. Also, it will still be able to send data to the cloud, so things like Particle.publish will work, and will also restart the return channel if it has been cleaned up.

The problem is that without a working return channel the following things don't work properly:

- Subscriptions using Particle.subscribe sending data to the Electron
- Calling Particle functions on the Electron
- Getting the value of Particle variables on the Electron
- OTA code flash

If you're using a 3rd-party SIM card you almost certainly will need to use the [Particle.keepAlive()](/reference/firmware/electron/#particle-keepalive-) function. It's typically added to setup and the parameter is in seconds.

```
void setup()
{
	// Set the keep-alive value for 3rd party SIM card here
	Particle.keepAlive(120);
}
```

Each keep-alive ping uses 122 bytes of data, so you want to make it as long as possible for it to work with your carrier.

One way to determine the correct interval is to run the Tinker firmware on your Electron with the APN set. Reset the Electron then wait an interval before using a Particle function like:

```
particle call YOUR_DEVICE_NAME digitalWrite "D7=HIGH"
particle call YOUR_DEVICE_NAME digitalWrite "D7=LOW"
```

Find the shortest interval where the calls still work, and that's what you should set as your keep-alive. It's usually between 30 seconds and several minutes.

Also note that the keep-alive settings is only in Electron Device OS
0.5.0 and later, so if you have the original factory default firmware
0.4.8 you'll need to upgrade the Device OS.


## Switching between Particle and 3rd-party SIM cards

The only thing you need to do when switching between Particle and 3rd-party SIM cards is update the firmware to set or not set the APN and keep-alive, completely power down the Electron, swap the SIM card, and power it back up.

You don't need to do anything with the cloud settings or claiming when swapping between SIM cards. 

## Electron models and cellular bands

The 3G Electrons come in two varieties, the Americas/Australia (U260) and Europe/Asia/Africa (U270). 

The lines are not that clearly drawn, however, and may vary by carrier in a given country. For example:

In Australia, we recommend the U260 because the carrier used by the Particle SIM, Telstra, primarily uses 850 MHz. However, if you are using a 3rd-party SIM from Optus, you'll need the U270 because Optus uses 900/2100 MHz.

In Uruguay, the carrier used by the Particle SIM, Movistar, uses 1900 MHz so the U260 Americas model is the correct one. If you're using an Ancel SIM, however, that uses 2100 MHz you you'll nee the U270 model, instead.

The U260 model supports 850/1900 MHz for both 3G (UMTS/HSPA) and 2G (GPRS/EDGE).

The U270 model supports 900/2100 MHz for 3G (UMTS/HSPA) and 900/1800 MHz for 2G (GPRS/EDGE).


## More troubleshooting tips

### Blinking Blue

If, when you power on the Electron, it's blinking dark blue ([listening mode blue](/guide/getting-started/modes/electron/#listening-mode)), the most common cause is that the SIM is loose. Try removing it and putting it back in again.

Or you can try to either gently lift the little metal prongs that contact the SIM with a pin (with power off and SIM card removed) or push down on the little metal holder to get a better contact.

### Stuck on blinking green

If the Electron never progresses past [blinking green](/guide/getting-started/modes/electron/#looking-for-internet), it probably can't contact a cellular tower. There are several possible reasons for this:

- No coverage on the required band. For example, you have a 2G Electron but no 2G coverage. 2G coverage may be different than 3G, 4G or LTE coverage.
- No coverage from the selected carrier/SIM.
- Incompatible Electron (U260 when you need a U270 for example)
- Antenna problem

Also note that the 2G Electron is not supported in Japan. It will be discontinued in Australia at the end of 2016, and has limited coverage in some parts of the United States. Other countries may phase out 2G as well, this is often referred to as "2G Sunset."

### Blinking magenta

[Blinking magenta](/guide/getting-started/modes/electron/#safe-mode) is safe mode, and is an entirely different problem than connectivity. You can find more about safe mode in [this post](https://community.particle.io/t/safe-mode-explained/26259).


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

