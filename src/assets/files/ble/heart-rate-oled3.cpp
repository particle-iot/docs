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

	BLE.on();

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
			len = scanResults[ii].advertisingData().get(BleAdvertisingDataType::SERVICE_UUID_16BIT_COMPLETE, buf, BLE_MAX_ADV_DATA_LEN);
			if (len > 0) {
				//
				for(size_t jj = 0; jj < len; jj += 2) {
					if (*(uint16_t *)&buf[jj] == BLE_SIG_UUID_HEART_RATE_SVC) { // 0x180D
						// Found a device with a heart rate service

						Log.info("rssi=%d address=%02X:%02X:%02X:%02X:%02X:%02X ",
								scanResults[ii].rssi(),
								scanResults[ii].address()[0], scanResults[ii].address()[1], scanResults[ii].address()[2],
								scanResults[ii].address()[3], scanResults[ii].address()[4], scanResults[ii].address()[5]);

						peer = BLE.connect(scanResults[ii].address());
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