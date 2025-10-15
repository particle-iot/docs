#include "Particle.h"

#include "ModbusMaster.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

// Generic setup for Modbus
const int MODBUS_BAUD = 9600;            // baud rate for modbus and UART
const uint8_t MODBUS_ADDR = 1;           // sets server (slave) address for modbus
const uint8_t MODBUS_PORT_NUMBER = 1;    // 1 = Serial1
const pin_t MODBUS_RT_PIN = PIN_INVALID; // Set to actual pin if using hardware receive/transmit direction control instead of auto-sense

// How often to request the the temperature
unsigned long requestLastMillis = 0;
const std::chrono::milliseconds requestPeriod = 5s;

double curHum = 0;  // current humidity (%)
double curTemp = 0; // current temperature (°C)

bool getSensorValues();

ModbusMaster node(MODBUS_PORT_NUMBER, MODBUS_ADDR); // selects serial1 port and address id 1

void setup()
{
    // This does not need to be set every time as it's saved in configuration flash,
    // however it's included here in case your Muon does not have it set, as the
    // expansion hat interface is power powered unless 3V3_AUX is enabled.
    // Also note: if this is the first time this has been set, you will need
    // to reboot again for the power to be enabled!
    SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
    powerConfig.auxiliaryPowerControlPin(D7).interruptPin(A7);
    System.setPowerConfiguration(powerConfig);

    // To see log messages at early initialization, uncomment this
    waitFor(Serial.isConnected, 10000);
    delay(2000);

    node.begin(MODBUS_BAUD);
    if (MODBUS_RT_PIN != PIN_INVALID)
    {
        node.enableTXpin(MODBUS_RT_PIN);
    }
}

void loop()
{
    if (millis() - requestLastMillis >= requestPeriod.count())
    {
        requestLastMillis = millis();

        if (getSensorValues())
        {
            Log.info("tempC=%.1lf, humidity=%.1lf", curTemp, curHum);
        }
    }
}

bool getSensorValues()
{
    bool bResult = false;

    //! local variables
    uint16_t data[2]; // create a 2 element array of 16 bit ints
    uint8_t result;

    // readHoldingRegisters and readInputRegisters take two parameters:
    // - the register to start reading from
    // - the number of registers to read (1, 2, ...)

    // Some sensors have the temperature and humidity in holding register 0 and 1. If so, use this version:
    // result = node.readHoldingRegisters(0x0000, 2);

    // Some sensors have the temperature and humidity in input registers 1 and 2. If so, use this version:
    result = node.readInputRegisters(0x0001, 2);

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

        curHum = (double)data[0] / 10.0;  // humidity received divide by 10
        curTemp = (double)data[1] / 10.0; // temp received divide by 10

        bResult = true;
    }
    else
    {
        // debug serial messages
        Log.info("Modbus Read Error 0x%02x", (int)result);
    }

    return bResult;
}
