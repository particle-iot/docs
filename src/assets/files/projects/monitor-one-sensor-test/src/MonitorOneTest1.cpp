#include "Particle.h"

#include "DS2482-RK.h"
#include "eeprom_helper.h"

SYSTEM_MODE(SEMI_AUTOMATIC);
SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler(LOG_LEVEL_INFO);

void i2cScan();
unsigned long i2cScanLast = 0;
const std::chrono::milliseconds i2cScanInterval = 20s;

DS2482 ds(Wire, 0);
DS2482DeviceListStatic<10> deviceList;

ExpansionEeprom eepromData;

void setup() {
	Wire.begin();

    // Turn on CAN_5V as the DS2482-100 is powered by it
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);
}

void loop() {
    if (millis() - i2cScanLast >= i2cScanInterval.count()) {
        i2cScanLast = millis();
        i2cScan();
    }
	ds.loop();
}

void dsScan() {
	ds.setup();

	DS2482DeviceReset::run(ds, [](DS2482DeviceReset&, int status) {
		Log.info("deviceReset=%d", status);

		DS2482SearchBusCommand::run(ds, deviceList, [](DS2482SearchBusCommand &obj, int status) {

			if (status != DS2482Command::RESULT_DONE) {
				Log.info("DS2482SearchBusCommand status=%d", status);
				return;
			}


            if (deviceList.getDeviceCount() > 0) {
    			Log.info("Found %u devices", deviceList.getDeviceCount());

                DS2482GetTemperatureForListCommand::run(ds, deviceList, [](DS2482GetTemperatureForListCommand&, int status, DS2482DeviceList &deviceList) {
                    if (status != DS2482Command::RESULT_DONE) {
                        Log.info("DS2482GetTemperatureForListCommand status=%d", status);
                        return;
                    }

                    Log.info("got temperatures!");

                    for(size_t ii = 0; ii < deviceList.getDeviceCount(); ii++) {
                        Log.info("%s valid=%d C=%f F=%f",
                                deviceList.getAddressByIndex(ii).toString().c_str(),
                                deviceList.getDeviceByIndex(ii).getValid(),
                                deviceList.getDeviceByIndex(ii).getTemperatureC(),
                                deviceList.getDeviceByIndex(ii).getTemperatureF());
                    }

                });
            }
            else {
			    Log.info("No 1-Wire devices found");
            }
		});
	});

}

void eepromScan() {

    int res = readEepromBytes(Wire, 0x50, 0, (uint8_t *)&eepromData, sizeof(eepromData));
    if (res == SYSTEM_ERROR_NONE) {
        if (isEeepromValid(eepromData)) {
            Log.info("eeprom data appears to be valid");
            Log.info("size=%d revision=%d sku=%d serial=", (int)eepromData.size, (int)eepromData.revision, eepromData.sku);
            Log.dump(eepromData.serial, sizeof(eepromData.serial));
            Log.print("\n");
        }
        else {
            bool isFF = true;
            for(size_t ii = 0; ii < sizeof(eepromData); ii++) {
                if (((uint8_t *)&eepromData)[ii] != 0xff) {
                    isFF = false;
                }
            }
            if (isFF) {
                Log.info("eeprom appears to be erased (first %u bytes are 0xff)", sizeof(eepromData));
            }
            else {
                Log.info("eeprom not valid");
                Log.dump(&eepromData, sizeof(eepromData));
                Log.print("\n");
            }
        }
    }
    else {
        Log.info("error reading eeprom %d", res);
    }

}

void i2cScan() {
	uint8_t endResult;
	int deviceCount = 0;
    bool hasDS2482 = false;
    bool hasEEPROM = false;

    Log.info("Starting I2C scan...");

	for(uint8_t address = 1; address < 126; address++) {
		Wire.beginTransmission(address);
		endResult = Wire.endTransmission();

		if (endResult == 0)
		{
            const char *deviceName = "unknown device";
            switch(address) {
                case 0x18:
                    deviceName = "DS2482 I2C to 1-Wire";
                    hasDS2482 = true;
                    break;

                case 0x27:
                    deviceName = "ADP8866 User LED driver";
                    break;

                case 0x4a:
                    deviceName = "STS31 temperature sensor";
                    break;

                case 0x50:
                    deviceName = "24CW640 EEPROM";
                    hasEEPROM = true;
                    break;
            }
            Log.info("%s found (I2C address 0x%02x)", deviceName, (int) address);
			deviceCount++;
		}
		else if (endResult == 4)
		{
            Log.info("Error at I2C address 0x%02x", (int) address);
		}
	}

    if (hasDS2482) {
        dsScan();
    }
    else {
        Log.info("Did not find DS2482-100 I2C to 1-Wire bridge");
    }

    if (hasEEPROM) {
        eepromScan();
    }
	
}