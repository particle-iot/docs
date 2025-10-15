#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

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

	BLE.on();
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
							scanResults[ii].address[5], scanResults[ii].address[4], scanResults[ii].address[3],
							scanResults[ii].address[2], scanResults[ii].address[1], scanResults[ii].address[0]);

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
				peer.address()[5], peer.address()[4], peer.address()[3],
				peer.address()[2], peer.address()[1], peer.address()[0]);
	}
}
