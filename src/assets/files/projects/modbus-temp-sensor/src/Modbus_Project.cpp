/*********************************************************************
 * Project Modbus_Project
 * Description:  Creating a project that communicates with a
 *               peripherial device, temp sensor, using Modbus RTU
 *               over RS485.
 * Author:       Erik Fasnacht
 * Date:         08/25/22
 *********************************************************************/
#include "Particle.h"

/********************************************************************/
//! /brief library includes
#include <ModbusMaster.h>
#include "JsonParserGeneratorRK.h"

/********************************************************************/
//! /brief  declarations
#define SUCCESS 1 // success code for modbus
#define FAIL -1	  // fail code for modbus
#define BAUD 9600 // baud rate for modbus and UART
#define MODADDR 1 // sets server (slave) address for modbus
#define SERIAL1 1 // used to select Serial1, RX/TX pins for Modbus

/********************************************************************/
//! /brief global constants
const int RT = D5; // constant for R/T pin set to D5, PWM1 on MikroBUS1

/********************************************************************/
//! /brief global variables
double curHum;	// current humidity (%)
double curTemp; // current temperature (°F)

int result; // modbus error code

int humSet = 40;  // humidity setpoint, preset to 40%
int tempSet = 75; // temperature setpoint, preset to 75°F

int humWindow = 5;	// humidity window, preset to +/- 5%
int tempWindow = 5; // temperature window, preset to +/- 5°F

int senFreq = 60; // sensor publish frequency (in seconds), preset to 60 seconds
int warFreq = 60; // warning publish frequency (in seconds), preset to 60 seconds

/********************************************************************/
//! /brief Other settings

// Name of published event with temperature/humidity information
const char *sensorEventName = "modbus-sensor";

// Name of the published event for error/warning messages. This is typically the
// same as the sensorEventName, but could be different if you prefer.
const char *errorEventName = sensorEventName;

// How often to check the sensor. Default: Every 1 second
const std::chrono::milliseconds checkInterval = 1s; // check sensor every 1 second

/********************************************************************/
//! /brief particle platform initialization
SYSTEM_MODE(AUTOMATIC); // connect app to cloud automatically
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler;

// To enable more debugging, use this version instead of the one above:
// SerialLogHandler logHandler(LOG_LEVEL_TRACE);

/********************************************************************/
//! /brief modbus initialization
ModbusMaster node(SERIAL1, MODADDR); // selects serial1 port and address id 1

/********************************************************************/
//! /brief forward declarations
int setHumidityWindow(String value);
int setTemperatureWindow(String value);
int temperatureSetpoint(String value);
int humiditySetpoint(String value);
int setPublishFrequency(String value);
int setWarningFrequency(String value);

int getSensorValues();
void publishSensorValues();
void publishWarningMessage(int errorCode = 0);

/********************************************************************/
//! /brief setup loop, only runs once at inital startup
void setup()
{
	//! setup cloud functions, best practice to do first in setup loop
	Particle.function("HumWindow", setHumidityWindow);	   // set humidity window
	Particle.function("TempWindow", setTemperatureWindow); // set temperature window

	Particle.function("HumSetPoint", humiditySetpoint);		// set humidity set point
	Particle.function("TempSetPoint", temperatureSetpoint); // set temperature set point

	Particle.function("SensorPublish", setPublishFrequency);  // set senor publish frequency (seconds)
	Particle.function("WarningPublish", setWarningFrequency); // set warning publish frequency (seconds)

	//! initialize Modbus communication baud rate and TX pin
	node.begin(BAUD);	  // set baud rate for modbus
	node.enableTXpin(RT); // TX enable pin of RS485 driver
}

/********************************************************************/
//! /brief main code loop, runs continuously
void loop()
{
	static unsigned long lastCheck = 0;
	static unsigned long lastSend = 0;
	static unsigned long lastWarning = 0;

	if (millis() - lastCheck >= checkInterval.count())
	{
		lastCheck = millis();

		//! get current temp and humidity and check for modbus comm error
		if (getSensorValues() == SUCCESS) // get current temp and humidity
		{
			//! check for whether temp and humdity is outside of window
			if ((curTemp < (tempSet - tempWindow)) || (curTemp > (tempSet + tempWindow)) || (curHum < (humSet - humWindow)) || (curHum > (humSet + humWindow)))
			{
				if (millis() - lastWarning >= (warFreq * 1000))
				{
					lastWarning = millis();

					//! publish warning message with sensor data
					publishWarningMessage(); // send warning message
				}
			}

			//! temp/humidity within window
			else
			{
				//! publish data at set interval
				if (millis() - lastSend >= (senFreq * 1000))
				{
					lastSend = millis();

					//! publish sensor data
					publishSensorValues(); // send temp and humidity
				}
			}
		}

		//! modbus error occurred
		else
		{
			//! publish data at set interval (same as warning interval)
			if (millis() - lastWarning >= (warFreq * 1000))
			{
				lastWarning = millis();
				publishWarningMessage(result); // send warning message
			}
		}
	}
}

