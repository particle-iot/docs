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
#define SUCCESS 1       //success code for modbus
#define FAIL -1         //fail code for modbus
#define BAUD 9600		//baud rate for modbus and UART
#define MODADDR 1		//sets server (slave) address for modbus
#define SERIAL1 1		//used to select Serial1, RX/TX pins for Modbus
			
/********************************************************************/
//! /brief global constants
const int RT = D5;		//constant for R/T pin set to D5, PWM1 on MikroBUS1

/********************************************************************/
//! /brief global variables
double curHum;			//current humidity (%)
double curTemp;			//current temperature (°F)

int result;				//modbus error code

int humSet = 40;		//humidity setpoint, preset to 40%
int tempSet = 75;		//temperature setpoint, preset to 75°F

int humWindow = 5;		//humidity window, preset to +/- 5%
int tempWindow = 5;		//temperature window, preset to +/- 5°F

int senFreq = 60;		//sensor publish frequency, preset to 60 seconds
int warFreq = 20;		//warning publish frequency, preset to 20 seconds

/********************************************************************/
//! /brief particle platform initialization
SYSTEM_MODE(AUTOMATIC);         //connect app to cloud automatically
SYSTEM_THREAD(DISABLED);        //SYSTEM_THREAD(ENABLED) breaks app and the cloud will miss temp/hum reading

/********************************************************************/
//! /brief modbus initialization
ModbusMaster node(SERIAL1,MODADDR);			//selects serial1 port and address id 1

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
void publishWarningMessage();

/********************************************************************/
//! /brief setup loop, only runs once at inital startup
void setup() 
{
    //! setup cloud functions, best practice to do first in setup loop
 	Particle.function("Humidity Window", setHumidityWindow);     		//set humidity window
	Particle.function("Temperature Window", setTemperatureWindow);		//set temperature window

	Particle.function("Humidity Set Point", humiditySetpoint);					//set humidity set point
	Particle.function("Temperature Set Point (°F)", temperatureSetpoint);		//set temperature set point

	Particle.function("Sensor Publish Frequency (sec)", setPublishFrequency);		//set senor publish frequency (seconds) 
	Particle.function("Warning Publish Frequency (sec)", setWarningFrequency);		//set warning publish frequency (seconds)

	//! sets up baud rate for serial port
	Serial.begin(BAUD);         //set baud rate for usb serial

    //! initialize Modbus communication baud rate and TX pin
	node.begin(BAUD);			//set baud rate for modbus
	node.enableTXpin(RT);		//TX enable pin of RS485 driver
}


/********************************************************************/
//! /brief main code loop, runs continuously
void loop() 
{
	//! get current temp and humidity and check for modbus comm error
	if (getSensorValues() == SUCCESS)		//get current temp and humidity
	{
		//! check for whether temp and humdity is outside of window
		if ((curTemp <(tempSet-tempWindow)) || (curTemp > (tempSet+tempWindow)) || (curHum < (humSet-humWindow)) || (curHum > (humSet+humWindow)))		
		{
			//! publish data at set interval
			if ((Time.second() % warFreq) == 0)      //modulo for warning publish interval
			{
				//! publish warning message with sensor data
				publishWarningMessage();		//send warning message
			}
		}

		//! temp/humidity within window
		else
		{
			//! publish data at set interval
			if ((Time.second() % senFreq) == 0)       //modulo for sensor publish interval
			{
				//! publish sensor data
				publishSensorValues();		//send temp and humidity 
			}
		}
	}

	//! modbus error occurred
	else
	{
		//! publish data at set interval (same as warning interval)
		if ((Time.second() % warFreq) == 0)       //modulo for modbus warning, same as temp/hum warning frequency
        {
			//! send error message
			Particle.publish("Error Message:", String::format("%#02x", result));
		}
	}

	delay(1s);      //delay between sensor readings
}

