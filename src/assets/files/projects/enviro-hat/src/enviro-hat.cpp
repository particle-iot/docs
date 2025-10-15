#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

bool i2cscan(TwoWire &wire);

#include "Adafruit_GFX.h"    // Core graphics library
// #include "Adafruit_ST7735.h" // Display library 

#include "Adafruit_BME280_RK.h"

#include "LTR559_RK.h"

#include "Sparkfun_ADS1015_Arduino_Library.h"

#include "PMS5003_RK.h"


// Display does nit work beacuse TFT_DC is MISO, but MISO cannot be used as a GPIO
// when in SPI mode on the RTL872x at this time
const pin_t TFT_CS = A2;
const pin_t TFT_RST = PIN_INVALID; // No LCD hardware reset
const pin_t TFT_DC = MISO; // Shared with MISO! Beware!
// Adafruit_ST7735 tft = Adafruit_ST7735(&SPI, TFT_CS, TFT_DC, TFT_RST);

const double SEALEVELPRESSURE_HPA = 1013.25;
Adafruit_BME280 bme; // I2C

LTR559_RK lightSensor;

ADS1015 adcSensor;
const pin_t HEATER_PIN = D25;
bool hasGasSensors = false;

const pin_t PMS5003_RESET = A5;
const pin_t PMS5003_ENABLE = D27;
PMS5003_RK pms;

unsigned long lastSensorCheck = 0;
const std::chrono::milliseconds sensorCheckPeriod = 1s;

unsigned long lastPublishSensor = 0;
const std::chrono::milliseconds publishSensorPeriod = 2min;


void sensorCheck();

void setup() {
    // Uncomment this to see early initialization messages
    waitFor(Serial.isConnected, 10000); delay(2000);

    Wire.begin();
    i2cscan(Wire); // Only for testing; remove for production

    // Display does not work because the DC line can't be controlled, see above
    // tft.initR(INITR_MINI160x80);  // Init ST7735S mini display
    
    bool bStatus;
    bStatus = bme.begin(0x76);
    if (!bStatus) {
        Log.error("BME280 did not initialize");
    }

    bStatus = adcSensor.begin(0x49);
    if (bStatus) {
        adcSensor.setMode(ADS1015_CONFIG_MODE_CONT);
        adcSensor.setGain(ADS1015_CONFIG_PGA_TWOTHIRDS); // +/0 6.144
        adcSensor.setSampleRate(ADS1015_CONFIG_RATE_128HZ); // 128 SPS
        // Log.info("ADS1015 initialized!");

        if (hasGasSensors) {
            pinMode(HEATER_PIN, OUTPUT);
            digitalWrite(HEATER_PIN, true);
        }
    }
    else {
        Log.error("ADS1015 did not initialize");
    }

    // PMS5003 particulate mater sensor
    pms
        .withEnablePin(PMS5003_ENABLE)
        .withResetPin(PMS5003_RESET)
        .setup();

}

void loop() {
    if (millis() - lastSensorCheck >= sensorCheckPeriod.count()) {
        lastSensorCheck = millis();

        sensorCheck();
    }
}

char sensorBuf[512];

float getSensorValue(int num) {
    float multiplier = adcSensor.getMultiplier(); // used to convert readings to actual voltages (in mV units)

    float value = (float)adcSensor.getSingleEnded(num) * multiplier / 1000.0;
    if (value != 3.3) {
        value = (value * 56000) / (3.3 - value);
    }
    else {
        value = 0;
    }
    return value;
}

