#include "Particle.h"

#include "oled-wing-adafruit.h"

SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler;


OledWingAdafruit display;

BleUuid serviceUuid("afe7acc5-33a9-478f-bbe1-8944aa08e884");

unsigned long lastScan;
BleAddress peripheralAddr;
int rssi;

void scanResultCallback(const BleScanResult *scanResult, void *context);

void setup() {
	waitFor(Serial.isConnected, 10000);

	BLE.on();

	BLE.setScanPhy(BlePhy::BLE_PHYS_CODED | BlePhy::BLE_PHYS_1MBPS);

	display.setup();

	display.clearDisplay();
	display.display();
}

void loop() {
	display.loop();

	if (millis() - lastScan >= 500) {
		lastScan = millis();

		rssi = 0;
		BLE.scan(scanResultCallback, NULL);

		display.clearDisplay();
		if (rssi) {

			display.setTextSize(3);
			display.setTextColor(WHITE);
			display.setCursor(0,0);

			char buf[32];
			snprintf(buf, sizeof(buf), "%d", rssi);
			display.println(buf);
		}

		display.display();
	}
}


void scanResultCallback(const BleScanResult *scanResult, void *context) {

	BleUuid foundServiceUuid;
	size_t svcCount = scanResult->advertisingData().serviceUUID(&foundServiceUuid, 1);
	if (svcCount == 0 || !(foundServiceUuid == serviceUuid)) {
		/*
		Log.info("ignoring %02X:%02X:%02X:%02X:%02X:%02X, not our service",
				scanResult->address()[4], scanResult->address()[4], scanResult->address()[3],
				scanResult->address()[2], scanResult->address()[1], scanResult->address()[0]);
		*/
		return;
	}

	Log.info("rssi=%d server=%02X:%02X:%02X:%02X:%02X:%02X",
			scanResult->rssi(),
			scanResult->address()[5], scanResult->address()[4], scanResult->address()[3],
			scanResult->address()[2], scanResult->address()[1], scanResult->address()[0]);

	peripheralAddr = scanResult->address();
	rssi = scanResult->rssi();
	
	BLE.stopScanning();
}