/********************************************************************/
//! /brief function for reading temp and humidity
int getSensorValues() 
{
	//! local variables
	uint16_t data[2];		//create a 2 element array of 16 bit ints 
	double tempC;			//variable for temp in celcius
	
	//! get temp and humidity from modbus sensor, humdity register starts @ address 0 and we want to read two 16-bit registers
	result = node.readHoldingRegisters(0x0000,2);
	
	//! read was successful
	if (result == node.ku8MBSuccess) 
	{
		//! parse response buffer
		for (uint8_t i = 0; i < 2; i++) 
		{
			data[i] = node.getResponseBuffer(i);
		}

		curHum = data[0]/10;				//humidity received divide by 10
		tempC = data[1]/10;					//temp received divide by 10
		curTemp = (tempC * 1.8) + 32;		//convert celsuis to fahrenheit

		//debug serial messages
			Serial.print("Humidity = ");
			Serial.print(String::format("%.1f", curHum));
			Serial.println("%");

			Serial.print("Temperature = ");
			Serial.print(String::format("%.1f", curTemp));
			Serial.println("°F");

		return SUCCESS;		//return success code		
	} 

	//! communication failure occured
	else 
	{
		//debug serial messages
			Serial.print("Failed, Response Code: ");
			Serial.print(result, HEX); 
			Serial.println("");

		return FAIL;		//return fail code
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
		return humWindow;		//return current value
	}

	//! update to new value passed and return new value
	else
	{
		humWindow = value.toInt();		//set new volue to global variable
		return humWindow;				//return new value
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
		return tempWindow;		//return current value
	}

	//! update to new value passed and return new value
	else
	{
		tempWindow = value.toInt();		//set new volue to global variable
		return tempWindow;				//return new value
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
		return tempSet;		//return current value
	}

	//! update to new value passed and return new value
	else
	{
		tempSet = value.toInt();		//set new volue to global variable
		return tempSet;					//return new value
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
		return humSet;		//return current value
	}

	//! update to new value passed and return new value
	else
	{
		humSet = value.toInt();		//set new volue to global variable
		return humSet;				//return new value
	}
}

/********************************************************************/
//! /brief function for changing the sensor publish frequency
//! @param value is a string used for changing the frequency, value should be a whole integer or null. Example value = 60
int setPublishFrequency(String value)
{
    //! null case, return current value
    if (value == NULL)
	{
		return senFreq;		//return current value
	}

	//! update to new value passed and return new value
	else
	{
		senFreq = value.toInt();		//set new volue to global variable
		return senFreq;					//return new value
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
		return warFreq;		//return current value
	}

	//! update to new value passed and return new value
	else
	{
		warFreq = value.toInt();		//set new volue to global variable
		return warFreq;					//return new value
	}
}

/********************************************************************/
//! /brief function to publish the sensor state to cloud in JSON
void publishSensorValues() 
{
    //! send publish only if cloud is connected
    if(Particle.connected() == TRUE)
    {
        //! create JSON buffer and write values to it
		JsonWriterStatic<256> jw;		//creates a 256 byte buffer to write JSON to
        {
            JsonWriterAutoObject obj(&jw);						//creates an object to pass JSON          
            jw.insertKeyValue("Temperature (°F)", curTemp);		//set field for temperature
			jw.insertKeyValue("Humidity (%)", curHum);			//set field for humidity
            jw.insertKeyValue("Time", Time.timeStr());			//set field for time stamp
         }

        //! Publish data packet consuming 1 of the pooled Cloud Data Operations (DOPs)
        Particle.publish("Sensor Status", jw.getBuffer(), PRIVATE );
    }

	//! device isn't connected to the cloud
	else
    {
        //TODO Store and forward if offline
    }
}

/********************************************************************/
//! /brief function to publish the sensor state to cloud in JSON
void publishWarningMessage() 
{
    //! send publish only if cloud is connected
    if(Particle.connected() == TRUE)
    {
        //! create JSON buffer and write values to it
		JsonWriterStatic<256> jw;		//creates a 256 byte buffer to write JSON to
        {
            JsonWriterAutoObject obj(&jw);																		//creates an object to pass JSON
            jw.insertKeyValue("Warning", "Ambient Temperature/Humidity Outside of Setpoint +/- Window");		//set field for warning message
			jw.insertKeyValue("Temperature", curTemp);														    //set field for temperature
			jw.insertKeyValue("Humidity", curHum);															    //set field for humidity
            jw.insertKeyValue("Time", Time.timeStr());															//set field for time stamp
         }

        //! Publish data packet consuming 1 of the pooled Cloud Data Operations (DOPs)
        Particle.publish("Temp/Hum Warning", jw.getBuffer(), PRIVATE );
    }

	//! device isn't connected to the cloud
	else
    {
        //TODO Store and forward if offline
    }
}