void sensorCheck() {
    memset(sensorBuf, 0, sizeof(sensorBuf));

    JSONBufferWriter writer(sensorBuf, sizeof(sensorBuf) - 1);

    writer.beginObject();

    // BME280
    writer.name("temp").value(bme.readTemperature()); // deg C
    writer.name("pres").value(bme.readPressure() / 100.0); // hPa
    writer.name("hum").value(bme.readHumidity()); // RH %

    {
        // LTR559
        uint16_t alsData;
        bool bResult;

        bResult = lightSensor.alsReadData(alsData);
        if (bResult) {
            uint16_t psData;
            bool saturationIndicator;
            bResult = lightSensor.psReadData(psData, saturationIndicator);
            if (bResult) {
                writer.name("als").value(alsData);
                writer.name("ps").value(psData);
            }
        }
    }

    if (hasGasSensors) {        
        writer.name("ox").value(getSensorValue(0));
        writer.name("red").value(getSensorValue(1));
        writer.name("nh3").value(getSensorValue(2));
    }
    writer.name("adc").value(adcSensor.getSingleEnded(3));

    {
        PMS5003_RK::Data lastData;
        unsigned long lastDataMillis;
        static unsigned long lastLastDataMillis = 0;

        pms.getLastData(lastData, lastDataMillis);
        if (lastDataMillis != lastLastDataMillis) {
            lastLastDataMillis = lastDataMillis;
        
            lastData.toJSON(writer);
        }
    }


    writer.endObject();

    Log.info(sensorBuf);

    if (Particle.connected()) {
        if (lastPublishSensor == 0 || millis() - lastPublishSensor >= publishSensorPeriod.count()) {
            lastPublishSensor = millis();
            Particle.publish("enviro", sensorBuf);
        }
    }

}

/*
Pin	Hat Description	Pi Pin Name	Particle Pin Name
1	3V3	3V3 power	3V3
2	5V	5V power	5V
3	SDA	GPIO2 (SDA)	D0
5	SCL	GPIO3 (SCL)	D1
6	GND	Ground	GND
8	PMS5003 TX	GPIO14 (TXD)	TX
10	PMS5003 TX	GPIO15 (RXD)	RX
12	Mic I2S CLK	GPIO18	D6
13	PMS5003 Reset	GPIO27	A5
15	PMS5003 Enable	GPIO22	D27
16	ADS1015 Alert	GPIO23	D24
18	Gas heater enable	GPIO24	D25
19	SPI MOSI	GPIO10 (MOSI)	MOSI
21	LCD D/C	GPIO9 (MISO)	MISO
23	SPI SCLK	GPIO11 (SCLK)	SCK
26	LCD CS	GPIO7 (CE1)	A2
32	LCD backlight	GPIO12 (PWM0)	D5
35	Mic I2S FS	GPIO19 (PCM_FS)	D26
38	Mic I2S Data	GPIO20 (PCM_DIN)	D21

Chip	Description	I2C Address
LTR559	Light sensor	0x23
ADS1015	Analog to digital converter	0x49
BME280	Temperature and humidity sensor	0x76

PMS5003 environmental sensor is connected by UART serial (and several GPIO)
LCD display
*/

bool i2cscan(TwoWire &wire) {
    bool bFound = false;

	Log.info("Scanning I2C bus...");

	int numDevices = 0;

	// Address 0x79 to 0x7f are reserved, don't scan them
	for(byte address = 1; address < 0x78; address++) {
		wire.beginTransmission(address);
		byte error = wire.endTransmission();

		if (error == 0) {
			const char *deviceName = NULL;

			switch(address) {
                case 0x23: 
                    deviceName = "LTR559 light sensor";
                    break;

                case 0x28: 
                    deviceName = "STUSB4500 USB-C PD Controller";
                    break;

                case 0x36:
                    deviceName = "MAX17043 Fuel Gauge";
                    break;

                case 0x48:
                    deviceName = "TMP112A temperature sensor";
                    break;

                case 0x49:
                    deviceName = "ADS1015 ADC";
                    break;

                case 0x54:
                    deviceName = "SN3218 LED Driver";
                    break;

                case 0x61:
                    deviceName = "KG200Z LoRaWAN radio";
                    break;

                case 0x69:
                    deviceName = "AM1805 RTC/Watchdog";
                    break;

                case 0x6b:
                    deviceName = "bq24195 PMIC";
                    break;

                case 0x76:
                    deviceName = "BME280 temperature and humidity sensor";
                    break;
			}
			if (deviceName != NULL) {
				Log.info("%s found at address 0x%02x", deviceName, address);
                bFound = true;
			}
			else {
				Log.info("Unknown I2C device found at address 0x%02x", address);
			}

			numDevices++;
		}
		else if (error == 4) {
			Log.info("Unknown error at address 0x%2x", address);
		}
	}

	Log.info("%d devices found", numDevices);

    return bFound;
}