/********************************************************************/
//! /brief function for reading temp and humidity
int getSensorValues()
{
	//! local variables
	uint16_t data[2]; // create a 2 element array of 16 bit ints
	double tempC;	  // variable for temp in celcius

	// readHoldingRegisters and readInputRegisters take two parameters:
	// - the register to start reading from
	// - the number of registers to read (1, 2, ...)

	// Some sensors have the temperature and humidity in holding register 0 and 1. If so, use this version:
	result = node.readHoldingRegisters(0x0000,2);

	// Some sensors have the temperature and humidity in input registers 1 and 2. If so, use this version:
	// result = node.readInputRegisters(1, 2);

	// If you get Modbus Read Error 0x02 (ku8MBIllegalDataAddress), you probably have the wrong register
	// or input/holding selection for your sensor.

	//! read was successful
	if (result == node.ku8MBSuccess)
	{
		//! parse response buffer
		for (uint8_t i = 0; i < 2; i++)
		{
			data[i] = node.getResponseBuffer(i);
		}

		curHum = data[0] / 10;		  // humidity received divide by 10
		tempC = data[1] / 10;		  // temp received divide by 10
		curTemp = (tempC * 1.8) + 32; // convert celsuis to fahrenheit

		// debug serial messages
		Log.trace("Hum=%.1f (%% RH), Temp=%.1f (C) =%.1f (F)", curHum, tempC, curTemp);

		return SUCCESS; // return success code
	}

	//! communication failure occured
	else
	{
		// debug serial messages
		Log.info("Modbus Read Error 0x%02x", result);

		return FAIL; // return fail code
	}
}

/********************************************************************/
//! /brief function for changing humidity window
//! @param value is a string used for changing the window, value should be a whole integer or null. Example value = 5
int setHumidityWindow(String value)
{
	//! null case, return current value
	if (value == NULL)
	{
		return humWindow; // return current value
	}

	//! update to new value passed and return new value
	else
	{
		humWindow = value.toInt(); // set new volue to global variable
		Log.info("humWindow=%d", humWindow);
		return humWindow; // return new value
	}
}

/********************************************************************/
//! /brief function for changing temperature window
//! @param value is a string used for changing the window, value should be a whole integer or null. Example value = 5
int setTemperatureWindow(String value)
{
	//! null case, return current value
	if (value == NULL)
	{
		return tempWindow; // return current value
	}

	//! update to new value passed and return new value
	else
	{
		tempWindow = value.toInt(); // set new volue to global variable
		Log.info("tempWindow=%d", tempWindow);
		return tempWindow; // return new value
	}
}

/********************************************************************/
//! /brief function for changing temperature set point
//! @param value is a string used for changing the set point, value should be a whole integer or null. Example value = 75
int temperatureSetpoint(String value)
{
	//! null case, return current value
	if (value == NULL)
	{
		return tempSet; // return current value
	}

	//! update to new value passed and return new value
	else
	{
		tempSet = value.toInt(); // set new volue to global variable
		Log.info("tempSet=%d", tempSet);
		return tempSet; // return new value
	}
}

/********************************************************************/
//! /brief function for changing humidity set point
//! @param value is a string used for changing the set point, value should be a whole integer or null. Example value = 45
int humiditySetpoint(String value)
{
	//! null case, return current value
	if (value == NULL)
	{
		return humSet; // return current value
	}

	//! update to new value passed and return new value
	else
	{
		humSet = value.toInt(); // set new volue to global variable
		Log.info("humSet=%d", humSet);
		return humSet; // return new value
	}
}

/********************************************************************/
//! /brief function for changing the sensor publish frequency in seconds
//! @param value is a string used for changing the frequency, value should be a whole integer or null. Example value = 60
int setPublishFrequency(String value)
{
	//! null case, return current value
	if (value == NULL)
	{
		return senFreq; // return current value
	}

	//! update to new value passed and return new value
	else
	{
		senFreq = value.toInt(); // set new volue to global variable
		Log.info("senFreq=%d", senFreq);
		return senFreq; // return new value
	}
}

/********************************************************************/
//! /brief function for changing the warning publish frequency
//! @param value is a string used for changing the frequency, value should be a whole integer or null. Example value = 20
int setWarningFrequency(String value)
{
	//! null case, return current value
	if (value == NULL)
	{
		return warFreq; // return current value
	}

	//! update to new value passed and return new value
	else
	{
		warFreq = value.toInt(); // set new volue to global variable
		Log.info("warFreq=%d", warFreq);
		return warFreq; // return new value
	}
}

/********************************************************************/
//! /brief function to publish the sensor state to cloud in JSON
void publishSensorValues()
{
	//! create JSON buffer and write values to it
	JsonWriterStatic<256> jw; // creates a 256 byte buffer to write JSON to
	{
		JsonWriterAutoObject obj(&jw);									  // creates an object to pass JSON
		jw.insertKeyValue("Temperature", curTemp);						  // set field for temperature
		jw.insertKeyValue("Humidity", curHum);							  // set field for humidity
		jw.insertKeyValue("Time", Time.format(TIME_FORMAT_ISO8601_FULL)); // set field for time stamp
	}

	Log.info("%s %s", sensorEventName, jw.getBuffer());

	//! send publish only if cloud is connected
	if (Particle.connected() == TRUE)
	{
		Particle.publish(sensorEventName, jw.getBuffer());
	}
}

/********************************************************************/
//! /brief function to publish the sensor state to cloud in JSON
void publishWarningMessage(int errorCode)
{
	//! create JSON buffer and write values to it
	JsonWriterStatic<256> jw; // creates a 256 byte buffer to write JSON to
	{
		JsonWriterAutoObject obj(&jw);

		if (errorCode == 0)
		{
			jw.insertKeyValue("Warning", "Out of Range"); // set field for warning message
			jw.insertKeyValue("Temperature", curTemp);	  // set field for temperature
			jw.insertKeyValue("Humidity", curHum);		  // set field for humidity
		}
		else
		{
			jw.insertKeyValue("Warning", "Modbus Read Error"); // set field for warning message
			jw.insertKeyValue("ErrorCode", errorCode);
		}
		jw.insertKeyValue("Time", Time.format(TIME_FORMAT_ISO8601_FULL)); // set field for time stamp
	}

	Log.info("%s %s", errorEventName, jw.getBuffer());

	//! send publish only if cloud is connected
	if (Particle.connected() == TRUE)
	{
		Particle.publish(errorEventName, jw.getBuffer());
	}
}